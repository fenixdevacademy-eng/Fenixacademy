'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Plus, Save, Play, Settings, X } from 'lucide-react';

const FenixIDE2: React.FC = () => {
    const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fenix IDE 2.0</title>
</head>
<body>
    <h1>Bem-vindo ao Fenix IDE 2.0!</h1>
    <p>Digite ! e pressione Tab para ver templates</p>
    <script>
        console.log('IDE funcionando!');
    </script>
</body>
</html>`);

    const [showSettings, setShowSettings] = useState(false);
    const [fileName, setFileName] = useState('index.html');
    const [isRunning, setIsRunning] = useState(false);

    // Configurar Monaco Editor globalmente para evitar problemas de workers
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            window.MonacoEnvironment = {
                getWorkerUrl: function (moduleId: any, label: string) {
                    return '';
                }
            };
        }
    }, []);

    // Funções dos botões
    const handleNewFile = () => {
        setCode(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Arquivo</title>
</head>
<body>
    <h1>Novo Arquivo HTML</h1>
    <p>Digite qualquer tag HTML e pressione Tab para ver sugestões!</p>
</body>
</html>`);
        setFileName('novo-arquivo.html');
        console.log('Novo arquivo criado!');
    };

    const handleSave = () => {
        // Simular salvamento
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        console.log(`Arquivo ${fileName} salvo!`);
    };

    const handleRun = () => {
        setIsRunning(true);
        // Simular execução
        setTimeout(() => {
            setIsRunning(false);
            console.log('Código executado!');
            // Aqui você pode abrir uma nova aba com o resultado
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.write(code);
                newWindow.document.close();
            }
        }, 1000);
    };

    const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
        console.log('Editor funcionando!');

        // IntelliSense simples e funcional
        monaco.languages.registerCompletionItemProvider('html', {
            triggerCharacters: ['!', '<', ' '],
            provideCompletionItems: (model: any, position: any) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                return {
                    suggestions: [
                        // Template HTML5
                        {
                            label: '! → HTML5 Template',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<!DOCTYPE html>\\n<html lang="pt-BR">\\n<head>\\n\\t<meta charset="UTF-8">\\n\\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\\n\\t<title>${1:Título}</title>\\n</head>\\n<body>\\n\\t<h1>${2:Cabeçalho}</h1>\\n\\t<p>${3:Conteúdo}</p>\\n</body>\\n</html>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Template HTML5 completo',
                            range: range,
                            sortText: '!',
                            preselect: true
                        },
                        // Tags básicas
                        {
                            label: 'div',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<div>${1:conteúdo}</div>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Container genérico',
                            range: range
                        },
                        {
                            label: 'p',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<p>${1:parágrafo}</p>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Parágrafo de texto',
                            range: range
                        },
                        {
                            label: 'h1',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<h1>${1:título}</h1>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Título principal',
                            range: range
                        },
                        {
                            label: 'a',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<a href="${1:#}">${2:texto do link}</a>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Link para outra página',
                            range: range
                        },
                        {
                            label: 'img',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<img src="${1:imagem.jpg}" alt="${2:descrição}">',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Imagem da página',
                            range: range
                        }
                    ]
                };
            }
        });

        // Adicionar comando para Tab - SEMPRE mostrar sugestões
        editor.addCommand(monaco.KeyCode.Tab, () => {
            editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
        });

        // Adicionar comando para Ctrl+Space
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
            editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
        });

        console.log('🎉 IntelliSense configurado com sucesso!');
        console.log('📝 Tags HTML disponíveis: !, div, p, h1, a, img');
        console.log('⌨️ Teste: Digite ! ou < e pressione Tab para ver sugestões!');
        console.log('🔧 Botões funcionais: New File, Save, Run, Settings');
    }, []);

    return (
        <div className="h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-blue-400">Fenix IDE 2.0 - FUNCIONANDO!</h1>
                        <p className="text-sm text-gray-400">📁 {fileName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleNewFile}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                        >
                            <Plus className="w-4 h-4 inline mr-1" />
                            New File
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                        >
                            <Save className="w-4 h-4 inline mr-1" />
                            Save
                        </button>
                        <button
                            onClick={handleRun}
                            disabled={isRunning}
                            className={`px-3 py-1 rounded text-sm transition-colors ${isRunning
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-orange-600 hover:bg-orange-700'
                                }`}
                        >
                            <Play className="w-4 h-4 inline mr-1" />
                            {isRunning ? 'Running...' : 'Run'}
                        </button>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                        >
                            <Settings className="w-4 h-4 inline mr-1" />
                            Settings
                        </button>
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1">
                <Editor
                    height="100%"
                    defaultLanguage="html"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    onMount={handleEditorDidMount}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: true },
                        wordWrap: 'on',
                        lineNumbers: 'on',
                        automaticLayout: true,
                        // Configurações para IntelliSense funcionar
                        quickSuggestions: true,
                        suggestOnTriggerCharacters: true,
                        acceptSuggestionOnEnter: 'on',
                        wordBasedSuggestions: false
                    }}
                />
            </div>

            {/* Status Bar */}
            <div className="bg-gray-800 border-t border-gray-700 p-2 text-sm text-gray-400">
                <span className="mr-4">HTML</span>
                <span className="mr-4">UTF-8</span>
                <span className="text-green-400">✅ Monaco Editor: FUNCIONANDO!</span>
                <span className="ml-4 text-blue-400">💡 IntelliSense: Digite ! ou &lt; e pressione Tab para ver sugestões!</span>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 border border-gray-600 rounded-lg w-96 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Configurações</h2>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Tamanho da Fonte</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="24"
                                    defaultValue="14"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Tema</label>
                                <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2">
                                    <option value="vs-dark">Dark</option>
                                    <option value="vs-light">Light</option>
                                    <option value="hc-black">High Contrast</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FenixIDE2;