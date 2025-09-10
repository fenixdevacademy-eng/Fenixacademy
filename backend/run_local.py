#!/usr/bin/env python
"""
Script para executar o Django localmente com diferentes configurações
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

def main():
    """Função principal"""
    print("🚀 Iniciando Fenix Academy - Desenvolvimento Local")
    print("=" * 50)
    
    # Verificar argumentos
    if len(sys.argv) > 1:
        settings = sys.argv[1]
    else:
        settings = 'local'
    
    # Configurar variáveis de ambiente
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'fenix_academy.settings.{settings}')
    
    print(f"📋 Usando configurações: {settings}")
    
    # Configurar Django
    django.setup()
    
    # Executar comando
    if len(sys.argv) > 2:
        # Se há mais argumentos, executar comando específico
        execute_from_command_line(sys.argv[2:])
    else:
        # Executar servidor de desenvolvimento
        print("🌐 Iniciando servidor de desenvolvimento...")
        print("📍 Acesse: http://127.0.0.1:8000")
        print("🔧 Admin: http://127.0.0.1:8000/admin/")
        print("📊 API: http://127.0.0.1:8000/api/")
        print("=" * 50)
        
        # Executar servidor
        execute_from_command_line(['manage.py', 'runserver', '127.0.0.1:8000'])

if __name__ == '__main__':
    main() 