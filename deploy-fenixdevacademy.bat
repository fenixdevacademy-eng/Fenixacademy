@echo off
echo 🚀 FENIX DEV ACADEMY - DEPLOY AUTOMÁTICO
echo ========================================
echo Domínio: fenixdevacademy.com.br
echo.

REM Verificar se o Vercel CLI está instalado
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI não encontrado! Instalando...
    npm install -g vercel
)

REM Login no Vercel (se necessário)
vercel whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo [%time%] Fazendo login no Vercel...
    vercel login
)

REM Limpar cache e instalar dependências
echo [%time%] Limpando cache e instalando dependências...
cd frontend
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache
npm ci --production=false
echo ✅ Dependências instaladas!

REM Build otimizado
echo [%time%] Fazendo build otimizado...
set NODE_ENV=production
npm run build
echo ✅ Build concluído!

REM Deploy no Vercel
echo [%time%] Deployando no Vercel...
vercel --prod --yes --name fenix-dev-academy
echo ✅ Deploy concluído!

REM Configurar domínio personalizado
echo [%time%] Configurando domínio fenixdevacademy.com.br...
vercel domains add fenixdevacademy.com.br

REM Verificar status
echo [%time%] Verificando status do deploy...
vercel ls

REM Resumo final
echo.
echo 🎉 DEPLOY CONCLUÍDO!
echo ===================
echo 🌐 Site: https://fenixdevacademy.com.br
echo 🔧 Admin: https://fenixdevacademy.com.br/admin
echo 📊 API: https://fenixdevacademy.com.br/api
echo 💳 Pagamentos: https://fenixdevacademy.com.br/payments
echo.
echo 📋 PRÓXIMOS PASSOS:
echo 1. Verificar se o site está funcionando
echo 2. Testar sistema de pagamentos
echo 3. Configurar webhooks do Stripe
echo 4. Verificar SSL/HTTPS
echo.

echo ✅ FenixDevAcademy está no ar! 🚀
pause

