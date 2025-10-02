import urllib.request
import json

def test_dashboard_api():
    try:
        # Primeiro fazer login para obter token
        print("1. Fazendo login...")
        login_data = {
            "email": "admin@fenix.com",
            "password": "admin123"
        }
        
        data = json.dumps(login_data).encode('utf-8')
        req = urllib.request.Request(
            'http://localhost:3002/api/auth/login',
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        
        response = urllib.request.urlopen(req)
        login_result = json.loads(response.read().decode())
        
        if not login_result.get('success'):
            print("❌ Login falhou!")
            return
            
        token = login_result.get('token')
        print(f"✅ Login bem-sucedido! Token: {token[:50]}...")
        
        # Testar endpoint de perfil
        print("\n2. Testando endpoint de perfil...")
        profile_req = urllib.request.Request(
            'http://localhost:3002/api/user/profile',
            headers={
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            }
        )
        
        profile_response = urllib.request.urlopen(profile_req)
        profile_result = json.loads(profile_response.read().decode())
        
        if profile_result.get('success'):
            print("✅ Perfil carregado com sucesso!")
            print(f"   Nome: {profile_result['data']['name']}")
            print(f"   Email: {profile_result['data']['email']}")
            print(f"   Role: {profile_result['data']['role']}")
        else:
            print("❌ Erro ao carregar perfil!")
        
        # Testar endpoint de dashboard
        print("\n3. Testando endpoint de dashboard...")
        dashboard_req = urllib.request.Request(
            'http://localhost:3002/api/user/dashboard',
            headers={
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            }
        )
        
        dashboard_response = urllib.request.urlopen(dashboard_req)
        dashboard_result = json.loads(dashboard_response.read().decode())
        
        if dashboard_result.get('success'):
            print("✅ Dashboard carregado com sucesso!")
            stats = dashboard_result['data']['stats']
            print(f"   Total de cursos: {stats['total_courses']}")
            print(f"   Cursos concluídos: {stats['completed_courses']}")
            print(f"   Cursos em progresso: {stats['in_progress_courses']}")
            print(f"   Total de horas: {stats['total_hours']}")
            print(f"   Certificados: {stats['certificates']}")
            print(f"   Sequência: {stats['streak']}")
        else:
            print("❌ Erro ao carregar dashboard!")
            
    except Exception as e:
        print(f"❌ Erro: {e}")

if __name__ == "__main__":
    test_dashboard_api()




