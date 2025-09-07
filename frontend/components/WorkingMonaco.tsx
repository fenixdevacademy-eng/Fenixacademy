'use client';

import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Plus, Save, Play, Settings, X } from 'lucide-react';

const WorkingMonaco: React.FC = () => {
    const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cursor Fenix IDE</title>
</head>
<body>
    <h1>Bem-vindo ao Cursor Fenix IDE!</h1>
    <p>Digite ! e pressione Tab para ver templates</p>
    <script>
        console.log('IDE funcionando!');
    </script>
</body>
</html>`);

    const [showSettings, setShowSettings] = useState(false);

    const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
        console.log('Editor funcionando!');

        // IntelliSense simples
        monaco.languages.registerCompletionItemProvider('html', {
            triggerCharacters: ['!'],
            provideCompletionItems: () => ({
                suggestions: [
                    {
                        label: '! → HTML5 Template',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Título}</title>\n</head>\n<body>\n\t<h1>${2:Cabeçalho}</h1>\n\t<p>${3:Conteúdo}</p>\n</body>\n</html>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        detail: 'Template HTML5 completo'
                    }
                ]
            })
        });
    }, []);

    return (
        <div className="h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-blue-400">Cursor Fenix IDE - FUNCIONANDO!</h1>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm">
                            <Plus className="w-4 h-4 inline mr-1" />
                            New File
                        </button>
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm">
                            <Save className="w-4 h-4 inline mr-1" />
                            Save
                        </button>
                        <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-sm">
                            <Play className="w-4 h-4 inline mr-1" />
                            Run
                        </button>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
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
                        // Configurações para evitar problemas de workers
                        quickSuggestions: false,
                        suggestOnTriggerCharacters: false,
                        acceptSuggestionOnEnter: 'off'
                    }}
                />
            </div>

            {/* Status Bar */}
            <div className="bg-gray-800 border-t border-gray-700 p-2 text-sm text-gray-400">
                <span className="mr-4">HTML</span>
                <span className="mr-4">UTF-8</span>
                <span className="text-green-400">✅ Monaco Editor: FUNCIONANDO!</span>
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

export default WorkingMonaco;




