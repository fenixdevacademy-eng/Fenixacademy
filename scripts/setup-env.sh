#!/bin/bash

# Script para configurar arquivos .env
echo "🔧 Configurando arquivos .env..."

# Backend
if [ ! -f "backend/.env" ]; then
    echo "📄 Criando backend/.env..."
    cp backend/env.local backend/.env
    echo "✅ backend/.env criado"
else
    echo "⚠️  backend/.env já existe"
fi

# Frontend
if [ ! -f "frontend/.env" ]; then
    echo "📄 Criando frontend/.env..."
    cp frontend/env.local frontend/.env
    echo "✅ frontend/.env criado"
else
    echo "⚠️  frontend/.env já existe"
fi

# Verificar se as chaves Stripe estão configuradas
echo "🔍 Verificando configurações do Stripe..."

if grep -q "pk_live_51QRj4yALIQ8ei57qNfshH4EmsiIU8nHRIlXWcqoNIR6Pw0wM8hphlFCyz2xnHZ0b599sGvZ45CIwIXmJD2PiKjRw00ysyulgiF" backend/.env; then
    echo "✅ Chave pública do Stripe configurada no backend"
else
    echo "❌ Chave pública do Stripe não encontrada no backend"
fi

if grep -q "pk_live_51QRj4yALIQ8ei57qNfshH4EmsiIU8nHRIlXWcqoNIR6Pw0wM8hphlFCyz2xnHZ0b599sGvZ45CIwIXmJD2PiKjRw00ysyulgiF" frontend/.env; then
    echo "✅ Chave pública do Stripe configurada no frontend"
else
    echo "❌ Chave pública do Stripe não encontrada no frontend"
fi

echo ""
echo "📋 Próximos passos:"
echo "1. Configure as chaves secretas do Stripe em backend/.env"
echo "2. Configure as credenciais de email em backend/.env"
echo "3. Configure as credenciais AWS (opcional) em backend/.env"
echo "4. Execute: docker-compose up --build"
echo ""
echo "✅ Configuração de ambiente concluída!" 