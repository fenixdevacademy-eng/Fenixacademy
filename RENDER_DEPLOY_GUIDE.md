# 🚀 Guia de Deploy no Render.com - Fenix Academy

Este guia completo te ajudará a fazer o deploy do projeto Fenix Academy no Render.com.

## 📋 Pré-requisitos

1. **Conta no Render.com** - [Criar conta gratuita](https://render.com)
2. **Repositório no GitHub** - Código deve estar no GitHub
3. **Variáveis de ambiente** - Chaves de API e configurações

## 🏗️ Estrutura do Projeto

O projeto Fenix Academy possui:
- **Frontend**: Next.js 14 (React)
- **Backend**: Django 5.0 (Python)
- **Banco de Dados**: PostgreSQL
- **Cache**: Redis

## 🚀 Deploy Passo a Passo

### 1. Preparar o Repositório

```bash
# Fazer commit das configurações do Render
git add .
git commit -m "Add Render.com deployment configuration"
git push origin main
```

### 2. Criar Serviços no Render

#### 2.1 Banco de Dados PostgreSQL

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `fenix-academy-db`
   - **Database**: `fenix_academy`
   - **User**: `fenix_user`
   - **Region**: Oregon (US West)
   - **Plan**: Starter (Free)

#### 2.2 Redis Cache

1. Clique em **"New +"** → **"Redis"**
2. Configure:
   - **Name**: `fenix-academy-redis`
   - **Region**: Oregon (US West)
   - **Plan**: Starter (Free)

#### 2.3 Backend Django

1. Clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: `fenix-academy-backend`
   - **Environment**: Python 3
   - **Build Command**: 
     ```bash
     pip install -r backend/requirements.txt
     cd backend
     python manage.py collectstatic --noinput
     python manage.py migrate
     ```
   - **Start Command**:
     ```bash
     cd backend
     gunicorn --bind 0.0.0.0:$PORT --workers 2 --worker-class gevent fenix_academy.wsgi:application
     ```
   - **Root Directory**: `backend`

#### 2.4 Frontend Next.js

1. Clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: `fenix-academy-frontend`
   - **Environment**: Node
   - **Build Command**:
     ```bash
     cd frontend
     npm ci
     npm run build
     ```
   - **Start Command**:
     ```bash
     cd frontend
     npm start
     ```
   - **Root Directory**: `frontend`

### 3. Configurar Variáveis de Ambiente

#### 3.1 Backend (Django)

No painel do backend, vá em **"Environment"** e adicione:

```env
# Django
SECRET_KEY=your-super-secret-django-key-here
DEBUG=False
ALLOWED_HOSTS=fenix-academy-backend.onrender.com,fenix-academy-frontend.onrender.com
CORS_ALLOWED_ORIGINS=https://fenix-academy-frontend.onrender.com
CORS_ALLOW_CREDENTIALS=True

# Database (será preenchido automaticamente)
DATABASE_URL=postgresql://username:password@host:port/database_name

# Redis (será preenchido automaticamente)
REDIS_URL=redis://username:password@host:port

# Email
EMAIL_FROM=noreply@fenixdevacademy.com
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
```

#### 3.2 Frontend (Next.js)

No painel do frontend, vá em **"Environment"** e adicione:

```env
# Next.js
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=https://fenix-academy-frontend.onrender.com
NEXT_PUBLIC_API_URL=https://fenix-academy-backend.onrender.com

# Authentication
NEXTAUTH_URL=https://fenix-academy-frontend.onrender.com
NEXTAUTH_SECRET=your-super-secret-nextauth-key-here

# Stripe (Pagamentos)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database (para API routes)
DATABASE_URL=postgresql://username:password@host:port/database_name
```

### 4. Configurar Health Checks

#### 4.1 Backend Health Check

Crie o arquivo `backend/health/views.py`:

```python
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def health_check(request):
    return JsonResponse({
        'status': 'healthy',
        'service': 'fenix-academy-backend',
        'version': '2.0.0'
    })
```

Adicione a rota em `backend/fenix_academy/urls.py`:

```python
from django.urls import path
from health.views import health_check

urlpatterns = [
    path('health/', health_check, name='health_check'),
    # ... outras rotas
]
```

#### 4.2 Frontend Health Check

Crie o arquivo `frontend/app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'fenix-academy-frontend',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  })
}
```

### 5. Configurar Domínio Personalizado (Opcional)

1. No painel do Render, vá em **"Settings"** do seu serviço
2. Clique em **"Custom Domains"**
3. Adicione seu domínio (ex: `fenixdevacademy.com`)
4. Configure os registros DNS conforme instruções

### 6. Monitoramento e Logs

1. **Logs**: Acesse a aba **"Logs"** em cada serviço
2. **Métricas**: Monitore CPU, memória e requisições
3. **Alertas**: Configure notificações por email

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Build Falha
```bash
# Verificar logs de build
# Verificar se todas as dependências estão no package.json/requirements.txt
```

#### 2. Banco de Dados não Conecta
```bash
# Verificar se DATABASE_URL está configurado
# Verificar se o banco está ativo
```

#### 3. CORS Errors
```bash
# Verificar CORS_ALLOWED_ORIGINS no backend
# Verificar se as URLs estão corretas
```

#### 4. Static Files não Carregam
```bash
# Verificar se collectstatic foi executado
# Verificar configurações de STATIC_URL
```

### Comandos Úteis

```bash
# Verificar status dos serviços
curl https://fenix-academy-backend.onrender.com/health/
curl https://fenix-academy-frontend.onrender.com/api/health

# Verificar logs
# Use o painel do Render para ver logs em tempo real
```

## 📊 Configurações de Performance

### Backend (Django)
- **Workers**: 2 (adequado para plano starter)
- **Worker Class**: gevent (melhor para I/O)
- **Max Requests**: 1000 (evita memory leaks)

### Frontend (Next.js)
- **Build**: Otimizado com SWC
- **Static Files**: Servidos via CDN do Render
- **Caching**: Configurado para performance

## 🔒 Segurança

1. **HTTPS**: Automático no Render
2. **Secrets**: Use variáveis de ambiente
3. **CORS**: Configurado corretamente
4. **Headers**: Security headers configurados

## 💰 Custos

### Plano Gratuito (Starter)
- **Web Services**: 750 horas/mês
- **PostgreSQL**: 1GB storage
- **Redis**: 25MB storage
- **Bandwidth**: 100GB/mês

### Upgrade Recomendado
- **Web Services**: $7/mês por serviço
- **PostgreSQL**: $7/mês (1GB)
- **Redis**: $7/mês (25MB)

## 🎯 Próximos Passos

1. **Teste completo** da aplicação
2. **Configurar domínio personalizado**
3. **Implementar CI/CD** com GitHub Actions
4. **Configurar monitoramento** avançado
5. **Otimizar performance** conforme necessário

## 📞 Suporte

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Status Page**: [status.render.com](https://status.render.com)
- **Community**: [community.render.com](https://community.render.com)

---

**🎉 Parabéns!** Seu projeto Fenix Academy está agora rodando no Render.com!
