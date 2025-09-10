# 🚀 Deploy Simples no Vercel - fenixdevacademy.com.br

## ⚡ Deploy em 5 Minutos

### 1. **Preparar o Projeto** (1 minuto)

```bash
# Fazer commit das mudanças
git add .
git commit -m "Configure Vercel deployment"
git push origin main
```

### 2. **Deploy no Vercel** (3 minutos)

1. **Acesse** [vercel.com](https://vercel.com)
2. **Faça login** com GitHub
3. **Clique em "New Project"**
4. **Importe seu repositório** `fenixdevacademy-eng/Fenixacademy`
5. **Configure:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. **Configurar Variáveis de Ambiente** (1 minuto)

No painel do Vercel, vá em **Settings → Environment Variables** e adicione:

```env
# Aplicação
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com.br
NEXT_PUBLIC_API_URL=https://fenixdevacademy.com.br/api

# Autenticação
NEXTAUTH_URL=https://fenixdevacademy.com.br
NEXTAUTH_SECRET=sua-chave-secreta-super-forte-aqui

# JWT
JWT_SECRET=sua-chave-jwt-secreta-aqui

# Banco de Dados (será preenchido automaticamente)
POSTGRES_URL=postgres://...

# Stripe (opcional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QRj4yALIQ8ei57qNfshH4EmsiIU8nHRIlXWcqoNIR6Pw0wM8hphlFCyz2xnHZ0b599sGvZ45CIwIXmJD2PiKjRw00ysyulgiF
STRIPE_SECRET_KEY=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
```

### 4. **Configurar Banco de Dados** (1 minuto)

1. **No painel do Vercel**, vá em **Storage**
2. **Clique em "Create Database"**
3. **Selecione "Postgres"**
4. **Nome**: `fenix-academy-db`
5. **Região**: Washington, D.C. (mais próxima do Brasil)
6. **Plano**: Hobby (Gratuito)

### 5. **Configurar Domínio** (2 minutos)

1. **No painel do Vercel**, vá em **Settings → Domains**
2. **Adicione domínio**: `fenixdevacademy.com.br`
3. **Configure DNS** no seu provedor:

```
Tipo: A
Nome: @
Valor: 76.76.19.61

Tipo: CNAME  
Nome: www
Valor: cname.vercel-dns.com
```

## 🎯 Resultado Final

```
fenixdevacademy.com.br
├── 🏠 Página Principal
├── 📚 Cursos
├── 🔐 Login/Registro
├── 👤 Dashboard
├── 💳 Pagamentos
└── 🔧 Admin
```

## 📊 Estrutura da API

```
fenixdevacademy.com.br/api/
├── /auth/register     - Registro de usuários
├── /auth/login        - Login de usuários
├── /courses           - Listar/criar cursos
├── /courses/[id]      - Detalhes do curso
├── /enrollments       - Matrículas
├── /progress          - Progresso do usuário
└── /payments          - Pagamentos
```

## 💰 Custos

- **Vercel**: Gratuito (100GB bandwidth/mês)
- **Vercel Postgres**: Gratuito (1GB storage)
- **Total**: R$ 0,00/mês

## 🔧 Funcionalidades Incluídas

✅ **Frontend Next.js** - Interface moderna e responsiva
✅ **API Routes** - Backend integrado
✅ **Banco PostgreSQL** - Dados persistentes
✅ **Autenticação JWT** - Sistema de login seguro
✅ **Sistema de Cursos** - CRUD completo
✅ **Sistema de Matrículas** - Controle de acesso
✅ **Sistema de Progresso** - Acompanhamento do aluno
✅ **SSL Automático** - HTTPS configurado
✅ **CDN Global** - Performance otimizada

## 🚀 Deploy Automático

Após configurar, o Vercel fará deploy automático sempre que você fizer push no GitHub!

## 📱 Teste da Aplicação

1. **Acesse**: https://fenixdevacademy.com.br
2. **Teste registro**: Crie uma conta
3. **Teste login**: Faça login
4. **Teste cursos**: Navegue pelos cursos
5. **Teste admin**: Acesse /admin (se configurado)

## 🔍 Monitoramento

- **Logs**: Vercel Dashboard → Functions
- **Métricas**: Vercel Dashboard → Analytics
- **Performance**: Vercel Dashboard → Speed Insights

## 🆘 Suporte

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Status**: [vercel-status.com](https://vercel-status.com)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## 🎉 Pronto!

**Seu projeto Fenix Academy está no ar em fenixdevacademy.com.br!**

**Tempo total: 5 minutos** ⚡