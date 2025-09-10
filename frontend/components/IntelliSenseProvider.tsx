'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

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

// Base de conhecimento de linguagens
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
    python: {
        keywords: [
            'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'try', 'except',
            'finally', 'with', 'as', 'import', 'from', 'return', 'yield', 'break',
            'continue', 'pass', 'raise', 'assert', 'lambda', 'and', 'or', 'not',
            'in', 'is', 'True', 'False', 'None', 'global', 'nonlocal', 'del'
        ],
        builtins: [
            'print', 'len', 'range', 'enumerate', 'zip', 'map', 'filter', 'reduce',
            'sorted', 'reversed', 'sum', 'min', 'max', 'abs', 'round', 'type',
            'isinstance', 'hasattr', 'getattr', 'setattr', 'dir', 'help', 'open',
            'input', 'int', 'float', 'str', 'bool', 'list', 'dict', 'set', 'tuple'
        ],
        methods: {
            'list': ['append', 'extend', 'insert', 'remove', 'pop', 'clear', 'index', 'count', 'sort', 'reverse'],
            'dict': ['keys', 'values', 'items', 'get', 'setdefault', 'update', 'pop', 'clear', 'copy'],
            'str': ['upper', 'lower', 'strip', 'split', 'join', 'replace', 'find', 'index', 'startswith', 'endswith'],
            'set': ['add', 'remove', 'discard', 'pop', 'clear', 'union', 'intersection', 'difference', 'symmetric_difference']
        }
    },
    html: {
        tags: [
            'html', 'head', 'body', 'title', 'meta', 'link', 'script', 'style',
            'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
            'form', 'input', 'button', 'textarea', 'select', 'option',
            'header', 'nav', 'main', 'section', 'article', 'aside', 'footer'
        ],
        attributes: {
            'global': ['id', 'class', 'style', 'title', 'lang', 'dir', 'hidden', 'tabindex', 'accesskey'],
            'a': ['href', 'target', 'rel', 'download'],
            'img': ['src', 'alt', 'width', 'height', 'loading'],
            'input': ['type', 'name', 'value', 'placeholder', 'required', 'disabled', 'readonly'],
            'form': ['action', 'method', 'enctype', 'target']
        }
    },
    css: {
        properties: [
            'color', 'background-color', 'background-image', 'background-size', 'background-position',
            'font-family', 'font-size', 'font-weight', 'font-style', 'line-height',
            'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'border', 'border-width', 'border-style', 'border-color', 'border-radius',
            'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
            'display', 'position', 'top', 'right', 'bottom', 'left', 'z-index',
            'flex', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items',
            'grid', 'grid-template-columns', 'grid-template-rows', 'grid-gap',
            'opacity', 'visibility', 'overflow', 'text-align', 'text-decoration',
            'box-shadow', 'transform', 'transition', 'animation'
        ],
        values: {
            'color': ['red', 'blue', 'green', 'black', 'white', 'transparent', '#000', '#fff', 'rgb()', 'rgba()', 'hsl()', 'hsla()'],
            'display': ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
            'position': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
            'font-weight': ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        }
    }
};

// Snippets de código por linguagem
const codeSnippets = {
    javascript: [
        {
            label: 'function',
            insertText: 'function ${1:name}(${2:params}) {\n\t${3:// code}\n\treturn ${4:value};\n}',
            detail: 'Function Declaration',
            documentation: 'Creates a new function with parameters and return value'
        },
        {
            label: 'arrow',
            insertText: 'const ${1:name} = (${2:params}) => {\n\t${3:// code}\n\treturn ${4:value};\n};',
            detail: 'Arrow Function',
            documentation: 'Creates an arrow function expression'
        },
        {
            label: 'async',
            insertText: 'async function ${1:name}(${2:params}) {\n\ttry {\n\t\t${3:// code}\n\t\treturn ${4:result};\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}',
            detail: 'Async Function',
            documentation: 'Creates an async function with error handling'
        },
        {
            label: 'class',
            insertText: 'class ${1:ClassName} {\n\tconstructor(${2:params}) {\n\t\t${3:// initialization}\n\t}\n\n\t${4:method}() {\n\t\t${5:// implementation}\n\t}\n}',
            detail: 'Class Declaration',
            documentation: 'Creates a new class with constructor and methods'
        },
        {
            label: 'if',
            insertText: 'if (${1:condition}) {\n\t${2:// code}\n}',
            detail: 'If Statement',
            documentation: 'Creates a conditional statement'
        },
        {
            label: 'for',
            insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// code}\n}',
            detail: 'For Loop',
            documentation: 'Creates a for loop'
        },
        {
            label: 'foreach',
            insertText: '${1:array}.forEach((${2:item}) => {\n\t${3:// code}\n});',
            detail: 'ForEach Loop',
            documentation: 'Iterates over array elements'
        },
        {
            label: 'map',
            insertText: '${1:array}.map((${2:item}) => {\n\treturn ${3:item};\n})',
            detail: 'Array Map',
            documentation: 'Transforms array elements'
        },
        {
            label: 'filter',
            insertText: '${1:array}.filter((${2:item}) => {\n\treturn ${3:condition};\n})',
            detail: 'Array Filter',
            documentation: 'Filters array elements'
        },
        {
            label: 'reduce',
            insertText: '${1:array}.reduce((${2:accumulator}, ${3:item}) => {\n\treturn ${4:accumulator + item};\n}, ${5:0})',
            detail: 'Array Reduce',
            documentation: 'Reduces array to a single value'
        },
        {
            label: 'try',
            insertText: 'try {\n\t${1:// code}\n} catch (error) {\n\t${2:// error handling}\n\tconsole.error(error);\n}',
            detail: 'Try-Catch',
            documentation: 'Handles errors with try-catch block'
        },
        {
            label: 'fetch',
            insertText: 'fetch(\'${1:url}\')\n\t.then(response => response.json())\n\t.then(data => {\n\t\t${2:// handle data}\n\t})\n\t.catch(error => {\n\t\tconsole.error(error);\n\t});',
            detail: 'Fetch API',
            documentation: 'Makes HTTP request with fetch API'
        }
    ],
    typescript: [
        {
            label: 'interface',
            insertText: 'interface ${1:InterfaceName} {\n\t${2:property}: ${3:type};\n}',
            detail: 'Interface Declaration',
            documentation: 'Creates a TypeScript interface'
        },
        {
            label: 'type',
            insertText: 'type ${1:TypeName} = ${2:type};',
            detail: 'Type Alias',
            documentation: 'Creates a TypeScript type alias'
        },
        {
            label: 'enum',
            insertText: 'enum ${1:EnumName} {\n\t${2:VALUE} = \'${3:value}\'\n}',
            detail: 'Enum Declaration',
            documentation: 'Creates a TypeScript enum'
        },
        {
            label: 'generic',
            insertText: 'function ${1:name}<${2:T}>(${3:param}: ${2:T}): ${2:T} {\n\treturn ${3:param};\n}',
            detail: 'Generic Function',
            documentation: 'Creates a generic function with type parameter'
        }
    ],
    python: [
        {
            label: 'def',
            insertText: 'def ${1:function_name}(${2:params}):\n\t${3:"""Docstring"""}\n\t${4:# code}\n\treturn ${5:value}',
            detail: 'Function Definition',
            documentation: 'Creates a Python function'
        },
        {
            label: 'class',
            insertText: 'class ${1:ClassName}:\n\tdef __init__(self, ${2:params}):\n\t\t${3:# initialization}\n\n\tdef ${4:method}(self):\n\t\t${5:# implementation}',
            detail: 'Class Definition',
            documentation: 'Creates a Python class'
        },
        {
            label: 'if',
            insertText: 'if ${1:condition}:\n\t${2:# code}',
            detail: 'If Statement',
            documentation: 'Creates a conditional statement'
        },
        {
            label: 'for',
            insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:# code}',
            detail: 'For Loop',
            documentation: 'Creates a for loop'
        },
        {
            label: 'while',
            insertText: 'while ${1:condition}:\n\t${2:# code}',
            detail: 'While Loop',
            documentation: 'Creates a while loop'
        },
        {
            label: 'try',
            insertText: 'try:\n\t${1:# code}\nexcept ${2:Exception} as e:\n\t${3:# error handling}\n\tprint(f"Error: {e}")',
            detail: 'Try-Except',
            documentation: 'Handles errors with try-except block'
        },
        {
            label: 'with',
            insertText: 'with ${1:open("file.txt")} as ${2:f}:\n\t${3:content = f.read()}',
            detail: 'With Statement',
            documentation: 'Context manager for resource handling'
        },
        {
            label: 'lambda',
            insertText: 'lambda ${1:x}: ${2:x * 2}',
            detail: 'Lambda Function',
            documentation: 'Creates an anonymous function'
        }
    ],
    html: [
        {
            label: '!',
            insertText: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Page Title}</title>\n</head>\n<body>\n\t${2:<!-- content -->}\n</body>\n</html>',
            detail: 'HTML5 Document',
            documentation: 'Creates a complete HTML5 document structure'
        },
        {
            label: 'div',
            insertText: '<div className="${1:class-name}">\n\t${2:content}\n</div>',
            detail: 'Div Container',
            documentation: 'Creates a div container element'
        },
        {
            label: 'form',
            insertText: '<form action="${1:/submit}" method="${2:post}">\n\t<input type="text" name="${3:name}" placeholder="${4:placeholder}">\n\t<button type="submit">${5:Submit}</button>\n</form>',
            detail: 'Form Element',
            documentation: 'Creates a form with input and submit button'
        },
        {
            label: 'table',
            insertText: '<table>\n\t<thead>\n\t\t<tr>\n\t\t\t<th>${1:Header 1}</th>\n\t\t\t<th>${2:Header 2}</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>${3:Data 1}</td>\n\t\t\t<td>${4:Data 2}</td>\n\t\t</tr>\n\t</tbody>\n</table>',
            detail: 'Table Element',
            documentation: 'Creates a table with header and body'
        }
    ],
    css: [
        {
            label: 'flex',
            insertText: 'display: flex;\nflex-direction: ${1:row};\njustify-content: ${2:flex-start};\nalign-items: ${3:stretch};',
            detail: 'Flexbox Layout',
            documentation: 'Creates a flexbox layout'
        },
        {
            label: 'grid',
            insertText: 'display: grid;\ngrid-template-columns: ${1:repeat(3, 1fr)};\ngrid-gap: ${2:20px};',
            detail: 'CSS Grid Layout',
            documentation: 'Creates a CSS grid layout'
        },
        {
            label: 'media',
            insertText: '@media (max-width: ${1:768px}) {\n\t${2:/* styles */}\n}',
            detail: 'Media Query',
            documentation: 'Creates a responsive media query'
        },
        {
            label: 'animation',
            insertText: '@keyframes ${1:animationName} {\n\t0% {\n\t\t${2:/* initial state */}\n\t}\n\t100% {\n\t\t${3:/* final state */}\n\t}\n}\n\n.${4:element} {\n\tanimation: ${1:animationName} ${5:1s} ${6:ease-in-out};',
            detail: 'CSS Animation',
            documentation: 'Creates a CSS animation with keyframes'
        }
    ]
};

export const IntelliSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [context, setContext] = useState<any>(null);

    // Obter sugestões baseadas no contexto
    const getSuggestions = useCallback((model: any, position: any, language: string): IntelliSenseSuggestion[] => {
        const word = model.getWordUntilPosition(position);
        const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };

        const suggestions: IntelliSenseSuggestion[] = [];
        const lang = language.toLowerCase();

        // Adicionar snippets
        if (codeSnippets[lang as keyof typeof codeSnippets]) {
            const snippets = codeSnippets[lang as keyof typeof codeSnippets];
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
            insertTextRules: 'InsertAsSnippet'
        }));
    }, []);

    // Obter informações de hover
    const getHoverInfo = useCallback((model: any, position: any, language: string): string | null => {
        const word = model.getWordAtPosition(position);
        if (!word) return null;

        const lang = language.toLowerCase();
        const knowledge = languageKnowledge[lang as keyof typeof languageKnowledge];

        if (!knowledge) return null;

        // Verificar se é uma palavra-chave
        if ('keywords' in knowledge && knowledge.keywords.includes(word.word)) {
            return `** ${word.word} ** - Keyword\n\nThis is a reserved keyword in ${language}.`;
        }

        // Verificar se é um built-in
        if ('builtins' in knowledge && knowledge.builtins.includes(word.word)) {
            return `** ${word.word} ** - Built-in\n\nThis is a built-in ${language} object or function.`;
        }

        // Verificar se é um método
        if ('methods' in knowledge) {
            for (const [object, methods] of Object.entries(knowledge.methods)) {
                if (methods.includes(word.word)) {
                    return `** ${word.word} ** - Method\n\nMethod of ${object} object.`;
                }
            }
        }

        return null;
    }, []);

    // Obter ajuda de assinatura
    const getSignatureHelp = useCallback((model: any, position: any, language: string) => {
        const word = model.getWordAtPosition(position);
        if (!word) return null;

        // Implementar lógica de signature help baseada na linguagem
        return {
            signatures: [],
            activeSignature: 0,
            activeParameter: 0
        };
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
