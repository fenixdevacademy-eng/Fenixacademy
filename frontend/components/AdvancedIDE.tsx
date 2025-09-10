'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    FolderOpen,
    FolderPlus,
    Search,
    GitBranch,
    Play,
    Package,
    Settings,
    Terminal,
    Bug,
    Zap,
    Users,
    Brain,
    FileText,
    Code,
    Database,
    Cloud,
    Monitor,
    Activity,
    ChevronDown,
    ChevronRight,
    Plus,
    Trash2,
    Edit3,
    Save,
    Download,
    Upload,
    Share2,
    Maximize2,
    Minimize2,
    X,
    Menu,
    Bell,
    User,
    HelpCircle
} from 'lucide-react';
import { useAdvancedIDE } from './AdvancedIDECore';
import AdvancedEditor from './AdvancedEditorSimple';
import AdvancedTerminal from './AdvancedTerminal';
import FunctionalTerminal from './FunctionalTerminal';
import WebPreview from './WebPreview';
import PythonIntelliSense from './PythonIntelliSense';
import AIChatPanel from './AIChatPanel';
import CollaborationPanel from './CollaborationPanel';
import PerformanceMonitor from './PerformanceMonitor';
import DebuggerPanel from './DebuggerPanel';
import PluginManager from './PluginManager';
import SearchPanel from './SearchPanel';
import GitPanel from './GitPanel';
import ProjectTemplates from './ProjectTemplates';
import CourseProjectsPanel from './CourseProjectsPanel';
import { IntelliSenseProvider } from './IntelliSenseProviderFixed';

interface AdvancedIDEProps {
    initialWorkspace?: string;
    theme?: 'dark' | 'light';
    showWelcome?: boolean;
}


// Configuração dos projetos dos cursos
const courseProjects = {
    "python-data-science": {
        name: "Python Data Science",
        emoji: "🐍",
        language: "python",
        path: "/ide-projects/python-data-science"
    },
    "react-advanced": {
        name: "React Advanced",
        emoji: "⚛️",
        language: "javascript",
        path: "/ide-projects/react-advanced"
    },
    "aws-cloud": {
        name: "AWS Cloud",
        emoji: "☁️",
        language: "yaml",
        path: "/ide-projects/aws-cloud"
    },
    "devops-docker": {
        name: "DevOps Docker",
        emoji: "🐳",
        language: "dockerfile",
        path: "/ide-projects/devops-docker"
    },
    "react-native-mobile": {
        name: "React Native Mobile",
        emoji: "📱",
        language: "javascript",
        path: "/ide-projects/react-native-mobile"
    },
    "flutter-mobile": {
        name: "Flutter Mobile",
        emoji: "🎯",
        language: "dart",
        path: "/ide-projects/flutter-mobile"
    },
    "nodejs-apis": {
        name: "Node.js APIs",
        emoji: "🚀",
        language: "javascript",
        path: "/ide-projects/nodejs-apis"
    },
    "blockchain-smart-contracts": {
        name: "Blockchain Smart Contracts",
        emoji: "⛓️",
        language: "solidity",
        path: "/ide-projects/blockchain-smart-contracts"
    }
};

const AdvancedIDE: React.FC<AdvancedIDEProps> = ({
    initialWorkspace = '/workspace',
    theme = 'dark',
    showWelcome = true
}) => {
    const { isInitialized, context, executeCommand } = useAdvancedIDE();

    // Estados principais
    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [panelHeight, setPanelHeight] = useState(300);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showPanel, setShowPanel] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeSidebarTab, setActiveSidebarTab] = useState('explorer');
    const [activePanelTab, setActivePanelTab] = useState('terminal');

    // Estados do workspace
    const [workspaceFiles, setWorkspaceFiles] = useState<Map<string, any>>(new Map());
    const [openTabs, setOpenTabs] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/']));

    // Estados de funcionalidades
    const [showAIChat, setShowAIChat] = useState(false);
    const [showCollaboration, setShowCollaboration] = useState(false);
    const [showPerformance, setShowPerformance] = useState(false);
    const [showDebugger, setShowDebugger] = useState(false);
    const [showPlugins, setShowPlugins] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showGit, setShowGit] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showCourseProjects, setShowCourseProjects] = useState(false);

    // Novos estados para funcionalidades melhoradas
    const [showTerminal, setShowTerminal] = useState(false);
    const [showWebPreview, setShowWebPreview] = useState(false);
    const [showPythonIntelliSense, setShowPythonIntelliSense] = useState(false);
    const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
    const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
    const [isWebPreviewMinimized, setIsWebPreviewMinimized] = useState(false);
    const [isWebPreviewMaximized, setIsWebPreviewMaximized] = useState(false);

    // Estados do editor
    const [currentFileContent, setCurrentFileContent] = useState('');
    const [currentFileType, setCurrentFileType] = useState('');
    const [currentLine, setCurrentLine] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);

    // Estados de performance
    const [performanceMetrics, setPerformanceMetrics] = useState({
        memory: { used: 0, total: 0, heap: 0 },
        cpu: { usage: 0, cores: 4 },
        network: { requests: 0, bytesReceived: 0, bytesSent: 0 },
        editor: { latency: 0, renderTime: 0, updateTime: 0 }
    });

    // Funções de controle
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const togglePanel = () => setShowPanel(!showPanel);
    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    // Funções para novos componentes
    const toggleTerminal = () => setShowTerminal(!showTerminal);
    const toggleWebPreview = () => setShowWebPreview(!showWebPreview);
    const togglePythonIntelliSense = () => setShowPythonIntelliSense(!showPythonIntelliSense);
    const toggleCourseProjects = () => setShowCourseProjects(!showCourseProjects);

    const handleTerminalMinimize = () => setIsTerminalMinimized(!isTerminalMinimized);
    const handleTerminalMaximize = () => setIsTerminalMaximized(!isTerminalMaximized);
    const handleTerminalClose = () => setShowTerminal(false);

    const handleWebPreviewMinimize = () => setIsWebPreviewMinimized(!isWebPreviewMinimized);
    const handleWebPreviewMaximize = () => setIsWebPreviewMaximized(!isWebPreviewMaximized);
    const handleWebPreviewClose = () => setShowWebPreview(false);

    const handlePythonSuggestionSelect = (suggestion: any) => {
        // Implementar lógica para inserir sugestão no editor
        console.log('Sugestão selecionada:', suggestion);
        setShowPythonIntelliSense(false);
    };

    // Refs
    const sidebarRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<any>(null);

    // Inicializar workspace
    useEffect(() => {
        if (isInitialized && context) {
            initializeWorkspace();
            startPerformanceMonitoring();
        }
    }, [isInitialized, context]);

    const initializeWorkspace = useCallback(() => {
        if (!context) return;

        // Criar estrutura inicial do workspace
        const initialFiles = new Map([
            ['/src', { type: 'folder', name: 'src', children: [] }],
            ['/public', { type: 'folder', name: 'public', children: [] }],
            ['/components', { type: 'folder', name: 'components', children: [] }],
            ['/src/index.html', {
                type: 'file',
                name: 'index.html',
                content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fenix Advanced IDE</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>🚀 Fenix Advanced IDE</h1>
        <p>IDE profissional com recursos avançados</p>
    </header>
    <main>
        <section>
            <h2>Recursos Avançados</h2>
            <ul>
                <li>🧠 IA Integrada</li>
                <li>👥 Colaboração em Tempo Real</li>
                <li>🐛 Debugging Avançado</li>
                <li>📊 Monitoramento de Performance</li>
                <li>🔌 Sistema de Plugins</li>
            </ul>
        </section>
    </main>
    <script src="script.js"></script>
</body>
</html>`,
                language: 'html'
            }],
            ['/src/styles.css', {
                type: 'file',
                name: 'styles.css',
                content: `/* Fenix Advanced IDE Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #333;
    min-height: 100vh;
}

header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2rem;
    text-align: center;
    color: white;
}

h1 {
    font-size: 3rem;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 0.5rem 0;
    font-size: 1.2rem;
}`,
                language: 'css'
            }],
            ['/src/script.js', {
                type: 'file',
                name: 'script.js',
                content: `// Fenix Advanced IDE JavaScript
console.log('🚀 Fenix Advanced IDE carregada!');

// Funcionalidades avançadas
class FenixIDE {
    constructor() {
        this.features = [
            'IA Integrada',
            'Colaboração em Tempo Real',
            'Debugging Avançado',
            'Monitoramento de Performance',
            'Sistema de Plugins'
        ];
    }
    
    initialize() {
        console.log('Inicializando recursos avançados...');
        this.setupAI();
        this.setupCollaboration();
        this.setupDebugging();
        this.setupPerformanceMonitoring();
    }
    
    setupAI() {
        console.log('🧠 Configurando IA...');
    }
    
    setupCollaboration() {
        console.log('👥 Configurando colaboração...');
    }
    
    setupDebugging() {
        console.log('🐛 Configurando debugging...');
    }
    
    setupPerformanceMonitoring() {
        console.log('📊 Configurando monitoramento...');
    }
}

// Inicializar IDE
const ide = new FenixIDE();
ide.initialize();`,
                language: 'javascript'
            }]
        ]);

        setWorkspaceFiles(initialFiles);

        // Abrir arquivo inicial
        const initialFile = '/src/index.html';
        const file = initialFiles.get(initialFile);
        if (file) {
            setOpenTabs([{ id: initialFile, name: file.name, content: file.content, language: file.language }]);
            setActiveTab(initialFile);
        }
    }, [context]);

    const startPerformanceMonitoring = useCallback(() => {
        if (!context) return;

        const interval = setInterval(() => {
            if (context.performance.isMonitoring) {
                const metrics = context.performance.metrics;
                setPerformanceMetrics({
                    memory: {
                        used: Math.random() * 100,
                        total: 100,
                        heap: Math.random() * 50
                    },
                    cpu: {
                        usage: Math.random() * 100,
                        cores: metrics.cpu.cores
                    },
                    network: {
                        requests: Math.floor(Math.random() * 100),
                        bytesReceived: Math.floor(Math.random() * 1000000),
                        bytesSent: Math.floor(Math.random() * 100000)
                    },
                    editor: {
                        latency: Math.random() * 10,
                        renderTime: Math.random() * 5,
                        updateTime: Math.random() * 3
                    }
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [context]);

    // Handlers de eventos
    const handleSidebarResize = useCallback((e: MouseEvent) => {
        if (sidebarRef.current) {
            const newWidth = e.clientX;
            if (newWidth >= 200 && newWidth <= 500) {
                setSidebarWidth(newWidth);
            }
        }
    }, []);

    const handlePanelResize = useCallback((e: MouseEvent) => {
        if (panelRef.current) {
            const newHeight = window.innerHeight - e.clientY;
            if (newHeight >= 150 && newHeight <= 600) {
                setPanelHeight(newHeight);
            }
        }
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'n':
                    e.preventDefault();
                    executeCommand('file.new');
                    break;
                case 's':
                    e.preventDefault();
                    executeCommand('file.save');
                    break;
                case 'f':
                    e.preventDefault();
                    setShowSearch(true);
                    setActiveSidebarTab('search');
                    break;
                case '`':
                    e.preventDefault();
                    setShowPanel(!showPanel);
                    break;
                case 'b':
                    e.preventDefault();
                    setShowSidebar(!showSidebar);
                    break;
            }
        }

        if (e.key === 'F11') {
            e.preventDefault();
            setIsFullscreen(!isFullscreen);
        }
    }, [executeCommand, showPanel, showSidebar, isFullscreen]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Funções de workspace
    const createFile = useCallback((path: string, name: string) => {
        const newFile = {
            type: 'file',
            name,
            content: '',
            language: getLanguageFromExtension(name.split('.').pop() || '')
        };

        setWorkspaceFiles(prev => new Map(prev.set(path, newFile)));

        // Abrir arquivo em nova aba
        setOpenTabs(prev => [...prev, { id: path, name, content: '', language: newFile.language }]);
        setActiveTab(path);
    }, []);

    const createFolder = useCallback((path: string, name: string) => {
        const newFolder = {
            type: 'folder',
            name,
            children: []
        };

        setWorkspaceFiles(prev => new Map(prev.set(path, newFolder)));
    }, []);

    const deleteFile = useCallback((path: string) => {
        setWorkspaceFiles(prev => {
            const newMap = new Map(prev);
            newMap.delete(path);
            return newMap;
        });

        // Fechar aba se estiver aberta
        setOpenTabs(prev => prev.filter(tab => tab.id !== path));
        if (activeTab === path) {
            setActiveTab(openTabs.length > 1 ? openTabs[0].id : null);
        }
    }, [activeTab, openTabs]);

    const toggleFolder = useCallback((path: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(path)) {
                newSet.delete(path);
            } else {
                newSet.add(path);
            }
            return newSet;
        });
    }, []);

    const getLanguageFromExtension = (extension: string): string => {
        const languageMap: Record<string, string> = {
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'typescript',
            'tsx': 'typescript',
            'py': 'python',
            'html': 'html',
            'css': 'css',
            'scss': 'scss',
            'json': 'json',
            'md': 'markdown',
            'xml': 'xml',
            'yaml': 'yaml',
            'yml': 'yaml',
            'sql': 'sql',
            'php': 'php',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'cs': 'csharp',
            'go': 'go',
            'rs': 'rust',
            'rb': 'ruby',
            'swift': 'swift',
            'kt': 'kotlin',
            'dart': 'dart',
            'vue': 'vue',
            'svelte': 'svelte'
        };
        return languageMap[extension] || 'plaintext';
    };

    const renderFileTree = (files: Map<string, any>, basePath: string = '/') => {
        const items: JSX.Element[] = [];

        for (const [path, file] of files) {
            if (path.startsWith(basePath) && path !== basePath) {
                const relativePath = path.substring(basePath.length);
                const pathParts = relativePath.split('/').filter(p => p);

                if (pathParts.length === 1) {
                    if (file.type === 'folder') {
                        const isExpanded = expandedFolders.has(path);
                        items.push(
                            <div key={path} className="file-tree-item">
                                <div
                                    className="file-tree-folder"
                                    onClick={() => toggleFolder(path)}
                                >
                                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    <FolderOpen className="w-4 h-4" />
                                    <span>{file.name}</span>
                                </div>
                                {isExpanded && renderFileTree(files, path + '/')}
                            </div>
                        );
                    } else {
                        items.push(
                            <div
                                key={path}
                                className="file-tree-item"
                                onClick={() => {
                                    setOpenTabs(prev => {
                                        const existingTab = prev.find(tab => tab.id === path);
                                        if (!existingTab) {
                                            return [...prev, { id: path, name: file.name, content: file.content, language: file.language }];
                                        }
                                        return prev;
                                    });
                                    setActiveTab(path);
                                }}
                            >
                                <FileText className="w-4 h-4" />
                                <span>{file.name}</span>
                            </div>
                        );
                    }
                }
            }
        }

        return items;
    };

    if (!isInitialized) {
        return (
            <div className="advanced-ide-loading">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Inicializando Fenix Advanced IDE...</p>
                </div>
            </div>
        );
    }

    return (
        <IntelliSenseProvider>
            <div className={`advanced-ide ${theme} ${isFullscreen ? 'fullscreen' : ''}`}>
                {/* Header */}
                <header className="ide-header">
                    <div className="header-left">
                        <button
                            className="header-button"
                            onClick={() => setShowSidebar(!showSidebar)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="header-title">
                            <h1>🚀 Fenix Advanced IDE</h1>
                        </div>
                    </div>

                    <div className="header-center">
                        <div className="tab-bar">
                            {openTabs.map(tab => (
                                <div
                                    key={tab.id}
                                    className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                    <button
                                        className="tab-close"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenTabs(prev => prev.filter(t => t.id !== tab.id));
                                            if (activeTab === tab.id) {
                                                const remainingTabs = openTabs.filter(t => t.id !== tab.id);
                                                setActiveTab(remainingTabs.length > 0 ? remainingTabs[0].id : null);
                                            }
                                        }}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="header-right">
                        {/* Novos botões de funcionalidades */}
                        <button
                            className={`header-button ${showTerminal ? 'active' : ''}`}
                            onClick={toggleTerminal}
                            title="Terminal"
                        >
                            <Terminal className="w-5 h-5" />
                        </button>
                        <button
                            className={`header-button ${showWebPreview ? 'active' : ''}`}
                            onClick={toggleWebPreview}
                            title="Web Preview"
                        >
                            <Monitor className="w-5 h-5" />
                        </button>
                        <button
                            className={`header-button ${showPythonIntelliSense ? 'active' : ''}`}
                            onClick={togglePythonIntelliSense}
                            title="Python IntelliSense"
                        >
                            <Code className="w-5 h-5" />
                        </button>
                        <button
                            className={`header-button ${showCourseProjects ? 'active' : ''}`}
                            onClick={toggleCourseProjects}
                            title="Projetos dos Cursos"
                        >
                            <FolderOpen className="w-5 h-5" />
                        </button>

                        <div className="header-divider"></div>

                        <button className="header-button">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="header-button">
                            <User className="w-5 h-5" />
                        </button>
                        <button className="header-button">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button
                            className="header-button"
                            onClick={() => setIsFullscreen(!isFullscreen)}
                        >
                            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="ide-main">
                    {/* Sidebar */}
                    {showSidebar && (
                        <div
                            ref={sidebarRef}
                            className="ide-sidebar"
                            style={{ width: sidebarWidth }}
                        >
                            <div className="sidebar-tabs">
                                <button
                                    className={`sidebar-tab ${activeSidebarTab === 'explorer' ? 'active' : ''}`}
                                    onClick={() => setActiveSidebarTab('explorer')}
                                >
                                    <FolderOpen className="w-4 h-4" />
                                    <span>EXPLORER</span>
                                </button>
                                <button
                                    className={`sidebar-tab ${activeSidebarTab === 'search' ? 'active' : ''}`}
                                    onClick={() => setActiveSidebarTab('search')}
                                >
                                    <Search className="w-4 h-4" />
                                    <span>SEARCH</span>
                                </button>
                                <button
                                    className={`sidebar-tab ${activeSidebarTab === 'git' ? 'active' : ''}`}
                                    onClick={() => setActiveSidebarTab('git')}
                                >
                                    <GitBranch className="w-4 h-4" />
                                    <span>SOURCE CONTROL</span>
                                </button>
                                <button
                                    className={`sidebar-tab ${activeSidebarTab === 'run' ? 'active' : ''}`}
                                    onClick={() => setActiveSidebarTab('run')}
                                >
                                    <Play className="w-4 h-4" />
                                    <span>RUN AND DEBUG</span>
                                </button>
                                <button
                                    className={`sidebar-tab ${activeSidebarTab === 'extensions' ? 'active' : ''}`}
                                    onClick={() => setActiveSidebarTab('extensions')}
                                >
                                    <Package className="w-4 h-4" />
                                    <span>EXTENSIONS</span>
                                </button>
                                <button
                                    className={`sidebar-tab ${activeSidebarTab === 'templates' ? 'active' : ''}`}
                                    onClick={() => setActiveSidebarTab('templates')}
                                >
                                    <FolderPlus className="w-4 h-4" />
                                    <span>TEMPLATES</span>
                                </button>
                            </div>

                            <div className="sidebar-content">
                                {activeSidebarTab === 'explorer' && (
                                    <div className="explorer-panel">
                                        <div className="panel-header">
                                            <h3>EXPLORER</h3>
                                            <div className="panel-actions">
                                                <button
                                                    className="action-button"
                                                    onClick={() => {
                                                        const name = prompt('Nome da pasta:');
                                                        if (name) createFolder(`/${name}`, name);
                                                    }}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="action-button"
                                                    onClick={() => {
                                                        const name = prompt('Nome do arquivo:');
                                                        if (name) createFile(`/${name}`, name);
                                                    }}
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="file-tree">
                                            {renderFileTree(workspaceFiles)}
                                        </div>
                                    </div>
                                )}

                                {activeSidebarTab === 'search' && <SearchPanel />}
                                {activeSidebarTab === 'git' && <GitPanel />}
                                {activeSidebarTab === 'run' && <DebuggerPanel />}
                                {activeSidebarTab === 'extensions' && <PluginManager />}
                                {activeSidebarTab === 'templates' && (
                                    <ProjectTemplates
                                        onTemplateSelect={(template) => {
                                            console.log('Template selecionado:', template);
                                            // Aqui você pode implementar a lógica para criar o projeto
                                        }}
                                        theme={theme}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Editor Area */}
                    <div className="ide-editor-area">
                        {activeTab ? (
                            <AdvancedEditor
                                content={openTabs.find(tab => tab.id === activeTab)?.content || ''}
                                language={openTabs.find(tab => tab.id === activeTab)?.language || 'plaintext'}
                                filename={activeTab}
                                onContentChange={(content) => {
                                    setOpenTabs(prev => prev.map(tab =>
                                        tab.id === activeTab ? { ...tab, content } : tab
                                    ));
                                }}
                                onSave={() => {
                                    console.log('Salvando arquivo:', activeTab);
                                }}
                                onExecute={() => {
                                    console.log('Executando arquivo:', activeTab);
                                }}
                                theme={theme}
                            />
                        ) : (
                            <div className="welcome-screen">
                                <div className="welcome-content">
                                    <h2>🚀 Bem-vindo ao Fenix Advanced IDE</h2>
                                    <p>IDE profissional com recursos avançados para desenvolvimento</p>

                                    <div className="welcome-features">
                                        <div className="feature-card">
                                            <Brain className="w-8 h-8" />
                                            <h3>IA Integrada</h3>
                                            <p>Assistente de IA para desenvolvimento inteligente</p>
                                        </div>
                                        <div className="feature-card">
                                            <Users className="w-8 h-8" />
                                            <h3>Colaboração</h3>
                                            <p>Pair programming e code review em tempo real</p>
                                        </div>
                                        <div className="feature-card">
                                            <Bug className="w-8 h-8" />
                                            <h3>Debugging</h3>
                                            <p>Ferramentas avançadas de debugging e profiling</p>
                                        </div>
                                        <div className="feature-card">
                                            <Activity className="w-8 h-8" />
                                            <h3>Performance</h3>
                                            <p>Monitoramento de performance em tempo real</p>
                                        </div>
                                    </div>

                                    <div className="welcome-actions">
                                        <button
                                            className="action-button primary"
                                            onClick={() => executeCommand('file.new')}
                                        >
                                            <Plus className="w-4 h-4" />
                                            Novo Arquivo
                                        </button>
                                        <button
                                            className="action-button"
                                            onClick={() => setShowAIChat(true)}
                                        >
                                            <Brain className="w-4 h-4" />
                                            Abrir IA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Panel */}
                {showPanel && (
                    <div
                        ref={panelRef}
                        className="ide-panel"
                        style={{ height: panelHeight }}
                    >
                        <div className="panel-tabs">
                            <button
                                className={`panel-tab ${activePanelTab === 'terminal' ? 'active' : ''}`}
                                onClick={() => setActivePanelTab('terminal')}
                            >
                                <Terminal className="w-4 h-4" />
                                <span>TERMINAL</span>
                            </button>
                            <button
                                className={`panel-tab ${activePanelTab === 'problems' ? 'active' : ''}`}
                                onClick={() => setActivePanelTab('problems')}
                            >
                                <Bug className="w-4 h-4" />
                                <span>PROBLEMS</span>
                            </button>
                            <button
                                className={`panel-tab ${activePanelTab === 'output' ? 'active' : ''}`}
                                onClick={() => setActivePanelTab('output')}
                            >
                                <Monitor className="w-4 h-4" />
                                <span>OUTPUT</span>
                            </button>
                            <button
                                className={`panel-tab ${activePanelTab === 'debug' ? 'active' : ''}`}
                                onClick={() => setActivePanelTab('debug')}
                            >
                                <Bug className="w-4 h-4" />
                                <span>DEBUG CONSOLE</span>
                            </button>
                        </div>

                        <div className="panel-content">
                            {activePanelTab === 'terminal' && <AdvancedTerminal />}
                            {activePanelTab === 'problems' && (
                                <div className="problems-panel">
                                    <p>Nenhum problema encontrado</p>
                                </div>
                            )}
                            {activePanelTab === 'output' && (
                                <div className="output-panel">
                                    <p>Output será exibido aqui</p>
                                </div>
                            )}
                            {activePanelTab === 'debug' && (
                                <div className="debug-panel">
                                    <p>Console de debug será exibido aqui</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Floating Panels */}
                {showAIChat && (
                    <AIChatPanel onClose={() => setShowAIChat(false)} />
                )}

                {showCollaboration && (
                    <CollaborationPanel onClose={() => setShowCollaboration(false)} />
                )}

                {showPerformance && (
                    <PerformanceMonitor onClose={() => setShowPerformance(false)} />
                )}

                {/* Novos Componentes Melhorados */}
                {showTerminal && (
                    <FunctionalTerminal
                        isVisible={showTerminal}
                        onToggle={toggleTerminal}
                        onMinimize={handleTerminalMinimize}
                        onMaximize={handleTerminalMaximize}
                        onClose={handleTerminalClose}
                        isMinimized={isTerminalMinimized}
                        isMaximized={isTerminalMaximized}
                    />
                )}

                {showWebPreview && (
                    <WebPreview
                        isVisible={showWebPreview}
                        onToggle={toggleWebPreview}
                        onMinimize={handleWebPreviewMinimize}
                        onMaximize={handleWebPreviewMaximize}
                        onClose={handleWebPreviewClose}
                        isMinimized={isWebPreviewMinimized}
                        isMaximized={isWebPreviewMaximized}
                        htmlContent={currentFileType === 'html' ? currentFileContent : ''}
                        cssContent={currentFileType === 'css' ? currentFileContent : ''}
                        jsContent={currentFileType === 'javascript' ? currentFileContent : ''}
                    />
                )}

                {showPythonIntelliSense && (
                    <PythonIntelliSense
                        isVisible={showPythonIntelliSense}
                        onSuggestionSelect={handlePythonSuggestionSelect}
                        currentLine={currentLine}
                        cursorPosition={cursorPosition}
                    />
                )}

                {showCourseProjects && (
                    <div className="course-projects-panel">
                        <CourseProjectsPanel
                            onProjectSelect={(project) => {
                                console.log('Projeto selecionado:', project);
                                // Implementar lógica para abrir projeto
                            }}
                            onFileOpen={(projectId, filePath) => {
                                console.log('Arquivo aberto:', projectId, filePath);
                                // Implementar lógica para abrir arquivo
                            }}
                        />
                    </div>
                )}

                {/* Status Bar */}
                <footer className="ide-status-bar">
                    <div className="status-left">
                        <span className="status-item">
                            <GitBranch className="w-4 h-4" />
                            main
                        </span>
                        <span className="status-item">
                            <Activity className="w-4 h-4" />
                            {performanceMetrics.cpu.usage.toFixed(1)}% CPU
                        </span>
                        <span className="status-item">
                            <Database className="w-4 h-4" />
                            {performanceMetrics.memory.used.toFixed(1)}MB
                        </span>
                    </div>

                    <div className="status-center">
                        <span className="status-item">
                            {activeTab ? `Linha ${1}, Coluna ${1}` : 'Pronto'}
                        </span>
                    </div>

                    <div className="status-right">
                        <span className="status-item">
                            <Code className="w-4 h-4" />
                            {activeTab ? openTabs.find(tab => tab.id === activeTab)?.language || 'plaintext' : 'Nenhum arquivo'}
                        </span>
                        <span className="status-item">
                            <Cloud className="w-4 h-4" />
                            Online
                        </span>
                    </div>
                </footer>
            </div>
        </IntelliSenseProvider>
    );
};

export default AdvancedIDE;

