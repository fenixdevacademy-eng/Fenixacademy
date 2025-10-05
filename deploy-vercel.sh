#!/bin/bash

echo "🚀 Iniciando deploy otimizado para Vercel..."

# Verificar se estamos no diretório correto
if [ ! -d "frontend" ]; then
    echo "❌ Diretório frontend não encontrado!"
    exit 1
fi

# Navegar para o diretório frontend
cd frontend

# Limpar cache e node_modules
echo "🧹 Limpando cache e dependências..."
rm -rf .next
rm -rf node_modules
rm -rf .turbo

# Instalar dependências
echo "📦 Instalando dependências..."
npm install --production

# Fazer build
echo "🔨 Fazendo build do projeto..."
npm run build

# Verificar se o build foi bem-sucedido
if [ ! -d ".next" ]; then
    echo "❌ Build falhou!"
    exit 1
fi

echo "✅ Build concluído com sucesso!"

# Voltar para o diretório raiz
cd ..

# Fazer deploy
echo "🚀 Fazendo deploy para Vercel..."
vercel --prod

echo "🎉 Deploy concluído!"
