#!/usr/bin/env python3
"""
Sistema de Certificados e Credenciais - Fenix Academy
Geração, validação e gestão de certificados digitais
"""

from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import asyncio
import json
import logging
from datetime import datetime, timedelta
import uuid
import os
from enum import Enum
import qrcode
import hashlib
import base64
from PIL import Image, ImageDraw, ImageFont
import io

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="Fenix Academy - Certificates API",
    description="Sistema de certificados e credenciais digitais",
    version="2.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enums
class CertificateType(str, Enum):
    COURSE_COMPLETION = "course_completion"
    MODULE_COMPLETION = "module_completion"
    SKILL_VERIFICATION = "skill_verification"
    ACHIEVEMENT = "achievement"
    PARTICIPATION = "participation"

class CertificateStatus(str, Enum):
    PENDING = "pending"
    ISSUED = "issued"
    VERIFIED = "verified"
    EXPIRED = "expired"
    REVOKED = "revoked"

class CredentialType(str, Enum):
    BADGE = "badge"
    CERTIFICATE = "certificate"
    MICRO_CREDENTIAL = "micro_credential"
    SKILL_CARD = "skill_card"

# Modelos Pydantic
class CertificateCreate(BaseModel):
    user_id: str
    course_id: str
    certificate_type: CertificateType
    completion_date: datetime
    score: Optional[float] = None
    grade: Optional[str] = None
    skills_verified: List[str] = []
    metadata: Optional[Dict[str, Any]] = None

class CredentialCreate(BaseModel):
    user_id: str
    credential_type: CredentialType
    title: str
    description: str
    criteria: List[str] = []
    issued_date: datetime
    expires_date: Optional[datetime] = None
    metadata: Optional[Dict[str, Any]] = None

class CertificateTemplate(BaseModel):
    name: str
    description: str
    background_image: str
    font_family: str = "Arial"
    font_size: int = 24
    text_color: str = "#000000"
    logo_url: Optional[str] = None

# Dados em memória (em produção, usar banco de dados)
certificates_db: Dict[str, Dict] = {}
credentials_db: Dict[str, Dict] = {}
templates_db: Dict[str, Dict] = {}
verification_codes_db: Dict[str, Dict] = {}

# Inicializar templates padrão
def initialize_default_templates():
    """Inicializa templates de certificado padrão"""
    default_templates = {
        "course_completion": {
            "id": "template_course_completion",
            "name": "Certificado de Conclusão de Curso",
            "description": "Template padrão para certificados de conclusão de curso",
            "background_image": "certificate_bg.png",
            "font_family": "Arial",
            "font_size": 28,
            "text_color": "#2C3E50",
            "logo_url": "fenix_logo.png"
        },
        "achievement": {
            "id": "template_achievement",
            "name": "Certificado de Conquista",
            "description": "Template para certificados de conquistas e badges",
            "background_image": "achievement_bg.png",
            "font_family": "Arial",
            "font_size": 24,
            "text_color": "#E74C3C",
            "logo_url": "fenix_logo.png"
        },
        "skill_verification": {
            "id": "template_skill_verification",
            "name": "Verificação de Habilidades",
            "description": "Template para verificação de habilidades específicas",
            "background_image": "skill_bg.png",
            "font_family": "Arial",
            "font_size": 22,
            "text_color": "#27AE60",
            "logo_url": "fenix_logo.png"
        }
    }
    
    for template_id, template in default_templates.items():
        templates_db[template_id] = template
    
    logger.info(f"Templates de certificado inicializados: {len(templates_db)}")

# Endpoints principais
@app.get("/", tags=["Root"])
async def root():
    """Endpoint raiz da API de certificados"""
    return {
        "message": "🏆 Fenix Academy - Certificates API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "certificates": "/certificates/*",
            "credentials": "/credentials/*",
            "templates": "/templates/*",
            "verification": "/verification/*"
        }
    }

# Endpoints de certificados
@app.post("/certificates", tags=["Certificates"])
async def create_certificate(
    certificate: CertificateCreate,
    background_tasks: BackgroundTasks
):
    """Cria novo certificado"""
    certificate_id = str(uuid.uuid4())
    
    # Gerar código de verificação único
    verification_code = generate_verification_code(certificate_id)
    
    new_certificate = {
        "id": certificate_id,
        "user_id": certificate.user_id,
        "course_id": certificate.course_id,
        "certificate_type": certificate.certificate_type,
        "completion_date": certificate.completion_date.isoformat(),
        "score": certificate.score,
        "grade": certificate.grade,
        "skills_verified": certificate.skills_verified,
        "status": CertificateStatus.PENDING,
        "verification_code": verification_code,
        "issued_date": datetime.utcnow().isoformat(),
        "metadata": certificate.metadata or {},
        "template_id": "template_course_completion"  # Template padrão
    }
    
    certificates_db[certificate_id] = new_certificate
    
    # Armazenar código de verificação
    verification_codes_db[verification_code] = {
        "certificate_id": certificate_id,
        "created_at": datetime.utcnow().isoformat(),
        "verified_at": None
    }
    
    # Gerar certificado em background
    background_tasks.add_task(
        generate_certificate_pdf,
        certificate_id,
        new_certificate
    )
    
    logger.info(f"Certificado criado: {certificate_id} para usuário {certificate.user_id}")
    
    return {
        "message": "Certificado criado com sucesso",
        "certificate": new_certificate,
        "verification_code": verification_code
    }

@app.get("/certificates/{certificate_id}", tags=["Certificates"])
async def get_certificate(certificate_id: str):
    """Obtém detalhes de um certificado"""
    if certificate_id not in certificates_db:
        raise HTTPException(
            status_code=404,
            detail="Certificado não encontrado"
        )
    
    return certificates_db[certificate_id]

@app.get("/certificates/user/{user_id}", tags=["Certificates"])
async def get_user_certificates(user_id: str):
    """Obtém certificados de um usuário"""
    user_certificates = [
        cert for cert in certificates_db.values()
        if cert["user_id"] == user_id
    ]
    
    # Ordenar por data de emissão (mais recentes primeiro)
    user_certificates.sort(
        key=lambda x: x["issued_date"],
        reverse=True
    )
    
    return {
        "user_id": user_id,
        "certificates": user_certificates,
        "total": len(user_certificates)
    }

@app.put("/certificates/{certificate_id}/issue", tags=["Certificates"])
async def issue_certificate(certificate_id: str):
    """Emite um certificado pendente"""
    if certificate_id not in certificates_db:
        raise HTTPException(
            status_code=404,
            detail="Certificado não encontrado"
        )
    
    certificate = certificates_db[certificate_id]
    
    if certificate["status"] != CertificateStatus.PENDING:
        raise HTTPException(
            status_code=400,
            detail="Certificado não está pendente"
        )
    
    certificate["status"] = CertificateStatus.ISSUED
    certificate["issued_date"] = datetime.utcnow().isoformat()
    
    logger.info(f"Certificado emitido: {certificate_id}")
    
    return {
        "message": "Certificado emitido com sucesso",
        "certificate": certificate
    }

@app.put("/certificates/{certificate_id}/verify", tags=["Certificates"])
async def verify_certificate(certificate_id: str):
    """Verifica um certificado emitido"""
    if certificate_id not in certificates_db:
        raise HTTPException(
            status_code=404,
            detail="Certificado não encontrado"
        )
    
    certificate = certificates_db[certificate_id]
    
    if certificate["status"] != CertificateStatus.ISSUED:
        raise HTTPException(
            status_code=400,
            detail="Certificado não está emitido"
        )
    
    certificate["status"] = CertificateStatus.VERIFIED
    certificate["verified_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Certificado verificado: {certificate_id}")
    
    return {
        "message": "Certificado verificado com sucesso",
        "certificate": certificate
    }

# Endpoints de credenciais
@app.post("/credentials", tags=["Credentials"])
async def create_credential(credential: CredentialCreate):
    """Cria nova credencial"""
    credential_id = str(uuid.uuid4())
    
    new_credential = {
        "id": credential_id,
        "user_id": credential.user_id,
        "credential_type": credential.credential_type,
        "title": credential.title,
        "description": credential.description,
        "criteria": credential.criteria,
        "issued_date": credential.issued_date.isoformat(),
        "expires_date": credential.expires_date.isoformat() if credential.expires_date else None,
        "status": "active",
        "metadata": credential.metadata or {}
    }
    
    credentials_db[credential_id] = new_credential
    
    logger.info(f"Credencial criada: {credential_id} para usuário {credential.user_id}")
    
    return {
        "message": "Credencial criada com sucesso",
        "credential": new_credential
    }

@app.get("/credentials/user/{user_id}", tags=["Credentials"])
async def get_user_credentials(user_id: str):
    """Obtém credenciais de um usuário"""
    user_credentials = [
        cred for cred in credentials_db.values()
        if cred["user_id"] == user_id
    ]
    
    # Ordenar por data de emissão (mais recentes primeiro)
    user_credentials.sort(
        key=lambda x: x["issued_date"],
        reverse=True
    )
    
    return {
        "user_id": user_id,
        "credentials": user_credentials,
        "total": len(user_credentials)
    }

# Endpoints de verificação
@app.get("/verification/{verification_code}", tags=["Verification"])
async def verify_certificate_code(verification_code: str):
    """Verifica um certificado pelo código de verificação"""
    if verification_code not in verification_codes_db:
        raise HTTPException(
            status_code=404,
            detail="Código de verificação inválido"
        )
    
    verification_data = verification_codes_db[verification_code]
    certificate_id = verification_data["certificate_id"]
    
    if certificate_id not in certificates_db:
        raise HTTPException(
            status_code=404,
            detail="Certificado não encontrado"
        )
    
    certificate = certificates_db[certificate_id]
    
    # Marcar como verificado
    verification_data["verified_at"] = datetime.utcnow().isoformat()
    
    return {
        "verification_code": verification_code,
        "certificate": certificate,
        "verification_date": verification_data["verified_at"],
        "is_valid": certificate["status"] in [CertificateStatus.ISSUED, CertificateStatus.VERIFIED]
    }

@app.get("/verification/qr/{verification_code}", tags=["Verification"])
async def generate_verification_qr(verification_code: str):
    """Gera QR code para verificação"""
    if verification_code not in verification_codes_db:
        raise HTTPException(
            status_code=404,
            detail="Código de verificação inválido"
        )
    
    # URL de verificação
    verification_url = f"https://fenix.academy/verify/{verification_code}"
    
    # Gerar QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(verification_url)
    qr.make(fit=True)
    
    # Criar imagem
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Converter para bytes
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    
    # Codificar em base64
    img_base64 = base64.b64encode(img_bytes.getvalue()).decode()
    
    return {
        "verification_code": verification_code,
        "verification_url": verification_url,
        "qr_code": f"data:image/png;base64,{img_base64}"
    }

# Endpoints de templates
@app.get("/templates", tags=["Templates"])
async def list_templates():
    """Lista templates de certificado disponíveis"""
    return {
        "templates": list(templates_db.values()),
        "total": len(templates_db)
    }

@app.get("/templates/{template_id}", tags=["Templates"])
async def get_template(template_id: str):
    """Obtém template específico"""
    if template_id not in templates_db:
        raise HTTPException(
            status_code=404,
            detail="Template não encontrado"
        )
    
    return templates_db[template_id]

@app.post("/templates", tags=["Templates"])
async def create_template(template: CertificateTemplate):
    """Cria novo template de certificado"""
    template_id = f"template_{uuid.uuid4().hex[:8]}"
    
    new_template = {
        "id": template_id,
        "name": template.name,
        "description": template.description,
        "background_image": template.background_image,
        "font_family": template.font_family,
        "font_size": template.font_size,
        "text_color": template.text_color,
        "logo_url": template.logo_url,
        "created_at": datetime.utcnow().isoformat()
    }
    
    templates_db[template_id] = new_template
    
    logger.info(f"Template criado: {template_id}")
    
    return {
        "message": "Template criado com sucesso",
        "template": new_template
    }

# Funções auxiliares
def generate_verification_code(certificate_id: str) -> str:
    """Gera código de verificação único"""
    # Combinar ID do certificado com timestamp
    timestamp = str(int(datetime.utcnow().timestamp()))
    combined = f"{certificate_id}_{timestamp}"
    
    # Gerar hash SHA-256
    hash_object = hashlib.sha256(combined.encode())
    hash_hex = hash_object.hexdigest()
    
    # Retornar primeiros 16 caracteres
    return hash_hex[:16].upper()

async def generate_certificate_pdf(certificate_id: str, certificate_data: Dict[str, Any]):
    """Gera PDF do certificado em background"""
    try:
        # Em produção, usar biblioteca como reportlab ou weasyprint
        # Por enquanto, apenas simular geração
        
        logger.info(f"Gerando PDF para certificado: {certificate_id}")
        
        # Simular tempo de geração
        await asyncio.sleep(2)
        
        # Atualizar status do certificado
        if certificate_id in certificates_db:
            certificates_db[certificate_id]["status"] = CertificateStatus.ISSUED
            certificates_db[certificate_id]["pdf_generated"] = True
            certificates_db[certificate_id]["pdf_url"] = f"/certificates/{certificate_id}/pdf"
        
        logger.info(f"PDF gerado com sucesso para certificado: {certificate_id}")
        
    except Exception as e:
        logger.error(f"Erro ao gerar PDF para certificado {certificate_id}: {e}")

# Endpoints de relatórios
@app.get("/reports/certificates", tags=["Reports"])
async def get_certificate_report():
    """Gera relatório de certificados"""
    total_certificates = len(certificates_db)
    
    # Estatísticas por status
    status_stats = {}
    for certificate in certificates_db.values():
        status = certificate["status"].value
        if status not in status_stats:
            status_stats[status] = 0
        status_stats[status] += 1
    
    # Estatísticas por tipo
    type_stats = {}
    for certificate in certificates_db.values():
        cert_type = certificate["certificate_type"].value
        if cert_type not in type_stats:
            type_stats[cert_type] = 0
        type_stats[cert_type] += 1
    
    # Certificados emitidos hoje
    today = datetime.utcnow().date()
    today_certificates = len([
        cert for cert in certificates_db.values()
        if datetime.fromisoformat(cert["issued_date"]).date() == today
    ])
    
    return {
        "total_certificates": total_certificates,
        "status_statistics": status_stats,
        "type_statistics": type_stats,
        "today_issued": today_certificates,
        "generated_at": datetime.utcnow().isoformat()
    }

@app.get("/reports/credentials", tags=["Reports"])
async def get_credential_report():
    """Gera relatório de credenciais"""
    total_credentials = len(credentials_db)
    
    # Estatísticas por tipo
    type_stats = {}
    for credential in credentials_db.values():
        cred_type = credential["credential_type"].value
        if cred_type not in type_stats:
            type_stats[cred_type] = 0
        type_stats[cred_type] += 1
    
    # Credenciais ativas vs expiradas
    active_credentials = 0
    expired_credentials = 0
    
    for credential in credentials_db.values():
        if credential["expires_date"]:
            expires_date = datetime.fromisoformat(credential["expires_date"])
            if expires_date > datetime.utcnow():
                active_credentials += 1
            else:
                expired_credentials += 1
        else:
            active_credentials += 1
    
    return {
        "total_credentials": total_credentials,
        "type_statistics": type_stats,
        "active_credentials": active_credentials,
        "expired_credentials": expired_credentials,
        "generated_at": datetime.utcnow().isoformat()
    }

# Endpoints de sistema
@app.get("/health", tags=["System"])
async def health_check():
    """Verifica saúde do sistema de certificados"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "total_certificates": len(certificates_db),
        "total_credentials": len(credentials_db),
        "total_templates": len(templates_db),
        "total_verification_codes": len(verification_codes_db)
    }

# Inicializar dados padrão
initialize_default_templates()

if __name__ == "__main__":
    import uvicorn
    
    print("🏆 Iniciando API de Certificados...")
    print("=" * 50)
    print(f"📋 Templates disponíveis: {len(templates_db)}")
    print(f"🔐 Sistema de verificação: Ativo")
    print("=" * 50)
    
    uvicorn.run(
        "certificates:app",
        host="0.0.0.0",
        port=8006,
        reload=True,
        log_level="info"
    )
