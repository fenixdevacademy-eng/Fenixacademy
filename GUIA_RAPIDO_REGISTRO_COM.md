# ⚡ GUIA RÁPIDO - REGISTRO.COM

## 🎯 **CONFIGURAÇÃO EM 15 MINUTOS**

### **1. CONFIGURAR DNS (5 minutos)**

#### **Acessar Painel**
1. Vá em: https://registro.com
2. Faça login
3. Clique em "Meus Domínios"
4. Clique em "Gerenciar" no `fenixdevacademy.com`

#### **Configurar DNS**
1. Clique em "DNS" ou "Zona DNS"
2. Clique em "Gerenciar Registros DNS"
3. Adicione estes registros:

```
A     @     76.76.19.61
CNAME www   cname.vercel-dns.com
CNAME api   cname.vercel-dns.com
CNAME app   cname.vercel-dns.com
```

### **2. CONFIGURAR VERCEL (5 minutos)**

#### **Adicionar Domínio**
```bash
vercel domains add fenixdevacademy.com
```

#### **Deploy da Aplicação**
```bash
vercel --prod
```

### **3. TESTAR (5 minutos)**

#### **Verificar se Funciona**
```bash
curl https://fenixdevacademy.com
```

#### **Abrir no Navegador**
```
https://fenixdevacademy.com
```

---

## 🚀 **SCRIPT AUTOMÁTICO**

### **Executar Configuração Completa**
```powershell
.\scripts\configurar-dominio-registro.ps1
```

### **Apenas Testar**
```powershell
.\scripts\configurar-dominio-registro.ps1 -TestOnly
```

---

## ⏱️ **TEMPO DE PROPAGAÇÃO**

- **Mínimo**: 15 minutos
- **Médio**: 2-4 horas
- **Máximo**: 24-48 horas

---

## 🎉 **PRONTO!**

Sua Fenix Academy estará online em:
- **https://fenixdevacademy.com**
- **https://www.fenixdevacademy.com**

**Tempo total: 15 minutos**
