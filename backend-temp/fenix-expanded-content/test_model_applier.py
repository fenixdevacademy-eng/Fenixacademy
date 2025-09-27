#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🧪 TESTE DO APLICADOR DO MODELO WEB FUNDAMENTALS
===============================================

Script para testar o aplicador do modelo em alguns cursos antes da aplicação completa.
"""

import sys
from pathlib import Path
from apply_web_fundamentals_model import FenixCourseModelApplier

def test_single_course():
    """Testa aplicação em um curso específico"""
    print("🧪 TESTE - Aplicação em Curso Específico")
    print("=" * 50)
    
    base_path = Path(__file__).parent
    applier = FenixCourseModelApplier(base_path)
    
    # Testa com React Advanced
    course_name = "react-advanced"
    level = "avancado"
    
    print(f"🎯 Testando: {course_name} - {level}")
    
    try:
        success = applier.apply_model_to_course(course_name, level)
        
        if success:
            print("✅ Teste bem-sucedido!")
            return True
        else:
            print("❌ Teste falhou!")
            return False
            
    except Exception as e:
        print(f"❌ Erro durante o teste: {e}")
        return False

def test_content_generation():
    """Testa geração de conteúdo para diferentes cursos"""
    print("\n🧪 TESTE - Geração de Conteúdo")
    print("=" * 50)
    
    base_path = Path(__file__).parent
    applier = FenixCourseModelApplier(base_path)
    
    test_courses = ["react-advanced", "python-data-science", "aws-cloud"]
    
    for course_name in test_courses:
        print(f"\n📚 Testando geração para: {course_name}")
        
        try:
            content = applier._generate_course_content(course_name, 1, 1, "avancado")
            
            if content and len(content) > 1000:  # Conteúdo deve ter pelo menos 1000 caracteres
                print(f"✅ Conteúdo gerado: {len(content)} caracteres")
                
                # Verifica se contém elementos essenciais
                essential_elements = [
                    "Objetivos de Aprendizado",
                    "INTRODUÇÃO AO TÓPICO",
                    "DESENVOLVIMENTO DOS CONCEITOS",
                    "CASOS BRASILEIROS APLICADOS",
                    "APLICAÇÃO PRÁTICA INTEGRADA"
                ]
                
                missing_elements = []
                for element in essential_elements:
                    if element not in content:
                        missing_elements.append(element)
                
                if missing_elements:
                    print(f"⚠️  Elementos faltando: {missing_elements}")
                else:
                    print("✅ Todos os elementos essenciais presentes")
                    
            else:
                print("❌ Conteúdo muito curto ou vazio")
                return False
                
        except Exception as e:
            print(f"❌ Erro na geração: {e}")
            return False
    
    return True

def test_code_examples():
    """Testa geração de exemplos de código"""
    print("\n🧪 TESTE - Exemplos de Código")
    print("=" * 50)
    
    base_path = Path(__file__).parent
    applier = FenixCourseModelApplier(base_path)
    
    test_configs = [
        {"language": "javascript", "name": "React Advanced", "concept": "Hooks Avançados"},
        {"language": "python", "name": "Python Data Science", "concept": "Análise de Dados"},
        {"language": "dart", "name": "Flutter Mobile", "concept": "Widgets"},
        {"language": "yaml", "name": "AWS Cloud", "concept": "Arquitetura Cloud"}
    ]
    
    for config in test_configs:
        print(f"\n💻 Testando código {config['language']} para {config['name']}")
        
        try:
            code = applier._generate_code_example(
                config["language"], 
                config["name"], 
                config["concept"]
            )
            
            if code and "```" in code and config["concept"] in code:
                print(f"✅ Código gerado: {len(code)} caracteres")
            else:
                print("❌ Código inválido ou incompleto")
                return False
                
        except Exception as e:
            print(f"❌ Erro na geração de código: {e}")
            return False
    
    return True

def main():
    """Executa todos os testes"""
    print("🚀 FENIX ACADEMY - TESTE DO APLICADOR DE MODELO")
    print("=" * 60)
    
    tests = [
        ("Geração de Conteúdo", test_content_generation),
        ("Exemplos de Código", test_code_examples),
        ("Aplicação em Curso", test_single_course)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n🧪 Executando: {test_name}")
        try:
            success = test_func()
            results.append((test_name, success))
        except Exception as e:
            print(f"❌ Erro no teste {test_name}: {e}")
            results.append((test_name, False))
    
    # Relatório final
    print("\n" + "=" * 60)
    print("📊 RELATÓRIO DE TESTES")
    print("=" * 60)
    
    passed = 0
    for test_name, success in results:
        status = "✅ PASSOU" if success else "❌ FALHOU"
        print(f"{test_name}: {status}")
        if success:
            passed += 1
    
    print(f"\n🎯 Resultado: {passed}/{len(results)} testes passaram")
    
    if passed == len(results):
        print("🎉 Todos os testes passaram! O script está pronto para uso.")
        return 0
    else:
        print("⚠️  Alguns testes falharam. Revise o código antes de usar.")
        return 1

if __name__ == "__main__":
    exit(main())
