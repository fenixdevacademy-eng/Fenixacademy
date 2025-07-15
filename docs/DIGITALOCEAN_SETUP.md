# DigitalOcean Setup Guide

Este guia explica como configurar e fazer deploy da Fênix Dev Academy no DigitalOcean.

## Pré-requisitos

1. Conta no DigitalOcean
2. DigitalOcean CLI (doctl) instalado
3. Docker e Docker Compose instalados localmente
4. Chave SSH configurada

## 1. Configuração do DigitalOcean

### 1.1 Criar Container Registry

```bash
# Autenticar no DigitalOcean
doctl auth init

# Criar container registry
doctl registry create fenix-dev-academy --subscription-tier basic
```

### 1.2 Criar Droplet

```bash
# Criar droplet com Docker
doctl compute droplet create fenix-dev-academy \
  --size s-2vcpu-4gb \
  --image docker-20-04 \
  --region nyc1 \
  --ssh-keys $(doctl compute ssh-key list --format ID --no-header) \
  --wait
```

### 1.3 Configurar Firewall

```bash
# Criar firewall
doctl compute firewall create \
  --name fenix-firewall \
  --inbound-rules "protocol:tcp,ports:22,address:0.0.0.0/0 protocol:tcp,ports:80,address:0.0.0.0/0 protocol:tcp,ports:443,address:0.0.0.0/0" \
  --outbound-rules "protocol:tcp,ports:all,address:0.0.0.0/0 protocol:udp,ports:all,address:0.0.0.0/0 protocol:icmp,address:0.0.0.0/0"

# Aplicar firewall ao droplet
doctl compute firewall add-droplets $(doctl compute firewall list --format ID --no-header) \
  --droplet-ids $(doctl compute droplet list --format ID --no-header)
```

## 2. Configuração do Droplet

### 2.1 Conectar ao Droplet

```bash
# Obter IP do droplet
DROPLET_IP=$(doctl compute droplet list --format PublicIPv4 --no-header)

# Conectar via SSH
ssh root@$DROPLET_IP
```

### 2.2 Instalar Dependências

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Instalar nginx (para SSL termination)
apt install -y nginx certbot python3-certbot-nginx

# Criar diretório do projeto
mkdir -p /opt/fenix-dev-academy
cd /opt/fenix-dev-academy
```

### 2.3 Configurar SSL

```bash
# Configurar nginx para SSL
cat > /etc/nginx/sites-available/fenix-dev-academy << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Habilitar site
ln -s /etc/nginx/sites-available/fenix-dev-academy /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Obter certificado SSL
certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 3. Configuração do GitHub Actions

### 3.1 Configurar Secrets

No repositório GitHub, vá em Settings > Secrets and variables > Actions e adicione:

```
DIGITALOCEAN_ACCESS_TOKEN=your_do_token
DIGITALOCEAN_REGISTRY=fenix-dev-academy
DIGITALOCEAN_HOST=your_droplet_ip
DIGITALOCEAN_USERNAME=root
DIGITALOCEAN_PORT=22
DIGITALOCEAN_SSH_KEY=your_ssh_private_key

DJANGO_SECRET_KEY=your_django_secret_key
ALLOWED_HOSTS=your-domain.com,www.your-domain.com,your_droplet_ip
DATABASE_URL=postgresql://user:password@localhost:5432/fenix_academy
REDIS_URL=redis://localhost:6379/0

STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_email_password

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_STORAGE_BUCKET_NAME=your_bucket_name
AWS_S3_REGION_NAME=us-east-1

FIREBASE_CREDENTIALS=your_firebase_credentials_json

CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

SLACK_WEBHOOK_URL=your_slack_webhook_url
```

### 3.2 Configurar Branch Protection

1. Vá em Settings > Branches
2. Adicione rule para `main` ou `master`
3. Marque "Require status checks to pass before merging"
4. Selecione o workflow "Deploy to DigitalOcean"

## 4. Deploy Manual

### 4.1 Usando o Script

```bash
# Tornar script executável
chmod +x scripts/deploy.sh

# Deploy completo
./scripts/deploy.sh --droplet-ip YOUR_DROPLET_IP

# Apenas build
./scripts/deploy.sh --droplet-ip YOUR_DROPLET_IP --skip-push --skip-deploy

# Apenas deploy (sem rebuild)
./scripts/deploy.sh --droplet-ip YOUR_DROPLET_IP --skip-build --skip-push
```

### 4.2 Usando Docker Compose

```bash
# No droplet
cd /opt/fenix-dev-academy

# Fazer login no registry
doctl registry login

# Pull e deploy
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Migrations
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
```

## 5. Monitoramento

### 5.1 Logs

```bash
# Ver logs de todos os serviços
docker-compose -f docker-compose.prod.yml logs -f

# Ver logs de um serviço específico
docker-compose -f docker-compose.prod.yml logs -f backend
```

### 5.2 Status dos Containers

```bash
# Ver status dos containers
docker-compose -f docker-compose.prod.yml ps

# Ver uso de recursos
docker stats
```

### 5.3 Backup

```bash
# Backup do banco de dados
docker-compose -f docker-compose.prod.yml exec db pg_dump -U fenix_user fenix_academy > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup dos volumes
docker run --rm -v fenix-dev-academy_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .
```

## 6. Troubleshooting

### 6.1 Problemas Comuns

**Container não inicia:**
```bash
# Ver logs detalhados
docker-compose -f docker-compose.prod.yml logs backend

# Verificar variáveis de ambiente
docker-compose -f docker-compose.prod.yml config
```

**Problemas de conectividade:**
```bash
# Verificar se as portas estão abertas
netstat -tlnp | grep :80
netstat -tlnp | grep :443

# Verificar firewall
ufw status
```

**Problemas de SSL:**
```bash
# Renovar certificado SSL
certbot renew

# Verificar certificado
openssl s_client -connect your-domain.com:443 -servername your-domain.com
```

### 6.2 Comandos Úteis

```bash
# Reiniciar todos os serviços
docker-compose -f docker-compose.prod.yml restart

# Parar todos os serviços
docker-compose -f docker-compose.prod.yml down

# Remover volumes (CUIDADO!)
docker-compose -f docker-compose.prod.yml down -v

# Limpar imagens não utilizadas
docker image prune -f

# Ver uso de disco
df -h
du -sh /opt/fenix-dev-academy/*
```

## 7. Custos Estimados

- **Droplet (s-2vcpu-4gb)**: ~$24/mês
- **Container Registry**: ~$5/mês
- **Domain**: ~$12/ano
- **SSL Certificate**: Gratuito (Let's Encrypt)

**Total estimado**: ~$29/mês

## 8. Próximos Passos

1. Configurar monitoramento com Prometheus/Grafana
2. Implementar backup automático
3. Configurar CDN para assets estáticos
4. Implementar rate limiting
5. Configurar alertas de uptime 