# Script para executar o comando seed_real_courses
Write-Host "🌱 Executando seed_real_courses..." -ForegroundColor Green

# Verificar se estamos no diretório correto
if (-not (Test-Path "backend\manage.py")) {
    Write-Host "❌ Arquivo manage.py não encontrado. Execute este script na raiz do projeto." -ForegroundColor Red
    exit 1
}

Write-Host "📁 Diretório atual: $(Get-Location)" -ForegroundColor Cyan

# Verificar se Python está instalado
try {
    $pythonVersion = python --version 2>$null
    if ($pythonVersion) {
        Write-Host "✅ Python encontrado: $pythonVersion" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Python não encontrado no PATH" -ForegroundColor Yellow
        Write-Host "💡 Tentando encontrar Python..." -ForegroundColor Cyan
        
        # Tentar encontrar Python em locais comuns
        $pythonPaths = @(
            "C:\Python*\python.exe",
            "C:\Users\$env:USERNAME\AppData\Local\Programs\Python\Python*\python.exe",
            "C:\Program Files\Python*\python.exe",
            "C:\Program Files (x86)\Python*\python.exe"
        )
        
        $foundPython = $false
        foreach ($path in $pythonPaths) {
            $pythonExe = Get-ChildItem -Path $path -ErrorAction SilentlyContinue | Select-Object -First 1
            if ($pythonExe) {
                Write-Host "✅ Python encontrado em: $($pythonExe.FullName)" -ForegroundColor Green
                $env:PATH = "$($pythonExe.DirectoryName);$env:PATH"
                $foundPython = $true
                break
            }
        }
        
        if (-not $foundPython) {
            Write-Host "❌ Python não encontrado. Instale o Python primeiro." -ForegroundColor Red
            Write-Host "💡 Baixe em: https://www.python.org/downloads/" -ForegroundColor Cyan
            exit 1
        }
    }
} catch {
    Write-Host "❌ Erro ao verificar Python: $_" -ForegroundColor Red
    exit 1
}

# Verificar se o ambiente virtual existe
if (Test-Path "backend\venv") {
    Write-Host "🔧 Ativando ambiente virtual..." -ForegroundColor Yellow
    & "backend\venv\Scripts\Activate.ps1"
    Write-Host "✅ Ambiente virtual ativado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Ambiente virtual não encontrado. Criando..." -ForegroundColor Yellow
    python -m venv backend\venv
    & "backend\venv\Scripts\Activate.ps1"
    Write-Host "✅ Ambiente virtual criado e ativado" -ForegroundColor Green
}

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
pip install -r backend\requirements.txt

# Executar o comando seed
Write-Host "🚀 Executando seed_real_courses..." -ForegroundColor Green
cd backend
python manage.py seed_real_courses

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Comando seed_real_courses executado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao executar seed_real_courses" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 Outros comandos úteis:" -ForegroundColor Cyan
Write-Host "  python manage.py seed_all_courses    - Executar todos os seeds" -ForegroundColor White
Write-Host "  python manage.py seed_advanced_courses - Executar seeds avançados" -ForegroundColor White
Write-Host "  python manage.py seed_full_courses    - Executar seeds completos" -ForegroundColor White
Write-Host "  python manage.py test_setup          - Testar configuração" -ForegroundColor White 