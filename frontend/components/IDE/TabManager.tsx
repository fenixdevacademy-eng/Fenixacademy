'use client'

import React from 'react'
import { X, Plus, FileText, Save, Circle } from 'lucide-react'

interface File {
    id: string
    name: string
    content: string
    language: string
    path: string
    isModified: boolean
    isActive: boolean
}

interface TabManagerProps {
    files: File[]
    activeFile: File | null
    onFileSelect: (file: File) => void
    onFileClose: (file: File) => void
    theme: 'light' | 'dark' | 'fenix'
}

export default function TabManager({ files, activeFile, onFileSelect, onFileClose, theme }: TabManagerProps) {
    const getFileIcon = (file: File) => {
        const extension = file.name.split('.').pop()?.toLowerCase()

        switch (extension) {
            case 'js':
            case 'jsx':
                return '🟨'
            case 'ts':
            case 'tsx':
                return '🔵'
            case 'html':
                return '🟧'
            case 'css':
                return '🔵'
            case 'py':
                return '🐍'
            case 'java':
                return '☕'
            case 'cpp':
            case 'c':
                return '⚙️'
            case 'go':
                return '🐹'
            case 'rs':
                return '🦀'
            case 'php':
                return '🐘'
            case 'rb':
                return '💎'
            case 'swift':
                return '🍎'
            case 'kt':
                return '🟣'
            case 'dart':
                return '🎯'
            case 'scala':
                return '🔴'
            case 'clj':
                return '🟢'
            case 'hs':
                return '🟦'
            case 'erl':
                return '🟫'
            case 'ex':
                return '🟪'
            case 'lua':
                return '🔵'
            case 'pl':
                return '🟡'
            case 'r':
                return '🔵'
            case 'm':
                return '🟠'
            case 'f90':
                return '🟦'
            case 'cob':
                return '🟫'
            case 'pas':
                return '🟦'
            case 'ada':
                return '🟦'
            case 'pro':
                return '🟫'
            case 'sql':
                return '🗃️'
            case 'sh':
                return '🐚'
            case 'ps1':
                return '🔵'
            case 'bat':
                return '⚫'
            case 'dockerfile':
                return '🐳'
            case 'makefile':
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
            case 'xml':
                return '📄'
            case 'yaml':
            case 'yml':
                return '📄'
            case 'json':
                return '📄'
            case 'toml':
                return '📄'
            case 'ini':
                return '📄'
            case 'md':
                return '📝'
            case 'txt':
                return '📄'
            default:
                return '📄'
        }
    }

    const getLanguageColor = (language: string) => {
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
        return colors[language] || 'text-gray-400'
    }

    const handleFileClose = (e: React.MouseEvent, file: File) => {
        e.stopPropagation()
        onFileClose(file)
    }

    const handleNewFile = () => {
        // Implementar criação de novo arquivo
        console.log('Novo arquivo')
    }

    if (files.length === 0) {
        return (
            <div className={`h-12 flex items-center px-4 ${theme === 'dark' ? 'bg-gray-800' : theme === 'light' ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'} border-b border-gray-700`}>
                <button
                    onClick={handleNewFile}
                    className="flex items-center space-x-2 px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">Novo Arquivo</span>
                </button>
            </div>
        )
    }

    return (
        <div className={`h-12 flex items-center ${theme === 'dark' ? 'bg-gray-800' : theme === 'light' ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'} border-b border-gray-700`}>
            {/* Tabs */}
            <div className="flex-1 flex overflow-x-auto">
                {files.map((file) => (
                    <div
                        key={file.id}
                        onClick={() => onFileSelect(file)}
                        className={`flex items-center space-x-2 px-3 py-2 cursor-pointer border-r border-gray-700 min-w-0 group ${file.isActive
                                ? `${theme === 'dark' ? 'bg-gray-700' : theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} text-white`
                                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                            }`}
                    >
                        {/* File Icon */}
                        <span className="text-lg flex-shrink-0">{getFileIcon(file)}</span>

                        {/* File Name */}
                        <span className={`text-sm truncate max-w-32 ${getLanguageColor(file.language)}`}>
                            {file.name}
                        </span>

                        {/* Modified Indicator */}
                        {file.isModified && (
                            <Circle className="h-2 w-2 text-orange-400 flex-shrink-0" />
                        )}

                        {/* Close Button */}
                        <button
                            onClick={(e) => handleFileClose(e, file)}
                            className="opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-1 flex-shrink-0 transition-opacity duration-200"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>

            {/* New File Button */}
            <div className="flex items-center px-2">
                <button
                    onClick={handleNewFile}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                    title="Novo arquivo"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}



















