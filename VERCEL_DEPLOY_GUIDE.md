# 🚀 Guia de Deploy da Fênix Dev Academy no Vercel

## 📋 Pré-requisitos

1. **Conta no Vercel**: [vercel.com](https://vercel.com)
2. **Projeto no GitHub**: Repositório da Fênix Dev Academy
3. **Domínio**: fenixdevacademy.com.br (opcional)

## 🔧 Configuração do Projeto

### 1. Arquivos de Configuração

- ✅ `vercel.json` - Configuração do Vercel
- ✅ `frontend/next.config.js` - Configuração otimizada do Next.js
- ✅ `frontend/package.json` - Dependências e scripts

### 2. Variáveis de Ambiente

```bash
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com.br
NEXT_PUBLIC_APP_NAME=Fênix Dev Academy
NODE_ENV=production
```

## 🚀 Deploy no Vercel

### Método 1: Deploy via Dashboard

1. **Acesse o Vercel Dashboard**
   - Vá para [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Importar Projeto**
   - Clique em "New Project"
   - Conecte sua conta do GitHub
   - Selecione o repositório `Fenixacademy`

3. **Configurar Projeto**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. **Variáveis de Ambiente**
   ```
   NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com.br
   NEXT_PUBLIC_APP_NAME=Fênix Dev Academy
   NODE_ENV=production
   ```

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build completar

### Método 2: Deploy via CLI

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

## 🌐 Configuração de Domínio

### 1. Domínio Personalizado

1. **No Dashboard do Vercel**
   - Vá para Settings > Domains
   - Adicione `fenixdevacademy.com.br`

2. **Configurar DNS**
   ```
   Tipo: CNAME
   Nome: www
   Valor: cname.vercel-dns.com
   
   Tipo: A
   Nome: @
   Valor: 76.76.19.61
   ```

### 2. SSL Automático

- ✅ O Vercel fornece SSL automático
- ✅ Certificados renovados automaticamente
- ✅ HTTPS obrigatório

## 📊 Vantagens do Vercel

### ✅ Compatibilidade
- **Next.js nativo** - Suporte completo
- **API Routes** - Funcionam perfeitamente
- **Serverless Functions** - Escalabilidade automática
- **Edge Functions** - Performance global

### ✅ Performance
- **CDN Global** - Entrega rápida mundial
- **Edge Caching** - Cache inteligente
- **Image Optimization** - Otimização automática
- **Automatic HTTPS** - Segurança garantida

### ✅ Desenvolvimento
- **Preview Deploys** - Deploy automático em PRs
- **Analytics** - Métricas detalhadas
- **Speed Insights** - Análise de performance
- **Web Vitals** - Core Web Vitals

## 🔧 Configurações Avançadas

### 1. Build Optimization

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### 2. Environment Variables

```bash
# Produção
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com.br
NEXT_PUBLIC_APP_NAME=Fênix Dev Academy
NODE_ENV=production

# Desenvolvimento
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Fênix Dev Academy (Dev)
NODE_ENV=development
```

### 3. Custom Headers

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🚀 Scripts de Deploy

### 1. Deploy Automático

```bash
# package.json
{
  "scripts": {
    "deploy": "vercel --prod",
    "deploy:preview": "vercel",
    "build:vercel": "next build"
  }
}
```

### 2. Deploy com Build

```bash
npm run build:vercel
vercel --prod
```

## 📈 Monitoramento

### 1. Analytics
- **Page Views** - Visualizações de página
- **Unique Visitors** - Visitantes únicos
- **Top Pages** - Páginas mais visitadas
- **Referrers** - Fontes de tráfego

### 2. Performance
- **Core Web Vitals** - Métricas de performance
- **Speed Insights** - Análise de velocidade
- **Real User Monitoring** - Monitoramento real

## 🎯 Benefícios Específicos para a Fênix

### ✅ Resolução de Problemas
- **Sem erro de path undefined** - Vercel resolve automaticamente
- **Build estável** - Ambiente otimizado para Next.js
- **Deploy rápido** - Build otimizado

### ✅ Funcionalidades Completas
- **API Routes** - Todas as APIs funcionam
- **Dynamic Routes** - Rotas dinâmicas suportadas
- **Server Components** - Componentes do servidor
- **Middleware** - Middleware do Next.js

### ✅ Escalabilidade
- **Serverless** - Escala automaticamente
- **Edge Network** - Rede global de borda
- **Zero Configuration** - Configuração mínima

## 🎉 Conclusão

O Vercel é a plataforma ideal para a Fênix Dev Academy porque:

- ✅ **Resolve todos os problemas** de build do Render
- ✅ **Suporte nativo** ao Next.js
- ✅ **Performance superior** com CDN global
- ✅ **Deploy automático** com GitHub
- ✅ **SSL automático** e segurança
- ✅ **Analytics integrado** e monitoramento

**A Fênix Dev Academy funcionará perfeitamente no Vercel!** 🚀
