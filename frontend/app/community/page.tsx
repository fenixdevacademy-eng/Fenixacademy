'use client';

import { useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import {
    Users,
    MessageCircle,
    Heart,
    TrendingUp,
    Award,
    Calendar,
    MapPin,
    Clock,
    User,
    Star,
    BookOpen,
    Video,
    Share2
} from 'lucide-react';
import SEOHead from '../components/SEOHeadServer';

const communityStats = [
    { label: "Membros Ativos", value: "2.847", icon: Users, color: "text-blue-600" },
    { label: "Discussões", value: "1.234", icon: MessageCircle, color: "text-green-600" },
    { label: "Projetos Compartilhados", value: "567", icon: Heart, color: "text-red-600" },
    { label: "Certificados Emitidos", value: "892", icon: Award, color: "text-yellow-600" }
];

const upcomingEvents = [
    {
        title: "Workshop: React Hooks Avançados",
        date: "15 Jan 2024",
        time: "19:00 - 21:00",
        location: "Online",
        attendees: 45,
        host: "Lucas Silva Petris",
        type: "Workshop"
    },
    {
        title: "Meetup: Carreira em Tech",
        date: "22 Jan 2024",
        time: "14:00 - 16:00",
        location: "Rio de Janeiro",
        attendees: 32,
        host: "Cezar Camara Lins",
        type: "Meetup"
    },
    {
        title: "Live: Node.js em Produção",
        date: "29 Jan 2024",
        time: "20:00 - 22:00",
        location: "Online",
        attendees: 78,
        host: "Equipe Fenix",
        type: "Live"
    }
];

const recentDiscussions = [
    {
        title: "Como implementar autenticação JWT?",
        author: "João Silva",
        replies: 12,
        views: 156,
        lastActivity: "2 horas atrás",
        tags: ["JavaScript", "Backend"]
    },
    {
        title: "Dúvida sobre Docker e containers",
        author: "Maria Santos",
        replies: 8,
        views: 89,
        lastActivity: "5 horas atrás",
        tags: ["DevOps", "Docker"]
    },
    {
        title: "Melhores práticas para React hooks",
        author: "Pedro Costa",
        replies: 15,
        views: 234,
        lastActivity: "1 dia atrás",
        tags: ["React", "Frontend"]
    }
];

const topContributors = [
    { name: "Ana Oliveira", points: 2840, level: "Expert", avatar: "AO" },
    { name: "Carlos Mendes", points: 2156, level: "Advanced", avatar: "CM" },
    { name: "Fernanda Lima", points: 1892, level: "Intermediate", avatar: "FL" },
    { name: "Roberto Silva", points: 1654, level: "Intermediate", avatar: "RS" },
    { name: "Juliana Costa", points: 1432, level: "Beginner", avatar: "JC" }
];

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <>
            <SEOHead
                title="Comunidade | Fenix Academy"
                description="Participe da comunidade Fenix Academy: eventos, discussões, networking e projetos colaborativos."
                type="website"
                url="/community"
                pathname="/community"
            />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <AnimatedComponent
                            animation="slideUp"
                            duration={0.8}
                        >
                            <div className="flex justify-center mb-6">
                                <Users className="w-16 h-16" />
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                                Comunidade Fenix
                            </h1>
                            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                                Conecte-se com outros desenvolvedores, compartilhe conhecimento e cresça junto
                            </p>
                        </AnimatedComponent>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-16">
                    {/* Stats Section */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        delay={0.2}
                        className="mb-16"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {communityStats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </AnimatedComponent>

                    {/* Navigation Tabs */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        delay={0.4}
                        className="mb-8"
                    >
                        <div className="flex flex-wrap justify-center space-x-2">
                            {[
                                { id: 'overview', label: 'Visão Geral', icon: TrendingUp },
                                { id: 'events', label: 'Eventos', icon: Calendar },
                                { id: 'discussions', label: 'Discussões', icon: MessageCircle },
                                { id: 'contributors', label: 'Contribuidores', icon: Award }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-6 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5 mr-2" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </AnimatedComponent>

                    {/* Content Sections */}
                    {activeTab === 'overview' && (
                        <AnimatedComponent
                            animation="slideUp"
                            duration={0.8}
                            delay={0.6}
                            className="space-y-8"
                        >
                            {/* Welcome Message */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                                <h2 className="text-2xl font-bold mb-4">Bem-vindo à Comunidade!</h2>
                                <p className="text-blue-100 mb-6">
                                    Esta é sua casa para aprender, compartilhar e crescer junto com outros desenvolvedores.
                                    Participe de discussões, eventos e projetos colaborativos.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                        Criar Discussão
                                    </button>
                                    <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                        Ver Eventos
                                    </button>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Recursos Compartilhados</h3>
                                    <p className="text-gray-600 mb-4">Acesse materiais, códigos e projetos da comunidade</p>
                                    <button className="text-blue-600 font-semibold hover:text-blue-700">
                                        Explorar →
                                    </button>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <Video className="w-12 h-12 text-purple-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Lives e Workshops</h3>
                                    <p className="text-gray-600 mb-4">Participe de eventos ao vivo e workshops</p>
                                    <button className="text-purple-600 font-semibold hover:text-purple-700">
                                        Ver Agenda →
                                    </button>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <Share2 className="w-12 h-12 text-green-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Projetos Colaborativos</h3>
                                    <p className="text-gray-600 mb-4">Junte-se a projetos open source da comunidade</p>
                                    <button className="text-green-600 font-semibold hover:text-green-700">
                                        Participar →
                                    </button>
                                </div>
                            </div>
                        </AnimatedComponent>
                    )}

                    {activeTab === 'events' && (
                        <AnimatedComponent
                            animation="slideUp"
                            duration={0.8}
                            delay={0.6}
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
                                <p className="text-gray-600">Participe de workshops, meetups e lives exclusivos</p>
                            </div>
                            <div className="space-y-6">
                                {upcomingEvents.map((event, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.type === 'Workshop' ? 'bg-blue-100 text-blue-800' :
                                                        event.type === 'Meetup' ? 'bg-green-100 text-green-800' :
                                                            'bg-purple-100 text-purple-800'
                                                        }`}>
                                                        {event.type}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                                                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        {event.date}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {event.time}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-1" />
                                                        {event.location}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <User className="w-4 h-4 mr-1 text-gray-500" />
                                                        <span className="text-sm text-gray-600">Host: {event.host}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Users className="w-4 h-4 mr-1 text-gray-500" />
                                                        <span className="text-sm text-gray-600">{event.attendees} participantes</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="ml-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                Participar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedComponent>
                    )}

                    {activeTab === 'discussions' && (
                        <AnimatedComponent
                            animation="slideUp"
                            duration={0.8}
                            delay={0.6}
                        >
                            <div className="mb-8 flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Discussões Recentes</h2>
                                    <p className="text-gray-600">Participe das conversas da comunidade</p>
                                </div>
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Nova Discussão
                                </button>
                            </div>
                            <div className="space-y-4">
                                {recentDiscussions.map((discussion, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                                    <span>Por {discussion.author}</span>
                                                    <span>{discussion.replies} respostas</span>
                                                    <span>{discussion.views} visualizações</span>
                                                    <span>{discussion.lastActivity}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {discussion.tags.map((tag, tagIndex) => (
                                                        <span
                                                            key={tagIndex}
                                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <button className="ml-4 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                Responder
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedComponent>
                    )}

                    {activeTab === 'contributors' && (
                        <AnimatedComponent
                            animation="slideUp"
                            duration={0.8}
                            delay={0.6}
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Contribuidores</h2>
                                <p className="text-gray-600">Reconhecemos os membros mais ativos da comunidade</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {topContributors.map((contributor, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                                            {contributor.avatar}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{contributor.name}</h3>
                                        <div className="flex items-center justify-center mb-2">
                                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-600">{contributor.level}</span>
                                        </div>
                                        <div className="text-2xl font-bold text-blue-600 mb-2">{contributor.points}</div>
                                        <div className="text-sm text-gray-500">pontos</div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedComponent>
                    )}
                </div>
            </div>
        </>
    );
} 