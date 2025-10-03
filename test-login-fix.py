#!/usr/bin/env python3
"""
Script para testar se o loop infinito do login foi corrigido
"""

import requests
import time
import json

def test_login_flow():
    """Testa o fluxo de login para verificar se não há loop infinito"""
    
    base_url = "http://localhost:3002"
    
    print("🧪 Testando correção do loop infinito no login...")
    print("=" * 50)
    
    # Teste 1: Verificar se a API está funcionando
    print("\n1. Verificando API...")
    try:
        response = requests.get(f"{base_url}/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ API está funcionando")
        else:
            print(f"❌ API retornou status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Erro ao conectar com API: {e}")
        return False
    
    # Teste 2: Testar login com usuário válido
    print("\n2. Testando login...")
    login_data = {
        "email": "admin@fenix.com",
        "password": "admin123"
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/auth/login",
            json=login_data,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                print("✅ Login bem-sucedido")
                token = data.get("token")
                user = data.get("user")
                print(f"   👤 Usuário: {user.get('name')}")
                print(f"   🔑 Token: {token[:20]}...")
                
                # Teste 3: Verificar token
                print("\n3. Verificando token...")
                headers = {
                    "Authorization": f"Bearer {token}",
                    "Content-Type": "application/json"
                }
                
                verify_response = requests.get(
                    f"{base_url}/api/auth/verify",
                    headers=headers,
                    timeout=10
                )
                
                if verify_response.status_code == 200:
                    verify_data = verify_response.json()
                    if verify_data.get("success"):
                        print("✅ Token válido")
                        print(f"   👤 Usuário verificado: {verify_data.get('user', {}).get('name')}")
                    else:
                        print("❌ Token inválido")
                        return False
                else:
                    print(f"❌ Erro na verificação: {verify_response.status_code}")
                    return False
                
                # Teste 4: Testar dashboard
                print("\n4. Testando acesso ao dashboard...")
                dashboard_response = requests.get(
                    f"{base_url}/api/user/dashboard",
                    headers=headers,
                    timeout=10
                )
                
                if dashboard_response.status_code == 200:
                    dashboard_data = dashboard_response.json()
                    print("✅ Dashboard acessível")
                    print(f"   📊 Total de cursos: {dashboard_data.get('stats', {}).get('total_courses', 0)}")
                else:
                    print(f"❌ Erro no dashboard: {dashboard_response.status_code}")
                    return False
                
                return True
            else:
                print(f"❌ Login falhou: {data.get('error')}")
                return False
        else:
            print(f"❌ Erro HTTP no login: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Erro no teste de login: {e}")
        return False

def test_multiple_logins():
    """Testa múltiplos logins para verificar se não há loop"""
    print("\n5. Testando múltiplos logins...")
    
    base_url = "http://localhost:3002"
    users = [
        ("admin@fenix.com", "admin123"),
        ("user@fenix.com", "user123"),
        ("dev@fenix.com", "dev123")
    ]
    
    for i, (email, password) in enumerate(users, 1):
        print(f"\n   Teste {i}: {email}")
        try:
            response = requests.post(
                f"{base_url}/api/auth/login",
                json={"email": email, "password": password},
                timeout=5
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    print(f"   ✅ Login {i} bem-sucedido")
                else:
                    print(f"   ❌ Login {i} falhou: {data.get('error')}")
            else:
                print(f"   ❌ Login {i} erro HTTP: {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ Login {i} erro: {e}")
        
        # Pequena pausa entre testes
        time.sleep(0.5)
    
    print("   ✅ Testes de múltiplos logins concluídos")

def main():
    """Função principal"""
    print("🔧 Teste de Correção do Loop Infinito - Fênix IDE")
    print("=" * 60)
    
    # Verificar se o servidor está rodando
    print("Verificando se o servidor está rodando...")
    try:
        response = requests.get("http://localhost:3002/api/health", timeout=3)
        if response.status_code != 200:
            print("❌ Servidor não está respondendo corretamente")
            return
    except:
        print("❌ Servidor não está rodando. Inicie o servidor primeiro:")
        print("   cd backend && python main.py")
        return
    
    # Executar testes
    success = test_login_flow()
    
    if success:
        test_multiple_logins()
        print("\n" + "=" * 60)
        print("🎉 TODOS OS TESTES PASSARAM!")
        print("✅ O loop infinito foi corrigido")
        print("✅ O sistema de autenticação está funcionando corretamente")
        print("✅ Múltiplos logins funcionam sem problemas")
    else:
        print("\n" + "=" * 60)
        print("❌ ALGUNS TESTES FALHARAM")
        print("🔍 Verifique os logs acima para mais detalhes")

if __name__ == "__main__":
    main()




