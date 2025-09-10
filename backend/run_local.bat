@echo off
echo 🚀 Iniciando Fenix Academy - Desenvolvimento Local
echo ==================================================

REM Verificar se o ambiente virtual existe
if not exist "venv\Scripts\activate.bat" (
    echo ❌ Ambiente virtual não encontrado!
    echo 📦 Criando ambiente virtual...
    python -m venv venv
)

REM Ativar ambiente virtual
echo 🔧 Ativando ambiente virtual...
call venv\Scripts\activate.bat

REM Instalar dependências se necessário
if not exist "venv\Lib\site-packages\django" (
    echo 📦 Instalando dependências...
    pip install -r requirements.txt
)

REM Executar migrações
echo 🔄 Executando migrações...
python manage.py migrate

REM Verificar argumentos
if "%1"=="no-debug" (
    echo 🚫 Executando sem Debug Toolbar...
    set DJANGO_SETTINGS_MODULE=fenix_academy.settings.local_no_debug
) else if "%1"=="simple" (
    echo 🔧 Executando configuração simples...
    set DJANGO_SETTINGS_MODULE=fenix_academy.settings.local_simple
) else (
    echo ✅ Executando com Debug Toolbar...
    set DJANGO_SETTINGS_MODULE=fenix_academy.settings.local
)

REM Executar servidor
echo 🌐 Iniciando servidor de desenvolvimento...
echo 📍 Acesse: http://127.0.0.1:8000
echo 🔧 Admin: http://127.0.0.1:8000/admin/
echo 📊 API: http://127.0.0.1:8000/api/
echo ==================================================

python manage.py runserver 127.0.0.1:8000

pause 