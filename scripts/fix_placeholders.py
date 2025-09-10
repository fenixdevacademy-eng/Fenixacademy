#!/usr/bin/env python3
"""
Script para corrigir placeholders incorretos nos arquivos markdown
"""

import os
import re
from pathlib import Path

def fix_placeholders_in_file(file_path):
    """Corrige placeholders incorretos em um arquivo"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar se o arquivo contém o placeholder problemático
        if "{module.lower().replace(' ', '')}" in content:
            print(f"🔧 Corrigindo: {file_path}")
            
            # Substituir o placeholder incorreto por um placeholder correto
            # que será processado pelo Python
            content = content.replace(
                "const {module.lower().replace(' ', '')} = {{",
                "const {module_name} = {{"
            )
            
            # Salvar o arquivo corrigido
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return True
    except Exception as e:
        print(f"❌ Erro ao processar {file_path}: {e}")
        return False
    
    return False

def fix_placeholders_in_directory(directory):
    """Corrige placeholders em todos os arquivos markdown de um diretório"""
    fixed_count = 0
    total_files = 0
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                total_files += 1
                
                if fix_placeholders_in_file(file_path):
                    fixed_count += 1
    
    print(f"\n✅ Processados {total_files} arquivos")
    print(f"🔧 Corrigidos {fixed_count} arquivos")
    
    return fixed_count

def main():
    """Função principal"""
    print("🚀 Iniciando correção de placeholders...")
    
    # Diretórios para processar
    directories = [
        "backend/fenix-expanded-content/web-fundamentals",
        "backend/fenix-expanded-content",
        "course_content_restructured"
    ]
    
    total_fixed = 0
    
    for directory in directories:
        if os.path.exists(directory):
            print(f"\n📁 Processando diretório: {directory}")
            fixed = fix_placeholders_in_directory(directory)
            total_fixed += fixed
        else:
            print(f"⚠️  Diretório não encontrado: {directory}")
    
    print(f"\n🎉 Correção concluída!")
    print(f"📊 Total de arquivos corrigidos: {total_fixed}")

if __name__ == "__main__":
    main()






