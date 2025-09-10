@echo off
REM 🚀 Script de Deploy Automatizado para Render.com
REM Fenix Academy - Deploy Script (Windows)

echo 🚀 Iniciando deploy do Fenix Academy no Render.com...

REM Verificar se estamos no diretório correto
if not exist "package.json" (
    echo [ERROR] Execute este script na raiz do projeto Fenix Academy
    exit /b 1
)

if not exist "frontend" (
    echo [ERROR] Diretório frontend não encontrado
    exit /b 1
)

if not exist "backend" (
    echo [ERROR] Diretório backend não encontrado
    exit /b 1
)

REM Verificar se o git está configurado
git status >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Este não é um repositório Git válido
    exit /b 1
)

REM Verificar se há mudanças não commitadas
git diff-index --quiet HEAD --
if errorlevel 1 (
    echo [WARNING] Há mudanças não commitadas. Fazendo commit automático...
    git add .
    git commit -m "Auto-commit before Render deploy - %date% %time%"
)

REM Verificar se o branch atual é main
for /f %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" (
    echo [WARNING] Você está no branch '%CURRENT_BRANCH%'. Mudando para 'main'...
    git checkout main
)

REM Fazer push das mudanças
echo [INFO] Fazendo push das mudanças para o GitHub...
git push origin main

if errorlevel 1 (
    echo [ERROR] Falha ao fazer push para o GitHub
    exit /b 1
)

echo [SUCCESS] Código enviado para o GitHub com sucesso!

REM Verificar se o Render CLI está instalado
render --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Render CLI não encontrado. Instalando...
    echo [INFO] Por favor, instale o Render CLI manualmente:
    echo [INFO] https://render.com/docs/cli
    echo [INFO] Ou execute: npm install -g @render/cli
    pause
    exit /b 1
)

REM Verificar se está logado no Render
render auth whoami >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Você não está logado no Render. Fazendo login...
    render auth login
)

echo [SUCCESS] Render CLI configurado com sucesso!

echo.
echo 🎉 Preparação concluída!
echo.
echo 📋 Próximos passos manuais:
echo.
echo 1. Acesse https://dashboard.render.com
echo 2. Clique em "New +" → "Web Service"
echo 3. Conecte seu repositório GitHub
echo 4. Configure os serviços conforme RENDER_DEPLOY_GUIDE.md
echo.
echo 📚 Documentação completa: RENDER_DEPLOY_GUIDE.md
echo.

pause
