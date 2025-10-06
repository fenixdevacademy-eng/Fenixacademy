'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Dados mock para estatísticas expandidas
        const stats = {
            totalCourses: 25,
            totalStudents: 15420,
            totalHours: 1250,
            totalCertificates: 3240,
            averageRating: 4.8,
            completionRate: 87,
            satisfactionRate: 94,
            activeUsers: 8920,
            newCoursesThisMonth: 3,
            topCategories: [
                { name: 'Web Development', count: 8, percentage: 32 },
                { name: 'Data Science', count: 5, percentage: 20 },
                { name: 'Mobile Development', count: 4, percentage: 16 },
                { name: 'DevOps', count: 3, percentage: 12 },
                { name: 'AI/ML', count: 3, percentage: 12 },
                { name: 'Backend', count: 2, percentage: 8 }
            ],
            levelDistribution: [
                { level: 'Iniciante', count: 8, percentage: 32 },
                { level: 'Intermediário', count: 12, percentage: 48 },
                { level: 'Avançado', count: 5, percentage: 20 }
            ],
            monthlyGrowth: {
                students: 15.2,
                courses: 8.5,
                revenue: 22.3
            },
            lastUpdated: new Date().toISOString()
        }

        return NextResponse.json({
            success: true,
            stats: stats
        });

    } catch (error) {
        console.error('Erro na API de estatísticas:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}