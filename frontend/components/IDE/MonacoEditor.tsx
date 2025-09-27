'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: string;
    theme?: string;
    readOnly?: boolean;
    height?: string;
    options?: monaco.editor.IStandaloneEditorConstructionOptions;
    onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
    value,
    onChange,
    language,
    theme = 'vs-dark',
    readOnly = false,
    height = '100%',
    options = {},
    onMount
}) => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        setIsLoaded(true);

        // Configurações avançadas do editor
        editor.updateOptions({
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            fontSize: 14,
            lineHeight: 22,
            fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
            fontLigatures: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            mouseWheelZoom: true,
            contextmenu: true,
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: readOnly,
            scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                verticalScrollbarSize: 12,
                horizontalScrollbarSize: 12,
                useShadows: true,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                verticalSliderSize: 12,
                horizontalSliderSize: 12,
                arrowSize: 11},
            ...options
        });

        // Configurar IntelliSense avançado
        setupIntelliSense(editor, language);

        // Configurar shortcuts personalizados
        setupCustomShortcuts(editor);

        // Configurar formatação automática
        setupAutoFormatting(editor, language);

        if (onMount) {
            onMount(editor);
        }
    }

    const setupIntelliSense = (editor: monaco.editor.IStandaloneCodeEditor, lang: string) => {
        // Configurar providers de IntelliSense para diferentes linguagens
        switch (lang) {
            case 'javascript':
            case 'typescript':
                setupJavaScriptIntelliSense(editor);
                break;
            case 'python':
                setupPythonIntelliSense(editor);
                break;
            case 'html':
                setupHTMLIntelliSense(editor);
                break;
            case 'css':
                setupCSSIntelliSense(editor);
                break;
            case 'json':
                setupJSONIntelliSense(editor);
                break;
        }
    }

    const setupJavaScriptIntelliSense = (editor: monaco.editor.IStandaloneCodeEditor) => {
        // Configurar snippets para JavaScript
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position, context, token) => {
                const suggestions = [
                    // Console methods
                    {
                        label: 'console.log',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: 'console.log(${1:value});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Log a value to the console',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'console.error',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: 'console.error(${1:error});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Log an error to the console',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'console.warn',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: 'console.warn(${1:warning});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Log a warning to the console',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'console.info',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: 'console.info(${1:info});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Log info to the console',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Functions
                    {
                        label: 'function',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'function ${1:name}(${2:params}) {\n\t${3:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a function',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'arrow function',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'const ${1:name} = (${2:params}) => {\n\t${3:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an arrow function',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'async function',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'async function ${1:name}(${2:params}) {\n\t${3:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an async function',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'async arrow function',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'const ${1:name} = async (${2:params}) => {\n\t${3:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an async arrow function',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Control structures
                    {
                        label: 'if statement',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'if (${1:condition}) {\n\t${2:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an if statement',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'if-else statement',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'if (${1:condition}) {\n\t${2:// code}\n} else {\n\t${3:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an if-else statement',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'for loop',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:length} ${1:i}++) {\n\t${3:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a for loop',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'for-in loop',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'for (let ${1:key} in ${2:object}) {\n\t${3:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a for-in loop',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'for-of loop',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'for (let ${1:item} of ${2:array}) {\n\t${3:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a for-of loop',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'while loop',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'while (${1:condition}) {\n\t${2:// code}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a while loop',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'do-while loop',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'do {\n\t${1:// code}\n} while (${2:condition});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a do-while loop',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Error handling
                    {
                        label: 'try-catch',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'try {\n\t${1:// code}\n} catch (${2:error}) {\n\t${3:// handle error}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a try-catch block',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'try-catch-finally',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'try {\n\t${1:// code}\n} catch (${2:error}) {\n\t${3:// handle error}\n} finally {\n\t${4:// cleanup}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a try-catch-finally block',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Classes
                    {
                        label: 'class',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'class ${1:Name} {\n\tconstructor(${2:params}) {\n\t\t${3:// code}\n\t}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a class',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'class with extends',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'class ${1:Name} extends ${2:Parent} {\n\tconstructor(${3:params}) {\n\t\tsuper(${4:args});\n\t\t${5:// code}\n\t}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a class that extends another class',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Objects and arrays
                    {
                        label: 'object literal',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'const ${1:obj} = {\n\t${2:key}: ${3:value}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an object literal',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'array literal',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'const ${1:arr} = [${2:item1}, ${3:item2}];',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an array literal',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Promises and async
                    {
                        label: 'Promise',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'new Promise((resolve, reject) => {\n\t${1:// code}\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a Promise',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'async-await',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'const ${1:result} = await ${2:promise}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Use async-await',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Array methods
                    {
                        label: 'array.map',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: '${1:array}.map(${2:item} => {\n\t${3:// code}\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Map over an array',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'array.filter',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: '${1:array}.filter(${2:item} => {\n\t${3:// condition}\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Filter an array',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'array.reduce',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: '${1:array}.reduce((${2:acc}, ${3:item}) => {\n\t${4:// code}\n}, ${5:initialValue});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Reduce an array',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'array.forEach',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: '${1:array}.forEach(${2:item} => {\n\t${3:// code}\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Iterate over an array',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    }
                ];

                return { suggestions }
            }
        });
    }

    const setupPythonIntelliSense = (editor: monaco.editor.IStandaloneCodeEditor) => {
        monaco.languages.registerCompletionItemProvider('python', {
            provideCompletionItems: (model, position, context, token) => {
                const suggestions = [
                    // Print and output
                    {
                        label: 'print',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: 'print(${1:value})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Print a value to the console',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'print with format',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: 'print(f"${1:message} {${2:variable}}")',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Print with f-string formatting',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Functions
                    {
                        label: 'def',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'def ${1:name}(${2:params}):\n\t${3:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a function',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'async def',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'async def ${1:name}(${2:params}):\n\t${3:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an async function',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'lambda',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'lambda ${1:params}: ${2:expression}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a lambda function',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Classes
                    {
                        label: 'class',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'class ${1:Name}:\n\tdef __init__(self${2:, params}):\n\t\t${3:# code}\n\t\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a class',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'class with inheritance',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'class ${1:Name}(${2:Parent}):\n\tdef __init__(self${3:, params}):\n\t\tsuper().__init__()\n\t\t${4:# code}\n\t\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a class with inheritance',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Control structures
                    {
                        label: 'if',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'if ${1:condition}:\n\t${2:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an if statement',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'if-else',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'if ${1:condition}:\n\t${2:# code}\nelse:\n\t${3:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an if-else statement',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'if-elif-else',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'if ${1:condition}:\n\t${2:# code}\nelif ${3:condition}:\n\t${4:# code}\nelse:\n\t${5:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an if-elif-else statement',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'for',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a for loop',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'for with range',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'for ${1:i} in range(${2:10}):\n\t${3:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a for loop with range',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'for with enumerate',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'for ${1:i}, ${2:item} in enumerate(${3:iterable}):\n\t${4:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a for loop with enumerate',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'while',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'while ${1:condition}:\n\t${2:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a while loop',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Error handling
                    {
                        label: 'try-except',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'try:\n\t${1:# code}\nexcept ${2:Exception} as ${3:e}:\n\t${4:# handle error}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a try-except block',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'try-except-finally',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'try:\n\t${1:# code}\nexcept ${2:Exception} as ${3:e}:\n\t${4:# handle error}\n\tpass\nfinally:\n\t${5:# cleanup}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a try-except-finally block',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'with statement',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'with ${1:resource} as ${2:alias}:\n\t${3:# code}\n\tpass',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a with statement',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Data structures
                    {
                        label: 'list comprehension',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '[${1:expression} for ${2:item} in ${3:iterable} if ${4:condition}]',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a list comprehension',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'dict comprehension',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '{${1:key}: ${2:value} for ${3:item} in ${4:iterable} if ${5:condition}}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a dictionary comprehension',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'set comprehension',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '{${1:expression} for ${2:item} in ${3:iterable} if ${4:condition}}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a set comprehension',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Imports
                    {
                        label: 'import',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'import ${1:module}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Import a module',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'from import',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'from ${1:module} import ${2:function}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Import specific function from module',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'from import as',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'from ${1:module} import ${2:function} as ${3:alias}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Import with alias',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    }
                ];

                return { suggestions }
            }
        });
    }

    const setupHTMLIntelliSense = (editor: monaco.editor.IStandaloneCodeEditor) => {
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position, context, token) => {
                const suggestions = [
                    // Basic structure
                    {
                        label: 'HTML5 document',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t${2:content}\n</body>\n</html>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a complete HTML5 document',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Head elements
                    {
                        label: 'head',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<head>\n\t${1:content}\n</head>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a head element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'meta charset',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<meta charset="UTF-8">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Add charset meta tag',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'meta viewport',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Add responsive viewport meta tag',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'title',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<title>${1:Page Title}</title>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a title element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'link stylesheet',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<link rel="stylesheet" href="${1:style.css}">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Link to external stylesheet',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'script',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<script src="${1:script.js}"></script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Link to external script',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Body elements
                    {
                        label: 'body',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<body>\n\t${1:content}\n</body>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a body element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Text elements
                    {
                        label: 'h1',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<h1>${1:Heading 1}</h1>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an h1 element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'h2',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<h2>${1:Heading 2}</h2>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an h2 element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'h3',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<h3>${1:Heading 3}</h3>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an h3 element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'p',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<p>${1:Paragraph text}</p>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a paragraph element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'span',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<span>${1:content}</span>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a span element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'strong',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<strong>${1:bold text}</strong>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a strong element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'em',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<em>${1:italic text}</em>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an emphasis element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'br',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<br>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a line break',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Container elements
                    {
                        label: 'div',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<div>\n\t${1:content}\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a div element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'section',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<section>\n\t${1:content}\n</section>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a section element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'article',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<article>\n\t${1:content}\n</article>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an article element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'header',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<header>\n\t${1:content}\n</header>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a header element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'footer',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<footer>\n\t${1:content}\n</footer>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a footer element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'nav',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<nav>\n\t${1:content}\n</nav>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a navigation element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'main',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<main>\n\t${1:content}\n</main>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a main element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'aside',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<aside>\n\t${1:content}\n</aside>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an aside element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Lists
                    {
                        label: 'ul',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<ul>\n\t<li>${1:item 1}</li>\n\t<li>${2:item 2}</li>\n</ul>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an unordered list',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'ol',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<ol>\n\t<li>${1:item 1}</li>\n\t<li>${2:item 2}</li>\n</ol>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an ordered list',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'li',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<li>${1:list item}</li>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a list item',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Forms
                    {
                        label: 'form',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<form action="${1:#}" method="${2:POST}">\n\t${3:content}\n</form>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a form element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'input',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<input type="${1:text}" name="${2:field}" placeholder="${3:placeholder}">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an input element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'input email',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<input type="email" name="${1:email}" placeholder="${2:email@example.com}" required>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an email input',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'input password',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<input type="password" name="${1:password}" placeholder="${2:password}" required>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a password input',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'textarea',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<textarea name="${1:message}" rows="${2:4}" cols="${3:50}" placeholder="${4:Enter your message}"></textarea>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a textarea element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'button',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<button type="${1:button}">${2:Click me}</button>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a button element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'select',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<select name="${1:option}">\n\t<option value="${2:value1}">${3:Option 1}</option>\n\t<option value="${4:value2}">${5:Option 2}</option>\n</select>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a select element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'label',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<label for="${1:field}">${2:Label text}</label>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a label element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Media elements
                    {
                        label: 'img',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<img src="${1:image.jpg}" alt="${2:description}" width="${3:300}" height="${4:200}">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an image element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'video',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<video width="${1:320}" height="${2:240}" controls>\n\t<source src="${3:movie.mp4}" type="video/mp4">\n\tYour browser does not support the video tag.\n</video>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a video element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'audio',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<audio controls>\n\t<source src="${1:audio.mp3}" type="audio/mpeg">\n\tYour browser does not support the audio element.\n</audio>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an audio element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Links
                    {
                        label: 'a',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<a href="${1:#}">${2:link text}</a>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a link element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'a external',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<a href="${1:https://example.com}" target="_blank" rel="noopener noreferrer">${2:external link}</a>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create an external link',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Tables
                    {
                        label: 'table',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: '<table>\n\t<thead>\n\t\t<tr>\n\t\t\t<th>${1:Header 1}</th>\n\t\t\t<th>${2:Header 2}</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>${3:Data 1}</td>\n\t\t\t<td>${4:Data 2}</td>\n\t\t</tr>\n\t</tbody>\n</table>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a table element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    }
                ];

                return { suggestions }
            }
        });
    }

    const setupCSSIntelliSense = (editor: monaco.editor.IStandaloneCodeEditor) => {
        monaco.languages.registerCompletionItemProvider('css', {
            provideCompletionItems: (model, position, context, token) => {
                const suggestions = [
                    // Layout
                    {
                        label: 'flexbox',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\nflex-direction: ${1:row}\njustify-content: ${2:center}\nalign-items: ${3:center}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox layout',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'flexbox column',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\nflex-direction: column;\njustify-content: ${1:center}\nalign-items: ${2:center}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox column layout',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'grid',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: grid;\ngrid-template-columns: ${1:repeat(auto-fit, minmax(200px, 1fr))}\ngap: ${2:1rem}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Grid layout',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'grid 2 columns',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: grid;\ngrid-template-columns: 1fr 1fr;\ngap: ${1:1rem}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Grid 2 columns',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'grid 3 columns',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: ${1:1rem}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Grid 3 columns',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Positioning
                    {
                        label: 'absolute center',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Absolute center positioning',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'fixed center',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'position: fixed;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Fixed center positioning',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'sticky header',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'position: sticky;\ntop: 0;\nz-index: 100;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sticky header positioning',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Typography
                    {
                        label: 'font family',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'font-family: ${1:"Arial", sans-serif}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Font family declaration',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'font size responsive',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'font-size: clamp(${1:1rem}, ${2:2.5vw}, ${3:2rem});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Responsive font size',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'text center',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'text-align: center;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Center text alignment',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'text truncate',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Text truncation with ellipsis',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Colors and backgrounds
                    {
                        label: 'gradient background',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'background: linear-gradient(${1:45deg}, ${2:#667eea}, ${3:#764ba2});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Linear gradient background',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'radial gradient',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'background: radial-gradient(circle, ${1:#667eea}, ${2:#764ba2});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Radial gradient background',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'box shadow',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'box-shadow: ${1:0 4px 6px} rgba(0, 0, 0, ${2:0.1});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Box shadow',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'text shadow',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'text-shadow: ${1:2px 2px 4px} rgba(0, 0, 0, ${2:0.5});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Text shadow',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Borders and radius
                    {
                        label: 'border radius',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'border-radius: ${1:8px}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Border radius',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'border',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'border: ${1:1px solid} ${2:#ccc}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Border declaration',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'border top',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'border-top: ${1:1px solid} ${2:#ccc}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Border top',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Spacing
                    {
                        label: 'margin auto',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'margin: ${1:0} auto;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Center with margin auto',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'padding',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'padding: ${1:1rem}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Padding declaration',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'margin',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'margin: ${1:1rem}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Margin declaration',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Animations
                    {
                        label: 'animation',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'animation: ${1:name} ${2:duration} ${3:easing} ${4:delay} ${5:iteration-count} ${6:direction}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Animation',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'keyframes',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '@keyframes ${1:name} {\n\t0% {\n\t\t${2:/* styles */}\n\t}\n\t100% {\n\t\t${3:/* styles */}\n\t}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Keyframes animation',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'transition',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'transition: ${1:all} ${2:0.3s} ${3:ease}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Transition',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'hover effect',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '&:hover {\n\t${1:/* hover styles */}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Hover effect',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Transform
                    {
                        label: 'transform scale',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'transform: scale(${1:1.1});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Scale transform',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'transform rotate',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'transform: rotate(${1:45deg});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Rotate transform',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'transform translate',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'transform: translate(${1:10px}, ${2:10px});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Translate transform',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Media queries
                    {
                        label: 'media query mobile',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '@media (max-width: ${1:768px}) {\n\t${2:/* mobile styles */}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Mobile media query',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'media query tablet',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '@media (min-width: ${1:768px}) and (max-width: ${2:1024px}) {\n\t${3:/* tablet styles */}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Tablet media query',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'media query desktop',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '@media (min-width: ${1:1024px}) {\n\t${2:/* desktop styles */}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Desktop media query',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Pseudo-elements
                    {
                        label: 'before pseudo-element',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '&::before {\n\tcontent: "${1:}";\n\t${2:/* styles */}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Before pseudo-element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'after pseudo-element',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '&::after {\n\tcontent: "${1:}";\n\t${2:/* styles */}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'After pseudo-element',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    // Flexbox utilities
                    {
                        label: 'flex center',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\njustify-content: center;\nalign-items: center;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox center',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'flex space between',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\njustify-content: space-between;\nalign-items: center;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox space between',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    },
                    {
                        label: 'flex wrap',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\nflex-wrap: wrap;\ngap: ${1:1rem}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox wrap',
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endColumn: position.column
                        }
                    }
                ];

                return { suggestions }
            }
        });
    }

    const setupJSONIntelliSense = (editor: monaco.editor.IStandaloneCodeEditor) => {
        // JSON já tem IntelliSense nativo do Monaco
        editor.updateOptions({
            formatOnPaste: true,
            formatOnType: true
        });
    }

    const setupCustomShortcuts = (editor: monaco.editor.IStandaloneCodeEditor) => {
        // Adicionar shortcuts personalizados
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            // Salvar arquivo
            console.log('Salvando arquivo...');
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR, () => {
            // Executar código
            console.log('Executando código...');
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
            // Duplicar linha
            const selection = editor.getSelection();
            if (selection) {
                const text = editor.getModel()?.getValueInRange(selection);
                if (text) {
                    editor.executeEdits('duplicate-line', [{
                        range: new monaco.Range(selection.endLineNumber + 1, 1, selection.endLineNumber + 1, 1),
                        text: text
                    }]);
                }
            }
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
            // Comentar/descomentar linha
            const selection = editor.getSelection();
            if (selection) {
                const model = editor.getModel();
                if (model) {
                    const startLine = selection.startLineNumber;
                    const endLine = selection.endLineNumber;

                    for (let line = startLine; line <= endLine; line++) {
                        const lineText = model.getLineContent(line);
                        const commentPrefix = language === 'python' ? '# ' : '// ';

                        if (lineText.startsWith(commentPrefix)) {
                            // Descomentar
                            model.pushEditOperations([], [{
                                range: new monaco.Range(line, 1, line, commentPrefix.length + 1),
                                text: ''
                            }], () => null);
                        } else {
                            // Comentar
                            model.pushEditOperations([], [{
                                range: new monaco.Range(line, 1, line, 1),
                                text: commentPrefix
                            }], () => null);
                        }
                    }
                }
            }
        });
    }

    const setupAutoFormatting = (editor: monaco.editor.IStandaloneCodeEditor, lang: string) => {
        // Configurar formatação automática
        editor.updateOptions({
            formatOnPaste: true,
            formatOnType: true});

        // Configurar formatação específica por linguagem
        if (lang === 'javascript' || lang === 'typescript') {
            editor.addAction({
                id: 'format-document',
                label: 'Format Document',
                keybindings: [monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF],
                run: () => {
                    editor.getAction('editor.action.formatDocument')?.run();
                }
            });
        }
    }

    return (
        <div className="monaco-editor-container" style={{ height }}>
            <Editor
                height={height}
                language={language}
                theme={theme}
                value={value}
                onChange={(value) => onChange(value || '')}
                onMount={handleEditorDidMount}
                options={{
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: readOnly,
                    cursorStyle: 'line',
                    automaticLayout: true,
                    ...options
                }}
            />
        </div>
    );
}

export default MonacoEditor;