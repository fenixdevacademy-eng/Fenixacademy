'use client';

import { LanguageProvider, CodeContext, CodeSuggestion } from '../CodeSuggestionEngine';

export class JavaScriptProvider implements LanguageProvider {
    language = 'javascript';
    extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs'];

    // Analisar contexto específico do JavaScript
    analyzeContext(context: CodeContext): CodeSuggestion[] {
        const suggestions: CodeSuggestion[] = [];

        // Analisar padrões específicos do JS/TS
        if (context.currentLine.includes('async')) {
            suggestions.push({
                id: 'async-pattern',
                code: 'await',
                explanation: 'Usar await para operações assíncronas',
                confidence: 0.9,
                category: 'best-practice',
                language: this.language,
                tags: ['async', 'await', 'promise'],
                usage: 95,
                lastUsed: Date.now(),
                complexity: 'medium'
            });
        }

        if (context.currentLine.includes('const') || context.currentLine.includes('let')) {
            suggestions.push({
                id: 'destructuring',
                code: 'const { prop1, prop2 } = object;',
                explanation: 'Destructuring para extrair propriedades',
                confidence: 0.8,
                category: 'snippet',
                language: this.language,
                tags: ['destructuring', 'es6'],
                usage: 85,
                lastUsed: Date.now(),
                complexity: 'medium'
            });
        }

        return suggestions;
    }

    // Gerar sugestões baseadas no contexto
    generateSuggestions(context: CodeContext): CodeSuggestion[] {
        const suggestions: CodeSuggestion[] = [];

        // Sugestões baseadas no escopo
        switch (context.scope) {
            case 'function':
                suggestions.push(...this.getFunctionSuggestions(context));
                break;
            case 'class':
                suggestions.push(...this.getClassSuggestions(context));
                break;
            case 'loop':
                suggestions.push(...this.getLoopSuggestions(context));
                break;
            case 'conditional':
                suggestions.push(...this.getConditionalSuggestions(context));
                break;
            default:
                suggestions.push(...this.getGlobalSuggestions(context));
        }

        // Sugestões baseadas na intenção
        switch (context.intent) {
            case 'function':
                suggestions.push(...this.getFunctionCreationSuggestions(context));
                break;
            case 'loop':
                suggestions.push(...this.getLoopCreationSuggestions(context));
                break;
            case 'condition':
                suggestions.push(...this.getConditionalCreationSuggestions(context));
                break;
            case 'variable':
                suggestions.push(...this.getVariableSuggestions(context));
                break;
        }

        return suggestions;
    }

    // Obter boas práticas
    getBestPractices(context: CodeContext): CodeSuggestion[] {
        const practices: CodeSuggestion[] = [];

        // Verificar se está usando var (não recomendado)
        if (context.fileContent.includes('var ')) {
            practices.push({
                id: 'no-var',
                code: '// Use const ou let em vez de var',
                explanation: 'var tem escopo de função, const/let têm escopo de bloco',
                confidence: 0.95,
                category: 'best-practice',
                language: this.language,
                tags: ['es6', 'scope', 'best-practice'],
                usage: 100,
                lastUsed: Date.now(),
                complexity: 'simple'
            });
        }

        // Verificar se está usando == em vez de ===
        if (context.fileContent.includes(' == ')) {
            practices.push({
                id: 'strict-equality',
                code: '// Use === para comparação estrita',
                explanation: '=== verifica valor e tipo, == só verifica valor',
                confidence: 0.9,
                category: 'best-practice',
                language: this.language,
                tags: ['equality', 'comparison', 'best-practice'],
                usage: 98,
                lastUsed: Date.now(),
                complexity: 'simple'
            });
        }

        // Verificar se está usando console.log em produção
        if (context.fileContent.includes('console.log') && context.fileContent.length > 1000) {
            practices.push({
                id: 'remove-console',
                code: '// Remover console.log em produção',
                explanation: 'console.log pode vazar informações e impactar performance',
                confidence: 0.85,
                category: 'best-practice',
                language: this.language,
                tags: ['logging', 'production', 'security'],
                usage: 90,
                lastUsed: Date.now(),
                complexity: 'simple'
            });
        }

        return practices;
    }

    // Sugestões para funções
    private getFunctionSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'function-return',
                code: 'return result;',
                explanation: 'Retornar valor da função',
                confidence: 0.8,
                category: 'snippet',
                language: this.language,
                tags: ['function', 'return'],
                usage: 90,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'function-early-return',
                code: 'if (!condition) return;',
                explanation: 'Early return para validação',
                confidence: 0.85,
                category: 'best-practice',
                language: this.language,
                tags: ['function', 'early-return', 'validation'],
                usage: 85,
                lastUsed: Date.now(),
                complexity: 'medium'
            }
        ];
    }

    // Sugestões para classes
    private getClassSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'class-constructor',
                code: 'constructor(params) {\n\tthis.property = params;\n}',
                explanation: 'Constructor para inicializar propriedades',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['class', 'constructor'],
                usage: 95,
                lastUsed: Date.now(),
                complexity: 'medium'
            },
            {
                id: 'class-method',
                code: 'methodName() {\n\t// implementação\n}',
                explanation: 'Método de classe',
                confidence: 0.85,
                category: 'snippet',
                language: this.language,
                tags: ['class', 'method'],
                usage: 90,
                lastUsed: Date.now(),
                complexity: 'medium'
            }
        ];
    }

    // Sugestões para loops
    private getLoopSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'loop-break',
                code: 'if (condition) break;',
                explanation: 'Sair do loop quando condição for verdadeira',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['loop', 'break', 'control-flow'],
                usage: 90,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'loop-continue',
                code: 'if (condition) continue;',
                explanation: 'Pular para próxima iteração do loop',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['loop', 'continue', 'control-flow'],
                usage: 85,
                lastUsed: Date.now(),
                complexity: 'simple'
            }
        ];
    }

    // Sugestões para condicionais
    private getConditionalSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'conditional-ternary',
                code: 'const result = condition ? value1 : value2;',
                explanation: 'Operador ternário para atribuição condicional',
                confidence: 0.85,
                category: 'snippet',
                language: this.language,
                tags: ['conditional', 'ternary', 'assignment'],
                usage: 85,
                lastUsed: Date.now(),
                complexity: 'medium'
            },
            {
                id: 'conditional-nullish',
                code: 'const result = value ?? defaultValue;',
                explanation: 'Operador nullish coalescing para valor padrão',
                confidence: 0.8,
                category: 'snippet',
                language: this.language,
                tags: ['conditional', 'nullish', 'default-value'],
                usage: 80,
                lastUsed: Date.now(),
                complexity: 'medium'
            }
        ];
    }

    // Sugestões globais
    private getGlobalSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'global-template-literal',
                code: 'const message = `Hello ${name}!`;',
                explanation: 'Template literal para strings dinâmicas',
                confidence: 0.95,
                category: 'snippet',
                language: this.language,
                tags: ['template-literal', 'string', 'es6'],
                usage: 95,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'global-arrow-function',
                code: 'const func = (param) => {\n\t// código\n};',
                explanation: 'Arrow function para funções concisas',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['arrow-function', 'es6', 'function'],
                usage: 90,
                lastUsed: Date.now(),
                complexity: 'medium'
            }
        ];
    }

    // Sugestões para criação de funções
    private getFunctionCreationSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'function-traditional',
                code: 'function functionName(params) {\n\t// implementação\n\treturn result;\n}',
                explanation: 'Função tradicional com return',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['function', 'traditional', 'return'],
                usage: 95,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'function-arrow',
                code: 'const functionName = (params) => {\n\t// implementação\n\treturn result;\n};',
                explanation: 'Arrow function com return',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['arrow-function', 'es6', 'return'],
                usage: 90,
                lastUsed: Date.now(),
                complexity: 'medium'
            },
            {
                id: 'function-async',
                code: 'async function functionName(params) {\n\ttry {\n\t\tconst result = await asyncOperation();\n\t\treturn result;\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}',
                explanation: 'Função assíncrona com tratamento de erro',
                confidence: 0.85,
                category: 'snippet',
                language: this.language,
                tags: ['async', 'function', 'error-handling', 'try-catch'],
                usage: 80,
                lastUsed: Date.now(),
                complexity: 'advanced'
            }
        ];
    }

    // Sugestões para criação de loops
    private getLoopCreationSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'loop-for',
                code: 'for (let i = 0; i < array.length; i++) {\n\t// código\n}',
                explanation: 'Loop for tradicional',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['loop', 'for', 'traditional'],
                usage: 95,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'loop-forof',
                code: 'for (const item of array) {\n\t// código\n}',
                explanation: 'Loop for...of para iterar sobre valores',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['loop', 'for-of', 'es6'],
                usage: 90,
                lastUsed: Date.now(),
                complexity: 'medium'
            },
            {
                id: 'loop-foreach',
                code: 'array.forEach((item, index) => {\n\t// código\n});',
                explanation: 'Método forEach para arrays',
                confidence: 0.85,
                category: 'snippet',
                language: this.language,
                tags: ['loop', 'forEach', 'array-method'],
                usage: 85,
                lastUsed: Date.now(),
                complexity: 'medium'
            }
        ];
    }

    // Sugestões para criação de condicionais
    private getConditionalCreationSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'conditional-if',
                code: 'if (condition) {\n\t// código\n}',
                explanation: 'Estrutura if básica',
                confidence: 0.95,
                category: 'snippet',
                language: this.language,
                tags: ['conditional', 'if'],
                usage: 100,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'conditional-ifelse',
                code: 'if (condition) {\n\t// código\n} else {\n\t// código alternativo\n}',
                explanation: 'Estrutura if-else',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['conditional', 'if-else'],
                usage: 95,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'conditional-switch',
                code: 'switch (value) {\n\tcase option1:\n\t\t// código\n\t\tbreak;\n\tcase option2:\n\t\t// código\n\t\tbreak;\n\tdefault:\n\t\t// código padrão\n}',
                explanation: 'Estrutura switch para múltiplas opções',
                confidence: 0.85,
                category: 'snippet',
                language: this.language,
                tags: ['conditional', 'switch', 'multiple-options'],
                usage: 80,
                lastUsed: Date.now(),
                complexity: 'medium'
            }
        ];
    }

    // Sugestões para variáveis
    private getVariableSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'variable-const',
                code: 'const variableName = value;',
                explanation: 'Constante que não pode ser reatribuída',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['variable', 'const', 'es6'],
                usage: 95,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'variable-let',
                code: 'let variableName = value;',
                explanation: 'Variável que pode ser reatribuída',
                confidence: 0.9,
                category: 'snippet',
                language: this.language,
                tags: ['variable', 'let', 'es6'],
                usage: 90,
                lastUsed: Date.now(),
                complexity: 'simple'
            },
            {
                id: 'variable-destructuring',
                code: 'const { prop1, prop2 } = object;',
                explanation: 'Destructuring para extrair propriedades',
                confidence: 0.85,
                category: 'snippet',
                language: this.language,
                tags: ['variable', 'destructuring', 'es6'],
                usage: 85,
                lastUsed: Date.now(),
                complexity: 'medium'
            }
        ];
    }
}

export default JavaScriptProvider;
