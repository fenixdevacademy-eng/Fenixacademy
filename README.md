# 🚀 Fenix Academy - Plataforma Educacional Moderna

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/fenix-academy/fenix-academy)
[![Django](https://img.shields.io/badge/Django-5.0-green.svg)](https://djangoproject.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black.svg)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)

## 📋 Visão Geral

A **Fenix Academy** é uma plataforma educacional de última geração que combina tecnologias modernas para oferecer uma experiência de aprendizado superior. Construída com Django 5.0, Next.js 15, e uma arquitetura de microserviços, a plataforma oferece recursos avançados como execução de código em tempo real, sistema de recomendações com IA, gamificação, e muito mais.

## ✨ Funcionalidades Principais

### 👑 **Área do CEO - Dashboard Executivo**
- **Dashboard Executivo** com métricas em tempo real
- **Gestão de Tráfego** avançada com analytics detalhados
- **Acesso Total** a todos os cursos e funcionalidades
- **Métricas de Performance** dos estudantes e cursos
- **Relatórios Executivos** com insights estratégicos
- **Gestão de Usuários** e permissões administrativas
- **Monitoramento Financeiro** e análise de receita
- **Ações Rápidas** para gestão eficiente da plataforma

### 🎓 **Sistema Educacional Avançado**
- **20+ Cursos Especializados** com conteúdo CS50-quality
- **Sistema de Módulos Interativos** com progresso em tempo real
- **Exercícios Práticos** com validação automática
- **Certificados Digitais** com verificação blockchain
- **Sistema de Avaliação** com feedback inteligente

### 💻 **Execução de Código em Tempo Real**
- **Suporte para 10+ Linguagens**: Python, JavaScript, Java, C++, Go, Rust, PHP, Ruby, HTML, CSS
- **Sandboxing Seguro** com Docker para isolamento completo
- **Terminal Virtual** para experiência de linha de comando
- **Compartilhamento de Código** com colaboração em tempo real

### 🤖 **Inteligência Artificial Integrada**
- **Sistema de Recomendações** com Machine Learning
- **Análise de Padrões** de aprendizado personalizada
- **Chatbot Educacional** para suporte 24/7
- **Correção Automática** de exercícios com feedback detalhado

### 🎮 **Gamificação Avançada**
- **Sistema de Pontos** e rankings competitivos
- **Badges e Conquistas** por marcos alcançados
- **Streaks de Aprendizado** para manter consistência
- **Competições** e desafios comunitários

### 💳 **Sistema de Pagamentos Moderno**
- **Integração Stripe** com suporte a múltiplas moedas
- **Planos Flexíveis**: Free, Premium, Enterprise
- **Programa Founders**: Acesso vitalício para os primeiros 1000 alunos
- **Cupons e Descontos** automáticos

### 📊 **Analytics e Monitoramento**
- **Dashboard Executivo** com métricas em tempo real
- **Análise de Performance** dos estudantes
- **Relatórios Detalhados** de progresso
- **Insights de Engajamento** com visualizações interativas
- **Gestão de Tráfego** com análise de conversão

## 🏗️ Arquitetura Técnica

### **Backend (Django 5.0)**
```
Backend/
├── 🏗️ Core Django Framework
├── 📡 APIs RESTful com DRF 3.15
├── 🔐 Autenticação JWT moderna
├── 📊 Sistema de Analytics
├── 🤖 Engine de ML para recomendações
├── 💳 Integração Stripe para pagamentos
├── 📧 Sistema de notificações
├── 🏆 Engine de gamificação
├── 📱 APIs para execução de código
└── 👑 Sistema de Gestão CEO
```

### **Frontend (Next.js 15)**
```
Frontend/
├── ⚛️ React 18 com TypeScript
├── 🎨 Tailwind CSS + shadcn/ui
├── 🚀 Next.js 15 com App Router
├── 📱 PWA com funcionalidade offline
├── 🎭 Framer Motion para animações
├── 📊 Gráficos interativos
├── 🌐 Internacionalização (i18n)
├── 🔍 SEO otimizado
└── 👑 Dashboard Executivo CEO
```

### **Infraestrutura Moderna**
```
Infrastructure/
├── 🐳 Docker & Docker Compose
├── 🗄️ PostgreSQL 16 para dados
├── ⚡ Redis 7 para cache
├── 🔄 Celery para tarefas assíncronas
├── 📈 Prometheus + Grafana
├── 🌐 Nginx como reverse proxy
├── ☁️ AWS S3 para arquivos
└── 🛡️ Sentry para monitoramento
```

## 🚀 Instalação e Configuração

### **Pré-requisitos**
- Docker & Docker Compose
- Node.js 20+
- Python 3.12+
- Git

### **Instalação Rápida**

1. **Clone o repositório**
```bash
git clone https://github.com/fenix-academy/fenix-academy.git
cd fenix-academy
```

2. **Configure as variáveis de ambiente**
```bash
cp backend/env.example backend/.env
cp frontend/.env.example frontend/.env
# Edite os arquivos .env com suas configurações
```

3. **Execute com Docker Compose**
```bash
# Desenvolvimento
docker-compose -f docker-compose.dev.yml up -d

# Produção
./scripts/deploy.sh
```

4. **Acesse a aplicação**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Django: http://localhost:8000/admin
- API Docs: http://localhost:8000/api/docs/
- **Dashboard CEO**: http://localhost:3000/ceo

### **Instalação Manual**

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements-django.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 Documentação

### **APIs Disponíveis**
- 🔐 **Authentication API**: `/api/auth/`
- 👤 **Users API**: `/api/users/`
- 📚 **Courses API**: `/api/courses/`
- 💳 **Payments API**: `/api/payments/`
- 🏆 **Certificates API**: `/api/certificates/`
- 📊 **Analytics API**: `/api/analytics/`
- 🤖 **Recommendations API**: `/api/recommendations/`
- 💻 **Code Execution API**: `/api/code-execution/`
- 👑 **CEO Management API**: `/api/ceo/`
- 🚦 **Traffic Management API**: `/api/traffic/`

### **Swagger Documentation**
Acesse a documentação interativa da API em:
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/

## 🛠️ Scripts de Desenvolvimento

```bash
# Deployment automatizado
./scripts/deploy.sh

# Backup do banco de dados
./scripts/deploy.sh backup

# Visualizar logs em tempo real
./scripts/deploy.sh logs

# Health check dos serviços
./scripts/deploy.sh health

# Rollback para versão anterior
./scripts/deploy.sh rollback

# Limpeza de recursos Docker
./scripts/deploy.sh cleanup
```

## 🌟 Novidades da Versão 2.0

### **👑 Área do CEO**
- **Dashboard Executivo** com métricas em tempo real
- **Gestão de Tráfego** avançada
- **Acesso Total** a todos os recursos
- **Relatórios Executivos** detalhados
- **Gestão de Usuários** administrativa
- **Monitoramento Financeiro** integrado

### **🚀 Performance**
- ⚡ **50% mais rápido** com otimizações Next.js 15
- 📦 **Bundle size reduzido** em 30%
- 🗄️ **Queries otimizadas** no Django
- ⚡ **Cache inteligente** com Redis

### **🔒 Segurança**
- 🛡️ **Headers de segurança** modernos
- 🔐 **CSP (Content Security Policy)** implementado
- 🚨 **Rate limiting** avançado
- 🔍 **Auditoria** de ações de usuário

### **🎨 UI/UX**
- 🌙 **Dark mode** nativo
- 📱 **Design responsivo** aprimorado
- ⚡ **Animações fluidas** com Framer Motion
- 🎯 **Acessibilidade** (WCAG 2.1)

### **🤖 IA e ML**
- 🧠 **Recomendações** mais precisas
- 📊 **Analytics preditivos**
- 🎯 **Personalização** avançada
- 💬 **Chatbot** mais inteligente

## 📊 Monitoramento e Observabilidade

### **Métricas Disponíveis**
- 📈 **Performance**: Response time, throughput, errors
- 👥 **Usuários**: Registros, atividade, engajamento
- 💰 **Financeiro**: Receita, conversões, churn
- 🎓 **Educacional**: Progresso, conclusões, satisfação
- 🚦 **Tráfego**: Conversões, funis, otimização

### **Dashboards**
- 📊 **Grafana**: http://localhost:3001
- 📈 **Prometheus**: http://localhost:9090
- 🔍 **Admin Django**: http://localhost:8000/admin
- 👑 **Dashboard CEO**: http://localhost:3000/ceo

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- 📧 Email: suporte@fenixacademy.com
- 💬 Discord: [Fenix Academy Community](https://discord.gg/fenixacademy)
- 📚 Documentação: [docs.fenixacademy.com](https://docs.fenixacademy.com)
- 🐛 Issues: [GitHub Issues](https://github.com/fenix-academy/fenix-academy/issues)

## 🙏 Agradecimentos

- **Harvard CS50** pela inspiração educacional
- **Comunidade Open Source** pelas ferramentas incríveis
- **Contribuidores** que tornaram este projeto possível

---

<div align="center">
  <strong>🔥 Fenix Academy - Elevando a educação em tecnologia ao próximo nível! 🔥</strong>
</div>