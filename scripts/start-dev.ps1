# Fenix Academy - Development Startup Script (PowerShell)
Write-Host "🚀 Starting Fenix Academy Development Environment..." -ForegroundColor Blue

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Error "Docker is not running. Please start Docker and try again."
    exit 1
}

# Check if docker-compose is available
try {
    docker-compose --version | Out-Null
} catch {
    Write-Error "docker-compose is not installed. Please install it and try again."
    exit 1
}

Write-Status "Stopping any existing containers..."
docker-compose down

Write-Status "Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
Write-Status "Waiting for services to be ready..."
Start-Sleep -Seconds 30

# Check service health
Write-Status "Checking service health..."

# Check database
try {
    docker-compose exec -T db pg_isready -U fenix -d fenix | Out-Null
    Write-Success "Database is ready"
} catch {
    Write-Warning "Database might still be starting up..."
}

# Check Redis
try {
    docker-compose exec -T redis redis-cli ping | Out-Null
    Write-Success "Redis is ready"
} catch {
    Write-Warning "Redis might still be starting up..."
}

# Wait a bit more for backend to be ready
Write-Status "Waiting for backend to be ready..."
Start-Sleep -Seconds 20

# Check backend health
try {
    Invoke-WebRequest -Uri "http://localhost:8000/api/health/" -UseBasicParsing | Out-Null
    Write-Success "Backend API is ready"
} catch {
    Write-Warning "Backend API might still be starting up..."
}

# Check frontend health
try {
    Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing | Out-Null
    Write-Success "Frontend is ready"
} catch {
    Write-Warning "Frontend might still be starting up..."
}

# Run migrations
Write-Status "Running database migrations..."
docker-compose exec -T backend python manage.py migrate

# Create superuser if it doesn't exist
Write-Status "Checking for superuser..."
try {
    $result = docker-compose exec -T backend python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print('Superuser exists' if User.objects.filter(is_superuser=True).exists() else 'No superuser')" 2>$null
    if ($result -notlike "*Superuser exists*") {
        Write-Warning "No superuser found. You can create one with:"
        Write-Host "docker-compose exec backend python manage.py createsuperuser"
    }
} catch {
    Write-Warning "Could not check for superuser"
}

# Collect static files
Write-Status "Collecting static files..."
docker-compose exec -T backend python manage.py collectstatic --noinput

Write-Success "🎉 Fenix Academy is starting up!"
Write-Host ""
Write-Host "📋 Service URLs:" -ForegroundColor Cyan
Write-Host "   Frontend:     http://localhost:3000"
Write-Host "   Backend API:  http://localhost:8000/api/"
Write-Host "   Admin Panel:  http://localhost:8000/admin/"
Write-Host "   Nginx:        http://localhost"
Write-Host ""
Write-Host "🔧 Useful Commands:" -ForegroundColor Cyan
Write-Host "   View logs:    docker-compose logs -f [service]"
Write-Host "   Stop all:     docker-compose down"
Write-Host "   Restart:      docker-compose restart [service]"
Write-Host "   Shell:        docker-compose exec backend python manage.py shell"
Write-Host ""
Write-Host "📊 Health Check:" -ForegroundColor Cyan
Write-Host "   Backend:      curl http://localhost:8000/api/health/"
Write-Host "   Frontend:     curl http://localhost:3000/"
Write-Host ""
Write-Status "Services are starting up. Please wait a few minutes for everything to be ready." 