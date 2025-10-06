'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
        try {
                // Simular conquistas do usuário (em produção, buscar do banco de dados)
                const achievements = [
                        {
                                id: 'first-lesson',
                                title: 'Primeira Aula',
                                description: 'Complete sua primeira aula',
                                icon: '🎓',
                                earned: true,
                                earnedAt: '2024-01-02T00:00:00Z',
                                points: 10
                        },
                        {
                                id: 'week-streak',
                                title: 'Semana de Estudos',
                                description: 'Estude por 7 dias consecutivos',
                                icon: '🔥',
                                earned: false,
                                earnedAt: null,
                                points: 50
                        },
                        {
                                id: 'quiz-master',
                                title: 'Mestre dos Quizzes',
                                description: 'Acertou 90% em 5 quizzes',
                                icon: '🧠',
                                earned: true,
                                earnedAt: '2024-01-15T00:00:00Z',
                                points: 100
                        }
                ];

                return NextResponse.json({
                        success: true,
                        achievements: achievements,
                        total: achievements.length,
                        earned: achievements.filter(a => a.earned).length,
                        hasAccess: true
                });
        } catch (error) {
                console.error('Erro ao buscar conquistas do usuário:', error);
                return NextResponse.json({
                        success: false,
                        error: 'Erro interno do servidor'
                }, { status: 500 });
        }
}

export async function POST(request: NextRequest) {
        try {
                const body = await request.json();
                const { achievementId, earned } = body;

                // Simular desbloqueio de conquista
                console.log('Desbloqueando conquista:', { achievementId, earned });

                return NextResponse.json({
                        success: true,
                        message: 'Conquista desbloqueada com sucesso',
                        data: {
                                achievementId,
                                earned,
                                timestamp: new Date().toISOString()
                        }
                });
        } catch (error) {
                console.error('Erro ao desbloquear conquista:', error);
                return NextResponse.json({
                        success: false,
                        error: 'Erro interno do servidor'
                }, { status: 500 });
        }
}