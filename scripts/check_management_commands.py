#!/usr/bin/env python3
"""
Script para verificar imports nos comandos de management
"""

import os
import re
from pathlib import Path

def check_management_commands():
    """Verifica imports nos comandos de management"""
    commands_dir = Path('backend/courses/management/commands')
    
    if not commands_dir.exists():
        print("❌ Diretório de comandos não encontrado")
        return
    
    print("🔍 Verificando comandos de management...")
    
    # Imports necessários para comandos Django
    required_imports = {
        'BaseCommand': 'from django.core.management.base import BaseCommand',
        'apps': 'from django.apps import apps',
        'get_user_model': 'from django.contrib.auth import get_user_model',
        'timezone': 'from django.utils import timezone',
        'transaction': 'from django.db import transaction',
        'call_command': 'from django.core.management import call_command',
    }
    
    # Verificar cada arquivo .py
    for file_path in commands_dir.glob('*.py'):
        if file_path.name == '__init__.py':
            continue
            
        print(f"\n📄 Verificando: {file_path.name}")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Verificar se é um comando válido
            if 'class Command(BaseCommand):' not in content:
                print(f"⚠️  {file_path.name} não parece ser um comando Django válido")
                continue
            
            # Verificar imports necessários
            missing_imports = []
            for var_name, import_statement in required_imports.items():
                if var_name in content and import_statement not in content:
                    missing_imports.append(import_statement)
            
            if missing_imports:
                print(f"❌ Imports faltando em {file_path.name}:")
                for imp in missing_imports:
                    print(f"   - {imp}")
            else:
                print(f"✅ {file_path.name} - imports OK")
                
            # Verificar se há imports de modelos
            if 'from courses.models import' in content:
                print(f"✅ {file_path.name} - imports de modelos OK")
            elif 'apps.get_model' in content:
                print(f"✅ {file_path.name} - usa apps.get_model OK")
            else:
                print(f"⚠️  {file_path.name} - não encontrou imports de modelos")
                
        except Exception as e:
            print(f"❌ Erro ao verificar {file_path.name}: {e}")

def main():
    """Função principal"""
    print("🔍 Verificando comandos de management...")
    check_management_commands()
    print("\n✅ Verificação concluída!")

if __name__ == "__main__":
    main() 