'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Users,
    Award,
    Target,
    Heart,
    Globe,
    BookOpen,
    Code,
    Brain,
    Zap,
    Star,
    CheckCircle,
    ArrowRight,
    Play,
    Trophy,
    GraduationCap,
    Lightbulb,
    Shield,
    Clock,
    ChevronRight,
    MessageCircle,
    Calendar,
    TrendingUp,
    Crown,
    Sparkles,
    Bookmark,
    Share2,
    Eye,
    ThumbsUp,
    RefreshCw,
    Filter as FilterIcon,
    SortAsc,
    SortDesc,
    ChevronDown,
    ChevronUp,
    Tag,
    Filter,
    RefreshCw as RefreshIcon
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import AdvancedParticles from '@/components/AdvancedParticles';
import VisualEffects from '@/components/VisualEffects';

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        students: 0,
        courses: 0,
        countries: 0,
        successRate: 0
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStats({
                    students: 50000,
                    courses: 25,
                    countries: 15,
                    successRate: 95
                });
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <AdvancedParticles />
                <VisualEffects />

                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Carregando Informações</h2>
                        <p className="text-gray-300">Preparando nossa história para você...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-16">
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <div className="mb-12">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group animate-glow">
                                <Sparkles className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                            Sobre a <span className="gradient-text-neon animate-neon">Fênix</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed">
                            Transformando vidas através da educação em tecnologia desde 2020
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            <div className="card group hover:scale-105 transition-all duration-500">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">{stats.students.toLocaleString()}+</div>
                                <div className="text-sm text-gray-300 font-medium">Alunos</div>
                            </div>
                            <div className="card group hover:scale-105 transition-all duration-500">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <BookOpen className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">{stats.courses}+</div>
                                <div className="text-sm text-gray-300 font-medium">Cursos</div>
                            </div>
                            <div className="card group hover:scale-105 transition-all duration-500">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">{stats.countries}+</div>
                                <div className="text-sm text-gray-300 font-medium">Países</div>
                            </div>
                            <div className="card group hover:scale-105 transition-all duration-500">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Trophy className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">{stats.successRate}%</div>
                                <div className="text-sm text-gray-300 font-medium">Taxa de Sucesso</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium mb-6 animate-glow">
                            <Target className="w-5 h-5 mr-2 text-yellow-400" />
                            <span className="gradient-text-neon">Nossa Missão</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                            Nossa <span className="gradient-text-neon animate-neon">Missão</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Democratizar o acesso à educação de qualidade em tecnologia, formando desenvolvedores
                            preparados para os desafios do mercado e capazes de transformar o mundo através da programação.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card group hover:scale-105 transition-all duration-500 text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Target className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6 group-hover:gradient-text transition-colors duration-300">Missão</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Democratizar o acesso à educação de qualidade em tecnologia para todos
                            </p>
                        </div>

                        <div className="card group hover:scale-105 transition-all duration-500 text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Lightbulb className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6 group-hover:gradient-text transition-colors duration-300">Visão</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Ser a principal plataforma de educação em tecnologia da América Latina
                            </p>
                        </div>

                        <div className="card group hover:scale-105 transition-all duration-500 text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Heart className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6 group-hover:gradient-text transition-colors duration-300">Valores</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Excelência, inovação, comunidade e transformação social
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 animate-glow">
                        Faça parte da nossa <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-neon">história</span>
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Junte-se aos milhares de alunos que já transformaram suas vidas conosco
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href={ROUTES.ASSINATURAS}
                            className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-xl group"
                        >
                            <Crown className="w-6 h-6 group-hover:animate-bounce" />
                            Ser Fundador
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href={ROUTES.COURSES}
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 group"
                        >
                            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            Ver Cursos
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}