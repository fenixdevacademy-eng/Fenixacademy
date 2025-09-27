'use client';

import React from 'react';
import { CartProvider } from '../hooks/useCart';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { AnalyticsProvider } from '../contexts/AnalyticsContext';
import PixelTracking from '../components/PixelTracking';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    <NotificationProvider>
                        <AnalyticsProvider>
                            <PixelTracking />
                            {children}
                        </AnalyticsProvider>
                    </NotificationProvider>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}