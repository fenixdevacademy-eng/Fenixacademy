'use client';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
    { params }: { params: { courseSlug: string } }
) {
    try {
        const { courseSlug } = params;
        const body = await request.json();

        // Simular inscrição no curso
        const enrollment = {
            courseSlug,
            userId: body.userId || 'user-123',
            enrolledAt: new Date().toISOString(),
            status: 'active',
            progress: 0,
            completedLessons: 0,
            totalLessons: 20,
            lastAccessed: new Date().toISOString()
        };

        console.log('Nova inscrição no curso:', enrollment);

        return NextResponse.json({
            success: true,
            message: 'Inscrição realizada com sucesso',
            enrollment
        });

    } catch (error) {
        console.error('Erro ao inscrever no curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





