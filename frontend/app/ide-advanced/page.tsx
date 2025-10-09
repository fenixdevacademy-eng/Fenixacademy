'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Square,
  Download,
  Upload,
  Settings,
  Terminal,
  FileText,
  FolderOpen,
  Search,
  Zap,
  Code,
  Bug,
  Eye,
  Maximize2,
  Minimize2,
  X,
  Plus,
  Save,
  Copy,
  Share2,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  PlayCircle,
  PauseCircle,
  Square as StopIcon,
  Package,
  Layers,
  Activity,
  BarChart3,
  Palette,
  GitBranch,
  Database,
  Globe,
  Image,
  Music,
  Video,
  Shield,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Star,
  Heart,
  RefreshCw,
  Maximize,
  Minimize,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  SkipForward,
  SkipBack,
  AlertTriangle,
  Info,
  Network,
  Clock,
  Filter,
  Trash2,
  Brain
} from 'lucide-react';

import ExtensionsPanel from '@/components/ide/ExtensionsPanel';
import AdvancedDebugger from '@/components/ide/AdvancedDebugger';
import FenixIntelliSense from '@/components/ide/FenixIntelliSense';

interface File {
  id: string;
  name: string;
  content: string;
  language: string;
  isOpen: boolean;
  isModified: boolean;
}

interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
}

export default function FenixIDE() {
  const [files, setFiles] = useState<File[]>([
    {
      id: '1',
      name: 'index.html',
      content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fenix Academy - IDE</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Fenix Academy IDE</h1>
        <div class="feature">
            <h2>IDE Inovador</h2>
            <p>Desenvolvido com as melhores tecnologias para uma experiência única!</p>
        </div>
        <div class="feature">
            <h2>Recursos Avançados</h2>
            <ul>
                <li>Editor de código com syntax highlighting</li>
                <li>Terminal integrado</li>
                <li>Preview em tempo real</li>
                <li>Debugger avançado</li>
                <li>Extensões personalizáveis</li>
            </ul>
        </div>
    </div>
    <script>
        console.log('Fenix Academy IDE carregado!');
        
        // Adicionar interatividade
        document.addEventListener('DOMContentLoaded', function() {
            const features = document.querySelectorAll('.feature');
            features.forEach((feature, index) => {
                feature.style.animation = \`fadeInUp 0.6s ease-out \${index * 0.2}s both\`;
            });
        });
        
        // CSS para animação
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`,
      language: 'html',
      isOpen: true,
      isModified: false
    }
  ]);

  const [activeFile, setActiveFile] = useState<File | null>(files[0]);
  const [terminalHistory, setTerminalHistory] = useState<TerminalCommand[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [breakpoints, setBreakpoints] = useState<number[]>([]);
  const [activePanel, setActivePanel] = useState<'editor' | 'extensions' | 'debugger' | 'intellisense'>('editor');
  const [showSidebar, setShowSidebar] = useState(true);
  const [intelliSenseVisible, setIntelliSenseVisible] = useState(false);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLInputElement>(null);

  // Syntax highlighting
  const getLanguageFromFileName = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'jsx': 'javascript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'json': 'json',
      'xml': 'xml',
      'md': 'markdown',
      'sql': 'sql'
    };
    return languageMap[ext || ''] || 'text';
  };

  // File operations
  const createNewFile = () => {
    const fileName = prompt('Nome do arquivo:');
    if (fileName) {
      const newFile: File = {
        id: Date.now().toString(),
        name: fileName,
        content: '',
        language: getLanguageFromFileName(fileName),
        isOpen: true,
        isModified: false
      };
      setFiles(prev => [...prev, newFile]);
      setActiveFile(newFile);
    }
  };

  const saveFile = () => {
    if (activeFile) {
      setFiles(prev => prev.map(file =>
        file.id === activeFile.id
          ? { ...file, content: editorRef.current?.value || '', isModified: false }
          : file
      ));
    }
  };

  const runCode = async () => {
    if (!activeFile) return;

    setIsRunning(true);

    // Simulate code execution
    setTimeout(() => {
      const output = `Executando ${activeFile.name}...\nCódigo executado com sucesso!`;
      setTerminalHistory(prev => [...prev, {
        id: Date.now().toString(),
        command: `run ${activeFile.name}`,
        output,
        timestamp: new Date()
      }]);
      setIsRunning(false);
    }, 1000);
  };

  const executeTerminalCommand = () => {
    if (!currentCommand.trim()) return;

    const output = `Comando executado: ${currentCommand}`;
    setTerminalHistory(prev => [...prev, {
      id: Date.now().toString(),
      command: currentCommand,
      output,
      timestamp: new Date()
    }]);
    setCurrentCommand('');
  };

  const toggleBreakpoint = (lineNumber: number) => {
    setBreakpoints(prev =>
      prev.includes(lineNumber)
        ? prev.filter(line => line !== lineNumber)
        : [...prev, lineNumber]
    );
  };

  const getPreviewContent = () => {
    if (!activeFile) return '';

    if (activeFile.language === 'html') {
      return activeFile.content;
    }

    if (activeFile.language === 'css') {
      return `<!DOCTYPE html>
<html>
<head>
  <style>${activeFile.content}</style>
</head>
<body>
  <div class="preview-content">
    <h1>Preview do CSS</h1>
    <p>Este é um exemplo de como seu CSS será aplicado.</p>
  </div>
</body>
</html>`;
    }

    return `<pre><code>${activeFile.content}</code></pre>`;
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">Fenix IDE</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-sm"
            >
              {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Executando...' : 'Executar'}</span>
            </button>

            <button
              onClick={saveFile}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              <Save className="w-4 h-4" />
              <span>Salvar</span>
            </button>

            <button
              onClick={() => setActivePanel(activePanel === 'debugger' ? 'editor' : 'debugger')}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${activePanel === 'debugger' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
            >
              <Bug className="w-4 h-4" />
              <span>Debug</span>
            </button>

            <button
              onClick={() => setActivePanel(activePanel === 'extensions' ? 'editor' : 'extensions')}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${activePanel === 'extensions' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
            >
              <Package className="w-4 h-4" />
              <span>Extensões</span>
            </button>

            <button
              onClick={() => setActivePanel(activePanel === 'intellisense' ? 'editor' : 'intellisense')}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${activePanel === 'intellisense' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
            >
              <Brain className="w-4 h-4" />
              <span>IntelliSense</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-1 rounded ${previewMode === 'desktop' ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-1 rounded ${previewMode === 'tablet' ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-1 rounded ${previewMode === 'mobile' ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 bg-gray-600 hover:bg-gray-700 rounded"
          >
            {sidebarCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!sidebarCollapsed && (
          <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <button
                onClick={createNewFile}
                className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Arquivo</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Arquivos
              </h3>
              {files.map(file => (
                <div
                  key={file.id}
                  onClick={() => setActiveFile(file)}
                  className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-700 ${activeFile?.id === file.id ? 'bg-blue-600' : ''
                    }`}
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{file.name}</span>
                  {file.isModified && <div className="w-2 h-2 bg-yellow-400 rounded-full" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activePanel === 'editor' && (
            <div className="flex-1 flex">
              <div className="flex-1 flex flex-col">
                {/* File Tabs */}
                <div className="bg-gray-800 border-b border-gray-700 flex overflow-x-auto">
                  {files.filter(file => file.isOpen).map(file => (
                    <div
                      key={file.id}
                      className={`flex items-center space-x-2 px-4 py-2 border-r border-gray-700 cursor-pointer hover:bg-gray-700 ${activeFile?.id === file.id ? 'bg-gray-700' : ''
                        }`}
                      onClick={() => setActiveFile(file)}
                    >
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{file.name}</span>
                      {file.isModified && <div className="w-2 h-2 bg-yellow-400 rounded-full" />}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFiles(prev => prev.map(f =>
                            f.id === file.id ? { ...f, isOpen: false } : f
                          ));
                          if (activeFile?.id === file.id) {
                            const nextFile = files.find(f => f.id !== file.id && f.isOpen);
                            setActiveFile(nextFile || null);
                          }
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Code Editor */}
                <div className="flex-1 relative">
                  <textarea
                    ref={editorRef}
                    value={activeFile?.content || ''}
                    onChange={(e) => {
                      if (activeFile) {
                        setFiles(prev => prev.map(file =>
                          file.id === activeFile.id
                            ? { ...file, content: e.target.value, isModified: true }
                            : file
                        ));
                      }
                    }}
                    className="w-full h-full bg-gray-900 text-white p-4 font-mono text-sm resize-none focus:outline-none"
                    placeholder="Digite seu código aqui..."
                    spellCheck={false}
                  />

                  {/* Line Numbers */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-700 text-gray-400 text-xs font-mono flex flex-col items-center py-4">
                    {activeFile?.content.split('\n').map((_, index) => (
                      <div key={index} className="h-5 flex items-center">
                        {index + 1}
                      </div>
                    ))}
                  </div>

                  {/* Breakpoints */}
                  {debugMode && (
                    <div className="absolute left-12 top-0 bottom-0 w-4 flex flex-col py-4">
                      {activeFile?.content.split('\n').map((_, index) => (
                        <button
                          key={index}
                          onClick={() => toggleBreakpoint(index + 1)}
                          className={`h-5 w-4 flex items-center justify-center ${breakpoints.includes(index + 1) ? 'text-red-500' : 'text-transparent hover:text-gray-400'
                            }`}
                        >
                          ●
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Panel */}
              <div className="w-1/2 border-l border-gray-700 flex flex-col">
                <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">Preview</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 bg-gray-600 hover:bg-gray-700 rounded">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="p-1 bg-gray-600 hover:bg-gray-700 rounded">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-white">
                  <iframe
                    srcDoc={getPreviewContent()}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>
          )}

          {activePanel === 'extensions' && (
            <div className="flex-1">
              <ExtensionsPanel />
            </div>
          )}

          {activePanel === 'debugger' && (
            <div className="flex-1">
              <AdvancedDebugger />
            </div>
          )}

          {activePanel === 'intellisense' && (
            <div className="flex-1">
              <FenixIntelliSense />
            </div>
          )}

          {/* Terminal */}
          {showTerminal && (
            <div className="h-48 bg-gray-900 border-t border-gray-700 flex flex-col">
              <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">Terminal</span>
                </div>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {terminalHistory.map(entry => (
                  <div key={entry.id} className="text-sm">
                    <div className="text-green-400">$ {entry.command}</div>
                    <div className="text-gray-300 ml-4">{entry.output}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 p-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">$</span>
                  <input
                    ref={terminalRef}
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && executeTerminalCommand()}
                    className="flex-1 bg-transparent text-white focus:outline-none"
                    placeholder="Digite um comando..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}