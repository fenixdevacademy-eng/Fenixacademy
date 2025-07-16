# Fenix Dev Academy

Uma plataforma completa de educação online desenvolvida com Django (backend) e Next.js (frontend).

## 🚀 Tecnologias

### Backend
- **Django 4.2.7** - Framework web Python
- **Django REST Framework** - API REST
- **PostgreSQL** - Banco de dados
- **Redis** - Cache e filas
- **Celery** - Processamento assíncrono
- **Stripe** - Processamento de pagamentos
- **Firebase Admin** - Autenticação e notificações

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Hook Form** - Formulários
- **Zustand** - Gerenciamento de estado

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Nginx** - Proxy reverso
- **Prometheus** - Monitoramento
- **Grafana** - Visualização de métricas

## 📋 Pré-requisitos

- Docker e Docker Compose
- Git
- Node.js 18+ (para desenvolvimento local)
- Python 3.10+ (para desenvolvimento local)

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/fenix-dev-academy.git
cd fenix-dev-academy
```

### 2. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite as variáveis necessárias
nano .env
```

### 3. Execute com Docker Compose
```bash
# Construa e inicie os containers
docker-compose up --build

# Para executar em background
docker-compose up -d --build
```

### 4. Execute as migrações
```bash
# Acesse o container do backend
docker-compose exec backend python manage.py migrate

# Crie um superusuário (opcional)
docker-compose exec backend python manage.py createsuperuser
```

## 🌐 Acessos

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin Django**: http://localhost:8000/admin/
- **Grafana**: http://localhost:3001
- **Prometheus**: http://localhost:9090

## 📁 Estrutura do Projeto

```
fenix-dev-academy/
├── backend/                 # Django backend
│   ├── api/                # API endpoints
│   ├── courses/            # App de cursos
│   ├── users/              # App de usuários
│   ├── payments/           # App de pagamentos
│   ├── certificates/       # App de certificados
│   ├── progress/           # App de progresso
│   └── fenix_academy/      # Configurações Django
├── frontend/               # Next.js frontend
│   ├── app/               # App router (Next.js 13+)
│   ├── components/        # Componentes React
│   └── public/           # Arquivos estáticos
├── nginx/                 # Configuração Nginx
├── monitoring/            # Configurações de monitoramento
├── scripts/              # Scripts de deploy
└── docs/                 # Documentação
```

## 🔧 Comandos Úteis

### Docker
```bash
# Iniciar todos os serviços
docker-compose up

# Parar todos os serviços
docker-compose down

# Reconstruir containers
docker-compose up --build

# Ver logs
docker-compose logs -f

# Executar comandos no container
docker-compose exec backend python manage.py shell
docker-compose exec frontend npm run dev
```

### Django (Backend)
```bash
# Migrações
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate

# Shell Django
docker-compose exec backend python manage.py shell

# Criar superusuário
docker-compose exec backend python manage.py createsuperuser

# Coletar arquivos estáticos
docker-compose exec backend python manage.py collectstatic

# Testes
docker-compose exec backend python manage.py test
```

### Next.js (Frontend)
```bash
# Instalar dependências
docker-compose exec frontend npm install

# Desenvolvimento
docker-compose exec frontend npm run dev

# Build de produção
docker-compose exec frontend npm run build

# Testes
docker-compose exec frontend npm run test
```

## 🧪 Testes

### Backend
```bash
# Executar todos os testes
docker-compose exec backend python manage.py test

# Executar testes específicos
docker-compose exec backend python manage.py test courses.tests
```

### Frontend
```bash
# Executar testes
docker-compose exec frontend npm run test

# Executar testes em modo watch
docker-compose exec frontend npm run test:watch
```

## 📊 Monitoramento

O projeto inclui monitoramento com Prometheus e Grafana:

- **Prometheus**: Coleta métricas dos serviços
- **Grafana**: Visualização de dashboards
- **Alertmanager**: Gerenciamento de alertas

## 🚀 Deploy

### Produção
```bash
# Usar configuração de produção
docker-compose -f docker-compose.prod.yml up -d

# Ou usar o script de deploy
./scripts/deploy.sh
```

### Desenvolvimento
```bash
# Usar configuração de desenvolvimento
docker-compose -f docker-compose.dev.yml up -d
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@fenixacademy.com ou abra uma issue no GitHub.

## 🔄 Changelog

Veja [CHANGELOG.md](CHANGELOG.md) para o histórico de mudanças. 