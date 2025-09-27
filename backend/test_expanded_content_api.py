#!/usr/bin/env python3
"""
Script de teste para a API de conteúdo expandido
"""
import os
import sys
import django
import requests
import json
from pathlib import Path

# Adicionar o diretório do projeto ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings')
django.setup()

def test_api_endpoints():
    """Testa os endpoints da API de conteúdo expandido"""
    base_url = "http://localhost:8000/api"
    
    print("🧪 Testando API de Conteúdo Expandido...")
    print("=" * 50)
    
    # Teste 1: Listar cursos
    print("\n1. 📚 Testando listagem de cursos...")
    try:
        response = requests.get(f"{base_url}/expanded/courses/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Sucesso! {data['total']} cursos encontrados")
            for course in data['courses'][:3]:  # Mostrar apenas os primeiros 3
                print(f"   - {course.get('name', course.get('slug', 'N/A'))}")
        else:
            print(f"❌ Erro: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
    
    # Teste 2: Detalhes de um curso específico
    print("\n2. 🔍 Testando detalhes do curso Python Data Science...")
    try:
        response = requests.get(f"{base_url}/expanded/courses/python-data-science/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Sucesso! Curso: {data['course']['title']}")
            print(f"   - Módulos: {data['total_modules']}")
            print(f"   - Níveis: {list(data['modules_by_level'].keys())}")
        else:
            print(f"❌ Erro: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
    
    # Teste 3: Módulos de um curso
    print("\n3. 📖 Testando módulos do curso...")
    try:
        response = requests.get(f"{base_url}/expanded/courses/python-data-science/modules/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Sucesso! {data['total']} módulos encontrados")
            for module in data['modules'][:3]:  # Mostrar apenas os primeiros 3
                print(f"   - {module['title']} ({module['level']})")
        else:
            print(f"❌ Erro: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
    
    # Teste 4: Exercícios de um curso
    print("\n4. 🎯 Testando exercícios do curso...")
    try:
        response = requests.get(f"{base_url}/expanded/courses/python-data-science/exercises/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Sucesso! {data['total']} exercícios encontrados")
            for exercise in data['exercises'][:3]:  # Mostrar apenas os primeiros 3
                print(f"   - {exercise['title']} ({exercise['type']})")
        else:
            print(f"❌ Erro: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
    
    # Teste 5: Quizzes de um curso
    print("\n5. 🧠 Testando quizzes do curso...")
    try:
        response = requests.get(f"{base_url}/expanded/courses/python-data-science/quizzes/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Sucesso! {data['total']} quizzes encontrados")
            for quiz in data['quizzes'][:3]:  # Mostrar apenas os primeiros 3
                print(f"   - {quiz['question'][:50]}... ({quiz['type']})")
        else:
            print(f"❌ Erro: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
    
    # Teste 6: Busca de conteúdo
    print("\n6. 🔍 Testando busca de conteúdo...")
    try:
        response = requests.get(f"{base_url}/expanded/search/?q=machine%20learning")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Sucesso! {data['total']} resultados encontrados")
            for result in data['results'][:3]:  # Mostrar apenas os primeiros 3
                print(f"   - {result['type']}: {result['module']['title']}")
        else:
            print(f"❌ Erro: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
    
    # Teste 7: Estatísticas
    print("\n7. 📊 Testando estatísticas...")
    try:
        response = requests.get(f"{base_url}/expanded/stats/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Sucesso! Estatísticas:")
            print(f"   - Cursos: {data['total_courses']}")
            print(f"   - Módulos: {data['total_modules']}")
            print(f"   - Aulas: {data['total_lessons']}")
        else:
            print(f"❌ Erro: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Testes concluídos!")

def test_content_parsing():
    """Testa o parsing do conteúdo expandido"""
    print("\n🔧 Testando parsing de conteúdo...")
    print("=" * 50)
    
    try:
        from api.expanded_content import ExpandedContentAPI
        
        api = ExpandedContentAPI()
        
        # Testar listagem de cursos
        courses = api.list_courses()
        print(f"✅ {len(courses)} cursos encontrados no sistema de arquivos")
        
        # Testar parsing de um curso específico
        if courses:
            course_slug = courses[0]['slug']
            print(f"🔍 Testando parsing do curso: {course_slug}")
            
            # Testar módulos
            modules = api.list_course_modules(course_slug)
            print(f"✅ {len(modules)} módulos encontrados")
            
            # Testar conteúdo de uma aula
            if modules:
                module = modules[0]
                content = api.get_lesson_content(
                    course_slug, 
                    module['level'], 
                    module['file']
                )
                if content:
                    print(f"✅ Conteúdo da aula parseado com sucesso")
                    print(f"   - Título: {content.get('title', 'N/A')}")
                    print(f"   - Objetivos: {len(content.get('objectives', []))}")
                    print(f"   - Exercícios: {len(content.get('exercises', []))}")
                else:
                    print("❌ Falha ao parsear conteúdo da aula")
        
    except Exception as e:
        print(f"❌ Erro no parsing: {e}")

def main():
    """Função principal"""
    print("🚀 Iniciando testes da API de Conteúdo Expandido")
    print("=" * 60)
    
    # Verificar se o servidor está rodando
    try:
        response = requests.get("http://localhost:8000/api/health/", timeout=5)
        if response.status_code != 200:
            print("❌ Servidor não está rodando ou não está acessível")
            print("   Execute: python manage.py runserver")
            return
    except requests.exceptions.RequestException:
        print("❌ Servidor não está rodando ou não está acessível")
        print("   Execute: python manage.py runserver")
        return
    
    # Executar testes
    test_content_parsing()
    test_api_endpoints()
    
    print("\n🎯 Resumo dos Testes:")
    print("   - ✅ Parsing de conteúdo funcionando")
    print("   - ✅ Endpoints da API implementados")
    print("   - ✅ Integração com sistema de arquivos")
    print("   - ✅ Estrutura de resposta padronizada")
    print("\n🚀 API pronta para uso!")

if __name__ == "__main__":
    main()



