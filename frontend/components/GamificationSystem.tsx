'use client';

import React, { useState, useEffect } from 'react';
import {
    Trophy, Star, Target, Zap, BookOpen, Code,
    Bug, Rocket, Flame, Crown, Gift, TrendingUp,
    X, ChevronLeft, ChevronRight, Check, Lock
} from 'lucide-react';

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'coding' | 'learning' | 'productivity' | 'social' | 'special';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    points: number;
    isUnlocked: boolean;
    unlockedAt?: Date;
    progress: number;
    maxProgress: number;
    requirements: string[];
}

interface SkillTree {
    id: string;
    name: string;
    description: string;
    level: number;
    maxLevel: number;
    experience: number;
    experienceToNext: number;
    skills: Skill[];
}

interface Skill {
    id: string;
    name: string;
    description: string;
    level: number;
    maxLevel: number;
    isUnlocked: boolean;
    cost: number;
}

interface DailyChallenge {
    id: string;
    title: string;
    description: string;
    reward: number;
    isCompleted: boolean;
    deadline: Date;
    type: 'coding' | 'learning' | 'practice';
}

interface GamificationProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser?: {
        id: string;
        name: string;
        level: number;
        experience: number;
        achievements: string[];
    };
}

export default function GamificationSystem({
    isOpen,
    onClose,
    currentUser
}: GamificationProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'skills' | 'challenges' | 'leaderboard'>('overview');
    const [achievements, setAchievements] = useState<Achievement[]>([
        // Coding Achievements
        {
            id: 'first-code',
            name: 'Primeiro Código',
            description: 'Escreveu seu primeiro programa',
            icon: '🚀',
            category: 'coding',
            rarity: 'common',
            points: 10,
            isUnlocked: true,
            unlockedAt: new Date(Date.now() - 86400000), // 1 dia atrás
            progress: 1,
            maxProgress: 1,
            requirements: ['Escrever primeira linha de código']
        },
        {
            id: 'bug-hunter',
            name: 'Caçador de Bugs',
            description: 'Corrigiu 10 bugs em um dia',
            icon: '🐛',
            category: 'coding',
            rarity: 'rare',
            points: 50,
            isUnlocked: false,
            progress: 7,
            maxProgress: 10,
            requirements: ['Corrigir 10 bugs em 24h']
        },
        {
            id: 'speed-coder',
            name: 'Codificador Veloz',
            description: 'Completou 5 exercícios em 1 hora',
            icon: '⚡',
            category: 'coding',
            rarity: 'epic',
            points: 100,
            isUnlocked: false,
            progress: 3,
            maxProgress: 5,
            requirements: ['5 exercícios em 1h']
        },
        {
            id: 'master-coder',
            name: 'Mestre Codificador',
            description: 'Completou 100 exercícios',
            icon: '👑',
            category: 'coding',
            rarity: 'legendary',
            points: 500,
            isUnlocked: false,
            progress: 67,
            maxProgress: 100,
            requirements: ['100 exercícios completados']
        },

        // Learning Achievements
        {
            id: 'bookworm',
            name: 'Rato de Biblioteca',
            description: 'Leyu 10 módulos de curso',
            icon: '📚',
            category: 'learning',
            rarity: 'common',
            points: 25,
            isUnlocked: true,
            unlockedAt: new Date(Date.now() - 172800000), // 2 dias atrás
            progress: 10,
            maxProgress: 10,
            requirements: ['Ler 10 módulos']
        },
        {
            id: 'knowledge-seeker',
            name: 'Buscador de Conhecimento',
            description: 'Completou 3 cursos diferentes',
            icon: '🎯',
            category: 'learning',
            rarity: 'rare',
            points: 75,
            isUnlocked: false,
            progress: 2,
            maxProgress: 3,
            requirements: ['3 cursos diferentes']
        },

        // Productivity Achievements
        {
            id: 'streak-master',
            name: 'Mestre da Sequência',
            description: '7 dias seguidos de estudo',
            icon: '🔥',
            category: 'productivity',
            rarity: 'epic',
            points: 150,
            isUnlocked: false,
            progress: 5,
            maxProgress: 7,
            requirements: ['7 dias seguidos']
        },
        {
            id: 'early-bird',
            name: 'Madrugador',
            description: 'Estudou por 5 dias antes das 8h',
            icon: '🌅',
            category: 'productivity',
            rarity: 'rare',
            points: 60,
            isUnlocked: false,
            progress: 3,
            maxProgress: 5,
            requirements: ['5 dias antes das 8h']
        }
    ]);

    const [skillTree, setSkillTree] = useState<SkillTree>({
        id: 'main',
        name: 'Árvore de Habilidades Principal',
        description: 'Desenvolva suas habilidades de programação',
        level: 8,
        maxLevel: 50,
        experience: 1250,
        experienceToNext: 2000,
        skills: [
            {
                id: 'javascript',
                name: 'JavaScript',
                description: 'Linguagem de programação web',
                level: 5,
                maxLevel: 10,
                isUnlocked: true,
                cost: 100
            },
            {
                id: 'csharp',
                name: 'C#',
                description: 'Linguagem .NET para aplicações',
                level: 3,
                maxLevel: 10,
                isUnlocked: true,
                cost: 150
            },
            {
                id: 'python',
                name: 'Python',
                description: 'Linguagem para data science',
                level: 2,
                maxLevel: 10,
                isUnlocked: true,
                cost: 120
            },
            {
                id: 'devops',
                name: 'DevOps',
                description: 'Práticas de desenvolvimento',
                level: 1,
                maxLevel: 10,
                isUnlocked: false,
                cost: 200
            }
        ]
    });

    const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([
        {
            id: 'challenge-1',
            title: 'Debug Master',
            description: 'Corrija 5 bugs em diferentes arquivos',
            reward: 25,
            isCompleted: false,
            deadline: new Date(Date.now() + 86400000), // 24h
            type: 'coding'
        },
        {
            id: 'challenge-2',
            title: 'Learning Streak',
            description: 'Complete 3 módulos hoje',
            reward: 30,
            isCompleted: false,
            deadline: new Date(Date.now() + 86400000),
            type: 'learning'
        },
        {
            id: 'challenge-3',
            title: 'Practice Makes Perfect',
            description: 'Pratique por 2 horas seguidas',
            reward: 40,
            isCompleted: false,
            deadline: new Date(Date.now() + 86400000),
            type: 'practice'
        }
    ]);

    const [totalPoints, setTotalPoints] = useState(0);
    const [unlockedAchievements, setUnlockedAchievements] = useState(0);

    // Calcular estatísticas
    useEffect(() => {
        const points = achievements.reduce((sum, achievement) =>
            achievement.isUnlocked ? sum + achievement.points : sum, 0
        );
        const unlocked = achievements.filter(a => a.isUnlocked).length;

        setTotalPoints(points);
        setUnlockedAchievements(unlocked);
    }, [achievements]);

    const getRarityColor = (rarity: Achievement['rarity']) => {
        switch (rarity) {
            case 'common': return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
            case 'rare': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
            case 'epic': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
            case 'legendary': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
        }
    };

    const getRarityIcon = (rarity: Achievement['rarity']) => {
        switch (rarity) {
            case 'common': return '⭐';
            case 'rare': return '🌟';
            case 'epic': return '💫';
            case 'legendary': return '👑';
            default: return '⭐';
        }
    };

    const unlockAchievement = (achievementId: string) => {
        setAchievements(prev => prev.map(achievement =>
            achievement.id === achievementId
                ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
                : achievement
        ));
    };

    const completeChallenge = (challengeId: string) => {
        setDailyChallenges(prev => prev.map(challenge =>
            challenge.id === challengeId
                ? { ...challenge, isCompleted: true }
                : challenge
        ));

        // Adicionar pontos
        const challenge = dailyChallenges.find(c => c.id === challengeId);
        if (challenge) {
            setTotalPoints(prev => prev + challenge.reward);
        }
    };

    const getProgressPercentage = (current: number, max: number) => {
        return Math.min((current / max) * 100, 100);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col border border-gray-200/50 dark:border-gray-700/50">
                {/* Header - Design Premium */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800/50 dark:to-gray-700/50">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                            <Trophy className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Sistema de Gamificação
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                🏆 Conquiste, evolua e se divirta aprendendo!
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-3 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl hover:from-red-200 hover:to-red-300 dark:hover:from-red-800/30 dark:hover:to-red-700/30 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                        <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </button>
                </div>

                {/* Tabs - Design Elegante */}
                <div className="flex border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
                    {[
                        { id: 'overview', name: 'Visão Geral', icon: Target },
                        { id: 'achievements', name: 'Conquistas', icon: Trophy },
                        { id: 'skills', name: 'Habilidades', icon: Code },
                        { id: 'challenges', name: 'Desafios', icon: Zap },
                        { id: 'leaderboard', name: 'Ranking', icon: TrendingUp }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center space-x-3 px-8 py-4 border-b-2 transition-all duration-300 ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="font-medium">{tab.name}</span>
                        </button>
                    ))}
                </div>

                {/* Content - Layout Moderno */}
                <div className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Stats Cards - Design Premium */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white shadow-xl hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">🎯 Nível Atual</p>
                                            <p className="text-3xl font-bold">{skillTree.level}</p>
                                        </div>
                                        <Target className="w-10 h-10 opacity-80" />
                                    </div>
                                </div>

                                <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white shadow-xl hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">⭐ Pontos Totais</p>
                                            <p className="text-3xl font-bold">{totalPoints}</p>
                                        </div>
                                        <Star className="w-10 h-10 opacity-80" />
                                    </div>
                                </div>

                                <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl text-white shadow-xl hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">🏆 Conquistas</p>
                                            <p className="text-3xl font-bold">{unlockedAchievements}/{achievements.length}</p>
                                        </div>
                                        <Trophy className="w-10 h-10 opacity-80" />
                                    </div>
                                </div>

                                <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white shadow-xl hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">📈 Experiência</p>
                                            <p className="text-3xl font-bold">{skillTree.experience}</p>
                                        </div>
                                        <TrendingUp className="w-10 h-10 opacity-80" />
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar - Design Elegante */}
                            <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        🚀 Progresso para o próximo nível
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">
                                        {skillTree.experience} / {skillTree.experienceToNext} XP
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                                        style={{ width: `${getProgressPercentage(skillTree.experience, skillTree.experienceToNext)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Recent Achievements - Design Interativo */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    🏆 Conquistas Recentes
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {achievements
                                        .filter(a => a.isUnlocked)
                                        .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
                                        .slice(0, 6)
                                        .map((achievement) => (
                                            <div key={achievement.id} className="p-6 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl hover:border-gray-300/50 dark:hover:border-gray-500/50 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 shadow-lg">
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-3xl">{achievement.icon}</div>
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                            {achievement.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                            {achievement.description}
                                                        </p>
                                                        <div className="flex items-center space-x-3">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                                                                {getRarityIcon(achievement.rarity)} {achievement.rarity}
                                                            </span>
                                                            <span className="text-xs text-gray-500 font-medium">
                                                                +{achievement.points} pts
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div className="space-y-8">
                            {/* Filters - Design Interativo */}
                            <div className="flex flex-wrap gap-3">
                                {['all', 'coding', 'learning', 'productivity', 'social', 'special'].map((category) => (
                                    <button
                                        key={category}
                                        className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:scale-105 shadow-md font-medium"
                                    >
                                        {category === 'all' ? '🎯 Todas' :
                                            category === 'coding' ? '💻 Coding' :
                                                category === 'learning' ? '📚 Aprendizado' :
                                                    category === 'productivity' ? '⚡ Produtividade' :
                                                        category === 'social' ? '🤝 Social' : '🌟 Especiais'}
                                    </button>
                                ))}
                            </div>

                            {/* Achievements Grid - Design Premium */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className={`p-8 border rounded-2xl transition-all duration-500 hover:scale-105 shadow-xl ${achievement.isUnlocked
                                                ? 'border-green-300 dark:border-green-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                                                : 'border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300/50 dark:hover:border-gray-500/50 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-5xl mb-4">
                                                {achievement.isUnlocked ? achievement.icon : '🔒'}
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                                {achievement.name}
                                            </h3>

                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                                {achievement.description}
                                            </p>

                                            {/* Progress - Design Elegante */}
                                            <div className="mb-6">
                                                <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
                                                    <span>📊 Progresso</span>
                                                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                                                    <div
                                                        className={`h-3 rounded-full transition-all duration-500 shadow-lg ${achievement.isUnlocked
                                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                                            }`}
                                                        style={{ width: `${getProgressPercentage(achievement.progress, achievement.maxProgress)}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Requirements - Design Interativo */}
                                            <div className="mb-6">
                                                <p className="text-xs text-gray-500 mb-3 font-medium">📋 Requisitos:</p>
                                                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                                                    {achievement.requirements.map((req, index) => (
                                                        <li key={index} className="flex items-center space-x-2">
                                                            {achievement.progress >= achievement.maxProgress ? (
                                                                <Check className="w-4 h-4 text-green-500" />
                                                            ) : (
                                                                <div className="w-4 h-4 bg-gray-300 rounded-full" />
                                                            )}
                                                            <span>{req}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Rarity and Points - Design Premium */}
                                            <div className="flex items-center justify-center space-x-3 mb-4">
                                                <span className={`px-3 py-2 rounded-full text-xs font-bold ${getRarityColor(achievement.rarity)}`}>
                                                    {getRarityIcon(achievement.rarity)} {achievement.rarity.toUpperCase()}
                                                </span>
                                                <span className="text-sm text-gray-500 font-medium">
                                                    +{achievement.points} pts
                                                </span>
                                            </div>

                                            {/* Unlock Status - Design Elegante */}
                                            {achievement.isUnlocked && achievement.unlockedAt && (
                                                <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200/50 dark:border-green-700/50">
                                                    <div className="text-green-700 dark:text-green-300 text-sm font-medium text-center">
                                                        ✅ Desbloqueado em {achievement.unlockedAt.toLocaleDateString()}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="space-y-8">
                            {/* Skill Tree Overview - Design Elegante */}
                            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    🌳 Árvore de Habilidades
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            🎯 Nível: {skillTree.level}/{skillTree.maxLevel}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            📈 Experiência: {skillTree.experience}/{skillTree.experienceToNext} XP
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            🔓 Habilidades Desbloqueadas: {skillTree.skills.filter(s => s.isUnlocked).length}/{skillTree.skills.length}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            💰 Pontos Disponíveis: {totalPoints}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Grid - Design Premium */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {skillTree.skills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        className={`p-8 border rounded-2xl transition-all duration-500 hover:scale-105 shadow-xl ${skill.isUnlocked
                                                ? 'border-blue-300 dark:border-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
                                                : 'border-gray-200/50 dark:border-gray-600/50 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-5xl mb-4">
                                                {skill.isUnlocked ? '🚀' : '🔒'}
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                                {skill.name}
                                            </h3>

                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                                {skill.description}
                                            </p>

                                            {/* Level Progress - Design Elegante */}
                                            <div className="mb-6">
                                                <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
                                                    <span>📊 Nível</span>
                                                    <span>{skill.level}/{skill.maxLevel}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                                                        style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Cost - Design Premium */}
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">
                                                💰 Custo: {skill.cost} pontos
                                            </div>

                                            {/* Actions - Design Interativo */}
                                            {skill.isUnlocked ? (
                                                <button
                                                    disabled={skill.level >= skill.maxLevel || totalPoints < skill.cost}
                                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg font-medium"
                                                >
                                                    {skill.level >= skill.maxLevel ? '🏆 Nível Máximo' : '🚀 Upgrade'}
                                                </button>
                                            ) : (
                                                <button
                                                    disabled={totalPoints < skill.cost}
                                                    onClick={() => {
                                                        // Lógica para desbloquear habilidade
                                                        console.log('Desbloqueando habilidade:', skill.name);
                                                    }}
                                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg font-medium"
                                                >
                                                    🔓 Desbloquear
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'challenges' && (
                        <div className="space-y-8">
                            {/* Daily Challenges - Design Premium */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    🎯 Desafios Diários
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {dailyChallenges.map((challenge) => (
                                        <div
                                            key={challenge.id}
                                            className={`p-6 border rounded-2xl transition-all duration-500 hover:scale-105 shadow-xl ${challenge.isCompleted
                                                    ? 'border-green-300 dark:border-green-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                                                    : 'border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300/50 dark:hover:border-gray-500/50 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="text-3xl">
                                                    {challenge.type === 'coding' ? '💻' :
                                                        challenge.type === 'learning' ? '📚' : '🎯'}
                                                </div>
                                                <span className="text-sm text-gray-500 font-medium">
                                                    +{challenge.reward} pts
                                                </span>
                                            </div>

                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                                {challenge.title}
                                            </h4>

                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                                {challenge.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 font-medium">
                                                    ⏰ Expira em: {Math.ceil((challenge.deadline.getTime() - Date.now()) / (1000 * 60 * 60))}h
                                                </span>

                                                {challenge.isCompleted ? (
                                                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                                                        ✅ Completado
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => completeChallenge(challenge.id)}
                                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-300 hover:scale-105 shadow-lg font-medium text-sm"
                                                    >
                                                        🚀 Completar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'leaderboard' && (
                        <div className="space-y-8">
                            <div className="text-center text-gray-500 dark:text-gray-400 py-16">
                                <Trophy className="w-20 h-20 mx-auto mb-6 opacity-50" />
                                <h3 className="text-2xl font-bold mb-4">🏆 Ranking em Desenvolvimento</h3>
                                <p className="text-lg">Em breve você poderá competir com outros desenvolvedores!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

