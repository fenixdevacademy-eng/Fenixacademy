# Dockerfile sem cache para resolver problemas de build
FROM node:18-alpine

WORKDIR /app

# Limpar cache do npm
RUN npm cache clean --force

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies sem cache
RUN npm install --no-cache

# Copy source code
COPY . .

# Limpar qualquer cache existente
RUN rm -rf .next out node_modules/.cache .turbo dist build

# Build sem cache
RUN npm run build:safe

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]