'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Home,
    BookOpen,
    Code,
    Settings,
    HelpCircle,
    Github,
    ExternalLink,
    Sparkles,
    Menu,
    X,
    Play,
    Square,
    RotateCcw,
    Download,
    Upload,
    Share2,
    User
} from 'lucide-react';

interface IDENavigationProps {
    className?: string;
    onMenuToggle?: () => void;
    isMenuOpen?: boolean;
}

export default function IDENavigation({
    className = '',
    onMenuToggle,
    isMenuOpen = false
}: IDENavigationProps) {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const navigationItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Cursos', href: '/courses', icon: BookOpen },
        { name: 'IDE', href: '/ide', icon: Code },
        { name: 'Configurações', href: '/settings', icon: Settings },
        { name: 'Ajuda', href: '/help', icon: HelpCircle }
    ];

    const handleRun = () => {
        setIsRunning(!isRunning);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleStop = () => {
        setIsRunning(false);
        setIsPaused(false);
    };

    const handleRestart = () => {
        setIsRunning(false);
        setIsPaused(false);
        // Restart logic here
    };

    return (
        <div className={`bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onMenuToggle}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg lg:hidden"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Fenix IDE</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* IDE Controls */}
                    <div className="flex items-center gap-2">
                        {/* Run Controls */}
                        <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={handleRun}
                                className={`p-2 rounded ${isRunning && !isPaused
                                        ? 'bg-green-600 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                title={isRunning ? 'Pausar' : 'Executar'}
                            >
                                {isRunning && !isPaused ? (
                                    <Square className="w-4 h-4" />
                                ) : (
                                    <Play className="w-4 h-4" />
                                )}
                            </button>

                            {isRunning && (
                                <button
                                    onClick={handlePause}
                                    className={`p-2 rounded ${isPaused
                                            ? 'bg-yellow-600 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                        }`}
                                    title={isPaused ? 'Continuar' : 'Pausar'}
                                >
                                    <Square className="w-4 h-4" />
                                </button>
                            )}

                            <button
                                onClick={handleStop}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                                title="Parar"
                            >
                                <Square className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handleRestart}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                                title="Reiniciar"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>

                        {/* File Actions */}
                        <div className="flex items-center gap-1">
                            <button
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                                title="Salvar"
                            >
                                <Download className="w-4 h-4" />
                            </button>

                            <button
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                                title="Carregar"
                            >
                                <Upload className="w-4 h-4" />
                            </button>

                            <button
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                                title="Compartilhar"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* External Links */}
                        <div className="flex items-center gap-1">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                                title="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>

                            <a
                                href="/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                                title="Documentação"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                                <User className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-700/50 py-4">
                        <nav className="space-y-2">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                        onClick={onMenuToggle}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}