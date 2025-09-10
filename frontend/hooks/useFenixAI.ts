import { useState, useCallback } from 'react';
import { useLocalAI } from './useLocalAI';

interface AIConfig {
    model: 'gpt-4' | 'claude-3' | 'copilot' | 'local';
    temperature: number;
    maxTokens: number;
    context: string;
    useLocalAI: boolean;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    type?: 'text' | 'code' | 'explanation' | 'suggestion';
    language?: string;
}

interface UseFenixAIOptions {
    initialConfig?: Partial<AIConfig>;
    onMessage?: (message: ChatMessage) => void;
    onError?: (error: string) => void;
}

export const useFenixAI = (options: UseFenixAIOptions = {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [config, setConfig] = useState<AIConfig>({
        model: 'local',
        temperature: 0.7,
        maxTokens: 2000,
        context: '',
        useLocalAI: true,
        ...options.initialConfig
    });

    // Hook da IA local
    const localAI = useLocalAI();

    const openAI = useCallback(() => {
        setIsOpen(true);
        setIsMinimized(false);
    }, []);

    const closeAI = useCallback(() => {
        setIsOpen(false);
        setIsMinimized(false);
    }, []);

    const minimizeAI = useCallback(() => {
        setIsMinimized(true);
    }, []);

    const restoreAI = useCallback(() => {
        setIsMinimized(false);
    }, []);

    const sendMessage = useCallback(async (content: string, context?: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content,
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            let response: string;

            if (config.useLocalAI && localAI.isReady) {
                // Usar IA local
                const aiResponse = await localAI.generateFenixResponse(content);
                response = aiResponse.success ? aiResponse.response || 'Erro na resposta da IA local' : 'Erro na IA local';
            } else {
                // Usar API simulada
                response = await simulateAIResponse(content, context || config.context, config);
            }

            const aiMessage: ChatMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: response,
                timestamp: new Date(),
                type: detectMessageType(content),
                language: detectLanguage(content)
            };

            setMessages(prev => [...prev, aiMessage]);
            options.onMessage?.(aiMessage);
        } catch (error) {
            const errorMessage = `Erro ao processar sua mensagem: ${error}`;
            options.onError?.(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, config, options, localAI]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    const updateConfig = useCallback((newConfig: Partial<AIConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    }, []);

    const getConversationHistory = useCallback(() => {
        return messages;
    }, [messages]);

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

    return {
        // Estado
        isOpen,
        isMinimized,
        messages,
        isLoading,
        config,

        // IA Local
        localAI: {
            isReady: localAI.isReady,
            isGenerating: localAI.isGenerating,
            error: localAI.error,
            modelInfo: localAI.modelInfo
        },

        // Ações
        openAI,
        closeAI,
        minimizeAI,
        restoreAI,
        sendMessage,
        clearMessages,
        updateConfig,
        getConversationHistory,
        exportConversation,

        // Ações da IA Local
        initializeLocalAI: localAI.initialize,
        cleanupLocalAI: localAI.cleanup
    };
};

// Função para simular resposta da IA
const simulateAIResponse = async (message: string, context: string, config: AIConfig): Promise<string> => {
    // Simular delay baseado no modelo
    const delays: Record<string, number> = {
        'gpt-4': 1500,
        'claude-3': 1200,
        'copilot': 800,
        'local': 1000
    };

    await new Promise(resolve => setTimeout(resolve, delays[config.model] + Math.random() * 500));

    // Gerar resposta baseada no tipo de mensagem
    if (message.includes('código') || message.includes('code') || message.includes('function')) {
        return generateCodeResponse(message, context);
    }

    if (message.includes('explique') || message.includes('como funciona') || message.includes('entender')) {
        return generateExplanationResponse(message, context);
    }

    if (message.includes('bug') || message.includes('erro') || message.includes('problema')) {
        return generateBugFixResponse(message, context);
    }

    if (message.includes('otimizar') || message.includes('melhorar') || message.includes('performance')) {
        return generateOptimizationResponse(message, context);
    }

    return generateDefaultResponse(message, context);
};

const generateCodeResponse = (message: string, context: string): string => {
    return `Aqui está a solução para seu código:

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
3. Me pergunte se tiver dúvidas!`;
};

const generateExplanationResponse = (message: string, context: string): string => {
    return `Vou explicar isso de forma clara:

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

Tem alguma parte específica que gostaria que eu detalhe mais?`;
};

const generateBugFixResponse = (message: string, context: string): string => {
    return `Encontrei o problema! Aqui está a correção:

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

**Teste agora e me avise se funcionou!**`;
};

const generateOptimizationResponse = (message: string, context: string): string => {
    return `Aqui está a versão otimizada:

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

Quer que eu explique alguma otimização específica?`;
};

const generateDefaultResponse = (message: string, context: string): string => {
    // Resposta específica para "por que escolher a fenix"
    if (message.toLowerCase().includes('por que escolher a fenix') ||
        message.toLowerCase().includes('por que fenix') ||
        message.toLowerCase().includes('vantagens fenix')) {
        return `🔥 **Por que escolher a Fenix Academy?**

**🎯 Diferenciais Únicos:**
- **Qualidade CS50**: Padrão Harvard/MIT de excelência
- **Metodologia Prática**: 80% hands-on, 20% teoria
- **Mentoria Personalizada**: Acompanhamento individual
- **Comunidade Ativa**: +50.000 desenvolvedores

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
const tecnologias = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    mobile: ['React Native', 'Flutter'],
    cloud: ['AWS', 'Vercel', 'Docker'],
    ai: ['OpenAI', 'Machine Learning', 'Data Science']
};
\`\`\`

**🎁 O que você ganha:**
- ✅ Acesso vitalício aos cursos
- ✅ Certificados reconhecidos
- ✅ Projetos para portfólio
- ✅ Comunidade exclusiva
- ✅ Suporte para carreira
- ✅ Garantia de 30 dias

**🔥 Pronto para transformar sua carreira?**
A Fenix Academy é sua ponte para o futuro da programação!`;
    }

    // Resposta específica para preços e planos
    if (message.toLowerCase().includes('preço') ||
        message.toLowerCase().includes('valor') ||
        message.toLowerCase().includes('custo') ||
        message.toLowerCase().includes('quanto custa')) {
        return `💰 **Preços e Planos da Fenix Academy**

**🎯 Planos Disponíveis:**

**📚 Básico - R$ 97/mês**
- Acesso a 3 cursos
- Suporte por email
- Certificados básicos
- Projetos práticos
- *De R$ 197 (50% OFF)*

**⭐ Pro - R$ 197/mês** *(Mais Popular)*
- Acesso a TODOS os cursos
- Suporte prioritário 24/7
- Certificados premium
- Mentoria em grupo
- Projetos avançados
- Comunidade exclusiva
- *De R$ 397 (50% OFF)*

**👑 Fundador - R$ 997** *(Vitalício)*
- Acesso vitalício a TUDO
- Suporte VIP 24/7
- Certificados especiais
- Mentoria individual
- Comunidade fundadores
- Roadmap personalizado
- Garantia de 30 dias
- *De R$ 1.997 (50% OFF)*

**💳 Formas de Pagamento:**
- ✅ Cartão de crédito (até 12x sem juros)
- ✅ PIX (desconto de 5%)
- ✅ Boleto bancário
- ✅ Transferência bancária

**🎁 Promoções Especiais:**
- 🎯 **50% OFF** em todos os planos
- 🎯 **Garantia de 30 dias** ou seu dinheiro de volta
- 🎯 **Sem taxa de cancelamento**
- 🎯 **Acesso imediato** após o pagamento

**💡 Comparação com o mercado:**
- Bootcamps tradicionais: R$ 15.000+
- Cursos online básicos: R$ 200-500/mês
- **Fenix Academy**: R$ 97-197/mês
- **Economia**: Até 90% menos que bootcamps!

**🔥 Oferta por tempo limitado!**
Não perca essa oportunidade de transformar sua carreira!`;
    }

    // Resposta específica para cursos
    if (message.toLowerCase().includes('curso') ||
        message.toLowerCase().includes('o que aprendo') ||
        message.toLowerCase().includes('tecnologias')) {
        return `📚 **Cursos da Fenix Academy**

**🎯 Cursos Disponíveis:**

**🌐 Frontend Development:**
- HTML5, CSS3, JavaScript ES6+
- React.js + Next.js
- TypeScript + Tailwind CSS
- Vue.js + Nuxt.js
- Angular + RxJS

**⚙️ Backend Development:**
- Node.js + Express
- Python + Django/FastAPI
- Java + Spring Boot
- C# + .NET Core
- PHP + Laravel

**📱 Mobile Development:**
- React Native
- Flutter + Dart
- Swift (iOS)
- Kotlin (Android)

**☁️ Cloud & DevOps:**
- AWS (EC2, S3, Lambda, RDS)
- Docker + Kubernetes
- CI/CD com GitHub Actions
- Terraform + Infrastructure as Code

**🤖 AI & Data Science:**
- Python + Pandas/NumPy
- Machine Learning + TensorFlow
- Deep Learning + PyTorch
- Data Analysis + SQL
- OpenAI + GPT Integration

**🔐 Cybersecurity:**
- Ethical Hacking
- Penetration Testing
- Security Auditing
- Cryptography

**💼 Soft Skills:**
- Agile/Scrum
- Git + GitHub
- Clean Code
- System Design
- Interview Preparation

**🎓 Metodologia:**
- **80% Prática** + 20% Teoria
- **Projetos Reais** para portfólio
- **Mentoria Individual** semanal
- **Comunidade Ativa** 24/7
- **Certificados** reconhecidos

**⏱️ Duração:**
- Cada curso: 4-8 semanas
- Ritmo personalizado
- Acesso vitalício
- Atualizações gratuitas

**🚀 Resultado:**
Portfólio profissional pronto para o mercado!`;
    }

    return `Entendi sua pergunta sobre: "${message}"

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
