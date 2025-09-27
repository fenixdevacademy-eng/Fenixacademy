'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginTestPage() {
    const [credentials, setCredentials] = useState({
        email: 'admin@fenixdevacademy.com',
        password: 'admin123'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const router = useRouter();

    const testCredentials = [
        { email: 'admin@fenixdevacademy.com', password: 'admin123', role: 'Admin' },
        { email: 'contato@fenixdevacademy.com', password: '060223lk', role: 'CEO' },
        { email: 'joao@exemplo.com', password: '12345678', role: 'Estudante' },
        { email: 'maria@exemplo.com', password: 'senha123', role: 'Estudante' },
        { email: 'prof.carlos@fenixdevacademy.com', password: 'prof123', role: 'Professor' }
    ];

    const handleTestLogin = async (testCred) => {
        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/auth/login-simple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(testCred)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setResult({
                    success: true,
                    message: 'Login realizado com sucesso!',
                    user: data.user
                });
                
                // Salvar dados no localStorage
                localStorage.setItem('fenix-jwt-token', data.token);
                localStorage.setItem('fenix_user', JSON.stringify(data.user));
                
                // Redirecionar após 2 segundos
                setTimeout(() => {
                    router.push('/profile');
                }, 2000);
            } else {
                setResult({
                    success: false,
                    message: data.error || 'Erro no login'
                });
            }
        } catch (error) {
            setResult({
                success: false,
                message: 'Erro de conexão: ' + error.message
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    🧪 Teste de Login - Fênix Academy
                </h1>

                <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold text-blue-900 mb-2">
                            📋 Credenciais de Teste Disponíveis
                        </h2>
                        <div className="space-y-2">
                            {testCredentials.map((cred, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                                    <div>
                                        <span className="font-medium">{cred.role}:</span>
                                        <span className="text-gray-600 ml-2">{cred.email}</span>
                                    </div>
                                    <button
                                        onClick={() => handleTestLogin(cred)}
                                        disabled={isLoading}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Testando...' : 'Testar'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {result && (
                        <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                            <h3 className={`font-semibold ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                                {result.success ? '✅ Sucesso!' : '❌ Erro!'}
                            </h3>
                            <p className={`mt-2 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                                {result.message}
                            </p>
                            {result.user && (
                                <div className="mt-3 bg-white p-3 rounded border">
                                    <h4 className="font-medium text-gray-900">Dados do usuário:</h4>
                                    <pre className="text-sm text-gray-600 mt-1">
                                        {JSON.stringify(result.user, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="text-center">
                        <button
                            onClick={() => router.push('/auth/login')}
                            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                        >
                            Ir para Página de Login Normal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}












