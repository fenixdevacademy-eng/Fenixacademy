# 🗄️ Configuração do Banco de Dados - Fênix Academy

Este documento explica como configurar e executar o banco de dados para exibir dados reais nas páginas de profile e dashboard.

## 📋 Pré-requisitos

- Python 3.8+
- Node.js 16+
- PostgreSQL (opcional, pode usar SQLite para desenvolvimento)
- pip (gerenciador de pacotes Python)

## 🚀 Configuração Rápida

### 1. Configurar Backend Django

```bash
# Navegar para o diretório do backend
cd backend-temp

# Instalar dependências
pip install -r requirements.txt

# Executar setup do banco de dados
python setup_database.py

# Iniciar servidor Django
python run_server.py
```

### 2. Configurar Frontend Next.js

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## 🎯 Scripts Automatizados

### Windows
```bash
# Configurar banco de dados e iniciar backend
setup_database.bat

# Iniciar frontend (em outro terminal)
start_frontend.bat
```

## 📊 Estrutura do Banco de Dados

### Modelos Principais

1. **User** - Usuários do sistema
2. **UserProgress** - Progresso geral do usuário
3. **CourseProgress** - Progresso em cursos específicos
4. **LessonProgress** - Progresso em lições
5. **ExerciseProgress** - Progresso em exercícios
6. **UserAchievement** - Conquistas do usuário
7. **StudySession** - Sessões de estudo

### Dados de Exemplo

O script `setup_database.py` cria automaticamente:
- 1 usuário de exemplo (usuario@exemplo.com / 123456)
- 3 cursos de exemplo
- Módulos e lições para demonstração
- Progresso e conquistas de exemplo

## 🔗 Endpoints da API

### Profile
- `GET /api/v1/profile/` - Obter perfil do usuário
- `PUT /api/v1/profile/update/` - Atualizar perfil

### Dashboard
- `GET /api/v1/dashboard/data/` - Obter dados do dashboard

### Autenticação
- `POST /api/v1/auth/token/` - Obter token JWT
- `POST /api/v1/auth/token/refresh/` - Renovar token

## 🎨 Frontend Atualizado

### Páginas com Dados Reais

1. **Profile (`/profile`)**
   - Exibe informações reais do usuário
   - Permite editar perfil
   - Mostra estatísticas de progresso
   - Conquistas e atividades recentes

2. **Dashboard (`/dashboard`)**
   - Estatísticas gerais de aprendizado
   - Cursos em andamento
   - Atividade recente
   - Recomendações de cursos

### Configuração da API

O frontend está configurado para usar:
- **Backend Django**: `http://localhost:8000/api/v1/`
- **Autenticação**: JWT tokens
- **Fallback**: API Next.js para compatibilidade

## 🔧 Configuração de Ambiente

### Backend (Django)
```env
# backend-temp/env.local
DJANGO_SECRET_KEY=django-insecure-fenix-academy-dev-secret-key-2024
DJANGO_DEBUG=True
DATABASE_URL=postgres://fenix:fenix123@localhost:5432/fenix_academy
POSTGRES_DB=fenix_academy
POSTGRES_USER=fenix
POSTGRES_PASSWORD=fenix123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### Frontend (Next.js)
```env
# frontend/.env.local
NEXT_PUBLIC_DJANGO_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🧪 Testando a Integração

### 1. Verificar Backend
```bash
# Testar health check
curl http://localhost:8000/api/v1/health/

# Testar autenticação
curl -X POST http://localhost:8000/api/v1/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "usuario@exemplo.com", "password": "123456"}'
```

### 2. Verificar Frontend
1. Acesse `http://localhost:3000`
2. Faça login com `usuario@exemplo.com` / `123456`
3. Navegue para `/profile` e `/dashboard`
4. Verifique se os dados estão sendo carregados

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
```bash
# Verificar se PostgreSQL está rodando
# Ou usar SQLite para desenvolvimento
# Editar settings.py para usar SQLite
```

### Erro de CORS
```bash
# Adicionar localhost:3000 ao CORS_ALLOWED_ORIGINS
# Em backend-temp/fenix_academy/settings.py
```

### Erro de Token JWT
```bash
# Verificar se o token está sendo salvo no localStorage
# Verificar se o token não expirou
# Fazer login novamente
```

## 📈 Próximos Passos

1. **Configurar PostgreSQL** para produção
2. **Implementar cache Redis** para performance
3. **Adicionar testes automatizados**
4. **Configurar monitoramento** com Prometheus/Grafana
5. **Implementar backup automático** do banco

## 🎉 Resultado Final

Após a configuração, você terá:
- ✅ Banco de dados configurado com dados reais
- ✅ API Django funcionando com endpoints completos
- ✅ Frontend exibindo dados reais do banco
- ✅ Sistema de autenticação JWT
- ✅ Páginas de profile e dashboard funcionais
- ✅ Dados de exemplo para demonstração

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do Django: `python manage.py runserver --verbosity=2`
2. Verifique os logs do Next.js: `npm run dev --verbose`
3. Verifique o console do navegador para erros de JavaScript
4. Verifique se todas as dependências estão instaladas

---

**Desenvolvido com ❤️ para a Fênix Academy**








