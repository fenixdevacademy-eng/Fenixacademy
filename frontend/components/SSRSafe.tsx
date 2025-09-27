"use client";

import React, { useEffect, useState } from 'react';

interface SSRSafeProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    delay?: number;
}

export default function SSRSafe({ children, fallback = null, delay = 0 }: SSRSafeProps) {
    const [isClient, setIsClient] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Aguardar um tick para garantir que estamos no cliente
        const timer = setTimeout(() => {
            setIsClient(true);
            // Aguardar mais um tick para garantir que a hidratação está completa
            setTimeout(() => {
                setIsHydrated(true);
            }, delay);
        }, 0);

        return () => clearTimeout(timer);
    }, [delay]);

    // Durante SSR ou antes da hidratação, retornar fallback
    if (!isClient || !isHydrated) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}




