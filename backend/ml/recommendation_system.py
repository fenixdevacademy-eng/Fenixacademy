#!/usr/bin/env python3
"""
Sistema de Machine Learning para Recomendações Personalizadas - Fenix Academy
Algoritmos de Colaboração, Conteúdo e Híbridos para Recomendações Inteligentes
"""

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import NMF
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.cluster import KMeans
import joblib
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional, Union
from dataclasses import dataclass
from enum import Enum
import uuid
import os
import pickle
from collections import defaultdict, Counter
import math

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Enums
class RecommendationType(str, Enum):
    COLLABORATIVE = "collaborative"
    CONTENT_BASED = "content_based"
    HYBRID = "hybrid"
    POPULARITY = "popularity"
    RECENCY = "recency"

class UserActivityType(str, Enum):
    COURSE_VIEW = "course_view"
    LESSON_COMPLETE = "lesson_complete"
    QUIZ_ATTEMPT = "quiz_attempt"
    PROJECT_JOIN = "project_join"
    CODE_EXECUTE = "code_execute"
    SIMULATOR_USE = "simulator_use"

class ContentCategory(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    THEORETICAL = "theoretical"
    PRACTICAL = "practical"
    PROJECT_BASED = "project_based"

# Modelos de dados
@dataclass
class UserProfile:
    user_id: str
    interests: List[str]
    skill_level: str
    preferred_categories: List[str]
    learning_goals: List[str]
    time_availability: str
    preferred_format: str
    last_activity: datetime
    total_courses: int
    completion_rate: float
    average_score: float

@dataclass
class ContentItem:
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

@dataclass
class UserInteraction:
    user_id: str
    item_id: str
    interaction_type: UserActivityType
    timestamp: datetime
    duration: Optional[int] = None
    score: Optional[float] = None
    rating: Optional[int] = None
    feedback: Optional[str] = None

@dataclass
class Recommendation:
    item_id: str
    score: float
    reason: str
    confidence: float
    recommendation_type: RecommendationType
    metadata: Dict

# Sistema de Recomendações
class FenixRecommendationSystem:
    def __init__(self, model_path: str = "models/"):
        """Inicializa o sistema de recomendações"""
        self.model_path = model_path
        os.makedirs(model_path, exist_ok=True)
        
        # Modelos ML
        self.collaborative_model = None
        self.content_model = None
        self.hybrid_model = None
        
        # Vetorizadores e escaladores
        self.tfidf_vectorizer = TfidfVectorizer(
            max_features=1000,
            stop_words='english',
            ngram_range=(1, 2)
        )
        self.scaler = StandardScaler()
        
        # Dados
        self.users: Dict[str, UserProfile] = {}
        self.content: Dict[str, ContentItem] = {}
        self.interactions: List[UserInteraction] = []
        
        # Matrizes de similaridade
        self.user_similarity_matrix = None
        self.content_similarity_matrix = None
        
        # Configurações
        self.min_interactions = 5
        self.recommendation_count = 10
        self.similarity_threshold = 0.3
        
        # Carregar modelos salvos se existirem
        self.load_models()
        
        logger.info("Sistema de Recomendações Fenix inicializado")

    def add_user(self, user_profile: UserProfile):
        """Adiciona ou atualiza perfil de usuário"""
        self.users[user_profile.user_id] = user_profile
        logger.info(f"Usuário {user_profile.user_id} adicionado/atualizado")

    def add_content(self, content_item: ContentItem):
        """Adiciona ou atualiza item de conteúdo"""
        self.content[content_item.item_id] = content_item
        logger.info(f"Conteúdo {content_item.item_id} adicionado/atualizado")

    def add_interaction(self, interaction: UserInteraction):
        """Adiciona interação do usuário"""
        self.interactions.append(interaction)
        logger.info(f"Interação registrada: {interaction.user_id} -> {interaction.item_id}")

    def _create_user_item_matrix(self) -> Tuple[np.ndarray, List[str], List[str]]:
        """Cria matriz usuário-item para análise colaborativa"""
        if not self.interactions:
            return np.array([]), [], []
        
        # Criar DataFrame de interações
        df = pd.DataFrame([
            {
                'user_id': i.user_id,
                'item_id': i.item_id,
                'rating': i.rating or 0,
                'duration': i.duration or 0,
                'score': i.score or 0
            }
            for i in self.interactions
        ])
        
        # Criar matriz pivot
        user_item_matrix = df.pivot_table(
            index='user_id',
            columns='item_id',
            values='rating',
            fill_value=0
        )
        
        return user_item_matrix.values, user_item_matrix.index.tolist(), user_item_matrix.columns.tolist()

    def _create_content_features_matrix(self) -> np.ndarray:
        """Cria matriz de características do conteúdo"""
        if not self.content:
            return np.array([])
        
        # Extrair características do conteúdo
        content_texts = []
        for item in self.content.values():
            text = f"{item.title} {item.description} {' '.join(item.tags)}"
            content_texts.append(text)
        
        # Aplicar TF-IDF
        tfidf_matrix = self.tfidf_vectorizer.fit_transform(content_texts)
        return tfidf_matrix.toarray()

    def train_collaborative_model(self):
        """Treina modelo colaborativo baseado em filtragem"""
        logger.info("Treinando modelo colaborativo...")
        
        user_item_matrix, user_ids, item_ids = self._create_user_item_matrix()
        
        if user_item_matrix.size == 0:
            logger.warning("Sem dados suficientes para treinar modelo colaborativo")
            return
        
        # Normalizar dados
        user_item_matrix_scaled = self.scaler.fit_transform(user_item_matrix)
        
        # Aplicar NMF para redução de dimensionalidade
        n_components = min(20, min(user_item_matrix.shape))
        self.collaborative_model = NMF(n_components=n_components, random_state=42)
        
        # Treinar modelo
        user_factors = self.collaborative_model.fit_transform(user_item_matrix_scaled)
        item_factors = self.collaborative_model.components_
        
        # Calcular similaridade entre usuários
        self.user_similarity_matrix = cosine_similarity(user_factors)
        
        # Salvar modelo
        self._save_model('collaborative', {
            'model': self.collaborative_model,
            'user_factors': user_factors,
            'item_factors': item_factors,
            'user_ids': user_ids,
            'item_ids': item_ids,
            'scaler': self.scaler
        })
        
        logger.info("Modelo colaborativo treinado com sucesso")

    def train_content_based_model(self):
        """Treina modelo baseado em conteúdo"""
        logger.info("Treinando modelo baseado em conteúdo...")
        
        content_features = self._create_content_features_matrix()
        
        if content_features.size == 0:
            logger.warning("Sem dados suficientes para treinar modelo baseado em conteúdo")
            return
        
        # Calcular similaridade entre itens de conteúdo
        self.content_similarity_matrix = cosine_similarity(content_features)
        
        # Salvar modelo
        self._save_model('content', {
            'tfidf_vectorizer': self.tfidf_vectorizer,
            'content_features': content_features,
            'similarity_matrix': self.content_similarity_matrix
        })
        
        logger.info("Modelo baseado em conteúdo treinado com sucesso")

    def train_hybrid_model(self):
        """Treina modelo híbrido combinando colaborativo e conteúdo"""
        logger.info("Treinando modelo híbrido...")
        
        # Verificar se ambos os modelos estão treinados
        if self.collaborative_model is None or self.content_similarity_matrix is None:
            logger.warning("Modelos base e colaborativo devem ser treinados primeiro")
            return
        
        # Criar modelo híbrido simples (média ponderada)
        self.hybrid_model = {
            'collaborative_weight': 0.6,
            'content_weight': 0.4,
            'collaborative_model': self.collaborative_model,
            'content_similarity': self.content_similarity_matrix
        }
        
        # Salvar modelo
        self._save_model('hybrid', self.hybrid_model)
        
        logger.info("Modelo híbrido treinado com sucesso")

    def get_collaborative_recommendations(self, user_id: str, n_recommendations: int = None) -> List[Recommendation]:
        """Gera recomendações colaborativas para um usuário"""
        if self.collaborative_model is None:
            logger.warning("Modelo colaborativo não treinado")
            return []
        
        if n_recommendations is None:
            n_recommendations = self.recommendation_count
        
        # Buscar usuário na matriz
        user_item_matrix, user_ids, item_ids = self._create_user_item_matrix()
        
        if user_id not in user_ids:
            logger.warning(f"Usuário {user_id} não encontrado na matriz")
            return []
        
        user_idx = user_ids.index(user_id)
        
        # Obter fatores do usuário
        user_factors = self.collaborative_model.transform(
            self.scaler.transform([user_item_matrix[user_idx]])
        )
        
        # Calcular scores para todos os itens
        item_scores = np.dot(user_factors, self.collaborative_model.components_)
        
        # Filtrar itens já consumidos
        consumed_items = set()
        for interaction in self.interactions:
            if interaction.user_id == user_id:
                consumed_items.add(interaction.item_id)
        
        # Criar recomendações
        recommendations = []
        for item_idx, score in enumerate(item_scores[0]):
            item_id = item_ids[item_idx]
            
            if item_id not in consumed_items and item_id in self.content:
                confidence = min(score / 5.0, 1.0)  # Normalizar para 0-1
                
                recommendation = Recommendation(
                    item_id=item_id,
                    score=float(score),
                    reason="Recomendação baseada em usuários similares",
                    confidence=confidence,
                    recommendation_type=RecommendationType.COLLABORATIVE,
                    metadata={
                        'user_factors': user_factors[0].tolist(),
                        'item_score': float(score)
                    }
                )
                recommendations.append(recommendation)
        
        # Ordenar por score e retornar top N
        recommendations.sort(key=lambda x: x.score, reverse=True)
        return recommendations[:n_recommendations]

    def get_content_based_recommendations(self, user_id: str, n_recommendations: int = None) -> List[Recommendation]:
        """Gera recomendações baseadas em conteúdo para um usuário"""
        if self.content_similarity_matrix is None:
            logger.warning("Modelo baseado em conteúdo não treinado")
            return []
        
        if n_recommendations is None:
            n_recommendations = self.recommendation_count
        
        # Obter perfil do usuário
        if user_id not in self.users:
            logger.warning(f"Usuário {user_id} não encontrado")
            return []
        
        user_profile = self.users[user_id]
        
        # Identificar itens consumidos pelo usuário
        consumed_items = []
        for interaction in self.interactions:
            if interaction.user_id == user_id and interaction.item_id in self.content:
                consumed_items.append(interaction.item_id)
        
        if not consumed_items:
            # Se não há histórico, usar preferências do perfil
            return self._get_preference_based_recommendations(user_profile, n_recommendations)
        
        # Calcular similaridade com itens consumidos
        item_scores = defaultdict(float)
        item_counts = defaultdict(int)
        
        for consumed_item in consumed_items:
            if consumed_item in self.content:
                consumed_idx = list(self.content.keys()).index(consumed_item)
                
                # Obter similaridades com outros itens
                similarities = self.content_similarity_matrix[consumed_idx]
                
                for idx, similarity in enumerate(similarities):
                    item_id = list(self.content.keys())[idx]
                    
                    if item_id != consumed_item and item_id not in consumed_items:
                        item_scores[item_id] += similarity
                        item_counts[item_id] += 1
        
        # Calcular scores médios
        for item_id in item_scores:
            if item_counts[item_id] > 0:
                item_scores[item_id] /= item_counts[item_id]
        
        # Criar recomendações
        recommendations = []
        for item_id, score in sorted(item_scores.items(), key=lambda x: x[1], reverse=True):
            if len(recommendations) >= n_recommendations:
                break
            
            confidence = min(score, 1.0)
            
            recommendation = Recommendation(
                item_id=item_id,
                score=float(score),
                reason="Recomendação baseada em conteúdo similar",
                confidence=confidence,
                recommendation_type=RecommendationType.CONTENT_BASED,
                metadata={
                    'similarity_score': float(score),
                    'based_on_items': consumed_items[:3]  # Top 3 itens base
                }
            )
            recommendations.append(recommendation)
        
        return recommendations

    def get_hybrid_recommendations(self, user_id: str, n_recommendations: int = None) -> List[Recommendation]:
        """Gera recomendações híbridas combinando múltiplos métodos"""
        if self.hybrid_model is None:
            logger.warning("Modelo híbrido não treinado")
            return []
        
        if n_recommendations is None:
            n_recommendations = self.recommendation_count
        
        # Obter recomendações de ambos os métodos
        collaborative_recs = self.get_collaborative_recommendations(user_id, n_recommendations * 2)
        content_recs = self.get_content_based_recommendations(user_id, n_recommendations * 2)
        
        # Combinar scores
        hybrid_scores = defaultdict(float)
        
        # Adicionar scores colaborativos
        for rec in collaborative_recs:
            hybrid_scores[rec.item_id] += (
                rec.score * self.hybrid_model['collaborative_weight']
            )
        
        # Adicionar scores baseados em conteúdo
        for rec in content_recs:
            hybrid_scores[rec.item_id] += (
                rec.score * self.hybrid_model['content_weight']
            )
        
        # Criar recomendações híbridas
        recommendations = []
        for item_id, score in sorted(hybrid_scores.items(), key=lambda x: x[1], reverse=True):
            if len(recommendations) >= n_recommendations:
                break
            
            # Calcular confiança baseada na combinação
            confidence = min(score / 2.0, 1.0)  # Normalizar
            
            recommendation = Recommendation(
                item_id=item_id,
                score=float(score),
                reason="Recomendação híbrida (colaborativa + conteúdo)",
                confidence=confidence,
                recommendation_type=RecommendationType.HYBRID,
                metadata={
                    'hybrid_score': float(score),
                    'collaborative_weight': self.hybrid_model['collaborative_weight'],
                    'content_weight': self.hybrid_model['content_weight']
                }
            )
            recommendations.append(recommendation)
        
        return recommendations

    def get_popularity_recommendations(self, user_id: str, n_recommendations: int = None) -> List[Recommendation]:
        """Gera recomendações baseadas em popularidade"""
        if n_recommendations is None:
            n_recommendations = self.recommendation_count
        
        # Calcular scores de popularidade
        popularity_scores = {}
        
        for item_id, content_item in self.content.items():
            # Score baseado em visualizações, avaliações e interações
            view_score = content_item.view_count / 1000.0  # Normalizar visualizações
            rating_score = content_item.rating / 5.0  # Normalizar avaliações
            popularity_score = content_item.popularity_score / 100.0  # Normalizar score de popularidade
            
            # Score combinado
            total_score = (view_score * 0.4 + rating_score * 0.4 + popularity_score * 0.2)
            popularity_scores[item_id] = total_score
        
        # Filtrar itens já consumidos
        consumed_items = set()
        for interaction in self.interactions:
            if interaction.user_id == user_id:
                consumed_items.add(interaction.item_id)
        
        # Criar recomendações
        recommendations = []
        for item_id, score in sorted(popularity_scores.items(), key=lambda x: x[1], reverse=True):
            if len(recommendations) >= n_recommendations:
                break
            
            if item_id not in consumed_items:
                confidence = min(score, 1.0)
                
                recommendation = Recommendation(
                    item_id=item_id,
                    score=float(score),
                    reason="Recomendação baseada em popularidade",
                    confidence=confidence,
                    recommendation_type=RecommendationType.POPULARITY,
                    metadata={
                        'popularity_score': float(score),
                        'view_count': self.content[item_id].view_count,
                        'rating': self.content[item_id].rating
                    }
                )
                recommendations.append(recommendation)
        
        return recommendations

    def get_personalized_recommendations(self, user_id: str, n_recommendations: int = None) -> List[Recommendation]:
        """Gera recomendações personalizadas usando múltiplos métodos"""
        if n_recommendations is None:
            n_recommendations = self.recommendation_count
        
        # Verificar se há dados suficientes para recomendações colaborativas
        user_interactions = [i for i in self.interactions if i.user_id == user_id]
        
        if len(user_interactions) >= self.min_interactions:
            # Usar modelo híbrido se disponível
            if self.hybrid_model is not None:
                return self.get_hybrid_recommendations(user_id, n_recommendations)
            # Usar colaborativo se disponível
            elif self.collaborative_model is not None:
                return self.get_collaborative_recommendations(user_id, n_recommendations)
            # Usar baseado em conteúdo se disponível
            elif self.content_similarity_matrix is not None:
                return self.get_content_based_recommendations(user_id, n_recommendations)
        
        # Fallback para recomendações baseadas em popularidade
        return self.get_popularity_recommendations(user_id, n_recommendations)

    def _get_preference_based_recommendations(self, user_profile: UserProfile, n_recommendations: int) -> List[Recommendation]:
        """Gera recomendações baseadas nas preferências do perfil do usuário"""
        recommendations = []
        
        # Filtrar conteúdo por preferências
        for item_id, content_item in self.content.items():
            score = 0.0
            
            # Score baseado em categoria
            if content_item.category in user_profile.preferred_categories:
                score += 0.3
            
            # Score baseado em nível de dificuldade
            if content_item.difficulty == user_profile.skill_level:
                score += 0.2
            
            # Score baseado em tags de interesse
            common_tags = set(content_item.tags) & set(user_profile.interests)
            if common_tags:
                score += 0.2 * len(common_tags) / len(content_item.tags)
            
            # Score baseado em formato preferido
            if content_item.content_type == user_profile.preferred_format:
                score += 0.1
            
            # Score baseado em popularidade
            score += content_item.popularity_score / 1000.0
            
            if score > 0:
                recommendation = Recommendation(
                    item_id=item_id,
                    score=score,
                    reason="Recomendação baseada em preferências do perfil",
                    confidence=min(score, 1.0),
                    recommendation_type=RecommendationType.CONTENT_BASED,
                    metadata={
                        'preference_score': score,
                        'matched_categories': [c for c in user_profile.preferred_categories if c == content_item.category],
                        'matched_tags': list(set(content_item.tags) & set(user_profile.interests))
                    }
                )
                recommendations.append(recommendation)
        
        # Ordenar por score e retornar top N
        recommendations.sort(key=lambda x: x.score, reverse=True)
        return recommendations[:n_recommendations]

    def get_similar_users(self, user_id: str, n_users: int = 5) -> List[Tuple[str, float]]:
        """Encontra usuários similares"""
        if self.user_similarity_matrix is None:
            return []
        
        user_item_matrix, user_ids, _ = self._create_user_item_matrix()
        
        if user_id not in user_ids:
            return []
        
        user_idx = user_ids.index(user_id)
        similarities = self.user_similarity_matrix[user_idx]
        
        # Criar lista de usuários similares
        similar_users = []
        for idx, similarity in enumerate(similarities):
            if idx != user_idx and similarity > self.similarity_threshold:
                similar_users.append((user_ids[idx], float(similarity)))
        
        # Ordenar por similaridade e retornar top N
        similar_users.sort(key=lambda x: x[1], reverse=True)
        return similar_users[:n_users]

    def get_similar_content(self, item_id: str, n_items: int = 5) -> List[Tuple[str, float]]:
        """Encontra conteúdo similar"""
        if self.content_similarity_matrix is None:
            return []
        
        if item_id not in self.content:
            return []
        
        item_idx = list(self.content.keys()).index(item_id)
        similarities = self.content_similarity_matrix[item_idx]
        
        # Criar lista de itens similares
        similar_items = []
        for idx, similarity in enumerate(similarities):
            if idx != item_idx and similarity > self.similarity_threshold:
                item_id_similar = list(self.content.keys())[idx]
                similar_items.append((item_id_similar, float(similarity)))
        
        # Ordenar por similaridade e retornar top N
        similar_items.sort(key=lambda x: x[1], reverse=True)
        return similar_items[:n_items]

    def update_user_profile(self, user_id: str, new_interactions: List[UserInteraction]):
        """Atualiza perfil do usuário com novas interações"""
        if user_id not in self.users:
            logger.warning(f"Usuário {user_id} não encontrado")
            return
        
        user_profile = self.users[user_id]
        
        # Analisar novas interações
        for interaction in new_interactions:
            if interaction.item_id in self.content:
                content_item = self.content[interaction.item_id]
                
                # Atualizar interesses baseado em tags
                for tag in content_item.tags:
                    if tag not in user_profile.interests:
                        user_profile.interests.append(tag)
                
                # Atualizar categorias preferidas
                if content_item.category not in user_profile.preferred_categories:
                    user_profile.preferred_categories.append(content_item.category)
                
                # Atualizar último acesso
                user_profile.last_activity = interaction.timestamp
        
        # Recalcular perfil
        self._recalculate_user_profile(user_profile)
        
        logger.info(f"Perfil do usuário {user_id} atualizado")

    def _recalculate_user_profile(self, user_profile: UserProfile):
        """Recalcula métricas do perfil do usuário"""
        user_interactions = [i for i in self.interactions if i.user_id == user_profile.user_id]
        
        if user_interactions:
            # Calcular taxa de conclusão
            completed_lessons = [i for i in user_interactions if i.interaction_type == UserActivityType.LESSON_COMPLETE]
            total_lessons = len([i for i in user_interactions if i.interaction_type == UserActivityType.COURSE_VIEW])
            
            if total_lessons > 0:
                user_profile.completion_rate = len(completed_lessons) / total_lessons
            
            # Calcular score médio
            scores = [i.score for i in user_interactions if i.score is not None]
            if scores:
                user_profile.average_score = sum(scores) / len(scores)
            
            # Atualizar total de cursos
            unique_courses = set()
            for interaction in user_interactions:
                if interaction.item_id in self.content:
                    content_item = self.content[interaction.item_id]
                    if hasattr(content_item, 'course_id'):
                        unique_courses.add(content_item.course_id)
            
            user_profile.total_courses = len(unique_courses)

    def get_recommendation_insights(self, user_id: str) -> Dict:
        """Retorna insights sobre as recomendações para um usuário"""
        insights = {
            'user_id': user_id,
            'recommendation_history': [],
            'preferences_evolution': [],
            'collaborative_factors': [],
            'content_affinities': [],
            'learning_patterns': []
        }
        
        # Histórico de recomendações
        user_interactions = [i for i in self.interactions if i.user_id == user_id]
        insights['recommendation_history'] = [
            {
                'item_id': i.item_id,
                'type': i.interaction_type.value,
                'timestamp': i.timestamp.isoformat(),
                'score': i.score,
                'rating': i.rating
            }
            for i in user_interactions[-20:]  # Últimas 20 interações
        ]
        
        # Evolução de preferências
        if user_id in self.users:
            user_profile = self.users[user_id]
            insights['preferences_evolution'] = {
                'interests': user_profile.interests,
                'preferred_categories': user_profile.preferred_categories,
                'skill_level': user_profile.skill_level,
                'completion_rate': user_profile.completion_rate,
                'average_score': user_profile.average_score
            }
        
        # Padrões de aprendizado
        if user_interactions:
            # Análise temporal
            interactions_by_hour = defaultdict(int)
            for interaction in user_interactions:
                hour = interaction.timestamp.hour
                interactions_by_hour[hour] += 1
            
            insights['learning_patterns'] = {
                'peak_hours': sorted(interactions_by_hour.items(), key=lambda x: x[1], reverse=True)[:3],
                'total_interactions': len(user_interactions),
                'last_activity': user_interactions[-1].timestamp.isoformat() if user_interactions else None
            }
        
        return insights

    def _save_model(self, model_type: str, model_data: Dict):
        """Salva modelo treinado"""
        model_file = os.path.join(self.model_path, f"{model_type}_model.pkl")
        
        try:
            with open(model_file, 'wb') as f:
                pickle.dump(model_data, f)
            logger.info(f"Modelo {model_type} salvo em {model_file}")
        except Exception as e:
            logger.error(f"Erro ao salvar modelo {model_type}: {e}")

    def load_models(self):
        """Carrega modelos salvos"""
        model_files = {
            'collaborative': 'collaborative_model.pkl',
            'content': 'content_model.pkl',
            'hybrid': 'hybrid_model.pkl'
        }
        
        for model_type, filename in model_files.items():
            model_file = os.path.join(self.model_path, filename)
            
            if os.path.exists(model_file):
                try:
                    with open(model_file, 'rb') as f:
                        model_data = pickle.load(f)
                    
                    if model_type == 'collaborative':
                        self.collaborative_model = model_data['model']
                        self.scaler = model_data['scaler']
                    elif model_type == 'content':
                        self.tfidf_vectorizer = model_data['tfidf_vectorizer']
                        self.content_similarity_matrix = model_data['similarity_matrix']
                    elif model_type == 'hybrid':
                        self.hybrid_model = model_data
                    
                    logger.info(f"Modelo {model_type} carregado com sucesso")
                except Exception as e:
                    logger.error(f"Erro ao carregar modelo {model_type}: {e}")

    def train_all_models(self):
        """Treina todos os modelos disponíveis"""
        logger.info("Iniciando treinamento de todos os modelos...")
        
        try:
            self.train_content_based_model()
            self.train_collaborative_model()
            self.train_hybrid_model()
            logger.info("Todos os modelos treinados com sucesso!")
        except Exception as e:
            logger.error(f"Erro durante treinamento: {e}")

    def get_system_status(self) -> Dict:
        """Retorna status do sistema de recomendações"""
        return {
            'status': 'running',
            'models_trained': {
                'collaborative': self.collaborative_model is not None,
                'content_based': self.content_similarity_matrix is not None,
                'hybrid': self.hybrid_model is not None
            },
            'data_stats': {
                'total_users': len(self.users),
                'total_content': len(self.content),
                'total_interactions': len(self.interactions)
            },
            'recommendation_count': self.recommendation_count,
            'min_interactions': self.min_interactions,
            'similarity_threshold': self.similarity_threshold,
            'last_training': datetime.utcnow().isoformat()
        }

# Função de exemplo para criar dados de teste
def create_sample_data():
    """Cria dados de exemplo para testar o sistema"""
    recommendation_system = FenixRecommendationSystem()
    
    # Criar usuários de exemplo
    users = [
        UserProfile(
            user_id="user_1",
            interests=["python", "machine-learning", "data-science"],
            skill_level="intermediate",
            preferred_categories=["practical", "project_based"],
            learning_goals=["master-ml", "build-portfolio"],
            time_availability="evening",
            preferred_format="video",
            last_activity=datetime.utcnow(),
            total_courses=5,
            completion_rate=0.8,
            average_score=85.0
        ),
        UserProfile(
            user_id="user_2",
            interests=["web-development", "javascript", "react"],
            skill_level="beginner",
            preferred_categories=["beginner", "practical"],
            learning_goals=["learn-web-dev", "get-job"],
            time_availability="weekend",
            preferred_format="interactive",
            last_activity=datetime.utcnow(),
            total_courses=3,
            completion_rate=0.6,
            average_score=75.0
        )
    ]
    
    # Criar conteúdo de exemplo
    content_items = [
        ContentItem(
            item_id="course_1",
            title="Python para Data Science",
            category="intermediate",
            difficulty="intermediate",
            tags=["python", "data-science", "machine-learning"],
            description="Curso completo de Python para análise de dados",
            content_type="video",
            duration=120,
            prerequisites=["python-basics"],
            popularity_score=95.0,
            rating=4.8,
            view_count=1500
        ),
        ContentItem(
            item_id="course_2",
            title="React Fundamentals",
            category="beginner",
            difficulty="beginner",
            tags=["react", "javascript", "web-development"],
            description="Aprenda React do zero",
            content_type="interactive",
            duration=90,
            prerequisites=["javascript-basics"],
            popularity_score=88.0,
            rating=4.6,
            view_count=1200
        )
    ]
    
    # Adicionar dados ao sistema
    for user in users:
        recommendation_system.add_user(user)
    
    for content in content_items:
        recommendation_system.add_content(content)
    
    # Criar interações de exemplo
    interactions = [
        UserInteraction(
            user_id="user_1",
            item_id="course_1",
            interaction_type=UserActivityType.COURSE_VIEW,
            timestamp=datetime.utcnow() - timedelta(days=1),
            duration=45,
            score=90.0,
            rating=5
        ),
        UserInteraction(
            user_id="user_2",
            item_id="course_2",
            interaction_type=UserActivityType.LESSON_COMPLETE,
            timestamp=datetime.utcnow() - timedelta(hours=2),
            duration=60,
            score=85.0,
            rating=4
        )
    ]
    
    for interaction in interactions:
        recommendation_system.add_interaction(interaction)
    
    return recommendation_system

if __name__ == "__main__":
    print("🤖 Iniciando Sistema de Recomendações Fenix...")
    print("=" * 60)
    
    # Criar sistema com dados de exemplo
    system = create_sample_data()
    
    # Treinar modelos
    print("📚 Treinando modelos...")
    system.train_all_models()
    
    # Testar recomendações
    print("\n🔍 Testando recomendações...")
    
    # Recomendações para usuário 1
    print(f"\n📊 Recomendações para user_1:")
    recs = system.get_personalized_recommendations("user_1", 3)
    for i, rec in enumerate(recs, 1):
        print(f"  {i}. {rec.item_id} (Score: {rec.score:.2f}, Confiança: {rec.confidence:.2f})")
        print(f"     Motivo: {rec.reason}")
    
    # Recomendações para usuário 2
    print(f"\n📊 Recomendações para user_2:")
    recs = system.get_personalized_recommendations("user_2", 3)
    for i, rec in enumerate(recs, 1):
        print(f"  {i}. {rec.item_id} (Score: {rec.score:.2f}, Confiança: {rec.confidence:.2f})")
        print(f"     Motivo: {rec.reason}")
    
    # Status do sistema
    print(f"\n📈 Status do Sistema:")
    status = system.get_system_status()
    for key, value in status.items():
        print(f"  {key}: {value}")
    
    print("\n✅ Sistema de Recomendações testado com sucesso!")
