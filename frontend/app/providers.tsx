'use client';

import React from 'react';
import { CartProvider } from '../hooks/useCart';
import PixelTracking from '../components/PixelTracking';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <CartProvider>
            <PixelTracking />
            {children}
        </CartProvider>
    );
}
