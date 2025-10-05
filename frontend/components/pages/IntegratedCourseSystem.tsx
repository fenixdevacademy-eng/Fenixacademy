import React, { useState } from 'react';
import {
    BookOpen,
    Trophy,
    BarChart3,
    Users,
    Settings,
    Home,
    Menu,
    X,
    Bell,
    Search,
    User
} from 'lucide-react';
import CourseSystem from './CourseSystem';
import LessonDetail from './LessonDetail';
import CertificateSystem from './CertificateSystem';

type ViewType = 'courses' | 'lessons' | 'certificates' | 'dashboard';

interface Module {
    id: number;
    title: string;
    focus: string;
    project: string;
    lessons: any[];
    exercises: any[];
    projectDetails: any;
}

const IntegratedCourseSystem: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('courses');
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock data for demonstration
    const mockModule: Module = {
        id: 1,
        title: 'HTML5 Semântico',
        focus: 'HTML5 Semântico',
        project: 'Portfólio Pessoal',
        lessons: [
            {
                id: 1,
                title: 'Introdução ao HTML5',
                duration: '90 min',
                type: 'text',
                completed: false,
                content: 'Nesta aula, você aprenderá os fundamentos do HTML5 e como criar estruturas semânticas modernas.',
                objectives: [
                    'Compreender a evolução do HTML',
                    'Aprender elementos semânticos',
                    'Criar estrutura básica de documento',
                    'Aplicar boas práticas de acessibilidade'
                ],
                codeExample: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Site</title>
</head>
<body>
    <header>
        <h1>Bem-vindo ao meu site</h1>
    </header>
    <main>
        <section>
            <h2>Sobre mim</h2>
            <p>Conteúdo da seção...</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Meu Site</p>
    </footer>
</body>
</html>`,
                resources: [
                    'Documentação MDN HTML5',
                    'Guia de Acessibilidade WCAG',
                    'Validador HTML W3C',
                    'Tutorial HTML5 Completo'
                ]
            },
            {
                id: 2,
                title: 'Elementos Semânticos',
                duration: '90 min',
                type: 'video',
                completed: false,
                content: 'Aprenda sobre os elementos semânticos do HTML5 e como usá-los para criar páginas mais acessíveis.',
                objectives: [
                    'Entender elementos semânticos',
                    'Usar header, nav, main, section',
                    'Aplicar article e aside',
                    'Criar estrutura semântica'
                ],
                codeExample: `<header>
    <h1>Logo da Empresa</h1>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
        </ul>
    </nav>
</header>
<main>
    <section>
        <h2>Últimas Notícias</h2>
        <article>
            <h3>Título da Notícia</h3>
            <p>Conteúdo da notícia...</p>
        </article>
    </section>
    <aside>
        <h3>Links Relacionados</h3>
        <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
        </ul>
    </aside>
</main>`,
                resources: [
                    'Elementos Semânticos HTML5',
                    'Guia de Navegação Acessível',
                    'Exemplos de Estrutura Semântica'
                ]
            }
        ],
        exercises: [
            {
                id: 1,
                title: 'Criar Estrutura Semântica',
                description: 'Crie uma página HTML5 com estrutura semântica completa usando header, nav, main, section, article e footer.',
                difficulty: 'easy',
                estimatedTime: '30 min',
                completed: false
            },
            {
                id: 2,
                title: 'Formulário HTML5',
                description: 'Desenvolva um formulário de contato usando os novos elementos de input do HTML5.',
                difficulty: 'medium',
                estimatedTime: '45 min',
                completed: false
            }
        ],
        projectDetails: {
            title: 'Portfólio Pessoal',
            description: 'Desenvolva um portfólio pessoal completo usando HTML5 semântico, CSS3 moderno e JavaScript.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            requirements: [
                'Estrutura semântica HTML5',
                'Design responsivo',
                'Formulário de contato',
                'Galeria de projetos',
                'Deploy no GitHub Pages'
            ],
            deliverables: [
                'Código fonte no GitHub',
                'Site funcionando online',
                'README com instruções',
                'Documentação técnica'
            ]
        }
    }

    const navigation = [
        { id: 'courses', label: 'Cursos', icon: BookOpen, description: 'Explore todos os cursos' },
        { id: 'lessons', label: 'Aulas', icon: BookOpen, description: 'Acesse as aulas' },
        { id: 'certificates', label: 'Certificados', icon: Trophy, description: 'Veja seus certificados' },
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Acompanhe seu progresso' }
    ];

    const stats = {
        totalCourses: 3,
        totalModules: 60,
        totalLessons: 1200,
        completedLessons: 45,
        certificates: 1,
        inProgress: 2
    }

    const renderContent = () => {
        switch (currentView) {
            case 'courses':
                return <CourseSystem />;
            case 'lessons':
                return selectedModule ? (
                    <LessonDetail module={selectedModule} onBack={() => setSelectedModule(null)} />
                ) : (
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecione um Módulo</h2>
                            <p className="text-gray-600">Escolha um módulo para começar suas aulas</p>
                        </div>
                    </div>
                );
            case 'certificates':
                return <CertificateSystem />;
            case 'dashboard':
                return <DashboardView stats={stats} />;
            default:
                return <CourseSystem />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                        <Sidebar
                            navigation={navigation}
                            currentView={currentView}
                            onViewChange={setCurrentView}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
            )}

            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 bg-white shadow-lg">
                    <Sidebar
                        navigation={navigation}
                        currentView={currentView}
                        onViewChange={setCurrentView}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-h-screen">
                    {/* Top Bar */}
                    <div className="bg-white shadow-sm border-b px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Fenix Dev Academy
                                </h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar cursos, aulas..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <User className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Sidebar: React.FC<{
    navigation: any[];
    currentView: string;
    onViewChange: (view: ViewType) => void;
    onClose?: () => void;
}> = ({ navigation, currentView, onViewChange, onClose }) => {
    return (
        <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">F</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Fenix Academy</h2>
                        <p className="text-xs text-gray-500">Sistema de Cursos</p>
                    </div>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                onViewChange(item.id as ViewType);
                                onClose?.();
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${currentView === item.id
                                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <div>
                                <div className="font-medium">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                            João Silva
                        </div>
                        <div className="text-xs text-gray-500">
                            Desenvolvedor
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DashboardView: React.FC<{ stats: any }> = ({ stats }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total de Cursos</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <BookOpen className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Aulas Concluídas</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completedLessons}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Trophy className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Certificados</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.certificates}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <BarChart3 className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Em Progresso</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Progresso Geral</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Web Fundamentals</span>
                                <span>15%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>React & Frontend</span>
                                <span>0%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Backend & Full-Stack</span>
                                <span>0%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntegratedCourseSystem;

import {
    BookOpen,
    Trophy,
    BarChart3,
    Users,
    Settings,
    Home,
    Menu,
    X,
    Bell,
    Search,
    User
} from 'lucide-react';
import CourseSystem from './CourseSystem';
import LessonDetail from './LessonDetail';
import CertificateSystem from './CertificateSystem';

type ViewType = 'courses' | 'lessons' | 'certificates' | 'dashboard';

interface Module {
    id: number;
    title: string;
    focus: string;
    project: string;
    lessons: any[];
    exercises: any[];
    projectDetails: any;
}

const IntegratedCourseSystem: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('courses');
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock data for demonstration
    const mockModule: Module = {
        id: 1,
        title: 'HTML5 Semântico',
        focus: 'HTML5 Semântico',
        project: 'Portfólio Pessoal',
        lessons: [
            {
                id: 1,
                title: 'Introdução ao HTML5',
                duration: '90 min',
                type: 'text',
                completed: false,
                content: 'Nesta aula, você aprenderá os fundamentos do HTML5 e como criar estruturas semânticas modernas.',
                objectives: [
                    'Compreender a evolução do HTML',
                    'Aprender elementos semânticos',
                    'Criar estrutura básica de documento',
                    'Aplicar boas práticas de acessibilidade'
                ],
                codeExample: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Site</title>
</head>
<body>
    <header>
        <h1>Bem-vindo ao meu site</h1>
    </header>
    <main>
        <section>
            <h2>Sobre mim</h2>
            <p>Conteúdo da seção...</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Meu Site</p>
    </footer>
</body>
</html>`,
                resources: [
                    'Documentação MDN HTML5',
                    'Guia de Acessibilidade WCAG',
                    'Validador HTML W3C',
                    'Tutorial HTML5 Completo'
                ]
            },
            {
                id: 2,
                title: 'Elementos Semânticos',
                duration: '90 min',
                type: 'video',
                completed: false,
                content: 'Aprenda sobre os elementos semânticos do HTML5 e como usá-los para criar páginas mais acessíveis.',
                objectives: [
                    'Entender elementos semânticos',
                    'Usar header, nav, main, section',
                    'Aplicar article e aside',
                    'Criar estrutura semântica'
                ],
                codeExample: `<header>
    <h1>Logo da Empresa</h1>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
        </ul>
    </nav>
</header>
<main>
    <section>
        <h2>Últimas Notícias</h2>
        <article>
            <h3>Título da Notícia</h3>
            <p>Conteúdo da notícia...</p>
        </article>
    </section>
    <aside>
        <h3>Links Relacionados</h3>
        <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
        </ul>
    </aside>
</main>`,
                resources: [
                    'Elementos Semânticos HTML5',
                    'Guia de Navegação Acessível',
                    'Exemplos de Estrutura Semântica'
                ]
            }
        ],
        exercises: [
            {
                id: 1,
                title: 'Criar Estrutura Semântica',
                description: 'Crie uma página HTML5 com estrutura semântica completa usando header, nav, main, section, article e footer.',
                difficulty: 'easy',
                estimatedTime: '30 min',
                completed: false
            },
            {
                id: 2,
                title: 'Formulário HTML5',
                description: 'Desenvolva um formulário de contato usando os novos elementos de input do HTML5.',
                difficulty: 'medium',
                estimatedTime: '45 min',
                completed: false
            }
        ],
        projectDetails: {
            title: 'Portfólio Pessoal',
            description: 'Desenvolva um portfólio pessoal completo usando HTML5 semântico, CSS3 moderno e JavaScript.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            requirements: [
                'Estrutura semântica HTML5',
                'Design responsivo',
                'Formulário de contato',
                'Galeria de projetos',
                'Deploy no GitHub Pages'
            ],
            deliverables: [
                'Código fonte no GitHub',
                'Site funcionando online',
                'README com instruções',
                'Documentação técnica'
            ]
        }
    }

    const navigation = [
        { id: 'courses', label: 'Cursos', icon: BookOpen, description: 'Explore todos os cursos' },
        { id: 'lessons', label: 'Aulas', icon: BookOpen, description: 'Acesse as aulas' },
        { id: 'certificates', label: 'Certificados', icon: Trophy, description: 'Veja seus certificados' },
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Acompanhe seu progresso' }
    ];

    const stats = {
        totalCourses: 3,
        totalModules: 60,
        totalLessons: 1200,
        completedLessons: 45,
        certificates: 1,
        inProgress: 2
    }

    const renderContent = () => {
        switch (currentView) {
            case 'courses':
                return <CourseSystem />;
            case 'lessons':
                return selectedModule ? (
                    <LessonDetail module={selectedModule} onBack={() => setSelectedModule(null)} />
                ) : (
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecione um Módulo</h2>
                            <p className="text-gray-600">Escolha um módulo para começar suas aulas</p>
                        </div>
                    </div>
                );
            case 'certificates':
                return <CertificateSystem />;
            case 'dashboard':
                return <DashboardView stats={stats} />;
            default:
                return <CourseSystem />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                        <Sidebar
                            navigation={navigation}
                            currentView={currentView}
                            onViewChange={setCurrentView}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
            )}

            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 bg-white shadow-lg">
                    <Sidebar
                        navigation={navigation}
                        currentView={currentView}
                        onViewChange={setCurrentView}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-h-screen">
                    {/* Top Bar */}
                    <div className="bg-white shadow-sm border-b px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Fenix Dev Academy
                                </h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar cursos, aulas..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <User className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Sidebar: React.FC<{
    navigation: any[];
    currentView: string;
    onViewChange: (view: ViewType) => void;
    onClose?: () => void;
}> = ({ navigation, currentView, onViewChange, onClose }) => {
    return (
        <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">F</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Fenix Academy</h2>
                        <p className="text-xs text-gray-500">Sistema de Cursos</p>
                    </div>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                onViewChange(item.id as ViewType);
                                onClose?.();
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${currentView === item.id
                                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <div>
                                <div className="font-medium">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                            João Silva
                        </div>
                        <div className="text-xs text-gray-500">
                            Desenvolvedor
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DashboardView: React.FC<{ stats: any }> = ({ stats }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total de Cursos</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <BookOpen className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Aulas Concluídas</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completedLessons}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Trophy className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Certificados</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.certificates}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <BarChart3 className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Em Progresso</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Progresso Geral</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Web Fundamentals</span>
                                <span>15%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>React & Frontend</span>
                                <span>0%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Backend & Full-Stack</span>
                                <span>0%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntegratedCourseSystem;















































