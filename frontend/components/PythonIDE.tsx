'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Download, Upload, Settings, Terminal, FileText, Code, Eye, Save } from 'lucide-react';

interface PythonIDEProps {
    initialCode?: string;
    exercise?: {
        title: string;
        description: string;
        starterCode: string;
        testCases: Array<{
            input: string;
            expected: string;
            description: string;
        }>;
    };
    onCodeChange?: (code: string) => void;
    onRun?: (output: string, success: boolean) => void;
}

interface CodeFile {
    name: string;
    content: string;
    language: 'python' | 'html' | 'css' | 'javascript';
}

export default function PythonIDE({
    initialCode = '',
    exercise,
    onCodeChange,
    onRun
}: PythonIDEProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState<'editor' | 'output' | 'terminal'>('editor');
    const [files, setFiles] = useState<CodeFile[]>([
        {
            name: 'main.py',
            content: initialCode || '# Seu código Python aqui\nprint("Hello, Data Science!")\n\n# Importar bibliotecas essenciais\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# Exemplo de análise de dados\nprint("Bibliotecas carregadas com sucesso!")',
            language: 'python'
        }
    ]);
    const [currentFile, setCurrentFile] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [fontSize, setFontSize] = useState(14);
    const [autoSave, setAutoSave] = useState(true);

    const editorRef = useRef<HTMLTextAreaElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    // Auto-save
    useEffect(() => {
        if (autoSave && onCodeChange) {
            const timer = setTimeout(() => {
                onCodeChange(code);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [code, autoSave, onCodeChange]);

    // Load exercise if provided
    useEffect(() => {
        if (exercise) {
            setCode(exercise.starterCode);
            setFiles(prev => prev.map((file, i) =>
                i === 0 ? { ...file, content: exercise.starterCode } : file
            ));
        }
    }, [exercise]);

    const runCode = async () => {
        setIsRunning(true);
        setOutput('Executando código...\n');
        setActiveTab('output');

        try {
            // Simular execução Python (em produção, seria uma API real)
            const result = await executePythonCode(code);
            setOutput(result.output);

            if (onRun) {
                onRun(result.output, result.success);
            }

            // Auto-scroll para output
            setTimeout(() => {
                if (outputRef.current) {
                    outputRef.current.scrollTop = outputRef.current.scrollHeight;
                }
            }, 100);

        } catch (error) {
            setOutput(`Erro na execução: ${error}\n`);
        } finally {
            setIsRunning(false);
        }
    };

    const executePythonCode = async (pythonCode: string): Promise<{ output: string; success: boolean }> => {
        // Simulação de execução Python
        // Em produção, isso seria uma chamada para uma API backend com Python real

        const mockOutput = simulatePythonExecution(pythonCode);
        return mockOutput;
    };

    const simulatePythonExecution = (pythonCode: string): { output: string; success: boolean } => {
        let output = '';
        let success = true;

        try {
            // Simular imports
            if (pythonCode.includes('import pandas')) {
                output += '✅ pandas carregado com sucesso\n';
            }
            if (pythonCode.includes('import numpy')) {
                output += '✅ numpy carregado com sucesso\n';
            }
            if (pythonCode.includes('import matplotlib')) {
                output += '✅ matplotlib carregado com sucesso\n';
            }

            // Simular print statements
            const printMatches = pythonCode.match(/print\([^)]+\)/g);
            if (printMatches) {
                printMatches.forEach(printStmt => {
                    const content = printStmt.replace(/print\(['"`]?([^'"`)]*)['"`]?\)/, '$1');
                    output += `${content}\n`;
                });
            }

            // Simular operações básicas
            if (pythonCode.includes('pd.DataFrame')) {
                output += '📊 DataFrame criado com sucesso\n';
            }
            if (pythonCode.includes('np.array')) {
                output += '🔢 Array NumPy criado com sucesso\n';
            }
            if (pythonCode.includes('plt.plot')) {
                output += '📈 Gráfico criado com sucesso\n';
            }

            // Simular erros comuns
            if (pythonCode.includes('undefined_variable')) {
                output += '❌ NameError: name "undefined_variable" is not defined\n';
                success = false;
            }

            if (pythonCode.includes('syntax_error')) {
                output += '❌ SyntaxError: invalid syntax\n';
                success = false;
            }

        } catch (error) {
            output += `❌ Erro na execução: ${error}\n`;
            success = false;
        }

        return { output, success };
    };

    const stopExecution = () => {
        setIsRunning(false);
        setOutput('Execução interrompida pelo usuário\n');
    };

    const saveCode = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `python_code_${Date.now()}.py`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const loadCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setCode(content);
                setFiles(prev => prev.map((file, i) =>
                    i === currentFile ? { ...file, content } : file
                ));
            };
            reader.readAsText(file);
        }
    };

    const createNewFile = () => {
        const newFile: CodeFile = {
            name: `file_${files.length + 1}.py`,
            content: '# Novo arquivo Python\nprint("Hello, World!")',
            language: 'python'
        };
        setFiles([...files, newFile]);
        setCurrentFile(files.length);
    };

    const switchFile = (index: number) => {
        setCurrentFile(index);
        setCode(files[index].content);
    };

    const updateFileContent = (content: string) => {
        setCode(content);
        setFiles(prev => prev.map((file, i) =>
            i === currentFile ? { ...file, content } : file
        ));
    };

    const runTests = () => {
        if (!exercise) return;

        setActiveTab('output');
        let testOutput = '🧪 Executando testes...\n\n';

        exercise.testCases.forEach((testCase, index) => {
            // Simular execução do teste
            const success = Math.random() > 0.3; // 70% de sucesso para demonstração

            if (success) {
                testOutput += `✅ Teste ${index + 1}: ${testCase.description}\n`;
                testOutput += `   Input: ${testCase.input}\n`;
                testOutput += `   Expected: ${testCase.expected}\n`;
                testOutput += `   Result: PASSED\n\n`;
            } else {
                testOutput += `❌ Teste ${index + 1}: ${testCase.description}\n`;
                testOutput += `   Input: ${testCase.input}\n`;
                testOutput += `   Expected: ${testCase.expected}\n`;
                testOutput += `   Result: FAILED\n\n`;
            }
        });

        setOutput(testOutput);
    };

    return (
        <div className={`python-ide ${theme} min-h-screen bg-gray-900 text-white`}>
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Code className="h-6 w-6 text-blue-400" />
                        <h1 className="text-xl font-bold">Python IDE - Fenix Academy</h1>
                        {exercise && (
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                🎯 {exercise.title}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 hover:bg-gray-700 rounded"
                            title="Configurações"
                        >
                            <Settings className="h-5 w-5" />
                        </button>
                        <button
                            onClick={createNewFile}
                            className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm"
                        >
                            + Novo Arquivo
                        </button>
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="bg-gray-800 border-b border-gray-700 p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tema</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full"
                            >
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Tamanho da Fonte</label>
                            <input
                                type="range"
                                min="10"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full"
                            />
                            <span className="text-sm">{fontSize}px</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="autoSave"
                                checked={autoSave}
                                onChange={(e) => setAutoSave(e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="autoSave" className="text-sm">Auto-save</label>
                        </div>
                    </div>
                </div>
            )}

            {/* File Tabs */}
            <div className="bg-gray-800 border-b border-gray-700">
                <div className="flex space-x-1 p-2">
                    {files.map((file, index) => (
                        <button
                            key={index}
                            onClick={() => switchFile(index)}
                            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${currentFile === index
                                    ? 'bg-gray-700 text-white'
                                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                }`}
                        >
                            {file.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-200px)]">
                {/* Editor Panel */}
                <div className="flex-1 flex flex-col">
                    {/* Toolbar */}
                    <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center space-x-2">
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded text-sm flex items-center space-x-2"
                        >
                            <Play className="h-4 w-4" />
                            {isRunning ? 'Executando...' : 'Executar'}
                        </button>

                        <button
                            onClick={stopExecution}
                            disabled={!isRunning}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded text-sm flex items-center space-x-2"
                        >
                            <Square className="h-4 w-4" />
                            Parar
                        </button>

                        {exercise && (
                            <button
                                onClick={runTests}
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm flex items-center space-x-2"
                            >
                                <Terminal className="h-4 w-4" />
                                Executar Testes
                            </button>
                        )}

                        <div className="border-l border-gray-600 h-6 mx-2" />

                        <button
                            onClick={saveCode}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm flex items-center space-x-2"
                        >
                            <Download className="h-4 w-4" />
                            Salvar
                        </button>

                        <label className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm flex items-center space-x-2 cursor-pointer">
                            <Upload className="h-4 w-4" />
                            Carregar
                            <input
                                type="file"
                                accept=".py,.txt"
                                onChange={loadCode}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 bg-gray-900 p-4">
                        <textarea
                            ref={editorRef}
                            value={code}
                            onChange={(e) => updateFileContent(e.target.value)}
                            className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm border-none outline-none resize-none"
                            style={{ fontSize: `${fontSize}px` }}
                            placeholder="# Digite seu código Python aqui..."
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Output Panel */}
                <div className="w-1/2 bg-gray-800 border-l border-gray-700">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-700">
                        <button
                            onClick={() => setActiveTab('output')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'output'
                                    ? 'bg-gray-700 text-white border-b-2 border-blue-400'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            <Eye className="h-4 w-4 inline mr-2" />
                            Output
                        </button>
                        <button
                            onClick={() => setActiveTab('terminal')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'terminal'
                                    ? 'bg-gray-700 text-white border-b-2 border-blue-400'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            <Terminal className="h-4 w-4 inline mr-2" />
                            Terminal
                        </button>
                    </div>

                    {/* Output Content */}
                    <div className="p-4 h-full overflow-auto">
                        {activeTab === 'output' && (
                            <div
                                ref={outputRef}
                                className="font-mono text-sm text-gray-200 whitespace-pre-wrap"
                            >
                                {output || 'Output aparecerá aqui quando você executar o código...'}
                            </div>
                        )}

                        {activeTab === 'terminal' && (
                            <div className="font-mono text-sm text-gray-200">
                                <div className="mb-2">$ python main.py</div>
                                <div className="text-green-400">
                                    Python 3.11.0 (main, Oct 24 2022, 18:26:48)
                                </div>
                                <div className="text-green-400">
                                    [GCC 11.2.0] on linux
                                </div>
                                <div className="text-green-400">Type "help", "copyright", "credits" or "license" for more information.</div>
                                <div className="mt-2">&gt;&gt;&gt; </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Exercise Panel */}
            {exercise && (
                <div className="bg-gray-800 border-t border-gray-700 p-4">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-lg font-bold mb-2">🎯 {exercise.title}</h3>
                        <p className="text-gray-300 mb-4">{exercise.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">📋 Casos de Teste:</h4>
                                <div className="space-y-2">
                                    {exercise.testCases.map((testCase, index) => (
                                        <div key={index} className="bg-gray-700 p-3 rounded text-sm">
                                            <div className="font-medium">Teste {index + 1}:</div>
                                            <div className="text-gray-300">{testCase.description}</div>
                                            <div className="text-gray-400 text-xs mt-1">
                                                Input: {testCase.input} | Expected: {testCase.expected}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">💡 Dicas:</h4>
                                <ul className="text-sm text-gray-300 space-y-1">
                                    <li>• Use as bibliotecas pandas, numpy e matplotlib</li>
                                    <li>• Teste seu código com diferentes inputs</li>
                                    <li>• Verifique se a saída está no formato esperado</li>
                                    <li>• Use print() para debug quando necessário</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

