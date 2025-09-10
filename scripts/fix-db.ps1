# Script para corrigir o banco de dados
Write-Host "Corrigindo banco de dados..." -ForegroundColor Green

# Definir caminho do Python
$pythonExe = "C:\Users\Micro\AppData\Local\Programs\Python\Python313\python.exe"

# Navegar para o backend
Set-Location backend

# Remover banco de dados existente
Write-Host "Removendo banco de dados existente..." -ForegroundColor Yellow
Remove-Item -Path "db.sqlite3" -Force -ErrorAction SilentlyContinue

# Executar migracoes
Write-Host "Executando migracoes..." -ForegroundColor Yellow
try {
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

# Executar seed
Write-Host "Executando seed_real_courses..." -ForegroundColor Yellow
try {
    & $pythonExe manage.py seed_real_courses
    Write-Host "Seed executado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao executar seed: $_" -ForegroundColor Red
}

Write-Host "Processo concluido!" -ForegroundColor Green 