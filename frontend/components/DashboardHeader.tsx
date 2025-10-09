'use client';

import React from 'react';

interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
}

export default function DashboardHeader({
    title = "Dashboard",
    subtitle = "Bem-vindo ao seu painel"
}: DashboardHeaderProps) {
    return (
        <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-600">{subtitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}