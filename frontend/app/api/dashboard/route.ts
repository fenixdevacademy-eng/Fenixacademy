'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Dados básicos do dashboard (versão simplificada)
        const dashboard = {
            user: {
                id: 'current-user-id',
                name: 'Usuário Fênix',
                email: 'usuario@fenixdevacademy.com',
                level: 1,
                points: 0,
                streak: 0,
                avatar: '/images/avatars/default.jpg'
            },
            stats: {
                totalCourses: 26, // 26 cursos disponíveis
                completedCourses: 0,
                totalHours: 0,
                certificates: 0,
                achievements: 0,
                weeklyGoal: 10,
                weeklyProgress: 0,
                currentStreak: 0,
                totalPoints: 0
            },
            recentActivity: [], // Sem atividade recente inicialmente
            courses: [], // Cursos serão carregados dinamicamente
            achievements: [] // Conquistas serão desbloqueadas conforme progresso
        }

        return NextResponse.json({
            success: true,
            dashboard,
            hasAccess: true
        });

    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

