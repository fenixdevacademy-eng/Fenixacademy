# Aula 2: Docker e Containerização

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Entender o conceito de containerização e suas vantagens
- Instalar e configurar o Docker
- Criar e gerenciar containers Docker
- Construir imagens Docker personalizadas
- Usar Docker Compose para orquestrar múltiplos containers
- Implementar containerização em projetos web

## 📚 Conteúdo da Aula

### 1. Introdução à Containerização

#### O que é Containerização?
A containerização é uma tecnologia de virtualização que permite empacotar aplicações e suas dependências em containers isolados e portáveis.

**Vantagens da Containerização:**
- **Portabilidade**: Funciona em qualquer ambiente
- **Isolamento**: Recursos isolados entre containers
- **Eficiência**: Menor overhead que VMs
- **Escalabilidade**: Fácil replicação e distribuição
- **Consistência**: Mesmo ambiente em dev, test e prod

#### Docker vs Máquinas Virtuais

| Aspecto | Docker | Máquinas Virtuais |
|---------|--------|-------------------|
| **Overhead** | Baixo | Alto |
| **Inicialização** | Segundos | Minutos |
| **Recursos** | Compartilhados | Isolados |
| **Portabilidade** | Alta | Média |
| **Segurança** | Bom | Excelente |

### 2. Instalação e Configuração do Docker

#### Instalação no Windows
```bash
# Download do Docker Desktop
# https://www.docker.com/products/docker-desktop

# Verificar instalação
docker --version
docker-compose --version
```

#### Instalação no Linux (Ubuntu)
```bash
# Atualizar pacotes
sudo apt update

# Instalar dependências
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Adicionar chave GPG oficial
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar repositório
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
```

#### Instalação no macOS
```bash
# Usando Homebrew
brew install --cask docker

# Ou download direto
# https://www.docker.com/products/docker-desktop
```

### 3. Conceitos Fundamentais do Docker

#### Imagens Docker
Uma imagem é um template read-only usado para criar containers.

```bash
# Listar imagens locais
docker images

# Baixar uma imagem
docker pull nginx

# Remover uma imagem
docker rmi nginx
```

#### Containers Docker
Um container é uma instância executável de uma imagem.

```bash
# Executar um container
docker run -d -p 8080:80 nginx

# Listar containers em execução
docker ps

# Listar todos os containers
docker ps -a

# Parar um container
docker stop <container_id>

# Remover um container
docker rm <container_id>
```

#### Dockerfile
Um Dockerfile é um arquivo de texto que contém instruções para construir uma imagem.

```dockerfile
# Exemplo básico de Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### 4. Criando Imagens Docker Personalizadas

#### Dockerfile para Aplicação Node.js
```dockerfile
# Dockerfile para aplicação Node.js
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código da aplicação
COPY . .

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Mudar propriedade dos arquivos
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
```

#### Dockerfile para Aplicação React
```dockerfile
# Dockerfile para aplicação React
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio de produção
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Dockerfile para Aplicação Python
```dockerfile
# Dockerfile para aplicação Python
FROM python:3.11-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .

# Instalar dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Expor porta
EXPOSE 8000

# Comando para iniciar
CMD ["python", "app.py"]
```

### 5. Comandos Docker Essenciais

#### Gerenciamento de Imagens
```bash
# Construir uma imagem
docker build -t minha-app .

# Construir com tag específica
docker build -t minha-app:v1.0 .

# Construir com contexto específico
docker build -f Dockerfile.prod -t minha-app:prod .

# Inspecionar uma imagem
docker inspect minha-app

# Histórico de uma imagem
docker history minha-app
```

#### Gerenciamento de Containers
```bash
# Executar container em background
docker run -d --name meu-container nginx

# Executar com variáveis de ambiente
docker run -e NODE_ENV=production -e PORT=3000 minha-app

# Executar com volume
docker run -v /caminho/local:/caminho/container minha-app

# Executar com rede personalizada
docker run --network minha-rede minha-app

# Executar com recursos limitados
docker run --memory=512m --cpus=1 minha-app
```

#### Logs e Debugging
```bash
# Ver logs de um container
docker logs meu-container

# Seguir logs em tempo real
docker logs -f meu-container

# Executar comando dentro do container
docker exec -it meu-container /bin/bash

# Inspecionar container
docker inspect meu-container

# Estatísticas de uso
docker stats meu-container
```

### 6. Docker Compose

#### O que é Docker Compose?
Docker Compose é uma ferramenta para definir e executar aplicações Docker multi-container.

#### docker-compose.yml Básico
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

#### Docker Compose para Aplicação Full-Stack
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://usuario:senha@db:5432/minha_app
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
```

#### Comandos Docker Compose
```bash
# Iniciar serviços
docker-compose up

# Iniciar em background
docker-compose up -d

# Parar serviços
docker-compose down

# Reconstruir e iniciar
docker-compose up --build

# Ver logs
docker-compose logs

# Executar comando em serviço
docker-compose exec web npm test

# Escalar serviço
docker-compose up --scale web=3
```

### 7. Volumes e Persistência de Dados

#### Tipos de Volumes
1. **Volumes Nomeados**: Gerenciados pelo Docker
2. **Bind Mounts**: Mapeamento direto para sistema de arquivos
3. **tmpfs Mounts**: Armazenamento em memória

#### Exemplo de Volumes
```yaml
version: '3.8'

services:
  app:
    image: minha-app
    volumes:
      # Volume nomeado
      - app_data:/app/data
      # Bind mount
      - ./logs:/app/logs
      # tmpfs mount
      - type: tmpfs
        target: /tmp
        tmpfs:
          size: 100M
    environment:
      - DATA_PATH=/app/data
      - LOG_PATH=/app/logs

volumes:
  app_data:
    driver: local
```

### 8. Redes Docker

#### Tipos de Redes
1. **Bridge**: Rede padrão para containers
2. **Host**: Usa rede do host
3. **None**: Sem acesso à rede
4. **Overlay**: Para Docker Swarm

#### Configuração de Redes
```yaml
version: '3.8'

services:
  web:
    image: nginx
    networks:
      - frontend
      - backend

  api:
    image: minha-api
    networks:
      - backend
      - database

  db:
    image: postgres
    networks:
      - database

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
  database:
    driver: bridge
    internal: true
```

### 9. Multi-Stage Builds

#### Build Multi-Estágio para Node.js
```dockerfile
# Estágio 1: Build
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio 2: Produção
FROM node:18-alpine as production

WORKDIR /app

# Copiar apenas dependências de produção
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar build do estágio anterior
COPY --from=builder /app/dist ./dist

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

#### Build Multi-Estágio para React
```dockerfile
# Estágio 1: Build
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio 2: Servidor web
FROM nginx:alpine

# Copiar build
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração personalizada
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 10. Docker em Produção

#### Configurações de Produção
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.prod
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

#### Health Checks
```dockerfile
# Dockerfile com health check
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
```

### 11. Segurança em Docker

#### Boas Práticas de Segurança
```dockerfile
# Dockerfile seguro
FROM node:18-alpine

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copiar e instalar dependências
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar código
COPY --chown=nextjs:nodejs . .

# Mudar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
```

#### Docker Security Scanning
```bash
# Escanear imagem em busca de vulnerabilidades
docker scan minha-app

# Escanear com relatório detalhado
docker scan --json minha-app > scan-report.json
```

### 12. Monitoramento e Logging

#### Configuração de Logs
```yaml
version: '3.8'

services:
  web:
    image: minha-app
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    environment:
      - LOG_LEVEL=info
      - LOG_FORMAT=json
```

#### Monitoramento com Prometheus
```yaml
version: '3.8'

services:
  web:
    image: minha-app
    ports:
      - "3000:3000"
    environment:
      - METRICS_PORT=9090

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

### 13. Projeto Prático: Containerizando uma Aplicação Web

#### Estrutura do Projeto
```
meu-projeto/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── docker-compose.yml
├── docker-compose.prod.yml
└── nginx.conf
```

#### Dockerfile Frontend
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Dockerfile Backend
```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm ci --only=production

# Copiar código
COPY . .

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
CMD ["node", "index.js"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 14. Comandos Úteis para Produção

#### Gerenciamento de Produção
```bash
# Iniciar em produção
docker-compose -f docker-compose.prod.yml up -d

# Ver logs em produção
docker-compose -f docker-compose.prod.yml logs -f

# Atualizar aplicação
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Backup de volumes
docker run --rm -v postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .

# Restaurar backup
docker run --rm -v postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres_backup.tar.gz -C /data
```

#### Monitoramento
```bash
# Ver uso de recursos
docker stats

# Ver logs de todos os containers
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs web

# Executar comando em container
docker-compose exec web npm test
```

### 15. Troubleshooting Comum

#### Problemas Frequentes
```bash
# Container não inicia
docker logs <container_id>

# Problema de permissão
docker run --user $(id -u):$(id -g) minha-app

# Problema de rede
docker network ls
docker network inspect bridge

# Problema de volume
docker volume ls
docker volume inspect <volume_name>

# Limpar recursos não utilizados
docker system prune -a
```

#### Debugging
```bash
# Entrar no container
docker exec -it <container_id> /bin/bash

# Ver processos dentro do container
docker exec <container_id> ps aux

# Ver variáveis de ambiente
docker exec <container_id> env

# Ver configuração do container
docker inspect <container_id>
```

## 🎯 Exercícios Práticos

### Exercício 1: Containerização Básica
1. Crie um Dockerfile para uma aplicação Node.js simples
2. Construa a imagem e execute o container
3. Teste a aplicação e verifique os logs

### Exercício 2: Docker Compose
1. Crie um docker-compose.yml para uma aplicação com frontend, backend e banco de dados
2. Configure volumes para persistência de dados
3. Configure redes para comunicação entre serviços

### Exercício 3: Multi-Stage Build
1. Crie um Dockerfile multi-estágio para uma aplicação React
2. Otimize o tamanho da imagem final
3. Configure um servidor web para servir a aplicação

### Exercício 4: Produção
1. Crie configurações de produção com docker-compose.prod.yml
2. Configure health checks e restart policies
3. Implemente monitoramento básico

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Conceitos de Containerização**: Vantagens e diferenças com VMs
2. **Instalação do Docker**: Em diferentes sistemas operacionais
3. **Comandos Essenciais**: Gerenciamento de imagens e containers
4. **Dockerfile**: Criação de imagens personalizadas
5. **Docker Compose**: Orquestração de múltiplos containers
6. **Volumes e Redes**: Persistência de dados e comunicação
7. **Multi-Stage Builds**: Otimização de imagens
8. **Produção**: Configurações para ambiente de produção
9. **Segurança**: Boas práticas e scanning
10. **Monitoramento**: Logs e métricas

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- **Configuração de Servidores**: Setup de servidores de produção
- **Load Balancing**: Distribuição de carga
- **SSL/TLS**: Certificados e segurança
- **CDN**: Content Delivery Networks
- **Monitoramento**: Ferramentas de monitoramento em produção

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Security](https://docs.docker.com/engine/security/)
- [Docker Hub](https://hub.docker.com/)

---

**🎉 Parabéns!** Você completou a Aula 2 do Módulo 7. Continue praticando e explore as possibilidades da containerização!







