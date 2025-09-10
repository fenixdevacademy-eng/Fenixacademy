@echo off
echo 🚀 Iniciando Fenix Academy...
echo.

echo 📁 Verificando estrutura do projeto...
if not exist "frontend" (
    echo ❌ Pasta frontend não encontrada!
    pause
    exit /b 1
)

echo.
echo 🎯 Navegando para o frontend...
cd frontend

echo.
echo 📦 Verificando dependências...
if not exist "node_modules" (
    echo 📥 Instalando dependências...
    npm install
) else (
    echo ✅ Dependências já instaladas
)

echo.
echo 🚀 Iniciando servidor de desenvolvimento...
echo.
echo 🌐 Acesse: http://localhost:3000
echo 📱 Página Principal: http://localhost:3000
echo 🎓 Ver Cursos: http://localhost:3000/courses
echo 👤 Meu Perfil: http://localhost:3000/profile
echo 💼 Carreiras: http://localhost:3000/careers
echo 💳 Pagamento: http://localhost:3000/payment
echo.
echo ⏹️  Pressione Ctrl+C para parar o servidor
echo.

npm run dev 