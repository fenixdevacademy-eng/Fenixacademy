#!/usr/bin/env python3
"""
Script para verificar e corrigir imports faltando nos arquivos Python
"""

import os
import re
from pathlib import Path

def check_and_fix_imports(file_path):
    """Verifica e corrige imports faltando em um arquivo Python"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Lista de imports comuns que podem estar faltando
        common_imports = {
            'timezone': 'from django.utils import timezone',
            'gettext_lazy': 'from django.utils.translation import gettext_lazy as _',
            'MinValueValidator': 'from django.core.validators import MinValueValidator',
            'MaxValueValidator': 'from django.core.validators import MaxValueValidator',
            'Q': 'from django.db.models import Q',
            'F': 'from django.db.models import F',
            'Sum': 'from django.db.models import Sum',
            'Count': 'from django.db.models import Count',
            'Avg': 'from django.db.models import Avg',
            'Min': 'from django.db.models import Min',
            'Max': 'from django.db.models import Max',
            'uuid': 'import uuid',
            'Decimal': 'from decimal import Decimal',
            'datetime': 'from datetime import datetime, timedelta',
            'timedelta': 'from datetime import datetime, timedelta',
            'date': 'from datetime import date',
            'time': 'from datetime import time',
            'json': 'import json',
            'os': 'import os',
            'sys': 'import sys',
            'pathlib': 'from pathlib import Path',
        }
        
        # Verificar se o arquivo usa timezone mas não importa
        if 'timezone.now()' in content or 'timezone.now(' in content:
            if 'from django.utils import timezone' not in content:
                print(f"⚠️  Arquivo {file_path} usa timezone mas não importa")
                return True
        
        # Verificar outros imports comuns
        for var_name, import_statement in common_imports.items():
            if var_name in content and import_statement not in content:
                print(f"⚠️  Arquivo {file_path} usa {var_name} mas não importa")
                return True
        
        return False
        
    except Exception as e:
        print(f"❌ Erro ao verificar {file_path}: {e}")
        return False

def scan_python_files(directory):
    """Escaneia arquivos Python em um diretório"""
    python_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                python_files.append(os.path.join(root, file))
    return python_files

def main():
    """Função principal"""
    print("🔍 Verificando imports faltando nos arquivos Python...")
    
    # Diretórios para verificar
    directories = ['backend']
    
    for directory in directories:
        if os.path.exists(directory):
            print(f"\n📁 Verificando diretório: {directory}")
            python_files = scan_python_files(directory)
            
            issues_found = 0
            for file_path in python_files:
                if check_and_fix_imports(file_path):
                    issues_found += 1
            
            if issues_found == 0:
                print(f"✅ Nenhum problema encontrado em {directory}")
            else:
                print(f"⚠️  {issues_found} problemas encontrados em {directory}")
        else:
            print(f"❌ Diretório {directory} não encontrado")

if __name__ == "__main__":
    main() 