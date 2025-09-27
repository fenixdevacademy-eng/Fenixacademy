'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Lock, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

interface CourseAccessGuardProps {
  children: React.ReactNode;
  courseId: string;
  courseName?: string;
  className?: string;
}

export default function CourseAccessGuard({
  children,
  courseId,
  courseName = 'este curso',
  className = ''
}: CourseAccessGuardProps) {
  const { user, isAuthenticated, isCEO } = useAuth();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAccess();
  }, [user, courseId]);

  const checkAccess = async () => {
    try {
      setLoading(true);
      setError(null);

      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
        return;
      }

      // CEO has access to everything
      if (isCEO) {
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Check if user has access to this course
      const response = await fetch(`/api/courses/${courseId}/access`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHasAccess(data.hasAccess);
      } else {
        setError('Erro ao verificar acesso ao curso');
      }
    } catch (err) {
      console.error('Error checking course access:', err);
      setError('Erro ao verificar acesso ao curso');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    router.push(`/course/${courseId}/purchase`);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-64 ${className}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verificando acesso ao curso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-64 ${className}`}>
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={checkAccess}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className={`flex items-center justify-center min-h-64 ${className}`}>
        <div className="text-center max-w-md">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Acesso Restrito
          </h2>
          <p className="text-gray-600 mb-6">
            Você precisa ter acesso a {courseName} para visualizar este conteúdo.
          </p>

          <div className="space-y-3">
            <button
              onClick={handlePurchase}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <ArrowRight className="w-4 h-4" />
              Adquirir Acesso
            </button>

            <button
              onClick={handleGoHome}
              className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Voltar ao Início
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Já tem acesso? Entre em contato com o suporte.</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}