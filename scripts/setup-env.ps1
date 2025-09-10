# Script para configurar arquivos .env no Windows
Write-Host "🔧 Configurando arquivos .env..." -ForegroundColor Green

# Backend
if (-not (Test-Path "backend\.env")) {
    Write-Host "📄 Criando backend\.env..." -ForegroundColor Yellow
    Copy-Item "backend\env.local" "backend\.env"
    Write-Host "✅ backend\.env criado" -ForegroundColor Green
} else {
    Write-Host "⚠️  backend\.env já existe" -ForegroundColor Yellow
}

# Frontend
if (-not (Test-Path "frontend\.env")) {
    Write-Host "📄 Criando frontend\.env..." -ForegroundColor Yellow
    Copy-Item "frontend\env.local" "frontend\.env"
    Write-Host "✅ frontend\.env criado" -ForegroundColor Green
} else {
    Write-Host "⚠️  frontend\.env já existe" -ForegroundColor Yellow
}

# Verificar se as chaves Stripe estão configuradas
Write-Host "🔍 Verificando configurações do Stripe..." -ForegroundColor Cyan

$stripeKey = "pk_live_51QRj4yALIQ8ei57qNfshH4EmsiIU8nHRIlXWcqoNIR6Pw0wM8hphlFCyz2xnHZ0b599sGvZ45CIwIXmJD2PiKjRw00ysyulgiF"

if ((Get-Content "backend\.env" -ErrorAction SilentlyContinue) -match $stripeKey) {
    Write-Host "✅ Chave pública do Stripe configurada no backend" -ForegroundColor Green
} else {
    Write-Host "❌ Chave pública do Stripe não encontrada no backend" -ForegroundColor Red
}

if ((Get-Content "frontend\.env" -ErrorAction SilentlyContinue) -match $stripeKey) {
    Write-Host "✅ Chave pública do Stripe configurada no frontend" -ForegroundColor Green
} else {
    Write-Host "❌ Chave pública do Stripe não encontrada no frontend" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure as chaves secretas do Stripe em backend\.env" -ForegroundColor White
Write-Host "2. Configure as credenciais de email em backend\.env" -ForegroundColor White
Write-Host "3. Configure as credenciais AWS (opcional) em backend\.env" -ForegroundColor White
Write-Host "4. Execute: docker-compose up --build" -ForegroundColor White
Write-Host ""
Write-Host "✅ Configuração de ambiente concluída!" -ForegroundColor Green 