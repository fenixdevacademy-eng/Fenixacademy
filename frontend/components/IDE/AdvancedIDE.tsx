'use client';

import React, { useState, useEffect } from 'react';
import { Code, Play, Square, Download, Upload, Settings, Maximize2, Minimize2 } from 'lucide-react';
import MonacoEditor from './MonacoEditor';
import FileExplorer from './FileExplorer';
import Terminal from './Terminal';
import PreviewPanel from './PreviewPanel';
import CommandPalette from './CommandPalette';
import StatusBar from './StatusBar';
import TabManager from './TabManager';
import ActivityBar from './ActivityBar';

interface File {
    id: string;
    name: string;
    content: string;
    language: string;
    path: string;
    isModified: boolean;
}

interface Project {
    id: string;
    name: string;
    files: File[];
    activeFileId: string | null;
}

export default function AdvancedIDE() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activePanel, setActivePanel] = useState<'explorer' | 'search' | 'git' | 'extensions'>('explorer');

    const [project, setProject] = useState<Project>({
        id: 'default',
        name: 'Meu Projeto',
        files: [
            {
                id: '1',
                name: 'index.html',
                content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Bem-vindo ao Fênix IDE!</h1>
        <p>Comece a codar e veja a mágica acontecer.</p>
        <button onclick="hello()">Clique aqui</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
                language: 'html',
                path: '/index.html',
                isModified: false
            },
            {
                id: '2',
                name: 'style.css',
                content: `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 50px 20px;
}

h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    opacity: 0.9;
}

button {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}`,
                language: 'css',
                path: '/style.css',
                isModified: false
            },
            {
                id: '3',
                name: 'script.js',
                content: `function hello() {
    alert('Olá! Bem-vindo ao Fênix IDE! 🚀');
    console.log('Código executado com sucesso!');
}

// Exemplo de função mais complexa
function createElement(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) {
        element.className = className;
    }
    return element;
}

// Adicionar um elemento dinamicamente
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const newElement = createElement('div', 'Este elemento foi criado via JavaScript!', 'dynamic-element');
    container.appendChild(newElement);
});`,
                language: 'javascript',
                path: '/script.js',
                isModified: false
            }
        ],
        activeFileId: '1'
    });

    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const activeFile = project.files.find(f => f.id === project.activeFileId);

    const handleFileSelect = (fileId: string) => {
        setProject(prev => ({ ...prev, activeFileId: fileId }));
    };

    const handleFileContentChange = (content: string) => {
        if (!project.activeFileId) return;

        setProject(prev => ({
            ...prev,
            files: prev.files.map(f =>
                f.id === project.activeFileId
                    ? { ...f, content, isModified: true }
                    : f
            )
        }));
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setTerminalOutput(prev => [...prev, '$ Executando código...']);

        // Simular execução
        setTimeout(() => {
            setTerminalOutput(prev => [
                ...prev,
                '✓ Código executado com sucesso!',
                '✓ HTML renderizado',
                '✓ CSS aplicado',
                '✓ JavaScript executado',
                '$ Pronto para próxima execução'
            ]);
            setIsRunning(false);
        }, 2000);
    };

    const handleStopCode = () => {
        setIsRunning(false);
        setTerminalOutput(prev => [...prev, '$ Execução interrompida']);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // Atalhos de teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '`':
                        e.preventDefault();
                        setShowCommandPalette(true);
                        break;
                    case 'b':
                        e.preventDefault();
                        toggleSidebar();
                        break;
                    case 'f11':
                        e.preventDefault();
                        toggleFullscreen();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className={`h-screen bg-gray-900 text-white flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-gray-700 rounded transition-colors"
                    >
                        <Code className="w-5 h-5" />
                    </button>
                    <span className="font-semibold">Fênix IDE</span>
                    <span className="text-gray-400">-</span>
                    <span className="text-sm text-gray-300">{project.name}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="flex items-center space-x-2 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded transition-colors"
                    >
                        <Play className="w-4 h-4" />
                        <span>{isRunning ? 'Executando...' : 'Executar'}</span>
                    </button>

                    {isRunning && (
                        <button
                            onClick={handleStopCode}
                            className="flex items-center space-x-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition-colors"
                        >
                            <Square className="w-4 h-4" />
                            <span>Parar</span>
                        </button>
                    )}

                    <button
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-gray-700 rounded transition-colors"
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {!sidebarCollapsed && (
                    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                        <ActivityBar
                            activePanel={activePanel}
                            onPanelChange={setActivePanel}
                        />

                        <div className="flex-1 overflow-hidden">
                            {activePanel === 'explorer' && (
                                <FileExplorer
                                    files={project.files}
                                    activeFileId={project.activeFileId}
                                    onFileSelect={handleFileSelect}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Tabs */}
                    <TabManager
                        files={project.files}
                        activeFileId={project.activeFileId}
                        onFileSelect={handleFileSelect}
                        onFileClose={(fileId) => {
                            // Implementar fechamento de arquivo
                        }}
                    />

                    {/* Editor Area */}
                    <div className="flex-1 flex">
                        {/* Editor */}
                        <div className="flex-1 flex flex-col">
                            {activeFile ? (
                                <MonacoEditor
                                    value={activeFile.content}
                                    language={activeFile.language}
                                    onChange={handleFileContentChange}
                                    theme="vs-dark"
                                />
                            ) : (
                                <div className="flex-1 flex items-center justify-center bg-gray-900">
                                    <div className="text-center">
                                        <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                        <p className="text-gray-400">Selecione um arquivo para começar a editar</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Preview Panel */}
                        <div className="w-1/2 border-l border-gray-700">
                            <PreviewPanel
                                files={project.files}
                                isRunning={isRunning}
                            />
                        </div>
                    </div>

                    {/* Terminal */}
                    <div className="h-48 border-t border-gray-700">
                        <Terminal
                            output={terminalOutput}
                            onCommand={(command) => {
                                setTerminalOutput(prev => [...prev, `$ ${command}`]);
                                // Implementar execução de comandos
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <StatusBar
                activeFile={activeFile}
                isRunning={isRunning}
                terminalOutput={terminalOutput}
            />

            {/* Command Palette */}
            {showCommandPalette && (
                <CommandPalette
                    onClose={() => setShowCommandPalette(false)}
                    onCommand={(command) => {
                        // Implementar execução de comandos
                        setShowCommandPalette(false);
                    }}
                />
            )}
        </div>
    );
}

