'use client';

import React, { useState, useRef } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Target, Zap, Download, Share2, Settings, Play, Pause, RotateCcw } from 'lucide-react';

interface InteractiveInfographicsProps {
    className?: string;
    onDataUpdate?: (data: any) => void;
    onExport?: (format: 'png' | 'svg' | 'pdf') => void;
    onShare?: (url: string) => void;
}

interface InfographicData {
    title: string;
    type: 'bar' | 'line' | 'pie' | 'area';
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor?: string;
    }>;
}

const mockData: InfographicData = {
    title: 'Vendas Mensais 2024',
    type: 'bar',
    datasets: [
        {
            label: 'Vendas',
            data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 29000, 35000, 33000, 40000],
            backgroundColor: 'rgba(59, 130, 246, 0.8)'
        }
    ]
};

const chartTypes = [
    { value: 'bar', label: 'Barras', icon: BarChart3 },
    { value: 'line', label: 'Linha', icon: TrendingUp },
    { value: 'pie', label: 'Pizza', icon: PieChart },
    { value: 'area', label: 'Área', icon: Activity }
];

const colorPalettes = [
    { name: 'Azul', colors: ['#3B82F6', '#1D4ED8', '#1E40AF'] },
    { name: 'Verde', colors: ['#10B981', '#059669', '#047857'] },
    { name: 'Roxo', colors: ['#8B5CF6', '#7C3AED', '#6D28D9'] },
    { name: 'Laranja', colors: ['#F59E0B', '#D97706', '#B45309'] }
];

export function InteractiveInfographics({
    className = '',
    onDataUpdate,
    onExport,
    onShare
}: InteractiveInfographicsProps) {
    const [infographicData, setInfographicData] = useState<InfographicData>(mockData);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedPalette, setSelectedPalette] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleTypeChange = (newType: string) => {
        setInfographicData(prev => ({
            ...prev,
            type: newType as any
        }));
        onDataUpdate?.(infographicData);
    };

    const handlePaletteChange = (paletteIndex: number) => {
        setSelectedPalette(paletteIndex);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        setIsAnimating(!isAnimating);
    };

    const handleExport = (format: 'png' | 'svg' | 'pdf') => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dataURL = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.download = `infographic.${format}`;
        link.href = dataURL;
        link.click();

        onExport?.(format);
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        onShare?.(url);
    };

    const handleReset = () => {
        setInfographicData(mockData);
        setIsAnimating(false);
        setIsPlaying(false);
    };

    const getTypeIcon = (type: string) => {
        const chartType = chartTypes.find(t => t.value === type);
        return chartType ? chartType.icon : BarChart3;
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {React.createElement(getTypeIcon(infographicData.type), { className: "w-6 h-6 text-blue-500" })}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {infographicData.title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePlayPause}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title={isPlaying ? "Pausar" : "Reproduzir"}
                        >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Configurações"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tipo:
                        </label>
                        <select
                            value={infographicData.type}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {chartTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Paleta:
                        </label>
                        <div className="flex gap-1">
                            {colorPalettes.map((palette, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePaletteChange(index)}
                                    className={`w-6 h-6 rounded border-2 ${selectedPalette === index ? 'border-gray-900 dark:border-white' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    style={{ background: `linear-gradient(45deg, ${palette.colors.join(', ')})` }}
                                    title={palette.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={() => handleExport('png')}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <Download className="w-3 h-3" />
                            PNG
                        </button>
                        <button
                            onClick={handleShare}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <Share2 className="w-3 h-3" />
                            Compartilhar
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <RotateCcw className="w-3 h-3" />
                            Resetar
                        </button>
                    </div>
                </div>
            </div>

            {/* Chart Canvas */}
            <div className="p-4">
                <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={400}
                        className="w-full h-96"
                    />
                </div>

                {/* Data Summary */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            <span className="font-medium text-gray-900 dark:text-white">Total</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-500">
                            {infographicData.datasets[0]?.data.reduce((sum, value) => sum + value, 0).toLocaleString()}
                        </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-gray-900 dark:text-white">Média</span>
                        </div>
                        <div className="text-2xl font-bold text-green-500">
                            {Math.round(infographicData.datasets[0]?.data.reduce((sum, value) => sum + value, 0) / (infographicData.datasets[0]?.data.length || 1)).toLocaleString()}
                        </div>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-5 h-5 text-purple-500" />
                            <span className="font-medium text-gray-900 dark:text-white">Máximo</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-500">
                            {Math.max(...(infographicData.datasets[0]?.data || [0])).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





