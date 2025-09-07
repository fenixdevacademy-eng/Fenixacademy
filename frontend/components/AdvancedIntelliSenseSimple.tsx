'use client';

import React from 'react';
import { useIntelliSense } from './IntelliSenseProviderSimple';
import { Brain } from 'lucide-react';

interface AdvancedIntelliSenseProps {
    editor: any;
    monaco: any;
    language: string;
    theme: 'dark' | 'light';
    onSuggestionSelect?: (suggestion: any) => void;
}

export default function AdvancedIntelliSense({
    editor,
    monaco,
    language,
    theme,
    onSuggestionSelect
}: AdvancedIntelliSenseProps) {
    const intelliSense = useIntelliSense();

    // Configurar IntelliSense básico no Monaco
    React.useEffect(() => {
        if (!editor || !monaco) return;

        // Registrar provider de completions
        const completionProvider = monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: (model: any, position: any) => {
                const suggestions = intelliSense.getSuggestions(model, position, language);
                return { suggestions };
            }
        });

        return () => {
            completionProvider.dispose();
        };
    }, [editor, monaco, language, intelliSense]);

    return (
        <div className="fixed bottom-4 right-4 p-2 rounded-full shadow-lg bg-blue-600 text-white">
            <Brain size={16} />
        </div>
    );
}
