# Script para executar seed_real_courses com configuracoes locais
Write-Host "Executando seed_real_courses com configuracoes locais..." -ForegroundColor Green

# Verificar se estamos no diretorio correto
if (-not (Test-Path "backend\manage.py")) {
    Write-Host "Arquivo manage.py nao encontrado. Execute este script na raiz do projeto." -ForegroundColor Red
    exit 1
}

Write-Host "Diretorio atual: $(Get-Location)" -ForegroundColor Cyan

# Tentar encontrar Python
$pythonPaths = @(
    "python",
    "python3",
    "C:\Python*\python.exe",
    "C:\Users\$env:USERNAME\AppData\Local\Programs\Python\Python*\python.exe",
    "C:\Program Files\Python*\python.exe",
    "C:\Program Files (x86)\Python*\python.exe"
)

$pythonExe = $null
foreach ($path in $pythonPaths) {
    try {
        $result = & $path --version 2>$null
        if ($result) {
            $pythonExe = $path
            Write-Host "Python encontrado: $path" -ForegroundColor Green
            break
        }
    } catch {
        # Ignorar erro e continuar
    }
}

if (-not $pythonExe) {
    Write-Host "Python nao encontrado. Instale o Python primeiro." -ForegroundColor Red
    Write-Host "Baixe em: https://www.python.org/downloads/" -ForegroundColor Cyan
    exit 1
}

# Verificar se o ambiente virtual existe
if (Test-Path "backend\venv") {
    Write-Host "Ativando ambiente virtual..." -ForegroundColor Yellow
    try {
        & "backend\venv\Scripts\Activate.ps1"
        Write-Host "Ambiente virtual ativado" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao ativar ambiente virtual, continuando..." -ForegroundColor Yellow
    }
} else {
    Write-Host "Ambiente virtual nao encontrado. Criando..." -ForegroundColor Yellow
    try {
        & $pythonExe -m venv backend\venv
        & "backend\venv\Scripts\Activate.ps1"
        Write-Host "Ambiente virtual criado e ativado" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao criar ambiente virtual, continuando..." -ForegroundColor Yellow
    }
}

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
try {
    & $pythonExe -m pip install -r backend\requirements.txt
    Write-Host "Dependencias instaladas" -ForegroundColor Green
} catch {
    Write-Host "Erro ao instalar dependencias, continuando..." -ForegroundColor Yellow
}

# Executar migracoes primeiro
Write-Host "Executando migracoes..." -ForegroundColor Yellow
Set-Location backend
try {
    & $pythonExe manage.py makemigrations
    & $pythonExe manage.py migrate
    Write-Host "Migracoes executadas com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao executar migracoes: $_" -ForegroundColor Red
}

# Criar superusuario
Write-Host "Criando superusuario..." -ForegroundColor Yellow
try {
    & $pythonExe manage.py create_superuser
    Write-Host "Superusuario criado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao criar superusuario: $_" -ForegroundColor Red
}

# Executar o comando seed
Write-Host "Executando seed_real_courses..." -ForegroundColor Green
try {
    & $pythonExe manage.py seed_real_courses
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Comando seed_real_courses executado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "Erro ao executar seed_real_courses" -ForegroundColor Red
    }
} catch {
    Write-Host "Erro ao executar comando: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Outros comandos uteis:" -ForegroundColor Cyan
Write-Host "  python manage.py seed_all_courses    - Executar todos os seeds" -ForegroundColor White
Write-Host "  python manage.py seed_advanced_courses - Executar seeds avancados" -ForegroundColor White
Write-Host "  python manage.py seed_full_courses    - Executar seeds completos" -ForegroundColor White
Write-Host "  python manage.py test_setup          - Testar configuracao" -ForegroundColor White
Write-Host "  python manage.py runserver           - Iniciar servidor de desenvolvimento" -ForegroundColor White 