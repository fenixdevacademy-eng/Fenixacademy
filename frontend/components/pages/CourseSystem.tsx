import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Code,
    Trophy,
    Award,
    Play,
    CheckCircle,
    Clock,
    Users,
    Star,
    ChevronRight,
    ChevronDown,
    Download,
    ExternalLink,
    Target,
    Zap
} from 'lucide-react';

interface Module {
    id: number;
    title: string;
    focus: string;
    project: string;
    lessons: number;
    duration: string;
    level: 'iniciante' | 'intermediario' | 'avancado' | 'expert';
    completed: boolean;
    progress: number;
}

interface Course {
    id: string;
    name: string;
    description: string;
    modules: Module[];
    totalLessons: number;
    totalDuration: string;
    certificates: string[];
}

interface Assessment {
    id: string;
    level: string;
    certificate: string;
    modules: number[];
    status: 'not-started' | 'in-progress' | 'completed';
    score?: number;
}

const CourseSystem: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState<string>('web-fundamentals');
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    const [showAssessment, setShowAssessment] = useState(false);

    // Dados dos cursos
    const courses: Course[] = [
        {
            id: 'web-fundamentals',
            name: 'Web Fundamentals',
            description: 'Fundamentos do desenvolvimento web moderno',
            totalLessons: 400,
            totalDuration: '600 horas',
            modules: [
                { id: 1, title: 'HTML5 Semântico', focus: 'HTML5 Semântico', project: 'Portfólio Pessoal', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 2, title: 'CSS3 Moderno', focus: 'CSS3 Moderno', project: 'Landing Page Responsiva', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 15 },
                { id: 3, title: 'JavaScript Básico', focus: 'JavaScript Básico', project: 'Calculadora Interativa', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 4, title: 'DOM Manipulation', focus: 'DOM Manipulation', project: 'To-Do List', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 5, title: 'Event Handling', focus: 'Event Handling', project: 'Jogo da Memória', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 6, title: 'AJAX e APIs', focus: 'AJAX e APIs', project: 'Clima App', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 7, title: 'Local Storage', focus: 'Local Storage', project: 'Notas App', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 8, title: 'Responsive Design', focus: 'Responsive Design', project: 'Blog Responsivo', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 9, title: 'CSS Grid', focus: 'CSS Grid', project: 'Dashboard Layout', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 10, title: 'CSS Flexbox', focus: 'CSS Flexbox', project: 'Galeria de Fotos', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 11, title: 'Animations CSS', focus: 'Animations CSS', project: 'Portfólio Animado', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 12, title: 'Web APIs', focus: 'Web APIs', project: 'Geolocalização App', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 13, title: 'Performance', focus: 'Performance', project: 'Site Otimizado', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 14, title: 'Acessibilidade', focus: 'Acessibilidade', project: 'App Acessível', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 15, title: 'SEO', focus: 'SEO', project: 'Site SEO Otimizado', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 16, title: 'PWA', focus: 'PWA', project: 'App PWA', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 17, title: 'Testing', focus: 'Testing', project: 'App com Testes', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 18, title: 'Build Tools', focus: 'Build Tools', project: 'Setup Webpack', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 19, title: 'Deploy', focus: 'Deploy', project: 'Deploy Automatizado', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 20, title: 'Projeto Final', focus: 'Projeto Final', project: 'E-commerce Completo', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 }
            ],
            certificates: ['Web Developer Iniciante', 'Web Developer Intermediário', 'Web Developer Avançado', 'Web Developer Expert']
        },
        {
            id: 'react-frontend',
            name: 'React & Frontend Avançado',
            description: 'Desenvolvimento frontend com React e ecossistema',
            totalLessons: 400,
            totalDuration: '600 horas',
            modules: [
                { id: 21, title: 'React Fundamentos', focus: 'React Fundamentos', project: 'Componente Básico', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 22, title: 'JSX e Props', focus: 'JSX e Props', project: 'Lista de Produtos', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 23, title: 'State e Hooks', focus: 'State e Hooks', project: 'Contador Avançado', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 24, title: 'Event Handling', focus: 'Event Handling', project: 'Formulário Dinâmico', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 25, title: 'Lifecycle', focus: 'Lifecycle', project: 'Timer Component', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 26, title: 'useEffect', focus: 'useEffect', project: 'Data Fetcher', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 27, title: 'Custom Hooks', focus: 'Custom Hooks', project: 'Hook Personalizado', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 28, title: 'Context API', focus: 'Context API', project: 'Theme Switcher', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 29, title: 'React Router', focus: 'React Router', project: 'SPA Multi-página', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 30, title: 'Form Handling', focus: 'Form Handling', project: 'Formulário Complexo', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 31, title: 'API Integration', focus: 'API Integration', project: 'CRUD App', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 32, title: 'State Management', focus: 'State Management', project: 'Shopping Cart', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 33, title: 'Redux Básico', focus: 'Redux Básico', project: 'Redux Counter', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 34, title: 'Redux Toolkit', focus: 'Redux Toolkit', project: 'Redux Todo', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 35, title: 'Testing', focus: 'Testing', project: 'App com Testes', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 36, title: 'Performance', focus: 'Performance', project: 'App Otimizado', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 37, title: 'Next.js', focus: 'Next.js', project: 'Blog Next.js', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 38, title: 'TypeScript', focus: 'TypeScript', project: 'App TypeScript', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 39, title: 'Deploy', focus: 'Deploy', project: 'Deploy Vercel', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 40, title: 'Projeto Final', focus: 'Projeto Final', project: 'Rede Social', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 }
            ],
            certificates: ['React Developer Iniciante', 'React Developer Intermediário', 'React Developer Avançado', 'React Developer Expert']
        },
        {
            id: 'backend-fullstack',
            name: 'Backend & Full-Stack',
            description: 'Desenvolvimento backend e aplicações full-stack',
            totalLessons: 400,
            totalDuration: '600 horas',
            modules: [
                { id: 41, title: 'Node.js Básico', focus: 'Node.js Básico', project: 'Servidor HTTP', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 42, title: 'Express.js', focus: 'Express.js', project: 'API REST Básica', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 43, title: 'Middleware', focus: 'Middleware', project: 'Auth Middleware', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 44, title: 'Routing', focus: 'Routing', project: 'API Estruturada', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 45, title: 'Templates', focus: 'Templates', project: 'Site com EJS', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 46, title: 'Static Files', focus: 'Static Files', project: 'File Server', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 47, title: 'Form Handling', focus: 'Form Handling', project: 'Upload de Arquivos', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 48, title: 'Sessions', focus: 'Sessions', project: 'Login System', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 49, title: 'Authentication', focus: 'Authentication', project: 'JWT Auth', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 50, title: 'Database', focus: 'Database', project: 'CRUD com SQLite', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 51, title: 'MongoDB', focus: 'MongoDB', project: 'NoSQL App', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 52, title: 'Mongoose', focus: 'Mongoose', project: 'Blog com MongoDB', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 53, title: 'REST APIs', focus: 'REST APIs', project: 'API Completa', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 54, title: 'API Design', focus: 'API Design', project: 'API Documentada', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 55, title: 'Error Handling', focus: 'Error Handling', project: 'Error Management', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 56, title: 'Validation', focus: 'Validation', project: 'Data Validation', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 57, title: 'Testing', focus: 'Testing', project: 'API com Testes', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 58, title: 'Docker', focus: 'Docker', project: 'Containerização', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 59, title: 'Deploy', focus: 'Deploy', project: 'Deploy Heroku', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 60, title: 'Projeto Final', focus: 'Projeto Final', project: 'E-commerce Backend', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 }
            ],
            certificates: ['Backend Developer Iniciante', 'Backend Developer Intermediário', 'Backend Developer Avançado', 'Backend Developer Expert']
        }
    ];

    const assessments: Assessment[] = [
        { id: 'web-iniciante', level: 'Iniciante', certificate: 'Web Developer Iniciante', modules: [1, 2, 3, 4, 5], status: 'not-started' },
        { id: 'web-intermediario', level: 'Intermediário', certificate: 'Web Developer Intermediário', modules: [6, 7, 8, 9, 10], status: 'not-started' },
        { id: 'web-avancado', level: 'Avançado', certificate: 'Web Developer Avançado', modules: [11, 12, 13, 14, 15], status: 'not-started' },
        { id: 'web-expert', level: 'Expert', certificate: 'Web Developer Expert', modules: [16, 17, 18, 19, 20], status: 'not-started' },
        { id: 'react-iniciante', level: 'Iniciante', certificate: 'React Developer Iniciante', modules: [21, 22, 23, 24, 25], status: 'not-started' },
        { id: 'react-intermediario', level: 'Intermediário', certificate: 'React Developer Intermediário', modules: [26, 27, 28, 29, 30], status: 'not-started' },
        { id: 'react-avancado', level: 'Avançado', certificate: 'React Developer Avançado', modules: [31, 32, 33, 34, 35], status: 'not-started' },
        { id: 'react-expert', level: 'Expert', certificate: 'React Developer Expert', modules: [36, 37, 38, 39, 40], status: 'not-started' },
        { id: 'backend-iniciante', level: 'Iniciante', certificate: 'Backend Developer Iniciante', modules: [41, 42, 43, 44, 45], status: 'not-started' },
        { id: 'backend-intermediario', level: 'Intermediário', certificate: 'Backend Developer Intermediário', modules: [46, 47, 48, 49, 50], status: 'not-started' },
        { id: 'backend-avancado', level: 'Avançado', certificate: 'Backend Developer Avançado', modules: [51, 52, 53, 54, 55], status: 'not-started' },
        { id: 'backend-expert', level: 'Expert', certificate: 'Backend Developer Expert', modules: [56, 57, 58, 59, 60], status: 'not-started' }
    ];

    const currentCourse = courses.find(course => course.id === selectedCourse) || courses[0];

    const toggleModule = (moduleId: number) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId);
        } else {
            newExpanded.add(moduleId);
        }
        setExpandedModules(newExpanded);
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'iniciante': return 'bg-green-100 text-green-800';
            case 'intermediario': return 'bg-blue-100 text-blue-800';
            case 'avancado': return 'bg-orange-100 text-orange-800';
            case 'expert': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'not-started': return 'bg-gray-100 text-gray-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'not-started': return <Clock className="w-4 h-4" />;
            case 'in-progress': return <Play className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🎓 Sistema de Cursos Fenix
                            </h1>
                            <p className="text-gray-600 mt-2">
                                60 Módulos • 1.200 Aulas • 12 Certificados
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-indigo-600">1.200</div>
                                <div className="text-sm text-gray-500">Aulas</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">60</div>
                                <div className="text-sm text-gray-500">Módulos</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-purple-600">12</div>
                                <div className="text-sm text-gray-500">Certificados</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Cursos */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Cursos Disponíveis</h2>
                            <div className="space-y-3">
                                {courses.map((course) => (
                                    <button
                                        key={course.id}
                                        onClick={() => setSelectedCourse(course.id)}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedCourse === course.id
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{course.name}</h3>
                                                <p className="text-sm text-gray-600">{course.description}</p>
                                                <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                                                    <span className="flex items-center">
                                                        <BookOpen className="w-3 h-3 mr-1" />
                                                        {course.totalLessons} aulas
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {course.totalDuration}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Certificados */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Certificados</h2>
                            <div className="space-y-2">
                                {currentCourse.certificates.map((certificate, index) => (
                                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <Award className="w-5 h-5 text-yellow-500 mr-3" />
                                        <span className="text-sm font-medium text-gray-900">{certificate}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Course Header */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{currentCourse.name}</h2>
                                    <p className="text-gray-600 mt-2">{currentCourse.description}</p>
                                    <div className="flex items-center mt-4 space-x-6">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            {currentCourse.totalLessons} aulas
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {currentCourse.totalDuration}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users className="w-4 h-4 mr-2" />
                                            20 módulos
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAssessment(!showAssessment)}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                                >
                                    <Trophy className="w-5 h-5 mr-2" />
                                    Avaliações
                                </button>
                            </div>
                        </div>

                        {/* Modules Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentCourse.modules.map((module) => (
                                <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-indigo-600 font-bold">{module.id}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                                                    <p className="text-sm text-gray-600">{module.focus}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                                                {module.level}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                                <span>Progresso</span>
                                                <span>{module.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${module.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Projeto:</span>
                                                <span className="font-medium text-gray-900">{module.project}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Aulas:</span>
                                                <span className="font-medium text-gray-900">{module.lessons} aulas</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Duração:</span>
                                                <span className="font-medium text-gray-900">{module.duration}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex space-x-3">
                                            <button
                                                onClick={() => setSelectedModule(module.id)}
                                                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                Iniciar Módulo
                                            </button>
                                            <button
                                                onClick={() => toggleModule(module.id)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                {expandedModules.has(module.id) ? (
                                                    <ChevronDown className="w-4 h-4" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Expanded Module Details */}
                                        {expandedModules.has(module.id) && (
                                            <div className="mt-6 pt-6 border-t border-gray-200">
                                                <h4 className="font-semibold text-gray-900 mb-3">Aulas do Módulo</h4>
                                                <div className="space-y-2">
                                                    {Array.from({ length: module.lessons }, (_, i) => (
                                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                            <div className="flex items-center">
                                                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                                                                    <span className="text-xs font-medium text-gray-600">{i + 1}</span>
                                                                </div>
                                                                <span className="text-sm text-gray-900">
                                                                    Aula {i + 1} - {module.focus}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <button className="text-indigo-600 hover:text-indigo-800">
                                                                    <Play className="w-4 h-4" />
                                                                </button>
                                                                <button className="text-green-600 hover:text-green-800">
                                                                    <CheckCircle className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 grid grid-cols-2 gap-4">
                                                    <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                                        <Code className="w-4 h-4 mr-2" />
                                                        Exercícios
                                                    </button>
                                                    <button className="flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                                                        <Target className="w-4 h-4 mr-2" />
                                                        Projeto
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Assessment Modal */}
                {showAssessment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Sistema de Avaliação</h2>
                                    <button
                                        onClick={() => setShowAssessment(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {assessments.map((assessment) => (
                                        <div key={assessment.id} className="bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold text-gray-900">{assessment.certificate}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(assessment.status)}`}>
                                                    {getStatusIcon(assessment.status)}
                                                    <span className="ml-1">{assessment.status}</span>
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="text-sm text-gray-600">
                                                    <strong>Nível:</strong> {assessment.level}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <strong>Módulos:</strong> {assessment.modules.join(', ')}
                                                </div>

                                                <div className="flex space-x-2 mt-4">
                                                    <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                                        Iniciar Avaliação
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Module Detail Modal */}
                {selectedModule && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Módulo {selectedModule} - {currentCourse.modules.find(m => m.id === selectedModule)?.title}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedModule(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Informações do Módulo</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Foco:</span>
                                                <span className="ml-2 font-medium">{currentCourse.modules.find(m => m.id === selectedModule)?.focus}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Projeto:</span>
                                                <span className="ml-2 font-medium">{currentCourse.modules.find(m => m.id === selectedModule)?.project}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Aulas:</span>
                                                <span className="ml-2 font-medium">{currentCourse.modules.find(m => m.id === selectedModule)?.lessons}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Duração:</span>
                                                <span className="ml-2 font-medium">{currentCourse.modules.find(m => m.id === selectedModule)?.duration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Ações Disponíveis</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="flex items-center justify-center p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                                <Play className="w-5 h-5 mr-2" />
                                                Iniciar Aulas
                                            </button>
                                            <button className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                <Code className="w-5 h-5 mr-2" />
                                                Exercícios
                                            </button>
                                            <button className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                                <Target className="w-5 h-5 mr-2" />
                                                Projeto
                                            </button>
                                            <button className="flex items-center justify-center p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                                <Trophy className="w-5 h-5 mr-2" />
                                                Avaliação
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseSystem;

import {
    BookOpen,
    Code,
    Trophy,
    Award,
    Play,
    CheckCircle,
    Clock,
    Users,
    Star,
    ChevronRight,
    ChevronDown,
    Download,
    ExternalLink,
    Target,
    Zap
} from 'lucide-react';

interface Module {
    id: number;
    title: string;
    focus: string;
    project: string;
    lessons: number;
    duration: string;
    level: 'iniciante' | 'intermediario' | 'avancado' | 'expert';
    completed: boolean;
    progress: number;
}

interface Course {
    id: string;
    name: string;
    description: string;
    modules: Module[];
    totalLessons: number;
    totalDuration: string;
    certificates: string[];
}

interface Assessment {
    id: string;
    level: string;
    certificate: string;
    modules: number[];
    status: 'not-started' | 'in-progress' | 'completed';
    score?: number;
}

const CourseSystem: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState<string>('web-fundamentals');
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    const [showAssessment, setShowAssessment] = useState(false);

    // Dados dos cursos
    const courses: Course[] = [
        {
            id: 'web-fundamentals',
            name: 'Web Fundamentals',
            description: 'Fundamentos do desenvolvimento web moderno',
            totalLessons: 400,
            totalDuration: '600 horas',
            modules: [
                { id: 1, title: 'HTML5 Semântico', focus: 'HTML5 Semântico', project: 'Portfólio Pessoal', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 2, title: 'CSS3 Moderno', focus: 'CSS3 Moderno', project: 'Landing Page Responsiva', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 15 },
                { id: 3, title: 'JavaScript Básico', focus: 'JavaScript Básico', project: 'Calculadora Interativa', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 4, title: 'DOM Manipulation', focus: 'DOM Manipulation', project: 'To-Do List', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 5, title: 'Event Handling', focus: 'Event Handling', project: 'Jogo da Memória', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 6, title: 'AJAX e APIs', focus: 'AJAX e APIs', project: 'Clima App', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 7, title: 'Local Storage', focus: 'Local Storage', project: 'Notas App', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 8, title: 'Responsive Design', focus: 'Responsive Design', project: 'Blog Responsivo', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 9, title: 'CSS Grid', focus: 'CSS Grid', project: 'Dashboard Layout', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 10, title: 'CSS Flexbox', focus: 'CSS Flexbox', project: 'Galeria de Fotos', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 11, title: 'Animations CSS', focus: 'Animations CSS', project: 'Portfólio Animado', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 12, title: 'Web APIs', focus: 'Web APIs', project: 'Geolocalização App', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 13, title: 'Performance', focus: 'Performance', project: 'Site Otimizado', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 14, title: 'Acessibilidade', focus: 'Acessibilidade', project: 'App Acessível', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 15, title: 'SEO', focus: 'SEO', project: 'Site SEO Otimizado', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 16, title: 'PWA', focus: 'PWA', project: 'App PWA', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 17, title: 'Testing', focus: 'Testing', project: 'App com Testes', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 18, title: 'Build Tools', focus: 'Build Tools', project: 'Setup Webpack', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 19, title: 'Deploy', focus: 'Deploy', project: 'Deploy Automatizado', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 20, title: 'Projeto Final', focus: 'Projeto Final', project: 'E-commerce Completo', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 }
            ],
            certificates: ['Web Developer Iniciante', 'Web Developer Intermediário', 'Web Developer Avançado', 'Web Developer Expert']
        },
        {
            id: 'react-frontend',
            name: 'React & Frontend Avançado',
            description: 'Desenvolvimento frontend com React e ecossistema',
            totalLessons: 400,
            totalDuration: '600 horas',
            modules: [
                { id: 21, title: 'React Fundamentos', focus: 'React Fundamentos', project: 'Componente Básico', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 22, title: 'JSX e Props', focus: 'JSX e Props', project: 'Lista de Produtos', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 23, title: 'State e Hooks', focus: 'State e Hooks', project: 'Contador Avançado', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 24, title: 'Event Handling', focus: 'Event Handling', project: 'Formulário Dinâmico', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 25, title: 'Lifecycle', focus: 'Lifecycle', project: 'Timer Component', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 26, title: 'useEffect', focus: 'useEffect', project: 'Data Fetcher', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 27, title: 'Custom Hooks', focus: 'Custom Hooks', project: 'Hook Personalizado', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 28, title: 'Context API', focus: 'Context API', project: 'Theme Switcher', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 29, title: 'React Router', focus: 'React Router', project: 'SPA Multi-página', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 30, title: 'Form Handling', focus: 'Form Handling', project: 'Formulário Complexo', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 31, title: 'API Integration', focus: 'API Integration', project: 'CRUD App', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 32, title: 'State Management', focus: 'State Management', project: 'Shopping Cart', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 33, title: 'Redux Básico', focus: 'Redux Básico', project: 'Redux Counter', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 34, title: 'Redux Toolkit', focus: 'Redux Toolkit', project: 'Redux Todo', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 35, title: 'Testing', focus: 'Testing', project: 'App com Testes', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 36, title: 'Performance', focus: 'Performance', project: 'App Otimizado', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 37, title: 'Next.js', focus: 'Next.js', project: 'Blog Next.js', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 38, title: 'TypeScript', focus: 'TypeScript', project: 'App TypeScript', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 39, title: 'Deploy', focus: 'Deploy', project: 'Deploy Vercel', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 40, title: 'Projeto Final', focus: 'Projeto Final', project: 'Rede Social', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 }
            ],
            certificates: ['React Developer Iniciante', 'React Developer Intermediário', 'React Developer Avançado', 'React Developer Expert']
        },
        {
            id: 'backend-fullstack',
            name: 'Backend & Full-Stack',
            description: 'Desenvolvimento backend e aplicações full-stack',
            totalLessons: 400,
            totalDuration: '600 horas',
            modules: [
                { id: 41, title: 'Node.js Básico', focus: 'Node.js Básico', project: 'Servidor HTTP', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 42, title: 'Express.js', focus: 'Express.js', project: 'API REST Básica', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 43, title: 'Middleware', focus: 'Middleware', project: 'Auth Middleware', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 44, title: 'Routing', focus: 'Routing', project: 'API Estruturada', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 45, title: 'Templates', focus: 'Templates', project: 'Site com EJS', lessons: 20, duration: '30h', level: 'iniciante', completed: false, progress: 0 },
                { id: 46, title: 'Static Files', focus: 'Static Files', project: 'File Server', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 47, title: 'Form Handling', focus: 'Form Handling', project: 'Upload de Arquivos', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 48, title: 'Sessions', focus: 'Sessions', project: 'Login System', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 49, title: 'Authentication', focus: 'Authentication', project: 'JWT Auth', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 50, title: 'Database', focus: 'Database', project: 'CRUD com SQLite', lessons: 20, duration: '30h', level: 'intermediario', completed: false, progress: 0 },
                { id: 51, title: 'MongoDB', focus: 'MongoDB', project: 'NoSQL App', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 52, title: 'Mongoose', focus: 'Mongoose', project: 'Blog com MongoDB', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 53, title: 'REST APIs', focus: 'REST APIs', project: 'API Completa', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 54, title: 'API Design', focus: 'API Design', project: 'API Documentada', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 55, title: 'Error Handling', focus: 'Error Handling', project: 'Error Management', lessons: 20, duration: '30h', level: 'avancado', completed: false, progress: 0 },
                { id: 56, title: 'Validation', focus: 'Validation', project: 'Data Validation', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 57, title: 'Testing', focus: 'Testing', project: 'API com Testes', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 58, title: 'Docker', focus: 'Docker', project: 'Containerização', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 59, title: 'Deploy', focus: 'Deploy', project: 'Deploy Heroku', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 },
                { id: 60, title: 'Projeto Final', focus: 'Projeto Final', project: 'E-commerce Backend', lessons: 20, duration: '30h', level: 'expert', completed: false, progress: 0 }
            ],
            certificates: ['Backend Developer Iniciante', 'Backend Developer Intermediário', 'Backend Developer Avançado', 'Backend Developer Expert']
        }
    ];

    const assessments: Assessment[] = [
        { id: 'web-iniciante', level: 'Iniciante', certificate: 'Web Developer Iniciante', modules: [1, 2, 3, 4, 5], status: 'not-started' },
        { id: 'web-intermediario', level: 'Intermediário', certificate: 'Web Developer Intermediário', modules: [6, 7, 8, 9, 10], status: 'not-started' },
        { id: 'web-avancado', level: 'Avançado', certificate: 'Web Developer Avançado', modules: [11, 12, 13, 14, 15], status: 'not-started' },
        { id: 'web-expert', level: 'Expert', certificate: 'Web Developer Expert', modules: [16, 17, 18, 19, 20], status: 'not-started' },
        { id: 'react-iniciante', level: 'Iniciante', certificate: 'React Developer Iniciante', modules: [21, 22, 23, 24, 25], status: 'not-started' },
        { id: 'react-intermediario', level: 'Intermediário', certificate: 'React Developer Intermediário', modules: [26, 27, 28, 29, 30], status: 'not-started' },
        { id: 'react-avancado', level: 'Avançado', certificate: 'React Developer Avançado', modules: [31, 32, 33, 34, 35], status: 'not-started' },
        { id: 'react-expert', level: 'Expert', certificate: 'React Developer Expert', modules: [36, 37, 38, 39, 40], status: 'not-started' },
        { id: 'backend-iniciante', level: 'Iniciante', certificate: 'Backend Developer Iniciante', modules: [41, 42, 43, 44, 45], status: 'not-started' },
        { id: 'backend-intermediario', level: 'Intermediário', certificate: 'Backend Developer Intermediário', modules: [46, 47, 48, 49, 50], status: 'not-started' },
        { id: 'backend-avancado', level: 'Avançado', certificate: 'Backend Developer Avançado', modules: [51, 52, 53, 54, 55], status: 'not-started' },
        { id: 'backend-expert', level: 'Expert', certificate: 'Backend Developer Expert', modules: [56, 57, 58, 59, 60], status: 'not-started' }
    ];

    const currentCourse = courses.find(course => course.id === selectedCourse) || courses[0];

    const toggleModule = (moduleId: number) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId);
        } else {
            newExpanded.add(moduleId);
        }
        setExpandedModules(newExpanded);
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'iniciante': return 'bg-green-100 text-green-800';
            case 'intermediario': return 'bg-blue-100 text-blue-800';
            case 'avancado': return 'bg-orange-100 text-orange-800';
            case 'expert': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'not-started': return 'bg-gray-100 text-gray-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'not-started': return <Clock className="w-4 h-4" />;
            case 'in-progress': return <Play className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🎓 Sistema de Cursos Fenix
                            </h1>
                            <p className="text-gray-600 mt-2">
                                60 Módulos • 1.200 Aulas • 12 Certificados
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-indigo-600">1.200</div>
                                <div className="text-sm text-gray-500">Aulas</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">60</div>
                                <div className="text-sm text-gray-500">Módulos</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-purple-600">12</div>
                                <div className="text-sm text-gray-500">Certificados</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Cursos */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Cursos Disponíveis</h2>
                            <div className="space-y-3">
                                {courses.map((course) => (
                                    <button
                                        key={course.id}
                                        onClick={() => setSelectedCourse(course.id)}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedCourse === course.id
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{course.name}</h3>
                                                <p className="text-sm text-gray-600">{course.description}</p>
                                                <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                                                    <span className="flex items-center">
                                                        <BookOpen className="w-3 h-3 mr-1" />
                                                        {course.totalLessons} aulas
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {course.totalDuration}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Certificados */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Certificados</h2>
                            <div className="space-y-2">
                                {currentCourse.certificates.map((certificate, index) => (
                                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <Award className="w-5 h-5 text-yellow-500 mr-3" />
                                        <span className="text-sm font-medium text-gray-900">{certificate}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Course Header */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{currentCourse.name}</h2>
                                    <p className="text-gray-600 mt-2">{currentCourse.description}</p>
                                    <div className="flex items-center mt-4 space-x-6">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            {currentCourse.totalLessons} aulas
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {currentCourse.totalDuration}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users className="w-4 h-4 mr-2" />
                                            20 módulos
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAssessment(!showAssessment)}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                                >
                                    <Trophy className="w-5 h-5 mr-2" />
                                    Avaliações
                                </button>
                            </div>
                        </div>

                        {/* Modules Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentCourse.modules.map((module) => (
                                <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-indigo-600 font-bold">{module.id}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                                                    <p className="text-sm text-gray-600">{module.focus}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                                                {module.level}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                                <span>Progresso</span>
                                                <span>{module.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${module.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Projeto:</span>
                                                <span className="font-medium text-gray-900">{module.project}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Aulas:</span>
                                                <span className="font-medium text-gray-900">{module.lessons} aulas</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Duração:</span>
                                                <span className="font-medium text-gray-900">{module.duration}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex space-x-3">
                                            <button
                                                onClick={() => setSelectedModule(module.id)}
                                                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                Iniciar Módulo
                                            </button>
                                            <button
                                                onClick={() => toggleModule(module.id)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                {expandedModules.has(module.id) ? (
                                                    <ChevronDown className="w-4 h-4" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Expanded Module Details */}
                                        {expandedModules.has(module.id) && (
                                            <div className="mt-6 pt-6 border-t border-gray-200">
                                                <h4 className="font-semibold text-gray-900 mb-3">Aulas do Módulo</h4>
                                                <div className="space-y-2">
                                                    {Array.from({ length: module.lessons }, (_, i) => (
                                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                            <div className="flex items-center">
                                                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                                                                    <span className="text-xs font-medium text-gray-600">{i + 1}</span>
                                                                </div>
                                                                <span className="text-sm text-gray-900">
                                                                    Aula {i + 1} - {module.focus}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <button className="text-indigo-600 hover:text-indigo-800">
                                                                    <Play className="w-4 h-4" />
                                                                </button>
                                                                <button className="text-green-600 hover:text-green-800">
                                                                    <CheckCircle className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 grid grid-cols-2 gap-4">
                                                    <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                                        <Code className="w-4 h-4 mr-2" />
                                                        Exercícios
                                                    </button>
                                                    <button className="flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                                                        <Target className="w-4 h-4 mr-2" />
                                                        Projeto
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Assessment Modal */}
                {showAssessment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Sistema de Avaliação</h2>
                                    <button
                                        onClick={() => setShowAssessment(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {assessments.map((assessment) => (
                                        <div key={assessment.id} className="bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold text-gray-900">{assessment.certificate}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(assessment.status)}`}>
                                                    {getStatusIcon(assessment.status)}
                                                    <span className="ml-1">{assessment.status}</span>
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="text-sm text-gray-600">
                                                    <strong>Nível:</strong> {assessment.level}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <strong>Módulos:</strong> {assessment.modules.join(', ')}
                                                </div>

                                                <div className="flex space-x-2 mt-4">
                                                    <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                                        Iniciar Avaliação
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Module Detail Modal */}
                {selectedModule && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Módulo {selectedModule} - {currentCourse.modules.find(m => m.id === selectedModule)?.title}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedModule(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Informações do Módulo</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Foco:</span>
                                                <span className="ml-2 font-medium">{currentCourse.modules.find(m => m.id === selectedModule)?.focus}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Projeto:</span>
                                                <span className="ml-2 font-medium">{currentCourse.modules.find(m => m.id === selectedModule)?.project}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Aulas:</span>
                                                <span className="ml-2 font-medium">{currentCourse.modules.find(m => m.id === selectedModule)?.lessons}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Duração:</span>
                                                <span className="ml-2 font-medium">{currentCourse.modules.find(m => m.id === selectedModule)?.duration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Ações Disponíveis</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="flex items-center justify-center p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                                <Play className="w-5 h-5 mr-2" />
                                                Iniciar Aulas
                                            </button>
                                            <button className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                <Code className="w-5 h-5 mr-2" />
                                                Exercícios
                                            </button>
                                            <button className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                                <Target className="w-5 h-5 mr-2" />
                                                Projeto
                                            </button>
                                            <button className="flex items-center justify-center p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                                <Trophy className="w-5 h-5 mr-2" />
                                                Avaliação
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseSystem;

















