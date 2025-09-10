'use client';

import React, { useState } from 'react';
import { Brain, X, MessageSquare, Zap, Code, BookOpen, Lightbulb } from 'lucide-react';
import FenixAIChat from './FenixAIChat';

const FloatingAIButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        setIsMinimized(false);
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsMinimized(false);
    };

    const handleMinimize = () => {
        setIsMinimized(true);
    };

    const handleRestore = () => {
        setIsMinimized(false);
    };

    return (
        <>
            {/* Botão flutuante */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={handleOpen}
                        className="group relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white"
                        title="Abrir IA da Fenix Academy"
                    >
                        <Brain className="w-7 h-7 group-hover:animate-pulse" />

                        {/* Badge de notificação */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">AI</span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            IA da Fenix Academy
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                        </div>
                    </button>
                </div>
            )}

            {/* Chat da IA */}
            <FenixAIChat
                isOpen={isOpen}
                onClose={handleClose}
                onMinimize={handleMinimize}
                isMinimized={isMinimized}
            />
        </>
    );
};

export default FloatingAIButton;




