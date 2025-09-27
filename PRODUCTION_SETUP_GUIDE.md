# 🚀 Guia de Configuração para Produção - Fênix Academy

## 🌐 Servidor de Produção: fenixdevacademy.com.br

### ❌ Problemas Identificados no Servidor de Produção

1. **Banco de Dados**: Sistema tentando usar banco local (SQLite) em produção
2. **Variáveis de Ambiente**: Faltam configurações essenciais no Vercel
3. **APIs 401/404**: Middleware e rotas não configurados para produção
4. **Seed de Dados**: Usuários não existem no banco de produção

### 🔧 Soluções Necessárias

#### 1. **Configurar Banco de Dados de Produção**

**Opção A: PostgreSQL no Vercel (Recomendado)**
```bash
# Instalar Vercel Postgres
vercel addons create postgres

# Configurar variável de ambiente
vercel env add DATABASE_URL
# Cole a URL do banco: postgres://username:password@host:port/database
```

**Opção B: Supabase (Gratuito)**
1. Acesse: https://supabase.com
2. Crie um novo projeto
3. Copie a URL de conexão
4. Configure no Vercel:
```bash
vercel env add DATABASE_URL
# Cole: postgresql://postgres:[password]@[host]:5432/postgres
```

#### 2. **Configurar Variáveis de Ambiente no Vercel**

```bash
# JWT Secret
vercel env add JWT_SECRET
# Valor: uma string aleatória longa e segura

# NextAuth Secret
vercel env add NEXTAUTH_SECRET
# Valor: uma string aleatória longa e segura

# URL da Aplicação
vercel env add NEXT_PUBLIC_APP_URL
# Valor: https://fenixdevacademy.com.br

# URL da API
vercel env add NEXT_PUBLIC_API_URL
# Valor: https://fenixdevacademy.com.br/api
```

#### 3. **Atualizar Schema do Prisma para Produção**

**Arquivo**: `frontend/prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### 4. **Executar Migrações e Seed em Produção**

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma db push

# Executar seed (apenas uma vez)
npx tsx scripts/seed-fixed.ts
```

#### 5. **Configurar Domínio Personalizado**

```bash
# Adicionar domínio personalizado
vercel domains add fenixdevacademy.com.br

# Configurar DNS
# Aponte o domínio para o Vercel
```

### 📋 Checklist de Configuração

#### ✅ **Banco de Dados**
- [ ] Banco PostgreSQL configurado
- [ ] DATABASE_URL configurada no Vercel
- [ ] Schema Prisma atualizado
- [ ] Migrações executadas
- [ ] Seed executado (usuários criados)

#### ✅ **Variáveis de Ambiente**
- [ ] JWT_SECRET configurado
- [ ] NEXTAUTH_SECRET configurado
- [ ] NEXT_PUBLIC_APP_URL configurado
- [ ] NEXT_PUBLIC_API_URL configurado

#### ✅ **APIs e Middleware**
- [ ] Middleware de autenticação funcionando
- [ ] APIs protegidas funcionando
- [ ] Rotas dinâmicas funcionando
- [ ] PWA manifest corrigido

#### ✅ **Testes**
- [ ] Login funcionando
- [ ] APIs retornando dados
- [ ] Console sem erros
- [ ] Páginas carregando

### 🚀 **Comandos para Executar**

#### 1. **Configurar Variáveis de Ambiente**
```bash
# JWT Secret
vercel env add JWT_SECRET
# Cole: fenix-academy-jwt-secret-2024-production

# NextAuth Secret
vercel env add NEXTAUTH_SECRET
# Cole: fenix-academy-nextauth-secret-2024-production

# URLs
vercel env add NEXT_PUBLIC_APP_URL
# Cole: https://fenixdevacademy.com.br

vercel env add NEXT_PUBLIC_API_URL
# Cole: https://fenixdevacademy.com.br/api
```

#### 2. **Configurar Banco de Dados**
```bash
# Adicionar PostgreSQL
vercel addons create postgres

# Configurar DATABASE_URL
vercel env add DATABASE_URL
# Cole a URL do banco PostgreSQL
```

#### 3. **Deploy com Configurações**
```bash
# Deploy para produção
vercel --prod

# Verificar logs
vercel logs --follow
```

### 🔍 **Verificações Pós-Deploy**

#### 1. **Testar APIs**
```bash
# Status da aplicação
curl https://fenixdevacademy.com.br/api/status

# Login (teste)
curl -X POST https://fenixdevacademy.com.br/api/auth/login-simple \
  -H "Content-Type: application/json" \
  -d '{"email":"contato@fenixdevacademy.com","password":"060223lk"}'
```

#### 2. **Verificar Console**
- Acesse: https://fenixdevacademy.com.br
- Abra DevTools (F12)
- Verifique se não há erros 401/404

#### 3. **Testar Login**
- Acesse: https://fenixdevacademy.com.br/auth/login
- Use: `contato@fenixdevacademy.com` / `060223lk`
- Verifique se redireciona para dashboard

### 🆘 **Solução de Problemas**

#### **Erro: "Database connection failed"**
- Verifique se DATABASE_URL está correta
- Confirme se o banco está acessível
- Teste conexão localmente

#### **Erro: "JWT verification failed"**
- Verifique se JWT_SECRET está configurado
- Confirme se é o mesmo em todas as instâncias

#### **Erro: "User not found"**
- Execute o seed: `npx tsx scripts/seed-fixed.ts`
- Verifique se usuários foram criados no banco

#### **Erro: "API route not found"**
- Verifique se as rotas estão corretas
- Confirme se o deploy incluiu todos os arquivos

### 📞 **Suporte**

Se precisar de ajuda com a configuração:
1. Verifique os logs: `vercel logs --follow`
2. Teste localmente primeiro
3. Use o ambiente de desenvolvimento para debug

---

**Status**: 🔧 **CONFIGURAÇÃO NECESSÁRIA**

O sistema está pronto, mas precisa das configurações de produção para funcionar no servidor real!

