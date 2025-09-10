'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { courseRoutes } from './route-config';

// Mapeamento de URLs legadas para novas URLs
const legacyUrlMapping: { [key: string]: string } = {
    // URLs antigas para novas
    '/course/fundamentos-desenvolvimento-web': '/course/web-fundamentals',
    '/course/react-avancado': '/course/react-advanced',
    '/course/nodejs-backend-development': '/course/nodejs-apis',
    '/course/machine-learning-python': '/course/machine-learning',
    '/course/desenvolvimento-mobile': '/course/flutter-mobile',
    '/course/cybersecurity-ethical-hacking': '/course/cybersecurity',
    '/course/devops-cicd': '/course/devops-docker',
    '/course/data-engineering': '/course/data-science',

    // Mapeamento de IDs para slugs
    '/course/1': '/course/web-fundamentals',
    '/course/2': '/course/python-data-science',
    '/course/3': '/course/react-advanced',
    '/course/4': '/course/nodejs-apis',
    '/course/5': '/course/machine-learning',
    '/course/6': '/course/flutter-mobile',
    '/course/7': '/course/cybersecurity',
    '/course/8': '/course/devops-docker',
    '/course/9': '/course/flutter-mobile',
    '/course/10': '/course/aws-cloud',
    '/course/11': '/course/blockchain-smart-contracts',
    '/course/12': '/course/react-native-mobile',
    '/course/13': '/course/data-science',
    '/course/14': '/course/game-development',
    '/course/15': '/course/ui-ux-design',
    '/course/16': '/course/backend-development',
    '/course/17': '/course/frontend-development',
    '/course/18': '/course/full-stack-development',
    '/course/19': '/course/product-management',
    '/course/20': '/course/software-architecture',
    '/course/21': '/course/gestao-trafego'
};

type StatusType = 'redirecting' | 'error' | 'success';

export default function CourseRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<StatusType>('redirecting');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const courseId = searchParams.get('id');
        const legacyUrl = searchParams.get('url');
        const currentPath = window.location.pathname;

        console.log('Course Redirect - Current path:', currentPath);
        console.log('Course ID from URL:', courseId);
        console.log('Legacy URL from params:', legacyUrl);

        // Verificar se é uma URL legada
        if (legacyUrlMapping[currentPath]) {
            console.log('Legacy URL detected, redirecting to:', legacyUrlMapping[currentPath]);
            setStatus('success');

            setTimeout(() => {
                router.push(legacyUrlMapping[currentPath]);
            }, 1000);
            return;
        }

        // Verificar se é um ID numérico
        if (courseId) {
            const numericId = parseInt(courseId);
            console.log('Numeric Course ID:', numericId);

            const courseUrl = courseRoutes.utils.getCourseUrlById(numericId);
            console.log('Course URL from mapping:', courseUrl);

            if (courseUrl && courseUrl !== '/courses') {
                console.log('Redirecting to:', courseUrl);
                setStatus('success');

                setTimeout(() => {
                    router.push(courseUrl);
                }, 1000);
            } else {
                console.error('Course not found for ID:', numericId);
                setStatus('error');
                setErrorMessage(`Curso com ID ${numericId} não encontrado no mapeamento.`);

                setTimeout(() => {
                    router.push('/courses');
                }, 3000);
            }
            return;
        }

        // Verificar se o slug atual é válido
        const currentSlug = currentPath.replace('/course/', '');
        if (courseRoutes.utils.isValidSlug(currentSlug)) {
            console.log('Valid slug detected:', currentSlug);
            setStatus('success');
            return; // Slug válido, não precisa redirecionar
        }

        // Se não for nenhum dos casos acima, mostrar erro
        console.error('Invalid course path:', currentPath);
        setStatus('error');
        setErrorMessage(`Caminho do curso inválido: ${currentPath}`);

        setTimeout(() => {
            router.push('/courses');
        }, 3000);
    }, [router, searchParams]);

    if (status === 'error') {
        const courseId = searchParams.get('id');
        const currentPath = window.location.pathname;

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">❌</div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Erro no Redirecionamento
                    </h2>
                    <p className="text-gray-500 mb-4">
                        {errorMessage}
                    </p>
                    <p className="text-sm text-gray-400">
                        Redirecionando para a página de cursos em alguns segundos...
                    </p>
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-sm">
                        <p><strong>Debug Info:</strong></p>
                        <p>Current Path: {currentPath}</p>
                        <p>Course ID: {courseId}</p>
                        <p>Available Slugs: {courseRoutes.utils.getAllSlugs().join(', ')}</p>
                        <p>Available IDs: {courseRoutes.utils.getAllIds().join(', ')}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-green-500 text-6xl mb-4">✅</div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Redirecionando...
                    </h2>
                    <p className="text-gray-500 mb-4">
                        Você será redirecionado para a nova página do curso em alguns segundos.
                    </p>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                </div>
            </div>
        );
    }

    // Status padrão: redirecionando
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="text-blue-500 text-6xl mb-4">🔄</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Processando Redirecionamento
                </h2>
                <p className="text-gray-500 mb-4">
                    Analisando URL e preparando redirecionamento...
                </p>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
        </div>
    );
}














