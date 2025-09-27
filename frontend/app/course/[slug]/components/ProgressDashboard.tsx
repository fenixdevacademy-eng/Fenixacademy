'use client';

import React, { useState, useEffect } from 'react';
import { ProgressManager } from '../utils/progress-manager';
import { CourseProgress } from '../types/progress-types';

interface ProgressDashboardProps {
    courseId: string;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ courseId }) => {
    const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null);
    const [achievements, setAchievements] = useState<any[]>([]);
    const [certificates, setCertificates] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({});
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const progressManager = ProgressManager.getInstance();

    useEffect(() => {
        loadProgressData();
    }, [courseId]);

    const loadProgressData = async () => {
        try {
            setLoading(true);
            const progress = progressManager.getCourseProgress(courseId);
            const userAchievements = progressManager.getUserAchievements();
            const userCertificates = progressManager.getUserCertificates();
            const userStats = progressManager.getUserStats();
            
            setCourseProgress(progress);
            setAchievements(userAchievements);
            setCertificates(userCertificates);
            setStats(userStats);
        } catch (error) {
            console.error('Error loading progress data:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateCertificate = async () => {
        try {
            const certificate = progressManager.generateCertificate(courseId);
            if (certificate) {
                setCertificates([...certificates, certificate]);
                setShowCertificateModal(true);
                await loadProgressData(); // Recarregar dados
            }
        } catch (error) {
            console.error('Error generating certificate:', error);
        }
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        if (percentage >= 40) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const courseCertificate = certificates.find(c => c.courseId === courseId);
    
    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="progress-dashboard p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard de Progresso</h2>
                <p className="text-gray-600">Acompanhe seu progresso no curso</p>
            </div>

            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800">{stats.totalCourses || 0}</h3>
                    <p className="text-sm text-gray-600">Cursos Matriculados</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800">{stats.completedCourses || 0}</h3>
                    <p className="text-sm text-gray-600">Cursos Concluídos</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800">{stats.totalHours || 0}h</h3>
                    <p className="text-sm text-gray-600">Horas Estudadas</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800">{achievements.length}</h3>
                    <p className="text-sm text-gray-600">Conquistas</p>
                </div>
            </div>

            {/* Progresso do Curso Atual */}
            {courseProgress && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Progresso do Curso</h3>
                    
                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progresso Geral</span>
                            <span>{courseProgress.overallProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full ${getProgressColor(courseProgress.overallProgress)}`}
                                style={{ width: `${courseProgress.overallProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{courseProgress.lessonsCompleted}</div>
                            <div className="text-sm text-gray-600">Aulas Concluídas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{courseProgress.exercisesCompleted}</div>
                            <div className="text-sm text-gray-600">Exercícios Concluídos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{formatTime(courseProgress.timeSpent)}</div>
                            <div className="text-sm text-gray-600">Tempo Gasto</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Conquistas */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Conquistas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">{achievement.icon}</div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                                    <p className="text-sm text-gray-600">{achievement.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certificados */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Certificados</h3>
                    {!courseCertificate && courseProgress && courseProgress.overallProgress >= 80 && (
                        <button
                            onClick={generateCertificate}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Gerar Certificado
                        </button>
                    )}
                </div>
                
                {courseCertificate ? (
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">🏆</div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Certificado de Conclusão</h4>
                                <p className="text-sm text-gray-600">Emitido em {new Date(courseCertificate.issuedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600">Complete 80% do curso para gerar seu certificado</p>
                )}
            </div>

            {/* Modal de Certificado */}
            {showCertificateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Parabéns! 🎉</h3>
                        <p className="text-gray-600 mb-4">Seu certificado foi gerado com sucesso!</p>
                        <button
                            onClick={() => setShowCertificateModal(false)}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};