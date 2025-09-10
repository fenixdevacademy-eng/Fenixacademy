#!/bin/bash

# 🚀 Script de Deploy - Fenix Academy
# Domínio: fenixdevacademy.com

set -e

echo "🌐 FENIX ACADEMY - DEPLOY AUTOMATIZADO"
echo "======================================"
echo "Domínio: fenixdevacademy.com"
echo "Data: $(date)"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
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

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    error "Execute este script na raiz do projeto Fenix Academy"
    exit 1
fi

log "Iniciando processo de deploy..."

# 1. Verificar dependências
log "Verificando dependências..."
if ! command -v vercel &> /dev/null; then
    warning "Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
fi

if ! command -v git &> /dev/null; then
    error "Git não encontrado. Instale o Git primeiro."
    exit 1
fi

success "Dependências verificadas"

# 2. Verificar se há mudanças não commitadas
log "Verificando mudanças não commitadas..."
if [ -n "$(git status --porcelain)" ]; then
    warning "Há mudanças não commitadas. Fazendo commit automático..."
    git add .
    git commit -m "Deploy automático - $(date)"
fi

success "Repositório atualizado"

# 3. Build da aplicação
log "Fazendo build da aplicação..."
npm run build

if [ $? -eq 0 ]; then
    success "Build concluído com sucesso"
else
    error "Erro no build. Verifique os logs acima."
    exit 1
fi

# 4. Deploy no Vercel
log "Fazendo deploy no Vercel..."
vercel --prod --yes

if [ $? -eq 0 ]; then
    success "Deploy no Vercel concluído"
else
    error "Erro no deploy do Vercel"
    exit 1
fi

# 5. Configurar domínio personalizado
log "Configurando domínio personalizado..."
vercel domains add fenixdevacademy.com

# 6. Verificar status do deploy
log "Verificando status do deploy..."
vercel ls

# 7. Testar aplicação
log "Testando aplicação..."
if curl -s -o /dev/null -w "%{http_code}" https://fenixdevacademy.com | grep -q "200"; then
    success "Aplicação está online e funcionando!"
else
    warning "Aplicação pode não estar totalmente disponível ainda. Aguarde alguns minutos."
fi

# 8. Configurar variáveis de ambiente
log "Configurando variáveis de ambiente..."
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_ANALYTICS_ID production

# 9. Configurar redirecionamentos
log "Configurando redirecionamentos..."
cat > vercel.json << EOF
{
  "redirects": [
    {
      "source": "http://fenixdevacademy.com/(.*)",
      "destination": "https://fenixdevacademy.com/\$1",
      "permanent": true
    },
    {
      "source": "http://www.fenixdevacademy.com/(.*)",
      "destination": "https://fenixdevacademy.com/\$1",
      "permanent": true
    },
    {
      "source": "https://www.fenixdevacademy.com/(.*)",
      "destination": "https://fenixdevacademy.com/\$1",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ]
}
EOF

# 10. Deploy final com configurações
log "Fazendo deploy final com configurações..."
vercel --prod

# 11. Verificar SSL
log "Verificando SSL..."
if curl -s -I https://fenixdevacademy.com | grep -q "HTTP/2 200"; then
    success "SSL configurado e funcionando!"
else
    warning "SSL pode não estar totalmente configurado ainda. Aguarde alguns minutos."
fi

# 12. Resumo final
echo ""
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
echo "================================="
echo "🌐 URL: https://fenixdevacademy.com"
echo "📊 Dashboard: https://vercel.com/dashboard"
echo "🔧 Logs: vercel logs"
echo "📈 Analytics: https://vercel.com/analytics"
echo ""

# 13. Próximos passos
echo "📋 PRÓXIMOS PASSOS:"
echo "==================="
echo "1. Configurar DNS no seu provedor de domínio"
echo "2. Configurar Cloudflare (opcional)"
echo "3. Testar todas as funcionalidades"
echo "4. Configurar monitoramento"
echo "5. Configurar backup automático"
echo ""

# 14. Comandos úteis
echo "🛠️  COMANDOS ÚTEIS:"
echo "==================="
echo "vercel logs                    # Ver logs da aplicação"
echo "vercel env ls                  # Listar variáveis de ambiente"
echo "vercel domains ls              # Listar domínios"
echo "vercel inspect                 # Inspecionar deploy"
echo "vercel rollback                # Fazer rollback se necessário"
echo ""

success "Deploy da Fenix Academy concluído!"
success "Acesse: https://fenixdevacademy.com"

exit 0

