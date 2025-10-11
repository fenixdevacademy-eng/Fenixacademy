# DEPLOY CONFIGURATION
# This file ensures all platforms use the correct settings

# Version Info
DEPLOY_VERSION=2025.01.15.004
BUILD_TIMESTAMP=$(date)
COMMIT_HASH=c0de9055

# Build Settings
NODE_VERSION=18
NPM_VERSION=9

# Platform Detection
if [ "$VERCEL" = "1" ]; then
  echo "Deploying to Vercel..."
  npm run build
elif [ "$NETLIFY" = "true" ]; then
  echo "Deploying to Netlify..."
  npm run build
else
  echo "Local/Manual deployment..."
  npm run build
fi

echo "Deploy completed successfully!"
