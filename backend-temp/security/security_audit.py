#!/usr/bin/env python3
"""
Sistema de Auditoria de Segurança - Fenix Academy
Auditoria completa de segurança para APIs e aplicações
"""

import asyncio
import hashlib
import hmac
import json
import logging
import secrets
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from enum import Enum

import jwt
from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, ValidationError
import bcrypt

# Configuração de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SecurityLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class VulnerabilityType(Enum):
    AUTHENTICATION = "authentication"
    AUTHORIZATION = "authorization"
    INPUT_VALIDATION = "input_validation"
    SQL_INJECTION = "sql_injection"
    XSS = "xss"
    CSRF = "csrf"
    RATE_LIMITING = "rate_limiting"
    DATA_EXPOSURE = "data_exposure"
    CONFIGURATION = "configuration"

@dataclass
class SecurityVulnerability:
    id: str
    type: VulnerabilityType
    level: SecurityLevel
    description: str
    location: str
    recommendation: str
    cve_reference: Optional[str] = None
    discovered_at: datetime = None
    fixed_at: Optional[datetime] = None
    status: str = "open"

@dataclass
class SecurityAuditResult:
    timestamp: datetime
    vulnerabilities: List[SecurityVulnerability]
    risk_score: float
    recommendations: List[str]
    compliance_status: Dict[str, bool]

class SecurityAuditor:
    """Sistema principal de auditoria de segurança"""
    
    def __init__(self):
        self.vulnerabilities: List[SecurityVulnerability] = []
        self.audit_history: List[SecurityAuditResult] = []
        self.security_config = self._load_security_config()
    
    def _load_security_config(self) -> Dict[str, Any]:
        """Carrega configurações de segurança"""
        return {
            "jwt_secret": "your-super-secret-jwt-key-change-in-production",
            "jwt_algorithm": "HS256",
            "jwt_expiration": 3600,  # 1 hora
            "refresh_token_expiration": 604800,  # 7 dias
            "max_login_attempts": 5,
            "lockout_duration": 900,  # 15 minutos
            "password_min_length": 12,
            "password_requirements": {
                "uppercase": True,
                "lowercase": True,
                "numbers": True,
                "special_chars": True
            },
            "rate_limits": {
                "login": {"requests": 5, "window": 300},  # 5 tentativas por 5 min
                "api": {"requests": 100, "window": 60},   # 100 requests por min
                "file_upload": {"requests": 10, "window": 3600}  # 10 uploads por hora
            }
        }
    
    async def run_complete_audit(self) -> SecurityAuditResult:
        """Executa auditoria completa de segurança"""
        logger.info("Iniciando auditoria completa de segurança...")
        
        # Limpar vulnerabilidades anteriores
        self.vulnerabilities.clear()
        
        # Executar todas as verificações
        await self._audit_authentication()
        await self._audit_authorization()
        await self._audit_input_validation()
        await self._audit_sql_injection()
        await self._audit_xss_vulnerabilities()
        await self._audit_csrf_protection()
        await self._audit_rate_limiting()
        await self._audit_data_exposure()
        await self._audit_configuration()
        
        # Calcular score de risco
        risk_score = self._calculate_risk_score()
        
        # Gerar recomendações
        recommendations = self._generate_recommendations()
        
        # Verificar compliance
        compliance_status = self._check_compliance()
        
        # Criar resultado da auditoria
        audit_result = SecurityAuditResult(
            timestamp=datetime.now(),
            vulnerabilities=self.vulnerabilities.copy(),
            risk_score=risk_score,
            recommendations=recommendations,
            compliance_status=compliance_status
        )
        
        # Salvar no histórico
        self.audit_history.append(audit_result)
        
        logger.info(f"Auditoria concluída. Score de risco: {risk_score:.2f}")
        return audit_result
    
    async def _audit_authentication(self):
        """Auditoria do sistema de autenticação"""
        logger.info("Auditando sistema de autenticação...")
        
        # Verificar JWT
        if self.security_config["jwt_secret"] == "your-super-secret-jwt-key-change-in-production":
            self.vulnerabilities.append(SecurityVulnerability(
                id="AUTH-001",
                type=VulnerabilityType.AUTHENTICATION,
                level=SecurityLevel.CRITICAL,
                description="JWT secret padrão em uso",
                location="security_config",
                recommendation="Alterar JWT secret para valor único e seguro"
            ))
        
        # Verificar expiração de tokens
        if self.security_config["jwt_expiration"] > 7200:  # 2 horas
            self.vulnerabilities.append(SecurityVulnerability(
                id="AUTH-002",
                type=VulnerabilityType.AUTHENTICATION,
                level=SecurityLevel.MEDIUM,
                description="JWT expiration muito longo",
                location="security_config",
                recommendation="Reduzir JWT expiration para máximo 2 horas"
            ))
        
        # Verificar requisitos de senha
        if self.security_config["password_min_length"] < 12:
            self.vulnerabilities.append(SecurityVulnerability(
                id="AUTH-003",
                type=VulnerabilityType.AUTHENTICATION,
                level=SecurityLevel.HIGH,
                description="Comprimento mínimo de senha muito baixo",
                location="security_config",
                recommendation="Aumentar password_min_length para 12 ou mais"
            ))
    
    async def _audit_authorization(self):
        """Auditoria do sistema de autorização"""
        logger.info("Auditando sistema de autorização...")
        
        # Verificar se há sistema de roles implementado
        # Esta é uma verificação básica - em produção seria mais robusta
        self.vulnerabilities.append(SecurityVulnerability(
            id="AUTHZ-001",
            type=VulnerabilityType.AUTHORIZATION,
            level=SecurityLevel.MEDIUM,
            description="Sistema de autorização básico",
            location="authorization_system",
            recommendation="Implementar sistema de roles e permissões granular"
        ))
    
    async def _audit_input_validation(self):
        """Auditoria de validação de entrada"""
        logger.info("Auditando validação de entrada...")
        
        # Verificar se há validação robusta implementada
        self.vulnerabilities.append(SecurityVulnerability(
            id="INPUT-001",
            type=VulnerabilityType.INPUT_VALIDATION,
            level=SecurityLevel.HIGH,
            description="Validação de entrada básica",
            location="input_validation",
            recommendation="Implementar validação robusta com Pydantic e sanitização"
        ))
    
    async def _audit_sql_injection(self):
        """Auditoria de vulnerabilidades SQL Injection"""
        logger.info("Auditando vulnerabilidades SQL Injection...")
        
        # Verificar se há ORM sendo usado
        self.vulnerabilities.append(SecurityVulnerability(
            id="SQL-001",
            type=VulnerabilityType.SQL_INJECTION,
            level=SecurityLevel.MEDIUM,
            description="Uso de queries SQL diretas",
            location="database_queries",
            recommendation="Usar ORM (SQLAlchemy) para prevenir SQL injection"
        ))
    
    async def _audit_xss_vulnerabilities(self):
        """Auditoria de vulnerabilidades XSS"""
        logger.info("Auditando vulnerabilidades XSS...")
        
        # Verificar se há sanitização de HTML
        self.vulnerabilities.append(SecurityVulnerability(
            id="XSS-001",
            type=VulnerabilityType.XSS,
            level=SecurityLevel.HIGH,
            description="Falta de sanitização de HTML",
            location="html_rendering",
            recommendation="Implementar sanitização de HTML com bibliotecas como bleach"
        ))
    
    async def _audit_csrf_protection(self):
        """Auditoria de proteção CSRF"""
        logger.info("Auditando proteção CSRF...")
        
        # Verificar se há proteção CSRF
        self.vulnerabilities.append(SecurityVulnerability(
            id="CSRF-001",
            type=VulnerabilityType.CSRF,
            level=SecurityLevel.HIGH,
            description="Falta de proteção CSRF",
            location="csrf_protection",
            recommendation="Implementar tokens CSRF para todas as operações POST/PUT/DELETE"
        ))
    
    async def _audit_rate_limiting(self):
        """Auditoria de rate limiting"""
        logger.info("Auditando rate limiting...")
        
        # Verificar se há rate limiting implementado
        self.vulnerabilities.append(SecurityVulnerability(
            id="RATE-001",
            type=VulnerabilityType.RATE_LIMITING,
            level=SecurityLevel.MEDIUM,
            description="Falta de rate limiting",
            location="rate_limiting",
            recommendation="Implementar rate limiting para APIs e endpoints sensíveis"
        ))
    
    async def _audit_data_exposure(self):
        """Auditoria de exposição de dados"""
        logger.info("Auditando exposição de dados...")
        
        # Verificar se há logs sensíveis
        self.vulnerabilities.append(SecurityVulnerability(
            id="DATA-001",
            type=VulnerabilityType.DATA_EXPOSURE,
            level=SecurityLevel.MEDIUM,
            description="Possível exposição de dados sensíveis em logs",
            location="logging_system",
            recommendation="Implementar filtros de log para dados sensíveis"
        ))
    
    async def _audit_configuration(self):
        """Auditoria de configuração"""
        logger.info("Auditando configuração...")
        
        # Verificar se DEBUG está ativo
        self.vulnerabilities.append(SecurityVulnerability(
            id="CONFIG-001",
            type=VulnerabilityType.CONFIGURATION,
            level=SecurityLevel.HIGH,
            description="Modo DEBUG pode estar ativo",
            location="environment_config",
            recommendation="Desabilitar DEBUG em produção"
        ))
    
    def _calculate_risk_score(self) -> float:
        """Calcula score de risco baseado nas vulnerabilidades"""
        if not self.vulnerabilities:
            return 0.0
        
        score = 0.0
        weights = {
            SecurityLevel.LOW: 1.0,
            SecurityLevel.MEDIUM: 2.0,
            SecurityLevel.HIGH: 3.0,
            SecurityLevel.CRITICAL: 5.0
        }
        
        for vuln in self.vulnerabilities:
            score += weights.get(vuln.level, 1.0)
        
        # Normalizar para 0-10
        max_possible_score = len(self.vulnerabilities) * 5.0
        normalized_score = (score / max_possible_score) * 10.0
        
        return min(normalized_score, 10.0)
    
    def _generate_recommendations(self) -> List[str]:
        """Gera lista de recomendações prioritárias"""
        recommendations = []
        
        # Agrupar por nível de criticidade
        critical_vulns = [v for v in self.vulnerabilities if v.level == SecurityLevel.CRITICAL]
        high_vulns = [v for v in self.vulnerabilities if v.level == SecurityLevel.HIGH]
        
        if critical_vulns:
            recommendations.append("🔴 CRÍTICO: Resolver vulnerabilidades críticas imediatamente")
        
        if high_vulns:
            recommendations.append("🟠 ALTO: Resolver vulnerabilidades de alto risco em 24h")
        
        recommendations.extend([
            "Implementar sistema de monitoramento de segurança",
            "Configurar alertas para tentativas de ataque",
            "Implementar logging de auditoria",
            "Configurar backup automático de dados",
            "Implementar sistema de recuperação de desastres"
        ])
        
        return recommendations
    
    def _check_compliance(self) -> Dict[str, bool]:
        """Verifica compliance com padrões de segurança"""
        return {
            "gdpr": False,  # Implementar conforme necessário
            "sox": False,    # Implementar conforme necessário
            "pci_dss": False, # Implementar conforme necessário
            "iso_27001": False, # Implementar conforme necessário
            "owasp_top_10": len([v for v in self.vulnerabilities if v.level in [SecurityLevel.HIGH, SecurityLevel.CRITICAL]]) == 0
        }
    
    def generate_security_report(self) -> Dict[str, Any]:
        """Gera relatório completo de segurança"""
        latest_audit = self.audit_history[-1] if self.audit_history else None
        
        return {
            "report_generated_at": datetime.now().isoformat(),
            "latest_audit": latest_audit.__dict__ if latest_audit else None,
            "total_vulnerabilities": len(self.vulnerabilities),
            "vulnerabilities_by_level": {
                level.value: len([v for v in self.vulnerabilities if v.level == level])
                for level in SecurityLevel
            },
            "vulnerabilities_by_type": {
                vuln_type.value: len([v for v in self.vulnerabilities if v.type == vuln_type])
                for vuln_type in VulnerabilityType
            },
            "audit_history_count": len(self.audit_history),
            "security_score": 10 - latest_audit.risk_score if latest_audit else 0
        }

# Middleware de segurança para FastAPI
class SecurityMiddleware:
    """Middleware de segurança para FastAPI"""
    
    def __init__(self, app):
        self.app = app
        self.security_auditor = SecurityAuditor()
        self.rate_limit_store = {}
        self.failed_login_attempts = {}
    
    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            # Verificar rate limiting
            client_ip = self._get_client_ip(scope)
            if not await self._check_rate_limit(client_ip, scope["path"]):
                return await self._rate_limit_response(send)
            
            # Verificar tentativas de login falhadas
            if scope["path"] == "/auth/login" and scope["method"] == "POST":
                if not await self._check_login_attempts(client_ip):
                    return await self._login_blocked_response(send)
        
        await self.app(scope, receive, send)
    
    def _get_client_ip(self, scope) -> str:
        """Extrai IP do cliente"""
        headers = dict(scope["headers"])
        return headers.get(b"x-forwarded-for", b"").decode() or "unknown"
    
    async def _check_rate_limit(self, client_ip: str, path: str) -> bool:
        """Verifica rate limiting"""
        current_time = time.time()
        key = f"{client_ip}:{path}"
        
        if key not in self.rate_limit_store:
            self.rate_limit_store[key] = {"count": 0, "reset_time": current_time + 60}
        
        if current_time > self.rate_limit_store[key]["reset_time"]:
            self.rate_limit_store[key] = {"count": 0, "reset_time": current_time + 60}
        
        self.rate_limit_store[key]["count"] += 1
        
        # Limite básico: 100 requests por minuto
        return self.rate_limit_store[key]["count"] <= 100
    
    async def _check_login_attempts(self, client_ip: str) -> bool:
        """Verifica tentativas de login"""
        current_time = time.time()
        
        if client_ip not in self.failed_login_attempts:
            self.failed_login_attempts[client_ip] = {"count": 0, "blocked_until": 0}
        
        # Se está bloqueado, verificar se já pode tentar novamente
        if self.failed_login_attempts[client_ip]["blocked_until"] > current_time:
            return False
        
        # Reset se já passou o tempo de bloqueio
        if self.failed_login_attempts[client_ip]["blocked_until"] < current_time:
            self.failed_login_attempts[client_ip]["count"] = 0
        
        return True
    
    async def _rate_limit_response(self, send):
        """Resposta para rate limit excedido"""
        await send({
            "type": "http.response.start",
            "status": 429,
            "headers": [(b"content-type", b"application/json")]
        })
        
        await send({
            "type": "http.response.body",
            "body": json.dumps({
                "error": "Rate limit exceeded",
                "message": "Too many requests, please try again later"
            }).encode()
        })
    
    async def _login_blocked_response(self, send):
        """Resposta para login bloqueado"""
        await send({
            "type": "http.response.start",
            "status": 423,
            "headers": [(b"content-type", b"application/json")]
        })
        
        await send({
            "type": "http.response.body",
            "body": json.dumps({
                "error": "Account temporarily locked",
                "message": "Too many failed login attempts"
            }).encode()
        })

# Função para executar auditoria
async def run_security_audit():
    """Função principal para executar auditoria de segurança"""
    auditor = SecurityAuditor()
    result = await auditor.run_complete_audit()
    
    # Gerar relatório
    report = auditor.generate_security_report()
    
    print("🔒 RELATÓRIO DE AUDITORIA DE SEGURANÇA")
    print("=" * 50)
    print(f"Data/Hora: {result.timestamp}")
    print(f"Score de Risco: {result.risk_score:.2f}/10")
    print(f"Vulnerabilidades Encontradas: {len(result.vulnerabilities)}")
    print()
    
    print("🚨 VULNERABILIDADES CRÍTICAS:")
    critical_vulns = [v for v in result.vulnerabilities if v.level == SecurityLevel.CRITICAL]
    for vuln in critical_vulns:
        print(f"  • {vuln.description} ({vuln.id})")
    
    print("\n🟠 VULNERABILIDADES ALTAS:")
    high_vulns = [v for v in result.vulnerabilities if v.level == SecurityLevel.HIGH]
    for vuln in high_vulns:
        print(f"  • {vuln.description} ({vuln.id})")
    
    print("\n📋 RECOMENDAÇÕES:")
    for rec in result.recommendations[:5]:  # Top 5
        print(f"  • {rec}")
    
    return result, report

if __name__ == "__main__":
    asyncio.run(run_security_audit())
