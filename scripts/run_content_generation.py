#!/usr/bin/env python3
"""
Script principal para executar a geração de conteúdo de alta qualidade
para todas as aulas do curso Web Fundamentals
"""

import os
import sys
import time
from datetime import datetime
from typing import Dict
from generate_web_fundamentals_content import WebFundamentalsContentGenerator
from generate_detailed_content import DetailedContentGenerator

class ContentGenerationRunner:
    def __init__(self):
        self.base_generator = WebFundamentalsContentGenerator()
        self.detailed_generator = DetailedContentGenerator()
        self.results = {
            "total_lessons": 0,
            "generated_lessons": 0,
            "failed_lessons": 0,
            "start_time": None,
            "end_time": None,
            "errors": []
        }

    def print_banner(self):
        """Imprime o banner do script"""
        print("=" * 80)
        print("🎓 GERADOR DE CONTEÚDO WEB FUNDAMENTALS - PADRÃO CS50")
        print("📚 Conteúdo Técnico Específico + Casos Brasileiros + Projetos Práticos")
        print("=" * 80)
        print(f"⏰ Iniciado em: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
        print("=" * 80)

    def generate_all_content(self):
        """Gera conteúdo para todas as aulas"""
        self.results["start_time"] = time.time()
        
        print("🚀 Iniciando geração de conteúdo...")
        
        # Criar estrutura de diretórios
        self.create_directories()
        
        # Gerar conteúdo para cada módulo
        for module in self.base_generator.course_structure["modules"]:
            print(f"\n📚 Processando Módulo {module['id']}: {module['title']}")
            
            for lesson in module["lessons"]:
                self.results["total_lessons"] += 1
                
                try:
                    # Gerar conteúdo detalhado
                    content = self.detailed_generator.generate_enhanced_lesson_content(module, lesson)
                    
                    # Salvar arquivo
                    filename = self.generate_filename(module, lesson)
                    filepath = f"{self.base_generator.base_path}/avancado/{filename}"
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    self.results["generated_lessons"] += 1
                    print(f"  ✅ Aula {lesson['id']:02d}: {lesson['title']}")
                    
                except Exception as e:
                    self.results["failed_lessons"] += 1
                    error_msg = f"Aula {lesson['id']:02d}: {str(e)}"
                    self.results["errors"].append(error_msg)
                    print(f"  ❌ {error_msg}")
        
        self.results["end_time"] = time.time()
        self.print_summary()

    def create_directories(self):
        """Cria a estrutura de diretórios necessária"""
        directories = [
            f"{self.base_generator.base_path}/avancado",
            f"{self.base_generator.base_path}/intermediario", 
            f"{self.base_generator.base_path}/iniciante",
            f"{self.base_generator.base_path}/projetos",
            f"{self.base_generator.base_path}/exercicios"
        ]
        
        for directory in directories:
            os.makedirs(directory, exist_ok=True)
            print(f"📁 Diretório criado: {directory}")

    def generate_filename(self, module: Dict, lesson: Dict) -> str:
        """Gera nome do arquivo baseado no módulo e aula"""
        # Limpar título para nome de arquivo
        clean_title = lesson['title'].lower()
        clean_title = clean_title.replace(':', '').replace(' ', '-')
        clean_title = ''.join(c for c in clean_title if c.isalnum() or c == '-')
        
        return f"aula-{lesson['id']:02d}-modulo-{module['id']:02d}-{clean_title}.md"

    def print_summary(self):
        """Imprime resumo da execução"""
        duration = self.results["end_time"] - self.results["start_time"]
        
        print("\n" + "=" * 80)
        print("📊 RESUMO DA EXECUÇÃO")
        print("=" * 80)
        print(f"⏱️  Duração total: {duration:.2f} segundos")
        print(f"📚 Total de aulas: {self.results['total_lessons']}")
        print(f"✅ Aulas geradas: {self.results['generated_lessons']}")
        print(f"❌ Aulas com erro: {self.results['failed_lessons']}")
        print(f"📈 Taxa de sucesso: {(self.results['generated_lessons']/self.results['total_lessons'])*100:.1f}%")
        
        if self.results['errors']:
            print(f"\n❌ ERROS ENCONTRADOS:")
            for error in self.results['errors'][:5]:  # Mostrar apenas os primeiros 5 erros
                print(f"   • {error}")
            if len(self.results['errors']) > 5:
                print(f"   ... e mais {len(self.results['errors']) - 5} erros")
        
        print("=" * 80)
        print("🎉 Geração de conteúdo concluída!")
        print("=" * 80)

    def generate_sample_lessons(self, count: int = 5):
        """Gera apenas algumas aulas como exemplo"""
        print(f"🧪 Gerando {count} aulas de exemplo...")
        
        self.create_directories()
        
        sample_lessons = []
        for module in self.base_generator.course_structure["modules"][:2]:  # Primeiros 2 módulos
            for lesson in module["lessons"][:3]:  # Primeiras 3 aulas de cada módulo
                sample_lessons.append((module, lesson))
                if len(sample_lessons) >= count:
                    break
            if len(sample_lessons) >= count:
                break
        
        for module, lesson in sample_lessons:
            try:
                content = self.detailed_generator.generate_enhanced_lesson_content(module, lesson)
                filename = self.generate_filename(module, lesson)
                filepath = f"{self.base_generator.base_path}/avancado/{filename}"
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"✅ {filename}")
                
            except Exception as e:
                print(f"❌ Erro em {lesson['title']}: {str(e)}")

def main():
    """Função principal"""
    runner = ContentGenerationRunner()
    runner.print_banner()
    
    # Verificar argumentos da linha de comando
    if len(sys.argv) > 1:
        if sys.argv[1] == "--sample":
            runner.generate_sample_lessons(5)
        elif sys.argv[1] == "--all":
            runner.generate_all_content()
        else:
            print("Uso: python run_content_generation.py [--sample|--all]")
            print("  --sample: Gera apenas 5 aulas de exemplo")
            print("  --all: Gera todas as aulas do curso")
    else:
        # Modo interativo
        print("\nEscolha uma opção:")
        print("1. Gerar 5 aulas de exemplo (--sample)")
        print("2. Gerar todas as aulas (--all)")
        
        choice = input("\nDigite sua escolha (1 ou 2): ").strip()
        
        if choice == "1":
            runner.generate_sample_lessons(5)
        elif choice == "2":
            runner.generate_all_content()
        else:
            print("Opção inválida. Executando modo de exemplo...")
            runner.generate_sample_lessons(5)

if __name__ == "__main__":
    main()
