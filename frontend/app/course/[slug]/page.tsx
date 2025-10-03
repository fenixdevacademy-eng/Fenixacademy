'use client';

import React, { useState } from 'react';
import {
    Rocket,
    Code,
    Brain,
    Target,
    Award,
    Users,
    Clock,
    Star,
    Play,
    BookOpen,
    ArrowRight,
    CheckCircle,
    Eye,
    User,
    Calendar,
    Heart,
    Share2,
    ChevronDown
} from 'lucide-react';

interface CoursePageProps {
    params: {
        slug: string;
    };
}

export default function CoursePage({ params }: CoursePageProps) {
    const [activeTab, setActiveTab] = useState('overview');

    const courseData = {
        title: "React Avançado - Do Zero ao Profissional",
        description: "Domine React com hooks, context, redux e construa aplicações escaláveis.",
        instructor: {
            name: "Carlos Silva",
            avatar: "👨‍💻",
            rating: 4.9,
            students: 15420
        },
        duration: "120 horas",
        level: "Avançado",
        price: 497,
        originalPrice: 997,
        rating: 4.9,
        students: 15420,
        image: "🚀",
        tags: ["React", "JavaScript", "Hooks", "Redux"],
        features: [
            "120 horas de conteúdo",
            "Projetos práticos reais",
            "Certificado de conclusão",
            "Suporte 24/7",
            "Garantia de 6 meses"
        ],
        curriculum: [
            {
                title: "Fundamentos do React",
                duration: "15 horas",
                lessons: 8,
                topics: ["Introdução ao React", "Componentes e Props", "Estado e Ciclo de Vida"]
            },
            {
                title: "Hooks Avançados",
                duration: "20 horas",
                lessons: 12,
                topics: ["useState e useEffect", "useContext", "useReducer", "Custom Hooks"]
            }
        ],
        whatYouWillLearn: [
            "Dominar React Hooks avançados",
            "Implementar Context API eficientemente",
            "Gerenciar estado com Redux",
            "Construir aplicações escaláveis"
        ]
    };

    const tabs = [
        { id: 'overview', name: 'Visão Geral', icon: Eye },
        { id: 'curriculum', name: 'Currículo', icon: BookOpen },
        { id: 'instructor', name: 'Instrutor', icon: User }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Header */}
            <header className="relative z-10">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
                                <Rocket className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Fênix Dev Academy</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="/" className="text-white hover:text-purple-300 transition-colors">Home</a>
                            <a href="/courses" className="text-white hover:text-purple-300 transition-colors">Cursos</a>
                            <a href="/dashboard" className="text-white hover:text-purple-300 transition-colors">Dashboard</a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Course Hero Section */}
            <section className="relative z-10 pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Course Info */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                                        Frontend
                                    </span>
                                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                                        {courseData.level}
                                    </span>
                                </div>

                                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        {courseData.title}
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                    {courseData.description}
                                </p>

                                <div className="flex items-center space-x-8 mb-8">
                                    <div className="flex items-center space-x-2">
                                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                        <span className="text-white font-medium">{courseData.rating}</span>
                                        <span className="text-gray-400">({courseData.students.toLocaleString()} alunos)</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                        <span className="text-gray-300">{courseData.duration}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    {courseData.tags.map((tag, index) => (
                                        <span key={index} className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Course Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 sticky top-8">
                                <div className="text-center mb-6">
                                    <div className="text-6xl mb-4">{courseData.image}</div>
                                    <div className="flex items-center justify-center space-x-2 mb-4">
                                        <div className="text-3xl font-bold text-white">R$ {courseData.price}</div>
                                        <div className="text-xl text-gray-400 line-through">R$ {courseData.originalPrice}</div>
                                    </div>
                                    <div className="text-green-400 font-bold mb-4">
                                        {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% OFF
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {courseData.features.map((feature, index) => (
                                        <div key={index} className="flex items-center text-gray-300">
                                            <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 mb-4">
                                    <Rocket className="inline h-5 w-5 mr-2" />
                                    Começar Agora
                                    <ArrowRight className="inline h-5 w-5 ml-2" />
                                </button>

                                <div className="flex space-x-3">
                                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-white/20">
                                        <Heart className="inline h-5 w-5 mr-2" />
                                        Favoritar
                                    </button>
                                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-white/20">
                                        <Share2 className="inline h-5 w-5 mr-2" />
                                        Compartilhar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Tabs */}
            <section className="relative z-10 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">

                        {/* Tab Navigation */}
                        <div className="border-b border-white/20">
                            <nav className="flex space-x-8 px-8">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 py-6 border-b-2 transition-colors ${activeTab === tab.id
                                                ? 'border-purple-500 text-purple-300'
                                                : 'border-transparent text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <tab.icon className="h-5 w-5" />
                                        <span className="font-medium">{tab.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">O que você vai aprender</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {courseData.whatYouWillLearn.map((item, index) => (
                                                <div key={index} className="flex items-start space-x-3">
                                                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-300">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'curriculum' && (
                                <div className="space-y-6">
                                    {courseData.curriculum.map((section, index) => (
                                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{section.title}</h3>
                                                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                                                        <span>{section.duration}</span>
                                                        <span>{section.lessons} aulas</span>
                                                    </div>
                                                </div>
                                                <button className="text-purple-300 hover:text-purple-200 transition-colors">
                                                    <ChevronDown className="h-5 w-5" />
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                {section.topics.map((topic, topicIndex) => (
                                                    <div key={topicIndex} className="flex items-center space-x-3 py-2">
                                                        <Play className="h-4 w-4 text-gray-400" />
                                                        <span className="text-gray-300">{topic}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'instructor' && (
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-6">
                                        <div className="text-6xl">{courseData.instructor.avatar}</div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2">{courseData.instructor.name}</h3>
                                            <p className="text-gray-300 mb-4">Desenvolvedor Senior com 8 anos de experiência em React e Node.js</p>
                                            <div className="flex items-center space-x-6">
                                                <div className="flex items-center space-x-2">
                                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                                    <span className="text-white font-medium">{courseData.instructor.rating}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Users className="h-5 w-5 text-gray-400" />
                                                    <span className="text-gray-300">{courseData.instructor.students.toLocaleString()} alunos</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}