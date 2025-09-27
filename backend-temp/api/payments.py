#!/usr/bin/env python3
"""
Sistema de Pagamentos e Assinaturas - Fenix Academy
Integração com Stripe, gestão de planos e cobrança
"""

from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import stripe
import json
import logging
from datetime import datetime, timedelta
import uuid
import os
from enum import Enum

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configurar Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_...")

# Inicializar FastAPI
app = FastAPI(
    title="Fenix Academy - Payments API",
    description="Sistema de pagamentos e assinaturas",
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
class PlanType(str, Enum):
    BASIC = "basic"
    PROFESSIONAL = "professional"
    ENTERPRISE = "enterprise"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"
    CANCELLED = "cancelled"

class SubscriptionStatus(str, Enum):
    ACTIVE = "active"
    CANCELLED = "cancelled"
    PAST_DUE = "past_due"
    UNPAID = "unpaid"
    TRIAL = "trial"

# Modelos Pydantic
class PlanCreate(BaseModel):
    name: str
    type: PlanType
    price_monthly: float
    price_yearly: float
    features: List[str]
    max_users: Optional[int] = None
    max_projects: Optional[int] = None
    code_execution_limit: Optional[int] = None
    ml_recommendations: bool = False
    priority_support: bool = False

class SubscriptionCreate(BaseModel):
    user_id: str
    plan_type: PlanType
    billing_cycle: str = "monthly"  # monthly, yearly
    payment_method_id: str
    trial_days: int = 7

class PaymentIntentCreate(BaseModel):
    amount: int  # em centavos
    currency: str = "usd"
    customer_id: str
    description: str
    metadata: Optional[Dict[str, Any]] = None

class WebhookEvent(BaseModel):
    type: str
    data: Dict[str, Any]

# Dados em memória (em produção, usar banco de dados)
plans_db: Dict[str, Dict] = {}
subscriptions_db: Dict[str, Dict] = {}
customers_db: Dict[str, Dict] = {}
payments_db: Dict[str, Dict] = {}

# Inicializar planos padrão
def initialize_default_plans():
    """Inicializa planos padrão da plataforma"""
    default_plans = [
        {
            "id": "plan_basic",
            "name": "Plano Básico",
            "type": PlanType.BASIC,
            "price_monthly": 29.00,
            "price_yearly": 290.00,  # 2 meses grátis
            "features": [
                "Acesso a todos os 20 cursos",
                "Elementos interativos básicos",
                "Quizzes e simuladores",
                "Certificados de conclusão",
                "Suporte por email"
            ],
            "max_users": 1,
            "max_projects": 3,
            "code_execution_limit": 100,
            "ml_recommendations": False,
            "priority_support": False
        },
        {
            "id": "plan_professional",
            "name": "Plano Profissional",
            "type": PlanType.PROFESSIONAL,
            "price_monthly": 59.00,
            "price_yearly": 590.00,  # 2 meses grátis
            "features": [
                "TUDO DO PLANO BÁSICO",
                "Execução de código em tempo real",
                "Projetos colaborativos ilimitados",
                "Analytics avançados",
                "Suporte prioritário",
                "API access básico"
            ],
            "max_users": 5,
            "max_projects": 20,
            "code_execution_limit": 1000,
            "ml_recommendations": True,
            "priority_support": True
        },
        {
            "id": "plan_enterprise",
            "name": "Plano Enterprise",
            "type": PlanType.ENTERPRISE,
            "price_monthly": 99.00,
            "price_yearly": 990.00,  # 2 meses grátis
            "features": [
                "TUDO DO PLANO PROFISSIONAL",
                "Recomendações personalizadas com ML",
                "API access completo",
                "Relatórios customizados",
                "Onboarding dedicado",
                "Suporte 24/7",
                "Integração com sistemas corporativos"
            ],
            "max_users": -1,  # Ilimitado
            "max_projects": -1,  # Ilimitado
            "code_execution_limit": -1,  # Ilimitado
            "ml_recommendations": True,
            "priority_support": True
        }
    ]
    
    for plan in default_plans:
        plans_db[plan["id"]] = plan
    
    logger.info(f"Planos padrão inicializados: {len(plans_db)}")

# Endpoints principais
@app.get("/", tags=["Root"])
async def root():
    """Endpoint raiz da API de pagamentos"""
    return {
        "message": "💳 Fenix Academy - Payments API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "plans": "/plans/*",
            "subscriptions": "/subscriptions/*",
            "payments": "/payments/*",
            "webhooks": "/webhooks/*"
        }
    }

# Endpoints de planos
@app.get("/plans", tags=["Plans"])
async def list_plans():
    """Lista todos os planos disponíveis"""
    return {
        "plans": list(plans_db.values()),
        "total": len(plans_db)
    }

@app.get("/plans/{plan_id}", tags=["Plans"])
async def get_plan(plan_id: str):
    """Obtém detalhes de um plano específico"""
    if plan_id not in plans_db:
        raise HTTPException(
            status_code=404,
            detail="Plano não encontrado"
        )
    
    return plans_db[plan_id]

@app.post("/plans", tags=["Plans"])
async def create_plan(plan: PlanCreate):
    """Cria novo plano (apenas admin)"""
    plan_id = f"plan_{uuid.uuid4().hex[:8]}"
    
    new_plan = {
        "id": plan_id,
        "name": plan.name,
        "type": plan.type,
        "price_monthly": plan.price_monthly,
        "price_yearly": plan.price_yearly,
        "features": plan.features,
        "max_users": plan.max_users,
        "max_projects": plan.max_projects,
        "code_execution_limit": plan.code_execution_limit,
        "ml_recommendations": plan.ml_recommendations,
        "priority_support": plan.priority_support,
        "created_at": datetime.utcnow().isoformat()
    }
    
    plans_db[plan_id] = new_plan
    
    logger.info(f"Plano criado: {plan.name}")
    
    return {
        "message": "Plano criado com sucesso",
        "plan": new_plan
    }

# Endpoints de assinaturas
@app.post("/subscriptions", tags=["Subscriptions"])
async def create_subscription(subscription: SubscriptionCreate):
    """Cria nova assinatura"""
    # Verificar se plano existe
    plan_type = subscription.plan_type.value
    plan = None
    for p in plans_db.values():
        if p["type"] == subscription.plan_type:
            plan = p
            break
    
    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Plano não encontrado"
        )
    
    # Calcular preço baseado no ciclo de cobrança
    if subscription.billing_cycle == "yearly":
        price = plan["price_yearly"]
        interval = "year"
    else:
        price = plan["price_monthly"]
        interval = "month"
    
    # Criar customer no Stripe se não existir
    customer_id = None
    if subscription.user_id in customers_db:
        customer_id = customers_db[subscription.user_id]["stripe_customer_id"]
    else:
        # Criar customer no Stripe
        try:
            customer = stripe.Customer.create(
                metadata={"user_id": subscription.user_id}
            )
            customer_id = customer.id
            
            customers_db[subscription.user_id] = {
                "user_id": subscription.user_id,
                "stripe_customer_id": customer_id,
                "created_at": datetime.utcnow().isoformat()
            }
        except Exception as e:
            logger.error(f"Erro ao criar customer no Stripe: {e}")
            raise HTTPException(
                status_code=500,
                detail="Erro ao processar pagamento"
            )
    
    # Criar assinatura
    subscription_id = str(uuid.uuid4())
    
    new_subscription = {
        "id": subscription_id,
        "user_id": subscription.user_id,
        "plan_type": subscription.plan_type,
        "plan_id": plan["id"],
        "billing_cycle": subscription.billing_cycle,
        "price": price,
        "status": SubscriptionStatus.TRIAL,
        "trial_end": (datetime.utcnow() + timedelta(days=subscription.trial_days)).isoformat(),
        "current_period_start": datetime.utcnow().isoformat(),
        "current_period_end": (datetime.utcnow() + timedelta(days=30 if interval == "month" else 365)).isoformat(),
        "created_at": datetime.utcnow().isoformat(),
        "stripe_customer_id": customer_id
    }
    
    subscriptions_db[subscription_id] = new_subscription
    
    logger.info(f"Assinatura criada: {subscription_id} para usuário {subscription.user_id}")
    
    return {
        "message": "Assinatura criada com sucesso",
        "subscription": new_subscription,
        "trial_days": subscription.trial_days
    }

@app.get("/subscriptions/{subscription_id}", tags=["Subscriptions"])
async def get_subscription(subscription_id: str):
    """Obtém detalhes de uma assinatura"""
    if subscription_id not in subscriptions_db:
        raise HTTPException(
            status_code=404,
            detail="Assinatura não encontrada"
        )
    
    return subscriptions_db[subscription_id]

@app.get("/subscriptions/user/{user_id}", tags=["Subscriptions"])
async def get_user_subscriptions(user_id: str):
    """Obtém assinaturas de um usuário"""
    user_subscriptions = [
        sub for sub in subscriptions_db.values()
        if sub["user_id"] == user_id
    ]
    
    return {
        "user_id": user_id,
        "subscriptions": user_subscriptions,
        "total": len(user_subscriptions)
    }

@app.put("/subscriptions/{subscription_id}/cancel", tags=["Subscriptions"])
async def cancel_subscription(subscription_id: str):
    """Cancela uma assinatura"""
    if subscription_id not in subscriptions_db:
        raise HTTPException(
            status_code=404,
            detail="Assinatura não encontrada"
        )
    
    subscription = subscriptions_db[subscription_id]
    subscription["status"] = SubscriptionStatus.CANCELLED
    subscription["cancelled_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Assinatura cancelada: {subscription_id}")
    
    return {
        "message": "Assinatura cancelada com sucesso",
        "subscription": subscription
    }

# Endpoints de pagamentos
@app.post("/payments/create-intent", tags=["Payments"])
async def create_payment_intent(payment: PaymentIntentCreate):
    """Cria intent de pagamento no Stripe"""
    try:
        intent = stripe.PaymentIntent.create(
            amount=payment.amount,
            currency=payment.currency,
            customer=payment.customer_id,
            description=payment.description,
            metadata=payment.metadata or {}
        )
        
        # Armazenar intent
        intent_id = intent.id
        payments_db[intent_id] = {
            "intent_id": intent_id,
            "amount": payment.amount,
            "currency": payment.currency,
            "customer_id": payment.customer_id,
            "description": payment.description,
            "status": PaymentStatus.PENDING,
            "created_at": datetime.utcnow().isoformat()
        }
        
        return {
            "client_secret": intent.client_secret,
            "intent_id": intent_id,
            "amount": payment.amount,
            "currency": payment.currency
        }
        
    except Exception as e:
        logger.error(f"Erro ao criar payment intent: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erro ao processar pagamento"
        )

@app.get("/payments/{payment_id}", tags=["Payments"])
async def get_payment(payment_id: str):
    """Obtém detalhes de um pagamento"""
    if payment_id not in payments_db:
        raise HTTPException(
            status_code=404,
            detail="Pagamento não encontrado"
        )
    
    return payments_db[payment_id]

@app.post("/payments/{payment_id}/refund", tags=["Payments"])
async def refund_payment(payment_id: str, amount: Optional[int] = None):
    """Processa reembolso de um pagamento"""
    if payment_id not in payments_db:
        raise HTTPException(
            status_code=404,
            detail="Pagamento não encontrado"
        )
    
    payment = payments_db[payment_id]
    
    try:
        # Processar reembolso no Stripe
        refund = stripe.Refund.create(
            payment_intent=payment_id,
            amount=amount or payment["amount"]
        )
        
        # Atualizar status
        payment["status"] = PaymentStatus.REFUNDED
        payment["refunded_at"] = datetime.utcnow().isoformat()
        payment["refund_amount"] = amount or payment["amount"]
        
        logger.info(f"Reembolso processado: {payment_id}")
        
        return {
            "message": "Reembolso processado com sucesso",
            "refund_id": refund.id,
            "amount": refund.amount
        }
        
    except Exception as e:
        logger.error(f"Erro ao processar reembolso: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erro ao processar reembolso"
        )

# Endpoints de webhooks
@app.post("/webhooks/stripe", tags=["Webhooks"])
async def stripe_webhook(background_tasks: BackgroundTasks):
    """Processa webhooks do Stripe"""
    # Em produção, verificar assinatura do webhook
    try:
        event = stripe.Webhook.construct_event(
            request.body,
            request.headers.get('stripe-signature'),
            os.getenv("STRIPE_WEBHOOK_SECRET", "")
        )
        
        # Processar evento em background
        background_tasks.add_task(process_stripe_event, event)
        
        return {"status": "webhook received"}
        
    except Exception as e:
        logger.error(f"Erro no webhook: {e}")
        raise HTTPException(status_code=400)

async def process_stripe_event(event: Dict[str, Any]):
    """Processa eventos do Stripe em background"""
    event_type = event["type"]
    
    try:
        if event_type == "payment_intent.succeeded":
            await handle_payment_success(event["data"]["object"])
        elif event_type == "payment_intent.payment_failed":
            await handle_payment_failure(event["data"]["object"])
        elif event_type == "invoice.payment_succeeded":
            await handle_invoice_success(event["data"]["object"])
        elif event_type == "invoice.payment_failed":
            await handle_invoice_failure(event["data"]["object"])
        elif event_type == "customer.subscription.deleted":
            await handle_subscription_cancelled(event["data"]["object"])
        
        logger.info(f"Evento processado: {event_type}")
        
    except Exception as e:
        logger.error(f"Erro ao processar evento {event_type}: {e}")

async def handle_payment_success(payment_intent: Dict[str, Any]):
    """Processa pagamento bem-sucedido"""
    payment_id = payment_intent["id"]
    
    if payment_id in payments_db:
        payments_db[payment_id]["status"] = PaymentStatus.COMPLETED
        payments_db[payment_id]["completed_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Pagamento confirmado: {payment_id}")

async def handle_payment_failure(payment_intent: Dict[str, Any]):
    """Processa falha no pagamento"""
    payment_id = payment_intent["id"]
    
    if payment_id in payments_db:
        payments_db[payment_id]["status"] = PaymentStatus.FAILED
        payments_db[payment_id]["failed_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Pagamento falhou: {payment_id}")

async def handle_invoice_success(invoice: Dict[str, Any]):
    """Processa fatura paga com sucesso"""
    customer_id = invoice["customer"]
    
    # Atualizar assinaturas do usuário
    for subscription in subscriptions_db.values():
        if subscription["stripe_customer_id"] == customer_id:
            subscription["status"] = SubscriptionStatus.ACTIVE
            subscription["last_payment"] = datetime.utcnow().isoformat()
    
    logger.info(f"Fatura paga: {invoice['id']}")

async def handle_invoice_failure(invoice: Dict[str, Any]):
    """Processa falha no pagamento da fatura"""
    customer_id = invoice["customer"]
    
    # Atualizar assinaturas do usuário
    for subscription in subscriptions_db.values():
        if subscription["stripe_customer_id"] == customer_id:
            subscription["status"] = SubscriptionStatus.PAST_DUE
    
    logger.info(f"Falha na fatura: {invoice['id']}")

async def handle_subscription_cancelled(subscription: Dict[str, Any]):
    """Processa cancelamento de assinatura"""
    customer_id = subscription["customer"]
    
    # Atualizar assinaturas do usuário
    for sub in subscriptions_db.values():
        if sub["stripe_customer_id"] == customer_id:
            sub["status"] = SubscriptionStatus.CANCELLED
            sub["cancelled_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Assinatura cancelada: {subscription['id']}")

# Endpoints de relatórios
@app.get("/reports/subscriptions", tags=["Reports"])
async def get_subscription_report():
    """Gera relatório de assinaturas"""
    total_subscriptions = len(subscriptions_db)
    active_subscriptions = len([
        sub for sub in subscriptions_db.values()
        if sub["status"] == SubscriptionStatus.ACTIVE
    ])
    
    # Estatísticas por plano
    plan_stats = {}
    for subscription in subscriptions_db.values():
        plan_type = subscription["plan_type"].value
        if plan_type not in plan_stats:
            plan_stats[plan_type] = {"total": 0, "active": 0}
        
        plan_stats[plan_type]["total"] += 1
        if subscription["status"] == SubscriptionStatus.ACTIVE:
            plan_stats[plan_type]["active"] += 1
    
    # Receita mensal estimada
    monthly_revenue = 0
    for subscription in subscriptions_db.values():
        if subscription["status"] == SubscriptionStatus.ACTIVE:
            if subscription["billing_cycle"] == "monthly":
                monthly_revenue += subscription["price"]
            else:
                monthly_revenue += subscription["price"] / 12
    
    return {
        "total_subscriptions": total_subscriptions,
        "active_subscriptions": active_subscriptions,
        "plan_statistics": plan_stats,
        "estimated_monthly_revenue": round(monthly_revenue, 2),
        "generated_at": datetime.utcnow().isoformat()
    }

@app.get("/reports/payments", tags=["Reports"])
async def get_payment_report():
    """Gera relatório de pagamentos"""
    total_payments = len(payments_db)
    completed_payments = len([
        p for p in payments_db.values()
        if p["status"] == PaymentStatus.COMPLETED
    ])
    
    # Receita total
    total_revenue = sum([
        p["amount"] for p in payments_db.values()
        if p["status"] == PaymentStatus.COMPLETED
    ]) / 100  # Converter de centavos
    
    # Estatísticas por status
    status_stats = {}
    for payment in payments_db.values():
        status = payment["status"].value
        if status not in status_stats:
            status_stats[status] = 0
        status_stats[status] += 1
    
    return {
        "total_payments": total_payments,
        "completed_payments": completed_payments,
        "total_revenue": round(total_revenue, 2),
        "status_statistics": status_stats,
        "generated_at": datetime.utcnow().isoformat()
    }

# Endpoints de sistema
@app.get("/health", tags=["System"])
async def health_check():
    """Verifica saúde do sistema de pagamentos"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "stripe_connected": bool(stripe.api_key and stripe.api_key != "sk_test_..."),
        "total_plans": len(plans_db),
        "total_subscriptions": len(subscriptions_db),
        "total_customers": len(customers_db),
        "total_payments": len(payments_db)
    }

# Inicializar dados padrão
initialize_default_plans()

if __name__ == "__main__":
    import uvicorn
    
    print("💳 Iniciando API de Pagamentos...")
    print("=" * 50)
    print(f"📊 Planos disponíveis: {len(plans_db)}")
    print(f"🔑 Stripe configurado: {'Sim' if stripe.api_key != 'sk_test_...' else 'Não'}")
    print("=" * 50)
    
    uvicorn.run(
        "payments:app",
        host="0.0.0.0",
        port=8004,
        reload=True,
        log_level="info"
    )
