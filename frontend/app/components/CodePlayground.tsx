'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Play,
    RotateCcw,
    Download,
    Share2,
    BookOpen,
    Trophy,
    Code,
    Copy,
    Check,
    AlertCircle,
    Lightbulb,
    Settings,
    Eye,
    EyeOff
} from 'lucide-react';
import { CodePlayground as PlaygroundData, CodeExample, CodeChallenge } from '../data/interactiveElements';

interface CodePlaygroundProps {
    playground: PlaygroundData;
    onCodeRun?: (code: string, output: string) => void;
    onChallengeComplete?: (challengeId: string, points: number) => void;
    onExport?: (format: 'js' | 'ts' | 'json') => void;
    onShare?: () => void;
    showExamples?: boolean;
    showChallenges?: boolean;
}

export default function CodePlayground({
    playground,
    onCodeRun,
    onChallengeComplete,
    onExport,
    onShare,
    showExamples = true,
    showChallenges = true
}: CodePlaygroundProps) {
    const [userCode, setUserCode] = useState(playground.template);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null);
    const [selectedChallenge, setSelectedChallenge] = useState<CodeChallenge | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [showHints, setShowHints] = useState<Record<string, boolean>>({});
    const [copied, setCopied] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const outputRef = useRef<HTMLDivElement>(null);

    // Auto-scroll output
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    const runCode = async () => {
        setIsRunning(true);
        setErrors([]);
        setOutput('');

        try {
            // Simulate code execution
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock execution based on language
            let mockOutput = '';
            let mockErrors: string[] = [];

            switch (playground.language) {
                case 'javascript':
                    try {
                        // Basic JavaScript validation
                        if (userCode.includes('console.log')) {
                            mockOutput = '✅ Código executado com sucesso!\n';
                            mockOutput += '📤 Saída:\n';

                            // Extract console.log statements
                            const logMatches = userCode.match(/console\.log\(([^)]+)\)/g);
                            if (logMatches) {
                                logMatches.forEach((log, index) => {
                                    const content = log.match(/console\.log\(([^)]+)\)/)?.[1];
                                    mockOutput += `[${index + 1}] ${content || 'undefined'}\n`;
                                });
                            }
                        } else {
                            mockOutput = '✅ Código executado sem saída visível.\n';
                            mockOutput += '💡 Dica: Use console.log() para ver a saída.';
                        }
                    } catch (error) {
                        mockErrors.push('Erro de sintaxe JavaScript');
                    }
                    break;

                case 'python':
                    mockOutput = '🐍 Executando código Python...\n';
                    mockOutput += '✅ Código executado com sucesso!\n';
                    mockOutput += '📤 Saída simulada (ambiente Python)';
                    break;

                case 'html':
                    mockOutput = '🌐 Renderizando HTML...\n';
                    mockOutput += '✅ HTML renderizado com sucesso!\n';
                    mockOutput += '📤 Preview disponível na aba de resultado';
                    break;

                default:
                    mockOutput = '✅ Código executado com sucesso!';
            }

            setOutput(mockOutput);
            setErrors(mockErrors);
            onCodeRun?.(userCode, mockOutput);

        } catch (error) {
            setErrors(['Erro ao executar o código']);
            setOutput('❌ Erro na execução');
        } finally {
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        setUserCode(playground.template);
        setOutput('');
        setErrors([]);
    };

    const loadExample = (example: CodeExample) => {
        setSelectedExample(example);
        setUserCode(example.code);
        setOutput(example.output);
        setSelectedChallenge(null);
    };

    const loadChallenge = (challenge: CodeChallenge) => {
        setSelectedChallenge(challenge);
        setUserCode(challenge.starterCode);
        setOutput('');
        setErrors([]);
        setSelectedExample(null);
    };

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(userCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy code');
        }
    };

    const runTests = async () => {
        if (!selectedChallenge) return;

        setIsRunning(true);
        setOutput('🧪 Executando testes...\n');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            let testOutput = '🧪 Resultado dos Testes:\n\n';
            let passedTests = 0;

            selectedChallenge.testCases.forEach((testCase, index) => {
                // Mock test execution
                const passed = Math.random() > 0.3; // 70% pass rate for demo
                if (passed) passedTests++;

                testOutput += `Teste ${index + 1}: ${passed ? '✅ PASSOU' : '❌ FALHOU'}\n`;
                testOutput += `  Entrada: ${testCase.input}\n`;
                testOutput += `  Esperado: ${testCase.expectedOutput}\n`;
                testOutput += `  Descrição: ${testCase.description}\n\n`;
            });

            testOutput += `\n📊 Resultado: ${passedTests}/${selectedChallenge.testCases.length} testes passaram\n`;

            if (passedTests === selectedChallenge.testCases.length) {
                testOutput += '🎉 Parabéns! Todos os testes passaram!\n';
                testOutput += `🏆 Pontos ganhos: ${selectedChallenge.points}`;
                onChallengeComplete?.(selectedChallenge.id, selectedChallenge.points);
            } else {
                testOutput += '💡 Continue tentando! Revise seu código.';
            }

            setOutput(testOutput);

        } catch (error) {
            setOutput('❌ Erro ao executar os testes');
        } finally {
            setIsRunning(false);
        }
    };

    const getLanguageIcon = () => {
        switch (playground.language) {
            case 'javascript': return '🟡';
            case 'python': return '🐍';
            case 'html': return '🌐';
            case 'css': return '🎨';
            case 'java': return '☕';
            default: return '💻';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getLanguageIcon()}</span>
                        <div>
                            <h2 className="text-xl font-bold">{playground.title}</h2>
                            <p className="text-blue-100 text-sm">{playground.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                            {playground.language.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className={`px-4 py-2 rounded-lg transition-colors ${isRunning
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    : 'bg-green-500 text-white hover:bg-green-600'
                                }`}
                        >
                            {isRunning ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                                    Executando...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 inline mr-2" />
                                    Executar
                                </>
                            )}
                        </button>

                        {selectedChallenge && (
                            <button
                                onClick={runTests}
                                disabled={isRunning}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <Trophy className="w-4 h-4 inline mr-2" />
                                Executar Testes
                            </button>
                        )}

                        <button
                            onClick={resetCode}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4 inline mr-2" />
                            Reset
                        </button>

                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Settings className="w-4 h-4 inline mr-2" />
                            Configurações
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={copyCode}
                            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                            title="Copiar código"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={() => onExport?.('js')}
                            className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Download className="w-4 h-4 inline mr-2" />
                            Exportar
                        </button>

                        <button
                            onClick={onShare}
                            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                            title="Compartilhar"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Code Editor */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Editor */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Code className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">editor.{playground.language}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                {playground.features.syntaxHighlighting && (
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                                        Syntax Highlighting
                                    </span>
                                )}
                                {playground.features.autoComplete && (
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                                        Auto-complete
                                    </span>
                                )}
                            </div>
                        </div>

                        <textarea
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            className="w-full h-96 bg-gray-900 text-green-400 p-4 font-mono text-sm resize-none focus:outline-none"
                            placeholder={`Digite seu código ${playground.language} aqui...`}
                            spellCheck={false}
                        />
                    </div>

                    {/* Output */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Console</span>
                            <button
                                onClick={() => setOutput('')}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>

                        <div
                            ref={outputRef}
                            className="h-48 bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap"
                        >
                            {output || '// Saída aparecerá aqui...'}
                        </div>
                    </div>

                    {/* Errors */}
                    {errors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <h4 className="font-medium text-red-800">Erros encontrados:</h4>
                            </div>
                            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Features */}
                    {showSettings && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recursos</h3>
                            <div className="space-y-3">
                                {Object.entries(playground.features).map(([feature, enabled]) => (
                                    <div key={feature} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700 capitalize">
                                            {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {enabled ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Libraries */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Bibliotecas</h3>
                        <div className="flex flex-wrap gap-2">
                            {playground.libraries.map((lib, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                    {lib}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Examples */}
                    {showExamples && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <BookOpen className="w-5 h-5 mr-2" />
                                Exemplos
                            </h3>
                            <div className="space-y-3">
                                {playground.examples.map((example) => (
                                    <button
                                        key={example.id}
                                        onClick={() => loadExample(example)}
                                        className={`w-full p-3 text-left rounded-lg border transition-colors ${selectedExample?.id === example.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="font-medium text-gray-800">{example.name}</div>
                                        <div className="text-sm text-gray-600">{example.description}</div>
                                        <div className="mt-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${example.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                                                    example.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {example.difficulty === 'beginner' ? 'Iniciante' :
                                                    example.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Challenges */}
                    {showChallenges && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Trophy className="w-5 h-5 mr-2" />
                                Desafios
                            </h3>
                            <div className="space-y-3">
                                {playground.challenges.map((challenge) => (
                                    <button
                                        key={challenge.id}
                                        onClick={() => loadChallenge(challenge)}
                                        className={`w-full p-3 text-left rounded-lg border transition-colors ${selectedChallenge?.id === challenge.id
                                                ? 'border-orange-500 bg-orange-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="font-medium text-gray-800">{challenge.title}</div>
                                        <div className="text-sm text-gray-600">{challenge.description}</div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                                                {challenge.points} pts
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {challenge.requirements.length} requisitos
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Selected Challenge Details */}
                    {selectedChallenge && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-medium text-orange-800 mb-3">Requisitos do Desafio</h4>
                            <ul className="space-y-2">
                                {selectedChallenge.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <span className="text-orange-600 mt-1">•</span>
                                        <span className="text-sm text-orange-700">{req}</span>
                                    </li>
                                ))}
                            </ul>

                            {selectedChallenge.hints.length > 0 && (
                                <div className="mt-4">
                                    <button
                                        onClick={() => setShowHints(prev => ({ ...prev, [selectedChallenge.id]: !prev[selectedChallenge.id] }))}
                                        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
                                    >
                                        <Lightbulb className="w-4 h-4" />
                                        <span className="text-sm">
                                            {showHints[selectedChallenge.id] ? 'Ocultar dicas' : 'Mostrar dicas'}
                                        </span>
                                    </button>

                                    {showHints[selectedChallenge.id] && (
                                        <div className="mt-2 p-3 bg-orange-100 border border-orange-200 rounded-lg">
                                            <ul className="space-y-1">
                                                {selectedChallenge.hints.map((hint, index) => (
                                                    <li key={index} className="text-sm text-orange-800">
                                                        💡 {hint}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
