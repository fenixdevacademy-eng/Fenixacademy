'use client';

import React, { useState, useEffect } from 'react';
import { Code, Globe, CheckCircle, AlertCircle } from 'lucide-react';

interface Language {
    id: string;
    name: string;
    extension: string;
    icon: string;
    syntax: string;
    features: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    popularity: number;
}

const languages: Language[] = [
    {
        id: 'javascript',
        name: 'JavaScript',
        extension: '.js',
        icon: '🟨',
        syntax: 'javascript',
        features: ['Web Development', 'Node.js', 'React', 'Vue', 'Angular'],
        difficulty: 'beginner',
        popularity: 95
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        extension: '.ts',
        icon: '🔷',
        syntax: 'typescript',
        features: ['Type Safety', 'Modern JS', 'Angular', 'React', 'Node.js'],
        difficulty: 'intermediate',
        popularity: 85
    },
    {
        id: 'python',
        name: 'Python',
        extension: '.py',
        icon: '🐍',
        syntax: 'python',
        features: ['Data Science', 'AI/ML', 'Web Backend', 'Automation', 'Django'],
        difficulty: 'beginner',
        popularity: 90
    },
    {
        id: 'java',
        name: 'Java',
        extension: '.java',
        icon: '☕',
        syntax: 'java',
        features: ['Enterprise', 'Android', 'Spring', 'Microservices', 'Banking'],
        difficulty: 'intermediate',
        popularity: 80
    },
    {
        id: 'csharp',
        name: 'C#',
        extension: '.cs',
        icon: '🔷',
        syntax: 'csharp',
        features: ['.NET', 'Unity', 'Windows', 'Web API', 'Desktop Apps'],
        difficulty: 'intermediate',
        popularity: 75
    },
    {
        id: 'cpp',
        name: 'C++',
        extension: '.cpp',
        icon: '⚡',
        syntax: 'cpp',
        features: ['System Programming', 'Games', 'Performance', 'Embedded', 'OS'],
        difficulty: 'advanced',
        popularity: 70
    },
    {
        id: 'go',
        name: 'Go',
        extension: '.go',
        icon: '🐹',
        syntax: 'go',
        features: ['Microservices', 'Cloud', 'Docker', 'Kubernetes', 'Performance'],
        difficulty: 'intermediate',
        popularity: 65
    },
    {
        id: 'rust',
        name: 'Rust',
        extension: '.rs',
        icon: '🦀',
        syntax: 'rust',
        features: ['Memory Safety', 'Performance', 'WebAssembly', 'System', 'Blockchain'],
        difficulty: 'advanced',
        popularity: 60
    },
    {
        id: 'php',
        name: 'PHP',
        extension: '.php',
        icon: '🐘',
        syntax: 'php',
        features: ['Web Development', 'WordPress', 'Laravel', 'E-commerce', 'CMS'],
        difficulty: 'beginner',
        popularity: 70
    },
    {
        id: 'ruby',
        name: 'Ruby',
        extension: '.rb',
        icon: '💎',
        syntax: 'ruby',
        features: ['Web Development', 'Rails', 'Scripting', 'Automation', 'Testing'],
        difficulty: 'beginner',
        popularity: 55
    }
];

interface LanguageSupportProps {
    selectedLanguages?: string[];
    onLanguageSelect?: (languages: string[]) => void;
    className?: string;
    showFeatures?: boolean;
    showDifficulty?: boolean;
    showPopularity?: boolean;
}

export function LanguageSupport({
    selectedLanguages = [],
    onLanguageSelect,
    className = '',
    showFeatures = true,
    showDifficulty = true,
    showPopularity = true
}: LanguageSupportProps) {
    const [selected, setSelected] = useState<string[]>(selectedLanguages);
    const [filter, setFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'difficulty'>('popularity');

    useEffect(() => {
        setSelected(selectedLanguages);
    }, [selectedLanguages]);

    const filteredLanguages = languages
        .filter(lang =>
            lang.name.toLowerCase().includes(filter.toLowerCase()) ||
            lang.features.some(feature =>
                feature.toLowerCase().includes(filter.toLowerCase())
            )
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'popularity':
                    return b.popularity - a.popularity;
                case 'difficulty':
                    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                default:
                    return 0;
            }
        });

    const handleLanguageToggle = (languageId: string) => {
        const newSelected = selected.includes(languageId)
            ? selected.filter(id => id !== languageId)
            : [...selected, languageId];

        setSelected(newSelected);
        onLanguageSelect?.(newSelected);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'text-green-500 bg-green-100';
            case 'intermediate':
                return 'text-yellow-500 bg-yellow-100';
            case 'advanced':
                return 'text-red-500 bg-red-100';
            default:
                return 'text-gray-500 bg-gray-100';
        }
    };

    const getPopularityColor = (popularity: number) => {
        if (popularity >= 80) return 'text-green-500';
        if (popularity >= 60) return 'text-yellow-500';
        return 'text-gray-500';
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
            <div className="flex items-center gap-2 mb-6">
                <Code className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Suporte a Linguagens
                </h3>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Buscar linguagens ou recursos..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="popularity">Popularidade</option>
                        <option value="name">Nome</option>
                        <option value="difficulty">Dificuldade</option>
                    </select>
                </div>

                {selected.length > 0 && (
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selected.length} linguagem{selected.length !== 1 ? 's' : ''} selecionada{selected.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                )}
            </div>

            {/* Languages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLanguages.map((language) => (
                    <div
                        key={language.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selected.includes(language.id)
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        onClick={() => handleLanguageToggle(language.id)}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{language.icon}</span>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {language.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {language.extension}
                                    </p>
                                </div>
                            </div>
                            {selected.includes(language.id) && (
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                            )}
                        </div>

                        {showFeatures && (
                            <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                    {language.features.slice(0, 3).map((feature, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                    {language.features.length > 3 && (
                                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                            +{language.features.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                            {showDifficulty && (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(language.difficulty)}`}>
                                    {language.difficulty}
                                </span>
                            )}
                            {showPopularity && (
                                <span className={`font-medium ${getPopularityColor(language.popularity)}`}>
                                    {language.popularity}%
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredLanguages.length === 0 && (
                <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                        Nenhuma linguagem encontrada para "{filter}"
                    </p>
                </div>
            )}
        </div>
    );
}