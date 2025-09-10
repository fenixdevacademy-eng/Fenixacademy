# 🌐 Configuração CDN - Cloudflare

## 📋 **Configuração Completa do CDN**

### **1. Configuração de Cache**

#### **Page Rules**
```
fenix-academy.com/*
- Cache Level: Standard
- Browser Cache TTL: 4 hours
- Edge Cache TTL: 1 month
- Compression: On
- Minification: HTML, CSS, JS
- Image Optimization: On
```

#### **Cache Rules**
```
# Static Assets
*.css, *.js, *.png, *.jpg, *.jpeg, *.gif, *.svg, *.ico
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 month

# API Routes
/api/*
- Cache Level: Bypass
- Browser Cache TTL: 0

# Pages
/*
- Cache Level: Standard
- Edge Cache TTL: 1 hour
- Browser Cache TTL: 4 hours
```

### **2. Configuração de Performance**

#### **Speed Optimizations**
- **Auto Minify**: HTML, CSS, JS
- **Brotli Compression**: On
- **Gzip Compression**: On
- **HTTP/2**: On
- **HTTP/3 (QUIC)**: On
- **0-RTT Connection Resumption**: On

#### **Image Optimization**
- **Polish**: Lossless
- **WebP**: On
- **AVIF**: On
- **Lazy Loading**: On
- **Responsive Images**: On

### **3. Configuração de Segurança**

#### **WAF Rules**
```
# SQL Injection Protection
(http.request.uri contains "union") or
(http.request.uri contains "select") or
(http.request.uri contains "insert") or
(http.request.uri contains "delete") or
(http.request.uri contains "drop") or
(http.request.uri contains "update")
- Action: Block

# XSS Protection
(http.request.uri contains "<script") or
(http.request.uri contains "javascript:") or
(http.request.uri contains "onload=") or
(http.request.uri contains "onerror=")
- Action: Block

# Path Traversal Protection
(http.request.uri contains "../") or
(http.request.uri contains "..\\") or
(http.request.uri contains "%2e%2e%2f") or
(http.request.uri contains "%2e%2e%5c")
- Action: Block
```

#### **Rate Limiting**
```
# API Rate Limiting
(http.request.uri contains "/api/")
- Rate: 100 requests per minute per IP
- Action: Challenge

# General Rate Limiting
- Rate: 1000 requests per minute per IP
- Action: Challenge
```

#### **Bot Management**
- **Bot Score**: 0-30 (Block), 31-70 (Challenge), 71-100 (Allow)
- **JavaScript Challenge**: On
- **CAPTCHA**: On for suspicious traffic
- **Browser Integrity Check**: On

### **4. Configuração de Monitoramento**

#### **Analytics**
- **Web Analytics**: On
- **Real User Monitoring**: On
- **Core Web Vitals**: On
- **Performance Monitoring**: On

#### **Alerts**
- **Uptime**: < 99.9%
- **Response Time**: > 2s
- **Error Rate**: > 1%
- **Bandwidth**: > 1TB/month

### **5. Configuração de SSL/TLS**

#### **SSL Settings**
- **SSL/TLS Encryption Mode**: Full (Strict)
- **Edge Certificates**: Universal SSL
- **Origin Certificates**: Custom
- **TLS Version**: 1.2+
- **Cipher Suites**: Modern

#### **Security Headers**
- **HSTS**: On
- **HSTS Preload**: On
- **OCSP Stapling**: On
- **Certificate Transparency**: On

### **6. Configuração de DNS**

#### **DNS Records**
```
# A Records
fenix-academy.com          A     76.76.19.61    (Vercel)
www.fenix-academy.com      A     76.76.19.61    (Vercel)
api.fenix-academy.com      A     76.76.19.61    (Vercel)
cdn.fenix-academy.com      A     76.76.19.61    (Vercel)

# CNAME Records
www.fenix-academy.com      CNAME    fenix-academy.com
api.fenix-academy.com      CNAME    fenix-academy.com
cdn.fenix-academy.com      CNAME    fenix-academy.com

# MX Records
fenix-academy.com          MX    10    mail.fenix-academy.com
fenix-academy.com          MX    20    mail2.fenix-academy.com

# TXT Records
fenix-academy.com          TXT    "v=spf1 include:_spf.google.com ~all"
fenix-academy.com          TXT    "google-site-verification=ABC123..."
fenix-academy.com          TXT    "v=DMARC1; p=quarantine; rua=mailto:dmarc@fenix-academy.com"
```

### **7. Configuração de Workers**

#### **Security Headers Worker**
```javascript
// Aplicar headers de segurança em todas as requisições
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  })
  
  // Adicionar headers de segurança
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  newResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  return newResponse
}
```

#### **Cache Worker**
```javascript
// Otimizar cache para diferentes tipos de conteúdo
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Cache estático por 1 mês
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    const response = await fetch(request)
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('Cache-Control', 'public, max-age=2592000, immutable')
    return newResponse
  }
  
  // Cache de páginas por 1 hora
  if (url.pathname.match(/^\/(?!api)/)) {
    const response = await fetch(request)
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('Cache-Control', 'public, max-age=3600')
    return newResponse
  }
  
  // API sem cache
  return fetch(request)
}
```

### **8. Configuração de Performance**

#### **Core Web Vitals Targets**
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTFB**: < 600ms

#### **Optimization Features**
- **Auto Minify**: HTML, CSS, JS
- **Brotli Compression**: On
- **Image Optimization**: On
- **Lazy Loading**: On
- **Preload**: Critical resources
- **Prefetch**: Next page resources

### **9. Configuração de Analytics**

#### **Cloudflare Analytics**
- **Web Analytics**: On
- **Real User Monitoring**: On
- **Core Web Vitals**: On
- **Performance Monitoring**: On

#### **Custom Events**
```javascript
// Track custom events
gtag('event', 'course_started', {
  'course_name': 'Python Data Science',
  'course_id': 'python-data-science',
  'user_id': 'user123'
})

gtag('event', 'lesson_completed', {
  'lesson_name': 'DataFrames and Series',
  'lesson_id': 'lesson-07',
  'module_id': 'module-02',
  'course_id': 'python-data-science'
})
```

### **10. Configuração de Backup**

#### **Backup Strategy**
- **Database**: Daily backups
- **Files**: Real-time sync
- **CDN**: Global replication
- **DNS**: Multi-provider

#### **Disaster Recovery**
- **RTO**: 4 hours
- **RPO**: 1 hour
- **Backup Locations**: 3 regions
- **Test Frequency**: Monthly

---

**🎉 CDN configurado e otimizado para máxima performance!**


