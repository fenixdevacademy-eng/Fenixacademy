'use client';

import React, { useState } from 'react';
import {
    Plus,
    Folder,
    File,
    Save,
    Play,
    Trash2,
    Code,
    Bot,
    Zap,
    Trophy,
    Sun,
    Moon,
    ChevronDown,
    ChevronRight,
    Sparkles,
    Settings,
    Eye,
    Monitor,
    FolderOpen,
    Users
} from 'lucide-react';
import { templates, getTemplatesByCategory, Template } from './IDETemplates';
import AdvancedEditor from './AdvancedEditor';
import RealTimeHotReload from './RealTimeHotReload';
import RealAIAssistant from './RealAIAssistant';
import ProjectManager from './ProjectManager';
import RealTimeCollaboration from './RealTimeCollaboration';

interface FileItem {
    id: string;
    name: string;
    content: string;
    language: string;
    isModified: boolean;
    type: 'file' | 'folder';
    children?: FileItem[];
}

export default function BasicIDE() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [activeFile, setActiveFile] = useState<FileItem | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [showAI, setShowAI] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [showTemplates, setShowTemplates] = useState(false);
    const [useAdvancedEditor, setUseAdvancedEditor] = useState(true);
    const [showHotReload, setShowHotReload] = useState(false);
    const [hotReloadFiles, setHotReloadFiles] = useState<{
        html: string;
        css: string;
        js: string;
    }>({
        html: '',
        css: '',
        js: ''
    });
    const [showProjects, setShowProjects] = useState(false);
    const [showCollaboration, setShowCollaboration] = useState(false);
    const [currentProject, setCurrentProject] = useState<any>(null);

    // Função para criar novo arquivo
    const createNewFile = () => {
        const newFile: FileItem = {
            id: `file-${Date.now()}`,
            name: `novo-arquivo-${files.length + 1}.js`,
            content: '// Seu código aqui\nconsole.log("Olá, mundo!");',
            language: 'javascript',
            isModified: false,
            type: 'file'
        };

        setFiles(prev => [...prev, newFile]);
        setActiveFile(newFile);
    };

    // Função para criar arquivo a partir de template
    const createFromTemplate = (template: Template) => {
        const newFile: FileItem = {
            id: `file-${Date.now()}`,
            name: template.name.toLowerCase().replace(/\s+/g, '-') + '.' + template.extension,
            content: template.content,
            language: template.language,
            isModified: false,
            type: 'file'
        };

        setFiles(prev => [...prev, newFile]);
        setActiveFile(newFile);
        setShowTemplates(false);

        console.log(`✅ Arquivo criado a partir do template: ${template.name}`);
    };

    // Função para criar nova pasta
    const createNewFolder = () => {
        const newFolder: FileItem = {
            id: `folder-${Date.now()}`,
            name: `nova-pasta-${files.length + 1}`,
            content: '',
            language: '',
            isModified: false,
            type: 'folder',
            children: []
        };

        setFiles(prev => [...prev, newFolder]);
    };

    // Função para salvar arquivo
    const saveFile = (fileId: string) => {
        setFiles(prev => prev.map(file =>
            file.id === fileId
                ? { ...file, isModified: false }
                : file
        ));

        if (activeFile?.id === fileId) {
            setActiveFile(prev => prev ? { ...prev, isModified: false } : null);
        }

        console.log('✅ Arquivo salvo com sucesso!');
    };

    // Função para deletar arquivo
    const deleteFile = (fileId: string) => {
        setFiles(prev => prev.filter(file => file.id !== fileId));

        if (activeFile?.id === fileId) {
            setActiveFile(null);
        }

        console.log('🗑️ Arquivo deletado!');
    };

    // Função para executar código
    const executeCode = (file: FileItem) => {
        if (!file || file.type === 'folder') return;

        try {
            switch (file.language) {
                case 'html':
                    // Para HTML, abrir em nova aba
                    const htmlBlob = new Blob([file.content], { type: 'text/html' });
                    const htmlUrl = URL.createObjectURL(htmlBlob);
                    window.open(htmlUrl, '_blank');
                    console.log('✅ HTML aberto em nova aba!');
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

                default:
                    console.log(`📝 Arquivo ${file.language} detectado. Use o AI Assistant para análise.`);
                    break;
            }
        } catch (error) {
            console.error('❌ Erro ao executar código:', error);
        }
    };

    // Função para alternar tema
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Função para expandir/colapsar pasta
    const toggleFolder = (folderId: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(folderId)) {
                newSet.delete(folderId);
            } else {
                newSet.add(folderId);
            }
            return newSet;
        });
    };

    // Função para abrir arquivo
    const openFile = (file: FileItem) => {
        if (file.type === 'file') {
            setActiveFile(file);
        }
    };

    // Função para atualizar conteúdo do arquivo
    const updateFileContent = (content: string) => {
        if (activeFile) {
            setActiveFile(prev => prev ? { ...prev, content, isModified: true } : null);
            setFiles(prev => prev.map(file =>
                file.id === activeFile.id
                    ? { ...file, content, isModified: true }
                    : file
            ));

            // Atualizar arquivos do hot reload se aplicável
            if (activeFile.language === 'html') {
                setHotReloadFiles(prev => ({ ...prev, html: content }));
            } else if (activeFile.language === 'css') {
                setHotReloadFiles(prev => ({ ...prev, css: content }));
            } else if (activeFile.language === 'javascript') {
                setHotReloadFiles(prev => ({ ...prev, js: content }));
            }
        }
    };

    // Função para usar AI Assistant
    const useAIAssistant = () => {
        if (!activeFile || activeFile.type === 'folder') {
            setAiResponse('❌ Abra um arquivo para usar o AI Assistant');
            setShowAI(true);
            return;
        }

        setShowAI(true);
        setAiResponse('🤖 AI Assistant Real ativado! Analisando seu código...');
    };

    // Função para ativar Hot Reload
    const activateHotReload = () => {
        // Coletar arquivos HTML, CSS e JS para o hot reload
        const htmlFile = files.find(f => f.type === 'file' && f.language === 'html');
        const cssFile = files.find(f => f.type === 'file' && f.language === 'css');
        const jsFile = files.find(f => f.type === 'file' && f.language === 'javascript');

        if (htmlFile || cssFile || jsFile) {
            setHotReloadFiles({
                html: htmlFile?.content || '',
                css: cssFile?.content || '',
                js: jsFile?.content || ''
            });
            setShowHotReload(true);
            console.log('⚡ Hot Reload ativado com sucesso!');
        } else {
            console.log('❌ Nenhum arquivo HTML, CSS ou JS encontrado para o Hot Reload');
        }
    };

    // Função para mostrar gamificação
    const showGamification = () => {
        const totalFiles = files.filter(f => f.type === 'file').length;
        const totalFolders = files.filter(f => f.type === 'folder').length;

        console.log(`🏆 Sistema de Gamificação:
🌱 Nível: ${totalFiles < 5 ? 'Iniciante' : totalFiles < 10 ? 'Desenvolvedor' : 'Programador'}
⭐ Pontos: ${totalFiles * 10 + totalFolders * 5}
📁 Arquivos criados: ${totalFiles}
📂 Pastas criadas: ${totalFolders}
🎯 Próximo objetivo: ${totalFiles < 5 ? 'Criar 5 arquivos' : totalFiles < 10 ? 'Criar 10 arquivos' : 'Criar 15 arquivos'}`);
    };

    // Função para abrir gerenciador de projetos
    const openProjectManager = () => {
        setShowProjects(true);
    };

    // Função para selecionar projeto
    const selectProject = (project: any) => {
        setCurrentProject(project);
        setShowProjects(false);
        console.log(`✅ Projeto selecionado: ${project.name}`);
    };

    // Função para abrir colaboração
    const openCollaboration = () => {
        if (!currentProject) {
            console.log('❌ Selecione um projeto primeiro para abrir a colaboração');
            return;
        }
        setShowCollaboration(true);
    };

    const templateCategories = getTemplatesByCategory();

    return (
        <div className={`flex h-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Sidebar Esquerda - Gerenciamento de Arquivos */}
            <div className={`w-64 border-r ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} relative`}>
                <div className="p-4 pb-24">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center space-x-2">
                            <Folder className="w-4 h-4" />
                            <span>Arquivos</span>
                        </h3>
                        <ChevronDown className="w-4 h-4" />
                    </div>

                    {/* Botões de Ação */}
                    <div className="space-y-2 mb-4">
                        <button
                            onClick={createNewFile}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Criar</span>
                        </button>

                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Templates</span>
                        </button>

                        <button
                            onClick={createNewFolder}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                        >
                            <Folder className="w-4 h-4" />
                            <span>Nova Pasta</span>
                        </button>
                    </div>

                    {/* Templates */}
                    {showTemplates && (
                        <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
                            <h4 className="text-sm font-medium mb-2">Templates Disponíveis:</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {Object.entries(templateCategories).map(([category, categoryTemplates]) => (
                                    <div key={category}>
                                        <h5 className="text-xs font-medium text-gray-400 mb-1">{category}</h5>
                                        {categoryTemplates.map(template => (
                                            <button
                                                key={template.id}
                                                onClick={() => createFromTemplate(template)}
                                                className="w-full text-left p-2 text-xs hover:bg-gray-600/50 rounded transition-colors flex items-center space-x-2"
                                            >
                                                {template.icon}
                                                <span className="truncate">{template.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lista de Arquivos */}
                    <div className="space-y-1">
                        {files.map(file => (
                            <div key={file.id}>
                                <div
                                    className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-opacity-20 ${file.type === 'folder'
                                        ? 'hover:bg-blue-500'
                                        : 'hover:bg-gray-500'
                                        } ${activeFile?.id === file.id
                                            ? 'bg-blue-600 bg-opacity-20'
                                            : ''
                                        }`}
                                    onClick={() => file.type === 'folder' ? toggleFolder(file.id) : openFile(file)}
                                >
                                    {file.type === 'folder' ? (
                                        <>
                                            {expandedFolders.has(file.id) ? (
                                                <ChevronDown className="w-3 h-3" />
                                            ) : (
                                                <ChevronRight className="w-3 h-3" />
                                            )}
                                            <Folder className="w-4 h-4 text-blue-400" />
                                        </>
                                    ) : (
                                        <File className="w-4 h-4 text-green-400" />
                                    )}

                                    <span className="text-sm truncate">
                                        {file.name}
                                        {file.isModified && <span className="text-yellow-400">*</span>}
                                    </span>

                                    {file.type === 'file' && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteFile(file.id);
                                            }}
                                            className="ml-auto opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>

                                {/* Conteúdo da pasta expandida */}
                                {file.type === 'folder' && expandedFolders.has(file.id) && file.children && (
                                    <div className="ml-4 space-y-1">
                                        {file.children.map(child => (
                                            <div
                                                key={child.id}
                                                className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-opacity-20 hover:bg-gray-500 ${activeFile?.id === child.id
                                                    ? 'bg-blue-600 bg-opacity-20'
                                                    : ''
                                                    }`}
                                                onClick={() => openFile(child)}
                                            >
                                                <File className="w-4 h-4 text-green-400" />
                                                <span className="text-sm truncate">
                                                    {child.name}
                                                    {child.isModified && <span className="text-yellow-400">*</span>}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botões de Funcionalidades */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-800/90 to-transparent">
                    <div className="space-y-2">
                        <button
                            onClick={openProjectManager}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg"
                        >
                            <FolderOpen className="w-4 h-4" />
                            <span>Projetos</span>
                        </button>

                        <button
                            onClick={openCollaboration}
                            disabled={!currentProject}
                            className={`w-full flex items-center justify-center space-x-2 px-3 py-2 transition-colors text-sm font-medium shadow-lg ${currentProject
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                }`}
                        >
                            <Users className="w-4 h-4" />
                            <span>Colaboração</span>
                        </button>

                        <button
                            onClick={useAIAssistant}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg"
                        >
                            <Bot className="w-4 h-4" />
                            <span>AI Assistant</span>
                        </button>

                        <button
                            onClick={activateHotReload}
                            className={`w-full flex items-center justify-center space-x-2 px-3 py-2 transition-colors text-sm font-medium shadow-lg ${showHotReload
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                }`}
                        >
                            <Zap className="w-4 h-4" />
                            <span>{showHotReload ? 'Hot Reload Ativo' : 'Hot Reload'}</span>
                        </button>

                        <button
                            onClick={showGamification}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg"
                        >
                            <Trophy className="w-4 h-4" />
                            <span>Gamificação</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Área Principal - Editor ou Hot Reload */}
            {showHotReload ? (
                <div className="flex-1 flex flex-col">
                    {/* Barra Superior do Hot Reload */}
                    <div className={`border-b p-3 flex items-center justify-between ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                        }`}>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>

                            <span className="text-sm text-gray-500">
                                ⚡ Hot Reload Ativo - Preview em Tempo Real
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowHotReload(false)}
                                className="flex items-center space-x-2 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                                title="Voltar ao Editor"
                            >
                                <Eye className="w-3 h-3" />
                                <span>Editor</span>
                            </button>
                        </div>
                    </div>

                    {/* Hot Reload Component */}
                    <div className="flex-1">
                        <RealTimeHotReload
                            htmlContent={hotReloadFiles.html}
                            cssContent={hotReloadFiles.css}
                            jsContent={hotReloadFiles.js}
                            theme={theme}
                            onReload={() => console.log('🔄 Hot Reload executado')}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col">
                    {/* Barra Superior */}
                    <div className={`border-b p-3 flex items-center justify-between ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                        }`}>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>

                            <span className="text-sm text-gray-500">
                                {activeFile ? `${activeFile.name} - ${activeFile.language.toUpperCase()}` : 'Nenhum arquivo aberto'}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            {activeFile && activeFile.type === 'file' && (
                                <>
                                    <button
                                        onClick={() => saveFile(activeFile.id)}
                                        disabled={!activeFile.isModified}
                                        className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors text-sm"
                                        title="Salvar arquivo"
                                    >
                                        <Save className="w-3 h-3" />
                                        <span>Salvar</span>
                                    </button>

                                    <button
                                        onClick={() => executeCode(activeFile)}
                                        className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                                        title="Executar código"
                                    >
                                        <Play className="w-3 h-3" />
                                        <span>Executar</span>
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => setUseAdvancedEditor(!useAdvancedEditor)}
                                className={`p-2 rounded-lg transition-colors ${useAdvancedEditor
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-opacity-20 hover:bg-gray-500'
                                    }`}
                                title={useAdvancedEditor ? 'Editor Avançado Ativo' : 'Ativar Editor Avançado'}
                            >
                                <Settings className="w-4 h-4" />
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
                                title="Alternar tema"
                            >
                                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Editor ou Mensagem de Boas-vindas */}
                    <div className="flex-1">
                        {activeFile && activeFile.type === 'file' ? (
                            useAdvancedEditor ? (
                                <AdvancedEditor
                                    content={activeFile.content}
                                    language={activeFile.language}
                                    filename={activeFile.name}
                                    onContentChange={updateFileContent}
                                    onSave={() => saveFile(activeFile.id)}
                                    onExecute={() => executeCode(activeFile)}
                                    theme={theme}
                                />
                            ) : (
                                <div className="h-full p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">{activeFile.name}</h3>
                                        <span className="text-sm text-gray-500">{activeFile.language.toUpperCase()}</span>
                                    </div>

                                    <textarea
                                        value={activeFile.content}
                                        onChange={(e) => updateFileContent(e.target.value)}
                                        className={`w-full h-[calc(100%-80px)] p-4 rounded-lg border resize-none font-mono text-sm ${theme === 'dark'
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                        placeholder="Digite seu código aqui..."
                                    />
                                </div>
                            )
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                                        <Code className="w-12 h-12 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4">🚀 Fenix IDE 2.0 - Online</h2>
                                    <p className="text-gray-400 mb-6 max-w-md">
                                        IDE funcional funcionando diretamente no seu navegador!
                                        Crie arquivos, edite código e execute projetos sem downloads.
                                    </p>
                                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                                        <div className="flex items-center space-x-2">
                                            <Code className="w-4 h-4 text-blue-400" />
                                            <span>Editor Funcional</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Zap className="w-4 h-4 text-yellow-400" />
                                            <span>Hot Reload</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Bot className="w-4 h-4 text-purple-400" />
                                            <span>AI Assistant</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <button
                                            onClick={createNewFile}
                                            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                                        >
                                            <Plus className="w-4 h-4 mx-auto mb-2" />
                                            <span>Criar Arquivo</span>
                                        </button>

                                        <button
                                            onClick={() => setShowTemplates(true)}
                                            className="p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm"
                                        >
                                            <Sparkles className="w-4 h-4 mx-auto mb-2" />
                                            <span>Usar Template</span>
                                        </button>
                                    </div>

                                    <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                                        <p className="text-blue-300 text-sm">
                                            💡 <strong>Dica:</strong> Use templates para começar rapidamente com código estruturado!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Sidebar Direita - AI Assistant */}
            {showAI && (
                <div className={`w-96 border-l ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    {activeFile && activeFile.type === 'file' ? (
                        <RealAIAssistant
                            code={activeFile.content}
                            language={activeFile.language}
                            filename={activeFile.name}
                            theme={theme}
                            onClose={() => setShowAI(false)}
                        />
                    ) : (
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold flex items-center space-x-2">
                                    <Bot className="w-4 h-4 text-purple-400" />
                                    <span>AI Assistant</span>
                                </h3>
                                <button
                                    onClick={() => setShowAI(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>
                            </div>

                            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                                }`}>
                                <p className="text-sm whitespace-pre-line">{aiResponse}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Gerenciador de Projetos */}
            {showProjects && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-2xl">
                        <ProjectManager
                            theme={theme}
                            onProjectSelect={selectProject}
                            onClose={() => setShowProjects(false)}
                        />
                    </div>
                </div>
            )}

            {/* Colaboração em Tempo Real */}
            {showCollaboration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-2xl">
                        <RealTimeCollaboration
                            theme={theme}
                            projectId={currentProject?.id || ''}
                            onClose={() => setShowCollaboration(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
