# Guia de Deployment - Fenix Academy

## Visão Geral

Este guia descreve o processo completo de deployment da Fenix Academy, incluindo configuração de ambiente, CI/CD, monitoramento e manutenção.

## 🏗️ Arquitetura da Infraestrutura

### Componentes
- **Backend**: Django REST API (Python 3.10)
- **Frontend**: Next.js (React)
- **Database**: PostgreSQL 13
- **Cache**: Redis 6
- **Web Server**: Nginx
- **Container Orchestration**: Docker Compose
- **Monitoring**: Prometheus + Grafana
- **CI/CD**: GitHub Actions

### Infraestrutura de Produção
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   Web Server    │    │   Application   │
│   (Nginx)       │───▶│   (Nginx)       │───▶│   (Django)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Database      │    │   Cache         │
                       │   (PostgreSQL)  │    │   (Redis)       │
                       └─────────────────┘    └─────────────────┘
```

## 🚀 Processo de Deployment

### 1. Pré-requisitos

#### Servidor de Produção
- Ubuntu 20.04 LTS ou superior
- 4GB RAM mínimo (8GB recomendado)
- 50GB SSD
- Docker e Docker Compose instalados
- Git instalado

#### Configuração do Servidor
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Criar usuário para aplicação
sudo useradd -m -s /bin/bash fenix
sudo usermod -aG docker fenix
```

### 2. Configuração de Ambiente

#### Variáveis de Ambiente
Criar arquivo `.env` no servidor:
```bash
# Database
DATABASE_URL=postgresql://fenix:password@localhost:5432/fenix_academy
POSTGRES_DB=fenix_academy
POSTGRES_USER=fenix
POSTGRES_PASSWORD=secure_password_here

# Redis
REDIS_URL=redis://localhost:6379/0

# Django
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Monitoring
PROMETHEUS_ENABLED=True
GRAFANA_ENABLED=True
```

#### Configuração do Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Frontend
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static files
    location /static/ {
        alias /app/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Media files
    location /media/ {
        alias /app/media/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3. Deployment Automatizado

#### Configuração do GitHub Actions
O pipeline de CI/CD está configurado em `.github/workflows/ci-cd-enhanced.yml` e inclui:

1. **Análise de Segurança**
   - Scan de vulnerabilidades com Trivy
   - Análise de dependências com Safety
   - CodeQL para análise de código

2. **Testes**
   - Testes unitários (Python e JavaScript)
   - Testes de integração
   - Cobertura de código
   - Testes de performance

3. **Build e Push**
   - Build de imagens Docker
   - Push para DigitalOcean Container Registry
   - Cache de layers para builds mais rápidos

4. **Deployment**
   - Deploy automático para staging (branch develop)
   - Deploy automático para produção (branch main)
   - Health checks e rollback automático

#### Secrets Necessários
Configurar no GitHub Repository Settings > Secrets:

```bash
# DigitalOcean
DIGITALOCEAN_ACCESS_TOKEN=your-do-token
DIGITALOCEAN_REGISTRY_NAME=your-registry-name

# Servidor de Produção
DROPLET_HOST=your-server-ip
DROPLET_USERNAME=fenix
DROPLET_SSH_KEY=your-private-key

# Servidor de Staging
STAGING_HOST=your-staging-ip
STAGING_USERNAME=fenix
STAGING_SSH_KEY=your-private-key

# Slack Notifications
SLACK_WEBHOOK_URL=your-slack-webhook
```

### 4. Deployment Manual

#### Primeiro Deployment
```bash
# 1. Clonar repositório
git clone https://github.com/your-username/fenix-academy.git
cd fenix-academy

# 2. Configurar variáveis de ambiente
cp env.prod.example .env
# Editar .env com suas configurações

# 3. Executar deployment
chmod +x scripts/deploy-enhanced.sh
./scripts/deploy-enhanced.sh $(git rev-parse HEAD) production
```

#### Deployments Subsequentes
```bash
# Atualizar código
git pull origin main

# Executar deployment
./scripts/deploy-enhanced.sh $(git rev-parse HEAD) production
```

## 📊 Monitoramento e Observabilidade

### Prometheus
- **Endpoint**: `http://your-domain.com:9090`
- **Métricas coletadas**:
  - Response time
  - Request rate
  - Error rate
  - Database connections
  - Memory usage
  - CPU usage

### Grafana
- **Endpoint**: `http://your-domain.com:3000`
- **Dashboards**:
  - System Overview
  - Application Metrics
  - Business Metrics
  - Error Tracking

### Alertas
Configurados no AlertManager:
- **Críticos**: Falha de aplicação, database down
- **Avisos**: Alta latência, alto uso de memória
- **Notificações**: Slack, Email

### Logs
```bash
# Ver logs da aplicação
docker-compose -f docker-compose.prod.yml logs -f backend

# Ver logs do nginx
docker-compose -f docker-compose.prod.yml logs -f nginx

# Ver logs de todos os serviços
docker-compose -f docker-compose.prod.yml logs -f
```

## 🔧 Manutenção

### Backup
```bash
# Backup automático diário
0 2 * * * /opt/fenix-academy/scripts/backup.sh

# Backup manual
./scripts/backup.sh
```

### Atualizações
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Atualizar Docker
sudo apt install docker-ce docker-ce-cli containerd.io

# Limpar imagens antigas
docker image prune -f
```

### Troubleshooting

#### Verificar Status dos Serviços
```bash
# Status dos containers
docker-compose -f docker-compose.prod.yml ps

# Health check
curl -f http://localhost/api/health/

# Verificar logs de erro
docker-compose -f docker-compose.prod.yml logs --tail=100 backend | grep ERROR
```

#### Problemas Comuns

1. **Aplicação não responde**
   ```bash
   # Verificar se containers estão rodando
   docker-compose -f docker-compose.prod.yml ps
   
   # Reiniciar serviços
   docker-compose -f docker-compose.prod.yml restart
   ```

2. **Database connection error**
   ```bash
   # Verificar se PostgreSQL está rodando
   docker-compose -f docker-compose.prod.yml logs postgres
   
   # Verificar variáveis de ambiente
   docker-compose -f docker-compose.prod.yml exec backend env | grep DATABASE
   ```

3. **Alto uso de memória**
   ```bash
   # Verificar uso de recursos
   docker stats
   
   # Limpar cache
   docker system prune -f
   ```

## 🔒 Segurança

### SSL/TLS
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Firewall
```bash
# Configurar UFW
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Atualizações de Segurança
```bash
# Atualizações automáticas
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

## 📈 Performance

### Otimizações
- **CDN**: Cloudflare para assets estáticos
- **Cache**: Redis para sessões e cache
- **Compression**: Gzip para todos os assets
- **Database**: Índices otimizados
- **Images**: Otimização automática de imagens

### Métricas de Performance
- **Response Time**: < 200ms (95th percentile)
- **Throughput**: > 1000 req/s
- **Uptime**: > 99.9%
- **Error Rate**: < 0.1%

## 🚨 Rollback

### Rollback Automático
O script de deployment inclui rollback automático em caso de falha:
```bash
# Rollback manual se necessário
./scripts/rollback.sh <backup-path>
```

### Pontos de Restauração
- Backups diários automáticos
- Snapshots do servidor
- Versionamento de configurações

## 📞 Suporte

### Contatos
- **DevOps**: devops@fenixacademy.com
- **Emergências**: +55 (11) 99999-9999
- **Documentação**: https://docs.fenixacademy.com

### Escalação
1. **Nível 1**: Monitoramento automático
2. **Nível 2**: DevOps team
3. **Nível 3**: CTO/Lead Developer

---

**Última atualização**: $(date)
**Versão**: 1.0.0 