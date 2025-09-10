#!/bin/bash

# 🚀 Script de Deploy Automático - Fenix IDE
# Uso: ./deploy.sh [vercel|netlify|railway]

set -e

echo "🌟 Iniciando deploy do Fenix IDE..."

# 🎨 Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 📋 Função para mostrar status
show_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

show_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

show_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

show_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 🔧 Verificar dependências
check_dependencies() {
    show_status "Verificando dependências..."
    
    if ! command -v node &> /dev/null; then
        show_error "Node.js não encontrado. Instale Node.js 18+ primeiro."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        show_error "npm não encontrado. Instale npm primeiro."
        exit 1
    fi
    
    show_success "Dependências verificadas!"
}

# 🧹 Limpar build anterior
clean_build() {
    show_status "Limpando build anterior..."
    
    if [ -d ".next" ]; then
        rm -rf .next
        show_success "Build anterior removido"
    fi
    
    if [ -d "node_modules" ]; then
        show_warning "Removendo node_modules para build limpo..."
        rm -rf node_modules
    fi
}

# 📦 Instalar dependências
install_dependencies() {
    show_status "Instalando dependências..."
    npm install
    show_success "Dependências instaladas!"
}

# 🏗️ Build de produção
build_project() {
    show_status "Fazendo build de produção..."
    npm run build
    
    if [ $? -eq 0 ]; then
        show_success "Build concluído com sucesso!"
    else
        show_error "Erro no build. Verifique os logs."
        exit 1
    fi
}

# 🧪 Testar build
test_build() {
    show_status "Testando build..."
    
    # Verificar se o build foi criado
    if [ -d ".next" ]; then
        show_success "Build criado corretamente"
    else
        show_error "Build não foi criado"
        exit 1
    fi
    
    # Verificar se há erros de linting
    show_status "Verificando linting..."
    npm run lint || show_warning "Linting com warnings (não crítico)"
}

# 🚀 Deploy no Vercel
deploy_vercel() {
    show_status "Deployando no Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        show_status "Instalando Vercel CLI..."
        npm install -g vercel
    fi
    
    show_status "Fazendo deploy..."
    vercel --prod
    
    show_success "Deploy no Vercel concluído!"
}

# 🌐 Deploy no Netlify
deploy_netlify() {
    show_status "Deployando no Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        show_status "Instalando Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    show_status "Fazendo deploy..."
    netlify deploy --prod --dir=.next
    
    show_success "Deploy no Netlify concluído!"
}

# 🚂 Deploy no Railway
deploy_railway() {
    show_status "Deployando no Railway..."
    
    if ! command -v railway &> /dev/null; then
        show_status "Instalando Railway CLI..."
        npm install -g @railway/cli
    fi
    
    show_status "Fazendo deploy..."
    railway up
    
    show_success "Deploy no Railway concluído!"
}

# 📊 Mostrar métricas
show_metrics() {
    show_status "Métricas do projeto:"
    
    # Tamanho do build
    if [ -d ".next" ]; then
        BUILD_SIZE=$(du -sh .next | cut -f1)
        echo "   📦 Tamanho do build: $BUILD_SIZE"
    fi
    
    # Número de arquivos
    FILE_COUNT=$(find .next -type f | wc -l)
    echo "   📁 Arquivos gerados: $FILE_COUNT"
    
    # Dependências
    DEP_COUNT=$(npm list --depth=0 | grep -c "├──" || echo "0")
    echo "   🔗 Dependências: $DEP_COUNT"
}

# 🎯 Função principal
main() {
    local platform=${1:-vercel}
    
    echo "🎯 Plataforma de deploy: $platform"
    echo "=================================="
    
    # Executar etapas
    check_dependencies
    clean_build
    install_dependencies
    build_project
    test_build
    show_metrics
    
    # Deploy baseado na plataforma
    case $platform in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "railway")
            deploy_railway
            ;;
        *)
            show_error "Plataforma não suportada: $platform"
            show_status "Plataformas suportadas: vercel, netlify, railway"
            exit 1
            ;;
    esac
    
    echo ""
    show_success "🎉 Deploy concluído com sucesso!"
    show_status "Próximos passos:"
    echo "   1. Configure seu domínio personalizado"
    echo "   2. Configure variáveis de ambiente"
    echo "   3. Implemente monitoramento"
    echo "   4. Configure CI/CD"
}

# 🚀 Executar script
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi








