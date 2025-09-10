'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Play,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  Star,
  Users,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  Lock,
  Eye,
  Download,
  Share2,
  Settings,
  Bell,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  thumbnail: string;
  isLocked: boolean;
  isCompleted: boolean;
  lastAccessed?: string;
  rating: number;
  students: number;
}

interface UserStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
  certificates: number;
  streak: number;
  level: string;
  xp: number;
}

const DashboardPage: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalHours: 0,
    certificates: 0,
    streak: 0,
    level: 'Iniciante',
    xp: 0
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed' | 'locked'>('all');

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setUserStats({
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        totalHours: 0,
        certificates: 0,
        streak: 0,
        level: 'Iniciante',
        xp: 0
      });

      setCourses([]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    switch (filter) {
      case 'in-progress':
        return course.progress > 0 && course.progress < 100;
      case 'completed':
        return course.isCompleted;
      case 'locked':
        return course.isLocked;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Bem-vindo de volta! Vamos continuar sua jornada de aprendizado.</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cursos Totais</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.completedCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Em Progresso</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.inProgressCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificados</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.certificates}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Seu dashboard está vazio
          </h3>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Você ainda não tem cursos em seu dashboard. Explore nossa biblioteca de cursos e comece sua jornada de aprendizado!
          </p>

          <div className="space-y-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Explorar Cursos
            </button>

            <div className="text-sm text-gray-500">
              <p>💡 <strong>Dica:</strong> Comece com nossos cursos gratuitos ou escolha um plano para acessar todo o conteúdo!</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Play className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Continuar Aprendendo</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Retome seus cursos em andamento e continue de onde parou.
            </p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Ver cursos em progresso →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Meus Certificados</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Visualize e baixe seus certificados de conclusão.
            </p>
            <button className="text-green-600 text-sm font-medium hover:text-green-700">
              Ver certificados →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Meu Progresso</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Acompanhe suas estatísticas e conquistas.
            </p>
            <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
              Ver progresso →
            </button>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto para começar sua jornada?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Descubra nossos cursos de programação, desenvolvimento web, mobile e muito mais.
              Aprenda com os melhores instrutores e construa projetos reais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Explorar Cursos
              </button>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors">
                Ver Planos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;