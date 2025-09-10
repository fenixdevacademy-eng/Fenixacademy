# 🚀 Script de Deploy - Fenix Academy (Windows PowerShell)
# Domínio: fenixdevacademy.com

param(
    [switch]$SkipBuild,
    [switch]$SkipTests,
    [switch]$Force
)

# Configurações
$ErrorActionPreference = "Stop"
$Domain = "fenixdevacademy.com"
$ProjectName = "fenix-academy"

# Cores para output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput "✅ $Message" "Green"
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput "⚠️  $Message" "Yellow"
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput "❌ $Message" "Red"
}

function Write-Info {
    param([string]$Message)
    Write-ColorOutput "ℹ️  $Message" "Cyan"
}

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Error "Execute este script na raiz do projeto Fenix Academy"
    exit 1
}

Write-Info "🌐 FENIX ACADEMY - DEPLOY AUTOMATIZADO"
Write-Info "======================================"
Write-Info "Domínio: $Domain"
Write-Info "Data: $(Get-Date)"
Write-Info ""

# 1. Verificar dependências
Write-Info "Verificando dependências..."

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js encontrado: $nodeVersion"
} catch {
    Write-Error "Node.js não encontrado. Instale o Node.js primeiro."
    exit 1
}

# Verificar npm
try {
    $npmVersion = npm --version
    Write-Success "npm encontrado: $npmVersion"
} catch {
    Write-Error "npm não encontrado. Instale o npm primeiro."
    exit 1
}

# Verificar Vercel CLI
try {
    $vercelVersion = vercel --version
    Write-Success "Vercel CLI encontrado: $vercelVersion"
} catch {
    Write-Warning "Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
    Write-Success "Vercel CLI instalado"
}

# Verificar Git
try {
    $gitVersion = git --version
    Write-Success "Git encontrado: $gitVersion"
} catch {
    Write-Error "Git não encontrado. Instale o Git primeiro."
    exit 1
}

Write-Success "Dependências verificadas"

# 2. Verificar se há mudanças não commitadas
Write-Info "Verificando mudanças não commitadas..."
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "Há mudanças não commitadas. Fazendo commit automático..."
    git add .
    git commit -m "Deploy automático - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    Write-Success "Commit realizado"
} else {
    Write-Success "Repositório atualizado"
}

# 3. Instalar dependências
Write-Info "Instalando dependências..."
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro ao instalar dependências"
    exit 1
}
Write-Success "Dependências instaladas"

# 4. Executar testes (se não pular)
if (-not $SkipTests) {
    Write-Info "Executando testes..."
    npm run test
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Testes falharam. Use -SkipTests para pular os testes."
        exit 1
    }
    Write-Success "Testes passaram"
}

# 5. Build da aplicação (se não pular)
if (-not $SkipBuild) {
    Write-Info "Fazendo build da aplicação..."
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erro no build. Verifique os logs acima."
        exit 1
    }
    Write-Success "Build concluído com sucesso"
}

# 6. Verificar se está logado no Vercel
Write-Info "Verificando login no Vercel..."
try {
    vercel whoami | Out-Null
    Write-Success "Logado no Vercel"
} catch {
    Write-Warning "Não está logado no Vercel. Fazendo login..."
    vercel login
    Write-Success "Login realizado"
}

# 7. Deploy no Vercel
Write-Info "Fazendo deploy no Vercel..."
if ($Force) {
    vercel --prod --yes --force
} else {
    vercel --prod --yes
}

if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro no deploy do Vercel"
    exit 1
}
Write-Success "Deploy no Vercel concluído"

# 8. Configurar domínio personalizado
Write-Info "Configurando domínio personalizado..."
try {
    vercel domains add $Domain
    Write-Success "Domínio configurado"
} catch {
    Write-Warning "Domínio pode já estar configurado ou haver erro na configuração"
}

# 9. Verificar status do deploy
Write-Info "Verificando status do deploy..."
vercel ls

# 10. Testar aplicação
Write-Info "Testando aplicação..."
try {
    $response = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Write-Success "Aplicação está online e funcionando!"
    } else {
        Write-Warning "Aplicação retornou status: $($response.StatusCode)"
    }
} catch {
    Write-Warning "Não foi possível testar a aplicação. Pode estar em processo de deploy."
}

# 11. Configurar variáveis de ambiente
Write-Info "Configurando variáveis de ambiente..."
Write-Warning "Configure as variáveis de ambiente manualmente no dashboard do Vercel:"
Write-Info "https://vercel.com/dashboard"

# 12. Resumo final
Write-Info ""
Write-Info "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
Write-Info "================================="
Write-Info "🌐 URL: https://$Domain"
Write-Info "📊 Dashboard: https://vercel.com/dashboard"
Write-Info "🔧 Logs: vercel logs"
Write-Info "📈 Analytics: https://vercel.com/analytics"
Write-Info ""

# 13. Próximos passos
Write-Info "📋 PRÓXIMOS PASSOS:"
Write-Info "==================="
Write-Info "1. Configurar DNS no seu provedor de domínio"
Write-Info "2. Configurar variáveis de ambiente no Vercel"
Write-Info "3. Configurar Cloudflare (opcional)"
Write-Info "4. Testar todas as funcionalidades"
Write-Info "5. Configurar monitoramento"
Write-Info ""

# 14. Comandos úteis
Write-Info "🛠️  COMANDOS ÚTEIS:"
Write-Info "==================="
Write-Info "vercel logs                    # Ver logs da aplicação"
Write-Info "vercel env ls                  # Listar variáveis de ambiente"
Write-Info "vercel domains ls              # Listar domínios"
Write-Info "vercel inspect                 # Inspecionar deploy"
Write-Info "vercel rollback                # Fazer rollback se necessário"
Write-Info ""

Write-Success "Deploy da Fenix Academy concluído!"
Write-Success "Acesse: https://$Domain"

# 15. Abrir URLs importantes
Write-Info "Abrindo URLs importantes..."
Start-Process "https://vercel.com/dashboard"
Start-Process "https://$Domain"

exit 0
