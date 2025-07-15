# CI/CD Pipeline Guide - Fênix Dev Academy

Este guia explica como configurar e usar o pipeline de CI/CD para deploy automático no DigitalOcean.

## 🚀 Visão Geral

O pipeline de CI/CD está configurado para:
- **Testes automáticos** em cada PR
- **Build e push** de imagens Docker
- **Deploy automático** para DigitalOcean
- **Notificações** via Slack
- **Health checks** após deploy

## 📋 Pré-requisitos

### 1. DigitalOcean
- Conta no DigitalOcean
- Container Registry criado
- Droplet configurado
- Token de API

### 2. GitHub
- Repositório configurado
- Secrets configurados
- Branch protection rules

### 3. Local
- Docker instalado
- DigitalOcean CLI (doctl)
- SSH key configurada

## 🔧 Configuração

### 1. Secrets do GitHub

Configure os seguintes secrets no repositório GitHub:

```bash
# DigitalOcean
DIGITALOCEAN_ACCESS_TOKEN=your_do_token
DIGITALOCEAN_REGISTRY=fenix-dev-academy
DIGITALOCEAN_HOST=your_droplet_ip
DIGITALOCEAN_USERNAME=root
DIGITALOCEAN_PORT=22
DIGITALOCEAN_SSH_KEY=your_ssh_private_key

# Django
DJANGO_SECRET_KEY=your_django_secret_key
ALLOWED_HOSTS=your-domain.com,www.your-domain.com,your_droplet_ip

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fenix_academy
REDIS_URL=redis://localhost:6379/0

# Stripe
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_email_password

# AWS/S3 (opcional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_STORAGE_BUCKET_NAME=your_bucket_name
AWS_S3_REGION_NAME=us-east-1

# Firebase (opcional)
FIREBASE_CREDENTIALS=your_firebase_credentials_json

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# Notificações
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

### 2. Configuração do Droplet

```bash
# Conectar ao droplet
ssh root@your_droplet_ip

# Criar diretório do projeto
mkdir -p /opt/fenix-dev-academy
cd /opt/fenix-dev-academy

# Configurar .env
nano .env
# Adicionar todas as variáveis de ambiente

# Configurar SSL (se necessário)
certbot --nginx -d your-domain.com
```

## 🔄 Workflow do Pipeline

### 1. Trigger
O pipeline é executado quando:
- Push para `main` ou `master`
- Pull Request para `main` ou `master`

### 2. Jobs

#### Test Job
```yaml
- Executa testes do backend (Django)
- Executa testes do frontend (Next.js)
- Build do frontend
- Cache de dependências
```

#### Build and Push Job
```yaml
- Build das imagens Docker
- Push para DigitalOcean Container Registry
- Cache de layers Docker
```

#### Deploy Job
```yaml
- SSH para o droplet
- Pull das novas imagens
- Deploy com docker-compose
- Migrations do banco
- Collect static files
- Health check
```

#### Notify Job
```yaml
- Notificação de sucesso/falha no Slack
- Status do deploy
```

## 🛠️ Uso

### Deploy Automático
1. Faça push para `main` ou `master`
2. O pipeline executa automaticamente
3. Monitore o progresso no GitHub Actions
4. Receba notificação no Slack

### Deploy Manual
```bash
# Usando o script local
./scripts/deploy.sh --droplet-ip YOUR_DROPLET_IP

# Apenas build
./scripts/deploy.sh --droplet-ip YOUR_DROPLET_IP --skip-push --skip-deploy

# Apenas deploy
./scripts/deploy.sh --droplet-ip YOUR_DROPLET_IP --skip-build --skip-push
```

### Rollback
```bash
# No droplet
cd /opt/fenix-dev-academy

# Voltar para versão anterior
docker-compose -f docker-compose.prod.yml down
docker tag registry.digitalocean.com/fenix-dev-academy/fenix-dev-academy-backend:previous_sha registry.digitalocean.com/fenix-dev-academy/fenix-dev-academy-backend:latest
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoramento

### Logs
```bash
# Ver logs de todos os serviços
docker-compose -f docker-compose.prod.yml logs -f

# Ver logs de um serviço específico
docker-compose -f docker-compose.prod.yml logs -f backend
```

### Status
```bash
# Status dos containers
docker-compose -f docker-compose.prod.yml ps

# Health check
curl http://your-domain.com/health/
```

### Métricas
```bash
# Uso de recursos
docker stats

# Uso de disco
df -h
du -sh /opt/fenix-dev-academy/*
```

## 🔍 Troubleshooting

### Problemas Comuns

#### Build Falha
```bash
# Verificar logs do build
docker build -f backend/Dockerfile.prod ./backend

# Verificar dependências
pip install -r backend/requirements.txt
```

#### Deploy Falha
```bash
# Verificar conectividade SSH
ssh -i ~/.ssh/id_rsa root@your_droplet_ip

# Verificar logs do nginx
docker-compose -f docker-compose.prod.yml logs nginx

# Verificar variáveis de ambiente
docker-compose -f docker-compose.prod.yml config
```

#### Health Check Falha
```bash
# Verificar se os serviços estão rodando
docker-compose -f docker-compose.prod.yml ps

# Verificar logs dos serviços
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs frontend

# Verificar conectividade
curl -f http://localhost:8000/health/
curl -f http://localhost:3000/
```

### Comandos Úteis

```bash
# Reiniciar todos os serviços
docker-compose -f docker-compose.prod.yml restart

# Parar todos os serviços
docker-compose -f docker-compose.prod.yml down

# Limpar imagens não utilizadas
docker image prune -f

# Backup do banco
docker-compose -f docker-compose.prod.yml exec db pg_dump -U fenix_user fenix_academy > backup.sql
```

## 🔒 Segurança

### SSL/TLS
- Certificados Let's Encrypt automáticos
- HSTS habilitado
- Cipher suites modernos

### Headers de Segurança
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Content-Security-Policy
- Referrer-Policy

### Rate Limiting
- API: 10 requests/segundo
- Login: 5 requests/minuto

### Firewall
- Portas 22, 80, 443 abertas
- Resto bloqueado

## 📈 Otimizações

### Performance
- Gzip compression
- Cache de arquivos estáticos
- Keep-alive connections
- Buffer optimization

### Docker
- Multi-stage builds
- Layer caching
- Image optimization
- Health checks

### Nginx
- Worker processes otimizados
- Connection pooling
- Static file serving
- Proxy buffering

## 🚨 Alertas

### Configurar Alertas
1. **Uptime Monitoring**: UptimeRobot ou Pingdom
2. **Error Tracking**: Sentry
3. **Performance**: New Relic ou DataDog
4. **Logs**: ELK Stack ou Papertrail

### Notificações
- Slack para deploy status
- Email para erros críticos
- SMS para downtime

## 📚 Recursos Adicionais

### Documentação
- [DigitalOcean Container Registry](https://docs.digitalocean.com/products/container-registry/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx](https://nginx.org/en/docs/)

### Ferramentas
- [doctl](https://docs.digitalocean.com/reference/doctl/)
- [Docker](https://docs.docker.com/)
- [GitHub CLI](https://cli.github.com/)

### Monitoramento
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)
- [Sentry](https://sentry.io/)
- [UptimeRobot](https://uptimerobot.com/) 