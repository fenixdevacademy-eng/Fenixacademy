'use client';

import React, { useState } from 'react';
import { Brain, Code, Target, Zap, TrendingUp, Users, Award, BookOpen, MessageSquare, BarChart3, Settings, Star } from 'lucide-react';
import SuperIntelligentChat from '@/components/SuperIntelligentChat';
import CodeAnalyzer from '@/components/CodeAnalyzer';
import LearningPathGenerator from '@/components/LearningPathGenerator';
import { LearningPath, PersonalizedRecommendation, CodeAnalysis } from '@/lib/ai/enhanced-ai-service';

export default function AIDashboard() {
  const [activeTab, setActiveTab] = useState('chat');
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis | null>(null);

  const tabs = [
    { id: 'chat', label: 'Chat IA', icon: MessageSquare, description: 'Converse com a IA superinteligente' },
    { id: 'code', label: 'Análise de Código', icon: Code, description: 'Analise e otimize seu código' },
    { id: 'learning', label: 'Roteiros de Aprendizado', icon: Target, description: 'Crie caminhos personalizados' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Veja suas métricas de aprendizado' },
    { id: 'settings', label: 'Configurações', icon: Settings, description: 'Configure sua experiência' }
  ];

  const handleLearningPathGenerated = (paths: LearningPath[]) => {
    setLearningPaths(paths);
  };

  const handleRecommendationsGenerated = (recs: PersonalizedRecommendation[]) => {
    setRecommendations(recs);
  };

  const handleCodeAnalyzed = (analysis: CodeAnalysis) => {
    setCodeAnalysis(analysis);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <SuperIntelligentChat
            onLearningPathGenerated={handleLearningPathGenerated}
            onRecommendationsGenerated={handleRecommendationsGenerated}
            onCodeAnalyzed={handleCodeAnalyzed}
            className="h-[600px]"
          />
        );
      case 'code':
        return (
          <CodeAnalyzer
            onAnalysisComplete={handleCodeAnalyzed}
            className="h-[600px]"
          />
        );
      case 'learning':
        return (
          <LearningPathGenerator
            onPathGenerated={handleLearningPathGenerated}
            className="h-[600px]"
          />
        );
      case 'analytics':
        return <AnalyticsTab learningPaths={learningPaths} recommendations={recommendations} codeAnalysis={codeAnalysis} />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard IA Superinteligente
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sua central de comando para aprendizado e desenvolvimento
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Roteiros Criados</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{learningPaths.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Recomendações</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{recommendations.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-lg">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Análises de Código</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{codeAnalysis ? 1 : 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Progresso</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ferramentas IA</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{tab.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tab.description}</p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <Zap className="w-4 h-4" />
                  Explicar conceito
                </button>
                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <Code className="w-4 h-4" />
                  Analisar código
                </button>
                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <Target className="w-4 h-4" />
                  Criar roteiro
                </button>
                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <Award className="w-4 h-4" />
                  Ver recomendações
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics Tab Component
function AnalyticsTab({ 
  learningPaths, 
  recommendations, 
  codeAnalysis 
}: { 
  learningPaths: LearningPath[]; 
  recommendations: PersonalizedRecommendation[]; 
  codeAnalysis: CodeAnalysis | null; 
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Métricas de Aprendizado
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Roteiros de Aprendizado</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total de roteiros:</span>
                <span className="font-medium">{learningPaths.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Roteiros iniciados:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Roteiros concluídos:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Recomendações</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total de recomendações:</span>
                <span className="font-medium">{recommendations.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Alta prioridade:</span>
                <span className="font-medium text-red-600">
                  {recommendations.filter(r => r.priority === 'high').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Implementadas:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {codeAnalysis && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Última Análise de Código
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{codeAnalysis.quality}/100</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Qualidade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{codeAnalysis.performance.score}/100</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{codeAnalysis.security.score}/100</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Segurança</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Settings Tab Component
function SettingsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Configurações da IA
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nível de Experiência
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estilo de Aprendizado
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="visual">Visual</option>
              <option value="auditory">Auditivo</option>
              <option value="kinesthetic">Cinestésico</option>
              <option value="reading">Leitura</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tempo Disponível por Dia
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="30min">30 minutos</option>
              <option value="1hour">1 hora</option>
              <option value="2hours">2 horas</option>
              <option value="4hours">4+ horas</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Receber notificações de recomendações
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="analytics"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="analytics" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Compartilhar dados para melhorar a IA
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Salvar Configurações
          </button>
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
}


