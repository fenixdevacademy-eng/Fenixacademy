# Deploy no Render - Fênix Dev Academy

## Configuração do Deploy

### 1. Criar conta no Render
- Acesse [render.com](https://render.com)
- Crie uma conta ou faça login

### 2. Conectar repositório
- Conecte seu repositório GitHub ao Render
- Selecione o repositório `Fenix`

### 3. Configurar Web Service
- **Name**: `fenix-dev-academy`
- **Environment**: `Node`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: `npm start`

### 4. Configurar Database
- Crie um PostgreSQL database
- **Name**: `fenix-db`
- **Plan**: `Free` (para começar)
- **Database**: `fenix`
- **User**: `fenix_user`

### 5. Variáveis de Ambiente
Configure as seguintes variáveis de ambiente no Render:

```env
NODE_ENV=production
DATABASE_URL=postgresql://fenix_user:password@dpg-xxxxx-a.oregon-postgres.render.com/fenix_db
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
JWT_EXPIRES_IN=7d
NEXTAUTH_URL=https://fenix-dev-academy.onrender.com
NEXTAUTH_SECRET=seu-nextauth-secret-aqui
```

### 6. Deploy
- Clique em "Create Web Service"
- Aguarde o build e deploy (pode levar alguns minutos)

## Troubleshooting

### Erro de Build
Se houver erro de build, verifique:
1. Se todas as dependências estão no `package.json`
2. Se o Prisma Client está sendo gerado corretamente
3. Se as variáveis de ambiente estão configuradas

### Erro de Database
Se houver erro de database:
1. Verifique se a `DATABASE_URL` está correta
2. Execute as migrações: `npx prisma migrate deploy`
3. Verifique se o banco está acessível

### Erro de Memória
Se houver erro de memória durante o build:
1. Use o comando: `npm run build:light`
2. Ou configure `NODE_OPTIONS=--max-old-space-size=1024`

## Comandos Úteis

```bash
# Build local para testar
npm run build:render

# Verificar se o Prisma está funcionando
npx prisma generate
npx prisma db push

# Verificar logs no Render
# Acesse o dashboard do Render e vá em "Logs"
```

## Monitoramento

- Acesse o dashboard do Render para ver logs e métricas
- Configure alertas para downtime
- Monitore o uso de recursos

## Atualizações

Para atualizar o deploy:
1. Faça push para a branch `main`
2. O Render fará deploy automático
3. Verifique os logs para garantir que tudo está funcionando



