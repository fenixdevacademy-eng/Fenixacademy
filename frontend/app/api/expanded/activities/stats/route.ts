'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Dados mock para estatísticas de atividades
        const activityStats = {
            totalActivities: 1250,
            completedActivities: 1080,
            completionRate: 86.4,
            averageTimePerActivity: 25, // minutos
            totalTimeSpent: 450, // horas
            activitiesByType: [
                { type: 'lesson', count: 450, percentage: 36 },
                { type: 'exercise', count: 380, percentage: 30.4 },
                { type: 'quiz', count: 200, percentage: 16 },
                { type: 'project', count: 120, percentage: 9.6 },
                { type: 'certificate', count: 100, percentage: 8 }
            ],
            activitiesByLevel: [
                { level: 'Iniciante', count: 500, percentage: 40 },
                { level: 'Intermediário', count: 450, percentage: 36 },
                { level: 'Avançado', count: 300, percentage: 24 }
            ],
            weeklyActivity: [
                { week: '2025-01-01', activities: 45, time: 18 },
                { week: '2025-01-08', activities: 52, time: 21 },
                { week: '2025-01-15', activities: 48, time: 19 },
                { week: '2025-01-22', activities: 55, time: 22 },
                { week: '2025-01-29', activities: 60, time: 24 }
            ],
            topCourses: [
                { course: 'Python para Data Science', activities: 120, completion: 95 },
                { course: 'Desenvolvimento Web Completo', activities: 98, completion: 87 },
                { course: 'React.js Avançado', activities: 85, completion: 92 },
                { course: 'Node.js e APIs RESTful', activities: 78, completion: 89 },
                { course: 'Desenvolvimento Mobile', activities: 65, completion: 85 }
            ],
            lastUpdated: new Date().toISOString()
        }

        return NextResponse.json({
            success: true,
            activityStats: activityStats
        });

    } catch (error) {
        console.error('Erro na API de estatísticas de atividades:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}