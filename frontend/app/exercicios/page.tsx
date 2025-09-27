'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ExerciciosPage() {
    const router = useRouter();

    useEffect(() => {
        // Redireciona automaticamente para os exercícios expandidos
        router.replace('/expanded-exercises');
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Redirecionando...
                </h1>
                <p className="text-gray-600">
                    Você será redirecionado para os exercícios expandidos.
                </p>
            </div>
        </div>
    );
}