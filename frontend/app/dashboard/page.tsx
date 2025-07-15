'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play, 
  CheckCircle, 
  Calendar,
  Target,
  BarChart3,
  Trophy,
  Star,
  Users,
  FileText,
  Video,
  Download
} from 'lucide-react';

interface CourseProgress {
  id: number;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  image: string;
  category: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface RecentActivity {
  id: number;
  type: 'lesson_completed' | 'course_started' | 'certificate_earned' | 'quiz_passed';
  title: string;
  description: string;
  timestamp: string;
  course?: string;
}

const courseProgress: CourseProgress[] = [
  {
    id: 1,
    title: "React.js Avançado",
    progress: 75,
    totalLessons: 28,
    completedLessons: 21,
    lastAccessed: "2024-01-15",
    image: "/api/placeholder/300/200",
    category: "Frontend"
  },
  {
    id: 2,
    title: "Node.js e APIs RESTful",
    progress: 45,
    totalLessons: 22,
    completedLessons: 10,
    lastAccessed: "2024-01-14",
    image: "/api/placeholder/300/200",
    category: "Backend"
  },
  {
    id: 3,
    title: "Python para Data Science",
    progress: 20,
    totalLessons: 32,
    completedLessons: 6,
    lastAccessed: "2024-01-13",
    image: "/api/placeholder/300/200",
    category: "Data Science"
  }
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Complete sua primeira aula",
    icon: "🎯",
    earned: true,
    earnedDate: "2024-01-10"
  },
  {
    id: 2,
    title: "Dedicado",
    description: "Estude por 7 dias consecutivos",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-12"
  },
  {
    id: 3,
    title: "Curioso",
    description: "Complete 10 aulas",
    icon: "📚",
    earned: true,
    earnedDate: "2024-01-14"
  },
  {
    id: 4,
    title: "Especialista",
    description: "Complete um curso completo",
    icon: "🏆",
    earned: false
  },
  {
    id: 5,
    title: "Social",
    description: "Participe de 5 discussões",
    icon: "💬",
    earned: false
  }
];

const recentActivity: RecentActivity[] = [
  {
    id: 1,
    type: "lesson_completed",
    title: "Aula 21 concluída",
    description: "Você completou a aula 'Hooks Avançados' no curso React.js Avançado",
    timestamp: "2024-01-15T10:30:00",
    course: "React.js Avançado"
  },
  {
    id: 2,
    type: "quiz_passed",
    title: "Quiz aprovado",
    description: "Você passou no quiz 'Context API' com 85% de acerto",
    timestamp: "2024-01-14T16:45:00",
    course: "React.js Avançado"
  },
  {
    id: 3,
    type: "course_started",
    title: "Novo curso iniciado",
    description: "Você começou o curso 'Python para Data Science'",
    timestamp: "2024-01-13T09:15:00",
    course: "Python para Data Science"
  },
  {
    id: 4,
    type: "lesson_completed",
    title: "Aula 10 concluída",
    description: "Você completou a aula 'Express.js Básico' no curso Node.js e APIs RESTful",
    timestamp: "2024-01-12T14:20:00",
    course: "Node.js e APIs RESTful"
  }
];

const stats = {
  totalCourses: 3,
  totalHours: 45,
  certificates: 1,
  streak: 7,
  totalLessons: 60,
  completedLessons: 37
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson_completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'course_started': return <Play className="h-5 w-5 text-blue-500" />;
      case 'certificate_earned': return <Award className="h-5 w-5 text-yellow-500" />;
      case 'quiz_passed': return <FileText className="h-5 w-5 text-purple-500" />;
      default: return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lesson_completed': return 'bg-green-50 border-green-200';
      case 'course_started': return 'bg-blue-50 border-blue-200';
      case 'certificate_earned': return 'bg-yellow-50 border-yellow-200';
      case 'quiz_passed': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Bem-vindo de volta! Continue sua jornada de aprendizado.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-2 rounded-lg">
                <Flame className="h-5 w-5" />
                <span className="font-medium">{stats.streak} dias seguidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cursos Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Horas Estudadas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.certificates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Progresso Geral</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((stats.completedLessons / stats.totalLessons) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                { id: 'courses', label: 'Meus Cursos', icon: BookOpen },
                { id: 'achievements', label: 'Conquistas', icon: Trophy },
                { id: 'activity', label: 'Atividade', icon: Clock }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Visão Geral */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue de onde parou</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {courseProgress.slice(0, 2).map(course => (
                      <div key={course.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-600">{course.category}</p>
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progresso</span>
                                <span>{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Continuar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Conquistas Recentes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.filter(a => a.earned).slice(0, 3).map(achievement => (
                      <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Meus Cursos */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Meus Cursos</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Explorar Novos Cursos
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {courseProgress.map(course => (
                    <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white opacity-80" />
                        </div>
                        <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                          {course.category}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h4>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Progresso</span>
                            <span>{course.completedLessons}/{course.totalLessons} aulas</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {course.progress}% completo
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Último acesso: {new Date(course.lastAccessed).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">
                              <Download className="h-4 w-4 inline mr-1" />
                              Certificado
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                              Continuar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conquistas */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Conquistas</h3>
                  <div className="text-sm text-gray-600">
                    {achievements.filter(a => a.earned).length} de {achievements.length} conquistadas
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`border rounded-lg p-4 ${
                        achievement.earned 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.earnedDate && (
                            <p className="text-xs text-green-600 mt-1">
                              Conquistado em {new Date(achievement.earnedDate).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Atividade */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Atividade Recente</h3>
                
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div 
                      key={activity.id} 
                      className={`border rounded-lg p-4 ${getActivityColor(activity.type)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(activity.timestamp).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para o ícone Circle
function Circle({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" />
    </svg>
  );
}

// Componente auxiliar para o ícone Flame
function Flame({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
    </svg>
  );
} 