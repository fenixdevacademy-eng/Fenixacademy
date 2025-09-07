'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import {
    Plus, Save, Play, Terminal, Split, FolderOpen, Settings,
    Minimize, Maximize, X, FileText, GitBranch, Package, Server,
    Cpu, Brain, Zap, Monitor, Activity, GitCommit, GitPullRequest,
    GitBranch as GitBranchIcon, GitMerge, GitPullRequest as GitPullRequestIcon,
    Search, Code, Database, Globe, Palette, Layers, Zap as ZapIcon
} from 'lucide-react';

interface Tab {
    id: string;
    title: string;
    content: string;
    language: string;
    isActive: boolean;
    isDirty?: boolean;
}

interface BottomPanel {
    id: string;
    title: string;
    icon: React.ReactNode;
    isActive: boolean;
}

interface SidebarItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    isActive: boolean;
    children?: SidebarItem[];
}

const CursorFenixIDE: React.FC = () => {
    // Estado principal
    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: 'index.html',
            title: 'index.html',
            content: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Cursor Fenix IDE</title>\n\t<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n\t<header>\n\t\t<h1>Bem-vindo ao Cursor Fenix IDE</h1>\n\t</header>\n\t<main>\n\t\t<section>\n\t\t\t<h2>Editor Moderno</h2>\n\t\t\t<p>Digite ! e pressione Tab para criar um template HTML5 completo!</p>\n\t\t</section>\n\t</main>\n\t<script src="script.js"></script>\n</body>\n</html>',
            language: 'html',
            isActive: true,
            isDirty: false
        }
    ]);

    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [panelHeight, setPanelHeight] = useState(250);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showPanel, setShowPanel] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Estado para modal de configurações
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [activeSettingsTab, setActiveSettingsTab] = useState('editor');

    // Estado para divisão do editor
    const [isEditorSplit, setIsEditorSplit] = useState(false);
    const [splitEditorContent, setSplitEditorContent] = useState('');

    // Estado para métricas de performance
    const [performanceMetrics, setPerformanceMetrics] = useState({
        memoryUsage: 0,
        cpuUsage: 0,
        editorLatency: 0,
        lastUpdate: Date.now()
    });

    // Estado para funcionalidades Git avançadas
    const [gitStatus, setGitStatus] = useState({
        branch: 'main',
        status: 'clean',
        lastCommit: '2 hours ago',
        changes: 0,
        staged: 0,
        unstaged: 0,
        untracked: 0,
        commits: [
            { hash: 'abc123', message: 'Initial commit', author: 'You', date: '2024-01-01' },
            { hash: 'def456', message: 'Added Cursor IDE features', author: 'You', date: '2024-01-05' },
        ],
        branches: ['main', 'dev', 'feature/cursor-ui'],
        currentBranch: 'main',
        remotes: ['origin'],
        pullRequests: [],
        issues: []
    });

    // Estado para sistema de arquivos real
    const [fileSystem, setFileSystem] = useState({
        currentPath: '/',
        files: [],
        folders: [],
        isLoading: false,
        error: null
    });

    // Estado para gerenciamento de arquivos
    const [fileManager, setFileManager] = useState({
        showFileExplorer: false,
        showCreateFile: false,
        showCreateFolder: false,
        showRenameDialog: false,
        showDeleteConfirm: false,
        selectedFile: null as string | null,
        newFileName: '',
        newFolderName: ''
    });

    // Estado para preview CSS
    const [showCssPreview, setShowCssPreview] = useState(false);

    // Configurações do editor
    const [fontSize, setFontSize] = useState(14);
    const [fontFamily, setFontFamily] = useState('JetBrains Mono, Consolas, Monaco, monospace');
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [wordWrap, setWordWrap] = useState(false);
    const [showMinimap, setShowMinimap] = useState(true);
    const [bracketMatching, setBracketMatching] = useState(true);
    const [autoClosingBrackets, setAutoClosingBrackets] = useState(true);
    const [autoClosingQuotes, setAutoClosingQuotes] = useState(true);
    const [autoIndent, setAutoIndent] = useState(true);
    const [formatOnPaste, setFormatOnPaste] = useState(true);
    const [formatOnType, setFormatOnType] = useState(true);
    const [cursorBlinking, setCursorBlinking] = useState<'blink' | 'smooth' | 'phase' | 'expand' | 'solid'>('smooth');
    const [cursorStyle, setCursorStyle] = useState<'line' | 'block' | 'underline'>('line');
    const [tabSize, setTabSize] = useState(2);
    const [insertSpaces, setInsertSpaces] = useState(true);
    const [detectIndentation, setDetectIndentation] = useState(true);
    const [trimAutoWhitespace, setTrimAutoWhitespace] = useState(true);
    const [smoothScrolling, setSmoothScrolling] = useState(true);
    const [largeFileOptimizations, setLargeFileOptimizations] = useState(true);
    const [semanticValidation, setSemanticValidation] = useState(true);
    const [syntaxValidation, setSyntaxValidation] = useState(true);

    // Estado do editor
    const [editorContent, setEditorContent] = useState(tabs[0].content);
    const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

    // Painéis inferiores
    const [bottomPanels, setBottomPanels] = useState<BottomPanel[]>([
        {
            id: 'problems',
            title: 'PROBLEMS',
            icon: <Activity className="w-4 h-4" />,
            isActive: true
        },
        {
            id: 'output',
            title: 'OUTPUT',
            icon: <Terminal className="w-4 h-4" />,
            isActive: false
        },
        {
            id: 'debug',
            title: 'DEBUG CONSOLE',
            icon: <Brain className="w-4 h-4" />,
            isActive: false
        },
        {
            id: 'terminal',
            title: 'TERMINAL',
            icon: <Terminal className="w-4 h-4" />,
            isActive: false
        },
        {
            id: 'git',
            title: 'GIT',
            icon: <GitBranchIcon className="w-4 h-4" />,
            isActive: false
        }
    ]);

    // Sidebar items
    const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([
        {
            id: 'explorer',
            title: 'EXPLORER',
            icon: <FolderOpen className="w-4 h-4" />,
            isActive: true,
            children: [
                { id: 'src', title: 'src', icon: <FolderOpen className="w-4 h-4" />, isActive: false },
                { id: 'public', title: 'public', icon: <FolderOpen className="w-4 h-4" />, isActive: false },
                { id: 'components', title: 'components', icon: <FolderOpen className="w-4 h-4" />, isActive: false }
            ]
        },
        {
            id: 'search',
            title: 'SEARCH',
            icon: <Search className="w-4 h-4" />,
            isActive: false
        },
        {
            id: 'git',
            title: 'SOURCE CONTROL',
            icon: <GitBranch className="w-4 h-4" />,
            isActive: false
        },
        {
            id: 'run',
            title: 'RUN AND DEBUG',
            icon: <Play className="w-4 h-4" />,
            isActive: false
        },
        {
            id: 'extensions',
            title: 'EXTENSIONS',
            icon: <Package className="w-4 h-4" />,
            isActive: false
        }
    ]);

    // Refs
    const sidebarRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<any>(null);

    // Funções principais
    const openFile = useCallback((tab: Tab) => {
        setTabs(prev => prev.map(t => ({ ...t, isActive: t.id === tab.id })));
        setCurrentTab(tab);
        setEditorContent(tab.content);
    }, []);

    const closeTab = useCallback((tabId: string) => {
        setTabs(prev => {
            const newTabs = prev.filter(t => t.id !== tabId);
            if (newTabs.length > 0 && prev.find(t => t.id === tabId)?.isActive) {
                newTabs[0].isActive = true;
                setCurrentTab(newTabs[0]);
                setEditorContent(newTabs[0].content);
            }
            return newTabs;
        });
    }, []);

    const createNewFile = useCallback((fileName?: string) => {
        if (fileName) {
            const newTab: Tab = {
                id: fileName,
                title: fileName,
                content: '',
                language: getLanguageFromFileName(fileName),
                isActive: true,
                isDirty: false
            };
            setTabs(prev => prev.map(t => ({ ...t, isActive: false })).concat(newTab));
            setCurrentTab(newTab);
            setEditorContent('');
        } else {
            setFileManager(prev => ({ ...prev, showCreateFile: true }));
        }
    }, []);

    const handleNewFileClick = useCallback(() => {
        createNewFile();
    }, [createNewFile]);

    const saveFile = useCallback(() => {
        if (currentTab) {
            setTabs(prev => prev.map(t =>
                t.id === currentTab.id
                    ? { ...t, content: editorContent, isDirty: false }
                    : t
            ));
            console.log('Arquivo salvo:', currentTab.title);
        }
    }, [currentTab, editorContent]);

    const runCode = useCallback(() => {
        console.log('Executando código...');
        // Aqui você pode implementar a execução do código
    }, []);

    const toggleSidebar = useCallback(() => {
        setShowSidebar(prev => !prev);
    }, []);

    const togglePanel = useCallback(() => {
        setShowPanel(prev => !prev);
    }, []);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen(prev => !prev);
    }, []);

    const minimizeWindow = useCallback(() => {
        console.log('Minimizando janela...');
    }, []);

    const closeWindow = useCallback(() => {
        console.log('Fechando janela...');
    }, []);

    const startResize = useCallback((type: 'sidebar' | 'panel') => {
        const handleMouseMove = (e: MouseEvent) => {
            if (type === 'sidebar') {
                setSidebarWidth(e.clientX);
            } else {
                setPanelHeight(window.innerHeight - e.clientY);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    // Funções avançadas
    const openSettings = useCallback(() => {
        setShowSettingsModal(true);
    }, []);

    const openPerformanceMonitor = useCallback(() => {
        const memoryInfo = (performance as any).memory;
        if (memoryInfo) {
            setPerformanceMetrics({
                memoryUsage: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024),
                cpuUsage: Math.round(Math.random() * 100),
                editorLatency: Math.round(Math.random() * 50),
                lastUpdate: Date.now()
            });
        }
    }, []);

    const openGitPanel = useCallback(() => {
        setBottomPanels(prev => prev.map(p => ({ ...p, isActive: p.id === 'git' })));
    }, []);

    const toggleCssPreview = useCallback(() => {
        setShowCssPreview(prev => !prev);
    }, []);

    const splitEditor = useCallback(() => {
        setIsEditorSplit(prev => !prev);
        if (!isEditorSplit) {
            setSplitEditorContent(editorContent);
        }
    }, [isEditorSplit, editorContent]);

    const toggleBottomPanel = useCallback((panelId: string) => {
        setBottomPanels(prev => prev.map(p => ({ ...p, isActive: p.id === panelId })));
    }, []);

    // Funções para sistema de arquivos real
    const openFileExplorer = useCallback(() => {
        setFileManager(prev => ({ ...prev, showFileExplorer: true }));
        // Aqui você pode implementar a lógica para abrir o explorador de arquivos do sistema
        if (navigator.userAgent.includes('Windows')) {
            // Windows
            window.open('explorer.exe', '_blank');
        } else if (navigator.userAgent.includes('Mac')) {
            // macOS
            window.open('finder', '_blank');
        } else {
            // Linux
            window.open('xdg-open', '_blank');
        }
    }, []);

    const createNewFolder = useCallback(() => {
        setFileManager(prev => ({ ...prev, showCreateFolder: true }));
    }, []);

    const renameFile = useCallback((oldName: string, newName: string) => {
        setTabs(prev => prev.map(t =>
            t.id === oldName ? { ...t, id: newName, title: newName } : t
        ));
        if (currentTab?.id === oldName) {
            setCurrentTab(prev => prev ? { ...prev, id: newName, title: newName } : prev);
        }
    }, [currentTab]);

    const deleteFile = useCallback((fileName: string) => {
        setTabs(prev => prev.filter(t => t.id !== fileName));
        if (currentTab?.id === fileName && tabs.length > 1) {
            const remainingTabs = tabs.filter(t => t.id !== fileName);
            if (remainingTabs.length > 0) {
                setCurrentTab(remainingTabs[0]);
                setEditorContent(remainingTabs[0].content);
            }
        }
    }, [currentTab, tabs]);

    const getLanguageFromFileName = useCallback((fileName: string): string => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        const languageMap: { [key: string]: string } = {
            'html': 'html',
            'htm': 'html',
            'css': 'css',
            'js': 'javascript',
            'ts': 'typescript',
            'jsx': 'javascript',
            'tsx': 'typescript',
            'py': 'python',
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
            'sql': 'sql',
            'json': 'json',
            'xml': 'xml',
            'yaml': 'yaml',
            'yml': 'yaml',
            'md': 'markdown',
            'txt': 'text'
        };
        return languageMap[extension || ''] || 'text';
    }, []);

    const saveFileToSystem = useCallback(async () => {
        if (currentTab) {
            try {
                // Aqui você implementaria a lógica real para salvar no sistema de arquivos
                // Por enquanto, vamos simular o salvamento
                console.log('Salvando arquivo:', currentTab.title, 'com conteúdo:', editorContent);

                // Simular delay de salvamento
                await new Promise(resolve => setTimeout(resolve, 500));

                setTabs(prev => prev.map(t =>
                    t.id === currentTab.id
                        ? { ...t, content: editorContent, isDirty: false }
                        : t
                ));

                console.log('Arquivo salvo com sucesso!');
            } catch (error) {
                console.error('Erro ao salvar arquivo:', error);
            }
        }
    }, [currentTab, editorContent]);

    // Efeitos
    useEffect(() => {
        openPerformanceMonitor();
        const interval = setInterval(openPerformanceMonitor, 5000);
        return () => clearInterval(interval);
    }, [openPerformanceMonitor]);

    return (
        <div className={`h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Header */}
            <div className="bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-[#58a6ff]">Cursor Fenix IDE</div>
                    <div className="text-sm text-[#8b949e]">Modern Code Editor</div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={minimizeWindow}
                        className="p-1 hover:bg-[#21262d] rounded text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                        title="Minimizar"
                    >
                        <Minimize className="w-4 h-4" />
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="p-1 hover:bg-[#21262d] rounded text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                        title="Tela cheia"
                    >
                        <Maximize className="w-4 h-4" />
                    </button>
                    <button
                        onClick={closeWindow}
                        className="p-1 hover:bg-[#21262d] rounded text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                        title="Fechar"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleNewFileClick}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#238636] hover:bg-[#2ea043] rounded text-white text-sm transition-colors"
                        title="Novo arquivo"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New File</span>
                    </button>

                    <button
                        onClick={saveFile}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#238636] hover:bg-[#2ea043] rounded text-white text-sm transition-colors"
                        title="Salvar arquivo"
                    >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                    </button>

                    <button
                        onClick={runCode}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#9e6a03] hover:bg-[#bb8002] rounded text-white text-sm transition-colors"
                        title="Executar código"
                    >
                        <Play className="w-4 h-4" />
                        <span>Run</span>
                    </button>

                    <div className="w-px h-6 bg-[#30363d] mx-2" />

                    <button
                        onClick={toggleSidebar}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#21262d] hover:bg-[#30363d] rounded text-[#c9d1d9] text-sm transition-colors"
                        title="Alternar sidebar"
                    >
                        <FolderOpen className="w-4 h-4" />
                        <span>Explorer</span>
                    </button>

                    <button
                        onClick={splitEditor}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#21262d] hover:bg-[#30363d] rounded text-[#c9d1d9] text-sm transition-colors"
                        title="Dividir editor"
                    >
                        <Split className="w-4 h-4" />
                        <span>Split</span>
                    </button>

                    <button
                        onClick={toggleCssPreview}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#21262d] hover:bg-[#30363d] rounded text-[#c9d1d9] text-sm transition-colors"
                        title="Preview CSS"
                    >
                        <Monitor className="w-4 h-4" />
                        <span>Preview</span>
                    </button>

                    <div className="w-px h-6 bg-[#30363d] mx-2" />

                    <button
                        onClick={openFileExplorer}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#21262d] hover:bg-[#30363d] rounded text-[#c9d1d9] text-sm transition-colors"
                        title="Abrir Explorador de Arquivos"
                    >
                        <FolderOpen className="w-4 h-4" />
                        <span>Explorer</span>
                    </button>

                    <button
                        onClick={createNewFolder}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#21262d] hover:bg-[#30363d] rounded text-[#c9d1d9] text-sm transition-colors"
                        title="Criar Nova Pasta"
                    >
                        <FolderOpen className="w-4 h-4" />
                        <span>New Folder</span>
                    </button>

                    <button
                        onClick={openGitPanel}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#da3633] hover:bg-[#f85149] rounded text-white text-sm transition-colors"
                        title="Git"
                    >
                        <GitBranch className="w-4 h-4" />
                        <span>Git</span>
                    </button>

                    <button
                        onClick={openPerformanceMonitor}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#da3633] hover:bg-[#f85149] rounded text-white text-sm transition-colors"
                        title="Performance"
                    >
                        <Activity className="w-4 h-4" />
                        <span>Performance</span>
                    </button>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={openSettings}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#21262d] hover:bg-[#30363d] rounded text-[#c9d1d9] text-sm transition-colors"
                        title="Configurações"
                    >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                    </button>

                    <button
                        onClick={togglePanel}
                        className="flex items-center space-x-2 px-3 py-1 bg-[#21262d] hover:bg-[#30363d] rounded text-[#c9d1d9] text-sm transition-colors"
                        title="Terminal"
                    >
                        <Terminal className="w-4 h-4" />
                        <span>Terminal</span>
                    </button>
                </div>
            </div>

            {/* Área principal */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                {showSidebar && (
                    <>
                        <div
                            ref={sidebarRef}
                            className="bg-[#0d1117] border-r border-[#30363d] overflow-y-auto"
                            style={{ width: sidebarWidth }}
                        >
                            <div className="p-4">
                                {sidebarItems.map(item => (
                                    <div key={item.id} className="mb-4">
                                        <div className="flex items-center space-x-2 text-[#8b949e] text-xs font-semibold mb-2">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </div>
                                        {item.children && (
                                            <div className="ml-4 space-y-1">
                                                {item.children.map(child => (
                                                    <div
                                                        key={child.id}
                                                        className="flex items-center space-x-2 text-[#c9d1d9] hover:text-white cursor-pointer text-sm py-1 px-2 rounded hover:bg-[#21262d] group relative"
                                                        onContextMenu={(e) => {
                                                            e.preventDefault();
                                                            setFileManager(prev => ({
                                                                ...prev,
                                                                selectedFile: child.title,
                                                                showDeleteConfirm: true
                                                            }));
                                                        }}
                                                    >
                                                        {child.icon}
                                                        <span>{child.title}</span>

                                                        {/* Menu de contexto */}
                                                        <div className="absolute right-0 top-0 hidden group-hover:block bg-[#161b22] border border-[#30363d] rounded shadow-lg z-10">
                                                            <button
                                                                onClick={() => renameFile(child.title, child.title + '_renamed')}
                                                                className="block w-full text-left px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                                                            >
                                                                Renomear
                                                            </button>
                                                            <button
                                                                onClick={() => setFileManager(prev => ({
                                                                    ...prev,
                                                                    selectedFile: child.title,
                                                                    showDeleteConfirm: true
                                                                }))}
                                                                className="block w-full text-left px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
                                                            >
                                                                Excluir
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Área de redimensionamento do sidebar */}
                        <div
                            className="w-1 bg-[#30363d] cursor-col-resize hover:bg-[#58a6ff]"
                            onMouseDown={() => startResize('sidebar')}
                        />
                    </>
                )}

                {/* Área do editor */}
                <div className="flex-1 flex flex-col">
                    {/* Abas do editor */}
                    <div className="bg-[#0d1117] border-b border-[#30363d] flex items-center">
                        {tabs.map(tab => (
                            <div
                                key={tab.id}
                                className={`flex items-center px-3 py-2 border-r border-[#30363d] cursor-pointer ${tab.isActive ? 'bg-[#161b22] text-[#c9d1d9]' : 'bg-[#0d1117] text-[#8b949e] hover:bg-[#161b22]'}`}
                                onClick={() => openFile(tab)}
                            >
                                <span className="text-sm">{tab.title}</span>
                                {tab.isDirty && (
                                    <div className="ml-2 w-2 h-2 bg-[#f85149] rounded-full"></div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeTab(tab.id);
                                    }}
                                    className="ml-2 hover:bg-[#30363d] rounded px-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Editor */}
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            value={editorContent}
                            language="html"
                            theme="vs-dark"
                            options={{
                                fontSize: 14,
                                fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                                lineNumbers: 'on',
                                wordWrap: 'off',
                                minimap: { enabled: true },
                                bracketPairColorization: { enabled: true },
                                autoClosingBrackets: 'always',
                                autoClosingQuotes: 'always',
                                autoIndent: 'advanced',
                                formatOnPaste: true,
                                formatOnType: true,
                                cursorBlinking: 'smooth',
                                cursorStyle: 'line',
                                tabSize: 2,
                                insertSpaces: true,
                                detectIndentation: true,
                                trimAutoWhitespace: true,
                                smoothScrolling: true,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                fixedOverflowWidgets: true,
                                overviewRulerBorder: false,
                                hideCursorInOverviewRuler: true,
                                scrollbar: {
                                    vertical: 'visible',
                                    horizontal: 'visible',
                                    verticalScrollbarSize: 14,
                                    horizontalScrollbarSize: 14
                                },
                                quickSuggestions: {
                                    other: false,
                                    comments: false,
                                    strings: false
                                },
                                quickSuggestionsDelay: 1000,
                                suggestOnTriggerCharacters: false,
                                acceptSuggestionOnEnter: 'off',
                                wordBasedSuggestions: 'on',
                            }}
                            onMount={(editor, monaco) => {
                                console.log('Monaco Editor montado com sucesso!');
                                editorRef.current = editor;

                                // Configurar IntelliSense SUPER AVANÇADO
                                monaco.languages.registerCompletionItemProvider('html', {
                                    triggerCharacters: ['!', '<', ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                                    provideCompletionItems: (model, position) => {
                                        const word = model.getWordUntilPosition(position);
                                        const range = {
                                            startLineNumber: position.lineNumber,
                                            endLineNumber: position.lineNumber,
                                            startColumn: word.startColumn,
                                            endColumn: word.endColumn,
                                        };

                                        const lineContent = model.getLineContent(position.lineNumber) || '';
                                        const isOnlyExclamation = lineContent.trim() === '!';
                                        const isStartingTag = lineContent.trim().startsWith('<');
                                        const hasContent = word.word.length > 0;
                                        const isInTag = lineContent.includes('<') && !lineContent.includes('>');
                                        const isInAttribute = lineContent.includes('=') && !lineContent.includes('>');

                                        // Sugestões inteligentes baseadas no contexto
                                        let suggestions = [];

                                        // 1. EMMET AVANÇADO
                                        if (isOnlyExclamation) {
                                            suggestions.push({
                                                label: '! → HTML5',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Título da Página}</title>\n\t<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n\t<header>\n\t\t<h1>${2:Cabeçalho}</h1>\n\t</header>\n\t<main>\n\t\t<section>\n\t\t\t<h2>${3:Seção Principal}</h2>\n\t\t\t<p>${4:Conteúdo da seção}</p>\n\t\t</section>\n\t</main>\n\t<footer>\n\t\t<p>&copy; 2024 - ${5:Seu Nome}</p>\n\t</footer>\n\t<script src="script.js"></script>\n</body>\n</html>',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'HTML5 Template (Emmet)',
                                                documentation: 'Cria um esqueleto HTML5 completo. Digite ! e pressione Tab.',
                                                range: range,
                                                sortText: '!',
                                                filterText: '!',
                                                preselect: true
                                            });

                                            // EMMET para componentes comuns
                                            suggestions.push({
                                                label: '! → React Component',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: 'import React from \'react\';\n\nconst ${1:ComponentName} = () => {\n\treturn (\n\t\t<div>\n\t\t\t<h1>${2:Título}</h1>\n\t\t\t<p>${3:Descrição}</p>\n\t\t</div>\n\t);\n};\n\nexport default ${1:ComponentName};',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'React Component Template',
                                                documentation: 'Cria um componente React básico',
                                                range: range,
                                                sortText: '!2',
                                                filterText: '!react'
                                            });

                                            suggestions.push({
                                                label: '! → CSS Grid Layout',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: '<div class="grid-container">\n\t<div class="grid-item">${1:Item 1}</div>\n\t<div class="grid-item">${2:Item 2}</div>\n\t<div class="grid-item">${3:Item 3}</div>\n</div>\n\n<style>\n.grid-container {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(3, 1fr);\n\tgap: 20px;\n\tpadding: 20px;\n}\n\n.grid-item {\n\tbackground: #f0f0f0;\n\tpadding: 20px;\n\tborder-radius: 8px;\n\ttext-align: center;\n}\n</style>',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'CSS Grid Layout',
                                                documentation: 'Cria um layout CSS Grid responsivo',
                                                range: range,
                                                sortText: '!3',
                                                filterText: '!grid'
                                            });

                                            // NOVOS TEMPLATES AVANÇADOS
                                            suggestions.push({
                                                label: '! → Next.js Page',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: 'import React from \'react\';\nimport Head from \'next/head\';\n\nconst ${1:PageName} = () => {\n\treturn (\n\t\t<>\n\t\t\t<Head>\n\t\t\t\t<title>${2:Título da Página}</title>\n\t\t\t\t<meta name="description" content="${3:Descrição da página}" />\n\t\t\t</Head>\n\t\t\t<main>\n\t\t\t\t<h1>${2:Título da Página}</h1>\n\t\t\t\t<p>${4:Conteúdo da página}</p>\n\t\t\t</main>\n\t\t</>\n\t);\n};\n\nexport default ${1:PageName};',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'Next.js Page Template',
                                                documentation: 'Cria uma página Next.js completa',
                                                range: range,
                                                sortText: '!4',
                                                filterText: '!next'
                                            });

                                            suggestions.push({
                                                label: '! → TypeScript Interface',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: 'interface ${1:InterfaceName} {\n\t${2:property}: ${3:string};\n\t${4:count}?: ${5:number};\n\t${6:items}: ${7:Array<string>};\n\t${8:callback}: (${9:param}: ${10:string}) => ${11:void};\n}',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'TypeScript Interface',
                                                documentation: 'Cria uma interface TypeScript',
                                                range: range,
                                                sortText: '!5',
                                                filterText: '!ts'
                                            });

                                            suggestions.push({
                                                label: '! → Express.js Server',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: 'const express = require(\'express\');\nconst cors = require(\'cors\');\nconst app = express();\n\napp.use(cors());\napp.use(express.json());\n\napp.get(\'/\', (req, res) => {\n\tres.json({ message: \'${1:API funcionando!}\' });\n});\n\napp.post(\'/${2:api}\', (req, res) => {\n\tconst { ${3:data} } = req.body;\n\tres.json({ success: true, ${3:data} });\n});\n\nconst PORT = process.env.PORT || ${4:3000};\napp.listen(PORT, () => {\n\tconsole.log(`Servidor rodando na porta ${PORT}`);\n});',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'Express.js Server',
                                                documentation: 'Cria um servidor Express.js básico',
                                                range: range,
                                                sortText: '!6',
                                                filterText: '!express'
                                            });

                                            suggestions.push({
                                                label: '! → Tailwind CSS Card',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: '<div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">\n\t<img class="w-full" src="${1:imagem.jpg}" alt="${2:Descrição da imagem}">\n\t<div class="px-6 py-4">\n\t\t<div class="font-bold text-xl mb-2">${3:Título do Card}</div>\n\t\t<p class="text-gray-700 text-base">\n\t\t\t${4:Descrição do card com Tailwind CSS classes}\n\t\t</p>\n\t</div>\n\t<div class="px-6 pt-4 pb-2">\n\t\t<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${5:Tag 1}</span>\n\t\t<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${6:Tag 2}</span>\n\t</div>\n</div>',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'Tailwind CSS Card',
                                                documentation: 'Cria um card estilizado com Tailwind CSS',
                                                range: range,
                                                sortText: '!7',
                                                filterText: '!tailwind'
                                            });

                                            suggestions.push({
                                                label: '! → Bootstrap Modal',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: '<!-- Button trigger modal -->\n<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${1:modalId}">\n\t${2:Abrir Modal}\n</button>\n\n<!-- Modal -->\n<div class="modal fade" id="${1:modalId}" tabindex="-1" aria-labelledby="${1:modalId}Label" aria-hidden="true">\n\t<div class="modal-dialog">\n\t\t<div class="modal-content">\n\t\t\t<div class="modal-header">\n\t\t\t\t<h5 class="modal-title" id="${1:modalId}Label">${3:Título do Modal}</h5>\n\t\t\t\t<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n\t\t\t</div>\n\t\t\t<div class="modal-body">\n\t\t\t\t${4:Conteúdo do modal aqui}\n\t\t\t</div>\n\t\t\t<div class="modal-footer">\n\t\t\t\t<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${5:Fechar}</button>\n\t\t\t\t<button type="button" class="btn btn-primary">${6:Salvar}</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'Bootstrap Modal',
                                                documentation: 'Cria um modal Bootstrap completo',
                                                range: range,
                                                sortText: '!8',
                                                filterText: '!bootstrap'
                                            });

                                            suggestions.push({
                                                label: '! → Vue.js Component',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: '<template>\n\t<div class="${1:component-name}">\n\t\t<h1>{{ ${2:title} }}</h1>\n\t\t<p>{{ ${3:description} }}</p>\n\t\t<button @click="${4:handleClick}">{{ ${5:buttonText} }}</button>\n\t</div>\n</template>\n\n<script>\nexport default {\n\tname: \'${1:ComponentName}\',\n\tdata() {\n\t\treturn {\n\t\t\t${2:title}: \'${6:Título do Componente}\',\n\t\t\t${3:description}: \'${7:Descrição do componente}\',\n\t\t\t${5:buttonText}: \'${8:Clique aqui}\'\n\t\t};\n\t},\n\tmethods: {\n\t\t${4:handleClick}() {\n\t\t\tconsole.log(\'${9:Botão clicado}\');\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n.${1:component-name} {\n\tpadding: 20px;\n\ttext-align: center;\n}\n</style>',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'Vue.js Component',
                                                documentation: 'Cria um componente Vue.js completo',
                                                range: range,
                                                sortText: '!9',
                                                filterText: '!vue'
                                            });

                                            suggestions.push({
                                                label: '! → Python Flask App',
                                                kind: monaco.languages.CompletionItemKind.Snippet,
                                                insertText: 'from flask import Flask, render_template, request, jsonify\nfrom flask_cors import CORS\n\napp = Flask(__name__)\nCORS(app)\n\n@app.route(\'/\')\ndef index():\n\treturn render_template(\'${1:index.html}\')\n\n@app.route(\'/${2:api}\', methods=[\'GET\'])\ndef get_data():\n\treturn jsonify({\n\t\t\'message\': \'${3:API funcionando}\',\n\t\t\'status\': \'success\'\n\t})\n\n@app.route(\'/${2:api}\', methods=[\'POST\'])\ndef post_data():\n\tdata = request.get_json()\n\treturn jsonify({\n\t\t\'received\': data,\n\t\t\'status\': \'success\'\n\t})\n\nif __name__ == \'__main__\':\n\tapp.run(debug=True, port=${4:5000})',
                                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                detail: 'Python Flask App',
                                                documentation: 'Cria uma aplicação Flask básica',
                                                range: range,
                                                sortText: '!10',
                                                filterText: '!python'
                                            });
                                        }

                                        // 2. TAGS HTML INTELIGENTES
                                        if (isStartingTag || hasContent) {
                                            const commonTags = [
                                                { tag: 'div', desc: 'Container genérico', snippet: '<div>${1:conteúdo}</div>' },
                                                { tag: 'span', desc: 'Elemento inline', snippet: '<span>${1:texto}</span>' },
                                                { tag: 'p', desc: 'Parágrafo', snippet: '<p>${1:parágrafo}</p>' },
                                                { tag: 'h1', desc: 'Título principal', snippet: '<h1>${1:título principal}</h1>' },
                                                { tag: 'h2', desc: 'Título secundário', snippet: '<h2>${1:título secundário}</h2>' },
                                                { tag: 'h3', desc: 'Título terciário', snippet: '<h3>${1:título terciário}</h3>' },
                                                { tag: 'a', desc: 'Link', snippet: '<a href="${1:#}" target="_blank" rel="noopener noreferrer">${2:texto do link}</a>' },
                                                { tag: 'img', desc: 'Imagem', snippet: '<img src="${1:imagem.jpg}" alt="${2:descrição}" width="${3:300}" height="${4:200}">' },
                                                { tag: 'ul', desc: 'Lista não ordenada', snippet: '<ul>\n\t<li>${1:item 1}</li>\n\t<li>${2:item 2}</li>\n\t<li>${3:item 3}</li>\n</ul>' },
                                                { tag: 'ol', desc: 'Lista ordenada', snippet: '<ol>\n\t<li>${1:item 1}</li>\n\t<li>${2:item 2}</li>\n\t<li>${3:item 3}</li>\n</ol>' },
                                                { tag: 'table', desc: 'Tabela', snippet: '<table>\n\t<thead>\n\t\t<tr>\n\t\t\t<th>${1:Cabeçalho 1}</th>\n\t\t\t<th>${2:Cabeçalho 2}</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>${3:Dado 1}</td>\n\t\t\t<td>${4:Dado 2}</td>\n\t\t</tr>\n\t</tbody>\n</table>' },
                                                { tag: 'form', desc: 'Formulário', snippet: '<form action="${1:#}" method="post">\n\t<input type="text" name="${2:nome}" placeholder="${3:Digite seu nome}">\n\t<button type="submit">${4:Enviar}</button>\n</form>' },
                                                { tag: 'input', desc: 'Campo de entrada', snippet: '<input type="${1:text}" name="${2:nome}" placeholder="${3:placeholder}">' },
                                                { tag: 'button', desc: 'Botão', snippet: '<button type="${1:button}">${2:texto do botão}</button>' },
                                                { tag: 'section', desc: 'Seção', snippet: '<section>${1:conteúdo da seção}</section>' },
                                                { tag: 'header', desc: 'Cabeçalho', snippet: '<header>${1:cabeçalho}</header>' },
                                                { tag: 'footer', desc: 'Rodapé', snippet: '<footer>${1:rodapé}</footer>' },
                                                { tag: 'main', desc: 'Conteúdo principal', snippet: '<main>${1:conteúdo principal}</main>' },
                                                { tag: 'nav', desc: 'Navegação', snippet: '<nav>${1:navegação}</nav>' },
                                                { tag: 'article', desc: 'Artigo', snippet: '<article>${1:conteúdo do artigo}</article>' },
                                                { tag: 'aside', desc: 'Conteúdo lateral', snippet: '<aside>${1:conteúdo lateral}</aside>' },
                                                { tag: 'figure', desc: 'Figura', snippet: '<figure>\n\t<img src="${1:imagem.jpg}" alt="${2:descrição}">\n\t<figcaption>${3:legenda}</figcaption>\n</figure>' },
                                                { tag: 'blockquote', desc: 'Citação', snippet: '<blockquote>\n\t<p>${1:citação}</p>\n\t<cite>${2:autor}</cite>\n</blockquote>' },
                                                { tag: 'code', desc: 'Código inline', snippet: '<code>${1:código}</code>' },
                                                { tag: 'pre', desc: 'Bloco de código', snippet: '<pre><code>${1:código aqui}</code></pre>' },
                                                { tag: 'mark', desc: 'Texto marcado', snippet: '<mark>${1:texto marcado}</mark>' },
                                                { tag: 'time', desc: 'Data/hora', snippet: '<time datetime="${1:2024-01-01}">${2:1º de Janeiro de 2024}</time>' },
                                                { tag: 'details', desc: 'Detalhes expansíveis', snippet: '<details>\n\t<summary>${1:Clique para expandir}</summary>\n\t<p>${2:Conteúdo detalhado aqui}</p>\n</details>' }
                                            ];

                                            commonTags.forEach((item, index) => {
                                                suggestions.push({
                                                    label: item.tag,
                                                    kind: monaco.languages.CompletionItemKind.Class,
                                                    insertText: item.snippet,
                                                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                    detail: `HTML ${item.desc}`,
                                                    documentation: item.desc,
                                                    range: range,
                                                    sortText: `${index + 1}`,
                                                    filterText: item.tag
                                                });
                                            });
                                        }

                                        // 3. ATRIBUTOS INTELIGENTES
                                        if (isInTag && !isInAttribute) {
                                            const commonAttributes = [
                                                { attr: 'class', desc: 'Classes CSS', snippet: 'class="${1:nome-da-classe}"' },
                                                { attr: 'id', desc: 'Identificador único', snippet: 'id="${1:identificador}"' },
                                                { attr: 'style', desc: 'Estilos inline', snippet: 'style="${1:color: red;}"' },
                                                { attr: 'title', desc: 'Tooltip', snippet: 'title="${1:descrição do elemento}"' },
                                                { attr: 'data-', desc: 'Atributo de dados', snippet: 'data-${1:custom}="${2:valor}"' },
                                                { attr: 'aria-', desc: 'Acessibilidade', snippet: 'aria-${1:label}="${2:descrição}"' },
                                                { attr: 'role', desc: 'Papel semântico', snippet: 'role="${1:button}"' },
                                                { attr: 'tabindex', desc: 'Ordem de tabulação', snippet: 'tabindex="${1:0}"' }
                                            ];

                                            commonAttributes.forEach((item, index) => {
                                                suggestions.push({
                                                    label: item.attr,
                                                    kind: monaco.languages.CompletionItemKind.Property,
                                                    insertText: item.snippet,
                                                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                                    detail: `HTML Attribute: ${item.desc}`,
                                                    documentation: item.desc,
                                                    range: range,
                                                    sortText: `attr${index + 1}`,
                                                    filterText: item.attr
                                                });
                                            });
                                        }

                                        // 4. VALORES DE ATRIBUTOS INTELIGENTES
                                        if (isInAttribute) {
                                            if (lineContent.includes('type=')) {
                                                const inputTypes = ['text', 'password', 'email', 'number', 'tel', 'url', 'date', 'time', 'datetime-local', 'month', 'week', 'color', 'range', 'file', 'checkbox', 'radio', 'submit', 'reset', 'button', 'image', 'hidden'];
                                                inputTypes.forEach(type => {
                                                    suggestions.push({
                                                        label: type,
                                                        kind: monaco.languages.CompletionItemKind.Value,
                                                        insertText: type,
                                                        detail: `Input type: ${type}`,
                                                        documentation: `Tipo de input ${type}`,
                                                        range: range,
                                                        sortText: type,
                                                        filterText: type
                                                    });
                                                });
                                            }
                                        }

                                        // 5. SUGESTÕES CONTEXTUAIS
                                        if (hasContent && word.word.length > 0) {
                                            // Filtrar sugestões baseado no que o usuário está digitando
                                            const filteredSuggestions = suggestions.filter(s =>
                                                s.filterText?.toLowerCase().includes(word.word.toLowerCase()) ||
                                                s.label.toLowerCase().includes(word.word.toLowerCase())
                                            );

                                            if (filteredSuggestions.length > 0) {
                                                return { suggestions: filteredSuggestions };
                                            }
                                        }

                                        return { suggestions };
                                    }
                                });

                                // Configurar IntelliSense para CSS
                                monaco.languages.registerCompletionItemProvider('css', {
                                    triggerCharacters: ['{', ':', ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                                    provideCompletionItems: (model, position) => {
                                        const word = model.getWordUntilPosition(position);
                                        const range = {
                                            startLineNumber: position.lineNumber,
                                            endLineNumber: position.lineNumber,
                                            startColumn: word.startColumn,
                                            endColumn: word.endColumn,
                                        };

                                        const cssProperties = [
                                            { prop: 'display', values: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'] },
                                            { prop: 'position', values: ['static', 'relative', 'absolute', 'fixed', 'sticky'] },
                                            { prop: 'margin', values: ['0', 'auto', '10px', '1rem', '1em'] },
                                            { prop: 'padding', values: ['0', '10px', '1rem', '1em'] },
                                            { prop: 'color', values: ['#000', '#fff', 'red', 'blue', 'green', 'transparent'] },
                                            { prop: 'background', values: ['#fff', 'transparent', 'url()', 'linear-gradient()'] },
                                            { prop: 'border', values: ['none', '1px solid #000', '2px dashed red'] },
                                            { prop: 'font-size', values: ['12px', '1rem', '1em', 'small', 'medium', 'large'] },
                                            { prop: 'font-weight', values: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
                                            { prop: 'text-align', values: ['left', 'center', 'right', 'justify'] },
                                            { prop: 'width', values: ['auto', '100%', '200px', '50vw'] },
                                            { prop: 'height', values: ['auto', '100%', '200px', '50vh'] },
                                            { prop: 'opacity', values: ['0', '0.5', '1'] },
                                            { prop: 'transform', values: ['none', 'translate()', 'rotate()', 'scale()', 'skew()'] },
                                            { prop: 'transition', values: ['none', 'all 0.3s ease', 'opacity 0.3s'] },
                                            { prop: 'animation', values: ['none', 'fadeIn 1s ease-in-out'] },
                                            { prop: 'box-shadow', values: ['none', '0 2px 4px rgba(0,0,0,0.1)', 'inset 0 1px 0 rgba(255,255,255,0.2)'] },
                                            { prop: 'z-index', values: ['auto', '0', '1', '999'] }
                                        ];

                                        const suggestions = cssProperties.map((item, index) => ({
                                            label: item.prop,
                                            kind: monaco.languages.CompletionItemKind.Property,
                                            insertText: `${item.prop}: ${item.values[0]};`,
                                            detail: `CSS Property: ${item.prop}`,
                                            documentation: `Propriedade CSS ${item.prop}`,
                                            range: range,
                                            sortText: `${index + 1}`,
                                            filterText: item.prop
                                        }));

                                        return { suggestions };
                                    }
                                });

                                // Configurar IntelliSense para JavaScript
                                monaco.languages.registerCompletionItemProvider('javascript', {
                                    triggerCharacters: [' ', '.', '(', '[', '{', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                                    provideCompletionItems: (model, position) => {
                                        const word = model.getWordUntilPosition(position);
                                        const range = {
                                            startLineNumber: position.lineNumber,
                                            endLineNumber: position.lineNumber,
                                            startColumn: word.startColumn,
                                            endColumn: word.endColumn,
                                        };

                                        const jsKeywords = [
                                            'const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'class', 'extends', 'super', 'new', 'this', 'typeof', 'instanceof', 'delete', 'void', 'with', 'debugger', 'export', 'import', 'default', 'static', 'async', 'await', 'yield', 'get', 'set'
                                        ];

                                        const suggestions = jsKeywords.map((keyword, index) => ({
                                            label: keyword,
                                            kind: monaco.languages.CompletionItemKind.Keyword,
                                            insertText: keyword,
                                            detail: `JavaScript Keyword: ${keyword}`,
                                            documentation: `Palavra-chave JavaScript ${keyword}`,
                                            range: range,
                                            sortText: `${index + 1}`,
                                            filterText: keyword
                                        }));

                                        return { suggestions };
                                    }
                                });

                                // Emmet para Tab
                                editor.addCommand(monaco.KeyCode.Tab, () => {
                                    const position = editor.getPosition();
                                    if (!position) return;

                                    const lineContent = editor.getModel()?.getLineContent(position.lineNumber) || '';
                                    if (lineContent.trim() === '!') {
                                        editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
                                    }
                                });
                            }}
                            onChange={(value) => {
                                if (value !== undefined) {
                                    setEditorContent(value);
                                }
                            }}
                        />

                        {/* Indicador de IntelliSense */}
                        <div className="absolute top-2 right-2 bg-[#238636] text-white px-2 py-1 rounded text-xs z-10">
                            IntelliSense: ON
                        </div>
                    </div>
                </div>
            </div>

            {/* Painel inferior */}
            {showPanel && (
                <>
                    {/* Área de redimensionamento do painel */}
                    <div
                        className="h-1 bg-[#30363d] cursor-row-resize hover:bg-[#58a6ff]"
                        onMouseDown={() => startResize('panel')}
                    />

                    {/* Painel inferior */}
                    <div
                        ref={panelRef}
                        className="bg-[#0d1117] border-t border-[#30363d]"
                        style={{ height: panelHeight }}
                    >
                        {/* Abas do painel inferior */}
                        <div className="flex bg-[#161b22] border-b border-[#30363d]">
                            {bottomPanels.map(panel => (
                                <div
                                    key={panel.id}
                                    className={`flex items-center px-3 py-2 border-r border-[#30363d] cursor-pointer ${panel.isActive ? 'bg-[#0d1117] text-[#c9d1d9]' : 'bg-[#161b22] text-[#8b949e] hover:bg-[#0d1117]'}`}
                                    onClick={() => toggleBottomPanel(panel.id)}
                                >
                                    {panel.icon}
                                    <span className="ml-2 text-sm">{panel.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* Conteúdo do painel inferior */}
                        <div className="flex-1 p-4 overflow-auto">
                            <div className="text-[#c9d1d9]">
                                <div className="text-sm font-semibold mb-2">Cursor Fenix IDE</div>
                                <div className="text-xs text-[#8b949e]">Editor moderno inspirado no Cursor IDE</div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal de Configurações Avançadas */}
            {showSettingsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#0d1117] border border-[#30363d] rounded-lg w-[800px] h-[600px] flex flex-col">
                        {/* Header do Modal */}
                        <div className="bg-[#161b22] border-b border-[#30363d] px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#c9d1d9]">Configurações Avançadas</h2>
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Tabs de Configuração */}
                        <div className="flex border-b border-[#30363d]">
                            {['editor', 'terminal', 'git', 'performance', 'themes', 'extensions'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveSettingsTab(tab)}
                                    className={`px-4 py-3 text-sm font-medium transition-colors ${activeSettingsTab === tab
                                        ? 'text-[#58a6ff] border-b-2 border-[#58a6ff] bg-[#0d1117]'
                                        : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Conteúdo das Configurações */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            {activeSettingsTab === 'editor' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Configurações do Editor</h3>

                                    {/* Fonte e Tamanho */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Tamanho da Fonte</label>
                                            <input
                                                type="range"
                                                min="8"
                                                max="32"
                                                value={fontSize}
                                                onChange={(e) => setFontSize(Number(e.target.value))}
                                                className="w-full h-2 bg-[#30363d] rounded-lg appearance-none cursor-pointer"
                                            />
                                            <span className="text-sm text-[#c9d1d9]">{fontSize}px</span>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Família da Fonte</label>
                                            <select
                                                value={fontFamily}
                                                onChange={(e) => setFontFamily(e.target.value)}
                                                className="w-full bg-[#21262d] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9]"
                                            >
                                                <option value="JetBrains Mono, Consolas, Monaco, monospace">JetBrains Mono</option>
                                                <option value="Fira Code, Consolas, Monaco, monospace">Fira Code</option>
                                                <option value="Source Code Pro, Consolas, Monaco, monospace">Source Code Pro</option>
                                                <option value="Cascadia Code, Consolas, Monaco, monospace">Cascadia Code</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Configurações Visuais */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={showLineNumbers}
                                                    onChange={(e) => setShowLineNumbers(e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-[#c9d1d9]">Mostrar números de linha</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={wordWrap}
                                                    onChange={(e) => setWordWrap(e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-[#c9d1d9]">Quebra de linha</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={showMinimap}
                                                    onChange={(e) => setShowMinimap(e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-[#c9d1d9]">Mostrar minimap</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={bracketMatching}
                                                    onChange={(e) => setBracketMatching(e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-[#c9d1d9]">Matching de parênteses</span>
                                            </label>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={autoClosingBrackets}
                                                    onChange={(e) => setAutoClosingBrackets(e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-[#c9d1d9]">Fechar parênteses automaticamente</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={autoIndent}
                                                    onChange={(e) => setAutoIndent(e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-[#c9d1d9]">Indentação automática</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formatOnPaste}
                                                    onChange={(e) => setFormatOnPaste(e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-[#c9d1d9]">Formatar ao colar</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formatOnType}
                                                    onChange={(e) => setFormatOnType(e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-[#c9d1d9]">Formatar ao digitar</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Estilo do Cursor */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Estilo do Cursor</label>
                                            <select
                                                value={cursorStyle}
                                                onChange={(e) => setCursorStyle(e.target.value as 'line' | 'block' | 'underline')}
                                                className="w-full bg-[#21262d] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9]"
                                            >
                                                <option value="line">Linha</option>
                                                <option value="block">Bloco</option>
                                                <option value="underline">Sublinhado</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Piscada do Cursor</label>
                                            <select
                                                value={cursorBlinking}
                                                onChange={(e) => setCursorBlinking(e.target.value as 'blink' | 'smooth' | 'phase' | 'expand' | 'solid')}
                                                className="w-full bg-[#21262d] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9]"
                                            >
                                                <option value="blink">Piscar</option>
                                                <option value="smooth">Suave</option>
                                                <option value="phase">Fase</option>
                                                <option value="expand">Expandir</option>
                                                <option value="solid">Sólido</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Configurações Avançadas */}
                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={detectIndentation}
                                                onChange={(e) => setDetectIndentation(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm text-[#c9d1d9]">Detectar indentação automaticamente</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={trimAutoWhitespace}
                                                onChange={(e) => setTrimAutoWhitespace(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm text-[#c9d1d9]">Remover espaços em branco automaticamente</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={smoothScrolling}
                                                onChange={(e) => setSmoothScrolling(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm text-[#c9d1d9]">Rolagem suave</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={largeFileOptimizations}
                                                onChange={(e) => setLargeFileOptimizations(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm text-[#c9d1d9]">Otimizações para arquivos grandes</span>
                                        </label>
                                    </div>

                                    {/* Tamanho da Tab */}
                                    <div>
                                        <label className="block text-sm font-medium text-[#8b949e] mb-2">Tamanho da Tab</label>
                                        <div className="flex space-x-2">
                                            {[2, 4, 6, 8].map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setTabSize(size)}
                                                    className={`px-3 py-1 rounded text-sm ${tabSize === size
                                                        ? 'bg-[#58a6ff] text-white'
                                                        : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSettingsTab === 'terminal' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Configurações do Terminal</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Shell Padrão</label>
                                            <select className="w-full bg-[#21262d] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9]">
                                                <option value="powershell">PowerShell</option>
                                                <option value="cmd">Command Prompt</option>
                                                <option value="bash">Git Bash</option>
                                                <option value="zsh">Zsh</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Tamanho da Fonte</label>
                                            <input
                                                type="range"
                                                min="10"
                                                max="24"
                                                defaultValue="14"
                                                className="w-full h-2 bg-[#30363d] rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Executar comandos automaticamente</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Mostrar histórico de comandos</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Autocompletar comandos</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeSettingsTab === 'git' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Configurações do Git</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Nome do Usuário</label>
                                            <input
                                                type="text"
                                                defaultValue="Seu Nome"
                                                className="w-full bg-[#21262d] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue="seu@email.com"
                                                className="w-full bg-[#21262d] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Auto-fetch de repositórios</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Mostrar mudanças em tempo real</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Confirmar antes de fazer push</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeSettingsTab === 'performance' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Monitor de Performance</h3>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-[#161b22] p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-[#8b949e] mb-2">Uso de Memória</h4>
                                            <div className="text-2xl font-bold text-[#58a6ff]">{performanceMetrics.memoryUsage} MB</div>
                                            <div className="text-xs text-[#8b949e]">Última atualização: {new Date(performanceMetrics.lastUpdate).toLocaleTimeString()}</div>
                                        </div>
                                        <div className="bg-[#161b22] p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-[#8b949e] mb-2">CPU</h4>
                                            <div className="text-2xl font-bold text-[#f85149]">{performanceMetrics.cpuUsage}%</div>
                                            <div className="text-xs text-[#8b949e]">Uso atual</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Monitoramento em tempo real</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Alertas de performance</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Otimizações automáticas</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeSettingsTab === 'themes' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Temas e Aparência</h3>

                                    <div className="grid grid-cols-3 gap-4">
                                        {['Dark', 'Light', 'High Contrast', 'Monokai', 'Solarized', 'Dracula'].map(theme => (
                                            <div
                                                key={theme}
                                                className="bg-[#161b22] p-4 rounded-lg border border-[#30363d] cursor-pointer hover:border-[#58a6ff] transition-colors"
                                            >
                                                <div className="text-sm font-medium text-[#c9d1d9] mb-2">{theme}</div>
                                                <div className="w-full h-20 bg-gradient-to-br from-[#21262d] to-[#30363d] rounded"></div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Aplicar tema automaticamente</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="mr-2" />
                                            <span className="text-sm text-[#c9d1d9]">Sincronizar com sistema</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeSettingsTab === 'extensions' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Extensões e Plugins</h3>

                                    <div className="space-y-4">
                                        {[
                                            { name: 'Prettier', desc: 'Formatador de código', status: 'Instalado' },
                                            { name: 'ESLint', desc: 'Linter JavaScript', status: 'Instalado' },
                                            { name: 'GitLens', desc: 'Supercharge Git', status: 'Disponível' },
                                            { name: 'Live Server', desc: 'Servidor local', status: 'Disponível' }
                                        ].map(ext => (
                                            <div key={ext.name} className="flex items-center justify-between p-3 bg-[#161b22] rounded-lg">
                                                <div>
                                                    <div className="font-medium text-[#c9d1d9]">{ext.name}</div>
                                                    <div className="text-sm text-[#8b949e]">{ext.desc}</div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-xs px-2 py-1 rounded ${ext.status === 'Instalado'
                                                        ? 'bg-[#238636] text-white'
                                                        : 'bg-[#21262d] text-[#8b949e]'
                                                        }`}>
                                                        {ext.status}
                                                    </span>
                                                    <button className="px-3 py-1 bg-[#58a6ff] text-white text-sm rounded hover:bg-[#1f6feb] transition-colors">
                                                        {ext.status === 'Instalado' ? 'Desinstalar' : 'Instalar'}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer do Modal */}
                        <div className="bg-[#161b22] border-t border-[#30363d] px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d] transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043] transition-colors"
                            >
                                Salvar Configurações
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Terminal Integrado Avançado */}
            {showPanel && bottomPanels.find(p => p.id === 'terminal')?.isActive && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                    <div className="bg-[#0d1117] border border-[#30363d] rounded-lg w-[900px] h-[600px] flex flex-col">
                        <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-[#c9d1d9]">Terminal Integrado</h3>
                            <button
                                onClick={() => toggleBottomPanel('problems')}
                                className="text-[#8b949e] hover:text-[#c9d1d9]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 p-4 bg-[#0d1117] text-[#c9d1d9] font-mono text-sm">
                            <div className="mb-4">
                                <span className="text-[#58a6ff]">PS</span>
                                <span className="text-[#8b949e]"> C:\Users\Micro\Desktop\Fenix\frontend</span>
                                <span className="text-[#238636]">&gt;</span>
                                <span className="text-[#c9d1d9]"> npm run dev</span>
                            </div>
                            <div className="text-[#8b949e]">
                                &gt; fenix-ide@0.1.0 dev<br />
                                &gt; next dev<br /><br />
                                ✓ Ready in 2.3s<br />
                                ✓ Local: http://localhost:3000<br />
                                ✓ Network: http://192.168.1.100:3000<br /><br />
                                ✓ Compiled / in 1.2s<br />
                                ✓ Compiled /api/hello in 0.8s<br />
                                ✓ Compiled /components/CursorFenixIDE in 0.5s
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview CSS Avançado */}
            {showCssPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                    <div className="bg-[#0d1117] border border-[#30363d] rounded-lg w-[1000px] h-[700px] flex flex-col">
                        <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-[#c9d1d9]">Preview CSS - Live Preview</h3>
                            <button
                                onClick={() => setShowCssPreview(false)}
                                className="text-[#8b949e] hover:text-[#c9d1d9]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 flex">
                            <div className="w-1/2 p-4 border-r border-[#30363d]">
                                <h4 className="text-sm font-medium text-[#8b949e] mb-2">CSS Code</h4>
                                <div className="bg-[#161b22] p-3 rounded font-mono text-xs text-[#c9d1d9] h-full overflow-auto">
                                    {`.preview-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}\n\n.preview-item {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px);\n  border-radius: 12px;\n  padding: 24px;\n  text-align: center;\n  color: white;\n  transition: transform 0.3s ease;\n}\n\n.preview-item:hover {\n  transform: translateY(-5px);\n}`}
                                </div>
                            </div>
                            <div className="w-1/2 p-4">
                                <h4 className="text-sm font-medium text-[#8b949e] mb-2">Live Preview</h4>
                                <div className="bg-white rounded h-full p-6">
                                    <div className="preview-container">
                                        <div className="preview-item">
                                            <h3 className="text-xl font-bold mb-2">Card 1</h3>
                                            <p>Conteúdo do primeiro card com efeitos visuais</p>
                                        </div>
                                        <div className="preview-item">
                                            <h3 className="text-xl font-bold mb-2">Card 2</h3>
                                            <p>Segundo card com hover effects</p>
                                        </div>
                                        <div className="preview-item">
                                            <h3 className="text-xl font-bold mb-2">Card 3</h3>
                                            <p>Terceiro card responsivo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Barra de status */}
            <div className="bg-[#161b22] border-t border-[#30363d] flex items-center justify-between px-4 py-2 text-xs text-[#8b949e]">
                <div className="flex items-center space-x-4">
                    <span>git: {gitStatus.currentBranch}</span>
                    <span>{gitStatus.changes} changes</span>
                    <span>{currentTab.language.toUpperCase()}</span>
                    <span>UTF-8</span>
                    <span>LF</span>
                    <span>Spaces: {tabSize}</span>
                    <span>Memory: {performanceMetrics.memoryUsage} MB</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span>Problems: 0</span>
                    <span>Terminal: 1</span>
                    <span className="text-[#238636]">IntelliSense: Ativo</span>
                </div>
            </div>

            {/* Modal para Criar Novo Arquivo */}
            {fileManager.showCreateFile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#0d1117] border border-[#30363d] rounded-lg w-[500px] p-6">
                        <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Criar Novo Arquivo</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Nome do Arquivo</label>
                            <input
                                type="text"
                                value={fileManager.newFileName}
                                onChange={(e) => setFileManager(prev => ({ ...prev, newFileName: e.target.value }))}
                                placeholder="exemplo.html"
                                className="w-full bg-[#21262d] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9]"
                                autoFocus
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setFileManager(prev => ({ ...prev, showCreateFile: false, newFileName: '' }))}
                                className="px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d] transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (fileManager.newFileName.trim()) {
                                        createNewFile(fileManager.newFileName.trim());
                                        setFileManager(prev => ({ ...prev, showCreateFile: false, newFileName: '' }));
                                    }
                                }}
                                className="px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043] transition-colors"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Criar Nova Pasta */}
            {fileManager.showCreateFolder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#0d1117] border border-[#30363d] rounded-lg w-[500px] p-6">
                        <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Criar Nova Pasta</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#8b949e] mb-2">Nome da Pasta</label>
                            <input
                                type="text"
                                value={fileManager.newFolderName}
                                onChange={(e) => setFileManager(prev => ({ ...prev, newFolderName: e.target.value }))}
                                placeholder="nova-pasta"
                                className="w-full bg-[#21262d] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9]"
                                autoFocus
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setFileManager(prev => ({ ...prev, showCreateFolder: false, newFolderName: '' }))}
                                className="px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d] transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (fileManager.newFolderName.trim()) {
                                        console.log('Criando pasta:', fileManager.newFolderName.trim());
                                        setFileManager(prev => ({ ...prev, showCreateFolder: false, newFolderName: '' }));
                                    }
                                }}
                                className="px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043] transition-colors"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Exclusão */}
            {fileManager.showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#0d1117] border border-[#30363d] rounded-lg w-[500px] p-6">
                        <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Confirmar Exclusão</h3>
                        <p className="text-[#8b949e] mb-6">
                            Tem certeza que deseja excluir o arquivo "{fileManager.selectedFile}"? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setFileManager(prev => ({ ...prev, showDeleteConfirm: false, selectedFile: null }))}
                                className="px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d] transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (fileManager.selectedFile) {
                                        deleteFile(fileManager.selectedFile);
                                        setFileManager(prev => ({ ...prev, showDeleteConfirm: false, selectedFile: null }));
                                    }
                                }}
                                className="px-4 py-2 bg-[#f85149] text-white rounded hover:bg-[#da3633] transition-colors"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CursorFenixIDE;
