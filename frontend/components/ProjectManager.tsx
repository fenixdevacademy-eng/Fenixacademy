'use client';

import React, { useState, useEffect } from 'react';
import {
    FolderOpen,
    Plus,
    Users,
    GitBranch,
    Settings,
    Download,
    Upload,
    Share2,
    Lock,
    Globe,
    Star,
    Calendar,
    Code,
    Package,
    Database,
    Server
} from 'lucide-react';

interface Project {
    id: string;
    name: string;
    description: string;
    type: 'web' | 'mobile' | 'desktop' | 'api' | 'library' | 'other';
    status: 'active' | 'archived' | 'completed';
    createdAt: Date;
    updatedAt: Date;
    collaborators: Collaborator[];
    tags: string[];
    framework?: string;
    language?: string;
    repository?: string;
    isPublic: boolean;
}

interface Collaborator {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'admin' | 'developer' | 'viewer';
    avatar: string;
    joinedAt: Date;
    lastActive: Date;
}

interface ProjectManagerProps {
    theme: 'dark' | 'light';
    onProjectSelect: (project: Project) => void;
    onClose: () => void;
}

export default function ProjectManager({
    theme,
    onProjectSelect,
    onClose
}: ProjectManagerProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Projetos de exemplo
    useEffect(() => {
        const sampleProjects: Project[] = [
            {
                id: '1',
                name: 'Fenix IDE 2.0',
                description: 'IDE online completa com IA e colaboração',
                type: 'web',
                status: 'active',
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date(),
                collaborators: [
                    {
                        id: '1',
                        name: 'João Silva',
                        email: 'joao@fenix.com',
                        role: 'owner',
                        avatar: '👨‍💻',
                        joinedAt: new Date('2024-01-01'),
                        lastActive: new Date()
                    },
                    {
                        id: '2',
                        name: 'Maria Santos',
                        email: 'maria@fenix.com',
                        role: 'developer',
                        avatar: '👩‍💻',
                        joinedAt: new Date('2024-01-15'),
                        lastActive: new Date()
                    }
                ],
                tags: ['IDE', 'React', 'TypeScript', 'AI'],
                framework: 'Next.js',
                language: 'TypeScript',
                repository: 'github.com/fenix/fenix-ide',
                isPublic: false
            },
            {
                id: '2',
                name: 'E-commerce Mobile App',
                description: 'Aplicativo de vendas para dispositivos móveis',
                type: 'mobile',
                status: 'active',
                createdAt: new Date('2024-02-01'),
                updatedAt: new Date(),
                collaborators: [
                    {
                        id: '1',
                        name: 'João Silva',
                        email: 'joao@fenix.com',
                        role: 'owner',
                        avatar: '👨‍💻',
                        joinedAt: new Date('2024-02-01'),
                        lastActive: new Date()
                    }
                ],
                tags: ['Mobile', 'React Native', 'E-commerce'],
                framework: 'React Native',
                language: 'JavaScript',
                isPublic: true
            }
        ];
        setProjects(sampleProjects);
    }, []);

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || project.type === filterType;
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
    });

    const getProjectIcon = (type: string) => {
        switch (type) {
            case 'web': return <Globe className="w-4 h-4" />;
            case 'mobile': return <Package className="w-4 h-4" />;
            case 'desktop': return <Server className="w-4 h-4" />;
            case 'api': return <Database className="w-4 h-4" />;
            case 'library': return <Code className="w-4 h-4" />;
            default: return <FolderOpen className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-500 bg-green-100';
            case 'archived': return 'text-gray-500 bg-gray-100';
            case 'completed': return 'text-blue-500 bg-blue-100';
            default: return 'text-gray-500 bg-gray-100';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'web': return 'text-blue-500 bg-blue-100';
            case 'mobile': return 'text-purple-500 bg-purple-100';
            case 'desktop': return 'text-orange-500 bg-orange-100';
            case 'api': return 'text-green-500 bg-green-100';
            case 'library': return 'text-indigo-500 bg-indigo-100';
            default: return 'text-gray-500 bg-gray-100';
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                }`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <FolderOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Gerenciador de Projetos</h2>
                            <p className="text-sm text-gray-500">Organize e colabore em projetos</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Projeto
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            title="Fechar"
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>

            {/* Filtros e Busca */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                }`}>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Busca */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Buscar projetos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                        />
                    </div>

                    {/* Filtros */}
                    <div className="flex gap-2">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className={`px-3 py-2 rounded-lg border ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                        >
                            <option value="all">Todos os tipos</option>
                            <option value="web">Web</option>
                            <option value="mobile">Mobile</option>
                            <option value="desktop">Desktop</option>
                            <option value="api">API</option>
                            <option value="library">Biblioteca</option>
                            <option value="other">Outros</option>
                        </select>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className={`px-3 py-2 rounded-lg border ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                        >
                            <option value="all">Todos os status</option>
                            <option value="active">Ativo</option>
                            <option value="archived">Arquivado</option>
                            <option value="completed">Concluído</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Lista de Projetos */}
            <div className="flex-1 overflow-y-auto p-4">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p>Nenhum projeto encontrado</p>
                        <p className="text-sm">Crie seu primeiro projeto para começar!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredProjects.map(project => (
                            <div
                                key={project.id}
                                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => onProjectSelect(project)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        {getProjectIcon(project.type)}
                                        <div>
                                            <h3 className="font-semibold text-lg">{project.name}</h3>
                                            <p className="text-sm text-gray-500">{project.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(project.type)}`}>
                                            {project.type}
                                        </span>
                                        {project.isPublic ? (
                                            <div className="relative group">
                                                <Globe className="w-4 h-4 text-blue-500" />
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    Público
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative group">
                                                <Lock className="w-4 h-4 text-gray-500" />
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    Privado
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            <span>{project.collaborators.length} colaborador{project.collaborators.length !== 1 ? 'es' : ''}</span>
                                        </div>

                                        {project.framework && (
                                            <div className="flex items-center space-x-1">
                                                <Code className="w-4 h-4" />
                                                <span>{project.framework}</span>
                                            </div>
                                        )}

                                        {project.language && (
                                            <div className="flex items-center space-x-1">
                                                <Package className="w-4 h-4" />
                                                <span>{project.language}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>{project.updatedAt.toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Tags */}
                                {project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className={`px-2 py-1 rounded-full text-xs ${theme === 'dark'
                                                    ? 'bg-gray-600 text-gray-300'
                                                    : 'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Colaboradores */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {project.collaborators.slice(0, 3).map(collaborator => (
                                            <div
                                                key={collaborator.id}
                                                className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm"
                                                title={`${collaborator.name} (${collaborator.role})`}
                                            >
                                                {collaborator.avatar}
                                            </div>
                                        ))}
                                        {project.collaborators.length > 3 && (
                                            <span className="text-sm text-gray-500">
                                                +{project.collaborators.length - 3} mais
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {project.repository && (
                                            <button
                                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                                title="Ver repositório"
                                            >
                                                <GitBranch className="w-4 h-4" />
                                            </button>
                                        )}

                                        <button
                                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                            title="Compartilhar"
                                        >
                                            <Share2 className="w-4 h-4" />
                                        </button>

                                        <button
                                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                            title="Configurações"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

