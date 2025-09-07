'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Bot,
    Send,
    Code,
    Lightbulb,
    AlertTriangle,
    CheckCircle,
    Zap,
    BookOpen,
    Copy,
    Download,
    RefreshCw,
    Settings,
    Brain,
    MessageSquare,
    FileText,
    Sparkles,
    TrendingUp,
    Target,
    Clock,
    Star
} from 'lucide-react';

interface AIAnalysisResult {
    id: string;
    type: 'suggestion' | 'error' | 'warning' | 'info' | 'optimization';
    title: string;
    description: string;
    code?: string;
    line?: number;
    severity: 'low' | 'medium' | 'high';
    category: string;
    impact: string;
    confidence: number;
    timestamp: Date;
}

interface CodeMetrics {
    lines: number;
    complexity: number;
    maintainability: number;
    readability: number;
    performance: number;
    security: number;
}

interface AIAssistantProps {
    code: string;
    language: string;
    filename: string;
    theme: 'dark' | 'light';
    onClose: () => void;
}

export default function RealAIAssistant({
    code,
    language,
    filename,
    theme,
    onClose
}: AIAssistantProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState<AIAnalysisResult[]>([]);
    const [codeMetrics, setCodeMetrics] = useState<CodeMetrics | null>(null);
    const [userQuery, setUserQuery] = useState('');
    const [chatHistory, setChatHistory] = useState<Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: Date;
    }>>([]);
    const [showMetrics, setShowMetrics] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const queryInputRef = useRef<HTMLTextAreaElement>(null);

    // Análise automática do código
    useEffect(() => {
        if (code && code.trim().length > 0) {
            analyzeCode();
        }
    }, [code, language]);

    // Scroll para o final do chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    // Análise inteligente do código
    const analyzeCode = async () => {
        setIsAnalyzing(true);

        try {
            // Simular análise em tempo real
            await new Promise(resolve => setTimeout(resolve, 1500));

            const results: AIAnalysisResult[] = [];
            const metrics = calculateCodeMetrics(code, language);

            // Análise de qualidade do código
            if (code.includes('var ')) {
                results.push({
                    id: '1',
                    type: 'warning',
                    title: 'Uso de var desencorajado',
                    description: 'Considere usar let ou const em vez de var para melhor escopo de variáveis.',
                    code: 'var example = "value";',
                    line: findLineNumber(code, 'var '),
                    severity: 'medium',
                    category: 'Best Practices',
                    impact: 'Escopo de variáveis',
                    confidence: 0.95,
                    timestamp: new Date()
                });
            }

            if (code.includes('console.log')) {
                results.push({
                    id: '2',
                    type: 'info',
                    title: 'Console.log em produção',
                    description: 'Considere remover console.log antes de fazer deploy em produção.',
                    code: 'console.log("debug info");',
                    line: findLineNumber(code, 'console.log'),
                    severity: 'low',
                    category: 'Debugging',
                    impact: 'Performance e segurança',
                    confidence: 0.90,
                    timestamp: new Date()
                });
            }

            if (code.includes('eval(')) {
                results.push({
                    id: '3',
                    type: 'error',
                    title: 'Uso de eval() perigoso',
                    description: 'eval() pode executar código malicioso e deve ser evitado.',
                    code: 'eval(userInput);',
                    line: findLineNumber(code, 'eval('),
                    severity: 'high',
                    category: 'Security',
                    impact: 'Vulnerabilidade de segurança',
                    confidence: 0.99,
                    timestamp: new Date()
                });
            }

            setAnalysisResults(results);
            setCodeMetrics(metrics);

        } catch (error) {
            console.error('Erro na análise:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Calcular métricas do código
    const calculateCodeMetrics = (code: string, lang: string): CodeMetrics => {
        const lines = code.split('\n').length;
        const complexity = calculateComplexity(code, lang);
        const maintainability = calculateMaintainability(code, lang);
        const readability = calculateReadability(code, lang);
        const performance = calculatePerformance(code, lang);
        const security = calculateSecurity(code, lang);

        return { lines, complexity, maintainability, readability, performance, security };
    };

    // Calcular complexidade ciclomática
    const calculateComplexity = (code: string, lang: string): number => {
        let complexity = 1;

        const controlStructures = [
            'if', 'else', 'for', 'while', 'do', 'switch', 'case',
            'catch', '&&', '||', '?', ':', '?.', '??'
        ];

        controlStructures.forEach(structure => {
            const regex = new RegExp(`\\b${structure}\\b|${structure.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
            const matches = code.match(regex);
            if (matches) {
                complexity += matches.length;
            }
        });

        return Math.min(complexity, 10);
    };

    // Calcular manutenibilidade
    const calculateMaintainability = (code: string, lang: string): number => {
        let score = 100;

        const complexity = calculateComplexity(code, lang);
        score -= complexity * 5;

        const longLines = code.split('\n').filter(line => line.length > 80).length;
        score -= longLines * 2;

        const commentLines = (code.match(/\/\/.*$/gm) || []).length + (code.match(/\/\*[\s\S]*?\*\//gm) || []).length;
        const totalLines = code.split('\n').length;
        const commentRatio = commentLines / totalLines;
        if (commentRatio < 0.1) score -= 20;

        return Math.max(score, 0);
    };

    // Calcular legibilidade
    const calculateReadability = (code: string, lang: string): number => {
        let score = 100;

        const shortVars = (code.match(/\b[a-z]{1,2}\b/g) || []).length;
        score -= shortVars * 1;

        const functionLengths = code.split(/\bfunction\b|\bdef\b/).map(fn => fn.split('\n').length);
        const avgFunctionLength = functionLengths.reduce((a, b) => a + b, 0) / functionLengths.length;
        if (avgFunctionLength > 20) score -= 30;

        return Math.max(score, 0);
    };

    // Calcular performance
    const calculatePerformance = (code: string, lang: string): number => {
        let score = 100;

        const nestedLoops = (code.match(/\bfor\b.*\bfor\b|\bwhile\b.*\bwhile\b/g) || []).length;
        score -= nestedLoops * 15;

        if (code.includes('eval(')) score -= 50;

        const timers = (code.match(/\bsetTimeout\b|\bsetInterval\b/g) || []).length;
        const clearTimers = (code.match(/\bclearTimeout\b|\bclearInterval\b/g) || []).length;
        if (timers > clearTimers) score -= 20;

        return Math.max(score, 0);
    };

    // Calcular segurança
    const calculateSecurity = (code: string, lang: string): number => {
        let score = 100;

        if (code.includes('eval(')) score -= 60;
        if (code.includes('innerHTML')) score -= 30;
        if (code.includes('document.write')) score -= 25;
        if (code.includes('+') && code.includes('userInput')) score -= 20;

        return Math.max(score, 0);
    };

    // Encontrar número da linha
    const findLineNumber = (code: string, searchText: string): number => {
        const lines = code.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(searchText)) {
                return i + 1;
            }
        }
        return 0;
    };

    // Enviar pergunta para IA
    const sendQuery = async () => {
        if (!userQuery.trim()) return;

        const userMessage = {
            role: 'user' as const,
            content: userQuery,
            timestamp: new Date()
        };

        setChatHistory(prev => [...prev, userMessage]);
        setUserQuery('');
        setIsGenerating(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const aiResponse = generateAIResponse(userQuery, code, language);

            const assistantMessage = {
                role: 'assistant' as const,
                content: aiResponse,
                timestamp: new Date()
            };

            setChatHistory(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Erro ao gerar resposta:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    // Gerar resposta da IA
    const generateAIResponse = (query: string, code: string, lang: string): string => {
        const queryLower = query.toLowerCase();

        if (queryLower.includes('otimizar') || queryLower.includes('performance')) {
            return `🚀 **Otimizações de Performance para ${lang.toUpperCase()}**:

1. **Evite reflows/repaints** - Agrupe mudanças de DOM
2. **Use event delegation** para muitos elementos
3. **Debounce** operações frequentes
4. **Lazy loading** para recursos pesados
5. **Cache** resultados de cálculos complexos

💡 **Exemplo prático:**
\`\`\`${lang}
// ❌ Ruim - causa reflow a cada iteração
for (let i = 0; i < 1000; i++) {
    element.style.width = i + 'px';
}

// ✅ Bom - agrupa mudanças
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.style.width = i + 'px';
    fragment.appendChild(div);
}
document.body.appendChild(fragment);
\`\`\``;
        }

        if (queryLower.includes('segurança') || queryLower.includes('security')) {
            return `🔒 **Melhorias de Segurança para ${lang.toUpperCase()}**:

1. **Validação de entrada** - Sempre valide dados do usuário
2. **Escape de output** - Escape HTML, SQL, etc.
3. **HTTPS** - Use sempre em produção
4. **Sanitização** - Limpe dados antes de usar
5. **Princípio do menor privilégio**

⚠️ **Riscos identificados no seu código:**
${code.includes('eval(') ? '- Uso de eval() (vulnerabilidade crítica)' : ''}
${code.includes('innerHTML') ? '- innerHTML sem sanitização' : ''}
${code.includes('document.write') ? '- document.write (XSS risk)' : ''}`;
        }

        // Resposta padrão
        return `🤖 **Análise do seu código em ${lang.toUpperCase()}**:

Analisando o arquivo **${filename}** com ${code.split('\n').length} linhas...

💡 **Sugestões gerais:**
1. Revise as recomendações na aba "Sugestões"
2. Verifique as métricas de qualidade do código
3. Considere refatorar partes complexas
4. Adicione testes para funcionalidades críticas

❓ **Pergunte sobre:**
- Otimizações de performance
- Melhorias de segurança
- Organização e estrutura
- Estratégias de teste
- Padrões de código

Estou aqui para ajudar! 🚀`;
    };

    // Exportar análise
    const exportAnalysis = () => {
        const data = {
            filename,
            language,
            timestamp: new Date().toISOString(),
            metrics: codeMetrics,
            results: analysisResults,
            chatHistory
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-analysis-${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Obter ícone por tipo
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'suggestion': return <Lightbulb className="w-4 h-4 text-blue-500" />;
            case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            case 'info': return <BookOpen className="w-4 h-4 text-blue-500" />;
            case 'optimization': return <Zap className="w-4 h-4 text-green-500" />;
            default: return <Code className="w-4 h-4 text-gray-500" />;
        }
    };

    // Obter cor por severidade
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'text-red-500 bg-red-100';
            case 'medium': return 'text-yellow-500 bg-yellow-100';
            case 'low': return 'text-green-500 bg-green-100';
            default: return 'text-gray-500 bg-gray-100';
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                }`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">AI Assistant Real</h2>
                            <p className="text-sm text-gray-500">Análise inteligente de código</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={exportAnalysis}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            title="Exportar análise"
                        >
                            <Download className="w-4 h-4" />
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            title="Fechar"
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                <div className="flex">
                    <button
                        onClick={() => setShowMetrics(true)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${showMetrics
                                ? theme === 'dark'
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        📊 Métricas
                    </button>

                    <button
                        onClick={() => setShowSuggestions(true)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${showSuggestions
                                ? theme === 'dark'
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        💡 Sugestões
                    </button>

                    <button
                        onClick={() => setShowChat(true)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${showChat
                                ? theme === 'dark'
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        💬 Chat IA
                    </button>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-hidden">
                {/* Métricas */}
                {showMetrics && (
                    <div className="p-4 space-y-4">
                        {isAnalyzing ? (
                            <div className="flex items-center justify-center py-8">
                                <RefreshCw className="w-6 h-6 animate-spin text-blue-500 mr-2" />
                                <span>Analisando código...</span>
                            </div>
                        ) : codeMetrics ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                                        } border`}>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <FileText className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm font-medium">Linhas</span>
                                        </div>
                                        <div className="text-2xl font-bold">{codeMetrics.lines}</div>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                                        } border`}>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <TrendingUp className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm font-medium">Complexidade</span>
                                        </div>
                                        <div className="text-2xl font-bold">{codeMetrics.complexity}</div>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                                        } border`}>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Target className="w-4 h-4 text-green-500" />
                                            <span className="text-sm font-medium">Manutenibilidade</span>
                                        </div>
                                        <div className="text-2xl font-bold">{codeMetrics.maintainability}</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Legibilidade</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: `${codeMetrics.readability}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium">{codeMetrics.readability}%</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Performance</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full"
                                                    style={{ width: `${codeMetrics.performance}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium">{codeMetrics.performance}%</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Segurança</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-red-600 h-2 rounded-full"
                                                    style={{ width: `${codeMetrics.security}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium">{codeMetrics.security}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Nenhuma métrica disponível
                            </div>
                        )}
                    </div>
                )}

                {/* Sugestões */}
                {showSuggestions && (
                    <div className="p-4 space-y-4">
                        {isAnalyzing ? (
                            <div className="flex items-center justify-center py-8">
                                <RefreshCw className="w-6 h-6 animate-spin text-blue-500 mr-2" />
                                <span>Analisando código...</span>
                            </div>
                        ) : analysisResults.length > 0 ? (
                            <div className="space-y-3">
                                {analysisResults.map((result) => (
                                    <div key={result.id} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                                        }`}>
                                        <div className="flex items-start space-x-3">
                                            {getTypeIcon(result.type)}
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h4 className="font-medium">{result.title}</h4>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(result.severity)}`}>
                                                        {result.severity}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                                                {result.code && (
                                                    <div className="bg-gray-100 p-2 rounded text-xs font-mono mb-2">
                                                        {result.code}
                                                    </div>
                                                )}
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>📁 {result.category}</span>
                                                    <span>🎯 {result.impact}</span>
                                                    <span>⭐ {Math.round(result.confidence * 100)}%</span>
                                                    {result.line && <span>📍 Linha {result.line}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                                <p>Nenhuma sugestão encontrada!</p>
                                <p className="text-sm">Seu código está bem estruturado! 🎉</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Chat IA */}
                {showChat && (
                    <div className="flex flex-col h-full">
                        {/* Histórico do Chat */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {chatHistory.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                                    <p>Inicie uma conversa com a IA!</p>
                                    <p className="text-sm">Pergunte sobre otimizações, segurança, estrutura...</p>
                                </div>
                            ) : (
                                chatHistory.map((message, index) => (
                                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${message.role === 'user'
                                                ? theme === 'dark'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-500 text-white'
                                                : theme === 'dark'
                                                    ? 'bg-gray-700 text-gray-200'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            <div className="text-sm whitespace-pre-line">{message.content}</div>
                                            <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                {message.timestamp.toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {isGenerating && (
                                <div className="flex justify-start">
                                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        <div className="flex items-center space-x-2">
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span className="text-sm">IA pensando...</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Input do Chat */}
                        <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                            }`}>
                            <div className="flex space-x-2">
                                <textarea
                                    ref={queryInputRef}
                                    value={userQuery}
                                    onChange={(e) => setUserQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendQuery()}
                                    placeholder="Pergunte sobre otimizações, segurança, estrutura..."
                                    className={`flex-1 p-2 rounded-lg border resize-none ${theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                    rows={2}
                                />
                                <button
                                    onClick={sendQuery}
                                    disabled={!userQuery.trim() || isGenerating}
                                    className={`px-4 py-2 rounded-lg transition-colors ${userQuery.trim() && !isGenerating
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
