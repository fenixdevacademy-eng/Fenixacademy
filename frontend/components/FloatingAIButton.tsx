'use client';

import React, { useState } from 'react';
import { Brain, X, MessageSquare, Zap, Code, BookOpen, Lightbulb } from 'lucide-react';
import FenixAIChat from './FenixAIChat';

const FloatingAIButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
                <Brain className="w-6 h-6" />
            </button>
        </div>
    );
}

export default FloatingAIButton;