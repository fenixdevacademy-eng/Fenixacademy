import React from 'react';
import { CheckCircle, Circle, Lock, Play, Clock, BookOpen } from 'lucide-react';

interface CourseProgressProps {
    totalLessons: number;
    completedLessons: number;
    currentLesson: number;
    onLessonClick: (lessonId: number) => void;
    lessons?: Array<{
        id: number;
        title: string;
        duration: string;
        isCompleted: boolean;
        isLocked: boolean;
        isCurrent: boolean;
    }>;
    className?: string;
}

export default function CourseProgress({
    totalLessons,
    completedLessons,
    currentLesson,
    onLessonClick,
    lessons = [],
    className = ''
}: CourseProgressProps) {
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    const getLessonStatus = (lessonId: number) => {
        if (lessonId <= completedLessons) return 'completed';
        if (lessonId === currentLesson) return 'current';
        if (lessonId > completedLessons + 1) return 'locked';
        return 'available';
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'current':
                return <Play className="w-5 h-5 text-blue-500" />;
            case 'locked':
                return <Lock className="w-5 h-5 text-gray-400" />;
            default:
                return <Circle className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'current':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'locked':
                return 'text-gray-400 bg-gray-50 border-gray-200';
            default:
                return 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50';
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso do Curso</h3>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
                    <span className="text-sm font-medium text-blue-600">
                        {Math.round(progressPercentage)}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    {completedLessons} de {totalLessons} aulas concluídas
                </p>
            </div>

            {/* Lessons List */}
            <div className="space-y-2">
                <h4 className="text-md font-medium text-gray-900 mb-3">Aulas do Curso</h4>

                {lessons.length > 0 ? (
                    lessons.map((lesson) => {
                        const status = getLessonStatus(lesson.id);
                        const isClickable = status !== 'locked';

                        return (
                            <div
                                key={lesson.id}
                                onClick={() => isClickable && onLessonClick(lesson.id)}
                                className={`
                                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                                    ${getStatusColor(status)}
                                    ${!isClickable ? 'cursor-not-allowed' : ''}
                                `}
                            >
                                {getStatusIcon(status)}

                                <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-medium truncate">
                                        {lesson.title}
                                    </h5>
                                    {lesson.duration && (
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <Clock className="w-3 h-3" />
                                            {lesson.duration}
                                        </div>
                                    )}
                                </div>

                                {status === 'completed' && (
                                    <span className="text-xs text-green-600 font-medium">
                                        Concluída
                                    </span>
                                )}

                                {status === 'current' && (
                                    <span className="text-xs text-blue-600 font-medium">
                                        Atual
                                    </span>
                                )}

                                {status === 'locked' && (
                                    <span className="text-xs text-gray-500">
                                        Bloqueada
                                    </span>
                                )}
                            </div>
                        );
                    })
                ) : (
                    Array.from({ length: totalLessons }, (_, index) => {
                        const lessonId = index + 1;
                        const status = getLessonStatus(lessonId);
                        const isClickable = status !== 'locked';

                        return (
                            <div
                                key={lessonId}
                                onClick={() => isClickable && onLessonClick(lessonId)}
                                className={`
                                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                                    ${getStatusColor(status)}
                                    ${!isClickable ? 'cursor-not-allowed' : ''}
                                `}
                            >
                                {getStatusIcon(status)}

                                <div className="flex-1">
                                    <h5 className="text-sm font-medium">
                                        Aula {lessonId}
                                    </h5>
                                    <p className="text-xs text-gray-500">
                                        {status === 'completed' ? 'Concluída' :
                                            status === 'current' ? 'Em andamento' :
                                                status === 'locked' ? 'Bloqueada' : 'Disponível'}
                                    </p>
                                </div>

                                {status === 'completed' && (
                                    <span className="text-xs text-green-600 font-medium">
                                        ✓
                                    </span>
                                )}

                                {status === 'current' && (
                                    <span className="text-xs text-blue-600 font-medium">
                                        ▶
                                    </span>
                                )}

                                {status === 'locked' && (
                                    <span className="text-xs text-gray-500">
                                        🔒
                                    </span>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Progress Summary */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-blue-600">
                            {completedLessons}
                        </div>
                        <div className="text-sm text-gray-600">
                            Aulas Concluídas
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-600">
                            {totalLessons - completedLessons}
                        </div>
                        <div className="text-sm text-gray-600">
                            Aulas Restantes
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}