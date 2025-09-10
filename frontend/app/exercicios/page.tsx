'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExerciciosPage() {
    const router = useRouter();

    useEffect(() => {
        // Redireciona automaticamente para o IDE Advanced
        router.replace('/ide-advanced');
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    🎯 Redirecionando para o IDE Advanced...
                </h2>
                <p className="text-gray-400">
                    Preparando seu ambiente de desenvolvimento
                </p>
            </div>
        </div>
    );
}
