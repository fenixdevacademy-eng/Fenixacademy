#!/usr/bin/env python3
"""
Script para testar o dashboard de ambos os usuários premium
"""

import requests
import json

def test_user_dashboard(email, password, user_name):
    print(f"\n🧪 Testando dashboard do usuário {user_name}...")
    
    # 1. Fazer login
    print(f"1. Fazendo login como {user_name}...")
    login_data = {
        "email": email,
        "password": password
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
                print("2. Testando dashboard...")
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
                        print(f"📊 Estatísticas:")
                        print(f"   Total de cursos: {stats.get('total_courses', 0)}")
                        print(f"   Cursos concluídos: {stats.get('completed_courses', 0)}")
                        print(f"   Cursos em progresso: {stats.get('in_progress_courses', 0)}")
                        print(f"   Total de horas: {stats.get('total_hours', 0)}")
                        print(f"   Certificados: {stats.get('certificates', 0)}")
                        print(f"   Sequência: {stats.get('streak', 0)}")
                        
                        print(f"📚 Cursos disponíveis: {len(courses)}")
                        
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
                            print(f"🎉 SUCESSO! {user_name} tem acesso a TODOS os {len(expected_courses)} cursos da Fênix!")
                            return True
                        else:
                            print(f"⚠️  {user_name} está faltando {len(missing_courses)} cursos:")
                            for course in missing_courses:
                                print(f"   - {course}")
                            return False
                            
                    else:
                        print(f"❌ Erro no dashboard: {dashboard_data.get('message')}")
                        return False
                else:
                    print(f"❌ Erro HTTP no dashboard: {dashboard_response.status_code}")
                    return False
                    
            else:
                print(f"❌ Erro no login: {data.get('message')}")
                return False
        else:
            print(f"❌ Erro HTTP no login: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
        return False

def main():
    print("🚀 Testando usuários premium da Fênix Dev Academy...")
    
    # Lista de usuários para testar
    users = [
        {
            "email": "cezar@fenix.com",
            "password": "cezar123",
            "name": "Cezar Camara Lins"
        },
        {
            "email": "fenixdevacademy@gmail.com",
            "password": "060223Lk!",
            "name": "Fenix Dev Academy"
        }
    ]
    
    results = []
    for user in users:
        success = test_user_dashboard(user["email"], user["password"], user["name"])
        results.append({
            "name": user["name"],
            "email": user["email"],
            "success": success
        })
    
    # Resumo dos resultados
    print("\n" + "="*60)
    print("📋 RESUMO DOS TESTES:")
    print("="*60)
    
    for result in results:
        status = "✅ SUCESSO" if result["success"] else "❌ FALHOU"
        print(f"{status} - {result['name']} ({result['email']})")
    
    successful_users = [r for r in results if r["success"]]
    print(f"\n🎯 Total de usuários com acesso completo: {len(successful_users)}/{len(results)}")
    
    if len(successful_users) == len(results):
        print("🎉 TODOS os usuários premium têm acesso completo aos cursos!")
    else:
        print("⚠️  Alguns usuários não têm acesso completo.")

if __name__ == "__main__":
    main()
    print("\n🎯 Teste concluído!")



