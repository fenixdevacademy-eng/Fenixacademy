'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Calendar,
    Clock,
    User,
    Eye,
    Heart,
    Share2,
    Bookmark,
    Search,
    Filter,
    Tag,
    ChevronRight,
    TrendingUp,
    Star,
    MessageCircle,
    ArrowRight,
    Play,
    Code,
    Brain,
    Zap,
    Bell,
    Menu,
    X as CloseIcon,
    Sparkles,
    ThumbsUp,
    RefreshCw,
    Filter as FilterIcon,
    SortAsc,
    SortDesc,
    ChevronDown,
    ChevronUp,
    Users,
    Trophy,
    GraduationCap,
    Lightbulb,
    Shield,
    Crown,
    Target,
    Globe,
    BookOpen
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import PageWrapperFunctional from '@/components/PageWrapperFunctional';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function BlogPage() {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Simular carregamento de dados do blog
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const categories = [
        'Todas', 'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
        'Carreira', 'Tutoriais', 'Dicas', 'Notícias', 'Projetos'
    ];

    const featuredPosts = [
        {
            id: 1,
            title: 'Como se tornar um desenvolvedor full-stack em 2025',
            excerpt: 'Guia completo com roadmap, tecnologias e dicas práticas para iniciar sua jornada como desenvolvedor full-stack...',
            author: 'Dr. Carlos Silva',
            avatar: '/images/avatars/carlos.jpg',
            category: 'Carreira',
            date: '2025-02-10',
            readTime: '8 min',
            views: 1250,
            likes: 89,
            comments: 23,
            image: '/images/blog/fullstack-guide.jpg',
            tags: ['Carreira', 'Full-stack', 'Roadmap', '2025'],
            isFeatured: true
        },
        {
            id: 2,
            title: 'React 18: Novidades e como migrar sua aplicação',
            excerpt: 'Descubra as principais novidades do React 18 e aprenda como migrar sua aplicação de forma segura...',
            author: 'Ana Costa',
            avatar: '/images/avatars/ana.jpg',
            category: 'React',
            date: '2025-02-08',
            readTime: '12 min',
            views: 980,
            likes: 67,
            comments: 18,
            image: '/images/blog/react-18.jpg',
            tags: ['React', 'React 18', 'Migração', 'JavaScript'],
            isFeatured: true
        }
    ];

    const posts = [
        {
            id: 3,
            title: 'TypeScript vs JavaScript: Qual escolher em 2025?',
            excerpt: 'Análise detalhada das diferenças entre TypeScript e JavaScript e quando usar cada um...',
            author: 'João Santos',
            avatar: '/images/avatars/joao.jpg',
            category: 'TypeScript',
            date: '2025-02-05',
            readTime: '6 min',
            views: 750,
            likes: 45,
            comments: 12,
            image: '/images/blog/typescript-vs-js.jpg',
            tags: ['TypeScript', 'JavaScript', 'Comparação', '2025']
        },
        {
            id: 4,
            title: '10 dicas para otimizar performance em aplicações React',
            excerpt: 'Dicas práticas e técnicas avançadas para melhorar a performance das suas aplicações React...',
            author: 'Maria Oliveira',
            avatar: '/images/avatars/maria.jpg',
            category: 'React',
            date: '2025-02-03',
            readTime: '10 min',
            views: 890,
            likes: 52,
            comments: 15,
            image: '/images/blog/react-performance.jpg',
            tags: ['React', 'Performance', 'Otimização', 'Dicas']
        },
        {
            id: 5,
            title: 'Construindo APIs REST robustas com Node.js e Express',
            excerpt: 'Tutorial completo para criar APIs REST escaláveis e seguras usando Node.js e Express...',
            author: 'Pedro Lima',
            avatar: '/images/avatars/pedro.jpg',
            category: 'Node.js',
            date: '2025-02-01',
            readTime: '15 min',
            views: 1100,
            likes: 78,
            comments: 21,
            image: '/images/blog/nodejs-api.jpg',
            tags: ['Node.js', 'Express', 'API', 'REST', 'Tutorial']
        },
        {
            id: 6,
            title: 'Python para Data Science: Bibliotecas essenciais',
            excerpt: 'Conheça as principais bibliotecas Python para Data Science e como usá-las efetivamente...',
            author: 'Sofia Chen',
            avatar: '/images/avatars/sofia.jpg',
            category: 'Python',
            date: '2025-01-28',
            readTime: '9 min',
            views: 650,
            likes: 41,
            comments: 9,
            image: '/images/blog/python-datascience.jpg',
            tags: ['Python', 'Data Science', 'Pandas', 'NumPy', 'Matplotlib']
        },
        {
            id: 7,
            title: 'Como conseguir seu primeiro emprego como desenvolvedor',
            excerpt: 'Estratégias práticas e dicas valiosas para conseguir sua primeira oportunidade na área de desenvolvimento...',
            author: 'Rafael Santos',
            avatar: '/images/avatars/rafael.jpg',
            category: 'Carreira',
            date: '2025-01-25',
            readTime: '7 min',
            views: 1400,
            likes: 95,
            comments: 28,
            image: '/images/blog/first-job.jpg',
            tags: ['Carreira', 'Primeiro Emprego', 'Dicas', 'Desenvolvimento']
        },
        {
            id: 8,
            title: 'Git e GitHub: Controle de versão para desenvolvedores',
            excerpt: 'Aprenda a usar Git e GitHub de forma eficiente para gerenciar seus projetos de código...',
            author: 'Marina Costa',
            avatar: '/images/avatars/marina.jpg',
            category: 'Tutoriais',
            date: '2025-01-22',
            readTime: '11 min',
            views: 820,
            likes: 58,
            comments: 14,
            image: '/images/blog/git-github.jpg',
            tags: ['Git', 'GitHub', 'Controle de Versão', 'Tutorial']
        }
    ];

    const trendingTopics = [
        { name: 'React 18', posts: 15, trend: 'up' },
        { name: 'TypeScript', posts: 23, trend: 'up' },
        { name: 'Node.js', posts: 18, trend: 'up' },
        { name: 'Python', posts: 21, trend: 'up' },
        { name: 'Carreira', posts: 12, trend: 'up' },
        { name: 'Performance', posts: 8, trend: 'up' }
    ];

    if (loading) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 theme-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <LoadingSpinner size="lg" />
                        </div>
                        <h2 className="text-2xl font-bold theme-text mb-2">Carregando Blog</h2>
                        <p className="theme-text-secondary">Preparando os melhores artigos para você...</p>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                {/* Header Modernizado */}
                <header className="theme-surface border-b theme-border sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href={ROUTES.HOME} className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 theme-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white font-bold text-xl">F</span>
                                </div>
                                <span className="text-xl font-bold theme-text group-hover:theme-primary transition-colors duration-300">
                                    Fênix Dev Academy
                                </span>
                            </Link>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link href={ROUTES.COURSES} className="theme-text-secondary hover:theme-primary transition-colors duration-300">
                                    Cursos
                                </Link>
                                <Link href={ROUTES.PRICING} className="theme-text-secondary hover:theme-primary transition-colors duration-300">
                                    Preços
                                </Link>
                                <Link href={ROUTES.ABOUT} className="theme-text-secondary hover:theme-primary transition-colors duration-300">
                                    Sobre
                                </Link>
                                <Link href={ROUTES.BLOG} className="theme-text hover:theme-primary transition-colors duration-300 font-medium">
                                    Blog
                                </Link>
                            </nav>

                            {/* Right side */}
                            <div className="flex items-center space-x-4">
                                <button className="theme-text-secondary hover:theme-primary transition-colors duration-300 p-2 rounded-lg hover:theme-surface">
                                    <Search className="w-5 h-5" />
                                </button>
                                <div className="relative">
                                    <button className="theme-text-secondary hover:theme-primary transition-colors duration-300 p-2 rounded-lg hover:theme-surface">
                                        <Bell className="w-5 h-5" />
                                    </button>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="w-8 h-8 theme-surface rounded-full flex items-center justify-center border theme-border">
                                    <Users className="w-4 h-4 theme-text" />
                                </div>
                                <Link href={ROUTES.COMEÇAR_AGORA} className="theme-gradient-primary text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                    Começar Agora
                                </Link>
                                <Link href={ROUTES.LOGIN} className="theme-surface theme-text hover:theme-primary px-4 py-2 rounded-xl font-medium transition-all duration-300 border theme-border">
                                    Entrar
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section Modernizado */}
                <div className="relative overflow-hidden theme-gradient-background">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                        <div className="text-center">
                            <div className="mb-12">
                                <div className="w-24 h-24 theme-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group">
                                    <Sparkles className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold theme-text mb-8">
                                Nosso <span className="theme-gradient-primary bg-clip-text text-transparent">Blog</span>
                            </h1>
                            <p className="text-xl md:text-2xl theme-text-secondary max-w-4xl mx-auto mb-16 leading-relaxed">
                                Artigos, tutoriais e dicas para acelerar seu crescimento como desenvolvedor
                            </p>

                            {/* Search Bar Modernizada */}
                            <div className="max-w-2xl mx-auto mb-12">
                                <div className="relative">
                                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 theme-text-secondary w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Buscar artigos, tutoriais, dicas..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 theme-surface border theme-border rounded-2xl theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Categories Modernizadas */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                            ? 'theme-gradient-primary text-white shadow-lg'
                                            : 'theme-surface theme-text-secondary hover:theme-primary hover:shadow-lg'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Featured Posts Modernizadas */}
                            <div className="mb-20">
                                <div className="flex items-center gap-3 mb-12">
                                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                                        <Star className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold theme-text">
                                        Artigos em Destaque
                                    </h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {featuredPosts.map((post) => (
                                        <article
                                            key={post.id}
                                            className="theme-surface rounded-2xl overflow-hidden border theme-border hover:shadow-2xl transition-all duration-500 group hover:scale-105"
                                        >
                                            <div className="aspect-video theme-gradient-primary relative overflow-hidden">
                                                <div className="absolute inset-0 bg-black/20"></div>
                                                <div className="absolute top-6 left-6">
                                                    <span className="bg-yellow-500 text-black px-4 py-2 rounded-2xl text-sm font-bold">
                                                        DESTAQUE
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-6 left-6 right-6">
                                                    <div className="flex items-center gap-3 text-white text-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(post.date).toLocaleDateString('pt-BR')}
                                                        <span>•</span>
                                                        <Clock className="w-4 h-4" />
                                                        {post.readTime}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-8">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="theme-gradient-primary text-white px-3 py-1 rounded-xl text-sm font-medium">
                                                        {post.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold theme-text mb-4 group-hover:theme-primary transition-colors duration-300">
                                                    {post.title}
                                                </h3>
                                                <p className="theme-text-secondary text-base mb-6 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                                                            <span className="text-white font-bold text-lg">
                                                                {post.author.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="theme-text font-medium">{post.author}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6 text-sm theme-text-secondary">
                                                        <div className="flex items-center gap-2">
                                                            <Eye className="w-4 h-4" />
                                                            {post.views}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Heart className="w-4 h-4" />
                                                            {post.likes}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-6">
                                                    {post.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="theme-surface theme-text-secondary px-3 py-1 rounded-xl text-sm"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>

                            {/* All Posts Modernizadas */}
                            <div>
                                <div className="flex items-center gap-3 mb-12">
                                    <div className="w-10 h-10 theme-gradient-primary rounded-xl flex items-center justify-center">
                                        <Bookmark className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold theme-text">
                                        Todos os Artigos
                                    </h2>
                                </div>
                                <div className="space-y-8">
                                    {posts.map((post) => (
                                        <article
                                            key={post.id}
                                            className="theme-surface rounded-2xl p-8 border theme-border hover:shadow-2xl transition-all duration-500 group hover:scale-105"
                                        >
                                            <div className="flex gap-8">
                                                <div className="w-40 h-32 theme-gradient-primary rounded-2xl flex-shrink-0"></div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="theme-gradient-primary text-white px-3 py-1 rounded-xl text-sm font-medium">
                                                            {post.category}
                                                        </span>
                                                        <span className="theme-text-secondary text-sm">
                                                            {new Date(post.date).toLocaleDateString('pt-BR')}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold theme-text mb-4 group-hover:theme-primary transition-colors duration-300">
                                                        {post.title}
                                                    </h3>
                                                    <p className="theme-text-secondary text-base mb-6 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                                                                <span className="text-white font-bold text-lg">
                                                                    {post.author.charAt(0)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="theme-text font-medium">{post.author}</p>
                                                                <div className="flex items-center gap-2 text-sm theme-text-secondary">
                                                                    <Clock className="w-4 h-4" />
                                                                    {post.readTime}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-6 text-sm theme-text-secondary">
                                                            <div className="flex items-center gap-2">
                                                                <Eye className="w-4 h-4" />
                                                                {post.views}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Heart className="w-4 h-4" />
                                                                {post.likes}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MessageCircle className="w-4 h-4" />
                                                                {post.comments}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-6">
                                                        {post.tags.map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="theme-surface theme-text-secondary px-3 py-1 rounded-xl text-sm"
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Modernizada */}
                        <div className="lg:col-span-1">
                            <div className="space-y-8">
                                {/* Trending Topics Modernizadas */}
                                <div className="theme-surface rounded-2xl p-8 border theme-border">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold theme-text">
                                            Tópicos em Alta
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {trendingTopics.map((topic, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 rounded-xl theme-surface hover:shadow-lg transition-all duration-300">
                                                <div className="flex items-center gap-3">
                                                    <span className="theme-text font-medium">#{topic.name}</span>
                                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                                </div>
                                                <span className="theme-text-secondary text-sm">{topic.posts} artigos</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Newsletter Modernizada */}
                                <div className="theme-gradient-primary rounded-2xl p-8 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <div className="relative">
                                        <h3 className="text-xl font-bold text-white mb-4">
                                            📧 Newsletter
                                        </h3>
                                        <p className="text-blue-100 text-sm mb-6">
                                            Receba os melhores artigos e dicas diretamente no seu email
                                        </p>
                                        <div className="space-y-4">
                                            <input
                                                type="email"
                                                placeholder="Seu email"
                                                className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                                            />
                                            <button className="w-full bg-white text-blue-600 hover:bg-gray-100 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
                                                Inscrever-se
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Popular Authors Modernizadas */}
                                <div className="theme-surface rounded-2xl p-8 border theme-border">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 theme-gradient-primary rounded-xl flex items-center justify-center">
                                            <Users className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold theme-text">
                                            Autores Populares
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {['Dr. Carlos Silva', 'Ana Costa', 'João Santos', 'Maria Oliveira'].map((author, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 rounded-xl theme-surface hover:shadow-lg transition-all duration-300">
                                                <div className="w-12 h-12 theme-gradient-primary rounded-2xl flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg">
                                                        {author.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="theme-text font-medium">{author}</p>
                                                    <p className="theme-text-secondary text-sm">15 artigos</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section Modernizada */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="theme-gradient-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative">
                            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                                Quer contribuir com nosso <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">blog</span>?
                            </h2>
                            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                                Compartilhe seu conhecimento e ajude outros desenvolvedores a crescer
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link
                                    href={ROUTES.COMMUNITY}
                                    className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-xl"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    Entrar na Comunidade
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={ROUTES.COURSES}
                                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                                >
                                    <Play className="w-6 h-6" />
                                    Ver Cursos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapperFunctional>
    );
}

