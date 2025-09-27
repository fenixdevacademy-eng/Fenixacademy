@echo off
echo ========================================
echo    DEPLOY FENIX ACADEMY - VERCEL
echo ========================================

echo.
echo [1/4] Navegando para o diretorio frontend...
cd frontend

echo.
echo [2/4] Instalando dependencias...
call npm install --production

echo.
echo [3/4] Configurando variaveis de ambiente...
if not exist .env.local (
    copy .env.production .env.local
)

echo.
echo [4/4] Fazendo deploy para Vercel...
call npx vercel --prod --yes

echo.
echo ========================================
echo    DEPLOY CONCLUIDO!
echo ========================================
echo.
echo Acesse: https://fenixdevacademy.com.br
echo.
pause




