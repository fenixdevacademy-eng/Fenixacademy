'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Save, Play, Settings, Brain } from 'lucide-react';

const SimpleAdvancedIDEPage: React.FC = () => {
    const [content, setContent] = useState('// Bem-vindo ao Fenix Advanced IDE\nconsole.log("Hello World!");');
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [intelliSenseEnabled, setIntelliSenseEnabled] = useState(true);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        console.log('Monaco Editor montado com sucesso');

        // Configurar IntelliSense expandido
        if (intelliSenseEnabled) {
            // Sugestões para JavaScript/TypeScript
            const jsSuggestions = [
                // Keywords
                { label: 'const', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'const' },
                { label: 'let', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'let' },
                { label: 'var', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'var' },
                { label: 'function', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'function' },
                { label: 'class', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'class' },
                { label: 'if', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if' },
                { label: 'else', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'else' },
                { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for' },
                { label: 'while', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'while' },
                { label: 'return', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'return' },
                { label: 'async', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'async' },
                { label: 'await', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'await' },

                // Built-ins
                { label: 'console', kind: monaco.languages.CompletionItemKind.Function, insertText: 'console', detail: 'Console object' },
                { label: 'window', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'window', detail: 'Window object' },
                { label: 'document', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'document', detail: 'Document object' },
                { label: 'Array', kind: monaco.languages.CompletionItemKind.Class, insertText: 'Array', detail: 'Array constructor' },
                { label: 'Object', kind: monaco.languages.CompletionItemKind.Class, insertText: 'Object', detail: 'Object constructor' },
                { label: 'Promise', kind: monaco.languages.CompletionItemKind.Class, insertText: 'Promise', detail: 'Promise constructor' },
                { label: 'fetch', kind: monaco.languages.CompletionItemKind.Function, insertText: 'fetch', detail: 'Fetch API' },

                // Snippets
                {
                    label: 'function',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'function ${1:name}(${2:params}) {\n\t${3:// code}\n\treturn ${4:value};\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Function Declaration'
                },
                {
                    label: 'arrow',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'const ${1:name} = (${2:params}) => {\n\t${3:// code}\n\treturn ${4:value};\n};',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Arrow Function'
                },
                {
                    label: 'class',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'class ${1:ClassName} {\n\tconstructor(${2:params}) {\n\t\t${3:// initialization}\n\t}\n\n\t${4:method}() {\n\t\t${5:// implementation}\n\t}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Class Declaration'
                },
                {
                    label: 'if',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'if (${1:condition}) {\n\t${2:// code}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'If Statement'
                },
                {
                    label: 'for',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// code}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'For Loop'
                },
                {
                    label: 'foreach',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '${1:array}.forEach((${2:item}) => {\n\t${3:// code}\n});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'ForEach Loop'
                },
                {
                    label: 'map',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '${1:array}.map((${2:item}) => {\n\treturn ${3:item};\n})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Array Map'
                },
                {
                    label: 'filter',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '${1:array}.filter((${2:item}) => {\n\treturn ${3:condition};\n})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Array Filter'
                },
                {
                    label: 'try',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'try {\n\t${1:// code}\n} catch (error) {\n\t${2:// error handling}\n\tconsole.error(error);\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Try-Catch Block'
                },
                {
                    label: 'fetch',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'fetch(\'${1:url}\')\n\t.then(response => response.json())\n\t.then(data => {\n\t\t${2:// handle data}\n\t})\n\t.catch(error => {\n\t\tconsole.error(error);\n\t});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Fetch API'
                }
            ];

            // Sugestões para Python
            const pythonSuggestions = [
                // Keywords
                { label: 'def', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'def' },
                { label: 'class', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'class' },
                { label: 'if', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if' },
                { label: 'elif', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'elif' },
                { label: 'else', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'else' },
                { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for' },
                { label: 'while', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'while' },
                { label: 'return', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'return' },
                { label: 'import', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'import' },
                { label: 'from', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'from' },

                // Built-ins
                { label: 'print', kind: monaco.languages.CompletionItemKind.Function, insertText: 'print', detail: 'Print function' },
                { label: 'len', kind: monaco.languages.CompletionItemKind.Function, insertText: 'len', detail: 'Length function' },
                { label: 'range', kind: monaco.languages.CompletionItemKind.Function, insertText: 'range', detail: 'Range function' },
                { label: 'list', kind: monaco.languages.CompletionItemKind.Class, insertText: 'list', detail: 'List constructor' },
                { label: 'dict', kind: monaco.languages.CompletionItemKind.Class, insertText: 'dict', detail: 'Dictionary constructor' },
                { label: 'str', kind: monaco.languages.CompletionItemKind.Class, insertText: 'str', detail: 'String constructor' },
                { label: 'int', kind: monaco.languages.CompletionItemKind.Class, insertText: 'int', detail: 'Integer constructor' },
                { label: 'float', kind: monaco.languages.CompletionItemKind.Class, insertText: 'float', detail: 'Float constructor' },

                // Snippets
                {
                    label: 'def',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'def ${1:function_name}(${2:params}):\n\t${3:"""Docstring"""}\n\t${4:# code}\n\treturn ${5:value}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Function Definition'
                },
                {
                    label: 'class',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'class ${1:ClassName}:\n\tdef __init__(self, ${2:params}):\n\t\t${3:# initialization}\n\n\tdef ${4:method}(self):\n\t\t${5:# implementation}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Class Definition'
                },
                {
                    label: 'if',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'if ${1:condition}:\n\t${2:# code}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'If Statement'
                },
                {
                    label: 'for',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:# code}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'For Loop'
                },
                {
                    label: 'try',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'try:\n\t${1:# code}\nexcept ${2:Exception} as e:\n\t${3:# error handling}\n\tprint(f"Error: {e}")',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Try-Except Block'
                }
            ];

            // Escolher sugestões baseadas na linguagem
            let suggestions = [];
            if (language === 'python') {
                suggestions = pythonSuggestions;
            } else {
                suggestions = jsSuggestions;
            }

            monaco.languages.registerCompletionItemProvider(language, {
                provideCompletionItems: (model: any, position: any) => {
                    return { suggestions };
                }
            });

            // Configurar hover provider
            monaco.languages.registerHoverProvider(language, {
                provideHover: (model: any, position: any) => {
                    const word = model.getWordAtPosition(position);
                    if (word) {
                        return {
                            range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                            contents: [{ value: `**${word.word}** - ${language} identifier` }]
                        };
                    }
                    return null;
                }
            });

            console.log(`IntelliSense configurado para ${language} com ${suggestions.length} sugestões`);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Fenix Advanced IDE</h1>
                    <div className="flex items-center gap-2">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="px-3 py-1 rounded bg-gray-700 text-white border border-gray-600"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="python">Python</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIntelliSenseEnabled(!intelliSenseEnabled)}
                        className={`p-2 rounded transition-colors ${intelliSenseEnabled
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gray-600 hover:bg-gray-700'
                            }`}
                        title={intelliSenseEnabled ? "IntelliSense Ativado" : "IntelliSense Desativado"}
                    >
                        <Brain size={16} />
                    </button>

                    <button
                        onClick={() => console.log('Salvando...')}
                        className="p-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                        title="Salvar"
                    >
                        <Save size={16} />
                    </button>

                    <button
                        onClick={() => console.log('Executando...')}
                        className="p-2 rounded bg-green-600 hover:bg-green-700 transition-colors"
                        title="Executar"
                    >
                        <Play size={16} />
                    </button>

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
                        title="Alternar Tema"
                    >
                        <Settings size={16} />
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1">
                <Editor
                    height="100%"
                    language={language}
                    value={content}
                    theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                    onChange={(value) => setContent(value || '')}
                    onMount={handleEditorDidMount}
                    options={{
                        fontSize: 14,
                        wordWrap: 'on',
                        minimap: { enabled: false },
                        lineNumbers: 'on',
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        roundedSelection: false,
                        readOnly: false,
                        cursorStyle: 'line',
                        scrollbar: {
                            vertical: 'visible',
                            horizontal: 'visible',
                            verticalScrollbarSize: 14,
                            horizontalScrollbarSize: 14
                        },
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true,
                        overviewRulerLanes: 0,
                        selectionHighlight: false,
                        matchBrackets: 'always',
                        autoClosingBrackets: 'always',
                        autoClosingQuotes: 'always',
                        autoIndent: 'full',
                        formatOnType: true,
                        formatOnPaste: true
                    }}
                />
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-t border-gray-700 text-sm">
                <div className="flex items-center gap-4">
                    <span>Linguagem: {language}</span>
                    <span>Tema: {theme === 'dark' ? 'Escuro' : 'Claro'}</span>
                    <span>IntelliSense: {intelliSenseEnabled ? 'ON' : 'OFF'}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>{content.length} caracteres</span>
                    <span>Linha 1, Coluna 1</span>
                </div>
            </div>
        </div>
    );
};

export default SimpleAdvancedIDEPage;
