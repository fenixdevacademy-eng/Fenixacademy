import { NextRequest, NextResponse } from 'next/server';
import { getCourseBySlug } from '@/lib/data/courses';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        if (!slug) {
            return NextResponse.json(
                { success: false, error: 'Slug do curso não fornecido' },
                { status: 400 }
            );
        }

        const course = getCourseBySlug(slug);

        if (!course) {
            return NextResponse.json(
                { success: false, error: 'Curso não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: course
        });

    } catch (error) {
        console.error('Erro na API de curso específico:', error);
        return NextResponse.json(
            { success: false, error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
