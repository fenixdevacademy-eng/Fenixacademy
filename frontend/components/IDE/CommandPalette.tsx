'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, File, Folder, Settings, Play, Save, Download, Upload, GitBranch, Eye, Maximize2, Minimize2, X, Plus, RefreshCw, Trash2, Copy, Scissors, Clipboard, Undo, Redo, Search as FindIcon, Replace, Code, Terminal, Monitor, Smartphone, Tablet, Palette, Keyboard, Layers, Cpu, Database, HardDrive, Wifi, Battery } from 'lucide-react'

interface CommandPaletteProps {
    onClose: () => void
    onCommand: (command: string) => void
    theme: 'light' | 'dark' | 'fenix'
}

interface Command {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    category: string
    keywords: string[]
    action: () => void
}

export default function CommandPalette({ onClose, onCommand, theme }: CommandPaletteProps) {
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [filteredCommands, setFilteredCommands] = useState<Command[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const commands: Command[] = [
        // File Operations
        {
            id: 'new-file',
            title: 'Novo Arquivo',
            description: 'Criar um novo arquivo',
            icon: <File className="h-4 w-4" />,
            category: 'Arquivo',
            keywords: ['novo', 'file', 'criar', 'new'],
            action: () => onCommand('new-file')
        },
        {
            id: 'open-file',
            title: 'Abrir Arquivo',
            description: 'Abrir um arquivo existente',
            icon: <Folder className="h-4 w-4" />,
            category: 'Arquivo',
            keywords: ['abrir', 'open', 'file', 'arquivo'],
            action: () => onCommand('open-file')
        },
        {
            id: 'save-file',
            title: 'Salvar Arquivo',
            description: 'Salvar o arquivo atual',
            icon: <Save className="h-4 w-4" />,
            category: 'Arquivo',
            keywords: ['salvar', 'save', 'file', 'arquivo'],
            action: () => onCommand('save-file')
        },
        {
            id: 'save-all',
            title: 'Salvar Todos',
            description: 'Salvar todos os arquivos abertos',
            icon: <Save className="h-4 w-4" />,
            category: 'Arquivo',
            keywords: ['salvar', 'save', 'all', 'todos'],
            action: () => onCommand('save-all')
        },
        {
            id: 'close-file',
            title: 'Fechar Arquivo',
            description: 'Fechar o arquivo atual',
            icon: <X className="h-4 w-4" />,
            category: 'Arquivo',
            keywords: ['fechar', 'close', 'file', 'arquivo'],
            action: () => onCommand('close-file')
        },
        {
            id: 'close-all',
            title: 'Fechar Todos',
            description: 'Fechar todos os arquivos abertos',
            icon: <X className="h-4 w-4" />,
            category: 'Arquivo',
            keywords: ['fechar', 'close', 'all', 'todos'],
            action: () => onCommand('close-all')
        },

        // Edit Operations
        {
            id: 'undo',
            title: 'Desfazer',
            description: 'Desfazer a última ação',
            icon: <Undo className="h-4 w-4" />,
            category: 'Editar',
            keywords: ['desfazer', 'undo', 'reverter'],
            action: () => onCommand('undo')
        },
        {
            id: 'redo',
            title: 'Refazer',
            description: 'Refazer a última ação desfeita',
            icon: <Redo className="h-4 w-4" />,
            category: 'Editar',
            keywords: ['refazer', 'redo', 'repetir'],
            action: () => onCommand('redo')
        },
        {
            id: 'cut',
            title: 'Cortar',
            description: 'Cortar o texto selecionado',
            icon: <Scissors className="h-4 w-4" />,
            category: 'Editar',
            keywords: ['cortar', 'cut', 'recortar'],
            action: () => onCommand('cut')
        },
        {
            id: 'copy',
            title: 'Copiar',
            description: 'Copiar o texto selecionado',
            icon: <Copy className="h-4 w-4" />,
            category: 'Editar',
            keywords: ['copiar', 'copy', 'duplicar'],
            action: () => onCommand('copy')
        },
        {
            id: 'paste',
            title: 'Colar',
            description: 'Colar o texto da área de transferência',
            icon: <Clipboard className="h-4 w-4" />,
            category: 'Editar',
            keywords: ['colar', 'paste', 'inserir'],
            action: () => onCommand('paste')
        },
        {
            id: 'find',
            title: 'Localizar',
            description: 'Localizar texto no arquivo',
            icon: <FindIcon className="h-4 w-4" />,
            category: 'Editar',
            keywords: ['localizar', 'find', 'buscar', 'procurar'],
            action: () => onCommand('find')
        },
        {
            id: 'replace',
            title: 'Substituir',
            description: 'Substituir texto no arquivo',
            icon: <Replace className="h-4 w-4" />,
            category: 'Editar',
            keywords: ['substituir', 'replace', 'trocar'],
            action: () => onCommand('replace')
        },

        // View Operations
        {
            id: 'toggle-sidebar',
            title: 'Alternar Barra Lateral',
            description: 'Mostrar/ocultar a barra lateral',
            icon: <Layers className="h-4 w-4" />,
            category: 'Visualizar',
            keywords: ['sidebar', 'barra', 'lateral', 'toggle'],
            action: () => onCommand('toggle-sidebar')
        },
        {
            id: 'toggle-terminal',
            title: 'Alternar Terminal',
            description: 'Mostrar/ocultar o terminal',
            icon: <Terminal className="h-4 w-4" />,
            category: 'Visualizar',
            keywords: ['terminal', 'console', 'toggle'],
            action: () => onCommand('toggle-terminal')
        },
        {
            id: 'toggle-preview',
            title: 'Alternar Preview',
            description: 'Mostrar/ocultar o painel de preview',
            icon: <Eye className="h-4 w-4" />,
            category: 'Visualizar',
            keywords: ['preview', 'visualizar', 'toggle'],
            action: () => onCommand('toggle-preview')
        },
        {
            id: 'toggle-fullscreen',
            title: 'Alternar Tela Cheia',
            description: 'Entrar/sair do modo tela cheia',
            icon: <Maximize2 className="h-4 w-4" />,
            category: 'Visualizar',
            keywords: ['fullscreen', 'tela', 'cheia', 'toggle'],
            action: () => onCommand('toggle-fullscreen')
        },
        {
            id: 'zoom-in',
            title: 'Aumentar Zoom',
            description: 'Aumentar o zoom do editor',
            icon: <Plus className="h-4 w-4" />,
            category: 'Visualizar',
            keywords: ['zoom', 'aumentar', 'in', 'mais'],
            action: () => onCommand('zoom-in')
        },
        {
            id: 'zoom-out',
            title: 'Diminuir Zoom',
            description: 'Diminuir o zoom do editor',
            icon: <Minimize2 className="h-4 w-4" />,
            category: 'Visualizar',
            keywords: ['zoom', 'diminuir', 'out', 'menos'],
            action: () => onCommand('zoom-out')
        },
        {
            id: 'reset-zoom',
            title: 'Resetar Zoom',
            description: 'Resetar o zoom para o padrão',
            icon: <RefreshCw className="h-4 w-4" />,
            category: 'Visualizar',
            keywords: ['zoom', 'resetar', 'padrão', 'default'],
            action: () => onCommand('reset-zoom')
        },

        // Run Operations
        {
            id: 'run-code',
            title: 'Executar Código',
            description: 'Executar o código atual',
            icon: <Play className="h-4 w-4" />,
            category: 'Executar',
            keywords: ['executar', 'run', 'código', 'code'],
            action: () => onCommand('run-code')
        },
        {
            id: 'debug-code',
            title: 'Debugar Código',
            description: 'Iniciar debug do código',
            icon: <Code className="h-4 w-4" />,
            category: 'Executar',
            keywords: ['debug', 'debugar', 'código', 'code'],
            action: () => onCommand('debug-code')
        },
        {
            id: 'stop-execution',
            title: 'Parar Execução',
            description: 'Parar a execução atual',
            icon: <X className="h-4 w-4" />,
            category: 'Executar',
            keywords: ['parar', 'stop', 'execução', 'execution'],
            action: () => onCommand('stop-execution')
        },

        // Git Operations
        {
            id: 'git-status',
            title: 'Status do Git',
            description: 'Verificar status do repositório Git',
            icon: <GitBranch className="h-4 w-4" />,
            category: 'Git',
            keywords: ['git', 'status', 'repositório', 'repository'],
            action: () => onCommand('git-status')
        },
        {
            id: 'git-add',
            title: 'Adicionar ao Git',
            description: 'Adicionar arquivos ao Git',
            icon: <Plus className="h-4 w-4" />,
            category: 'Git',
            keywords: ['git', 'add', 'adicionar', 'staging'],
            action: () => onCommand('git-add')
        },
        {
            id: 'git-commit',
            title: 'Commit Git',
            description: 'Fazer commit das mudanças',
            icon: <Save className="h-4 w-4" />,
            category: 'Git',
            keywords: ['git', 'commit', 'salvar', 'mudanças'],
            action: () => onCommand('git-commit')
        },
        {
            id: 'git-push',
            title: 'Push Git',
            description: 'Enviar commits para o repositório remoto',
            icon: <Upload className="h-4 w-4" />,
            category: 'Git',
            keywords: ['git', 'push', 'enviar', 'remoto'],
            action: () => onCommand('git-push')
        },
        {
            id: 'git-pull',
            title: 'Pull Git',
            description: 'Baixar mudanças do repositório remoto',
            icon: <Download className="h-4 w-4" />,
            category: 'Git',
            keywords: ['git', 'pull', 'baixar', 'remoto'],
            action: () => onCommand('git-pull')
        },

        // Settings
        {
            id: 'open-settings',
            title: 'Abrir Configurações',
            description: 'Abrir as configurações da IDE',
            icon: <Settings className="h-4 w-4" />,
            category: 'Configurações',
            keywords: ['configurações', 'settings', 'preferências', 'preferences'],
            action: () => onCommand('open-settings')
        },
        {
            id: 'change-theme',
            title: 'Alterar Tema',
            description: 'Alterar o tema da IDE',
            icon: <Palette className="h-4 w-4" />,
            category: 'Configurações',
            keywords: ['tema', 'theme', 'alterar', 'change'],
            action: () => onCommand('change-theme')
        },
        {
            id: 'keyboard-shortcuts',
            title: 'Atalhos de Teclado',
            description: 'Ver atalhos de teclado disponíveis',
            icon: <Keyboard className="h-4 w-4" />,
            category: 'Configurações',
            keywords: ['atalhos', 'shortcuts', 'teclado', 'keyboard'],
            action: () => onCommand('keyboard-shortcuts')
        }
    ]

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    useEffect(() => {
        const filtered = commands.filter(command =>
            command.title.toLowerCase().includes(query.toLowerCase()) ||
            command.description.toLowerCase().includes(query.toLowerCase()) ||
            command.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
        )
        setFilteredCommands(filtered)
        setSelectedIndex(0)
    }, [query])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (filteredCommands[selectedIndex]) {
                filteredCommands[selectedIndex].action()
                onClose()
            }
        }
    }

    const handleCommandClick = (command: Command) => {
        command.action()
        onClose()
    }

    const groupedCommands = filteredCommands.reduce((acc, command) => {
        if (!acc[command.category]) {
            acc[command.category] = []
        }
        acc[command.category].push(command)
        return acc
    }, {} as { [key: string]: Command[] })

    return (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
            <div className={`w-full max-w-2xl mx-4 ${theme === 'dark' ? 'bg-gray-800' : theme === 'light' ? 'bg-white' : 'bg-gray-800/90 backdrop-blur-sm'} rounded-lg shadow-xl border border-gray-700`}>
                {/* Header */}
                <div className="flex items-center space-x-3 p-4 border-b border-gray-700">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Digite um comando ou pesquise..."
                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                    />
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-700 rounded"
                    >
                        <X className="h-4 w-4 text-gray-400" />
                    </button>
                </div>

                {/* Commands List */}
                <div className="max-h-96 overflow-y-auto">
                    {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                        <div key={category}>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-700/50">
                                {category}
                            </div>
                            {categoryCommands.map((command, index) => {
                                const globalIndex = filteredCommands.indexOf(command)
                                return (
                                    <button
                                        key={command.id}
                                        onClick={() => handleCommandClick(command)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 ${selectedIndex === globalIndex ? 'bg-blue-600/30' : ''
                                            }`}
                                    >
                                        <div className="text-gray-400">
                                            {command.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-medium">{command.title}</div>
                                            <div className="text-sm text-gray-400 truncate">{command.description}</div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {command.keywords.slice(0, 2).join(', ')}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-gray-700 text-xs text-gray-400">
                    <div className="flex items-center justify-between">
                        <span>↑↓ para navegar • Enter para executar • Esc para fechar</span>
                        <span>{filteredCommands.length} comando{filteredCommands.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

