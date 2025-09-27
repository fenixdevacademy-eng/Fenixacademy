"use client";

import React, { useState, useEffect } from 'react';
import {
    Users,
    MessageCircle,
    Video,
    Calendar,
    Star,
    Clock,
    MapPin,
    Award,
    BookOpen,
    Target,
    TrendingUp,
    CheckCircle,
    AlertCircle,
    Play,
    Pause,
    Mic,
    MicOff,
    Camera,
    CameraOff
} from 'lucide-react';

interface Mentor {
    id: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
    rating: number;
    reviews: number;
    hourlyRate: number;
    currency: string;
    specialties: string[];
    experience: number;
    languages: string[];
    availability: string[];
    isOnline: boolean;
    nextAvailable: Date;
    bio: string;
    achievements: string[];
    studentsHelped: number;
}

interface Session {
    id: string;
    mentorId: string;
    mentorName: string;
    title: string;
    description: string;
    scheduledAt: Date;
    duration: number;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    type: 'video_call' | 'chat' | 'code_review';
    meetingUrl?: string;
    notes?: string;
    rating?: number;
    feedback?: string;
}

interface Goal {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    progress: number;
    status: 'not_started' | 'in_progress' | 'completed';
    mentorId: string;
    createdAt: Date;
}

export default function MentorshipSystem() {
    const [activeTab, setActiveTab] = useState<'mentors' | 'sessions' | 'goals'>('mentors');
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
    const [isInSession, setIsInSession] = useState(false);
    const [sessionControls, setSessionControls] = useState({
        mic: true,
        camera: true,
        screen: false
    });

    // Dados mockados
    useEffect(() => {
        setMentors([
            {
                id: '1',
                name: 'Dr. Ana Costa',
                title: 'Senior Software Engineer',
                company: 'Google',
                avatar: 'AC',
                rating: 4.9,
                reviews: 127,
                hourlyRate: 80,
                currency: 'USD',
                specialties: ['React', 'Node.js', 'System Design', 'Leadership'],
                experience: 8,
                languages: ['Português', 'English'],
                availability: ['Monday', 'Wednesday', 'Friday'],
                isOnline: true,
                nextAvailable: new Date(Date.now() + 2 * 60 * 60 * 1000),
                bio: 'Especialista em desenvolvimento full-stack com foco em escalabilidade e performance. Já trabalhei em startups e big techs.',
                achievements: ['Ex-Google', '10+ anos experiência', 'Mentora 200+ devs'],
                studentsHelped: 200
            },
            {
                id: '2',
                name: 'Carlos Silva',
                title: 'Tech Lead',
                company: 'Microsoft',
                avatar: 'CS',
                rating: 4.8,
                reviews: 89,
                hourlyRate: 70,
                currency: 'USD',
                specialties: ['Python', 'Machine Learning', 'Data Science', 'AI'],
                experience: 6,
                languages: ['Português', 'English', 'Spanish'],
                availability: ['Tuesday', 'Thursday', 'Saturday'],
                isOnline: false,
                nextAvailable: new Date(Date.now() + 24 * 60 * 60 * 1000),
                bio: 'Especialista em IA e Machine Learning. Ajudo desenvolvedores a entrar no mundo da ciência de dados.',
                achievements: ['PhD em Computer Science', '5+ papers publicados', 'Kaggle Expert'],
                studentsHelped: 150
            },
            {
                id: '3',
                name: 'Maria Santos',
                title: 'Frontend Architect',
                company: 'Netflix',
                avatar: 'MS',
                rating: 4.9,
                reviews: 156,
                hourlyRate: 90,
                currency: 'USD',
                specialties: ['React', 'TypeScript', 'Performance', 'Accessibility'],
                experience: 7,
                languages: ['Português', 'English'],
                availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
                isOnline: true,
                nextAvailable: new Date(Date.now() + 1 * 60 * 60 * 1000),
                bio: 'Arquiteta frontend com foco em performance e acessibilidade. Especialista em React e TypeScript.',
                achievements: ['Ex-Netflix', 'Open Source Contributor', 'Conference Speaker'],
                studentsHelped: 180
            }
        ]);

        setSessions([
            {
                id: '1',
                mentorId: '1',
                mentorName: 'Dr. Ana Costa',
                title: 'Code Review - Projeto React',
                description: 'Revisão do código do meu projeto de e-commerce',
                scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
                duration: 60,
                status: 'scheduled',
                type: 'video_call',
                meetingUrl: 'https://meet.fenixdevacademy.com/session-1'
            },
            {
                id: '2',
                mentorId: '2',
                mentorName: 'Carlos Silva',
                title: 'Dúvidas sobre Machine Learning',
                description: 'Discussão sobre algoritmos de classificação',
                scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                duration: 45,
                status: 'completed',
                type: 'chat',
                rating: 5,
                feedback: 'Excelente sessão! Carlos me ajudou muito com os conceitos de ML.'
            }
        ]);

        setGoals([
            {
                id: '1',
                title: 'Dominar React Hooks',
                description: 'Aprender todos os hooks do React e suas aplicações práticas',
                deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                progress: 60,
                status: 'in_progress',
                mentorId: '1',
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
            },
            {
                id: '2',
                title: 'Criar Portfolio Profissional',
                description: 'Desenvolver um portfolio completo com 3 projetos',
                deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
                progress: 30,
                status: 'in_progress',
                mentorId: '3',
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
            }
        ]);
    }, []);

    const bookSession = (mentorId: string) => {
        // Simular agendamento
        const mentor = mentors.find(m => m.id === mentorId);
        if (mentor) {
            const newSession: Session = {
                id: Date.now().toString(),
                mentorId,
                mentorName: mentor.name,
                title: 'Sessão de Mentoria',
                description: 'Sessão personalizada de mentoria',
                scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                duration: 60,
                status: 'scheduled',
                type: 'video_call'
            }
            setSessions(prev => [...prev, newSession]);
        }
    }

    const startSession = (sessionId: string) => {
        setIsInSession(true);
        // Simular início da sessão
    }

    const endSession = () => {
        setIsInSession(false);
    }

    const toggleControl = (control: 'mic' | 'camera' | 'screen') => {
        setSessionControls(prev => ({
            ...prev,
            [control]: !prev[control]
        }));
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Sistema de Mentoria 1:1</h2>
                        <p className="opacity-90">Conecte-se com mentores especialistas e acelere seu aprendizado</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                            {sessions.filter(s => s.status === 'scheduled').length} Sessões Agendadas
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-white/20 rounded-lg p-1 mt-4">
                    <button
                        onClick={() => setActiveTab('mentors')}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'mentors' ? 'bg-white text-violet-600' : 'text-white'
                            }`}
                    >
                        <Users className="w-4 h-4 inline mr-2" />
                        Mentores
                    </button>
                    <button
                        onClick={() => setActiveTab('sessions')}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'sessions' ? 'bg-white text-violet-600' : 'text-white'
                            }`}
                    >
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Sessões
                    </button>
                    <button
                        onClick={() => setActiveTab('goals')}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'goals' ? 'bg-white text-violet-600' : 'text-white'
                            }`}
                    >
                        <Target className="w-4 h-4 inline mr-2" />
                        Metas
                    </button>
                </div>
            </div>

            {/* Sessão em Andamento */}
            {isInSession && (
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <h3 className="text-lg font-bold">Sessão em Andamento</h3>
                        </div>
                        <button
                            onClick={endSession}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Encerrar Sessão
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-4">
                        <button
                            onClick={() => toggleControl('mic')}
                            className={`p-3 rounded-full transition-colors ${sessionControls.mic ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                        >
                            {sessionControls.mic ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => toggleControl('camera')}
                            className={`p-3 rounded-full transition-colors ${sessionControls.camera ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                        >
                            {sessionControls.camera ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => toggleControl('screen')}
                            className={`p-3 rounded-full transition-colors ${sessionControls.screen ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                        >
                            <Play className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            {/* Conteúdo das Tabs */}
            {activeTab === 'mentors' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${mentor.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                    }`}>
                                    {mentor.avatar}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                                    <p className="text-sm text-gray-600">{mentor.title}</p>
                                    <p className="text-sm text-gray-500">{mentor.company}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm font-medium">{mentor.rating}</span>
                                        <span className="text-sm text-gray-500">({mentor.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">{mentor.bio}</p>

                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Especialidades:</h4>
                                <div className="flex flex-wrap gap-1">
                                    {mentor.specialties.map((specialty, index) => (
                                        <span key={index} className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs">
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Disponibilidade:</h4>
                                <div className="flex flex-wrap gap-1">
                                    {mentor.availability.map((day, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                            {day}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="text-2xl font-bold text-gray-900">
                                    ${mentor.hourlyRate}
                                    <span className="text-sm text-gray-500">/{mentor.currency}/h</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    {mentor.studentsHelped} alunos ajudados
                                </div>
                            </div>

                            <button
                                onClick={() => bookSession(mentor.id)}
                                className="w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors"
                            >
                                Agendar Sessão
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'sessions' && (
                <div className="space-y-4">
                    {sessions.map((session) => (
                        <div key={session.id} className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                                    <p className="text-sm text-gray-600">com {session.mentorName}</p>
                                    <p className="text-sm text-gray-500 mt-1">{session.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                            session.status === 'in_progress' ? 'bg-green-100 text-green-800' :
                                                session.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-red-100 text-red-800'
                                        }`}>
                                        {session.status === 'scheduled' ? 'Agendada' :
                                            session.status === 'in_progress' ? 'Em Andamento' :
                                                session.status === 'completed' ? 'Concluída' : 'Cancelada'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {session.scheduledAt.toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {session.duration} min
                                </div>
                                <div className="flex items-center gap-1">
                                    {session.type === 'video_call' ? <Video className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                                    {session.type === 'video_call' ? 'Videochamada' : 'Chat'}
                                </div>
                            </div>

                            {session.status === 'scheduled' && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => startSession(session.id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Play className="w-4 h-4 inline mr-2" />
                                        Iniciar Sessão
                                    </button>
                                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                                        Reagendar
                                    </button>
                                </div>
                            )}

                            {session.status === 'completed' && session.rating && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="font-medium">Avaliação: {session.rating}/5</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{session.feedback}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'goals' && (
                <div className="space-y-4">
                    {goals.map((goal) => (
                        <div key={goal.id} className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{goal.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${goal.status === 'not_started' ? 'bg-gray-100 text-gray-800' :
                                        goal.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                    }`}>
                                    {goal.status === 'not_started' ? 'Não Iniciada' :
                                        goal.status === 'in_progress' ? 'Em Progresso' : 'Concluída'}
                                </span>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Progresso</span>
                                    <span>{goal.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-violet-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${goal.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Prazo: {goal.deadline.toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    Criada em: {goal.createdAt.toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}




