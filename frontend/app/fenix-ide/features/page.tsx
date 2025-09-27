'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FenixIDEStarRedirectPage() {
    const router = useRouter();
    
    useEffect(() => {
        // Redirecionar automaticamente após 3 segundos
        const timer = setTimeout(() => {
            router.push('/fenix-ide-v2/demo');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Redirecionando...
                </h1>
                <p className="text-gray-600">
                    Você será redirecionado para o Fenix IDE V2.
                </p>
            </div>
        </div>
    );
}