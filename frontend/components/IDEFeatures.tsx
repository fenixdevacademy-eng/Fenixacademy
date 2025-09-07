'use client';

import React, { useState } from 'react';
import {
    FileText, Code, Database, GitBranch, Terminal,
    Search, Settings, Download, Upload, Play,
    Save, Folder, File, Plus, Trash2, Edit3,
    ChevronRight, ChevronDown, Eye, EyeOff
} from 'lucide-react';

interface IDEFeature {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    category: 'editor' | 'file' | 'terminal' | 'git' | 'tools';
}

const ideFeatures: IDEFeature[] = [
    // Editor
    {
        id: 'syntax-highlighting',
        name: 'Syntax Highlighting',
        description: 'Destaque de sintaxe para múltiplas linguagens',
        icon: Code,
        category: 'editor'
    },
    {
        id: 'auto-completion',
        name: 'Auto-completion',
        description: 'Sugestões inteligentes de código',
        icon: Code,
        category: 'editor'
    },
    {
        id: 'multi-cursor',
        name: 'Multi-cursor',
        description: 'Edição simultânea em múltiplas linhas',
        icon: Edit3,
        category: 'editor'
    },

    // Arquivos
    {
        id: 'file-explorer',
        name: 'File Explorer',
        description: 'Navegação hierárquica de arquivos',
        icon: Folder,
        category: 'file'
    },
    {
        id: 'file-creation',
        name: 'File Creation',
        description: 'Criar novos arquivos e pastas',
        icon: Plus,
        category: 'file'
    },
    {
        id: 'file-deletion',
        name: 'File Deletion',
        description: 'Excluir arquivos e pastas',
        icon: Trash2,
        category: 'file'
    },

    // Terminal
    {
        id: 'integrated-terminal',
        name: 'Integrated Terminal',
        description: 'Terminal integrado para comandos',
        icon: Terminal,
        category: 'terminal'
    },
    {
        id: 'command-execution',
        name: 'Command Execution',
        description: 'Execução de comandos do sistema',
        icon: Play,
        category: 'terminal'
    },

    // Git
    {
        id: 'git-integration',
        name: 'Git Integration',
        description: 'Controle de versão integrado',
        icon: GitBranch,
        category: 'git'
    },
    {
        id: 'branch-management',
        name: 'Branch Management',
        description: 'Gerenciamento de branches',
        icon: GitBranch,
        category: 'git'
    },

    // Ferramentas
    {
        id: 'search-replace',
        name: 'Search & Replace',
        description: 'Busca e substituição em arquivos',
        icon: Search,
        category: 'tools'
    },
    {
        id: 'settings',
        name: 'Settings',
        description: 'Configurações personalizáveis',
        icon: Settings,
        category: 'tools'
    },
    {
        id: 'import-export',
        name: 'Import/Export',
        description: 'Importar e exportar projetos',
        icon: Download,
        category: 'tools'
    }
];

export default function IDEFeatures() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', name: 'Todas', count: ideFeatures.length },
        { id: 'editor', name: 'Editor', count: ideFeatures.filter(f => f.category === 'editor').length },
        { id: 'file', name: 'Arquivos', count: ideFeatures.filter(f => f.category === 'file').length },
        { id: 'terminal', name: 'Terminal', count: ideFeatures.filter(f => f.category === 'terminal').length },
        { id: 'git', name: 'Git', count: ideFeatures.filter(f => f.category === 'git').length },
        { id: 'tools', name: 'Ferramentas', count: ideFeatures.filter(f => f.category === 'tools').length }
    ];

    const filteredFeatures = ideFeatures.filter(feature => {
        const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory;
        const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feature.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    🚀 Funcionalidades da Fenix IDE
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Uma IDE completa com recursos profissionais para desenvolvimento
                </p>
            </div>

            {/* Filtros */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {category.name} ({category.count})
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar funcionalidades..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Grid de Funcionalidades */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFeatures.map(feature => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {feature.name}
                                    </h3>
                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${feature.category === 'editor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            feature.category === 'file' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                feature.category === 'terminal' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                                    feature.category === 'git' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                        }`}>
                                        {feature.category}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Estatísticas */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                    IDE Profissional Completa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="text-4xl font-bold mb-2">{ideFeatures.length}</div>
                        <div className="text-blue-100">Funcionalidades</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">{categories.length - 1}</div>
                        <div className="text-blue-100">Categorias</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">100%</div>
                        <div className="text-blue-100">Funcional</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
