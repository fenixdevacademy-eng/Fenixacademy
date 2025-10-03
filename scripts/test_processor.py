#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de teste para o processador de cursos.
"""

import sys
import os
from pathlib import Path

# Adicionar o diretório scripts ao path
sys.path.append(str(Path(__file__).parent))

from process_all_courses import CourseProcessor
from course_analyzer import CourseAnalyzer

def test_course_analyzer():
    """Testa o analisador de cursos."""
    print("="*60)
    print("TESTANDO ANALISADOR DE CURSOS")
    print("="*60)
    
    analyzer = CourseAnalyzer()
    analysis = analyzer.analyze_all_courses()
    analyzer.print_summary()
    
    # Salvar relatório
    analyzer.save_analysis_report("test_analysis_report.json")
    print("\nRelatório salvo em: test_analysis_report.json")
    
    return analysis

def test_course_processor():
    """Testa o processador de cursos."""
    print("\n" + "="*60)
    print("TESTANDO PROCESSADOR DE CURSOS")
    print("="*60)
    
    processor = CourseProcessor()
    
    # Testar descoberta de cursos
    print("Descobrindo cursos...")
    courses = processor.discover_courses()
    
    if not courses:
        print("Nenhum curso encontrado!")
        return False
    
    print(f"Encontrados {len(courses)} cursos:")
    for course_name, course_data in courses.items():
        print(f"  - {course_name}: {course_data['total_modules']} módulos, {course_data['total_lessons']} aulas")
    
    # Processar apenas o primeiro curso para teste
    if courses:
        first_course = list(courses.keys())[0]
        print(f"\nProcessando curso de teste: {first_course}")
        
        # Processar apenas o primeiro módulo do primeiro curso
        course_data = courses[first_course]
        if course_data['modules']:
            first_module = list(course_data['modules'].keys())[0]
            print(f"Processando módulo: {first_module}")
            
            # Processar apenas a primeira aula
            module_data = course_data['modules'][first_module]
            if module_data['lessons']:
                first_lesson = module_data['lessons'][0]
                print(f"Processando aula: {first_lesson.get('title', first_lesson['file_name'])}")
                
                # Testar processamento
                try:
                    processor._process_course(first_course, course_data)
                    print("✅ Processamento concluído com sucesso!")
                    return True
                except Exception as e:
                    print(f"❌ Erro no processamento: {e}")
                    return False
    
    return False

def main():
    """Função principal de teste."""
    print("INICIANDO TESTES DO PROCESSADOR DE CURSOS")
    print("="*60)
    
    # Teste 1: Analisador de cursos
    try:
        analysis = test_course_analyzer()
        print("✅ Teste do analisador: PASSOU")
    except Exception as e:
        print(f"❌ Teste do analisador: FALHOU - {e}")
        return False
    
    # Teste 2: Processador de cursos
    try:
        success = test_course_processor()
        if success:
            print("✅ Teste do processador: PASSOU")
        else:
            print("❌ Teste do processador: FALHOU")
            return False
    except Exception as e:
        print(f"❌ Teste do processador: FALHOU - {e}")
        return False
    
    print("\n" + "="*60)
    print("🎉 TODOS OS TESTES PASSARAM!")
    print("="*60)
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)






















