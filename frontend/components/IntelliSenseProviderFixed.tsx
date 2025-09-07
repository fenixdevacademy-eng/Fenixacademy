'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface IntelliSenseSuggestion {
    label: string;
    kind: 'keyword' | 'function' | 'variable' | 'class' | 'interface' | 'property' | 'method' | 'snippet' | 'module';
    detail?: string;
    documentation?: string;
    insertText: string;
    insertTextRules?: 'InsertAsSnippet' | 'InsertAsText';
    sortText?: string;
    filterText?: string;
    range?: {
        startLineNumber: number;
        endLineNumber: number;
        startColumn: number;
        endColumn: number;
    };
}

interface IntelliSenseContextType {
    getSuggestions: (model: any, position: any, language: string) => IntelliSenseSuggestion[];
    getSnippets: (language: string) => IntelliSenseSuggestion[];
    getHoverInfo: (model: any, position: any, language: string) => string | null;
    getSignatureHelp: (model: any, position: any, language: string) => any;
    getCompletions: (model: any, position: any, language: string) => IntelliSenseSuggestion[];
}

const IntelliSenseContext = createContext<IntelliSenseContextType | null>(null);

export const useIntelliSense = () => {
    const context = useContext(IntelliSenseContext);
    if (!context) {
        throw new Error('useIntelliSense must be used within IntelliSenseProvider');
    }
    return context;
};

// Base de conhecimento expandida
const languageKnowledge = {
    javascript: {
        keywords: [
            'const', 'let', 'var', 'function', 'class', 'extends', 'implements',
            'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default',
            'try', 'catch', 'finally', 'throw', 'return', 'break', 'continue',
            'import', 'export', 'from', 'as', 'async', 'await', 'new', 'this',
            'super', 'static', 'public', 'private', 'protected', 'abstract',
            'interface', 'type', 'enum', 'namespace', 'module', 'declare'
        ],
        builtins: [
            'console', 'window', 'document', 'navigator', 'location', 'history',
            'localStorage', 'sessionStorage', 'setTimeout', 'setInterval',
            'clearTimeout', 'clearInterval', 'fetch', 'Promise', 'Array',
            'Object', 'String', 'Number', 'Boolean', 'Date', 'Math', 'JSON'
        ],
        methods: {
            'Array': ['push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'map', 'filter', 'reduce', 'forEach', 'find', 'findIndex', 'includes', 'indexOf', 'sort', 'reverse'],
            'String': ['charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'replace', 'search', 'slice', 'split', 'substring', 'toLowerCase', 'toUpperCase', 'trim'],
            'Object': ['keys', 'values', 'entries', 'assign', 'create', 'defineProperty', 'freeze', 'seal', 'isFrozen', 'isSealed'],
            'console': ['log', 'error', 'warn', 'info', 'debug', 'table', 'time', 'timeEnd', 'trace', 'assert'],
            'Promise': ['resolve', 'reject', 'all', 'race', 'then', 'catch', 'finally']
        }
    },
    typescript: {
        keywords: [
            'const', 'let', 'var', 'function', 'class', 'extends', 'implements',
            'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default',
            'try', 'catch', 'finally', 'throw', 'return', 'break', 'continue',
            'import', 'export', 'from', 'as', 'async', 'await', 'new', 'this',
            'super', 'static', 'public', 'private', 'protected', 'abstract',
            'interface', 'type', 'enum', 'namespace', 'module', 'declare',
            'readonly', 'optional', 'never', 'unknown', 'any', 'void', 'null', 'undefined'
        ],
        builtins: [
            'console', 'window', 'document', 'navigator', 'location', 'history',
            'localStorage', 'sessionStorage', 'setTimeout', 'setInterval',
            'clearTimeout', 'clearInterval', 'fetch', 'Promise', 'Array',
            'Object', 'String', 'Number', 'Boolean', 'Date', 'Math', 'JSON'
        ],
        methods: {
            'Array': ['push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'map', 'filter', 'reduce', 'forEach', 'find', 'findIndex', 'includes', 'indexOf', 'sort', 'reverse'],
            'String': ['charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'replace', 'search', 'slice', 'split', 'substring', 'toLowerCase', 'toUpperCase', 'trim'],
            'Object': ['keys', 'values', 'entries', 'assign', 'create', 'defineProperty', 'freeze', 'seal', 'isFrozen', 'isSealed'],
            'console': ['log', 'error', 'warn', 'info', 'debug', 'table', 'time', 'timeEnd', 'trace', 'assert'],
            'Promise': ['resolve', 'reject', 'all', 'race', 'then', 'catch', 'finally']
        }
    },
    html: {
        tags: [
            'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
            'form', 'input', 'button', 'textarea', 'select', 'option',
            'header', 'footer', 'nav', 'main', 'section', 'article', 'aside',
            'br', 'hr', 'strong', 'em', 'b', 'i', 'u', 's', 'mark', 'small',
            'sub', 'sup', 'del', 'ins', 'code', 'pre', 'blockquote', 'q',
            'cite', 'abbr', 'address', 'time', 'data', 'meter', 'progress',
            'details', 'summary', 'dialog', 'menu', 'menuitem'
        ],
        attributes: [
            'id', 'class', 'style', 'title', 'lang', 'dir', 'hidden',
            'tabindex', 'accesskey', 'contenteditable', 'spellcheck',
            'draggable', 'dropzone', 'contextmenu', 'data-*'
        ]
    },
    css: {
        properties: [
            'color', 'background-color', 'background-image', 'background-position',
            'background-size', 'background-repeat', 'background-attachment',
            'font-family', 'font-size', 'font-weight', 'font-style', 'font-variant',
            'text-align', 'text-decoration', 'text-transform', 'text-shadow',
            'line-height', 'letter-spacing', 'word-spacing', 'white-space',
            'width', 'height', 'max-width', 'max-height', 'min-width', 'min-height',
            'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'border', 'border-width', 'border-style', 'border-color',
            'border-radius', 'box-shadow', 'outline', 'outline-width',
            'display', 'position', 'top', 'right', 'bottom', 'left', 'z-index',
            'float', 'clear', 'overflow', 'overflow-x', 'overflow-y',
            'flex', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items',
            'grid', 'grid-template-columns', 'grid-template-rows', 'grid-gap',
            'transition', 'animation', 'transform', 'opacity', 'visibility'
        ],
        values: {
            'display': ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
            'position': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
            'text-align': ['left', 'right', 'center', 'justify'],
            'font-weight': ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        }
    }
};

// Snippets expandidos
const codeSnippets = {
    javascript: [
        {
            label: 'function',
            insertText: 'function $1($2) {\n\t$3\n\treturn $4;\n}',
            detail: 'Function Declaration',
            documentation: 'Creates a new function with parameters and return value'
        },
        {
            label: 'arrow',
            insertText: 'const $1 = ($2) => {\n\t$3\n\treturn $4;\n};',
            detail: 'Arrow Function',
            documentation: 'Creates an arrow function expression'
        },
        {
            label: 'async',
            insertText: 'async function $1($2) {\n\ttry {\n\t\t$3\n\t\treturn $4;\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}',
            detail: 'Async Function',
            documentation: 'Creates an async function with error handling'
        },
        {
            label: 'class',
            insertText: 'class $1 {\n\tconstructor($2) {\n\t\t$3\n\t}\n\n\t$4() {\n\t\t$5\n\t}\n}',
            detail: 'Class Declaration',
            documentation: 'Creates a new class with constructor and methods'
        },
        {
            label: 'if',
            insertText: 'if ($1) {\n\t$2\n}',
            detail: 'If Statement',
            documentation: 'Creates a conditional statement'
        },
        {
            label: 'for',
            insertText: 'for (let $1 = 0; $1 < $2.length; $1++) {\n\t$3\n}',
            detail: 'For Loop',
            documentation: 'Creates a for loop'
        },
        {
            label: 'foreach',
            insertText: '$1.forEach(($2) => {\n\t$3\n});',
            detail: 'ForEach Loop',
            documentation: 'Iterates over array elements'
        },
        {
            label: 'map',
            insertText: '$1.map(($2) => {\n\treturn $3;\n})',
            detail: 'Array Map',
            documentation: 'Transforms array elements'
        },
        {
            label: 'filter',
            insertText: '$1.filter(($2) => {\n\treturn $3;\n})',
            detail: 'Array Filter',
            documentation: 'Filters array elements'
        },
        {
            label: 'reduce',
            insertText: '$1.reduce(($2, $3) => {\n\treturn $4;\n}, $5)',
            detail: 'Array Reduce',
            documentation: 'Reduces array to a single value'
        },
        {
            label: 'try',
            insertText: 'try {\n\t$1\n} catch (error) {\n\tconsole.error(error);\n}',
            detail: 'Try-Catch Block',
            documentation: 'Handles errors with try-catch'
        },
        {
            label: 'promise',
            insertText: 'new Promise((resolve, reject) => {\n\t$1\n})',
            detail: 'Promise Constructor',
            documentation: 'Creates a new Promise'
        },
        {
            label: 'fetch',
            insertText: 'fetch($1)\n\t.then(response => response.json())\n\t.then(data => {\n\t\t$2\n\t})\n\t.catch(error => {\n\t\tconsole.error(error);\n\t});',
            detail: 'Fetch API',
            documentation: 'Makes HTTP request with fetch'
        },
        {
            label: 'console',
            insertText: 'console.log($1);',
            detail: 'Console Log',
            documentation: 'Logs to console'
        },
        {
            label: 'setTimeout',
            insertText: 'setTimeout(() => {\n\t$1\n}, $2);',
            detail: 'Set Timeout',
            documentation: 'Executes code after delay'
        },
        {
            label: 'setInterval',
            insertText: 'setInterval(() => {\n\t$1\n}, $2);',
            detail: 'Set Interval',
            documentation: 'Repeats code at intervals'
        }
    ],
    python: [
        {
            label: 'def',
            insertText: 'def $1($2):\n\t$3\n\treturn $4',
            detail: 'Function Definition',
            documentation: 'Creates a new function'
        },
        {
            label: 'class',
            insertText: 'class $1:\n\tdef __init__(self, $2):\n\t\tself.$3 = $4\n\n\tdef $5(self):\n\t\t$6',
            detail: 'Class Definition',
            documentation: 'Creates a new class'
        },
        {
            label: 'if',
            insertText: 'if $1:\n\t$2',
            detail: 'If Statement',
            documentation: 'Creates a conditional statement'
        },
        {
            label: 'for',
            insertText: 'for $1 in $2:\n\t$3',
            detail: 'For Loop',
            documentation: 'Creates a for loop'
        },
        {
            label: 'while',
            insertText: 'while $1:\n\t$2',
            detail: 'While Loop',
            documentation: 'Creates a while loop'
        },
        {
            label: 'try',
            insertText: 'try:\n\t$1\nexcept $2 as e:\n\t$3\n\tprint(f"Error: {e}")',
            detail: 'Try-Except',
            documentation: 'Handles errors with try-except block'
        },
        {
            label: 'with',
            insertText: 'with $1 as $2:\n\t$3',
            detail: 'With Statement',
            documentation: 'Context manager for resource handling'
        },
        {
            label: 'lambda',
            insertText: 'lambda $1: $2',
            detail: 'Lambda Function',
            documentation: 'Creates an anonymous function'
        }
    ],
    html: [
        {
            label: '!',
            insertText: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>$1</title>\n</head>\n<body>\n\t$2\n</body>\n</html>',
            detail: 'HTML5 Document',
            documentation: 'Creates a complete HTML5 document structure'
        },
        {
            label: 'div',
            insertText: '<div class="$1">\n\t$2\n</div>',
            detail: 'Div Container',
            documentation: 'Creates a div container element'
        },
        {
            label: 'span',
            insertText: '<span>$1</span>',
            detail: 'HTML Span',
            documentation: 'Creates a span element'
        },
        {
            label: 'p',
            insertText: '<p>$1</p>',
            detail: 'HTML Paragraph',
            documentation: 'Creates a paragraph element'
        },
        {
            label: 'h1',
            insertText: '<h1>$1</h1>',
            detail: 'HTML Heading 1',
            documentation: 'Creates a heading element'
        },
        {
            label: 'h2',
            insertText: '<h2>$1</h2>',
            detail: 'HTML Heading 2',
            documentation: 'Creates a heading element'
        },
        {
            label: 'h3',
            insertText: '<h3>$1</h3>',
            detail: 'HTML Heading 3',
            documentation: 'Creates a heading element'
        },
        {
            label: 'a',
            insertText: '<a href="$1">$2</a>',
            detail: 'HTML Link',
            documentation: 'Creates a link element'
        },
        {
            label: 'img',
            insertText: '<img src="$1" alt="$2" />',
            detail: 'HTML Image',
            documentation: 'Creates an image element'
        },
        {
            label: 'ul',
            insertText: '<ul>\n\t<li>$1</li>\n</ul>',
            detail: 'HTML Unordered List',
            documentation: 'Creates an unordered list'
        },
        {
            label: 'ol',
            insertText: '<ol>\n\t<li>$1</li>\n</ol>',
            detail: 'HTML Ordered List',
            documentation: 'Creates an ordered list'
        },
        {
            label: 'form',
            insertText: '<form action="$1" method="$2">\n\t$3\n</form>',
            detail: 'HTML Form',
            documentation: 'Creates a form element'
        },
        {
            label: 'input',
            insertText: '<input type="$1" name="$2" value="$3" />',
            detail: 'HTML Input',
            documentation: 'Creates an input element'
        },
        {
            label: 'button',
            insertText: '<button type="$1">$2</button>',
            detail: 'HTML Button',
            documentation: 'Creates a button element'
        },
        {
            label: 'table',
            insertText: '<table>\n\t<tr>\n\t\t<th>$1</th>\n\t</tr>\n\t<tr>\n\t\t<td>$2</td>\n\t</tr>\n</table>',
            detail: 'HTML Table',
            documentation: 'Creates a table element'
        }
    ],
    css: [
        {
            label: 'class',
            insertText: '.$1 {\n\t$2\n}',
            detail: 'CSS Class',
            documentation: 'Creates a CSS class selector'
        },
        {
            label: 'id',
            insertText: '#$1 {\n\t$2\n}',
            detail: 'CSS ID',
            documentation: 'Creates a CSS ID selector'
        },
        {
            label: 'flex',
            insertText: 'display: flex;\njustify-content: $1;\nalign-items: $2;',
            detail: 'CSS Flexbox',
            documentation: 'Creates flexbox layout'
        },
        {
            label: 'grid',
            insertText: 'display: grid;\ngrid-template-columns: $1;\ngrid-gap: $2;',
            detail: 'CSS Grid',
            documentation: 'Creates grid layout'
        },
        {
            label: 'hover',
            insertText: '&:hover {\n\t$1\n}',
            detail: 'CSS Hover',
            documentation: 'Creates hover pseudo-class'
        },
        {
            label: 'media',
            insertText: '@media (max-width: $1px) {\n\t$2\n}',
            detail: 'CSS Media Query',
            documentation: 'Creates responsive media query'
        },
        {
            label: 'animation',
            insertText: '@keyframes $1 {\n\t0% {\n\t\t$2\n\t}\n\t100% {\n\t\t$3\n\t}\n}',
            detail: 'CSS Animation',
            documentation: 'Creates CSS keyframe animation'
        },
        {
            label: 'transition',
            insertText: 'transition: $1 $2s ease-in-out;',
            detail: 'CSS Transition',
            documentation: 'Creates CSS transition'
        }
    ]
};

export const IntelliSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Obter sugestões baseadas no contexto
    const getSuggestions = useCallback((model: any, position: any, language: string): IntelliSenseSuggestion[] => {
        console.log('getSuggestions chamado com:', { language, position });

        const word = model.getWordUntilPosition(position);
        const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };

        const suggestions: IntelliSenseSuggestion[] = [];
        const lang = language.toLowerCase();

        console.log('Linguagem detectada:', lang);

        // Adicionar snippets
        if (codeSnippets[lang as keyof typeof codeSnippets]) {
            const snippets = codeSnippets[lang as keyof typeof codeSnippets];
            console.log('Adicionando snippets:', snippets.length);
            snippets.forEach(snippet => {
                suggestions.push({
                    label: snippet.label,
                    kind: 'snippet',
                    detail: snippet.detail,
                    documentation: snippet.documentation,
                    insertText: snippet.insertText,
                    insertTextRules: 'InsertAsSnippet',
                    range,
                    sortText: '0' + snippet.label
                });
            });
        }

        // Adicionar palavras-chave
        if (languageKnowledge[lang as keyof typeof languageKnowledge]) {
            const knowledge = languageKnowledge[lang as keyof typeof languageKnowledge];

            if ('keywords' in knowledge) {
                knowledge.keywords.forEach(keyword => {
                    suggestions.push({
                        label: keyword,
                        kind: 'keyword',
                        detail: 'Keyword',
                        insertText: keyword,
                        range,
                        sortText: '1' + keyword
                    });
                });
            }

            if ('builtins' in knowledge) {
                knowledge.builtins.forEach(builtin => {
                    suggestions.push({
                        label: builtin,
                        kind: 'module',
                        detail: 'Built-in',
                        insertText: builtin,
                        range,
                        sortText: '2' + builtin
                    });
                });
            }

            if ('methods' in knowledge) {
                Object.entries(knowledge.methods).forEach(([object, methods]) => {
                    methods.forEach(method => {
                        suggestions.push({
                            label: method,
                            kind: 'method',
                            detail: `${object}.${method}`,
                            insertText: method,
                            range,
                            sortText: '3' + method
                        });
                    });
                });
            }
        }

        // Adicionar sugestões específicas para HTML
        if (lang === 'html') {
            const htmlKnowledge = languageKnowledge.html;
            htmlKnowledge.tags.forEach(tag => {
                suggestions.push({
                    label: tag,
                    kind: 'class',
                    detail: 'HTML Tag',
                    insertText: `<${tag}>$1</${tag}>`,
                    insertTextRules: 'InsertAsSnippet',
                    range,
                    sortText: '0' + tag
                });
            });
        }

        // Adicionar sugestões específicas para CSS
        if (lang === 'css') {
            const cssKnowledge = languageKnowledge.css;
            cssKnowledge.properties.forEach(property => {
                suggestions.push({
                    label: property,
                    kind: 'property',
                    detail: 'CSS Property',
                    insertText: property,
                    range,
                    sortText: '1' + property
                });
            });
        }

        console.log('Total de sugestões retornadas:', suggestions.length);
        return suggestions;
    }, []);

    // Obter snippets
    const getSnippets = useCallback((language: string): IntelliSenseSuggestion[] => {
        const lang = language.toLowerCase();
        const snippets = codeSnippets[lang as keyof typeof codeSnippets] || [];

        return snippets.map(snippet => ({
            label: snippet.label,
            kind: 'snippet',
            detail: snippet.detail,
            documentation: snippet.documentation,
            insertText: snippet.insertText,
            insertTextRules: 'InsertAsSnippet',
            sortText: '0' + snippet.label
        }));
    }, []);

    // Obter informações de hover
    const getHoverInfo = useCallback((model: any, position: any, language: string): string | null => {
        const word = model.getWordAtPosition(position);
        if (!word) return null;

        const lang = language.toLowerCase();
        const wordText = word.word;

        // Verificar se é uma palavra-chave
        if (languageKnowledge[lang as keyof typeof languageKnowledge]) {
            const knowledge = languageKnowledge[lang as keyof typeof languageKnowledge];
            if ('keywords' in knowledge && knowledge.keywords.includes(wordText)) {
                return `**${wordText}** - Palavra-chave ${language}`;
            }
        }

        return null;
    }, []);

    // Obter ajuda de assinatura
    const getSignatureHelp = useCallback((model: any, position: any, language: string) => {
        return null; // Implementar se necessário
    }, []);

    // Obter completions gerais
    const getCompletions = useCallback((model: any, position: any, language: string): IntelliSenseSuggestion[] => {
        return getSuggestions(model, position, language);
    }, [getSuggestions]);

    const value: IntelliSenseContextType = {
        getSuggestions,
        getSnippets,
        getHoverInfo,
        getSignatureHelp,
        getCompletions
    };

    return (
        <IntelliSenseContext.Provider value={value}>
            {children}
        </IntelliSenseContext.Provider>
    );
};

