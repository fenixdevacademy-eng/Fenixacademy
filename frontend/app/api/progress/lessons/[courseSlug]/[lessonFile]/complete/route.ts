'use client';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
    { params }: { params: { courseSlug: string; lessonFile: string } }
) {
    try {
        const { courseSlug, lessonFile } = params;
        const body = await request.json();

        // Simular conclusão da aula
        const completion = {
            courseSlug,
            lessonFile,
            userId: body.userId || 'user-123',
            completedAt: new Date().toISOString(),
            timeSpent: body.timeSpent || 0,
            score: body.score || 100,
            status: 'completed'
        };

        console.log('Aula concluída:', completion);

        return NextResponse.json({
            success: true,
            message: 'Aula marcada como concluída',
            completion
        });

    } catch (error) {
        console.error('Erro ao marcar aula como concluída:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}