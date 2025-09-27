'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Search,
    Filter,
    Star,
    Clock,
    Users,
    Play,
    BookOpen,
    Code,
    Database,
    Smartphone,
    Shield,
    Zap,
    Award,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Brain,
    Target,
    Rocket,
    Globe,
    ShoppingCart
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import FunctionalButton from '@/components/FunctionalButton'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'
import { generateSlug, getCourseUrl, getCourseDemoUrl, getCategoryColor, getLevelColor } from '@/lib/courseUtils'
import { useCurrency } from '@/hooks/useCurrency'

export default function CoursesPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('popular')
    const [showCurrencySelector, setShowCurrencySelector] = useState(false)
    const [convertedPrices, setConvertedPrices] = useState<Record<number, number>>({})

    const {
        currencies,
        selectedCurrency,
        setSelectedCurrency,
        convertCurrency,
        formatCurrency,
        getCurrencySymbol,
        getCurrencyFlag,
        loading: currencyLoading
    } = useCurrency()

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    // Converter preços quando a moeda muda
    useEffect(() => {
        if (selectedCurrency && selectedCurrency !== 'BRL') {
            const convertAllPrices = async () => {
                const newConvertedPrices: Record<number, number> = {}

                for (const course of courses) {
                    const price = parseFloat(course.price.replace('R$ ', '').replace(',', '.'))
                    const conversion = await convertCurrency('BRL', selectedCurrency, price)
                    if (conversion) {
                        newConvertedPrices[course.id] = conversion.convertedAmount
                    }
                }

                setConvertedPrices(newConvertedPrices)
            }

            convertAllPrices()
        } else {
            setConvertedPrices({})
        }
    }, [selectedCurrency, convertCurrency])

    // Função para obter preço formatado
    const getFormattedPrice = (course: any) => {
        if (selectedCurrency === 'BRL') {
            return course.price
        }

        const convertedPrice = convertedPrices[course.id]
        if (convertedPrice) {
            return formatCurrency(convertedPrice, selectedCurrency)
        }

        return course.price // Fallback para BRL
    }

    const categories = [
        { id: 'all', name: 'Todos', icon: BookOpen, count: 24 },
        { id: 'web', name: 'Web Development', icon: Code, count: 8 },
        { id: 'data', name: 'Data Science', icon: Database, count: 6 },
        { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 4 },
        { id: 'security', name: 'Cybersecurity', icon: Shield, count: 3 },
        { id: 'ai', name: 'Inteligência Artificial', icon: Brain, count: 3 }
    ]

    const courses = [
        // Web Development (8 cursos)
        {
            id: 1,
            title: 'React Avançado - Do Zero ao Profissional',
            slug: 'react-avancado-do-zero-ao-profissional',
            description: 'Aprenda React com padrões avançados, hooks customizados e otimizações de performance.',
            instructor: 'João Silva',
            rating: 4.9,
            students: 15420,
            duration: '40h',
            level: 'Intermediário',
            price: 'R$ 297',
            originalPrice: 'R$ 497',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
            isNew: true,
            isPopular: true
        },
        {
            id: 2,
            title: 'Node.js & Express - Backend Profissional',
            slug: 'nodejs-express-backend-profissional',
            description: 'Construa APIs robustas com Node.js, Express, MongoDB e deploy em produção.',
            instructor: 'Carlos Oliveira',
            rating: 4.9,
            students: 9870,
            duration: '35h',
            level: 'Intermediário',
            price: 'R$ 347',
            originalPrice: 'R$ 547',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['Node.js', 'Express', 'MongoDB', 'API'],
            isNew: false,
            isPopular: false
        },
        {
            id: 3,
            title: 'JavaScript Moderno ES6+',
            slug: 'javascript-moderno-es6',
            description: 'Domine as funcionalidades mais recentes do JavaScript e programação assíncrona.',
            instructor: 'Maria Tech',
            rating: 4.8,
            students: 12300,
            duration: '30h',
            level: 'Iniciante',
            price: 'R$ 247',
            originalPrice: 'R$ 447',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['JavaScript', 'ES6', 'Async/Await', 'Promises'],
            isNew: false,
            isPopular: true
        },
        {
            id: 4,
            title: 'Vue.js 3 - Framework Progressivo',
            slug: 'vuejs-3-framework-progressivo',
            description: 'Aprenda Vue.js 3 com Composition API, TypeScript e ferramentas modernas.',
            instructor: 'Lucas Vue',
            rating: 4.7,
            students: 8750,
            duration: '38h',
            level: 'Intermediário',
            price: 'R$ 327',
            originalPrice: 'R$ 527',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['Vue.js', 'TypeScript', 'Composition API', 'Frontend'],
            isNew: true,
            isPopular: false
        },
        {
            id: 5,
            title: 'Angular - Aplicações Empresariais',
            slug: 'angular-aplicaes-empresariais',
            description: 'Desenvolva aplicações robustas e escaláveis com Angular e TypeScript.',
            instructor: 'Ana Angular',
            rating: 4.6,
            students: 7200,
            duration: '50h',
            level: 'Avançado',
            price: 'R$ 427',
            originalPrice: 'R$ 627',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['Angular', 'TypeScript', 'RxJS', 'Enterprise'],
            isNew: false,
            isPopular: true
        },
        {
            id: 6,
            title: 'Next.js - React em Produção',
            slug: 'nextjs-react-em-produo',
            description: 'Crie aplicações React otimizadas com Next.js, SSR e deploy na Vercel.',
            instructor: 'Pedro Next',
            rating: 4.9,
            students: 11200,
            duration: '42h',
            level: 'Intermediário',
            price: 'R$ 377',
            originalPrice: 'R$ 577',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['Next.js', 'React', 'SSR', 'Vercel'],
            isNew: true,
            isPopular: true
        },
        {
            id: 7,
            title: 'TypeScript - JavaScript Tipado',
            slug: 'typescript-javascript-tipado',
            description: 'Adicione tipagem estática ao JavaScript e melhore a qualidade do código.',
            instructor: 'Carlos Type',
            rating: 4.8,
            students: 9800,
            duration: '25h',
            level: 'Intermediário',
            price: 'R$ 197',
            originalPrice: 'R$ 397',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['TypeScript', 'JavaScript', 'Tipagem', 'Desenvolvimento'],
            isNew: false,
            isPopular: false
        },
        {
            id: 8,
            title: 'Webpack & Vite - Build Tools Modernas',
            slug: 'webpack-vite-build-tools-modernas',
            description: 'Configure e otimize ferramentas de build para projetos JavaScript modernos.',
            instructor: 'Maria Build',
            rating: 4.5,
            students: 5600,
            duration: '20h',
            level: 'Avançado',
            price: 'R$ 177',
            originalPrice: 'R$ 377',
            image: '/api/placeholder/400/250',
            category: 'web',
            tags: ['Webpack', 'Vite', 'Build Tools', 'Otimização'],
            isNew: true,
            isPopular: false
        },

        // Data Science (6 cursos)
        {
            id: 9,
            title: 'Python para Data Science Completo',
            slug: 'python-para-data-science-completo',
            description: 'Domine Python, Pandas, NumPy, Matplotlib e Machine Learning do básico ao avançado.',
            instructor: 'Maria Santos',
            rating: 4.8,
            students: 12850,
            duration: '60h',
            level: 'Iniciante',
            price: 'R$ 397',
            originalPrice: 'R$ 697',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas'],
            isNew: false,
            isPopular: true
        },
        {
            id: 10,
            title: 'R para Análise Estatística',
            slug: 'r-para-anlise-estatstica',
            description: 'Aprenda análise estatística e visualização de dados com R e RStudio.',
            instructor: 'Dr. Estatística',
            rating: 4.7,
            students: 6800,
            duration: '45h',
            level: 'Intermediário',
            price: 'R$ 297',
            originalPrice: 'R$ 497',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['R', 'Estatística', 'RStudio', 'Visualização'],
            isNew: false,
            isPopular: false
        },
        {
            id: 11,
            title: 'SQL Avançado para Data Analysis',
            slug: 'sql-avanado-para-data-analysis',
            description: 'Domine consultas SQL complexas, otimização e análise de dados em bancos relacionais.',
            instructor: 'João SQL',
            rating: 4.9,
            students: 9200,
            duration: '35h',
            level: 'Intermediário',
            price: 'R$ 247',
            originalPrice: 'R$ 447',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['SQL', 'Database', 'Análise', 'Performance'],
            isNew: true,
            isPopular: true
        },
        {
            id: 12,
            title: 'Power BI - Business Intelligence',
            slug: 'power-bi-business-intelligence',
            description: 'Crie dashboards e relatórios interativos para tomada de decisões empresariais.',
            instructor: 'Ana BI',
            rating: 4.6,
            students: 7500,
            duration: '30h',
            level: 'Iniciante',
            price: 'R$ 227',
            originalPrice: 'R$ 427',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Power BI', 'Dashboard', 'Business Intelligence', 'Microsoft'],
            isNew: false,
            isPopular: true
        },
        {
            id: 13,
            title: 'Tableau - Visualização de Dados',
            slug: 'tableau-visualizao-de-dados',
            description: 'Crie visualizações impactantes e dashboards interativos com Tableau.',
            instructor: 'Lucas Tableau',
            rating: 4.8,
            students: 6400,
            duration: '28h',
            level: 'Intermediário',
            price: 'R$ 277',
            originalPrice: 'R$ 477',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Tableau', 'Visualização', 'Dashboard', 'Analytics'],
            isNew: true,
            isPopular: false
        },
        {
            id: 14,
            title: 'Apache Spark - Big Data Processing',
            slug: 'apache-spark-big-data-processing',
            description: 'Processe grandes volumes de dados com Apache Spark e Scala.',
            instructor: 'Carlos BigData',
            rating: 4.7,
            students: 4200,
            duration: '55h',
            level: 'Avançado',
            price: 'R$ 497',
            originalPrice: 'R$ 797',
            image: '/api/placeholder/400/250',
            category: 'data',
            tags: ['Apache Spark', 'Big Data', 'Scala', 'Distributed Computing'],
            isNew: false,
            isPopular: true
        },

        // Mobile (4 cursos)
        {
            id: 15,
            title: 'React Native - Apps Mobile Nativos',
            slug: 'react-native-apps-mobile-nativos',
            description: 'Desenvolva aplicativos mobile para iOS e Android com React Native.',
            instructor: 'Ana Costa',
            rating: 4.7,
            students: 7650,
            duration: '45h',
            level: 'Intermediário',
            price: 'R$ 427',
            originalPrice: 'R$ 627',
            image: '/api/placeholder/400/250',
            category: 'mobile',
            tags: ['React Native', 'Mobile', 'iOS', 'Android'],
            isNew: true,
            isPopular: false
        },
        {
            id: 16,
            title: 'Flutter - Apps Cross-Platform',
            slug: 'flutter-apps-cross-platform',
            description: 'Crie aplicativos nativos para iOS e Android com Flutter e Dart.',
            instructor: 'Pedro Flutter',
            rating: 4.8,
            students: 8900,
            duration: '50h',
            level: 'Intermediário',
            price: 'R$ 377',
            originalPrice: 'R$ 577',
            image: '/api/placeholder/400/250',
            category: 'mobile',
            tags: ['Flutter', 'Dart', 'Cross-Platform', 'Mobile'],
            isNew: false,
            isPopular: true
        },
        {
            id: 17,
            title: 'Swift - Desenvolvimento iOS',
            slug: 'swift-desenvolvimento-ios',
            description: 'Desenvolva aplicativos nativos para iOS com Swift e Xcode.',
            instructor: 'Maria iOS',
            rating: 4.9,
            students: 6800,
            duration: '48h',
            level: 'Intermediário',
            price: 'R$ 447',
            originalPrice: 'R$ 647',
            image: '/api/placeholder/400/250',
            category: 'mobile',
            tags: ['Swift', 'iOS', 'Xcode', 'Apple'],
            isNew: true,
            isPopular: true
        },
        {
            id: 18,
            title: 'Kotlin - Desenvolvimento Android',
            slug: 'kotlin-desenvolvimento-android',
            description: 'Crie aplicativos Android modernos com Kotlin e Android Studio.',
            instructor: 'Lucas Android',
            rating: 4.7,
            students: 7200,
            duration: '42h',
            level: 'Intermediário',
            price: 'R$ 397',
            originalPrice: 'R$ 597',
            image: '/api/placeholder/400/250',
            category: 'mobile',
            tags: ['Kotlin', 'Android', 'Android Studio', 'Google'],
            isNew: false,
            isPopular: false
        },

        // Cybersecurity (3 cursos)
        {
            id: 19,
            title: 'Ethical Hacking & Penetration Testing',
            slug: 'ethical-hacking-penetration-testing',
            description: 'Aprenda técnicas de segurança da informação e testes de penetração.',
            instructor: 'Pedro Security',
            rating: 4.8,
            students: 5430,
            duration: '50h',
            level: 'Avançado',
            price: 'R$ 597',
            originalPrice: 'R$ 897',
            image: '/api/placeholder/400/250',
            category: 'security',
            tags: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing'],
            isNew: false,
            isPopular: true
        },
        {
            id: 20,
            title: 'CISSP - Segurança da Informação',
            slug: 'cissp-segurana-da-informao',
            description: 'Prepare-se para a certificação CISSP e domine conceitos de segurança empresarial.',
            instructor: 'Dr. Security',
            rating: 4.9,
            students: 3200,
            duration: '65h',
            level: 'Avançado',
            price: 'R$ 697',
            originalPrice: 'R$ 997',
            image: '/api/placeholder/400/250',
            category: 'security',
            tags: ['CISSP', 'Certificação', 'Segurança', 'Empresarial'],
            isNew: true,
            isPopular: false
        },
        {
            id: 21,
            title: 'Criptografia Aplicada',
            slug: 'criptografia-aplicada',
            description: 'Implemente algoritmos de criptografia e proteja dados sensíveis.',
            instructor: 'Ana Crypto',
            rating: 4.6,
            students: 2800,
            duration: '40h',
            level: 'Avançado',
            price: 'R$ 447',
            originalPrice: 'R$ 647',
            image: '/api/placeholder/400/250',
            category: 'security',
            tags: ['Criptografia', 'Algoritmos', 'Segurança', 'Proteção'],
            isNew: false,
            isPopular: true
        },

        // Inteligência Artificial (3 cursos)
        {
            id: 22,
            title: 'Machine Learning com TensorFlow',
            slug: 'machine-learning-com-tensorflow',
            description: 'Implemente algoritmos de ML e deep learning com TensorFlow e Keras.',
            instructor: 'Dr. AI Expert',
            rating: 4.9,
            students: 4320,
            duration: '55h',
            level: 'Avançado',
            price: 'R$ 547',
            originalPrice: 'R$ 847',
            image: '/api/placeholder/400/250',
            category: 'ai',
            tags: ['Machine Learning', 'TensorFlow', 'Deep Learning', 'AI'],
            isNew: true,
            isPopular: true
        },
        {
            id: 23,
            title: 'Deep Learning com PyTorch',
            slug: 'deep-learning-com-pytorch',
            description: 'Desenvolva redes neurais profundas com PyTorch e aplicações práticas.',
            instructor: 'Carlos Deep',
            rating: 4.8,
            students: 3800,
            duration: '60h',
            level: 'Avançado',
            price: 'R$ 527',
            originalPrice: 'R$ 827',
            image: '/api/placeholder/400/250',
            category: 'ai',
            tags: ['Deep Learning', 'PyTorch', 'Neural Networks', 'AI'],
            isNew: false,
            isPopular: true
        },
        {
            id: 24,
            title: 'ChatGPT & LLMs - Aplicações Práticas',
            slug: 'chatgpt-llms-aplicaes-prticas',
            description: 'Aprenda a usar e integrar Large Language Models em aplicações reais.',
            instructor: 'Maria LLM',
            rating: 4.9,
            students: 5600,
            duration: '35h',
            level: 'Intermediário',
            price: 'R$ 377',
            originalPrice: 'R$ 577',
            image: '/api/placeholder/400/250',
            category: 'ai',
            tags: ['ChatGPT', 'LLMs', 'OpenAI', 'Aplicações'],
            isNew: true,
            isPopular: true
        }
    ]

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Iniciante': return 'from-green-500 to-emerald-500'
            case 'Intermediário': return 'from-blue-500 to-cyan-500'
            case 'Avançado': return 'from-purple-500 to-pink-500'
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
                            <span className="gradient-text-neon">+24 Cursos Disponíveis</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                            Cursos de <span className="gradient-text-neon animate-neon">Tecnologia</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Aprenda com os melhores especialistas e domine as tecnologias mais demandadas do mercado
                        </p>

                        {/* Search and Filters */}
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar cursos, tecnologias ou instrutores..."
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
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-16 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-3xl font-bold text-white">
                                {filteredCourses.length} Cursos Encontrados
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
                                    <option value="price">Menor Preço</option>
                                    <option value="rating">Melhor Avaliação</option>
                                </select>
                            </div>
                        </div>

                        {/* Seletor de Moeda */}
                        <div className="relative">
                            <button
                                onClick={() => setShowCurrencySelector(!showCurrencySelector)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                            >
                                <span className="text-lg">{getCurrencyFlag(selectedCurrency)}</span>
                                <span className="font-medium">{selectedCurrency}</span>
                                <Globe className="w-4 h-4" />
                            </button>

                            {showCurrencySelector && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {currencies.map((currency) => (
                                        <button
                                            key={currency.code}
                                            onClick={() => {
                                                setSelectedCurrency(currency.code);
                                                setShowCurrencySelector(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${selectedCurrency === currency.code ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            <span className="text-lg">{currency.flag}</span>
                                            <div className="flex-1 text-left">
                                                <div className="font-medium text-gray-900">{currency.code}</div>
                                                <div className="text-sm text-gray-500">{currency.name}</div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-600">{currency.symbol}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {currencyLoading && selectedCurrency !== 'BRL' && (
                        <div className="flex items-center justify-center py-8">
                            <div className="flex items-center space-x-2 text-white">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                <span>Convertendo preços para {selectedCurrency}...</span>
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course, index) => (
                            <div
                                key={course.id}
                                className={`card group hover:scale-105 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative">
                                    {/* Course Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl opacity-50">
                                                {course.category === 'web' && <Code className="w-16 h-16" />}
                                                {course.category === 'data' && <Database className="w-16 h-16" />}
                                                {course.category === 'mobile' && <Smartphone className="w-16 h-16" />}
                                                {course.category === 'security' && <Shield className="w-16 h-16" />}
                                                {course.category === 'ai' && <Brain className="w-16 h-16" />}
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex space-x-2">
                                            {course.isNew && (
                                                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                                                    NOVO
                                                </span>
                                            )}
                                            {course.isPopular && (
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
                                    </div>

                                    {/* Course Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getLevelColor(course.level)}`}>
                                                {course.level}
                                            </span>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium">{course.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300 line-clamp-2">
                                            {course.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                                            {course.description}
                                        </p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{course.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>{course.students.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {course.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-2xl font-bold gradient-text">
                                                        {selectedCurrency !== 'BRL' && convertedPrices[course.id] ?
                                                            getFormattedPrice(course) :
                                                            course.price
                                                        }
                                                    </span>
                                                    {selectedCurrency !== 'BRL' && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            {course.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
                                                {selectedCurrency !== 'BRL' && (
                                                    <div className="text-xs text-gray-400">
                                                        ≈ {course.price} BRL
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-3">
                                                <FunctionalButton
                                                    href={`/payment?course=${course.id}`}
                                                    variant="primary"
                                                    size="md"
                                                    icon={<ShoppingCart className="w-4 h-4" />}
                                                    iconPosition="left"
                                                    glowEffect={true}
                                                    rippleEffect={true}
                                                    className="flex-1"
                                                >
                                                    Comprar Agora
                                                </FunctionalButton>
                                                <FunctionalButton
                                                    href={getCourseDemoUrl(course)}
                                                    variant="outline"
                                                    size="md"
                                                    icon={<Play className="w-4 h-4" />}
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

                    {filteredCourses.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Nenhum curso encontrado</h3>
                            <p className="text-gray-300 mb-8">Tente ajustar seus filtros de busca</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('all')
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
                        Pronto para começar sua <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-neon">jornada</span>?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Escolha seu curso e transforme sua carreira em tecnologia
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
                            href="/expanded-courses"
                            variant="outline"
                            size="xl"
                            icon={<Play className="w-6 h-6" />}
                            iconPosition="left"
                            glowEffect={true}
                            rippleEffect={true}
                            className="text-white border-white hover:bg-white hover:text-blue-600"
                        >
                            Ver Demo Gratuita
                        </FunctionalButton>
                    </div>
                </div>
            </section>
        </div>
    )
}