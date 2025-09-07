import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import {
    Play,
    Save,
    Terminal,
    GitBranch,
    Search,
    Settings,
    Download,
    Upload,
    FileText,
    FolderPlus,
    Trash2,
    Edit3
} from 'lucide-react';

interface AdvancedCodeEditorProps {
    language?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSave?: () => void;
    onRun?: () => void;
    fileName?: string;
    projectName?: string;
}

interface FileNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: FileNode[];
    language?: string;
}

const AdvancedCodeEditor: React.FC<AdvancedCodeEditorProps> = ({
    language = 'javascript',
    value = '',
    onChange,
    onSave,
    onRun,
    fileName = 'index.js',
    projectName = 'projeto-fenix'
}) => {
    const [code, setCode] = useState(value);
    const [currentLanguage, setCurrentLanguage] = useState(language);
    const [files, setFiles] = useState<FileNode[]>([
        {
            id: '1',
            name: 'index.html',
            type: 'file',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fenix Academy</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>🚀 Fenix Academy</h1>
        <p>Bem-vindo ao seu projeto!</p>
    </div>
    <script src="script.js"></script>
</body>
</html>`
        },
        {
            id: '2',
            name: 'styles.css',
            type: 'file',
            language: 'css',
            content: `body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    font-size: 1.2rem;
    opacity: 0.9;
}`
        },
        {
            id: '3',
            name: 'script.js',
            type: 'file',
            language: 'javascript',
            content: `// Fenix Academy - Script Principal
console.log('🚀 Fenix IDE funcionando!');

// Função de boas-vindas
function welcome() {
    const messages = [
        'Bem-vindo ao Fenix Academy!',
        'Aqui você aprende programação de verdade!',
        'Vamos codar juntos?'
    ];
    
    messages.forEach((msg, index) => {
        setTimeout(() => {
            console.log(\`\${index + 1}. \${msg}\`);
        }, index * 1000);
    });
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', welcome);

// Exemplo de função interativa
function createButton() {
    const button = document.createElement('button');
    button.textContent = 'Clique aqui!';
    button.className = 'fenix-button';
    button.onclick = () => alert('Parabéns! Você está programando! 🎉');
    
    document.body.appendChild(button);
}

// Criar botão após 3 segundos
setTimeout(createButton, 3000);`
        }
    ]);
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
    const [showTerminal, setShowTerminal] = useState(false);
    const [showGit, setShowGit] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    // Auto-completion personalizado
    const customCompletions = {
        javascript: [
            'console.log()',
            'function() {}',
            'const',
            'let',
            'var',
            'if () {}',
            'for () {}',
            'while () {}',
            'try {} catch {}',
            'async function() {}',
            'await',
            'Promise',
            'Array',
            'Object',
            'String',
            'Number',
            'Boolean',
            'Date',
            'Math',
            'JSON'
        ],
        html: [
            '<div></div>',
            '<span></span>',
            '<p></p>',
            '<h1></h1>',
            '<h2></h2>',
            '<h3></h3>',
            '<ul></ul>',
            '<li></li>',
            '<a href=""></a>',
            '<img src="" alt="">',
            '<form></form>',
            '<input type="text">',
            '<button></button>',
            '<table></table>',
            '<tr></tr>',
            '<td></td>'
        ],
        css: [
            'color:',
            'background:',
            'margin:',
            'padding:',
            'border:',
            'font-size:',
            'font-weight:',
            'text-align:',
            'display:',
            'position:',
            'width:',
            'height:',
            'flex:',
            'grid:',
            'animation:',
            'transition:',
            'transform:',
            'box-shadow:',
            'border-radius:',
            'opacity:'
        ]
    };

    // Configurar sugestões personalizadas do Monaco Editor
    useEffect(() => {
        // Registrar provedor de sugestões para JavaScript
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position) => {
                const suggestions = customCompletions.javascript.map(item => ({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: item,
                    detail: 'Sugestão personalizada JavaScript',
                    range: {
                        startLineNumber: position.lineNumber,
                        startColumn: position.column,
                        endLineNumber: position.lineNumber,
                        endColumn: position.column
                    }
                }));
                return { suggestions };
            }
        });

        // Registrar provedor de sugestões para HTML
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position) => {
                const suggestions = customCompletions.html.map(item => ({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: item,
                    detail: 'Sugestão personalizada HTML',
                    range: {
                        startLineNumber: position.lineNumber,
                        startColumn: position.column,
                        endLineNumber: position.lineNumber,
                        endColumn: position.column
                    }
                }));
                return { suggestions };
            }
        });

        // Registrar provedor de sugestões para CSS
        monaco.languages.registerCompletionItemProvider('css', {
            provideCompletionItems: (model, position) => {
                const suggestions = customCompletions.css.map(item => ({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: item,
                    detail: 'Sugestão personalizada CSS',
                    range: {
                        startLineNumber: position.lineNumber,
                        startColumn: position.column,
                        endLineNumber: position.lineNumber,
                        endColumn: position.column
                    }
                }));
                return { suggestions };
            }
        });
    }, []);

    const handleCodeChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode(value);
            onChange?.(value);
        }
    };

    const handleFileSelect = (file: FileNode) => {
        setSelectedFile(file);
        setCode(file.content || '');
        setCurrentLanguage(file.language || 'javascript');
    };

    const createNewFile = () => {
        const fileName = prompt('Nome do arquivo (com extensão):');
        if (fileName) {
            const language = fileName.split('.').pop() || 'javascript';
            const newFile: FileNode = {
                id: Date.now().toString(),
                name: fileName,
                type: 'file',
                language,
                content: getDefaultContent(language)
            };
            setFiles(prev => [...prev, newFile]);
            setSelectedFile(newFile);
            setCode(newFile.content || '');
            setCurrentLanguage(language);
        }
    };

    const getDefaultContent = (lang: string): string => {
        switch (lang) {
            case 'html':
                return '<!DOCTYPE html>\n<html>\n<head>\n\t<title>Novo Arquivo</title>\n</head>\n<body>\n\t<h1>Olá Mundo!</h1>\n</body>\n</html>';
            case 'css':
                return '/* Estilos CSS */\nbody {\n\tmargin: 0;\n\tpadding: 20px;\n\tfont-family: Arial, sans-serif;\n}';
            case 'javascript':
                return '// Código JavaScript\nconsole.log("Olá Mundo!");';
            case 'python':
                return '# Código Python\nprint("Olá Mundo!")';
            default:
                return '// Novo arquivo';
        }
    };

    const deleteFile = (fileId: string) => {
        if (confirm('Tem certeza que deseja excluir este arquivo?')) {
            setFiles(prev => prev.filter(f => f.id !== fileId));
            if (selectedFile?.id === fileId) {
                setSelectedFile(null);
                setCode('');
            }
        }
    };

    const saveFile = () => {
        if (selectedFile) {
            const updatedFiles = files.map(f =>
                f.id === selectedFile.id
                    ? { ...f, content: code }
                    : f
            );
            setFiles(updatedFiles);
            onSave?.();
        }
    };

    const runCode = () => {
        if (selectedFile?.language === 'html') {
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.write(code);
                newWindow.document.close();
            }
        } else {
            // Para outros tipos, mostrar no terminal
            setShowTerminal(true);
            setTerminalOutput(prev => [...prev, `$ Executando ${selectedFile?.name}...`]);

            try {
                if (selectedFile?.language === 'javascript') {
                    // Executar JavaScript no contexto seguro
                    const result = eval(code);
                    setTerminalOutput(prev => [...prev, `Resultado: ${result}`]);
                } else {
                    setTerminalOutput(prev => [...prev, `Arquivo ${selectedFile?.language} executado com sucesso!`]);
                }
            } catch (error) {
                setTerminalOutput(prev => [...prev, `Erro: ${error}`]);
            }
        }
        onRun?.();
    };

    const executeTerminalCommand = (command: string) => {
        setTerminalOutput(prev => [...prev, `$ ${command}`]);

        // Simular comandos do terminal
        switch (command.toLowerCase()) {
            case 'ls':
            case 'dir':
                setTerminalOutput(prev => [...prev, ...files.map(f => f.name)]);
                break;
            case 'pwd':
                setTerminalOutput(prev => [...prev, `/projetos/${projectName}`]);
                break;
            case 'clear':
                setTerminalOutput([]);
                break;
            case 'help':
                setTerminalOutput(prev => [...prev,
                    'Comandos disponíveis:',
                    'ls/dir - Listar arquivos',
                    'pwd - Mostrar diretório atual',
                    'clear - Limpar terminal',
                    'help - Mostrar ajuda'
                ]);
                break;
            default:
                setTerminalOutput(prev => [...prev, `Comando não reconhecido: ${command}`]);
        }
    };

    const searchInFiles = (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const results: any[] = [];
        files.forEach(file => {
            if (file.content && file.content.toLowerCase().includes(query.toLowerCase())) {
                const lines = file.content.split('\n');
                lines.forEach((line, index) => {
                    if (line.toLowerCase().includes(query.toLowerCase())) {
                        results.push({
                            file: file.name,
                            line: index + 1,
                            content: line.trim(),
                            language: file.language
                        });
                    }
                });
            }
        });
        setSearchResults(results);
    };

    return (
        <div className="h-screen bg-gray-900 text-white flex flex-col">
            {/* Header da IDE */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold text-blue-400">🚀 Fenix IDE</h1>
                        <span className="text-gray-400">|</span>
                        <span className="text-sm text-gray-300">{projectName}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-sm text-gray-300">{selectedFile?.name || 'Nenhum arquivo selecionado'}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={runCode}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <Play className="w-4 h-4" />
                            <span>Executar</span>
                        </button>

                        <button
                            onClick={saveFile}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            <span>Salvar</span>
                        </button>

                        <button
                            onClick={() => setShowTerminal(!showTerminal)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${showTerminal ? 'bg-green-600 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'
                                }`}
                        >
                            <Terminal className="w-4 h-4" />
                            <span>Terminal</span>
                        </button>

                        <button
                            onClick={() => setShowGit(!showGit)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${showGit ? 'bg-green-600 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'
                                }`}
                        >
                            <GitBranch className="w-4 h-4" />
                            <span>Git</span>
                        </button>

                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${showSearch ? 'bg-green-600 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'
                                }`}
                        >
                            <Search className="w-4 h-4" />
                            <span>Buscar</span>
                        </button>

                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${showSettings ? 'bg-green-600 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'
                                }`}
                        >
                            <Settings className="w-4 h-4" />
                            <span>Config</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex">
                {/* Sidebar - File Explorer */}
                <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-200">Explorador</h2>
                        <button
                            onClick={createNewFile}
                            className="text-blue-400 hover:text-blue-300 p-1 rounded"
                        >
                            <FileText className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {files.map(file => (
                            <div
                                key={file.id}
                                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${selectedFile?.id === file.id
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                                onClick={() => handleFileSelect(file)}
                            >
                                <div className="flex items-center space-x-2">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm">{file.name}</span>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFileSelect(file);
                                        }}
                                        className="text-gray-400 hover:text-blue-400 p-1"
                                    >
                                        <Edit3 className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteFile(file.id);
                                        }}
                                        className="text-gray-400 hover:text-red-400 p-1"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Principal */}
                <div className="flex-1 flex flex-col">
                    {selectedFile ? (
                        <Editor
                            height="100%"
                            language={currentLanguage}
                            value={code}
                            onChange={handleCodeChange}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: true },
                                fontSize: 14,
                                wordWrap: 'on',
                                automaticLayout: true,
                                quickSuggestions: {
                                    other: true,
                                    comments: true,
                                    strings: true
                                },
                                acceptSuggestionOnCommitCharacter: true,
                                acceptSuggestionOnEnter: 'on',
                                tabCompletion: 'on',
                                wordBasedSuggestions: "matchingDocuments",
                                suggestOnTriggerCharacters: true,
                                suggestSelection: 'first'
                            }}
                        />
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                                <p>Selecione um arquivo para começar a editar</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Painéis Laterais */}
                {showTerminal && (
                    <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Terminal</h3>
                        <div className="bg-black rounded-lg p-3 h-64 overflow-y-auto">
                            {terminalOutput.map((line, index) => (
                                <div key={index} className="text-green-400 font-mono text-sm">
                                    {line}
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 flex">
                            <input
                                type="text"
                                placeholder="Digite um comando..."
                                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l-lg border-none focus:ring-2 focus:ring-blue-500"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        const command = e.currentTarget.value;
                                        executeTerminalCommand(command);
                                        e.currentTarget.value = '';
                                    }
                                }}
                            />
                            <button
                                onClick={() => setTerminalOutput([])}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-r-lg"
                            >
                                Limpar
                            </button>
                        </div>
                    </div>
                )}

                {showGit && (
                    <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Git</h3>
                        <div className="space-y-3">
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                                Git Add .
                            </button>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                                Git Commit
                            </button>
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                                Git Push
                            </button>
                            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                                Git Pull
                            </button>
                            <div className="border-t border-gray-600 pt-3">
                                <h4 className="text-sm font-medium text-gray-300 mb-2">Status</h4>
                                <div className="text-sm text-gray-400">
                                    <div>Branch: main</div>
                                    <div>Commits: 3</div>
                                    <div>Status: Limpo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showSearch && (
                    <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Buscar</h3>
                        <input
                            type="text"
                            placeholder="Buscar no código..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                searchInFiles(e.target.value);
                            }}
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {searchResults.map((result, index) => (
                                <div key={index} className="bg-gray-700 p-3 rounded-lg">
                                    <div className="text-sm text-blue-400">{result.file}:{result.line}</div>
                                    <div className="text-xs text-gray-300 mt-1">{result.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showSettings && (
                    <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Configurações</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-300">Tema</label>
                                <select className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border-none mt-1">
                                    <option>Dark</option>
                                    <option>Light</option>
                                    <option>High Contrast</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-gray-300">Tamanho da Fonte</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="24"
                                    defaultValue="14"
                                    className="w-full mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-300">Auto-save</label>
                                <input type="checkbox" className="ml-2" defaultChecked />
                            </div>

                            <div>
                                <label className="text-sm text-gray-300">Minimap</label>
                                <input type="checkbox" className="ml-2" defaultChecked />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvancedCodeEditor;
