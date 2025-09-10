#!/bin/bash

# Fenix Academy - Development Startup Script
echo "🚀 Starting Fenix Academy Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose is not installed. Please install it and try again."
    exit 1
fi

print_status "Stopping any existing containers..."
docker-compose down

print_status "Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check service health
print_status "Checking service health..."

# Check database
if docker-compose exec -T db pg_isready -U fenix -d fenix > /dev/null 2>&1; then
    print_success "Database is ready"
else
    print_warning "Database might still be starting up..."
fi

# Check Redis
if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    print_success "Redis is ready"
else
    print_warning "Redis might still be starting up..."
fi

# Wait a bit more for backend to be ready
print_status "Waiting for backend to be ready..."
sleep 20

# Check backend health
if curl -f http://localhost:8000/api/health/ > /dev/null 2>&1; then
    print_success "Backend API is ready"
else
    print_warning "Backend API might still be starting up..."
fi

# Check frontend health
if curl -f http://localhost:3000/ > /dev/null 2>&1; then
    print_success "Frontend is ready"
else
    print_warning "Frontend might still be starting up..."
fi

# Run migrations
print_status "Running database migrations..."
docker-compose exec -T backend python manage.py migrate

# Create superuser if it doesn't exist
print_status "Checking for superuser..."
if ! docker-compose exec -T backend python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print('Superuser exists' if User.objects.filter(is_superuser=True).exists() else 'No superuser')" 2>/dev/null | grep -q "Superuser exists"; then
    print_warning "No superuser found. You can create one with:"
    echo "docker-compose exec backend python manage.py createsuperuser"
fi

# Collect static files
print_status "Collecting static files..."
docker-compose exec -T backend python manage.py collectstatic --noinput

print_success "🎉 Fenix Academy is starting up!"
echo ""
echo "📋 Service URLs:"
echo "   Frontend:     http://localhost:3000"
echo "   Backend API:  http://localhost:8000/api/"
echo "   Admin Panel:  http://localhost:8000/admin/"
echo "   Nginx:        http://localhost"
echo ""
echo "🔧 Useful Commands:"
echo "   View logs:    docker-compose logs -f [service]"
echo "   Stop all:     docker-compose down"
echo "   Restart:      docker-compose restart [service]"
echo "   Shell:        docker-compose exec backend python manage.py shell"
echo ""
echo "📊 Health Check:"
echo "   Backend:      curl http://localhost:8000/api/health/"
echo "   Frontend:     curl http://localhost:3000/"
echo ""
print_status "Services are starting up. Please wait a few minutes for everything to be ready." 