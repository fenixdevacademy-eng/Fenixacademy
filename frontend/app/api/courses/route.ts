import { NextRequest, NextResponse } from 'next/server';

// Catálogo completo de cursos (mock)
const COURSES_CATALOG = [
  {
    id: 'course-1',
    title: 'Fundamentos de Desenvolvimento Web',
    description: 'Aprenda HTML, CSS e JavaScript do zero. Construa suas primeiras páginas web interativas.',
    instructor: 'Dr. Ana Silva',
    duration: '40 horas',
    level: 'Iniciante',
    price: 299.90,
    rating: 4.8,
    students: 15420,
    imageUrl: '/courses/web-fundamentals.jpg',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Development']
  },
  {
    id: 'course-2',
    title: 'React JS Avançado',
    description: 'Domine React com hooks, context, redux e padrões avançados.',
    instructor: 'Prof. Carlos Santos',
    duration: '60 horas',
    level: 'Intermediário',
    price: 499.90,
    rating: 4.9,
    students: 8932,
    imageUrl: '/courses/react-advanced.jpg',
    tags: ['React', 'Hooks', 'Context', 'Redux']
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');

    let filteredCourses = [...COURSES_CATALOG];

    // Filtrar por categoria
    if (category) {
      filteredCourses = filteredCourses.filter(course => 
        course.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
      );
    }

    // Filtrar por nível
    if (level) {
      filteredCourses = filteredCourses.filter(course => 
        course.level.toLowerCase() === level.toLowerCase()
      );
    }

    // Filtrar por busca
    if (search) {
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      courses: filteredCourses,
      total: filteredCourses.length
    });

  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}