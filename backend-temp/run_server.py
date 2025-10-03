#!/usr/bin/env python
"""
Script para iniciar o servidor Django
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

def run_server():
    """Iniciar servidor Django"""
    
    # Configurar Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings')
    django.setup()
    
    print("🚀 Iniciando servidor Django da Fênix Academy...")
    print("📡 Servidor rodando em: http://localhost:8000")
    print("📚 API disponível em: http://localhost:8000/api/v1/")
    print("📖 Documentação da API: http://localhost:8000/api/docs/")
    print("🔧 Admin: http://localhost:8000/admin/")
    print("👤 Usuário admin: admin / admin123")
    print("\n" + "="*50)
    
    # Executar servidor
    execute_from_command_line(['manage.py', 'runserver', '0.0.0.0:8000'])

if __name__ == '__main__':
    run_server()









