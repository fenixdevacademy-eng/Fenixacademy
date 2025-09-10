import { NextRequest, NextResponse } from 'next/server';
import { createApiHandler } from '@/lib/error-handler';

// Catálogo completo de cursos
const COURSES_CATALOG = [
  {
    id: 'course-1',
    title: 'Fundamentos de Desenvolvimento Web',
    description: 'Aprenda HTML, CSS e JavaScript do zero. Construa suas primeiras páginas web interativas.',
    instructor: 'Dr. Ana Silva',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
    level: 'Iniciante',
    duration: '40 horas',
    modules: 8,
    lessons: 45,
    rating: 4.8,
    students: 1250,
    price: 197.00,
    originalPrice: 397.00,
    category: 'Frontend',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web'],
    isFree: false,
    preview: {
      available: true,
      lessons: 3,
      duration: '2 horas'
    }
  },
  {
    id: 'course-2',
    title: 'React JS Avançado',
    description: 'Domine React com hooks, context, performance e padrões avançados.',
    instructor: 'Prof. Carlos Mendes',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    level: 'Avançado',
    duration: '60 horas',
    modules: 12,
    lessons: 78,
    rating: 4.9,
    students: 890,
    price: 297.00,
    originalPrice: 597.00,
    category: 'Frontend',
    tags: ['React', 'Hooks', 'Context', 'Performance'],
    isFree: false,
    preview: {
      available: true,
      lessons: 5,
      duration: '3 horas'
    }
  },
  {
    id: 'course-3',
    title: 'Node.js e APIs REST',
    description: 'Construa APIs robustas com Node.js, Express e bancos de dados.',
    instructor: 'Eng. Sofia Lima',
    instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
    level: 'Intermediário',
    duration: '50 horas',
    modules: 10,
    lessons: 65,
    rating: 4.7,
    students: 1100,
    price: 247.00,
    originalPrice: 497.00,
    category: 'Backend',
    tags: ['Node.js', 'Express', 'API', 'MongoDB'],
    isFree: false,
    preview: {
      available: true,
      lessons: 4,
      duration: '2.5 horas'
    }
  },
  {
    id: 'course-4',
    title: 'Python para Data Science',
    description: 'Análise de dados, machine learning e visualização com Python.',
    instructor: 'Dr. Roberto Alves',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    level: 'Intermediário',
    duration: '70 horas',
    modules: 15,
    lessons: 95,
    rating: 4.9,
    students: 2100,
    price: 347.00,
    originalPrice: 697.00,
    category: 'Data Science',
    tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
    isFree: false,
    preview: {
      available: true,
      lessons: 6,
      duration: '4 horas'
    }
  },
  {
    id: 'course-5',
    title: 'Introdução à Programação',
    description: 'Curso gratuito para iniciantes em programação.',
    instructor: 'Prof. Maria Santos',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=225&fit=crop',
    level: 'Iniciante',
    duration: '20 horas',
    modules: 5,
    lessons: 25,
    rating: 4.6,
    students: 5000,
    price: 0.00,
    originalPrice: 0.00,
    category: 'Fundamentos',
    tags: ['Lógica', 'Algoritmos', 'Programação'],
    isFree: true,
    preview: {
      available: true,
      lessons: 25,
      duration: '20 horas'
    }
  }
];

async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'user-123';
  const category = searchParams.get('category');
  const level = searchParams.get('level');
  const free = searchParams.get('free');
  const search = searchParams.get('search');

  // Simular dados do usuário (em produção, viria de um banco de dados)
  const userPurchasedCourses = ['course-1', 'course-2']; // Simulação
  const userSubscription = 'pro'; // Simulação

  let filteredCourses = [...COURSES_CATALOG];

  // Aplicar filtros
  if (category) {
    filteredCourses = filteredCourses.filter(course => 
      course.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (level) {
    filteredCourses = filteredCourses.filter(course => 
      course.level.toLowerCase() === level.toLowerCase()
    );
  }

  if (free === 'true') {
    filteredCourses = filteredCourses.filter(course => course.isFree);
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Adicionar informações de acesso para cada curso
  const coursesWithAccess = filteredCourses.map(course => ({
    ...course,
    access: {
      hasAccess: course.isFree || 
                userPurchasedCourses.includes(course.id) || 
                ['pro', 'founder'].includes(userSubscription),
      isPurchased: userPurchasedCourses.includes(course.id),
      canPreview: course.preview.available,
      previewLessons: course.preview.lessons,
      previewDuration: course.preview.duration
    }
  }));

  const response = NextResponse.json({
    success: true,
    data: {
      courses: coursesWithAccess,
      total: coursesWithAccess.length,
      filters: {
        category,
        level,
        free: free === 'true',
        search
      },
      user: {
        purchasedCourses: userPurchasedCourses,
        subscription: userSubscription
      }
    },
    timestamp: new Date().toISOString()
  });

  // Add cache headers
  response.headers.set('Cache-Control', 'public, max-age=300'); // 5 minutes

  return response;
}

export const GET = createApiHandler(handler);