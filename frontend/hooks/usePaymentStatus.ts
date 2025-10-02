'use client';

import { useState, useEffect } from 'react';

interface PaymentStatus {
    isPaid: boolean;
    subscriptionType: 'free' | 'premium' | 'enterprise' | null;
    hasAccess: boolean;
    loading: boolean;
    error: string | null;
}

interface CourseAccess {
    courseId: string;
    hasAccess: boolean;
    accessType: 'free' | 'premium' | 'enterprise';
    expiresAt?: string;
}

export const usePaymentStatus = () => {
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
        isPaid: false,
        subscriptionType: null,
        hasAccess: false,
        loading: true,
        error: null
    });

    const [courseAccess, setCourseAccess] = useState<Map<string, CourseAccess>>(new Map());

    useEffect(() => {
        checkPaymentStatus();
    }, []);

    const checkPaymentStatus = async () => {
        try {
            setPaymentStatus(prev => ({ ...prev, loading: true, error: null }));

            // Verificar token de autenticação
            const token = localStorage.getItem('fenix-jwt-token');
            if (!token) {
                setPaymentStatus({
                    isPaid: false,
                    subscriptionType: null,
                    hasAccess: false,
                    loading: false,
                    error: 'Usuário não autenticado'
                });
                return;
            }

            // Fazer requisição para verificar status de pagamento
            const response = await fetch('/api/user/payment-status', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPaymentStatus({
                    isPaid: data.isPaid || false,
                    subscriptionType: data.subscriptionType || null,
                    hasAccess: data.hasAccess || false,
                    loading: false,
                    error: null
                });
            } else {
                // Fallback para dados mockados em caso de erro da API
                const mockData = getMockPaymentStatus();
                setPaymentStatus({
                    ...mockData,
                    loading: false,
                    error: null
                });
            }
        } catch (error) {
            console.error('Erro ao verificar status de pagamento:', error);
            // Fallback para dados mockados
            const mockData = getMockPaymentStatus();
            setPaymentStatus({
                ...mockData,
                loading: false,
                error: 'Erro ao verificar status de pagamento'
            });
        }
    }

    const getMockPaymentStatus = (): Omit<PaymentStatus, 'loading' | 'error'> => {
        // Simular diferentes status de pagamento para demonstração
        const mockStatuses = [
            { isPaid: true, subscriptionType: 'premium' as const, hasAccess: true },
            { isPaid: true, subscriptionType: 'enterprise' as const, hasAccess: true },
            { isPaid: false, subscriptionType: 'free' as const, hasAccess: false },
            { isPaid: false, subscriptionType: null, hasAccess: false }
        ];

        // Usar um valor baseado no timestamp para simular diferentes usuários
        const index = Math.floor(Date.now() / 1000000) % mockStatuses.length;
        return mockStatuses[index];
    }

    const checkCourseAccess = async (courseId: string): Promise<CourseAccess> => {
        try {
            const token = localStorage.getItem('fenix-jwt-token');
            if (!token) {
                return {
                    courseId,
                    hasAccess: false,
                    accessType: 'free'
                }
            }

            const response = await fetch(`/api/courses/${courseId}/access`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const access: CourseAccess = {
                    courseId,
                    hasAccess: data.hasAccess || false,
                    accessType: data.accessType || 'free',
                    expiresAt: data.expiresAt
                }

                setCourseAccess(prev => new Map(prev.set(courseId, access)));
                return access;
            } else {
                // Fallback para verificação local
                const access = checkLocalCourseAccess(courseId);
                setCourseAccess(prev => new Map(prev.set(courseId, access)));
                return access;
            }
        } catch (error) {
            console.error('Erro ao verificar acesso ao curso:', error);
            const access = checkLocalCourseAccess(courseId);
            setCourseAccess(prev => new Map(prev.set(courseId, access)));
            return access;
        }
    }

    const checkLocalCourseAccess = (courseId: string): CourseAccess => {
        // Verificar se o usuário tem acesso baseado no status de pagamento
        if (paymentStatus.isPaid && paymentStatus.subscriptionType) {
            return {
                courseId,
                hasAccess: true,
                accessType: paymentStatus.subscriptionType
            }
        }

        // Verificar se é um curso gratuito
        const freeCourses = [
            'html-css-fundamentals',
            'javascript-fundamentals',
            'python-data-science'
        ];

        return {
            courseId,
            hasAccess: freeCourses.includes(courseId),
            accessType: freeCourses.includes(courseId) ? 'free' : 'free'
        }
    }

    const redirectToCourse = (courseId: string, courseSlug: string) => {
        if (paymentStatus.loading) {
            return; // Aguardar carregamento
        }

        if (paymentStatus.isPaid) {
            // Usuário pagante - redirecionar para o conteúdo do curso
            window.location.href = `/course/${courseSlug}/content`;
        } else {
            // Usuário não pagante - redirecionar para página de pagamento
            window.location.href = `/course/${courseSlug}/purchase`;
        }
    }

    const redirectToCourseContent = (courseId: string, courseSlug: string) => {
        // Redirecionar diretamente para o conteúdo (apenas para usuários pagantes)
        if (paymentStatus.isPaid) {
            window.location.href = `/course/${courseSlug}/content`;
        } else {
            // Mostrar modal de upgrade ou redirecionar para pagamento
            window.location.href = `/course/${courseSlug}/purchase?upgrade=true`;
        }
    }

    return {
        paymentStatus,
        courseAccess,
        checkCourseAccess,
        redirectToCourse,
        redirectToCourseContent,
        refreshPaymentStatus: checkPaymentStatus
    }
}

export default usePaymentStatus;









