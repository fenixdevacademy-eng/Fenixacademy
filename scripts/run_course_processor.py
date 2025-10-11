#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script principal para executar o processamento de todos os cursos.
"""

import sys
import argparse
from pathlib import Path

# Adicionar o diretório scripts ao path
sys.path.append(str(Path(__file__).parent))

from process_all_courses import CourseProcessor
from course_analyzer import CourseAnalyzer

def main():
    """Função principal."""
    parser = argparse.ArgumentParser(description='Processador de Cursos Fenix Academy')
    parser.add_argument('--base-path', default='backend/fenix-expanded-content',
                       help='Caminho base dos cursos (padrão: backend/fenix-expanded-content)')
    parser.add_argument('--output-path', default='processed_courses',
                       help='Caminho de saída (padrão: processed_courses)')
    parser.add_argument('--analyze-only', action='store_true',
                       help='Apenas analisar cursos sem processar')
    parser.add_argument('--test', action='store_true',
                       help='Executar em modo de teste')
    
    args = parser.parse_args()
    
    print("🚀 FENIX ACADEMY - PROCESSADOR DE CURSOS")
    print("="*60)
    print(f"Caminho base: {args.base_path}")
    print(f"Caminho de saída: {args.output_path}")
    print(f"Modo de teste: {'Sim' if args.test else 'Não'}")
    print("="*60)
    
    try:
        if args.analyze_only:
            # Apenas análise
            print("\n📊 EXECUTANDO ANÁLISE DE CURSOS...")
            analyzer = CourseAnalyzer(args.base_path)
            analysis = analyzer.analyze_all_courses()
            analyzer.print_summary()
            analyzer.save_analysis_report("course_analysis_report.json")
            print("\n✅ Análise concluída!")
            
        elif args.test:
            # Modo de teste
            print("\n🧪 EXECUTANDO TESTES...")
            from test_processor import main as test_main
            success = test_main()
            if not success:
                print("\n❌ Testes falharam!")
                return 1
            print("\n✅ Todos os testes passaram!")
            
        else:
            # Processamento completo
            print("\n⚙️ EXECUTANDO PROCESSAMENTO COMPLETO...")
            processor = CourseProcessor(args.base_path)
            processor.output_path = Path(args.output_path)
            processor.output_path.mkdir(exist_ok=True)
            
            processor.process_all_courses()
            print("\n✅ Processamento concluído!")
            
            # Mostrar estatísticas finais
            print("\n📈 ESTATÍSTICAS FINAIS:")
            print(f"  - Cursos processados: {len(processor.courses_data)}")
            total_modules = sum(course['total_modules'] for course in processor.courses_data.values())
            total_lessons = sum(course['total_lessons'] for course in processor.courses_data.values())
            print(f"  - Módulos processados: {total_modules}")
            print(f"  - Aulas processadas: {total_lessons}")
            print(f"  - Arquivos gerados em: {processor.output_path}")
        
        return 0
        
    except Exception as e:
        print(f"\n❌ ERRO: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(main())


































