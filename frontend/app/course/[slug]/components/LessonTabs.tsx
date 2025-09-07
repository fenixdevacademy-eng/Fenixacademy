'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    Code,
    Target,
    Zap,
    FileText,
    Trophy,
    MessageSquare,
    Play,
    CheckCircle,
    Clock,
    Star
} from 'lucide-react';

interface Exercise {
    id: number;
    title: string;
    type: "quiz" | "practical" | "challenge";
    description: string;
    questions?: Question[];
    instructions?: string[];
    expectedOutcome?: string;
    requirements?: string[];
    difficulty?: string;
    estimatedTime?: string;
    bonusPoints?: number;
}

interface Question {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

interface Project {
    id: number;
    title: string;
    type: "individual" | "group";
    description: string;
    objectives: string[];
    deliverables: string[];
    technologies: string[];
    estimatedTime: string;
    difficulty: string;
    submissionDate: string;
    maxScore: number;
}

interface FenixIDE {
    enabled: boolean;
    defaultCode: string;
    challenges: Challenge[];
    features: IDEFeatures;
    templates: Template[];
}

interface Challenge {
    title: string;
    description: string;
    hints: string[];
    difficulty: string;
    estimatedTime: string;
}

interface IDEFeatures {
    livePreview: boolean;
    autoSave: boolean;
    collaboration: boolean;
    syntaxHighlighting: boolean;
    codeCompletion: boolean;
    errorChecking: boolean;
    themes: string[];
    fontSize: string;
}

interface Template {
    name: string;
    description: string;
    code: string;
}

interface Resource {
    title: string;
    url: string;
    description: string;
    type: "documentation" | "tutorial" | "blog" | "tool" | "curso" | "vídeo";
    difficulty: "iniciante" | "intermediário" | "avançado" | "todos";
    language: "pt-BR" | "en" | "es";
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
}

interface Progress {
    contentCompleted: boolean;
    exercisesCompleted: number;
    projectsCompleted: number;
    challengesCompleted: number;
    totalScore: number;
    maxScore: number;
    timeSpent: number;
    lastAccessed: string | null;
}

interface LessonTabsProps {
    lesson: {
        id: number;
        title: string;
        content: string;
        exercises: Exercise[];
        projects: Project[];
        fenixIDE: FenixIDE;
        resources: Resource[];
        progress: Progress;
        achievements: Achievement[];
    };
}

export default function LessonTabs({ lesson }: LessonTabsProps) {
    const [activeTab, setActiveTab] = useState('content');
    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
    const [showResults, setShowResults] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [code, setCode] = useState(lesson.fenixIDE?.defaultCode || '');

    const tabs = [
        { id: 'content', label: '📚 Conteúdo', icon: BookOpen },
        { id: 'exercises', label: '💻 Exercícios', icon: Code },
        { id: 'projects', label: '🎯 Projetos', icon: Target },
        { id: 'fenixIDE', label: '⚡ Fenix IDE 2.0', icon: Zap },
        { id: 'resources', label: '📖 Recursos', icon: FileText },
        { id: 'achievements', label: '🏆 Conquistas', icon: Trophy },
        { id: 'progress', label: '📊 Progresso', icon: MessageSquare },
    ];

    const handleQuizSubmit = () => {
        setShowResults(true);
    };

    const calculateQuizScore = () => {
        let correct = 0;
        let total = 0;

        lesson.exercises.forEach(exercise => {
            if (exercise.type === 'quiz' && exercise.questions) {
                exercise.questions.forEach((question, index) => {
                    total++;
                    if (quizAnswers[exercise.id * 100 + index] === question.correct) {
                        correct++;
                    }
                });
            }
        });

        return { correct, total, percentage: Math.round((correct / total) * 100) };
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty?.toLowerCase()) {
            case 'fácil':
            case 'iniciante':
                return 'bg-green-100 text-green-800';
            case 'médio':
            case 'intermediário':
                return 'bg-yellow-100 text-yellow-800';
            case 'difícil':
            case 'avançado':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'quiz':
                return '❓';
            case 'practical':
                return '🔧';
            case 'challenge':
                return '🎯';
            default:
                return '📝';
        }
    };

    const getResourceIcon = (type: string) => {
        switch (type) {
            case 'documentation':
                return '📚';
            case 'tutorial':
                return '🎓';
            case 'blog':
                return '📝';
            case 'tool':
                return '🛠️';
            case 'curso':
                return '🎯';
            case 'vídeo':
                return '🎥';
            default:
                return '📖';
        }
    };

    const renderContent = () => (
        <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>
    );

    const renderExercises = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💻 Exercícios Práticos</h3>

            {lesson.exercises.map((exercise) => (
                <div key={exercise.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{getTypeIcon(exercise.type)}</span>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900">{exercise.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty || '')}`}>
                                    {exercise.difficulty || 'Não especificado'}
                                </span>
                                {exercise.estimatedTime && (
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {exercise.estimatedTime}
                                    </span>
                                )}
                                {exercise.bonusPoints && (
                                    <span className="flex items-center gap-1 text-yellow-600">
                                        <Star className="w-4 h-4" />
                                        +{exercise.bonusPoints} pontos
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-4">{exercise.description}</p>

                    {exercise.type === 'quiz' && exercise.questions && (
                        <div className="space-y-4">
                            {exercise.questions.map((question, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <p className="font-medium mb-3">{question.question}</p>
                                    <div className="space-y-2">
                                        {question.options.map((option, optionIndex) => (
                                            <label key={optionIndex} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`quiz-${exercise.id}-${index}`}
                                                    value={optionIndex}
                                                    onChange={(e) => setQuizAnswers({
                                                        ...quizAnswers,
                                                        [exercise.id * 100 + index]: parseInt(e.target.value)
                                                    })}
                                                    className="text-blue-600"
                                                />
                                                <span className="text-gray-700">{option}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {showResults && (
                                        <div className={`mt-3 p-3 rounded-lg ${quizAnswers[exercise.id * 100 + index] === question.correct
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            <p className="font-medium">
                                                {quizAnswers[exercise.id * 100 + index] === question.correct
                                                    ? '✅ Correto!'
                                                    : '❌ Incorreto!'}
                                            </p>
                                            <p className="text-sm mt-1">{question.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="flex gap-3">
                                <button
                                    onClick={handleQuizSubmit}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Verificar Respostas
                                </button>
                                {showResults && (
                                    <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg">
                                        Pontuação: {calculateQuizScore().correct}/{calculateQuizScore().total} ({calculateQuizScore().percentage}%)
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {exercise.type === 'practical' && exercise.instructions && (
                        <div className="space-y-3">
                            <h5 className="font-semibold text-gray-900">Instruções:</h5>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                {exercise.instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                            {exercise.expectedOutcome && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="font-medium text-blue-900">Resultado Esperado:</p>
                                    <p className="text-blue-800">{exercise.expectedOutcome}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {exercise.type === 'challenge' && exercise.requirements && (
                        <div className="space-y-3">
                            <h5 className="font-semibold text-gray-900">Requisitos:</h5>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {exercise.requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderProjects = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Projetos Relacionados</h3>

            {lesson.projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900">{project.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">
                                Tipo: {project.type === 'individual' ? 'Individual' : 'Em Grupo'}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                                {project.difficulty}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                                <Clock className="w-4 h-4 inline mr-1" />
                                {project.estimatedTime}
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-4">{project.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Objetivos:</h5>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {project.objectives.map((objective, index) => (
                                    <li key={index}>{objective}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Entregáveis:</h5>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {project.deliverables.map((deliverable, index) => (
                                    <li key={index}>{deliverable}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Tecnologias:</span>
                            <div className="flex gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-600">
                                Data de entrega: {new Date(project.submissionDate).toLocaleDateString('pt-BR')}
                            </p>
                            <p className="text-lg font-semibold text-green-600">
                                Máximo: {project.maxScore} pontos
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Iniciar Projeto
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderFenixIDE = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">⚡ Fenix IDE - Editor Integrado</h3>

            {lesson.fenixIDE?.enabled ? (
                <div className="space-y-6">
                    {/* Seleção de Template */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">📋 Templates Disponíveis</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            {lesson.fenixIDE?.templates?.map((template, index) => (
                                <div key={index} className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                                    <h5 className="font-medium text-gray-900 mb-2">{template.name}</h5>
                                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                                    <button
                                        onClick={() => {
                                            setSelectedTemplate(template.name);
                                            setCode(template.code);
                                        }}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        Usar Template
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editor de Código */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">💻 Editor de Código</h4>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">
                                    Template: {selectedTemplate || 'Código Padrão'}
                                </span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <Play className="w-4 h-4 mr-2 inline" />
                                    Executar
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-96 font-mono text-sm p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Digite seu código aqui..."
                        />

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4" />
                                    Auto-save ativado
                                </span>
                                <span className="flex items-center gap-1">
                                    <Zap className="w-4 h-4" />
                                    Preview ao vivo
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    Limpar
                                </button>
                                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desafios */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Desafios de Código</h4>
                        <div className="space-y-4">
                            {lesson.fenixIDE?.challenges?.map((challenge, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <h5 className="font-medium text-gray-900">{challenge.title}</h5>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                            {challenge.difficulty}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 mb-3">{challenge.description}</p>

                                    <div className="bg-yellow-50 p-3 rounded-lg">
                                        <h6 className="font-medium text-yellow-800 mb-2">💡 Dicas:</h6>
                                        <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                                            {challenge.hints.map((hint, hintIndex) => (
                                                <li key={hintIndex}>{hint}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-3 text-sm text-gray-600">
                                        <Clock className="w-4 h-4 inline mr-1" />
                                        Tempo estimado: {challenge.estimatedTime}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Fenix IDE Desabilitado</h4>
                    <p className="text-gray-600">Esta aula não possui editor integrado disponível.</p>
                </div>
            )}
        </div>
    );

    const renderResources = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📖 Recursos de Aprendizado</h3>

            <div className="grid md:grid-cols-2 gap-6">
                {lesson.resources.map((resource, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">{getResourceIcon(resource.type)}</span>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h4>
                                <p className="text-gray-700 mb-3">{resource.description}</p>

                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                                        {resource.difficulty}
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                        {resource.language}
                                    </span>
                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                        {resource.type}
                                    </span>
                                </div>

                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Acessar Recurso
                                    <FileText className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAchievements = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🏆 Conquistas e Badges</h3>

            <div className="grid md:grid-cols-2 gap-6">
                {lesson.achievements.map((achievement) => (
                    <div key={achievement.id} className={`bg-white rounded-lg shadow-md p-6 border-2 ${achievement.unlocked ? 'border-green-500 bg-green-50' : 'border-gray-200'
                        }`}>
                        <div className="text-center">
                            <div className={`text-6xl mb-4 ${achievement.unlocked ? 'opacity-100' : 'opacity-30'}`}>
                                {achievement.icon}
                            </div>

                            <h4 className={`text-lg font-semibold mb-2 ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                                }`}>
                                {achievement.title}
                            </h4>

                            <p className={`text-sm mb-4 ${achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                                }`}>
                                {achievement.description}
                            </p>

                            <div className={`px-4 py-2 rounded-full text-sm font-medium ${achievement.unlocked
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-500'
                                }`}>
                                {achievement.unlocked ? '✅ Desbloqueado' : '🔒 Bloqueado'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProgress = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Progresso da Aula</h3>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Estatísticas Gerais */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">📈 Estatísticas</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Conteúdo:</span>
                                <span className={`font-medium ${lesson.progress.contentCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                                    {lesson.progress.contentCompleted ? '✅ Completado' : '⏳ Pendente'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Exercícios:</span>
                                <span className="font-medium text-blue-600">
                                    {lesson.progress.exercisesCompleted}/{lesson.exercises.length}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Projetos:</span>
                                <span className="font-medium text-green-600">
                                    {lesson.progress.projectsCompleted}/{lesson.projects.length}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Desafios:</span>
                                <span className="font-medium text-purple-600">
                                    {lesson.progress.challengesCompleted}/{lesson.fenixIDE?.challenges?.length || 0}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pontuação */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Pontuação</h4>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                {lesson.progress.totalScore}
                            </div>
                            <div className="text-gray-600 mb-4">
                                de {lesson.progress.maxScore} pontos
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${(lesson.progress.totalScore / lesson.progress.maxScore) * 100}%` }}
                                ></div>
                            </div>

                            <div className="text-sm text-gray-600 mt-2">
                                {Math.round((lesson.progress.totalScore / lesson.progress.maxScore) * 100)}% completo
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tempo e Último Acesso */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="font-medium text-gray-900 mb-2">⏱️ Tempo Gasto</h5>
                            <p className="text-gray-600">
                                {Math.floor(lesson.progress.timeSpent / 60)} minutos
                            </p>
                        </div>

                        <div>
                            <h5 className="font-medium text-gray-900 mb-2">🕒 Último Acesso</h5>
                            <p className="text-gray-600">
                                {lesson.progress.lastAccessed
                                    ? new Date(lesson.progress.lastAccessed).toLocaleDateString('pt-BR')
                                    : 'Nunca acessado'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'content':
                return renderContent();
            case 'exercises':
                return renderExercises();
            case 'projects':
                return renderProjects();
            case 'fenixIDE':
                return renderFenixIDE();
            case 'resources':
                return renderResources();
            case 'achievements':
                return renderAchievements();
            case 'progress':
                return renderProgress();
            default:
                return renderContent();
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Abas de Navegação */}
            <div className="bg-white border-b border-gray-200 mb-8">
                <nav className="flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Conteúdo da Aba Ativa */}
            <div className="min-h-screen">
                {renderTabContent()}
            </div>
        </div>
    );
}

