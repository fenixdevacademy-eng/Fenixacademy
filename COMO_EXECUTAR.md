# 🚀 Como Executar o Projeto Fenix Academy

## 📋 Pré-requisitos

- **Python 3.8+**
- **Node.js 16+**
- **npm ou yarn**

## 🎯 Opções de Execução

### 1. **Execução Completa (Recomendada)**

Execute na **pasta raiz** do projeto:

```bash
# Windows
run_full_project.bat

# Linux/Mac
./run_full_project.sh
```

### 2. **Execução Manual**

#### **Backend (Django)**

```bash
# Navegar para a pasta backend
cd backend

# Executar com script
run_local.bat

# Ou manualmente
python manage.py runserver
```

#### **Frontend (Next.js)**

```bash
# Navegar para a pasta frontend
cd frontend

# Executar com script
run_frontend.bat

# Ou manualmente
npm install
npm run dev
```

## 🔧 Configurações

### **Backend**

- **URL**: http://127.0.0.1:8000
- **Admin**: http://127.0.0.1:8000/admin/
- **API**: http://127.0.0.1:8000/api/

### **Frontend**

- **URL**: http://localhost:3000
- **API Backend**: http://127.0.0.1:8000/api

## 📊 Comandos Úteis

### **Backend**

```bash
# Migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Popular dados
python manage.py seed_real_courses
python manage.py seed_advanced_courses

# Shell Django
python manage.py shell
```

### **Frontend**

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start

# Lint
npm run lint

# Testes
npm test
```

## 🐛 Troubleshooting

### **Erro: package.json não encontrado**
```bash
# Certifique-se de estar na pasta frontend
cd frontend
npm install
```

### **Erro: Frontend sem interatividade ou versão antiga**
```bash
# Usar script de correção
cd frontend
fix_frontend.bat

# Ou manualmente
cd frontend
clear_cache.bat
python fix_images.py
npm run dev
```

### **Erro: Debug Toolbar**
```bash
# Usar configuração sem debug toolbar
cd backend
run_local.bat no-debug
```

### **Erro: Porta já em uso**
```bash
# Backend em porta diferente
python manage.py runserver 8001

# Frontend em porta diferente
npm run dev -- -p 3001
```

## 📁 Estrutura do Projeto

```
Fenix/
├── backend/          # Django Backend
│   ├── manage.py
│   ├── run_local.bat
│   └── ...
├── frontend/         # Next.js Frontend
│   ├── package.json
│   ├── run_frontend.bat
│   └── ...
├── run_full_project.bat
└── COMO_EXECUTAR.md
```

## 🌐 URLs de Acesso

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | http://localhost:3000 | Interface principal |
| Backend | http://127.0.0.1:8000 | API Django |
| Admin | http://127.0.0.1:8000/admin/ | Painel administrativo |
| API | http://127.0.0.1:8000/api/ | Endpoints da API |
| Health | http://127.0.0.1:8000/health/ | Status do servidor |

## 🎉 Sucesso!

Se tudo estiver funcionando, você verá:

- ✅ Backend rodando na porta 8000
- ✅ Frontend rodando na porta 3000
- ✅ Interface web acessível
- ✅ API funcionando

**Bem-vindo ao Fenix Academy! 🚀** 