# 🌐 CONFIGURAÇÃO DNS - CLOUDFLARE

## 🔧 **CONFIGURAÇÃO CORRETA NO CLOUDFLARE**

### **1. Acesse o Painel do Cloudflare**
- Faça login em https://dash.cloudflare.com
- Selecione o domínio "fenixdevacademy.com"
- Vá para "DNS" > "Records"

### **2. Configure os Registros DNS**

#### **Registro A (Domínio Raiz)**
```
Tipo: A
Nome: @
Conteúdo: 76.76.21.21
Proxy: 🟠 Proxied (Laranja)
TTL: Auto
```

#### **Registro CNAME (WWW)**
```
Tipo: CNAME
Nome: www
Conteúdo: cname.vercel-dns.com
Proxy: 🟠 Proxied (Laranja)
TTL: Auto
```

---

## ⚠️ **PROBLEMAS COMUNS E SOLUÇÕES**

### **1. "Não Atualiza" - Possíveis Causas**

#### **A) Cache do Cloudflare**
- **Solução**: Aguarde 5-10 minutos
- **Verificação**: Recarregue a página

#### **B) Propagação DNS**
- **Tempo**: 15-30 minutos
- **Verificação**: nslookup fenixdevacademy.com

#### **C) Configuração Incorreta**
- **Verifique**: Nome deve ser "@" (não "fenix")
- **Verifique**: IP deve ser 76.76.21.21

### **2. "Proxy Desabilitado"**
- **Ative**: Proxy (ícone laranja)
- **Importante**: Deve estar "Proxied" para funcionar

---

## 🛠️ **PASSO A PASSO DETALHADO**

### **Passo 1: Limpar Registros Existentes**
1. Delete todos os registros A e CNAME existentes
2. Mantenha apenas os registros NS (nameservers)

### **Passo 2: Adicionar Registro A**
1. Clique em "Add record"
2. Selecione "A"
3. Nome: `@`
4. Conteúdo: `76.76.21.21`
5. Proxy: ✅ Ativado (laranja)
6. TTL: Auto
7. Salve

### **Passo 3: Adicionar Registro CNAME**
1. Clique em "Add record"
2. Selecione "CNAME"
3. Nome: `www`
4. Conteúdo: `cname.vercel-dns.com`
5. Proxy: ✅ Ativado (laranja)
6. TTL: Auto
7. Salve

---

## 🔍 **VERIFICAÇÃO**

### **Comandos para Testar**
```bash
nslookup fenixdevacademy.com
nslookup www.fenixdevacademy.com
```

### **Resultado Esperado**
```
fenixdevacademy.com
Address: 76.76.21.21

www.fenixdevacademy.com
Address: 76.76.21.21
```

---

## ⏱️ **TEMPO DE PROPAGAÇÃO**

### **Cloudflare (Mais Rápido)**
- **Propagação**: 5-15 minutos
- **Máximo**: 30 minutos
- **Cache**: Atualizado automaticamente

### **Verificação Contínua**
```bash
# Teste a cada 5 minutos
nslookup fenixdevacademy.com
```

---

## 🚨 **TROUBLESHOOTING**

### **Se Ainda Não Funcionar**

#### **1. Verifique Nameservers**
- No registro.com, configure:
  - `ns1.cloudflare.com`
  - `ns2.cloudflare.com`

#### **2. Aguarde Propagação**
- Nameservers: 2-24 horas
- DNS: 15-30 minutos

#### **3. Teste Diferentes DNS**
```bash
nslookup fenixdevacademy.com 8.8.8.8
nslookup fenixdevacademy.com 1.1.1.1
```

---

## 🎯 **CONFIGURAÇÃO FINAL**

### **Registros Necessários**
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

### **Status Esperado**
- **Proxy**: 🟠 Laranja (Ativado)
- **TTL**: Auto
- **Status**: Ativo

---

## 🚀 **PRÓXIMOS PASSOS**

1. **Configure DNS** no Cloudflare
2. **Aguarde propagação** (15-30 minutos)
3. **Teste domínio** https://fenixdevacademy.com
4. **Verifique SSL** (cadeado verde)
5. **Lançar campanhas** de marketing

**O Cloudflare é mais rápido que o registro.com!** ⚡
