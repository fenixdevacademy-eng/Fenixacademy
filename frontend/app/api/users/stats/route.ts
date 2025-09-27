import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id') || 'current-user-id';

        // Verificar se o usuário tem acesso aos cursos
        const courseAccessResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/course-access?userId=${userId}`);
        const courseAccessData = await courseAccessResponse.json();

        const hasAccess = courseAccessData.success && courseAccessData.hasAccess;

        // Estatísticas iniciais (sem dados mockados)
        const stats = {
            totalHours: 0,
            completedLessons: 0,
            certificates: 0,
            streak: 0,
            weeklyGoal: 10,
            weeklyProgress: 0,
            totalCourses: hasAccess ? 26 : 0,
            inProgressCourses: 0,
            completedCourses: 0,
            averageScore: 0,
            totalQuizzes: 0,
            passedQuizzes: 0,
            totalProjects: 0,
            completedProjects: 0,
            rank: 'Iniciante',
            level: 1,
            experience: 0,
            nextLevelExp: 100,
            badges: 0,
            achievements: 0
        }

        return NextResponse.json({
            success: true,
            stats: stats,
            hasAccess
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas do usuário:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, value } = body;

        // Simular atualização de estatísticas
        console.log('Atualizando estatísticas:', { type, value });

        return NextResponse.json({
            success: true,
            message: 'Estatísticas atualizadas com sucesso',
            data: {
                type,
                value,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar estatísticas:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

