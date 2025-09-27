#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Conteúdo real para DevOps Docker - Fenix Team
"""

def get_devops_docker_real_content():
    """Conteúdo real e específico para DevOps Docker"""
    return """
## 🐳 DEVOPS COM DOCKER

### 🚀 Introdução ao DevOps

DevOps é uma cultura que combina desenvolvimento (Dev) e operações (Ops) para acelerar a entrega de software com qualidade e confiabilidade.

**Princípios do DevOps:**
- **Automação**: Automatizar processos repetitivos
- **Integração Contínua**: Integrar código frequentemente
- **Entrega Contínua**: Implantar automaticamente
- **Monitoramento**: Observar e melhorar continuamente
- **Colaboração**: Trabalho em equipe entre Dev e Ops

**Ciclo de Vida DevOps:**
1. **Plan**: Planejamento e definição de requisitos
2. **Code**: Desenvolvimento de código
3. **Build**: Compilação e empacotamento
4. **Test**: Testes automatizados
5. **Deploy**: Implantação em ambientes
6. **Operate**: Operação e monitoramento
7. **Monitor**: Coleta de feedback e métricas

### 🐳 Docker - Containerização

**O que é Docker:**
Docker é uma plataforma para desenvolver, enviar e executar aplicações em containers. Containers são unidades leves e portáveis que incluem tudo necessário para executar uma aplicação.

**Vantagens dos Containers:**
- **Portabilidade**: Funciona em qualquer ambiente
- **Isolamento**: Aplicações isoladas umas das outras
- **Eficiência**: Menor uso de recursos que VMs
- **Consistência**: Mesmo comportamento em todos os ambientes
- **Rapidez**: Inicialização em segundos

### 🏗️ Arquitetura Docker

**Componentes Principais:**
- **Docker Daemon**: Serviço que gerencia containers
- **Docker Client**: Interface de linha de comando
- **Docker Registry**: Repositório de imagens
- **Docker Images**: Templates para containers
- **Docker Containers**: Instâncias executando

**Fluxo de Trabalho:**
```
Dockerfile → Docker Image → Docker Container
     ↓            ↓            ↓
  Código    →  Empacotado →  Executando
```

### 📝 Dockerfile

**Estrutura Básica:**
```dockerfile
# Imagem base
FROM node:16-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código da aplicação
COPY . .

# Expor porta
EXPOSE 3000

# Comando para executar
CMD ["npm", "start"]
```

**Exemplos Avançados:**
```dockerfile
# Multi-stage build para Node.js
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:16-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]

# Python com dependências
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
```

### 🖼️ Docker Images

**Comandos Básicos:**
```bash
# Construir imagem
docker build -t minha-app:latest .

# Listar imagens
docker images

# Remover imagem
docker rmi minha-app:latest

# Inspecionar imagem
docker inspect minha-app:latest

# Histórico da imagem
docker history minha-app:latest
```

**Otimizações de Imagem:**
```dockerfile
# Usar .dockerignore
node_modules
npm-debug.log
.git
.env

# Multi-stage builds
FROM node:16-alpine AS deps
COPY package*.json ./
RUN npm ci

FROM node:16-alpine AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:16-alpine AS production
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

### 📦 Docker Containers

**Comandos Essenciais:**
```bash
# Executar container
docker run -d -p 3000:3000 --name minha-app minha-app:latest

# Listar containers
docker ps -a

# Parar container
docker stop minha-app

# Iniciar container
docker start minha-app

# Remover container
docker rm minha-app

# Executar comando em container rodando
docker exec -it minha-app sh

# Logs do container
docker logs minha-app

# Estatísticas do container
docker stats minha-app
```

**Gerenciamento de Recursos:**
```bash
# Limitar memória
docker run -m 512m minha-app

# Limitar CPU
docker run --cpus=1.0 minha-app

# Limitar ambos
docker run -m 512m --cpus=1.0 minha-app

# Variáveis de ambiente
docker run -e NODE_ENV=production minha-app

# Volumes para persistência
docker run -v /host/path:/container/path minha-app
```

### 🔄 Docker Compose

**Arquivo docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  postgres_data:
```

**Comandos Docker Compose:**
```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f app

# Reconstruir e reiniciar
docker-compose up --build

# Escalar serviço
docker-compose up --scale app=3
```

### 🚀 CI/CD com Docker

**Pipeline GitHub Actions:**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build Docker image
      run: docker build -t minha-app:${{ github.sha }} .
      
    - name: Push to registry
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push minha-app:${{ github.sha }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to production
      run: |
        # Comandos de deploy
        ssh user@server "docker pull minha-app:${{ github.sha }}"
        ssh user@server "docker-compose up -d"
```

### 🔍 Monitoramento e Observabilidade

**Logs Estruturados:**
```javascript
// Aplicação Node.js com logs estruturados
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

// Log estruturado
logger.info('Request processed', {
  method: 'GET',
  url: '/api/users',
  statusCode: 200,
  responseTime: 45,
  userId: '12345'
});
```

**Métricas com Prometheus:**
```javascript
const prometheus = require('prom-client');

// Contador de requisições
const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// Histograma de tempo de resposta
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route']
});

// Middleware para coletar métricas
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });
    
    httpRequestDuration.observe({
      method: req.method,
      route: req.route?.path || req.path
    }, duration);
  });
  
  next();
});
```

### 🐳 Orquestração com Kubernetes

**Deployment Básico:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: minha-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: minha-app
  template:
    metadata:
      labels:
        app: minha-app
    spec:
      containers:
      - name: minha-app
        image: minha-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

**Service para Exposição:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: minha-app-service
spec:
  selector:
    app: minha-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

### 🔒 Segurança em Containers

**Melhores Práticas:**
```dockerfile
# Executar como usuário não-root
FROM node:16-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Escaneamento de vulnerabilidades
# docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
#   aquasec/trivy image minha-app:latest

# Verificar assinatura da imagem
# docker trust inspect minha-app:latest
```

**Políticas de Segurança:**
```yaml
# Pod Security Policy
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  hostNetwork: false
  hostIPC: false
  hostPID: false
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  supplementalGroups:
    rule: 'MustRunAs'
    ranges:
      - min: 1
        max: 65535
  fsGroup:
    rule: 'MustRunAs'
    ranges:
      - min: 1
        max: 65535
  readOnlyRootFilesystem: true
```

### 📊 Monitoramento com Grafana

**Dashboard de Métricas:**
```json
{
  "dashboard": {
    "title": "Application Metrics",
    "panels": [
      {
        "title": "HTTP Requests per Second",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      }
    ]
  }
}
```

### 🎯 Casos de Uso Práticos

**Microserviços com Docker:**
1. **API Gateway**: Nginx ou Kong
2. **Serviços**: Cada serviço em container separado
3. **Banco de Dados**: PostgreSQL, MongoDB, Redis
4. **Message Broker**: RabbitMQ ou Apache Kafka
5. **Monitoramento**: Prometheus + Grafana

**Aplicação Web Completa:**
1. **Frontend**: React/Vue.js em container
2. **Backend**: Node.js/Python em container
3. **Banco**: PostgreSQL em container
4. **Cache**: Redis em container
5. **Proxy**: Nginx para roteamento

### 💡 Dicas para DevOps

**Automação:**
- Automatize tudo que for repetitivo
- Use scripts para configuração de ambientes
- Implemente testes automatizados
- Configure pipelines de CI/CD

**Monitoramento:**
- Monitore métricas de negócio e infraestrutura
- Configure alertas proativos
- Use logs estruturados
- Implemente tracing distribuído

**Segurança:**
- Escaneie imagens regularmente
- Use políticas de segurança
- Implemente controle de acesso
- Mantenha dependências atualizadas

### 📚 Recursos de Aprendizado

**Documentação Oficial:**
- Docker Documentation
- Kubernetes Documentation
- AWS ECS Documentation
- Azure Container Instances

**Cursos Online:**
- Docker Official Tutorials
- Kubernetes.io Interactive Tutorials
- Pluralsight DevOps Courses
- Udemy DevOps Courses

**Comunidades:**
- Docker Community
- Kubernetes Community
- DevOps Stack Exchange
- Reddit r/devops

### 🎉 Conclusão

DevOps com Docker oferece uma abordagem moderna e eficiente para desenvolvimento e operações. Os principais benefícios são:

1. **Consistência**: Mesmo ambiente em todos os estágios
2. **Portabilidade**: Funciona em qualquer infraestrutura
3. **Escalabilidade**: Fácil escalar aplicações
4. **Automação**: Reduz erros manuais
5. **Colaboração**: Melhora trabalho em equipe

Lembre-se: DevOps é uma jornada contínua de melhoria. Comece pequeno, automatize gradualmente e sempre meça o impacto das mudanças.
"""

if __name__ == "__main__":
    content = get_devops_docker_real_content()
    print("Conteúdo DevOps Docker gerado com sucesso!")
    print(f"Total de linhas: {len(content.split(chr(10)))}")






