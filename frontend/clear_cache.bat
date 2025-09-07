@echo off
echo 🧹 Limpando cache do Next.js
echo =============================

REM Parar servidor se estiver rodando
taskkill /f /im node.exe 2>nul

REM Limpar cache do Next.js
if exist ".next" (
    echo 📁 Removendo pasta .next...
    rmdir /s /q ".next"
)

REM Limpar cache do npm
echo 📦 Limpando cache do npm...
npm cache clean --force

REM Reinstalar dependências
echo 🔄 Reinstalando dependências...
rmdir /s /q "node_modules" 2>nul
del "package-lock.json" 2>nul
npm install

echo ✅ Cache limpo com sucesso!
echo 🚀 Execute: npm run dev
pause 