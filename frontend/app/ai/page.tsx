'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Brain,
    Send,
    Bot,
    User,
    Copy,
    Download,
    Settings,
    Zap,
    Code,
    BookOpen,
    Lightbulb,
    MessageSquare,
    Sparkles,
    ChevronDown,
    ChevronUp,
    RotateCcw,
    Trash2,
    Star,
    Share2
} from 'lucide-react';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    type?: 'text' | 'code' | 'explanation' | 'suggestion';
    language?: string;
    isCode?: boolean;
}

interface AICapability {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    prompt: string;
}

const AICapabilities: AICapability[] = [
    {
        id: 'code-generation',
        name: 'Geração de Código',
        description: 'Gere código em qualquer linguagem',
        icon: <Code className="w-5 h-5" />,
        color: 'bg-blue-500',
        prompt: 'Gere código para: '
    },
    {
        id: 'code-explanation',
        name: 'Explicação de Código',
        description: 'Entenda como o código funciona',
        icon: <BookOpen className="w-5 h-5" />,
        color: 'bg-green-500',
        prompt: 'Explique este código: '
    },
    {
        id: 'bug-fixing',
        name: 'Correção de Bugs',
        description: 'Encontre e corrija erros',
        icon: <Zap className="w-5 h-5" />,
        color: 'bg-red-500',
        prompt: 'Corrija este bug: '
    },
    {
        id: 'code-optimization',
        name: 'Otimização',
        description: 'Melhore a performance do código',
        icon: <Sparkles className="w-5 h-5" />,
        color: 'bg-purple-500',
        prompt: 'Otimize este código: '
    },
    {
        id: 'learning-help',
        name: 'Ajuda no Aprendizado',
        description: 'Tire dúvidas sobre programação',
        icon: <Lightbulb className="w-5 h-5" />,
        color: 'bg-yellow-500',
        prompt: 'Me ajude a entender: '
    }
];

const FenixAIPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCapability, setSelectedCapability] = useState<AICapability | null>(null);
    const [showCapabilities, setShowCapabilities] = useState(true);
    const [aiModel, setAiModel] = useState('gpt-4');
    const [conversationHistory, setConversationHistory] = useState<ChatMessage[][]>([]);
    const [currentConversation, setCurrentConversation] = useState(0);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Scroll para a última mensagem
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focar no input quando a página carrega
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Mensagem de boas-vindas
    useEffect(() => {
        const welcomeMessage: ChatMessage = {
            id: 'welcome',
            role: 'assistant',
            content: `👋 Olá! Eu sou a **IA da Fenix Academy**! 

Sou sua assistente inteligente para programação e desenvolvimento. Posso te ajudar com:

🧠 **Geração de código** em qualquer linguagem
📚 **Explicação** de conceitos complexos  
🐛 **Correção de bugs** e problemas
⚡ **Otimização** de performance
💡 **Aprendizado** e dúvidas

Como posso te ajudar hoje?`,
            timestamp: new Date(),
            type: 'text'
        };
        setMessages([welcomeMessage]);
    }, []);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: inputMessage,
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        // Simular resposta da IA
        setTimeout(() => {
            const aiResponse: ChatMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: generateAIResponse(inputMessage, selectedCapability),
                timestamp: new Date(),
                type: detectMessageType(inputMessage),
                language: detectLanguage(inputMessage),
                isCode: inputMessage.includes('```') || inputMessage.includes('function') || inputMessage.includes('class')
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1500);
    };

    const generateAIResponse = (message: string, capability: AICapability | null): string => {
        const responses = {
            'code-generation': `Aqui está o código que você solicitou:

\`\`\`javascript
// ${message.replace('Gere código para: ', '')}
function exemplo() {
    console.log('Código gerado pela IA da Fenix!');
    return 'Sucesso!';
}

// Exemplo de uso
const resultado = exemplo();
console.log(resultado);
\`\`\`

Este código implementa exatamente o que você pediu. Precisa de alguma modificação ou tem dúvidas sobre como funciona?`,

            'code-explanation': `Vou explicar este código passo a passo:

**Análise do Código:**
${message.replace('Explique este código: ', '')}

**Explicação Detalhada:**
1. **Estrutura**: O código segue um padrão bem definido
2. **Funcionalidade**: Cada parte tem um propósito específico
3. **Fluxo**: A execução acontece de forma sequencial
4. **Resultado**: Produz o resultado esperado

**Conceitos Importantes:**
- Padrões de programação utilizados
- Boas práticas implementadas
- Possíveis melhorias

Tem alguma parte específica que gostaria que eu detalhe mais?`,

            'bug-fixing': `Encontrei o problema! Aqui está a correção:

**🐛 Bug Identificado:**
${message.replace('Corrija este bug: ', '')}

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
- O problema estava na validação de dados
- Adicionei tratamento de erro adequado
- Melhorei a lógica de processamento

Teste agora e me avise se funcionou!`,

            'code-optimization': `Aqui está a versão otimizada do seu código:

**⚡ Otimizações Aplicadas:**
${message.replace('Otimize este código: ', '')}

**🚀 Código Otimizado:**
\`\`\`javascript
// Versão otimizada
const codigoOtimizado = {
    // Uso de const/let ao invés de var
    processarDados: (dados) => {
        // Algoritmo mais eficiente
        return dados
            .filter(item => item.ativo)
            .map(item => transformarItem(item))
            .reduce((acc, item) => acc + item.valor, 0);
    }
};
\`\`\`

**Melhorias Implementadas:**
- ⚡ Performance: 40% mais rápido
- 💾 Memória: 30% menos uso
- 🔧 Manutenibilidade: Código mais limpo
- 🧪 Testabilidade: Mais fácil de testar

Quer que eu explique alguma otimização específica?`,

            'learning-help': `Ótima pergunta! Vou te ajudar a entender:

**📚 Conceito:**
${message.replace('Me ajude a entender: ', '')}

**🎯 Explicação Simples:**
Imagine que você está construindo uma casa. Este conceito é como...

**💡 Exemplo Prático:**
\`\`\`javascript
// Exemplo prático
const exemplo = {
    conceito: '${message.replace('Me ajude a entender: ', '')}',
    aplicacao: 'Como usar na prática',
    beneficios: 'Por que é importante'
};
\`\`\`

**🔗 Recursos Adicionais:**
- Documentação oficial
- Tutoriais recomendados
- Exercícios práticos
- Projetos para praticar

Tem alguma parte que ainda não ficou clara?`
        };

        return responses[capability?.id as keyof typeof responses] ||
            `Entendi sua pergunta sobre: "${message}"

Aqui está minha resposta detalhada:

**Análise:**
Sua pergunta é muito pertinente e mostra que você está pensando de forma estratégica sobre o desenvolvimento.

**Solução:**
Baseado no contexto da Fenix Academy e nas melhores práticas de programação, recomendo:

1. **Abordagem Principal**: Use as técnicas mais modernas
2. **Implementação**: Siga os padrões estabelecidos
3. **Testes**: Sempre valide seu código
4. **Documentação**: Mantenha tudo bem documentado

**Próximos Passos:**
- Implemente a solução sugerida
- Teste em diferentes cenários
- Documente o processo
- Compartilhe o conhecimento

Precisa de mais detalhes sobre algum ponto específico?`;
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

    const handleCapabilitySelect = (capability: AICapability) => {
        setSelectedCapability(capability);
        setInputMessage(capability.prompt);
        inputRef.current?.focus();
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

    const downloadConversation = () => {
        const conversation = messages.map(msg =>
            `${msg.role === 'user' ? 'Usuário' : 'IA'}: ${msg.content}`
        ).join('\n\n');

        const blob = new Blob([conversation], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fenix-ai-conversation-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const clearConversation = () => {
        setMessages([]);
        setSelectedCapability(null);
    };

    const formatMessage = (content: string) => {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-sm">$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>');
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">IA da Fenix Academy</h1>
                            <p className="text-sm text-gray-500">Sua assistente inteligente para programação</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <select
                            value={aiModel}
                            onChange={(e) => setAiModel(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                        >
                            <option value="gpt-4">GPT-4</option>
                            <option value="claude-3">Claude 3</option>
                            <option value="copilot">GitHub Copilot</option>
                        </select>

                        <button
                            onClick={downloadConversation}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                            title="Download da conversa"
                        >
                            <Download className="w-5 h-5" />
                        </button>

                        <button
                            onClick={clearConversation}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Limpar conversa"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Capabilities Panel */}
            {showCapabilities && (
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-700">Capacidades da IA</h3>
                        <button
                            onClick={() => setShowCapabilities(!showCapabilities)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {showCapabilities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {AICapabilities.map((capability) => (
                            <button
                                key={capability.id}
                                onClick={() => handleCapabilitySelect(capability)}
                                className={`p-3 rounded-lg border-2 transition-all ${selectedCapability?.id === capability.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-8 h-8 ${capability.color} rounded-lg flex items-center justify-center text-white mb-2`}>
                                    {capability.icon}
                                </div>
                                <h4 className="text-sm font-medium text-gray-900 mb-1">{capability.name}</h4>
                                <p className="text-xs text-gray-500">{capability.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user'
                                    ? 'bg-blue-500 ml-3'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 mr-3'
                                }`}>
                                {message.role === 'user' ? (
                                    <User className="w-4 h-4 text-white" />
                                ) : (
                                    <Bot className="w-4 h-4 text-white" />
                                )}
                            </div>

                            <div className={`px-4 py-3 rounded-lg ${message.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white border border-gray-200'
                                }`}>
                                <div
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: formatMessage(message.content)
                                    }}
                                />

                                <div className="flex items-center justify-between mt-2">
                                    <span className={`text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString()}
                                    </span>

                                    {message.role === 'assistant' && (
                                        <button
                                            onClick={() => copyToClipboard(message.content)}
                                            className="text-gray-400 hover:text-gray-600"
                                            title="Copiar resposta"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex space-x-3">
                    <div className="flex-1">
                        <textarea
                            ref={inputRef}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite sua pergunta ou código aqui..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={3}
                        />
                    </div>

                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        <Send className="w-5 h-5" />
                        <span>Enviar</span>
                    </button>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                    Pressione Enter para enviar, Shift+Enter para nova linha
                </div>
            </div>
        </div>
    );
};

export default FenixAIPage;




