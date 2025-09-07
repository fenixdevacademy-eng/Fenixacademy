'use client';

import React, { useState } from 'react';
import { CartProvider } from '../../contexts/CartContext';
import ModernHeader from '../../components/ModernHeader';
import Cart from '../../components/Cart';
import ProgressTracker from '../../components/ProgressTracker';
import CourseCard from '../../components/CourseCard';
import { getAllCourses } from '../course/[slug]/courses';
import {
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Clock,
  Star,
  Target,
  Zap,
  Flame,
  Crown
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const courses = getAllCourses();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtra cursos por categoria
  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  // Categorias disponíveis
  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))];

  // Estatísticas simuladas
  const stats = {
    totalStudents: 15420,
    activeCourses: 20,
    completionRate: 87,
    averageRating: 4.8,
    totalLessons: 1300,
    totalModules: 200
  };

  // Cursos em destaque
  const featuredCourses = courses.slice(0, 6);

  // Cursos mais populares
  const popularCourses = courses
    .sort((a, b) => Math.random() - 0.5) // Simula popularidade
    .slice(0, 4);

  return (
    <CartProvider>
    <div className="min-h-screen bg-gray-50">
        {/* Header Moderno */}
        <ModernHeader />

        {/* Conteúdo Principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs de Navegação */}
          <div className="mb-8">
            <nav className="flex space-x-8 border-b border-gray-200">
              {[
                { id: 'overview', name: 'Visão Geral', icon: TrendingUp },
                { id: 'courses', name: 'Meus Cursos', icon: BookOpen },
                { id: 'progress', name: 'Progresso', icon: Target },
                { id: 'achievements', name: 'Conquistas', icon: Award },
                { id: 'community', name: 'Comunidade', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Conteúdo das Tabs */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Estatísticas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Alunos</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% este mês
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taxa de Conclusão</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.completionRate}%</p>
              </div>
                    <Target className="h-8 w-8 text-green-500" />
              </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +5% este mês
          </div>
        </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-purple-500">
                  <div className="flex items-center justify-between">
            <div>
                      <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
                    <Star className="h-8 w-8 text-purple-500" />
              </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +0.2 este mês
          </div>
        </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cursos Ativos</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.activeCourses}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-orange-500" />
              </div>
                  <div className="mt-4 flex items-center text-sm text-blue-600">
                    <Zap className="h-4 w-4 mr-1" />
                    Todos funcionando
              </div>
            </div>
          </div>

              {/* Progresso do Usuário */}
              <ProgressTracker />

              {/* Cursos em Destaque */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Flame className="h-6 w-6 text-orange-500 mr-2" />
                  Cursos em Destaque
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>

              {/* Métricas de Engajamento */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  🚀 Fenix Academy em Números
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2">{stats.totalLessons}</div>
                    <div className="text-blue-100">Lições Disponíveis</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">{stats.totalModules}</div>
                    <div className="text-blue-100">Módulos Ativos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">130h</div>
                    <div className="text-blue-100">Por Curso</div>
              </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-blue-100">Qualidade CS50</div>
            </div>
          </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Filtros */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar Cursos</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {category === 'all' ? 'Todos' : category}
                    </button>
                  ))}
          </div>
              </div>

              {/* Grid de Cursos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <ProgressTracker />

              {/* Gráficos e Métricas Detalhadas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Estudos</h3>
              <div className="space-y-4">
                    {[7, 6, 5, 4, 3, 2, 1].map((day) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {day === 1 ? 'Hoje' : `${day} dias atrás`}
                                </span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${Math.random() * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {Math.floor(Math.random() * 120 + 30)}min
                        </span>
                            </div>
                    ))}
                            </div>
                          </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Metas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Target className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">Completar 10 lições</span>
                      </div>
                      <span className="text-xs text-blue-600">3/10</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Crown className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">Alcançar Nível 10</span>
                      </div>
                      <span className="text-xs text-green-600">8/10</span>
                      </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Flame className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">Sequência de 15 dias</span>
                      </div>
                      <span className="text-xs text-purple-600">7/15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Suas Conquistas</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Conquistas Desbloqueadas */}
                  <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                    <div className="text-4xl mb-2">🎯</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Primeiro Passo</h3>
                    <p className="text-sm text-gray-600 mb-3">Completou seu primeiro curso</p>
                    <div className="text-xs text-yellow-600 font-medium">DESBLOQUEADA</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                    <div className="text-4xl mb-2">🔥</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Semana Consistente</h3>
                    <p className="text-sm text-gray-600 mb-3">Estudou por 7 dias seguidos</p>
                    <div className="text-xs text-blue-600 font-medium">DESBLOQUEADA</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                    <div className="text-4xl mb-2">⚡</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Aprendiz Veloz</h3>
                    <p className="text-sm text-gray-600 mb-3">Completou 3 cursos em um mês</p>
                    <div className="text-xs text-green-600 font-medium">DESBLOQUEADA</div>
                  </div>

                  {/* Conquistas Bloqueadas */}
                  <div className="text-center p-6 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
                    <div className="text-4xl mb-2">👑</div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Mestre da Tecnologia</h3>
                    <p className="text-sm text-gray-400 mb-3">Completou 10 cursos</p>
                    <div className="text-xs text-gray-500 font-medium">BLOQUEADA</div>
          </div>

                  <div className="text-center p-6 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
                    <div className="text-4xl mb-2">🌟</div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Perfeccionista</h3>
                    <p className="text-sm text-gray-400 mb-3">100% de aproveitamento em um curso</p>
                    <div className="text-xs text-gray-500 font-medium">BLOQUEADA</div>
                    </div>

                  <div className="text-center p-6 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
                    <div className="text-4xl mb-2">🚀</div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Rocket Learner</h3>
                    <p className="text-sm text-gray-400 mb-3">Completou um curso em 1 semana</p>
                    <div className="text-xs text-gray-500 font-medium">BLOQUEADA</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">👥 Comunidade Fenix</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Estatísticas da Comunidade</h3>
              <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total de Membros</span>
                        <span className="font-semibold">15.420</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Online Agora</span>
                        <span className="font-semibold text-green-600">1.247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Novos Hoje</span>
                        <span className="font-semibold text-blue-600">+89</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Ranking Semanal</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🥇 1º Lugar</span>
                        <span className="font-semibold">João Silva</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🥈 2º Lugar</span>
                        <span className="font-semibold">Maria Santos</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🥉 3º Lugar</span>
                        <span className="font-semibold">Pedro Costa</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            )}
        </main>

        {/* Carrinho */}
        <Cart />
      </div>
    </CartProvider>
  );
}