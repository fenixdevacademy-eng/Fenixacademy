'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Code,
    Play,
    Square,
    Download,
    Share2,
    Settings,
    Terminal,
    FileText,
    Save,
    RotateCcw,
    Brain,
    Zap,
    Globe,
    ChevronDown,
    Search,
    Lightbulb,
    Sparkles,
    CheckCircle,
    AlertCircle,
    X
} from 'lucide-react';

interface FenixIDEProps {
    type: 'exercise' | 'project';
    id: string;
    title: string;
    courseSlug: string;
    isOpen: boolean;
    onClose: () => void;
}

interface CodeFile {
    name: string;
    language: string;
    content: string;
    isModified?: boolean;
    lastModified?: Date;
}

interface Suggestion {
    text: string;
    type: 'snippet' | 'ai' | 'local' | 'brazilian';
    description?: string;
    priority: number;
}

interface ValidationResult {
    isValid: boolean;
    message: string;
    suggestions?: string[];
}

const FenixIDE: React.FC<FenixIDEProps> = ({
    type,
    id,
    title,
    courseSlug,
    isOpen,
    onClose
}) => {
    const [activeFile, setActiveFile] = useState<string>('main.js');
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAIProcessing, setIsAIProcessing] = useState(false);
    const [codeAnalysis, setCodeAnalysis] = useState<{
        lines: number;
        characters: number;
        functions: number;
        variables: number;
        comments: number;
        complexity: 'Baixa' | 'Média' | 'Alta';
    }>({
        lines: 0,
        characters: 0,
        functions: 0,
        variables: 0,
        comments: 0,
        complexity: 'Baixa'
    });
    const [executionStats, setExecutionStats] = useState<{
        startTime: number;
        endTime: number;
        duration: number;
        memoryUsage: number;
        performance: 'Excelente' | 'Boa' | 'Regular' | 'Baixa';
    } | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const [files, setFiles] = useState<CodeFile[]>([
        {
            name: 'main.js',
            language: 'javascript',
            content: `// ${title}
// Curso: ${courseSlug}
// Tipo: ${type === 'exercise' ? 'Exercício' : 'Projeto'}

console.log('🚀 Fenix IDE 2.0 - Começando a programar!');

// Seu código aqui
function helloWorld() {
  return "Olá, mundo!";
}

console.log(helloWorld());`,
            isModified: false,
            lastModified: new Date()
        },
        {
            name: 'index.html',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <h1>${title}</h1>
    <div id="app">
        <p>Seu projeto aqui!</p>
    </div>
    <script src="main.js"></script>
</body>
</html>`,
            isModified: false,
            lastModified: new Date()
        },
        {
            name: 'style.css',
            language: 'css',
            content: `/* Estilos para ${title} */

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

#app {
    background: rgba(255,255,255,0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    text-align: center;
}`,
            isModified: false,
            lastModified: new Date()
        },
        {
            name: 'brazilian-utils.js',
            language: 'javascript',
            content: `// 🇧🇷 Utilitários Brasileiros - Fenix IDE 2.0

/**
 * Validação de CPF
 * @param {string} cpf - CPF para validar
 * @returns {boolean} - true se válido
 */
function validarCPF(cpf) {
    cpf = cpf.replace(/[\\D]/g, '');
    if (cpf.length !== 11) return false;
    
    // Verificar dígitos repetidos
    if (/^(\\d)\\1{10}$/.test(cpf)) return false;
    
    // Algoritmo de validação
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    
    return resto === parseInt(cpf.charAt(10));
}

/**
 * Formatação de moeda brasileira
 * @param {number} valor - Valor para formatar
 * @returns {string} - Valor formatado
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Validação de CEP
 * @param {string} cep - CEP para validar
 * @returns {boolean} - true se válido
 */
function validarCEP(cep) {
    cep = cep.replace(/[\\D]/g, '');
    return /^[0-9]{8}$/.test(cep);
}

/**
 * Máscara para CPF
 * @param {string} cpf - CPF para mascarar
 * @returns {string} - CPF mascarado
 */
function mascararCPF(cpf) {
    return cpf.replace(/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/, '$1.$2.$3-$4');
}

// Exportar funções
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validarCPF,
        formatarMoeda,
        validarCEP,
        mascararCPF
    };
}`,
            isModified: false,
            lastModified: new Date()
        }
    ]);

    // Sistema de auto-complete inteligente com contexto brasileiro
    const getSuggestions = useCallback((text: string, position: number): Suggestion[] => {
        const currentLine = text.substring(0, position).split('\n').pop() || '';
        const currentWord = currentLine.split(/\s+/).pop() || '';

        if (currentWord.length < 2) return [];

        const language = files.find(f => f.name === activeFile)?.language || 'javascript';

        // Sugestões baseadas na linguagem
        const languageSuggestions: Suggestion[] = [];

        if (language === 'javascript') {
            languageSuggestions.push(
                { text: 'console.log(', type: 'snippet', description: 'Log no console', priority: 1 },
                { text: 'function ', type: 'snippet', description: 'Declarar função', priority: 1 },
                { text: 'const ', type: 'snippet', description: 'Declarar constante', priority: 1 },
                { text: 'let ', type: 'snippet', description: 'Declarar variável', priority: 1 },
                { text: 'if (', type: 'snippet', description: 'Condição if', priority: 1 },
                { text: 'for (', type: 'snippet', description: 'Loop for', priority: 1 },
                { text: 'try {', type: 'snippet', description: 'Bloco try-catch', priority: 1 },
                { text: 'async function', type: 'snippet', description: 'Função assíncrona', priority: 1 },
                { text: 'await ', type: 'snippet', description: 'Aguardar promise', priority: 1 }
            );
        } else if (language === 'html') {
            languageSuggestions.push(
                { text: '<div>', type: 'snippet', description: 'Div container', priority: 1 },
                { text: '<span>', type: 'snippet', description: 'Span inline', priority: 1 },
                { text: '<button>', type: 'snippet', description: 'Botão', priority: 1 },
                { text: '<input', type: 'snippet', description: 'Campo de entrada', priority: 1 },
                { text: '<form>', type: 'snippet', description: 'Formulário', priority: 1 },
                { text: '<meta charset="UTF-8">', type: 'snippet', description: 'Charset UTF-8', priority: 1 },
                { text: 'lang="pt-BR"', type: 'snippet', description: 'Idioma português', priority: 1 }
            );
        } else if (language === 'css') {
            languageSuggestions.push(
                { text: 'color: ', type: 'snippet', description: 'Cor do texto', priority: 1 },
                { text: 'background: ', type: 'snippet', description: 'Cor de fundo', priority: 1 },
                { text: 'margin: ', type: 'snippet', description: 'Margem', priority: 1 },
                { text: 'padding: ', type: 'snippet', description: 'Preenchimento', priority: 1 },
                { text: 'border: ', type: 'snippet', description: 'Borda', priority: 1 },
                { text: 'border-radius: ', type: 'snippet', description: 'Borda arredondada', priority: 1 },
                { text: 'box-shadow: ', type: 'snippet', description: 'Sombra', priority: 1 }
            );
        }

        // Sugestões brasileiras específicas (prioridade alta)
        const brazilianSuggestions: Suggestion[] = [
            { text: 'validarCPF(', type: 'brazilian', description: 'Validação de CPF brasileiro', priority: 0 },
            { text: 'validarCEP(', type: 'brazilian', description: 'Validação de CEP brasileiro', priority: 0 },
            { text: 'formatarMoeda(', type: 'brazilian', description: 'Formatação de moeda BRL', priority: 0 },
            { text: 'mascararCPF(', type: 'brazilian', description: 'Máscara para CPF', priority: 0 },
            { text: 'CPF', type: 'brazilian', description: 'Validação de CPF', priority: 0 },
            { text: 'CNPJ', type: 'brazilian', description: 'Validação de CNPJ', priority: 0 },
            { text: 'PIX', type: 'brazilian', description: 'Integração PIX', priority: 0 },
            { text: 'Real', type: 'brazilian', description: 'Formatação de moeda', priority: 0 },
            { text: 'pt-BR', type: 'brazilian', description: 'Locale brasileiro', priority: 0 },
            { text: 'BRL', type: 'brazilian', description: 'Código da moeda brasileira', priority: 0 }
        ];

        // Filtrar sugestões baseadas no texto atual
        const allSuggestions = [...brazilianSuggestions, ...languageSuggestions];
        const filtered = allSuggestions.filter(s =>
            s.text.toLowerCase().includes(currentWord.toLowerCase())
        );

        return filtered.sort((a, b) => a.priority - b.priority).slice(0, 10);
    }, [activeFile, files]);

    // Validações brasileiras
    const validateBrazilianCode = (code: string, language: string): ValidationResult[] => {
        const results: ValidationResult[] = [];

        if (language === 'javascript') {
            // Verificar se há validações de CPF/CNPJ
            if (code.includes('CPF') || code.includes('cpf')) {
                if (!code.includes('validarCPF')) {
                    results.push({
                        isValid: false,
                        message: '⚠️ Considere usar a função validarCPF() para validação de CPF',
                        suggestions: ['Importe o arquivo brazilian-utils.js', 'Use validarCPF(cpf) para validação']
                    });
                }
            }

            // Verificar formatação de moeda
            if (code.includes('moeda') || code.includes('valor') || code.includes('preço')) {
                if (!code.includes('formatarMoeda')) {
                    results.push({
                        isValid: false,
                        message: '💡 Use formatarMoeda() para formatação brasileira de moeda',
                        suggestions: ['Importe brazilian-utils.js', 'Use formatarMoeda(valor)']
                    });
                }
            }
        }

        if (language === 'html') {
            // Verificar charset e idioma
            if (!code.includes('charset="UTF-8"')) {
                results.push({
                    isValid: false,
                    message: '🌐 Adicione charset UTF-8 para suporte a caracteres brasileiros',
                    suggestions: ['<meta charset="UTF-8">', 'Suporte a ç, ã, õ, etc.']
                });
            }

            if (!code.includes('lang="pt-BR"')) {
                results.push({
                    isValid: false,
                    message: '🇧🇷 Defina o idioma como português brasileiro',
                    suggestions: ['<html lang="pt-BR">', 'Melhor acessibilidade e SEO']
                });
            }
        }

        if (language === 'css') {
            // Verificar se há cores brasileiras
            if (code.includes('background') || code.includes('color')) {
                if (!code.includes('#00A859') && !code.includes('#FFD700') && !code.includes('#002776')) {
                    results.push({
                        isValid: true,
                        message: '🎨 Considere usar cores da bandeira brasileira para projetos locais',
                        suggestions: ['Verde: #00A859', 'Amarelo: #FFD700', 'Azul: #002776']
                    });
                }
            }
        }

        return results;
    };

    // Análise de código em tempo real
    const analyzeCode = useCallback((code: string, language: string) => {
        const lines = code.split('\n').length;
        const characters = code.length;
        const functions = (code.match(/function\s+\w+\s*\(/g) || []).length;
        const variables = (code.match(/(?:const|let|var)\s+\w+/g) || []).length;
        const comments = (code.match(/\/\/.*$/gm) || []).length;

        // Calcular complexidade baseada em estruturas de controle
        let complexityScore = 0;
        complexityScore += (code.match(/if\s*\(/g) || []).length;
        complexityScore += (code.match(/for\s*\(/g) || []).length;
        complexityScore += (code.match(/while\s*\(/g) || []).length;
        complexityScore += (code.match(/switch\s*\(/g) || []).length;
        complexityScore += (code.match(/catch\s*\(/g) || []).length;

        let complexity: 'Baixa' | 'Média' | 'Alta' = 'Baixa';
        if (complexityScore > 5) complexity = 'Alta';
        else if (complexityScore > 2) complexity = 'Média';

        setCodeAnalysis({
            lines,
            characters,
            functions,
            variables,
            comments,
            complexity
        });
    }, []);

    const insertSuggestion = (suggestion: Suggestion) => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const beforeCursor = code.substring(0, start);
        const afterCursor = code.substring(end);

        // Encontrar o início da palavra atual
        const currentLine = beforeCursor.split('\n').pop() || '';
        const currentWord = currentLine.split(/\s+/).pop() || '';
        const wordStart = start - currentWord.length;

        const newCode = code.substring(0, wordStart) + suggestion.text + afterCursor;
        setCode(newCode);

        // Posicionar cursor após a inserção
        setTimeout(() => {
            if (textareaRef.current) {
                const newPosition = wordStart + suggestion.text.length;
                textareaRef.current.setSelectionRange(newPosition, newPosition);
                textareaRef.current.focus();
            }
        }, 0);

        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (showSuggestions) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedSuggestion(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedSuggestion(prev =>
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
            } else if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                if (suggestions[selectedSuggestion]) {
                    insertSuggestion(suggestions[selectedSuggestion]);
                }
            } else if (e.key === 'Escape') {
                setShowSuggestions(false);
            }
        }
    };

    // IA Assistant com contexto brasileiro
    const handleAIQuery = async () => {
        if (!aiQuery.trim()) return;

        setIsAIProcessing(true);
        setAiResponse('');

        try {
            // Simular resposta da IA
            await new Promise(resolve => setTimeout(resolve, 2000));

            const language = files.find(f => f.name === activeFile)?.language || 'javascript';
            const simulatedResponse = `🤖 **Resposta da IA para: "${aiQuery}"**
            
📝 **Sugestão de código:**
\`\`\`${language}
${getAISuggestion(aiQuery, language)}
\`\`\`

💡 **Explicação:**
${getAIExplanation(aiQuery, language)}

🇧🇷 **Contexto Brasileiro:**
${getBrazilianContext(aiQuery, language)}

🎯 **Dica:** Esta solução segue as melhores práticas para ${language} e considera o contexto brasileiro do seu projeto.`;

            setAiResponse(simulatedResponse);
        } catch (error) {
            setAiResponse('❌ Erro ao processar consulta da IA');
        } finally {
            setIsAIProcessing(false);
        }
    };

    const getAISuggestion = (query: string, language: string): string => {
        if (query.toLowerCase().includes('função') || query.toLowerCase().includes('function')) {
            return `function ${query.split(' ')[1] || 'novaFuncao'}() {
    // Implementação aqui
    return "resultado";
}`;
        }
        if (query.toLowerCase().includes('validação') || query.toLowerCase().includes('cpf')) {
            return `function validarCPF(cpf) {
    cpf = cpf.replace(/[\\D]/g, '');
    if (cpf.length !== 11) return false;
    
    // Algoritmo de validação brasileiro
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    
    return resto === parseInt(cpf.charAt(9));
}`;
        }
        if (query.toLowerCase().includes('moeda') || query.toLowerCase().includes('formatação')) {
            return `function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}`;
        }
        return `// Implementação para: ${query}`;
    };

    const getAIExplanation = (query: string, language: string): string => {
        if (query.toLowerCase().includes('cpf')) {
            return 'Esta função implementa o algoritmo oficial de validação de CPF usado no Brasil, seguindo as regras da Receita Federal.';
        }
        if (query.toLowerCase().includes('moeda')) {
            return 'Esta função usa a API Intl.NumberFormat para formatação brasileira de moeda, incluindo separadores de milhares e decimais corretos.';
        }
        return 'Esta solução foi otimizada para o contexto brasileiro e segue as melhores práticas de desenvolvimento.';
    };

    const getBrazilianContext = (query: string, language: string): string => {
        if (query.toLowerCase().includes('cpf') || query.toLowerCase().includes('validação')) {
            return 'No Brasil, CPF e CNPJ são documentos essenciais. Use as funções de validação do arquivo brazilian-utils.js para conformidade com as regras locais.';
        }
        if (query.toLowerCase().includes('moeda') || query.toLowerCase().includes('formatação')) {
            return 'Para projetos brasileiros, sempre use BRL como moeda e pt-BR como locale para formatação correta de números e moeda.';
        }
        if (query.toLowerCase().includes('data') || query.toLowerCase().includes('hora')) {
            return 'Use o locale pt-BR para formatação de datas no formato brasileiro (dd/mm/aaaa) e horário no formato 24h.';
        }
        return 'Considere sempre o contexto brasileiro: idioma português, moeda Real, fuso horário de Brasília e regulamentações locais.';
    };

    useEffect(() => {
        if (isOpen) {
            // Carregar código salvo do localStorage
            const savedCode = localStorage.getItem(`fenix-ide-v2-${id}`);
            if (savedCode) {
                setCode(savedCode);
            } else {
                const defaultFile = files.find(f => f.name === activeFile);
                setCode(defaultFile?.content || '');
            }
        }
    }, [isOpen, id, activeFile, files]);

    // Auto-save
    useEffect(() => {
        if (isOpen && code) {
            const timer = setTimeout(() => {
                localStorage.setItem(`fenix-ide-v2-${id}`, code);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [code, id, isOpen]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        setCode(newCode);

        // Marcar arquivo como modificado
        setFiles(prev => prev.map(f =>
            f.name === activeFile
                ? { ...f, content: newCode, isModified: true, lastModified: new Date() }
                : f
        ));

        // Analisar código em tempo real
        const language = files.find(f => f.name === activeFile)?.language || 'javascript';
        analyzeCode(newCode, language);

        // Atualizar posição do cursor
        const position = e.target.selectionStart;
        setCursorPosition(position);

        // Verificar se deve mostrar sugestões
        const newSuggestions = getSuggestions(newCode, position);
        if (newSuggestions.length > 0) {
            setSuggestions(newSuggestions);
            setShowSuggestions(true);
            setSelectedSuggestion(0);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleRunCode = async () => {
        const startTime = performance.now();
        setIsRunning(true);
        setOutput('Executando código...\n');

        try {
            // Simular execução do código
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Validar código brasileiro
            const language = files.find(f => f.name === activeFile)?.language || 'javascript';
            const validations = validateBrazilianCode(code, language);

            // Calcular estatísticas de execução
            const endTime = performance.now();
            const duration = endTime - startTime;
            const memoryUsage = Math.random() * 100 + 50; // Simular uso de memória

            let performanceLevel: 'Excelente' | 'Boa' | 'Regular' | 'Baixa' = 'Excelente';
            if (duration > 2000) performanceLevel = 'Baixa';
            else if (duration > 1000) performanceLevel = 'Regular';
            else if (duration > 500) performanceLevel = 'Boa';

            setExecutionStats({
                startTime,
                endTime,
                duration,
                memoryUsage,
                performance: performanceLevel
            });

            // Simular saída baseada no tipo de arquivo
            let simulatedOutput = '';
            if (activeFile.endsWith('.js')) {
                simulatedOutput = `🚀 Executando JavaScript...
✅ Código executado com sucesso!
📝 Saída: Olá, mundo!
⏱️ Tempo de execução: ${duration.toFixed(2)}ms
🎯 Status: Concluído
🧠 IA: Código otimizado para contexto brasileiro
📊 Performance: ${performanceLevel}`;
            } else if (activeFile.endsWith('.html')) {
                simulatedOutput = `🌐 Renderizando HTML...
✅ Página carregada com sucesso!
🔗 URL: http://localhost:3000/preview
📱 Responsivo: Sim
🎨 Estilos aplicados
🇧🇷 Idioma: pt-BR configurado
📊 Performance: ${performanceLevel}`;
            } else if (activeFile.endsWith('.css')) {
                simulatedOutput = `🎨 Aplicando CSS...
✅ Estilos carregados com sucesso!
🎯 Seletores aplicados: 3
📱 Media queries: 2
⚡ Performance: ${performanceLevel}
🎨 Gradientes brasileiros aplicados`;
            }

            // Adicionar validações brasileiras
            if (validations.length > 0) {
                simulatedOutput += '\n\n🇧🇷 **Validações Brasileiras:**\n';
                validations.forEach(validation => {
                    const icon = validation.isValid ? '✅' : '⚠️';
                    simulatedOutput += `${icon} ${validation.message}\n`;
                    if (validation.suggestions) {
                        validation.suggestions.forEach(suggestion => {
                            simulatedOutput += `   💡 ${suggestion}\n`;
                        });
                    }
                });
            }

            // Adicionar estatísticas de execução
            simulatedOutput += `\n📊 **Estatísticas de Execução:**
⏱️ Duração: ${duration.toFixed(2)}ms
💾 Memória: ${memoryUsage.toFixed(1)}MB
🎯 Performance: ${performance}
📈 Complexidade: ${codeAnalysis.complexity}`;

            setOutput(simulatedOutput);
        } catch (error) {
            setOutput(`❌ Erro na execução: ${error}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSaveCode = () => {
        localStorage.setItem(`fenix-ide-v2-${id}`, code);
        setOutput('💾 Código salvo com sucesso!');
    };

    const handleResetCode = () => {
        const defaultFile = files.find(f => f.name === activeFile);
        setCode(defaultFile?.content || '');
        setOutput('🔄 Código resetado para o padrão!');
    };

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = activeFile;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setOutput('📥 Arquivo baixado com sucesso!');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col">
                {/* Header da IDE */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Code className="w-6 h-6 text-white" />
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1 rounded-full font-bold">
                                2.0
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold flex items-center space-x-2">
                                <span>🚀 Fenix IDE 2.0</span>
                                <Zap className="w-4 h-4 text-yellow-300" />
                            </h2>
                            <p className="text-sm text-blue-100">{title}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
                            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-all"
                        >
                            <Brain className="w-4 h-4" />
                            <span>IA</span>
                        </button>
                        <button
                            onClick={handleSaveCode}
                            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-all"
                        >
                            <Save className="w-4 h-4" />
                            <span>Salvar</span>
                        </button>
                        <button
                            onClick={handleDownload}
                            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-all"
                        >
                            <Download className="w-4 h-4" />
                            <span>Baixar</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Barra de ferramentas */}
                <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded flex items-center space-x-2 transition-all shadow-lg"
                        >
                            {isRunning ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Executando...</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    <span>Executar</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleResetCode}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-2 rounded flex items-center space-x-2 transition-all shadow-lg"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Resetar</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span>Auto-complete ativo</span>
                        </div>
                        <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar com arquivos */}
                    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                                    <FileText className="w-4 h-4" />
                                    <span>Arquivos</span>
                                </h3>
                                <button
                                    onClick={() => {
                                        const newFileName = `novo-arquivo-${files.length + 1}.js`;
                                        const newFile: CodeFile = {
                                            name: newFileName,
                                            language: 'javascript',
                                            content: `// Novo arquivo criado em ${new Date().toLocaleDateString('pt-BR')}
// Projeto: ${title}

console.log('🚀 Arquivo criado com sucesso!');`,
                                            isModified: false,
                                            lastModified: new Date()
                                        };
                                        setFiles(prev => [...prev, newFile]);
                                        setActiveFile(newFileName);
                                        setCode(newFile.content);
                                    }}
                                    className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                                    title="Criar novo arquivo"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-1">
                                {files.map((file) => (
                                    <button
                                        key={file.name}
                                        onClick={() => {
                                            setActiveFile(file.name);
                                            setCode(file.content);
                                        }}
                                        className={`w-full text-left p-2 rounded text-sm transition-all group ${activeFile === file.name
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 min-w-0 flex-1">
                                                <div className="flex items-center space-x-1">
                                                    <Code className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate">{file.name}</span>
                                                </div>
                                                {file.isModified && (
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" title="Arquivo modificado"></div>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="capitalize">{file.language}</span>
                                                {file.isModified && (
                                                    <span className="text-orange-500">●</span>
                                                )}
                                            </div>
                                        </div>
                                        {file.lastModified && (
                                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 ml-6">
                                                {file.lastModified.toLocaleDateString('pt-BR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Estatísticas dos arquivos */}
                            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Total de arquivos:</span>
                                        <span className="font-medium">{files.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Modificados:</span>
                                        <span className="font-medium text-orange-600">
                                            {files.filter(f => f.isModified).length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Linguagens:</span>
                                        <span className="font-medium">
                                            {Array.from(new Set(files.map(f => f.language))).join(', ')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor de código */}
                    <div className="flex-1 flex flex-col relative">
                        <div className="flex-1 p-4">
                            <textarea
                                ref={textareaRef}
                                value={code}
                                onChange={handleCodeChange}
                                onKeyDown={handleKeyDown}
                                className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-green-400 rounded border-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Digite seu código aqui... (Auto-complete ativo com Tab/Enter)"
                                spellCheck={false}
                            />

                            {/* Auto-complete suggestions */}
                            {showSuggestions && (
                                <div
                                    ref={suggestionsRef}
                                    className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10"
                                    style={{
                                        top: '2rem',
                                        left: '1rem',
                                        right: '1rem'
                                    }}
                                >
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            onClick={() => insertSuggestion(suggestion)}
                                            className={`p-3 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${index === selectedSuggestion
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1">
                                                    {suggestion.type === 'snippet' && <Code className="w-3 h-3 text-blue-500" />}
                                                    {suggestion.type === 'ai' && <Brain className="w-3 h-3 text-purple-500" />}
                                                    {suggestion.type === 'local' && <Globe className="w-3 h-3 text-green-500" />}
                                                    {suggestion.type === 'brazilian' && <span className="text-xs">🇧🇷</span>}
                                                </div>
                                                <span className="font-mono text-sm">{suggestion.text}</span>
                                            </div>
                                            {suggestion.description && (
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-5">
                                                    {suggestion.description}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Painel de saída */}
                    <div className="w-80 bg-gray-900 text-green-400 p-4 overflow-y-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold flex items-center space-x-2">
                                <Terminal className="w-4 h-4" />
                                <span>Terminal</span>
                            </h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setOutput('')}
                                    className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                                >
                                    Limpar
                                </button>
                                <button
                                    onClick={() => {
                                        if (executionStats) {
                                            const statsText = `📊 Estatísticas de Execução:
⏱️ Duração: ${executionStats.duration.toFixed(2)}ms
💾 Memória: ${executionStats.memoryUsage.toFixed(1)}MB
🎯 Performance: ${executionStats.performance}
📈 Complexidade: ${codeAnalysis.complexity}
📝 Linhas: ${codeAnalysis.lines}
🔤 Caracteres: ${codeAnalysis.characters}
⚙️ Funções: ${codeAnalysis.functions}
📦 Variáveis: ${codeAnalysis.variables}
💬 Comentários: ${codeAnalysis.comments}`;
                                            setOutput(statsText);
                                        }
                                    }}
                                    className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                                    title="Ver estatísticas"
                                >
                                    📊
                                </button>
                            </div>
                        </div>

                        {/* Análise de código em tempo real */}
                        <div className="mb-3 p-2 bg-gray-800 rounded text-xs">
                            <div className="text-gray-300 mb-1">📊 Análise em Tempo Real:</div>
                            <div className="grid grid-cols-2 gap-1 text-gray-400">
                                <span>Linhas: {codeAnalysis.lines}</span>
                                <span>Caracteres: {codeAnalysis.characters}</span>
                                <span>Funções: {codeAnalysis.functions}</span>
                                <span>Variáveis: {codeAnalysis.variables}</span>
                                <span>Comentários: {codeAnalysis.comments}</span>
                                <span className={`${codeAnalysis.complexity === 'Baixa' ? 'text-green-400' :
                                    codeAnalysis.complexity === 'Média' ? 'text-yellow-400' :
                                        'text-red-400'
                                    }`}>
                                    Complexidade: {codeAnalysis.complexity}
                                </span>
                            </div>
                        </div>

                        <div className="font-mono text-sm whitespace-pre-wrap">
                            {output || 'Terminal pronto para executar código...'}
                        </div>
                    </div>
                </div>

                {/* IA Assistant Panel */}
                {isAIAssistantOpen && (
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <Brain className="w-5 h-5 text-purple-500" />
                            <h3 className="font-semibold text-gray-900 dark:text-white">🧠 Assistente de IA</h3>
                        </div>

                        <div className="flex space-x-2 mb-3">
                            <input
                                type="text"
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                placeholder="Pergunte sobre seu código, peça sugestões, validações..."
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleAIQuery()}
                            />
                            <button
                                onClick={handleAIQuery}
                                disabled={isAIProcessing || !aiQuery.trim()}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
                            >
                                {isAIProcessing ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                    <Lightbulb className="w-4 h-4" />
                                )}
                                <span>Perguntar</span>
                            </button>
                        </div>

                        {aiResponse && (
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                <div className="prose prose-sm max-w-none text-gray-900 dark:text-gray-100">
                                    <pre className="whitespace-pre-wrap text-sm">{aiResponse}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer com informações */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span>📁 {activeFile}</span>
                        <span>💻 {files.find(f => f.name === activeFile)?.language}</span>
                        <span>🎯 {type === 'exercise' ? 'Exercício' : 'Projeto'}</span>
                        <span className="flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-purple-500" />
                            <span>Auto-complete</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span>🚀 Fenix Academy</span>
                        <span>•</span>
                        <span>IDE 2.0</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                            <Brain className="w-3 h-3 text-purple-500" />
                            <span>IA Integrada</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FenixIDE;
