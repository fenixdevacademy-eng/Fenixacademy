'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Bell } from 'lucide-react';

interface DashboardHeaderProps {
    userName?: string;
    userLevel?: string;
    userInitials?: string;
    notifications?: number;
    user?: {
        id: string;
        name: string;
        level: number;
        title: string;
        avatar: string;
    };
}

export default function DashboardHeader({
    userName = "Carlos Silva",
    userLevel = "Nível 8 - Desenvolvedor",
    userInitials = "CS",
    notifications = 3,
    user
}: DashboardHeaderProps) {
    // Usar dados do usuário se disponível
    const displayName = user?.name || userName;
    const displayLevel = user ? `Nível ${user.level} - ${user.title}` : userLevel;
    const displayInitials = user?.avatar || userInitials;
    return (
        <header className="relative z-10">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-2">
                            <Code className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                            Fênix Dev Academy
                        </span>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <button className="relative p-2 text-white hover:text-red-300 transition-colors group">
                            <Bell className="h-6 w-6" />
                            {notifications > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notifications}
                                </span>
                            )}
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <div className="text-white font-medium">{displayName}</div>
                                <div className="text-gray-400 text-sm">{displayLevel}</div>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                                {displayInitials}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}


