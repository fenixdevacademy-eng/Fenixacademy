# 🌐 Configuração de Domínio - Fenix Academy

## 📋 **Configuração DNS Completa**

### **1. Registro de Domínio**
- **Domínio Principal**: `fenix-academy.com`
- **Subdomínios**:
  - `www.fenix-academy.com` (redirecionamento)
  - `api.fenix-academy.com` (API)
  - `cdn.fenix-academy.com` (CDN)
  - `admin.fenix-academy.com` (Painel Admin)
  - `blog.fenix-academy.com` (Blog)
  - `docs.fenix-academy.com` (Documentação)

### **2. Configuração DNS (Cloudflare)**

#### **Registros A**
```
fenix-academy.com          A    76.76.19.61    (Vercel)
www.fenix-academy.com      A    76.76.19.61    (Vercel)
api.fenix-academy.com      A    76.76.19.61    (Vercel)
cdn.fenix-academy.com      A    76.76.19.61    (Vercel)
admin.fenix-academy.com    A    76.76.19.61    (Vercel)
blog.fenix-academy.com     A    76.76.19.61    (Vercel)
docs.fenix-academy.com     A    76.76.19.61    (Vercel)
```

#### **Registros CNAME**
```
www.fenix-academy.com      CNAME    fenix-academy.com
api.fenix-academy.com      CNAME    fenix-academy.com
cdn.fenix-academy.com      CNAME    fenix-academy.com
admin.fenix-academy.com    CNAME    fenix-academy.com
blog.fenix-academy.com     CNAME    fenix-academy.com
docs.fenix-academy.com     CNAME    fenix-academy.com
```

#### **Registros MX (Email)**
```
fenix-academy.com          MX    10    mail.fenix-academy.com
fenix-academy.com          MX    20    mail2.fenix-academy.com
```

#### **Registros TXT (Verificação)**
```
fenix-academy.com          TXT    "v=spf1 include:_spf.google.com ~all"
fenix-academy.com          TXT    "google-site-verification=ABC123..."
fenix-academy.com          TXT    "v=DMARC1; p=quarantine; rua=mailto:dmarc@fenix-academy.com"
```

### **3. Configuração SSL/TLS**
- **Certificado**: Let's Encrypt (automático via Vercel)
- **Versão TLS**: 1.2+ (mínimo)
- **Cipher Suites**: ECDHE-RSA-AES256-GCM-SHA384
- **HSTS**: Habilitado
- **OCSP Stapling**: Habilitado

### **4. Configuração CDN (Cloudflare)**
- **Cache Level**: Standard
- **Browser Cache TTL**: 4 horas
- **Edge Cache TTL**: 1 mês
- **Compression**: Gzip + Brotli
- **Minification**: HTML, CSS, JS
- **Image Optimization**: WebP + AVIF

### **5. Configuração de Performance**
- **HTTP/2**: Habilitado
- **HTTP/3**: Habilitado (QUIC)
- **Brotli Compression**: Habilitado
- **Image Optimization**: Automática
- **Lazy Loading**: Habilitado
- **Preload**: Recursos críticos

### **6. Configuração de Segurança**
- **WAF**: Cloudflare WAF
- **DDoS Protection**: Habilitado
- **Bot Management**: Habilitado
- **Rate Limiting**: 100 req/min por IP
- **Security Headers**: Implementados

### **7. Configuração de Monitoramento**
- **Uptime Monitoring**: 99.9% SLA
- **Performance Monitoring**: Real User Monitoring
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4

## 🚀 **Deploy Configuration**

### **Vercel Configuration**
```json
{
  "version": 2,
  "name": "fenix-academy",
  "alias": ["fenix-academy.com", "www.fenix-academy.com"],
  "env": {
    "NEXT_PUBLIC_DOMAIN": "fenix-academy.com",
    "NEXT_PUBLIC_API_URL": "https://api.fenix-academy.com",
    "NEXT_PUBLIC_CDN_URL": "https://cdn.fenix-academy.com"
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### **Environment Variables**
```bash
# Production
NEXT_PUBLIC_DOMAIN=fenix-academy.com
NEXT_PUBLIC_API_URL=https://api.fenix-academy.com
NEXT_PUBLIC_CDN_URL=https://cdn.fenix-academy.com
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# Database
DATABASE_URL=postgresql://user:pass@host:5432/fenix_academy
REDIS_URL=redis://host:6379

# Authentication
NEXTAUTH_URL=https://fenix-academy.com
NEXTAUTH_SECRET=your-secret-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@fenix-academy.com
SMTP_PASS=your-app-password

# Payment
STRIPE_PUBLIC_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# AI Services
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
```

## 📊 **Performance Targets**

### **Core Web Vitals**
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTFB**: < 600ms

### **Lighthouse Scores**
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### **Uptime SLA**
- **Target**: 99.9%
- **Monitoring**: 24/7
- **Alerting**: < 1 min

## 🔧 **Scripts de Deploy**

### **Deploy Automático**
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Deploying Fenix Academy..."

# Build
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to CDN
aws s3 sync ./out s3://fenix-academy-cdn --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id E1234567890 --paths "/*"

echo "✅ Deploy completed!"
```

### **Health Check**
```bash
#!/bin/bash
# health-check.sh

echo "🔍 Checking Fenix Academy health..."

# Check main domain
curl -f https://fenix-academy.com/health || exit 1

# Check API
curl -f https://api.fenix-academy.com/health || exit 1

# Check CDN
curl -f https://cdn.fenix-academy.com/health || exit 1

echo "✅ All services healthy!"
```

## 📈 **Analytics & Monitoring**

### **Google Analytics 4**
- **Property**: Fenix Academy
- **Measurement ID**: G-XXXXXXXXXX
- **Enhanced Ecommerce**: Habilitado
- **Custom Events**: Aulas, Cursos, Pagamentos

### **Sentry Error Tracking**
- **Project**: fenix-academy-frontend
- **DSN**: https://xxx@sentry.io/xxx
- **Release Tracking**: Habilitado
- **Performance Monitoring**: Habilitado

### **Uptime Monitoring**
- **Service**: UptimeRobot
- **Check Interval**: 5 minutos
- **Alert Channels**: Email, SMS, Slack
- **SLA**: 99.9%

## 🛡️ **Security Configuration**

### **Security Headers**
```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        }
      ]
    }
  ]
}
```

### **CSP (Content Security Policy)**
```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.fenix-academy.com;"
}
```

## 🌍 **Multi-Region Setup**

### **Regiões de Deploy**
- **Primary**: us-east-1 (Virginia)
- **Secondary**: eu-west-1 (Ireland)
- **Asia**: ap-southeast-1 (Singapore)

### **CDN Configuration**
- **CloudFront**: Global
- **Edge Locations**: 200+
- **Cache Strategy**: Cache-First
- **TTL**: 24 horas

## 📱 **Mobile Optimization**

### **PWA Configuration**
- **Service Worker**: Habilitado
- **Offline Support**: Básico
- **App Manifest**: Configurado
- **Install Prompt**: Customizado

### **Responsive Design**
- **Breakpoints**: Mobile, Tablet, Desktop
- **Touch Optimization**: Habilitado
- **Viewport**: Configurado
- **Performance**: Otimizado

---

**🎉 Sistema de domínio configurado e pronto para produção!**


