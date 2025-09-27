#!/bin/bash

# 🚀 Deploy Automático para FenixDevAcademy.com.br
# Script otimizado para deploy rápido e correto

set -e

echo "🚀 FENIX DEV ACADEMY - DEPLOY AUTOMÁTICO"
echo "========================================"
echo "Domínio: fenixdevacademy.com.br"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# 1. Verificar Vercel CLI
if ! command -v vercel &> /dev/null; then
    error "Vercel CLI não encontrado! Instalando..."
    npm install -g vercel
fi

# 2. Login no Vercel (se necessário)
if ! vercel whoami &> /dev/null; then
    log "Fazendo login no Vercel..."
    vercel login
fi

# 3. Limpar cache e instalar dependências
log "Limpando cache e instalando dependências..."
cd frontend
rm -rf .next node_modules/.cache
npm ci --production=false
success "Dependências instaladas!"

# 4. Build otimizado
log "Fazendo build otimizado..."
NODE_ENV=production npm run build
success "Build concluído!"

# 5. Deploy no Vercel
log "Deployando no Vercel..."
vercel --prod --yes --name fenix-dev-academy
success "Deploy concluído!"

# 6. Configurar domínio personalizado
log "Configurando domínio fenixdevacademy.com.br..."
vercel domains add fenixdevacademy.com.br || echo "Domínio já configurado ou erro na configuração"

# 7. Verificar status
log "Verificando status do deploy..."
vercel ls

# 8. Testar endpoints
log "Testando endpoints..."
echo "Testando API de saúde..."
curl -s https://fenixdevacademy.com.br/api/health || echo "API não disponível ainda"

echo "Testando API de monitoramento..."
curl -s https://fenixdevacademy.com.br/api/monitoring || echo "API não disponível ainda"

# 9. Resumo final
echo ""
echo "🎉 DEPLOY CONCLUÍDO!"
echo "==================="
echo "🌐 Site: https://fenixdevacademy.com.br"
echo "🔧 Admin: https://fenixdevacademy.com.br/admin"
echo "📊 API: https://fenixdevacademy.com.br/api"
echo "💳 Pagamentos: https://fenixdevacademy.com.br/payments"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Verificar se o site está funcionando"
echo "2. Testar sistema de pagamentos"
echo "3. Configurar webhooks do Stripe"
echo "4. Verificar SSL/HTTPS"
echo ""

success "FenixDevAcademy está no ar! 🚀"

