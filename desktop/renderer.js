const { ipcRenderer } = require('electron');

// Estado da aplicação
let currentFile = 'index.html';
let files = {
    'index.html': `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fenix IDE 2.0 - Desktop</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Bem-vindo ao Fenix IDE 2.0 Desktop!</h1>
    <p>Este é um exemplo de código HTML. Digite ! e pressione Tab para ver o template HTML5.</p>
    <button onclick="alert('Olá do Fenix IDE!')">Clique aqui</button>
    <script src="script.js"></script>
</body>
</html>`,
    'style.css': `/* Estilos CSS para o Fenix IDE 2.0 */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-align: center;
    max-width: 600px;
}

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 1.1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

button:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}`,
    'script.js': `// JavaScript para o Fenix IDE 2.0 Desktop
console.log('Fenix IDE 2.0 Desktop carregado!');

// Função para demonstrar interatividade
function showWelcome() {
    const messages = [
        'Bem-vindo ao Fenix IDE 2.0 Desktop!',
        'Este é um IDE poderoso para desenvolvimento web.',
        'Experimente o IntelliSense digitando ! e pressionando Tab.',
        'Use Ctrl+Space para forçar sugestões de código.'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
}

// Adicionar evento de clique ao botão
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', showWelcome);
    }
});

// Função para demonstrar recursos do IDE
function demonstrateFeatures() {
    console.log('Recursos do Fenix IDE 2.0:');
    console.log('- IntelliSense avançado');
    console.log('- Syntax highlighting');
    console.log('- Auto-completion');
    console.log('- Live preview');
    console.log('- File explorer');
    console.log('- Multi-tab support');
}`
};

let editor = null;
let isRunning = false;

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', function () {
    initializeMonaco();
    setupEventListeners();
    loadFile(currentFile);
});

// Configurar listeners de eventos
function setupEventListeners() {
    // Listeners do menu
    ipcRenderer.on('menu-new-file', () => newFile());
    ipcRenderer.on('menu-open-file', (event, data) => openFileFromMenu(data));
    ipcRenderer.on('menu-save-file', () => saveFile());
    ipcRenderer.on('menu-save-as', (event, filePath) => saveAsFile(filePath));
    ipcRenderer.on('menu-run-code', () => runCode());
    ipcRenderer.on('menu-stop-code', () => stopCode());

    // Listeners dos arquivos no explorer
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            const fileName = item.dataset.file;
            loadFile(fileName);
        });
    });
}

// Inicializar Monaco Editor
async function initializeMonaco() {
    try {
        console.log('Iniciando carregamento do Monaco Editor...');

        // Carregar Monaco Editor
        const monaco = await (window.loadMonacoSimple ? window.loadMonacoSimple() : loadMonacoEditor());
        console.log('Monaco Editor carregado com sucesso!');

        // Aguardar um pouco para garantir que o DOM esteja pronto
        await new Promise(resolve => setTimeout(resolve, 100));

        // Configurar o editor
        const editorElement = document.getElementById('monaco-editor');
        if (!editorElement) {
            throw new Error('Elemento do editor não encontrado');
        }

        editor = monaco.editor.create(editorElement, {
            value: files[currentFile] || '',
            language: getLanguageFromFile(currentFile),
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
        });

        // Configurar IntelliSense
        if (window.setupMonacoIntelliSense) {
            window.setupMonacoIntelliSense(monaco);
        } else {
            setupIntelliSense(monaco);
        }

        // Configurar eventos do editor
        editor.onDidChangeModelContent(() => {
            updateFileContent(currentFile, editor.getValue());
        });

        // Esconder loading
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.classList.add('hidden');
        }

        console.log('Monaco Editor inicializado com sucesso!');

        // Mostrar notificação de sucesso
        showNotification('Monaco Editor carregado com sucesso!');

    } catch (error) {
        console.error('Erro ao inicializar Monaco Editor:', error);
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.textContent = `Erro ao carregar Monaco Editor: ${error.message}`;
        }

        // Tentar carregar novamente após 3 segundos
        setTimeout(() => {
            console.log('Tentando carregar Monaco Editor novamente...');
            initializeMonaco();
        }, 3000);
    }
}

// Carregar Monaco Editor - Versão simplificada para Electron
function loadMonacoEditor() {
    return new Promise((resolve, reject) => {
        // Verificar se o Monaco já está carregado
        if (window.monaco) {
            resolve(window.monaco);
            return;
        }

        console.log('Carregando Monaco Editor via CDN...');

        // Carregar Monaco Editor via CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';

        script.onload = () => {
            console.log('Script do Monaco carregado, configurando...');

            try {
                // Configurar o require para usar o CDN
                require.config({
                    paths: {
                        'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs'
                    }
                });

                // Carregar o Monaco Editor
                require(['vs/editor/editor.main'], (monaco) => {
                    console.log('Monaco Editor carregado com sucesso!');
                    window.monaco = monaco;
                    resolve(monaco);
                }, (error) => {
                    console.error('Erro ao carregar Monaco Editor via CDN:', error);
                    // Tentar carregar localmente como fallback
                    loadMonacoLocal(resolve, reject);
                });

            } catch (error) {
                console.error('Erro na configuração do Monaco:', error);
                loadMonacoLocal(resolve, reject);
            }
        };

        script.onerror = (error) => {
            console.error('Erro ao carregar script do Monaco:', error);
            loadMonacoLocal(resolve, reject);
        };

        document.head.appendChild(script);
    });
}

// Fallback para carregar Monaco localmente
function loadMonacoLocal(resolve, reject) {
    console.log('Tentando carregar Monaco Editor localmente...');

    const script = document.createElement('script');
    script.src = './node_modules/monaco-editor/min/vs/loader.js';

    script.onload = () => {
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

    script.onerror = (error) => {
        console.error('Erro ao carregar script local do Monaco:', error);
        reject(new Error('Não foi possível carregar o Monaco Editor localmente'));
    };

    document.head.appendChild(script);
}

// Configurar IntelliSense
function setupIntelliSense(monaco) {
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

    // Comandos do editor
    editor.addCommand(monaco.KeyCode.Tab, () => {
        editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
        editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
    });

    console.log('IntelliSense configurado com sucesso!');
}

// Funções de controle da janela
function minimizeWindow() {
    const { remote } = require('electron');
    remote.getCurrentWindow().minimize();
}

function maximizeWindow() {
    const { remote } = require('electron');
    const window = remote.getCurrentWindow();
    if (window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize();
    }
}

function closeWindow() {
    const { remote } = require('electron');
    remote.getCurrentWindow().close();
}

// Funções de arquivo
function newFile() {
    const fileName = prompt('Nome do arquivo:', 'novo-arquivo.html');
    if (fileName) {
        files[fileName] = '';
        addFileToExplorer(fileName);
        loadFile(fileName);
    }
}

function openFile() {
    // Esta função será chamada pelo menu
    console.log('Abrir arquivo via menu');
}

function openFileFromMenu(data) {
    files[data.path] = data.content;
    addFileToExplorer(data.path);
    loadFile(data.path);
}

function saveFile() {
    if (currentFile && files[currentFile] !== undefined) {
        // Em uma implementação real, salvaria no disco
        console.log(`Arquivo ${currentFile} salvo!`);
        showNotification('Arquivo salvo com sucesso!');
    }
}

function saveAsFile(filePath) {
    if (currentFile && files[currentFile] !== undefined) {
        // Em uma implementação real, salvaria no disco
        console.log(`Arquivo salvo como: ${filePath}`);
        showNotification('Arquivo salvo com sucesso!');
    }
}

function loadFile(fileName) {
    if (files[fileName]) {
        currentFile = fileName;

        // Atualizar UI
        updateActiveFile(fileName);
        updateActiveTab(fileName);

        // Atualizar editor
        if (editor) {
            editor.setValue(files[fileName]);
            const language = getLanguageFromFile(fileName);
            monaco.editor.setModelLanguage(editor.getModel(), language);
        }

        console.log(`Arquivo ${fileName} carregado!`);
    }
}

function updateFileContent(fileName, content) {
    if (files[fileName] !== undefined) {
        files[fileName] = content;
    }
}

function addFileToExplorer(fileName) {
    const explorer = document.querySelector('.file-explorer');
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.file = fileName;
    fileItem.innerHTML = `<span>📄</span> ${fileName}`;
    fileItem.addEventListener('click', () => loadFile(fileName));
    explorer.appendChild(fileItem);
}

function updateActiveFile(fileName) {
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.file === fileName) {
            item.classList.add('active');
        }
    });
}

function updateActiveTab(fileName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.file === fileName) {
            tab.classList.add('active');
        }
    });
}

function closeTab(fileName) {
    if (Object.keys(files).length > 1) {
        delete files[fileName];

        // Remover do explorer
        const fileItem = document.querySelector(`[data-file="${fileName}"]`);
        if (fileItem) {
            fileItem.remove();
        }

        // Remover tab
        const tab = document.querySelector(`.tab[data-file="${fileName}"]`);
        if (tab) {
            tab.remove();
        }

        // Carregar outro arquivo se necessário
        if (currentFile === fileName) {
            const remainingFiles = Object.keys(files);
            if (remainingFiles.length > 0) {
                loadFile(remainingFiles[0]);
            }
        }
    }
}

// Funções de execução
function runCode() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById('runBtn').innerHTML = '<span>⏹️</span> Parar';
        document.getElementById('runBtn').disabled = false;

        // Gerar preview
        generatePreview();

        // Simular execução
        setTimeout(() => {
            isRunning = false;
            document.getElementById('runBtn').innerHTML = '<span>▶️</span> Executar';
            showNotification('Código executado com sucesso!');
        }, 1000);
    }
}

function stopCode() {
    isRunning = false;
    document.getElementById('runBtn').innerHTML = '<span>▶️</span> Executar';
    showNotification('Execução interrompida!');
}

function generatePreview() {
    const htmlContent = files['index.html'] || '';
    const cssContent = files['style.css'] || '';
    const jsContent = files['script.js'] || '';

    const fullHTML = htmlContent.replace(
        '<link rel="stylesheet" href="style.css">',
        `<style>${cssContent}</style>`
    ).replace(
        '<script src="script.js"></script>',
        `<script>${jsContent}</script>`
    );

    const previewFrame = document.getElementById('previewFrame');
    previewFrame.srcdoc = fullHTML;
}

function togglePreview() {
    const previewPanel = document.getElementById('previewPanel');
    const previewBtn = document.getElementById('previewBtn');

    if (previewPanel.classList.contains('active')) {
        previewPanel.classList.remove('active');
        previewBtn.innerHTML = '<span>👁️</span> Preview';
    } else {
        previewPanel.classList.add('active');
        previewBtn.innerHTML = '<span>👁️</span> Ocultar';
        generatePreview();
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
}

// Funções utilitárias
function getLanguageFromFile(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
        case 'html':
        case 'htm':
            return 'html';
        case 'css':
            return 'css';
        case 'js':
            return 'javascript';
        case 'json':
            return 'json';
        default:
            return 'plaintext';
    }
}

function showNotification(message) {
    console.log('Notification:', message);

    // Criar notificação visual
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007acc;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    console.log('Fenix IDE 2.0 Desktop inicializado!');
}
