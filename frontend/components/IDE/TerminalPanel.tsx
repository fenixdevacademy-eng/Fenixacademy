'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Terminal, Play, Square, Trash2, Download, Upload, Settings } from 'lucide-react'

interface TerminalPanelProps {
    history: string[]
    output: string[]
    onCommand: (command: string) => void
    theme: 'light' | 'dark' | 'fenix'
}

export default function TerminalPanel({ history, output, onCommand, theme }: TerminalPanelProps) {
    const [currentCommand, setCurrentCommand] = useState('')
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [isRunning, setIsRunning] = useState(false)
    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [output])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            executeCommand()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1
                setHistoryIndex(newIndex)
                setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
            } else if (historyIndex === 0) {
                setHistoryIndex(-1)
                setCurrentCommand('')
            }
        } else if (e.key === 'Tab') {
            e.preventDefault()
            // Auto-complete básico
            const suggestions = ['ls', 'cd', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'find', 'git', 'npm', 'node', 'python', 'python3']
            const matches = suggestions.filter(cmd => cmd.startsWith(currentCommand))
            if (matches.length === 1) {
                setCurrentCommand(matches[0])
            }
        }
    }

    const executeCommand = () => {
        if (currentCommand.trim()) {
            setIsRunning(true)
            onCommand(currentCommand)

            // Adicionar ao histórico
            setCommandHistory(prev => [...prev, currentCommand])
            setHistoryIndex(-1)
            setCurrentCommand('')

            // Simular execução
            setTimeout(() => {
                setIsRunning(false)
            }, 1000)
        }
    }

    const clearTerminal = () => {
        // Implementar limpeza do terminal
    }

    const getPrompt = () => {
        return `fenix@ide:~$ `
    }

    const getCommandIcon = (command: string) => {
        const cmd = command.split(' ')[0].toLowerCase()

        switch (cmd) {
            case 'ls':
            case 'dir':
                return '📁'
            case 'cd':
                return '📂'
            case 'pwd':
                return '📍'
            case 'mkdir':
                return '📁'
            case 'rm':
            case 'del':
                return '🗑️'
            case 'cp':
            case 'copy':
                return '📋'
            case 'mv':
            case 'move':
                return '📦'
            case 'cat':
            case 'type':
                return '📄'
            case 'grep':
            case 'findstr':
                return '🔍'
            case 'find':
                return '🔎'
            case 'git':
                return '🌿'
            case 'npm':
                return '📦'
            case 'node':
                return '🟢'
            case 'python':
            case 'python3':
                return '🐍'
            case 'java':
                return '☕'
            case 'gcc':
            case 'g++':
                return '⚙️'
            case 'go':
                return '🐹'
            case 'rustc':
                return '🦀'
            case 'php':
                return '🐘'
            case 'ruby':
                return '💎'
            case 'swift':
                return '🍎'
            case 'kotlin':
                return '🟣'
            case 'dart':
                return '🎯'
            case 'scala':
                return '🔴'
            case 'clojure':
                return '🟢'
            case 'haskell':
                return '🟦'
            case 'erlang':
                return '🟫'
            case 'elixir':
                return '🟪'
            case 'lua':
                return '🔵'
            case 'perl':
                return '🟡'
            case 'r':
                return '🔵'
            case 'matlab':
                return '🟠'
            case 'fortran':
                return '🟦'
            case 'cobol':
                return '🟫'
            case 'pascal':
                return '🟦'
            case 'ada':
                return '🟦'
            case 'prolog':
                return '🟫'
            case 'sql':
                return '🗃️'
            case 'bash':
            case 'sh':
                return '🐚'
            case 'powershell':
                return '🔵'
            case 'cmd':
                return '⚫'
            case 'docker':
                return '🐳'
            case 'make':
                return '⚙️'
            case 'cmake':
                return '⚙️'
            case 'gradle':
                return '🟢'
            case 'maven':
                return '🟠'
            case 'ant':
                return '🐜'
            case 'groovy':
                return '🟢'
            case 'julia':
                return '🟣'
            case 'nim':
                return '🟡'
            case 'crystal':
                return '💎'
            case 'zig':
                return '⚡'
            case 'v':
                return '🟢'
            case 'odin':
                return '🟦'
            case 'jai':
                return '🟡'
            default:
                return '💻'
        }
    }

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900' : theme === 'light' ? 'bg-gray-50' : 'bg-black/30 backdrop-blur-sm'}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-white">Terminal</span>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={executeCommand}
                        disabled={isRunning}
                        className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
                        title="Executar comando"
                    >
                        <Play className="h-4 w-4 text-green-400" />
                    </button>
                    <button
                        onClick={clearTerminal}
                        className="p-1 hover:bg-gray-700 rounded"
                        title="Limpar terminal"
                    >
                        <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded" title="Configurações">
                        <Settings className="h-4 w-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Terminal Output */}
            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-2 font-mono text-sm"
                style={{ maxHeight: 'calc(100% - 60px)' }}
            >
                {output.map((line, index) => (
                    <div key={index} className="mb-1">
                        {line.startsWith('$ ') ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-green-400">{getCommandIcon(line.substring(2))}</span>
                                <span className="text-green-400">{line}</span>
                            </div>
                        ) : (
                            <div className="text-gray-300 ml-4">{line}</div>
                        )}
                    </div>
                ))}

                {/* Command Input */}
                <div className="flex items-center space-x-2 mt-2">
                    <span className="text-green-400">{getPrompt()}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white outline-none"
                        placeholder="Digite um comando..."
                        autoFocus
                    />
                    {isRunning && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                    )}
                </div>
            </div>
        </div>
    )
}














