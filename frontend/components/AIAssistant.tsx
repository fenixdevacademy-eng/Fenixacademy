'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
    Bot, Send, Sparkles, Code, Bug, Zap, BookOpen, 
    Lightbulb, X, Copy, Check, RotateCcw, Settings 
} from 'lucide-react';

interface AIMessage {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    codeBlocks?: string[];
    suggestions?: string[];
}

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    currentFile?: {
        name: string;
        language: string;
        content: string;
    };
    onApplySuggestion?: (suggestion: string) => void;
}

export default function AIAssistant({ 
    isOpen, 
    onClose, 
    currentFile, 
    onApplySuggestion 
}: AIAssistantProps) {
    const [messages, setMessages] = useState<AIMessage[]>([
        {
            id: '1',
            type: 'assistant',
            content: '🚀 **Olá! Sou o AI Assistant da Fenix IDE!**\n\n✨ **Posso ajudar você com:**\n• 📝 **Revisão e otimização** de código\n• 🐛 **Detecção de bugs** inteligente\n• 💡 **Sugestões de melhoria** personalizadas\n• 📚 **Explicações de conceitos** didáticas\n• 🔧 **Refatoração de código** avançada\n\n🎯 **Como posso ajudar hoje?**',
            timestamp: new Date(),
            suggestions: [
                'Revisar este código',
                'Otimizar performance',
                'Explicar conceitos',
                'Detectar bugs'
            ]
        }
    ]);
    
    const [input, setInput] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState<'openai' | 'claude'>('openai');
    const [apiKey, setApiKey] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll para última mensagem
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Foco no input quando abrir
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: AIMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Simular chamada para API (substitua pela implementação real)
            const aiResponse = await generateAIResponse(input, currentFile);
            
            const assistantMessage: AIMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: aiResponse.content,
                timestamp: new Date(),
                codeBlocks: aiResponse.codeBlocks,
                suggestions: aiResponse.suggestions
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Erro ao gerar resposta AI:', error);
            
            const errorMessage: AIMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: '❌ **Desculpe, ocorreu um erro ao processar sua solicitação.**\n\n🔄 **Tente novamente ou:**\n• Verifique sua conexão\n• Reformule a pergunta\n• Use uma das ações rápidas',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const generateAIResponse = async (userInput: string, file?: any): Promise<any> => {
        // Simulação de resposta AI - substitua pela implementação real
        await new Promise(resolve => setTimeout(resolve, 1500));

        const responses = {
            'revisar': {
                content: `🔍 **Análise do código ${file?.name || 'atual'}**\n\n✅ **Pontos positivos:**\n• Estrutura bem organizada\n• Nomenclatura clara\n• Separação de responsabilidades\n\n⚠️ **Sugestões de melhoria:**\n• Considere adicionar validações\n• Otimize imports desnecessários\n• Adicione comentários para funções complexas\n\n💡 **Dica:** Use o sistema de linting integrado para manter a qualidade do código!`,
                codeBlocks: [
                    '// Exemplo de validação\nif (input == null || input.trim() === "") {\n    throw new ArgumentException("Input não pode ser vazio");\n}'
                ],
                suggestions: [
                    'Adicionar validações',
                    'Otimizar imports',
                    'Incluir comentários'
                ]
            },
            'otimizar': {
                content: `⚡ **Otimizações para ${file?.name || 'seu código'}**\n\n🚀 **Performance:**\n• Use StringBuilder para concatenações\n• Implemente lazy loading\n• Cache resultados frequentes\n\n💾 **Memória:**\n• Dispose objetos IDisposable\n• Use using statements\n• Evite alocações desnecessárias\n\n📊 **Métricas sugeridas:**\n• Tempo de execução: -40%\n• Uso de memória: -30%\n• Complexidade: -25%`,
                codeBlocks: [
                    '// Antes: Concatenação ineficiente\nstring result = "";\nfor (int i = 0; i < items.Count; i++) {\n    result += items[i] + ", ";\n}\n\n// Depois: StringBuilder otimizado\nvar sb = new StringBuilder();\nfor (int i = 0; i < items.Count; i++) {\n    sb.Append(items[i]).Append(", ");\n}\nstring result = sb.ToString();'
                ],
                suggestions: [
                    'Implementar StringBuilder',
                    'Adicionar lazy loading',
                    'Implementar cache'
                ]
            },
            'explicar': {
                content: `📚 **Explicação dos conceitos**\n\n🎯 **Conceitos identificados:**\n• **Async/Await:** Programação assíncrona\n• **LINQ:** Consultas integradas\n• **Dependency Injection:** Inversão de controle\n\n💡 **Explicação simples:**\nAsync/await permite que seu código "espere" operações demoradas sem travar a interface. É como pedir um café e continuar trabalhando enquanto ele é preparado!\n\n🔗 **Recursos relacionados:**\n• Módulo 3: Programação Assíncrona\n• Módulo 5: LINQ Avançado\n• Módulo 7: Arquitetura Clean`,
                codeBlocks: [
                    '// Exemplo de async/await\npublic async Task<string> GetUserDataAsync(int userId)\n{\n    var user = await _userService.GetByIdAsync(userId);\n    return user?.Name ?? "Usuário não encontrado";\n}'
                ],
                suggestions: [
                    'Ver módulo de async/await',
                    'Estudar LINQ',
                    'Aprender DI'
                ]
            },
            'bug': {
                content: `🐛 **Detecção de bugs**\n\n🚨 **Problemas encontrados:**\n• **Null Reference:** Linha 45 - possível exceção\n• **Memory Leak:** Linha 78 - dispose não chamado\n• **Race Condition:** Linha 112 - falta sincronização\n\n🔧 **Soluções:**\n• Adicione null checks\n• Use using statements\n• Implemente locks quando necessário\n\n⚠️ **Severidade:** MÉDIA\n💡 **Prioridade:** ALTA para produção`,
                codeBlocks: [
                    '// Solução para null reference\nif (user != null && user.Profile != null)\n{\n    var name = user.Profile.FullName;\n    // ... resto do código\n}\nelse\n{\n    throw new ArgumentException("Usuário ou perfil inválido");\n}'
                ],
                suggestions: [
                    'Adicionar null checks',
                    'Implementar using statements',
                    'Adicionar sincronização'
                ]
            }
        };

        // Detectar tipo de solicitação
        const inputLower = userInput.toLowerCase();
        if (inputLower.includes('revisar') || inputLower.includes('review')) {
            return responses.revisar;
        } else if (inputLower.includes('otimizar') || inputLower.includes('optimize')) {
            return responses.otimizar;
        } else if (inputLower.includes('explicar') || inputLower.includes('explain')) {
            return responses.explicar;
        } else if (inputLower.includes('bug') || inputLower.includes('erro')) {
            return responses.bug;
        }

        // Resposta genérica
        return {
            content: `🤖 **Resposta AI para: "${userInput}"**\n\n💡 **Sugestão:**\nPara obter respostas mais específicas, tente:\n• "Revisar este código"\n• "Otimizar performance"\n• "Explicar conceitos"\n• "Detectar bugs"\n\n🔧 **Contexto atual:**\n• Arquivo: ${file?.name || 'N/A'}\n• Linguagem: ${file?.language || 'N/A'}\n• Linhas: ${file?.content?.split('\n').length || 0}`,
            suggestions: [
                'Revisar código',
                'Otimizar performance',
                'Explicar conceitos',
                'Detectar bugs'
            ]
        };
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
        inputRef.current?.focus();
    };

    const handleApplySuggestion = (suggestion: string) => {
        if (onApplySuggestion) {
            onApplySuggestion(suggestion);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // Mostrar feedback visual
        } catch (error) {
            console.error('Erro ao copiar:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col border border-gray-200/50 dark:border-gray-700/50">
                {/* Header - Design Premium */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-700/50">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                            <Bot className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                AI Assistant
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Powered by {selectedModel === 'openai' ? 'OpenAI GPT-4' : 'Claude 3'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setSelectedModel(selectedModel === 'openai' ? 'claude' : 'openai')}
                            className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:scale-110 shadow-lg"
                            title="Alternar modelo AI"
                        >
                            <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-3 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl hover:from-red-200 hover:to-red-300 dark:hover:from-red-800/30 dark:hover:to-red-700/30 transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                            <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </button>
                    </div>
                </div>

                {/* Messages - Design Elegante */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl p-6 shadow-lg transition-all duration-300 ${
                                    message.type === 'user'
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                        : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-600/50'
                                }`}
                            >
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                                
                                {/* Code Blocks - Design Premium */}
                                {message.codeBlocks && message.codeBlocks.map((code, index) => (
                                    <div key={index} className="mt-4 bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm border border-gray-700 shadow-inner">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-400 text-xs font-medium">💻 CÓDIGO</span>
                                            <button
                                                onClick={() => copyToClipboard(code)}
                                                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg"
                                                title="Copiar código"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <pre className="overflow-x-auto text-xs">{code}</pre>
                                    </div>
                                ))}
                                
                                {/* Suggestions - Design Interativo */}
                                {message.suggestions && message.type === 'assistant' && (
                                    <div className="mt-4 space-y-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            💡 **Sugestões:**
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {message.suggestions.map((suggestion, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 rounded-xl text-sm hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/50 dark:hover:to-purple-800/50 transition-all duration-300 hover:scale-105 shadow-md border border-blue-200/50 dark:border-blue-700/50"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {/* Loading State - Design Animado */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 shadow-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <div className="absolute inset-0 w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                                        🤖 AI está pensando...
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Input - Design Moderno */}
                <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-gray-700/50">
                    <div className="flex space-x-4">
                        <div className="flex-1 relative">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder="🚀 Digite sua pergunta ou solicitação..."
                                className="w-full p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800/70 dark:text-white shadow-lg transition-all duration-300 text-sm"
                                rows={3}
                            />
                            <div className="absolute right-3 bottom-3 flex space-x-2">
                                <button
                                    onClick={() => setInput('')}
                                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                    title="Limpar"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleSendMessage}
                            disabled={!input.trim() || isLoading}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-3 font-medium"
                        >
                            <Send className="w-5 h-5" />
                            <span>Enviar</span>
                        </button>
                    </div>
                    
                    {/* Quick Actions - Design Interativo */}
                    <div className="mt-4 flex flex-wrap gap-3">
                        {[
                            { icon: Code, text: 'Revisar', action: 'Revisar este código' },
                            { icon: Zap, text: 'Otimizar', action: 'Otimizar performance' },
                            { icon: BookOpen, text: 'Explicar', action: 'Explicar conceitos' },
                            { icon: Bug, text: 'Debug', action: 'Detectar bugs' }
                        ].map((action, index) => (
                            <button
                                key={index}
                                onClick={() => setInput(action.action)}
                                className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:scale-105 shadow-md flex items-center space-x-2 border border-gray-200/50 dark:border-gray-600/50"
                            >
                                <action.icon className="w-4 h-4" />
                                <span>{action.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

