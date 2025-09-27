@echo off
echo 🚀 CORREÇÃO AUTOMÁTICA DE ERROS DE BUILD - FENIX ACADEMY
echo ========================================================
echo.

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado! Instale o Node.js primeiro.
    pause
    exit /b 1
)

REM Verificar se estamos no diretório correto
if not exist "frontend" (
    echo ❌ Diretório 'frontend' não encontrado!
    echo Execute este script na raiz do projeto Fenix.
    pause
    exit /b 1
)

echo ℹ️  Iniciando correção automática...
echo.

REM Executar o script de correção
node fix-build-errors.js

echo.
echo ✅ Correção concluída!
echo.
echo 📋 Próximos passos:
echo   1. Verifique se o build foi executado com sucesso
echo   2. Se ainda houver erros, execute este script novamente
echo   3. Para deploy, execute: vercel --prod --yes
echo.

pause














