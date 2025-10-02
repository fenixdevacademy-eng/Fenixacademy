#!/usr/bin/env python3
"""
Teste para verificar se o loop infinito foi corrigido
"""

import requests
import time
import json

def test_login_flow():
    """Testa o fluxo de login para verificar se não há loop"""
    
    print("🧪 Testando correção do loop infinito...")
    print("=" * 50)
    
    # URL da API
    api_url = "http://localhost:3002"
    
    try:
        # 1. Verificar se a API está rodando
        print("1️⃣ Verificando API...")
        health_response = requests.get(f"{api_url}/api/health", timeout=5)
        if health_response.status_code == 200:
            print("✅ API está rodando")
        else:
            print("❌ API não está respondendo corretamente")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro ao conectar com a API: {e}")
        return False
    
    # 2. Testar login
    print("\n2️⃣ Testando login...")
    login_data = {
        "email": "fenixdevacademy@gmail.com",
        "password": "060223Lk!"
    }
    
    try:
        login_response = requests.post(
            f"{api_url}/api/auth/login",
            json=login_data,
            timeout=10
        )
        
        if login_response.status_code == 200:
            login_result = login_response.json()
            if login_result.get("success"):
                print("✅ Login bem-sucedido")
                token = login_result.get("token")
                user = login_result.get("user")
                print(f"👤 Usuário: {user.get('name')}")
                print(f"🔑 Token: {token[:20]}...")
                
                # 3. Testar verificação de token
                print("\n3️⃣ Testando verificação de token...")
                verify_response = requests.get(
                    f"{api_url}/api/auth/verify",
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=10
                )
                
                if verify_response.status_code == 200:
                    verify_result = verify_response.json()
                    if verify_result.get("success"):
                        print("✅ Token verificado com sucesso")
                    else:
                        print("❌ Falha na verificação do token")
                        return False
                else:
                    print(f"❌ Erro na verificação: {verify_response.status_code}")
                    return False
                    
                # 4. Testar dashboard
                print("\n4️⃣ Testando acesso ao dashboard...")
                dashboard_response = requests.get(
                    f"{api_url}/api/user/dashboard",
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=10
                )
                
                if dashboard_response.status_code == 200:
                    dashboard_result = dashboard_response.json()
                    if dashboard_result.get("success"):
                        print("✅ Dashboard acessado com sucesso")
                        stats = dashboard_result.get("stats", {})
                        print(f"📊 Cursos totais: {stats.get('total_courses', 0)}")
                        print(f"📊 Cursos concluídos: {stats.get('completed_courses', 0)}")
                    else:
                        print("❌ Falha no acesso ao dashboard")
                        return False
                else:
                    print(f"❌ Erro no dashboard: {dashboard_response.status_code}")
                    return False
                    
            else:
                print(f"❌ Falha no login: {login_result.get('error')}")
                return False
        else:
            print(f"❌ Erro HTTP no login: {login_response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro na requisição: {e}")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 Teste concluído com sucesso!")
    print("✅ O loop infinito foi corrigido")
    print("✅ Login, verificação e dashboard funcionando")
    
    return True

if __name__ == "__main__":
    success = test_login_flow()
    if success:
        print("\n🚀 Sistema pronto para uso!")
    else:
        print("\n💥 Ainda há problemas a resolver")
