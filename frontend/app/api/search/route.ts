import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');

    // Simular busca
    const results = [
      {
        id: '1',
        title: 'Fundamentos de Desenvolvimento Web',
        type: 'course',
        description: 'Aprenda HTML, CSS e JavaScript do zero',
        category: 'Web Development'
      },
      {
        id: '2',
        title: 'React Hooks Avançados',
        type: 'lesson',
        description: 'Domine os hooks do React',
        category: 'React'
      }
    ].filter(item => 
      query ? item.title.toLowerCase().includes(query.toLowerCase()) : true
    ).filter(item => 
      category ? item.category.toLowerCase().includes(category.toLowerCase()) : true
    );

    return NextResponse.json({
      success: true,
      results,
      total: results.length
    });

  } catch (error) {
    console.error('Erro na busca:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}