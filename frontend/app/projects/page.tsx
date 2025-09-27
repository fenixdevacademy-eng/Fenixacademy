'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Code,
    Play,
    Star,
    Users,
    Clock,
    BookOpen,
    CheckCircle,
    Download,
    Share2,
    Heart,
    Bookmark,
    MessageCircle,
    Award,
    Database,
    Smartphone,
    Shield,
    Brain,
    Zap,
    Target,
    Rocket,
    Sparkles,
    TrendingUp,
    Search,
    Filter,
    Eye,
    ExternalLink,
    Github,
    Globe,
    FileText,
    Video,
    Image,
    Music,
    Settings,
    Plus,
    ArrowRight,
    Lightbulb,
    Trophy,
    Calendar,
    BarChart3,
    PieChart,
    Activity
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import FunctionalButton from '@/components/FunctionalButton'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'

export default function ProjectsPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedDifficulty, setSelectedDifficulty] = useState('all')
    const [sortBy, setSortBy] = useState('popular')

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const categories = [
        { id: 'all', name: 'Todos', icon: Code, count: 32, color: 'from-blue-500 to-cyan-500' },
        { id: 'web', name: 'Web Development', icon: Globe, count: 12, color: 'from-green-500 to-emerald-500' },
        { id: 'mobile', name: 'Mobile Apps', icon: Smartphone, count: 8, color: 'from-purple-500 to-pink-500' },
        { id: 'data', name: 'Data Science', icon: Database, count: 6, color: 'from-orange-500 to-red-500' },
        { id: 'ai', name: 'Inteligência Artificial', icon: Brain, count: 4, color: 'from-indigo-500 to-purple-500' },
        { id: 'security', name: 'Cybersecurity', icon: Shield, count: 2, color: 'from-red-500 to-pink-500' }
    ]

    const difficulties = [
        { id: 'all', name: 'Todas as Dificuldades', color: 'from-gray-500 to-gray-600' },
        { id: 'beginner', name: 'Iniciante', color: 'from-green-500 to-emerald-500' },
        { id: 'intermediate', name: 'Intermediário', color: 'from-blue-500 to-cyan-500' },
        { id: 'advanced', name: 'Avançado', color: 'from-purple-500 to-pink-500' }
    ]

    const projects = [
        // Web Development
        {
            id: 1,
            title: 'E-commerce Completo com React',
            slug: 'ecommerce-completo-react',
            description: 'Construa uma loja online completa com carrinho, pagamentos e painel administrativo.',
            instructor: 'João Silva',
            rating: 4.9,
            students: 8500,
            duration: '15h',
            difficulty: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'E-commerce'],
            isNew: true,
            isPopular: true,
            status: 'active',
            progress: 0,
            features: ['Carrinho de Compras', 'Sistema de Pagamento', 'Painel Admin', 'API REST'],
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
            githubUrl: 'https://github.com/fenix-academy/ecommerce-react',
            liveUrl: 'https://ecommerce-demo.fenix.academy',
            completedBy: 2340
        },
        {
            id: 2,
            title: 'Dashboard Analytics com D3.js',
            slug: 'dashboard-analytics-d3js',
            description: 'Crie dashboards interativos com visualizações de dados avançadas.',
            instructor: 'Maria Santos',
            rating: 4.8,
            students: 6200,
            duration: '12h',
            difficulty: 'advanced',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['D3.js', 'React', 'TypeScript', 'Analytics', 'Charts'],
            isNew: false,
            isPopular: true,
            status: 'active',
            progress: 0,
            features: ['Gráficos Interativos', 'Filtros Dinâmicos', 'Exportação de Dados', 'Responsivo'],
            technologies: ['D3.js', 'React', 'TypeScript', 'CSS Modules'],
            githubUrl: 'https://github.com/fenix-academy/dashboard-d3js',
            liveUrl: 'https://dashboard-demo.fenix.academy',
            completedBy: 1890
        },
        {
            id: 3,
            title: 'Blog com Next.js e CMS',
            slug: 'blog-nextjs-cms',
            description: 'Desenvolva um blog moderno com sistema de gerenciamento de conteúdo.',
            instructor: 'Carlos Oliveira',
            rating: 4.7,
            students: 4800,
            duration: '10h',
            difficulty: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['Next.js', 'Headless CMS', 'SSG', 'SEO', 'Blog'],
            isNew: true,
            isPopular: false,
            status: 'active',
            progress: 0,
            features: ['SSG/SSR', 'SEO Otimizado', 'CMS Headless', 'Comentários'],
            technologies: ['Next.js', 'Strapi', 'Tailwind CSS', 'Vercel'],
            githubUrl: 'https://github.com/fenix-academy/blog-nextjs',
            liveUrl: 'https://blog-demo.fenix.academy',
            completedBy: 1560
        },

        // Mobile
        {
            id: 4,
            title: 'App de Delivery com React Native',
            slug: 'app-delivery-react-native',
            description: 'Crie um aplicativo de delivery completo com geolocalização e pagamentos.',
            instructor: 'Ana Costa',
            rating: 4.9,
            students: 7200,
            duration: '20h',
            difficulty: 'advanced',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'mobile',
            tags: ['React Native', 'Expo', 'Maps', 'Push Notifications', 'Delivery'],
            isNew: true,
            isPopular: true,
            status: 'active',
            progress: 0,
            features: ['Geolocalização', 'Notificações Push', 'Pagamentos', 'Chat'],
            technologies: ['React Native', 'Expo', 'Firebase', 'Stripe'],
            githubUrl: 'https://github.com/fenix-academy/delivery-app',
            liveUrl: 'https://delivery-demo.fenix.academy',
            completedBy: 2100
        },
        {
            id: 5,
            title: 'App de Fitness com Flutter',
            slug: 'app-fitness-flutter',
            description: 'Desenvolva um aplicativo de fitness com tracking de exercícios e progresso.',
            instructor: 'Pedro Flutter',
            rating: 4.6,
            students: 3900,
            duration: '18h',
            difficulty: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'mobile',
            tags: ['Flutter', 'Dart', 'Firebase', 'Fitness', 'Health'],
            isNew: false,
            isPopular: true,
            status: 'active',
            progress: 0,
            features: ['Tracking de Exercícios', 'Gráficos de Progresso', 'Social', 'Offline'],
            technologies: ['Flutter', 'Dart', 'Firebase', 'Charts'],
            githubUrl: 'https://github.com/fenix-academy/fitness-flutter',
            liveUrl: 'https://fitness-demo.fenix.academy',
            completedBy: 1280
        },

        // Data Science
        {
            id: 6,
            title: 'Análise de Dados com Python',
            slug: 'analise-dados-python',
            description: 'Projeto completo de análise de dados com visualizações e insights.',
            instructor: 'Dr. Data',
            rating: 4.8,
            students: 5600,
            duration: '14h',
            difficulty: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Python', 'Pandas', 'Matplotlib', 'Jupyter', 'Data Analysis'],
            isNew: true,
            isPopular: true,
            status: 'active',
            progress: 0,
            features: ['Análise Exploratória', 'Visualizações', 'Relatórios', 'Jupyter Notebooks'],
            technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
            githubUrl: 'https://github.com/fenix-academy/data-analysis',
            liveUrl: 'https://data-demo.fenix.academy',
            completedBy: 1890
        },
        {
            id: 7,
            title: 'Sistema de Recomendação com ML',
            slug: 'sistema-recomendacao-ml',
            description: 'Implemente algoritmos de machine learning para sistema de recomendação.',
            instructor: 'Prof. ML',
            rating: 4.9,
            students: 3200,
            duration: '16h',
            difficulty: 'advanced',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Recommendation', 'AI'],
            isNew: false,
            isPopular: true,
            status: 'active',
            progress: 0,
            features: ['Algoritmos ML', 'Validação Cruzada', 'Métricas', 'API REST'],
            technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'PostgreSQL'],
            githubUrl: 'https://github.com/fenix-academy/recommendation-system',
            liveUrl: 'https://ml-demo.fenix.academy',
            completedBy: 980
        },

        // AI
        {
            id: 8,
            title: 'Chatbot Inteligente com OpenAI',
            slug: 'chatbot-inteligente-openai',
            description: 'Crie um chatbot avançado usando OpenAI GPT e integração com APIs.',
            instructor: 'AI Specialist',
            rating: 4.7,
            students: 4500,
            duration: '8h',
            difficulty: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'ai',
            tags: ['OpenAI', 'GPT', 'Chatbot', 'API', 'NLP'],
            isNew: true,
            isPopular: true,
            status: 'active',
            progress: 0,
            features: ['Integração OpenAI', 'Contexto de Conversa', 'Webhook', 'Analytics'],
            technologies: ['Node.js', 'OpenAI API', 'Express', 'WebSocket'],
            githubUrl: 'https://github.com/fenix-academy/chatbot-openai',
            liveUrl: 'https://chatbot-demo.fenix.academy',
            completedBy: 1650
        },

        // Cybersecurity
        {
            id: 9,
            title: 'Sistema de Autenticação Seguro',
            slug: 'sistema-autenticacao-seguro',
            description: 'Implemente autenticação robusta com 2FA, JWT e melhores práticas de segurança.',
            instructor: 'Security Expert',
            rating: 4.8,
            students: 2800,
            duration: '12h',
            difficulty: 'advanced',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'security',
            tags: ['Security', 'JWT', '2FA', 'OAuth', 'Authentication'],
            isNew: false,
            isPopular: true,
            status: 'active',
            progress: 0,
            features: ['2FA', 'JWT Tokens', 'Rate Limiting', 'Audit Logs'],
            technologies: ['Node.js', 'JWT', 'TOTP', 'Redis', 'PostgreSQL'],
            githubUrl: 'https://github.com/fenix-academy/secure-auth',
            liveUrl: 'https://auth-demo.fenix.academy',
            completedBy: 890
        }
    ]

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
        const matchesDifficulty = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty
        return matchesSearch && matchesCategory && matchesDifficulty
    })

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'from-green-500 to-emerald-500'
            case 'intermediate': return 'from-blue-500 to-cyan-500'
            case 'advanced': return 'from-purple-500 to-pink-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    const getDifficultyName = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'Iniciante'
            case 'intermediate': return 'Intermediário'
            case 'advanced': return 'Avançado'
            default: return 'Todos'
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16">
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium animate-glow">
                            <Rocket className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                            <span className="gradient-text-neon">+32 Projetos Práticos</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                            Projetos <span className="gradient-text-neon animate-neon">Práticos</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Aprenda fazendo! Projetos reais para construir seu portfólio e ganhar experiência prática
                        </p>

                        {/* Search and Filters */}
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar projetos, tecnologias ou funcionalidades..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                                />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group ${selectedCategory === category.id
                                            ? 'gradient-text bg-white/20 border border-blue-400/30'
                                            : 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                                            }`}
                                    >
                                        <category.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                        <span>{category.name}</span>
                                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3 justify-center">
                                {difficulties.map((difficulty) => (
                                    <button
                                        key={difficulty.id}
                                        onClick={() => setSelectedDifficulty(difficulty.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedDifficulty === difficulty.id
                                            ? 'gradient-text bg-white/20 border border-blue-400/30'
                                            : 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                                            }`}
                                    >
                                        {difficulty.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-3xl font-bold text-white">
                                {filteredProjects.length} Projetos Encontrados
                            </h2>
                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                                <TrendingUp className="w-4 h-4" />
                                <span>Ordenar por:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="popular">Mais Populares</option>
                                    <option value="newest">Mais Recentes</option>
                                    <option value="rating">Melhor Avaliação</option>
                                    <option value="duration">Duração</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`card group hover:scale-105 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative">
                                    {/* Project Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl opacity-50">
                                                {project.category === 'web' && <Globe className="w-16 h-16" />}
                                                {project.category === 'mobile' && <Smartphone className="w-16 h-16" />}
                                                {project.category === 'data' && <Database className="w-16 h-16" />}
                                                {project.category === 'ai' && <Brain className="w-16 h-16" />}
                                                {project.category === 'security' && <Shield className="w-16 h-16" />}
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex space-x-2">
                                            {project.isNew && (
                                                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                                                    NOVO
                                                </span>
                                            )}
                                            {project.isPopular && (
                                                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full animate-glow">
                                                    POPULAR
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute top-4 right-4 flex space-x-2">
                                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 group">
                                                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            </button>
                                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 group">
                                                <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>

                                        {/* Completion Stats */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                                                <div className="flex items-center justify-between text-white text-sm mb-2">
                                                    <span>Completado por</span>
                                                    <span className="font-semibold">{project.completedBy.toLocaleString()}</span>
                                                </div>
                                                <div className="w-full bg-white/20 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getDifficultyColor(project.difficulty)}`}>
                                                {getDifficultyName(project.difficulty)}
                                            </span>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium">{project.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300 line-clamp-2">
                                            {project.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{project.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>{project.students.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold text-white">Funcionalidades:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {project.features.slice(0, 2).map((feature, featureIndex) => (
                                                    <span
                                                        key={featureIndex}
                                                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {project.features.length > 2 && (
                                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                                                        +{project.features.length - 2} mais
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-2xl font-bold gradient-text">{project.price}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <FunctionalButton
                                                    href={`/projects/${project.slug}`}
                                                    variant="primary"
                                                    size="md"
                                                    icon={<Play className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Começar Projeto
                                                </FunctionalButton>
                                                <FunctionalButton
                                                    href={project.liveUrl}
                                                    variant="outline"
                                                    size="md"
                                                    icon={<ExternalLink className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Demo
                                                </FunctionalButton>
                                            </div>
                                            <div className="flex gap-2">
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    <span className="text-sm">GitHub</span>
                                                </a>
                                                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300">
                                                    <Share2 className="w-4 h-4" />
                                                    <span className="text-sm">Compartilhar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Nenhum projeto encontrado</h3>
                            <p className="text-gray-300 mb-8">Tente ajustar seus filtros de busca</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('all')
                                    setSelectedDifficulty('all')
                                }}
                                className="btn-primary"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 animate-glow">
                        Pronto para <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-neon">construir</span>?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Escolha seu projeto e comece a construir seu portfólio profissional
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <FunctionalButton
                            href="/auth/register"
                            variant="primary"
                            size="xl"
                            icon={<Sparkles className="w-6 h-6" />}
                            iconPosition="left"
                            glowEffect={true}
                            rippleEffect={true}
                            className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                        >
                            Começar Agora
                        </FunctionalButton>
                        <FunctionalButton
                            href="/tutorials"
                            variant="outline"
                            size="xl"
                            icon={<BookOpen className="w-6 h-6" />}
                            iconPosition="left"
                            glowEffect={true}
                            rippleEffect={true}
                            className="text-white border-white hover:bg-white hover:text-blue-600"
                        >
                            Ver Tutoriais
                        </FunctionalButton>
                    </div>
                </div>
            </section>
        </div>
    )
}

