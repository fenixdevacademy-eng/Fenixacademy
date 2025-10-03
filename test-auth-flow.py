#!/usr/bin/env python3
"""
Script para testar o fluxo de autenticação e verificar se há dados mockados
"""

import requests
import json

def test_auth_flow():
    print("🧪 Testando fluxo de autenticação...")
    
    # 1. Testar login
    print("\n1. Testando login...")
    login_data = {
        "email": "admin@fenix.com",
        "password": "admin123"
    }
    
    try:
        response = requests.post('http://localhost:3002/api/auth/login', json=login_data)
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                token = data.get('token')
                user = data.get('user')
                print(f"✅ Login bem-sucedido!")
                print(f"   Token: {token[:50]}...")
                print(f"   Usuário: {user.get('name')} ({user.get('email')})")
                print(f"   Role: {user.get('access_level')}")
                
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
                        stats = dashboard_data.get('data', {}).get('stats', {})
                        print(f"✅ Dashboard carregado com sucesso!")
                        print(f"   Total de cursos: {stats.get('total_courses', 0)}")
                        print(f"   Cursos concluídos: {stats.get('completed_courses', 0)}")
                        print(f"   Cursos em progresso: {stats.get('in_progress_courses', 0)}")
                        print(f"   Total de horas: {stats.get('total_hours', 0)}")
                        print(f"   Certificados: {stats.get('certificates', 0)}")
                        print(f"   Sequência: {stats.get('streak', 0)}")
                        
                        # Verificar se os dados são específicos do usuário
                        if stats.get('total_courses', 0) > 0:
                            print("✅ Dados reais da API sendo retornados")
                        else:
                            print("⚠️  Dados podem estar vazios ou mockados")
                            
                        # Verificar atividades recentes
                        activities = dashboard_data.get('data', {}).get('recent_activity', [])
                        print(f"   Atividades recentes: {len(activities)}")
                        
                        # Verificar cursos
                        courses = dashboard_data.get('data', {}).get('courses', [])
                        print(f"   Cursos: {len(courses)}")
                        
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

def test_without_auth():
    print("\n3. Testando acesso sem autenticação...")
    
    try:
        # Tentar acessar dashboard sem token
        response = requests.get('http://localhost:3002/api/user/dashboard')
        if response.status_code == 401:
            print("✅ API corretamente rejeita acesso sem autenticação")
        else:
            print(f"⚠️  API retornou status {response.status_code} sem autenticação")
            
    except Exception as e:
        print(f"❌ Erro na requisição sem auth: {e}")

if __name__ == "__main__":
    test_auth_flow()
    test_without_auth()
    print("\n🎯 Teste concluído!")





