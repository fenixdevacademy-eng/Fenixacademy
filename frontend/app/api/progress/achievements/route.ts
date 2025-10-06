'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Dados mock de conquistas
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
                earned: true,
                earnedAt: '2024-01-15T00:00:00Z',
                points: 50
            },
            {
                id: 'quiz-master',
                title: 'Mestre dos Quizzes',
                description: 'Acertou 90% em 5 quizzes',
                icon: '🧠',
                earned: false,
                earnedAt: null,
                points: 100
            },
            {
                id: 'code-warrior',
                title: 'Guerreiro do Código',
                description: 'Complete 100 exercícios de programação',
                icon: '⚔️',
                earned: true,
                earnedAt: '2024-01-08T00:00:00Z',
                points: 200
            }
        ];

        return NextResponse.json({
            success: true,
            achievements
        });

    } catch (error) {
        console.error('Erro ao buscar conquistas:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





