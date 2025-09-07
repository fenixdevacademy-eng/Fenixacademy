'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    FileText, Folder, Terminal, GitBranch, Search, Settings,
    Bot, Zap, Trophy, X, Plus, Trash2, Save, Play,
    ChevronDown, ChevronRight, Code, Monitor, Smartphone,
    Sparkles, Star, Target, Flame, Edit3, FolderPlus, FilePlus,
    Copy, Scissors, Download, Upload, Archive, GitFork, Lightbulb,
    Zap as ZapIcon, Clock, TrendingUp
} from 'lucide-react';
import AIAssistant from './AIAssistant';
import HotReload from './HotReload';
import GamificationSystem from './GamificationSystem';

interface File {
    id: string;
    name: string;
    content: string;
    language: string;
    isOpen: boolean;
    isModified: boolean;
    path?: string;
    size?: number;
    createdAt?: Date;
    lastModified?: Date;
}

interface Folder {
    id: string;
    name: string;
    path: string;
    files: File[];
    subfolders: Folder[];
}

interface FileTemplate {
    name: string;
    extension: string;
    content: string;
    description: string;
    category: string;
}

interface AutocompleteSuggestion {
    id: string;
    text: string;
    type: 'function' | 'variable' | 'class' | 'import' | 'snippet' | 'keyword' | 'property';
    description: string;
    language: string;
    category: string;
    usage?: string;
    icon: React.ReactNode;
    priority: number;
}

interface FenixIDEProps {
    initialFiles?: File[];
}

export default function FenixIDE({ initialFiles = [] }: FenixIDEProps) {
    const [files, setFiles] = useState<File[]>(initialFiles);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [activeFileId, setActiveFileId] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<'terminal' | 'git' | 'search' | 'settings'>('terminal');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Novos estados para as funcionalidades
    const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
    const [hotReloadOpen, setHotReloadOpen] = useState(false);
    const [gamificationOpen, setGamificationOpen] = useState(false);

    // Estados para funcionalidades avançadas de arquivos
    const [showFileMenu, setShowFileMenu] = useState<string | null>(null);
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [editingFileName, setEditingFileName] = useState<string | null>(null);
    const [newFileName, setNewFileName] = useState('');
    const [showFolderDialog, setShowFolderDialog] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [clipboard, setClipboard] = useState<{ type: 'copy' | 'cut', files: File[] } | null>(null);

    // Estados para o sistema de autocomplete
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [autocompleteQuery, setAutocompleteQuery] = useState('');
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<AutocompleteSuggestion[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
    const [autocompletePosition, setAutocompletePosition] = useState({ x: 0, y: 0 });
    const [editorContent, setEditorContent] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileNameInputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<HTMLDivElement>(null);

    const activeFile = files.find(f => f.id === activeFileId);

    // Sistema de autocomplete avançado
    const autocompleteDatabase: AutocompleteSuggestion[] = [
        // JavaScript/TypeScript
        {
            id: 'js-function',
            text: 'function',
            type: 'keyword',
            description: 'Declaração de função',
            language: 'javascript',
            category: 'Control Flow',
            usage: 'function functionName() {}',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 10
        },
        {
            id: 'js-arrow-function',
            text: '=>',
            type: 'keyword',
            description: 'Arrow function',
            language: 'javascript',
            category: 'Control Flow',
            usage: 'const func = () => {}',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 9
        },
        {
            id: 'js-const',
            text: 'const',
            type: 'keyword',
            description: 'Declaração de constante',
            language: 'javascript',
            category: 'Variables',
            usage: 'const variableName = value;',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 10
        },
        {
            id: 'js-let',
            text: 'let',
            type: 'keyword',
            description: 'Declaração de variável com escopo de bloco',
            language: 'javascript',
            category: 'Variables',
            usage: 'let variableName = value;',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 9
        },
        {
            id: 'js-console-log',
            text: 'console.log',
            type: 'function',
            description: 'Função para exibir mensagens no console',
            language: 'javascript',
            category: 'Debugging',
            usage: 'console.log(message);',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 8
        },
        {
            id: 'js-foreach',
            text: 'forEach',
            type: 'function',
            description: 'Método para iterar sobre arrays',
            language: 'javascript',
            category: 'Arrays',
            usage: 'array.forEach(item => {});',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 8
        },
        {
            id: 'js-map',
            text: 'map',
            type: 'function',
            description: 'Método para transformar arrays',
            language: 'javascript',
            category: 'Arrays',
            usage: 'array.map(item => transformedItem);',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 8
        },
        {
            id: 'js-filter',
            text: 'filter',
            type: 'function',
            description: 'Método para filtrar arrays',
            language: 'javascript',
            category: 'Arrays',
            usage: 'array.filter(item => condition);',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 8
        },
        {
            id: 'js-reduce',
            text: 'reduce',
            type: 'function',
            description: 'Método para reduzir arrays a um valor',
            language: 'javascript',
            category: 'Arrays',
            usage: 'array.reduce((acc, item) => {}, initialValue);',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 7
        },
        {
            id: 'js-async',
            text: 'async',
            type: 'keyword',
            description: 'Função assíncrona',
            language: 'javascript',
            category: 'Async',
            usage: 'async function functionName() {}',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 9
        },
        {
            id: 'js-await',
            text: 'await',
            type: 'keyword',
            description: 'Aguardar resolução de Promise',
            language: 'javascript',
            category: 'Async',
            usage: 'const result = await promise;',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 9
        },
        {
            id: 'js-try-catch',
            text: 'try-catch',
            type: 'snippet',
            description: 'Bloco try-catch para tratamento de erros',
            language: 'javascript',
            category: 'Error Handling',
            usage: 'try { } catch (error) { }',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 8
        },
        {
            id: 'js-if-else',
            text: 'if-else',
            type: 'snippet',
            description: 'Estrutura condicional if-else',
            language: 'javascript',
            category: 'Control Flow',
            usage: 'if (condition) { } else { }',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 9
        },
        {
            id: 'js-for-loop',
            text: 'for',
            type: 'keyword',
            description: 'Loop for tradicional',
            language: 'javascript',
            category: 'Control Flow',
            usage: 'for (let i = 0; i < length; i++) { }',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 8
        },
        {
            id: 'js-for-in',
            text: 'for...in',
            type: 'keyword',
            description: 'Loop for...in para objetos',
            language: 'javascript',
            category: 'Control Flow',
            usage: 'for (let key in object) { }',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 7
        },
        {
            id: 'js-for-of',
            text: 'for...of',
            type: 'keyword',
            description: 'Loop for...of para iteráveis',
            language: 'javascript',
            category: 'Control Flow',
            usage: 'for (let item of array) { }',
            icon: <Code className="w-4 h-4 text-yellow-500" />,
            priority: 7
        },

        // React/JSX
        {
            id: 'react-useState',
            text: 'useState',
            type: 'function',
            description: 'Hook React para estado local',
            language: 'javascript',
            category: 'React Hooks',
            usage: 'const [state, setState] = useState(initialValue);',
            icon: <Code className="w-4 h-4 text-blue-500" />,
            priority: 10
        },
        {
            id: 'react-useEffect',
            text: 'useEffect',
            type: 'function',
            description: 'Hook React para efeitos colaterais',
            language: 'javascript',
            category: 'React Hooks',
            usage: 'useEffect(() => {}, [dependencies]);',
            icon: <Code className="w-4 h-4 text-blue-500" />,
            priority: 10
        },
        {
            id: 'react-useRef',
            text: 'useRef',
            type: 'function',
            description: 'Hook React para referências',
            language: 'javascript',
            category: 'React Hooks',
            usage: 'const ref = useRef(initialValue);',
            icon: <Code className="w-4 h-4 text-blue-500" />,
            priority: 8
        },
        {
            id: 'react-useCallback',
            text: 'useCallback',
            type: 'function',
            description: 'Hook React para memoização de funções',
            language: 'javascript',
            category: 'React Hooks',
            usage: 'const memoizedCallback = useCallback(() => {}, [dependencies]);',
            icon: <Code className="w-4 h-4 text-blue-500" />,
            priority: 7
        },
        {
            id: 'react-useMemo',
            text: 'useMemo',
            type: 'function',
            description: 'Hook React para memoização de valores',
            language: 'javascript',
            category: 'React Hooks',
            usage: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);',
            icon: <Code className="w-4 h-4 text-blue-500" />,
            priority: 7
        },
        {
            id: 'react-jsx',
            text: 'JSX',
            type: 'snippet',
            description: 'Sintaxe JSX para React',
            language: 'javascript',
            category: 'React',
            usage: '<div>Hello World</div>',
            icon: <Code className="w-4 h-4 text-blue-500" />,
            priority: 9
        },

        // Python
        {
            id: 'py-def',
            text: 'def',
            type: 'keyword',
            description: 'Definição de função',
            language: 'python',
            category: 'Functions',
            usage: 'def function_name():',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 10
        },
        {
            id: 'py-class',
            text: 'class',
            type: 'keyword',
            description: 'Definição de classe',
            language: 'python',
            category: 'Classes',
            usage: 'class ClassName:',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 9
        },
        {
            id: 'py-import',
            text: 'import',
            type: 'keyword',
            description: 'Importar módulos',
            language: 'python',
            category: 'Modules',
            usage: 'import module_name',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 9
        },
        {
            id: 'py-from-import',
            text: 'from...import',
            type: 'keyword',
            description: 'Importar itens específicos de módulos',
            language: 'python',
            category: 'Modules',
            usage: 'from module_name import item_name',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 8
        },
        {
            id: 'py-if-elif-else',
            text: 'if-elif-else',
            type: 'snippet',
            description: 'Estrutura condicional Python',
            language: 'python',
            category: 'Control Flow',
            usage: 'if condition:\n    pass\nelif other_condition:\n    pass\nelse:\n    pass',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 9
        },
        {
            id: 'py-for-loop',
            text: 'for',
            type: 'keyword',
            description: 'Loop for Python',
            language: 'python',
            category: 'Control Flow',
            usage: 'for item in iterable:',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 8
        },
        {
            id: 'py-while',
            text: 'while',
            type: 'keyword',
            description: 'Loop while Python',
            language: 'python',
            category: 'Control Flow',
            usage: 'while condition:',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 7
        },
        {
            id: 'py-try-except',
            text: 'try-except',
            type: 'snippet',
            description: 'Tratamento de exceções Python',
            language: 'python',
            category: 'Error Handling',
            usage: 'try:\n    pass\nexcept Exception as e:\n    pass',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 8
        },
        {
            id: 'py-print',
            text: 'print',
            type: 'function',
            description: 'Função para exibir texto',
            language: 'python',
            category: 'Built-in Functions',
            usage: 'print("Hello World")',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 9
        },
        {
            id: 'py-len',
            text: 'len',
            type: 'function',
            description: 'Função para obter comprimento',
            language: 'python',
            category: 'Built-in Functions',
            usage: 'length = len(sequence)',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 8
        },
        {
            id: 'py-range',
            text: 'range',
            type: 'function',
            description: 'Função para gerar sequências',
            language: 'python',
            category: 'Built-in Functions',
            usage: 'for i in range(start, stop, step):',
            icon: <Code className="w-4 h-4 text-green-500" />,
            priority: 8
        },

        // C#
        {
            id: 'cs-public',
            text: 'public',
            type: 'keyword',
            description: 'Modificador de acesso público',
            language: 'csharp',
            category: 'Access Modifiers',
            usage: 'public class ClassName',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 9
        },
        {
            id: 'cs-private',
            text: 'private',
            type: 'keyword',
            description: 'Modificador de acesso privado',
            language: 'csharp',
            category: 'Access Modifiers',
            usage: 'private string fieldName;',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 8
        },
        {
            id: 'cs-class',
            text: 'class',
            type: 'keyword',
            description: 'Definição de classe',
            language: 'csharp',
            category: 'Classes',
            usage: 'public class ClassName',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 9
        },
        {
            id: 'cs-interface',
            text: 'interface',
            type: 'keyword',
            description: 'Definição de interface',
            language: 'csharp',
            category: 'Interfaces',
            usage: 'public interface IInterfaceName',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 7
        },
        {
            id: 'cs-using',
            text: 'using',
            type: 'keyword',
            description: 'Diretiva using para namespaces',
            language: 'csharp',
            category: 'Namespaces',
            usage: 'using System;',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 9
        },
        {
            id: 'cs-namespace',
            text: 'namespace',
            type: 'keyword',
            description: 'Definição de namespace',
            language: 'csharp',
            category: 'Namespaces',
            usage: 'namespace MyNamespace',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 8
        },
        {
            id: 'cs-var',
            text: 'var',
            type: 'keyword',
            description: 'Inferência de tipo implícita',
            language: 'csharp',
            category: 'Variables',
            usage: 'var variableName = value;',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 8
        },
        {
            id: 'cs-string',
            text: 'string',
            type: 'keyword',
            description: 'Tipo string',
            language: 'csharp',
            category: 'Types',
            usage: 'string text = "Hello";',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 9
        },
        {
            id: 'cs-int',
            text: 'int',
            type: 'keyword',
            description: 'Tipo inteiro',
            language: 'csharp',
            category: 'Types',
            usage: 'int number = 42;',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 9
        },
        {
            id: 'cs-bool',
            text: 'bool',
            type: 'keyword',
            description: 'Tipo booleano',
            language: 'csharp',
            category: 'Types',
            usage: 'bool condition = true;',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 8
        },
        {
            id: 'cs-foreach',
            text: 'foreach',
            type: 'keyword',
            description: 'Loop foreach para coleções',
            language: 'csharp',
            category: 'Control Flow',
            usage: 'foreach (var item in collection)',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 8
        },
        {
            id: 'cs-for',
            text: 'for',
            type: 'keyword',
            description: 'Loop for tradicional',
            language: 'csharp',
            category: 'Control Flow',
            usage: 'for (int i = 0; i < length; i++)',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 8
        },
        {
            id: 'cs-if-else',
            text: 'if-else',
            type: 'snippet',
            description: 'Estrutura condicional if-else',
            language: 'csharp',
            category: 'Control Flow',
            usage: 'if (condition) { } else { }',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 9
        },
        {
            id: 'cs-try-catch',
            text: 'try-catch',
            type: 'snippet',
            description: 'Tratamento de exceções',
            language: 'csharp',
            category: 'Error Handling',
            usage: 'try { } catch (Exception ex) { }',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 8
        },
        {
            id: 'cs-console-writeline',
            text: 'Console.WriteLine',
            type: 'function',
            description: 'Método para exibir texto no console',
            language: 'csharp',
            category: 'Console',
            usage: 'Console.WriteLine("Hello World");',
            icon: <Code className="w-4 h-4 text-purple-500" />,
            priority: 8
        },

        // HTML
        {
            id: 'html-div',
            text: 'div',
            type: 'snippet',
            description: 'Elemento div container',
            language: 'html',
            category: 'Elements',
            usage: '<div>Content</div>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 9
        },
        {
            id: 'html-span',
            text: 'span',
            type: 'snippet',
            description: 'Elemento span inline',
            language: 'html',
            category: 'Elements',
            usage: '<span>Text</span>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 8
        },
        {
            id: 'html-p',
            text: 'p',
            type: 'snippet',
            description: 'Elemento parágrafo',
            language: 'html',
            category: 'Elements',
            usage: '<p>Paragraph text</p>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 8
        },
        {
            id: 'html-h1',
            text: 'h1',
            type: 'snippet',
            description: 'Cabeçalho nível 1',
            language: 'html',
            category: 'Elements',
            usage: '<h1>Main Title</h1>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 8
        },
        {
            id: 'html-button',
            text: 'button',
            type: 'snippet',
            description: 'Elemento botão',
            language: 'html',
            category: 'Elements',
            usage: '<button>Click me</button>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 8
        },
        {
            id: 'html-input',
            text: 'input',
            type: 'snippet',
            description: 'Elemento input',
            language: 'html',
            category: 'Elements',
            usage: '<input type="text" placeholder="Enter text">',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 8
        },
        {
            id: 'html-form',
            text: 'form',
            type: 'snippet',
            description: 'Elemento formulário',
            language: 'html',
            category: 'Elements',
            usage: '<form action="/submit" method="post"></form>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 7
        },
        {
            id: 'html-a',
            text: 'a',
            type: 'snippet',
            description: 'Elemento link',
            language: 'html',
            category: 'Elements',
            usage: '<a href="url">Link text</a>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 8
        },
        {
            id: 'html-img',
            text: 'img',
            type: 'snippet',
            description: 'Elemento imagem',
            language: 'html',
            category: 'Elements',
            usage: '<img src="image.jpg" alt="Description">',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 7
        },
        {
            id: 'html-ul',
            text: 'ul',
            type: 'snippet',
            description: 'Lista não ordenada',
            language: 'html',
            category: 'Elements',
            usage: '<ul><li>Item 1</li></ul>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 7
        },
        {
            id: 'html-ol',
            text: 'ol',
            type: 'snippet',
            description: 'Lista ordenada',
            language: 'html',
            category: 'Elements',
            usage: '<ol><li>Item 1</li></ol>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 7
        },
        {
            id: 'html-li',
            text: 'li',
            type: 'snippet',
            description: 'Item de lista',
            language: 'html',
            category: 'Elements',
            usage: '<li>List item</li>',
            icon: <Code className="w-4 h-4 text-orange-500" />,
            priority: 7
        },

        // CSS
        {
            id: 'css-color',
            text: 'color',
            type: 'property',
            description: 'Propriedade de cor do texto',
            language: 'css',
            category: 'Typography',
            usage: 'color: #333;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 9
        },
        {
            id: 'css-background-color',
            text: 'background-color',
            type: 'property',
            description: 'Propriedade de cor de fundo',
            language: 'css',
            category: 'Background',
            usage: 'background-color: #fff;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 8
        },
        {
            id: 'css-font-size',
            text: 'font-size',
            type: 'property',
            description: 'Propriedade de tamanho da fonte',
            language: 'css',
            category: 'Typography',
            usage: 'font-size: 16px;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 8
        },
        {
            id: 'css-font-weight',
            text: 'font-weight',
            type: 'property',
            description: 'Propriedade de peso da fonte',
            language: 'css',
            category: 'Typography',
            usage: 'font-weight: bold;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-margin',
            text: 'margin',
            type: 'property',
            description: 'Propriedade de margem externa',
            language: 'css',
            category: 'Layout',
            usage: 'margin: 10px;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 8
        },
        {
            id: 'css-padding',
            text: 'padding',
            type: 'property',
            description: 'Propriedade de preenchimento interno',
            language: 'css',
            category: 'Layout',
            usage: 'padding: 10px;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 8
        },
        {
            id: 'css-border',
            text: 'border',
            type: 'property',
            description: 'Propriedade de borda',
            language: 'css',
            category: 'Border',
            usage: 'border: 1px solid #ccc;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 8
        },
        {
            id: 'css-border-radius',
            text: 'border-radius',
            type: 'property',
            description: 'Propriedade de raio da borda',
            language: 'css',
            category: 'Border',
            usage: 'border-radius: 5px;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-display',
            text: 'display',
            type: 'property',
            description: 'Propriedade de exibição',
            language: 'css',
            category: 'Layout',
            usage: 'display: flex;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 8
        },
        {
            id: 'css-flex',
            text: 'flex',
            type: 'property',
            description: 'Propriedade flexbox',
            language: 'css',
            category: 'Layout',
            usage: 'flex: 1;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-grid',
            text: 'grid',
            type: 'property',
            description: 'Propriedade CSS Grid',
            language: 'css',
            category: 'Layout',
            usage: 'display: grid;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-position',
            text: 'position',
            type: 'property',
            description: 'Propriedade de posicionamento',
            language: 'css',
            category: 'Layout',
            usage: 'position: relative;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-top',
            text: 'top',
            type: 'property',
            description: 'Propriedade de posição superior',
            language: 'css',
            category: 'Layout',
            usage: 'top: 0;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 6
        },
        {
            id: 'css-left',
            text: 'left',
            type: 'property',
            description: 'Propriedade de posição esquerda',
            language: 'css',
            category: 'Layout',
            usage: 'left: 0;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 6
        },
        {
            id: 'css-right',
            text: 'right',
            type: 'property',
            description: 'Propriedade de posição direita',
            language: 'css',
            category: 'Layout',
            usage: 'right: 0;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 6
        },
        {
            id: 'css-bottom',
            text: 'bottom',
            type: 'property',
            description: 'Propriedade de posição inferior',
            language: 'css',
            category: 'Layout',
            usage: 'bottom: 0;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 6
        },
        {
            id: 'css-width',
            text: 'width',
            type: 'property',
            description: 'Propriedade de largura',
            language: 'css',
            category: 'Layout',
            usage: 'width: 100%;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 8
        },
        {
            id: 'css-height',
            text: 'height',
            type: 'property',
            description: 'Propriedade de altura',
            language: 'css',
            category: 'Layout',
            usage: 'height: 100vh;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 8
        },
        {
            id: 'css-max-width',
            text: 'max-width',
            type: 'property',
            description: 'Propriedade de largura máxima',
            language: 'css',
            category: 'Layout',
            usage: 'max-width: 1200px;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-min-width',
            text: 'min-width',
            type: 'property',
            description: 'Propriedade de largura mínima',
            language: 'css',
            category: 'Layout',
            usage: 'min-width: 300px;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-max-height',
            text: 'max-height',
            type: 'property',
            description: 'Propriedade de altura máxima',
            language: 'css',
            category: 'Layout',
            usage: 'max-height: 500px;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-min-height',
            text: 'min-height',
            type: 'property',
            description: 'Propriedade de altura mínima',
            language: 'css',
            category: 'Layout',
            usage: 'min-height: 200px;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-overflow',
            text: 'overflow',
            type: 'property',
            description: 'Propriedade de overflow',
            language: 'css',
            category: 'Layout',
            usage: 'overflow: hidden;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 6
        },
        {
            id: 'css-z-index',
            text: 'z-index',
            type: 'property',
            description: 'Propriedade de camada',
            language: 'css',
            category: 'Layout',
            usage: 'z-index: 1000;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 6
        },
        {
            id: 'css-opacity',
            text: 'opacity',
            type: 'property',
            description: 'Propriedade de opacidade',
            language: 'css',
            category: 'Effects',
            usage: 'opacity: 0.8;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-transform',
            text: 'transform',
            type: 'property',
            description: 'Propriedade de transformação',
            language: 'css',
            category: 'Effects',
            usage: 'transform: scale(1.1);',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-transition',
            text: 'transition',
            type: 'property',
            description: 'Propriedade de transição',
            language: 'css',
            category: 'Effects',
            usage: 'transition: all 0.3s ease;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-animation',
            text: 'animation',
            type: 'property',
            description: 'Propriedade de animação',
            language: 'css',
            category: 'Effects',
            usage: 'animation: slideIn 0.5s ease;',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 6
        },
        {
            id: 'css-box-shadow',
            text: 'box-shadow',
            type: 'property',
            description: 'Propriedade de sombra',
            language: 'css',
            category: 'Effects',
            usage: 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 7
        },
        {
            id: 'css-text-shadow',
            text: 'text-shadow',
            type: 'property',
            description: 'Propriedade de sombra de texto',
            language: 'css',
            category: 'Effects',
            usage: 'text-shadow: 1px 1px 2px rgba(0,0,0,0.5);',
            icon: <Code className="w-4 h-4 text-blue-400" />,
            priority: 6
        }
    ];

    // Função para filtrar sugestões de autocomplete
    const filterAutocompleteSuggestions = (query: string, language: string) => {
        if (!query.trim()) return [];

        const filtered = autocompleteDatabase
            .filter(suggestion =>
                suggestion.language === language || suggestion.language === 'javascript' // JavaScript é universal
            )
            .filter(suggestion =>
                suggestion.text.toLowerCase().includes(query.toLowerCase()) ||
                suggestion.description.toLowerCase().includes(query.toLowerCase()) ||
                suggestion.category.toLowerCase().includes(query.toLowerCase())
            )
            .sort((a, b) => {
                // Priorizar sugestões que começam com a query
                const aStartsWith = a.text.toLowerCase().startsWith(query.toLowerCase());
                const bStartsWith = b.text.toLowerCase().startsWith(query.toLowerCase());

                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;

                // Depois priorizar por prioridade
                return b.priority - a.priority;
            })
            .slice(0, 10); // Limitar a 10 sugestões

        return filtered;
    };

    // Função para mostrar autocomplete
    const showAutocompleteAtPosition = (query: string, x: number, y: number) => {
        if (!activeFile) return;

        // Se não há query, mostrar todas as sugestões para a linguagem
        const suggestions = query.trim()
            ? filterAutocompleteSuggestions(query, activeFile.language)
            : autocompleteDatabase.filter(s => s.language === activeFile.language || s.language === 'javascript').slice(0, 10);

        if (suggestions.length > 0) {
            setAutocompleteQuery(query);
            setAutocompleteSuggestions(suggestions);
            setSelectedSuggestionIndex(0);
            setAutocompletePosition({ x, y });
            setShowAutocomplete(true);
        } else {
            setShowAutocomplete(false);
        }
    };

    // Função para aplicar sugestão de autocomplete
    const applyAutocompleteSuggestion = (suggestion: AutocompleteSuggestion) => {
        if (!activeFile) return;

        const currentContent = activeFile.content;
        const lines = currentContent.split('\n');
        const currentLine = lines[lines.length - 1] || '';

        // Se a sugestão tem usage (código completo), usar ele
        if (suggestion.usage && suggestion.type === 'snippet') {
            // Para snippets, substituir a linha atual pelo código completo
            lines[lines.length - 1] = suggestion.usage;

            // Se o snippet tem múltiplas linhas, adicionar as linhas extras
            const snippetLines = suggestion.usage.split('\n');
            if (snippetLines.length > 1) {
                lines[lines.length - 1] = snippetLines[0];
                lines.push(...snippetLines.slice(1));
            }
        } else {
            // Para keywords e funções, substituir a última palavra
            const words = currentLine.split(' ');
            const lastWord = words[words.length - 1] || '';

            if (lastWord && lastWord.length > 0) {
                // Substituir a última palavra pela sugestão
                words[words.length - 1] = suggestion.text;
                lines[lines.length - 1] = words.join(' ');

                // Adicionar parênteses para funções
                if (suggestion.type === 'function' && !suggestion.text.includes('(')) {
                    lines[lines.length - 1] += '()';
                }

                // Adicionar dois pontos para classes Python
                if (suggestion.type === 'class' && activeFile.language === 'python') {
                    lines[lines.length - 1] += ':';
                }

                // Adicionar chaves para funções JavaScript/C#
                if (suggestion.type === 'function' && (activeFile.language === 'javascript' || activeFile.language === 'csharp')) {
                    lines[lines.length - 1] += ' {\n    \n}';
                }
            } else {
                // Se não há palavra, adicionar a sugestão
                lines[lines.length - 1] = currentLine + suggestion.text;

                // Adicionar formatação apropriada
                if (suggestion.type === 'function' && !suggestion.text.includes('(')) {
                    lines[lines.length - 1] += '()';
                }
                if (suggestion.type === 'class' && activeFile.language === 'python') {
                    lines[lines.length - 1] += ':';
                }
            }
        }

        const newContent = lines.join('\n');
        updateFileContent(activeFile.id, newContent);

        // Fechar o autocomplete
        setShowAutocomplete(false);
        setAutocompleteQuery('');
        setAutocompleteSuggestions([]);
    };

    // Função para ativar autocomplete manualmente
    const activateAutocomplete = () => {
        if (!activeFile) return;

        // Posicionar o autocomplete no centro da tela
        const x = window.innerWidth / 2 - 200;
        const y = window.innerHeight / 2 + 100;

        showAutocompleteAtPosition('', x, y);
    };

    // Função para processar teclas no editor
    const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Navegação por teclado para autocomplete
        if (showAutocomplete) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleAutocompleteNavigation('up');
                return;
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleAutocompleteNavigation('down');
                return;
            } else if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                handleAutocompleteSelect();
                return;
            } else if (e.key === 'Escape') {
                setShowAutocomplete(false);
                return;
            }
        }

        // Ativar autocomplete com Tab (como na versão anterior)
        if (e.key === 'Tab') {
            e.preventDefault();

            // Se o autocomplete já está aberto, selecionar a sugestão
            if (showAutocomplete) {
                handleAutocompleteSelect();
                return;
            }

            // Se não está aberto, ativar o autocomplete
            const currentContent = activeFile?.content || '';
            const lines = currentContent.split('\n');
            const currentLine = lines[lines.length - 1] || '';
            const words = currentLine.split(' ');
            const lastWord = words[words.length - 1] || '';

            // Se há uma palavra parcial, usar ela como query
            if (lastWord && lastWord.length > 0) {
                const x = window.innerWidth / 2 - 200;
                const y = window.innerHeight / 2 + 100;
                showAutocompleteAtPosition(lastWord, x, y);
            } else {
                // Se não há palavra, mostrar todas as sugestões
                activateAutocomplete();
            }
            return;
        }
    };

    // Função para processar mudanças no editor e ativar autocomplete automaticamente
    const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!activeFile) return;

        const value = e.target.value;
        updateFileContent(activeFile.id, value);
    };

    // Função para fechar autocomplete quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
                setShowAutocomplete(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Função para fechar autocomplete com Escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && showAutocomplete) {
                setShowAutocomplete(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showAutocomplete]);

    // Inicializar autocomplete quando um arquivo for aberto
    useEffect(() => {
        if (activeFile) {
            // Resetar estado do autocomplete
            setShowAutocomplete(false);
            setAutocompleteQuery('');
            setAutocompleteSuggestions([]);
            setSelectedSuggestionIndex(0);
        }
    }, [activeFile]);

    // Debug: Log quando o estado do autocomplete mudar
    useEffect(() => {
        console.log('Estado do autocomplete mudou:', {
            showAutocomplete,
            suggestionsCount: autocompleteSuggestions.length,
            selectedIndex: selectedSuggestionIndex
        });
    }, [showAutocomplete, autocompleteSuggestions.length, selectedSuggestionIndex]);

    // Função para navegar pelas sugestões com teclado
    const handleAutocompleteNavigation = (direction: 'up' | 'down') => {
        if (autocompleteSuggestions.length === 0) return;

        if (direction === 'up') {
            setSelectedSuggestionIndex(prev =>
                prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1
            );
        } else {
            setSelectedSuggestionIndex(prev =>
                prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0
            );
        }
    };

    // Função para aplicar a sugestão selecionada
    const handleAutocompleteSelect = () => {
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < autocompleteSuggestions.length) {
            applyAutocompleteSuggestion(autocompleteSuggestions[selectedSuggestionIndex]);
        }
    };

    // Templates de arquivos pré-definidos
    const fileTemplates: FileTemplate[] = [
        {
            name: 'React Component',
            extension: 'tsx',
            content: `import React from 'react';

interface Props {
    // Props aqui
}

export default function ComponentName({ }: Props) {
    return (
        <div>
            {/* Conteúdo aqui */}
        </div>
    );
}`,
            description: 'Componente React com TypeScript',
            category: 'React'
        },
        {
            name: 'Python Script',
            extension: 'py',
            content: `#!/usr/bin/env python3
"""
Descrição do script
"""

def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
            description: 'Script Python básico',
            category: 'Python'
        },
        {
            name: 'C# Class',
            extension: 'cs',
            content: `using System;

namespace YourNamespace
{
    public class YourClass
    {
        public string Name { get; set; }
        
        public YourClass(string name)
        {
            Name = name;
        }
        
        public void DoSomething()
        {
            Console.WriteLine($"Hello, {Name}!");
        }
    }
}`,
            description: 'Classe C# básica',
            category: 'C#'
        },
        {
            name: 'HTML Page',
            extension: 'html',
            content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Página</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Título da Página</h1>
    </header>
    
    <main>
        <p>Conteúdo principal aqui</p>
    </main>
    
    <footer>
        <p>&copy; 2024</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
            description: 'Página HTML completa',
            category: 'Web'
        },
        {
            name: 'CSS Styles',
            extension: 'css',
            content: `/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}`,
            description: 'Estilos CSS básicos',
            category: 'Web'
        },
        {
            name: 'JavaScript Module',
            extension: 'js',
            content: `/**
 * Descrição do módulo
 * @author Seu Nome
 * @version 1.0.0
 */

export class YourClass {
    constructor() {
        this.initialized = true;
    }
    
    doSomething() {
        return 'Hello from YourClass!';
    }
}

export default YourClass;`,
            description: 'Módulo JavaScript ES6',
            category: 'JavaScript'
        }
    ];

    const createNewFile = (template?: FileTemplate) => {
        const newFile: File = {
            id: Date.now().toString(),
            name: template ? `${template.name}.${template.extension}` : 'novo-arquivo.txt',
            content: template ? template.content : '',
            language: template ? getLanguageFromFileName(`.${template.extension}`) : 'text',
            isOpen: true,
            isModified: false,
            path: '/',
            size: 0,
            createdAt: new Date(),
            lastModified: new Date()
        };

        setFiles(prev => [...prev, newFile]);
        setActiveFileId(newFile.id);
        setShowTemplates(false);
        setShowCreateMenu(false);
    };

    const createNewFolder = () => {
        if (!newFolderName.trim()) return;

        const newFolder: Folder = {
            id: Date.now().toString(),
            name: newFolderName,
            path: '/',
            files: [],
            subfolders: []
        };

        setFolders(prev => [...prev, newFolder]);
        setNewFolderName('');
        setShowFolderDialog(false);
    };

    const renameFile = (fileId: string, newName: string) => {
        if (!newName.trim()) return;

        setFiles(prev => prev.map(f =>
            f.id === fileId ? { ...f, name: newName, lastModified: new Date() } : f
        ));

        setEditingFileName(null);
        setNewFileName('');
    };

    const duplicateFile = (fileId: string) => {
        const file = files.find(f => f.id === fileId);
        if (!file) return;

        const newFile: File = {
            ...file,
            id: Date.now().toString(),
            name: `${file.name.replace(/\.[^/.]+$/, '')}_copy${file.name.match(/\.[^/.]+$/)?.[0] || ''}`,
            isOpen: false,
            isModified: false,
            createdAt: new Date(),
            lastModified: new Date()
        };

        setFiles(prev => [...prev, newFile]);
    };

    const copyFile = (fileId: string) => {
        const file = files.find(f => f.id === fileId);
        if (file) {
            setClipboard({ type: 'copy', files: [file] });
        }
    };

    const cutFile = (fileId: string) => {
        const file = files.find(f => f.id === fileId);
        if (file) {
            setClipboard({ type: 'cut', files: [file] });
        }
    };

    const pasteFiles = (targetPath: string = '/') => {
        if (!clipboard) return;

        if (clipboard.type === 'copy') {
            const newFiles = clipboard.files.map(file => ({
                ...file,
                id: Date.now().toString() + Math.random(),
                name: `${file.name.replace(/\.[^/.]+$/, '')}_copy${file.name.match(/\.[^/.]+$/)?.[0] || ''}`,
                path: targetPath,
                createdAt: new Date(),
                lastModified: new Date()
            }));
            setFiles(prev => [...prev, ...newFiles]);
        } else if (clipboard.type === 'cut') {
            setFiles(prev => prev.map(f =>
                clipboard.files.some(cf => cf.id === f.id)
                    ? { ...f, path: targetPath, lastModified: new Date() }
                    : f
            ));
            setClipboard(null);
        }
    };

    const deleteFile = (fileId: string) => {
        setFiles(prev => prev.filter(f => f.id !== fileId));
        if (activeFileId === fileId) {
            const remainingFiles = files.filter(f => f.id !== fileId);
            if (remainingFiles.length > 0) {
                setActiveFileId(remainingFiles[0].id);
            } else {
                setActiveFileId(null);
            }
        }
    };

    const deleteMultipleFiles = () => {
        setFiles(prev => prev.filter(f => !selectedFiles.includes(f.id)));
        setSelectedFiles([]);
    };

    const selectFile = (fileId: string, isMultiSelect: boolean = false) => {
        if (isMultiSelect) {
            setSelectedFiles(prev =>
                prev.includes(fileId)
                    ? prev.filter(id => id !== fileId)
                    : [...prev, fileId]
            );
        } else {
            setSelectedFiles([fileId]);
        }
    };

    const exportFiles = () => {
        selectedFiles.forEach(fileId => {
            const file = files.find(f => f.id === fileId);
            if (file) {
                const blob = new Blob([file.content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name;
                a.click();
                URL.revokeObjectURL(url);
            }
        });
    };

    const importFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            Array.from(fileList).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target?.result as string;
                    const newFile: File = {
                        id: Date.now().toString() + Math.random(),
                        name: file.name,
                        content,
                        language: getLanguageFromFileName(file.name),
                        isOpen: false,
                        isModified: false,
                        path: '/',
                        size: file.size,
                        createdAt: new Date(),
                        lastModified: new Date()
                    };
                    setFiles(prev => [...prev, newFile]);
                };
                reader.readAsText(file);
            });
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                const newFile: File = {
                    id: Date.now().toString(),
                    name: file.name,
                    content,
                    language: getLanguageFromFileName(file.name),
                    isOpen: true,
                    isModified: false,
                    path: '/',
                    size: file.size,
                    createdAt: new Date(),
                    lastModified: new Date()
                };
                setFiles(prev => [...prev, newFile]);
                setActiveFileId(newFile.id);
            };
            reader.readAsText(file);
        }
    };

    const openFile = (fileId: string) => {
        setActiveFileId(fileId);
        setFiles(prev => prev.map(f => ({ ...f, isOpen: true })));
    };

    const closeFile = (fileId: string) => {
        setFiles(prev => prev.map(f =>
            f.id === fileId ? { ...f, isOpen: false } : f
        ));

        if (activeFileId === fileId) {
            const remainingFiles = files.filter(f => f.id !== fileId);
            if (remainingFiles.length > 0) {
                setActiveFileId(remainingFiles[0].id);
            } else {
                setActiveFileId(null);
            }
        }
    };

    const updateFileContent = (fileId: string, content: string) => {
        setFiles(prev => prev.map(f =>
            f.id === fileId ? { ...f, content, isModified: true } : f
        ));
    };

    const saveFile = (fileId: string) => {
        setFiles(prev => prev.map(f =>
            f.id === fileId ? { ...f, isModified: false } : f
        ));
    };

    const getLanguageFromFileName = (fileName: string): string => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        const languageMap: { [key: string]: string } = {
            'js': 'javascript',
            'ts': 'typescript',
            'jsx': 'javascript',
            'tsx': 'typescript',
            'html': 'html',
            'css': 'css',
            'py': 'python',
            'cs': 'csharp',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'php': 'php',
            'rb': 'ruby',
            'go': 'go',
            'rs': 'rust',
            'swift': 'swift',
            'kt': 'kotlin',
            'scala': 'scala',
            'r': 'r',
            'sql': 'sql',
            'json': 'json',
            'xml': 'xml',
            'yaml': 'yaml',
            'yml': 'yaml',
            'md': 'markdown',
            'txt': 'text'
        };
        return languageMap[extension || ''] || 'text';
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const getLanguageIcon = (language: string) => {
        const iconMap: { [key: string]: React.ReactNode } = {
            'javascript': <Code className="w-4 h-4 text-yellow-500" />,
            'typescript': <Code className="w-4 h-4 text-blue-500" />,
            'html': <Code className="w-4 h-4 text-orange-500" />,
            'css': <Code className="w-4 h-4 text-blue-400" />,
            'python': <Code className="w-4 h-4 text-green-500" />,
            'csharp': <Code className="w-4 h-4 text-purple-500" />,
            'java': <Code className="w-4 h-4 text-red-500" />,
            'cpp': <Code className="w-4 h-4 text-blue-600" />,
            'c': <Code className="w-4 h-4 text-blue-700" />,
            'php': <Code className="w-4 h-4 text-purple-400" />,
            'ruby': <Code className="w-4 h-4 text-red-400" />,
            'go': <Code className="w-4 h-4 text-blue-500" />,
            'rust': <Code className="w-4 h-4 text-orange-600" />,
            'swift': <Code className="w-4 h-4 text-orange-500" />,
            'kotlin': <Code className="w-4 h-4 text-purple-600" />,
            'scala': <Code className="w-4 h-4 text-red-600" />,
            'r': <Code className="w-4 h-4 text-blue-500" />,
            'sql': <Code className="w-4 h-4 text-blue-400" />,
            'json': <Code className="w-4 h-4 text-green-400" />,
            'xml': <Code className="w-4 h-4 text-orange-400" />,
            'yaml': <Code className="w-4 h-4 text-purple-400" />,
            'markdown': <Code className="w-4 h-4 text-blue-400" />,
            'text': <FileText className="w-4 h-4 text-gray-400" />
        };
        return iconMap[language] || <FileText className="w-4 h-4 text-gray-400" />;
    };



    // Criar arquivo de teste HTML se não houver arquivos
    useEffect(() => {
        if (files.length === 0) {
            const testFile: File = {
                id: 'test-html',
                name: 'test.html',
                content: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <title>Teste</title>\n</head>\n<body>\n    \n</body>\n</html>',
                language: 'html',
                isOpen: true,
                isModified: false,
                path: '/',
                size: 0,
                createdAt: new Date(),
                lastModified: new Date()
            };
            setFiles([testFile]);
            setActiveFileId(testFile.id);
        }
    }, [files.length]);

    // Função para executar código no navegador
    const executeCode = (file: File) => {
        if (!file) return;

        try {
            switch (file.language) {
                case 'html':
                    // Para HTML, abrir em nova aba
                    const htmlBlob = new Blob([file.content], { type: 'text/html' });
                    const htmlUrl = URL.createObjectURL(htmlBlob);
                    window.open(htmlUrl, '_blank');
                    break;

                case 'javascript':
                    // Para JavaScript, executar no console
                    try {
                        eval(file.content);
                        console.log('✅ Código JavaScript executado com sucesso!');
                    } catch (error) {
                        console.error('❌ Erro na execução do JavaScript:', error);
                    }
                    break;

                case 'css':
                    // Para CSS, aplicar ao documento atual
                    const style = document.createElement('style');
                    style.textContent = file.content;
                    document.head.appendChild(style);
                    console.log('✅ Estilos CSS aplicados com sucesso!');
                    break;

                case 'python':
                    // Para Python, mostrar mensagem de execução
                    console.log('🐍 Código Python detectado!');
                    console.log('Para executar Python, use o botão "🤖 AI Assistant" para análise ou copie o código para um ambiente Python.');
                    break;

                case 'csharp':
                    // Para C#, mostrar mensagem de execução
                    console.log('🔷 Código C# detectado!');
                    console.log('Para executar C#, use o botão "🤖 AI Assistant" para análise ou copie o código para o Visual Studio.');
                    break;

                default:
                    console.log(`📝 Arquivo ${file.language} detectado. Use o botão "🤖 AI Assistant" para análise inteligente.`);
                    break;
            }
        } catch (error) {
            console.error('❌ Erro ao executar código:', error);
        }
    };

    return (
        <div className={`h-screen flex ${theme === 'dark' ? 'dark' : ''}`}>
            {/* Sidebar - Design Moderno com Gradientes */}
            <div className={`bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'w-20' : 'w-72'
                } shadow-2xl border-r border-gray-700/50`}>
                {/* Header com Logo Animado */}
                <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg animate-pulse">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h1 className={`font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-500 ${sidebarCollapsed ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                                }`}>
                                Fenix IDE
                            </h1>
                        </div>
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110"
                        >
                            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* File Operations - Botões com Hover Effects */}
                <div className="p-4 space-y-3">
                    <div className="relative">
                        <button
                            onClick={() => setShowCreateMenu(!showCreateMenu)}
                            className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                        >
                            <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                            {!sidebarCollapsed && <span className="font-medium">Criar</span>}
                        </button>

                        {/* Menu de Criação */}
                        {showCreateMenu && !sidebarCollapsed && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl z-50">
                                <div className="p-2 space-y-1">
                                    <button
                                        onClick={() => createNewFile()}
                                        className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                                    >
                                        <FilePlus className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm">Arquivo Simples</span>
                                    </button>
                                    <button
                                        onClick={() => setShowTemplates(true)}
                                        className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                                    >
                                        <Code className="w-4 h-4 text-green-400" />
                                        <span className="text-sm">Usar Template</span>
                                    </button>
                                    <button
                                        onClick={() => setShowFolderDialog(true)}
                                        className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                                    >
                                        <FolderPlus className="w-4 h-4 text-purple-400" />
                                        <span className="text-sm">Nova Pasta</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <label className="block">
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".txt,.js,.ts,.jsx,.tsx,.html,.css,.py,.cs,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.scala,.r,.sql,.json,.xml,.yaml,.yml,.md"
                        />
                        <div className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
                            <Folder className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                            {!sidebarCollapsed && <span className="font-medium">Abrir Arquivo</span>}
                        </div>
                    </label>

                    {/* Botões de Operações Avançadas */}
                    {!sidebarCollapsed && (
                        <>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => pasteFiles()}
                                    disabled={!clipboard}
                                    className="flex-1 flex items-center justify-center p-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                                    title="Colar arquivos"
                                >
                                    <Copy className="w-4 h-4 text-white" />
                                </button>
                                <button
                                    onClick={() => exportFiles()}
                                    disabled={selectedFiles.length === 0}
                                    className="flex-1 flex items-center justify-center p-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                                    title="Exportar arquivos selecionados"
                                >
                                    <Download className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            {selectedFiles.length > 0 && (
                                <button
                                    onClick={deleteMultipleFiles}
                                    className="w-full flex items-center justify-center space-x-2 p-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    <Trash2 className="w-4 h-4 text-white" />
                                    <span className="text-sm font-medium">Excluir Selecionados ({selectedFiles.length})</span>
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Files List - Design Elegante */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                        <h3 className={`font-semibold mb-4 text-gray-300 transition-all duration-500 ${sidebarCollapsed ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                            }`}>
                            📁 Arquivos
                        </h3>
                        <div className="space-y-2">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className={`group flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${activeFileId === file.id
                                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 shadow-lg scale-105'
                                        : selectedFiles.includes(file.id)
                                            ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/50 shadow-lg scale-105'
                                            : 'hover:bg-gray-700/50 hover:scale-102 border border-transparent'
                                        }`}
                                    onClick={(e) => {
                                        if (e.ctrlKey || e.metaKey) {
                                            selectFile(file.id, true);
                                        } else {
                                            selectFile(file.id, false);
                                            openFile(file.id);
                                        }
                                    }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        setShowFileMenu(file.id);
                                    }}
                                >
                                    <div className="flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={selectedFiles.includes(file.id)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                selectFile(file.id, true);
                                            }}
                                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                    </div>
                                    <div className="flex-shrink-0">
                                        {getLanguageIcon(file.language)}
                                    </div>
                                    {!sidebarCollapsed && (
                                        <>
                                            {editingFileName === file.id ? (
                                                <input
                                                    ref={fileNameInputRef}
                                                    type="text"
                                                    value={newFileName}
                                                    onChange={(e) => setNewFileName(e.target.value)}
                                                    onBlur={() => renameFile(file.id, newFileName)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            renameFile(file.id, newFileName);
                                                        } else if (e.key === 'Escape') {
                                                            setEditingFileName(null);
                                                            setNewFileName('');
                                                        }
                                                    }}
                                                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="flex-1 truncate text-sm font-medium group-hover:text-blue-300 transition-colors">
                                                    {file.name}
                                                </span>
                                            )}
                                            <div className="flex items-center space-x-1">
                                                {file.isModified && (
                                                    <span className="text-yellow-400 animate-pulse">●</span>
                                                )}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingFileName(file.id);
                                                        setNewFileName(file.name);
                                                    }}
                                                    className="p-1 hover:bg-gray-600/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                                    title="Renomear"
                                                >
                                                    <Edit3 className="w-3 h-3 text-gray-400 hover:text-blue-400" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        closeFile(file.id);
                                                    }}
                                                    className="p-1 hover:bg-gray-600/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                                    title="Fechar"
                                                >
                                                    <X className="w-3 h-3 text-gray-400 hover:text-red-400" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Actions - Botões Premium */}
                <div className="p-4 border-t border-gray-700/50 space-y-3">
                    <button
                        onClick={() => setAiAssistantOpen(true)}
                        className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                        title="AI Assistant"
                    >
                        <Bot className="w-5 h-5 text-white group-hover:animate-bounce" />
                        {!sidebarCollapsed && <span className="font-medium">AI Assistant</span>}
                    </button>

                    <button
                        onClick={() => setHotReloadOpen(true)}
                        className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                        title="Hot Reload"
                    >
                        <Zap className="w-5 h-5 text-white group-hover:animate-pulse" />
                        {!sidebarCollapsed && <span className="font-medium">Hot Reload</span>}
                    </button>

                    <button
                        onClick={() => setGamificationOpen(true)}
                        className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                        title="Gamificação"
                    >
                        <Trophy className="w-5 h-5 text-white group-hover:animate-pulse" />
                        {!sidebarCollapsed && <span className="font-medium">Gamificação</span>}
                    </button>
                </div>
            </div>

            {/* Main Content - Layout Moderno */}
            <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Top Bar - Design Premium */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
                                {activeFile ? getLanguageIcon(activeFile.language) : <Code className="w-5 h-5 text-white" />}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {activeFile ? activeFile.name : 'Fenix IDE 2.0 - Online'}
                                </h2>
                                {activeFile && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {activeFile.language.toUpperCase()} • {activeFile.content.split('\n').length} linhas
                                    </p>
                                )}
                                {!activeFile && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        IDE Completa Funcionando no Navegador
                                    </p>
                                )}
                            </div>
                        </div>

                        {activeFile && (
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => saveFile(activeFile.id)}
                                    className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm"
                                    title="Salvar"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Salvar</span>
                                </button>
                                <button
                                    onClick={() => executeCode(activeFile)}
                                    className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm"
                                    title="Executar no Navegador"
                                >
                                    <Play className="w-4 h-4" />
                                    <span>Executar</span>
                                </button>
                                <button
                                    onClick={() => deleteFile(activeFile.id)}
                                    className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-400 hover:to-red-500 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm"
                                    title="Deletar"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Deletar</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Editor Area - Design Premium */}
                <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                    {/* Top Bar - Barra Superior Premium */}
                    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-b border-gray-600/50 p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                                <span className="text-gray-400 text-sm font-mono">
                                    {activeFile ? `${activeFile.name} - ${activeFile.language.toUpperCase()}` : 'Fenix IDE 2.0 - Online'}
                                </span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => activeFile && saveFile(activeFile.id)}
                                    disabled={!activeFile || !activeFile.isModified}
                                    className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed group text-sm"
                                    title="Salvar arquivo"
                                >
                                    <Save className="w-3 h-3 text-white group-hover:animate-bounce" />
                                    <span className="text-white font-medium">Salvar</span>
                                </button>

                                <button
                                    onClick={() => activeFile && executeCode(activeFile)}
                                    disabled={!activeFile}
                                    className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed group text-sm"
                                    title="Executar código no navegador"
                                >
                                    <Play className="w-3 h-3 text-white group-hover:animate-pulse" />
                                    <span className="text-white font-medium">Executar</span>
                                </button>

                                <button
                                    onClick={toggleTheme}
                                    className="p-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:scale-110 shadow-lg"
                                    title="Alternar Tema"
                                >
                                    {theme === 'light' ? '🌙' : '☀️'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Editor Content */}
                    <div className="flex-1 flex">
                        {/* Editor Principal */}
                        <div className="flex-1 p-6">
                            {activeFile ? (
                                <div className="h-full bg-gray-800 border border-gray-600 rounded-xl shadow-2xl overflow-hidden">
                                    {/* Editor Header */}
                                    <div className="bg-gray-700 border-b border-gray-600 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {getLanguageIcon(activeFile.language)}
                                            <span className="text-white font-medium">{activeFile.name}</span>
                                            {activeFile.isModified && (
                                                <span className="text-yellow-400 animate-pulse">●</span>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-400 text-sm">
                                                {activeFile.content.length} caracteres
                                            </span>
                                            {showAutocomplete && (
                                                <span className="text-green-400 text-xs animate-pulse bg-green-900/20 px-2 py-1 rounded">
                                                    Autocomplete Ativo
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Editor Content */}
                                    <div className="p-4 h-full">
                                        <textarea
                                            value={activeFile.content}
                                            onChange={handleEditorChange}
                                            onKeyDown={handleEditorKeyDown}
                                            className="w-full h-full bg-transparent text-white font-mono text-sm resize-none outline-none"
                                            placeholder="Digite seu código aqui... Use Tab para autocomplete automático"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                            <Code className="w-12 h-12 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-4">🚀 Fenix IDE 2.0 - Online</h2>
                                        <p className="text-gray-400 mb-6 max-w-md">
                                            IDE completa funcionando diretamente no seu navegador!
                                            Crie arquivos, edite código e execute projetos sem downloads.
                                        </p>
                                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <Lightbulb className="w-4 h-4 text-blue-400" />
                                                <span>Autocomplete Inteligente</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <ZapIcon className="w-4 h-4 text-yellow-400" />
                                                <span>Hot Reload</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Bot className="w-4 h-4 text-purple-400" />
                                                <span>AI Assistant</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                                            <p className="text-blue-300 text-sm">
                                                💡 <strong>Dica:</strong> Use Tab para ativar o autocomplete inteligente!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Panel - Painel Direito Premium */}
                        <div className="w-80 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 border-l border-gray-600/50">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-blue-400" />
                                    <span>Insights</span>
                                </h3>

                                {activeFile ? (
                                    <div className="space-y-4">
                                        {/* File Stats */}
                                        <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                                            <h4 className="text-white font-medium mb-3">Estatísticas do Arquivo</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Linhas:</span>
                                                    <span className="text-white">{activeFile.content.split('\n').length}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Caracteres:</span>
                                                    <span className="text-white">{activeFile.content.length}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Palavras:</span>
                                                    <span className="text-white">{activeFile.content.split(/\s+/).filter(word => word.length > 0).length}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Linguagem:</span>
                                                    <span className="text-white">{activeFile.language}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Autocomplete Status */}
                                        <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                                            <h4 className="text-white font-medium mb-3">Status do Autocomplete</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Status:</span>
                                                    <span className={`${showAutocomplete ? 'text-green-400' : 'text-gray-400'}`}>
                                                        {showAutocomplete ? 'Ativo' : 'Inativo'}
                                                    </span>
                                                </div>
                                                {showAutocomplete && (
                                                    <>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Sugestões:</span>
                                                            <span className="text-white">{autocompleteSuggestions.length}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Query:</span>
                                                            <span className="text-white">{autocompleteQuery || 'Nenhuma'}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <p>Abra um arquivo para ver insights</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sistema de Autocomplete */}
                {showAutocomplete && (
                    <div
                        ref={autocompleteRef}
                        className="fixed z-50 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl max-w-md w-full"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Header do Autocomplete */}
                        <div className="bg-gray-700 border-b border-gray-600 px-4 py-3 rounded-t-xl">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-medium flex items-center space-x-2">
                                    <Lightbulb className="w-4 h-4 text-blue-400" />
                                    <span>Autocomplete</span>
                                </h3>
                                <span className="text-gray-400 text-sm">
                                    {autocompleteSuggestions.length} sugestões
                                </span>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={autocompleteQuery}
                                    onChange={(e) => {
                                        setAutocompleteQuery(e.target.value);
                                        const suggestions = filterAutocompleteSuggestions(e.target.value, activeFile?.language || 'javascript');
                                        setAutocompleteSuggestions(suggestions);
                                        setSelectedSuggestionIndex(0);
                                    }}
                                    placeholder="Digite para filtrar..."
                                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Lista de Sugestões */}
                        <div className="max-h-64 overflow-y-auto">
                            {autocompleteSuggestions.map((suggestion, index) => (
                                <div
                                    key={suggestion.id}
                                    className={`p-3 cursor-pointer transition-all duration-200 ${index === selectedSuggestionIndex
                                        ? 'bg-blue-600/20 border-l-4 border-blue-500'
                                        : 'hover:bg-gray-700/50'
                                        }`}
                                    onClick={() => applyAutocompleteSuggestion(suggestion)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            {suggestion.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-white font-medium">{suggestion.text}</span>
                                                <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded-full">
                                                    {suggestion.type}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-sm mt-1">{suggestion.description}</p>
                                            {suggestion.usage && (
                                                <p className="text-gray-400 text-xs mt-1 font-mono bg-gray-700 px-2 py-1 rounded">
                                                    {suggestion.usage}
                                                </p>
                                            )}
                                            <div className="flex items-center space-x-2 mt-2">
                                                <span className="text-xs text-gray-500 bg-gray-600 px-2 py-1 rounded-full">
                                                    {suggestion.category}
                                                </span>
                                                <span className="text-xs text-gray-500 bg-gray-600 px-2 py-1 rounded-full">
                                                    {suggestion.language}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer do Autocomplete */}
                        <div className="bg-gray-700 border-t border-gray-600 px-4 py-2 rounded-b-xl">
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center space-x-4">
                                    <span>↑↓ Navegar</span>
                                    <span>Enter/Tab Selecionar</span>
                                    <span>Esc Fechar</span>
                                </div>
                                <span className="text-blue-400">
                                    {selectedSuggestionIndex + 1} de {autocompleteSuggestions.length}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modais */}
            <AIAssistant
                isOpen={aiAssistantOpen}
                onClose={() => setAiAssistantOpen(false)}
                currentFile={activeFile}
                onApplySuggestion={(suggestion) => {
                    if (activeFile) {
                        updateFileContent(activeFile.id, suggestion);
                    }
                }}
            />

            <HotReload
                isOpen={hotReloadOpen}
                onClose={() => setHotReloadOpen(false)}
                currentFile={activeFile}
                onReload={(content) => {
                    if (activeFile) {
                        updateFileContent(activeFile.id, content);
                    }
                }}
            />

            <GamificationSystem
                isOpen={gamificationOpen}
                onClose={() => setGamificationOpen(false)}
                currentUser={{
                    id: '1',
                    name: 'Desenvolvedor Fenix',
                    level: 8,
                    experience: 1250,
                    achievements: ['first-code', 'bookworm']
                }}
            />

            {/* Modais para funcionalidades avançadas */}

            {/* Modal de Templates */}
            {showTemplates && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 border border-gray-600 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-600">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">Templates de Arquivos</h2>
                                <button
                                    onClick={() => setShowTemplates(false)}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>
                            <p className="text-gray-400 mt-2">Escolha um template para criar um novo arquivo</p>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {fileTemplates.map((template) => (
                                    <div
                                        key={template.name}
                                        className="bg-gray-700 border border-gray-600 rounded-xl p-4 hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                                        onClick={() => createNewFile(template)}
                                    >
                                        <div className="flex items-center space-x-3 mb-3">
                                            {getLanguageIcon(getLanguageFromFileName(`.${template.extension}`))}
                                            <div>
                                                <h3 className="font-semibold text-white">{template.name}</h3>
                                                <span className="text-xs text-gray-400">{template.extension}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-3">{template.description}</p>
                                        <span className="inline-block px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                                            {template.category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Criação de Pasta */}
            {showFolderDialog && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 border border-gray-600 rounded-2xl shadow-2xl max-w-md w-full mx-4">
                        <div className="p-6 border-b border-gray-600">
                            <h2 className="text-2xl font-bold text-white">Nova Pasta</h2>
                            <p className="text-gray-400 mt-2">Digite o nome da nova pasta</p>
                        </div>

                        <div className="p-6">
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="Nome da pasta"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        createNewFolder();
                                    } else if (e.key === 'Escape') {
                                        setShowFolderDialog(false);
                                        setNewFolderName('');
                                    }
                                }}
                            />

                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={() => {
                                        setShowFolderDialog(false);
                                        setNewFolderName('');
                                    }}
                                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={createNewFolder}
                                    disabled={!newFolderName.trim()}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
                                >
                                    Criar Pasta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Menu de Contexto para Arquivos */}
            {showFileMenu && (
                <div className="fixed inset-0 z-50" onClick={() => setShowFileMenu(null)}>
                    <div
                        className="absolute bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-2 min-w-[200px]"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-1">
                            <button
                                onClick={() => {
                                    const file = files.find(f => f.id === showFileMenu);
                                    if (file) {
                                        setEditingFileName(file.id);
                                        setNewFileName(file.name);
                                    }
                                    setShowFileMenu(null);
                                }}
                                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                            >
                                <Edit3 className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-white">Renomear</span>
                            </button>
                            <button
                                onClick={() => {
                                    duplicateFile(showFileMenu);
                                    setShowFileMenu(null);
                                }}
                                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                            >
                                <Copy className="w-4 h-4 text-green-400" />
                                <span className="text-sm text-white">Duplicar</span>
                            </button>
                            <button
                                onClick={() => {
                                    copyFile(showFileMenu);
                                    setShowFileMenu(null);
                                }}
                                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                            >
                                <Copy className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-white">Copiar</span>
                            </button>
                            <button
                                onClick={() => {
                                    cutFile(showFileMenu);
                                    setShowFileMenu(null);
                                }}
                                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                            >
                                <Scissors className="w-4 h-4 text-orange-400" />
                                <span className="text-sm text-white">Recortar</span>
                            </button>
                            <hr className="border-gray-600 my-2" />
                            <button
                                onClick={() => {
                                    deleteFile(showFileMenu);
                                    setShowFileMenu(null);
                                }}
                                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                            >
                                <Trash2 className="w-4 h-4 text-red-400" />
                                <span className="text-sm text-white">Excluir</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
