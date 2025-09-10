#!/usr/bin/env python3
"""
Script de Teste para Todas as Funcionalidades da Fenix Academy
Verifica APIs de Execução de Código, Autenticação e Recomendações
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any

# Configurações das APIs
APIS = {
    "code_execution": {
        "base_url": "http://localhost:8001",
        "name": "🚀 API de Execução de Código"
    },
    "authentication": {
        "base_url": "http://localhost:8002",
        "name": "🔐 API de Autenticação"
    },
    "recommendations": {
        "base_url": "http://localhost:8003",
        "name": "🤖 API de Recomendações"
    }
}

# Dados de teste
TEST_DATA = {
    "users": [
        {
            "email": "test_student@fenix.academy",
            "username": "test_student",
            "full_name": "Estudante Teste",
            "password": "test123456",
            "confirm_password": "test123456",
            "role": "student"
        },
        {
            "email": "test_instructor@fenix.academy",
            "username": "test_instructor",
            "full_name": "Instrutor Teste",
            "password": "test123456",
            "confirm_password": "test123456",
            "role": "instructor"
        }
    ],
    "code_samples": {
        "python": 'print("Hello, Fenix Academy!")',
        "javascript": 'console.log("Hello, Fenix Academy!");',
        "html": '<!DOCTYPE html><html><body><h1>Hello, Fenix Academy!</h1></body></html>'
    },
    "content_items": [
        {
            "item_id": "test_course_1",
            "title": "Python para Iniciantes",
            "category": "beginner",
            "difficulty": "beginner",
            "tags": ["python", "programming", "beginner"],
            "description": "Curso introdutório de Python",
            "content_type": "video",
            "duration": 60,
            "prerequisites": [],
            "popularity_score": 85.0,
            "rating": 4.5,
            "view_count": 100
        }
    ]
}

class FenixAcademyTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = {}
        self.auth_tokens = {}
        
    def print_header(self, title: str):
        """Exibe cabeçalho de teste"""
        print("\n" + "=" * 60)
        print(f"🧪 TESTANDO: {title}")
        print("=" * 60)
    
    def print_result(self, test_name: str, success: bool, details: str = ""):
        """Exibe resultado de um teste"""
        status = "✅ PASSOU" if success else "❌ FALHOU"
        print(f"   {status} {test_name}")
        if details and not success:
            print(f"      Detalhes: {details}")
    
    def test_api_health(self, api_name: str, base_url: str) -> bool:
        """Testa saúde de uma API"""
        try:
            response = self.session.get(f"{base_url}/health", timeout=10)
            if response.status_code == 200:
                health_data = response.json()
                print(f"      Status: {health_data.get('status', 'N/A')}")
                return True
            else:
                return False
        except Exception as e:
            return False
    
    def test_code_execution_api(self) -> Dict[str, bool]:
        """Testa API de execução de código"""
        self.print_header("API de Execução de Código")
        
        base_url = APIS["code_execution"]["base_url"]
        results = {}
        
        # Teste 1: Health check
        print("1. Verificando saúde da API...")
        results["health"] = self.test_api_health("code_execution", base_url)
        self.print_result("Health Check", results["health"])
        
        # Teste 2: Listar linguagens suportadas
        print("2. Listando linguagens suportadas...")
        try:
            response = self.session.get(f"{base_url}/languages", timeout=10)
            if response.status_code == 200:
                languages = response.json()
                print(f"      Linguagens disponíveis: {len(languages)}")
                for lang in languages[:3]:  # Mostrar primeiras 3
                    print(f"        • {lang.get('name', 'N/A')} ({lang.get('language', 'N/A')})")
                results["languages"] = True
            else:
                results["languages"] = False
        except Exception as e:
            results["languages"] = False
        self.print_result("Listar Linguagens", results["languages"])
        
        # Teste 3: Executar código Python
        print("3. Executando código Python...")
        try:
            code_data = {
                "code": TEST_DATA["code_samples"]["python"],
                "language": "python",
                "timeout": 30,
                "memory_limit": "512m",
                "user_id": "test_user"
            }
            response = self.session.post(f"{base_url}/execute", json=code_data, timeout=30)
            if response.status_code == 200:
                result = response.json()
                print(f"      Execução bem-sucedida: {result.get('success', False)}")
                print(f"      Output: {result.get('output', 'N/A')[:100]}...")
                results["python_execution"] = True
            else:
                results["python_execution"] = False
        except Exception as e:
            results["python_execution"] = False
        self.print_result("Execução Python", results["python_execution"])
        
        # Teste 4: Executar código JavaScript
        print("4. Executando código JavaScript...")
        try:
            code_data = {
                "code": TEST_DATA["code_samples"]["javascript"],
                "language": "javascript",
                "timeout": 30,
                "memory_limit": "512m",
                "user_id": "test_user"
            }
            response = self.session.post(f"{base_url}/execute", json=code_data, timeout=30)
            if response.status_code == 200:
                result = response.json()
                print(f"      Execução bem-sucedida: {result.get('success', False)}")
                results["javascript_execution"] = True
            else:
                results["javascript_execution"] = False
        except Exception as e:
            results["javascript_execution"] = False
        self.print_result("Execução JavaScript", results["javascript_execution"])
        
        # Teste 5: Estatísticas
        print("5. Verificando estatísticas...")
        try:
            response = self.session.get(f"{base_url}/stats", timeout=10)
            if response.status_code == 200:
                stats = response.json()
                print(f"      Total de execuções: {stats.get('total_executions', 0)}")
                results["statistics"] = True
            else:
                results["statistics"] = False
        except Exception as e:
            results["statistics"] = False
        self.print_result("Estatísticas", results["statistics"])
        
        return results
    
    def test_authentication_api(self) -> Dict[str, bool]:
        """Testa API de autenticação"""
        self.print_header("API de Autenticação")
        
        base_url = APIS["authentication"]["base_url"]
        results = {}
        
        # Teste 1: Health check
        print("1. Verificando saúde da API...")
        results["health"] = self.test_api_health("authentication", base_url)
        self.print_result("Health Check", results["health"])
        
        # Teste 2: Registrar usuário
        print("2. Registrando usuário de teste...")
        try:
            user_data = TEST_DATA["users"][0]
            response = self.session.post(f"{base_url}/auth/register", json=user_data, timeout=10)
            if response.status_code == 200:
                user_info = response.json()
                print(f"      Usuário criado: {user_info.get('username', 'N/A')}")
                results["user_registration"] = True
            else:
                results["user_registration"] = False
        except Exception as e:
            results["user_registration"] = False
        self.print_result("Registro de Usuário", results["user_registration"])
        
        # Teste 3: Login
        print("3. Fazendo login...")
        try:
            login_data = {
                "email": TEST_DATA["users"][0]["email"],
                "password": TEST_DATA["users"][0]["password"]
            }
            response = self.session.post(f"{base_url}/auth/login", json=login_data, timeout=10)
            if response.status_code == 200:
                login_result = response.json()
                self.auth_tokens["student"] = login_result.get("access_token")
                print(f"      Login bem-sucedido para: {login_result.get('user', {}).get('username', 'N/A')}")
                results["user_login"] = True
            else:
                results["user_login"] = False
        except Exception as e:
            results["user_login"] = False
        self.print_result("Login de Usuário", results["user_login"])
        
        # Teste 4: Obter perfil do usuário
        print("4. Obtendo perfil do usuário...")
        try:
            headers = {"Authorization": f"Bearer {self.auth_tokens.get('student', '')}"}
            response = self.session.get(f"{base_url}/users/me", headers=headers, timeout=10)
            if response.status_code == 200:
                profile = response.json()
                print(f"      Perfil obtido: {profile.get('username', 'N/A')}")
                results["get_profile"] = True
            else:
                results["get_profile"] = False
        except Exception as e:
            results["get_profile"] = False
        self.print_result("Obter Perfil", results["get_profile"])
        
        # Teste 5: Criar projeto
        print("5. Criando projeto colaborativo...")
        try:
            project_data = {
                "name": "Projeto Teste Fenix",
                "description": "Projeto de teste para validação da plataforma",
                "course_id": "test_course_1",
                "max_members": 5,
                "is_public": True
            }
            headers = {"Authorization": f"Bearer {self.auth_tokens.get('student', '')}"}
            response = self.session.post(f"{base_url}/projects", json=project_data, headers=headers, timeout=10)
            if response.status_code == 200:
                project = response.json()
                print(f"      Projeto criado: {project.get('name', 'N/A')}")
                results["create_project"] = True
            else:
                results["create_project"] = False
        except Exception as e:
            results["create_project"] = False
        self.print_result("Criar Projeto", results["create_project"])
        
        return results
    
    def test_recommendations_api(self) -> Dict[str, bool]:
        """Testa API de recomendações"""
        self.print_header("API de Recomendações")
        
        base_url = APIS["recommendations"]["base_url"]
        results = {}
        
        # Teste 1: Health check
        print("1. Verificando saúde da API...")
        results["health"] = self.test_api_health("recommendations", base_url)
        self.print_result("Health Check", results["health"])
        
        # Teste 2: Criar perfil de usuário
        print("2. Criando perfil de usuário para recomendações...")
        try:
            user_profile = {
                "user_id": "test_user_rec",
                "interests": ["python", "machine-learning", "data-science"],
                "skill_level": "intermediate",
                "preferred_categories": ["practical", "project_based"],
                "learning_goals": ["master-ml", "build-portfolio"],
                "time_availability": "evening",
                "preferred_format": "video"
            }
            response = self.session.post(f"{base_url}/users", json=user_profile, timeout=10)
            if response.status_code == 200:
                print(f"      Perfil criado: {user_profile['user_id']}")
                results["create_user_profile"] = True
            else:
                results["create_user_profile"] = False
        except Exception as e:
            results["create_user_profile"] = False
        self.print_result("Criar Perfil de Usuário", results["create_user_profile"])
        
        # Teste 3: Adicionar conteúdo
        print("3. Adicionando conteúdo para recomendações...")
        try:
            content_item = TEST_DATA["content_items"][0]
            response = self.session.post(f"{base_url}/content", json=content_item, timeout=10)
            if response.status_code == 200:
                print(f"      Conteúdo adicionado: {content_item['title']}")
                results["add_content"] = True
            else:
                results["add_content"] = False
        except Exception as e:
            results["add_content"] = False
        self.print_result("Adicionar Conteúdo", results["add_content"])
        
        # Teste 4: Registrar interação
        print("4. Registrando interação do usuário...")
        try:
            interaction = {
                "user_id": "test_user_rec",
                "item_id": "test_course_1",
                "interaction_type": "course_view",
                "duration": 45,
                "score": 85.0,
                "rating": 4
            }
            response = self.session.post(f"{base_url}/interactions", json=interaction, timeout=10)
            if response.status_code == 200:
                print(f"      Interação registrada: {interaction['interaction_type']}")
                results["register_interaction"] = True
            else:
                results["register_interaction"] = False
        except Exception as e:
            results["register_interaction"] = False
        self.print_result("Registrar Interação", results["register_interaction"])
        
        # Teste 5: Gerar recomendações
        print("5. Gerando recomendações personalizadas...")
        try:
            recommendation_request = {
                "user_id": "test_user_rec",
                "n_recommendations": 5
            }
            response = self.session.post(f"{base_url}/recommendations", json=recommendation_request, timeout=10)
            if response.status_code == 200:
                recommendations = response.json()
                print(f"      Recomendações geradas: {recommendations.get('total_count', 0)}")
                results["generate_recommendations"] = True
            else:
                results["generate_recommendations"] = False
        except Exception as e:
            results["generate_recommendations"] = False
        self.print_result("Gerar Recomendações", results["generate_recommendations"])
        
        # Teste 6: Treinar modelos
        print("6. Iniciando treinamento dos modelos...")
        try:
            training_request = {
                "model_types": ["all"],
                "force_retrain": False
            }
            response = self.session.post(f"{base_url}/training", json=training_request, timeout=10)
            if response.status_code == 200:
                training = response.json()
                print(f"      Treinamento iniciado: {training.get('status', 'N/A')}")
                results["start_training"] = True
            else:
                results["start_training"] = False
        except Exception as e:
            results["start_training"] = False
        self.print_result("Iniciar Treinamento", results["start_training"])
        
        return results
    
    def run_all_tests(self) -> Dict[str, Dict[str, bool]]:
        """Executa todos os testes"""
        print("🚀 FENIX ACADEMY - TESTE COMPLETO DE FUNCIONALIDADES")
        print("=" * 60)
        print(f"⏰ Iniciado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print()
        
        # Testar API de execução de código
        self.test_results["code_execution"] = self.test_code_execution_api()
        
        # Testar API de autenticação
        self.test_results["authentication"] = self.test_authentication_api()
        
        # Testar API de recomendações
        self.test_results["recommendations"] = self.test_recommendations_api()
        
        return self.test_results
    
    def print_summary(self):
        """Exibe resumo dos testes"""
        print("\n" + "=" * 60)
        print("📊 RESUMO DOS TESTES")
        print("=" * 60)
        
        total_tests = 0
        passed_tests = 0
        
        for api_name, results in self.test_results.items():
            api_display_name = APIS[api_name]["name"]
            print(f"\n{api_display_name}:")
            
            api_total = len(results)
            api_passed = sum(1 for result in results.values() if result)
            
            total_tests += api_total
            passed_tests += api_passed
            
            for test_name, success in results.items():
                status = "✅" if success else "❌"
                print(f"   {status} {test_name}")
            
            print(f"   📈 Resultado: {api_passed}/{api_total} testes passaram")
        
        print(f"\n🎯 RESULTADO GERAL: {passed_tests}/{total_tests} testes passaram")
        
        if passed_tests == total_tests:
            print("🎉 TODOS OS TESTES PASSARAM! A plataforma está funcionando perfeitamente!")
        elif passed_tests > total_tests * 0.8:
            print("⚠️  A maioria dos testes passou. Verifique os que falharam.")
        else:
            print("❌ Muitos testes falharam. Verifique a configuração das APIs.")
        
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        print(f"📊 Taxa de Sucesso: {success_rate:.1f}%")

def main():
    """Função principal"""
    print("🔍 Iniciando testes da Fenix Academy...")
    
    # Verificar se as APIs estão rodando
    print("🔍 Verificando se as APIs estão rodando...")
    
    for api_name, config in APIS.items():
        try:
            response = requests.get(f"{config['base_url']}/", timeout=5)
            if response.status_code == 200:
                print(f"✅ {config['name']} está rodando em {config['base_url']}")
            else:
                print(f"❌ {config['name']} não está respondendo corretamente")
        except requests.exceptions.RequestException:
            print(f"❌ {config['name']} não está acessível em {config['base_url']}")
            print("💡 Certifique-se de que todas as APIs estão rodando:")
            print("   python start_apis.py")
            return
    
    print("\n🚀 Todas as APIs estão rodando! Iniciando testes...")
    
    # Executar testes
    tester = FenixAcademyTester()
    results = tester.run_all_tests()
    
    # Exibir resumo
    tester.print_summary()
    
    # Retornar código de saída apropriado
    total_tests = sum(len(api_results) for api_results in results.values())
    passed_tests = sum(
        sum(1 for result in api_results.values() if result)
        for api_results in results.values()
    )
    
    if passed_tests == total_tests:
        print("\n🎉 SUCESSO TOTAL! Todas as funcionalidades estão funcionando!")
        sys.exit(0)
    else:
        print(f"\n⚠️  {total_tests - passed_tests} testes falharam. Verifique os logs acima.")
        sys.exit(1)

if __name__ == "__main__":
    main()
