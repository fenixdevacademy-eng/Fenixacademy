'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IDEPage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a IDE avançada
    router.replace('/ide-advanced');
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Redirecionando para a IDE Avançada...</p>
      </div>
    </div>
  );
}
