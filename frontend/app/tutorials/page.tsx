'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    BookOpen,
    Play,
    Code,
    Database,
    Smartphone,
    Shield,
    Brain,
    Zap,
    CheckCircle,
    Clock,
    Users,
    Star,
    ArrowRight,
    Search,
    Filter,
    Target,
    Award,
    TrendingUp,
    Sparkles,
    Rocket,
    Lightbulb,
    FileText,
    Video,
    Image,
    Music,
    Globe,
    Settings,
    Download,
    Share2,
    Heart,
    Bookmark,
    Eye
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import FunctionalButton from '@/components/FunctionalButton'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'

export default function TutorialsPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedLevel, setSelectedLevel] = useState('all')
    const [sortBy, setSortBy] = useState('popular')

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const categories = [
        { id: 'all', name: 'Todos', icon: BookOpen, count: 48, color: 'from-blue-500 to-cyan-500' },
        { id: 'web', name: 'Web Development', icon: Code, count: 15, color: 'from-green-500 to-emerald-500' },
        { id: 'data', name: 'Data Science', icon: Database, count: 12, color: 'from-purple-500 to-pink-500' },
        { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 8, color: 'from-orange-500 to-red-500' },
        { id: 'security', name: 'Cybersecurity', icon: Shield, count: 6, color: 'from-red-500 to-pink-500' },
        { id: 'ai', name: 'Inteligência Artificial', icon: Brain, count: 7, color: 'from-indigo-500 to-purple-500' }
    ]

    const levels = [
        { id: 'all', name: 'Todos os Níveis', color: 'from-gray-500 to-gray-600' },
        { id: 'beginner', name: 'Iniciante', color: 'from-green-500 to-emerald-500' },
        { id: 'intermediate', name: 'Intermediário', color: 'from-blue-500 to-cyan-500' },
        { id: 'advanced', name: 'Avançado', color: 'from-purple-500 to-pink-500' }
    ]

    const tutorials = [
        // Web Development
        {
            id: 1,
            title: 'React Hooks - Guia Completo',
            slug: 'react-hooks-guia-completo',
            description: 'Aprenda todos os hooks do React de forma prática e interativa.',
            instructor: 'João Silva',
            rating: 4.9,
            students: 12500,
            duration: '2h 30min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
            isNew: true,
            isPopular: true,
            type: 'interactive',
            features: ['Código Executável', 'Exercícios Práticos', 'Projetos Reais']
        },
        {
            id: 2,
            title: 'CSS Grid Layout Masterclass',
            slug: 'css-grid-layout-masterclass',
            description: 'Domine CSS Grid com exemplos práticos e layouts responsivos.',
            instructor: 'Maria Santos',
            rating: 4.8,
            students: 8900,
            duration: '3h 15min',
            level: 'beginner',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['CSS', 'Grid', 'Layout', 'Responsivo'],
            isNew: false,
            isPopular: true,
            type: 'video',
            features: ['Vídeos HD', 'Exercícios', 'Certificado']
        },
        {
            id: 3,
            title: 'JavaScript ES6+ Moderno',
            slug: 'javascript-es6-moderno',
            description: 'Aprenda as funcionalidades mais recentes do JavaScript.',
            instructor: 'Carlos Oliveira',
            rating: 4.9,
            students: 15600,
            duration: '4h 20min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['JavaScript', 'ES6', 'ES7', 'ES8', 'ES9'],
            isNew: true,
            isPopular: true,
            type: 'interactive',
            features: ['Playground Online', 'Testes Automáticos', 'Projetos']
        },
        {
            id: 4,
            title: 'Node.js & Express - Backend Completo',
            slug: 'nodejs-express-backend-completo',
            description: 'Construa APIs robustas com Node.js e Express.',
            instructor: 'Ana Costa',
            rating: 4.7,
            students: 9800,
            duration: '5h 45min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['Node.js', 'Express', 'API', 'Backend'],
            isNew: false,
            isPopular: false,
            type: 'interactive',
            features: ['Servidor Local', 'Testes de API', 'Deploy']
        },

        // Data Science
        {
            id: 5,
            title: 'Python para Data Science',
            slug: 'python-para-data-science',
            description: 'Aprenda Python, Pandas, NumPy e Matplotlib do zero.',
            instructor: 'Dr. Data',
            rating: 4.8,
            students: 11200,
            duration: '6h 30min',
            level: 'beginner',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
            isNew: true,
            isPopular: true,
            type: 'interactive',
            features: ['Jupyter Notebooks', 'Datasets Reais', 'Visualizações']
        },
        {
            id: 6,
            title: 'Machine Learning com Scikit-learn',
            slug: 'machine-learning-scikit-learn',
            description: 'Implemente algoritmos de ML com Scikit-learn.',
            instructor: 'Prof. ML',
            rating: 4.9,
            students: 7600,
            duration: '7h 15min',
            level: 'advanced',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Machine Learning', 'Scikit-learn', 'Python', 'AI'],
            isNew: false,
            isPopular: true,
            type: 'interactive',
            features: ['Modelos Prontos', 'Validação Cruzada', 'Métricas']
        },

        // Mobile
        {
            id: 7,
            title: 'React Native - Apps Mobile',
            slug: 'react-native-apps-mobile',
            description: 'Desenvolva apps mobile com React Native.',
            instructor: 'Mobile Dev',
            rating: 4.6,
            students: 6400,
            duration: '8h 20min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'mobile',
            tags: ['React Native', 'Mobile', 'iOS', 'Android'],
            isNew: true,
            isPopular: false,
            type: 'interactive',
            features: ['Emulador', 'Testes em Dispositivo', 'Deploy']
        },

        // Cybersecurity
        {
            id: 8,
            title: 'Ethical Hacking Básico',
            slug: 'ethical-hacking-basico',
            description: 'Introdução ao ethical hacking e segurança da informação.',
            instructor: 'Security Expert',
            rating: 4.7,
            students: 4200,
            duration: '4h 45min',
            level: 'beginner',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'security',
            tags: ['Ethical Hacking', 'Segurança', 'Penetration Testing'],
            isNew: false,
            isPopular: true,
            type: 'interactive',
            features: ['Laboratório Virtual', 'Ferramentas Reais', 'CTF']
        },

        // AI
        {
            id: 9,
            title: 'ChatGPT & LLMs - Aplicações Práticas',
            slug: 'chatgpt-llms-aplicacoes-praticas',
            description: 'Aprenda a usar e integrar Large Language Models.',
            instructor: 'AI Specialist',
            rating: 4.9,
            students: 9800,
            duration: '3h 30min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'ai',
            tags: ['ChatGPT', 'LLMs', 'OpenAI', 'Aplicações'],
            isNew: true,
            isPopular: true,
            type: 'interactive',
            features: ['API Real', 'Prompts Avançados', 'Integrações']
        }
    ]

    const filteredTutorials = tutorials.filter(tutorial => {
        const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory
        const matchesLevel = selectedLevel === 'all' || tutorial.level === selectedLevel
        return matchesSearch && matchesCategory && matchesLevel
    })

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'from-green-500 to-emerald-500'
            case 'intermediate': return 'from-blue-500 to-cyan-500'
            case 'advanced': return 'from-purple-500 to-pink-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'interactive': return <Code className="w-4 h-4" />
            case 'video': return <Video className="w-4 h-4" />
            case 'text': return <FileText className="w-4 h-4" />
            default: return <BookOpen className="w-4 h-4" />
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
                            <Lightbulb className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                            <span className="gradient-text-neon">+48 Tutoriais Interativos</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                            Tutoriais <span className="gradient-text-neon animate-neon">Interativos</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Aprenda programação de forma prática com tutoriais interativos, exercícios hands-on e projetos reais
                        </p>

                        {/* Search and Filters */}
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar tutoriais, tecnologias ou instrutores..."
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
                                {levels.map((level) => (
                                    <button
                                        key={level.id}
                                        onClick={() => setSelectedLevel(level.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedLevel === level.id
                                            ? 'gradient-text bg-white/20 border border-blue-400/30'
                                            : 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                                            }`}
                                    >
                                        {level.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tutorials Grid */}
            <section className="py-16 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-3xl font-bold text-white">
                                {filteredTutorials.length} Tutoriais Encontrados
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
                        {filteredTutorials.map((tutorial, index) => (
                            <div
                                key={tutorial.id}
                                className={`card group hover:scale-105 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative">
                                    {/* Tutorial Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl opacity-50">
                                                {tutorial.category === 'web' && <Code className="w-16 h-16" />}
                                                {tutorial.category === 'data' && <Database className="w-16 h-16" />}
                                                {tutorial.category === 'mobile' && <Smartphone className="w-16 h-16" />}
                                                {tutorial.category === 'security' && <Shield className="w-16 h-16" />}
                                                {tutorial.category === 'ai' && <Brain className="w-16 h-16" />}
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex space-x-2">
                                            {tutorial.isNew && (
                                                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                                                    NOVO
                                                </span>
                                            )}
                                            {tutorial.isPopular && (
                                                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full animate-glow">
                                                    POPULAR
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 group">
                                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>

                                        {/* Type Badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                                                {getTypeIcon(tutorial.type)}
                                                <span className="capitalize">{tutorial.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tutorial Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getLevelColor(tutorial.level)}`}>
                                                {tutorial.level === 'beginner' ? 'Iniciante' : tutorial.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                            </span>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium">{tutorial.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300 line-clamp-2">
                                            {tutorial.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                                            {tutorial.description}
                                        </p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{tutorial.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>{tutorial.students.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {tutorial.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold text-white">Recursos:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {tutorial.features.map((feature, featureIndex) => (
                                                    <span
                                                        key={featureIndex}
                                                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-2xl font-bold gradient-text">{tutorial.price}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <FunctionalButton
                                                    href={`/tutorials/${tutorial.slug}`}
                                                    variant="primary"
                                                    size="md"
                                                    icon={<Play className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Começar Tutorial
                                                </FunctionalButton>
                                                <FunctionalButton
                                                    href={`/tutorials/${tutorial.slug}/demo`}
                                                    variant="outline"
                                                    size="md"
                                                    icon={<Eye className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Demo
                                                </FunctionalButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTutorials.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Nenhum tutorial encontrado</h3>
                            <p className="text-gray-300 mb-8">Tente ajustar seus filtros de busca</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('all')
                                    setSelectedLevel('all')
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
                        Pronto para <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-neon">aprender</span>?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Escolha seu tutorial e comece sua jornada de aprendizado interativo
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
                            href="/ide-advanced"
                            variant="outline"
                            size="xl"
                            icon={<Code className="w-6 h-6" />}
                            iconPosition="left"
                            glowEffect={true}
                            rippleEffect={true}
                            className="text-white border-white hover:bg-white hover:text-blue-600"
                        >
                            Experimentar IDE
                        </FunctionalButton>
                    </div>
                </div>
            </section>
        </div>
    )
}
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    BookOpen,
    Play,
    Code,
    Database,
    Smartphone,
    Shield,
    Brain,
    Zap,
    CheckCircle,
    Clock,
    Users,
    Star,
    ArrowRight,
    Search,
    Filter,
    Target,
    Award,
    TrendingUp,
    Sparkles,
    Rocket,
    Lightbulb,
    FileText,
    Video,
    Image,
    Music,
    Globe,
    Settings,
    Download,
    Share2,
    Heart,
    Bookmark,
    Eye
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import FunctionalButton from '@/components/FunctionalButton'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'

export default function TutorialsPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedLevel, setSelectedLevel] = useState('all')
    const [sortBy, setSortBy] = useState('popular')

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const categories = [
        { id: 'all', name: 'Todos', icon: BookOpen, count: 48, color: 'from-blue-500 to-cyan-500' },
        { id: 'web', name: 'Web Development', icon: Code, count: 15, color: 'from-green-500 to-emerald-500' },
        { id: 'data', name: 'Data Science', icon: Database, count: 12, color: 'from-purple-500 to-pink-500' },
        { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 8, color: 'from-orange-500 to-red-500' },
        { id: 'security', name: 'Cybersecurity', icon: Shield, count: 6, color: 'from-red-500 to-pink-500' },
        { id: 'ai', name: 'Inteligência Artificial', icon: Brain, count: 7, color: 'from-indigo-500 to-purple-500' }
    ]

    const levels = [
        { id: 'all', name: 'Todos os Níveis', color: 'from-gray-500 to-gray-600' },
        { id: 'beginner', name: 'Iniciante', color: 'from-green-500 to-emerald-500' },
        { id: 'intermediate', name: 'Intermediário', color: 'from-blue-500 to-cyan-500' },
        { id: 'advanced', name: 'Avançado', color: 'from-purple-500 to-pink-500' }
    ]

    const tutorials = [
        // Web Development
        {
            id: 1,
            title: 'React Hooks - Guia Completo',
            slug: 'react-hooks-guia-completo',
            description: 'Aprenda todos os hooks do React de forma prática e interativa.',
            instructor: 'João Silva',
            rating: 4.9,
            students: 12500,
            duration: '2h 30min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
            isNew: true,
            isPopular: true,
            type: 'interactive',
            features: ['Código Executável', 'Exercícios Práticos', 'Projetos Reais']
        },
        {
            id: 2,
            title: 'CSS Grid Layout Masterclass',
            slug: 'css-grid-layout-masterclass',
            description: 'Domine CSS Grid com exemplos práticos e layouts responsivos.',
            instructor: 'Maria Santos',
            rating: 4.8,
            students: 8900,
            duration: '3h 15min',
            level: 'beginner',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['CSS', 'Grid', 'Layout', 'Responsivo'],
            isNew: false,
            isPopular: true,
            type: 'video',
            features: ['Vídeos HD', 'Exercícios', 'Certificado']
        },
        {
            id: 3,
            title: 'JavaScript ES6+ Moderno',
            slug: 'javascript-es6-moderno',
            description: 'Aprenda as funcionalidades mais recentes do JavaScript.',
            instructor: 'Carlos Oliveira',
            rating: 4.9,
            students: 15600,
            duration: '4h 20min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['JavaScript', 'ES6', 'ES7', 'ES8', 'ES9'],
            isNew: true,
            isPopular: true,
            type: 'interactive',
            features: ['Playground Online', 'Testes Automáticos', 'Projetos']
        },
        {
            id: 4,
            title: 'Node.js & Express - Backend Completo',
            slug: 'nodejs-express-backend-completo',
            description: 'Construa APIs robustas com Node.js e Express.',
            instructor: 'Ana Costa',
            rating: 4.7,
            students: 9800,
            duration: '5h 45min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['Node.js', 'Express', 'API', 'Backend'],
            isNew: false,
            isPopular: false,
            type: 'interactive',
            features: ['Servidor Local', 'Testes de API', 'Deploy']
        },

        // Data Science
        {
            id: 5,
            title: 'Python para Data Science',
            slug: 'python-para-data-science',
            description: 'Aprenda Python, Pandas, NumPy e Matplotlib do zero.',
            instructor: 'Dr. Data',
            rating: 4.8,
            students: 11200,
            duration: '6h 30min',
            level: 'beginner',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
            isNew: true,
            isPopular: true,
            type: 'interactive',
            features: ['Jupyter Notebooks', 'Datasets Reais', 'Visualizações']
        },
        {
            id: 6,
            title: 'Machine Learning com Scikit-learn',
            slug: 'machine-learning-scikit-learn',
            description: 'Implemente algoritmos de ML com Scikit-learn.',
            instructor: 'Prof. ML',
            rating: 4.9,
            students: 7600,
            duration: '7h 15min',
            level: 'advanced',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Machine Learning', 'Scikit-learn', 'Python', 'AI'],
            isNew: false,
            isPopular: true,
            type: 'interactive',
            features: ['Modelos Prontos', 'Validação Cruzada', 'Métricas']
        },

        // Mobile
        {
            id: 7,
            title: 'React Native - Apps Mobile',
            slug: 'react-native-apps-mobile',
            description: 'Desenvolva apps mobile com React Native.',
            instructor: 'Mobile Dev',
            rating: 4.6,
            students: 6400,
            duration: '8h 20min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'mobile',
            tags: ['React Native', 'Mobile', 'iOS', 'Android'],
            isNew: true,
            isPopular: false,
            type: 'interactive',
            features: ['Emulador', 'Testes em Dispositivo', 'Deploy']
        },

        // Cybersecurity
        {
            id: 8,
            title: 'Ethical Hacking Básico',
            slug: 'ethical-hacking-basico',
            description: 'Introdução ao ethical hacking e segurança da informação.',
            instructor: 'Security Expert',
            rating: 4.7,
            students: 4200,
            duration: '4h 45min',
            level: 'beginner',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'security',
            tags: ['Ethical Hacking', 'Segurança', 'Penetration Testing'],
            isNew: false,
            isPopular: true,
            type: 'interactive',
            features: ['Laboratório Virtual', 'Ferramentas Reais', 'CTF']
        },

        // AI
        {
            id: 9,
            title: 'ChatGPT & LLMs - Aplicações Práticas',
            slug: 'chatgpt-llms-aplicacoes-praticas',
            description: 'Aprenda a usar e integrar Large Language Models.',
            instructor: 'AI Specialist',
            rating: 4.9,
            students: 9800,
            duration: '3h 30min',
            level: 'intermediate',
            price: 'Gratuito',
            image: '/api/placeholder/400/250',
            category: 'ai',
            tags: ['ChatGPT', 'LLMs', 'OpenAI', 'Aplicações'],
            isNew: true,
            isPopular: true,
            type: 'interactive',
            features: ['API Real', 'Prompts Avançados', 'Integrações']
        }
    ]

    const filteredTutorials = tutorials.filter(tutorial => {
        const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory
        const matchesLevel = selectedLevel === 'all' || tutorial.level === selectedLevel
        return matchesSearch && matchesCategory && matchesLevel
    })

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'from-green-500 to-emerald-500'
            case 'intermediate': return 'from-blue-500 to-cyan-500'
            case 'advanced': return 'from-purple-500 to-pink-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'interactive': return <Code className="w-4 h-4" />
            case 'video': return <Video className="w-4 h-4" />
            case 'text': return <FileText className="w-4 h-4" />
            default: return <BookOpen className="w-4 h-4" />
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
                            <Lightbulb className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                            <span className="gradient-text-neon">+48 Tutoriais Interativos</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                            Tutoriais <span className="gradient-text-neon animate-neon">Interativos</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Aprenda programação de forma prática com tutoriais interativos, exercícios hands-on e projetos reais
                        </p>

                        {/* Search and Filters */}
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar tutoriais, tecnologias ou instrutores..."
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
                                {levels.map((level) => (
                                    <button
                                        key={level.id}
                                        onClick={() => setSelectedLevel(level.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedLevel === level.id
                                            ? 'gradient-text bg-white/20 border border-blue-400/30'
                                            : 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                                            }`}
                                    >
                                        {level.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tutorials Grid */}
            <section className="py-16 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-3xl font-bold text-white">
                                {filteredTutorials.length} Tutoriais Encontrados
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
                        {filteredTutorials.map((tutorial, index) => (
                            <div
                                key={tutorial.id}
                                className={`card group hover:scale-105 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative">
                                    {/* Tutorial Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl opacity-50">
                                                {tutorial.category === 'web' && <Code className="w-16 h-16" />}
                                                {tutorial.category === 'data' && <Database className="w-16 h-16" />}
                                                {tutorial.category === 'mobile' && <Smartphone className="w-16 h-16" />}
                                                {tutorial.category === 'security' && <Shield className="w-16 h-16" />}
                                                {tutorial.category === 'ai' && <Brain className="w-16 h-16" />}
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex space-x-2">
                                            {tutorial.isNew && (
                                                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                                                    NOVO
                                                </span>
                                            )}
                                            {tutorial.isPopular && (
                                                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full animate-glow">
                                                    POPULAR
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 group">
                                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>

                                        {/* Type Badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                                                {getTypeIcon(tutorial.type)}
                                                <span className="capitalize">{tutorial.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tutorial Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getLevelColor(tutorial.level)}`}>
                                                {tutorial.level === 'beginner' ? 'Iniciante' : tutorial.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                            </span>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium">{tutorial.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300 line-clamp-2">
                                            {tutorial.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                                            {tutorial.description}
                                        </p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{tutorial.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>{tutorial.students.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {tutorial.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold text-white">Recursos:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {tutorial.features.map((feature, featureIndex) => (
                                                    <span
                                                        key={featureIndex}
                                                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-2xl font-bold gradient-text">{tutorial.price}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <FunctionalButton
                                                    href={`/tutorials/${tutorial.slug}`}
                                                    variant="primary"
                                                    size="md"
                                                    icon={<Play className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Começar Tutorial
                                                </FunctionalButton>
                                                <FunctionalButton
                                                    href={`/tutorials/${tutorial.slug}/demo`}
                                                    variant="outline"
                                                    size="md"
                                                    icon={<Eye className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Demo
                                                </FunctionalButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTutorials.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Nenhum tutorial encontrado</h3>
                            <p className="text-gray-300 mb-8">Tente ajustar seus filtros de busca</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('all')
                                    setSelectedLevel('all')
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
                        Pronto para <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-neon">aprender</span>?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Escolha seu tutorial e comece sua jornada de aprendizado interativo
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
                            href="/ide"
                            variant="outline"
                            size="xl"
                            icon={<Code className="w-6 h-6" />}
                            iconPosition="left"
                            glowEffect={true}
                            rippleEffect={true}
                            className="text-white border-white hover:bg-white hover:text-blue-600"
                        >
                            Experimentar IDE
                        </FunctionalButton>
                    </div>
                </div>
            </section>
        </div>
    )
}

