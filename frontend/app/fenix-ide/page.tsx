'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Code, ArrowRight, Zap } from 'lucide-react';

export default function FenixIDERedirectPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirecionar automaticamente após 3 segundos
        const timer = setTimeout(() => {
            router.push('/fenix-ide-v2');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center px-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                    <div className="mb-6">
                        <div className="inline-flex p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
                            <Code className="h-16 w-16 text-white" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            🚀 Fenix IDE Atualizada!
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            A Fenix IDE foi completamente reformulada e agora está disponível como
                            <strong className="text-blue-600"> Fenix IDE 2.0</strong>!
                        </p>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                ✨ Novas Funcionalidades
                            </h2>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-left">
                                <li>• 🧠 IA Inteligente com contexto brasileiro</li>
                                <li>• ⚡ Auto-complete inteligente</li>
                                <li>• 🏗️ Arquitetura modular extensível</li>
                                <li>• 🇧🇷 Ferramentas brasileiras integradas</li>
                                <li>• 📊 Analytics em tempo real</li>
                            </ul>
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Redirecionando automaticamente em alguns segundos...
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => router.push('/fenix-ide-v2')}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                        >
                            <Zap className="h-5 w-5 mr-2" />
                            Ir para Fenix IDE 2.0
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </button>

                        <button
                            onClick={() => router.push('/fenix-ide-v2/demo')}
                            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                        >
                            Ver Demo
                        </button>
                    </div>

                    <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                            <strong>Nota:</strong> A antiga versão da IDE foi descontinuada.
                            Todas as funcionalidades foram migradas para a nova versão.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
