#!/usr/bin/env python3
"""
Script para verificar o status das aulas criadas
"""

import os
from pathlib import Path

def verify_lessons():
    """Verifica o status das aulas"""
    base_path = Path("backend/fenix-expanded-content/web-fundamentals/avancado")
    
    print("🔍 VERIFICANDO STATUS DAS AULAS")
    print("=" * 50)
    
    if not base_path.exists():
        print(f"❌ Diretório não encontrado: {base_path}")
        return
    
    # Verificar todas as aulas (1-72)
    total_lessons = 72
    existing_lessons = 0
    missing_lessons = []
    
    for i in range(1, total_lessons + 1):
        filename = f"modulo-{i:02d}-avancado-web-fundamentals.md"
        filepath = base_path / filename
        
        if filepath.exists():
            # Verificar tamanho do arquivo
            file_size = filepath.stat().st_size
            size_kb = file_size / 1024
            
            status = "✅"
            existing_lessons += 1
            
            print(f"  {status} Aula {i:02d}: {filename} ({size_kb:.1f} KB)")
        else:
            status = "❌"
            missing_lessons.append(i)
            print(f"  {status} Aula {i:02d}: {filename} (FALTANDO)")
    
    print("\n" + "=" * 50)
    print(f"📊 RESUMO:")
    print(f"  Total de aulas: {total_lessons}")
    print(f"  Aulas existentes: {existing_lessons}")
    print(f"  Aulas faltando: {len(missing_lessons)}")
    print(f"  Progresso: {(existing_lessons/total_lessons)*100:.1f}%")
    
    if missing_lessons:
        print(f"\n❌ Aulas faltando: {missing_lessons}")
    else:
        print(f"\n🎉 TODAS AS AULAS FORAM CRIADAS COM SUCESSO!")

if __name__ == "__main__":
    verify_lessons()












