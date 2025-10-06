'use client';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { courseSlug: string; moduleId: string } }
) {
  try {
    const { courseSlug, moduleId } = params;

    return NextResponse.json({
      success: true,
      lessons: [
        {
          id: '1',
          title: 'Introdução ao Módulo',
          description: 'Aula introdutória do módulo',
          duration: '30 min',
          type: 'video',
          completed: false
        },
        {
          id: '2',
          title: 'Conceitos Fundamentais',
          description: 'Aprenda os conceitos básicos',
          duration: '45 min',
          type: 'text',
          completed: false
        }
      ]
    });

  } catch (error) {
    console.error('Erro ao buscar lições:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}