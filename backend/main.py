#!/usr/bin/env python3
"""
Fenix Academy - API Principal
Backend consolidado em FastAPI único
"""

import asyncio
import logging
import os
from contextlib import asynccontextmanager
from typing import Dict, Any

from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
from starlette.middleware.base import BaseHTTPMiddleware
import uvicorn

from security.security_audit import SecurityAuditor, SecurityMiddleware
from core.config import settings
from core.database import init_db, close_db
from core.logging import setup_logging
from api.v1.auth import router as auth_router
from api.v1.courses import router as courses_router
from api.v1.users import router as users_router
from api.v1.progress import router as progress_router
from api.v1.certificates import router as certificates_router
from api.v1.payments import router as payments_router
from api.v1.analytics import router as analytics_router

# Configuração de logging
setup_logging()
logger = logging.getLogger(__name__)

# Configurações de segurança
SECURITY_CONFIG = {
    "jwt_secret": os.getenv("JWT_SECRET", "change-this-in-production"),
    "jwt_algorithm": "HS256",
    "jwt_expiration": 3600,  # 1 hora
    "refresh_token_expiration": 604800,  # 7 dias
    "cors_origins": os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
    "trusted_hosts": os.getenv("TRUSTED_HOSTS", "localhost,127.0.0.1").split(",")
}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gerenciador de ciclo de vida da aplicação"""
    # Startup
    logger.info("🚀 Iniciando Fenix Academy API...")
    
    # Inicializar banco de dados
    await init_db()
    
    # Executar auditoria de segurança
    try:
        security_auditor = SecurityAuditor()
        audit_result = await security_auditor.run_complete_audit()
        logger.info(f"🔒 Auditoria de segurança concluída. Score: {audit_result.risk_score:.2f}/10")
        
        if audit_result.risk_score > 7.0:
            logger.warning("⚠️ Score de segurança alto detectado!")
    except Exception as e:
        logger.error(f"❌ Erro na auditoria de segurança: {e}")
    
    logger.info("✅ Fenix Academy API iniciada com sucesso!")
    
    yield
    
    # Shutdown
    logger.info("🔄 Encerrando Fenix Academy API...")
    await close_db()
    logger.info("✅ Fenix Academy API encerrada")

# Criação da aplicação FastAPI
app = FastAPI(
    title="Fenix Academy API",
    description="API completa para plataforma de educação em tecnologia",
    version="2.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan
)

# Middleware de segurança
app.add_middleware(SecurityMiddleware)

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=SECURITY_CONFIG["cors_origins"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

# Middleware de hosts confiáveis
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=SECURITY_CONFIG["trusted_hosts"]
)

# Middleware de logging de requisições
class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Log da requisição
        logger.info(f"📥 {request.method} {request.url.path} - {request.client.host}")
        
        # Processar requisição
        response = await call_next(request)
        
        # Log da resposta
        logger.info(f"📤 {request.method} {request.url.path} - Status: {response.status_code}")
        
        return response

app.add_middleware(RequestLoggingMiddleware)

# Middleware de tratamento de erros
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handler global para exceções não tratadas"""
    logger.error(f"❌ Erro não tratado: {exc}", exc_info=True)
    
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "Ocorreu um erro interno. Nossa equipe foi notificada.",
            "request_id": request.headers.get("x-request-id", "unknown")
        }
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handler para exceções HTTP"""
    logger.warning(f"⚠️ HTTP Exception: {exc.status_code} - {exc.detail}")
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "HTTP Error",
            "message": exc.detail,
            "status_code": exc.status_code
        }
    )

# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """Endpoint de verificação de saúde da API"""
    return {
        "status": "healthy",
        "timestamp": asyncio.get_event_loop().time(),
        "version": "2.0.0",
        "environment": settings.ENVIRONMENT
    }

# Security audit endpoint
@app.get("/security/audit", tags=["Security"])
async def security_audit():
    """Endpoint para executar auditoria de segurança"""
    try:
        security_auditor = SecurityAuditor()
        audit_result = await security_auditor.run_complete_audit()
        
        return {
            "status": "success",
            "audit_result": {
                "timestamp": audit_result.timestamp.isoformat(),
                "risk_score": audit_result.risk_score,
                "vulnerabilities_count": len(audit_result.vulnerabilities),
                "recommendations": audit_result.recommendations[:5]
            }
        }
    except Exception as e:
        logger.error(f"Erro na auditoria de segurança: {e}")
        raise HTTPException(status_code=500, detail="Erro na auditoria de segurança")

# Incluir routers das APIs
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(courses_router, prefix="/api/v1/courses", tags=["Courses"])
app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(progress_router, prefix="/api/v1/progress", tags=["Progress"])
app.include_router(certificates_router, prefix="/api/v1/certificates", tags=["Certificates"])
app.include_router(payments_router, prefix="/api/v1/payments", tags=["Payments"])
app.include_router(analytics_router, prefix="/api/v1/analytics", tags=["Analytics"])

# Endpoint raiz
@app.get("/", tags=["Root"])
async def root():
    """Endpoint raiz da API"""
    return {
        "message": "🔥 Bem-vindo à Fenix Academy API v2.0!",
        "docs": "/docs",
        "health": "/health",
        "version": "2.0.0"
    }

# Middleware de métricas
@app.middleware("http")
async def metrics_middleware(request: Request, call_next):
    """Middleware para coleta de métricas"""
    import time
    
    start_time = time.time()
    
    # Processar requisição
    response = await call_next(request)
    
    # Calcular tempo de resposta
    process_time = time.time() - start_time
    
    # Adicionar headers de métricas
    response.headers["X-Process-Time"] = str(process_time)
    response.headers["X-Request-ID"] = request.headers.get("x-request-id", "unknown")
    
    # Log de métricas
    logger.info(f"📊 Métricas: {request.method} {request.url.path} - {process_time:.3f}s")
    
    return response

if __name__ == "__main__":
    # Configurações do servidor
    server_config = {
        "host": os.getenv("HOST", "0.0.0.0"),
        "port": int(os.getenv("PORT", "8000")),
        "reload": settings.DEBUG,
        "log_level": "info" if not settings.DEBUG else "debug"
    }
    
    logger.info(f"🚀 Iniciando servidor em {server_config['host']}:{server_config['port']}")
    
    # Iniciar servidor
    uvicorn.run(
        "main:app",
        **server_config
    )
