'use client'

import React, { useState, useEffect } from 'react'
import {
    Search,
    Filter,
    Plus,
    MessageCircle,
    Users,
    Star,
    Heart,
    Share2,
    MoreHorizontal,
    TrendingUp,
    Clock,
    Award,
    Code,
    Database,
    Smartphone,
    Shield,
    Brain,
    Zap,
    Sparkles,
    ArrowRight,
    BookOpen,
    Target
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'

export default function CommunityPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('all')

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const categories = [
        { id: 'all', name: 'Todos', icon: MessageCircle, count: 1247 },
        { id: 'web', name: 'Web Development', icon: Code, count: 456 },
        { id: 'data', name: 'Data Science', icon: Database, count: 234 },
        { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 189 },
        { id: 'security', name: 'Cybersecurity', icon: Shield, count: 156 },
        { id: 'ai', name: 'Inteligência Artificial', icon: Brain, count: 212 }
    ]

    const posts = [
        {
            id: 1,
            title: 'Como otimizar performance em React?',
            content: 'Estou enfrentando problemas de performance em minha aplicação React. Alguém tem dicas para otimizar re-renders desnecessários?',
            author: {
                name: 'João Silva',
                avatar: 'JS',
                level: 'Avançado',
                verified: true
            },
            category: 'web',
            tags: ['React', 'Performance', 'JavaScript'],
            likes: 42,
            comments: 18,
            shares: 5,
            time: '2 horas atrás',
            isLiked: false,
            isBookmarked: false
        },
        {
            id: 2,
            title: 'Projeto: Sistema de recomendação com ML',
            content: 'Compartilhando meu projeto de sistema de recomendação usando Python e scikit-learn. Código disponível no GitHub!',
            author: {
                name: 'Maria Santos',
                avatar: 'MS',
                level: 'Especialista',
                verified: true
            },
            category: 'data',
            tags: ['Python', 'Machine Learning', 'scikit-learn'],
            likes: 89,
            comments: 32,
            shares: 15,
            time: '4 horas atrás',
            isLiked: true,
            isBookmarked: true
        },
        {
            id: 3,
            title: 'Dicas para entrevistas de emprego em tech',
            content: 'Coletei algumas dicas valiosas de entrevistas que me ajudaram a conseguir minha vaga. Vou compartilhar com vocês!',
            author: {
                name: 'Carlos Oliveira',
                avatar: 'CO',
                level: 'Intermediário',
                verified: false
            },
            category: 'all',
            tags: ['Carreira', 'Entrevistas', 'Dicas'],
            likes: 156,
            comments: 67,
            shares: 28,
            time: '1 dia atrás',
            isLiked: false,
            isBookmarked: true
        },
        {
            id: 4,
            title: 'React Native vs Flutter: Qual escolher?',
            content: 'Estou começando no desenvolvimento mobile e não sei qual tecnologia escolher. Alguém pode me ajudar?',
            author: {
                name: 'Ana Costa',
                avatar: 'AC',
                level: 'Iniciante',
                verified: false
            },
            category: 'mobile',
            tags: ['React Native', 'Flutter', 'Mobile'],
            likes: 23,
            comments: 41,
            shares: 3,
            time: '2 dias atrás',
            isLiked: false,
            isBookmarked: false
        }
    ]

    const topUsers = [
        {
            name: 'João Silva',
            avatar: 'JS',
            level: 'Avançado',
            points: 15420,
            badges: 8,
            verified: true
        },
        {
            name: 'Maria Santos',
            avatar: 'MS',
            level: 'Especialista',
            points: 12850,
            badges: 12,
            verified: true
        },
        {
            name: 'Carlos Oliveira',
            avatar: 'CO',
            level: 'Intermediário',
            points: 9870,
            badges: 6,
            verified: false
        }
    ]

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'web': return <Code className="w-4 h-4" />
            case 'data': return <Database className="w-4 h-4" />
            case 'mobile': return <Smartphone className="w-4 h-4" />
            case 'security': return <Shield className="w-4 h-4" />
            case 'ai': return <Brain className="w-4 h-4" />
            default: return <MessageCircle className="w-4 h-4" />
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'web': return 'from-blue-500 to-cyan-500'
            case 'data': return 'from-green-500 to-emerald-500'
            case 'mobile': return 'from-purple-500 to-pink-500'
            case 'security': return 'from-red-500 to-orange-500'
            case 'ai': return 'from-yellow-500 to-orange-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Iniciante': return 'from-green-500 to-emerald-500'
            case 'Intermediário': return 'from-blue-500 to-cyan-500'
            case 'Avançado': return 'from-purple-500 to-pink-500'
            case 'Especialista': return 'from-yellow-500 to-orange-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />

            {/* Header */}
            <section className="relative pt-24 pb-16">
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium animate-glow">
                            <Users className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                            <span className="gradient-text-neon">+50.000 Desenvolvedores</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                            Comunidade <span className="gradient-text-neon animate-neon">Fênix</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Conecte-se com outros desenvolvedores, compartilhe conhecimento e cresça junto
                        </p>

                        {/* Search and Filters */}
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar discussões, projetos ou desenvolvedores..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                                />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveFilter(category.id)}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group ${activeFilter === category.id
                                            ? 'gradient-text bg-white/20 border border-blue-400/30'
                                            : 'text-white/90 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {getCategoryIcon(category.id)}
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Create Post */}
                        <div className="card">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">EU</span>
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="O que você está pensando? Compartilhe com a comunidade..."
                                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                                <button className="btn-primary group flex items-center space-x-2">
                                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                                    <span>Publicar</span>
                                </button>
                            </div>
                        </div>

                        {/* Posts */}
                        <div className="space-y-6">
                            {posts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className={`card group hover:scale-105 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="space-y-4">
                                        {/* Post Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold">{post.author.avatar}</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <h3 className="font-semibold text-white">{post.author.name}</h3>
                                                        {post.author.verified && (
                                                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                                <span className="text-white text-xs">✓</span>
                                                            </div>
                                                        )}
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getLevelColor(post.author.level)}`}>
                                                            {post.author.level}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-400">{post.time}</p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Post Content */}
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-300 leading-relaxed mb-4">
                                                {post.content}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Post Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div className="flex items-center space-x-6">
                                                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${post.isLiked
                                                    ? 'text-red-400 bg-red-400/20'
                                                    : 'text-gray-400 hover:text-red-400 hover:bg-red-400/20'
                                                    }`}>
                                                    <Heart className={`w-5 h-5 group-hover:scale-110 transition-transform ${post.isLiked ? 'fill-current' : ''}`} />
                                                    <span className="text-sm font-medium">{post.likes}</span>
                                                </button>

                                                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/20 transition-all duration-300 group">
                                                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-medium">{post.comments}</span>
                                                </button>

                                                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-400/20 transition-all duration-300 group">
                                                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-medium">{post.shares}</span>
                                                </button>
                                            </div>

                                            <button className={`p-2 rounded-lg transition-all duration-300 ${post.isBookmarked
                                                ? 'text-yellow-400 bg-yellow-400/20'
                                                : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/20'
                                                }`}>
                                                <Star className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Top Users */}
                        <div className="card">
                            <h2 className="text-xl font-bold text-white mb-6">Top Contribuidores</h2>
                            <div className="space-y-4">
                                {topUsers.map((user, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">{user.avatar}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium text-white">{user.name}</h3>
                                                {user.verified && (
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                <span>{user.points.toLocaleString()} pts</span>
                                                <span>•</span>
                                                <span>{user.badges} badges</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold gradient-text">#{index + 1}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="card">
                            <h2 className="text-xl font-bold text-white mb-6">Ações Rápidas</h2>
                            <div className="space-y-3">
                                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                                    <Code className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-white">Compartilhar Projeto</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                                    <BookOpen className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-white">Pedir Ajuda</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                                    <Target className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-white">Definir Meta</span>
                                </button>
                            </div>
                        </div>

                        {/* Trending Topics */}
                        <div className="card">
                            <h2 className="text-xl font-bold text-white mb-6">Tópicos em Alta</h2>
                            <div className="space-y-3">
                                {['React Hooks', 'Machine Learning', 'DevOps', 'Clean Code', 'API Design'].map((topic, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                                        <span className="text-white group-hover:text-blue-400 transition-colors">#{topic}</span>
                                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>+{Math.floor(Math.random() * 100)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}