import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '@/lib/error-handler';

// Simulação de banco de dados de usuários e assinaturas
const USERS_DB = {
  'user-123': {
    id: 'user-123',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    subscription: {
      plan: 'pro', // 'free', 'basic', 'pro', 'founder'
      status: 'active', // 'active', 'inactive', 'cancelled', 'expired'
      expiresAt: '2024-12-31T23:59:59Z',
      paymentMethod: 'credit_card',
      lastPayment: '2024-01-01T00:00:00Z',
      nextPayment: '2024-02-01T00:00:00Z',
      amount: 197.00,
      currency: 'BRL'
    },
    courses: {
      purchased: ['course-1', 'course-2', 'course-3'],
      completed: ['course-1'],
      inProgress: ['course-2'],
      bookmarked: ['course-4']
    },
    stats: {
      totalCourses: 3,
      completedCourses: 1,
      inProgressCourses: 1,
      totalHours: 25,
      certificates: 1,
      streak: 5,
      level: 'Intermediário',
      xp: 1250
    }
  },
  'user-456': {
    id: 'user-456',
    name: 'Maria Santos',
    email: 'maria@exemplo.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    subscription: {
      plan: 'free',
      status: 'active',
      expiresAt: null,
      paymentMethod: null,
      lastPayment: null,
      nextPayment: null,
      amount: 0,
      currency: 'BRL'
    },
    courses: {
      purchased: [],
      completed: [],
      inProgress: [],
      bookmarked: ['course-1', 'course-2']
    },
    stats: {
      totalCourses: 0,
      completedCourses: 0,
      inProgressCourses: 0,
      totalHours: 0,
      certificates: 0,
      streak: 0,
      level: 'Iniciante',
      xp: 0
    }
  },
  'user-789': {
    id: 'user-789',
    name: 'Pedro Costa',
    email: 'pedro@exemplo.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    subscription: {
      plan: 'founder',
      status: 'active',
      expiresAt: null, // Vitalício
      paymentMethod: 'pix',
      lastPayment: '2024-01-15T00:00:00Z',
      nextPayment: null,
      amount: 997.00,
      currency: 'BRL'
    },
    courses: {
      purchased: ['course-1', 'course-2', 'course-3', 'course-4', 'course-5'],
      completed: ['course-1', 'course-2'],
      inProgress: ['course-3'],
      bookmarked: ['course-6', 'course-7']
    },
    stats: {
      totalCourses: 5,
      completedCourses: 2,
      inProgressCourses: 1,
      totalHours: 85,
      certificates: 2,
      streak: 12,
      level: 'Avançado',
      xp: 3500
    }
  }
};

async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'user-123'; // Default para teste

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

  // Verificar se a assinatura está ativa
  const isSubscriptionActive = checkSubscriptionStatus(user.subscription);

  const response = NextResponse.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      subscription: {
        ...user.subscription,
        isActive: isSubscriptionActive,
        daysUntilExpiry: calculateDaysUntilExpiry(user.subscription.expiresAt)
      },
      courses: user.courses,
      stats: user.stats,
      access: {
        hasFullAccess: ['pro', 'founder'].includes(user.subscription.plan) && isSubscriptionActive,
        canAccessCourse: (courseId: string) => {
          return (user.courses.purchased as string[]).includes(courseId) ||
            (['pro', 'founder'].includes(user.subscription.plan) && isSubscriptionActive);
        }
      }
    },
    timestamp: new Date().toISOString()
  });

  // Add cache headers
  response.headers.set('Cache-Control', 'private, max-age=60'); // 1 minute

  return response;
}

function checkSubscriptionStatus(subscription: any): boolean {
  if (subscription.status !== 'active') {
    return false;
  }

  // Se não tem data de expiração (vitalício), está ativo
  if (!subscription.expiresAt) {
    return true;
  }

  // Verificar se não expirou
  const now = new Date();
  const expiresAt = new Date(subscription.expiresAt);

  return now <= expiresAt;
}

function calculateDaysUntilExpiry(expiresAt: string | null): number | null {
  if (!expiresAt) {
    return null; // Vitalício
  }

  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
}

export const GET = createNextApiHandler(handler);

