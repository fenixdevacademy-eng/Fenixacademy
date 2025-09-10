#!/bin/bash

# 🚀 Deploy Script for Fenix Academy - Vercel
# Este script automatiza o deploy completo no Vercel

set -e

echo "🚀 FENIX ACADEMY - DEPLOY NO VERCEL"
echo "=================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    error "Vercel CLI não encontrado!"
    log "Instalando Vercel CLI..."
    npm install -g vercel
    success "Vercel CLI instalado!"
fi

# Verificar se está logado no Vercel
if ! vercel whoami &> /dev/null; then
    warning "Você não está logado no Vercel!"
    log "Fazendo login..."
    vercel login
fi

# 1. Preparar ambiente
log "Preparando ambiente..."

# Instalar dependências do frontend
log "Instalando dependências do frontend..."
cd frontend
npm install
success "Dependências do frontend instaladas!"

# Build do frontend
log "Fazendo build do frontend..."
npm run build
success "Build do frontend concluído!"

cd ..

# 2. Configurar variáveis de ambiente
log "Configurando variáveis de ambiente..."

# Verificar se o arquivo .env.local existe
if [ ! -f "frontend/.env.local" ]; then
    warning "Arquivo .env.local não encontrado!"
    log "Copiando arquivo de exemplo..."
    cp frontend/env.example frontend/.env.local
    warning "Configure as variáveis de ambiente em frontend/.env.local"
fi

# 3. Deploy no Vercel
log "Iniciando deploy no Vercel..."

# Deploy do frontend
cd frontend
vercel --prod --yes
success "Deploy do frontend concluído!"

# 4. Configurar domínio personalizado (opcional)
read -p "Deseja configurar um domínio personalizado? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Digite o domínio (ex: fenixacademy.com.br): " DOMAIN
    if [ ! -z "$DOMAIN" ]; then
        log "Configurando domínio personalizado: $DOMAIN"
        vercel domains add $DOMAIN
        success "Domínio configurado!"
    fi
fi

# 5. Configurar webhooks do Stripe
log "Configurando webhooks do Stripe..."

# Obter URL do projeto
PROJECT_URL=$(vercel ls --json | jq -r '.[0].url')
WEBHOOK_URL="https://$PROJECT_URL/api/webhooks/stripe"

echo "Webhook URL: $WEBHOOK_URL"
echo "Configure este URL no painel do Stripe:"
echo "1. Acesse https://dashboard.stripe.com/webhooks"
echo "2. Clique em 'Add endpoint'"
echo "3. Cole a URL: $WEBHOOK_URL"
echo "4. Selecione os eventos: payment_intent.succeeded, payment_intent.payment_failed"
echo "5. Copie o webhook secret e adicione ao .env.local"

# 6. Verificar deploy
log "Verificando deploy..."
vercel ls
success "Deploy verificado!"

# 7. Abrir no navegador
read -p "Deseja abrir o site no navegador? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel open
fi

# 8. Resumo final
echo ""
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
echo "================================"
echo "Frontend: https://$PROJECT_URL"
echo "Admin: https://$PROJECT_URL/admin"
echo "API: https://$PROJECT_URL/api"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Configure as variáveis de ambiente no painel do Vercel"
echo "2. Configure os webhooks do Stripe"
echo "3. Configure os pixels de tracking"
echo "4. Teste todas as funcionalidades"
echo "5. Configure o domínio personalizado"
echo ""
echo "🔗 Links úteis:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Stripe Dashboard: https://dashboard.stripe.com"
echo "- Documentação: https://vercel.com/docs"
echo ""

success "Fenix Academy está no ar! 🚀"
