#!/usr/bin/env python3
"""
Testes de Segurança - Fenix Academy
Testes automatizados para todas as funcionalidades de segurança
"""

import asyncio
import json
import pytest
import pytest_asyncio
from httpx import AsyncClient
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch

from main import app
from security.security_audit import SecurityAuditor, SecurityVulnerability, SecurityLevel, VulnerabilityType

# Configuração de testes
pytestmark = pytest.mark.asyncio

class TestSecurityAudit:
    """Testes para o sistema de auditoria de segurança"""
    
    @pytest_asyncio.fixture
    async def security_auditor(self):
        """Fixture para o auditor de segurança"""
        return SecurityAuditor()
    
    async def test_security_auditor_initialization(self, security_auditor):
        """Testa inicialização do auditor de segurança"""
        assert security_auditor is not None
        assert hasattr(security_auditor, 'vulnerabilities')
        assert hasattr(security_auditor, 'audit_history')
        assert hasattr(security_auditor, 'security_config')
    
    async def test_complete_security_audit(self, security_auditor):
        """Testa execução completa da auditoria de segurança"""
        result = await security_auditor.run_complete_audit()
        
        assert result is not None
        assert hasattr(result, 'timestamp')
        assert hasattr(result, 'vulnerabilities')
        assert hasattr(result, 'risk_score')
        assert hasattr(result, 'recommendations')
        assert hasattr(result, 'compliance_status')
        
        # Verificar se vulnerabilidades foram encontradas
        assert len(result.vulnerabilities) > 0
        
        # Verificar se score de risco está no range correto
        assert 0.0 <= result.risk_score <= 10.0
    
    async def test_authentication_audit(self, security_auditor):
        """Testa auditoria de autenticação"""
        await security_auditor._audit_authentication()
        
        # Verificar se vulnerabilidades de autenticação foram encontradas
        auth_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.AUTHENTICATION]
        assert len(auth_vulns) > 0
        
        # Verificar vulnerabilidade crítica do JWT secret
        critical_jwt_vuln = [v for v in auth_vulns if v.id == "AUTH-001" and v.level == SecurityLevel.CRITICAL]
        assert len(critical_jwt_vuln) > 0
    
    async def test_authorization_audit(self, security_auditor):
        """Testa auditoria de autorização"""
        await security_auditor._audit_authorization()
        
        authz_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.AUTHORIZATION]
        assert len(authz_vulns) > 0
    
    async def test_input_validation_audit(self, security_auditor):
        """Testa auditoria de validação de entrada"""
        await security_auditor._audit_input_validation()
        
        input_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.INPUT_VALIDATION]
        assert len(input_vulns) > 0
    
    async def test_sql_injection_audit(self, security_auditor):
        """Testa auditoria de SQL Injection"""
        await security_auditor._audit_sql_injection()
        
        sql_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.SQL_INJECTION]
        assert len(sql_vulns) > 0
    
    async def test_xss_audit(self, security_auditor):
        """Testa auditoria de XSS"""
        await security_auditor._audit_xss_vulnerabilities()
        
        xss_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.XSS]
        assert len(xss_vulns) > 0
    
    async def test_csrf_audit(self, security_auditor):
        """Testa auditoria de CSRF"""
        await security_auditor._audit_csrf_protection()
        
        csrf_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.CSRF]
        assert len(csrf_vulns) > 0
    
    async def test_rate_limiting_audit(self, security_auditor):
        """Testa auditoria de rate limiting"""
        await security_auditor._audit_rate_limiting()
        
        rate_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.RATE_LIMITING]
        assert len(rate_vulns) > 0
    
    async def test_data_exposure_audit(self, security_auditor):
        """Testa auditoria de exposição de dados"""
        await security_auditor._audit_data_exposure()
        
        data_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.DATA_EXPOSURE]
        assert len(data_vulns) > 0
    
    async def test_configuration_audit(self, security_auditor):
        """Testa auditoria de configuração"""
        await security_auditor._audit_configuration()
        
        config_vulns = [v for v in security_auditor.vulnerabilities if v.type == VulnerabilityType.CONFIGURATION]
        assert len(config_vulns) > 0
    
    async def test_risk_score_calculation(self, security_auditor):
        """Testa cálculo do score de risco"""
        await security_auditor.run_complete_audit()
        
        risk_score = security_auditor._calculate_risk_score()
        assert 0.0 <= risk_score <= 10.0
        
        # Se não há vulnerabilidades, score deve ser 0
        if len(security_auditor.vulnerabilities) == 0:
            assert risk_score == 0.0
    
    async def test_recommendations_generation(self, security_auditor):
        """Testa geração de recomendações"""
        await security_auditor.run_complete_audit()
        
        recommendations = security_auditor._generate_recommendations()
        assert len(recommendations) > 0
        
        # Verificar se há recomendações para vulnerabilidades críticas
        critical_vulns = [v for v in security_auditor.vulnerabilities if v.level == SecurityLevel.CRITICAL]
        if critical_vulns:
            critical_recs = [r for r in recommendations if "CRÍTICO" in r]
            assert len(critical_recs) > 0
    
    async def test_compliance_check(self, security_auditor):
        """Testa verificação de compliance"""
        await security_auditor.run_complete_audit()
        
        compliance = security_auditor._check_compliance()
        assert isinstance(compliance, dict)
        assert "owasp_top_10" in compliance
        
        # OWASP Top 10 deve ser False se há vulnerabilidades altas/críticas
        high_critical_vulns = [v for v in security_auditor.vulnerabilities 
                              if v.level in [SecurityLevel.HIGH, SecurityLevel.CRITICAL]]
        
        if high_critical_vulns:
            assert compliance["owasp_top_10"] == False
        else:
            assert compliance["owasp_top_10"] == True
    
    async def test_security_report_generation(self, security_auditor):
        """Testa geração de relatório de segurança"""
        await security_auditor.run_complete_audit()
        
        report = security_auditor.generate_security_report()
        assert isinstance(report, dict)
        assert "report_generated_at" in report
        assert "latest_audit" in report
        assert "total_vulnerabilities" in report
        assert "security_score" in report
        
        # Verificar se security score está no range correto
        assert 0 <= report["security_score"] <= 10

class TestSecurityMiddleware:
    """Testes para o middleware de segurança"""
    
    @pytest_asyncio.fixture
    async def security_middleware(self):
        """Fixture para o middleware de segurança"""
        from security.security_audit import SecurityMiddleware
        mock_app = Mock()
        return SecurityMiddleware(mock_app)
    
    async def test_client_ip_extraction(self, security_middleware):
        """Testa extração de IP do cliente"""
        mock_scope = {
            "type": "http",
            "headers": [(b"x-forwarded-for", b"192.168.1.1")]
        }
        
        client_ip = security_middleware._get_client_ip(mock_scope)
        assert client_ip == "192.168.1.1"
    
    async def test_rate_limit_check(self, security_middleware):
        """Testa verificação de rate limiting"""
        client_ip = "192.168.1.1"
        path = "/api/test"
        
        # Primeira verificação deve passar
        result = await security_middleware._check_rate_limit(client_ip, path)
        assert result == True
        
        # Simular muitas requisições
        for _ in range(100):
            await security_middleware._check_rate_limit(client_ip, path)
        
        # A 101ª deve falhar
        result = await security_middleware._check_rate_limit(client_ip, path)
        assert result == False
    
    async def test_login_attempts_check(self, security_middleware):
        """Testa verificação de tentativas de login"""
        client_ip = "192.168.1.1"
        
        # Primeira verificação deve passar
        result = await security_middleware._check_login_attempts(client_ip)
        assert result == True
        
        # Simular muitas tentativas falhadas
        for _ in range(10):
            security_middleware.failed_login_attempts[client_ip]["count"] += 1
        
        # Deve estar bloqueado
        result = await security_middleware._check_login_attempts(client_ip)
        assert result == False

class TestSecurityEndpoints:
    """Testes para endpoints de segurança"""
    
    @pytest_asyncio.fixture
    async def client(self):
        """Fixture para cliente de teste"""
        async with AsyncClient(app=app, base_url="http://test") as ac:
            yield ac
    
    async def test_security_audit_endpoint(self, client):
        """Testa endpoint de auditoria de segurança"""
        response = await client.get("/security/audit")
        
        assert response.status_code == 200
        data = response.json()
        
        assert "status" in data
        assert data["status"] == "success"
        assert "audit_result" in data
        
        audit_result = data["audit_result"]
        assert "timestamp" in audit_result
        assert "risk_score" in audit_result
        assert "vulnerabilities_count" in audit_result
        assert "recommendations" in audit_result
    
    async def test_health_check_endpoint(self, client):
        """Testa endpoint de health check"""
        response = await client.get("/health")
        
        assert response.status_code == 200
        data = response.json()
        
        assert "status" in data
        assert data["status"] == "healthy"
        assert "version" in data
        assert data["version"] == "2.0.0"
    
    async def test_root_endpoint(self, client):
        """Testa endpoint raiz"""
        response = await client.get("/")
        
        assert response.status_code == 200
        data = response.json()
        
        assert "message" in data
        assert "Fenix Academy API" in data["message"]
        assert "version" in data
        assert data["version"] == "2.0.0"

class TestSecurityVulnerabilities:
    """Testes para vulnerabilidades de segurança"""
    
    def test_vulnerability_creation(self):
        """Testa criação de vulnerabilidades"""
        vuln = SecurityVulnerability(
            id="TEST-001",
            type=VulnerabilityType.AUTHENTICATION,
            level=SecurityLevel.HIGH,
            description="Vulnerabilidade de teste",
            location="test_location",
            recommendation="Recomendação de teste"
        )
        
        assert vuln.id == "TEST-001"
        assert vuln.type == VulnerabilityType.AUTHENTICATION
        assert vuln.level == SecurityLevel.HIGH
        assert vuln.description == "Vulnerabilidade de teste"
        assert vuln.location == "test_location"
        assert vuln.recommendation == "Recomendação de teste"
        assert vuln.status == "open"
    
    def test_vulnerability_levels(self):
        """Testa níveis de vulnerabilidade"""
        levels = [SecurityLevel.LOW, SecurityLevel.MEDIUM, SecurityLevel.HIGH, SecurityLevel.CRITICAL]
        
        for level in levels:
            assert isinstance(level, SecurityLevel)
            assert level.value in ["low", "medium", "high", "critical"]
    
    def test_vulnerability_types(self):
        """Testa tipos de vulnerabilidade"""
        types = [
            VulnerabilityType.AUTHENTICATION,
            VulnerabilityType.AUTHORIZATION,
            VulnerabilityType.INPUT_VALIDATION,
            VulnerabilityType.SQL_INJECTION,
            VulnerabilityType.XSS,
            VulnerabilityType.CSRF,
            VulnerabilityType.RATE_LIMITING,
            VulnerabilityType.DATA_EXPOSURE,
            VulnerabilityType.CONFIGURATION
        ]
        
        for vuln_type in types:
            assert isinstance(vuln_type, VulnerabilityType)

# Testes de integração
class TestSecurityIntegration:
    """Testes de integração de segurança"""
    
    @pytest_asyncio.fixture
    async def test_app(self):
        """Fixture para aplicação de teste"""
        return app
    
    async def test_security_middleware_integration(self, test_app):
        """Testa integração do middleware de segurança"""
        # Verificar se middleware está configurado
        middleware_classes = [type(middleware) for middleware in test_app.user_middleware]
        
        # Deve ter middleware de segurança
        assert len(middleware_classes) > 0
    
    async def test_cors_middleware_integration(self, test_app):
        """Testa integração do middleware CORS"""
        # Verificar se CORS está configurado
        cors_middleware = None
        for middleware in test_app.user_middleware:
            if "CORSMiddleware" in str(type(middleware)):
                cors_middleware = middleware
                break
        
        assert cors_middleware is not None
    
    async def test_trusted_host_middleware_integration(self, test_app):
        """Testa integração do middleware de hosts confiáveis"""
        # Verificar se TrustedHost está configurado
        trusted_host_middleware = None
        for middleware in test_app.user_middleware:
            if "TrustedHostMiddleware" in str(type(middleware)):
                trusted_host_middleware = middleware
                break
        
        assert trusted_host_middleware is not None

# Testes de performance de segurança
class TestSecurityPerformance:
    """Testes de performance de segurança"""
    
    @pytest_asyncio.fixture
    async def security_auditor(self):
        """Fixture para auditor de segurança"""
        return SecurityAuditor()
    
    async def test_audit_performance(self, security_auditor):
        """Testa performance da auditoria de segurança"""
        import time
        
        start_time = time.time()
        result = await security_auditor.run_complete_audit()
        end_time = time.time()
        
        execution_time = end_time - start_time
        
        # Auditoria deve completar em menos de 5 segundos
        assert execution_time < 5.0
        
        # Verificar se resultado foi gerado
        assert result is not None
        assert len(result.vulnerabilities) > 0
    
    async def test_concurrent_audits(self, security_auditor):
        """Testa execução concorrente de auditorias"""
        import asyncio
        
        # Executar múltiplas auditorias simultaneamente
        tasks = [security_auditor.run_complete_audit() for _ in range(5)]
        results = await asyncio.gather(*tasks)
        
        # Todas devem completar com sucesso
        assert len(results) == 5
        for result in results:
            assert result is not None
            assert hasattr(result, 'vulnerabilities')
            assert hasattr(result, 'risk_score')

# Configuração de pytest
def pytest_configure(config):
    """Configuração do pytest"""
    config.addinivalue_line(
        "markers", "asyncio: mark test as async"
    )

if __name__ == "__main__":
    # Executar testes diretamente
    pytest.main([__file__, "-v"])
