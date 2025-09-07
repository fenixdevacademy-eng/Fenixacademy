'use client';

import React, { useState, useEffect } from 'react';
import {
    Code,
    Check,
    Clock,
    Target,
    Trophy,
    BookOpen,
    Users,
    TrendingUp,
    CheckCircle,
    Timer,
    Zap,
    Award,
    Eye,
    Play,
    FileText
} from 'lucide-react';
import { getCS50Course, CS50Course } from '../data/cs50Courses';

interface CS50Progress {
    courseId: string;
    completedLessons: string[];
    completedExercises: string[];
    totalPoints: number;
    streak: number;
}

interface CS50EnhancedDisplayProps {
    courseId: string;
    moduleId?: string;
    lessonId?: string;
}

export default function CS50EnhancedDisplay({ courseId, moduleId, lessonId }: CS50EnhancedDisplayProps) {
    const [course, setCourse] = useState<CS50Course | null>(null);
    const [progress, setProgress] = useState<CS50Progress | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'content' | 'exercises' | 'projects' | 'progress'>('overview');
    const [selectedModule, setSelectedModule] = useState<string>('');
    const [selectedLesson, setSelectedLesson] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // Dados de exemplo CS50 (fallback)
    const cs50Data = getCS50Course(courseId);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);
                console.log('🔍 Buscando dados do curso:', courseId);

                // Simular um delay para mostrar o loading
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Usar dados reais do curso CS50
                const courseData = getCS50Course(courseId);
                if (courseData) {
                    console.log('✅ Dados do curso carregados:', courseData.name);
                    setCourse(courseData);
                } else {
                    console.log('⚠️ Curso não encontrado, usando dados padrão');
                    setCourse(cs50Data);
                }

                setProgress({
                    courseId,
                    completedLessons: [],
                    completedExercises: [],
                    totalPoints: 0,
                    streak: 0
                });

            } catch (error) {
                console.log('❌ Erro ao carregar dados:', error);
                setCourse(cs50Data);
                setProgress({
                    courseId,
                    completedLessons: [],
                    completedExercises: [],
                    totalPoints: 0,
                    streak: 0
                });
            } finally {
                console.log('✅ Finalizando loading');
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    const markLessonComplete = (lessonId: string) => {
        if (progress) {
            setProgress(prev => ({
                ...prev!,
                completedLessons: [...prev!.completedLessons, lessonId],
                totalPoints: prev!.totalPoints + 50
            }));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        🎓 Carregando Curso CS50...
                    </h2>
                    <p className="text-gray-600">Preparando conteúdo de qualidade Harvard</p>
                </div>
            </div>
        );
    }

    if (!course) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header CS50 */}
            <div className="bg-white shadow-lg border-b-4 border-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    🎓 {course.name}
                                </h1>
                                <p className="text-blue-600 font-medium">
                                    Padrão CS50 de Harvard - Excelência Acadêmica
                                </p>
                            </div>
                        </div>

                        {progress && (
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">
                                    {progress.totalPoints} pts
                                </div>
                                <div className="text-sm text-gray-600">
                                    Streak: {progress.streak} dias 🔥
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs de Navegação CS50 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-xl shadow-lg p-2">
                    <nav className="flex space-x-1">
                        {[
                            { id: 'overview', label: 'Visão Geral', icon: BookOpen },
                            { id: 'lessons', label: 'Aulas CS50', icon: Target },
                            { id: 'content', label: 'Conteúdo', icon: FileText },
                            { id: 'exercises', label: 'Exercícios', icon: Zap },
                            { id: 'projects', label: 'Projetos', icon: Award },
                            { id: 'progress', label: 'Progresso', icon: TrendingUp }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Conteúdo das Tabs */}
                <div className="mt-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Casos Reais Brasileiros */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Users className="w-6 h-6 mr-3 text-blue-600" />
                                    💼 Casos Reais do Mercado Brasileiro
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {course.realWorldCases.map((case_, index) => (
                                        <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                                            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                                🏢 {case_.company}
                                            </h3>
                                            <p className="text-gray-700 mb-3">{case_.description}</p>
                                            <div className="space-y-2 text-sm">
                                                <div><span className="font-medium">Tecnologia:</span> {case_.technology}</div>
                                                <div><span className="font-medium">Impacto:</span> {case_.impact}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                                                         {/* Módulos do Curso */}
                             <div className="bg-white rounded-xl shadow-lg p-6">
                                 <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                     <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                                     📚 Módulos do Curso ({course.modules.length} módulos, {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas)
                                 </h2>
                                 
                                 {/* Estatísticas do Curso */}
                                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                     <div className="bg-blue-50 p-4 rounded-lg text-center">
                                         <div className="text-2xl font-bold text-blue-600">{course.modules.length}</div>
                                         <div className="text-blue-800 font-medium">Módulos</div>
                                     </div>
                                     <div className="bg-green-50 p-4 rounded-lg text-center">
                                         <div className="text-2xl font-bold text-green-600">{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}</div>
                                         <div className="text-green-800 font-medium">Aulas</div>
                                     </div>
                                     <div className="bg-purple-50 p-4 rounded-lg text-center">
                                         <div className="text-2xl font-bold text-purple-600">{course.modules.reduce((acc, m) => acc + m.lessons.reduce((sum, l) => sum + l.exercises.length, 0), 0)}</div>
                                         <div className="text-purple-800 font-medium">Exercícios</div>
                                     </div>
                                     <div className="bg-orange-50 p-4 rounded-lg text-center">
                                         <div className="text-2xl font-bold text-orange-600">{course.totalPoints}</div>
                                         <div className="text-orange-800 font-medium">Pontos Totais</div>
                                     </div>
                                 </div>

                                 <div className="space-y-4 max-h-96 overflow-y-auto">
                                     {course.modules.map((module) => (
                                         <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                             <div className="flex justify-between items-start">
                                                 <div className="flex-1">
                                                     <div className="flex items-center space-x-3 mb-2">
                                                         <span className="text-sm font-medium text-gray-500">Módulo {module.id}</span>
                                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                             module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                                                             module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                                 'bg-red-100 text-red-800'
                                                         }`}>
                                                             {module.difficulty === 'beginner' ? 'Iniciante' :
                                                              module.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                                         </span>
                                                     </div>
                                                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                         {module.name}
                                                     </h3>
                                                     <p className="text-gray-600 mb-3">{module.description}</p>
                                                     <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                         <span className="flex items-center">
                                                             <Clock className="w-4 h-4 mr-1" />
                                                             {Math.round(module.totalDuration / 60)}h {module.totalDuration % 60}min
                                                         </span>
                                                         <span className="flex items-center">
                                                             <Target className="w-4 h-4 mr-1" />
                                                             {module.totalPoints} pts
                                                         </span>
                                                         <span className="flex items-center">
                                                             <BookOpen className="w-4 h-4 mr-1" />
                                                             {module.lessons.length} aulas
                                                         </span>
                                                     </div>
                                                 </div>
                                                 <div className="flex space-x-2 ml-4">
                                                     <button
                                                         onClick={() => {
                                                             setSelectedModule(module.id);
                                                             setActiveTab('lessons');
                                                         }}
                                                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                                     >
                                                         Ver Aulas
                                                     </button>
                                                     <button
                                                         onClick={() => {
                                                             setSelectedModule(module.id);
                                                             setActiveTab('content');
                                                         }}
                                                         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                     >
                                                         Ver Conteúdo
                                                     </button>
                                                 </div>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                        </div>
                    )}

                                         {activeTab === 'lessons' && (
                         <div className="space-y-6">
                             {course.modules
                                 .filter(module => !selectedModule || module.id === selectedModule)
                                 .map((module) => (
                                     <div key={module.id} className="bg-white rounded-xl shadow-lg p-6">
                                         <div className="mb-6">
                                             <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                                                 <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                                                 📖 Módulo {module.id}: {module.name}
                                             </h2>
                                             <p className="text-gray-600 text-lg mb-4">{module.description}</p>
                                             
                                             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                                 <div className="bg-blue-50 p-4 rounded-lg">
                                                     <div className="text-blue-600 font-semibold mb-2">📚 Aulas</div>
                                                     <div className="text-2xl font-bold text-blue-800">{module.lessons.length}</div>
                                                 </div>
                                                 <div className="bg-green-50 p-4 rounded-lg">
                                                     <div className="text-green-600 font-semibold mb-2">⏱️ Duração</div>
                                                     <div className="text-2xl font-bold text-green-800">{Math.round(module.totalDuration / 60)}h {module.totalDuration % 60}min</div>
                                                 </div>
                                                 <div className="bg-purple-50 p-4 rounded-lg">
                                                     <div className="text-purple-600 font-semibold mb-2">🧪 Exercícios</div>
                                                     <div className="text-2xl font-bold text-purple-800">{module.lessons.reduce((acc, l) => acc + l.exercises.length, 0)}</div>
                                                 </div>
                                                 <div className="bg-orange-50 p-4 rounded-lg">
                                                     <div className="text-orange-600 font-semibold mb-2">🏆 Pontos</div>
                                                     <div className="text-2xl font-bold text-orange-800">{module.totalPoints}</div>
                                                 </div>
                                             </div>

                                             <div className={`px-3 py-2 rounded-full text-sm font-medium inline-block ${
                                                 module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                                                 module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                     'bg-red-100 text-red-800'
                                             }`}>
                                                 Nível: {module.difficulty === 'beginner' ? 'Iniciante' :
                                                          module.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                             </div>
                                         </div>

                                         <div className="space-y-6 max-h-96 overflow-y-auto">
                                             {module.lessons.map((lesson, lessonIndex) => (
                                                 <div key={lesson.id} className="border border-gray-200 rounded-lg p-6">
                                                     <div className="flex justify-between items-start mb-4">
                                                         <div className="flex-1">
                                                             <div className="flex items-center space-x-3 mb-2">
                                                                 <span className="text-sm font-medium text-gray-500">Aula {lesson.id}</span>
                                                                 <span className="text-sm font-medium text-gray-500">#{lessonIndex + 1}</span>
                                                             </div>
                                                             <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                                 🎯 {lesson.title}
                                                             </h3>
                                                             <p className="text-gray-600 mb-3">{lesson.description}</p>
                                                             <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                                                 <span className="flex items-center">
                                                                     <Clock className="w-4 h-4 mr-1" />
                                                                     {lesson.duration} min
                                                                 </span>
                                                                 <span className="flex items-center">
                                                                     <Zap className="w-4 h-4 mr-1" />
                                                                     {lesson.exercises.length} exercícios
                                                                 </span>
                                                                 <span className="flex items-center">
                                                                     <Target className="w-4 h-4 mr-1" />
                                                                     {lesson.exercises.reduce((acc, ex) => acc + ex.points, 0)} pts
                                                                 </span>
                                                             </div>
                                                         </div>

                                                         <div className="flex space-x-2">
                                                             <button
                                                                 onClick={() => {
                                                                     setSelectedLesson(lesson.id);
                                                                     setActiveTab('content');
                                                                 }}
                                                                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                             >
                                                                 Ver Conteúdo
                                                             </button>
                                                             <button
                                                                 onClick={() => {
                                                                     setSelectedLesson(lesson.id);
                                                                     setActiveTab('exercises');
                                                                 }}
                                                                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                                             >
                                                                 Ver Exercícios
                                                             </button>
                                                             <button
                                                                 onClick={() => markLessonComplete(lesson.id)}
                                                                 className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                                                             >
                                                                 <Check className="w-4 h-4" />
                                                             </button>
                                                         </div>
                                                     </div>

                                                     {/* Estrutura da Aula CS50 */}
                                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                         <div className="bg-blue-50 p-4 rounded-lg">
                                                             <h4 className="font-semibold text-blue-900 mb-2">🎬 Abertura (2-3 min)</h4>
                                                             <p className="text-blue-800 text-sm">Hook visual e pergunta provocativa</p>
                                                         </div>
                                                         <div className="bg-green-50 p-4 rounded-lg">
                                                             <h4 className="font-semibold text-green-900 mb-2">🏗️ Desenvolvimento (15-20 min)</h4>
                                                             <p className="text-green-800 text-sm">Conceitos + exemplos + exercícios</p>
                                                         </div>
                                                         <div className="bg-purple-50 p-4 rounded-lg">
                                                             <h4 className="font-semibold text-purple-900 mb-2">🎯 Aplicação (10-15 min)</h4>
                                                             <p className="text-purple-800 text-sm">Problema real + solução passo a passo</p>
                                                         </div>
                                                         <div className="bg-orange-50 p-4 rounded-lg">
                                                             <h4 className="font-semibold text-orange-900 mb-2">📝 Conclusão (3-5 min)</h4>
                                                             <p className="text-orange-800 text-sm">Resumo visual + próximos passos</p>
                                                         </div>
                                                     </div>
                                                 </div>
                                             ))}
                                         </div>
                                     </div>
                                 ))}
                         </div>
                     )}

                    {activeTab === 'content' && (
                        <div className="space-y-6">
                            {course.modules
                                .filter(module => !selectedModule || module.id === selectedModule)
                                .map((module) => (
                                    <div key={module.id} className="bg-white rounded-xl shadow-lg p-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                            <FileText className="w-6 h-6 mr-3 text-blue-600" />
                                            📚 Conteúdo das Aulas - {module.name}
                                        </h2>

                                        <div className="space-y-6">
                                            {module.lessons
                                                .filter(lesson => !selectedLesson || lesson.id === selectedLesson)
                                                .map((lesson) => (
                                                    <div key={lesson.id} className="border border-gray-200 rounded-lg p-6">
                                                        <div className="mb-6">
                                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                                                🎯 {lesson.title}
                                                            </h3>
                                                            <p className="text-gray-600 text-lg mb-4">{lesson.description}</p>

                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                                    <div className="text-blue-600 font-semibold mb-2">⏱️ Duração</div>
                                                                    <div className="text-2xl font-bold text-blue-800">{lesson.duration} min</div>
                                                                </div>
                                                                <div className="bg-green-50 p-4 rounded-lg">
                                                                    <div className="text-green-600 font-semibold mb-2">🎯 Objetivos</div>
                                                                    <div className="text-2xl font-bold text-green-800">{lesson.learningObjectives.length}</div>
                                                                </div>
                                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                                    <div className="text-purple-600 font-semibold mb-2">🧪 Exercícios</div>
                                                                    <div className="text-2xl font-bold text-purple-800">{lesson.exercises.length}</div>
                                                                </div>
                                                            </div>

                                                            {/* Objetivos de Aprendizado */}
                                                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                                                <h4 className="font-semibold text-gray-900 mb-3">🎯 Objetivos de Aprendizado</h4>
                                                                <ul className="space-y-2">
                                                                    {lesson.learningObjectives.map((objective, index) => (
                                                                        <li key={index} className="flex items-start">
                                                                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                                            <span className="text-gray-700">{objective}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* Pré-requisitos */}
                                                            {lesson.prerequisites.length > 0 && (
                                                                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                                                                    <h4 className="font-semibold text-yellow-900 mb-3">📋 Pré-requisitos</h4>
                                                                    <ul className="space-y-2">
                                                                        {lesson.prerequisites.map((prereq, index) => (
                                                                            <li key={index} className="flex items-start">
                                                                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                                                <span className="text-yellow-800">{prereq}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Conteúdo da Aula */}
                                                        <div className="prose prose-lg max-w-none">
                                                            <div
                                                                className="markdown-content"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: lesson.content.replace(/\n/g, '<br>').replace(/#{1,6}\s+(.+)/g, '<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code>$1</code>')
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    {activeTab === 'exercises' && (
                        <div className="space-y-6">
                            {course.modules
                                .filter(module => !selectedModule || module.id === selectedModule)
                                .map((module) => (
                                    <div key={module.id} className="bg-white rounded-xl shadow-lg p-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                            <Zap className="w-6 h-6 mr-3 text-blue-600" />
                                            ⚡ Exercícios CS50 - {module.name}
                                        </h2>

                                        <div className="space-y-6">
                                            {module.lessons
                                                .filter(lesson => !selectedLesson || lesson.id === selectedLesson)
                                                .map((lesson) => (
                                                    <div key={lesson.id} className="border border-gray-200 rounded-lg p-6">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                            🎯 {lesson.title}
                                                        </h3>

                                                        <p className="text-gray-600 mb-4">{lesson.description}</p>

                                                        <div className="space-y-4">
                                                            {lesson.exercises.map((exercise) => (
                                                                <div key={exercise.id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg border border-gray-200">
                                                                    <div className="flex justify-between items-start mb-4">
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center space-x-3 mb-2">
                                                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${exercise.type === 'quick' ? 'bg-green-100 text-green-800' :
                                                                                    exercise.type === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                                                        'bg-red-100 text-red-800'
                                                                                    }`}>
                                                                                    {exercise.type === 'quick' ? '🎮 Rápido' :
                                                                                        exercise.type === 'intermediate' ? '🏆 Intermediário' :
                                                                                            '🚀 Avançado'}
                                                                                </span>
                                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${exercise.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                                                        exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                                            'bg-red-100 text-red-800'
                                                                                    }`}>
                                                                                    {exercise.difficulty === 'easy' ? 'Fácil' :
                                                                                        exercise.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                                                                                </span>
                                                                                <span className="text-sm text-gray-500">
                                                                                    {exercise.timeLimit} min
                                                                                </span>
                                                                                <span className="text-sm text-gray-500">
                                                                                    {exercise.points} pts
                                                                                </span>
                                                                            </div>
                                                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                                                {exercise.title}
                                                                            </h4>
                                                                            <p className="text-gray-700 mb-3">{exercise.description}</p>

                                                                            {/* Contexto do Exercício */}
                                                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                                                                <h5 className="font-medium text-blue-900 mb-2">🎯 Contexto</h5>
                                                                                <p className="text-blue-800 text-sm">{exercise.context}</p>
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex space-x-2">
                                                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                                                                <Code className="w-4 h-4 mr-2" />
                                                                                Abrir Editor
                                                                            </button>
                                                                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                                                                                <Eye className="w-4 h-4 mr-2" />
                                                                                Ver Solução
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    {/* Dicas */}
                                                                    <div className="mt-4">
                                                                        <h5 className="font-medium text-gray-900 mb-2">
                                                                            💡 Dicas ({exercise.hints.length})
                                                                        </h5>
                                                                        <div className="space-y-1">
                                                                            {exercise.hints.map((hint, index) => (
                                                                                <div key={index} className="text-sm text-gray-600 flex items-center">
                                                                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                                                    {hint}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    {activeTab === 'progress' && progress && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                                    📊 Seu Progresso CS50
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">
                                            {progress.totalPoints}
                                        </div>
                                        <div className="text-blue-800 font-medium">Pontos Totais</div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg text-center">
                                        <div className="text-3xl font-bold text-green-600 mb-2">
                                            {progress.completedLessons.length}
                                        </div>
                                        <div className="text-green-800 font-medium">Aulas Concluídas</div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                                        <div className="text-3xl font-bold text-purple-600 mb-2">
                                            {progress.completedExercises.length}
                                        </div>
                                        <div className="text-purple-800 font-medium">Exercícios Concluídos</div>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                                        <div className="text-3xl font-bold text-orange-600 mb-2">
                                            {progress.streak}
                                        </div>
                                        <div className="text-orange-800 font-medium">Dias de Streak 🔥</div>
                                    </div>
                                </div>

                                {/* Barra de Progresso */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {Math.round((progress.completedLessons.length / course.modules.reduce((acc, m) => acc + m.lessons.length, 0)) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${(progress.completedLessons.length / course.modules.reduce((acc, m) => acc + m.lessons.length, 0)) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
