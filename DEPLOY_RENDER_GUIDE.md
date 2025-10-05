# 🚀 Deploy para Render - Guia Completo

## ✅ Problemas Resolvidos
- ✅ Páginas duplicadas removidas (manifest.webmanifest)
- ✅ Build do Next.js funcionando
- ✅ Configuração otimizada para Render

## 🔧 Configuração do Render

### 1. `render.yaml` Otimizado
```yaml
services:
  - type: web
    name: fenix-dev-academy
    env: node
    plan: starter
    buildCommand: |
      cd frontend
      npm cache clean --force
      rm -rf .next out node_modules/.cache .turbo
      npm install --production
      npm run build
    startCommand: cd frontend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_PUBLIC_APP_URL
        value: https://fenixdevacademy.com.br
      - key: NEXT_PUBLIC_APP_NAME
        value: Fênix Dev Academy
    healthCheckPath: /
    autoDeploy: true
    branch: main
    rootDir: frontend
    region: oregon
```

## 🚀 Como Fazer Deploy

### Opção 1: Deploy Automático (Recomendado)
```powershell
# Windows
.\deploy-render.ps1

# Linux/Mac
chmod +x deploy-render.sh
./deploy-render.sh
```

### Opção 2: Deploy Manual
```bash
# 1. Navegar para o frontend
cd frontend

# 2. Limpar cache
npm cache clean --force
Remove-Item -Recurse -Force .next, out, node_modules/.cache, .turbo -ErrorAction SilentlyContinue

# 3. Instalar dependências
npm install --production

# 4. Fazer build
npm run build

# 5. Voltar para raiz e fazer commit
cd ..
git add .
git commit -m "Deploy para Render"
git push origin main
```

## 📋 Configuração no Dashboard do Render

### 1. Conectar Repositório
1. Acesse [render.com](https://render.com)
2. Faça login na sua conta
3. Clique em "New +" → "Web Service"
4. Conecte seu repositório GitHub

### 2. Configurações do Serviço
- **Name**: `fenix-dev-academy`
- **Environment**: `Node`
- **Plan**: `Starter` (gratuito)
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Root Directory**: `frontend`

### 3. Build & Deploy
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Auto-Deploy**: `Yes`

### 4. Variáveis de Ambiente
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com.br
NEXT_PUBLIC_APP_NAME=Fênix Dev Academy
```

## 🔧 Configurações Avançadas

### 1. Health Check
- **Path**: `/`
- **Timeout**: `30s`

### 2. Build Settings
- **Node Version**: `18.x` (recomendado)
- **Build Command**: Automático via `render.yaml`
- **Publish Directory**: `.next`

### 3. Environment Variables
```bash
# Produção
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://fenixdevacademy.com.br
NEXT_PUBLIC_APP_NAME=Fênix Dev Academy

# Opcional - para APIs externas
NEXT_PUBLIC_API_URL=https://api.fenixdevacademy.com.br
```

## 📊 Vantagens do Render

### ✅ Prós
- **Gratuito**: Plano starter gratuito
- **Simples**: Deploy automático via Git
- **Rápido**: Build e deploy em minutos
- **Confiável**: Uptime de 99.9%
- **Escalável**: Upgrade fácil para planos pagos

### ⚠️ Limitações do Plano Gratuito
- **Sleep**: Aplicação "dorme" após 15min de inatividade
- **Build Time**: 90 minutos por mês
- **Bandwidth**: 100GB por mês
- **Custom Domain**: Disponível apenas em planos pagos

## 🚨 Troubleshooting

### Se o build falhar:
1. Verifique os logs no dashboard do Render
2. Confirme se todas as dependências estão no `package.json`
3. Verifique se o `render.yaml` está correto
4. Teste o build localmente primeiro

### Se a aplicação não iniciar:
1. Verifique se o `startCommand` está correto
2. Confirme se o build foi bem-sucedido
3. Verifique as variáveis de ambiente
4. Confira os logs de runtime

### Se houver erro de memória:
1. Upgrade para um plano pago
2. Otimize o bundle size
3. Use `npm ci` em vez de `npm install`

## 📈 Monitoramento

### 1. Logs
- Acesse o dashboard do Render
- Vá em "Logs" para ver logs em tempo real
- Use "Download Logs" para análise offline

### 2. Métricas
- **Uptime**: Monitoramento automático
- **Response Time**: Latência das requisições
- **Build Time**: Tempo de build
- **Memory Usage**: Uso de memória

### 3. Alertas
- Configure alertas para downtime
- Monitore uso de recursos
- Configure notificações por email

## 🎯 Próximos Passos

1. **Execute o deploy**:
   ```powershell
   .\deploy-render.ps1
   ```

2. **Acesse o dashboard do Render** para acompanhar o progresso

3. **Teste a aplicação** no domínio fornecido pelo Render

4. **Configure domínio customizado** (opcional, plano pago)

5. **Configure SSL** (automático no Render)

## 📞 Suporte

- **Documentação**: [render.com/docs](https://render.com/docs)
- **Status**: [status.render.com](https://status.render.com)
- **Community**: [community.render.com](https://community.render.com)

---

**🎉 Agora o deploy no Render deve funcionar perfeitamente!**
