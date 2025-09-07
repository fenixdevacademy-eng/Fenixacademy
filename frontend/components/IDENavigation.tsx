'use client';

import React from 'react';
import Link from 'next/link';
import {
    Home,
    BookOpen,
    Code,
    Settings,
    HelpCircle,
    Github,
    ExternalLink,
    Sparkles
} from 'lucide-react';

export default function IDENavigation() {
    return (
        <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo e Nome */}
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="hidden md:block">
                                <h1 className="text-xl font-bold text-white">Fenix Academy</h1>
                                <p className="text-xs text-blue-300">Fenix IDE 2.0</p>
                            </div>
                        </Link>
                    </div>

                    {/* Links de Navegação */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                        >
                            <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>Início</span>
                        </Link>

                        <Link
                            href="/course/web-fundamentals"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                        >
                            <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>Cursos</span>
                        </Link>

                        <Link
                            href="/ide"
                            className="flex items-center space-x-2 text-blue-400 font-medium group"
                        >
                            <Code className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>IDE</span>
                        </Link>

                        <a
                            href="https://github.com/fenix-academy/fenix-ide-v2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                        >
                            <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>GitHub</span>
                            <ExternalLink className="w-3 h-3 text-gray-500" />
                        </a>
                    </nav>

                    {/* Botões de Ação */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
                            <HelpCircle className="w-5 h-5" />
                        </button>

                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
                            <Settings className="w-5 h-5" />
                        </button>

                        <Link
                            href="/course/web-fundamentals"
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Voltar aos Cursos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}



