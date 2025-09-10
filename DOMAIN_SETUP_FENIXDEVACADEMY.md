# 🌐 CONFIGURAÇÃO DO DOMÍNIO - FENIXDEVACADEMY.COM

## 🎉 **DOMÍNIO ADQUIRIDO: fenixdevacademy.com**

Agora vamos configurar tudo para colocar a Fenix Academy online!

---

## 📋 **CHECKLIST DE CONFIGURAÇÃO**

### ✅ **1. CONFIGURAÇÃO DNS (PRIORIDADE ALTA)**

#### **Registro A (Principal)**
```
Tipo: A
Nome: @
Valor: 76.76.19.61 (Vercel)
TTL: 3600
```

#### **Registro CNAME (www)**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600
```

#### **Registro CNAME (api)**
```
Tipo: CNAME
Nome: api
Valor: cname.vercel-dns.com
TTL: 3600
```

---

### ✅ **2. CONFIGURAÇÃO VERCEL**

#### **Deploy da Aplicação**
1. Conectar repositório GitHub ao Vercel
2. Configurar domínio personalizado
3. Configurar variáveis de ambiente

#### **Variáveis de Ambiente**
```env
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_ANALYTICS_ID=G-...
DATABASE_URL=postgresql://...
```

---

### ✅ **3. CONFIGURAÇÃO SSL/TLS**

#### **Let's Encrypt (Automático no Vercel)**
- ✅ Certificado SSL automático
- ✅ Renovação automática
- ✅ HTTPS forçado

#### **Cloudflare (Opcional)**
- ✅ CDN global
- ✅ Proteção DDoS
- ✅ Cache otimizado

---

### ✅ **4. CONFIGURAÇÃO CLOUDFLARE**

#### **DNS Settings**
```
A     @     76.76.19.61     Proxied
CNAME www   cname.vercel-dns.com  Proxied
CNAME api   cname.vercel-dns.com  Proxied
```

#### **SSL/TLS Settings**
- ✅ Full (Strict)
- ✅ Always Use HTTPS: ON
- ✅ HSTS: ON

#### **Security Settings**
- ✅ Security Level: Medium
- ✅ Bot Fight Mode: ON
- ✅ Challenge Passage: 30 minutes

---

### ✅ **5. CONFIGURAÇÃO DE EMAIL**

#### **Registro MX (Email)**
```
Tipo: MX
Nome: @
Valor: mail.fenixdevacademy.com
Prioridade: 10
TTL: 3600
```

#### **Registro TXT (SPF)**
```
Tipo: TXT
Nome: @
Valor: v=spf1 include:_spf.google.com ~all
TTL: 3600
```

#### **Registro TXT (DKIM)**
```
Tipo: TXT
Nome: default._domainkey
Valor: [Chave DKIM do Google Workspace]
TTL: 3600
```

---

### ✅ **6. CONFIGURAÇÃO DE SUBDOMÍNIOS**

#### **Subdomínios Principais**
- `app.fenixdevacademy.com` - Aplicação principal
- `api.fenixdevacademy.com` - API backend
- `admin.fenixdevacademy.com` - Painel administrativo
- `blog.fenixdevacademy.com` - Blog da empresa
- `docs.fenixdevacademy.com` - Documentação

#### **Configuração DNS para Subdomínios**
```
CNAME app    cname.vercel-dns.com  Proxied
CNAME api    cname.vercel-dns.com  Proxied
CNAME admin  cname.vercel-dns.com  Proxied
CNAME blog   cname.vercel-dns.com  Proxied
CNAME docs   cname.vercel-dns.com  Proxied
```

---

### ✅ **7. CONFIGURAÇÃO DE REDIRECIONAMENTOS**

#### **Redirects Importantes**
- `http://fenixdevacademy.com` → `https://fenixdevacademy.com`
- `http://www.fenixdevacademy.com` → `https://fenixdevacademy.com`
- `https://www.fenixdevacademy.com` → `https://fenixdevacademy.com`

#### **Configuração no Vercel**
```json
{
  "redirects": [
    {
      "source": "http://fenixdevacademy.com/(.*)",
      "destination": "https://fenixdevacademy.com/$1",
      "permanent": true
    },
    {
      "source": "http://www.fenixdevacademy.com/(.*)",
      "destination": "https://fenixdevacademy.com/$1",
      "permanent": true
    },
    {
      "source": "https://www.fenixdevacademy.com/(.*)",
      "destination": "https://fenixdevacademy.com/$1",
      "permanent": true
    }
  ]
}
```

---

### ✅ **8. CONFIGURAÇÃO DE MONITORAMENTO**

#### **Uptime Monitoring**
- ✅ UptimeRobot (Gratuito)
- ✅ Pingdom (Premium)
- ✅ StatusCake (Gratuito)

#### **Analytics**
- ✅ Google Analytics 4
- ✅ Google Search Console
- ✅ Vercel Analytics

---

### ✅ **9. CONFIGURAÇÃO DE SEGURANÇA**

#### **Headers de Segurança**
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

---

### ✅ **10. CONFIGURAÇÃO DE PERFORMANCE**

#### **CDN (Cloudflare)**
- ✅ Cache estático
- ✅ Minificação automática
- ✅ Compressão Gzip/Brotli
- ✅ HTTP/2 e HTTP/3

#### **Otimizações Next.js**
- ✅ Image Optimization
- ✅ Font Optimization
- ✅ Bundle Analysis
- ✅ Code Splitting

---

## 🚀 **PRÓXIMOS PASSOS IMEDIATOS**

### **1. Configurar DNS (HOJE)**
1. Acessar painel do provedor de domínio
2. Configurar registros A e CNAME
3. Aguardar propagação (24-48h)

### **2. Deploy no Vercel (HOJE)**
1. Conectar repositório GitHub
2. Configurar domínio personalizado
3. Configurar variáveis de ambiente

### **3. Configurar Cloudflare (AMANHÃ)**
1. Adicionar domínio no Cloudflare
2. Configurar DNS
3. Ativar SSL/TLS

### **4. Testar Aplicação (AMANHÃ)**
1. Testar HTTPS
2. Testar redirecionamentos
3. Testar performance

---

## 📞 **SUPORTE TÉCNICO**

### **Problemas Comuns**
- **DNS não propagou**: Aguardar 24-48h
- **SSL não funciona**: Verificar configuração Cloudflare
- **Redirecionamento não funciona**: Verificar configuração Vercel

### **Contatos de Suporte**
- **Vercel**: support@vercel.com
- **Cloudflare**: support@cloudflare.com
- **Provedor de Domínio**: [Seu provedor]

---

## 🎯 **RESULTADO FINAL**

Após a configuração completa, você terá:

- ✅ **https://fenixdevacademy.com** - Site principal
- ✅ **https://www.fenixdevacademy.com** - Redireciona para principal
- ✅ **SSL/TLS** - Certificado válido
- ✅ **CDN** - Performance otimizada
- ✅ **Monitoramento** - Uptime garantido

---

*Configuração baseada nas melhores práticas de segurança e performance para aplicações Next.js em produção.*

