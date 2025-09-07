'use client';

import React, { useEffect } from 'react';
import { useIntelliSense } from './IntelliSenseProviderFixed';
import { Brain, Zap, Settings } from 'lucide-react';

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

    // Configurar IntelliSense no Monaco
    useEffect(() => {
        if (!editor || !monaco) return;

        console.log('Configurando IntelliSense para:', language);

        // Registrar provider de completions
        const completionProvider = monaco.languages.registerCompletionItemProvider(language, {
            triggerCharacters: ['.', ' ', '\t', '<', '>', '(', ')', '[', ']', '{', '}', ':', ';', ',', '=', '+', '-', '*', '/', '%', '&', '|', '!', '?', '@', '#', '$', '^', '~', '`', '"', "'", '\\'],
            provideCompletionItems: async (model: any, position: any) => {
                console.log('Provider de completions chamado para:', language);

                try {
                    // Usar o IntelliSense provider para obter sugestões
                    const suggestions = intelliSense.getSuggestions(model, position, language);

                    // Converter para o formato do Monaco Editor
                    const monacoSuggestions = suggestions.map(suggestion => ({
                        label: suggestion.label,
                        kind: suggestion.kind === 'keyword' ? monaco.languages.CompletionItemKind.Keyword :
                            suggestion.kind === 'function' ? monaco.languages.CompletionItemKind.Function :
                                suggestion.kind === 'variable' ? monaco.languages.CompletionItemKind.Variable :
                                    suggestion.kind === 'class' ? monaco.languages.CompletionItemKind.Class :
                                        suggestion.kind === 'interface' ? monaco.languages.CompletionItemKind.Interface :
                                            suggestion.kind === 'property' ? monaco.languages.CompletionItemKind.Property :
                                                suggestion.kind === 'method' ? monaco.languages.CompletionItemKind.Method :
                                                    suggestion.kind === 'snippet' ? monaco.languages.CompletionItemKind.Snippet :
                                                        suggestion.kind === 'module' ? monaco.languages.CompletionItemKind.Module :
                                                            monaco.languages.CompletionItemKind.Text,
                        insertText: suggestion.insertText,
                        insertTextRules: suggestion.insertTextRules === 'InsertAsSnippet' ?
                            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet :
                            monaco.languages.CompletionItemInsertTextRule.InsertAsText,
                        detail: suggestion.detail,
                        documentation: suggestion.documentation ? { value: suggestion.documentation } : undefined,
                        range: suggestion.range,
                        sortText: suggestion.sortText,
                        filterText: suggestion.filterText
                    }));

                    console.log('Retornando sugestões do IntelliSense:', monacoSuggestions.length);
                    return { suggestions: monacoSuggestions };
                } catch (error) {
                    console.error('Erro ao obter sugestões:', error);

                    // Fallback para sugestões básicas em caso de erro
                    const basicSuggestions = [
                        {
                            label: 'console.log',
                            kind: monaco.languages.CompletionItemKind.Function,
                            insertText: 'console.log($1);',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Console Log',
                            documentation: 'Logs a message to the console'
                        },
                        {
                            label: 'function',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'function $1($2) {\n\t$3\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Function Declaration',
                            documentation: 'Creates a new function'
                        }
                    ];

                    return { suggestions: basicSuggestions };
                }
            }
        });

        // Registrar provider de hover
        const hoverProvider = monaco.languages.registerHoverProvider(language, {
            provideHover: (model: any, position: any) => {
                try {
                    const hoverInfo = intelliSense.getHoverInfo(model, position, language);
                    if (hoverInfo) {
                        return {
                            range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                            contents: [{ value: hoverInfo }]
                        };
                    }
                    return null;
                } catch (error) {
                    console.error('Erro ao gerar hover info:', error);
                    return null;
                }
            }
        });

        // Registrar provider de signature help
        const signatureProvider = monaco.languages.registerSignatureHelpProvider(language, {
            signatureHelpTriggerCharacters: ['(', ','],
            provideSignatureHelp: (model: any, position: any) => {
                try {
                    return intelliSense.getSignatureHelp(model, position, language);
                } catch (error) {
                    console.error('Erro ao gerar signature help:', error);
                    return null;
                }
            }
        });

        // Configurar eventos do editor
        const onDidChangeModelContent = editor.onDidChangeModelContent(() => {
            // Lógica para atualizar sugestões em tempo real
        });

        const onDidChangeCursorPosition = editor.onDidChangeCursorPosition((e: any) => {
            // Lógica para atualizar posição das sugestões
        });

        // Configurar atalhos de teclado para forçar sugestões
        editor.addCommand(monaco.KeyCode.Tab, () => {
            console.log('Tab pressionado - forçando sugestões');
            editor.trigger('editor', 'editor.action.triggerSuggest', {});
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
            console.log('Ctrl+Space pressionado - forçando sugestões');
            editor.trigger('editor', 'editor.action.triggerSuggest', {});
        });

        // Testar se o provider está funcionando
        editor.onDidChangeModelContent(() => {
            console.log('Conteúdo do modelo alterado');
        });

        console.log('IntelliSense configurado com sucesso');

        return () => {
            completionProvider.dispose();
            hoverProvider.dispose();
            signatureProvider.dispose();
            onDidChangeModelContent.dispose();
            onDidChangeCursorPosition.dispose();
        };
    }, [editor, monaco, language, intelliSense]);

    return (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
            {/* Indicador de Status */}
            <div
                className="p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                style={{
                    background: theme === 'dark' ? '#007acc' : '#0066cc',
                    color: '#ffffff'
                }}
                title="IntelliSense Ativado"
            >
                <Brain size={20} />
            </div>

            {/* Indicador de Performance */}
            <div
                className="p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                style={{
                    background: theme === 'dark' ? '#28a745' : '#20c997',
                    color: '#ffffff'
                }}
                title="Auto Complete Ativo"
            >
                <Zap size={16} />
            </div>
        </div>
    );
}
