import React from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface CourseProgressProps {
    totalLessons: number;
    completedLessons: number;
    currentLesson: number;
    onLessonClick: (lessonId: number) => void;
}

const CourseProgress: React.FC<CourseProgressProps> = ({
    totalLessons,
    completedLessons,
    currentLesson,
    onLessonClick
}) => {
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso do Curso</h3>

            {/* Barra de Progresso */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
                    <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{completedLessons} de {totalLessons} aulas concluídas</span>
                </div>
            </div>

            {/* Lista de Aulas com Status */}
            <div className="space-y-2">
                {Array.from({ length: totalLessons }, (_, index) => {
                    const lessonId = index + 1;
                    const isCompleted = lessonId <= completedLessons;
                    const isCurrent = lessonId === currentLesson;
                    const isLocked = lessonId > completedLessons + 1;

                    return (
                        <button
                            key={lessonId}
                            onClick={() => !isLocked && onLessonClick(lessonId)}
                            disabled={isLocked}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isCurrent
                                    ? 'bg-blue-50 border border-blue-200'
                                    : isCompleted
                                        ? 'bg-green-50 border border-green-200'
                                        : isLocked
                                            ? 'bg-gray-50 border border-gray-200 cursor-not-allowed'
                                            : 'hover:bg-gray-50 border border-transparent'
                                }`}
                        >
                            <div className="flex-shrink-0">
                                {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : isLocked ? (
                                    <Lock className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <Circle className="w-5 h-5 text-blue-500" />
                                )}
                            </div>
                            <div className="flex-1 text-left">
                                <span className={`font-medium ${isCompleted ? 'text-green-700' :
                                        isCurrent ? 'text-blue-700' :
                                            isLocked ? 'text-gray-400' : 'text-gray-700'
                                    }`}>
                                    Aula {lessonId}
                                </span>
                                <div className="text-xs text-gray-500">
                                    {isCompleted ? 'Concluída' :
                                        isCurrent ? 'Em andamento' :
                                            isLocked ? 'Bloqueada' : 'Disponível'}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Estatísticas */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
                        <div className="text-xs text-gray-500">Total de Aulas</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">{completedLessons}</div>
                        <div className="text-xs text-gray-500">Concluídas</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-purple-600">{totalLessons - completedLessons}</div>
                        <div className="text-xs text-gray-500">Restantes</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseProgress;
