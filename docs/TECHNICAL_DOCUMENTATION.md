# 🔥 **DOCUMENTAÇÃO TÉCNICA - FENIX ACADEMY**

## 📋 **VISÃO GERAL**

### **Tecnologias**
- **Backend**: FastAPI (Python 3.9+)
- **Frontend**: Next.js 15 + React 18 + TypeScript
- **Banco**: PostgreSQL + Redis
- **Containerização**: Docker + Docker Compose
- **Monitoramento**: Prometheus + Grafana
- **Segurança**: JWT + Rate Limiting + Auditoria

### **Funcionalidades Core**
- ✅ Sistema de autenticação e autorização
- ✅ Gerenciamento de cursos e conteúdo
- ✅ IDE integrada com Git
- ✅ Sistema de progresso e certificados
- ✅ Pagamentos via Stripe
- ✅ Monitoramento e alertas
- ✅ Auditoria de segurança

---

## 🏗️ **ARQUITETURA**

### **Componentes Principais**
```
Frontend (Next.js) → API Gateway (FastAPI) → Services → Database (PostgreSQL + Redis)
                                    ↓
                            Monitoring (Prometheus)
```

### **Estrutura do Projeto**
```
fenix-academy/
├── backend/                 # Backend FastAPI
│   ├── app/                # Aplicação principal
│   ├── api/                # APIs e endpoints
│   ├── core/               # Configurações centrais
│   ├── security/           # Sistema de segurança
│   ├── monitoring/         # Sistema de monitoramento
│   └── tests/              # Testes
├── frontend/                # Frontend Next.js
├── docs/                    # Documentação
└── docker-compose.yml       # Configuração Docker
```

---

## 🚀 **INSTALAÇÃO**

### **Pré-requisitos**
- Python 3.9+, Node.js 18+, Docker, PostgreSQL 14+, Redis 6+

### **Instalação Local**
```bash
# Clone
git clone https://github.com/fenix-academy/fenix-backend.git
cd fenix-backend

# Ambiente Python
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt

# Banco de dados
createdb fenix
alembic upgrade head

# Iniciar
uvicorn main:app --reload
```

### **Docker**
```bash
docker-compose up --build
```

---

## 🔌 **APIS PRINCIPAIS**

### **Base URL**
- Development: `http://localhost:8000`
- Production: `https://api.fenix.academy`

### **Endpoints Principais**
```http
# Autenticação
POST /api/v1/auth/login          # Login
POST /api/v1/auth/refresh        # Refresh token
POST /api/v1/auth/logout         # Logout

# Cursos
GET  /api/v1/courses             # Listar cursos
GET  /api/v1/courses/{id}        # Detalhes do curso
GET  /api/v1/courses/{id}/progress # Progresso

# Usuários
GET  /api/v1/users/profile       # Perfil do usuário
PUT  /api/v1/users/profile       # Atualizar perfil

# Segurança
GET  /security/audit             # Auditoria de segurança
GET  /health                     # Health check
```

---

## 🔒 **SEGURANÇA**

### **Sistema de Auditoria**
- Auditoria automática de vulnerabilidades
- Score de risco (0-10)
- Recomendações de correção
- Compliance com OWASP Top 10

### **Rate Limiting**
```python
RATE_LIMITS = {
    "login": {"requests": 5, "window": 300},      # 5 tentativas por 5 min
    "api": {"requests": 100, "window": 60},       # 100 requests por min
    "file_upload": {"requests": 10, "window": 3600}  # 10 uploads por hora
}
```

### **Validação de Entrada**
- Pydantic models para validação
- Sanitização de dados
- Proteção contra SQL Injection e XSS

---

## 📊 **MONITORAMENTO**

### **Métricas Prometheus**
```prometheus
# Requisições HTTP
http_requests_total{method="GET", endpoint="/api/v1/courses"}

# Duração das requisições
http_request_duration_seconds{method="POST", endpoint="/api/v1/auth/login"}

# Métricas do sistema
system_cpu_percent
system_memory_percent
system_disk_percent
```

### **Sistema de Alertas**
- **INFO**: Informações gerais
- **WARNING**: Avisos que requerem atenção
- **ERROR**: Erros que afetam funcionalidade
- **CRITICAL**: Problemas críticos

### **Logs Estruturados**
```json
{
  "timestamp": "2024-01-15T10:00:00Z",
  "level": "info",
  "message": "Usuário autenticado com sucesso",
  "user_id": "user_123",
  "ip_address": "192.168.1.1"
}
```

---

## 🧪 **TESTES**

### **Estrutura**
```
tests/
├── unit/                    # Testes unitários
├── integration/             # Testes de integração
├── security/                # Testes de segurança
└── performance/             # Testes de performance
```

### **Executar Testes**
```bash
# Todos os testes
pytest

# Testes de segurança
pytest tests/security/ -v

# Com coverage
pytest --cov=app --cov-report=html
```

---

## 🚀 **DEPLOY**

### **Configuração de Produção**
```env
ENVIRONMENT=production
DEBUG=false
DATABASE_URL=postgresql://user:pass@prod-db:5432/fenix
REDIS_URL=redis://prod-redis:6379
CORS_ORIGINS=https://fenix.academy
```

### **Docker Compose de Produção**
```yaml
version: '3.8'
services:
  app:
    build: .
    environment:
      - ENVIRONMENT=production
    deploy:
      replicas: 3
  db:
    image: postgres:14
  redis:
    image: redis:6-alpine
  nginx:
    image: nginx:alpine
```

---

## 🔧 **MANUTENÇÃO**

### **Backup**
```bash
# Backup do banco
pg_dump -h localhost -U fenix -d fenix > backup_$(date +%Y%m%d).sql

# Restaurar
psql -h localhost -U fenix -d fenix < backup_20240115.sql
```

### **Logs**
```bash
# Logs da aplicação
tail -f logs/fenix.log

# Logs do Docker
docker-compose logs -f app
```

---

## 📞 **SUPORTE**

- **Issues**: GitHub Issues
- **Documentação**: `/docs` (Swagger UI)
- **Email**: dev@fenix.academy

---

**Versão**: 2.0.0  
**Última atualização**: Janeiro 2024
