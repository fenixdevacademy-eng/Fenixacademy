@echo off
REM 🚀 Deploy Script for Fenix Academy - Vercel (Windows)
REM Este script automatiza o deploy completo no Vercel

echo.
echo 🚀 FENIX ACADEMY - DEPLOY NO VERCEL
echo ==================================
echo.

REM Verificar se o Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado!
    echo Instale o Node.js em: https://nodejs.org
    pause
    exit /b 1
)

REM Verificar se o Vercel CLI está instalado
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Vercel CLI não encontrado!
    echo Instalando Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Erro ao instalar Vercel CLI!
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI instalado!
)

REM Verificar se está logado no Vercel
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Você não está logado no Vercel!
    echo Fazendo login...
    vercel login
    if %errorlevel% neq 0 (
        echo ❌ Erro no login do Vercel!
        pause
        exit /b 1
    )
)

echo.
echo 📦 Preparando ambiente...

REM Instalar dependências do frontend
echo Instalando dependências do frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências!
    pause
    exit /b 1
)
echo ✅ Dependências do frontend instaladas!

REM Build do frontend
echo Fazendo build do frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build do frontend!
    pause
    exit /b 1
)
echo ✅ Build do frontend concluído!

cd ..

REM Verificar arquivo .env.local
if not exist "frontend\.env.local" (
    echo ⚠️  Arquivo .env.local não encontrado!
    echo Copiando arquivo de exemplo...
    copy "frontend\env.example" "frontend\.env.local"
    echo ⚠️  Configure as variáveis de ambiente em frontend\.env.local
)

echo.
echo 🚀 Iniciando deploy no Vercel...

REM Deploy do frontend
cd frontend
vercel --prod --yes
if %errorlevel% neq 0 (
    echo ❌ Erro no deploy!
    pause
    exit /b 1
)
echo ✅ Deploy do frontend concluído!

REM Obter URL do projeto
echo.
echo 📋 Configurações pós-deploy:
echo.
echo 1. Configure as variáveis de ambiente no painel do Vercel
echo 2. Configure os webhooks do Stripe
echo 3. Configure os pixels de tracking
echo 4. Teste todas as funcionalidades
echo.

echo 🎉 DEPLOY CONCLUÍDO COM SUCESSO!
echo.
echo 🔗 Links úteis:
echo - Vercel Dashboard: https://vercel.com/dashboard
echo - Stripe Dashboard: https://dashboard.stripe.com
echo - Documentação: https://vercel.com/docs
echo.

pause
