#!/bin/bash

# Fênix Dev Academy - Deploy Script
# This script handles deployment to DigitalOcean

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="fenix-dev-academy"
DOCKER_REGISTRY="registry.digitalocean.com"
REGISTRY_NAME="fenix-dev-academy"
DROPLET_IP=""
SSH_USER="root"
SSH_KEY_PATH="~/.ssh/id_rsa"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    log_info "Checking requirements..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
    
    if ! command -v doctl &> /dev/null; then
        log_warning "DigitalOcean CLI (doctl) is not installed"
        log_info "You can install it from: https://docs.digitalocean.com/reference/doctl/how-to/install/"
    fi
    
    log_success "Requirements check completed"
}

# Build Docker images
build_images() {
    log_info "Building Docker images..."
    
    # Build backend
    log_info "Building backend image..."
    docker build -f backend/Dockerfile.prod -t ${PROJECT_NAME}-backend:latest ./backend
    
    # Build frontend
    log_info "Building frontend image..."
    docker build -f frontend/Dockerfile.prod -t ${PROJECT_NAME}-frontend:latest ./frontend
    
    # Build nginx
    log_info "Building nginx image..."
    docker build -f nginx/Dockerfile.prod -t ${PROJECT_NAME}-nginx:latest ./nginx
    
    log_success "All images built successfully"
}

# Tag and push images to DigitalOcean Container Registry
push_images() {
    log_info "Pushing images to DigitalOcean Container Registry..."
    
    # Login to DigitalOcean Container Registry
    log_info "Logging in to DigitalOcean Container Registry..."
    doctl registry login
    
    # Tag images
    docker tag ${PROJECT_NAME}-backend:latest ${DOCKER_REGISTRY}/${REGISTRY_NAME}/${PROJECT_NAME}-backend:latest
    docker tag ${PROJECT_NAME}-frontend:latest ${DOCKER_REGISTRY}/${REGISTRY_NAME}/${PROJECT_NAME}-frontend:latest
    docker tag ${PROJECT_NAME}-nginx:latest ${DOCKER_REGISTRY}/${REGISTRY_NAME}/${PROJECT_NAME}-nginx:latest
    
    # Push images
    log_info "Pushing backend image..."
    docker push ${DOCKER_REGISTRY}/${REGISTRY_NAME}/${PROJECT_NAME}-backend:latest
    
    log_info "Pushing frontend image..."
    docker push ${DOCKER_REGISTRY}/${REGISTRY_NAME}/${PROJECT_NAME}-frontend:latest
    
    log_info "Pushing nginx image..."
    docker push ${DOCKER_REGISTRY}/${REGISTRY_NAME}/${PROJECT_NAME}-nginx:latest
    
    log_success "All images pushed successfully"
}

# Deploy to DigitalOcean Droplet
deploy_to_droplet() {
    log_info "Deploying to DigitalOcean Droplet..."
    
    if [ -z "$DROPLET_IP" ]; then
        log_error "DROPLET_IP is not set. Please set it in the script or pass as argument."
        exit 1
    fi
    
    # Create deployment package
    log_info "Creating deployment package..."
    tar -czf deploy.tar.gz \
        docker-compose.prod.yml \
        .env \
        nginx/ssl/ \
        scripts/ \
        --exclude='*.pyc' \
        --exclude='__pycache__' \
        --exclude='node_modules' \
        --exclude='.git'
    
    # Copy files to droplet
    log_info "Copying files to droplet..."
    scp -i ${SSH_KEY_PATH} deploy.tar.gz ${SSH_USER}@${DROPLET_IP}:/opt/${PROJECT_NAME}/
    
    # Execute deployment commands on droplet
    log_info "Executing deployment on droplet..."
    ssh -i ${SSH_KEY_PATH} ${SSH_USER}@${DROPLET_IP} << 'EOF'
        cd /opt/fenix-dev-academy
        
        # Extract deployment package
        tar -xzf deploy.tar.gz
        rm deploy.tar.gz
        
        # Stop existing containers
        docker-compose -f docker-compose.prod.yml down
        
        # Pull latest images
        docker-compose -f docker-compose.prod.yml pull
        
        # Start services
        docker-compose -f docker-compose.prod.yml up -d
        
        # Run database migrations
        docker-compose -f docker-compose.prod.yml exec -T backend python manage.py migrate
        
        # Collect static files
        docker-compose -f docker-compose.prod.yml exec -T backend python manage.py collectstatic --noinput
        
        # Restart services
        docker-compose -f docker-compose.prod.yml restart
        
        # Clean up old images
        docker image prune -f
        
        echo "Deployment completed successfully!"
EOF
    
    # Clean up local deployment package
    rm deploy.tar.gz
    
    log_success "Deployment completed successfully!"
}

# Health check
health_check() {
    log_info "Performing health check..."
    
    if [ -z "$DROPLET_IP" ]; then
        log_error "DROPLET_IP is not set. Cannot perform health check."
        return 1
    fi
    
    # Wait for services to start
    log_info "Waiting for services to start..."
    sleep 30
    
    # Check if services are responding
    if curl -f http://${DROPLET_IP}/health/ > /dev/null 2>&1; then
        log_success "Health check passed!"
        return 0
    else
        log_error "Health check failed!"
        return 1
    fi
}

# Main deployment function
main() {
    log_info "Starting Fênix Dev Academy deployment..."
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --droplet-ip)
                DROPLET_IP="$2"
                shift 2
                ;;
            --ssh-user)
                SSH_USER="$2"
                shift 2
                ;;
            --ssh-key)
                SSH_KEY_PATH="$2"
                shift 2
                ;;
            --skip-build)
                SKIP_BUILD=true
                shift
                ;;
            --skip-push)
                SKIP_PUSH=true
                shift
                ;;
            --skip-deploy)
                SKIP_DEPLOY=true
                shift
                ;;
            -h|--help)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --droplet-ip IP     DigitalOcean droplet IP address"
                echo "  --ssh-user USER     SSH user (default: root)"
                echo "  --ssh-key PATH      SSH key path (default: ~/.ssh/id_rsa)"
                echo "  --skip-build        Skip building Docker images"
                echo "  --skip-push         Skip pushing images to registry"
                echo "  --skip-deploy       Skip deploying to droplet"
                echo "  -h, --help          Show this help message"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Check requirements
    check_requirements
    
    # Build images (unless skipped)
    if [ "$SKIP_BUILD" != "true" ]; then
        build_images
    fi
    
    # Push images (unless skipped)
    if [ "$SKIP_PUSH" != "true" ]; then
        push_images
    fi
    
    # Deploy to droplet (unless skipped)
    if [ "$SKIP_DEPLOY" != "true" ]; then
        deploy_to_droplet
        health_check
    fi
    
    log_success "Deployment process completed!"
}

# Run main function with all arguments
main "$@" 