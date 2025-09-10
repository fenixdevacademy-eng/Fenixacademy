# 🌐 CONFIGURAÇÃO DOMÍNIO - REGISTRO.COM

## 🎉 **DOMÍNIO ADQUIRIDO: fenixdevacademy.com**

### **Provedor: Registro.com**
### **Status: Ativo e pronto para configuração**

---

## 📋 **PASSO A PASSO - CONFIGURAÇÃO DNS**

### **1. ACESSAR PAINEL DO REGISTRO.COM**

#### **Login no Painel**
1. Acesse: https://registro.com
2. Faça login com suas credenciais
3. Vá em "Meus Domínios"
4. Clique em "Gerenciar" no domínio `fenixdevacademy.com`

### **2. CONFIGURAR DNS (ZONA DNS)**

#### **Acessar Zona DNS**
1. No painel do domínio, clique em "DNS" ou "Zona DNS"
2. Clique em "Gerenciar Registros DNS"
3. Adicione os seguintes registros:

#### **Registros DNS Necessários**

```
Tipo: A
Nome: @
Valor: 76.76.19.61
TTL: 3600
Descrição: Vercel A Record

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600
Descrição: Vercel CNAME Record

Tipo: CNAME
Nome: api
Valor: cname.vercel-dns.com
TTL: 3600
Descrição: Vercel API CNAME

Tipo: CNAME
Nome: app
Valor: cname.vercel-dns.com
TTL: 3600
Descrição: Vercel App CNAME
```

### **3. CONFIGURAR EMAIL (OPCIONAL)**

#### **Registros MX para Email**
```
Tipo: MX
Nome: @
Valor: mail.fenixdevacademy.com
Prioridade: 10
TTL: 3600

Tipo: TXT
Nome: @
Valor: v=spf1 include:_spf.google.com ~all
TTL: 3600
Descrição: SPF Record
```

---

## 🚀 **CONFIGURAÇÃO NO VERCEL**

### **1. ADICIONAR DOMÍNIO NO VERCEL**

#### **Via Dashboard**
1. Acesse: https://vercel.com/dashboard
2. Vá em "Settings" → "Domains"
3. Clique em "Add Domain"
4. Digite: `fenixdevacademy.com`
5. Clique em "Add"

#### **Via CLI**
```bash
vercel domains add fenixdevacademy.com
```

### **2. CONFIGURAR SUBDOMÍNIOS**

#### **Subdomínios Principais**
- `www.fenixdevacademy.com`
- `api.fenixdevacademy.com`
- `app.fenixdevacademy.com`
- `admin.fenixdevacademy.com`

### **3. CONFIGURAR SSL/TLS**

#### **SSL Automático**
- ✅ O Vercel configura SSL automaticamente
- ✅ Certificado Let's Encrypt
- ✅ Renovação automática
- ✅ HTTPS forçado

---

## ⚡ **COMANDOS RÁPIDOS**

### **Deploy da Aplicação**
```powershell
# Executar script de deploy
.\scripts\deploy-fenixdevacademy.ps1

# Ou deploy manual
vercel --prod
```

### **Verificar Status**
```bash
# Ver domínios configurados
vercel domains ls

# Ver logs da aplicação
vercel logs

# Ver status do deploy
vercel ls
```

### **Testar Domínio**
```powershell
# Testar se está funcionando
curl https://fenixdevacademy.com

# Ou abrir no navegador
start https://fenixdevacademy.com
```

---

## 🔧 **CONFIGURAÇÃO AVANÇADA**

### **1. CONFIGURAR CLOUDFLARE (OPCIONAL)**

#### **Adicionar Domínio no Cloudflare**
1. Acesse: https://cloudflare.com
2. Clique em "Add a Site"
3. Digite: `fenixdevacademy.com`
4. Escolha plano gratuito
5. Configure DNS no Cloudflare

#### **DNS no Cloudflare**
```
Tipo: A
Nome: @
Valor: 76.76.19.61
Proxy: ✅ (Laranja)

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
Proxy: ✅ (Laranja)
```

### **2. CONFIGURAR REDIRECIONAMENTOS**

#### **Redirects no Vercel (vercel.json)**
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

## ⏱️ **TEMPO DE PROPAGAÇÃO**

### **DNS Propagation**
- **Tempo mínimo**: 15 minutos
- **Tempo médio**: 2-4 horas
- **Tempo máximo**: 24-48 horas

### **Como Verificar**
```bash
# Verificar DNS
nslookup fenixdevacademy.com

# Verificar propagação
dig fenixdevacademy.com

# Testar online
https://dnschecker.org
```

---

## 🎯 **CHECKLIST DE CONFIGURAÇÃO**

### **✅ REGISTRO.COM**
- [ ] Login no painel
- [ ] Acessar zona DNS
- [ ] Configurar registro A (@)
- [ ] Configurar CNAME (www)
- [ ] Configurar CNAME (api)
- [ ] Configurar CNAME (app)
- [ ] Salvar alterações

### **✅ VERCEL**
- [ ] Adicionar domínio
- [ ] Configurar subdomínios
- [ ] Verificar SSL
- [ ] Configurar redirects
- [ ] Testar aplicação

### **✅ TESTE FINAL**
- [ ] Acessar https://fenixdevacademy.com
- [ ] Verificar SSL (cadeado verde)
- [ ] Testar www.fenixdevacademy.com
- [ ] Verificar redirects
- [ ] Testar performance

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Problema: "Domain not found"**
**Solução**: Aguardar propagação DNS (24-48h)

### **Problema: "SSL not working"**
**Solução**: Verificar configuração no Vercel

### **Problema: "Redirect not working"**
**Solução**: Verificar arquivo vercel.json

### **Problema: "Slow loading"**
**Solução**: Configurar Cloudflare CDN

---

## 📞 **SUPORTE TÉCNICO**

### **Registro.com**
- **Email**: suporte@registro.com
- **Telefone**: (11) 3003-3003
- **Chat**: Disponível no site

### **Vercel**
- **Email**: support@vercel.com
- **Documentação**: https://vercel.com/docs
- **Discord**: https://vercel.com/discord

---

## 🎉 **RESULTADO FINAL**

Após a configuração completa, você terá:

- ✅ **https://fenixdevacademy.com** - Site principal
- ✅ **https://www.fenixdevacademy.com** - Redireciona para principal
- ✅ **SSL/TLS** - Certificado válido
- ✅ **CDN** - Performance otimizada
- ✅ **Monitoramento** - Uptime garantido

---

**🚀 VAMOS CONFIGURAR SEU DOMÍNIO E COLOCAR A FENIX ACADEMY NO AR!**
