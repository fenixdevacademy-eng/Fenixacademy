#!/usr/bin/env python3
"""
Script de Teste Completo para Todas as APIs da Fenix Academy
Testa todas as funcionalidades implementadas
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any

APIS = {
    "code_execution": {
        "base_url": "http://localhost:8001",
        "name": "🚀 API de Execução de Código",
        "port": 8001
    },
    "authentication": {
        "base_url": "http://localhost:8002",
        "name": "🔐 API de Autenticação",
        "port": 8002
    },
    "recommendations": {
        "base_url": "http://localhost:8003",
        "name": "🤖 API de Recomendações",
        "port": 8003
    },
    "payments": {
        "base_url": "http://localhost:8004",
        "name": "💳 API de Pagamentos",
        "port": 8004
    },
    "notifications": {
        "base_url": "http://localhost:8005",
        "name": "🔔 API de Notificações",
        "port": 8005
    },
    "certificates": {
        "base_url": "http://localhost:8006",
        "name": "🏆 API de Certificados",
        "port": 8006
    }
}

class FenixAcademyCompleteTester:
    def __init__(self):
        self.test_results = {}
        self.auth_token = None
        self.user_id = None
        
    def print_header(self, title: str):
        """Imprime cabeçalho formatado"""
        print("\n" + "=" * 60)
        print(f"🧪 {title}")
        print("=" * 60)
    
    def print_result(self, test_name: str, success: bool, details: str = ""):
        """Imprime resultado do teste"""
        status = "✅ PASSOU" if success else "❌ FALHOU"
        print(f"{status} | {test_name}")
        if details:
            print(f"   📝 {details}")
    
    def test_api_health(self, api_name: str, base_url: str) -> bool:
        """Testa saúde da API"""
        try:
            response = requests.get(f"{base_url}/health", timeout=5)
            if response.status_code == 200:
                data = response.json()
                print(f"   🟢 {api_name}: {data.get('status', 'unknown')}")
                return True
            else:
                print(f"   🔴 {api_name}: Status {response.status_code}")
                return False
        except Exception as e:
            print(f"   🔴 {api_name}: Erro de conexão - {e}")
            return False
    
    def test_code_execution_api(self) -> Dict[str, bool]:
        """Testa API de execução de código"""
        results = {}
        base_url = APIS["code_execution"]["base_url"]
        
        # Teste de saúde
        results["health"] = self.test_api_health("Execução de Código", base_url)
        
        # Teste de linguagens suportadas
        try:
            response = requests.get(f"{base_url}/languages")
            if response.status_code == 200:
                languages = response.json()
                results["languages"] = len(languages) > 0
                print(f"   📊 Linguagens suportadas: {len(languages)}")
            else:
                results["languages"] = False
        except Exception as e:
            results["languages"] = False
            print(f"   ❌ Erro ao obter linguagens: {e}")
        
        # Teste de execução de código Python
        try:
            test_code = {
                "code": "print('Hello, Fenix Academy!')\nprint(2 + 2)",
                "language": "python",
                "input_data": "",
                "timeout": 10,
                "memory_limit": 128
            }
            
            response = requests.post(f"{base_url}/execute", json=test_code)
            if response.status_code == 200:
                result = response.json()
                results["python_execution"] = result.get("success", False)
                print(f"   🐍 Execução Python: {'✅' if result.get('success') else '❌'}")
            else:
                results["python_execution"] = False
        except Exception as e:
            results["python_execution"] = False
            print(f"   ❌ Erro na execução Python: {e}")
        
        return results
    
    def test_authentication_api(self) -> Dict[str, bool]:
        """Testa API de autenticação"""
        results = {}
        base_url = APIS["authentication"]["base_url"]
        
        # Teste de saúde
        results["health"] = self.test_api_health("Autenticação", base_url)
        
        # Teste de registro de usuário
        try:
            test_user = {
                "username": f"testuser_{int(time.time())}",
                "email": f"test{int(time.time())}@fenix.academy",
                "password": "TestPassword123!",
                "full_name": "Usuário de Teste",
                "role": "student"
            }
            
            response = requests.post(f"{base_url}/auth/register", json=test_user)
            if response.status_code == 200:
                user_data = response.json()
                self.user_id = user_data.get("id")
                results["user_registration"] = True
                print(f"   👤 Usuário registrado: {self.user_id}")
            else:
                results["user_registration"] = False
                print(f"   ❌ Falha no registro: {response.status_code}")
        except Exception as e:
            results["user_registration"] = False
            print(f"   ❌ Erro no registro: {e}")
        
        # Teste de login
        if self.user_id:
            try:
                login_data = {
                    "username": test_user["username"],
                    "password": test_user["password"]
                }
                
                response = requests.post(f"{base_url}/auth/login", json=login_data)
                if response.status_code == 200:
                    token_data = response.json()
                    self.auth_token = token_data.get("access_token")
                    results["user_login"] = True
                    print(f"   🔑 Login realizado com sucesso")
                else:
                    results["user_login"] = False
                    print(f"   ❌ Falha no login: {response.status_code}")
            except Exception as e:
                results["user_login"] = False
                print(f"   ❌ Erro no login: {e}")
        
        return results
    
    def test_recommendations_api(self) -> Dict[str, bool]:
        """Testa API de recomendações"""
        results = {}
        base_url = APIS["recommendations"]["base_url"]
        
        # Teste de saúde
        results["health"] = self.test_api_health("Recomendações", base_url)
        
        # Teste de criação de perfil de usuário
        try:
            user_profile = {
                "user_id": self.user_id or "test_user",
                "interests": ["programming", "web_development", "python"],
                "skill_level": "intermediate",
                "learning_goals": ["full_stack", "machine_learning"]
            }
            
            response = requests.post(f"{base_url}/users", json=user_profile)
            results["user_profile_creation"] = response.status_code == 200
            print(f"   👤 Perfil de usuário criado: {'✅' if response.status_code == 200 else '❌'}")
        except Exception as e:
            results["user_profile_creation"] = False
            print(f"   ❌ Erro ao criar perfil: {e}")
        
        # Teste de geração de recomendações
        try:
            recommendation_request = {
                "user_id": self.user_id or "test_user",
                "n_recommendations": 5,
                "filters": {"category": "programming"}
            }
            
            response = requests.post(f"{base_url}/recommendations", json=recommendation_request)
            if response.status_code == 200:
                recommendations = response.json()
                results["recommendation_generation"] = len(recommendations.get("recommendations", [])) > 0
                print(f"   🎯 Recomendações geradas: {len(recommendations.get('recommendations', []))}")
            else:
                results["recommendation_generation"] = False
        except Exception as e:
            results["recommendation_generation"] = False
            print(f"   ❌ Erro ao gerar recomendações: {e}")
        
        return results
    
    def test_payments_api(self) -> Dict[str, bool]:
        """Testa API de pagamentos"""
        results = {}
        base_url = APIS["payments"]["base_url"]
        
        # Teste de saúde
        results["health"] = self.test_api_health("Pagamentos", base_url)
        
        # Teste de listagem de planos
        try:
            response = requests.get(f"{base_url}/plans")
            if response.status_code == 200:
                plans = response.json()
                results["plans_listing"] = len(plans.get("plans", [])) > 0
                print(f"   💰 Planos disponíveis: {len(plans.get('plans', []))}")
            else:
                results["plans_listing"] = False
        except Exception as e:
            results["plans_listing"] = False
            print(f"   ❌ Erro ao listar planos: {e}")
        
        # Teste de criação de assinatura
        try:
            subscription_data = {
                "user_id": self.user_id or "test_user",
                "plan_type": "basic",
                "billing_cycle": "monthly",
                "payment_method_id": "pm_test_123",
                "trial_days": 7
            }
            
            response = requests.post(f"{base_url}/subscriptions", json=subscription_data)
            results["subscription_creation"] = response.status_code == 200
            print(f"   📅 Assinatura criada: {'✅' if response.status_code == 200 else '❌'}")
        except Exception as e:
            results["subscription_creation"] = False
            print(f"   ❌ Erro ao criar assinatura: {e}")
        
        return results
    
    def test_notifications_api(self) -> Dict[str, bool]:
        """Testa API de notificações"""
        results = {}
        base_url = APIS["notifications"]["base_url"]
        
        # Teste de saúde
        results["health"] = self.test_api_health("Notificações", base_url)
        
        # Teste de criação de notificação
        try:
            notification_data = {
                "user_id": self.user_id or "test_user",
                "title": "Teste de Notificação",
                "message": "Esta é uma notificação de teste da Fenix Academy",
                "notification_type": "system",
                "priority": "normal"
            }
            
            response = requests.post(f"{base_url}/notifications", json=notification_data)
            results["notification_creation"] = response.status_code == 200
            print(f"   🔔 Notificação criada: {'✅' if response.status_code == 200 else '❌'}")
        except Exception as e:
            results["notification_creation"] = False
            print(f"   ❌ Erro ao criar notificação: {e}")
        
        # Teste de templates de email
        try:
            response = requests.get(f"{base_url}/email/templates")
            if response.status_code == 200:
                templates = response.json()
                results["email_templates"] = len(templates.get("templates", [])) > 0
                print(f"   📧 Templates de email: {len(templates.get('templates', []))}")
            else:
                results["email_templates"] = False
        except Exception as e:
            results["email_templates"] = False
            print(f"   ❌ Erro ao obter templates: {e}")
        
        return results
    
    def test_certificates_api(self) -> Dict[str, bool]:
        """Testa API de certificados"""
        results = {}
        base_url = APIS["certificates"]["base_url"]
        
        # Teste de saúde
        results["health"] = self.test_api_health("Certificados", base_url)
        
        # Teste de criação de certificado
        try:
            certificate_data = {
                "user_id": self.user_id or "test_user",
                "course_id": "web_development",
                "certificate_type": "course_completion",
                "completion_date": datetime.utcnow().isoformat(),
                "score": 95.5,
                "grade": "A",
                "skills_verified": ["HTML", "CSS", "JavaScript"]
            }
            
            response = requests.post(f"{base_url}/certificates", json=certificate_data)
            if response.status_code == 200:
                cert_data = response.json()
                results["certificate_creation"] = True
                verification_code = cert_data.get("verification_code")
                print(f"   🏆 Certificado criado com código: {verification_code}")
                
                # Teste de verificação
                if verification_code:
                    verify_response = requests.get(f"{base_url}/verification/{verification_code}")
                    results["certificate_verification"] = verify_response.status_code == 200
                    print(f"   🔍 Verificação do certificado: {'✅' if verify_response.status_code == 200 else '❌'}")
            else:
                results["certificate_creation"] = False
                print(f"   ❌ Falha na criação do certificado: {response.status_code}")
        except Exception as e:
            results["certificate_creation"] = False
            print(f"   ❌ Erro ao criar certificado: {e}")
        
        # Teste de templates
        try:
            response = requests.get(f"{base_url}/templates")
            if response.status_code == 200:
                templates = response.json()
                results["templates_listing"] = len(templates.get("templates", [])) > 0
                print(f"   📋 Templates disponíveis: {len(templates.get('templates', []))}")
            else:
                results["templates_listing"] = False
        except Exception as e:
            results["templates_listing"] = False
            print(f"   ❌ Erro ao listar templates: {e}")
        
        return results
    
    def run_all_tests(self) -> Dict[str, Dict[str, bool]]:
        """Executa todos os testes"""
        print("🚀 INICIANDO TESTES COMPLETOS DA FENIX ACADEMY")
        print("=" * 60)
        print(f"⏰ Início: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        # Testar cada API
        self.test_results["code_execution"] = self.test_code_execution_api()
        self.test_results["authentication"] = self.test_authentication_api()
        self.test_results["recommendations"] = self.test_recommendations_api()
        self.test_results["payments"] = self.test_payments_api()
        self.test_results["notifications"] = self.test_notifications_api()
        self.test_results["certificates"] = self.test_certificates_api()
        
        return self.test_results
    
    def print_summary(self):
        """Imprime resumo dos testes"""
        self.print_header("RESUMO DOS TESTES")
        
        total_apis = len(self.test_results)
        total_tests = 0
        passed_tests = 0
        
        for api_name, results in self.test_results.items():
            api_info = APIS.get(api_name, {})
            print(f"\n📊 {api_info.get('name', api_name)}:")
            
            api_tests = len(results)
            api_passed = sum(1 for result in results.values() if result)
            total_tests += api_tests
            passed_tests += api_passed
            
            print(f"   Testes: {api_passed}/{api_tests} ✅")
            
            for test_name, result in results.items():
                status = "✅" if result else "❌"
                print(f"     {status} {test_name}")
        
        print(f"\n🎯 RESULTADO FINAL:")
        print(f"   APIs testadas: {total_apis}")
        print(f"   Total de testes: {total_tests}")
        print(f"   Testes aprovados: {passed_tests}")
        print(f"   Taxa de sucesso: {(passed_tests/total_tests)*100:.1f}%")
        
        if passed_tests == total_tests:
            print("\n🎉 TODOS OS TESTES PASSARAM! Sistema funcionando perfeitamente!")
        elif passed_tests >= total_tests * 0.8:
            print("\n⚠️  MAIORIA DOS TESTES PASSOU. Verificar falhas específicas.")
        else:
            print("\n❌ MUITOS TESTES FALHARAM. Verificar configuração do sistema.")
        
        print(f"\n⏰ Fim: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

def main():
    """Função principal"""
    print("🧪 Teste Completo do Sistema Fenix Academy")
    print("=" * 60)
    
    # Verificar se todas as APIs estão rodando
    print("🔍 Verificando disponibilidade das APIs...")
    
    available_apis = []
    for api_name, api_config in APIS.items():
        try:
            response = requests.get(f"{api_config['base_url']}/health", timeout=3)
            if response.status_code == 200:
                available_apis.append(api_name)
                print(f"   ✅ {api_config['name']} - Porta {api_config['port']}")
            else:
                print(f"   ❌ {api_config['name']} - Porta {api_config['port']} (Status: {response.status_code})")
        except Exception as e:
            print(f"   ❌ {api_config['name']} - Porta {api_config['port']} (Erro: {e})")
    
    if not available_apis:
        print("\n❌ Nenhuma API está disponível!")
        print("💡 Execute o script 'start_apis.py' primeiro")
        sys.exit(1)
    
    print(f"\n🚀 {len(available_apis)} APIs disponíveis. Iniciando testes...")
    
    # Executar testes
    tester = FenixAcademyCompleteTester()
    tester.run_all_tests()
    tester.print_summary()

if __name__ == "__main__":
    main()
