#!/bin/bash

echo "========================================"
echo "   Criando Super Usuarios - Fenix Academy"
echo "========================================"
echo

# Navegar para o diretório do projeto
cd "$(dirname "$0")"

echo "Executando comando de criacao de super usuarios..."
python manage.py create_superusers

echo
echo "========================================"
echo "   Comando concluido!"
echo "========================================" 