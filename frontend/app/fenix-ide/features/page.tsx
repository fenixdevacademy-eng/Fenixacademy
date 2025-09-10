'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Code, ArrowRight, Zap, Star } from 'lucide-react';

export default function FenixIDEStarRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirecionar automaticamente após 3 segundos
        const timer = setTimeout(() => {
            router.push('/fenix-ide-v2/demo');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center px-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                    <div className="mb-6">
                        <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6">
                            <Star className="h-16 w-16 text-white" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            🚀 Funcionalidades da Fenix IDE 2.0
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            As funcionalidades da antiga IDE foram completamente reformuladas e
                            agora estão disponíveis na <strong className="text-purple-600">Fenix IDE 2.0</strong>!
                        </p>

                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
                            <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                                ✨ Novas Funcionalidades Disponíveis
                            </h2>
                            <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1 text-left">
                                <li>• 🧠 IA Inteligente com contexto brasileiro</li>
                                <li>• ⚡ Auto-complete inteligente prioritário</li>
                                <li>• 🏗️ Arquitetura modular extensível</li>
                                <li>• 🇧🇷 Ferramentas brasileiras integradas</li>
                                <li>• 📊 Analytics em tempo real</li>
                                <li>• 🔧 Sistema de plugins robusto</li>
                                <li>• 📝 Editor com 20+ linguagens</li>
                                <li>• 🎯 Snippets contextuais inteligentes</li>
                            </ul>
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Redirecionando para a demonstração em alguns segundos...
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => router.push('/fenix-ide-v2/demo')}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
                        >
                            <Zap className="h-5 w-5 mr-2" />
                            Ver Funcionalidades
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </button>

                        <button
                            onClick={() => router.push('/fenix-ide-v2')}
                            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                        >
                            <Code className="h-5 w-5 mr-2" />
                            Ir para IDE 2.0
                        </button>
                    </div>

                    <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                            <strong>Nota:</strong> Todas as funcionalidades da antiga IDE foram
                            migradas e melhoradas na nova versão.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
