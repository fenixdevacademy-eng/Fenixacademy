#!/bin/bash

# Script para executar o comando seed_real_courses
echo "🌱 Executando seed_real_courses..."

# Verificar se estamos no diretório correto
if [ ! -f "backend/manage.py" ]; then
    echo "❌ Arquivo manage.py não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

echo "📁 Diretório atual: $(pwd)"

# Verificar se Python está instalado
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
    echo "✅ Python3 encontrado"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
    echo "✅ Python encontrado"
else
    echo "❌ Python não encontrado. Instale o Python primeiro."
    echo "💡 Baixe em: https://www.python.org/downloads/"
    exit 1
fi

# Verificar se o ambiente virtual existe
if [ -d "backend/venv" ]; then
    echo "🔧 Ativando ambiente virtual..."
    source backend/venv/bin/activate
    echo "✅ Ambiente virtual ativado"
else
    echo "⚠️  Ambiente virtual não encontrado. Criando..."
    $PYTHON_CMD -m venv backend/venv
    source backend/venv/bin/activate
    echo "✅ Ambiente virtual criado e ativado"
fi

# Instalar dependências
echo "📦 Instalando dependências..."
pip install -r backend/requirements.txt

# Executar o comando seed
echo "🚀 Executando seed_real_courses..."
cd backend
$PYTHON_CMD manage.py seed_real_courses

if [ $? -eq 0 ]; then
    echo "✅ Comando seed_real_courses executado com sucesso!"
else
    echo "❌ Erro ao executar seed_real_courses"
fi

echo ""
echo "📋 Outros comandos úteis:"
echo "  python manage.py seed_all_courses    - Executar todos os seeds"
echo "  python manage.py seed_advanced_courses - Executar seeds avançados"
echo "  python manage.py seed_full_courses    - Executar seeds completos"
echo "  python manage.py test_setup          - Testar configuração" 