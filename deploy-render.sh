#!/bin/bash

# 🚀 Script de Deploy Automatizado para Render.com
# Fenix Academy - Deploy Script

set -e  # Exit on any error

echo "🚀 Iniciando deploy do Fenix Academy no Render.com..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    error "Execute este script na raiz do projeto Fenix Academy"
    exit 1
fi

# Verificar se o git está configurado
if ! git status &> /dev/null; then
    error "Este não é um repositório Git válido"
    exit 1
fi

# Verificar se há mudanças não commitadas
if ! git diff-index --quiet HEAD --; then
    warning "Há mudanças não commitadas. Fazendo commit automático..."
    git add .
    git commit -m "Auto-commit before Render deploy - $(date)"
fi

# Verificar se o branch atual é main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    warning "Você está no branch '$CURRENT_BRANCH'. Mudando para 'main'..."
    git checkout main
fi

# Fazer push das mudanças
log "Fazendo push das mudanças para o GitHub..."
git push origin main

success "Código enviado para o GitHub com sucesso!"

# Verificar se o Render CLI está instalado
if ! command -v render &> /dev/null; then
    warning "Render CLI não encontrado. Instalando..."
    
    # Detectar sistema operacional
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install render
        else
            error "Homebrew não encontrado. Instale o Render CLI manualmente: https://render.com/docs/cli"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://cli.render.com/install.sh | sh
    else
        error "Sistema operacional não suportado. Instale o Render CLI manualmente: https://render.com/docs/cli"
        exit 1
    fi
fi

# Verificar se está logado no Render
if ! render auth whoami &> /dev/null; then
    warning "Você não está logado no Render. Fazendo login..."
    render auth login
fi

log "Render CLI configurado com sucesso!"

# Verificar se os serviços existem
log "Verificando serviços existentes..."

# Listar serviços existentes
EXISTING_SERVICES=$(render services list --format json 2>/dev/null | jq -r '.[].name' 2>/dev/null || echo "")

# Função para verificar se serviço existe
service_exists() {
    local service_name=$1
    echo "$EXISTING_SERVICES" | grep -q "^$service_name$"
}

# Deploy do banco de dados
if ! service_exists "fenix-academy-db"; then
    log "Criando banco de dados PostgreSQL..."
    render services create postgresql \
        --name fenix-academy-db \
        --database fenix_academy \
        --user fenix_user \
        --region oregon \
        --plan starter
    success "Banco de dados criado!"
else
    log "Banco de dados já existe, pulando criação..."
fi

# Deploy do Redis
if ! service_exists "fenix-academy-redis"; then
    log "Criando serviço Redis..."
    render services create redis \
        --name fenix-academy-redis \
        --region oregon \
        --plan starter
    success "Redis criado!"
else
    log "Redis já existe, pulando criação..."
fi

# Deploy do backend
if ! service_exists "fenix-academy-backend"; then
    log "Criando serviço backend Django..."
    render services create web \
        --name fenix-academy-backend \
        --env python \
        --build-command "pip install -r backend/requirements.txt && cd backend && python manage.py collectstatic --noinput && python manage.py migrate" \
        --start-command "cd backend && gunicorn --bind 0.0.0.0:\$PORT --workers 2 --worker-class gevent fenix_academy.wsgi:application" \
        --root-dir backend \
        --region oregon \
        --plan starter
    success "Backend criado!"
else
    log "Backend já existe, fazendo deploy..."
    render services deploy fenix-academy-backend
fi

# Deploy do frontend
if ! service_exists "fenix-academy-frontend"; then
    log "Criando serviço frontend Next.js..."
    render services create web \
        --name fenix-academy-frontend \
        --env node \
        --build-command "cd frontend && npm ci && npm run build" \
        --start-command "cd frontend && npm start" \
        --root-dir frontend \
        --region oregon \
        --plan starter
    success "Frontend criado!"
else
    log "Frontend já existe, fazendo deploy..."
    render services deploy fenix-academy-frontend
fi

# Aguardar serviços ficarem prontos
log "Aguardando serviços ficarem prontos..."
sleep 30

# Verificar status dos serviços
log "Verificando status dos serviços..."

# Backend health check
BACKEND_URL=$(render services get fenix-academy-backend --format json | jq -r '.service.serviceDetails.url')
if curl -f "$BACKEND_URL/health/" &> /dev/null; then
    success "Backend está funcionando: $BACKEND_URL"
else
    warning "Backend pode não estar funcionando corretamente"
fi

# Frontend health check
FRONTEND_URL=$(render services get fenix-academy-frontend --format json | jq -r '.service.serviceDetails.url')
if curl -f "$FRONTEND_URL/api/health" &> /dev/null; then
    success "Frontend está funcionando: $FRONTEND_URL"
else
    warning "Frontend pode não estar funcionando corretamente"
fi

# Mostrar URLs finais
echo ""
echo "🎉 Deploy concluído com sucesso!"
echo ""
echo "📱 URLs dos serviços:"
echo "  Frontend: $FRONTEND_URL"
echo "  Backend:  $BACKEND_URL"
echo ""
echo "🔧 Próximos passos:"
echo "  1. Configure as variáveis de ambiente no painel do Render"
echo "  2. Configure domínio personalizado (opcional)"
echo "  3. Teste todas as funcionalidades"
echo ""
echo "📚 Documentação completa: RENDER_DEPLOY_GUIDE.md"
echo ""

success "Deploy do Fenix Academy no Render.com concluído! 🚀"
