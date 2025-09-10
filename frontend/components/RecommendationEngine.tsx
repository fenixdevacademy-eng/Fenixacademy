'use client';

import React, { useState, useEffect } from 'react';
import { Star, Clock, Target, TrendingUp, Award, BookOpen, Code, Users, Zap, Brain, CheckCircle, ArrowRight, Filter, Search } from 'lucide-react';
import { enhancedAIService, PersonalizedRecommendation } from '@/lib/ai/enhanced-ai-service';

interface RecommendationEngineProps {
  className?: string;
  userProfile?: {
    skillLevel: string;
    interests: string[];
    goals: string[];
    learningStyle: string;
    timeAvailable: string;
    preferredLanguages: string[];
  };
}

export function RecommendationEngine({ className = '', userProfile }: RecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas', icon: Star },
    { id: 'course', label: 'Cursos', icon: BookOpen },
    { id: 'lesson', label: 'Aulas', icon: Target },
    { id: 'project', label: 'Projetos', icon: Code },
    { id: 'resource', label: 'Recursos', icon: Award },
    { id: 'career', label: 'Carreira', icon: TrendingUp }
  ];

  useEffect(() => {
    generateRecommendations();
  }, [userProfile]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const recs = await enhancedAIService.getPersonalizedRecommendations({
        completedCourses: [],
        currentSkills: userProfile?.interests || [],
        timeSpent: 0,
        lastActivity: new Date(),
        preferences: {
          difficulty: userProfile?.skillLevel || 'beginner',
          duration: userProfile?.timeAvailable || '1-2 hours',
          style: userProfile?.learningStyle || 'visual'
        }
      });
      setRecommendations(recs);
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Zap className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-5 h-5" />;
      case 'lesson': return <Target className="w-5 h-5" />;
      case 'project': return <Code className="w-5 h-5" />;
      case 'resource': return <Award className="w-5 h-5" />;
      case 'career': return <TrendingUp className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'lesson': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'project': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'resource': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'career': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesFilter = filter === 'all' || rec.priority === filter;
    const matchesSearch = searchTerm === '' || 
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rec.type === selectedCategory;
    
    return matchesFilter && matchesSearch && matchesCategory;
  });

  const handleImplementRecommendation = (recommendation: PersonalizedRecommendation) => {
    // Implement recommendation logic
    console.log('Implementing recommendation:', recommendation);
  };

  const handleDismissRecommendation = (recommendationId: string) => {
    setRecommendations(prev => prev.filter(rec => rec.title !== recommendationId));
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Motor de Recomendações IA
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sugestões personalizadas baseadas no seu perfil
              </p>
            </div>
          </div>
          <button
            onClick={generateRecommendations}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Atualizar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar recomendações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filter === 'high'
                  ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Alta
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filter === 'medium'
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Média
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filter === 'low'
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Baixa
            </button>
          </div>
        </div>

        {/* Recommendations List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Gerando recomendações personalizadas...</p>
            </div>
          </div>
        ) : filteredRecommendations.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhuma recomendação encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou atualizar as recomendações
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecommendations.map((recommendation, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      {getTypeIcon(recommendation.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {recommendation.title}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(recommendation.type)}`}>
                          {recommendation.type}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                          {recommendation.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {recommendation.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          {getPriorityIcon(recommendation.priority)}
                          Prioridade {recommendation.priority}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {recommendation.timeInvestment}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {recommendation.estimatedValue}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleImplementRecommendation(recommendation)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Implementar
                    </button>
                    <button
                      onClick={() => handleDismissRecommendation(recommendation.title)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Reason */}
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Por que recomendamos:</strong> {recommendation.reason}
                  </p>
                </div>

                {/* Prerequisites and Outcomes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendation.prerequisites.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Pré-requisitos:</h5>
                      <div className="space-y-1">
                        {recommendation.prerequisites.map((prereq, prereqIndex) => (
                          <div key={prereqIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {prereq}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {recommendation.outcomes.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Resultados esperados:</h5>
                      <div className="space-y-1">
                        {recommendation.outcomes.map((outcome, outcomeIndex) => (
                          <div key={outcomeIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {outcome}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {filteredRecommendations.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Total: {filteredRecommendations.length} recomendações</span>
                <span>Alta prioridade: {filteredRecommendations.filter(r => r.priority === 'high').length}</span>
                <span>Média prioridade: {filteredRecommendations.filter(r => r.priority === 'medium').length}</span>
                <span>Baixa prioridade: {filteredRecommendations.filter(r => r.priority === 'low').length}</span>
              </div>
              <button
                onClick={() => {
                  // Implement all high priority recommendations
                  const highPriority = filteredRecommendations.filter(r => r.priority === 'high');
                  highPriority.forEach(rec => handleImplementRecommendation(rec));
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Implementar Todas (Alta Prioridade)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendationEngine;


