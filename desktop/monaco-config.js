// Configuração alternativa para o Monaco Editor
// Este arquivo pode ser usado como fallback se o CDN falhar

window.monacoConfig = {
    // Configurações do Monaco Editor
    editor: {
        theme: 'vs-dark',
        fontSize: 14,
        minimap: { enabled: true },
        wordWrap: 'on',
        lineNumbers: 'on',
        automaticLayout: true,
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        wordBasedSuggestions: 'off',
        scrollBeyondLastLine: false,
        renderWhitespace: 'selection',
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        mouseWheelZoom: true
    },

    // Configurações de IntelliSense
    intelliSense: {
        triggerCharacters: ['!', '<', ' '],
        suggestions: [
            {
                label: '! → HTML5 Template',
                kind: 'Snippet',
                insertText: '<!DOCTYPE html>\\n<html lang="pt-BR">\\n<head>\\n\\t<meta charset="UTF-8">\\n\\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\\n\\t<title>${1:Título}</title>\\n</head>\\n<body>\\n\\t<h1>${2:Cabeçalho}</h1>\\n\\t<p>${3:Conteúdo}</p>\\n</body>\\n</html>',
                detail: 'Template HTML5 completo',
                sortText: '!',
                preselect: true
            },
            {
                label: 'div',
                kind: 'Snippet',
                insertText: '<div>${1:conteúdo}</div>',
                detail: 'Container genérico'
            },
            {
                label: 'p',
                kind: 'Snippet',
                insertText: '<p>${1:parágrafo}</p>',
                detail: 'Parágrafo de texto'
            },
            {
                label: 'h1',
                kind: 'Snippet',
                insertText: '<h1>${1:título}</h1>',
                detail: 'Título principal'
            },
            {
                label: 'a',
                kind: 'Snippet',
                insertText: '<a href="${1:#}">${2:texto do link}</a>',
                detail: 'Link para outra página'
            },
            {
                label: 'img',
                kind: 'Snippet',
                insertText: '<img src="${1:imagem.jpg}" alt="${2:descrição}">',
                detail: 'Imagem da página'
            }
        ]
    }
};

// Função para carregar Monaco Editor com fallback - Versão para Electron
window.loadMonacoWithFallback = function () {
    return new Promise((resolve, reject) => {
        // Verificar se o Monaco já está carregado
        if (window.monaco) {
            resolve(window.monaco);
            return;
        }

        console.log('Carregando Monaco Editor via CDN...');

        // Tentar carregar via CDN primeiro
        const cdnScript = document.createElement('script');
        cdnScript.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';

        cdnScript.onload = () => {
            console.log('Script do Monaco carregado, configurando...');

            try {
                require.config({
                    paths: {
                        'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs'
                    }
                });

                require(['vs/editor/editor.main'], (monaco) => {
                    console.log('Monaco Editor carregado com sucesso!');
                    window.monaco = monaco;
                    resolve(monaco);
                }, (error) => {
                    console.warn('CDN falhou, tentando fallback local...', error);
                    loadMonacoLocal(resolve, reject);
                });
            } catch (error) {
                console.warn('Erro na configuração CDN, tentando fallback local...', error);
                loadMonacoLocal(resolve, reject);
            }
        };

        cdnScript.onerror = (error) => {
            console.warn('CDN não disponível, tentando fallback local...', error);
            loadMonacoLocal(resolve, reject);
        };

        document.head.appendChild(cdnScript);

        // Função de fallback local
        function loadMonacoLocal(resolve, reject) {
            console.log('Tentando carregar Monaco Editor localmente...');

            const localScript = document.createElement('script');
            localScript.src = './node_modules/monaco-editor/min/vs/loader.js';

            localScript.onload = () => {
                console.log('Script local do Monaco carregado, configurando...');

                try {
                    require.config({
                        paths: {
                            'vs': './node_modules/monaco-editor/min/vs'
                        }
                    });

                    require(['vs/editor/editor.main'], (monaco) => {
                        console.log('Monaco Editor carregado localmente com sucesso!');
                        window.monaco = monaco;
                        resolve(monaco);
                    }, (error) => {
                        console.error('Erro ao carregar Monaco Editor localmente:', error);
                        reject(new Error('Não foi possível carregar o Monaco Editor'));
                    });
                } catch (error) {
                    console.error('Erro na configuração local do Monaco:', error);
                    reject(error);
                }
            };

            localScript.onerror = (error) => {
                console.error('Erro ao carregar script local do Monaco:', error);
                reject(new Error('Não foi possível carregar o Monaco Editor localmente'));
            };

            document.head.appendChild(localScript);
        }
    });
};
