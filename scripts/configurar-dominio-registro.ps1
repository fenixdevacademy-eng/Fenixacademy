# Script de Configuracao - Dominio Registro.com
# Dominio: fenixdevacademy.com

param(
    [switch]$SkipDNS,
    [switch]$SkipVercel,
    [switch]$TestOnly
)

# Configuracoes
$ErrorActionPreference = "Stop"
$Domain = "fenixdevacademy.com"
$VercelIP = "76.76.19.61"

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

Write-Info "CONFIGURACAO DOMINIO - REGISTRO.COM"
Write-Info "===================================="
Write-Info "Dominio: $Domain"
Write-Info "Data: $(Get-Date)"
Write-Info ""

# Verificar se esta no diretorio correto
if (-not (Test-Path "package.json")) {
    Write-Error "Execute este script na raiz do projeto Fenix Academy"
    exit 1
}

# 1. Verificar dependencias
Write-Info "Verificando dependencias..."

# Verificar Vercel CLI
try {
    $vercelVersion = vercel --version
    Write-Success "Vercel CLI encontrado: $vercelVersion"
} catch {
    Write-Warning "Vercel CLI nao encontrado. Instalando..."
    npm install -g vercel
    Write-Success "Vercel CLI instalado"
}

# Verificar se esta logado no Vercel
Write-Info "Verificando login no Vercel..."
try {
    vercel whoami | Out-Null
    Write-Success "Logado no Vercel"
} catch {
    Write-Warning "Nao esta logado no Vercel. Fazendo login..."
    vercel login
    Write-Success "Login realizado"
}

Write-Success "Dependencias verificadas"

# 2. Configurar DNS (se nao pular)
if (-not $SkipDNS) {
    Write-Info ""
    Write-Info "CONFIGURACAO DNS NO REGISTRO.COM"
    Write-Info "================================="
    Write-Info ""
    Write-Info "1. Acesse: https://registro.com"
    Write-Info "2. Faca login com suas credenciais"
    Write-Info "3. Va em 'Meus Dominios'"
    Write-Info "4. Clique em 'Gerenciar' no dominio $Domain"
    Write-Info "5. Va em 'DNS' ou 'Zona DNS'"
    Write-Info "6. Clique em 'Gerenciar Registros DNS'"
    Write-Info ""
    Write-Info "Adicione os seguintes registros:"
    Write-Info ""
    Write-Info "Tipo: A"
    Write-Info "Nome: @ (arroba)"
    Write-Info "Valor: $VercelIP"
    Write-Info "TTL: 3600"
    Write-Info ""
    Write-Info "Tipo: CNAME"
    Write-Info "Nome: www"
    Write-Info "Valor: cname.vercel-dns.com"
    Write-Info "TTL: 3600"
    Write-Info ""
    Write-Info "Tipo: CNAME"
    Write-Info "Nome: api"
    Write-Info "Valor: cname.vercel-dns.com"
    Write-Info "TTL: 3600"
    Write-Info ""
    Write-Info "Tipo: CNAME"
    Write-Info "Nome: app"
    Write-Info "Valor: cname.vercel-dns.com"
    Write-Info "TTL: 3600"
    Write-Info ""
    Write-Warning "Apos configurar o DNS, aguarde 15-30 minutos para propagacao"
    Write-Info ""
    Write-Info "Pressione ENTER quando terminar a configuracao DNS..."
    Read-Host
}

# 3. Configurar Vercel (se nao pular)
if (-not $SkipVercel) {
    Write-Info ""
    Write-Info "CONFIGURACAO NO VERCEL"
    Write-Info "======================"
    Write-Info ""
    
    # Adicionar dominio
    Write-Info "Adicionando dominio no Vercel..."
    try {
        vercel domains add $Domain
        Write-Success "Dominio adicionado no Vercel"
    } catch {
        Write-Warning "Dominio pode ja estar configurado ou haver erro na configuracao"
    }
    
    # Verificar status
    Write-Info "Verificando status do dominio..."
    vercel domains ls
    
    # Configurar subdominios
    Write-Info "Configurando subdominios..."
    $subdomains = @("www", "api", "app", "admin")
    foreach ($subdomain in $subdomains) {
        try {
            vercel domains add "$subdomain.$Domain"
            Write-Success "Subdominio $subdomain configurado"
        } catch {
            Write-Warning "Subdominio $subdomain pode ja estar configurado"
        }
    }
}

# 4. Deploy da aplicacao
Write-Info ""
Write-Info "FAZENDO DEPLOY DA APLICACAO"
Write-Info "==========================="
Write-Info ""

# Build da aplicacao
Write-Info "Fazendo build da aplicacao..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro no build. Verifique os logs acima."
    exit 1
}
Write-Success "Build concluido"

# Deploy no Vercel
Write-Info "Fazendo deploy no Vercel..."
vercel --prod --yes
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro no deploy do Vercel"
    exit 1
}
Write-Success "Deploy concluido"

# 5. Testar dominio
Write-Info ""
Write-Info "TESTANDO DOMINIO"
Write-Info "================"
Write-Info ""

if ($TestOnly) {
    Write-Info "Modo de teste ativado. Apenas testando o dominio..."
}

# Testar DNS
Write-Info "Testando resolucao DNS..."
try {
    $dnsResult = nslookup $Domain
    if ($dnsResult -match $VercelIP) {
        Write-Success "DNS configurado corretamente"
    } else {
        Write-Warning "DNS pode nao ter propagado ainda. Aguarde alguns minutos."
    }
} catch {
    Write-Warning "Nao foi possivel testar DNS. Verifique manualmente."
}

# Testar aplicacao
Write-Info "Testando aplicacao..."
try {
    $response = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Write-Success "Aplicacao esta online e funcionando!"
        Write-Info "URL: https://$Domain"
    } else {
        Write-Warning "Aplicacao retornou status: $($response.StatusCode)"
    }
} catch {
    Write-Warning "Nao foi possivel testar a aplicacao. Pode estar em processo de deploy."
}

# Testar subdominios
Write-Info "Testando subdominios..."
$subdomains = @("www", "api", "app")
foreach ($subdomain in $subdomains) {
    try {
        $response = Invoke-WebRequest -Uri "https://$subdomain.$Domain" -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "Subdominio $subdomain funcionando"
        } else {
            Write-Warning "Subdominio $subdomain retornou status: $($response.StatusCode)"
        }
    } catch {
        Write-Warning "Subdominio $subdomain nao esta funcionando ainda"
    }
}

# 6. Resumo final
Write-Info ""
Write-Info "CONFIGURACAO CONCLUIDA!"
Write-Info "======================="
Write-Info ""
Write-Info "URLs da aplicacao:"
Write-Info "  Principal: https://$Domain"
Write-Info "  www: https://www.$Domain"
Write-Info "  API: https://api.$Domain"
Write-Info "  App: https://app.$Domain"
Write-Info ""
Write-Info "Dashboard Vercel: https://vercel.com/dashboard"
Write-Info "Logs: vercel logs"
Write-Info "Analytics: https://vercel.com/analytics"
Write-Info ""

# 7. Proximos passos
Write-Info "PROXIMOS PASSOS:"
Write-Info "================"
Write-Info "1. Aguardar propagacao DNS (15-30 minutos)"
Write-Info "2. Testar todas as funcionalidades"
Write-Info "3. Configurar variaveis de ambiente"
Write-Info "4. Configurar Cloudflare (opcional)"
Write-Info "5. Configurar monitoramento"
Write-Info ""

# 8. Comandos uteis
Write-Info "COMANDOS UTEIS:"
Write-Info "==============="
Write-Info "vercel logs                    # Ver logs da aplicacao"
Write-Info "vercel domains ls              # Listar dominios"
Write-Info "vercel inspect                 # Inspecionar deploy"
Write-Info "vercel rollback                # Fazer rollback se necessario"
Write-Info ""

# 9. Abrir URLs importantes
Write-Info "Abrindo URLs importantes..."
Start-Process "https://vercel.com/dashboard"
Start-Process "https://$Domain"

Write-Success "Configuracao do dominio concluida!"
Write-Success "Acesse: https://$Domain"

exit 0