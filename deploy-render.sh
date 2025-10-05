#!/bin/bash

echo "🚀 Iniciando deploy para Render..."

# Verificar se estamos no diretório correto
if [ ! -d "frontend" ]; then
    echo "❌ Diretório frontend não encontrado!"
    exit 1
fi

# Navegar para o diretório frontend
cd frontend

# Limpar cache e dependências
echo "🧹 Limpando cache e dependências..."
npm cache clean --force
rm -rf .next out node_modules/.cache .turbo

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

# Fazer commit e push para o repositório
echo "📤 Fazendo commit e push para o repositório..."
git add .
git commit -m "Deploy para Render - $(date)"
git push origin main

echo "🎉 Deploy para Render iniciado!"
echo "📋 Acesse o dashboard do Render para acompanhar o progresso"
