#!/bin/bash

# Enhanced Deployment Script for Fenix Academy
# Usage: ./deploy-enhanced.sh <commit-hash> <environment>

set -e

# Configuration
COMMIT_HASH=$1
ENVIRONMENT=${2:-production}
REGISTRY="registry.digitalocean.com"
IMAGE_NAME="fenix-academy"
BACKUP_DIR="/opt/backups"
LOG_FILE="/var/log/fenix-deploy.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root"
fi

# Validate inputs
if [ -z "$COMMIT_HASH" ]; then
    error "Commit hash is required"
fi

if [ "$ENVIRONMENT" != "production" ] && [ "$ENVIRONMENT" != "staging" ]; then
    error "Environment must be 'production' or 'staging'"
fi

log "Starting deployment for environment: $ENVIRONMENT"
log "Commit hash: $COMMIT_HASH"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Function to create backup
create_backup() {
    log "Creating backup of current deployment..."
    
    BACKUP_NAME="fenix-backup-$(date +%Y%m%d-%H%M%S)"
    BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"
    
    # Backup database
    if docker exec fenix-postgres pg_dump -U postgres fenix_academy > "$BACKUP_PATH.sql" 2>/dev/null; then
        log "Database backup created: $BACKUP_PATH.sql"
    else
        warning "Failed to create database backup"
    fi
    
    # Backup current docker-compose file
    cp docker-compose.prod.yml "$BACKUP_PATH.yml" 2>/dev/null || warning "Failed to backup docker-compose file"
    
    # Keep only last 5 backups
    ls -t $BACKUP_DIR/fenix-backup-* | tail -n +6 | xargs rm -f 2>/dev/null || true
    
    echo $BACKUP_PATH
}

# Function to rollback
rollback() {
    local backup_path=$1
    local reason=$2
    
    error "Rollback triggered: $reason"
    log "Rolling back to backup: $backup_path"
    
    # Stop current containers
    docker-compose -f docker-compose.prod.yml down
    
    # Restore docker-compose file
    if [ -f "$backup_path.yml" ]; then
        cp "$backup_path.yml" docker-compose.prod.yml
    fi
    
    # Restart with previous configuration
    docker-compose -f docker-compose.prod.yml up -d
    
    # Restore database if backup exists
    if [ -f "$backup_path.sql" ]; then
        log "Restoring database from backup..."
        docker exec -i fenix-postgres psql -U postgres fenix_academy < "$backup_path.sql" || warning "Failed to restore database"
    fi
    
    success "Rollback completed"
}

# Function to check health
check_health() {
    local max_attempts=30
    local attempt=1
    
    log "Checking application health..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f http://localhost/api/health/ > /dev/null 2>&1; then
            success "Application is healthy"
            return 0
        fi
        
        log "Health check attempt $attempt/$max_attempts failed, retrying in 10 seconds..."
        sleep 10
        attempt=$((attempt + 1))
    done
    
    return 1
}

# Function to run tests
run_tests() {
    log "Running post-deployment tests..."
    
    # Test API endpoints
    local endpoints=(
        "/api/health/"
        "/api/courses/"
        "/api/categories/"
    )
    
    for endpoint in "${endpoints[@]}"; do
        if curl -f "http://localhost$endpoint" > /dev/null 2>&1; then
            log "✓ $endpoint is working"
        else
            warning "✗ $endpoint is not responding"
        fi
    done
}

# Function to update monitoring
update_monitoring() {
    log "Updating monitoring configuration..."
    
    # Update Prometheus targets if needed
    if [ -f "/etc/prometheus/prometheus.yml" ]; then
        # Reload Prometheus configuration
        curl -X POST http://localhost:9090/-/reload 2>/dev/null || warning "Failed to reload Prometheus"
    fi
    
    # Send deployment notification
    if command -v curl > /dev/null; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚀 Fenix Academy deployment to $ENVIRONMENT completed successfully! Commit: $COMMIT_HASH\"}" \
            $SLACK_WEBHOOK_URL 2>/dev/null || warning "Failed to send Slack notification"
    fi
}

# Main deployment process
main() {
    # Create backup before deployment
    BACKUP_PATH=$(create_backup)
    
    # Pull latest changes
    log "Pulling latest changes from git..."
    git fetch origin
    git reset --hard $COMMIT_HASH || error "Failed to reset to commit $COMMIT_HASH"
    
    # Update docker-compose file with new image tags
    log "Updating docker-compose configuration..."
    sed -i "s|image:.*fenix-backend.*|image: $REGISTRY/$IMAGE_NAME:$COMMIT_HASH|g" docker-compose.prod.yml
    sed -i "s|image:.*fenix-frontend.*|image: $REGISTRY/$IMAGE_NAME-frontend:$COMMIT_HASH|g" docker-compose.prod.yml
    sed -i "s|image:.*fenix-nginx.*|image: $REGISTRY/$IMAGE_NAME-nginx:$COMMIT_HASH|g" docker-compose.prod.yml
    
    # Pull new images
    log "Pulling new Docker images..."
    docker-compose -f docker-compose.prod.yml pull || error "Failed to pull Docker images"
    
    # Stop current containers
    log "Stopping current containers..."
    docker-compose -f docker-compose.prod.yml down || error "Failed to stop containers"
    
    # Start new containers
    log "Starting new containers..."
    docker-compose -f docker-compose.prod.yml up -d || error "Failed to start containers"
    
    # Wait for containers to be ready
    log "Waiting for containers to be ready..."
    sleep 30
    
    # Check health
    if ! check_health; then
        rollback "$BACKUP_PATH" "Health check failed after deployment"
    fi
    
    # Run tests
    run_tests
    
    # Update monitoring
    update_monitoring
    
    # Clean up old images
    log "Cleaning up old Docker images..."
    docker image prune -f || warning "Failed to clean up old images"
    
    success "Deployment completed successfully!"
    
    # Show deployment info
    log "Deployment Summary:"
    log "  Environment: $ENVIRONMENT"
    log "  Commit: $COMMIT_HASH"
    log "  Backup: $BACKUP_PATH"
    log "  Timestamp: $(date)"
    
    # Show container status
    log "Container Status:"
    docker-compose -f docker-compose.prod.yml ps
}

# Trap to handle errors and rollback
trap 'rollback "$BACKUP_PATH" "Deployment failed"' ERR

# Run main deployment
main 