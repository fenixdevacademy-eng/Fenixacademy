# 🔧 Variáveis de Ambiente para Vercel

## Configuração no Painel do Vercel

Acesse **Settings → Environment Variables** e adicione as seguintes variáveis:

### 🌐 **Configurações da Aplicação**
```
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com.br
NEXT_PUBLIC_API_URL=https://fenixdevacademy.com.br/api
NODE_ENV=production
```

### 🔐 **Autenticação**
```
NEXTAUTH_URL=https://fenixdevacademy.com.br
NEXTAUTH_SECRET=sua-chave-secreta-super-forte-aqui-32-caracteres-minimo
JWT_SECRET=sua-chave-jwt-secreta-aqui-32-caracteres-minimo
```

### 💳 **Stripe (Pagamentos) - CONFIGURADO**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QRj4yALIQ8ei57qNfshH4EmsiIU8nHRIlXWcqoNIR6Pw0wM8hphlFCyz2xnHZ0b599sGvZ45CIwIXmJD2PiKjRw00ysyulgiF
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=whsec_sua_chave_webhook_aqui
```

### 🗄️ **Banco de Dados (Será preenchido automaticamente)**
```
POSTGRES_URL=postgres://username:password@host:port/database
```

### 📧 **Email (Opcional)**
```
EMAIL_FROM=noreply@fenixdevacademy.com.br
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=seu-email@gmail.com
EMAIL_SERVER_PASSWORD=sua-senha-app-email
```

### 📊 **Analytics (Opcional)**
```
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_TAG_MANAGER=GTM-XXXXXXX
```

### 🔍 **SEO**
```
NEXT_PUBLIC_SITE_NAME=Fenix Academy
NEXT_PUBLIC_SITE_DESCRIPTION=Academia de Desenvolvimento Web Completa
NEXT_PUBLIC_SITE_KEYWORDS=desenvolvimento,web,programação,cursos,academia
```

## ✅ **Status das Configurações**

- ✅ **Stripe**: Configurado com suas chaves reais
- ⚠️ **Autenticação**: Precisa configurar NEXTAUTH_SECRET e JWT_SECRET
- ⚠️ **Banco**: Será configurado automaticamente pelo Vercel
- ⚠️ **Email**: Opcional, configure se necessário
- ⚠️ **Analytics**: Opcional, configure se necessário

## 🚀 **Próximos Passos**

1. **Configure as variáveis** no painel do Vercel
2. **Crie o banco PostgreSQL** no Vercel Storage
3. **Configure o domínio** fenixdevacademy.com.br
4. **Deploy automático** será realizado

## 🔒 **Segurança**

- ✅ **Chaves do Stripe**: Configuradas corretamente
- ⚠️ **Secrets**: Configure NEXTAUTH_SECRET e JWT_SECRET únicos
- ⚠️ **Webhook**: Configure STRIPE_WEBHOOK_SECRET no Stripe Dashboard
