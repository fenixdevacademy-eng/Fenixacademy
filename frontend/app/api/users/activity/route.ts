import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id') || 'current-user-id';

        // Verificar se o usuário tem acesso aos cursos
        const courseAccessResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/course-access?userId=${userId}`);
        const courseAccessData = await courseAccessResponse.json();

        const hasAccess = courseAccessData.success && courseAccessData.hasAccess;

        // Retornar array vazio se não tiver acesso ou não houver atividade
        const activity = hasAccess ? [] : [];

        return NextResponse.json({
            success: true,
            activity: activity,
            total: activity.length,
            hasAccess
        });
    } catch (error) {
        console.error('Erro ao buscar atividade do usuário:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, title, progress } = body;

        // Simular registro de atividade
        console.log('Registrando atividade:', { type, title, progress });

        return NextResponse.json({
            success: true,
            message: 'Atividade registrada com sucesso',
            data: {
                id: Date.now().toString(),
                type,
                title,
                progress,
                time: 'Agora',
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Erro ao registrar atividade:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}