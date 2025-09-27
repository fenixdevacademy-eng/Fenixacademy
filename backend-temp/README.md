# 🚀 FENIX ACADEMY API

**API Central Completa para o Sistema de Educação da Fenix Academy**

Uma API robusta e escalável construída com Node.js, Express, MongoDB e Redis, oferecendo todas as funcionalidades necessárias para uma plataforma de educação moderna.

## ✨ **Características Principais**

- 🔐 **Autenticação JWT** com refresh tokens
- 👥 **Gestão de Usuários** com perfis e permissões
- 📚 **Sistema de Cursos** completo com módulos e aulas
- 🎓 **Matrículas e Progresso** dos estudantes
- 💳 **Sistema de Pagamentos** integrado (Stripe, PayPal)
- 📧 **Notificações** por email, SMS e push
- 📊 **Analytics e Relatórios** detalhados
- 🔒 **Segurança Avançada** com rate limiting e CORS
- 📝 **Logs Completos** com Winston
- 🗄️ **Cache Inteligente** com Redis
- 📱 **WebSockets** para comunicação em tempo real
- 🚀 **Performance Otimizada** com compressão e monitoramento

## 🏗️ **Arquitetura**

```
src/
├── config/           # Configurações centralizadas
├── database/         # Conexões com MongoDB e Redis
├── middleware/       # Middlewares personalizados
├── models/           # Modelos Mongoose
├── routes/           # Rotas da API
├── services/         # Lógica de negócio
├── utils/            # Utilitários e helpers
├── validations/      # Validações de entrada
└── server.js         # Servidor principal
```

## 🚀 **Instalação e Configuração**

### **Pré-requisitos**

- Node.js 18+ 
- MongoDB 6+
- Redis 6+
- npm ou yarn

### **1. Clone o repositório**

```bash
git clone https://github.com/fenix-academy/api.git
cd api
```

### **2. Instale as dependências**

```bash
npm install
```

### **3. Configure as variáveis de ambiente**

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Servidor
NODE_ENV=development
PORT=5000

# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/fenix_academy
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=fenix@academy.com
EMAIL_PASS=your-app-password

# Stripe (opcional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

### **4. Inicie os serviços**

```bash
# MongoDB
mongod

# Redis
redis-server

# API
npm run dev
```

## 📚 **Endpoints da API**

### **🔐 Autenticação**

```
POST   /api/auth/register          # Registro de usuário
POST   /api/auth/login             # Login
POST   /api/auth/refresh           # Refresh token
POST   /api/auth/logout            # Logout
POST   /api/auth/forgot-password   # Esqueci a senha
POST   /api/auth/reset-password    # Resetar senha
```

### **👥 Usuários**

```
GET    /api/users/profile          # Perfil do usuário
PUT    /api/users/profile          # Atualizar perfil
GET    /api/users/courses          # Cursos do usuário
GET    /api/users/progress         # Progresso nos cursos
```

### **📚 Cursos**

```
GET    /api/courses                # Listar todos os cursos
GET    /api/courses/:id            # Detalhes do curso
GET    /api/courses/:id/lessons    # Aulas do curso
POST   /api/courses/:id/enroll    # Matricular no curso
```

### **🎓 Matrículas**

```
GET    /api/enrollments            # Matrículas do usuário
GET    /api/enrollments/:id        # Detalhes da matrícula
PUT    /api/enrollments/:id        # Atualizar matrícula
DELETE /api/enrollments/:id        # Cancelar matrícula
```

### **💳 Pagamentos**

```
POST   /api/payments/create        # Criar pagamento
GET    /api/payments/:id           # Status do pagamento
POST   /api/payments/webhook       # Webhook do Stripe
```

### **📧 Notificações**

```
GET    /api/notifications          # Notificações do usuário
PUT    /api/notifications/:id/read # Marcar como lida
DELETE /api/notifications/:id      # Deletar notificação
```

### **📊 Analytics (Admin)**

```
GET    /api/admin/analytics        # Métricas gerais
GET    /api/admin/users            # Lista de usuários
GET    /api/admin/courses          # Estatísticas dos cursos
GET    /api/admin/revenue          # Relatório de receita
```

## 🗄️ **Modelos de Dados**

### **Usuário (User)**

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  username: String,
  password: String,
  role: String, // student, instructor, admin
  profile: {
    avatar: String,
    bio: String,
    location: String,
    skills: [String]
  },
  preferences: {
    notifications: {
      email: Boolean,
      sms: Boolean,
      push: Boolean
    },
    language: String,
    timezone: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### **Curso (Course)**

```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  description: String,
  category: String,
  level: String, // beginner, intermediate, advanced
  duration: Number, // em minutos
  price: Number,
  currency: String,
  instructor: {
    id: ObjectId,
    name: String,
    avatar: String
  },
  modules: [{
    title: String,
    description: String,
    lessons: [{
      title: String,
      content: String,
      duration: Number,
      type: String // video, text, quiz
    }]
  }],
  status: String, // draft, published, archived
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### **Matrícula (Enrollment)**

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  status: String, // active, completed, cancelled
  progress: {
    completedLessons: [ObjectId],
    currentModule: Number,
    currentLesson: Number,
    percentage: Number
  },
  payment: {
    amount: Number,
    currency: String,
    status: String,
    paymentId: String
  },
  enrolledAt: Date,
  completedAt: Date,
  expiresAt: Date
}
```

## 🔒 **Segurança**

### **Autenticação JWT**

- Tokens de acesso com expiração configurável
- Refresh tokens para renovação automática
- Blacklist de tokens revogados

### **Rate Limiting**

- Limite de requisições por IP
- Slow down para prevenir spam
- Configuração por endpoint

### **Validação de Entrada**

- Validação com Joi
- Sanitização de dados
- Prevenção de SQL injection

### **CORS e Helmet**

- Configuração segura de CORS
- Headers de segurança com Helmet
- Content Security Policy

## 📊 **Monitoramento e Logs**

### **Sistema de Logs**

- **Winston** para logging estruturado
- Logs separados por tipo (access, error, security)
- Rotação automática de arquivos
- Integração com serviços externos (Sentry)

### **Métricas de Performance**

- Tempo de resposta das requisições
- Uso de memória e CPU
- Estatísticas do banco de dados
- Métricas do Redis

### **Health Checks**

```
GET /health              # Status geral da API
GET /api/status          # Status detalhado
GET /api/admin/health    # Health check completo
```

## 🚀 **Deploy e Produção**

### **Variáveis de Produção**

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fenix_academy
REDIS_URL=redis://username:password@redis-server:6379
JWT_SECRET=very-long-and-secure-secret-key
```

### **Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### **PM2**

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

## 🧪 **Testes**

### **Executar Testes**

```bash
# Todos os testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch

# Testes específicos
npm test -- --grep "auth"
```

### **Estrutura de Testes**

```
tests/
├── unit/              # Testes unitários
├── integration/       # Testes de integração
├── e2e/              # Testes end-to-end
└── fixtures/          # Dados de teste
```

## 📈 **Performance e Escalabilidade**

### **Otimizações**

- **Cache Redis** para dados frequentemente acessados
- **Compressão** de respostas com gzip
- **Índices MongoDB** otimizados
- **Pool de conexões** para banco de dados
- **Lazy loading** de relacionamentos

### **Monitoramento**

- **New Relic** para APM
- **Datadog** para métricas
- **Sentry** para tracking de erros
- **Logs estruturados** para análise

## 🔧 **Desenvolvimento**

### **Scripts Disponíveis**

```bash
npm run dev           # Desenvolvimento com nodemon
npm run start         # Produção
npm run build         # Build para produção
npm run lint          # Linting com ESLint
npm run lint:fix      # Auto-correção de linting
npm run migrate       # Executar migrações
npm run seed          # Popular banco com dados de teste
```

### **Estrutura de Desenvolvimento**

- **ESLint** para qualidade de código
- **Prettier** para formatação
- **Husky** para hooks do Git
- **Commitizen** para commits padronizados

## 🤝 **Contribuição**

### **Como Contribuir**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### **Padrões de Código**

- **ESLint** com configuração Airbnb
- **Prettier** para formatação
- **Conventional Commits** para mensagens
- **JSDoc** para documentação

## 📄 **Licença**

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 **Suporte**

### **Canais de Suporte**

- 📧 **Email**: dev@fenixacademy.com
- 💬 **Discord**: [Fenix Academy Dev](https://discord.gg/fenix-academy)
- 📖 **Documentação**: [docs.fenixacademy.com](https://docs.fenixacademy.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/fenix-academy/api/issues)

### **Comunidade**

- 🌐 **Website**: [fenixacademy.com](https://fenixacademy.com)
- 📱 **LinkedIn**: [Fenix Academy](https://linkedin.com/company/fenix-academy)
- 🐦 **Twitter**: [@FenixAcademy](https://twitter.com/FenixAcademy)

---

## 🎯 **Roadmap**

### **Versão 1.1** (Próxima)
- [ ] Sistema de certificados
- [ ] Integração com Zoom/Teams
- [ ] Analytics avançados
- [ ] API para mobile apps

### **Versão 1.2**
- [ ] Sistema de gamificação
- [ ] IA para recomendações
- [ ] Marketplace de cursos
- [ ] Sistema de afiliados

### **Versão 2.0**
- [ ] Microserviços
- [ ] GraphQL
- [ ] Real-time collaboration
- [ ] Machine Learning

---

**Desenvolvido com ❤️ pela equipe da Fenix Academy**

*Transformando a educação através da tecnologia*



