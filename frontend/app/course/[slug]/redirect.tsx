'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

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
    '/course/12': '/course/aws-cloud',
    '/course/13': '/course/blockchain-smart-contracts',
    '/course/14': '/course/aws-cloud',
    '/course/15': '/course/blockchain-smart-contracts',

    // Mapeamento de slugs antigos para novos
    '/course/fundamentos-web': '/course/web-fundamentals',
    '/course/javascript-basico': '/course/javascript-basics',
    '/course/react-fundamentos': '/course/react-basics',
    '/course/nodejs-basico': '/course/nodejs-basics',
    '/course/python-basico': '/course/python-basics',
    '/course/machine-learning-basico': '/course/machine-learning-basics',
    '/course/desenvolvimento-web': '/course/web-development',
    '/course/desenvolvimento-mobile': '/course/mobile-development',
    '/course/cybersecurity': '/course/cybersecurity-basics',
    '/course/devops': '/course/devops-basics',
    '/course/data-science': '/course/data-science-basics',
    '/course/cloud-computing': '/course/cloud-computing-basics',
    '/course/blockchain': '/course/blockchain-basics',
    '/course/ai': '/course/artificial-intelligence',
    '/course/iot': '/course/internet-of-things',
    '/course/ar-vr': '/course/augmented-reality',
    '/course/game-development': '/course/game-development-basics',
    '/course/ui-ux': '/course/ui-ux-design',
    '/course/product-management': '/course/product-management-basics',
    '/course/entrepreneurship': '/course/entrepreneurship-basics',
    '/course/freelancing': '/course/freelancing-basics',
    '/course/consulting': '/course/consulting-basics',
    '/course/teaching': '/course/teaching-basics',
    '/course/research': '/course/research-basics',
    '/course/open-source': '/course/open-source-basics',
    '/course/technical-writing': '/course/technical-writing-basics'
};

interface RedirectPageProps {
    params: {
        slug: string;
    };
}

export default function RedirectPage({ params }: RedirectPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'redirecting' | 'error' | 'success'>('loading');
    const [redirectUrl, setRedirectUrl] = useState<string>('');

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                setStatus('loading');

                const currentPath = `/course/${params.slug}`;
                const queryParams = searchParams.toString();
                const fullUrl = queryParams ? `${currentPath}?${queryParams}` : currentPath;

                // Verificar se é uma URL legada
                const mappedUrl = legacyUrlMapping[fullUrl];
                if (mappedUrl) {
                    setRedirectUrl(mappedUrl);
                    setStatus('redirecting');

                    // Redirecionar após um pequeno delay para mostrar o status
                    setTimeout(() => {
                        router.replace(mappedUrl);
                    }, 1000);
                    return;
                }

                // Verificar se o curso existe
                const courseExists = await checkCourseExists(params.slug);
                if (courseExists) {
                    setStatus('success');
                    // Redirecionar para a página do curso
                    setTimeout(() => {
                        router.replace(`/course/${params.slug}`);
                    }, 1000);
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error('Error during redirect:', error);
                setStatus('error');
            }
        };

        handleRedirect();
    }, [params.slug, router, searchParams]);

    const checkCourseExists = async (slug: string): Promise<boolean> => {
        try {
            // Simular verificação de curso
            const validSlugs = [
                'web-fundamentals',
                'javascript-basics',
                'react-advanced',
                'nodejs-apis',
                'machine-learning',
                'flutter-mobile',
                'cybersecurity',
                'devops-docker',
                'data-science',
                'aws-cloud',
                'blockchain-smart-contracts'
            ];

            return validSlugs.includes(slug);
        } catch (error) {
            console.error('Error checking course existence:', error);
            return false;
        }
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'loading':
                return 'Verificando curso...';
            case 'redirecting':
                return 'Redirecionando...';
            case 'success':
                return 'Curso encontrado!';
            case 'error':
                return 'Curso não encontrado';
            default:
                return 'Processando...';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'loading':
                return <Loader2 className="w-8 h-8 animate-spin text-blue-600" />;
            case 'redirecting':
                return <Loader2 className="w-8 h-8 animate-spin text-blue-600" />;
            case 'success':
                return <CheckCircle className="w-8 h-8 text-green-600" />;
            case 'error':
                return <AlertCircle className="w-8 h-8 text-red-600" />;
            default:
                return <Loader2 className="w-8 h-8 animate-spin text-blue-600" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
                <div className="mb-6">
                    {getStatusIcon()}
                </div>

                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    {getStatusMessage()}
                </h1>

                <p className="text-gray-600 mb-6">
                    {status === 'loading' && 'Verificando se o curso existe...'}
                    {status === 'redirecting' && `Redirecionando para: ${redirectUrl}`}
                    {status === 'success' && 'Você será redirecionado em breve...'}
                    {status === 'error' && 'O curso solicitado não foi encontrado.'}
                </p>

                {status === 'error' && (
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-800">
                                O curso "{params.slug}" não foi encontrado.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => router.push('/courses')}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Ver Todos os Cursos
                            </button>

                            <button
                                onClick={() => router.push('/')}
                                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Voltar ao Início
                            </button>
                        </div>
                    </div>
                )}

                {(status === 'loading' || status === 'redirecting' || status === 'success') && (
                    <div className="text-sm text-gray-500">
                        {status === 'loading' && 'Aguarde...'}
                        {status === 'redirecting' && 'Redirecionando...'}
                        {status === 'success' && 'Redirecionando...'}
                    </div>
                )}
            </div>
        </div>
    );
}