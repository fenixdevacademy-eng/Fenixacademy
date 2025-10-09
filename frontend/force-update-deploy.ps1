# Script PowerShell para forcar atualizacao do frontend
Write-Host "FORCANDO ATUALIZACAO DO FRONTEND - FENIX ACADEMY" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# 1. Limpar cache do Next.js
Write-Host "Limpando cache do Next.js..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "Cache do Next.js limpo" -ForegroundColor Green
} else {
    Write-Host "Cache ja estava limpo" -ForegroundColor Yellow
}

# 2. Limpar node_modules e reinstalar
Write-Host "Reinstalando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "node_modules removido" -ForegroundColor Green
}

if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "package-lock.json removido" -ForegroundColor Green
}

# Reinstalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "Erro ao instalar dependencias" -ForegroundColor Red
    exit 1
}

# 3. Gerar Prisma Client
Write-Host "Gerando Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "Prisma Client gerado" -ForegroundColor Green
} else {
    Write-Host "Erro ao gerar Prisma Client" -ForegroundColor Red
    exit 1
}

# 4. Build com configuracoes otimizadas
Write-Host "Fazendo build otimizado..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build concluido" -ForegroundColor Green
} else {
    Write-Host "Erro no build" -ForegroundColor Red
    exit 1
}

# 5. Adicionar timestamp para forcar cache bust
$timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
$versionFile = "public\version.txt"
$timestamp | Out-File -FilePath $versionFile -Encoding UTF8
Write-Host "Timestamp adicionado: $timestamp" -ForegroundColor Green

# 6. Deploy para Vercel
Write-Host "Fazendo deploy para Vercel..." -ForegroundColor Yellow
npx vercel --prod --force
if ($LASTEXITCODE -eq 0) {
    Write-Host "Deploy concluido" -ForegroundColor Green
} else {
    Write-Host "Erro no deploy" -ForegroundColor Red
    exit 1
}

Write-Host "ATUALIZACAO FORCADA CONCLUIDA!" -ForegroundColor Green
Write-Host "Acesse: https://fenixdevacademy.com.br" -ForegroundColor Cyan
Write-Host "Aguarde 2-3 minutos para propagacao completa" -ForegroundColor Yellow