'use client';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { courseSlug: string } }
) {
    try {
        const { courseSlug } = params;

        // Dados mock de progresso do curso
        const courseProgress = {
            courseSlug,
            enrolled: true,
            progress: 45,
            completedLessons: 9,
            totalLessons: 20,
            completedModules: 2,
            totalModules: 5,
            lastAccessed: '2024-01-15T10:30:00Z',
            enrolledAt: '2024-01-01T00:00:00Z',
            estimatedCompletion: '2024-02-15T00:00:00Z',
            certificates: [],
            achievements: [
                {
                    id: 'first-lesson',
                    title: 'Primeira Aula',
                    earnedAt: '2024-01-02T00:00:00Z'
                }
            ]
        };

        return NextResponse.json({
            success: true,
            progress: courseProgress
        });

    } catch (error) {
        console.error('Erro ao buscar progresso do curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { courseSlug: string } }
) {
    try {
        const { courseSlug } = params;
        const body = await request.json();

        // Simular inscrição no curso
        console.log('Inscrição no curso:', { courseSlug, ...body });

        return NextResponse.json({
            success: true,
            message: 'Inscrição realizada com sucesso',
            courseSlug,
            enrolledAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro ao inscrever no curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





