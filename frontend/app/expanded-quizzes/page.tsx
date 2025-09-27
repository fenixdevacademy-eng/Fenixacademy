'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Brain,
    HelpCircle,
    Target,
    Clock,
    Star,
    ChevronDown,
    Play,
    CheckCircle,
    Zap,
    Award
} from 'lucide-react';
import { useExpandedCourses, useExpandedQuizzes } from '@/hooks/useExpandedContent';
import Link from 'next/link';

interface QuizCardProps {
    quiz: any;
    onStart?: () => void;
}

function QuizCard({ quiz, onStart }: QuizCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'bg-green-100 text-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'hard':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'multiple_choice':
                return <HelpCircle className="w-5 h-5" />;
            case 'true_false':
                return <CheckCircle className="w-5 h-5" />;
            default:
                return <Brain className="w-5 h-5" />;
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Quiz Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {getTypeIcon(quiz.type)}
                        <div>
                            <h3 className="font-semibold text-lg line-clamp-2">{quiz.question}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                                    {quiz.difficulty || 'Médio'}
                                </span>
                                <span className="text-purple-100 text-sm">
                                    {quiz.type === 'multiple_choice' ? 'Múltipla Escolha' : 'Verdadeiro/Falso'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-purple-100 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Quiz Interativo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quiz Content */}
            <div className="p-6">
                {/* Options Preview */}
                {quiz.options && quiz.options.length > 0 && (
                    <div className="mb-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 w-full text-left font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <span>Ver opções</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {isExpanded && (
                            <div className="mt-3 space-y-2">
                                {quiz.options.map((option: any, index: number) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                                            {option.letter}
                                        </span>
                                        <span>{option.text}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Quiz Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>{quiz.course_slug?.replace('-', ' ').toUpperCase() || 'Curso'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>{quiz.level?.charAt(0).toUpperCase() + quiz.level?.slice(1) || 'Nível'}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={onStart}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <Play className="w-4 h-4" />
                    <span>Iniciar Quiz</span>
                </button>
            </div>

            {/* Quiz Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Quiz Interativo</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 font-medium">Disponível</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ExpandedQuizzesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');

    const { courses } = useExpandedCourses();
    const { quizzes, loading, error } = useExpandedQuizzes(selectedCourse, selectedLevel, selectedType);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    const filteredQuizzes = quizzes.filter(quiz => {
        if (!searchQuery.trim()) return true;
        return quiz.question.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const getQuizStats = () => {
        const stats = {
            total: quizzes.length,
            multipleChoice: quizzes.filter(q => q.type === 'multiple_choice').length,
            trueFalse: quizzes.filter(q => q.type === 'true_false').length,
            byLevel: {
                iniciante: quizzes.filter(q => q.difficulty === 'easy').length,
                intermediario: quizzes.filter(q => q.difficulty === 'medium').length,
                avancado: quizzes.filter(q => q.difficulty === 'hard').length}
        }
        return stats;
    }

    const stats = getQuizStats();

    const handleStartQuiz = (quiz: any) => {
        // Implementar lógica para iniciar quiz
        console.log('Starting quiz:', quiz);
    }

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
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar quizzes</h2>
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
                            🧠 Quizzes Interativos
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Teste seus conhecimentos com quizzes dinâmicos.
                            Aprenda através de perguntas e respostas interativas.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
                            <div className="text-sm text-purple-800">Quizzes Disponíveis</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{stats.multipleChoice}</div>
                            <div className="text-sm text-blue-800">Múltipla Escolha</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{stats.trueFalse}</div>
                            <div className="text-sm text-green-800">Verdadeiro/Falso</div>
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
                                placeholder="Buscar quizzes..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-2">
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">Todos os níveis</option>
                                <option value="iniciante">Iniciante</option>
                                <option value="intermediario">Intermediário</option>
                                <option value="avancado">Avançado</option>
                            </select>

                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">Todos os tipos</option>
                                <option value="multiple_choice">Múltipla Escolha</option>
                                <option value="true_false">Verdadeiro/Falso</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredQuizzes.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchQuery || selectedCourse || selectedLevel || selectedType
                                ? 'Nenhum quiz encontrado'
                                : 'Nenhum quiz disponível'
                            }
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchQuery || selectedCourse || selectedLevel || selectedType
                                ? 'Tente ajustar sua busca ou filtros'
                                : 'Os quizzes estão sendo carregados...'
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
                                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
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
                                    Quizzes Disponíveis
                                </h2>
                                <p className="text-gray-600">
                                    {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} encontrado{filteredQuizzes.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        {/* Quizzes Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredQuizzes.map((quiz) => (
                                <QuizCard
                                    key={quiz.id}
                                    quiz={quiz}
                                    onStart={() => handleStartQuiz(quiz)}
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
                            Por que praticar com nossos quizzes?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Quizzes interativos para testar e consolidar seus conhecimentos
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HelpCircle className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Múltipla Escolha
                            </h3>
                            <p className="text-gray-600">
                                Questões com múltiplas opções para testar compreensão detalhada
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Verdadeiro/Falso
                            </h3>
                            <p className="text-gray-600">
                                Questões rápidas para testar conceitos fundamentais
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Feedback Imediato
                            </h3>
                            <p className="text-gray-600">
                                Respostas instantâneas para acelerar o aprendizado
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



