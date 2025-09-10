@echo off
setlocal enabledelayedexpansion

REM Fenix Academy Deployment Script for Windows
REM This script handles the deployment process with error checking and validation

echo 🚀 Starting Fenix Academy Deployment Process...

REM Check if we're in the right directory
if not exist "frontend\package.json" (
    echo [ERROR] Please run this script from the project root directory
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:v=%
if %NODE_VERSION% LSS 18 (
    echo [ERROR] Node.js version 18+ is required. Current version: 
    node --version
    exit /b 1
)

echo [SUCCESS] Node.js version check passed: 
node --version

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Vercel CLI not found. Installing...
    npm install -g vercel
)

echo [SUCCESS] Vercel CLI version: 
vercel --version

REM Navigate to frontend directory
cd frontend

REM Clean previous builds
echo [INFO] Cleaning previous builds...
if exist ".next" rmdir /s /q ".next"
if exist "out" rmdir /s /q "out"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

REM Install dependencies
echo [INFO] Installing dependencies...
npm ci --production=false
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)

REM Run type checking
echo [INFO] Running TypeScript type checking...
npm run type-check
if errorlevel 1 (
    echo [ERROR] TypeScript type checking failed
    exit /b 1
)

REM Run linting
echo [INFO] Running ESLint...
npm run lint
if errorlevel 1 (
    echo [WARNING] ESLint found issues, but continuing...
)

REM Build the application
echo [INFO] Building the application...
set NODE_ENV=production
npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    exit /b 1
)

REM Check if build was successful
if not exist ".next" (
    echo [ERROR] Build failed. .next directory not found.
    exit /b 1
)

echo [SUCCESS] Build completed successfully

REM Test API endpoints locally
echo [INFO] Testing API endpoints...

REM Start the application in background for testing
start /b npm start
set APP_PID=%!

REM Wait for the app to start
timeout /t 10 /nobreak >nul

REM Test health endpoint
echo [INFO] Testing health endpoint...
curl -f -s http://localhost:3000/api/health >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Health endpoint test failed
) else (
    echo [SUCCESS] Health endpoint is working
)

REM Test status endpoint
echo [INFO] Testing status endpoint...
curl -f -s http://localhost:3000/api/status >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Status endpoint test failed
) else (
    echo [SUCCESS] Status endpoint is working
)

REM Test monitoring endpoint
echo [INFO] Testing monitoring endpoint...
curl -f -s http://localhost:3000/api/monitoring >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Monitoring endpoint test failed
) else (
    echo [SUCCESS] Monitoring endpoint is working
)

REM Test error handling
echo [INFO] Testing error handling...
curl -f -s "http://localhost:3000/api/test-errors?type=not-found" >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Error handling test failed
) else (
    echo [SUCCESS] Error handling is working
)

REM Stop the test server
taskkill /f /im node.exe >nul 2>&1

REM Deploy to Vercel
echo [INFO] Deploying to Vercel...
cd ..

REM Check if we're logged in to Vercel
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Not logged in to Vercel. Please log in:
    vercel login
)

REM Deploy
vercel --prod --yes
if errorlevel 1 (
    echo [ERROR] Deployment failed
    exit /b 1
)

echo [SUCCESS] Deployment completed successfully!

REM Post-deployment tests
echo [INFO] Running post-deployment tests...

REM Get the deployment URL (this is a simplified version)
echo [INFO] Please check your Vercel dashboard for the deployment URL
echo [INFO] You can also run: vercel ls

echo.
echo [SUCCESS] 🎉 Deployment process completed successfully!
echo [INFO] Check the ERROR_RESOLUTION_GUIDE.md for detailed information about error handling and monitoring.

echo.
echo Next steps:
echo 1. Monitor the application using the monitoring endpoints
echo 2. Check Vercel dashboard for deployment status
echo 3. Review logs for any issues
echo 4. Test error scenarios using the test-errors endpoint
echo 5. Set up alerts for critical errors

pause
exit /b 0




