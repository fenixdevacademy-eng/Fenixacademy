'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    BookOpen,
    Download,
    ExternalLink,
    Search,
    Filter,
    Star,
    Clock,
    Users,
    FileText,
    Video,
    Image,
    Music,
    Code,
    Database,
    Smartphone,
    Shield,
    Brain,
    Globe,
    Zap,
    Target,
    Rocket,
    Sparkles,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Lightbulb,
    Award,
    Trophy,
    Calendar,
    BarChart3,
    PieChart,
    Activity,
    Play,
    Pause,
    RotateCcw,
    Settings,
    Share2,
    Heart,
    Bookmark,
    MessageCircle,
    Plus,
    Eye,
    Copy,
    ThumbsUp
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import FunctionalButton from '@/components/FunctionalButton'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'

export default function ResourcesPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedType, setSelectedType] = useState('all')
    const [sortBy, setSortBy] = useState('popular')

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const categories = [
        { id: 'all', name: 'Todos', icon: BookOpen, count: 156, color: 'from-blue-500 to-cyan-500' },
        { id: 'web', name: 'Web Development', icon: Globe, count: 45, color: 'from-green-500 to-emerald-500' },
        { id: 'mobile', name: 'Mobile Development', icon: Smartphone, count: 32, color: 'from-purple-500 to-pink-500' },
        { id: 'data', name: 'Data Science', icon: Database, count: 28, color: 'from-orange-500 to-red-500' },
        { id: 'ai', name: 'Inteligência Artificial', icon: Brain, count: 25, color: 'from-indigo-500 to-purple-500' },
        { id: 'security', name: 'Cybersecurity', icon: Shield, count: 15, color: 'from-red-500 to-pink-500' },
        { id: 'tools', name: 'Ferramentas', icon: Settings, count: 11, color: 'from-gray-500 to-gray-600' }
    ]

    const types = [
        { id: 'all', name: 'Todos os Tipos', icon: BookOpen, color: 'from-gray-500 to-gray-600' },
        { id: 'documentation', name: 'Documentação', icon: FileText, color: 'from-blue-500 to-cyan-500' },
        { id: 'tutorials', name: 'Tutoriais', icon: Play, color: 'from-green-500 to-emerald-500' },
        { id: 'templates', name: 'Templates', icon: Code, color: 'from-purple-500 to-pink-500' },
        { id: 'cheatsheets', name: 'Cheat Sheets', icon: FileText, color: 'from-orange-500 to-red-500' },
        { id: 'tools', name: 'Ferramentas', icon: Settings, color: 'from-indigo-500 to-purple-500' },
        { id: 'books', name: 'Livros', icon: BookOpen, color: 'from-yellow-500 to-orange-500' }
    ]

    const resources = [
        // Web Development
        {
            id: 1,
            title: 'Guia Completo de React Hooks',
            slug: 'guia-completo-react-hooks',
            description: 'Documentação completa sobre todos os hooks do React com exemplos práticos.',
            type: 'documentation',
            category: 'web',
            rating: 4.9,
            downloads: 12500,
            size: '2.5 MB',
            format: 'PDF',
            language: 'Português',
            tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
            isNew: true,
            isPopular: true,
            isFree: true,
            author: 'João Silva',
            lastUpdated: '2024-01-15',
            pages: 45,
            features: ['Exemplos Práticos', 'Exercícios', 'Código Executável']
        },
        {
            id: 2,
            title: 'Template E-commerce React + Node.js',
            slug: 'template-ecommerce-react-nodejs',
            description: 'Template completo de e-commerce com frontend React e backend Node.js.',
            type: 'templates',
            category: 'web',
            rating: 4.8,
            downloads: 8900,
            size: '15.2 MB',
            format: 'ZIP',
            language: 'JavaScript',
            tags: ['React', 'Node.js', 'E-commerce', 'Template'],
            isNew: false,
            isPopular: true,
            isFree: true,
            author: 'Maria Santos',
            lastUpdated: '2024-01-10',
            pages: null,
            features: ['Código Completo', 'Documentação', 'Deploy Guide']
        },
        {
            id: 3,
            title: 'CSS Grid Cheat Sheet',
            slug: 'css-grid-cheat-sheet',
            description: 'Referência rápida para CSS Grid com propriedades e exemplos.',
            type: 'cheatsheets',
            category: 'web',
            rating: 4.7,
            downloads: 15600,
            size: '1.2 MB',
            format: 'PDF',
            language: 'Português',
            tags: ['CSS', 'Grid', 'Layout', 'Cheat Sheet'],
            isNew: true,
            isPopular: true,
            isFree: true,
            author: 'Carlos Oliveira',
            lastUpdated: '2024-01-12',
            pages: 8,
            features: ['Referência Rápida', 'Exemplos Visuais', 'Propriedades']
        },

        // Mobile Development
        {
            id: 4,
            title: 'React Native Components Library',
            slug: 'react-native-components-library',
            description: 'Biblioteca de componentes reutilizáveis para React Native.',
            type: 'templates',
            category: 'mobile',
            rating: 4.6,
            downloads: 7200,
            size: '8.5 MB',
            format: 'ZIP',
            language: 'JavaScript',
            tags: ['React Native', 'Components', 'UI', 'Library'],
            isNew: false,
            isPopular: true,
            isFree: true,
            author: 'Ana Costa',
            lastUpdated: '2024-01-08',
            pages: null,
            features: ['20+ Componentes', 'TypeScript', 'Documentação']
        },
        {
            id: 5,
            title: 'Flutter Widgets Guide',
            slug: 'flutter-widgets-guide',
            description: 'Guia completo de widgets do Flutter com exemplos práticos.',
            type: 'documentation',
            category: 'mobile',
            rating: 4.8,
            downloads: 6400,
            size: '3.8 MB',
            format: 'PDF',
            language: 'Português',
            tags: ['Flutter', 'Widgets', 'Dart', 'Mobile'],
            isNew: true,
            isPopular: false,
            isFree: true,
            author: 'Pedro Flutter',
            lastUpdated: '2024-01-14',
            pages: 32,
            features: ['Widgets Completos', 'Exemplos', 'Best Practices']
        },

        // Data Science
        {
            id: 6,
            title: 'Python Data Science Handbook',
            slug: 'python-data-science-handbook',
            description: 'Manual completo de Python para Data Science com pandas, numpy e matplotlib.',
            type: 'books',
            category: 'data',
            rating: 4.9,
            downloads: 11200,
            size: '12.3 MB',
            format: 'PDF',
            language: 'Português',
            tags: ['Python', 'Data Science', 'Pandas', 'NumPy'],
            isNew: false,
            isPopular: true,
            isFree: true,
            author: 'Dr. Data',
            lastUpdated: '2024-01-05',
            pages: 120,
            features: ['Exemplos Práticos', 'Datasets', 'Exercícios']
        },
        {
            id: 7,
            title: 'Jupyter Notebooks Collection',
            slug: 'jupyter-notebooks-collection',
            description: 'Coleção de notebooks Jupyter para análise de dados e machine learning.',
            type: 'templates',
            category: 'data',
            rating: 4.7,
            downloads: 8500,
            size: '25.6 MB',
            format: 'ZIP',
            language: 'Python',
            tags: ['Jupyter', 'Data Analysis', 'Machine Learning', 'Notebooks'],
            isNew: true,
            isPopular: true,
            isFree: true,
            author: 'Prof. ML',
            lastUpdated: '2024-01-11',
            pages: null,
            features: ['15+ Notebooks', 'Datasets Inclusos', 'Comentários']
        },

        // AI
        {
            id: 8,
            title: 'OpenAI API Integration Guide',
            slug: 'openai-api-integration-guide',
            description: 'Guia completo para integração com APIs da OpenAI.',
            type: 'documentation',
            category: 'ai',
            rating: 4.8,
            downloads: 9800,
            size: '4.2 MB',
            format: 'PDF',
            language: 'Português',
            tags: ['OpenAI', 'API', 'GPT', 'Integration'],
            isNew: true,
            isPopular: true,
            isFree: true,
            author: 'AI Specialist',
            lastUpdated: '2024-01-13',
            pages: 28,
            features: ['Exemplos de Código', 'Best Practices', 'Error Handling']
        },
        {
            id: 9,
            title: 'Machine Learning Templates',
            slug: 'machine-learning-templates',
            description: 'Templates prontos para projetos de machine learning.',
            type: 'templates',
            category: 'ai',
            rating: 4.6,
            downloads: 5600,
            size: '18.7 MB',
            format: 'ZIP',
            language: 'Python',
            tags: ['Machine Learning', 'Templates', 'Scikit-learn', 'TensorFlow'],
            isNew: false,
            isPopular: false,
            isFree: true,
            author: 'ML Expert',
            lastUpdated: '2024-01-09',
            pages: null,
            features: ['10+ Templates', 'Documentação', 'Exemplos']
        },

        // Cybersecurity
        {
            id: 10,
            title: 'Security Best Practices Guide',
            slug: 'security-best-practices-guide',
            description: 'Guia de melhores práticas de segurança para desenvolvedores.',
            type: 'documentation',
            category: 'security',
            rating: 4.7,
            downloads: 4200,
            size: '2.8 MB',
            format: 'PDF',
            language: 'Português',
            tags: ['Security', 'Best Practices', 'OWASP', 'Guidelines'],
            isNew: false,
            isPopular: true,
            isFree: true,
            author: 'Security Expert',
            lastUpdated: '2024-01-07',
            pages: 35,
            features: ['Checklist', 'Exemplos', 'Ferramentas']
        },

        // Tools
        {
            id: 11,
            title: 'VS Code Extensions Pack',
            slug: 'vscode-extensions-pack',
            description: 'Pacote de extensões essenciais para VS Code.',
            type: 'tools',
            category: 'tools',
            rating: 4.8,
            downloads: 15600,
            size: '5.1 MB',
            format: 'JSON',
            language: 'Config',
            tags: ['VS Code', 'Extensions', 'Productivity', 'Tools'],
            isNew: true,
            isPopular: true,
            isFree: true,
            author: 'Dev Tools',
            lastUpdated: '2024-01-16',
            pages: null,
            features: ['20+ Extensions', 'Configuração', 'Documentação']
        }
    ]

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
        const matchesType = selectedType === 'all' || resource.type === selectedType
        return matchesSearch && matchesCategory && matchesType
    })

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'documentation': return <FileText className="w-4 h-4" />
            case 'tutorials': return <Play className="w-4 h-4" />
            case 'templates': return <Code className="w-4 h-4" />
            case 'cheatsheets': return <FileText className="w-4 h-4" />
            case 'tools': return <Settings className="w-4 h-4" />
            case 'books': return <BookOpen className="w-4 h-4" />
            default: return <BookOpen className="w-4 h-4" />
        }
    }

    const getTypeName = (type: string) => {
        switch (type) {
            case 'documentation': return 'Documentação'
            case 'tutorials': return 'Tutoriais'
            case 'templates': return 'Templates'
            case 'cheatsheets': return 'Cheat Sheets'
            case 'tools': return 'Ferramentas'
            case 'books': return 'Livros'
            default: return 'Recurso'
        }
    }

    const getFormatColor = (format: string) => {
        switch (format) {
            case 'PDF': return 'from-red-500 to-pink-500'
            case 'ZIP': return 'from-blue-500 to-cyan-500'
            case 'JSON': return 'from-green-500 to-emerald-500'
            case 'MD': return 'from-purple-500 to-pink-500'
            default: return 'from-gray-500 to-gray-600'
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
                            <BookOpen className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                            <span className="gradient-text-neon">+156 Recursos Gratuitos</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                            Recursos <span className="gradient-text-neon animate-neon">Educacionais</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Biblioteca completa de recursos gratuitos para acelerar seu aprendizado em programação
                        </p>

                        {/* Search and Filters */}
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar recursos, tecnologias ou autores..."
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
                                {types.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedType(type.id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedType === type.id
                                            ? 'gradient-text bg-white/20 border border-blue-400/30'
                                            : 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                                            }`}
                                    >
                                        <type.icon className="w-4 h-4" />
                                        <span>{type.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="py-16 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-3xl font-bold text-white">
                                {filteredResources.length} Recursos Encontrados
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
                                    <option value="downloads">Mais Baixados</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResources.map((resource, index) => (
                            <div
                                key={resource.id}
                                className={`card group hover:scale-105 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative">
                                    {/* Resource Header */}
                                    <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-4xl opacity-50">
                                                {getTypeIcon(resource.type)}
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex space-x-2">
                                            {resource.isNew && (
                                                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                                                    NOVO
                                                </span>
                                            )}
                                            {resource.isPopular && (
                                                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full animate-glow">
                                                    POPULAR
                                                </span>
                                            )}
                                            {resource.isFree && (
                                                <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                                                    GRATUITO
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 group">
                                                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>

                                        {/* Type Badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                                                {getTypeIcon(resource.type)}
                                                <span>{getTypeName(resource.type)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resource Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getFormatColor(resource.format)}`}>
                                                {resource.format}
                                            </span>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium">{resource.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300 line-clamp-2">
                                            {resource.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                                            {resource.description}
                                        </p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Download className="w-4 h-4" />
                                                <span>{resource.downloads.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{resource.size}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {resource.tags.length > 3 && (
                                                <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20">
                                                    +{resource.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold text-white">Recursos:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {resource.features.slice(0, 2).map((feature, featureIndex) => (
                                                    <span
                                                        key={featureIndex}
                                                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {resource.features.length > 2 && (
                                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                                                        +{resource.features.length - 2} mais
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center justify-between text-sm text-gray-400">
                                                <span>Por {resource.author}</span>
                                                <span>{resource.lastUpdated}</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <FunctionalButton
                                                    href={`/resources/${resource.slug}`}
                                                    variant="primary"
                                                    size="md"
                                                    icon={<Download className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Baixar
                                                </FunctionalButton>
                                                <FunctionalButton
                                                    href={`/resources/${resource.slug}/preview`}
                                                    variant="outline"
                                                    size="md"
                                                    icon={<Eye className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Preview
                                                </FunctionalButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredResources.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Nenhum recurso encontrado</h3>
                            <p className="text-gray-300 mb-8">Tente ajustar seus filtros de busca</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('all')
                                    setSelectedType('all')
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
                        Baixe nossos recursos gratuitos e acelere seu aprendizado em programação
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

