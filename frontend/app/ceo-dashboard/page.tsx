'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  Users,
  BookOpen,
  BarChart3,
  Target,
  Trophy,
  Settings,
  Bell,
  MessageCircle,
  Brain,
  Eye,
  Download,
  Plus
} from 'lucide-react';

interface Course {
  id: number;
  slug: string;
  title: string;
  category: string;
  lessons: number;
  status: string;
  lastAccess: string;
  accessLevel: string;
}

interface Achievement {
  id: number;
  icon: string;
  title: string;
  description: string;
  earned: boolean;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

export default function CEODashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Receita Total',
      value: 'R$ 2.4M',
      change: '+15.2%',
      changeType: 'positive',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Usuários Ativos',
      value: '50,234',
      change: '+8.7%',
      changeType: 'positive',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Cursos Vendidos',
      value: '12,847',
      change: '+23.1%',
      changeType: 'positive',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Taxa de Conclusão',
      value: '89.3%',
      change: '+2.4%',
      changeType: 'positive',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-yellow-500'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'revenue', label: 'Receita', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'growth', label: 'Crescimento', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'strategy', label: 'Estratégia', icon: <Target className="w-4 h-4" /> }
  ];

  const courses: Course[] = [
    {
      id: 1,
      slug: 'javascript-fundamentos',
      title: 'JavaScript Fundamentos',
      category: 'Frontend',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 2,
      slug: 'python-data-science',
      title: 'Python Data Science',
      category: 'Data Science',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 3,
      slug: 'react-avancado',
      title: 'React Avançado',
      category: 'Frontend',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 4,
      slug: 'nodejs-backend-development',
      title: 'Node.js Backend Development',
      category: 'Backend',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 5,
      slug: 'machine-learning-python',
      title: 'Machine Learning com Python',
      category: 'Data Science',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 6,
      slug: 'desenvolvimento-mobile',
      title: 'Desenvolvimento Mobile',
      category: 'Mobile',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 7,
      slug: 'cybersecurity-ethical-hacking',
      title: 'Cybersecurity e Ethical Hacking',
      category: 'Segurança',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 8,
      slug: 'devops-cicd',
      title: 'DevOps e CI/CD',
      category: 'DevOps',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 9,
      slug: 'flutter-mobile',
      title: 'Flutter Mobile Development',
      category: 'Mobile',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 10,
      slug: 'aws-cloud',
      title: 'AWS Cloud',
      category: 'Cloud',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 11,
      slug: 'blockchain-smart-contracts',
      title: 'Blockchain e Smart Contracts',
      category: 'Blockchain',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 12,
      slug: 'react-native-mobile',
      title: 'React Native Mobile Development',
      category: 'Mobile',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 13,
      slug: 'data-engineering',
      title: 'Data Engineering',
      category: 'Data Science',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    },
    {
      id: 14,
      slug: 'game-development',
      title: 'Game Development',
      category: 'Game Development',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      accessLevel: 'CEO - Acesso Total'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      icon: '👑',
      title: 'CEO Master',
      description: 'Acesso total a todos os recursos da plataforma',
      earned: true
    },
    {
      id: 2,
      icon: '🚀',
      title: 'Visionário',
      description: 'Criou uma plataforma de educação inovadora',
      earned: true
    },
    {
      id: 3,
      icon: '🎓',
      title: 'Mentor Master',
      description: 'Acesso a todos os cursos e conteúdos',
      earned: true
    }
  ];

  const activities: Activity[] = [
    {
      id: 1,
      title: 'Dashboard CEO criado',
      description: 'Sistema de acesso exclusivo implementado',
      timestamp: 'Hoje'
    },
    {
      id: 2,
      title: 'Sistema de Redirecionamento implementado',
      description: 'Navegação otimizada para todos os cursos',
      timestamp: 'Hoje'
    },
    {
      id: 3,
      title: 'CEO Dashboard atualizado',
      description: 'Dashboard expandido com 7.200+ aulas',
      timestamp: 'Hoje'
    }
  ];

  const getRedirectUrl = (courseId: number) => {
    const courseMap: { [key: number]: string } = {
      1: '/cursos/javascript-fundamentos',
      2: '/cursos/python-data-science',
      3: '/cursos/react-avancado',
      4: '/cursos/nodejs-backend-development',
      5: '/cursos/machine-learning-python',
      6: '/cursos/desenvolvimento-mobile',
      7: '/cursos/cybersecurity-ethical-hacking',
      8: '/cursos/devops-cicd',
      9: '/cursos/flutter-mobile',
      10: '/cursos/aws-cloud',
      11: '/cursos/blockchain-smart-contracts',
      12: '/cursos/react-native-mobile',
      13: '/cursos/data-engineering',
      14: '/cursos/game-development'
    }
    return courseMap[courseId] || '/cursos';
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/dashboard" className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-blue-500">FENIX</span> CEO
              </span>
            </Link>
            <nav className="hidden lg:flex space-x-8">
              <Link href="/dashboard" className="text-white hover:text-blue-400">Dashboard</Link>
              <Link href="/admin-dashboard" className="text-white hover:text-blue-400">Admin</Link>
              <Link href="/ceo-dashboard" className="text-blue-400 font-semibold">CEO</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
              </button>
              <Link href="/profile" className="text-white hover:text-blue-400">Perfil</Link>
              <Link href="/settings" className="text-white hover:text-blue-400">Configurações</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Painel Executivo</h1>
            <p className="text-gray-400">Visão estratégica e métricas de alto nível da Fenix Academy</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Relatório
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nova Meta
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-xl p-1">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                      }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Crescimento de Receita</h3>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Gráfico de receita</span>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Crescimento de Usuários</h3>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Gráfico de usuários</span>
                </div>
              </div>
            </div>

            {/* Strategic Goals */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Objetivos Estratégicos 2024</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Meta de Receita</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">R$ 5M</span>
                    <span className="text-white font-semibold">48%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Meta de Usuários</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">100K</span>
                    <span className="text-white font-semibold">50%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Meta de Cursos</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">50</span>
                    <span className="text-white font-semibold">48%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Análise de Receita</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Receita por Mês</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Janeiro</span>
                      <span className="text-white">R$ 180K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fevereiro</span>
                      <span className="text-white">R$ 195K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Março</span>
                      <span className="text-white">R$ 210K</span>

                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Receita por Curso</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">React Avançado</span>
                      <span className="text-white">R$ 450K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Python Data Science</span>
                      <span className="text-white">R$ 380K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Flutter Mobile</span>
                      <span className="text-white">R$ 320K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Métricas de Crescimento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Crescimento de Usuários</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxa de Crescimento Mensal</span>
                      <span className="text-green-500">+8.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Novos Usuários/Mês</span>
                      <span className="text-white">4,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Retenção 30 dias</span>
                      <span className="text-white">78.5%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Crescimento de Receita</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Crescimento Anual</span>
                      <span className="text-green-500">+15.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ticket Médio</span>
                      <span className="text-white">R$ 297</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">LTV (Lifetime Value)</span>
                      <span className="text-white">R$ 1,240</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Estratégias e Ações</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Expansão de Mercado</h4>
                  <p className="text-gray-400 text-sm mb-2">Lançar cursos em novas tecnologias para capturar mercado emergente</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Status: Em andamento</span>
                    <span className="text-green-500 text-sm">75% concluído</span>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Parcerias Estratégicas</h4>
                  <p className="text-gray-400 text-sm mb-2">Fechar parcerias com empresas para cursos corporativos</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Status: Planejamento</span>
                    <span className="text-yellow-500 text-sm">25% concluído</span>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Expansão Internacional</h4>
                  <p className="text-gray-400 text-sm mb-2">Preparar plataforma para mercados internacionais</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Status: Planejamento</span>
                    <span className="text-blue-500 text-sm">10% concluído</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <button className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
          <Brain className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}