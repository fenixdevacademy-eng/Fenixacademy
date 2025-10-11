# CONFIGURAÇÃO DNS PARA CLOUDFLARE
# Instruções para configurar o DNS da Fênix Dev Academy

## 1. CONFIGURAÇÃO NO CLOUDFLARE

### A. Acesse o painel do Cloudflare:
- URL: https://dash.cloudflare.com
- Faça login na sua conta

### B. Adicione o domínio:
- Clique em "Add a Site"
- Digite: fenixdevacademy.com.br
- Escolha o plano (Free é suficiente)

### C. Configure os registros DNS:
```
Tipo    Nome                    Conteúdo                    TTL
A       fenixdevacademy.com.br  [IP_DO_CLOUDFLARE_PAGES]    Auto
CNAME   www                     fenixdevacademy.com.br      Auto
```

## 2. CONFIGURAÇÃO NO REGISTRADOR DE DOMÍNIO

### A. Acesse o painel do seu registrador (ex: Registro.br, GoDaddy, etc.)

### B. Altere os nameservers para:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

## 3. CONFIGURAÇÃO NO CLOUDFLARE PAGES

### A. Acesse Cloudflare Pages:
- URL: https://dash.cloudflare.com/pages

### B. Conecte o repositório GitHub:
- Clique em "Create a project"
- Conecte: https://github.com/fenixdevacademy-eng/Fenixacademy.git
- Branch: main
- Build command: cd frontend && npm run build:cloudflare
- Build output directory: frontend/out

### C. Configure o domínio personalizado:
- Vá em "Custom domains"
- Adicione: fenixdevacademy.com.br
- Adicione: www.fenixdevacademy.com.br

## 4. CONFIGURAÇÕES DE CACHE

### A. Acesse "Caching" → "Configuration":
- Caching Level: Standard
- Browser Cache TTL: 4 hours
- Always Online: On

### B. Configure "Page Rules":
```
fenixdevacademy.com.br/*
- Cache Level: Bypass
- Browser Cache TTL: 0 seconds
```

## 5. VERIFICAÇÃO

### A. Aguarde a propagação DNS (24-48h)

### B. Teste os domínios:
- https://fenixdevacademy.com.br
- https://www.fenixdevacademy.com.br

### C. Verifique o status:
- Deploy Version: 2025.01.15.005
- IDE Status: ✅ READY
- IntelliSense: ✅ ACTIVE

## 6. BENEFÍCIOS DO CLOUDFLARE

✅ Cache global inteligente
✅ SSL/TLS automático
✅ Proteção DDoS
✅ CDN mundial
✅ Analytics detalhados
✅ Deploy automático via GitHub
✅ Domínios personalizados gratuitos
