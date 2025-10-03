# Dockerfile simplificado para Render
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Copy the specific config for Render
COPY next.config.render.js next.config.js

# Build the application
RUN npm run build:safe

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]