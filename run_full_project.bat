@echo off
echo 🚀 Iniciando Fenix Academy - Projeto Completo
echo ===============================================

REM Verificar se estamos na pasta raiz
if not exist "backend\manage.py" (
    echo ❌ Backend não encontrado!
    echo 📁 Certifique-se de estar na pasta raiz do projeto
    pause
    exit /b 1
)

if not exist "frontend\package.json" (
    echo ❌ Frontend não encontrado!
    echo 📁 Certifique-se de estar na pasta raiz do projeto
    pause
    exit /b 1
)

echo ✅ Estrutura do projeto verificada
echo.

echo 🔧 Iniciando Backend...
echo 📍 Backend: http://127.0.0.1:8000
echo.

REM Iniciar backend em background
start "Fenix Backend" cmd /k "cd backend && python manage.py runserver 127.0.0.1:8000"

REM Aguardar um pouco para o backend inicializar
timeout /t 3 /nobreak > nul

echo 🌐 Iniciando Frontend...
echo 📍 Frontend: http://localhost:3000
echo.

REM Iniciar frontend
cd frontend
if not exist "node_modules" (
    echo 📦 Instalando dependências do frontend...
    npm install
)

if not exist ".env.local" (
    echo ⚙️ Criando configuração do frontend...
    copy env.example .env.local
)

echo 🎉 Projeto iniciado com sucesso!
echo.
echo 📍 URLs:
echo    Frontend: http://localhost:3000
echo    Backend:  http://127.0.0.1:8000
echo    Admin:    http://127.0.0.1:8000/admin/
echo    API:      http://127.0.0.1:8000/api/
echo.
echo 💡 Pressione Ctrl+C para parar o frontend
echo.

npm run dev

pause 