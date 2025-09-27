# 🚀 Configuração do Banco de Dados - Fênix Academy

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## 🛠️ Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fenix_academy?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Upload
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=5242880
```

### 3. Configurar PostgreSQL

1. Crie um banco de dados PostgreSQL:
```sql
CREATE DATABASE fenix_academy;
```

2. Atualize a `DATABASE_URL` no arquivo `.env` com suas credenciais.

### 4. Executar Migrações

```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate
```

### 5. Popular Banco de Dados

```bash
# Executar seed com dados iniciais
npm run db:seed
```

### 6. Iniciar Aplicação

```bash
npm run dev
```

## 📊 Estrutura do Banco

### Tabelas Principais

- **users**: Usuários do sistema
- **user_profiles**: Perfis detalhados dos usuários
- **courses**: Cursos disponíveis
- **user_courses**: Inscrições dos usuários nos cursos
- **password_reset_tokens**: Tokens para recuperação de senha

### Usuários de Teste

Após executar o seed, você terá:

- **Admin**: admin@fenix.com / admin123
- **Usuário**: teste@teste.com / 123456

## 🔧 Comandos Úteis

```bash
# Ver banco de dados no Prisma Studio
npm run db:studio

# Resetar banco de dados
npm run db:reset

# Gerar nova migração
npx prisma migrate dev --name nome_da_migracao
```

## 🔐 Autenticação

O sistema usa JWT para autenticação:

- Tokens são válidos por 7 dias
- Refresh tokens por 30 dias
- Middleware de autenticação em todas as rotas protegidas

## 📧 Sistema de Email

- Configurado para Gmail SMTP
- E-mails de boas-vindas automáticos
- Recuperação de senha por e-mail
- Templates HTML responsivos

## 📁 Upload de Arquivos

- Upload de avatars para `/public/uploads`
- Validação de tipo e tamanho
- Suporte a JPEG, PNG, GIF, WEBP
- Tamanho máximo: 5MB

## 🚨 Segurança

- Senhas hasheadas com bcrypt
- Tokens JWT seguros
- Validação de entrada em todas as APIs
- Middleware de autenticação
- Rate limiting (recomendado para produção)

## 📈 Próximos Passos

1. Configurar Redis para cache
2. Implementar rate limiting
3. Adicionar logs de auditoria
4. Configurar backup automático
5. Implementar monitoramento

## 🆘 Troubleshooting

### Erro de Conexão com Banco

1. Verifique se o PostgreSQL está rodando
2. Confirme as credenciais no `.env`
3. Teste a conexão: `npx prisma db pull`

### Erro de Migração

1. Verifique se o banco existe
2. Execute: `npx prisma migrate reset`
3. Execute: `npm run db:seed`

### Erro de Email

1. Verifique as credenciais SMTP
2. Use senha de app do Gmail
3. Teste com outro provedor SMTP
