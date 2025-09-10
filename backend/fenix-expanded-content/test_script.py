#!/usr/bin/env python3
"""
Script de teste simples
"""

import os
from pathlib import Path

def main():
    print("🐍 Teste do Python funcionando!")
    print("=" * 40)
    
    # Verificar diretório atual
    current_dir = Path.cwd()
    print(f"📁 Diretório atual: {current_dir}")
    
    # Verificar se o diretório existe
    if current_dir.exists():
        print("✅ Diretório existe")
        
        # Listar arquivos .md
        md_files = list(current_dir.rglob("*.md"))
        print(f"📄 Arquivos .md encontrados: {len(md_files)}")
        
        if md_files:
            print("📋 Primeiros 5 arquivos:")
            for i, file_path in enumerate(md_files[:5]):
                print(f"  {i+1}. {file_path.name}")
        else:
            print("❌ Nenhum arquivo .md encontrado")
    else:
        print("❌ Diretório não existe")
    
    print("\n🎉 Teste concluído!")

if __name__ == "__main__":
    main()






