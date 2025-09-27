'use client';

import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCcw, Download, Share2, Settings } from 'lucide-react';

interface CodeExecutorProps {
    code: string;
    language: string;
    onResult: (result: string) => void;
    onError: (error: string) => void;
}

interface ExecutionResult {
    output: string;
    error: string;
    executionTime: number;
    memoryUsage?: number;
}

const CodeExecutor: React.FC<CodeExecutorProps> = ({
    code,
    language,
    onResult,
    onError
}) => {
    const [isExecuting, setIsExecuting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [executionTime, setExecutionTime] = useState(0);
    const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
    const [executionHistory, setExecutionHistory] = useState<ExecutionResult[]>([]);

    const executeCode = async () => {
        if (!code.trim()) {
            onError('Nenhum código para executar');
            return;
        }

        setIsExecuting(true);
        setIsPaused(false);
        const startTime = Date.now();

        try {
            let result: ExecutionResult;

            switch (language) {
                case 'javascript':
                    result = await executeJavaScript(code);
                    break;
                case 'typescript':
                    result = await executeTypeScript(code);
                    break;
                case 'python':
                    result = await executePython(code);
                    break;
                case 'html':
                    result = await executeHTML(code);
                    break;
                case 'css':
                    result = await executeCSS(code);
                    break;
                case 'json':
                    result = await executeJSON(code);
                    break;
                default:
                    result = {
                        output: `Linguagem ${language} não suportada para execução`,
                        error: '',
                        executionTime: 0
                    }
            }

            const endTime = Date.now();
            result.executionTime = endTime - startTime;

            setLastResult(result);
            setExecutionHistory(prev => [result, ...prev.slice(0, 9)]); // Manter apenas 10 execuções

            if (result.error) {
                onError(result.error);
            } else {
                onResult(result.output);
            }

        } catch (error) {
            const errorResult: ExecutionResult = {
                output: '',
                error: error instanceof Error ? error.message : 'Erro desconhecido',
                executionTime: Date.now() - startTime
            }
            setLastResult(errorResult);
            onError(errorResult.error);
        } finally {
            setIsExecuting(false);
        }
    }

    const executeJavaScript = async (code: string): Promise<ExecutionResult> => {
        return new Promise((resolve) => {
            try {
                // Capturar console.log
                const originalLog = console.log;
                const originalError = console.error;
                const originalWarn = console.warn;

                let output = '';
                let error = '';

                const captureLog = (...args: any[]) => {
                    output += args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ') + '\n';
                }

                console.log = captureLog;
                console.error = (...args: any[]) => {
                    error += args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ') + '\n';
                }
                console.warn = captureLog;

                // Executar código
                const result = eval(code);

                // Restaurar console original
                console.log = originalLog;
                console.error = originalError;
                console.warn = originalWarn;

                // Adicionar resultado se houver
                if (result !== undefined) {
                    output += `Resultado: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}`;
                }

                resolve({
                    output: output.trim() || 'Código executado com sucesso',
                    error: error.trim(),
                    executionTime: 0
                });

            } catch (err) {
                resolve({
                    output: '',
                    error: err instanceof Error ? err.message : 'Erro de execução',
                    executionTime: 0
                });
            }
        });
    }

    const executeTypeScript = async (code: string): Promise<ExecutionResult> => {
        // Para TypeScript, vamos compilar para JavaScript primeiro
        try {
            // Simulação de compilação TypeScript
            const jsCode = code
                .replace(/:\s*\w+/g, '') // Remover tipos
                .replace(/interface\s+\w+\s*{[^}]*}/g, '') // Remover interfaces
                .replace(/type\s+\w+\s*=[^;]+;/g, ''); // Remover type aliases

            return await executeJavaScript(jsCode);
        } catch (error) {
            return {
                output: '',
                error: error instanceof Error ? error.message : 'Erro de compilação TypeScript',
                executionTime: 0
            }
        }
    }

    const executePython = async (code: string): Promise<ExecutionResult> => {
        // Simulação de execução Python (em um ambiente real, isso seria feito no backend)
        try {
            // Simular execução Python básica
            const lines = code.split('\n');
            let output = '';
            let error = '';

            for (const line of lines) {
                if (line.trim().startsWith('print(')) {
                    const match = line.match(/print\(['"](.*?)['"]\)/);
                    if (match) {
                        output += match[1] + '\n';
                    }
                } else if (line.trim().startsWith('def ')) {
                    // Definir função
                    continue;
                } else if (line.trim().startsWith('class ')) {
                    // Definir classe
                    continue;
                } else if (line.trim() && !line.trim().startsWith('#')) {
                    // Executar linha
                    try {
                        // Simulação básica
                        if (line.includes('+')) {
                            const match = line.match(/(\d+)\s*\+\s*(\d+)/);
                            if (match) {
                                const result = parseInt(match[1]) + parseInt(match[2]);
                                output += `${result}\n`;
                            }
                        }
                    } catch (err) {
                        error += `Erro na linha: ${line}\n`;
                    }
                }
            }

            return {
                output: output.trim() || 'Código Python executado',
                error: error.trim(),
                executionTime: 0
            }
        } catch (error) {
            return {
                output: '',
                error: error instanceof Error ? error.message : 'Erro de execução Python',
                executionTime: 0
            }
        }
    }

    const executeHTML = async (code: string): Promise<ExecutionResult> => {
        try {
            // Criar um iframe para renderizar HTML
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            const doc = iframe.contentDocument || iframe.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(code);
                doc.close();

                // Capturar output (simulado)
                const output = 'HTML renderizado com sucesso';

                document.body.removeChild(iframe);

                return {
                    output,
                    error: '',
                    executionTime: 0
                }
            }

            return {
                output: 'Erro ao renderizar HTML',
                error: '',
                executionTime: 0
            }
        } catch (error) {
            return {
                output: '',
                error: error instanceof Error ? error.message : 'Erro ao renderizar HTML',
                executionTime: 0
            }
        }
    }

    const executeCSS = async (code: string): Promise<ExecutionResult> => {
        try {
            // Aplicar CSS a um elemento de teste
            const testElement = document.createElement('div');
            testElement.style.display = 'none';
            testElement.innerHTML = '<div class="test">Teste</div>';
            document.body.appendChild(testElement);

            const style = document.createElement('style');
            style.textContent = code;
            document.head.appendChild(style);

            // Verificar se CSS foi aplicado
            const computedStyle = window.getComputedStyle(testElement.querySelector('.test')!);
            const output = `CSS aplicado com sucesso. Estilos computados: ${Object.keys(computedStyle).length} propriedades`;

            document.body.removeChild(testElement);
            document.head.removeChild(style);

            return {
                output,
                error: '',
                executionTime: 0
            }
        } catch (error) {
            return {
                output: '',
                error: error instanceof Error ? error.message : 'Erro ao aplicar CSS',
                executionTime: 0
            }
        }
    }

    const executeJSON = async (code: string): Promise<ExecutionResult> => {
        try {
            const parsed = JSON.parse(code);
            return {
                output: JSON.stringify(parsed, null, 2),
                error: '',
                executionTime: 0
            }
        } catch (error) {
            return {
                output: '',
                error: error instanceof Error ? error.message : 'JSON inválido',
                executionTime: 0
            }
        }
    }

    const stopExecution = () => {
        setIsExecuting(false);
        setIsPaused(false);
    }

    const resetExecution = () => {
        setIsExecuting(false);
        setIsPaused(false);
        setExecutionTime(0);
        setLastResult(null);
    }

    const downloadResult = () => {
        if (!lastResult) return;

        const content = `Resultado da execução:
Linguagem: ${language}
Tempo de execução: ${lastResult.executionTime}ms
Data: ${new Date().toLocaleString()}

Output:
${lastResult.output}

${lastResult.error ? `Erro:\n${lastResult.error}` : ''}`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `execution-result-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const shareResult = async () => {
        if (!lastResult) return;

        const shareData = {
            title: 'Resultado da Execução - Fenix IDE',
            text: `Código ${language} executado com sucesso!\n\nOutput:\n${lastResult.output}`,
            url: window.location.href
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Erro ao compartilhar:', err);
            }
        } else {
            // Fallback para copiar para clipboard
            await navigator.clipboard.writeText(shareData.text);
            alert('Resultado copiado para a área de transferência!');
        }
    }

    return (
        <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-white">Execução de Código</h3>
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                        {language.toUpperCase()}
                    </span>
                    {lastResult && (
                        <span className="text-sm text-gray-400">
                            Última execução: {lastResult.executionTime}ms
                        </span>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {isExecuting ? (
                        <button
                            onClick={stopExecution}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <Square className="w-4 h-4" />
                            <span>Parar</span>
                        </button>
                    ) : (
                        <button
                            onClick={executeCode}
                            disabled={!code.trim()}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Play className="w-4 h-4" />
                            <span>Executar</span>
                        </button>
                    )}

                    <button
                        onClick={resetExecution}
                        className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        title="Resetar"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>

                    {lastResult && (
                        <>
                            <button
                                onClick={downloadResult}
                                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                title="Download do Resultado"
                            >
                                <Download className="w-4 h-4" />
                            </button>

                            <button
                                onClick={shareResult}
                                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                title="Compartilhar"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Execution History */}
            {executionHistory.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Histórico de Execuções</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {executionHistory.slice(0, 5).map((result, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-400">
                                        Execução #{executionHistory.length - index}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {result.executionTime}ms
                                    </span>
                                </div>
                                <div className="text-sm text-white">
                                    {result.output.substring(0, 100)}
                                    {result.output.length > 100 && '...'}
                                </div>
                                {result.error && (
                                    <div className="text-sm text-red-400 mt-1">
                                        Erro: {result.error.substring(0, 100)}
                                        {result.error.length > 100 && '...'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Current Execution Status */}
            {isExecuting && (
                <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-blue-400">Executando código...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CodeExecutor;