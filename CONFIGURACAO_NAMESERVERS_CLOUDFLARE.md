# 🌐 CONFIGURAÇÃO NAMESERVERS - CLOUDFLARE

## ⚠️ **PROBLEMA IDENTIFICADO**

### **Status Atual**
- **Registro**: registro.br
- **Nameservers**: Padrão do registro.br
- **DNS**: Não configurado no Cloudflare
- **Solução**: Alterar nameservers para Cloudflare

---

## 🛠️ **SOLUÇÃO: ALTERAR NAMESERVERS**

### **1. Acesse o Painel do Registro.br**
- Faça login em https://registro.br
- Vá para "Meus Domínios"
- Clique em "fenixdevacademy.com"
- Vá para "Nameservers"

### **2. Configure os Nameservers do Cloudflare**
```
ns1.cloudflare.com
ns2.cloudflare.com
```

### **3. Salve as Alterações**
- Clique em "Salvar"
- Aguarde confirmação
- Tempo de propagação: 2-24 horas

---

## 🔧 **CONFIGURAÇÃO COMPLETA**

### **Passo 1: Nameservers (Registro.br)**
```
ns1.cloudflare.com
ns2.cloudflare.com
```

### **Passo 2: DNS (Cloudflare)**
```
Tipo: A
Nome: @
Conteúdo: 76.76.21.21
Proxy: ✅ Ativado

Tipo: CNAME
Nome: www
Conteúdo: cname.vercel-dns.com
Proxy: ✅ Ativado
```

---

## ⏱️ **TEMPO DE PROPAGAÇÃO**

### **Nameservers (Registro.br)**
- **Tempo**: 2-24 horas
- **Máximo**: 48 horas
- **Verificação**: nslookup fenixdevacademy.com

### **DNS (Cloudflare)**
- **Tempo**: 15-30 minutos
- **Máximo**: 1 hora
- **Verificação**: nslookup fenixdevacademy.com

---

## 🔍 **VERIFICAÇÃO**

### **Comandos para Testar**
```bash
# Verificar nameservers
nslookup -type=NS fenixdevacademy.com

# Verificar DNS
nslookup fenixdevacademy.com
nslookup www.fenixdevacademy.com
```

### **Resultado Esperado (Nameservers)**
```
fenixdevacademy.com
nameserver = ns1.cloudflare.com
nameserver = ns2.cloudflare.com
```

### **Resultado Esperado (DNS)**
```
fenixdevacademy.com
Address: 76.76.21.21

www.fenixdevacademy.com
Address: 76.76.21.21
```

---

## 🚨 **TROUBLESHOOTING**

### **Se Ainda Não Funcionar**

#### **1. Verifique Nameservers**
```bash
nslookup -type=NS fenixdevacademy.com
```
**Deve mostrar**: ns1.cloudflare.com e ns2.cloudflare.com

#### **2. Aguarde Propagação**
- **Nameservers**: 2-24 horas
- **DNS**: 15-30 minutos
- **Total**: 2-24 horas

#### **3. Teste Diferentes DNS**
```bash
nslookup fenixdevacademy.com 8.8.8.8
nslookup fenixdevacademy.com 1.1.1.1
```

---

## 🎯 **CONFIGURAÇÃO FINAL**

### **Registro.br**
```
Nameservers:
ns1.cloudflare.com
ns2.cloudflare.com
```

### **Cloudflare**
```
Tipo: A
Nome: @
Conteúdo: 76.76.21.21
Proxy: ✅ Ativado

Tipo: CNAME
Nome: www
Conteúdo: cname.vercel-dns.com
Proxy: ✅ Ativado
```

---

## 🚀 **PRÓXIMOS PASSOS**

1. **Alterar nameservers** no registro.br
2. **Aguardar propagação** (2-24 horas)
3. **Configurar DNS** no Cloudflare
4. **Testar domínio** https://fenixdevacademy.com
5. **Lançar campanhas** de marketing

---

## 💡 **DICA IMPORTANTE**

**O Cloudflare é MUITO mais rápido que o registro.br!**

- **Registro.br**: 2-24 horas
- **Cloudflare**: 15-30 minutos
- **Resultado**: Domínio funcionando rapidamente

**Altere os nameservers AGORA para acelerar o processo!** ⚡
