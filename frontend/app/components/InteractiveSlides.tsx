'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Maximize, Minimize } from 'lucide-react';
import { InteractiveSlide, SlideElement } from '../data/interactiveElements';

interface InteractiveSlidesProps {
    slides: InteractiveSlide[];
    onSlideChange?: (slideId: string) => void;
    onComplete?: () => void;
    autoPlay?: boolean;
    showProgress?: boolean;
}

export default function InteractiveSlides({
    slides,
    onSlideChange,
    onComplete,
    autoPlay = false,
    showProgress = true
}: InteractiveSlidesProps) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [slideProgress, setSlideProgress] = useState(0);
    const [elementStates, setElementStates] = useState<Record<string, boolean>>({});

    const currentSlide = slides[currentSlideIndex];
    const slideRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout>();

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying && autoPlay) {
            autoPlayRef.current = setInterval(() => {
                nextSlide();
            }, 5000); // 5 seconds per slide
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isPlaying, currentSlideIndex, autoPlay]);

    // Update progress
    useEffect(() => {
        const progress = ((currentSlideIndex + 1) / slides.length) * 100;
        setSlideProgress(progress);
        onSlideChange?.(currentSlide.id);
    }, [currentSlideIndex, slides.length, currentSlide.id, onSlideChange]);

    const nextSlide = () => {
        if (currentSlideIndex < slides.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        } else {
            onComplete?.();
        }
    };

    const previousSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentSlideIndex(index);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const resetSlides = () => {
        setCurrentSlideIndex(0);
        setElementStates({});
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            slideRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleElementInteraction = (elementId: string, action: string) => {
        setElementStates(prev => ({ ...prev, [elementId]: true }));

        // Simulate feedback
        setTimeout(() => {
            setElementStates(prev => ({ ...prev, [elementId]: false }));
        }, 2000);
    };

    const renderSlideElement = (element: SlideElement) => {
        const isActive = elementStates[element.id];
        const elementStyle = {
            position: 'absolute' as const,
            left: `${element.position.x}%`,
            top: `${element.position.y}%`,
            width: `${element.position.width}%`,
            height: `${element.position.height}%`,
            transition: `all ${element.animation?.duration || 300}ms ease`,
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
        };

        const animationClass = element.animation ? `animate-${element.animation.entrance}` : '';

        switch (element.type) {
            case 'text':
                return (
                    <div
                        key={element.id}
                        className={`absolute ${animationClass} text-center flex items-center justify-center`}
                        style={elementStyle}
                        onClick={() => element.interactive?.type === 'click' && handleElementInteraction(element.id, element.interactive.action)}
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
                            <p className="text-lg font-semibold text-gray-800">{element.content}</p>
                            {element.interactive?.type === 'click' && (
                                <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
                                    Clique para interagir
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 'code':
                return (
                    <div
                        key={element.id}
                        className={`absolute ${animationClass} bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto`}
                        style={elementStyle}
                    >
                        <pre className="whitespace-pre-wrap">{element.content}</pre>
                    </div>
                );

            case 'image':
                return (
                    <div
                        key={element.id}
                        className={`absolute ${animationClass} bg-gray-200 rounded-lg overflow-hidden`}
                        style={elementStyle}
                    >
                        <img
                            src={element.content}
                            alt="Slide content"
                            className="w-full h-full object-cover"
                        />
                    </div>
                );

            case 'video':
                return (
                    <div
                        key={element.id}
                        className={`absolute ${animationClass} bg-black rounded-lg overflow-hidden`}
                        style={elementStyle}
                    >
                        <video
                            src={element.content}
                            controls
                            className="w-full h-full"
                        />
                    </div>
                );

            case 'interactive':
                return (
                    <div
                        key={element.id}
                        className={`absolute ${animationClass} cursor-pointer`}
                        style={elementStyle}
                        onClick={() => handleElementInteraction(element.id, element.interactive?.action || '')}
                    >
                        <div className={`bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 transition-colors ${isActive ? 'ring-4 ring-blue-300' : ''
                            }`}>
                            {element.content}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (!currentSlide) return null;

    return (
        <div
            ref={slideRef}
            className={`relative bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl shadow-2xl'
                }`}
        >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-xl font-bold text-gray-800">{currentSlide.title}</h2>
                        <span className="text-sm text-gray-600">
                            {currentSlideIndex + 1} de {slides.length}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={togglePlayPause}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title={isPlaying ? 'Pausar' : 'Reproduzir'}
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>

                        <button
                            onClick={resetSlides}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Reiniciar"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>

                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                        >
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                {showProgress && (
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${slideProgress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Slide Content */}
            <div className="relative w-full h-full pt-24 pb-20">
                {currentSlide.elements.map(renderSlideElement)}

                {/* Slide Type Indicator */}
                <div className="absolute top-24 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentSlide.type === 'concept' ? 'bg-blue-100 text-blue-800' :
                            currentSlide.type === 'example' ? 'bg-green-100 text-green-800' :
                                currentSlide.type === 'exercise' ? 'bg-orange-100 text-orange-800' :
                                    'bg-purple-100 text-purple-800'
                        }`}>
                        {currentSlide.type === 'concept' ? 'Conceito' :
                            currentSlide.type === 'example' ? 'Exemplo' :
                                currentSlide.type === 'exercise' ? 'Exercício' : 'Resumo'}
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={previousSlide}
                        disabled={currentSlideIndex === 0}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentSlideIndex === 0
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Anterior</span>
                    </button>

                    {/* Slide Dots */}
                    <div className="flex space-x-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlideIndex
                                        ? 'bg-blue-500'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        disabled={currentSlideIndex === slides.length - 1}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentSlideIndex === slides.length - 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <span>Próximo</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Keyboard Navigation */}
            <div className="absolute inset-0 focus:outline-none" tabIndex={0} onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') previousSlide();
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === ' ') {
                    e.preventDefault();
                    togglePlayPause();
                }
            }} />
        </div>
    );
}
