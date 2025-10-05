import { NextRequest, NextResponse } from 'next/server';
import { courses, getCoursesByCategory, searchCourses } from '@/lib/data/courses';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    let filteredCourses = courses;

    // Filtrar por categoria
    if (category && category !== 'all') {
      filteredCourses = getCoursesByCategory(category);
    }

    // Filtrar por busca
    if (search) {
      filteredCourses = searchCourses(search);
    }

    // Limitar resultados
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        filteredCourses = filteredCourses.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        courses: filteredCourses,
        total: filteredCourses.length,
        categories: [
          { id: 'all', name: 'Todos os Cursos', count: courses.length },
          { id: 'frontend', name: 'Frontend', count: courses.filter(c => c.category === 'frontend').length },
          { id: 'backend', name: 'Backend', count: courses.filter(c => c.category === 'backend').length },
          { id: 'fullstack', name: 'Full Stack', count: courses.filter(c => c.category === 'fullstack').length },
          { id: 'mobile', name: 'Mobile', count: courses.filter(c => c.category === 'mobile').length },
          { id: 'devops', name: 'DevOps', count: courses.filter(c => c.category === 'devops').length },
          { id: 'data', name: 'Data Science', count: courses.filter(c => c.category === 'data').length },
          { id: 'ai', name: 'Inteligência Artificial', count: courses.filter(c => c.category === 'ai').length },
          { id: 'game', name: 'Desenvolvimento de Jogos', count: courses.filter(c => c.category === 'game').length }
        ]
      }
    });

  } catch (error) {
    console.error('Erro na API de cursos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}