# Aula 3: Load Balancing e Alta Disponibilidade

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Entender os conceitos de load balancing e alta disponibilidade
- Implementar diferentes estratégias de load balancing
- Configurar proxies reversos com Nginx
- Implementar health checks e failover
- Configurar clusters e auto-scaling
- Monitorar e otimizar performance

## 📚 Conteúdo da Aula

### 1. Introdução ao Load Balancing

#### O que é Load Balancing?
Load balancing é a distribuição de carga de trabalho entre múltiplos servidores para otimizar performance, confiabilidade e disponibilidade.

**Benefícios do Load Balancing:**
- **Alta Disponibilidade**: Redundância de servidores
- **Escalabilidade**: Distribuição de carga
- **Performance**: Otimização de recursos
- **Confiabilidade**: Failover automático
- **Manutenção**: Rolling updates sem downtime

#### Tipos de Load Balancing

| Tipo | Descrição | Uso |
|------|-----------|-----|
| **Layer 4** | Transporte (TCP/UDP) | Alta performance |
| **Layer 7** | Aplicação (HTTP/HTTPS) | Roteamento inteligente |
| **DNS** | Resolução de nomes | Distribuição geográfica |
| **Hardware** | Equipamentos dedicados | Enterprise |
| **Software** | Aplicações | Flexibilidade |

### 2. Estratégias de Load Balancing

#### Round Robin
Distribui requisições sequencialmente entre servidores.

```nginx
upstream backend {
    server 192.168.1.10:3000;
    server 192.168.1.11:3000;
    server 192.168.1.12:3000;
}
```

#### Least Connections
Direciona para o servidor com menos conexões ativas.

```nginx
upstream backend {
    least_conn;
    server 192.168.1.10:3000;
    server 192.168.1.11:3000;
    server 192.168.1.12:3000;
}
```

#### IP Hash
Usa hash do IP do cliente para manter sessão.

```nginx
upstream backend {
    ip_hash;
    server 192.168.1.10:3000;
    server 192.168.1.11:3000;
    server 192.168.1.12:3000;
}
```

#### Weighted Round Robin
Atribui pesos diferentes aos servidores.

```nginx
upstream backend {
    server 192.168.1.10:3000 weight=3;
    server 192.168.1.11:3000 weight=2;
    server 192.168.1.12:3000 weight=1;
}
```

### 3. Configuração do Nginx como Load Balancer

#### Instalação do Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx

# macOS
brew install nginx

# Docker
docker run -d -p 80:80 nginx
```

#### Configuração Básica
```nginx
# /etc/nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server 192.168.1.10:3000;
        server 192.168.1.11:3000;
        server 192.168.1.12:3000;
    }

    server {
        listen 80;
        server_name example.com;

        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

#### Configuração Avançada
```nginx
http {
    # Configurações de performance
    worker_processes auto;
    worker_connections 1024;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    upstream backend {
        # Health checks
        server 192.168.1.10:3000 max_fails=3 fail_timeout=30s;
        server 192.168.1.11:3000 max_fails=3 fail_timeout=30s;
        server 192.168.1.12:3000 max_fails=3 fail_timeout=30s;
        
        # Keep-alive connections
        keepalive 32;
    }

    server {
        listen 80;
        server_name api.example.com;

        # Rate limiting
        limit_req zone=api burst=20 nodelay;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";

        location / {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            
            # Timeouts
            proxy_connect_timeout 5s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

### 4. Health Checks e Failover

#### Health Checks no Nginx
```nginx
upstream backend {
    server 192.168.1.10:3000 max_fails=3 fail_timeout=30s;
    server 192.168.1.11:3000 max_fails=3 fail_timeout=30s;
    server 192.168.1.12:3000 max_fails=3 fail_timeout=30s backup;
}
```

#### Health Check Endpoint na Aplicação
```javascript
// Node.js Express
const express = require('express');
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
    const health = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version
    };
    
    res.status(200).json(health);
});

// Readiness check
app.get('/ready', async (req, res) => {
    try {
        // Verificar conexão com banco de dados
        await db.authenticate();
        
        // Verificar outros serviços
        const redisStatus = await redis.ping();
        
        if (redisStatus === 'PONG') {
            res.status(200).json({ status: 'ready' });
        } else {
            res.status(503).json({ status: 'not ready' });
        }
    } catch (error) {
        res.status(503).json({ 
            status: 'not ready', 
            error: error.message 
        });
    }
});

app.listen(3000);
```

#### Health Check com Docker
```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    image: minha-app
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
```

### 5. SSL/TLS e Terminação SSL

#### Configuração SSL no Nginx
```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    # Certificados SSL
    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

#### Let's Encrypt com Certbot
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d example.com -d www.example.com

# Renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 6. Clustering e Auto-Scaling

#### PM2 Cluster Mode
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'minha-app',
    script: './index.js',
    instances: 'max', // Usar todos os CPUs
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Auto-restart
    watch: false,
    max_memory_restart: '1G',
    // Logs
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

```bash
# Iniciar cluster
pm2 start ecosystem.config.js --env production

# Monitorar
pm2 monit

# Escalar
pm2 scale minha-app 4
```

#### Docker Swarm
```yaml
# docker-stack.yml
version: '3.8'

services:
  web:
    image: minha-app:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
    ports:
      - "3000:3000"
    networks:
      - webnet

networks:
  webnet:
    driver: overlay
```

```bash
# Inicializar swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-stack.yml minha-app

# Escalar serviço
docker service scale minha-app_web=5
```

### 7. Monitoramento e Métricas

#### Configuração de Logs
```nginx
http {
    # Log format
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;
}
```

#### Prometheus + Grafana
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro

volumes:
  prometheus_data:
  grafana_data:
```

#### Configuração do Prometheus
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:9113']

  - job_name: 'app'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/metrics'
    scrape_interval: 5s
```

### 8. CDN e Cache

#### Configuração de Cache no Nginx
```nginx
http {
    # Cache configuration
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g 
                     inactive=60m use_temp_path=off;

    server {
        listen 80;
        server_name example.com;

        # Cache static files
        location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header Vary Accept-Encoding;
        }

        # Cache API responses
        location /api/ {
            proxy_cache my_cache;
            proxy_cache_valid 200 302 10m;
            proxy_cache_valid 404 1m;
            proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
            proxy_cache_lock on;
            
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

#### CloudFlare Integration
```javascript
// Middleware para CloudFlare
app.use((req, res, next) => {
    // Verificar se está atrás do CloudFlare
    if (req.headers['cf-connecting-ip']) {
        req.ip = req.headers['cf-connecting-ip'];
    }
    
    // Headers de cache
    res.set('Cache-Control', 'public, max-age=300');
    res.set('CF-Cache-Status', 'HIT');
    
    next();
});
```

### 9. Rate Limiting e DDoS Protection

#### Rate Limiting no Nginx
```nginx
http {
    # Rate limiting zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
    limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;

    server {
        listen 80;
        server_name api.example.com;

        # Rate limiting por IP
        limit_req zone=api burst=20 nodelay;
        limit_conn conn_limit_per_ip 10;

        # Rate limiting para login
        location /login {
            limit_req zone=login burst=5 nodelay;
            proxy_pass http://backend;
        }

        # Rate limiting para uploads
        location /upload {
            limit_req zone=api burst=5 nodelay;
            client_max_body_size 10M;
            proxy_pass http://backend;
        }
    }
}
```

#### DDoS Protection
```nginx
http {
    # Limitar conexões simultâneas
    limit_conn_zone $binary_remote_addr zone=perip:10m;
    limit_conn_zone $server_name zone=perserver:10m;

    # Limitar requisições
    limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;

    server {
        listen 80;
        server_name example.com;

        # Aplicar limites
        limit_conn perip 10;
        limit_conn perserver 100;
        limit_req zone=req_limit_per_ip burst=10 nodelay;

        # Timeouts
        client_body_timeout 10s;
        client_header_timeout 10s;
        keepalive_timeout 5s 5s;
        send_timeout 10s;

        # Buffer limits
        client_body_buffer_size 128k;
        client_header_buffer_size 1k;
        client_max_body_size 8m;
        large_client_header_buffers 4 4k;
    }
}
```

### 10. Blue-Green Deployment

#### Estratégia Blue-Green
```yaml
# docker-compose.blue.yml
version: '3.8'

services:
  web-blue:
    image: minha-app:blue
    ports:
      - "3001:3000"
    environment:
      - ENV=blue
    networks:
      - blue

networks:
  blue:
    driver: bridge
```

```yaml
# docker-compose.green.yml
version: '3.8'

services:
  web-green:
    image: minha-app:green
    ports:
      - "3002:3000"
    environment:
      - ENV=green
    networks:
      - green

networks:
  green:
    driver: bridge
```

#### Script de Deploy
```bash
#!/bin/bash
# deploy.sh

CURRENT_ENV=$(docker ps --format "table {{.Names}}" | grep web | head -1 | cut -d'-' -f2)
NEW_ENV=""

if [ "$CURRENT_ENV" = "blue" ]; then
    NEW_ENV="green"
else
    NEW_ENV="blue"
fi

echo "Current environment: $CURRENT_ENV"
echo "Deploying to: $NEW_ENV"

# Build new image
docker build -t minha-app:$NEW_ENV .

# Start new environment
docker-compose -f docker-compose.$NEW_ENV.yml up -d

# Health check
echo "Waiting for health check..."
sleep 30

# Test new environment
if curl -f http://localhost:300$([ "$NEW_ENV" = "blue" ] && echo "1" || echo "2")/health; then
    echo "New environment is healthy"
    
    # Update load balancer
    sed -i "s/300$([ "$CURRENT_ENV" = "blue" ] && echo "1" || echo "2"):3000/300$([ "$NEW_ENV" = "blue" ] && echo "1" || echo "2"):3000/g" nginx.conf
    nginx -s reload
    
    # Stop old environment
    docker-compose -f docker-compose.$CURRENT_ENV.yml down
    
    echo "Deployment successful!"
else
    echo "Health check failed, rolling back..."
    docker-compose -f docker-compose.$NEW_ENV.yml down
    exit 1
fi
```

### 11. Canary Deployment

#### Configuração Canary
```nginx
upstream backend {
    # Produção (90% do tráfego)
    server 192.168.1.10:3000 weight=9;
    
    # Canary (10% do tráfego)
    server 192.168.1.11:3000 weight=1;
}

# Roteamento baseado em header
map $http_x_canary $backend_pool {
    default backend;
    "true" backend_canary;
}

upstream backend_canary {
    server 192.168.1.11:3000;
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://$backend_pool;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Script de Canary Deploy
```bash
#!/bin/bash
# canary-deploy.sh

CANARY_WEIGHT=${1:-10}  # Default 10%

echo "Starting canary deployment with $CANARY_WEIGHT% traffic"

# Update nginx configuration
sed -i "s/weight=[0-9]*/weight=$((100 - CANARY_WEIGHT))/g" nginx.conf
sed -i "s/weight=[0-9]*/weight=$CANARY_WEIGHT/g" nginx.conf

# Reload nginx
nginx -s reload

echo "Canary deployment started. Monitoring for 5 minutes..."

# Monitor for 5 minutes
for i in {1..30}; do
    sleep 10
    
    # Check error rate
    ERROR_RATE=$(curl -s http://localhost/nginx_status | grep -o 'error_rate=[0-9.]*' | cut -d'=' -f2)
    
    if (( $(echo "$ERROR_RATE > 0.05" | bc -l) )); then
        echo "Error rate too high ($ERROR_RATE), rolling back..."
        # Rollback logic
        sed -i "s/weight=$CANARY_WEIGHT/weight=0/g" nginx.conf
        sed -i "s/weight=$((100 - CANARY_WEIGHT))/weight=100/g" nginx.conf
        nginx -s reload
        exit 1
    fi
    
    echo "Error rate: $ERROR_RATE (iteration $i/30)"
done

echo "Canary deployment successful!"
```

### 12. Projeto Prático: Sistema de Alta Disponibilidade

#### Arquitetura do Sistema
```
                    [Internet]
                         |
                    [Load Balancer]
                         |
        +----------------+----------------+
        |                |                |
   [Web Server 1]  [Web Server 2]  [Web Server 3]
        |                |                |
        +----------------+----------------+
                         |
                    [Database Cluster]
```

#### docker-compose.yml Completo
```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - web1
      - web2
      - web3
    networks:
      - frontend

  web1:
    image: minha-app:latest
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=postgres1
    depends_on:
      - postgres1
      - redis
    networks:
      - frontend
      - backend

  web2:
    image: minha-app:latest
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=postgres2
    depends_on:
      - postgres2
      - redis
    networks:
      - frontend
      - backend

  web3:
    image: minha-app:latest
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=postgres3
    depends_on:
      - postgres3
      - redis
    networks:
      - frontend
      - backend

  postgres1:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres1_data:/var/lib/postgresql/data
    networks:
      - backend

  postgres2:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres2_data:/var/lib/postgresql/data
    networks:
      - backend

  postgres3:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres3_data:/var/lib/postgresql/data
    networks:
      - backend

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - backend

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    networks:
      - monitoring

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - monitoring

volumes:
  postgres1_data:
  postgres2_data:
  postgres3_data:
  redis_data:
  prometheus_data:
  grafana_data:

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
  monitoring:
    driver: bridge
```

## 🎯 Exercícios Práticos

### Exercício 1: Load Balancer Básico
1. Configure um load balancer com Nginx
2. Implemente diferentes estratégias de balanceamento
3. Teste failover automático

### Exercício 2: Health Checks
1. Implemente endpoints de health check na aplicação
2. Configure health checks no load balancer
3. Teste cenários de falha

### Exercício 3: SSL/TLS
1. Configure SSL/TLS no Nginx
2. Implemente redirect HTTP para HTTPS
3. Configure HSTS

### Exercício 4: Monitoramento
1. Configure Prometheus e Grafana
2. Implemente métricas customizadas
3. Crie dashboards de monitoramento

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Load Balancing**: Conceitos e estratégias
2. **Nginx**: Configuração como load balancer
3. **Health Checks**: Implementação e failover
4. **SSL/TLS**: Terminação SSL e segurança
5. **Clustering**: PM2 e Docker Swarm
6. **Monitoramento**: Prometheus e Grafana
7. **Cache**: Configuração de cache
8. **Rate Limiting**: Proteção contra DDoS
9. **Deployments**: Blue-Green e Canary
10. **Alta Disponibilidade**: Arquitetura completa

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- **Monitoramento Avançado**: APM e observabilidade
- **Logging**: Centralização e análise de logs
- **Alertas**: Configuração de alertas
- **Performance**: Otimização e tuning
- **Backup**: Estratégias de backup

## 📚 Recursos Adicionais

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Docker Swarm](https://docs.docker.com/engine/swarm/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)

---

**🎉 Parabéns!** Você completou a Aula 3 do Módulo 7. Continue praticando e explore as possibilidades da alta disponibilidade!







