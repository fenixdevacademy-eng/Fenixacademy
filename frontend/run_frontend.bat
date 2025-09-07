@echo off
echo 🚀 Iniciando Fenix Academy Frontend
echo =====================================

REM Verificar se estamos na pasta correta
if not exist "package.json" (
    echo ❌ package.json não encontrado!
    echo 📁 Certifique-se de estar na pasta frontend
    echo 💡 Execute: cd frontend
    pause
    exit /b 1
)

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    npm install
)

REM Verificar se .env.local existe
if not exist ".env.local" (
    echo ⚙️ Criando arquivo de configuração...
    copy env.example .env.local
)

REM Executar servidor de desenvolvimento
echo 🌐 Iniciando servidor de desenvolvimento...
echo 📍 Acesse: http://localhost:3000
echo 🔗 API Backend: http://127.0.0.1:8000
echo =====================================

npm run dev

pause 