'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  BarChart3,
  Target,
  Settings,
  Bell,
  MessageCircle,
  Brain,
  Download,
  Plus,
  Filter,
  Search,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  Smartphone,
  Laptop,
  Monitor,
  Wifi,
  Signal,
  SignalHigh,
  Activity,
  PieChart,
  LineChart,
  TrendingDown,
  Minus,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  Share2,
  Copy,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Grid,
  List,
  EyeOff,
  Flag,
  AlertTriangle,
  Zap,
  Award,
  Trophy,
  Flame,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Star,
  BookOpen,
  Code,
  Shield,
  Lock,
  Unlock,
  Camera,
  Mic,
  Headphones} from 'lucide-react';

export default function GestaoTrafegoPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  const stats = [
    {
      title: 'Visitas Totais',
      value: '125,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Taxa de Conversão',
      value: '3.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Custo por Clique',
      value: 'R$ 2.45',
      change: '-15.2%',
      changeType: 'positive',
      icon: <MousePointer className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'ROI Médio',
      value: '340%',
      change: '+25.1%',
      changeType: 'positive',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-yellow-500'
    }
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Campanha React Avançado',
      platform: 'Facebook',
      status: 'active',
      budget: 5000,
      spent: 3200,
      impressions: 125000,
      clicks: 3200,
      conversions: 128,
      ctr: 2.56,
      cpc: 1.00,
      cpa: 25.00,
      roi: 320
    },
    {
      id: 2,
      name: 'Campanha Python Data Science',
      platform: 'Google',
      status: 'active',
      budget: 8000,
      spent: 5600,
      impressions: 180000,
      clicks: 4500,
      conversions: 180,
      ctr: 2.50,
      cpc: 1.24,
      cpa: 31.11,
      roi: 280
    },
    {
      id: 3,
      name: 'Campanha Flutter Mobile',
      platform: 'Instagram',
      status: 'paused',
      budget: 3000,
      spent: 1800,
      impressions: 75000,
      clicks: 1500,
      conversions: 45,
      ctr: 2.00,
      cpc: 1.20,
      cpa: 40.00,
      roi: 200
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'campaigns', label: 'Campanhas', icon: <Target className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'audience', label: 'Audiência', icon: <Users className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-100';
      case 'paused': return 'text-yellow-500 bg-yellow-100';
      case 'ended': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'paused': return 'Pausada';
      case 'ended': return 'Finalizada';
      default: return 'Desconhecido';
    }
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
                <span className="text-blue-500">FENIX</span> TRÁFEGO
              </span>
            </Link>
            <nav className="hidden lg:flex space-x-8">
              <Link href="/dashboard" className="text-white hover:text-blue-400">Dashboard</Link>
              <Link href="/admin-dashboard" className="text-white hover:text-blue-400">Admin</Link>
              <Link href="/gestao-trafego" className="text-blue-400 font-semibold">Tráfego</Link>
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
            <h1 className="text-3xl font-bold text-white mb-2">Gestão de Tráfego</h1>
            <p className="text-gray-400">Gerencie campanhas, analise performance e otimize conversões</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Relatório
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nova Campanha
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
                <h3 className="text-lg font-semibold text-white mb-4">Tráfego por Fonte</h3>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Gráfico de tráfego</span>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Conversões por Dia</h3>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Gráfico de conversões</span>
                </div>
              </div>
            </div>

            {/* Top Performing Campaigns */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Campanhas com Melhor Performance</h3>
              <div className="space-y-4">
                {campaigns.slice(0, 3).map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{campaign.name}</h4>
                        <p className="text-gray-400 text-sm">{campaign.platform} • {campaign.impressions.toLocaleString()} impressões</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-white font-semibold">{campaign.conversions}</div>
                        <div className="text-gray-400 text-sm">Conversões</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold">{campaign.roi}%</div>
                        <div className="text-gray-400 text-sm">ROI</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold">R$ {campaign.cpa}</div>
                        <div className="text-gray-400 text-sm">CPA</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Pesquisar campanhas..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </button>
            </div>

            {/* Campaigns Table */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Campanhas Ativas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Campanha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Plataforma</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Orçamento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Gasto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Conversões</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ROI</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                              <Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{campaign.name}</div>
                              <div className="text-gray-400 text-sm">{campaign.impressions.toLocaleString()} impressões</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white">{campaign.platform}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                            {getStatusLabel(campaign.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">R$ {campaign.budget.toLocaleString()}</td>
                        <td className="px-6 py-4 text-white">R$ {campaign.spent.toLocaleString()}</td>
                        <td className="px-6 py-4 text-white">{campaign.conversions}</td>
                        <td className="px-6 py-4 text-white">{campaign.roi}%</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Settings className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-400">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Analytics Detalhados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Métricas de Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">CTR Médio</span>
                      <span className="text-white">2.35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CPC Médio</span>
                      <span className="text-white">R$ 1.48</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CPA Médio</span>
                      <span className="text-white">R$ 32.15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ROI Médio</span>
                      <span className="text-white">267%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Distribuição por Plataforma</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Facebook</span>
                      <span className="text-white">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Google</span>
                      <span className="text-white">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Instagram</span>
                      <span className="text-white">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audience' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Análise de Audiência</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Faixa Etária</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">18-24</span>
                      <span className="text-white">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">25-34</span>
                      <span className="text-white">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">35-44</span>
                      <span className="text-white">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">45+</span>
                      <span className="text-white">10%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Gênero</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Masculino</span>
                      <span className="text-white">60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Feminino</span>
                      <span className="text-white">40%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Interesses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Programação</span>
                      <span className="text-white">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tecnologia</span>
                      <span className="text-white">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Educação</span>
                      <span className="text-white">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Outros</span>
                      <span className="text-white">10%</span>
                    </div>
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