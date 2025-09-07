'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Mapeamento direto de IDs para URLs dos cursos - Nova estrutura
const courseIdMapping: { [key: number]: string } = {
    1: '/course/web-fundamentals',
    2: '/course/python-data-science',
    3: '/course/react-advanced',
    4: '/course/nodejs-apis',
    5: '/course/machine-learning',
    6: '/course/flutter-mobile',
    7: '/course/cybersecurity',
    8: '/course/devops-docker',
    9: '/course/flutter-mobile',
    10: '/course/aws-cloud',
    11: '/course/blockchain-smart-contracts',
    12: '/course/react-native-mobile',
    13: '/course/data-science',
    14: '/course/game-development',
    15: '/course/ui-ux-design',
    16: '/course/backend-development',
    17: '/course/frontend-development',
    18: '/course/full-stack-development',
    19: '/course/product-management',
    20: '/course/software-architecture',
    21: '/course/gestao-trafego'
};

type StatusType = 'redirecting' | 'error' | 'success';

export default function CourseRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<StatusType>('redirecting');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const courseId = searchParams.get('id');
        console.log('Course ID from URL:', courseId);

        if (courseId) {
            const numericId = parseInt(courseId);
            console.log('Numeric Course ID:', numericId);

            // Verificar se o curso existe no mapeamento
            const courseUrl = courseIdMapping[numericId];
            console.log('Course URL from mapping:', courseUrl);

            if (courseUrl) {
                // Redirecionar para a página do curso
                console.log('Redirecting to:', courseUrl);
                setStatus('success');

                // Pequeno delay para mostrar a mensagem de sucesso
                setTimeout(() => {
                    console.log('Executing redirect to:', courseUrl);
                    router.push(courseUrl);
                }, 1000);
            } else {
                // Se não encontrar o curso, mostrar erro
                console.error('Course not found for ID:', numericId);
                setStatus('error');
                setErrorMessage(`Curso com ID ${numericId} não encontrado no mapeamento.`);

                // Redirecionar para a página de cursos após 3 segundos
                setTimeout(() => {
                    router.push('/courses');
                }, 3000);
            }
        } else {
            // Se não houver ID, mostrar erro
            console.error('No course ID provided');
            setStatus('error');
            setErrorMessage('ID do curso não fornecido');

            // Redirecionar para a página de cursos após 3 segundos
            setTimeout(() => {
                router.push('/courses');
            }, 3000);
        }
    }, [router, searchParams]);

    if (status === 'error') {
        const courseId = searchParams.get('id');
        const numericId = parseInt(courseId || '0');

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
                        <p>Course ID: {courseId}</p>
                        <p>Numeric ID: {numericId}</p>
                        <p>Course URL from mapping: {courseIdMapping[numericId]}</p>
                        <p>Available IDs: {Object.keys(courseIdMapping).join(', ')}</p>
                        <div className="mt-2">
                            <p><strong>Test Links:</strong></p>
                            <a
                                href={courseIdMapping[numericId] || '#'}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Test Direct Link to Course
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        const courseId = searchParams.get('id');
        const numericId = parseInt(courseId || '0');
        const courseUrl = courseIdMapping[numericId];

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-green-500 text-6xl mb-4">✅</div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Redirecionando para o curso...
                    </h2>
                    <p className="text-gray-500 mb-4">
                        Aguarde um momento enquanto carregamos o conteúdo.
                    </p>
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-sm">
                        <p><strong>Redirect Info:</strong></p>
                        <p>Course ID: {courseId}</p>
                        <p>Course URL: {courseUrl}</p>
                        <div className="mt-2">
                            <a
                                href={courseUrl}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Clique aqui se o redirecionamento não funcionar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Redirecionando para o curso...
                </h2>
                <p className="text-gray-500">
                    Aguarde um momento enquanto carregamos o conteúdo.
                </p>
            </div>
        </div>
    );
}
