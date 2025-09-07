'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { navigationConfig } from '../navigation-config';

interface Course {
  id: number;
  slug: string;
  title: string;
  category: string;
  lessons: number;
  status: string;
  lastAccess: string;
  access: string;
}

interface Achievement {
  id: number;
  icon: string;
  title: string;
  description: string;
  earned: boolean;
}

interface RecentActivity {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

export default function CEODashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'fenixdevacademy@gmail.com' && password === '060223lk') {
      setIsAuthenticated(true);
    } else {
      alert('Acesso negado! Apenas o CEO Lucas Silva Petris tem acesso a esta área.');
    }
  };

  // Dados dos cursos disponíveis (14 cursos expandidos)
  const availableCourses: Course[] = [
    {
      id: 1,
      slug: 'fundamentos-desenvolvimento-web',
      title: 'Fundamentos de Desenvolvimento Web',
      category: 'Desenvolvimento Web',
      lessons: 72,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 2,
      slug: 'python-data-science',
      title: 'Python Data Science',
      category: 'Data Science',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 3,
      slug: 'react-avancado',
      title: 'React Avançado',
      category: 'Frontend',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 4,
      slug: 'nodejs-backend-development',
      title: 'Node.js Backend Development',
      category: 'Backend',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 5,
      slug: 'machine-learning-python',
      title: 'Machine Learning com Python',
      category: 'Data Science',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 6,
      slug: 'desenvolvimento-mobile',
      title: 'Desenvolvimento Mobile',
      category: 'Mobile',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 7,
      slug: 'cybersecurity-ethical-hacking',
      title: 'Cybersecurity e Ethical Hacking',
      category: 'Segurança',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 8,
      slug: 'devops-cicd',
      title: 'DevOps e CI/CD',
      category: 'DevOps',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 9,
      slug: 'flutter-mobile',
      title: 'Flutter Mobile Development',
      category: 'Mobile',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 10,
      slug: 'aws-cloud',
      title: 'AWS Cloud',
      category: 'Cloud',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 11,
      slug: 'blockchain-smart-contracts',
      title: 'Blockchain e Smart Contracts',
      category: 'Blockchain',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 12,
      slug: 'react-native-mobile',
      title: 'React Native Mobile Development',
      category: 'Mobile',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 13,
      slug: 'data-engineering',
      title: 'Data Engineering',
      category: 'Data Science',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    },
    {
      id: 14,
      slug: 'game-development',
      title: 'Game Development',
      category: 'Game Development',
      lessons: 600,
      status: 'Acesso total liberado',
      lastAccess: 'Hoje',
      access: 'CEO - Acesso Total'
    }
  ];

  // Conquistas do CEO
  const achievements: Achievement[] = [
    {
      id: 1,
      icon: '👑',
      title: 'CEO Fundador',
      description: 'Fundador da Fenix Dev Academy',
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

  // Atividades recentes
  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      title: 'Acesso total liberado',
      description: 'Todos os 14 cursos expandidos estão disponíveis',
      timestamp: 'Agora'
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">👑 Área do CEO</h1>
            <p className="text-gray-600">Dashboard Executivo - Fenix Academy</p>
            <div className="mt-4 space-y-2">
              <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full inline-block">
                ✅ Acesso Total
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full inline-block">
                ✅ Dashboard Executivo
              </div>
              <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full inline-block">
                ✅ Gestão de Tráfego
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="fenixdevacademy@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition duration-300"
            >
              👑 Acessar Área do CEO
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">👑 Área do CEO</h1>
              <p className="text-gray-600">Dashboard Executivo • Gestão de Tráfego • Acesso Total • Lucas Silva Petris</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  ✅ Acesso Total
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  ✅ Dashboard Executivo
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                  ✅ Gestão de Tráfego
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Boas-vindas */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta, Lucas Silva Petris!</h2>
          <p className="text-purple-100">Você tem acesso total à plataforma.</p>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <span className="text-white text-xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cursos Disponíveis</p>
                <p className="text-2xl font-bold text-gray-900">14</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <span className="text-white text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cursos Concluídos</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg">
                <span className="text-white text-xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Horas Totais</p>
                <p className="text-2xl font-bold text-gray-900">4.000+</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="p-2 bg-orange-500 rounded-lg">
                <span className="text-white text-xl">🏆</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Aulas</p>
                <p className="text-2xl font-bold text-gray-900">7.200+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🚀 Ações Rápidas CEO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/ceo-dashboard" className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition duration-300">
              <div className="text-blue-600 text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-blue-900">Dashboard Executivo</h3>
            </Link>
            <Link href="/gestao-trafego" className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition duration-300">
              <div className="text-green-600 text-2xl mb-2">🚦</div>
              <h3 className="font-semibold text-green-900">Gestão de Tráfego</h3>
            </Link>
            <Link href="/my-courses" className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center transition duration-300">
              <div className="text-purple-600 text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-purple-900">Todos os Cursos</h3>
            </Link>
            <Link href="/ceo-dashboard/course-content" className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-center transition duration-300">
              <div className="text-orange-600 text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-orange-900">Conteúdo dos Cursos</h3>
            </Link>

            <Link href="/ide" className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center transition duration-300">
              <div className="text-purple-600 text-2xl mb-2">🚀</div>
              <h3 className="font-semibold text-purple-900">FENIX IDE</h3>
            </Link>
          </div>
        </div>

        {/* Cursos Disponíveis */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Todos os 14 Cursos Expandidos (Acesso Total)</h2>
            <Link href="/my-courses" className="text-blue-600 hover:text-blue-700 font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                    {course.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {course.lessons} aulas disponíveis • {course.status} • Último acesso: {course.lastAccess}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 text-sm font-medium">✓ {course.access}</span>
                  <Link
                    href={navigationConfig.getRedirectUrl(course.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300 inline-block text-center"
                  >
                    Acessar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conquistas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🏆 Conquistas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Atividade Recente</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}