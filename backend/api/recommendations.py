#!/usr/bin/env python3
"""
API para Sistema de Recomendações - Fenix Academy
Integração com Machine Learning para recomendações personalizadas
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import asyncio
import json
import logging
from datetime import datetime
import uuid
import os

# Importar o sistema de recomendações
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ml.recommendation_system import (
    FenixRecommendationSystem,
    UserProfile,
    ContentItem,
    UserInteraction,
    UserActivityType,
    RecommendationType
)

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="Fenix Academy - Recommendations API",
    description="API para sistema de recomendações com Machine Learning",
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

# Inicializar sistema de recomendações
recommendation_system = FenixRecommendationSystem()

# Modelos Pydantic
class UserProfileCreate(BaseModel):
    user_id: str
    interests: List[str]
    skill_level: str
    preferred_categories: List[str]
    learning_goals: List[str]
    time_availability: str
    preferred_format: str

class UserProfileUpdate(BaseModel):
    interests: Optional[List[str]] = None
    skill_level: Optional[str] = None
    preferred_categories: Optional[List[str]] = None
    learning_goals: Optional[List[str]] = None
    time_availability: Optional[str] = None
    preferred_format: Optional[str] = None

class ContentItemCreate(BaseModel):
    item_id: str
    title: str
    category: str
    difficulty: str
    tags: List[str]
    description: str
    content_type: str
    duration: int
    prerequisites: List[str]
    popularity_score: float
    rating: float
    view_count: int

class UserInteractionCreate(BaseModel):
    user_id: str
    item_id: str
    interaction_type: str
    duration: Optional[int] = None
    score: Optional[float] = None
    rating: Optional[int] = None
    feedback: Optional[str] = None

class RecommendationRequest(BaseModel):
    user_id: str
    n_recommendations: int = Field(10, ge=1, le=50)
    recommendation_type: Optional[str] = None
    filters: Optional[Dict[str, Any]] = None

class RecommendationResponse(BaseModel):
    user_id: str
    recommendations: List[Dict[str, Any]]
    total_count: int
    recommendation_type: str
    generated_at: datetime
    metadata: Dict[str, Any]

class UserInsightsRequest(BaseModel):
    user_id: str
    include_history: bool = True
    include_patterns: bool = True
    include_preferences: bool = True

class ModelTrainingRequest(BaseModel):
    model_types: List[str] = ["all"]
    force_retrain: bool = False

class SystemStatusResponse(BaseModel):
    status: str
    models_trained: Dict[str, bool]
    data_stats: Dict[str, Any]
    last_training: str
    system_health: str

# Endpoints principais
@app.get("/", tags=["Root"])
async def root():
    """Endpoint raiz da API de recomendações"""
    return {
        "message": "🤖 Fenix Academy - Recommendations API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "recommendations": "/recommendations",
            "users": "/users/*",
            "content": "/content/*",
            "interactions": "/interactions/*",
            "insights": "/insights/*",
            "training": "/training/*",
            "status": "/status"
        }
    }

@app.post("/recommendations", response_model=RecommendationResponse, tags=["Recommendations"])
async def get_recommendations(request: RecommendationRequest):
    """Gera recomendações personalizadas para um usuário"""
    try:
        # Verificar se usuário existe
        if request.user_id not in recommendation_system.users:
            raise HTTPException(
                status_code=404,
                detail=f"Usuário {request.user_id} não encontrado"
            )
        
        # Determinar tipo de recomendação
        if request.recommendation_type:
            try:
                rec_type = RecommendationType(request.recommendation_type)
            except ValueError:
                raise HTTPException(
                    status_code=400,
                    detail=f"Tipo de recomendação inválido: {request.recommendation_type}"
                )
        else:
            rec_type = None
        
        # Gerar recomendações baseadas no tipo
        if rec_type == RecommendationType.COLLABORATIVE:
            recommendations = recommendation_system.get_collaborative_recommendations(
                request.user_id, request.n_recommendations
            )
        elif rec_type == RecommendationType.CONTENT_BASED:
            recommendations = recommendation_system.get_content_based_recommendations(
                request.user_id, request.n_recommendations
            )
        elif rec_type == RecommendationType.HYBRID:
            recommendations = recommendation_system.get_hybrid_recommendations(
                request.user_id, request.n_recommendations
            )
        elif rec_type == RecommendationType.POPULARITY:
            recommendations = recommendation_system.get_popularity_recommendations(
                request.user_id, request.n_recommendations
            )
        else:
            # Recomendação personalizada (padrão)
            recommendations = recommendation_system.get_personalized_recommendations(
                request.user_id, request.n_recommendations
            )
        
        # Aplicar filtros se especificados
        if request.filters:
            recommendations = apply_filters(recommendations, request.filters)
        
        # Converter para formato de resposta
        recommendations_data = []
        for rec in recommendations:
            # Obter informações do conteúdo
            content_info = {}
            if rec.item_id in recommendation_system.content:
                content = recommendation_system.content[rec.item_id]
                content_info = {
                    "title": content.title,
                    "category": content.category,
                    "difficulty": content.difficulty,
                    "tags": content.tags,
                    "description": content.description,
                    "content_type": content.content_type,
                    "duration": content.duration,
                    "rating": content.rating,
                    "view_count": content.view_count
                }
            
            rec_data = {
                "item_id": rec.item_id,
                "score": rec.score,
                "reason": rec.reason,
                "confidence": rec.confidence,
                "recommendation_type": rec.recommendation_type.value,
                "content_info": content_info,
                "metadata": rec.metadata
            }
            recommendations_data.append(rec_data)
        
        # Determinar tipo de recomendação usado
        if rec_type:
            used_type = rec_type.value
        else:
            used_type = "personalized"
        
        logger.info(f"Recomendações geradas para usuário {request.user_id}: {len(recommendations_data)} itens")
        
        return RecommendationResponse(
            user_id=request.user_id,
            recommendations=recommendations_data,
            total_count=len(recommendations_data),
            recommendation_type=used_type,
            generated_at=datetime.utcnow(),
            metadata={
                "filters_applied": request.filters,
                "user_skill_level": recommendation_system.users[request.user_id].skill_level,
                "user_interests": recommendation_system.users[request.user_id].interests[:5]  # Top 5
            }
        )
        
    except Exception as e:
        logger.error(f"Erro ao gerar recomendações: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

def apply_filters(recommendations: List, filters: Dict[str, Any]) -> List:
    """Aplica filtros às recomendações"""
    filtered_recommendations = recommendations
    
    # Filtrar por categoria
    if "category" in filters:
        category = filters["category"]
        filtered_recommendations = [
            rec for rec in filtered_recommendations
            if rec.item_id in recommendation_system.content and
            recommendation_system.content[rec.item_id].category == category
        ]
    
    # Filtrar por dificuldade
    if "difficulty" in filters:
        difficulty = filters["difficulty"]
        filtered_recommendations = [
            rec for rec in filtered_recommendations
            if rec.item_id in recommendation_system.content and
            recommendation_system.content[rec.item_id].difficulty == difficulty
        ]
    
    # Filtrar por tipo de conteúdo
    if "content_type" in filters:
        content_type = filters["content_type"]
        filtered_recommendations = [
            rec for rec in filtered_recommendations
            if rec.item_id in recommendation_system.content and
            recommendation_system.content[rec.item_id].content_type == content_type
        ]
    
    # Filtrar por duração máxima
    if "max_duration" in filters:
        max_duration = filters["max_duration"]
        filtered_recommendations = [
            rec for rec in filtered_recommendations
            if rec.item_id in recommendation_system.content and
            recommendation_system.content[rec.item_id].duration <= max_duration
        ]
    
    # Filtrar por score mínimo
    if "min_score" in filters:
        min_score = filters["min_score"]
        filtered_recommendations = [
            rec for rec in filtered_recommendations
            if rec.score >= min_score
        ]
    
    return filtered_recommendations

@app.get("/recommendations/{user_id}/similar-users", tags=["Recommendations"])
async def get_similar_users(user_id: str, n_users: int = 5):
    """Encontra usuários similares"""
    try:
        if user_id not in recommendation_system.users:
            raise HTTPException(
                status_code=404,
                detail=f"Usuário {user_id} não encontrado"
            )
        
        similar_users = recommendation_system.get_similar_users(user_id, n_users)
        
        # Adicionar informações dos usuários similares
        similar_users_data = []
        for similar_user_id, similarity in similar_users:
            if similar_user_id in recommendation_system.users:
                user_profile = recommendation_system.users[similar_user_id]
                similar_users_data.append({
                    "user_id": similar_user_id,
                    "similarity_score": similarity,
                    "username": getattr(user_profile, 'username', 'N/A'),
                    "skill_level": user_profile.skill_level,
                    "interests": user_profile.interests[:5],  # Top 5 interesses
                    "completion_rate": user_profile.completion_rate
                })
        
        return {
            "user_id": user_id,
            "similar_users": similar_users_data,
            "total_count": len(similar_users_data),
            "generated_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao buscar usuários similares: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/recommendations/{user_id}/similar-content", tags=["Recommendations"])
async def get_similar_content(user_id: str, item_id: str, n_items: int = 5):
    """Encontra conteúdo similar a um item específico"""
    try:
        if user_id not in recommendation_system.users:
            raise HTTPException(
                status_code=404,
                detail=f"Usuário {user_id} não encontrado"
            )
        
        if item_id not in recommendation_system.content:
            raise HTTPException(
                status_code=404,
                detail=f"Item de conteúdo {item_id} não encontrado"
            )
        
        similar_items = recommendation_system.get_similar_content(item_id, n_items)
        
        # Adicionar informações dos itens similares
        similar_items_data = []
        for similar_item_id, similarity in similar_items:
            if similar_item_id in recommendation_system.content:
                content = recommendation_system.content[similar_item_id]
                similar_items_data.append({
                    "item_id": similar_item_id,
                    "similarity_score": similarity,
                    "title": content.title,
                    "category": content.category,
                    "difficulty": content.difficulty,
                    "tags": content.tags,
                    "rating": content.rating
                })
        
        return {
            "user_id": user_id,
            "base_item_id": item_id,
            "similar_items": similar_items_data,
            "total_count": len(similar_items_data),
            "generated_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao buscar conteúdo similar: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Endpoints de usuários
@app.post("/users", tags=["Users"])
async def create_user_profile(user_profile: UserProfileCreate):
    """Cria novo perfil de usuário"""
    try:
        # Criar perfil de usuário
        new_profile = UserProfile(
            user_id=user_profile.user_id,
            interests=user_profile.interests,
            skill_level=user_profile.skill_level,
            preferred_categories=user_profile.preferred_categories,
            learning_goals=user_profile.learning_goals,
            time_availability=user_profile.time_availability,
            preferred_format=user_profile.preferred_format,
            last_activity=datetime.utcnow(),
            total_courses=0,
            completion_rate=0.0,
            average_score=0.0
        )
        
        recommendation_system.add_user(new_profile)
        
        logger.info(f"Perfil de usuário criado: {user_profile.user_id}")
        
        return {
            "message": "Perfil de usuário criado com sucesso",
            "user_id": user_profile.user_id,
            "created_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao criar perfil de usuário: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.put("/users/{user_id}", tags=["Users"])
async def update_user_profile(user_id: str, user_update: UserProfileUpdate):
    """Atualiza perfil de usuário existente"""
    try:
        if user_id not in recommendation_system.users:
            raise HTTPException(
                status_code=404,
                detail=f"Usuário {user_id} não encontrado"
            )
        
        user_profile = recommendation_system.users[user_id]
        
        # Atualizar campos fornecidos
        if user_update.interests is not None:
            user_profile.interests = user_update.interests
        if user_update.skill_level is not None:
            user_profile.skill_level = user_update.skill_level
        if user_update.preferred_categories is not None:
            user_profile.preferred_categories = user_update.preferred_categories
        if user_update.learning_goals is not None:
            user_profile.learning_goals = user_update.learning_goals
        if user_update.time_availability is not None:
            user_profile.time_availability = user_update.time_availability
        if user_update.preferred_format is not None:
            user_profile.preferred_format = user_update.preferred_format
        
        user_profile.last_activity = datetime.utcnow()
        
        logger.info(f"Perfil de usuário atualizado: {user_id}")
        
        return {
            "message": "Perfil de usuário atualizado com sucesso",
            "user_id": user_id,
            "updated_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao atualizar perfil de usuário: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/users/{user_id}", tags=["Users"])
async def get_user_profile(user_id: str):
    """Obtém perfil de usuário"""
    try:
        if user_id not in recommendation_system.users:
            raise HTTPException(
                status_code=404,
                detail=f"Usuário {user_id} não encontrado"
            )
        
        user_profile = recommendation_system.users[user_id]
        
        return {
            "user_id": user_profile.user_id,
            "interests": user_profile.interests,
            "skill_level": user_profile.skill_level,
            "preferred_categories": user_profile.preferred_categories,
            "learning_goals": user_profile.learning_goals,
            "time_availability": user_profile.time_availability,
            "preferred_format": user_profile.preferred_format,
            "last_activity": user_profile.last_activity.isoformat(),
            "total_courses": user_profile.total_courses,
            "completion_rate": user_profile.completion_rate,
            "average_score": user_profile.average_score
        }
        
    except Exception as e:
        logger.error(f"Erro ao obter perfil de usuário: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Endpoints de conteúdo
@app.post("/content", tags=["Content"])
async def add_content_item(content_item: ContentItemCreate):
    """Adiciona novo item de conteúdo"""
    try:
        new_content = ContentItem(
            item_id=content_item.item_id,
            title=content_item.title,
            category=content_item.category,
            difficulty=content_item.difficulty,
            tags=content_item.tags,
            description=content_item.description,
            content_type=content_item.content_type,
            duration=content_item.duration,
            prerequisites=content_item.prerequisites,
            popularity_score=content_item.popularity_score,
            rating=content_item.rating,
            view_count=content_item.view_count
        )
        
        recommendation_system.add_content(new_content)
        
        logger.info(f"Item de conteúdo adicionado: {content_item.item_id}")
        
        return {
            "message": "Item de conteúdo adicionado com sucesso",
            "item_id": content_item.item_id,
            "created_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao adicionar item de conteúdo: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/content/{item_id}", tags=["Content"])
async def get_content_item(item_id: str):
    """Obtém item de conteúdo específico"""
    try:
        if item_id not in recommendation_system.content:
            raise HTTPException(
                status_code=404,
                detail=f"Item de conteúdo {item_id} não encontrado"
            )
        
        content = recommendation_system.content[item_id]
        
        return {
            "item_id": content.item_id,
            "title": content.title,
            "category": content.category,
            "difficulty": content.difficulty,
            "tags": content.tags,
            "description": content.description,
            "content_type": content.content_type,
            "duration": content.duration,
            "prerequisites": content.prerequisites,
            "popularity_score": content.popularity_score,
            "rating": content.rating,
            "view_count": content.view_count
        }
        
    except Exception as e:
        logger.error(f"Erro ao obter item de conteúdo: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Endpoints de interações
@app.post("/interactions", tags=["Interactions"])
async def add_user_interaction(interaction: UserInteractionCreate):
    """Registra nova interação do usuário"""
    try:
        # Validar tipo de interação
        try:
            interaction_type = UserActivityType(interaction.interaction_type)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail=f"Tipo de interação inválido: {interaction.interaction_type}"
            )
        
        # Criar interação
        new_interaction = UserInteraction(
            user_id=interaction.user_id,
            item_id=interaction.item_id,
            interaction_type=interaction_type,
            timestamp=datetime.utcnow(),
            duration=interaction.duration,
            score=interaction.score,
            rating=interaction.rating,
            feedback=interaction.feedback
        )
        
        recommendation_system.add_interaction(new_interaction)
        
        # Atualizar perfil do usuário
        recommendation_system.update_user_profile(
            interaction.user_id, [new_interaction]
        )
        
        logger.info(f"Interação registrada: {interaction.user_id} -> {interaction.item_id}")
        
        return {
            "message": "Interação registrada com sucesso",
            "interaction_id": str(uuid.uuid4()),
            "timestamp": new_interaction.timestamp.isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao registrar interação: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Endpoints de insights
@app.post("/insights", tags=["Insights"])
async def get_user_insights(request: UserInsightsRequest):
    """Obtém insights detalhados sobre um usuário"""
    try:
        if request.user_id not in recommendation_system.users:
            raise HTTPException(
                status_code=404,
                detail=f"Usuário {request.user_id} não encontrado"
            )
        
        insights = recommendation_system.get_recommendation_insights(request.user_id)
        
        # Filtrar insights baseado na requisição
        filtered_insights = {}
        
        if request.include_history:
            filtered_insights["recommendation_history"] = insights.get("recommendation_history", [])
        
        if request.include_preferences:
            filtered_insights["preferences_evolution"] = insights.get("preferences_evolution", {})
        
        if request.include_patterns:
            filtered_insights["learning_patterns"] = insights.get("learning_patterns", {})
        
        return {
            "user_id": request.user_id,
            "insights": filtered_insights,
            "generated_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao obter insights: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Endpoints de treinamento
@app.post("/training", tags=["Training"])
async def train_models(request: ModelTrainingRequest, background_tasks: BackgroundTasks):
    """Inicia treinamento dos modelos de ML"""
    try:
        # Adicionar tarefa de treinamento em background
        background_tasks.add_task(train_models_background, request)
        
        return {
            "message": "Treinamento iniciado em background",
            "model_types": request.model_types,
            "force_retrain": request.force_retrain,
            "status": "queued",
            "started_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao iniciar treinamento: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

async def train_models_background(request: ModelTrainingRequest):
    """Executa treinamento dos modelos em background"""
    try:
        logger.info("Iniciando treinamento em background...")
        
        if "all" in request.model_types or request.force_retrain:
            recommendation_system.train_all_models()
        else:
            for model_type in request.model_types:
                if model_type == "collaborative":
                    recommendation_system.train_collaborative_model()
                elif model_type == "content":
                    recommendation_system.train_content_based_model()
                elif model_type == "hybrid":
                    recommendation_system.train_hybrid_model()
        
        logger.info("Treinamento em background concluído com sucesso")
        
    except Exception as e:
        logger.error(f"Erro durante treinamento em background: {str(e)}")

@app.get("/training/status", tags=["Training"])
async def get_training_status():
    """Obtém status do treinamento dos modelos"""
    try:
        status = recommendation_system.get_system_status()
        
        return {
            "training_status": status,
            "last_check": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Erro ao obter status de treinamento: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Endpoints de sistema
@app.get("/status", response_model=SystemStatusResponse, tags=["System"])
async def get_system_status():
    """Obtém status geral do sistema"""
    try:
        status = recommendation_system.get_system_status()
        
        # Determinar saúde do sistema
        system_health = "healthy"
        if not any(status["models_trained"].values()):
            system_health = "no_models"
        elif status["data_stats"]["total_users"] == 0:
            system_health = "no_data"
        
        return SystemStatusResponse(
            status=status["status"],
            models_trained=status["models_trained"],
            data_stats=status["data_stats"],
            last_training=status["last_training"],
            system_health=system_health
        )
        
    except Exception as e:
        logger.error(f"Erro ao obter status do sistema: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/health", tags=["System"])
async def health_check():
    """Verifica saúde do sistema de recomendações"""
    try:
        status = recommendation_system.get_system_status()
        
        return {
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "models_available": any(status["models_trained"].values()),
            "data_available": status["data_stats"]["total_users"] > 0,
            "system_status": status["status"]
        }
        
    except Exception as e:
        logger.error(f"Erro no health check: {str(e)}")
        return {
            "status": "unhealthy",
            "timestamp": datetime.utcnow().isoformat(),
            "error": str(e)
        }

# Middleware para logging
@app.middleware("http")
async def log_requests(request, call_next):
    start_time = datetime.utcnow()
    
    # Processar request
    response = await call_next(request)
    
    # Calcular tempo de processamento
    process_time = (datetime.utcnow() - start_time).total_seconds()
    
    # Log da requisição
    logger.info(
        f"{request.method} {request.url.path} - "
        f"Status: {response.status_code} - "
        f"Tempo: {process_time:.3f}s"
    )
    
    return response

if __name__ == "__main__":
    import uvicorn
    
    print("🤖 Iniciando API de Recomendações...")
    print("=" * 50)
    
    # Verificar status do sistema
    try:
        status = recommendation_system.get_system_status()
        print(f"🏥 Status: {status['status']}")
        print(f"📊 Usuários: {status['data_stats']['total_users']}")
        print(f"📚 Conteúdo: {status['data_stats']['total_content']}")
        print(f"🔄 Interações: {status['data_stats']['total_interactions']}")
        print(f"🤖 Modelos treinados: {sum(status['models_trained'].values())}/{len(status['models_trained'])}")
    except Exception as e:
        print(f"❌ Erro ao verificar status: {e}")
    
    print("=" * 50)
    
    # Iniciar servidor
    uvicorn.run(
        "recommendations:app",
        host="0.0.0.0",
        port=8003,
        reload=True,
        log_level="info"
    )
