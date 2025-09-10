import { NextRequest, NextResponse } from 'next/server';
import { createApiHandler } from '@/lib/error-handler';

// Simulação de banco de dados de usuários e pagamentos
const USERS_DB = {
  'user-123': {
    id: 'user-123',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    subscription: {
      plan: 'pro', // 'free', 'basic', 'pro', 'founder'
      status: 'active', // 'active', 'inactive', 'cancelled'
      expiresAt: '2024-12-31T23:59:59Z',
      paymentMethod: 'credit_card'
    },
    courses: {
      purchased: ['course-1', 'course-2'],
      completed: ['course-1'],
      inProgress: ['course-2']
    }
  },
  'user-456': {
    id: 'user-456',
    name: 'Maria Santos',
    email: 'maria@exemplo.com',
    subscription: {
      plan: 'free',
      status: 'active',
      expiresAt: null,
      paymentMethod: null
    },
    courses: {
      purchased: [],
      completed: [],
      inProgress: []
    }
  }
};

// Conteúdo completo dos cursos
const COURSES_CONTENT = {
  'course-1': {
    id: 'course-1',
    title: 'Fundamentos de Desenvolvimento Web',
    description: 'Aprenda HTML, CSS e JavaScript do zero',
    level: 'Iniciante',
    duration: '40 horas',
    modules: [
      {
        id: 'module-1',
        title: 'Introdução ao HTML',
        lessons: [
          {
            id: 'lesson-1',
            title: 'O que é HTML?',
            content: 'HTML (HyperText Markup Language) é a linguagem de marcação padrão para criar páginas web...',
            videoUrl: 'https://example.com/video1.mp4',
            duration: '15 minutos',
            isPreview: false
          },
          {
            id: 'lesson-2',
            title: 'Estrutura básica de um documento HTML',
            content: 'Todo documento HTML deve ter uma estrutura básica com as tags html, head e body...',
            videoUrl: 'https://example.com/video2.mp4',
            duration: '20 minutos',
            isPreview: false
          }
        ]
      },
      {
        id: 'module-2',
        title: 'CSS Básico',
        lessons: [
          {
            id: 'lesson-3',
            title: 'Introdução ao CSS',
            content: 'CSS (Cascading Style Sheets) é usado para estilizar páginas web...',
            videoUrl: 'https://example.com/video3.mp4',
            duration: '25 minutos',
            isPreview: true // Apenas preview para usuários não pagantes
          }
        ]
      }
    ]
  },
  'course-2': {
    id: 'course-2',
    title: 'React JS Avançado',
    description: 'Domine React com hooks, context e performance',
    level: 'Avançado',
    duration: '60 horas',
    modules: [
      {
        id: 'module-1',
        title: 'Hooks Avançados',
        lessons: [
          {
            id: 'lesson-1',
            title: 'useReducer e useCallback',
            content: 'Aprenda a usar useReducer para gerenciar estado complexo...',
            videoUrl: 'https://example.com/video4.mp4',
            duration: '30 minutos',
            isPreview: false
          }
        ]
      }
    ]
  }
};

// Conteúdo de preview (limitado)
const PREVIEW_CONTENT = {
  'course-1': {
    id: 'course-1',
    title: 'Fundamentos de Desenvolvimento Web',
    description: 'Aprenda HTML, CSS e JavaScript do zero',
    level: 'Iniciante',
    duration: '40 horas',
    modules: [
      {
        id: 'module-1',
        title: 'Introdução ao HTML',
        lessons: [
          {
            id: 'lesson-1',
            title: 'O que é HTML?',
            content: 'HTML (HyperText Markup Language) é a linguagem de marcação padrão para criar páginas web. É a base de toda página web e define a estrutura e o conteúdo.',
            videoUrl: null, // Sem acesso ao vídeo
            duration: '15 minutos',
            isPreview: true
          }
        ]
      }
    ],
    lockedModules: 3, // Número de módulos bloqueados
    totalModules: 4
  }
};

async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');
  const userId = searchParams.get('userId') || 'user-123'; // Default para teste

  if (!courseId) {
    return NextResponse.json(
      {
        success: false,
        error: 'MISSING_COURSE_ID',
        message: 'Course ID is required',
        code: 'MISSING_COURSE_ID'
      },
      { status: 400 }
    );
  }

  // Verificar se o curso existe
  if (!COURSES_CONTENT[courseId as keyof typeof COURSES_CONTENT]) {
    return NextResponse.json(
      {
        success: false,
        error: 'COURSE_NOT_FOUND',
        message: 'Course not found',
        code: 'COURSE_NOT_FOUND'
      },
      { status: 404 }
    );
  }

  // Buscar dados do usuário
  const user = USERS_DB[userId as keyof typeof USERS_DB];
  
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: 'USER_NOT_FOUND',
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      },
      { status: 404 }
    );
  }

  // Verificar se o usuário tem acesso ao curso
  const hasAccess = checkCourseAccess(user, courseId);
  
  let courseContent;
  let accessLevel: 'full' | 'preview' | 'locked';

  if (hasAccess) {
    courseContent = COURSES_CONTENT[courseId as keyof typeof COURSES_CONTENT];
    accessLevel = 'full';
  } else {
    courseContent = PREVIEW_CONTENT[courseId as keyof typeof PREVIEW_CONTENT];
    accessLevel = 'preview';
  }

  const response = NextResponse.json({
    success: true,
    data: {
      course: courseContent,
      access: {
        level: accessLevel,
        hasFullAccess: hasAccess,
        subscription: user.subscription,
        purchasedCourses: user.courses.purchased
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    },
    timestamp: new Date().toISOString()
  });

  // Add cache headers
  response.headers.set('Cache-Control', 'private, max-age=300'); // 5 minutes

  return response;
}

function checkCourseAccess(user: any, courseId: string): boolean {
  // Verificar se o usuário comprou o curso específico
  if (user.courses.purchased.includes(courseId)) {
    return true;
  }

  // Verificar se o usuário tem um plano que dá acesso a todos os cursos
  const fullAccessPlans = ['pro', 'founder'];
  if (fullAccessPlans.includes(user.subscription.plan) && user.subscription.status === 'active') {
    return true;
  }

  // Verificar se a assinatura não expirou
  if (user.subscription.expiresAt) {
    const now = new Date();
    const expiresAt = new Date(user.subscription.expiresAt);
    if (now > expiresAt) {
      return false;
    }
  }

  return false;
}

export const GET = createApiHandler(handler);




