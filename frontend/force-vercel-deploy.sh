#!/bin/bash
# Force Vercel Deploy Script
echo "🚀 Forçando deploy no Vercel..."

# Limpar cache local
rm -rf .next
rm -rf node_modules/.cache

# Instalar dependências
npm install

# Gerar Prisma
npx prisma generate

# Build forçado
npm run build

echo "✅ Build concluído! O Vercel deve detectar as mudanças agora."
