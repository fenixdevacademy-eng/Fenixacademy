# Script de deploy otimizado para Vercel (Windows)
Write-Host "🚀 Iniciando deploy otimizado para Vercel..." -ForegroundColor Green

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend")) {
    Write-Host "❌ Diretório frontend não encontrado!" -ForegroundColor Red
    exit 1
}

# Navegar para o diretório frontend
Set-Location frontend

# Limpar cache e node_modules
Write-Host "🧹 Limpando cache e dependências..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path ".turbo") { Remove-Item -Recurse -Force ".turbo" }

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install --production

# Fazer build
Write-Host "🔨 Fazendo build do projeto..." -ForegroundColor Yellow
npm run build

# Verificar se o build foi bem-sucedido
if (-not (Test-Path ".next")) {
    Write-Host "❌ Build falhou!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build concluído com sucesso!" -ForegroundColor Green

# Voltar para o diretório raiz
Set-Location ..

# Fazer deploy
Write-Host "🚀 Fazendo deploy para Vercel..." -ForegroundColor Green
vercel --prod

Write-Host "🎉 Deploy concluído!" -ForegroundColor Green
