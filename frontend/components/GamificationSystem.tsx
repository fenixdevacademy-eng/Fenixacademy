"use client";

import React, { useState, useEffect } from 'react';
import { Trophy, Star, Flame, Target, Award, Zap, Crown, Medal, TrendingUp, Users } from 'lucide-react';

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    points: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlocked: boolean;
    unlockedAt?: Date;
    progress?: number;
    maxProgress?: number;
}

interface UserStats {
    level: number;
    xp: number;
    xpToNext: number;
    totalPoints: number;
    streak: number;
    achievements: Achievement[];
    rank: string;
    weeklyRank: number;
    monthlyRank: number;
}

export default function GamificationSystem() {
    const [stats, setStats] = useState<UserStats>({
        level: 1,
        xp: 0,
        xpToNext: 100,
        totalPoints: 0,
        streak: 0,
        achievements: [],
        rank: 'Iniciante',
        weeklyRank: 0,
        monthlyRank: 0
    });

    const [showAchievements, setShowAchievements] = useState(false);
    const [recentUnlock, setRecentUnlock] = useState<Achievement | null>(null);

    // Sistema de conquistas
    const achievements: Achievement[] = [
        {
            id: 'first_lesson',
            title: 'Primeiro Passo',
            description: 'Complete sua primeira aula',
            icon: <Star className="w-6 h-6" />,
            points: 50,
            rarity: 'common',
            unlocked: false
        },
        {
            id: 'week_streak',
            title: 'Dedicação Semanal',
            description: 'Estude por 7 dias consecutivos',
            icon: <Flame className="w-6 h-6" />,
            points: 200,
            rarity: 'rare',
            unlocked: false,
            progress: 3,
            maxProgress: 7
        },
        {
            id: 'code_master',
            title: 'Mestre do Código',
            description: 'Complete 100 exercícios de programação',
            icon: <Trophy className="w-6 h-6" />,
            points: 500,
            rarity: 'epic',
            unlocked: false,
            progress: 23,
            maxProgress: 100
        },
        {
            id: 'perfect_score',
            title: 'Perfeição Absoluta',
            description: 'Acertou 100% em 10 quizzes consecutivos',
            icon: <Crown className="w-6 h-6" />,
            points: 1000,
            rarity: 'legendary',
            unlocked: false
        },
        {
            id: 'mentor',
            title: 'Mentor da Comunidade',
            description: 'Ajude 50 colegas na comunidade',
            icon: <Users className="w-6 h-6" />,
            points: 750,
            rarity: 'epic',
            unlocked: false,
            progress: 12,
            maxProgress: 50
        },
        {
            id: 'speed_demon',
            title: 'Velocidade da Luz',
            description: 'Complete uma aula em menos de 10 minutos',
            icon: <Zap className="w-6 h-6" />,
            points: 150,
            rarity: 'rare',
            unlocked: false
        }
    ];

    // Sistema de níveis
    const getLevelInfo = (level: number) => {
        const xpRequired = level * 100 + (level - 1) * 50;
        return {
            xpRequired,
            title: level < 5 ? 'Iniciante' :
                level < 10 ? 'Desenvolvedor' :
                    level < 20 ? 'Programador' :
                        level < 30 ? 'Especialista' :
                            level < 50 ? 'Mestre' : 'Lenda'
        }
    }

    // Sistema de ranking
    const getRankInfo = (rank: number) => {
        if (rank === 1) return { title: '🥇 Líder', color: 'text-yellow-500' }
        if (rank <= 3) return { title: '🥈 Top 3', color: 'text-gray-400' }
        if (rank <= 10) return { title: '🥉 Top 10', color: 'text-orange-500' }
        if (rank <= 50) return { title: '⭐ Elite', color: 'text-blue-500' }
        return { title: '📈 Crescendo', color: 'text-green-500' }
    }

    // Raridade das conquistas
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-gray-500 bg-gray-100';
            case 'rare': return 'text-blue-500 bg-blue-100';
            case 'epic': return 'text-purple-500 bg-purple-100';
            case 'legendary': return 'text-yellow-500 bg-yellow-100';
            default: return 'text-gray-500 bg-gray-100';
        }
    }

    // Simular desbloqueio de conquista
    const unlockAchievement = (achievementId: string) => {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
            setRecentUnlock(achievement);
            setTimeout(() => setRecentUnlock(null), 5000);
        }
    }

    return (
        <div className="space-y-6">
            {/* Header com estatísticas principais */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Sistema de Gamificação</h2>
                    <button
                        onClick={() => setShowAchievements(!showAchievements)}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Award className="w-5 h-5 mr-2 inline" />
                        Conquistas
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Nível */}
                    <div className="bg-white/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5" />
                            <span className="font-semibold">Nível {stats.level}</span>
                        </div>
                        <div className="text-sm opacity-90">{getLevelInfo(stats.level).title}</div>
                        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                            <div
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(stats.xp / stats.xpToNext) * 100}%` }}
                            ></div>
                        </div>
                        <div className="text-xs mt-1">{stats.xp}/{stats.xpToNext} XP</div>
                    </div>

                    {/* Pontos */}
                    <div className="bg-white/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5" />
                            <span className="font-semibold">{stats.totalPoints}</span>
                        </div>
                        <div className="text-sm opacity-90">Pontos Totais</div>
                    </div>

                    {/* Sequência */}
                    <div className="bg-white/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Flame className="w-5 h-5" />
                            <span className="font-semibold">{stats.streak}</span>
                        </div>
                        <div className="text-sm opacity-90">Dias Consecutivos</div>
                    </div>

                    {/* Ranking */}
                    <div className="bg-white/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-semibold">#{stats.weeklyRank}</span>
                        </div>
                        <div className="text-sm opacity-90">Ranking Semanal</div>
                    </div>
                </div>
            </div>

            {/* Conquistas */}
            {showAchievements && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="w-6 h-6" />
                        Conquistas
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 ${achievement.unlocked
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-200 bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${getRarityColor(achievement.rarity)}`}>
                                        {achievement.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                                        <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>

                                        {achievement.progress !== undefined && (
                                            <div className="mb-2">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>Progresso</span>
                                                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-1">
                                                    <div
                                                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                                                        style={{ width: `${(achievement.progress / achievement.maxProgress!) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-blue-600">
                                                +{achievement.points} pts
                                            </span>
                                            {achievement.unlocked && (
                                                <span className="text-xs text-green-600 font-medium">✓ Desbloqueada</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Notificação de conquista desbloqueada */}
            {recentUnlock && (
                <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-2xl z-50 animate-bounce">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">🎉</div>
                        <div>
                            <div className="font-bold">Conquista Desbloqueada!</div>
                            <div className="text-sm">{recentUnlock.title}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}