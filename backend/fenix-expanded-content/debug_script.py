#!/usr/bin/env python3
"""
Script de debug para identificar problemas
"""

import os
import sys
from pathlib import Path

def debug_paths():
    print("🔍 Debug de caminhos...")
    print("=" * 40)
    
    # Verificar diretório atual
    current_dir = Path.cwd()
    print(f"📁 Diretório atual: {current_dir}")
    
    # Verificar se estamos no diretório correto
    target_path = Path("backend/fenix-expanded-content")
    print(f"🎯 Caminho alvo: {target_path}")
    print(f"✅ Existe? {target_path.exists()}")
    
    # Verificar caminho absoluto
    absolute_path = Path.cwd().absolute()
    print(f"📍 Caminho absoluto: {absolute_path}")
    
    # Verificar se há arquivos .md
    md_files = list(Path.cwd().rglob("*.md"))
    print(f"📄 Total de arquivos .md: {len(md_files)}")
    
    # Verificar diretórios de cursos
    course_dirs = [d for d in Path.cwd().iterdir() if d.is_dir() and not d.name.startswith('.')]
    print(f"📚 Diretórios de cursos: {len(course_dirs)}")
    for course_dir in course_dirs:
        print(f"  - {course_dir.name}")
    
    print("\n🎉 Debug concluído!")

if __name__ == "__main__":
    debug_paths()






