'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Brain,
    Code,
    Target,
    Clock,
    Star,
    ChevronDown,
    Play,
    CheckCircle,
    Zap
} from 'lucide-react';
import { useExpandedCourses, useExpandedExercises } from '@/hooks/useExpandedContent';
import { ExpandedExerciseCard } from '@/components/expanded-content/ExpandedExerciseCard';
import Link from 'next/link';

export default function ExpandedExercisesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');

    const { courses } = useExpandedCourses();
    const { exercises, loading, error } = useExpandedExercises(selectedCourse, selectedLevel, selectedType);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    const filteredExercises = exercises.filter(exercise => {
        if (!searchQuery.trim()) return true;
        return exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const getExerciseStats = () => {
        const stats = {
            total: exercises.length,
            practical: exercises.filter(e => e.type === 'practical').length,
            coding: exercises.filter(e => e.type === 'coding').length,
            byLevel: {
                iniciante: exercises.filter(e => e.difficulty === 'easy').length,
                intermediario: exercises.filter(e => e.difficulty === 'medium').length,
                avancado: exercises.filter(e => e.difficulty === 'hard').length}
        }
        return stats;
    }

    const stats = getExerciseStats();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-lg h-80"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar exercícios</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            🧠 Exercícios Interativos
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Pratique seus conhecimentos com exercícios práticos e de código.
                            Aprenda fazendo com desafios reais do mercado.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                            <div className="text-sm text-blue-800">Exercícios Disponíveis</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{stats.practical}</div>
                            <div className="text-sm text-green-800">Exercícios Práticos</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">{stats.coding}</div>
                            <div className="text-sm text-purple-800">Exercícios de Código</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">{stats.byLevel.avancado}</div>
                            <div className="text-sm text-orange-800">Nível Avançado</div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar exercícios..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-2">
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todos os cursos</option>
                                {courses.map(course => (
                                    <option key={course.slug} value={course.slug}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todos os níveis</option>
                                <option value="iniciante">Iniciante</option>
                                <option value="intermediario">Intermediário</option>
                                <option value="avancado">Avançado</option>
                            </select>

                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todos os tipos</option>
                                <option value="practical">Prático</option>
                                <option value="coding">Código</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredExercises.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchQuery || selectedCourse || selectedLevel || selectedType
                                ? 'Nenhum exercício encontrado'
                                : 'Nenhum exercício disponível'
                            }
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchQuery || selectedCourse || selectedLevel || selectedType
                                ? 'Tente ajustar sua busca ou filtros'
                                : 'Os exercícios estão sendo carregados...'
                            }
                        </p>
                        {(searchQuery || selectedCourse || selectedLevel || selectedType) && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCourse('');
                                    setSelectedLevel('');
                                    setSelectedType('');
                                }}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Exercícios Disponíveis
                                </h2>
                                <p className="text-gray-600">
                                    {filteredExercises.length} exercício{filteredExercises.length !== 1 ? 's' : ''} encontrado{filteredExercises.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        {/* Exercises Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredExercises.map((exercise) => (
                                <ExpandedExerciseCard
                                    key={exercise.id}
                                    exercise={exercise}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Por que praticar com nossos exercícios?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Exercícios práticos e interativos para acelerar seu aprendizado
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Brain className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Exercícios Práticos
                            </h3>
                            <p className="text-gray-600">
                                Desafios reais do mercado para aplicar seus conhecimentos
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Code className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Exercícios de Código
                            </h3>
                            <p className="text-gray-600">
                                Pratique programação com feedback imediato e correção automática
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Progressão Inteligente
                            </h3>
                            <p className="text-gray-600">
                                Exercícios organizados por dificuldade para evolução constante
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



