'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Lock,
    AlertCircle,
    CreditCard,
    BookOpen,
    ArrowRight,
    CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface CourseAccessGuardProps {
    courseId: number;
    children: React.ReactNode;
}

interface CourseAccess {
    hasAccess: boolean;
    courseId: number;
    purchaseDate?: string;
    expiresAt?: string;
    progress?: number;
}

export default function CourseAccessGuard({ courseId, children }: CourseAccessGuardProps) {
    const [access, setAccess] = useState<CourseAccess | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Simular verificação de acesso ao curso
        const checkCourseAccess = async () => {
            try {
                // Verificar se está autenticado
                const cookies = document.cookie.split(';');
                const authCookie = cookies.find(cookie =>
                    cookie.trim().startsWith('auth_token=')
                );

                if (!authCookie) {
                    router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname));
                    return;
                }

                // Simular verificação de acesso ao curso específico
                // Em um sistema real, isso seria uma chamada à API
                const mockAccess: CourseAccess = {
                    hasAccess: courseId === 1 || courseId === 2, // Apenas cursos 1 e 2 têm acesso
                    courseId,
                    purchaseDate: '2024-01-10',
                    expiresAt: '2025-01-10',
                    progress: courseId === 1 ? 75 : 25
                };

                setAccess(mockAccess);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao verificar acesso:', error);
                setLoading(false);
            }
        };

        checkCourseAccess();
    }, [courseId, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando acesso ao curso...</p>
                </div>
            </div>
        );
    }

    if (!access?.hasAccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg border p-8">
                    <div className="text-center">
                        <Lock className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h2>
                        <p className="text-gray-600 mb-6">
                            Você precisa adquirir este curso para acessar o conteúdo.
                        </p>

                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800">Como obter acesso:</p>
                                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                                        <li>• Faça login na sua conta</li>
                                        <li>• Adquira o curso desejado</li>
                                        <li>• Acesso liberado imediatamente</li>
                                        <li>• Suporte completo incluído</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href={`/payment?course=${courseId}`}
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                            >
                                <CreditCard className="w-5 h-5 mr-2" />
                                Adquirir Curso
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>

                            <Link
                                href="/courses"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Ver Outros Cursos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Course Access Banner */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="text-sm font-medium text-green-800">
                                    Acesso Liberado
                                </p>
                                <p className="text-xs text-green-700">
                                    Compra realizada em {access.purchaseDate} • Expira em {access.expiresAt}
                                </p>
                            </div>
                        </div>

                        {access.progress && (
                            <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${access.progress}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-600">{access.progress}%</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {children}
        </div>
    );
} 