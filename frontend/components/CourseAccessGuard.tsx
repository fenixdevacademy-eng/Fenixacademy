'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CourseAccessGuardProps {
  children: React.ReactNode;
  courseId: string;
  courseName?: string;
}

export default function CourseAccessGuard({ 
  children, 
  courseId, 
  courseName 
}: CourseAccessGuardProps) {
  const { user, isAuthenticated, isCEO } = useAuth();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, [user, courseId]);

  const checkAccess = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    // CEO tem acesso a todos os cursos
    if (isCEO) {
      setHasAccess(true);
      setLoading(false);
      return;
    }

    // Aqui você pode verificar o acesso de outros usuários
    // Por enquanto, vamos dar acesso para todos os usuários autenticados
    setHasAccess(true);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600 mb-6">
            Você não tem acesso ao curso {courseName || courseId}.
          </p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Ver Cursos Disponíveis
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}