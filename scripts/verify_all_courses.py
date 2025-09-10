#!/usr/bin/env python3
"""
Script para verificar o status de todos os cursos da Fenix e suas aulas
"""

import os
from pathlib import Path

def verify_all_courses():
    """Verifica o status de todos os cursos"""
    base_path = Path("backend/fenix-expanded-content")
    
    print("🔍 VERIFICANDO STATUS DE TODOS OS CURSOS FENIX")
    print("=" * 60)
    
    if not base_path.exists():
        print(f"❌ Diretório base não encontrado: {base_path}")
        return
    
    # Cursos da Fenix
    courses = {
        "web-fundamentals": {"name": "Web Fundamentals", "expected": 72},
        "react-advanced": {"name": "React Avançado", "expected": 60},
        "nodejs-apis": {"name": "Node.js e APIs", "expected": 60},
        "frontend-development": {"name": "Frontend Development", "expected": 48},
        "backend-development": {"name": "Backend Development", "expected": 60},
        "fullstack-development": {"name": "Fullstack Development", "expected": 72},
        "mobile-development": {"name": "Mobile Development", "expected": 48},
        "devops-engineering": {"name": "DevOps Engineering", "expected": 60},
        "data-science": {"name": "Data Science", "expected": 48},
        "cybersecurity": {"name": "Cybersecurity", "expected": 36}
    }
    
    total_expected = sum(course["expected"] for course in courses.values())
    total_existing = 0
    total_missing = 0
    
    print(f"📊 Total esperado: {total_expected} aulas")
    print()
    
    for course_key, course in courses.items():
        course_path = base_path / course_key / "avancado"
        
        if not course_path.exists():
            print(f"❌ {course['name']}: Diretório não encontrado")
            total_missing += course["expected"]
            continue
        
        # Contar aulas existentes
        existing_lessons = 0
        missing_modules = []
        
        for module_num in range(1, 13):  # Máximo 12 módulos
            module_path = course_path / f"modulo-{module_num:02d}"
            
            if module_path.exists():
                # Contar arquivos de aula no módulo
                lesson_files = list(module_path.glob("aula-*.md"))
                existing_lessons += len(lesson_files)
            else:
                missing_modules.append(module_num)
        
        # Verificar se atingiu o número esperado
        if existing_lessons >= course["expected"]:
            status = "✅"
            print(f"{status} {course['name']}: {existing_lessons}/{course['expected']} aulas")
        else:
            status = "⚠️"
            missing = course["expected"] - existing_lessons
            print(f"{status} {course['name']}: {existing_lessons}/{course['expected']} aulas (Faltando: {missing})")
            total_missing += missing
        
        total_existing += existing_lessons
        
        # Mostrar módulos faltando se houver
        if missing_modules:
            print(f"    📝 Módulos faltando: {missing_modules}")
    
    print("\n" + "=" * 60)
    print(f"📊 RESUMO GERAL:")
    print(f"  Total esperado: {total_expected} aulas")
    print(f"  Aulas existentes: {total_existing}")
    print(f"  Aulas faltando: {total_missing}")
    print(f"  Progresso: {(total_existing/total_expected)*100:.1f}%")
    
    if total_missing == 0:
        print(f"\n🎉 TODOS OS CURSOS FORAM COMPLETADOS COM SUCESSO!")
    else:
        print(f"\n⚠️  {total_missing} aulas ainda precisam ser criadas.")
    
    # Mostrar estatísticas por curso
    print(f"\n📚 ESTATÍSTICAS POR CURSO:")
    for course_key, course in courses.items():
        course_path = base_path / course_key / "avancado"
        
        if course_path.exists():
            existing_lessons = 0
            for module_num in range(1, 13):
                module_path = course_path / f"modulo-{module_num:02d}"
                if module_path.exists():
                    lesson_files = list(module_path.glob("aula-*.md"))
                    existing_lessons += len(lesson_files)
            
            progress = (existing_lessons / course["expected"]) * 100
            status = "✅" if progress == 100 else "🔄"
            print(f"  {status} {course['name']}: {progress:.1f}% ({existing_lessons}/{course['expected']})")

if __name__ == "__main__":
    verify_all_courses()












