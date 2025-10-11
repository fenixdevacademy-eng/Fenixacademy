# Script PowerShell para deploy no Netlify
Write-Host "DEPLOY NETLIFY - FENIX ACADEMY" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green

# 1. Limpar cache
Write-Host "Limpando cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
}
if (Test-Path "out") {
    Remove-Item -Recurse -Force "out" -ErrorAction SilentlyContinue
}
Write-Host "Cache limpo" -ForegroundColor Green

# 2. Instalar dependencias
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

# 4. Build para Netlify
Write-Host "Fazendo build para Netlify..." -ForegroundColor Yellow
npm run build:netlify
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build concluido" -ForegroundColor Green
} else {
    Write-Host "Erro no build" -ForegroundColor Red
    exit 1
}

# 5. Verificar se o build foi criado
if (-not (Test-Path "out")) {
    Write-Host "Pasta 'out' nao foi criada" -ForegroundColor Red
    exit 1
}

# 6. Adicionar timestamp
$timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
$versionFile = "out\version.txt"
$timestamp | Out-File -FilePath $versionFile -Encoding UTF8
Write-Host "Timestamp adicionado: $timestamp" -ForegroundColor Green

# 7. Deploy para Netlify
Write-Host "Fazendo deploy para Netlify..." -ForegroundColor Yellow
npx netlify deploy --prod --dir=out
if ($LASTEXITCODE -eq 0) {
    Write-Host "Deploy concluido" -ForegroundColor Green
} else {
    Write-Host "Erro no deploy" -ForegroundColor Red
    exit 1
}

Write-Host "DEPLOY NETLIFY CONCLUIDO!" -ForegroundColor Green
Write-Host "Acesse: https://fenixdevacademy.com.br" -ForegroundColor Cyan
Write-Host "Aguarde 2-3 minutos para propagacao completa" -ForegroundColor Yellow



