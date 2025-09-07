@echo off
echo 🔧 Corrigindo Frontend Fenix Academy
echo ====================================

REM Verificar se estamos na pasta correta
if not exist "package.json" (
    echo ❌ package.json não encontrado!
    echo 📁 Certifique-se de estar na pasta frontend
    pause
    exit /b 1
)

echo 📦 Verificando dependências...
npm install

echo 🖼️ Criando imagens placeholder...
python fix_images.py

echo 🧹 Limpando cache...
if exist ".next" (
    rmdir /s /q ".next"
)

echo 🔄 Reinstalando dependências...
rmdir /s /q "node_modules" 2>nul
del "package-lock.json" 2>nul
npm install

echo ✅ Frontend corrigido!
echo 🚀 Iniciando servidor...
echo 📍 Acesse: http://localhost:3000
echo.

npm run dev

pause 