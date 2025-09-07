'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, Code, Zap, Star, Clock, TrendingUp } from 'lucide-react';

// Interfaces para o IntelliSense
interface IntelliSenseSuggestion {
    id: string;
    label: string;
    insertText: string;
    detail: string;
    documentation: string;
    kind: 'function' | 'variable' | 'class' | 'interface' | 'module' | 'property' | 'method' | 'keyword' | 'snippet';
    sortText: string;
    filterText: string;
    preselect?: boolean;
    command?: {
        title: string;
        command: string;
        arguments: any[];
    };
}

interface IntelliSenseContext {
    language: string;
    currentLine: string;
    cursorPosition: number;
    fileContent: string;
    lineNumber: number;
    column: number;
    wordBeforeCursor: string;
    triggerCharacter?: string;
}

interface IntelliSenseProps {
    visible: boolean;
    context: IntelliSenseContext;
    onSelect: (suggestion: IntelliSenseSuggestion) => void;
    onClose: () => void;
    theme: 'dark' | 'light';
}

// Provedores de sugestões para diferentes linguagens
class JavaScriptIntelliSense {
    private static keywords = [
        'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
        'return', 'try', 'catch', 'finally', 'throw', 'new', 'delete', 'typeof', 'instanceof', 'in', 'of', 'class',
        'extends', 'super', 'static', 'get', 'set', 'async', 'await', 'yield', 'import', 'export', 'default', 'from',
        'as', 'null', 'undefined', 'true', 'false', 'this', 'arguments', 'eval', 'parseInt', 'parseFloat', 'isNaN',
        'isFinite', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape', 'unescape'
    ];

    static {
        console.log('JavaScriptIntelliSense inicializado com', this.keywords.length, 'keywords');
        console.log('Primeiros 5 keywords:', this.keywords.slice(0, 5));
    }

    private static builtinFunctions = [
        'console.log', 'console.error', 'console.warn', 'console.info', 'console.debug',
        'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
        'JSON.stringify', 'JSON.parse', 'Math.random', 'Math.floor', 'Math.ceil', 'Math.round',
        'Math.abs', 'Math.max', 'Math.min', 'Math.pow', 'Math.sqrt',
        'Array.isArray', 'Array.from', 'Array.of',
        'String.fromCharCode', 'String.fromCodePoint',
        'Number.isInteger', 'Number.isFinite', 'Number.isNaN', 'Number.parseInt', 'Number.parseFloat'
    ];

    private static domFunctions = [
        'document.getElementById', 'document.querySelector', 'document.querySelectorAll',
        'document.createElement', 'document.createTextNode', 'document.addEventListener',
        'element.addEventListener', 'element.removeEventListener', 'element.setAttribute',
        'element.getAttribute', 'element.removeAttribute', 'element.classList.add',
        'element.classList.remove', 'element.classList.toggle', 'element.classList.contains'
    ];

    static getSuggestions(context: IntelliSenseContext): IntelliSenseSuggestion[] {
        console.log('JavaScriptIntelliSense.getSuggestions chamado com:', context);
        const { wordBeforeCursor, currentLine, language } = context;
        const suggestions: IntelliSenseSuggestion[] = [];

        console.log('Estado inicial:', { wordBeforeCursor, currentLine, language });

        // Se não há palavra antes do cursor, mostrar sugestões gerais
        if (!wordBeforeCursor || wordBeforeCursor.length === 0) {
            console.log('Sem palavra antes do cursor, mostrando sugestões gerais');

            // Sugestões baseadas no contexto da linha
            if (currentLine.includes('function') || currentLine.includes('=>')) {
                const funcSuggestions = this.getFunctionSuggestions();
                console.log('Sugestões de função:', funcSuggestions.length);
                suggestions.push(...funcSuggestions);
            } else if (currentLine.includes('const') || currentLine.includes('let') || currentLine.includes('var')) {
                const varSuggestions = this.getVariableSuggestions();
                console.log('Sugestões de variável:', varSuggestions.length);
                suggestions.push(...varSuggestions);
            } else if (currentLine.includes('class')) {
                const classSuggestions = this.getClassSuggestions();
                console.log('Sugestões de classe:', classSuggestions.length);
                suggestions.push(...classSuggestions);
            } else {
                const keywordSuggestions = this.getKeywordSuggestions();
                console.log('Sugestões de keyword:', keywordSuggestions.length);
                suggestions.push(...keywordSuggestions);
            }
        } else {
            console.log('Com palavra antes do cursor, filtrando sugestões');

            // Filtrar sugestões baseadas na palavra digitada
            const allSuggestions = [
                ...this.getKeywordSuggestions(),
                ...this.getFunctionSuggestions(),
                ...this.getVariableSuggestions(),
                ...this.getClassSuggestions(),
                ...this.getSnippetSuggestions()
            ];

            console.log('Total de sugestões disponíveis:', allSuggestions.length);

            const filtered = allSuggestions.filter(suggestion =>
                suggestion.label.toLowerCase().includes(wordBeforeCursor.toLowerCase()) ||
                suggestion.filterText.toLowerCase().includes(wordBeforeCursor.toLowerCase())
            );

            console.log('Sugestões filtradas:', filtered.length);
            suggestions.push(...filtered);
        }

        console.log('Total de sugestões finais:', suggestions.length);

        // Ordenar por relevância
        return suggestions.sort((a, b) => {
            // Priorizar sugestões que começam com a palavra digitada
            const aStartsWith = a.label.toLowerCase().startsWith(wordBeforeCursor.toLowerCase());
            const bStartsWith = b.label.toLowerCase().startsWith(wordBeforeCursor.toLowerCase());

            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;

            // Depois por tipo (keyword > function > variable > snippet)
            const typeOrder = { keyword: 0, function: 1, method: 2, variable: 3, class: 4, snippet: 5 };
            return typeOrder[a.kind] - typeOrder[b.kind];
        });
    }

    private static getKeywordSuggestions(): IntelliSenseSuggestion[] {
        const suggestions = this.keywords.map(keyword => ({
            id: `keyword-${keyword}`,
            label: keyword,
            insertText: keyword,
            detail: 'keyword',
            documentation: `JavaScript keyword: ${keyword}`,
            kind: 'keyword' as const,
            sortText: `0-${keyword}`,
            filterText: keyword
        }));
        console.log('Keywords geradas:', suggestions.length);
        return suggestions;
    }

    private static getFunctionSuggestions(): IntelliSenseSuggestion[] {
        return this.builtinFunctions.map(func => ({
            id: `function-${func}`,
            label: func,
            insertText: func + '(${1:args})',
            detail: 'function',
            documentation: `Built-in JavaScript function: ${func}`,
            kind: 'function' as const,
            sortText: `1-${func}`,
            filterText: func
        }));
    }

    private static getVariableSuggestions(): IntelliSenseSuggestion[] {
        return [
            'i', 'j', 'k', 'index', 'count', 'length', 'name', 'value', 'data', 'result', 'item', 'element',
            'array', 'object', 'string', 'number', 'boolean', 'date', 'error', 'event', 'callback', 'handler'
        ].map(varName => ({
            id: `variable-${varName}`,
            label: varName,
            insertText: varName,
            detail: 'variable',
            documentation: `Common variable name: ${varName}`,
            kind: 'variable' as const,
            sortText: `2-${varName}`,
            filterText: varName
        }));
    }

    private static getClassSuggestions(): IntelliSenseSuggestion[] {
        return [
            'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Error', 'Promise', 'Map', 'Set',
            'WeakMap', 'WeakSet', 'Symbol', 'Proxy', 'Reflect', 'JSON', 'Math', 'Console', 'Window', 'Document'
        ].map(className => ({
            id: `class-${className}`,
            label: className,
            insertText: className,
            detail: 'class',
            documentation: `Built-in JavaScript class: ${className}`,
            kind: 'class' as const,
            sortText: `3-${className}`,
            filterText: className
        }));
    }

    private static getSnippetSuggestions(): IntelliSenseSuggestion[] {
        return [
            {
                id: 'snippet-for',
                label: 'for loop',
                insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// code}\n}',
                detail: 'snippet',
                documentation: 'For loop with counter',
                kind: 'snippet' as const,
                sortText: '4-for',
                filterText: 'for loop'
            },
            {
                id: 'snippet-foreach',
                label: 'forEach loop',
                insertText: '${1:array}.forEach((${2:item}) => {\n\t${3:// code}\n});',
                detail: 'snippet',
                documentation: 'Array forEach loop',
                kind: 'snippet' as const,
                sortText: '4-foreach',
                filterText: 'forEach loop'
            },
            {
                id: 'snippet-function',
                label: 'function',
                insertText: 'function ${1:functionName}(${2:params}) {\n\t${3:// code}\n}',
                detail: 'snippet',
                documentation: 'Function declaration',
                kind: 'snippet' as const,
                sortText: '4-function',
                filterText: 'function'
            },
            {
                id: 'snippet-arrow',
                label: 'arrow function',
                insertText: '(${1:params}) => {\n\t${2:// code}\n}',
                detail: 'snippet',
                documentation: 'Arrow function',
                kind: 'snippet' as const,
                sortText: '4-arrow',
                filterText: 'arrow function'
            },
            {
                id: 'snippet-if',
                label: 'if statement',
                insertText: 'if (${1:condition}) {\n\t${2:// code}\n}',
                detail: 'snippet',
                documentation: 'If statement',
                kind: 'snippet' as const,
                sortText: '4-if',
                filterText: 'if statement'
            },
            {
                id: 'snippet-try',
                label: 'try-catch',
                insertText: 'try {\n\t${1:// code}\n} catch (${2:error}) {\n\t${3:// handle error}\n}',
                detail: 'snippet',
                documentation: 'Try-catch block',
                kind: 'snippet' as const,
                sortText: '4-try',
                filterText: 'try-catch'
            }
        ];
    }
}

class HTMLIntelliSense {
    private static tags = [
        'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td',
        'th', 'form', 'input', 'button', 'textarea', 'select', 'option', 'label', 'section', 'article', 'header',
        'footer', 'nav', 'aside', 'main', 'figure', 'figcaption', 'blockquote', 'code', 'pre', 'em', 'strong',
        'mark', 'del', 'ins', 'sub', 'sup', 'time', 'address', 'cite', 'abbr', 'acronym', 'dfn', 'kbd',
        'samp', 'var', 's', 'u', 'b', 'i', 'big', 'tt', 'strike', 'center', 'font', 'basefont', 'applet',
        'object', 'embed', 'param', 'area', 'map', 'canvas', 'svg', 'audio', 'video', 'source', 'track', 'datalist',
        'fieldset', 'legend', 'optgroup', 'colgroup', 'col', 'caption', 'thead', 'tbody', 'tfoot', 'details',
        'summary', 'dialog', 'menu', 'menuitem', 'command', 'keygen', 'output', 'progress', 'meter', 'ruby',
        'rt', 'rp', 'bdi', 'bdo', 'wbr', 'br', 'hr', 'meta', 'link', 'title', 'style', 'script', 'noscript',
        'template', 'slot', 'shadow'
    ];

    static {
        console.log('HTMLIntelliSense inicializado com', this.tags.length, 'tags');
        console.log('Primeiras 5 tags:', this.tags.slice(0, 5));
    }

    private static attributes = [
        'id', 'class', 'style', 'title', 'alt', 'src', 'href', 'type', 'value', 'placeholder', 'required',
        'disabled', 'readonly', 'maxlength', 'minlength', 'pattern', 'autocomplete', 'autofocus', 'form',
        'name', 'size', 'max', 'min', 'step', 'multiple', 'selected', 'checked', 'rows', 'cols', 'wrap',
        'target', 'rel', 'download', 'hreflang', 'media', 'sizes', 'integrity', 'crossorigin', 'defer',
        'async', 'charset', 'content', 'http-equiv', 'property', 'itemprop', 'itemscope', 'itemtype',
        'role', 'aria-label', 'aria-describedby', 'aria-hidden', 'aria-expanded', 'aria-controls',
        'data-*', 'onclick', 'onload', 'onchange', 'onsubmit', 'onfocus', 'onblur', 'onkeyup', 'onkeydown'
    ];

    static getSuggestions(context: IntelliSenseContext): IntelliSenseSuggestion[] {
        console.log('HTMLIntelliSense.getSuggestions chamado com:', context);
        const { wordBeforeCursor, currentLine } = context;
        const suggestions: IntelliSenseSuggestion[] = [];

        console.log('HTML - Estado inicial:', { wordBeforeCursor, currentLine });

        // Detectar se estamos sugerindo tags ou atributos
        const isInTag = currentLine.includes('<') && !currentLine.includes('>');
        const isInAttribute = currentLine.includes(' ') && currentLine.includes('=');

        console.log('HTML - Detecção:', { isInTag, isInAttribute });

        // Sempre mostrar sugestões de tags para HTML
        console.log('HTML - Gerando sugestões de tags');

        let tagSuggestions: IntelliSenseSuggestion[] = [];

        if (wordBeforeCursor && wordBeforeCursor.length > 0) {
            // Se há palavra antes do cursor, filtrar tags que começam com ela
            const cleanWord = wordBeforeCursor.replace(/[<>]/g, '').toLowerCase();
            console.log('HTML - Palavra limpa para filtro:', cleanWord);

            tagSuggestions = this.tags
                .filter(tag => tag.toLowerCase().startsWith(cleanWord))
                .map(tag => ({
                    id: `tag-${tag}`,
                    label: tag,
                    insertText: tag,
                    detail: 'HTML tag',
                    documentation: `HTML tag: <${tag}>`,
                    kind: 'class' as const,
                    sortText: `0-${tag}`,
                    filterText: tag
                }));
        } else {
            // Se não há palavra, mostrar todas as tags
            tagSuggestions = this.tags.map(tag => ({
                id: `tag-${tag}`,
                label: tag,
                insertText: tag,
                detail: 'HTML tag',
                documentation: `HTML tag: <${tag}>`,
                kind: 'class' as const,
                sortText: `0-${tag}`,
                filterText: tag
            }));
        }

        console.log('HTML - Tags filtradas:', tagSuggestions.length);
        if (tagSuggestions.length > 0) {
            console.log('HTML - Primeiras 3 tags encontradas:', tagSuggestions.slice(0, 3).map(t => t.label));
        }
        suggestions.push(...tagSuggestions);

        // Se há palavra antes do cursor, também mostrar atributos
        if (wordBeforeCursor && wordBeforeCursor.length > 0) {
            console.log('HTML - Gerando sugestões de atributos');
            const cleanWord = wordBeforeCursor.replace(/[<>]/g, '').toLowerCase();

            const attrSuggestions = this.attributes
                .filter(attr => attr.toLowerCase().startsWith(cleanWord))
                .map(attr => ({
                    id: `attr-${attr}`,
                    label: attr,
                    insertText: attr + '="${1:value}"',
                    detail: 'HTML attribute',
                    documentation: `HTML attribute: ${attr}`,
                    kind: 'property' as const,
                    sortText: `1-${attr}`,
                    filterText: attr
                }));
            console.log('HTML - Atributos filtrados:', attrSuggestions.length);
            suggestions.push(...attrSuggestions);
        }

        console.log('HTML - Total de sugestões finais:', suggestions.length);
        return suggestions;
    }
}

class CSSIntelliSense {
    private static properties = [
        'color', 'background', 'border', 'margin', 'padding', 'width', 'height', 'display', 'position',
        'top', 'left', 'right', 'bottom', 'float', 'clear', 'overflow', 'visibility', 'opacity', 'z-index',
        'font-family', 'font-size', 'font-weight', 'font-style', 'text-align', 'text-decoration', 'line-height',
        'letter-spacing', 'word-spacing', 'text-transform', 'text-indent', 'white-space', 'vertical-align',
        'cursor', 'outline', 'box-shadow', 'text-shadow', 'transform', 'transition', 'animation', 'flex',
        'grid', 'align-items', 'justify-content', 'flex-direction', 'flex-wrap', 'order', 'flex-grow',
        'flex-shrink', 'flex-basis', 'align-self', 'justify-self', 'grid-template-columns', 'grid-template-rows',
        'grid-gap', 'grid-area', 'grid-column', 'grid-row', 'object-fit', 'object-position', 'clip-path'
    ];

    private static values = [
        'auto', 'none', 'inherit', 'initial', 'unset', 'transparent', 'currentColor', '0', '1px', '1em',
        '1rem', '1%', '1vw', '1vh', '1vmin', '1vmax', '1deg', '1rad', '1turn', '1s', '1ms', '1fr',
        'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden', 'visible',
        'block', 'inline', 'inline-block', 'flex', 'grid', 'table', 'contents', 'list-item', 'run-in',
        'static', 'relative', 'absolute', 'fixed', 'sticky', 'normal', 'bold', 'bolder', 'lighter', '100',
        '200', '300', '400', '500', '600', '700', '800', '900', 'italic', 'oblique', 'left', 'center',
        'right', 'justify', 'start', 'end', 'stretch', 'baseline', 'flex-start', 'flex-end', 'space-between',
        'space-around', 'space-evenly', 'row', 'column', 'row-reverse', 'column-reverse', 'nowrap', 'wrap',
        'wrap-reverse', 'forwards', 'backwards', 'both', 'ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'
    ];

    static getSuggestions(context: IntelliSenseContext): IntelliSenseSuggestion[] {
        const { wordBeforeCursor, currentLine } = context;
        const suggestions: IntelliSenseSuggestion[] = [];

        // Detectar se estamos sugerindo propriedades ou valores
        const isInProperty = currentLine.includes(':') && !currentLine.includes(';');
        const hasColon = currentLine.includes(':');

        if (!hasColon || !isInProperty) {
            // Sugestões de propriedades
            const propSuggestions = this.properties
                .filter(prop => !wordBeforeCursor || prop.toLowerCase().includes(wordBeforeCursor.toLowerCase()))
                .map(prop => ({
                    id: `prop-${prop}`,
                    label: prop,
                    insertText: prop + ': ${1:value};',
                    detail: 'CSS property',
                    documentation: `CSS property: ${prop}`,
                    kind: 'property' as const,
                    sortText: `0-${prop}`,
                    filterText: prop
                }));
            suggestions.push(...propSuggestions);
        } else {
            // Sugestões de valores
            const valueSuggestions = this.values
                .filter(value => !wordBeforeCursor || value.toLowerCase().includes(wordBeforeCursor.toLowerCase()))
                .map(value => ({
                    id: `value-${value}`,
                    label: value,
                    insertText: value,
                    detail: 'CSS value',
                    documentation: `CSS value: ${value}`,
                    kind: 'variable' as const,
                    sortText: `1-${value}`,
                    filterText: value
                }));
            suggestions.push(...valueSuggestions);
        }

        return suggestions;
    }
}

// Componente principal do IntelliSense
export default function IntelliSense({ visible, context, onSelect, onClose, theme }: IntelliSenseProps) {
    const [suggestions, setSuggestions] = useState<IntelliSenseSuggestion[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState<IntelliSenseSuggestion[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Gerar sugestões baseadas no contexto
    useEffect(() => {
        console.log('useEffect de sugestões executado:', { visible, context });

        if (visible && context) {
            let newSuggestions: IntelliSenseSuggestion[] = [];

            switch (context.language) {
                case 'javascript':
                case 'js':
                    newSuggestions = JavaScriptIntelliSense.getSuggestions(context);
                    break;
                case 'html':
                    newSuggestions = HTMLIntelliSense.getSuggestions(context);
                    break;
                case 'css':
                    newSuggestions = CSSIntelliSense.getSuggestions(context);
                    break;
                default:
                    newSuggestions = JavaScriptIntelliSense.getSuggestions(context);
            }

            console.log('Novas sugestões geradas:', newSuggestions.length);
            setSuggestions(newSuggestions);
            setFilteredSuggestions(newSuggestions);
            setSelectedIndex(0);
        }
    }, [visible, context]);

    // Filtrar sugestões baseadas na palavra digitada
    useEffect(() => {
        console.log('Filtragem de sugestões:', {
            wordBeforeCursor: context.wordBeforeCursor,
            suggestionsCount: suggestions.length
        });

        if (context.wordBeforeCursor && context.wordBeforeCursor.length > 0) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.label.toLowerCase().includes(context.wordBeforeCursor.toLowerCase()) ||
                suggestion.filterText.toLowerCase().includes(context.wordBeforeCursor.toLowerCase())
            );
            console.log('Sugestões filtradas:', filtered.length);
            setFilteredSuggestions(filtered);
            setSelectedIndex(0);
        } else {
            console.log('Mostrando todas as sugestões:', suggestions.length);
            setFilteredSuggestions(suggestions);
        }
    }, [suggestions, context.wordBeforeCursor]);

    // Navegação por teclado
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!visible) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : filteredSuggestions.length - 1
                );
                break;
            case 'Enter':
            case 'Tab':
                e.preventDefault();
                if (filteredSuggestions[selectedIndex]) {
                    onSelect(filteredSuggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                onClose();
                break;
        }
    }, [visible, filteredSuggestions, selectedIndex, onSelect, onClose]);

    // Adicionar/remover event listeners
    useEffect(() => {
        if (visible) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [visible, handleKeyDown]);

    // Scroll para a sugestão selecionada
    useEffect(() => {
        if (containerRef.current && selectedIndex >= 0) {
            const selectedElement = containerRef.current.children[selectedIndex] as HTMLElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex]);

    console.log('IntelliSense renderizando:', { visible, filteredSuggestions: filteredSuggestions.length });

    if (!visible || filteredSuggestions.length === 0) {
        console.log('IntelliSense não visível ou sem sugestões');
        return null;
    }

    const getKindIcon = (kind: string) => {
        switch (kind) {
            case 'function': return <Zap className="w-4 h-4 text-blue-400" />;
            case 'variable': return <Code className="w-4 h-4 text-green-400" />;
            case 'class': return <Star className="w-4 h-4 text-purple-400" />;
            case 'property': return <TrendingUp className="w-4 h-4 text-yellow-400" />;
            case 'keyword': return <Clock className="w-4 h-4 text-red-400" />;
            case 'snippet': return <Code className="w-4 h-4 text-orange-400" />;
            default: return <Code className="w-4 h-4 text-gray-400" />;
        }
    };

    return (
        <div
            ref={containerRef}
            className={`absolute z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl max-h-80 overflow-y-auto min-w-80 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border-gray-300'}`}
            style={{
                left: '0px',
                top: '100%',
                marginTop: '5px',
                // Debug: tornar mais visível
                border: '2px solid red',
                backgroundColor: 'rgba(0, 0, 0, 0.9)'
            }}
        >
            {filteredSuggestions.map((suggestion, index) => (
                <div
                    key={suggestion.id}
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors ${index === selectedIndex ? 'bg-blue-600 text-white' : 'text-gray-200 hover:text-white'
                        }`}
                    onClick={() => onSelect(suggestion)}
                >
                    <div className="flex items-center space-x-3 flex-1">
                        {getKindIcon(suggestion.kind)}
                        <div className="flex-1">
                            <div className="font-medium">{suggestion.label}</div>
                            {suggestion.detail && (
                                <div className="text-sm text-gray-400">{suggestion.detail}</div>
                            )}
                        </div>
                    </div>
                    {suggestion.documentation && (
                        <div className="text-xs text-gray-500 max-w-48 truncate">
                            {suggestion.documentation}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// Hook para usar o IntelliSense
export function useIntelliSense() {
    const [isVisible, setIsVisible] = useState(false);
    const [context, setContext] = useState<IntelliSenseContext | null>(null);

    const showIntelliSense = useCallback((newContext: IntelliSenseContext) => {
        console.log('showIntelliSense chamado com:', newContext);
        setContext(newContext);
        setIsVisible(true);
        console.log('IntelliSense agora está visível');
    }, []);

    const hideIntelliSense = useCallback(() => {
        setIsVisible(false);
        setContext(null);
    }, []);

    const updateContext = useCallback((newContext: Partial<IntelliSenseContext>) => {
        if (context) {
            setContext({ ...context, ...newContext });
        }
    }, [context]);

    return {
        isVisible,
        context,
        showIntelliSense,
        hideIntelliSense,
        updateContext
    };
}
