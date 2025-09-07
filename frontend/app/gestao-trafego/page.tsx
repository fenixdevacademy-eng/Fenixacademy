'use client';

import React, { useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import {
  BarChart3,
  Eye,
  MousePointer,
  Target,
  Settings,
  Pause,
  TrendingUp,
  Users,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  BarChart,
  PieChart,
  Activity,
  Target as TargetIcon,
  X
} from 'lucide-react';
import SEOHead from '../components/SEOHeadServer';

interface Campaign {
  id: number;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roi: number;
  startDate: string;
  endDate: string;
}

interface AudienceData {
  age: { [key: string]: number };
  gender: { [key: string]: number };
  location: { [key: string]: number };
  device: { [key: string]: number };
  interests: { [key: string]: number };
}

export default function GestaoTrafegoPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  // Dados mockados mais realistas
  const metrics = {
    ctr: 3.2,
    cpc: 2.45,
    cpa: 18.75,
    roi: 320,
    impressions: 125000,
    clicks: 4000,
    conversions: 213,
    spend: 9800,
    revenue: 31500
  };

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: "Campanha Black Friday",
      platform: "Facebook Ads",
      status: 'active',
      budget: 5000,
      spent: 3200,
      impressions: 45000,
      clicks: 1800,
      conversions: 95,
      ctr: 4.0,
      cpc: 1.78,
      cpa: 33.68,
      roi: 285,
      startDate: "2024-11-20",
      endDate: "2024-11-30"
    },
    {
      id: 2,
      name: "Google Ads - Cursos Tech",
      platform: "Google Ads",
      status: 'active',
      budget: 3000,
      spent: 2100,
      impressions: 35000,
      clicks: 1200,
      conversions: 78,
      ctr: 3.4,
      cpc: 1.75,
      cpa: 26.92,
      roi: 245,
      startDate: "2024-11-15",
      endDate: "2024-12-15"
    },
    {
      id: 3,
      name: "Instagram Stories",
      platform: "Instagram",
      status: 'paused',
      budget: 2000,
      spent: 1500,
      impressions: 28000,
      clicks: 800,
      conversions: 45,
      ctr: 2.9,
      cpc: 1.88,
      cpa: 33.33,
      roi: 180,
      startDate: "2024-11-10",
      endDate: "2024-11-25"
    }
  ];

  const audienceData: AudienceData = {
    age: {
      "18-24": 25,
      "25-34": 35,
      "35-44": 22,
      "45-54": 12,
      "55+": 6
    },
    gender: {
      "Masculino": 58,
      "Feminino": 42
    },
    location: {
      "São Paulo": 35,
      "Rio de Janeiro": 22,
      "Minas Gerais": 15,
      "Bahia": 12,
      "Outros": 16
    },
    device: {
      "Mobile": 65,
      "Desktop": 30,
      "Tablet": 5
    },
    interests: {
      "Tecnologia": 45,
      "Educação": 38,
      "Desenvolvimento": 32,
      "Marketing": 25,
      "Negócios": 20
    }
  };

  const recentActivities = [
    {
      id: 1,
      type: 'campaign_created',
      message: 'Nova campanha "Black Friday" criada',
      time: '2 horas atrás',
      icon: Plus
    },
    {
      id: 2,
      type: 'budget_updated',
      message: 'Orçamento da campanha Google Ads atualizado',
      time: '4 horas atrás',
      icon: Settings
    },
    {
      id: 3,
      type: 'conversion',
      message: '15 conversões registradas hoje',
      time: '6 horas atrás',
      icon: Target
    },
    {
      id: 4,
      type: 'alert',
      message: 'CTR abaixo do esperado na campanha Instagram',
      time: '8 horas atrás',
      icon: AlertCircle
    }
  ];

  const handleCreateCampaign = () => {
    // setShowCreateModal(true); // This state was removed
  };

  const handleConsultation = () => {
    setShowConsultationModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'completed': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (false) { // loading state was removed
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados de tráfego...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEOHead
        title="Gestão de Tráfego - Fenix Academy"
        description="Dashboard completo de gestão de tráfego e marketing digital"
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestão de Tráfego</h1>
              <p className="text-gray-600 mt-1">Dashboard completo de marketing digital</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateCampaign}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Campanha
              </button>
              <button
                onClick={handleConsultation}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Agendar Consultoria
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'campaigns', label: 'Campanhas', icon: Target },
              { id: 'audience', label: 'Audiência', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'reports', label: 'Relatórios', icon: Download }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedComponent
                animation="slideUp"
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">CTR</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.ctr}%</p>
                  </div>
                </div>
              </AnimatedComponent>

              <AnimatedComponent
                animation="slideUp"
                delay={0.1}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MousePointer className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">CPC</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {metrics.cpc}</p>
                  </div>
                </div>
              </AnimatedComponent>

              <AnimatedComponent
                animation="slideUp"
                delay={0.2}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">CPA</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {metrics.cpa}</p>
                  </div>
                </div>
              </AnimatedComponent>

              <AnimatedComponent
                animation="slideUp"
                delay={0.3}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">ROI</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.roi}%</p>
                  </div>
                </div>
              </AnimatedComponent>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatedComponent
                animation="slideLeft"
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Visão Geral</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Impressões</span>
                    <span className="font-semibold">{metrics.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cliques</span>
                    <span className="font-semibold">{metrics.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversões</span>
                    <span className="font-semibold">{metrics.conversions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Investimento</span>
                    <span className="font-semibold">R$ {metrics.spend.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Receita</span>
                    <span className="font-semibold text-green-600">R$ {metrics.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </AnimatedComponent>

              <AnimatedComponent
                animation="slideRight"
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedComponent>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Campanhas Ativas</h2>
              <button
                onClick={handleCreateCampaign}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Campanha
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campanha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plataforma
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orçamento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gasto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CTR
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CPC
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ROI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.startDate} - {campaign.endDate}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.platform}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                            {getStatusIcon(campaign.status)}
                            <span className="ml-1">{campaign.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R$ {campaign.budget.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R$ {campaign.spent.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.ctr}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R$ {campaign.cpc}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.roi}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
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

        {/* Audience Tab */}
        {activeTab === 'audience' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Análise de Audiência</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Demographics */}
              <AnimatedComponent
                animation="slideUp"
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Demografia</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Faixa Etária</h4>
                    {Object.entries(audienceData.age).map(([age, percentage]) => (
                      <div key={age} className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">{age}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Gênero</h4>
                    {Object.entries(audienceData.gender).map(([gender, percentage]) => (
                      <div key={gender} className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">{gender}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedComponent>

              {/* Location & Device */}
              <AnimatedComponent
                animation="slideUp"
                delay={0.1}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Localização e Dispositivos</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Localização</h4>
                    {Object.entries(audienceData.location).map(([location, percentage]) => (
                      <div key={location} className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">{location}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Dispositivos</h4>
                    {Object.entries(audienceData.device).map(([device, percentage]) => (
                      <div key={device} className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">{device}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedComponent>
            </div>

            {/* Interests */}
            <AnimatedComponent
              animation="slideUp"
              delay={0.2}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interesses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(audienceData.interests).map(([interest, percentage]) => (
                  <div key={interest} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">{interest}</span>
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                ))}
              </div>
            </AnimatedComponent>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Avançado</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AnimatedComponent
                animation="slideUp"
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance por Hora</h3>
                  <BarChart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Melhor horário</span>
                    <span className="text-sm font-medium">14:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">CTR médio</span>
                    <span className="text-sm font-medium">4.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conversões</span>
                    <span className="text-sm font-medium">45</span>
                  </div>
                </div>
              </AnimatedComponent>

              <AnimatedComponent
                animation="slideUp"
                delay={0.1}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance por Dia</h3>
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Melhor dia</span>
                    <span className="text-sm font-medium">Quarta-feira</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">CTR médio</span>
                    <span className="text-sm font-medium">3.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conversões</span>
                    <span className="text-sm font-medium">32</span>
                  </div>
                </div>
              </AnimatedComponent>

              <AnimatedComponent
                animation="slideUp"
                delay={0.2}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Tendências</h3>
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Crescimento CTR</span>
                    <span className="text-sm font-medium text-green-600">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Redução CPC</span>
                    <span className="text-sm font-medium text-green-600">-8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Aumento ROI</span>
                    <span className="text-sm font-medium text-green-600">+25%</span>
                  </div>
                </div>
              </AnimatedComponent>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Exportar Relatório
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedComponent
                animation="slideUp"
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Relatório Mensal</h3>
                <p className="text-sm text-gray-600 mb-4">Análise completa de performance do mês</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Última atualização</span>
                  <span className="text-gray-900">Hoje</span>
                </div>
              </AnimatedComponent>

              <AnimatedComponent
                animation="slideUp"
                delay={0.1}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <PieChart className="w-8 h-8 text-green-600" />
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Análise de Audiência</h3>
                <p className="text-sm text-gray-600 mb-4">Demografia e comportamento dos usuários</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Última atualização</span>
                  <span className="text-gray-900">Ontem</span>
                </div>
              </AnimatedComponent>

              <AnimatedComponent
                animation="slideUp"
                delay={0.2}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <TargetIcon className="w-8 h-8 text-purple-600" />
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ROI por Campanha</h3>
                <p className="text-sm text-gray-600 mb-4">Retorno sobre investimento detalhado</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Última atualização</span>
                  <span className="text-gray-900">2 dias atrás</span>
                </div>
              </AnimatedComponent>
            </div>
          </div>
        )}
      </div>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Agendar Consultoria</h3>
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Preferida
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário Preferido
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>09:00 - 10:00</option>
                    <option>10:00 - 11:00</option>
                    <option>14:00 - 15:00</option>
                    <option>15:00 - 16:00</option>
                    <option>16:00 - 17:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Conte um pouco sobre seu projeto..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // Aqui você implementaria o envio do formulário
                    alert('Consulta agendada com sucesso! Entraremos em contato em breve.');
                    setShowConsultationModal(false);
                  }}
                  className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Agendar Consultoria
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 