'use client'

import React from 'react'
import { GitBranch, Circle, Wifi, Battery, Settings, Bell, User, Cpu, Database, HardDrive } from 'lucide-react'

interface File {
    id: string
    name: string
    content: string
    language: string
    path: string
    isModified: boolean
    isActive: boolean
}

interface StatusBarProps {
    activeFile: File | null
    cursorPosition: { line: number; column: number }
    theme: 'light' | 'dark' | 'fenix'
    language: string
}

export default function StatusBar({ activeFile, cursorPosition, theme, language }: StatusBarProps) {
    const getLanguageIcon = (lang: string) => {
        const icons: { [key: string]: string } = {
            'javascript': '🟨',
            'typescript': '🔵',
            'html': '🟧',
            'css': '🔵',
            'python': '🐍',
            'java': '☕',
            'cpp': '⚙️',
            'c': '⚙️',
            'go': '🐹',
            'rust': '🦀',
            'php': '🐘',
            'ruby': '💎',
            'swift': '🍎',
            'kotlin': '🟣',
            'dart': '🎯',
            'scala': '🔴',
            'clojure': '🟢',
            'haskell': '🟦',
            'erlang': '🟫',
            'elixir': '🟪',
            'lua': '🔵',
            'perl': '🟡',
            'r': '🔵',
            'matlab': '🟠',
            'fortran': '🟦',
            'cobol': '🟫',
            'pascal': '🟦',
            'ada': '🟦',
            'prolog': '🟫',
            'sql': '🗃️',
            'bash': '🐚',
            'powershell': '🔵',
            'batch': '⚫',
            'dockerfile': '🐳',
            'makefile': '⚙️',
            'cmake': '⚙️',
            'gradle': '🟢',
            'maven': '🟠',
            'ant': '🐜',
            'groovy': '🟢',
            'julia': '🟣',
            'nim': '🟡',
            'crystal': '💎',
            'zig': '⚡',
            'v': '🟢',
            'odin': '🟦',
            'jai': '🟡',
            'xml': '📄',
            'yaml': '📄',
            'json': '📄',
            'toml': '📄',
            'ini': '📄',
            'markdown': '📝',
            'text': '📄'
        }
        return icons[lang] || '📄'
    }

    const getLanguageColor = (lang: string) => {
        const colors: { [key: string]: string } = {
            'javascript': 'text-yellow-400',
            'typescript': 'text-blue-400',
            'html': 'text-orange-400',
            'css': 'text-blue-400',
            'python': 'text-green-400',
            'java': 'text-red-400',
            'cpp': 'text-blue-300',
            'c': 'text-blue-300',
            'go': 'text-cyan-400',
            'rust': 'text-orange-400',
            'php': 'text-purple-400',
            'ruby': 'text-red-400',
            'swift': 'text-orange-400',
            'kotlin': 'text-purple-400',
            'dart': 'text-blue-400',
            'scala': 'text-red-400',
            'clojure': 'text-green-400',
            'haskell': 'text-purple-400',
            'erlang': 'text-red-400',
            'elixir': 'text-purple-400',
            'lua': 'text-blue-400',
            'perl': 'text-yellow-400',
            'r': 'text-blue-400',
            'matlab': 'text-orange-400',
            'fortran': 'text-blue-400',
            'cobol': 'text-green-400',
            'pascal': 'text-blue-400',
            'ada': 'text-blue-400',
            'prolog': 'text-red-400',
            'sql': 'text-blue-400',
            'bash': 'text-green-400',
            'powershell': 'text-blue-400',
            'batch': 'text-gray-400',
            'dockerfile': 'text-blue-400',
            'makefile': 'text-yellow-400',
            'cmake': 'text-blue-400',
            'gradle': 'text-green-400',
            'maven': 'text-orange-400',
            'ant': 'text-red-400',
            'groovy': 'text-green-400',
            'julia': 'text-purple-400',
            'nim': 'text-yellow-400',
            'crystal': 'text-red-400',
            'zig': 'text-orange-400',
            'v': 'text-green-400',
            'odin': 'text-blue-400',
            'jai': 'text-yellow-400',
            'xml': 'text-orange-400',
            'yaml': 'text-red-400',
            'json': 'text-yellow-400',
            'toml': 'text-blue-400',
            'ini': 'text-gray-400',
            'markdown': 'text-blue-400',
            'text': 'text-gray-400'
        }
        return colors[lang] || 'text-gray-400'
    }

    const getFileSize = (content: string) => {
        const bytes = new Blob([content]).size
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    const getLineCount = (content: string) => {
        return content.split('\n').length
    }

    const getWordCount = (content: string) => {
        return content.split(/\s+/).filter(word => word.length > 0).length
    }

    const getCharacterCount = (content: string) => {
        return content.length
    }

    const getEncoding = () => {
        return 'UTF-8'
    }

    const getLineEnding = () => {
        return 'LF'
    }

    const getIndentSize = () => {
        return '2'
    }

    const getIndentType = () => {
        return 'Spaces'
    }

    const getGitBranch = () => {
        return 'main'
    }

    const getGitStatus = () => {
        return 'clean'
    }

    const getGitAhead = () => {
        return 0
    }

    const getGitBehind = () => {
        return 0
    }

    const getProblems = () => {
        return 0
    }

    const getWarnings = () => {
        return 0
    }

    const getErrors = () => {
        return 0
    }

    const getSystemInfo = () => {
        return {
            cpu: 'Intel i7-12700K',
            memory: '32GB',
            disk: '1TB SSD',
            network: 'WiFi 6',
            battery: '100%'
        }
    }

    const systemInfo = getSystemInfo()

    return (
        <div className={`flex items-center justify-between px-4 py-1 text-xs ${theme === 'dark' ? 'bg-gray-800 border-t border-gray-700' : theme === 'light' ? 'bg-gray-100 border-t border-gray-200' : 'bg-black/40 backdrop-blur-sm border-t border-purple-500/30'}`}>
            {/* Left Side */}
            <div className="flex items-center space-x-4">
                {/* File Info */}
                {activeFile && (
                    <div className="flex items-center space-x-2">
                        <span className="text-lg">{getLanguageIcon(activeFile.language)}</span>
                        <span className={`font-medium ${getLanguageColor(activeFile.language)}`}>
                            {activeFile.name}
                        </span>
                        {activeFile.isModified && (
                            <span className="text-orange-400">●</span>
                        )}
                    </div>
                )}

                {/* Cursor Position */}
                <div className="flex items-center space-x-1">
                    <span className="text-gray-400">Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
                </div>

                {/* File Stats */}
                {activeFile && (
                    <div className="flex items-center space-x-3 text-gray-400">
                        <span>{getLineCount(activeFile.content)} linhas</span>
                        <span>{getWordCount(activeFile.content)} palavras</span>
                        <span>{getCharacterCount(activeFile.content)} caracteres</span>
                        <span>{getFileSize(activeFile.content)}</span>
                    </div>
                )}

                {/* Language */}
                <div className="flex items-center space-x-1">
                    <span className="text-gray-400">Linguagem:</span>
                    <span className={`font-medium ${getLanguageColor(language)}`}>
                        {language.toUpperCase()}
                    </span>
                </div>

                {/* Encoding */}
                <div className="flex items-center space-x-1">
                    <span className="text-gray-400">Encoding:</span>
                    <span className="text-white">{getEncoding()}</span>
                </div>

                {/* Line Ending */}
                <div className="flex items-center space-x-1">
                    <span className="text-gray-400">LF</span>
                </div>

                {/* Indent */}
                <div className="flex items-center space-x-1">
                    <span className="text-gray-400">Indent:</span>
                    <span className="text-white">{getIndentSize()} {getIndentType()}</span>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
                {/* Git Status */}
                <div className="flex items-center space-x-2">
                    <GitBranch className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-400">{getGitBranch()}</span>
                    {getGitStatus() === 'clean' && (
                        <Circle className="h-2 w-2 text-green-400" />
                    )}
                    {getGitAhead() > 0 && (
                        <span className="text-blue-400">↑{getGitAhead()}</span>
                    )}
                    {getGitBehind() > 0 && (
                        <span className="text-red-400">↓{getGitBehind()}</span>
                    )}
                </div>

                {/* Problems */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Problemas:</span>
                    {getErrors() > 0 && (
                        <span className="text-red-400">{getErrors()} erros</span>
                    )}
                    {getWarnings() > 0 && (
                        <span className="text-yellow-400">{getWarnings()} avisos</span>
                    )}
                    {getProblems() === 0 && (
                        <span className="text-green-400">✓</span>
                    )}
                </div>

                {/* System Info */}
                <div className="flex items-center space-x-3 text-gray-400">
                    <div className="flex items-center space-x-1">
                        <Cpu className="h-3 w-3" />
                        <span>{systemInfo.cpu}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Database className="h-3 w-3" />
                        <span>{systemInfo.memory}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <HardDrive className="h-3 w-3" />
                        <span>{systemInfo.disk}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Wifi className="h-3 w-3" />
                        <span>{systemInfo.network}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Battery className="h-3 w-3" />
                        <span>{systemInfo.battery}</span>
                    </div>
                </div>

                {/* Notifications */}
                <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-700 rounded">
                        <Bell className="h-3 w-3 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded">
                        <Settings className="h-3 w-3 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded">
                        <User className="h-3 w-3 text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    )
}

