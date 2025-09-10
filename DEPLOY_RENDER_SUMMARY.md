# 🚀 Deploy do Fenix Academy no Render.com - Resumo Executivo

## ✅ Configurações Criadas

### 1. Arquivos de Configuração do Render
- `render.yaml` - Configuração principal do Render
- `frontend/render.yaml` - Configuração específica do frontend
- `backend/render.yaml` - Configuração específica do backend
- `Dockerfile.render` - Dockerfile otimizado para Render
- `backend/Dockerfile.render` - Dockerfile do backend para Render

### 2. Health Checks
- `backend/health/` - Módulo de health check do Django
- `frontend/app/api/health/route.ts` - Health check do Next.js

### 3. Scripts de Deploy
- `deploy-render.sh` - Script automatizado (Linux/macOS)
- `deploy-render.bat` - Script automatizado (Windows)

### 4. Documentação
- `RENDER_DEPLOY_GUIDE.md` - Guia completo de deploy
- `env.render.example` - Exemplo de variáveis de ambiente

## 🎯 Deploy Rápido (5 minutos)

### Opção 1: Deploy Manual (Recomendado)

1. **Acesse o Render Dashboard**
   - Vá para [dashboard.render.com](https://dashboard.render.com)
   - Faça login ou crie uma conta

2. **Crie o Banco de Dados**
   - Clique em "New +" → "PostgreSQL"
   - Nome: `fenix-academy-db`
   - Região: Oregon
   - Plano: Starter (Free)

3. **Crie o Redis**
   - Clique em "New +" → "Redis"
   - Nome: `fenix-academy-redis`
   - Região: Oregon
   - Plano: Starter (Free)

4. **Deploy do Backend**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub
   - Configure:
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

5. **Deploy do Frontend**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub
   - Configure:
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

### Opção 2: Deploy Automatizado

```bash
# Linux/macOS
chmod +x deploy-render.sh
./deploy-render.sh

# Windows
deploy-render.bat
```

## 🔧 Configuração de Variáveis de Ambiente

### Backend (Django)
```env
SECRET_KEY=your-super-secret-django-key-here
DEBUG=False
ALLOWED_HOSTS=fenix-academy-backend.onrender.com,fenix-academy-frontend.onrender.com
CORS_ALLOWED_ORIGINS=https://fenix-academy-frontend.onrender.com
CORS_ALLOW_CREDENTIALS=True
DATABASE_URL=postgresql://username:password@host:port/database_name
REDIS_URL=redis://username:password@host:port
```

### Frontend (Next.js)
```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=https://fenix-academy-frontend.onrender.com
NEXT_PUBLIC_API_URL=https://fenix-academy-backend.onrender.com
NEXTAUTH_URL=https://fenix-academy-frontend.onrender.com
NEXTAUTH_SECRET=your-super-secret-nextauth-key-here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📊 Estrutura de Serviços

```
Fenix Academy no Render.com
├── 🌐 Frontend (Next.js)
│   └── https://fenix-academy-frontend.onrender.com
├── 🔧 Backend (Django)
│   └── https://fenix-academy-backend.onrender.com
├── 🗄️ Database (PostgreSQL)
│   └── fenix-academy-db
└── 🔴 Cache (Redis)
    └── fenix-academy-redis
```

## 💰 Custos

### Plano Gratuito (Starter)
- **Web Services**: 750 horas/mês (gratuito)
- **PostgreSQL**: 1GB storage (gratuito)
- **Redis**: 25MB storage (gratuito)
- **Bandwidth**: 100GB/mês (gratuito)

### Upgrade Recomendado (quando necessário)
- **Web Services**: $7/mês por serviço
- **PostgreSQL**: $7/mês (1GB)
- **Redis**: $7/mês (25MB)

## 🔍 Verificação de Deploy

### Health Checks
```bash
# Backend
curl https://fenix-academy-backend.onrender.com/health/

# Frontend
curl https://fenix-academy-frontend.onrender.com/api/health
```

### URLs de Teste
- **Frontend**: https://fenix-academy-frontend.onrender.com
- **Backend API**: https://fenix-academy-backend.onrender.com/api/
- **Admin Django**: https://fenix-academy-backend.onrender.com/admin/
- **API Docs**: https://fenix-academy-backend.onrender.com/api/docs/

## 🚨 Troubleshooting

### Problemas Comuns

1. **Build Falha**
   - Verificar logs de build no Render
   - Verificar se todas as dependências estão corretas

2. **Banco de Dados não Conecta**
   - Verificar se DATABASE_URL está configurado
   - Verificar se o banco está ativo

3. **CORS Errors**
   - Verificar CORS_ALLOWED_ORIGINS no backend
   - Verificar se as URLs estão corretas

4. **Static Files não Carregam**
   - Verificar se collectstatic foi executado
   - Verificar configurações de STATIC_URL

## 📈 Próximos Passos

1. **Teste Completo**
   - Testar todas as funcionalidades
   - Verificar performance
   - Testar pagamentos (se configurado)

2. **Configurar Domínio Personalizado**
   - Adicionar domínio no Render
   - Configurar DNS
   - Configurar SSL

3. **Monitoramento**
   - Configurar alertas
   - Monitorar logs
   - Configurar métricas

4. **Otimizações**
   - Configurar CDN
   - Otimizar imagens
   - Implementar cache

## 📞 Suporte

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Status Page**: [status.render.com](https://status.render.com)
- **Community**: [community.render.com](https://community.render.com)

---

## 🎉 Resumo

✅ **Configurações criadas** para deploy no Render.com
✅ **Health checks** implementados
✅ **Scripts de deploy** automatizados
✅ **Documentação completa** fornecida
✅ **Guia passo a passo** detalhado

**Seu projeto Fenix Academy está pronto para deploy no Render.com! 🚀**
