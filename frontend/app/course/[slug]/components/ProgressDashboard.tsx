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
    const progressManager = ProgressManager.getInstance();

    useEffect(() => {
        loadProgressData();
    }, [courseId]);

    const loadProgressData = () => {
        const progress = progressManager.getCourseProgress(courseId);
        const userAchievements = progressManager.getUserAchievements();
        const userCertificates = progressManager.getUserCertificates();
        const userStats = progressManager.getUserStats();

        setCourseProgress(progress);
        setAchievements(userAchievements);
        setCertificates(userCertificates);
        setStats(userStats);
    };

    const generateCertificate = () => {
        const certificate = progressManager.generateCertificate(courseId);
        if (certificate) {
            setCertificates([...certificates, certificate]);
            setShowCertificateModal(true);
            loadProgressData(); // Recarregar dados
        }
    };

    const canGenerateCertificate = () => {
        return courseProgress?.status === 'completed' &&
            !certificates.some(c => c.courseId === courseId);
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        if (percentage >= 40) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const courseCertificate = certificates.find(c => c.courseId === courseId);

    return (
        <div className="progress-dashboard p-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard de Progresso</h2>
                <p className="text-gray-600">Acompanhe seu progresso e conquistas</p>
            </div>

            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">📚</div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">{stats.totalCourses}</h3>
                            <p className="text-sm text-gray-600">Cursos Matriculados</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">✅</div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">{stats.completedCourses}</h3>
                            <p className="text-sm text-gray-600">Cursos Concluídos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">⏱️</div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">{formatTime(stats.totalStudyTime)}</h3>
                            <p className="text-sm text-gray-600">Tempo de Estudo</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">🏆</div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">{stats.totalCertificates}</h3>
                            <p className="text-sm text-gray-600">Certificados</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progresso do Curso Atual */}
            {courseProgress && (
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Progresso do Curso</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Módulos</span>
                                <span className="text-sm text-gray-600">
                                    {courseProgress.completedModules}/{courseProgress.totalModules}
                                </span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor((courseProgress.completedModules / courseProgress.totalModules) * 100)
                                        }`}
                                    style={{
                                        width: `${(courseProgress.completedModules / courseProgress.totalModules) * 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Aulas</span>
                                <span className="text-sm text-gray-600">
                                    {courseProgress.completedLessons}/{courseProgress.totalLessons}
                                </span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor((courseProgress.completedLessons / courseProgress.totalLessons) * 100)
                                        }`}
                                    style={{
                                        width: `${(courseProgress.completedLessons / courseProgress.totalLessons) * 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Tempo de Estudo</span>
                                <span className="text-sm text-gray-600">{formatTime(courseProgress.totalTimeSpent)}</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                                {Math.round((courseProgress.completedLessons / courseProgress.totalLessons) * 100)}%
                            </div>
                        </div>
                    </div>

                    {/* Status e Certificação */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${courseProgress.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    courseProgress.status === 'certified' ? 'bg-blue-100 text-blue-800' :
                                        courseProgress.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                }`}>
                                {courseProgress.status === 'completed' ? 'Concluído' :
                                    courseProgress.status === 'certified' ? 'Certificado' :
                                        courseProgress.status === 'in_progress' ? 'Em Progresso' :
                                            'Não Iniciado'}
                            </span>
                            {courseProgress.overallGrade && (
                                <span className="text-sm text-gray-600">
                                    Nota: {courseProgress.overallGrade}%
                                </span>
                            )}
                        </div>

                        {canGenerateCertificate() && (
                            <button
                                onClick={generateCertificate}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                🏆 Gerar Certificado
                            </button>
                        )}

                        {courseCertificate && (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-green-600">✅ Certificado Obtido</span>
                                <button
                                    onClick={() => setShowCertificateModal(true)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    Ver Certificado
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Conquistas Recentes */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Conquistas Recentes</h3>
                {achievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.slice(-6).map((achievement, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <span className="text-2xl">{achievement.icon}</span>
                                <div>
                                    <h4 className="font-medium text-gray-800">{achievement.name}</h4>
                                    <p className="text-sm text-gray-600">{achievement.description}</p>
                                    {achievement.earnedAt && (
                                        <p className="text-xs text-gray-500">
                                            {new Date(achievement.earnedAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Nenhuma conquista ainda. Continue estudando!</p>
                )}
            </div>

            {/* Certificados */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Meus Certificados</h3>
                {certificates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certificates.map((certificate) => (
                            <div key={certificate.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-800">{certificate.courseName}</h4>
                                    <span className="text-2xl">🏆</span>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>Nota: {certificate.grade}%</p>
                                    <p>Carga Horária: {certificate.totalHours}h</p>
                                    <p>Emitido em: {new Date(certificate.issuedAt).toLocaleDateString()}</p>
                                    <p>Código: {certificate.verificationCode}</p>
                                </div>
                                <button
                                    onClick={() => setShowCertificateModal(true)}
                                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    Ver Certificado
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Nenhum certificado ainda. Complete um curso para obter seu certificado!</p>
                )}
            </div>

            {/* Modal do Certificado */}
            {showCertificateModal && courseCertificate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Certificado de Conclusão</h3>
                            <p className="text-gray-600 mb-4">Parabéns! Você concluiu o curso</p>
                            <h4 className="text-lg font-semibold text-blue-600 mb-4">{courseCertificate.courseName}</h4>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Nota Final:</span>
                                        <div className="font-medium">{courseCertificate.grade}%</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Carga Horária:</span>
                                        <div className="font-medium">{courseCertificate.totalHours}h</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Data de Emissão:</span>
                                        <div className="font-medium">{new Date(courseCertificate.issuedAt).toLocaleDateString()}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Código:</span>
                                        <div className="font-medium">{courseCertificate.verificationCode}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-2">Habilidades Adquiridas:</h5>
                                <div className="flex flex-wrap gap-2">
                                    {courseCertificate.skills.map((skill: string, index: number) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowCertificateModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Fechar
                                </button>
                                <button
                                    onClick={() => {
                                        // Implementar download do certificado
                                        alert('Funcionalidade de download será implementada');
                                    }}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressDashboard;
