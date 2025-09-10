# 🚀 Deploy da Fenix Academy no Vercel

## 📋 Pré-requisitos

### 1. Contas Necessárias
- [Vercel](https://vercel.com) - Plataforma de deploy
- [Stripe](https://stripe.com) - Pagamentos
- [GitHub](https://github.com) - Repositório de código

### 2. Ferramentas
- Node.js 18+ instalado
- Git configurado
- Vercel CLI instalado

## 🔧 Instalação e Configuração

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Login no Vercel
```bash
vercel login
```

### 3. Configurar Variáveis de Ambiente

Crie o arquivo `frontend/.env.local`:

```bash
# Payment Providers
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PagSeguro
PAGSEGURO_EMAIL=seu-email@exemplo.com
PAGSEGURO_TOKEN=seu-token-pagseguro
PAGSEGURO_SANDBOX=false

# Mercado Pago
MERCADOPAGO_PUBLIC_KEY=APP_USR_...
MERCADOPAGO_ACCESS_TOKEN=APP_USR_...

# PayPal
PAYPAL_CLIENT_ID=seu-client-id-paypal
PAYPAL_CLIENT_SECRET=seu-client-secret-paypal
PAYPAL_SANDBOX=false

# Pixel Tracking
FACEBOOK_PIXEL_ID=123456789012345
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
TIKTOK_PIXEL_ID=1234567890123456789
LINKEDIN_PIXEL_ID=1234567
TWITTER_PIXEL_ID=1234567890

# Database
DATABASE_URL=postgresql://username:password@host:5432/database

# Next.js
NEXTAUTH_URL=https://fenix-academy.vercel.app
NEXTAUTH_SECRET=seu-secret-aqui

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app

# AWS S3
AWS_ACCESS_KEY_ID=sua-access-key
AWS_SECRET_ACCESS_KEY=sua-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=fenix-academy-storage

# App Configuration
NEXT_PUBLIC_APP_URL=https://fenix-academy.vercel.app
NEXT_PUBLIC_APP_NAME=Fenix Academy
NEXT_PUBLIC_APP_DESCRIPTION=Plataforma de cursos online de tecnologia
```

## 🚀 Deploy Automático

### Opção 1: Script Automatizado (Recomendado)

**Linux/Mac:**
```bash
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

**Windows:**
```cmd
deploy-vercel.bat
```

### Opção 2: Deploy Manual

1. **Preparar o projeto:**
```bash
cd frontend
npm install
npm run build
```

2. **Deploy no Vercel:**
```bash
vercel --prod
```

3. **Configurar variáveis de ambiente no painel do Vercel**

## ⚙️ Configuração Pós-Deploy

### 1. Variáveis de Ambiente no Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em Settings > Environment Variables
4. Adicione todas as variáveis do `.env.local`

### 2. Configurar Webhooks do Stripe

1. Acesse [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Clique em "Add endpoint"
3. URL: `https://seu-projeto.vercel.app/api/webhooks/stripe`
4. Eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copie o webhook secret e adicione ao Vercel

### 3. Configurar Domínio Personalizado

1. No painel do Vercel, vá em Settings > Domains
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções

### 4. Configurar Pixels de Tracking

1. **Facebook Pixel:**
   - Acesse [Facebook Business Manager](https://business.facebook.com)
   - Configure o pixel com o ID fornecido

2. **Google Analytics:**
   - Acesse [Google Analytics](https://analytics.google.com)
   - Configure a propriedade com o ID fornecido

3. **Outros Pixels:**
   - Configure cada pixel conforme documentação específica

## 🔍 Verificação e Testes

### 1. Testes Básicos
- [ ] Site carrega corretamente
- [ ] Navegação funciona
- [ ] Páginas de curso carregam
- [ ] Carrinho de compras funciona
- [ ] Checkout processa pagamentos

### 2. Testes de Pagamento
- [ ] Cartão de crédito funciona
- [ ] PIX gera corretamente
- [ ] Boleto é gerado
- [ ] PayPal redireciona
- [ ] Webhooks do Stripe funcionam

### 3. Testes de Tracking
- [ ] Facebook Pixel carrega
- [ ] Google Analytics funciona
- [ ] Eventos são disparados
- [ ] Conversões são rastreadas

## 📊 Monitoramento

### 1. Vercel Analytics
- Acesse o painel do Vercel
- Monitore performance e erros
- Configure alertas

### 2. Stripe Dashboard
- Monitore pagamentos
- Configure alertas de falhas
- Analise métricas de conversão

### 3. Google Analytics
- Monitore tráfego
- Analise comportamento
- Configure goals e funis

## 🚨 Troubleshooting

### Problemas Comuns

1. **Build falha:**
   - Verifique dependências
   - Confirme variáveis de ambiente
   - Verifique logs do Vercel

2. **Pagamentos não funcionam:**
   - Verifique chaves do Stripe
   - Confirme webhooks
   - Teste em modo sandbox

3. **Pixels não carregam:**
   - Verifique IDs dos pixels
   - Confirme variáveis de ambiente
   - Teste no console do navegador

### Logs e Debug

```bash
# Ver logs do Vercel
vercel logs

# Ver logs em tempo real
vercel logs --follow

# Debug local
npm run dev
```

## 📈 Otimizações

### 1. Performance
- Configure CDN
- Otimize imagens
- Implemente cache
- Use lazy loading

### 2. SEO
- Configure meta tags
- Implemente sitemap
- Configure robots.txt
- Use structured data

### 3. Segurança
- Configure HTTPS
- Implemente CSP
- Configure CORS
- Use headers de segurança

## 🔄 Deploy Contínuo

### 1. GitHub Integration
1. Conecte o repositório ao Vercel
2. Configure auto-deploy
3. Configure branches de produção

### 2. CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📞 Suporte

- **Vercel Docs:** https://vercel.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Suporte Fenix:** suporte@fenixacademy.com.br

---

**Fenix Academy** - Deploy profissional no Vercel! 🚀
