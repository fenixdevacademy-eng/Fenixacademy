# 🚀 DEPLOY RÁPIDO - FENIX ACADEMY

## 🎯 **PASSO A PASSO PARA COLOCAR NO AR**

### **1. PREPARAÇÃO (5 minutos)**

```powershell
# 1. Instalar Vercel CLI (se não tiver)
npm install -g vercel

# 2. Fazer login no Vercel
vercel login

# 3. Verificar se está na pasta correta
ls package.json
```

### **2. DEPLOY AUTOMÁTICO (10 minutos)**

```powershell
# Executar script de deploy
.\scripts\deploy-fenixdevacademy.ps1

# Ou com opções:
.\scripts\deploy-fenixdevacademy.ps1 -SkipTests -Force
```

### **3. CONFIGURAÇÃO MANUAL (15 minutos)**

#### **A. Configurar Domínio no Vercel**
1. Acesse: https://vercel.com/dashboard
2. Vá em "Settings" → "Domains"
3. Adicione: `fenixdevacademy.com`
4. Adicione: `www.fenixdevacademy.com`

#### **B. Configurar DNS no Provedor**
```
Tipo: A
Nome: @
Valor: 76.76.19.61

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

#### **C. Configurar Variáveis de Ambiente**
1. Vercel Dashboard → "Settings" → "Environment Variables"
2. Adicionar as variáveis do arquivo `env.production.example`

### **4. TESTE FINAL (5 minutos)**

```powershell
# Testar se está funcionando
curl https://fenixdevacademy.com

# Ou abrir no navegador
start https://fenixdevacademy.com
```

---

## ⚡ **COMANDOS RÁPIDOS**

### **Deploy Simples**
```powershell
vercel --prod
```

### **Ver Logs**
```powershell
vercel logs
```

### **Rollback**
```powershell
vercel rollback
```

### **Status**
```powershell
vercel ls
```

---

## 🔧 **SOLUÇÃO DE PROBLEMAS**

### **Erro: "Domain not found"**
- Aguardar propagação DNS (24-48h)
- Verificar configuração DNS no provedor

### **Erro: "Build failed"**
- Verificar logs: `vercel logs`
- Testar localmente: `npm run build`

### **Erro: "Environment variables"**
- Configurar no dashboard do Vercel
- Verificar arquivo `env.production.example`

---

## 📱 **URLS IMPORTANTES**

- **Site**: https://fenixdevacademy.com
- **Dashboard**: https://vercel.com/dashboard
- **Logs**: `vercel logs`
- **Analytics**: https://vercel.com/analytics

---

## 🎉 **PRONTO!**

Sua Fenix Academy estará online em:
- **URL Principal**: https://fenixdevacademy.com
- **URL Alternativa**: https://www.fenixdevacademy.com

**Tempo total estimado: 30 minutos**
