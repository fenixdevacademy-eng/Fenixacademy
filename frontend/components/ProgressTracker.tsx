'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    CheckCircle,
    Clock,
    BookOpen,
    Award,
    Target,
    TrendingUp,
    Calendar,
    Play
} from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'

interface ProgressTrackerProps {
    courseId: number
    className?: string
    showDetails?: boolean
    compact?: boolean
}

export default function ProgressTracker({
    courseId,
    className = '',
    showDetails = true,
    compact = false
}: ProgressTrackerProps) {
    const { progress, loading, getProgressStats } = useProgress(courseId)

    if (loading) {
        return (
            <div className={`animate-pulse ${className}`}>
                <div className="h-4 bg-white/10 rounded-full mb-4"></div>
                {showDetails && (
                    <div className="space-y-2">
                        <div className="h-3 bg-white/5 rounded w-3/4"></div>
                        <div className="h-3 bg-white/5 rounded w-1/2"></div>
                    </div>
                )}
            </div>
        )
    }

    if (!progress) return null

    const stats = getProgressStats()
    if (!stats) return null

    const progressVariants = {
        initial: { width: 0 },
        animate: {
            width: `${stats.progressPercentage}%`,
            transition: { duration: 1, ease: "easeOut" }
        }
    }

    if (compact) {
        return (
            <div className={`space-y-2 ${className}`}>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Progresso</span>
                    <span className="text-sm font-semibold text-white">{stats.progressPercentage}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        variants={progressVariants}
                        initial="initial"
                        animate="animate"
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Progress Bar */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Progresso do Curso
                    </h3>
                    <span className="text-2xl font-bold text-white">{stats.progressPercentage}%</span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full relative"
                        variants={progressVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                    </motion.div>
                </div>
            </div>

            {showDetails && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Módulos */}
                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="w-5 h-5 text-blue-400" />
                            <span className="text-sm text-gray-300">Módulos</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {stats.completedModules}/{stats.totalModules}
                        </div>
                        <div className="text-xs text-gray-400">
                            {stats.remainingModules} restantes
                        </div>
                    </div>

                    {/* Lições */}
                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Play className="w-5 h-5 text-green-400" />
                            <span className="text-sm text-gray-300">Lições</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {stats.completedLessons}/{stats.totalLessons}
                        </div>
                        <div className="text-xs text-gray-400">
                            {stats.remainingLessons} restantes
                        </div>
                    </div>

                    {/* Tempo */}
                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-purple-400" />
                            <span className="text-sm text-gray-300">Tempo</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {stats.timeSpentFormatted}
                        </div>
                        <div className="text-xs text-gray-400">
                            estudado
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            {stats.isCompleted ? (
                                <Award className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <TrendingUp className="w-5 h-5 text-orange-400" />
                            )}
                            <span className="text-sm text-gray-300">Status</span>
                        </div>
                        <div className="text-lg font-bold text-white">
                            {stats.isCompleted ? 'Concluído' : 'Em Andamento'}
                        </div>
                        <div className="text-xs text-gray-400">
                            {stats.isCompleted ? 'Parabéns!' : 'Continue assim!'}
                        </div>
                    </div>
                </div>
            )}

            {/* Achievements */}
            {stats.completedLessons > 0 && (
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-yellow-400" />
                        <div>
                            <h4 className="text-yellow-400 font-semibold">Conquista Desbloqueada!</h4>
                            <p className="text-gray-300 text-sm">
                                Você completou {stats.completedLessons} lições. Continue assim para desbloquear mais conquistas!
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Next Steps */}
            {!stats.isCompleted && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <Target className="w-6 h-6 text-blue-400" />
                        <div>
                            <h4 className="text-blue-400 font-semibold">Próximos Passos</h4>
                            <p className="text-gray-300 text-sm">
                                {stats.remainingLessons > 0
                                    ? `Complete mais ${stats.remainingLessons} lições para finalizar o curso!`
                                    : 'Você está quase lá! Complete os módulos restantes.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}