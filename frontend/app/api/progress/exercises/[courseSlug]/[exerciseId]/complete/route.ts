'use client';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
    { params }: { params: { courseSlug: string; exerciseId: string } }
) {
    try {
        const { courseSlug, exerciseId } = params;
        const body = await request.json();

        // Simular conclusão do exercício
        const completion = {
            courseSlug,
            exerciseId,
            userId: body.userId || 'user-123',
            completedAt: new Date().toISOString(),
            timeSpent: body.timeSpent || 0,
            score: body.score || 100,
            attempts: body.attempts || 1,
            status: 'completed'
        };

        console.log('Exercício concluído:', completion);

        return NextResponse.json({
            success: true,
            message: 'Exercício marcado como concluído',
            completion
        });

    } catch (error) {
        console.error('Erro ao marcar exercício como concluído:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





