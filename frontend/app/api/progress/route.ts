import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user-1';

    const progress = [
      {
        courseId: 'course-1',
        courseName: 'Fundamentos de Desenvolvimento Web',
        progress: 75,
        completedLessons: 15,
        totalLessons: 20,
        lastAccessed: '2024-03-20T10:30:00Z'
      },
      {
        courseId: 'course-2',
        courseName: 'React JS Avançado',
        progress: 45,
        completedLessons: 9,
        totalLessons: 20,
        lastAccessed: '2024-03-19T14:20:00Z'
      }
    ];

    return NextResponse.json({
      success: true,
      progress
    });

  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, lessonId, progress, completed } = body;

    // Simular salvamento do progresso
    console.log('Salvando progresso:', { courseId, lessonId, progress, completed });

    return NextResponse.json({
      success: true,
      message: 'Progresso salvo com sucesso',
      data: {
        courseId,
        lessonId,
        progress,
        completed,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}