@echo off
echo ========================================
echo   Fenix IDE 2.0 Desktop - Instalador
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js de https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Instalando dependencias...
npm install

if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Instalacao concluida com sucesso!
echo ========================================
echo.
echo Para executar o Fenix IDE 2.0 Desktop:
echo   npm start
echo.
echo Para modo de desenvolvimento:
echo   npm run dev
echo.
echo Para construir o aplicativo:
echo   npm run build
echo.
pause







