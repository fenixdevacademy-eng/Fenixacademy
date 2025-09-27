"use client";

import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, ThumbsUp, Share2, BookOpen, Clock, Star, Award, TrendingUp } from 'lucide-react';

interface StudyGroup {
    id: string;
    name: string;
    description: string;
    members: number;
    maxMembers: number;
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    language: string;
    nextMeeting: Date;
    isJoined: boolean;
    tags: string[];
}

interface StudyPartner {
    id: string;
    name: string;
    avatar: string;
    level: number;
    skills: string[];
    availability: string;
    rating: number;
    mutualInterests: string[];
    isOnline: boolean;
}

interface Discussion {
    id: string;
    title: string;
    author: string;
    content: string;
    likes: number;
    comments: number;
    tags: string[];
    createdAt: Date;
    isLiked: boolean;
    isBookmarked: boolean;
}

export default function SocialLearning() {
    const [activeTab, setActiveTab] = useState<'groups' | 'partners' | 'discussions'>('groups');
    const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
    const [studyPartners, setStudyPartners] = useState<StudyPartner[]>([]);
    const [discussions, setDiscussions] = useState<Discussion[]>([]);

    // Dados mockados
    useEffect(() => {
        setStudyGroups([
            {
                id: '1',
                name: 'React Masters',
                description: 'Grupo focado em React avançado e Next.js',
                members: 24,
                maxMembers: 30,
                level: 'Avançado',
                language: 'JavaScript',
                nextMeeting: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                isJoined: false,
                tags: ['React', 'Next.js', 'TypeScript']
            },
            {
                id: '2',
                name: 'Python Beginners',
                description: 'Aprendendo Python do zero juntos',
                members: 18,
                maxMembers: 25,
                level: 'Iniciante',
                language: 'Python',
                nextMeeting: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                isJoined: true,
                tags: ['Python', 'Data Science', 'Machine Learning']
            },
            {
                id: '3',
                name: 'Full Stack Developers',
                description: 'Desenvolvimento full stack com projetos reais',
                members: 15,
                maxMembers: 20,
                level: 'Intermediário',
                language: 'JavaScript',
                nextMeeting: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                isJoined: false,
                tags: ['Full Stack', 'Node.js', 'React', 'MongoDB']
            }
        ]);

        setStudyPartners([
            {
                id: '1',
                name: 'Maria Silva',
                avatar: 'MS',
                level: 15,
                skills: ['React', 'TypeScript', 'Node.js'],
                availability: 'Tarde',
                rating: 4.8,
                mutualInterests: ['React', 'TypeScript'],
                isOnline: true
            },
            {
                id: '2',
                name: 'João Santos',
                avatar: 'JS',
                level: 22,
                skills: ['Python', 'Django', 'PostgreSQL'],
                availability: 'Manhã',
                rating: 4.9,
                mutualInterests: ['Python', 'Backend'],
                isOnline: false
            },
            {
                id: '3',
                name: 'Ana Costa',
                avatar: 'AC',
                level: 8,
                skills: ['JavaScript', 'CSS', 'HTML'],
                availability: 'Noite',
                rating: 4.6,
                mutualInterests: ['Frontend', 'CSS'],
                isOnline: true
            }
        ]);

        setDiscussions([
            {
                id: '1',
                title: 'Melhor forma de aprender React Hooks?',
                author: 'Carlos Dev',
                content: 'Estou começando com React e gostaria de dicas sobre como dominar os hooks de forma eficiente...',
                likes: 24,
                comments: 8,
                tags: ['React', 'Hooks', 'JavaScript'],
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                isLiked: false,
                isBookmarked: true
            },
            {
                id: '2',
                title: 'Projeto: Criando um clone do Netflix',
                author: 'TechGirl',
                content: 'Compartilhando meu projeto de clone do Netflix usando React e Firebase. Código disponível no GitHub!',
                likes: 45,
                comments: 12,
                tags: ['React', 'Firebase', 'Projeto'],
                createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
                isLiked: true,
                isBookmarked: false
            }
        ]);
    }, []);

    const joinGroup = (groupId: string) => {
        setStudyGroups(groups =>
            groups.map(group =>
                group.id === groupId
                    ? { ...group, isJoined: !group.isJoined, members: group.isJoined ? group.members - 1 : group.members + 1 }
                    : group
            )
        );
    }

    const likeDiscussion = (discussionId: string) => {
        setDiscussions(discussions =>
            discussions.map(discussion =>
                discussion.id === discussionId
                    ? {
                        ...discussion,
                        isLiked: !discussion.isLiked,
                        likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1
                    }
                    : discussion
            )
        );
    }

    const bookmarkDiscussion = (discussionId: string) => {
        setDiscussions(discussions =>
            discussions.map(discussion =>
                discussion.id === discussionId
                    ? { ...discussion, isBookmarked: !discussion.isBookmarked }
                    : discussion
            )
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Aprendizado Social</h2>
                <p className="opacity-90">Conecte-se com outros desenvolvedores e aprenda juntos</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                <button
                    onClick={() => setActiveTab('groups')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${activeTab === 'groups' ? 'bg-white shadow-sm' : 'text-gray-600'
                        }`}
                >
                    <Users className="w-5 h-5 inline mr-2" />
                    Grupos de Estudo
                </button>
                <button
                    onClick={() => setActiveTab('partners')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${activeTab === 'partners' ? 'bg-white shadow-sm' : 'text-gray-600'
                        }`}
                >
                    <MessageCircle className="w-5 h-5 inline mr-2" />
                    Parceiros de Estudo
                </button>
                <button
                    onClick={() => setActiveTab('discussions')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${activeTab === 'discussions' ? 'bg-white shadow-sm' : 'text-gray-600'
                        }`}
                >
                    <BookOpen className="w-5 h-5 inline mr-2" />
                    Discussões
                </button>
            </div>

            {/* Conteúdo das Tabs */}
            {activeTab === 'groups' && (
                <div className="space-y-4">
                    {studyGroups.map((group) => (
                        <div key={group.id} className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                                    <p className="text-gray-600 mt-1">{group.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${group.level === 'Iniciante' ? 'bg-green-100 text-green-800' :
                                            group.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {group.level}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {group.language}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {group.members}/{group.maxMembers} membros
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Próxima reunião: {group.nextMeeting.toLocaleDateString()}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {group.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={() => joinGroup(group.id)}
                                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${group.isJoined
                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {group.isJoined ? 'Sair do Grupo' : 'Entrar no Grupo'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'partners' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {studyPartners.map((partner) => (
                        <div key={partner.id} className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${partner.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                    }`}>
                                    {partner.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{partner.name}</h3>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm text-gray-600">{partner.rating}</span>
                                        <span className="text-sm text-gray-500">• Nível {partner.level}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Habilidades:</h4>
                                <div className="flex flex-wrap gap-1">
                                    {partner.skills.map((skill, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Interesses em comum:</h4>
                                <div className="flex flex-wrap gap-1">
                                    {partner.mutualInterests.map((interest, index) => (
                                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 mb-4">
                                <Clock className="w-4 h-4 inline mr-1" />
                                Disponível: {partner.availability}
                            </div>

                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Conectar
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'discussions' && (
                <div className="space-y-4">
                    {discussions.map((discussion) => (
                        <div key={discussion.id} className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{discussion.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">por {discussion.author}</p>
                                    <p className="text-gray-700">{discussion.content}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => bookmarkDiscussion(discussion.id)}
                                        className={`p-2 rounded-lg transition-colors ${discussion.isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        <BookOpen className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {discussion.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => likeDiscussion(discussion.id)}
                                        className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${discussion.isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                        {discussion.likes}
                                    </button>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <MessageCircle className="w-4 h-4" />
                                        {discussion.comments}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {discussion.createdAt.toLocaleDateString()}
                                    </div>
                                </div>
                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                                    <Share2 className="w-4 h-4" />
                                    Compartilhar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}




