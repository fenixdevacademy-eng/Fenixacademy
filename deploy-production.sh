#!/bin/bash

# 🚀 Script de Deploy de Produção - Fenix Academy
# Deploy completo para toda a aplicação (Frontend + Backend + Database + Monitoring)

set -e

echo "🌟 Iniciando deploy de PRODUÇÃO da Fenix Academy..."

# 🎨 Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

show_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

show_progress() {
    echo -e "${CYAN}[PROGRESS]${NC} $1"
}

# 🔧 Verificar dependências
check_dependencies() {
    show_step "Verificando dependências do sistema..."
    
    # Verificar Docker
    if ! command -v docker &> /dev/null; then
        show_error "Docker não encontrado. Instale Docker primeiro."
        exit 1
    fi
    
    # Verificar Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        show_error "Docker Compose não encontrado. Instale Docker Compose primeiro."
        exit 1
    fi
    
    # Verificar se Docker está rodando
    if ! docker info &> /dev/null; then
        show_error "Docker não está rodando. Inicie o Docker primeiro."
        exit 1
    fi
    
    show_success "Dependências verificadas!"
}

# 🧹 Limpar ambiente anterior
clean_environment() {
    show_step "Limpando ambiente anterior..."
    
    # Parar containers existentes
    if docker-compose -f docker-compose.production.yml ps -q | grep -q .; then
        show_status "Parando containers existentes..."
        docker-compose -f docker-compose.production.yml down
    fi
    
    # Remover volumes antigos (opcional)
    if [ "$1" = "--clean-volumes" ]; then
        show_warning "Removendo volumes antigos..."
        docker volume prune -f
    fi
    
    show_success "Ambiente limpo!"
}

# 🔐 Verificar variáveis de ambiente
check_environment() {
    show_step "Verificando variáveis de ambiente..."
    
    if [ ! -f ".env" ]; then
        show_error "Arquivo .env não encontrado!"
        show_status "Copie env.production para .env e configure as variáveis"
        exit 1
    fi
    
    # Verificar variáveis críticas
    source .env
    
    required_vars=(
        "SECRET_KEY"
        "POSTGRES_PASSWORD"
        "STRIPE_SECRET_KEY"
        "STRIPE_PUBLISHABLE_KEY"
        "NEXT_PUBLIC_API_URL"
        "NEXT_PUBLIC_APP_URL"
    )
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            show_error "Variável $var não está configurada!"
            exit 1
        fi
    done
    
    show_success "Variáveis de ambiente verificadas!"
}

# 🏗️ Build das imagens
build_images() {
    show_step "Fazendo build das imagens Docker..."
    
    show_progress "Build do Backend..."
    docker-compose -f docker-compose.production.yml build backend
    
    show_progress "Build do Frontend..."
    docker-compose -f docker-compose.production.yml build frontend
    
    show_progress "Build do Nginx..."
    docker-compose -f docker-compose.production.yml build nginx
    
    show_success "Imagens construídas com sucesso!"
}

# 🚀 Deploy dos serviços
deploy_services() {
    show_step "Iniciando deploy dos serviços..."
    
    # Deploy em ordem de dependência
    show_progress "Deploy do PostgreSQL..."
    docker-compose -f docker-compose.production.yml up -d postgres
    
    show_progress "Aguardando PostgreSQL estar pronto..."
    sleep 30
    
    show_progress "Deploy do Redis..."
    docker-compose -f docker-compose.production.yml up -d redis
    
    show_progress "Aguardando Redis estar pronto..."
    sleep 15
    
    show_progress "Deploy do Backend..."
    docker-compose -f docker-compose.production.yml up -d backend
    
    show_progress "Aguardando Backend estar pronto..."
    sleep 45
    
    show_progress "Deploy do Celery..."
    docker-compose -f docker-compose.production.yml up -d celery celery-beat
    
    show_progress "Deploy do Frontend..."
    docker-compose -f docker-compose.production.yml up -d frontend
    
    show_progress "Deploy do Nginx..."
    docker-compose -f docker-compose.production.yml up -d nginx
    
    show_progress "Deploy do Monitoring..."
    docker-compose -f docker-compose.production.yml up -d prometheus grafana
    
    show_progress "Deploy do Backup..."
    docker-compose -f docker-compose.production.yml up -d backup
    
    show_success "Todos os serviços foram deployados!"
}

# 🧪 Verificar saúde dos serviços
health_check() {
    show_step "Verificando saúde dos serviços..."
    
    services=(
        "postgres"
        "redis"
        "backend"
        "frontend"
        "nginx"
        "prometheus"
        "grafana"
    )
    
    for service in "${services[@]}"; do
        show_progress "Verificando $service..."
        
        if docker-compose -f docker-compose.production.yml ps $service | grep -q "Up"; then
            show_success "$service está rodando"
        else
            show_error "$service não está rodando!"
            return 1
        fi
    done
    
    show_success "Todos os serviços estão saudáveis!"
}

# 📊 Mostrar status dos serviços
show_status() {
    show_step "Status dos serviços:"
    
    echo ""
    docker-compose -f docker-compose.production.yml ps
    
    echo ""
    show_status "Logs dos serviços:"
    echo "Para ver logs: docker-compose -f docker-compose.production.yml logs [serviço]"
    echo "Para ver logs em tempo real: docker-compose -f docker-compose.production.yml logs -f [serviço]"
}

# 🔄 Backup automático
setup_backup() {
    show_step "Configurando backup automático..."
    
    # Criar diretório de backup
    mkdir -p backups
    
    # Criar script de backup
    cat > scripts/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="fenix_academy_$DATE.sql"

echo "Iniciando backup: $BACKUP_FILE"

# Backup do PostgreSQL
pg_dump -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB > $BACKUP_DIR/$BACKUP_FILE

# Comprimir backup
gzip $BACKUP_DIR/$BACKUP_FILE

# Remover backups antigos (manter apenas 30 dias)
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup concluído: $BACKUP_FILE.gz"
EOF
    
    chmod +x scripts/backup.sh
    show_success "Backup configurado!"
}

# 🛡️ Configurar firewall e segurança
setup_security() {
    show_step "Configurando segurança..."
    
    # Criar arquivo de configuração do Nginx para produção
    cat > nginx/nginx.prod.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Logs
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    
    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
    
    # Upstreams
    upstream backend {
        server backend:8000;
    }
    
    upstream frontend {
        server frontend:3000;
    }
    
    # HTTP -> HTTPS redirect
    server {
        listen 80;
        server_name fenixdevacademy.com www.fenixdevacademy.com;
        return 301 https://$server_name$request_uri;
    }
    
    # HTTPS
    server {
        listen 443 ssl http2;
        server_name fenixdevacademy.com www.fenixdevacademy.com;
        
        # SSL
        ssl_certificate /etc/nginx/ssl/fenixdevacademy.com.crt;
        ssl_certificate_key /etc/nginx/ssl/fenixdevacademy.com.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        
        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        
        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # API
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # Admin
        location /admin/ {
            limit_req zone=login burst=10 nodelay;
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # Static files
        location /static/ {
            alias /var/www/static/;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # Media files
        location /media/ {
            alias /var/www/media/;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF
    
    show_success "Segurança configurada!"
}

# 📈 Configurar monitoramento
setup_monitoring() {
    show_step "Configurando monitoramento..."
    
    # Configuração do Prometheus
    cat > monitoring/prometheus.prod.yml << 'EOF'
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "*.rules"

scrape_configs:
  - job_name: 'fenix-backend'
    static_configs:
      - targets: ['backend:8000']
    metrics_path: '/metrics/'
    
  - job_name: 'fenix-frontend'
    static_configs:
      - targets: ['frontend:3000']
    metrics_path: '/metrics'
    
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres:5432']
    
  - job_name: 'redis'
    static_configs:
      - targets: ['redis:6379']
EOF
    
    show_success "Monitoramento configurado!"
}

# 🎯 Função principal
main() {
    local clean_volumes=${1:-false}
    
    echo "🎯 Deploy de PRODUÇÃO da Fenix Academy"
    echo "======================================"
    
    # Executar etapas
    check_dependencies
    clean_environment $clean_volumes
    check_environment
    setup_security
    setup_monitoring
    setup_backup
    build_images
    deploy_services
    
    # Aguardar serviços estarem prontos
    show_status "Aguardando serviços estarem prontos..."
    sleep 60
    
    # Verificar saúde
    if health_check; then
        show_success "🎉 Deploy de PRODUÇÃO concluído com sucesso!"
        show_status
        
        echo ""
        echo "🌐 URLs de acesso:"
        echo "   Frontend: https://fenixdevacademy.com"
        echo "   API: https://api.fenixdevacademy.com"
        echo "   Admin: https://fenixdevacademy.com/admin/"
        echo "   Grafana: http://localhost:3001"
        echo "   Prometheus: http://localhost:9090"
        
        echo ""
        echo "📋 Comandos úteis:"
        echo "   Ver logs: docker-compose -f docker-compose.production.yml logs -f"
        echo "   Parar: docker-compose -f docker-compose.production.yml down"
        echo "   Reiniciar: docker-compose -f docker-compose.production.yml restart"
        echo "   Status: docker-compose -f docker-compose.production.yml ps"
        
    else
        show_error "❌ Deploy falhou! Verifique os logs."
        exit 1
    fi
}

# 🚀 Executar script
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi








