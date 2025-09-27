'use client';

import { useState, useCallback, useRef } from 'react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface UseFenixAIOptions {
    onMessage?: (message: Message) => void;
    onError?: (error: string) => void;
}

export const useFenixAI = (options: UseFenixAIOptions = {}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
            ...message,
            id: Date.now().toString(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        options.onMessage?.(newMessage);

        return newMessage;
    }, [options]);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);

        // Adicionar mensagem do usuário
        addMessage({
            role: 'user',
            content: content.trim()
        });

        try {
            // Cancelar requisição anterior se existir
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();

            // Simular resposta da IA
            const response = await generateAIResponse(content);

            addMessage({
                role: 'assistant',
                content: response
            });

        } catch (error: any) {
            if (error.name !== 'AbortError') {
                const errorMessage = `Erro ao processar sua mensagem: ${error.message}`;
                setError(errorMessage);
                options.onError?.(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, addMessage, options]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    const exportConversation = useCallback(() => {
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
    }, [messages]);

    const cancelRequest = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setIsLoading(false);
        }
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
        exportConversation,
        cancelRequest
    };
};

// Função para gerar resposta da IA
const generateAIResponse = async (message: string): Promise<string> => {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const messageType = detectMessageType(message);

    switch (messageType) {
        case 'code':
            return generateCodeResponse(message, '');
        case 'explanation':
            return generateExplanationResponse(message, '');
        case 'suggestion':
            return generateSuggestionResponse(message, '');
        default:
            return generateGeneralResponse(message);
    }
};

const detectMessageType = (message: string): 'text' | 'code' | 'explanation' | 'suggestion' => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('código') || lowerMessage.includes('code') ||
        lowerMessage.includes('function') || lowerMessage.includes('const') ||
        lowerMessage.includes('var') || lowerMessage.includes('let')) {
        return 'code';
    }

    if (lowerMessage.includes('explica') || lowerMessage.includes('explain') ||
        lowerMessage.includes('como funciona') || lowerMessage.includes('o que é')) {
        return 'explanation';
    }

    if (lowerMessage.includes('sugestão') || lowerMessage.includes('suggestion') ||
        lowerMessage.includes('melhorar') || lowerMessage.includes('otimizar')) {
        return 'suggestion';
    }

    return 'text';
};

const generateCodeResponse = (message: string, context: string): string => {
    return `Aqui está a solução para seu código:

\`\`\`javascript
// Solução baseada na sua pergunta
function exemplo() {
  // Implementação aqui
  return "resultado";
}
\`\`\`

**Explicação:**
- Esta solução resolve o problema mencionado
- Use boas práticas de programação
- Teste sempre seu código

Precisa de mais detalhes sobre alguma parte específica?`;
};

const generateExplanationResponse = (message: string, context: string): string => {
    return `Vou explicar isso de forma clara:

**Conceito:**
${message}

**Como funciona:**
1. Primeiro passo
2. Segundo passo
3. Terceiro passo

**Exemplo prático:**
\`\`\`javascript
// Exemplo de código
console.log("Exemplo prático");
\`\`\`

**Dicas importantes:**
- Lembre-se sempre de...
- Evite fazer...
- Boa prática é...

Ficou alguma dúvida específica?`;
};

const generateSuggestionResponse = (message: string, context: string): string => {
    return `Aqui estão minhas sugestões para melhorar:

**Análise do seu código:**
${message}

**Sugestões de melhoria:**
1. **Performance**: Considere otimizar...
2. **Legibilidade**: Use nomes mais descritivos...
3. **Manutenibilidade**: Quebre em funções menores...

**Código otimizado:**
\`\`\`javascript
// Versão melhorada
function exemploOtimizado() {
  // Implementação otimizada
  return resultado;
}
\`\`\`

**Próximos passos:**
- Teste a solução
- Implemente gradualmente
- Meça o desempenho

Quer que eu detalhe alguma sugestão específica?`;
};

const generateGeneralResponse = (message: string): string => {
    return `Olá! Sou o assistente da Fenix Academy. 

**Como posso te ajudar hoje?**

🔥 **Por que escolher a Fenix Academy?**

**🎯 Diferenciais Únicos:**
- **Qualidade CS50**: Padrão Harvard/MIT de excelência
- **Metodologia Prática**: 80% hands-on, 20% teoria
- **Mentoria Personalizada**: Acompanhamento individual
- **Comunidade Ativa**: +50.000 desenvolvedores
- **Preços Acessíveis**: Qualidade Harvard por preço justo

**💎 O que nos torna especiais:**
1. **Currículo Atualizado**: Sempre com as tecnologias mais recentes
2. **Projetos Reais**: Portfólio profissional desde o primeiro dia
3. **Suporte 24/7**: Mentores disponíveis quando você precisar
4. **Garantia de Emprego**: 90% dos alunos conseguem emprego em 6 meses
5. **Preços Acessíveis**: Qualidade Harvard por preço justo

**🚀 Resultados Comprovados:**
- ⭐ 4.9/5 de avaliação dos alunos
- 💼 90% de taxa de empregabilidade
- 🏆 15+ prêmios de melhor curso online
- 🌍 Alunos em 50+ países

**💡 Tecnologias que você dominará:**
\`\`\`javascript
// Frontend
React, Next.js, TypeScript, Tailwind CSS

// Backend
Node.js, Python, PostgreSQL, MongoDB

// DevOps
Docker, AWS, Vercel, CI/CD

// Mobile
React Native, Flutter
\`\`\`

**🎓 Cursos Disponíveis:**
- **Desenvolvimento Web Full Stack** (R$ 497)
- **Python para Data Science** (R$ 397)
- **React Avançado** (R$ 297)
- **Node.js & APIs** (R$ 297)

**💬 Posso te ajudar com:**
- Explicar conceitos de programação
- Revisar e melhorar seu código
- Sugerir soluções para problemas
- Orientar sobre carreira em tech
- Explicar tecnologias específicas

**Digite sua pergunta ou escolha uma opção:**
1. "Explica como funciona React"
2. "Revisa meu código JavaScript"
3. "Quero saber sobre carreira em tech"
4. "Mostra os cursos disponíveis"

Estou aqui para te ajudar a se tornar um desenvolvedor de sucesso! 🚀`;
};