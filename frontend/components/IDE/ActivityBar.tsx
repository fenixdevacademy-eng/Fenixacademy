'use client'

import React from 'react'
import {
    FileText,
    Search,
    GitBranch,
    Play,
    Bug,
    Settings,
    Package,
    User,
    Terminal,
    Eye,
    Database,
    Cloud,
    Shield,
    BarChart3,
    Palette,
    Keyboard,
    Cpu,
    HardDrive,
    Wifi,
    Battery
} from 'lucide-react'

interface ActivityBarProps {
    isFileExplorerOpen: boolean
    isTerminalOpen: boolean
    isPreviewOpen: boolean
    onFileExplorerToggle: () => void
    onTerminalToggle: () => void
    onPreviewToggle: () => void
    theme: 'light' | 'dark' | 'fenix'
}

export default function ActivityBar({
    isFileExplorerOpen,
    isTerminalOpen,
    isPreviewOpen,
    onFileExplorerToggle,
    onTerminalToggle,
    onPreviewToggle,
    theme
}: ActivityBarProps) {
    const activities = [
        {
            id: 'explorer',
            icon: <FileText className="h-5 w-5" />,
            label: 'Explorador',
            isActive: isFileExplorerOpen,
            onClick: onFileExplorerToggle,
            color: 'text-blue-400',
            bgColor: 'bg-blue-600/20'
        },
        {
            id: 'search',
            icon: <Search className="h-5 w-5" />,
            label: 'Pesquisar',
            isActive: false,
            onClick: () => { },
            color: 'text-green-400',
            bgColor: 'bg-green-600/20'
        },
        {
            id: 'git',
            icon: <GitBranch className="h-5 w-5" />,
            label: 'Git',
            isActive: false,
            onClick: () => { },
            color: 'text-orange-400',
            bgColor: 'bg-orange-600/20'
        },
        {
            id: 'debug',
            icon: <Bug className="h-5 w-5" />,
            label: 'Debug',
            isActive: false,
            onClick: () => { },
            color: 'text-red-400',
            bgColor: 'bg-red-600/20'
        },
        {
            id: 'extensions',
            icon: <Package className="h-5 w-5" />,
            label: 'Extensões',
            isActive: false,
            onClick: () => { },
            color: 'text-purple-400',
            bgColor: 'bg-purple-600/20'
        },
        {
            id: 'run',
            icon: <Play className="h-5 w-5" />,
            label: 'Executar',
            isActive: false,
            onClick: () => { },
            color: 'text-green-400',
            bgColor: 'bg-green-600/20'
        },
        {
            id: 'terminal',
            icon: <Terminal className="h-5 w-5" />,
            label: 'Terminal',
            isActive: isTerminalOpen,
            onClick: onTerminalToggle,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-600/20'
        },
        {
            id: 'preview',
            icon: <Eye className="h-5 w-5" />,
            label: 'Preview',
            isActive: isPreviewOpen,
            onClick: onPreviewToggle,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-600/20'
        },
        {
            id: 'database',
            icon: <Database className="h-5 w-5" />,
            label: 'Banco de Dados',
            isActive: false,
            onClick: () => { },
            color: 'text-indigo-400',
            bgColor: 'bg-indigo-600/20'
        },
        {
            id: 'cloud',
            icon: <Cloud className="h-5 w-5" />,
            label: 'Cloud',
            isActive: false,
            onClick: () => { },
            color: 'text-sky-400',
            bgColor: 'bg-sky-600/20'
        },
        {
            id: 'security',
            icon: <Shield className="h-5 w-5" />,
            label: 'Segurança',
            isActive: false,
            onClick: () => { },
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-600/20'
        },
        {
            id: 'analytics',
            icon: <BarChart3 className="h-5 w-5" />,
            label: 'Analytics',
            isActive: false,
            onClick: () => { },
            color: 'text-pink-400',
            bgColor: 'bg-pink-600/20'
        },
        {
            id: 'themes',
            icon: <Palette className="h-5 w-5" />,
            label: 'Temas',
            isActive: false,
            onClick: () => { },
            color: 'text-rose-400',
            bgColor: 'bg-rose-600/20'
        },
        {
            id: 'shortcuts',
            icon: <Keyboard className="h-5 w-5" />,
            label: 'Atalhos',
            isActive: false,
            onClick: () => { },
            color: 'text-violet-400',
            bgColor: 'bg-violet-600/20'
        },
        {
            id: 'settings',
            icon: <Settings className="h-5 w-5" />,
            label: 'Configurações',
            isActive: false,
            onClick: () => { },
            color: 'text-gray-400',
            bgColor: 'bg-gray-600/20'
        }
    ]

    const systemInfo = [
        {
            id: 'cpu',
            icon: <Cpu className="h-4 w-4" />,
            label: 'CPU',
            value: 'Intel i7-12700K',
            color: 'text-blue-400'
        },
        {
            id: 'memory',
            icon: <Database className="h-4 w-4" />,
            label: 'RAM',
            value: '32GB',
            color: 'text-green-400'
        },
        {
            id: 'disk',
            icon: <HardDrive className="h-4 w-4" />,
            label: 'Disco',
            value: '1TB SSD',
            color: 'text-yellow-400'
        },
        {
            id: 'network',
            icon: <Wifi className="h-4 w-4" />,
            label: 'Rede',
            value: 'WiFi 6',
            color: 'text-purple-400'
        },
        {
            id: 'battery',
            icon: <Battery className="h-4 w-4" />,
            label: 'Bateria',
            value: '100%',
            color: 'text-green-400'
        }
    ]

    return (
        <div className={`w-16 h-full flex flex-col ${theme === 'dark' ? 'bg-gray-800' : theme === 'light' ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'} border-r border-gray-700`}>
            {/* Main Activities */}
            <div className="flex-1 py-2">
                {activities.map((activity) => (
                    <button
                        key={activity.id}
                        onClick={activity.onClick}
                        className={`w-full h-12 flex items-center justify-center relative group ${activity.isActive
                            ? `${activity.bgColor} ${activity.color} border-r-2 border-current`
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                            }`}
                        title={activity.label}
                    >
                        {activity.icon}

                        {/* Tooltip */}
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            {activity.label}
                        </div>
                    </button>
                ))}
            </div>

            {/* System Info */}
            <div className="border-t border-gray-700 py-2">
                {systemInfo.map((info) => (
                    <div
                        key={info.id}
                        className="w-full h-8 flex items-center justify-center relative group"
                        title={`${info.label}: ${info.value}`}
                    >
                        <div className={`${info.color}`}>
                            {info.icon}
                        </div>

                        {/* Tooltip */}
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            {info.label}: {info.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* User Profile */}
            <div className="border-t border-gray-700 py-2">
                <button className="w-full h-12 flex items-center justify-center relative group text-gray-400 hover:text-white hover:bg-gray-700/50">
                    <User className="h-5 w-5" />

                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        Perfil do Usuário
                    </div>
                </button>
            </div>
        </div>
    )
}

