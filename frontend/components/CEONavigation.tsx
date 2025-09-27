'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import {
  BarChart3,
  Users,
  DollarSign,
  Settings,
  TrendingUp,
  FileText,
  Shield,
  Database,
  Activity,
  Target,
  Briefcase,
  Lightbulb,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';

export default function CEONavigation() {
  const { isCEO } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isCEO) {
    return null;
  }

  const navigationItems = [
    {
      label: 'Dashboard',
      href: '/ceo/dashboard',
      icon: BarChart3,
      description: 'Visão geral do negócio'
    },
    {
      label: 'Receita',
      href: '/ceo/revenue',
      icon: DollarSign,
      description: 'Análise de receita e vendas'
    },
    {
      label: 'Analytics',
      href: '/ceo/analytics',
      icon: TrendingUp,
      description: 'Métricas e insights'
    },
    {
      label: 'Relatórios',
      href: '/ceo/reports',
      icon: FileText,
      description: 'Relatórios detalhados'
    },
    {
      label: 'Usuários',
      href: '/ceo/users',
      icon: Users,
      description: 'Gerenciamento de usuários'
    },
    {
      label: 'Equipe',
      href: '/ceo/team',
      icon: Briefcase,
      description: 'Gestão da equipe'
    },
    {
      label: 'Projetos',
      href: '/ceo/projects',
      icon: Target,
      description: 'Projetos estratégicos'
    },
    {
      label: 'Estratégia',
      href: '/ceo/strategy',
      icon: Lightbulb,
      description: 'Planejamento estratégico'
    },
    {
      label: 'Segurança',
      href: '/ceo/security',
      icon: Shield,
      description: 'Configurações de segurança'
    },
    {
      label: 'Dados',
      href: '/ceo/data',
      icon: Database,
      description: 'Gestão de dados'
    },
    {
      label: 'Performance',
      href: '/ceo/performance',
      icon: Activity,
      description: 'Monitoramento de performance'
    },
    {
      label: 'Configurações',
      href: '/ceo/settings',
      icon: Settings,
      description: 'Configurações gerais'
    }
  ];

  return (
    <div className="ceo-navigation bg-white shadow-lg rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          CEO Dashboard
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isExpanded ? (
            <EyeOff className="w-4 h-4 text-gray-600" />
          ) : (
            <Eye className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 group-hover:text-blue-600">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!isExpanded && (
        <div className="grid grid-cols-3 gap-2">
          {navigationItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <Icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 text-center">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}