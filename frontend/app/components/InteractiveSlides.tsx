'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Eye, EyeOff, Volume2, VolumeX, Clock, Bookmark, Heart } from 'lucide-react';

interface InteractiveSlidesProps {
    className?: string;
    slides?: Slide[];
    onSlideChange?: (slideIndex: number) => void;
    onSlideComplete?: (slideIndex: number) => void;
}

interface Slide {
    id: string;
    title: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'quiz';
    media?: {
        url: string;
        type: 'image' | 'video';
        alt?: string;
        caption?: string;
    };
    notes?: string;
    duration?: number;
    isCompleted?: boolean;
}

const mockSlides: Slide[] = [
    {
        id: '1',
        title: 'Introdução ao JavaScript',
        content: 'JavaScript é uma linguagem de programação de alto nível, interpretada e orientada a objetos.',
        type: 'text',
        duration: 30,
        notes: 'Falar sobre a história do JavaScript e sua importância no desenvolvimento web.'
    },
    {
        id: '2',
        title: 'Variáveis e Tipos de Dados',
        content: 'Em JavaScript, podemos declarar variáveis usando var, let ou const.',
        type: 'text',
        media: {
            url: '/images/js-variables.jpg',
            type: 'image',
            alt: 'Exemplo de variáveis em JavaScript',
            caption: 'Diferentes formas de declarar variáveis'
        },
        duration: 45,
        notes: 'Demonstrar exemplos práticos de cada tipo de declaração.'
    },
    {
        id: '3',
        title: 'Quiz: Conceitos Básicos',
        content: 'Teste seus conhecimentos sobre JavaScript',
        type: 'quiz',
        duration: 60,
        notes: 'Avaliar o entendimento dos conceitos apresentados.'
    }
];

export function InteractiveSlides({
    className = '',
    slides = mockSlides,
    onSlideChange,
    onSlideComplete
}: InteractiveSlidesProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    const totalSlides = slides.length;
    const currentSlideData = slides[currentSlide];

    const handlePreviousSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleNextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handleSlideSelect = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSlideComplete = () => {
        onSlideComplete?.(currentSlide);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const renderSlideContent = () => {
        if (!currentSlideData) return null;

        switch (currentSlideData.type) {
            case 'text':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            {currentSlideData.title}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {currentSlideData.content}
                        </p>
                    </div>
                );

            case 'image':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            {currentSlideData.title}
                        </h2>
                        {currentSlideData.media && (
                            <div className="mb-6">
                                <img
                                    src={currentSlideData.media.url}
                                    alt={currentSlideData.media.alt || currentSlideData.title}
                                    className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                                />
                                {currentSlideData.media.caption && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        {currentSlideData.media.caption}
                                    </p>
                                )}
                            </div>
                        )}
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {currentSlideData.content}
                        </p>
                    </div>
                );

            case 'video':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            {currentSlideData.title}
                        </h2>
                        {currentSlideData.media && (
                            <div className="mb-6">
                                <video
                                    src={currentSlideData.media.url}
                                    controls
                                    muted={isMuted}
                                    className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                                >
                                    Seu navegador não suporta o elemento de vídeo.
                                </video>
                                {currentSlideData.media.caption && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        {currentSlideData.media.caption}
                                    </p>
                                )}
                            </div>
                        )}
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {currentSlideData.content}
                        </p>
                    </div>
                );

            case 'quiz':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            {currentSlideData.title}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            {currentSlideData.content}
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <div className="space-y-4">
                                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                                        Qual é a sintaxe correta para declarar uma variável?
                                    </h3>
                                    <div className="space-y-2">
                                        {['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'].map((option, index) => (
                                            <label key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                                <input type="radio" name="quiz1" value={option} className="text-blue-500" />
                                                <span className="text-gray-900 dark:text-white">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            {currentSlideData.title}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {currentSlideData.content}
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Apresentação Interativa
                        </h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Slide {currentSlide + 1} de {totalSlides}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowNotes(!showNotes)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Mostrar/Ocultar Notas"
                        >
                            {showNotes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title={isMuted ? "Ativar Som" : "Desativar Som"}
                        >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                    ></div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePreviousSlide}
                            disabled={currentSlide === 0}
                            className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handlePlayPause}
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={handleNextSlide}
                            disabled={currentSlide === totalSlides - 1}
                            className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400 rounded-lg transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleBookmarkToggle}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Favoritar Slide"
                        >
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleLikeToggle}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Curtir Slide"
                        >
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex h-96">
                {/* Slide Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="h-full flex items-center justify-center">
                        {renderSlideContent()}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-80 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                    {/* Slide Thumbnails */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Slides
                            </h4>
                        </div>
                        <div className="space-y-2 p-4">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    onClick={() => handleSlideSelect(index)}
                                    className={`w-full p-3 text-left rounded-lg transition-colors ${currentSlide === index
                                            ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="font-medium text-gray-900 dark:text-white truncate">
                                                {slide.title}
                                            </h5>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                {slide.type}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes Panel */}
                    {showNotes && currentSlideData?.notes && (
                        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Notas do Apresentador
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {currentSlideData.notes}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


