#!/usr/bin/env python3
"""
Script para testar o dashboard do usuário Fenix Dev Academy
"""

import requests
import json

def test_fenix_dashboard():
    print("🧪 Testando dashboard do usuário Fenix Dev Academy...")
    
    # 1. Fazer login como Fenix Dev Academy
    print("\n1. Fazendo login como Fenix Dev Academy...")
    login_data = {
        "email": "fenixdevacademy@gmail.com",
        "password": "060223Lk!"
    }
    
    try:
        response = requests.post('http://localhost:3002/api/auth/login', json=login_data)
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                token = data.get('token')
                user = data.get('user')
                print(f"✅ Login bem-sucedido!")
                print(f"   Usuário: {user.get('name')} ({user.get('email')})")
                print(f"   Role: {user.get('role')}")
                
                # 2. Testar dashboard
                print("\n2. Testando dashboard...")
                headers = {
                    'Authorization': f'Bearer {token}',
                    'Content-Type': 'application/json'
                }
                
                dashboard_response = requests.get('http://localhost:3002/api/user/dashboard', headers=headers)
                if dashboard_response.status_code == 200:
                    dashboard_data = dashboard_response.json()
                    if dashboard_data.get('success'):
                        data = dashboard_data.get('data', {})
                        stats = data.get('stats', {})
                        courses = data.get('courses', [])
                        
                        print(f"✅ Dashboard carregado com sucesso!")
                        print(f"\n📊 Estatísticas:")
                        print(f"   Total de cursos: {stats.get('total_courses', 0)}")
                        print(f"   Cursos concluídos: {stats.get('completed_courses', 0)}")
                        print(f"   Cursos em progresso: {stats.get('in_progress_courses', 0)}")
                        print(f"   Total de horas: {stats.get('total_hours', 0)}")
                        print(f"   Certificados: {stats.get('certificates', 0)}")
                        print(f"   Sequência: {stats.get('streak', 0)}")
                        
                        print(f"\n📚 Cursos disponíveis ({len(courses)}):")
                        for i, course in enumerate(courses, 1):
                            status = "✅ Concluído" if course.get('progress', 0) == 100 else f"🔄 {course.get('progress', 0)}%" if course.get('progress', 0) > 0 else "⏳ Não iniciado"
                            print(f"   {i:2d}. {course.get('title', 'N/A')} - {status} ({course.get('duration', 'N/A')})")
                        
                        # Verificar se tem todos os cursos da Fênix
                        expected_courses = [
                            "Fundamentos de Programação", "HTML e CSS Básico", "JavaScript Fundamentos",
                            "JavaScript ES6+", "React Fundamentos", "React Avançado", "Node.js Fundamentos",
                            "Node.js Backend Avançado", "Python Fundamentos", "Python Avançado",
                            "Django Fundamentos", "Flask Avançado", "SQL Fundamentos", "PostgreSQL Avançado",
                            "MongoDB Fundamentos", "Git e GitHub", "Docker Fundamentos", "Kubernetes Avançado",
                            "AWS Fundamentos", "Azure Avançado", "Data Science com Python", "Machine Learning",
                            "Cybersecurity Fundamentos", "React Native", "Flutter Avançado"
                        ]
                        
                        course_titles = [course.get('title', '') for course in courses]
                        missing_courses = [title for title in expected_courses if title not in course_titles]
                        
                        if not missing_courses:
                            print(f"\n🎉 SUCESSO! Fenix Dev Academy tem acesso a TODOS os {len(expected_courses)} cursos da Fênix!")
                        else:
                            print(f"\n⚠️  Fenix Dev Academy está faltando {len(missing_courses)} cursos:")
                            for course in missing_courses:
                                print(f"   - {course}")
                            
                    else:
                        print(f"❌ Erro no dashboard: {dashboard_data.get('message')}")
                else:
                    print(f"❌ Erro HTTP no dashboard: {dashboard_response.status_code}")
                    
            else:
                print(f"❌ Erro no login: {data.get('message')}")
        else:
            print(f"❌ Erro HTTP no login: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")

if __name__ == "__main__":
    test_fenix_dashboard()
    print("\n🎯 Teste concluído!")




