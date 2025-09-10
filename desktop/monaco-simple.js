// Carregamento simples do Monaco Editor para Electron
// Esta versão evita problemas de caminho do Electron

window.loadMonacoSimple = function () {
    return new Promise((resolve, reject) => {
        // Verificar se o Monaco já está carregado
        if (window.monaco) {
            resolve(window.monaco);
            return;
        }

        console.log('Carregando Monaco Editor via script direto...');

        // Criar script para carregar Monaco Editor
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';

        script.onload = () => {
            console.log('Script do Monaco carregado, configurando...');

            try {
                // Configurar require
                require.config({
                    paths: {
                        'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs'
                    }
                });

                // Carregar Monaco Editor
                require(['vs/editor/editor.main'], (monaco) => {
                    console.log('Monaco Editor carregado com sucesso!');
                    window.monaco = monaco;
                    resolve(monaco);
                }, (error) => {
                    console.error('Erro ao carregar Monaco Editor:', error);
                    reject(error);
                });

            } catch (error) {
                console.error('Erro na configuração:', error);
                reject(error);
            }
        };

        script.onerror = (error) => {
            console.error('Erro ao carregar script:', error);
            reject(error);
        };

        document.head.appendChild(script);
    });
};

// Função para criar editor Monaco
window.createMonacoEditor = function (element, options = {}) {
    if (!window.monaco) {
        throw new Error('Monaco Editor não está carregado');
    }

    const defaultOptions = {
        theme: 'vs-dark',
        fontSize: 14,
        minimap: { enabled: true },
        wordWrap: 'on',
        lineNumbers: 'on',
        automaticLayout: true,
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        wordBasedSuggestions: 'off'
    };

    const finalOptions = { ...defaultOptions, ...options };

    return window.monaco.editor.create(element, finalOptions);
};

// Função para configurar IntelliSense
window.setupMonacoIntelliSense = function (monaco) {
    if (!monaco) {
        console.error('Monaco não está disponível');
        return;
    }

    // IntelliSense para HTML
    monaco.languages.registerCompletionItemProvider('html', {
        triggerCharacters: ['!', '<', ' '],
        provideCompletionItems: (model, position) => {
            const word = model.getWordUntilPosition(position);
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
            };

            return {
                suggestions: [
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

    console.log('IntelliSense configurado com sucesso!');
};







