'use client';

import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { AnalyticsProvider } from '../contexts/AnalyticsContext';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <NotificationProvider>
                    <AnalyticsProvider>
                        {children}
                    </AnalyticsProvider>
                </NotificationProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}