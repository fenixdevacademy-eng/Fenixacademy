'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone, Mail, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface Message {
    id: string;
    type: 'user' | 'bot' | 'system';
    content: string;
    timestamp: Date;
    isTyping?: boolean;
    attachments?: Array<{
        type: 'image' | 'file' | 'link';
        name: string;
        url: string;
    }>;
}

interface SupportChatProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export function SupportChat({ isOpen, onClose, className = '' }: SupportChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        plan: 'free'
    });
    const [showUserForm, setShowUserForm] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Simular conexão com o servidor
            setTimeout(() => {
                setIsConnected(true);
                addSystemMessage('Conectado ao suporte! Como posso te ajudar?');
            }, 1000);
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
            ...message,
            id: Date.now().toString(),
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const addSystemMessage = (content: string) => {
        addMessage({
            type: 'system',
            content
        });
    };

    const handleSendMessage = async () => {
        if (!input.trim() || !isConnected) return;

        const userMessage = input.trim();
        setInput('');

        // Adicionar mensagem do usuário
        addMessage({
            type: 'user',
            content: userMessage
        });

        // Simular digitação do bot
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            handleBotResponse(userMessage);
        }, 1000 + Math.random() * 2000);
    };

    const handleBotResponse = (userMessage: string) => {
        const message = userMessage.toLowerCase();
        let response = '';

        // Respostas automáticas baseadas em palavras-chave
        if (message.includes('preço') || message.includes('valor') || message.includes('custo')) {
            response = 'Nossos planos começam em R$ 39/mês para o Pro e R$ 149/mês para o Enterprise. Temos também um plano gratuito! Gostaria de saber mais sobre algum plano específico?';
        } else if (message.includes('desconto') || message.includes('cupom') || message.includes('promoção')) {
            response = 'Temos vários cupons disponíveis! Você pode usar WELCOME20 para 20% de desconto, STUDENT50 para 50% se for estudante, ou TRIAL7 para 7 dias grátis. Qual você gostaria de usar?';
        } else if (message.includes('cancelar') || message.includes('cancelamento')) {
            response = 'Você pode cancelar sua assinatura a qualquer momento na sua área de membros. Não há taxas de cancelamento e você continuará tendo acesso até o final do período pago. Precisa de ajuda com o cancelamento?';
        } else if (message.includes('problema') || message.includes('erro') || message.includes('bug')) {
            response = 'Entendo que você está enfrentando um problema. Vou conectar você com nosso time técnico. Enquanto isso, você pode tentar: 1) Atualizar a página, 2) Limpar o cache do navegador, 3) Verificar sua conexão com a internet. O problema persiste?';
        } else if (message.includes('curso') || message.includes('aula') || message.includes('conteúdo')) {
            response = 'Nossos cursos são atualizados constantemente com as últimas tecnologias! Você tem acesso a mais de 100 cursos em diferentes áreas. Qual área te interessa mais: Frontend, Backend, Data Science, ou DevOps?';
        } else if (message.includes('certificado') || message.includes('certificação')) {
            response = 'Sim! Todos os nossos cursos oferecem certificados de conclusão. Os planos Pro e Enterprise incluem certificados premium com maior reconhecimento no mercado. Você está interessado em algum curso específico?';
        } else if (message.includes('mentoria') || message.includes('mentor')) {
            response = 'Nossos planos Pro e Enterprise incluem mentoria 1:1 com especialistas da área! No Pro você tem 2 sessões por mês, e no Enterprise tem suporte dedicado 24/7. Gostaria de agendar uma sessão?';
        } else if (message.includes('ia') || message.includes('inteligência artificial')) {
            response = 'Nossa IA superinteligente é uma das principais funcionalidades! Ela pode analisar seu código, criar roteiros de aprendizado personalizados, responder dúvidas técnicas e muito mais. Já experimentou alguma funcionalidade específica?';
        } else if (message.includes('obrigado') || message.includes('valeu') || message.includes('thanks')) {
            response = 'De nada! Fico feliz em ajudar! 😊 Se tiver mais alguma dúvida, é só chamar. Boa sorte com seus estudos na Fenix Academy!';
        } else {
            // Resposta genérica
            const responses = [
                'Entendi! Vou te ajudar com isso. Pode me dar mais detalhes sobre sua dúvida?',
                'Interessante! Deixe-me conectar você com o especialista certo. Qual é sua principal necessidade?',
                'Ótima pergunta! Nossa equipe pode te ajudar com isso. Você gostaria de falar com vendas, suporte técnico ou tem alguma dúvida sobre cursos?',
                'Perfeito! Vou buscar as melhores informações para você. Enquanto isso, você pode explorar nossa base de conhecimento ou verificar o FAQ.',
                'Entendo sua preocupação. Vou te conectar com alguém que pode resolver isso rapidamente. Qual é o melhor horário para contato?'
            ];
            response = responses[Math.floor(Math.random() * responses.length)];
        }

        addMessage({
            type: 'bot',
            content: response
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleUserFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInfo.name && userInfo.email) {
            setShowUserForm(false);
            addSystemMessage(`Olá ${userInfo.name}! Como posso te ajudar hoje?`);
        }
    };

    const getQuickActions = () => [
        { label: 'Ver Preços', action: 'Quais são os preços dos planos?' },
        { label: 'Cupons', action: 'Quais cupons de desconto vocês têm?' },
        { label: 'Cancelar', action: 'Como cancelar minha assinatura?' },
        { label: 'Problema Técnico', action: 'Estou com um problema técnico' },
        { label: 'Falar com Vendas', action: 'Quero falar com o time de vendas' },
    ];

    if (!isOpen) return null;

    return (
        <div className={`fixed bottom-4 right-4 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 text-white rounded-full">
                        <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            Suporte Fenix
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                            <span className="text-gray-500 dark:text-gray-400">
                                {isConnected ? 'Online' : 'Conectando...'}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
                {showUserForm ? (
                    <div className="space-y-4">
                        <div className="text-center">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Vamos começar!
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Conte-nos um pouco sobre você para personalizarmos o atendimento
                            </p>
                        </div>

                        <form onSubmit={handleUserFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Seu nome"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Plano Atual
                                </label>
                                <select
                                    value={userInfo.plan}
                                    onChange={(e) => setUserInfo(prev => ({ ...prev, plan: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="free">Gratuito</option>
                                    <option value="pro">Pro</option>
                                    <option value="enterprise">Enterprise</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Começar Conversa
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.type !== 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                        {message.type === 'system' ? <CheckCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                )}

                                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                                    <div
                                        className={`p-3 rounded-lg ${message.type === 'user'
                                                ? 'bg-blue-500 text-white'
                                                : message.type === 'system'
                                                    ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap">{message.content}</div>
                                        <div className="text-xs opacity-70 mt-1">
                                            {message.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>

                                {message.type === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center order-2">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-3 justify-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Quick Actions */}
            {!showUserForm && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {getQuickActions().map((action, index) => (
                            <button
                                key={index}
                                onClick={() => setInput(action.action)}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            {!showUserForm && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            disabled={!isConnected}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!input.trim() || !isConnected}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SupportChat;

