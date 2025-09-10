'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Brain,
    Send,
    Bot,
    User,
    Copy,
    X,
    Minimize2,
    Maximize2,
    Settings,
    Zap,
    Code,
    BookOpen,
    Lightbulb,
    Sparkles,
    Wifi,
    WifiOff,
    AlertCircle
} from 'lucide-react';
import { useLocalAI } from '../hooks/useLocalAI';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    type?: 'text' | 'code' | 'explanation' | 'suggestion';
    language?: string;
}

interface FenixAIChatProps {
    isOpen: boolean;
    onClose: () => void;
    onMinimize?: () => void;
    isMinimized?: boolean;
    initialMessage?: string;
    context?: string;
}

const FenixAIChat: React.FC<FenixAIChatProps> = ({
    isOpen,
    onClose,
    onMinimize,
    isMinimized = false,
    initialMessage = '',
    context = ''
}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState(initialMessage);
    const [isExpanded, setIsExpanded] = useState(false);
    const [useLocalModel, setUseLocalModel] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Hook da IA local
    const {
        isReady: isLocalAIReady,
        isGenerating,
        error: localAIError,
        generateFenixResponse,
        generateCodeExplanation,
        generateLearningPath,
        generateCodeReview,
        initialize: initializeLocalAI
    } = useLocalAI();

    // Scroll para a última mensagem
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focar no input quando abre
    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
        }
    }, [isOpen, isMinimized]);

    // Mensagem inicial se fornecida
    useEffect(() => {
        if (initialMessage && isOpen) {
            handleSendMessage();
        }
    }, [initialMessage, isOpen]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isGenerating) return;

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: inputMessage,
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');

        try {
            let aiResponse: ChatMessage;

            if (useLocalModel && isLocalAIReady) {
                // Usar IA local
                const response = await generateFenixResponse(currentInput);
                
                if (response.success && response.response) {
                    aiResponse = {
                        id: `ai-${Date.now()}`,
                        role: 'assistant',
                        content: response.response,
                        timestamp: new Date(),
                        type: detectMessageType(currentInput),
                        language: detectLanguage(currentInput)
                    };
                } else {
                    // Fallback para resposta padrão se IA local falhar
                    aiResponse = {
                        id: `ai-${Date.now()}`,
                        role: 'assistant',
                        content: generateAIResponse(currentInput, context),
                        timestamp: new Date(),
                        type: detectMessageType(currentInput),
                        language: detectLanguage(currentInput)
                    };
                }
            } else {
                // Usar resposta simulada (fallback)
                aiResponse = {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: generateAIResponse(currentInput, context),
                    timestamp: new Date(),
                    type: detectMessageType(currentInput),
                    language: detectLanguage(currentInput)
                };
            }

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Erro ao gerar resposta:', error);
            const errorResponse: ChatMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
                timestamp: new Date(),
                type: 'text'
            };
            setMessages(prev => [...prev, errorResponse]);
        }
    };

    const generateAIResponse = (message: string, context: string): string => {
        const responses = {
            'code': `Aqui está a solução para seu código:

\`\`\`javascript
// ${message}
function solucao() {
    // Implementação baseada na sua pergunta
    console.log('Código gerado pela IA da Fenix!');
    return 'Sucesso!';
}
\`\`\`

**Explicação:**
Este código implementa exatamente o que você precisa. ${context ? `Considerando o contexto: ${context}` : ''}

**Próximos passos:**
1. Teste o código
2. Adapte conforme necessário
3. Me pergunte se tiver dúvidas!`,

            'explanation': `Vou explicar isso de forma clara:

**Conceito:**
${message}

**Explicação Detalhada:**
1. **O que é**: Um conceito fundamental em programação
2. **Como funciona**: O mecanismo por trás
3. **Por que usar**: Os benefícios e vantagens
4. **Exemplo prático**: Como aplicar na prática

**Exemplo:**
\`\`\`javascript
// Exemplo prático
const exemplo = {
    conceito: '${message}',
    aplicacao: 'Como usar',
    beneficio: 'Por que é importante'
};
\`\`\`

**Recursos adicionais:**
- Documentação oficial
- Tutoriais recomendados
- Exercícios práticos

Tem alguma parte específica que gostaria que eu detalhe mais?`,

            'bug': `Encontrei o problema! Aqui está a correção:

**🐛 Bug Identificado:**
${message}

**✅ Solução:**
\`\`\`javascript
// Código corrigido
function codigoCorrigido() {
    try {
        // Implementação corrigida
        const resultado = processarDados();
        return resultado;
    } catch (error) {
        console.error('Erro capturado:', error);
        return null;
    }
}
\`\`\`

**Explicação da Correção:**
- O problema estava na validação
- Adicionei tratamento de erro
- Melhorei a lógica

**Teste agora e me avise se funcionou!**`,

            'optimization': `Aqui está a versão otimizada:

**⚡ Otimizações Aplicadas:**
${message}

**🚀 Código Otimizado:**
\`\`\`javascript
// Versão otimizada
const codigoOtimizado = {
    processarDados: (dados) => {
        return dados
            .filter(item => item.ativo)
            .map(item => transformarItem(item))
            .reduce((acc, item) => acc + item.valor, 0);
    }
};
\`\`\`

**Melhorias:**
- ⚡ Performance: 40% mais rápido
- 💾 Memória: 30% menos uso
- 🔧 Manutenibilidade: Código mais limpo

Quer que eu explique alguma otimização específica?`,

            'default': `Entendi sua pergunta sobre: "${message}"

**Análise:**
Sua pergunta é muito pertinente e mostra pensamento estratégico.

**Solução:**
Baseado nas melhores práticas da Fenix Academy:

1. **Abordagem Principal**: Use técnicas modernas
2. **Implementação**: Siga padrões estabelecidos  
3. **Testes**: Sempre valide seu código
4. **Documentação**: Mantenha tudo documentado

**Exemplo Prático:**
\`\`\`javascript
// Implementação sugerida
const solucao = {
    pergunta: '${message}',
    resposta: 'Solução baseada em boas práticas',
    implementacao: 'Como aplicar na prática'
};
\`\`\`

**Próximos Passos:**
- Implemente a solução
- Teste em diferentes cenários
- Documente o processo
- Compartilhe o conhecimento

Precisa de mais detalhes sobre algum ponto específico?`
        };

        if (message.includes('código') || message.includes('code') || message.includes('function')) {
            return responses.code;
        }
        if (message.includes('explique') || message.includes('como funciona') || message.includes('entender')) {
            return responses.explanation;
        }
        if (message.includes('bug') || message.includes('erro') || message.includes('problema')) {
            return responses.bug;
        }
        if (message.includes('otimizar') || message.includes('melhorar') || message.includes('performance')) {
            return responses.optimization;
        }

        return responses.default;
    };

    const detectMessageType = (message: string): 'text' | 'code' | 'explanation' | 'suggestion' => {
        if (message.includes('```') || message.includes('function') || message.includes('class')) {
            return 'code';
        }
        if (message.includes('explique') || message.includes('como funciona')) {
            return 'explanation';
        }
        if (message.includes('sugira') || message.includes('recomende')) {
            return 'suggestion';
        }
        return 'text';
    };

    const detectLanguage = (message: string): string => {
        if (message.includes('javascript') || message.includes('js')) return 'javascript';
        if (message.includes('python') || message.includes('py')) return 'python';
        if (message.includes('html')) return 'html';
        if (message.includes('css')) return 'css';
        if (message.includes('react')) return 'jsx';
        if (message.includes('vue')) return 'vue';
        return 'text';
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const formatMessage = (content: string) => {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-sm">$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>');
    };

    if (!isOpen) return null;

    if (isMinimized) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={onMinimize}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-white"
                    title="Abrir IA da Fenix"
                >
                    <Brain className="w-6 h-6" />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5" />
                        <div>
                            <span className="font-semibold">IA da Fenix</span>
                            <div className="flex items-center space-x-1 text-xs">
                                {useLocalModel ? (
                                    isLocalAIReady ? (
                                        <>
                                            <Wifi className="w-3 h-3 text-green-300" />
                                            <span className="text-green-300">Local</span>
                                        </>
                                    ) : localAIError ? (
                                        <>
                                            <AlertCircle className="w-3 h-3 text-red-300" />
                                            <span className="text-red-300">Erro</span>
                                        </>
                                    ) : (
                                        <>
                                            <WifiOff className="w-3 h-3 text-yellow-300" />
                                            <span className="text-yellow-300">Carregando...</span>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <WifiOff className="w-3 h-3 text-gray-300" />
                                        <span className="text-gray-300">Simulado</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => setUseLocalModel(!useLocalModel)}
                            className="p-1 hover:bg-white/20 rounded"
                            title={useLocalModel ? "Usar IA Simulada" : "Usar IA Local"}
                        >
                            {useLocalModel ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-1 hover:bg-white/20 rounded"
                            title={isExpanded ? "Minimizar" : "Expandir"}
                        >
                            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>

                        {onMinimize && (
                            <button
                                onClick={onMinimize}
                                className="p-1 hover:bg-white/20 rounded"
                                title="Minimizar"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/20 rounded"
                            title="Fechar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        <Brain className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">Olá! Sou a IA da Fenix Academy.</p>
                        <p className="text-xs">Como posso te ajudar hoje?</p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.role === 'user'
                                    ? 'bg-blue-500 ml-2'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 mr-2'
                                }`}>
                                {message.role === 'user' ? (
                                    <User className="w-3 h-3 text-white" />
                                ) : (
                                    <Bot className="w-3 h-3 text-white" />
                                )}
                            </div>

                            <div className={`px-3 py-2 rounded-lg text-sm ${message.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                <div
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: formatMessage(message.content)
                                    }}
                                />

                                {message.role === 'assistant' && (
                                    <button
                                        onClick={() => copyToClipboard(message.content)}
                                        className="mt-1 text-xs text-gray-500 hover:text-gray-700"
                                        title="Copiar resposta"
                                    >
                                        <Copy className="w-3 h-3 inline mr-1" />
                                        Copiar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isGenerating && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <Bot className="w-3 h-3 text-white" />
                            </div>
                            <div className="bg-gray-100 rounded-lg px-3 py-2">
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {useLocalModel && isLocalAIReady ? 'IA Local processando...' : 'Processando...'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                    <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                        rows={2}
                    />

                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isGenerating}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FenixAIChat;


