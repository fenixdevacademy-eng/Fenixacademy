'use client';

import React, { useState, useEffect } from 'react';
import {
    Play,
    Square,
    Download,
    Upload,
    Settings,
    Terminal,
    FileText,
    Code,
    Monitor,
    Smartphone,
    Tablet,
    Laptop,
    Eye,
    EyeOff,
    RefreshCw,
    Save,
    FolderOpen,
    GitBranch,
    Bug,
    Zap
} from 'lucide-react';

interface CS50IDEProps {
    courseId: string;
    lessonId?: string;
    initialCode?: {
        html?: string;
        css?: string;
        js?: string;
    };
}

interface FileStructure {
    name: string;
    type: 'file' | 'folder';
    language?: string;
    content?: string;
    children?: FileStructure[];
}

export default function CS50IDE({ courseId, lessonId, initialCode }: CS50IDEProps) {
    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
    const [code, setCode] = useState({
        html: initialCode?.html || `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto CS50</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Bem-vindo ao CS50</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Início da Jornada</h2>
            <p>Esta é sua primeira página web criada com a IDE CS50!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2025 - Fenix Academy CS50</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
        css: initialCode?.css || `/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8fafc;
}

/* Header */
header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem 0;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background 0.3s ease;
}

nav a:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Main content */
main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

section {
    background: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

h2 {
    color: #667eea;
    margin-bottom: 1rem;
}

/* Footer */
footer {
    background: #1e293b;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
}

/* Responsividade */
@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    nav ul {
        flex-direction: column;
        gap: 1rem;
    }
    
    main {
        padding: 2rem 1rem;
    }
    
    section {
        padding: 2rem 1rem;
    }
}`,
        js: initialCode?.js || `// CS50 IDE - JavaScript Interativo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 CS50 IDE carregada com sucesso!');
    
    // Adicionar interatividade ao menu
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Adicionar efeito de destaque nos links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Adicionar animação de entrada
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Adicionar contador de visitas
    let visitCount = localStorage.getItem('cs50VisitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('cs50VisitCount', visitCount);
    
    console.log(\`🚀 Esta é sua visita número \${visitCount} na IDE CS50!\`);
});`
    });

    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [showConsole, setShowConsole] = useState(true);
    const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [fileExplorer, setFileExplorer] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [fontSize, setFontSize] = useState(14);

    // Estrutura de arquivos do projeto
    const [projectFiles, setProjectFiles] = useState<FileStructure[]>([
        {
            name: 'index.html',
            type: 'file',
            language: 'html',
            content: code.html
        },
        {
            name: 'styles.css',
            type: 'file',
            language: 'css',
            content: code.css
        },
        {
            name: 'script.js',
            type: 'file',
            language: 'javascript',
            content: code.js
        },
        {
            name: 'assets',
            type: 'folder',
            children: [
                {
                    name: 'images',
                    type: 'folder',
                    children: []
                }
            ]
        }
    ]);

    // Executar código
    const runCode = () => {
        setIsRunning(true);

        // Criar iframe para preview
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CS50 Preview</title>
                <style>${code.css}</style>
            </head>
            <body>
                ${code.html}
                <script>${code.js}</script>
            </body>
            </html>
        `;

        iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);

        const previewContainer = document.getElementById('preview-container');
        if (previewContainer) {
            previewContainer.innerHTML = '';
            previewContainer.appendChild(iframe);
        }

        setIsRunning(false);
    };

    // Salvar projeto
    const saveProject = () => {
        const projectData = {
            courseId,
            lessonId,
            code,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem(`cs50-project-${courseId}-${lessonId}`, JSON.stringify(projectData));

        // Simular salvamento
        setOutput('✅ Projeto salvo com sucesso!');
        setTimeout(() => setOutput(''), 3000);
    };

    // Exportar projeto
    const exportProject = () => {
        const htmlBlob = new Blob([code.html], { type: 'text/html' });
        const cssBlob = new Blob([code.css], { type: 'text/css' });
        const jsBlob = new Blob([code.js], { type: 'text/javascript' });

        // Criar arquivo ZIP (simulado)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(htmlBlob);
        link.download = 'cs50-project.html';
        link.click();

        setOutput('📁 Projeto exportado!');
        setTimeout(() => setOutput(''), 3000);
    };

    // Atualizar código quando mudar a aba
    useEffect(() => {
        const currentFile = projectFiles.find(file =>
            file.language === activeTab ||
            (activeTab === 'js' && file.language === 'javascript')
        );

        if (currentFile?.content) {
            setCode(prev => ({
                ...prev,
                [activeTab]: currentFile.content
            }));
        }
    }, [activeTab, projectFiles]);

    // Salvar código quando mudar
    useEffect(() => {
        setProjectFiles(prev => prev.map(file => {
            if (file.language === activeTab || (activeTab === 'js' && file.language === 'javascript')) {
                return { ...file, content: code[activeTab] };
            }
            return file;
        }));
    }, [code, activeTab]);

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header da IDE */}
            <div className={`border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-lg font-bold text-blue-600">🚀 CS50 IDE</h1>
                        <span className="text-sm text-gray-500">Fundamentos de Desenvolvimento Web</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                            <span>Executar</span>
                        </button>

                        <button
                            onClick={saveProject}
                            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Save className="w-4 h-4" />
                            <span>Salvar</span>
                        </button>

                        <button
                            onClick={exportProject}
                            className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            <Download className="w-4 h-4" />
                            <span>Exportar</span>
                        </button>

                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-[calc(100vh-80px)]">
                {/* File Explorer */}
                {fileExplorer && (
                    <div className={`w-64 border-r ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold mb-2">📁 Projeto CS50</h3>
                            <button className="text-sm text-blue-600 hover:underline">
                                <FolderOpen className="w-4 h-4 inline mr-1" />
                                Abrir Projeto
                            </button>
                        </div>

                        <div className="p-2">
                            {projectFiles.map((file, index) => (
                                <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                    {file.type === 'folder' ? '📁' : '📄'}
                                    <span className="text-sm">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Editor e Preview */}
                <div className="flex-1 flex">
                    {/* Editor */}
                    <div className="flex-1 flex flex-col">
                        {/* Tabs do Editor */}
                        <div className={`border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                            <div className="flex">
                                {[
                                    { id: 'html', name: 'HTML', icon: FileText },
                                    { id: 'css', name: 'CSS', icon: Code },
                                    { id: 'js', name: 'JavaScript', icon: Code }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${activeTab === tab.id
                                                    ? 'border-blue-500 text-blue-600'
                                                    : 'border-transparent hover:border-gray-300'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{tab.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Editor de Código */}
                        <div className="flex-1 p-4">
                            <textarea
                                value={code[activeTab]}
                                onChange={(e) => setCode(prev => ({ ...prev, [activeTab]: e.target.value }))}
                                className={`w-full h-full p-4 font-mono text-sm resize-none rounded-lg border ${theme === 'dark'
                                        ? 'bg-gray-800 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                style={{ fontSize: `${fontSize}px` }}
                                placeholder={`Digite seu código ${activeTab.toUpperCase()} aqui...`}
                            />
                        </div>

                        {/* Console */}
                        {showConsole && (
                            <div className={`h-32 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                                <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold">🐛 Console</h4>
                                    <button
                                        onClick={() => setShowConsole(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        <EyeOff className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-2 h-full overflow-y-auto">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {output || 'Console CS50 IDE - Digite "help" para comandos disponíveis'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preview */}
                    <div className="w-1/2 border-l border-gray-200 dark:border-gray-700">
                        {/* Controles do Preview */}
                        <div className={`p-2 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold">👁️ Preview</h4>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setDevicePreview('desktop')}
                                        className={`p-1 rounded ${devicePreview === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                                    >
                                        <Laptop className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDevicePreview('tablet')}
                                        className={`p-1 rounded ${devicePreview === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                                    >
                                        <Tablet className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDevicePreview('mobile')}
                                        className={`p-1 rounded ${devicePreview === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                                    >
                                        <Smartphone className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setShowConsole(!showConsole)}
                                        className="p-1 rounded text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        {showConsole ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Container do Preview */}
                        <div
                            id="preview-container"
                            className={`h-full ${devicePreview === 'mobile' ? 'max-w-sm mx-auto' :
                                    devicePreview === 'tablet' ? 'max-w-md mx-auto' : 'w-full'
                                } transition-all duration-300`}
                        >
                            <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="bg-gray-100 p-2 border-b flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-500 ml-2">CS50 Preview</span>
                                </div>
                                <div className="p-4 text-center text-gray-500">
                                    Clique em "Executar" para ver o preview do seu código
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
                    <div className={`w-96 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <h3 className="text-lg font-semibold mb-4">⚙️ Configurações da IDE</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Tema</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="light">Claro</option>
                                    <option value="dark">Escuro</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Tamanho da Fonte</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="20"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-500">{fontSize}px</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="fileExplorer"
                                    checked={fileExplorer}
                                    onChange={(e) => setFileExplorer(e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="fileExplorer">Mostrar File Explorer</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="showConsole"
                                    checked={showConsole}
                                    onChange={(e) => setShowConsole(e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="showConsole">Mostrar Console</label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
