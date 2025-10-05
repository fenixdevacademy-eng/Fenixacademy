# Script de deploy para Render (Windows)
Write-Host "🚀 Iniciando deploy para Render..." -ForegroundColor Green

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend")) {
    Write-Host "❌ Diretório frontend não encontrado!" -ForegroundColor Red
    exit 1
}

# Navegar para o diretório frontend
Set-Location frontend

# Limpar cache e dependências
Write-Host "🧹 Limpando cache e dependências..." -ForegroundColor Yellow
npm cache clean --force
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
if (Test-Path "node_modules/.cache") { Remove-Item -Recurse -Force "node_modules/.cache" }
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

# Fazer commit e push para o repositório
Write-Host "📤 Fazendo commit e push para o repositório..." -ForegroundColor Yellow
git add .
git commit -m "Deploy para Render - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin main

Write-Host "🎉 Deploy para Render iniciado!" -ForegroundColor Green
Write-Host "📋 Acesse o dashboard do Render para acompanhar o progresso" -ForegroundColor Cyan
