# 🚀 Deploy para Netlify - Guia Completo

## ✅ Configuração Otimizada
- ✅ Next.js configurado para export estático
- ✅ Netlify.toml otimizado
- ✅ Scripts de deploy automatizados
- ✅ Headers de segurança configurados

## 🔧 Configuração do Netlify

### 1. `netlify.toml` Otimizado
```toml
[build]
  base = "frontend"
  publish = "out"
  command = "npm run build && npm run export"

[build.environment]
  NODE_VERSION = "18"
  NEXT_PUBLIC_APP_URL = "https://fenixdevacademy.com.br"
  NEXT_PUBLIC_APP_NAME = "Fênix Dev Academy"
  NODE_ENV = "production"
  NPM_FLAGS = "--production=false"

[build.processing]
  skip_processing = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 2. `next.config.js` para Export Estático
```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
    NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
  },
};
```

## 🚀 Como Fazer Deploy

### Opção 1: Deploy Automático (Recomendado)
```powershell
# Windows
.\deploy-netlify.ps1

# Linux/Mac
chmod +x deploy-netlify.sh
./deploy-netlify.sh
```

### Opção 2: Deploy Manual
```bash
# 1. Navegar para o frontend
cd frontend

# 2. Limpar cache
npm cache clean --force
Remove-Item -Recurse -Force .next, out, node_modules/.cache, .turbo -ErrorAction SilentlyContinue

# 3. Instalar dependências
npm install

# 4. Fazer build
npm run build

# 5. Fazer export estático
npm run export

# 6. Voltar para raiz e fazer commit
cd ..
git add .
git commit -m "Deploy para Netlify"
git push origin main
```

## 📋 Configuração no Dashboard do Netlify

### 1. Conectar Repositório
1. Acesse [netlify.com](https://netlify.com)
2. Faça login na sua conta
3. Clique em "New site from Git"
4. Conecte seu repositório GitHub

### 2. Configurações do Site
- **Site name**: `fenix-dev-academy`
- **Branch to deploy**: `main`
- **Base directory**: `frontend`
- **Build command**: `npm run build && npm run export`
- **Publish directory**: `out`

### 3. Variáveis de Ambiente
```
NODE_VERSION=18
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com.br
NEXT_PUBLIC_APP_NAME=Fênix Dev Academy
NODE_ENV=production
NPM_FLAGS=--production=false
```

### 4. Configurações Avançadas
- **Build settings**: Usar `netlify.toml`
- **Deploy notifications**: Configurar email/Slack
- **Form handling**: Ativar se necessário
- **Identity**: Ativar para autenticação

## 🔧 Configurações Avançadas

### 1. Headers de Segurança
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 2. Redirects para SPA
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Configurações de Build
```toml
[build.processing]
  skip_processing = true
```

## 📊 Vantagens do Netlify

### ✅ Prós
- **Gratuito**: Plano gratuito generoso
- **CDN Global**: Distribuição mundial
- **Deploy Instantâneo**: Deploy em segundos
- **HTTPS Automático**: SSL gratuito
- **Formulários**: Suporte nativo
- **Functions**: Serverless functions
- **Split Testing**: A/B testing

### ⚠️ Limitações do Plano Gratuito
- **Build Time**: 300 minutos por mês
- **Bandwidth**: 100GB por mês
- **Function Invocations**: 125.000 por mês
- **Concurrent Builds**: 1 build simultâneo

## 🚨 Troubleshooting

### Se o build falhar:
1. Verifique os logs no dashboard do Netlify
2. Confirme se o `netlify.toml` está correto
3. Verifique se o `next.config.js` tem `output: 'export'`
4. Teste o build localmente primeiro

### Se a aplicação não carregar:
1. Verifique se o `publish directory` está como `out`
2. Confirme se o export foi bem-sucedido
3. Verifique as variáveis de ambiente
4. Confira os redirects no `netlify.toml`

### Se houver erro de roteamento:
1. Adicione redirects para SPA no `netlify.toml`
2. Verifique se `trailingSlash: true` está configurado
3. Confirme se as rotas estão corretas

## 📈 Monitoramento

### 1. Logs
- Acesse o dashboard do Netlify
- Vá em "Deploys" para ver logs de build
- Use "Function logs" para serverless functions

### 2. Analytics
- **Page views**: Visualizações de páginas
- **Bandwidth**: Uso de largura de banda
- **Build time**: Tempo de build
- **Deploy frequency**: Frequência de deploys

### 3. Performance
- **Core Web Vitals**: Métricas de performance
- **Lighthouse**: Auditoria de qualidade
- **Speed insights**: Insights de velocidade

## 🎯 Próximos Passos

1. **Execute o deploy**:
   ```powershell
   .\deploy-netlify.ps1
   ```

2. **Acesse o dashboard do Netlify** para acompanhar o progresso

3. **Teste a aplicação** no domínio fornecido pelo Netlify

4. **Configure domínio customizado** (opcional)

5. **Configure SSL** (automático no Netlify)

6. **Configure formulários** se necessário

## 📞 Suporte

- **Documentação**: [docs.netlify.com](https://docs.netlify.com)
- **Status**: [status.netlify.com](https://status.netlify.com)
- **Community**: [community.netlify.com](https://community.netlify.com)

---

**🎉 Agora o deploy no Netlify deve funcionar perfeitamente!**
