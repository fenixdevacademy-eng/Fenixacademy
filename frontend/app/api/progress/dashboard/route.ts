import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateToken } from '@/lib/auth/middleware-db';

export async function GET(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);
        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            );
        }

        // Buscar perfil do usuário
        const userProfile = await prisma.userProfile.findUnique({
            where: { userId: user.id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true
                    }
                }
            }
        });

        // Buscar cursos do usuário
        const userCourses = await prisma.userCourse.findMany({
            where: { userId: user.id },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        slug: true,
                        price: true,
                        duration: true,
                        level: true,
                        category: true
                    }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        // Calcular estatísticas
        const totalCourses = userCourses.length;
        const completedCourses = userCourses.filter(course => course.progress === 100).length;
        const totalHours = userProfile?.totalHours || 0;
        const certificates = userProfile?.certificates || 0;
        const totalPoints = userProfile?.totalPoints || 0;

        const dashboard = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                level: Math.floor(totalPoints / 1000) + 1,
                points: totalPoints,
                streak: 0 // Implementar lógica de streak
            },
            stats: {
                totalCourses,
                completedCourses,
                totalHours,
                certificates,
                achievements: 0, // Implementar lógica de conquistas
                weeklyGoal: 10,
                weeklyProgress: 0 // Implementar lógica de progresso semanal
            },
            recentActivity: userCourses.slice(0, 3).map(course => ({
                id: course.id,
                type: 'lesson',
                title: course.course.title,
                time: new Date(course.updatedAt).toLocaleString('pt-BR'),
                progress: course.progress
            })),
            courses: userCourses.map(course => ({
                id: course.id,
                title: course.course.title,
                progress: course.progress,
                nextLesson: course.progress < 100 ? 'Continue estudando' : 'Curso concluído',
                category: course.course.category
            }))
        }

        return NextResponse.json({
            success: true,
            dashboard
        });

    } catch (error) {
        console.error('Erro na API do dashboard:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}