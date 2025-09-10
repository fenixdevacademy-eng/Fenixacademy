#!/bin/bash

# Fenix Academy Deployment Script
# This script handles the deployment process with error checking and validation

set -e  # Exit on any error

echo "🚀 Starting Fenix Academy Deployment Process..."

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

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version check passed: $(node -v)"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

print_success "Vercel CLI version: $(vercel --version)"

# Navigate to frontend directory
cd frontend

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Install dependencies
print_status "Installing dependencies..."
npm ci --production=false

# Run type checking
print_status "Running TypeScript type checking..."
npm run type-check

# Run linting
print_status "Running ESLint..."
npm run lint

# Build the application
print_status "Building the application..."
NODE_ENV=production npm run build

# Check if build was successful
if [ ! -d ".next" ]; then
    print_error "Build failed. .next directory not found."
    exit 1
fi

print_success "Build completed successfully"

# Test API endpoints locally
print_status "Testing API endpoints..."

# Start the application in background for testing
npm start &
APP_PID=$!

# Wait for the app to start
sleep 10

# Test health endpoint
print_status "Testing health endpoint..."
if curl -f -s http://localhost:3000/api/health > /dev/null; then
    print_success "Health endpoint is working"
else
    print_warning "Health endpoint test failed"
fi

# Test status endpoint
print_status "Testing status endpoint..."
if curl -f -s http://localhost:3000/api/status > /dev/null; then
    print_success "Status endpoint is working"
else
    print_warning "Status endpoint test failed"
fi

# Test monitoring endpoint
print_status "Testing monitoring endpoint..."
if curl -f -s http://localhost:3000/api/monitoring > /dev/null; then
    print_success "Monitoring endpoint is working"
else
    print_warning "Monitoring endpoint test failed"
fi

# Test error handling
print_status "Testing error handling..."
if curl -f -s "http://localhost:3000/api/test-errors?type=not-found" > /dev/null; then
    print_success "Error handling is working"
else
    print_warning "Error handling test failed"
fi

# Stop the test server
kill $APP_PID 2>/dev/null || true

# Deploy to Vercel
print_status "Deploying to Vercel..."
cd ..

# Check if we're logged in to Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "Not logged in to Vercel. Please log in:"
    vercel login
fi

# Deploy
vercel --prod --yes

print_success "Deployment completed successfully!"

# Post-deployment tests
print_status "Running post-deployment tests..."

# Get the deployment URL
DEPLOYMENT_URL=$(vercel ls | grep -o 'https://[^[:space:]]*' | head -1)

if [ -n "$DEPLOYMENT_URL" ]; then
    print_status "Testing deployed application at: $DEPLOYMENT_URL"
    
    # Test health endpoint
    if curl -f -s "$DEPLOYMENT_URL/api/health" > /dev/null; then
        print_success "Deployed health endpoint is working"
    else
        print_warning "Deployed health endpoint test failed"
    fi
    
    # Test status endpoint
    if curl -f -s "$DEPLOYMENT_URL/api/status" > /dev/null; then
        print_success "Deployed status endpoint is working"
    else
        print_warning "Deployed status endpoint test failed"
    fi
    
    # Test monitoring endpoint
    if curl -f -s "$DEPLOYMENT_URL/api/monitoring" > /dev/null; then
        print_success "Deployed monitoring endpoint is working"
    else
        print_warning "Deployed monitoring endpoint test failed"
    fi
    
    print_success "Deployment URL: $DEPLOYMENT_URL"
else
    print_warning "Could not determine deployment URL"
fi

# Display monitoring information
print_status "Monitoring endpoints available:"
echo "  - Health: $DEPLOYMENT_URL/api/health"
echo "  - Status: $DEPLOYMENT_URL/api/status"
echo "  - Monitoring: $DEPLOYMENT_URL/api/monitoring"
echo "  - Error Testing: $DEPLOYMENT_URL/api/test-errors"

print_success "🎉 Deployment process completed successfully!"
print_status "Check the ERROR_RESOLUTION_GUIDE.md for detailed information about error handling and monitoring."

# Display next steps
echo ""
echo "Next steps:"
echo "1. Monitor the application using the monitoring endpoints"
echo "2. Check Vercel dashboard for deployment status"
echo "3. Review logs for any issues"
echo "4. Test error scenarios using the test-errors endpoint"
echo "5. Set up alerts for critical errors"

exit 0




