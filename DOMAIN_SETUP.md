# 🌐 Configuração de Domínio Personalizado - Fenix Academy

## 📋 Status Atual
- **Domínio:** fenixacademy.com.br
- **Status:** Adicionado ao Vercel
- **Configuração:** Pendente (DNS)

## 🔧 Configuração DNS

### Opção A: Registro A (Recomendada)
Adicione este registro no seu provedor de DNS:

```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600
```

### Opção B: Nameservers
Altere os nameservers para:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

## 📝 Passo a Passo por Provedor

### Registro.br
1. Acesse: https://registro.br
2. Faça login na sua conta
3. Vá em "Meus Domínios"
4. Clique em "Gerenciar DNS"
5. Adicione o registro A: `76.76.21.21`

### GoDaddy
1. Acesse: https://godaddy.com
2. Faça login
3. Vá em "Meus Produtos" > "DNS"
4. Adicione registro A: `76.76.21.21`

### Cloudflare
1. Acesse: https://cloudflare.com
2. Adicione o domínio
3. Vá em "DNS" > "Records"
4. Adicione registro A: `76.76.21.21`

## ✅ Verificação

### Comandos Vercel
```bash
# Ver status dos domínios
vercel domains ls

# Verificar configuração
vercel domains inspect fenixacademy.com.br

# Ver logs de verificação
vercel logs --follow
```

### Teste Manual
```bash
# Testar resolução DNS
nslookup fenixacademy.com.br

# Testar conectividade
ping fenixacademy.com.br

# Testar HTTPS
curl -I https://fenixacademy.com.br
```

## ⏱️ Tempo de Propagação
- **DNS:** 5-60 minutos
- **Verificação Vercel:** 1-24 horas
- **SSL:** Automático após verificação

## 🔒 SSL/HTTPS
- **Configuração:** Automática
- **Renovação:** Automática
- **Certificado:** Let's Encrypt

## 📊 Monitoramento

### Status do Domínio
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Seção Domains:** Verificar status
- **Logs:** Monitorar erros

### Alertas
- **Email:** Receberá notificação quando estiver ativo
- **Dashboard:** Status atualizado em tempo real

## 🚨 Troubleshooting

### Problemas Comuns

1. **DNS não propagou:**
   - Aguarde até 24 horas
   - Verifique se o registro está correto
   - Use ferramentas online de DNS lookup

2. **SSL não funciona:**
   - Aguarde verificação do Vercel
   - Verifique se o domínio está apontando corretamente

3. **Site não carrega:**
   - Verifique configuração DNS
   - Aguarde propagação completa

### Comandos de Debug
```bash
# Verificar DNS
dig fenixacademy.com.br

# Verificar SSL
openssl s_client -connect fenixacademy.com.br:443

# Verificar headers
curl -I https://fenixacademy.com.br
```

## 🎯 Próximos Passos

1. **Configurar DNS** (5-10 minutos)
2. **Aguardar verificação** (1-24 horas)
3. **Testar site** (verificar se carrega)
4. **Configurar subdomínios** (opcional)
5. **Configurar email** (opcional)

## 📞 Suporte

- **Vercel Docs:** https://vercel.com/docs/domains
- **Registro.br:** https://registro.br/atendimento
- **Suporte Fenix:** suporte@fenixacademy.com.br

---

**Fenix Academy** - Domínio profissional configurado! 🌐
