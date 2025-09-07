'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Save,
    Play,
    Settings,
    Maximize2,
    Minimize2,
    Type,
    Palette,
    Eye,
    EyeOff,
    Lightbulb,
    Code,
    FileText,
    Zap,
    X,
    Maximize,
    Minimize
} from 'lucide-react';


interface AdvancedEditorProps {
    content: string;
    language: string;
    filename: string;
    onContentChange: (content: string) => void;
    onSave: () => void;
    onExecute: () => void;
    theme: 'dark' | 'light';
}

declare global {
    interface Window {
        monaco: any;
    }
}

// Temas VS Code completos
const vsCodeThemes = {
    dark: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        selection: '#264f78',
        selectionBackground: '#264f78',
        lineNumbers: '#858585',
        activeLineNumber: '#c6c6c6',
        cursor: '#aeafad',
        cursorBackground: '#aeafad',
        bracketMatching: '#ffd700',
        bracketMatchingBackground: '#ffd700',
        findMatch: '#515c6a',
        findMatchBackground: '#515c6a',
        findMatchBorder: '#515c6a',
        currentFindMatch: '#f39c12',
        currentFindMatchBackground: '#f39c12',
        currentFindMatchBorder: '#f39c12',
        minimap: {
            background: '#1e1e1e',
            slider: '#424242',
            sliderActive: '#4f4f4f',
            sliderHover: '#4f4f4f'
        },
        scrollbar: {
            slider: '#424242',
            sliderHover: '#4f4f4f',
            sliderActive: '#4f4f4f'
        },
        editor: {
            background: '#1e1e1e',
            foreground: '#d4d4d4',
            lineHighlightBackground: '#2a2d2e',
            lineHighlightBorder: '#454545',
            rangeHighlightBackground: '#2a2d2e',
            rangeHighlightBorder: '#454545',
            bracketPairGuide: {
                activeBackground1: '#424242',
                activeBackground2: '#424242'
            }
        },
        sidebar: {
            background: '#252526',
            foreground: '#cccccc',
            border: '#3c3c3c'
        },
        panel: {
            background: '#1e1e1e',
            foreground: '#cccccc',
            border: '#3c3c3c'
        },
        statusBar: {
            background: '#007acc',
            foreground: '#ffffff',
            border: '#007acc'
        },
        titleBar: {
            background: '#3c3c3c',
            foreground: '#cccccc',
            border: '#3c3c3c'
        }
    },
    light: {
        background: '#ffffff',
        foreground: '#000000',
        selection: '#add6ff',
        selectionBackground: '#add6ff',
        lineNumbers: '#858585',
        activeLineNumber: '#000000',
        cursor: '#000000',
        cursorBackground: '#000000',
        bracketMatching: '#ffd700',
        bracketMatchingBackground: '#ffd700',
        findMatch: '#e8eaed',
        findMatchBackground: '#e8eaed',
        findMatchBorder: '#e8eaed',
        currentFindMatch: '#f39c12',
        currentFindMatchBackground: '#f39c12',
        currentFindMatchBorder: '#f39c12',
        minimap: {
            background: '#ffffff',
            slider: '#c1c1c1',
            sliderActive: '#a8a8a8',
            sliderHover: '#a8a8a8'
        },
        scrollbar: {
            slider: '#c1c1c1',
            sliderHover: '#a8a8a8',
            sliderActive: '#a8a8a8'
        },
        editor: {
            background: '#ffffff',
            foreground: '#000000',
            lineHighlightBackground: '#f7f7f7',
            lineHighlightBorder: '#e7e7e7',
            rangeHighlightBackground: '#f7f7f7',
            rangeHighlightBorder: '#e7e7e7',
            bracketPairGuide: {
                activeBackground1: '#e7e7e7',
                activeBackground2: '#e7e7e7'
            }
        },
        sidebar: {
            background: '#f3f3f3',
            foreground: '#000000',
            border: '#e7e7e7'
        },
        panel: {
            background: '#ffffff',
            foreground: '#000000',
            border: '#e7e7e7'
        },
        statusBar: {
            background: '#007acc',
            foreground: '#ffffff',
            border: '#007acc'
        },
        titleBar: {
            background: '#dddddd',
            foreground: '#000000',
            border: '#dddddd'
        }
    }
};

// Cores para sugestões de código (VS Code style)
const suggestionColors = {
    dark: {
        background: '#2d2d30',
        border: '#3c3c3c',
        selectedBackground: '#094771',
        selectedBorder: '#007acc',
        hoverBackground: '#3c3c3c',
        text: '#cccccc',
        detail: '#6a9955',
        documentation: '#cccccc',
        icon: {
            class: '#4ec9b0',
            color: '#4ec9b0',
            constant: '#4fc1ff',
            enum: '#4ec9b0',
            enumMember: '#4ec9b0',
            field: '#9cdcfe',
            function: '#dcdcaa',
            interface: '#4ec9b0',
            keyword: '#569cd6',
            method: '#dcdcaa',
            module: '#4ec9b0',
            namespace: '#4ec9b0',
            property: '#9cdcfe',
            snippet: '#dcdcaa',
            string: '#ce9178',
            type: '#4ec9b0',
            unit: '#b5cea8',
            variable: '#9cdcfe'
        }
    },
    light: {
        background: '#ffffff',
        border: '#e7e7e7',
        selectedBackground: '#e3f2fd',
        selectedBorder: '#2196f3',
        hoverBackground: '#f5f5f5',
        text: '#000000',
        detail: '#6a9955',
        documentation: '#000000',
        icon: {
            class: '#267f99',
            color: '#267f99',
            constant: '#0000ff',
            enum: '#267f99',
            enumMember: '#267f99',
            field: '#001080',
            function: '#795e26',
            interface: '#267f99',
            keyword: '#0000ff',
            method: '#795e26',
            module: '#267f99',
            namespace: '#267f99',
            property: '#001080',
            snippet: '#795e26',
            string: '#a31515',
            type: '#267f99',
            unit: '#098658',
            variable: '#001080'
        }
    }
};

export default function AdvancedEditor({
    content,
    language,
    filename,
    onContentChange,
    onSave,
    onExecute,
    theme
}: AdvancedEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [editor, setEditor] = useState<any>(null);
    const [monacoInstance, setMonacoInstance] = useState<any>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [wordWrap, setWordWrap] = useState(true);
    const [minimap, setMinimap] = useState(false);
    const [lineNumbers, setLineNumbers] = useState(true);
    const [currentLine, setCurrentLine] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const [currentTheme, setCurrentTheme] = useState(theme);

    // Sincronizar tema com prop
    useEffect(() => {
        setCurrentTheme(theme);
    }, [theme]);

    // REMOVIDO: Sistema de sugestões antigo - CONFLITANDO COM FENIXIDE2
    // const [showSuggestions, setShowSuggestions] = useState(false);
    // const [suggestions, setSuggestions] = useState<any[]>([]);
    // const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    const [editorContent, setEditorContent] = useState(content);
    const [cursorPositionState, setCursorPositionState] = useState({ line: 0, column: 0 });
    const [currentLineState, setCurrentLineState] = useState('');

    // Atualizar editorContent quando content mudar
    useEffect(() => {
        setEditorContent(content);
    }, [content]);

    // Atualizar tema quando theme mudar
    useEffect(() => {
        setCurrentTheme(theme);
        if (editor) {
            applyTheme(theme);
        }
    }, [theme, editor]);

    // Aplicar tema ao editor
    const applyTheme = (themeName: 'dark' | 'light') => {
        if (!editor || !monacoInstance) return;

        const themeData = vsCodeThemes[themeName];

        // Aplicar tema ao Monaco
        monacoInstance.editor.defineTheme(`vs-code-${themeName}`, {
            base: themeName === 'dark' ? 'vs-dark' : 'vs',
            inherit: true,
            rules: [
                { token: 'comment', foreground: themeName === 'dark' ? '#6a9955' : '#008000' },
                { token: 'keyword', foreground: themeName === 'dark' ? '#569cd6' : '#0000ff' },
                { token: 'string', foreground: themeName === 'dark' ? '#ce9178' : '#a31515' },
                { token: 'number', foreground: themeName === 'dark' ? '#b5cea8' : '#098658' },
                { token: 'type', foreground: themeName === 'dark' ? '#4ec9b0' : '#267f99' },
                { token: 'function', foreground: themeName === 'dark' ? '#dcdcaa' : '#795e26' },
                { token: 'variable', foreground: themeName === 'dark' ? '#9cdcfe' : '#001080' }
            ],
            colors: {
                'editor.background': themeData.editor.background,
                'editor.foreground': themeData.editor.foreground,
                'editor.lineHighlightBackground': themeData.editor.lineHighlightBackground,
                'editor.lineHighlightBorder': themeData.editor.lineHighlightBorder,
                'editor.selectionBackground': themeData.selectionBackground,
                'editor.inactiveSelectionBackground': themeData.selectionBackground,
                'editor.findMatchBackground': themeData.findMatchBackground,
                'editor.findMatchBorder': themeData.findMatchBorder,
                'editor.currentFindMatchBackground': themeData.currentFindMatchBackground,
                'editor.currentFindMatchBorder': themeData.currentFindMatchBorder,
                'editor.bracketMatchBackground': themeData.bracketMatchingBackground,
                'editor.bracketMatchBorder': themeData.bracketMatching,
                'editorCursor.foreground': themeData.cursor,
                'editorCursor.background': themeData.cursorBackground,
                'editorLineNumber.foreground': themeData.lineNumbers,
                'editorLineNumber.activeForeground': themeData.activeLineNumber,
                'editorLineNumber.background': themeData.editor.background,
                'editorMinimap.background': themeData.minimap.background,
                'editorMinimap.sliderBackground': themeData.minimap.slider,
                'editorMinimap.sliderHoverBackground': themeData.minimap.sliderHover,
                'editorMinimap.sliderActiveBackground': themeData.minimap.sliderActive,
                'scrollbarSlider.background': themeData.scrollbar.slider,
                'scrollbarSlider.hoverBackground': themeData.scrollbar.sliderHover,
                'scrollbarSlider.activeBackground': themeData.scrollbar.sliderActive,
                'sideBar.background': themeData.sidebar.background,
                'sideBar.foreground': themeData.sidebar.foreground,
                'sideBar.border': themeData.sidebar.border,
                'panel.background': themeData.panel.background,
                'panel.foreground': themeData.panel.foreground,
                'panel.border': themeData.panel.border,
                'statusBar.background': themeData.statusBar.background,
                'statusBar.foreground': themeData.statusBar.foreground,
                'statusBar.border': themeData.statusBar.border,
                'titleBar.activeBackground': themeData.titleBar.background,
                'titleBar.activeForeground': themeData.titleBar.foreground,
                'titleBar.border': themeData.titleBar.border
            }
        });

        monacoInstance.editor.setTheme(`vs-code-${themeName}`);
    };

    // NOVO: Função para detectar palavra antes do cursor
    const getWordBeforeCursor = (content: string, cursorPos: number): string => {
        const textBeforeCursor = content.substring(0, cursorPos);
        const words = textBeforeCursor.split(/\s+/);
        return words[words.length - 1] || '';
    };

    // NOVO: Função para detectar linguagem do arquivo
    const getCurrentFileLanguage = (): string => {
        if (!filename) return 'plaintext';
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'js': case 'jsx': case 'mjs': return 'javascript';
            case 'ts': case 'tsx': return 'typescript';
            case 'py': case 'pyw': case 'pyi': return 'python';
            case 'html': case 'htm': case 'xhtml': return 'html';
            case 'css': case 'scss': case 'sass': case 'less': return 'css';
            case 'cs': case 'csx': return 'csharp';
            case 'java': return 'java';
            case 'cpp': case 'cc': case 'cxx': case 'hpp': case 'h': return 'cpp';
            default: return 'javascript';
        }
    };

    // REMOVIDO: Sistema de sugestões antigo - CONFLITANDO COM FENIXIDE2
    // const generateSuggestions = useCallback((word: string, language: string) => {
    //     const lang = language.toLowerCase();
    //     let newSuggestions: any[] = [];

    //     if (lang === 'html' || lang === 'htm') {
    //         newSuggestions = [
    //             { label: '!', kind: 'snippet', detail: 'HTML5 Template', insertText: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Título}</title>\n</head>\n<body>\n\t${2:Conteúdo}\n</body>\n</html>' },
    //             { label: 'div', kind: 'class', detail: 'HTML Container', insertText: '<div>${1:conteúdo}</div>' },
    //             { label: 'span', kind: 'class', detail: 'HTML Inline', insertText: '<span>${1:texto}</span>' },
    //             { label: 'p', kind: 'class', detail: 'HTML Paragraph', insertText: '<p>${1:parágrafo}</p>' },
    //             { label: 'h1', kind: 'class', detail: 'HTML Heading 1', insertText: '<h1>${1:título}</h1>' },
    //             { label: 'h2', kind: 'class', detail: 'HTML Heading 2', insertText: '<h2>${1:título}</h2>' },
    //             { label: 'ul', kind: 'class', detail: 'HTML List', insertText: '<ul>\n\t<li>${1:item 1}</li>\n\t<li>${2:item 2}</li>\n</ul>' },
    //             { label: 'a', kind: 'class', detail: 'HTML Link', insertText: '<a href="${1:#}">${2:texto}</a>' },
    //             { label: 'img', kind: 'class', detail: 'HTML Image', insertText: '<img src="${1:imagem.jpg}" alt="${2:descrição}">' },
    //             { label: 'form', kind: 'class', detail: 'HTML Form', insertText: '<form action="${1:/submit}" method="${2:post}">\n\t<input type="text" name="${3:nome}">\n\t<button type="submit">${4:Enviar}</button>\n</form>' }
    //         ];
    //     } else if (lang === 'css' || lang === 'scss') {
    //         newSuggestions = [
    //             { label: 'color', kind: 'property', detail: 'CSS Color', insertText: 'color: ${1:#000000};' },
    //             { label: 'background-color', kind: 'property', detail: 'CSS Background', insertText: 'background-color: ${1:#ffffff};' },
    //             { label: 'font-size', kind: 'property', detail: 'CSS Font Size', insertText: 'font-size: ${1:16px};' },
    //             { label: 'margin', kind: 'property', detail: 'CSS Margin', insertText: 'margin: ${1:0};' },
    //             { label: 'padding', kind: 'property', detail: 'CSS Padding', insertText: 'padding: ${1:0};' },
    //             { label: 'display', kind: 'property', detail: 'CSS Display', insertText: 'display: ${1:block};' },
    //             { label: 'flex', kind: 'property', detail: 'CSS Flexbox', insertText: 'display: flex;\n\tflex-direction: ${1:row};\n\tjustify-content: ${2:flex-start};\n\talign-items: ${3:stretch};' },
    //             { label: 'grid', kind: 'property', detail: 'CSS Grid', insertText: 'display: grid;\n\tgrid-template-columns: ${1:repeat(3, 1fr)};\n\tgrid-gap: ${2:20px};' },
    //             { label: 'border', kind: 'property', detail: 'CSS Border', insertText: 'border: ${1:1px} ${2:solid} ${3:#000000};' },
    //             { label: 'border-radius', kind: 'property', detail: 'CSS Border Radius', insertText: 'border-radius: ${1:4px};' }
    //         ];
    //     } else if (lang === 'javascript' || lang === 'js') {
    //         newSuggestions = [
    //             { label: 'function', kind: 'function', detail: 'JavaScript Function', insertText: 'function ${1:nome}(${2:parametros}) {\n\t${3:// corpo da função}\n\treturn ${4:valor};\n}' },
    //             { label: 'arrow', kind: 'function', detail: 'Arrow Function', insertText: 'const ${1:nome} = (${2:parametros}) => {\n\t${3:// corpo da função}\n\treturn ${4:valor};\n}' },
    //             { label: 'async', kind: 'function', detail: 'Async Function', insertText: 'async function ${1:nome}(${2:parametros}) {\n\ttry {\n\t\t${3:// código assíncrono}\n\t\treturn ${4:resultado};\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}' },
    //             { label: 'if', kind: 'keyword', detail: 'If Statement', insertText: 'if (${1:condição}) {\n\t${2:// código}\n}' },
    //             { label: 'for', kind: 'keyword', detail: 'For Loop', insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// código}\n}' },
    //             { label: 'map', kind: 'method', detail: 'Array Map', insertText: '${1:array}.map((${2:item}) => {\n\treturn ${3:item};\n})' },
    //             { label: 'filter', kind: 'method', detail: 'Array Filter', insertText: '${1:array}.filter((${2:item}) => {\n\treturn ${3:condição};\n})' },
    //             { label: 'reduce', kind: 'method', detail: 'Array Reduce', insertText: '${1:array}.reduce((${2:acumulador}, ${3:item}) => {\n\treturn ${4:acumulador + item};\n}, ${5:0})' },
    //             { label: 'class', kind: 'class', detail: 'JavaScript Class', insertText: 'class ${1:NomeClasse} {\n\tconstructor(${2:parametros}) {\n\t\t${3:// inicialização}\n\t}\n\n\t${4:metodo}() {\n\t\t${5:// implementação}\n\t}\n}' },
    //             { label: 'try', kind: 'keyword', detail: 'Try-Catch', insertText: 'try {\n\t${1:// código que pode gerar erro}\n} catch (error) {\n\t${2:// tratamento do erro}\n\tconsole.error(error);\n}' }
    //         ];
    //     } else if (lang === 'python' || lang === 'py') {
    //         newSuggestions = [
    //             { label: 'def', kind: 'function', detail: 'Python Function', insertText: 'def ${1:nome_funcao}(${2:parametros}):\n\t${3:"""Docstring da função"""}\n\t${4:# corpo da função}\n\treturn ${5:valor}' },
    //             { label: 'class', kind: 'class', detail: 'Python Class', insertText: 'class ${1:NomeClasse}:\n\tdef __init__(self, ${2:parametros}):\n\t\t${3:# inicialização}\n\n\tdef ${4:metodo}(self):\n\t\t${5:# implementação}' },
    //             { label: 'if', kind: 'keyword', detail: 'If Statement', insertText: 'if ${1:condição}:\n\t${2:# código}' },
    //             { label: 'for', kind: 'keyword', detail: 'For Loop', insertText: 'for ${1:item} in ${2:iteravel}:\n\t${3:# código}' },
    //             { label: 'while', kind: 'keyword', detail: 'While Loop', insertText: 'while ${1:condição}:\n\t${2:# código}' },
    //             { label: 'try', kind: 'keyword', detail: 'Try-Except', insertText: 'try:\n\t${1:# código que pode gerar erro}\nexcept ${2:Exception} as e:\n\t${3:# tratamento do erro}\n\tprint(f"Erro: {e}")' },
    //             { label: 'with', kind: 'keyword', detail: 'With Statement', insertText: 'with ${1:open("arquivo.txt")} as ${2:f}:\n\t${3:conteudo = f.read()}' },
    //             { label: 'import', kind: 'keyword', detail: 'Import Statement', insertText: 'import ${1:modulo}' },
    //             { label: 'from', kind: 'keyword', detail: 'From Import', insertText: 'from ${1:modulo} import ${2:funcao}' },
    //             { label: 'lambda', kind: 'function', detail: 'Lambda Function', insertText: 'lambda ${1:x}: ${2:x * 2}' }
    //         ];
    //     }

    //     // Filtrar sugestões baseado na palavra digitada
    //     if (word) {
    //         newSuggestions = newSuggestions.filter(s =>
    //             s.label.toLowerCase().includes(word.toLowerCase())
    //         );
    //     }

    //     setSuggestions(newSuggestions);
    //     setShowSuggestions(newSuggestions.length > 0);
    //     setSelectedSuggestion(0);
    // }, []);

    // REMOVIDO: Mostrar sugestões quando digitar - CONFLITANDO COM FENIXIDE2
    // const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const newContent = e.target.value;
    //     setEditorContent(newContent);
    //     onContentChange(newContent);

    //     const cursorPos = e.target.selectionStart;
    //     const word = getWordBeforeCursor(newContent, cursorPos);

    //     if (word.length >= 1) {
    //         generateSuggestions(word, getCurrentFileLanguage());
    //     } else {
    //         setShowSuggestions(false);
    //     }

    //     // Calcular posição do cursor
    //     const lines = newContent.split('\n');
    //     let currentLineNum = 0;
    //     let currentCol = cursorPos;

    //     for (let i = 0; i < lines.length; i++) {
    //         if (currentCol <= lines[i].length) {
    //             currentLineNum = i;
    //             break;
    //         }
    //         currentCol -= lines[i].length + 1;
    //     }

    //     setCurrentLine(lines[currentLineNum] || '');
    //     setCursorPosition(cursorPos);
    //     setCursorPositionState({ line: currentLineNum, column: currentCol });
    //     setCurrentLineState(lines[currentLineNum] || '');
    // }, [onContentChange, generateSuggestions]);

    // REMOVIDO: Navegar pelas sugestões - CONFLITANDO COM FENIXIDE2
    // const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    //     if (!showSuggestions) return;

    //     if (e.key === 'ArrowDown') {
    //         e.preventDefault();
    //         setSelectedSuggestion(prev =>
    //             prev < suggestions.length - 1 ? prev + 1 : 0
    //         );
    //     } else if (e.key === 'ArrowUp') {
    //         e.preventDefault();
    //         setSelectedSuggestion(prev =>
    //             prev > 0 ? prev - 1 : suggestions.length - 1
    //         );
    //     } else if (e.key === 'Enter' || e.key === 'Tab') {
    //         e.preventDefault();
    //         insertSuggestion(suggestions[selectedSuggestion]);
    //     } else if (e.key === 'Escape') {
    //         setShowSuggestions(false);
    //     }
    // }, [showSuggestions, suggestions, selectedSuggestion]);

    // REMOVIDO: Inserir sugestão selecionada - CONFLITANDO COM FENIXIDE2
    // const insertSuggestion = useCallback((suggestion: any) => {
    //     if (!suggestion) return;

    //     const textarea = editorRef.current?.querySelector('textarea');
    //     if (!textarea) return;

    //     const cursorPos = textarea.selectionStart;
    //     const word = getWordBeforeCursor(editorContent, cursorPos);
    //     const wordStart = cursorPos - word.length;

    //     const newContent = editorContent.substring(0, wordStart) +
    //         suggestion.insertText +
    //         editorContent.substring(cursorPos);

    //     setEditorContent(newContent);
    //     onContentChange(newContent);
    //     setShowSuggestions(false);

    //     // Posicionar cursor após a inserção
    //     setTimeout(() => {
    //         textarea.focus();
    //         const newPos = wordStart + suggestion.insertText.length;
    //         textarea.setSelectionRange(newPos, newPos);
    //     }, 0);
    // }, [editorContent, onContentChange]);

    // Handler para mudanças no editor
    const handleEditorChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setEditorContent(newContent);
        onContentChange(newContent);

        // Calcular posição do cursor
        const cursorPos = e.target.selectionStart;
        const lines = newContent.split('\n');
        let currentLineNum = 0;
        let currentCol = cursorPos;

        for (let i = 0; i < lines.length; i++) {
            if (currentCol <= lines[i].length) {
                currentLineNum = i;
                break;
            }
            currentCol -= lines[i].length + 1;
        }

        setCurrentLine(lines[currentLineNum] || '');
        setCursorPosition(cursorPos);
        setCursorPositionState({ line: currentLineNum, column: currentCol });
        setCurrentLineState(lines[currentLineNum] || '');
    }, [onContentChange]);

    // Configurações de linguagem para o Monaco
    const languageConfigs = {
        javascript: {
            name: 'javascript',
            extensions: ['.js', '.jsx', '.mjs'],
            aliases: ['JavaScript', 'js', 'jsx']
        },
        typescript: {
            name: 'typescript',
            extensions: ['.ts', '.tsx'],
            aliases: ['TypeScript', 'ts', 'tsx']
        },
        python: {
            name: 'python',
            extensions: ['.py', '.pyw', '.pyi'],
            aliases: ['Python', 'py']
        },
        html: {
            name: 'html',
            extensions: ['.html', '.htm', '.xhtml'],
            aliases: ['HTML', 'html']
        },
        css: {
            name: 'css',
            extensions: ['.css', '.scss', '.sass', '.less'],
            aliases: ['CSS', 'css']
        },
        csharp: {
            name: 'csharp',
            extensions: ['.cs', '.csx'],
            aliases: ['C#', 'csharp', 'cs']
        },
        java: {
            name: 'java',
            extensions: ['.java'],
            aliases: ['Java', 'java']
        },
        cpp: {
            name: 'cpp',
            extensions: ['.cpp', '.cc', '.cxx', '.hpp', '.h'],
            aliases: ['C++', 'cpp']
        },
        c: {
            name: 'c',
            extensions: ['.c', '.h'],
            aliases: ['C', 'c']
        },
        php: {
            name: 'php',
            extensions: ['.php', '.phtml', '.php3', '.php4', '.php5'],
            aliases: ['PHP', 'php']
        },
        ruby: {
            name: 'ruby',
            extensions: ['.rb', '.rbw', '.rbs'],
            aliases: ['Ruby', 'ruby']
        },
        go: {
            name: 'go',
            extensions: ['.go'],
            aliases: ['Go', 'go']
        },
        rust: {
            name: 'rust',
            extensions: ['.rs'],
            aliases: ['Rust', 'rust']
        },
        swift: {
            name: 'swift',
            extensions: ['.swift'],
            aliases: ['Swift', 'swift']
        },
        kotlin: {
            name: 'kotlin',
            extensions: ['.kt', '.kts'],
            aliases: ['Kotlin', 'kotlin']
        },
        dart: {
            name: 'dart',
            extensions: ['.dart'],
            aliases: ['Dart', 'dart']
        },
        r: {
            name: 'r',
            extensions: ['.r', '.R'],
            aliases: ['R', 'r']
        },
        matlab: {
            name: 'matlab',
            extensions: ['.m'],
            aliases: ['MATLAB', 'matlab']
        },
        sql: {
            name: 'sql',
            extensions: ['.sql'],
            aliases: ['SQL', 'sql']
        },
        json: {
            name: 'json',
            extensions: ['.json'],
            aliases: ['JSON', 'json']
        },
        xml: {
            name: 'xml',
            extensions: ['.xml', '.xsd', '.xsl'],
            aliases: ['XML', 'xml']
        }
    };

    // Detectar linguagem baseada na extensão do arquivo
    const detectLanguage = (filename: string): string => {
        if (!filename) return 'plaintext';
        const extension = filename.split('.').pop()?.toLowerCase();
        if (!extension) return 'plaintext';

        for (const [lang, config] of Object.entries(languageConfigs)) {
            if (config.extensions.includes(`.${extension}`)) {
                return lang;
            }
        }

        return 'plaintext';
    };

    // Inicializar Monaco Editor
    useEffect(() => {
        if (!editorRef.current || editor) return;

        const loadMonaco = async () => {
            try {
                // Importar Monaco Editor corretamente
                const monaco = await import('monaco-editor');
                setMonacoInstance(monaco);

                // Criar editor Monaco
                const newEditor = monaco.editor.create(editorRef.current!, {
                    value: content,
                    language: getCurrentFileLanguage(),
                    theme: `vs-code-${currentTheme}`,
                    fontSize: fontSize,
                    wordWrap: wordWrap ? 'on' : 'off',
                    minimap: { enabled: minimap },
                    lineNumbers: lineNumbers ? 'on' : 'off',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    scrollbar: {
                        vertical: 'visible',
                        horizontal: 'visible',
                        verticalScrollbarSize: 14,
                        horizontalScrollbarSize: 14
                    },
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                    overviewRulerLanes: 0,
                    selectionHighlight: false,
                    matchBrackets: 'always',
                    autoClosingBrackets: 'always',
                    autoClosingQuotes: 'always',
                    autoIndent: 'full',
                    formatOnType: true,
                    formatOnPaste: true,
                    // REMOVIDO: Configurar IntelliSense personalizado - CONFLITANDO COM FENIXIDE2
                    // (monaco as any).languages.registerCompletionItemProvider(getCurrentFileLanguage(), {
                    //     provideCompletionItems: (model: any, position: any) => {
                    //         const word = model.getWordUntilPosition(position);
                    //         const range = {
                    //             startLineNumber: position.lineNumber,
                    //             endLineNumber: position.lineNumber,
                    //             startColumn: word.startColumn,
                    //             endColumn: word.endColumn,
                    //         };

                    //         const suggestions = generateMonacoSuggestions(getCurrentFileLanguage(), range);
                    //         return { suggestions };
                    //     }
                    // });

                });

                setEditor(newEditor);
                applyTheme(currentTheme);

                // Configurar eventos
                newEditor.onDidChangeModelContent(() => {
                    const value = newEditor.getValue();
                    setEditorContent(value);
                    onContentChange(value);
                });

                newEditor.onDidChangeCursorPosition((e: any) => {
                    const position = e.position;
                    setCursorPositionState({
                        line: position.lineNumber - 1,
                        column: position.column - 1
                    });
                });

                newEditor.onDidChangeCursorSelection((e: any) => {
                    const selection = e.selection;
                    const position = selection.getPosition();
                    setCursorPositionState({
                        line: position.lineNumber - 1,
                        column: position.column - 1
                    });
                });

                // COMENTÁRIO: IntelliSense agora é gerenciado pelo FenixIDE2.tsx
                console.log('AdvancedEditor: IntelliSense desabilitado para evitar conflito com FenixIDE2');

            } catch (error) {
                console.error('Erro ao carregar Monaco Editor:', error);
            }
        };

        loadMonaco();
    }, [content, currentTheme, fontSize, wordWrap, minimap, lineNumbers, onContentChange]);

    // REMOVIDO: Gerar sugestões para Monaco - AGORA GERENCIADO PELO FENIXIDE2
    // const generateMonacoSuggestions = (language: string, range: any) => {
    //     const lang = language.toLowerCase();
    //     let suggestions: any[] = [];

    //     if (lang === 'html' || lang === 'htm') {
    //         suggestions = [
    //             {
    //                 label: '!',
    //                 kind: (monacoInstance as any)?.languages.CompletionItemKind.Snippet,
    //                 insertText: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Título da Página}</title>\n\t<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n\t<header>\n\t\t<h1>${2:Cabeçalho}</h1>\n\t</header>\n\t<main>\n\t\t<section>\n\t\t\t<h2>${3:Seção Principal}</h2>\n\t\t\t<p>${4:Conteúdo da seção}</p>\n\t\t</section>\n\t</main>\n\t<footer>\n\t\t<p>&copy; 2024 - ${5:Seu Nome}</p>\n\t</footer>\n\t<script src="script.js"></script>\n</body>\n</html>',
    //                 insertTextRules: (monacoInstance as any)?.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    //                 detail: 'HTML5 Template (Emmet)',
    //                 documentation: 'Cria um esqueleto HTML5 completo com estrutura básica',
    //                 range: range,
    //                 sortText: '!'
    //             },
    //             {
    //                 label: 'div',
    //                 kind: (monacoInstance as any)?.languages.CompletionItemKind.Class,
    //                 insertText: '<div>${1:conteúdo}</div>',
    //                 insertTextRules: (monacoInstance as any)?.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    //                 detail: 'HTML HTML Container',
    //                 documentation: 'Container genérico para agrupar elementos',
    //                 range: range
    //             },
    //             {
    //                 label: 'span',
    //                 kind: (monacoInstance as any)?.languages.CompletionItemKind.Class,
    //                 insertText: '<span>${1:texto}</span>',
    //                 insertTextRules: (monacoInstance as any)?.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    //                 detail: 'HTML Inline',
    //                 documentation: 'Elemento inline para texto e elementos pequenos',
    //                 range: range
    //             }
    //         ];
    //     }

    //     return suggestions;
    // };

    // COMENTÁRIO: Sugestões agora são gerenciadas pelo FenixIDE2.tsx

    // Cleanup
    useEffect(() => {
        return () => {
            if (editor) {
                editor.dispose();
            }
        };
    }, [editor]);

    // REMOVIDO: Funções relacionadas ao sistema de sugestões antigo
    // const renderSuggestions = () => {
    //     if (!showSuggestions || suggestions.length === 0) return null;
    //     // ... resto da função removido
    // };

    // REMOVIDO: Calcular posição das sugestões
    // const getSuggestionsPosition = () => {
    //     // ... função removida
    // };

    // REMOVIDO: Posição das sugestões
    // const suggestionsPosition = getSuggestionsPosition();

    // Atualizar conteúdo quando mudar
    useEffect(() => {
        if (editor && content !== editorContent) {
            editor.setValue(content);
            setEditorContent(content);
        }
    }, [content, editor, editorContent]);

    // Atualizar configurações do editor
    useEffect(() => {
        if (!editor) return;

        if (fontSize !== editor.getOption(monacoInstance?.editor.EditorOption.fontSize)) {
            editor.updateOptions({ fontSize });
        }

        if (wordWrap !== (editor.getOption(monacoInstance?.editor.EditorOption.wordWrap) === 'on')) {
            editor.updateOptions({ wordWrap: wordWrap ? 'on' : 'off' });
        }

        if (minimap !== editor.getOption(monacoInstance?.editor.EditorOption.minimap)?.enabled) {
            editor.updateOptions({ minimap: { enabled: minimap } });
        }

        if (lineNumbers !== (editor.getOption(monacoInstance?.editor.EditorOption.lineNumbers) === 'on')) {
            editor.updateOptions({ lineNumbers: lineNumbers ? 'on' : 'off' });
        }
    }, [editor, fontSize, wordWrap, minimap, lineNumbers, monacoInstance]);

    // Handler para mudanças no editor (usando handleInputChange)

    // Toggle fullscreen
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Toggle settings
    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    // Aplicar configurações
    const applySettings = (newSettings: any) => {
        if (newSettings.fontSize !== undefined) setFontSize(newSettings.fontSize);
        if (newSettings.wordWrap !== undefined) setWordWrap(newSettings.wordWrap);
        if (newSettings.minimap !== undefined) setMinimap(newSettings.minimap);
        if (newSettings.lineNumbers !== undefined) setLineNumbers(newSettings.lineNumbers);
    };

    return (
        <div
            className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col min-h-screen max-w-full overflow-hidden`}
            style={{
                background: vsCodeThemes[currentTheme]?.background || vsCodeThemes.dark.background,
                color: vsCodeThemes[currentTheme]?.foreground || vsCodeThemes.dark.foreground
            }}
        >
            {/* Header do Editor */}
            <div
                className="flex items-center justify-between p-2 sm:p-3 border-b text-sm sm:text-base"
                style={{
                    background: vsCodeThemes[currentTheme]?.titleBar?.background || vsCodeThemes.dark.titleBar.background,
                    borderColor: vsCodeThemes[currentTheme]?.titleBar?.border || vsCodeThemes.dark.titleBar.border,
                    color: vsCodeThemes[currentTheme]?.titleBar?.foreground || vsCodeThemes.dark.titleBar.foreground
                }}
            >
                <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span className="font-medium">{filename}</span>
                    <span className="text-xs opacity-60">({getCurrentFileLanguage()})</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={onSave}
                        className="p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105"
                        style={{
                            background: '#28a745',
                            color: '#ffffff'
                        }}
                        title="Salvar Arquivo (Ctrl+S)"
                    >
                        <Save size={14} />
                    </button>

                    <button
                        onClick={onExecute}
                        className="p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105"
                        style={{
                            background: '#007acc',
                            color: '#ffffff'
                        }}
                        title="Executar Código (F5)"
                    >
                        <Play size={14} />
                    </button>

                    <button
                        onClick={toggleSettings}
                        className={`p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105 ${showSettings ? 'ring-2 ring-blue-400' : ''}`}
                        style={{
                            background: showSettings ? '#ffc107' : (vsCodeThemes[currentTheme]?.titleBar?.background || vsCodeThemes.dark.titleBar.background),
                            color: showSettings ? '#000000' : (vsCodeThemes[currentTheme]?.titleBar?.foreground || vsCodeThemes.dark.titleBar.foreground)
                        }}
                        title="Configurações"
                    >
                        <Settings size={14} />
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105"
                        style={{
                            background: isFullscreen ? '#dc3545' : '#6c757d',
                            color: '#ffffff'
                        }}
                        title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                    >
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>

            {/* Área do Editor */}
            <div className="flex-1 relative">
                {/* Editor Monaco */}
                <div
                    ref={editorRef}
                    className="w-full h-full"
                    style={{
                        background: vsCodeThemes[currentTheme]?.editor?.background || vsCodeThemes.dark.editor.background,
                        color: vsCodeThemes[currentTheme]?.editor?.foreground || vsCodeThemes.dark.editor.foreground
                    }}
                />

                {/* Sugestões de Código Estilizadas */}
                {/* {renderSuggestions() && (
                    <div
                        className="absolute z-50"
                        style={{
                            top: suggestionsPosition.top,
                            left: suggestionsPosition.left
                        }}
                    >
                        {renderSuggestions()}
                    </div>
                )} */}
            </div>

            {/* Status Bar */}
            <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-3 py-1 sm:py-2 text-xs border-t"
                style={{
                    background: vsCodeThemes[currentTheme]?.statusBar?.background || vsCodeThemes.dark.statusBar.background,
                    borderColor: vsCodeThemes[currentTheme]?.statusBar?.border || vsCodeThemes.dark.statusBar.border,
                    color: vsCodeThemes[currentTheme]?.statusBar?.foreground || vsCodeThemes.dark.statusBar.foreground
                }}
            >
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <span className="text-xs">L{cursorPositionState.line + 1}, C{cursorPositionState.column + 1}</span>
                    <span className="text-xs">{editorContent.length} chars</span>
                    <span className="text-xs hidden sm:inline">Linguagem: {getCurrentFileLanguage()}</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
                    <span className="text-xs">{currentTheme === 'dark' ? '🌙' : '☀️'} {currentTheme === 'dark' ? 'Escuro' : 'Claro'}</span>
                    <span className="text-xs">{fontSize}px</span>
                    <span className="text-xs hidden sm:inline">Wrap: {wordWrap ? 'ON' : 'OFF'}</span>
                </div>
            </div>

            {/* Painel de Configurações */}
            {showSettings && (
                <div
                    className="absolute top-16 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-2 p-4 z-50"
                    style={{
                        background: vsCodeThemes[currentTheme]?.panel?.background || vsCodeThemes.dark.panel.background,
                        borderColor: vsCodeThemes[currentTheme]?.panel?.border || vsCodeThemes.dark.panel.border,
                        color: vsCodeThemes[currentTheme]?.panel?.foreground || vsCodeThemes.dark.panel.foreground
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Configurações do Editor</h3>
                        <button
                            onClick={toggleSettings}
                            className="p-1 rounded hover:bg-opacity-20 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Tamanho da Fonte */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Tamanho da Fonte</label>
                            <input
                                type="range"
                                min="10"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full"
                            />
                            <span className="text-xs opacity-60">{fontSize}px</span>
                        </div>

                        {/* Word Wrap */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Word Wrap</label>
                            <input
                                type="checkbox"
                                checked={wordWrap}
                                onChange={(e) => setWordWrap(e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        {/* Minimap */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Minimap</label>
                            <input
                                type="checkbox"
                                checked={minimap}
                                onChange={(e) => setMinimap(e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        {/* Números de Linha */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Números de Linha</label>
                            <input
                                type="checkbox"
                                checked={lineNumbers}
                                onChange={(e) => setLineNumbers(e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-2 pt-4">
                            <button
                                onClick={onSave}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                <Save size={16} />
                                Salvar
                            </button>

                            <button
                                onClick={onExecute}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
                            >
                                <Play size={16} />
                                Executar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
