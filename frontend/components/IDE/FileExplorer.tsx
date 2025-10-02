'use client'

import React from 'react'
import { File, Folder, FolderOpen, Plus, MoreHorizontal } from 'lucide-react'

interface File {
    id: string
    name: string
    content: string
    language: string
    path: string
    isModified: boolean
    isActive: boolean
}

interface Project {
    id: string
    name: string
    files: File[]
    rootPath: string
    lastModified: Date
}

interface FileExplorerProps {
    project: Project | null
    activeFile: File | null
    onFileSelect: (file: File) => void
    onCreateFile: () => void
    theme: 'light' | 'dark' | 'fenix'
}

export default function FileExplorer({ project, activeFile, onFileSelect, onCreateFile, theme }: FileExplorerProps) {
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

    if (!project) {
        return (
            <div className={`w-64 h-full ${theme === 'dark' ? 'bg-gray-800' : theme === 'light' ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'} border-r border-gray-700 flex items-center justify-center`}>
                <div className="text-center text-gray-400">
                    <Folder className="h-12 w-12 mx-auto mb-2" />
                    <p>Nenhum projeto carregado</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`w-64 h-full ${theme === 'dark' ? 'bg-gray-800' : theme === 'light' ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'} border-r border-gray-700 flex flex-col`}>
            {/* Header */}
            <div className="p-3 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-sm">Explorador</h3>
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={onCreateFile}
                            className="p-1 hover:bg-gray-700 rounded"
                            title="Criar novo arquivo"
                        >
                            <Plus className="h-4 w-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-700 rounded">
                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Project Name */}
            <div className="p-2 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <FolderOpen className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-white font-medium">{project.name}</span>
                </div>
            </div>

            {/* Files List */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    {project.files.map((file) => (
                        <div
                            key={file.id}
                            onClick={() => onFileSelect(file)}
                            className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-700 ${activeFile?.id === file.id ? 'bg-blue-600/30 border-l-2 border-blue-400' : ''
                                }`}
                        >
                            <span className="text-lg">{getFileIcon(file)}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-1">
                                    <span className={`text-sm truncate ${getLanguageColor(file.language)}`}>
                                        {file.name}
                                    </span>
                                    {file.isModified && (
                                        <span className="text-xs text-orange-400">●</span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-400 truncate">
                                    {file.path}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-gray-700">
                <div className="text-xs text-gray-400">
                    {project.files.length} arquivo{project.files.length !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
    )
}







