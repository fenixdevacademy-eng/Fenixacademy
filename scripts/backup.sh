#!/bin/bash

# Backup Script for Fenix Academy
# Usage: ./backup.sh [backup-name]

set -e

# Configuration
BACKUP_NAME=${1:-"fenix-backup-$(date +%Y%m%d-%H%M%S)"}
BACKUP_DIR="/opt/backups"
S3_BUCKET="fenix-academy-backups"
RETENTION_DAYS=30

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root"
fi

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

log "Starting backup: $BACKUP_NAME"

# Function to backup database
backup_database() {
    log "Backing up database..."
    
    DB_BACKUP_FILE="$BACKUP_DIR/${BACKUP_NAME}-database.sql"
    
    if docker exec fenix-postgres pg_dump -U postgres fenix_academy > "$DB_BACKUP_FILE" 2>/dev/null; then
        success "Database backup created: $DB_BACKUP_FILE"
        
        # Compress database backup
        gzip "$DB_BACKUP_FILE"
        success "Database backup compressed: ${DB_BACKUP_FILE}.gz"
    else
        error "Failed to create database backup"
    fi
}

# Function to backup media files
backup_media() {
    log "Backing up media files..."
    
    MEDIA_BACKUP_FILE="$BACKUP_DIR/${BACKUP_NAME}-media.tar.gz"
    
    if docker exec fenix-backend tar -czf - /app/media/ > "$MEDIA_BACKUP_FILE" 2>/dev/null; then
        success "Media backup created: $MEDIA_BACKUP_FILE"
    else
        warning "Failed to create media backup"
    fi
}

# Function to backup configuration files
backup_config() {
    log "Backing up configuration files..."
    
    CONFIG_BACKUP_FILE="$BACKUP_DIR/${BACKUP_NAME}-config.tar.gz"
    
    # Backup important configuration files
    tar -czf "$CONFIG_BACKUP_FILE" \
        docker-compose.prod.yml \
        .env \
        nginx/nginx.conf \
        monitoring/prometheus.yml \
        monitoring/alertmanager.yml \
        2>/dev/null || warning "Failed to create config backup"
    
    success "Configuration backup created: $CONFIG_BACKUP_FILE"
}

# Function to backup logs
backup_logs() {
    log "Backing up application logs..."
    
    LOGS_BACKUP_FILE="$BACKUP_DIR/${BACKUP_NAME}-logs.tar.gz"
    
    # Get logs from containers
    docker-compose -f docker-compose.prod.yml logs --no-color > /tmp/fenix-logs.txt 2>/dev/null || true
    
    # Archive logs
    tar -czf "$LOGS_BACKUP_FILE" -C /tmp fenix-logs.txt 2>/dev/null || warning "Failed to create logs backup"
    
    # Clean up temporary file
    rm -f /tmp/fenix-logs.txt
    
    success "Logs backup created: $LOGS_BACKUP_FILE"
}

# Function to create backup manifest
create_manifest() {
    log "Creating backup manifest..."
    
    MANIFEST_FILE="$BACKUP_DIR/${BACKUP_NAME}-manifest.json"
    
    cat > "$MANIFEST_FILE" << EOF
{
    "backup_name": "$BACKUP_NAME",
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "version": "1.0.0",
    "components": {
        "database": "${BACKUP_NAME}-database.sql.gz",
        "media": "${BACKUP_NAME}-media.tar.gz",
        "config": "${BACKUP_NAME}-config.tar.gz",
        "logs": "${BACKUP_NAME}-logs.tar.gz"
    },
    "system_info": {
        "hostname": "$(hostname)",
        "docker_version": "$(docker --version)",
        "disk_usage": "$(df -h / | tail -1 | awk '{print $5}')",
        "memory_usage": "$(free -h | grep Mem | awk '{print $3 "/" $2}')"
    },
    "application_info": {
        "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
        "git_branch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')",
        "deployment_date": "$(stat -c %y docker-compose.prod.yml 2>/dev/null || echo 'unknown')"
    }
}
EOF
    
    success "Backup manifest created: $MANIFEST_FILE"
}

# Function to upload to S3 (if configured)
upload_to_s3() {
    if command -v aws > /dev/null && [ -n "$S3_BUCKET" ]; then
        log "Uploading backup to S3..."
        
        for file in "$BACKUP_DIR/${BACKUP_NAME}"-*; do
            if [ -f "$file" ]; then
                aws s3 cp "$file" "s3://$S3_BUCKET/$(basename "$file")" --quiet || warning "Failed to upload $file to S3"
            fi
        done
        
        success "Backup uploaded to S3"
    else
        warning "S3 upload skipped (aws CLI not available or S3_BUCKET not configured)"
    fi
}

# Function to clean old backups
cleanup_old_backups() {
    log "Cleaning up old backups (older than $RETENTION_DAYS days)..."
    
    find "$BACKUP_DIR" -name "fenix-backup-*" -type f -mtime +$RETENTION_DAYS -delete 2>/dev/null || warning "Failed to clean old backups"
    
    success "Old backups cleaned up"
}

# Function to verify backup integrity
verify_backup() {
    log "Verifying backup integrity..."
    
    local failed_checks=0
    
    # Check if all backup files exist
    local backup_files=(
        "${BACKUP_NAME}-database.sql.gz"
        "${BACKUP_NAME}-config.tar.gz"
        "${BACKUP_NAME}-manifest.json"
    )
    
    for file in "${backup_files[@]}"; do
        if [ -f "$BACKUP_DIR/$file" ]; then
            log "✓ $file exists"
        else
            warning "✗ $file missing"
            ((failed_checks++))
        fi
    done
    
    # Check file sizes
    for file in "$BACKUP_DIR/${BACKUP_NAME}"-*; do
        if [ -f "$file" ]; then
            size=$(stat -c %s "$file")
            if [ "$size" -eq 0 ]; then
                warning "✗ $file is empty"
                ((failed_checks++))
            else
                log "✓ $file size: $(numfmt --to=iec-i --suffix=B $size)"
            fi
        fi
    done
    
    if [ $failed_checks -eq 0 ]; then
        success "Backup integrity check passed"
    else
        warning "Backup integrity check failed ($failed_checks issues found)"
    fi
}

# Function to send notification
send_notification() {
    local status=$1
    local message=$2
    
    # Slack notification
    if [ -n "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🔧 Fenix Academy Backup: $status - $message\"}" \
            "$SLACK_WEBHOOK_URL" 2>/dev/null || warning "Failed to send Slack notification"
    fi
    
    # Email notification (if configured)
    if [ -n "$BACKUP_NOTIFICATION_EMAIL" ]; then
        echo "Backup $status: $message" | mail -s "Fenix Academy Backup - $status" "$BACKUP_NOTIFICATION_EMAIL" 2>/dev/null || warning "Failed to send email notification"
    fi
}

# Main backup process
main() {
    local start_time=$(date +%s)
    
    # Create backup directory
    mkdir -p "$BACKUP_DIR"
    
    # Run backup components
    backup_database
    backup_media
    backup_config
    backup_logs
    create_manifest
    
    # Upload to S3
    upload_to_s3
    
    # Verify backup
    verify_backup
    
    # Cleanup old backups
    cleanup_old_backups
    
    # Calculate backup time
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    # Send success notification
    send_notification "SUCCESS" "Backup completed in ${duration}s"
    
    success "Backup completed successfully!"
    log "Backup Summary:"
    log "  Name: $BACKUP_NAME"
    log "  Duration: ${duration}s"
    log "  Location: $BACKUP_DIR"
    log "  Files:"
    
    for file in "$BACKUP_DIR/${BACKUP_NAME}"-*; do
        if [ -f "$file" ]; then
            size=$(stat -c %s "$file")
            log "    $(basename "$file"): $(numfmt --to=iec-i --suffix=B $size)"
        fi
    done
}

# Error handling
trap 'send_notification "FAILED" "Backup failed at $(date)"; error "Backup failed"' ERR

# Run main backup
main 