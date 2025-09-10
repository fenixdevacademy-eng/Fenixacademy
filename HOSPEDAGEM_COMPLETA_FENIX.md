# 🚀 HOSPEDAGEM COMPLETA - FENIX ACADEMY

## 🌟 **VISÃO GERAL DA HOSPEDAGEM**

A **Fenix Academy** é uma aplicação completa que inclui:
- 🎨 **Frontend**: Next.js com Monaco Editor e IDE avançado
- 🔧 **Backend**: Django REST API com sistema completo de cursos
- 🗄️ **Database**: PostgreSQL com dados de usuários e cursos
- 🔴 **Cache**: Redis para performance
- 📊 **Monitoring**: Prometheus + Grafana
- 🛡️ **Security**: Nginx com SSL e headers de segurança
- 🔄 **Background Tasks**: Celery para processamento assíncrono
- 💾 **Storage**: AWS S3 para arquivos de mídia
- 💳 **Payments**: Stripe para pagamentos

## 🏠 **OPÇÕES DE HOSPEDAGEM RECOMENDADAS**

### **1. 🌟 VERCEL + DIGITAL OCEAN (Recomendado)**
- **Frontend**: Vercel (gratuito)
- **Backend + Database**: Digital Ocean Droplet ($12/mês)
- **Storage**: Digital Ocean Spaces ($5/mês)
- **Total**: ~$17/mês

### **2. 🌐 AWS (Escalável)**
- **Frontend**: S3 + CloudFront (~$1/mês)
- **Backend**: EC2 t3.small (~$15/mês)
- **Database**: RDS PostgreSQL (~$15/mês)
- **Storage**: S3 (~$1/mês)
- **Total**: ~$32/mês

### **3. 🚂 RAILWAY (Simples)**
- **Tudo em um lugar**: $20/mês
- **Deploy automático**
- **SSL gratuito**

### **4. ☁️ GOOGLE CLOUD (Profissional)**
- **Frontend**: Cloud Run (~$5/mês)
- **Backend**: Cloud Run (~$10/mês)
- **Database**: Cloud SQL (~$25/mês)
- **Storage**: Cloud Storage (~$2/mês)
- **Total**: ~$42/mês

## 🎯 **HOSPEDAGEM RECOMENDADA: VERCEL + DIGITAL OCEAN**

### **Passo 1: Preparar o Projeto**

#### **1.1 Configurar Variáveis de Ambiente**
```bash
# Copiar arquivo de exemplo
cp env.production .env

# Editar com suas configurações reais
nano .env
```

#### **1.2 Configurações Críticas**
```env
# URLs de Produção
NEXT_PUBLIC_API_URL=https://api.fenixdevacademy.com
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com

# Banco de Dados
POSTGRES_PASSWORD=sua-senha-super-segura
DATABASE_URL=postgresql://fenix_user:sua-senha@seu-servidor:5432/fenix_academy

# Stripe (Pagamentos)
STRIPE_SECRET_KEY=sk_live_sua-chave-secreta
STRIPE_PUBLISHABLE_KEY=pk_live_sua-chave-publica

# AWS S3 (Storage)
AWS_ACCESS_KEY_ID=sua-aws-key
AWS_SECRET_ACCESS_KEY=sua-aws-secret
AWS_STORAGE_BUCKET_NAME=fenix-academy-media
```

### **Passo 2: Deploy do Frontend no Vercel**

#### **2.1 Preparar Frontend**
```bash
cd frontend

# Build de produção
npm run build

# Testar localmente
npm start
```

#### **2.2 Deploy no Vercel**
1. **Conectar GitHub:**
   ```bash
   git add .
   git commit -m "Preparando para deploy no Vercel"
   git push origin main
   ```

2. **Configurar Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "New Project"
   - Selecione o repositório `fenix-academy`
   - Configure as variáveis de ambiente
   - Clique em "Deploy"

3. **Configurar Domínio:**
   - Vá em "Settings" → "Domains"
   - Adicione: `fenixdevacademy.com`
   - Configure DNS conforme instruções

### **Passo 3: Deploy do Backend no Digital Ocean**

#### **3.1 Criar Droplet**
1. **Acesse [digitalocean.com](https://digitalocean.com)**
2. **Criar Droplet:**
   - **Image**: Ubuntu 22.04 LTS
   - **Size**: Basic → Regular → $12/mês (2GB RAM, 1 CPU)
   - **Region**: São Paulo (mais próximo do Brasil)
   - **Authentication**: SSH Key (recomendado)

#### **3.2 Configurar Servidor**
```bash
# Conectar via SSH
ssh root@seu-ip-servidor

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Criar usuário para aplicação
adduser fenix
usermod -aG docker fenix
```

#### **3.3 Deploy da Aplicação**
```bash
# Mudar para usuário fenix
su - fenix

# Clonar repositório
git clone https://github.com/seu-usuario/fenix-academy.git
cd fenix-academy

# Configurar variáveis de ambiente
cp env.production .env
nano .env

# Executar deploy
chmod +x deploy-production.sh
./deploy-production.sh
```

### **Passo 4: Configurar DNS e SSL**

#### **4.1 Configurar DNS**
```bash
# No seu provedor de domínio, configure:

# A Record
fenixdevacademy.com → IP do seu servidor Digital Ocean

# CNAME Record
www.fenixdevacademy.com → fenixdevacademy.com

# A Record para API
api.fenixdevacademy.com → IP do seu servidor Digital Ocean
```

#### **4.2 Configurar SSL com Let's Encrypt**
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot --nginx -d fenixdevacademy.com -d www.fenixdevacademy.com -d api.fenixdevacademy.com

# Renovar automaticamente
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

### **Passo 5: Configurar Backup e Monitoramento**

#### **5.1 Backup Automático**
```bash
# O script já configura backup automático
# Backups são salvos em ./backups/
# Retenção: 30 dias
```

#### **5.2 Monitoramento**
```bash
# Grafana: http://seu-ip:3001
# Usuário: admin
# Senha: admin123 (configurada no .env)

# Prometheus: http://seu-ip:9090
```

## 🔧 **CONFIGURAÇÕES AVANÇADAS**

### **1. 🚀 Otimizações de Performance**

#### **1.1 Nginx**
```nginx
# Ativar Gzip
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# Cache de arquivos estáticos
location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### **1.2 Django**
```python
# settings/production.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Compressão de templates
COMPRESS_ENABLED = True
COMPRESS_CSS_FILTERS = ['compressor.filters.css_default.CssAbsoluteFilter', 'compressor.filters.cssmin.rCSSMinFilter']
```

#### **1.3 Next.js**
```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  optimizeFonts: true,
  images: {
    domains: ['seu-bucket-s3.amazonaws.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### **2. 🛡️ Segurança**

#### **2.1 Headers de Segurança**
```nginx
# Nginx
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";
```

#### **2.2 Rate Limiting**
```nginx
# Limitar requisições à API
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20 nodelay;

# Limitar tentativas de login
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req zone=login burst=10 nodelay;
```

#### **2.3 Firewall**
```bash
# Configurar UFW
sudo ufw enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 3306/tcp   # MySQL (se não usar)
sudo ufw deny 5432/tcp   # PostgreSQL (se não usar)
```

### **3. 📊 Monitoramento e Alertas**

#### **3.1 Grafana Dashboards**
```json
{
  "dashboard": {
    "title": "Fenix Academy - Produção",
    "panels": [
      {
        "title": "CPU Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "100 - (avg(irate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)"
          }
        ]
      },
      {
        "title": "Memory Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100"
          }
        ]
      }
    ]
  }
}
```

#### **3.2 Alertas Prometheus**
```yaml
# prometheus/rules/alerts.yml
groups:
  - name: fenix-academy
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "CPU usage is high"
          description: "CPU usage is above 80% for 5 minutes"
```

## 🚨 **TROUBLESHOOTING**

### **1. 🔍 Problemas Comuns**

#### **1.1 Frontend não carrega**
```bash
# Verificar logs do Vercel
# Verificar variáveis de ambiente
# Verificar se a API está acessível

# Testar API
curl https://api.fenixdevacademy.com/health/
```

#### **1.2 Backend não responde**
```bash
# Verificar logs
docker-compose -f docker-compose.production.yml logs backend

# Verificar se o banco está rodando
docker-compose -f docker-compose.production.yml ps postgres

# Verificar conectividade
docker exec -it fenix_backend_prod ping postgres
```

#### **1.3 Banco de dados não conecta**
```bash
# Verificar se PostgreSQL está rodando
docker-compose -f docker-compose.production.yml ps postgres

# Verificar logs
docker-compose -f docker-compose.production.yml logs postgres

# Testar conexão
docker exec -it fenix_postgres_prod psql -U fenix_user -d fenix_academy
```

### **2. 🔧 Comandos Úteis**

#### **2.1 Gerenciar Serviços**
```bash
# Ver status
docker-compose -f docker-compose.production.yml ps

# Ver logs
docker-compose -f docker-compose.production.yml logs -f

# Reiniciar serviço
docker-compose -f docker-compose.production.yml restart backend

# Parar tudo
docker-compose -f docker-compose.production.yml down

# Iniciar tudo
docker-compose -f docker-compose.production.yml up -d
```

#### **2.2 Backup e Restore**
```bash
# Backup manual
docker exec fenix_postgres_prod pg_dump -U fenix_user fenix_academy > backup_manual.sql

# Restore
docker exec -i fenix_postgres_prod psql -U fenix_user fenix_academy < backup_manual.sql

# Backup automático (configurado)
ls -la backups/
```

## 📈 **ESCALABILIDADE**

### **1. 🚀 Escalar Horizontalmente**

#### **1.1 Load Balancer**
```nginx
# Nginx com múltiplos backends
upstream backend {
    server backend1:8000;
    server backend2:8000;
    server backend3:8000;
}
```

#### **1.2 Docker Swarm**
```bash
# Inicializar swarm
docker swarm init

# Deploy com replicas
docker stack deploy -c docker-compose.production.yml fenix
```

### **2. ☁️ Migração para Cloud**

#### **2.1 AWS ECS**
```yaml
# ecs-task-definition.json
{
  "family": "fenix-academy",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "fenix-backend:latest",
      "portMappings": [{"containerPort": 8000}]
    }
  ]
}
```

#### **2.2 Google Cloud Run**
```bash
# Deploy no Cloud Run
gcloud run deploy fenix-backend \
  --image gcr.io/seu-projeto/fenix-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🎉 **RESULTADO FINAL**

### **✅ O que você terá:**

1. **🌐 Frontend**: https://fenixdevacademy.com
2. **🔧 API**: https://api.fenixdevacademy.com
3. **👨‍💼 Admin**: https://fenixdevacademy.com/admin/
4. **📊 Monitoramento**: Grafana + Prometheus
5. **🔄 Backup**: Automático diário
6. **🛡️ Segurança**: SSL + Headers + Rate Limiting
7. **📈 Performance**: Cache + Gzip + CDN
8. **🚀 Escalabilidade**: Docker + Load Balancer

### **💰 Custos Mensais Estimados:**

- **Digital Ocean Droplet**: $12/mês
- **Digital Ocean Spaces**: $5/mês
- **Domínio**: $10/ano
- **SSL**: Gratuito (Let's Encrypt)
- **Total**: ~$17/mês

### **🚀 Próximos Passos:**

1. **✅ Configurar variáveis de ambiente**
2. **✅ Deploy no Vercel (Frontend)**
3. **✅ Deploy no Digital Ocean (Backend)**
4. **✅ Configurar DNS e SSL**
5. **✅ Configurar monitoramento**
6. **✅ Implementar backup automático**
7. **✅ Configurar CI/CD**
8. **✅ Otimizar performance**

---

**🎯 Dica:** Use o script `deploy-production.sh` para automatizar todo o processo de deploy!

**🌟 Sucesso:** Sua Fenix Academy estará rodando profissionalmente em produção!








