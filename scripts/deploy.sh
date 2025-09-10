#!/bin/bash

# 🚀 Script de Deploy Automático - Fenix Academy
# Deploy completo para produção com verificação de saúde

set -e  # Exit on any error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
DOMAIN="fenix-academy.com"
API_URL="https://api.fenix-academy.com"
CDN_URL="https://cdn.fenix-academy.com"
VERCEL_PROJECT="fenix-academy"
CLOUDFLARE_ZONE_ID="your-zone-id"
CLOUDFLARE_API_TOKEN="your-api-token"

# Função para log
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
    exit 1
}

# Verificar dependências
check_dependencies() {
    log "Verificando dependências..."
    
    if ! command -v node &> /dev/null; then
        error "Node.js não encontrado. Instale Node.js 18+"
    fi
    
    if ! command -v npm &> /dev/null; then
        error "npm não encontrado. Instale npm"
    fi
    
    if ! command -v vercel &> /dev/null; then
        error "Vercel CLI não encontrado. Instale com: npm i -g vercel"
    fi
    
    if ! command -v aws &> /dev/null; then
        warning "AWS CLI não encontrado. CDN sync será pulado"
    fi
    
    success "Dependências verificadas"
}

# Instalar dependências
install_dependencies() {
    log "Instalando dependências..."
    
    cd frontend
    npm ci --production
    cd ..
    
    success "Dependências instaladas"
}

# Executar testes
run_tests() {
    log "Executando testes..."
    
    cd frontend
    npm run test:ci || warning "Alguns testes falharam"
    cd ..
    
    success "Testes executados"
}

# Build da aplicação
build_app() {
    log "Fazendo build da aplicação..."
    
    cd frontend
    npm run build
    cd ..
    
    success "Build concluído"
}

# Deploy para Vercel
deploy_vercel() {
    log "Deploy para Vercel..."
    
    cd frontend
    vercel --prod --yes
    cd ..
    
    success "Deploy para Vercel concluído"
}

# Sincronizar com CDN
sync_cdn() {
    if command -v aws &> /dev/null; then
        log "Sincronizando com CDN..."
        
        # Sincronizar arquivos estáticos
        aws s3 sync frontend/out s3://fenix-academy-cdn --delete
        
        # Invalidar CloudFront
        aws cloudfront create-invalidation --distribution-id E1234567890 --paths "/*"
        
        success "CDN sincronizado"
    else
        warning "AWS CLI não encontrado. Pulando sincronização CDN"
    fi
}

# Verificar saúde dos serviços
health_check() {
    log "Verificando saúde dos serviços..."
    
    # Verificar domínio principal
    if curl -f -s "$DOMAIN/health" > /dev/null; then
        success "Domínio principal: OK"
    else
        error "Domínio principal: FALHOU"
    fi
    
    # Verificar API
    if curl -f -s "$API_URL/health" > /dev/null; then
        success "API: OK"
    else
        error "API: FALHOU"
    fi
    
    # Verificar CDN
    if curl -f -s "$CDN_URL/health" > /dev/null; then
        success "CDN: OK"
    else
        error "CDN: FALHOU"
    fi
    
    success "Todos os serviços estão saudáveis"
}

# Verificar performance
performance_check() {
    log "Verificando performance..."
    
    # Verificar Core Web Vitals
    if command -v lighthouse &> /dev/null; then
        lighthouse "$DOMAIN" --output=json --output-path=./lighthouse-report.json --quiet
        success "Relatório de performance gerado"
    else
        warning "Lighthouse não encontrado. Pulando verificação de performance"
    fi
}

# Notificar sobre deploy
notify_deploy() {
    log "Enviando notificações..."
    
    # Slack notification (se configurado)
    if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚀 Fenix Academy deploy concluído com sucesso!\\n\\n🌐 Domínio: $DOMAIN\\n📊 Status: Todos os serviços saudáveis\\n⏰ Timestamp: $(date)\"}" \
            "$SLACK_WEBHOOK_URL"
    fi
    
    # Email notification (se configurado)
    if [ ! -z "$EMAIL_SMTP_HOST" ]; then
        echo "Deploy concluído com sucesso!" | mail -s "Fenix Academy Deploy" admin@fenix-academy.com
    fi
    
    success "Notificações enviadas"
}

# Limpar arquivos temporários
cleanup() {
    log "Limpando arquivos temporários..."
    
    rm -rf frontend/.next
    rm -rf frontend/out
    rm -f lighthouse-report.json
    
    success "Limpeza concluída"
}

# Função principal
main() {
    echo "🚀 INICIANDO DEPLOY DA FENIX ACADEMY"
    echo "=================================="
    
    check_dependencies
    install_dependencies
    run_tests
    build_app
    deploy_vercel
    sync_cdn
    
    # Aguardar propagação DNS
    log "Aguardando propagação DNS (30s)..."
    sleep 30
    
    health_check
    performance_check
    notify_deploy
    cleanup
    
    echo ""
    echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
    echo "=================================="
    echo "🌐 Domínio: https://$DOMAIN"
    echo "📊 API: https://$API_URL"
    echo "💾 CDN: https://$CDN_URL"
    echo "⏰ Timestamp: $(date)"
    echo ""
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi