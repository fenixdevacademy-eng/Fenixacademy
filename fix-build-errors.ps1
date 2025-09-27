# 🚀 Script PowerShell para Correção Automática de Erros de Build
# Fenix Academy - Deploy Automático

param(
    [switch]$Force,
    [switch]$Verbose
)

# Configurar cores
$Host.UI.RawUI.ForegroundColor = "White"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    
    $originalColor = $Host.UI.RawUI.ForegroundColor
    $Host.UI.RawUI.ForegroundColor = $Color
    Write-Host $Message
    $Host.UI.RawUI.ForegroundColor = $originalColor
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput "✅ $Message" "Green"
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput "❌ $Message" "Red"
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput "⚠️  $Message" "Yellow"
}

function Write-Info {
    param([string]$Message)
    Write-ColorOutput "ℹ️  $Message" "Cyan"
}

# Verificar pré-requisitos
function Test-Prerequisites {
    Write-Info "Verificando pré-requisitos..."
    
    # Verificar Node.js
    try {
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -ne 0) {
            throw "Node.js não encontrado"
        }
        Write-Success "Node.js encontrado: $nodeVersion"
    }
    catch {
        Write-Error "Node.js não está instalado ou não está no PATH"
        return $false
    }
    
    # Verificar diretório frontend
    if (-not (Test-Path "frontend")) {
        Write-Error "Diretório 'frontend' não encontrado!"
        Write-Info "Execute este script na raiz do projeto Fenix."
        return $false
    }
    
    # Verificar package.json
    if (-not (Test-Path "frontend/package.json")) {
        Write-Error "package.json não encontrado em frontend/"
        return $false
    }
    
    Write-Success "Todos os pré-requisitos atendidos!"
    return $true
}

# Executar correções automáticas
function Invoke-BuildFixes {
    Write-Info "Aplicando correções automáticas..."
    
    # Lista de correções específicas
    $fixes = @(
        @{
            Name = "Corrigir tipos do Monaco Editor"
            Pattern = "lineNumbers:\s*(\w+)\s*\?\s*['`"]on['`"]\s*:\s*['`"]off['`"]"
            Replacement = "lineNumbers: `$1 ? 'on' as const : 'off' as const"
            Files = "*.tsx", "*.ts"
        },
        @{
            Name = "Corrigir wordWrap do Monaco Editor"
            Pattern = "wordWrap:\s*(\w+)\s*\?\s*['`"]on['`"]\s*:\s*['`"]off['`"]"
            Replacement = "wordWrap: `$1 ? 'on' as const : 'off' as const"
            Files = "*.tsx", "*.ts"
        },
        @{
            Name = "Corrigir imports do next-i18next"
            Pattern = "import\s*{\s*useTranslation\s*}\s*from\s*['`"]next-i18next['`"]"
            Replacement = "import { useTranslation } from '@/lib/i18n'"
            Files = "*.tsx", "*.ts"
        },
        @{
            Name = "Corrigir métodos do ProfileStorage"
            Pattern = "ProfileStorage\.(saveProfile|getProfile|updateProfile)\("
            Replacement = "ProfileStorage.save("
            Files = "*.tsx", "*.ts"
        }
    )
    
    $fixedCount = 0
    
    foreach ($fix in $fixes) {
        Write-Info "Aplicando: $($fix.Name)"
        
        $files = Get-ChildItem -Path "frontend" -Recurse -Include $fix.Files | Where-Object { -not $_.FullName.Contains("node_modules") }
        
        foreach ($file in $files) {
            $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
            if ($content -and $content -match $fix.Pattern) {
                $newContent = $content -replace $fix.Pattern, $fix.Replacement
                if ($newContent -ne $content) {
                    Set-Content -Path $file.FullName -Value $newContent -NoNewline
                    $fixedCount++
                    if ($Verbose) {
                        Write-Success "  Corrigido: $($file.Name)"
                    }
                }
            }
        }
    }
    
    Write-Success "Correções aplicadas em $fixedCount arquivos"
}

# Executar build
function Invoke-Build {
    Write-Info "Executando build..."
    
    try {
        Push-Location "frontend"
        $buildOutput = npm run build 2>&1
        $buildSuccess = $LASTEXITCODE -eq 0
        
        if ($buildSuccess) {
            Write-Success "Build executado com sucesso!"
            return $true
        } else {
            Write-Warning "Build falhou. Analisando erros..."
            if ($Verbose) {
                Write-Host $buildOutput
            }
            return $false
        }
    }
    catch {
        Write-Error "Erro ao executar build: $($_.Exception.Message)"
        return $false
    }
    finally {
        Pop-Location
    }
}

# Executar deploy
function Invoke-Deploy {
    param([switch]$Production)
    
    Write-Info "Iniciando deploy..."
    
    try {
        Push-Location "frontend"
        
        if ($Production) {
            Write-Info "Deploy para produção..."
            $deployOutput = vercel --prod --yes 2>&1
        } else {
            Write-Info "Deploy para preview..."
            $deployOutput = vercel --yes 2>&1
        }
        
        $deploySuccess = $LASTEXITCODE -eq 0
        
        if ($deploySuccess) {
            Write-Success "Deploy executado com sucesso!"
            Write-Info "URL: $($deployOutput | Select-String 'https://' | Select-Object -First 1)"
            return $true
        } else {
            Write-Error "Deploy falhou!"
            if ($Verbose) {
                Write-Host $deployOutput
            }
            return $false
        }
    }
    catch {
        Write-Error "Erro ao executar deploy: $($_.Exception.Message)"
        return $false
    }
    finally {
        Pop-Location
    }
}

# Função principal
function Main {
    Write-ColorOutput "🚀 FENIX ACADEMY - CORREÇÃO AUTOMÁTICA DE BUILD" "Cyan"
    Write-ColorOutput "===============================================" "Cyan"
    Write-Host ""
    
    # Verificar pré-requisitos
    if (-not (Test-Prerequisites)) {
        Write-Error "Pré-requisitos não atendidos. Abortando."
        exit 1
    }
    
    Write-Host ""
    
    # Aplicar correções
    Invoke-BuildFixes
    
    Write-Host ""
    
    # Executar build
    $buildSuccess = Invoke-Build
    
    if ($buildSuccess) {
        Write-Host ""
        Write-Success "🎉 Build executado com sucesso!"
        
        # Perguntar sobre deploy
        if (-not $Force) {
            $deployChoice = Read-Host "Deseja fazer deploy para produção? (s/n)"
            if ($deployChoice -eq "s" -or $deployChoice -eq "S" -or $deployChoice -eq "sim") {
                Write-Host ""
                Invoke-Deploy -Production
            }
        } else {
            Write-Host ""
            Invoke-Deploy -Production
        }
    } else {
        Write-Host ""
        Write-Warning "Build falhou. Tente executar o script novamente."
        Write-Info "Para mais detalhes, execute com -Verbose"
    }
    
    Write-Host ""
    Write-ColorOutput "📋 Resumo:" "Cyan"
    Write-Info "  • Correções automáticas aplicadas"
    Write-Info "  • Build testado"
    Write-Info "  • Deploy opcional executado"
    Write-Host ""
}

# Executar função principal
Main
