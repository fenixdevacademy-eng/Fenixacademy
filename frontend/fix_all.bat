@echo off
echo 🔧 Corrigindo TODOS os problemas do Frontend
echo =============================================

REM Verificar se estamos na pasta correta
if not exist "package.json" (
    echo ❌ package.json não encontrado!
    echo 📁 Certifique-se de estar na pasta frontend
    pause
    exit /b 1
)

echo 📦 Limpando cache e reinstalando dependências...
if exist ".next" (
    rmdir /s /q ".next"
)
if exist "node_modules" (
    rmdir /s /q "node_modules"
)
del "package-lock.json" 2>nul
npm install

echo 🖼️ Criando imagens placeholder...
python fix_images.py

echo 🔧 Corrigindo problemas de navegação...
python fix_navigation.py

echo 🔧 Corrigindo client components...
python fix_client_components.py

echo 🎨 Melhorando paleta de cores...
python improve_colors.py

echo 🎯 Adicionando interações...
python add_interactions.py

echo 💳 Integrando sistema de pagamento...
python integrate_payment.py

echo 🧹 Limpando cache do navegador...
echo 💡 Dica: Pressione Ctrl+Shift+R no navegador para limpar cache

echo ✅ TODOS os problemas foram corrigidos!
echo.
echo 🚀 Iniciando servidor...
echo 📍 Acesse: http://localhost:3000
echo 🔗 Login: http://localhost:3000/auth/login
echo 📝 Cadastro: http://localhost:3000/auth/register
echo.

npm run dev

pause 