'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { navigationConfig } from '../../navigation-config';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import LessonTabs from './components/LessonTabs';
import CourseProgress from './components/CourseProgress';
import CourseNavigation from './components/CourseNavigation';
import { LessonMappingService } from './services/lesson-mapping';
import { CourseContent } from './types/course-types';
import { getCourseContent } from './index';
import { CourseProgress as CourseProgressType, ModuleProgress, LessonProgress } from './types/progress-types';


interface CoursePageEnhancedProps {
    courseId: string;
}

const CoursePageEnhanced: React.FC<CoursePageEnhancedProps> = ({ courseId }) => {
    const params = useSearchParams();
    const router = useRouter();
    const courseSlug = courseId;

    // Estado do curso
    const [course, setCourse] = useState<CourseContent | null>(null);
    const [currentModuleId, setCurrentModuleId] = useState<number>(1);
    const [currentLessonId, setCurrentLessonId] = useState<number>(1);
    const [lessonContent, setLessonContent] = useState<string>('');
    const [lessonTitle, setLessonTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Estado de progresso
    const [courseProgress, setCourseProgress] = useState<CourseProgressType>({
        courseId: courseSlug,
        userId: 'user-123', // TODO: Pegar do contexto de autenticação
        completedLessons: 0,
        totalLessons: 0,
        completedModules: 0,
        totalModules: 0,
        progressPercentage: 0,
        lastAccessed: new Date(),
        timeSpent: 0,
        status: 'not_started',
        totalTimeSpent: 0
    });

    // Estado das abas
    const [activeTab, setActiveTab] = useState<'content' | 'exercises' | 'projects' | 'quiz' | 'discussion'>('content');

    // Serviço de mapeamento
    const lessonMappingService = LessonMappingService.getInstance();

    // Carregar curso
    useEffect(() => {
        const courseContent = getCourseContent(courseSlug);
        if (courseContent) {
            setCourse(courseContent);
            console.log(`✅ Curso carregado: ${courseContent.title}`);
        } else {
            console.error(`❌ Curso não encontrado: ${courseSlug}`);
            setError(`Curso ${courseSlug} não encontrado`);
        }
    }, [courseSlug]);

    // Carregar conteúdo da aula
    useEffect(() => {
        if (course && currentModuleId && currentLessonId) {
            loadLessonContent(currentModuleId, currentLessonId);
        }
    }, [course, currentModuleId, currentLessonId]);

    // Função para limpar cache e recarregar
    const clearCacheAndReload = () => {
        console.log('🧹 Limpando cache e recarregando conteúdo...');
        // Limpar cache do localStorage se existir
        if (typeof window !== 'undefined') {
            localStorage.removeItem('lesson-cache');
            localStorage.removeItem('course-cache');
        }
        // Recarregar a página para forçar novo carregamento
        window.location.reload();
    };

    // Carregar conteúdo da aula
    const loadLessonContent = async (moduleId: number, lessonId: number) => {
        setIsLoading(true);
        setError(null);

        console.log(`🔄 Carregando aula ${lessonId} do módulo ${moduleId}`);

        // Encontrar o mapeamento da aula usando o ID local e módulo
        const lessonMapping = lessonMappingService.getLessonByModuleAndPosition(moduleId, lessonId);

        if (!lessonMapping) {
            setError(`Aula ${lessonId} do módulo ${moduleId} não encontrada no mapeamento`);
            setIsLoading(false);
            return;
        }

        console.log(`✅ Mapeamento encontrado: ${lessonMapping.fileName} (Global ID: ${lessonMapping.globalLessonId})`);

        // Fazer requisição para a API usando o globalLessonId com cache-busting
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(`/api/lessons/${courseSlug}/${moduleId}/${lessonMapping.globalLessonId}${cacheBuster}`);

        if (!response.ok) {
            if (response.status === 404) {
                setError('Aula não encontrada');
            } else {
                setError(`Erro ${response.status}: ${response.statusText}`);
            }
            setIsLoading(false);
            return;
        }

        const data = await response.json();

        if (data.error) {
            setError(data.error);
            setIsLoading(false);
            return;
        }

        // Atualizar o estado com o conteúdo da aula
        setLessonContent(data.content);
        setLessonTitle(data.lessonInfo.lessonTitle);
        console.log(`✅ Conteúdo da aula carregado: ${data.lessonInfo.lessonTitle}`);

        setIsLoading(false);
    };

    // Navegar para próxima aula
    const goToNextLesson = () => {
        // Encontrar a aula atual no mapeamento
        const currentLessonMapping = lessonMappingService.getLessonByModuleAndPosition(currentModuleId, currentLessonId);
        if (!currentLessonMapping) return;

        const nextLesson = lessonMappingService.getNextLesson(currentLessonMapping.globalLessonId);
        if (nextLesson) {
            console.log(`➡️ Navegando para próxima aula: ${nextLesson.globalLessonId} (${nextLesson.lessonTitle})`);
            setCurrentModuleId(nextLesson.moduleId);
            // Converter o globalLessonId para o ID local do módulo
            const localLessonId = lessonMappingService.getLessonPositionInModule(nextLesson.globalLessonId);
            setCurrentLessonId(localLessonId);

            // Atualizar URL
            router.push(`/course/${courseSlug}?module=${nextLesson.moduleId}&lesson=${localLessonId}`);
        }
    };

    // Navegar para aula anterior
    const goToPreviousLesson = () => {
        // Encontrar a aula atual no mapeamento
        const currentLessonMapping = lessonMappingService.getLessonByModuleAndPosition(currentModuleId, currentLessonId);
        if (!currentLessonMapping) return;

        const previousLesson = lessonMappingService.getPreviousLesson(currentLessonMapping.globalLessonId);
        if (previousLesson) {
            console.log(`⬅️ Navegando para aula anterior: ${previousLesson.globalLessonId} (${previousLesson.lessonTitle})`);
            setCurrentModuleId(previousLesson.moduleId);
            // Converter o globalLessonId para o ID local do módulo
            const localLessonId = lessonMappingService.getLessonPositionInModule(previousLesson.globalLessonId);
            setCurrentLessonId(localLessonId);

            // Atualizar URL
            router.push(`/course/${courseSlug}?module=${previousLesson.moduleId}&lesson=${localLessonId}`);
        }
    };

    // Navegar para aula específica
    const goToLesson = (moduleId: number, lessonId: number) => {
        console.log(`🎯 Navegando para aula ${lessonId} do módulo ${moduleId}`);
        setCurrentModuleId(moduleId);
        setCurrentLessonId(lessonId);

        // Atualizar URL
        router.push(`/course/${courseSlug}?module=${moduleId}&lesson=${lessonId}`);
    };

    // Abrir exercício na Fenix IDE
    const openExerciseInIDE = (exerciseId: string, exerciseTitle: string) => {
        console.log(`🚀 Abrindo exercício ${exerciseId}: ${exerciseTitle} na Fenix IDE`);

        // Redirecionar para a Fenix IDE com parâmetros do exercício
        const ideUrl = `/ide?exercise=${exerciseId}&title=${encodeURIComponent(exerciseTitle)}&course=${courseSlug}&lesson=${currentLessonId}`;
        router.push(ideUrl);
    };

    // Abrir projeto na Fenix IDE
    const openProjectInIDE = (projectId: string, projectTitle: string) => {
        console.log(`🚀 Abrindo projeto ${projectId}: ${projectTitle} na Fenix IDE`);

        // Redirecionar para a Fenix IDE com parâmetros do projeto
        const ideUrl = `/ide?project=${projectId}&title=${encodeURIComponent(projectTitle)}&course=${courseSlug}&lesson=${currentLessonId}`;
        router.push(ideUrl);
    };

    // Marcar aula como concluída
    const markLessonAsCompleted = (lessonId: number) => {
        setCourseProgress(prev => ({
            ...prev,
            completedLessons: prev.completedLessons + 1,
            lastAccessed: new Date()
        }));
    };

    // Verificar se aula está concluída
    const isLessonCompleted = (lessonId: number): boolean => {
        // Implementação simplificada - sempre retorna false por enquanto
        return false;
    };

    // Obter informações da aula atual
    const getCurrentLessonInfo = () => {
        const lessonMapping = lessonMappingService.getLessonByModuleAndPosition(currentModuleId, currentLessonId);
        if (!lessonMapping) return null;

        const module = course?.modules.find(m => m.id === lessonMapping.moduleId);
        const lesson = module?.lessons.find(l => l.id === currentLessonId);

        return {
            lessonMapping,
            module,
            lesson,
            isFirstLesson: currentLessonId === 1,
            isLastLesson: currentLessonId === lessonMappingService.getLessonsByModule(currentModuleId).length
        };
    };

    const currentLessonInfo = getCurrentLessonInfo();

    if (!course) {
        return <div className="p-8 text-center">Curso não encontrado</div>;
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="text-red-600 text-xl mb-4">❌ Erro ao carregar aula</div>
                <div className="text-gray-600 mb-4">{error}</div>
                <div className="space-x-4">
                    <button
                        onClick={() => loadLessonContent(currentModuleId, currentLessonId)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Tentar Novamente
                    </button>
                    <button
                        onClick={clearCacheAndReload}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    >
                        🧹 Limpar Cache e Recarregar
                    </button>
                </div>
            </div>
        );
    }

    // Renderizar conteúdo da aba ativa
    const renderTabContent = () => {
        switch (activeTab) {
            case 'content':
                return (
                    <div className="lesson-content">
                        {lessonContent ? (
                            <MarkdownRenderer content={lessonContent} />
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Selecione uma aula para ver o conteúdo</p>
                            </div>
                        )}
                    </div>
                );

            case 'exercises':
                return (
                    <div className="exercises-tab">
                        <h3 className="text-xl font-semibold mb-4">💪 Exercícios Práticos</h3>
                        {courseSlug === 'python-data-science' ? (
                            // Exercícios específicos para Python Data Science
                            <div className="space-y-4">
                                <div className="exercise-card bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-800 mb-2">🐍 Manipulação de Dados com Pandas</h4>
                                    <p className="text-sm text-gray-600 mb-3">Pratique operações básicas de limpeza e transformação de dados usando DataFrames.</p>
                                    <button
                                        onClick={() => openExerciseInIDE('pandas-basics', 'Manipulação de Dados com Pandas')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                    >
                                        Iniciar Exercício
                                    </button>
                                </div>

                                <div className="exercise-card bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-800 mb-2">📊 Visualização com Matplotlib</h4>
                                    <p className="text-sm text-gray-600 mb-3">Crie gráficos e visualizações para análise exploratória de dados.</p>
                                    <button
                                        onClick={() => openExerciseInIDE('matplotlib-viz', 'Visualização com Matplotlib')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                    >
                                        Iniciar Exercício
                                    </button>
                                </div>

                                <div className="exercise-card bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-800 mb-2">🔢 Análise Estatística com NumPy</h4>
                                    <p className="text-sm text-gray-600 mb-3">Calcule estatísticas descritivas e realize testes de hipótese.</p>
                                    <button
                                        onClick={() => openExerciseInIDE('numpy-stats', 'Análise Estatística com NumPy')}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                    >
                                        Iniciar Exercício
                                    </button>
                                </div>

                                <div className="exercise-card bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
                                    <h4 className="font-semibold text-orange-800 mb-2">🤖 Machine Learning Básico</h4>
                                    <p className="text-sm text-gray-600 mb-3">Implemente algoritmos de regressão e classificação simples.</p>
                                    <button
                                        onClick={() => openExerciseInIDE('ml-basics', 'Machine Learning Básico')}
                                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                    >
                                        Iniciar Exercício
                                    </button>
                                </div>

                                <div className="exercise-card bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
                                    <h4 className="font-semibold text-red-800 mb-2">🗄️ Consultas SQL para Dados</h4>
                                    <p className="text-sm text-gray-600 mb-3">Pratique consultas SQL para extração e análise de dados.</p>
                                    <button
                                        onClick={() => openExerciseInIDE('sql-data', 'Consultas SQL para Dados')}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                    >
                                        Iniciar Exercício
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Exercícios padrão para outros cursos
                            <div className="space-y-4">
                                <div className="exercise-card bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-800 mb-2">🌐 HTML e CSS Básico</h4>
                                    <p className="text-sm text-gray-600 mb-3">Crie uma página web responsiva com HTML5 e CSS3.</p>
                                    <button
                                        onClick={() => openExerciseInIDE('html-css-basic', 'HTML e CSS Básico')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                    >
                                        Iniciar Exercício
                                    </button>
                                </div>

                                <div className="exercise-card bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-800 mb-2">⚡ JavaScript Interativo</h4>
                                    <p className="text-sm text-gray-600 mb-3">Desenvolva funcionalidades interativas com JavaScript moderno.</p>
                                    <button
                                        onClick={() => openExerciseInIDE('js-interactive', 'JavaScript Interativo')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                    >
                                        Iniciar Exercício
                                    </button>
                                </div>

                                <div className="exercise-card bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-800 mb-2">⚛️ Componente React</h4>
                                    <p className="text-sm text-gray-600 mb-3">Crie um componente React reutilizável com hooks.</p>
                                    <button
                                        onClick={() => openExerciseInIDE('react-component', 'Componente React')}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                    >
                                        Iniciar Exercício
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'projects':
                return (
                    <div className="projects-tab">
                        <h3 className="text-xl font-semibold mb-4">🛠️ Projetos Práticos</h3>
                        {courseSlug === 'python-data-science' ? (
                            // Projetos específicos para Python Data Science
                            <div className="space-y-4">
                                <div className="project-card bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-800 mb-2">📈 Dashboard de Análise de Vendas</h4>
                                    <p className="text-sm text-gray-600 mb-3">Crie um dashboard interativo para análise de dados de vendas com Python.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectInIDE('sales-dashboard', 'Dashboard de Análise de Vendas')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Iniciar Projeto
                                        </button>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Dificuldade: Intermediário</span>
                                    </div>
                                </div>

                                <div className="project-card bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-800 mb-2">🤖 Sistema de Recomendação</h4>
                                    <p className="text-sm text-gray-600 mb-3">Desenvolva um sistema de recomendação usando algoritmos de ML.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectInIDE('recommendation-system', 'Sistema de Recomendação')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Iniciar Projeto
                                        </button>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Dificuldade: Avançado</span>
                                    </div>
                                </div>

                                <div className="project-card bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-800 mb-2">📊 Análise de Sentimentos</h4>
                                    <p className="text-sm text-gray-600 mb-3">Analise sentimentos em textos usando NLP e machine learning.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectInIDE('sentiment-analysis', 'Análise de Sentimentos')}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Iniciar Projeto
                                        </button>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Dificuldade: Avançado</span>
                                    </div>
                                </div>

                                <div className="project-card bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
                                    <h4 className="font-semibold text-orange-800 mb-2">🔍 Web Scraping e Análise</h4>
                                    <p className="text-sm text-gray-600 mb-3">Colete dados da web e realize análises exploratórias.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectInIDE('web-scraping', 'Web Scraping e Análise')}
                                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Iniciar Projeto
                                        </button>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Dificuldade: Intermediário</span>
                                    </div>
                                </div>

                                <div className="project-card bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
                                    <h4 className="font-semibold text-red-800 mb-2">📱 App de Análise de Dados</h4>
                                    <p className="text-sm text-gray-600 mb-3">Desenvolva uma aplicação web para análise de dados em tempo real.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectInIDE('data-app', 'App de Análise de Dados')}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Iniciar Projeto
                                        </button>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Dificuldade: Avançado</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Projetos padrão para outros cursos
                            <div className="space-y-4">
                                <div className="project-card bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-800 mb-2">🌐 Portfolio Pessoal</h4>
                                    <p className="text-sm text-gray-600 mb-3">Crie um portfolio profissional responsivo com HTML, CSS e JavaScript.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectInIDE('portfolio', 'Portfolio Pessoal')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Iniciar Projeto
                                        </button>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Dificuldade: Básico</span>
                                    </div>
                                </div>

                                <div className="project-card bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-800 mb-2">⚛️ App React Completo</h4>
                                    <p className="text-sm text-gray-600 mb-3">Desenvolva uma aplicação React com gerenciamento de estado e roteamento.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectInIDE('react-app', 'App React Completo')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Iniciar Projeto
                                        </button>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Dificuldade: Intermediário</span>
                                    </div>
                                </div>

                                <div className="project-card bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-800 mb-2">🚀 API RESTful</h4>
                                    <p className="text-sm text-gray-600 mb-3">Crie uma API RESTful completa com Node.js, Express e banco de dados.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectInIDE('rest-api', 'API RESTful')}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Iniciar Projeto
                                        </button>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Dificuldade: Avançado</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'quiz':
                return (
                    <div className="quiz-tab">
                        <h3 className="text-xl font-semibold mb-4">❓ Quiz de Conhecimento</h3>
                        <p className="text-gray-600 mb-4">Teste seus conhecimentos com perguntas sobre o conteúdo da aula.</p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-yellow-800 text-sm">🎯 Quiz em desenvolvimento. Em breve você poderá testar seus conhecimentos!</p>
                        </div>
                    </div>
                );

            case 'discussion':
                return (
                    <div className="discussion-tab">
                        <h3 className="text-xl font-semibold mb-4">💬 Discussão e Dúvidas</h3>
                        <p className="text-gray-600 mb-4">Compartilhe suas dúvidas e experiências com outros alunos.</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-800 text-sm">💭 Sistema de discussão em desenvolvimento. Em breve você poderá interagir com outros alunos!</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                {/* Header do Curso - Design Premium */}
                <div className="bg-white/80 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 sticky top-0 z-40">
                    <div className="px-8 py-8">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                            {course.title}
                                        </h1>
                                        <p className="text-lg text-gray-600 mt-2 max-w-3xl leading-relaxed">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Cards - Design Elegante */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">📚</span>
                                            <div>
                                                <div className="text-2xl font-bold text-blue-800">{course.total_modules}</div>
                                                <div className="text-sm text-blue-600 font-medium">Módulos</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">📖</span>
                                            <div>
                                                <div className="text-2xl font-bold text-green-800">{course.total_lessons}</div>
                                                <div className="text-sm text-green-600 font-medium">Aulas</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">⏱️</span>
                                            <div>
                                                <div className="text-2xl font-bold text-purple-800">{course.duration_hours}</div>
                                                <div className="text-sm text-purple-600 font-medium">Horas</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">🎯</span>
                                            <div>
                                                <div className="text-2xl font-bold text-orange-800">{course.level}</div>
                                                <div className="text-sm text-orange-600 font-medium">Nível</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Botão de Limpar Cache - Debug */}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={clearCacheAndReload}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                                        title="Limpar cache e recarregar conteúdo"
                                    >
                                        🧹 Limpar Cache
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar - Design Premium */}
                            <div className="ml-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200/50 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Progresso do Curso</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Módulos Completos</span>
                                        <span>{courseProgress.completedModules}/{courseProgress.totalModules}</span>
                                    </div>
                                    <div className="w-48 bg-gray-200 rounded-full h-3 shadow-inner">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                                            style={{ width: `${courseProgress.progressPercentage}%` }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-2xl font-bold text-blue-600">{courseProgress.progressPercentage}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {/* Sidebar de Navegação */}
                    <CourseNavigation
                        courseId={courseSlug}
                        currentModuleId={currentLessonInfo?.lessonMapping.moduleId}
                        currentLessonId={currentLessonInfo?.lessonMapping.globalLessonId}
                        onNavigate={(moduleId, lessonId) => {
                            const lessonMapping = lessonMappingService.getLessonByGlobalId(lessonId);
                            if (lessonMapping) {
                                setCurrentLessonId(lessonId);
                                setCurrentModuleId(moduleId);
                            }
                        }}
                    />

                    {/* Conteúdo Principal */}
                    <div className="flex-1 p-8">
                        {isLoading ? (
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto shadow-2xl flex items-center justify-center animate-pulse">
                                            <span className="text-4xl">📚</span>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-bounce">
                                            <span className="text-white text-sm">⚡</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                        Carregando Aula...
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>

                                        <p className="text-gray-600 text-lg">
                                            Preparando conteúdo interativo para você
                                        </p>

                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Header da Aula - Design Premium */}
                                <div className="mb-8 p-8 bg-gradient-to-r from-white to-blue-50/30 rounded-2xl border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                                                    <span className="text-xl">📚</span>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500 mb-2 font-medium">
                                                        🎯 Módulo {currentLessonInfo?.lessonMapping.moduleId} • 📖 Aula {currentLessonInfo?.lessonMapping.globalLessonId}
                                                    </div>
                                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                                                        {lessonTitle}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            {currentLessonInfo?.lesson && (
                                                <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl border border-gray-200/50">
                                                    <span className="text-sm text-gray-600 font-medium">
                                                        ⏱️ {currentLessonInfo.lesson.duration}
                                                    </span>
                                                </div>
                                            )}

                                            <button
                                                onClick={() => markLessonAsCompleted(currentLessonId)}
                                                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg ${isLessonCompleted(currentLessonId)
                                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500'
                                                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 border border-gray-200/50'
                                                    }`}
                                            >
                                                {isLessonCompleted(currentLessonId) ? '✅ Concluída' : '⭕ Marcar Concluída'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Navegação entre aulas - Design Elegante */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                                        <button
                                            onClick={goToPreviousLesson}
                                            disabled={currentLessonInfo?.isFirstLesson}
                                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-3 ${currentLessonInfo?.isFirstLesson
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500 shadow-lg'
                                                }`}
                                        >
                                            <span className="text-lg">←</span>
                                            <span>Aula Anterior</span>
                                        </button>

                                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200/50">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {currentLessonInfo?.lessonMapping.globalLessonId}
                                                </div>
                                                <div className="text-sm text-gray-600">de {lessonMappingService.getTotalLessons()}</div>
                                            </div>
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${((currentLessonInfo?.lessonMapping.globalLessonId || 1) / lessonMappingService.getTotalLessons()) * 100}%`
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={goToNextLesson}
                                            disabled={currentLessonInfo?.isLastLesson}
                                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-3 ${currentLessonInfo?.isLastLesson
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500 shadow-lg'
                                                }`}
                                        >
                                            <span>Próxima Aula</span>
                                            <span className="text-lg">→</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Conteúdo da Aula - Design Premium */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                                    <div className="prose max-w-none">
                                        {renderTabContent()}
                                    </div>
                                </div>

                                {/* Abas de Conteúdo - Design Elegante */}
                                <div className="mt-8">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
                                        <div className="border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50">
                                            <nav className="flex space-x-1 p-2">
                                                {[
                                                    { id: 'content', name: '📖 Conteúdo', icon: '📖' },
                                                    { id: 'exercises', name: '💪 Exercícios', icon: '💪' },
                                                    { id: 'projects', name: '🛠️ Projetos', icon: '🛠️' },
                                                    { id: 'quiz', name: '❓ Quiz', icon: '❓' },
                                                    { id: 'discussion', name: '💬 Discussão', icon: '💬' }
                                                ].map((tab) => (
                                                    <button
                                                        key={tab.id}
                                                        onClick={() => setActiveTab(tab.id as any)}
                                                        className={`flex-1 py-4 px-6 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${activeTab === tab.id
                                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <span className="text-lg">{tab.icon}</span>
                                                            <span className="hidden sm:inline">{tab.name}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </nav>
                                        </div>

                                        {/* Conteúdo das Abas - Design Interativo */}
                                        <div className="p-8">
                                            {activeTab === 'content' && (
                                                <div className="text-center py-12">
                                                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
                                                        <span className="text-4xl mb-4 block">📖</span>
                                                        <h3 className="text-xl font-semibold text-blue-800 mb-2">Conteúdo da Aula</h3>
                                                        <p className="text-blue-700">O conteúdo da aula está carregado acima nesta página</p>
                                                        <p className="text-sm text-blue-600 mt-2">Esta é a aba de conteúdo principal da aula</p>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'exercises' && (
                                                <div className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                                            💪 Exercícios Práticos
                                                        </h3>
                                                        <p className="text-gray-600 text-lg">Pratique o que aprendeu com exercícios interativos</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {courseSlug === 'python-data-science' ? (
                                                            // Exercícios específicos para Python Data Science
                                                            <>
                                                                <div className="exercise-card bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">🐍</div>
                                                                    <h4 className="font-bold text-blue-800 mb-3 text-lg">Manipulação de Dados com Pandas</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Pratique operações básicas de limpeza e transformação de dados usando DataFrames.</p>
                                                                    <button
                                                                        onClick={() => openExerciseInIDE('pandas-basics', 'Manipulação de Dados com Pandas')}
                                                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Exercício
                                                                    </button>
                                                                </div>

                                                                <div className="exercise-card bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">📊</div>
                                                                    <h4 className="font-bold text-green-800 mb-3 text-lg">Visualização com Matplotlib</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie gráficos e visualizações para análise exploratória de dados.</p>
                                                                    <button
                                                                        onClick={() => openExerciseInIDE('matplotlib-viz', 'Visualização com Matplotlib')}
                                                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Exercício
                                                                    </button>
                                                                </div>

                                                                <div className="exercise-card bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">🔢</div>
                                                                    <h4 className="font-bold text-purple-800 mb-3 text-lg">Análise Estatística com NumPy</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Calcule estatísticas descritivas e realize testes de hipótese.</p>
                                                                    <button
                                                                        onClick={() => openExerciseInIDE('numpy-stats', 'Análise Estatística com NumPy')}
                                                                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Exercício
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            // Exercícios padrão para outros cursos
                                                            <>
                                                                <div className="exercise-card bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">🌐</div>
                                                                    <h4 className="font-bold text-blue-800 mb-3 text-lg">HTML e CSS Básico</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie uma página web responsiva com HTML5 e CSS3.</p>
                                                                    <button
                                                                        onClick={() => openExerciseInIDE('html-css-basic', 'HTML e CSS Básico')}
                                                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Exercício
                                                                    </button>
                                                                </div>

                                                                <div className="exercise-card bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">⚡</div>
                                                                    <h4 className="font-bold text-green-800 mb-3 text-lg">JavaScript Interativo</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Desenvolva funcionalidades interativas com JavaScript moderno.</p>
                                                                    <button
                                                                        onClick={() => openExerciseInIDE('js-interactive', 'JavaScript Interativo')}
                                                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Exercício
                                                                    </button>
                                                                </div>

                                                                <div className="exercise-card bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">⚛️</div>
                                                                    <h4 className="font-bold text-purple-800 mb-3 text-lg">Componente React</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie um componente React reutilizável com hooks.</p>
                                                                    <button
                                                                        onClick={() => openExerciseInIDE('react-component', 'Componente React')}
                                                                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Exercício
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'projects' && (
                                                <div className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                                            🛠️ Projetos Práticos
                                                        </h3>
                                                        <p className="text-gray-600 text-lg">Desenvolva projetos completos para seu portfolio</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {courseSlug === 'python-data-science' ? (
                                                            // Projetos específicos para Python Data Science
                                                            <>
                                                                <div className="project-card bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">📈</div>
                                                                    <h4 className="font-bold text-blue-800 mb-3 text-lg">Dashboard de Análise de Vendas</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie um dashboard interativo para análise de dados de vendas com Python.</p>
                                                                    <div className="flex gap-2 mb-4">
                                                                        <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">Dificuldade: Intermediário</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => openProjectInIDE('sales-dashboard', 'Dashboard de Análise de Vendas')}
                                                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Projeto
                                                                    </button>
                                                                </div>

                                                                <div className="project-card bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">🤖</div>
                                                                    <h4 className="font-bold text-green-800 mb-3 text-lg">Sistema de Recomendação</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Desenvolva um sistema de recomendação usando algoritmos de ML.</p>
                                                                    <div className="flex gap-2 mb-4">
                                                                        <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">Dificuldade: Avançado</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => openProjectInIDE('recommendation-system', 'Sistema de Recomendação')}
                                                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Projeto
                                                                    </button>
                                                                </div>

                                                                <div className="project-card bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">📊</div>
                                                                    <h4 className="font-bold text-purple-800 mb-3 text-lg">Análise de Sentimentos</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Analise sentimentos em textos usando NLP e machine learning.</p>
                                                                    <div className="flex gap-2 mb-4">
                                                                        <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-medium">Dificuldade: Avançado</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => openProjectInIDE('sentiment-analysis', 'Análise de Sentimentos')}
                                                                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Projeto
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            // Projetos padrão para outros cursos
                                                            <>
                                                                <div className="project-card bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">🌐</div>
                                                                    <h4 className="font-bold text-blue-800 mb-3 text-lg">Portfolio Pessoal</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie um portfolio profissional responsivo com HTML, CSS e JavaScript.</p>
                                                                    <div className="flex gap-2 mb-4">
                                                                        <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">Dificuldade: Básico</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => openProjectInIDE('portfolio', 'Portfolio Pessoal')}
                                                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Projeto
                                                                    </button>
                                                                </div>

                                                                <div className="project-card bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">⚛️</div>
                                                                    <h4 className="font-bold text-green-800 mb-3 text-lg">App React Completo</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Desenvolva uma aplicação React com gerenciamento de estado e roteamento.</p>
                                                                    <div className="flex gap-2 mb-4">
                                                                        <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">Dificuldade: Intermediário</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => openProjectInIDE('react-app', 'App React Completo')}
                                                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Projeto
                                                                    </button>
                                                                </div>

                                                                <div className="project-card bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                                    <div className="text-3xl mb-4">🚀</div>
                                                                    <h4 className="font-bold text-purple-800 mb-3 text-lg">API RESTful</h4>
                                                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie uma API RESTful completa com Node.js, Express e banco de dados.</p>
                                                                    <div className="flex gap-2 mb-4">
                                                                        <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-medium">Dificuldade: Avançado</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => openProjectInIDE('rest-api', 'API RESTful')}
                                                                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                                    >
                                                                        🚀 Iniciar Projeto
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'quiz' && (
                                                <div className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
                                                            ❓ Quiz de Conhecimento
                                                        </h3>
                                                        <p className="text-gray-600 text-lg">Teste seus conhecimentos com perguntas sobre o conteúdo da aula</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="quiz-card bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                            <div className="text-3xl mb-4">🌐</div>
                                                            <h4 className="font-bold text-purple-800 mb-3 text-lg">Quiz: Fundamentos HTML</h4>
                                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Teste seus conhecimentos sobre HTML semântico</p>
                                                            <div className="flex items-center space-x-4 text-xs text-purple-600 mb-4">
                                                                <span>⏱️ 15 minutos</span>
                                                                <span>❓ 10 questões</span>
                                                                <span>🎯 70% para aprovação</span>
                                                            </div>
                                                            <button
                                                                onClick={() => openExerciseInIDE('html-quiz', 'Quiz: Fundamentos HTML')}
                                                                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                            >
                                                                🚀 Iniciar Quiz
                                                            </button>
                                                        </div>

                                                        <div className="quiz-card bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                            <div className="text-3xl mb-4">🎨</div>
                                                            <h4 className="font-bold text-purple-800 mb-3 text-lg">Quiz: CSS Layout</h4>
                                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Avalie seu domínio sobre Flexbox e Grid</p>
                                                            <div className="flex items-center space-x-4 text-xs text-purple-600 mb-4">
                                                                <span>⏱️ 20 minutos</span>
                                                                <span>❓ 15 questões</span>
                                                                <span>🎯 80% para aprovação</span>
                                                            </div>
                                                            <button
                                                                onClick={() => openExerciseInIDE('css-layout-quiz', 'Quiz: CSS Layout')}
                                                                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                            >
                                                                🚀 Iniciar Quiz
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'discussion' && (
                                                <div className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                                                            💬 Discussão e Comunidade
                                                        </h3>
                                                        <p className="text-gray-600 text-lg">Compartilhe suas dúvidas e experiências com outros alunos</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="discussion-card bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                            <div className="text-3xl mb-4">💬</div>
                                                            <h4 className="font-bold text-orange-800 mb-3 text-lg">Tópico: Melhores Práticas HTML</h4>
                                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Compartilhe suas experiências e aprenda com outros desenvolvedores</p>
                                                            <div className="flex items-center space-x-4 text-xs text-orange-600 mb-4">
                                                                <span>💬 12 comentários</span>
                                                                <span>👥 45 participantes</span>
                                                                <span>🔥 Ativo</span>
                                                            </div>
                                                            <button
                                                                onClick={() => openExerciseInIDE('html-discussion', 'Discussão: Melhores Práticas HTML')}
                                                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                            >
                                                                🚀 Participar na Discussão
                                                            </button>
                                                        </div>

                                                        <div className="discussion-card bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                            <div className="text-3xl mb-4">💭</div>
                                                            <h4 className="font-bold text-orange-800 mb-3 text-lg">Tópico: CSS vs Frameworks</h4>
                                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Debata sobre quando usar CSS puro vs frameworks como Bootstrap</p>
                                                            <div className="flex items-center space-x-4 text-xs text-orange-600 mb-4">
                                                                <span>💬 8 comentários</span>
                                                                <span>👥 23 participantes</span>
                                                                <span>🆕 Novo</span>
                                                            </div>
                                                            <button
                                                                onClick={() => openExerciseInIDE('css-frameworks-discussion', 'Discussão: CSS vs Frameworks')}
                                                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                                            >
                                                                🚀 Participar na Discussão
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer da Aula - Design Premium */}
                                <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg">
                                                <span className="text-sm text-gray-600">📁</span>
                                            </div>
                                            <div className="text-sm text-gray-600 font-medium">
                                                {currentLessonInfo?.lessonMapping.fileName}
                                            </div>
                                        </div>

                                        <div className="flex space-x-4">
                                            <button
                                                onClick={goToPreviousLesson}
                                                disabled={currentLessonInfo?.isFirstLesson}
                                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${currentLessonInfo?.isFirstLesson
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500 shadow-lg'
                                                    }`}
                                            >
                                                ← Aula Anterior
                                            </button>
                                            <button
                                                onClick={goToNextLesson}
                                                disabled={currentLessonInfo?.isLastLesson}
                                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${currentLessonInfo?.isLastLesson
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500 shadow-lg'
                                                    }`}
                                            >
                                                Próxima Aula →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePageEnhanced;

