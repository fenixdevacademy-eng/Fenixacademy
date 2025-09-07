import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fenix IDE 2.0 - IDE Online Completa e Funcional',
    description: 'IDE completa funcionando diretamente no navegador com todas as funcionalidades: AI Assistant, Hot Reload, Gamificação e ferramentas brasileiras.',
    keywords: 'IDE online, editor de código web, inteligência artificial, desenvolvimento, programação, Fenix Academy, sem download',
};

export default function IDELayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {children}
        </div>
    );
}
