'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Play,
    Square,
    RotateCcw,
    Download,
    Copy,
    Save,
    FileText,
    Code,
    Terminal,
    Settings,
    Maximize2,
    Minimize2,
    ChevronDown,
    ChevronRight,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock
} from 'lucide-react';

interface CodePlaygroundProps {
    className?: string;
    initialCode?: string;
    language?: string;
    onCodeChange?: (code: string) => void;
    onRun?: (code: string, language: string) => void;
    onSave?: (code: string, name: string) => void;
}

interface CodeFile {
    id: string;
    name: string;
    content: string;
    language: string;
    isActive: boolean;
    isModified: boolean;
}

interface ExecutionResult {
    output: string;
    error?: string;
    executionTime: number;
    success: boolean;
}

const supportedLanguages = [
    { value: 'javascript', label: 'JavaScript', extension: '.js' },
    { value: 'typescript', label: 'TypeScript', extension: '.ts' },
    { value: 'python', label: 'Python', extension: '.py' },
    { value: 'html', label: 'HTML', extension: '.html' },
    { value: 'css', label: 'CSS', extension: '.css' },
    { value: 'json', label: 'JSON', extension: '.json' }
];

const defaultCode = {
    javascript: `// JavaScript Code Playground
function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);

// Try some array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);`,
    typescript: `// TypeScript Code Playground
interface User {
  name: string;
  age: number;
  email: string;
}

function createUser(name: string, age: number, email: string): User {
  return { name, age, email };
}

const user = createUser("John Doe", 30, "john@example.com");
console.log("User:", user);

// Generic function example
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirst([1, 2, 3, 4, 5]);
console.log("First number:", firstNumber);`,
    python: `# Python Code Playground
def greet(name):
    return f"Hello, {name}!"

message = greet("World")
print(message)

# List comprehension example
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Doubled numbers:", doubled)

# Class example
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"I'm {self.name} and I'm {self.age} years old"

person = Person("Alice", 25)
print(person.introduce())`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Playground</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Playground</h1>
        <p>This is a sample HTML page with some styling.</p>
        <button class="button" onclick="alert('Hello from HTML!')">
            Click me!
        </button>
    </div>
</body>
</html>`,
    css: `/* CSS Playground */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    max-width: 500px;
    width: 100%;
}

.title {
    color: #333;
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 300;
}

.button {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: transform 0.2s ease;
    width: 100%;
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.button:active {
    transform: translateY(0);
}`,
    json: `{
  "name": "Code Playground",
  "version": "1.0.0",
  "description": "A simple code playground for learning and testing",
  "features": [
    "Multiple language support",
    "Real-time execution",
    "Code sharing",
    "Syntax highlighting"
  ],
  "supportedLanguages": {
    "javascript": {
      "extension": ".js",
      "runtime": "Node.js"
    },
    "python": {
      "extension": ".py",
      "runtime": "Python 3"
    },
    "typescript": {
      "extension": ".ts",
      "runtime": "TypeScript"
    }
  },
  "settings": {
    "theme": "dark",
    "fontSize": 14,
    "autoSave": true,
    "lineNumbers": true
  }
}`
};

export function CodePlayground({
    className = '',
    initialCode = '',
    language = 'javascript',
    onCodeChange,
    onRun,
    onSave
}: CodePlaygroundProps) {
    const [files, setFiles] = useState<CodeFile[]>([
        {
            id: '1',
            name: 'main.js',
            content: initialCode || defaultCode.javascript,
            language: 'javascript',
            isActive: true,
            isModified: false
        }
    ]);
    const [activeFileId, setActiveFileId] = useState('1');
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<ExecutionResult | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState({
        fontSize: 14,
        theme: 'dark',
        autoSave: true,
        lineNumbers: true
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    const activeFile = files.find(f => f.id === activeFileId);

    useEffect(() => {
        if (activeFile) {
            onCodeChange?.(activeFile.content);
        }
    }, [activeFile, onCodeChange]);

    useEffect(() => {
        if (result && outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [result]);

    const handleCodeChange = (newCode: string) => {
        setFiles(prev => prev.map(file =>
            file.id === activeFileId
                ? { ...file, content: newCode, isModified: true }
                : file
        ));
    };

    const handleRun = async () => {
        if (!activeFile || isRunning) return;

        setIsRunning(true);
        setResult(null);

        const startTime = Date.now();

        try {
            // Simulate code execution
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

            // Mock execution result
            const executionTime = Date.now() - startTime;
            const success = Math.random() > 0.1; // 90% success rate

            const mockResult: ExecutionResult = {
                output: success
                    ? `Hello, World!\nCode executed successfully in ${executionTime}ms`
                    : '',
                error: success
                    ? undefined
                    : 'SyntaxError: Unexpected token at line 3',
                executionTime,
                success
            };

            setResult(mockResult);
            onRun?.(activeFile.content, activeFile.language);
        } catch (error) {
            setResult({
                output: '',
                error: error instanceof Error ? error.message : 'Unknown error occurred',
                executionTime: Date.now() - startTime,
                success: false
            });
        } finally {
            setIsRunning(false);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
        setResult(null);
    };

    const handleReset = () => {
        if (activeFile) {
            const defaultContent = defaultCode[activeFile.language as keyof typeof defaultCode] || '';
            handleCodeChange(defaultContent);
        }
    };

    const handleSave = () => {
        if (activeFile) {
            onSave?.(activeFile.content, activeFile.name);
            setFiles(prev => prev.map(file =>
                file.id === activeFileId
                    ? { ...file, isModified: false }
                    : file
            ));
        }
    };

    const handleCopy = () => {
        if (activeFile) {
            navigator.clipboard.writeText(activeFile.content);
        }
    };

    const handleDownload = () => {
        if (activeFile) {
            const blob = new Blob([activeFile.content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = activeFile.name;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const addNewFile = (lang: string) => {
        const newFile: CodeFile = {
            id: Date.now().toString(),
            name: `file${files.length + 1}.${supportedLanguages.find(l => l.value === lang)?.extension || '.txt'}`,
            content: defaultCode[lang as keyof typeof defaultCode] || '',
            language: lang,
            isActive: false,
            isModified: false
        };

        setFiles(prev => [...prev, newFile]);
        setActiveFileId(newFile.id);
    };

    const switchFile = (fileId: string) => {
        setActiveFileId(fileId);
        setFiles(prev => prev.map(file => ({ ...file, isActive: file.id === fileId })));
    };

    const closeFile = (fileId: string) => {
        if (files.length <= 1) return;

        const newFiles = files.filter(f => f.id !== fileId);
        setFiles(newFiles);

        if (fileId === activeFileId) {
            setActiveFileId(newFiles[0].id);
        }
    };

    const getLanguageIcon = (lang: string) => {
        switch (lang) {
            case 'javascript':
            case 'typescript':
                return <Code className="w-4 h-4" />;
            case 'python':
                return <Terminal className="w-4 h-4" />;
            case 'html':
            case 'css':
                return <FileText className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Code className="w-5 h-5 text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Code Playground
                            </h3>
                        </div>

                        {/* File Tabs */}
                        <div className="flex items-center gap-1">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${file.isActive
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    onClick={() => switchFile(file.id)}
                                >
                                    {getLanguageIcon(file.language)}
                                    <span className="text-sm">{file.name}</span>
                                    {file.isModified && (
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    )}
                                    {files.length > 1 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                closeFile(file.id);
                                            }}
                                            className="ml-1 hover:bg-gray-300 dark:hover:bg-gray-500 rounded p-1"
                                        >
                                            <XCircle className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Configurações"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            {isRunning ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Executando...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    Executar
                                </>
                            )}
                        </button>

                        {isRunning && (
                            <button
                                onClick={handleStop}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Square className="w-4 h-4" />
                                Parar
                            </button>
                        )}

                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Resetar
                        </button>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={handleCopy}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Copiar código"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleSave}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Salvar arquivo"
                        >
                            <Save className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Baixar arquivo"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Code Editor */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-4">
                        <textarea
                            ref={textareaRef}
                            value={activeFile?.content || ''}
                            onChange={(e) => handleCodeChange(e.target.value)}
                            className="w-full h-full resize-none border-none outline-none bg-transparent text-gray-900 dark:text-white font-mono text-sm leading-relaxed"
                            style={{ fontSize: `${settings.fontSize}px` }}
                            placeholder="Digite seu código aqui..."
                        />
                    </div>
                </div>

                {/* Output Panel */}
                <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <Terminal className="w-4 h-4" />
                            Output
                        </h4>
                    </div>

                    <div
                        ref={outputRef}
                        className="flex-1 p-4 overflow-y-auto bg-gray-900 text-green-400 font-mono text-sm"
                    >
                        {result ? (
                            <div className="space-y-2">
                                {result.success ? (
                                    <div className="flex items-center gap-2 text-green-400">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Execução bem-sucedida</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-400">
                                        <XCircle className="w-4 h-4" />
                                        <span>Erro na execução</span>
                                    </div>
                                )}

                                {result.output && (
                                    <div className="whitespace-pre-wrap">{result.output}</div>
                                )}

                                {result.error && (
                                    <div className="text-red-400 whitespace-pre-wrap">{result.error}</div>
                                )}

                                <div className="text-gray-400 text-xs">
                                    Tempo de execução: {result.executionTime}ms
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center py-8">
                                <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Execute o código para ver o resultado aqui</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="absolute top-16 right-4 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Configurações</h4>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tamanho da fonte
                                </label>
                                <input
                                    type="range"
                                    min="12"
                                    max="20"
                                    value={settings.fontSize}
                                    onChange={(e) => setSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {settings.fontSize}px
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tema
                                </label>
                                <select
                                    value={settings.theme}
                                    onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="dark">Escuro</option>
                                    <option value="light">Claro</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Salvar automaticamente
                                </label>
                                <input
                                    type="checkbox"
                                    checked={settings.autoSave}
                                    onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                                    className="rounded"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Números de linha
                                </label>
                                <input
                                    type="checkbox"
                                    checked={settings.lineNumbers}
                                    onChange={(e) => setSettings(prev => ({ ...prev, lineNumbers: e.target.checked }))}
                                    className="rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}