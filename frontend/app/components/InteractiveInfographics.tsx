'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Download, Share2, Info } from 'lucide-react';
import { Infographic, InfographicElement, AnimationConfig } from '../data/interactiveElements';

interface InteractiveInfographicsProps {
    infographic: Infographic;
    onElementClick?: (elementId: string) => void;
    onExport?: (format: 'png' | 'svg' | 'pdf') => void;
    onShare?: () => void;
    showControls?: boolean;
    autoAnimate?: boolean;
}

export default function InteractiveInfographics({
    infographic,
    onElementClick,
    onExport,
    onShare,
    showControls = true,
    autoAnimate = true
}: InteractiveInfographicsProps) {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [selectedElement, setSelectedElement] = useState<string | null>(null);
    const [animationStates, setAnimationStates] = useState<Record<string, boolean>>({});

    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<NodeJS.Timeout>();

    // Auto-animation
    useEffect(() => {
        if (autoAnimate && infographic.animations.length > 0) {
            animationRef.current = setInterval(() => {
                setAnimationStates(prev => {
                    const newStates = { ...prev };
                    infographic.elements.forEach((element, index) => {
                        const animation = infographic.animations[index % infographic.animations.length];
                        if (animation.loop) {
                            newStates[element.id] = !prev[element.id];
                        }
                    });
                    return newStates;
                });
            }, 3000);
        }

        return () => {
            if (animationRef.current) {
                clearInterval(animationRef.current);
            }
        };
    }, [autoAnimate, infographic.animations, infographic.elements]);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev * 1.2, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev / 1.2, 0.5));
    };

    const handleReset = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPan({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleElementClick = (elementId: string) => {
        setSelectedElement(elementId);
        onElementClick?.(elementId);
    };

    const handleExport = (format: 'png' | 'svg' | 'pdf') => {
        onExport?.(format);
    };

    const getAnimationStyle = (element: InfographicElement, animation: AnimationConfig) => {
        const isActive = animationStates[element.id];

        switch (animation.type) {
            case 'fade':
                return {
                    opacity: isActive ? 1 : 0.7,
                    transition: `opacity ${animation.duration}ms ${animation.easing}`
                };
            case 'scale':
                return {
                    transform: `scale(${isActive ? 1.1 : 1})`,
                    transition: `transform ${animation.duration}ms ${animation.easing}`
                };
            case 'rotate':
                return {
                    transform: `rotate(${isActive ? 360 : 0}deg)`,
                    transition: `transform ${animation.duration}ms ${animation.easing}`
                };
            case 'slide':
                return {
                    transform: `translateX(${isActive ? 10 : 0}px)`,
                    transition: `transform ${animation.duration}ms ${animation.easing}`
                };
            default:
                return {};
        }
    };

    const renderElement = (element: InfographicElement) => {
        const animation = infographic.animations.find(a => a.type === 'fade') || infographic.animations[0];
        const animationStyle = animation ? getAnimationStyle(element, animation) : {};
        const isSelected = selectedElement === element.id;

        const elementStyle = {
            position: 'absolute' as const,
            left: `${element.position.x}%`,
            top: `${element.position.y}%`,
            cursor: element.clickAction ? 'pointer' : 'default',
            ...animationStyle
        };

        switch (element.type) {
            case 'node':
                return (
                    <div
                        key={element.id}
                        className={`absolute transition-all duration-300 ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
                            }`}
                        style={elementStyle}
                        onClick={() => element.clickAction && handleElementClick(element.id)}
                        title={element.tooltip}
                    >
                        <div
                            className={`flex items-center justify-center text-white font-medium text-sm ${element.style.shape === 'circle' ? 'rounded-full' :
                                    element.style.shape === 'square' ? 'rounded-lg' :
                                        element.style.shape === 'diamond' ? 'transform rotate-45' : 'rounded-lg'
                                }`}
                            style={{
                                backgroundColor: element.style.color,
                                width: element.style.size,
                                height: element.style.size,
                                minWidth: '60px',
                                minHeight: '60px'
                            }}
                        >
                            <span className={element.style.shape === 'diamond' ? 'transform -rotate-45' : ''}>
                                {element.content}
                            </span>
                        </div>
                    </div>
                );

            case 'connection':
                return (
                    <svg
                        key={element.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: `${element.position.x}%`,
                            top: `${element.position.y}%`,
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <line
                            x1="0"
                            y1="0"
                            x2="100"
                            y2="100"
                            stroke={element.style.color}
                            strokeWidth="3"
                            strokeDasharray={element.style.shape === 'arrow' ? '5,5' : 'none'}
                            markerEnd={element.style.shape === 'arrow' ? 'url(#arrowhead)' : undefined}
                        />
                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="10"
                                markerHeight="7"
                                refX="9"
                                refY="3.5"
                                orient="auto"
                            >
                                <polygon
                                    points="0 0, 10 3.5, 0 7"
                                    fill={element.style.color}
                                />
                            </marker>
                        </defs>
                    </svg>
                );

            case 'text':
                return (
                    <div
                        key={element.id}
                        className="absolute text-center"
                        style={elementStyle}
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                                {element.content}
                            </p>
                        </div>
                    </div>
                );

            case 'icon':
                return (
                    <div
                        key={element.id}
                        className="absolute flex items-center justify-center"
                        style={elementStyle}
                        onClick={() => element.clickAction && handleElementClick(element.id)}
                        title={element.tooltip}
                    >
                        <div
                            className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${isSelected ? 'ring-4 ring-blue-400' : ''
                                }`}
                            style={{ backgroundColor: element.style.color }}
                        >
                            <span className="text-white text-2xl">{element.content}</span>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">{infographic.title}</h2>
                        <p className="text-blue-100 text-sm">{infographic.description}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${infographic.type === 'flowchart' ? 'bg-blue-500/20' :
                                infographic.type === 'timeline' ? 'bg-green-500/20' :
                                    infographic.type === 'comparison' ? 'bg-orange-500/20' :
                                        infographic.type === 'hierarchy' ? 'bg-purple-500/20' :
                                            'bg-gray-500/20'
                            }`}>
                            {infographic.type === 'flowchart' ? 'Fluxograma' :
                                infographic.type === 'timeline' ? 'Linha do Tempo' :
                                    infographic.type === 'comparison' ? 'Comparação' :
                                        infographic.type === 'hierarchy' ? 'Hierarquia' : 'Processo'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            {showControls && (
                <div className="bg-gray-50 border-b border-gray-200 p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleZoomIn}
                                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Zoom In"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handleZoomOut}
                                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Zoom Out"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handleReset}
                                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Reset"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>

                            <span className="text-sm text-gray-600 ml-2">
                                {Math.round(zoom * 100)}%
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleExport('png')}
                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Exportar PNG
                            </button>

                            <button
                                onClick={onShare}
                                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Compartilhar"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Infographic Container */}
            <div
                ref={containerRef}
                className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50"
                style={{ height: '600px' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: 'center center',
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                >
                    {infographic.elements.map(renderElement)}
                </div>
            </div>

            {/* Legend */}
            <div className="bg-gray-50 border-t border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Elementos interativos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Conectores</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Info className="w-4 h-4" />
                        <span>Clique nos elementos para interagir</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
