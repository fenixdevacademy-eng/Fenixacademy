'use client';

import React, { useState } from 'react';
import { Folder, File, Plus, Trash2, Edit, Star, Clock, User, GitBranch, Search, Grid, List, MoreVertical } from 'lucide-react';

interface ProjectManagerProps {
    className?: string;
    onProjectSelect?: (project: Project) => void;
    onProjectCreate?: (project: Project) => void;
    onProjectUpdate?: (project: Project) => void;
    onProjectDelete?: (projectId: string) => void;
}

interface Project {
    id: string;
    name: string;
    description: string;
    type: 'web' | 'mobile' | 'desktop' | 'api' | 'library' | 'other';
    status: 'active' | 'archived' | 'draft' | 'completed';
    createdAt: string;
    updatedAt: string;
    author: string;
    tags: string[];
    isStarred: boolean;
    isPublic: boolean;
    files: ProjectFile[];
}

interface ProjectFile {
    id: string;
    name: string;
    type: 'file' | 'folder';
    path: string;
    size: number;
    lastModified: string;
    isOpen: boolean;
    children?: ProjectFile[];
}

const mockProjects: Project[] = [
    {
        id: '1',
        name: 'E-commerce Website',
        description: 'Plataforma de e-commerce completa com React e Node.js',
        type: 'web',
        status: 'active',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
        author: 'João Silva',
        tags: ['react', 'nodejs', 'ecommerce', 'typescript'],
        isStarred: true,
        isPublic: false,
        files: [
            {
                id: '1',
                name: 'src',
                type: 'folder',
                path: '/src',
                size: 0,
                lastModified: '2024-01-20T15:30:00Z',
                isOpen: true,
                children: [
                    {
                        id: '2',
                        name: 'App.tsx',
                        type: 'file',
                        path: '/src/App.tsx',
                        size: 1024,
                        lastModified: '2024-01-20T15:30:00Z',
                        isOpen: true
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        name: 'Mobile App',
        description: 'Aplicativo móvel para iOS e Android',
        type: 'mobile',
        status: 'draft',
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-18T12:00:00Z',
        author: 'Maria Santos',
        tags: ['react-native', 'mobile', 'ios', 'android'],
        isStarred: false,
        isPublic: true,
        files: []
    }
];

const projectTypes = [
    { value: 'web', label: 'Web', icon: '🌐' },
    { value: 'mobile', label: 'Mobile', icon: '📱' },
    { value: 'desktop', label: 'Desktop', icon: '💻' },
    { value: 'api', label: 'API', icon: '🔌' },
    { value: 'library', label: 'Library', icon: '📚' },
    { value: 'other', label: 'Other', icon: '📁' }
];

const statusColors = {
    active: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    archived: 'text-gray-600 bg-gray-100 dark:bg-gray-700',
    draft: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
    completed: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
};

export function ProjectManager({
    className = '',
    onProjectSelect,
    onProjectCreate,
    onProjectUpdate,
    onProjectDelete
}: ProjectManagerProps) {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = filterType === 'all' || project.type === filterType;
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        onProjectSelect?.(project);
    };

    const handleProjectCreate = (projectData: Partial<Project>) => {
        const newProject: Project = {
            id: Date.now().toString(),
            name: projectData.name || 'New Project',
            description: projectData.description || '',
            type: projectData.type || 'web',
            status: 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: 'Current User',
            tags: projectData.tags || [],
            isStarred: false,
            isPublic: false,
            files: []
        };

        setProjects(prev => [newProject, ...prev]);
        onProjectCreate?.(newProject);
    };

    const handleProjectUpdate = (projectId: string, updates: Partial<Project>) => {
        setProjects(prev => prev.map(project =>
            project.id === projectId
                ? { ...project, ...updates, updatedAt: new Date().toISOString() }
                : project
        ));

        if (selectedProject?.id === projectId) {
            setSelectedProject(prev => prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null);
        }

        const updatedProject = projects.find(p => p.id === projectId);
        if (updatedProject) {
            onProjectUpdate?.({ ...updatedProject, ...updates, updatedAt: new Date().toISOString() });
        }
    };

    const handleProjectDelete = (projectId: string) => {
        setProjects(prev => prev.filter(project => project.id !== projectId));
        if (selectedProject?.id === projectId) {
            setSelectedProject(null);
        }
        onProjectDelete?.(projectId);
    };

    const handleStarToggle = (projectId: string) => {
        handleProjectUpdate(projectId, {
            isStarred: !projects.find(p => p.id === projectId)?.isStarred
        });
    };

    const handleFileToggle = (fileId: string) => {
        setExpandedFiles(prev => {
            const newSet = new Set(prev);
            if (newSet.has(fileId)) {
                newSet.delete(fileId);
            } else {
                newSet.add(fileId);
            }
            return newSet;
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const renderFileTree = (files: ProjectFile[], level = 0) => {
        return files.map(file => (
            <div key={file.id} className="select-none">
                <div
                    className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${file.isOpen ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                    style={{ paddingLeft: `${level * 20 + 8}px` }}
                    onClick={() => file.type === 'folder' && handleFileToggle(file.id)}
                >
                    <div className="flex items-center gap-2 flex-1">
                        {file.type === 'folder' ? (
                            expandedFiles.has(file.id) ? (
                                <Folder className="w-4 h-4 text-blue-500" />
                            ) : (
                                <Folder className="w-4 h-4 text-gray-400" />
                            )
                        ) : (
                            <File className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-sm text-gray-900 dark:text-white">
                            {file.name}
                        </span>
                        {file.type === 'file' && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({formatFileSize(file.size)})
                            </span>
                        )}
                    </div>
                </div>
                {file.type === 'folder' && file.children && expandedFiles.has(file.id) && (
                    <div>
                        {renderFileTree(file.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Folder className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Gerenciador de Projetos
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title={viewMode === 'grid' ? 'Lista' : 'Grade'}
                        >
                            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => handleProjectCreate({})}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Projeto
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar projetos..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todos os tipos</option>
                        {projectTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.icon} {type.label}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todos os status</option>
                        <option value="active">Ativo</option>
                        <option value="draft">Rascunho</option>
                        <option value="completed">Concluído</option>
                        <option value="archived">Arquivado</option>
                    </select>
                </div>
            </div>

            <div className="flex h-96">
                {/* Projects List */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => handleProjectSelect(project)}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedProject?.id === project.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">
                                                {projectTypes.find(t => t.value === project.type)?.icon}
                                            </span>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {project.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStarToggle(project.id);
                                                }}
                                                className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                                            >
                                                <Star className={`w-4 h-4 ${project.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Handle more options
                                                }}
                                                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
                                            {project.status}
                                        </span>
                                        <span>{formatDate(project.updatedAt)}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => handleProjectSelect(project)}
                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedProject?.id === project.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">
                                                {projectTypes.find(t => t.value === project.type)?.icon}
                                            </span>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {project.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
                                                {project.status}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(project.updatedAt)}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStarToggle(project.id);
                                                }}
                                                className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                                            >
                                                <Star className={`w-4 h-4 ${project.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Project Details */}
                {selectedProject && (
                    <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-4">
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {selectedProject.name}
                                </h4>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleProjectUpdate(selectedProject.id, { isStarred: !selectedProject.isStarred })}
                                        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                                    >
                                        <Star className={`w-4 h-4 ${selectedProject.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => handleProjectDelete(selectedProject.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {selectedProject.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                <div>
                                    <span className="font-medium">Tipo:</span> {projectTypes.find(t => t.value === selectedProject.type)?.label}
                                </div>
                                <div>
                                    <span className="font-medium">Status:</span>
                                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${statusColors[selectedProject.status]}`}>
                                        {selectedProject.status}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium">Criado:</span> {formatDate(selectedProject.createdAt)}
                                </div>
                                <div>
                                    <span className="font-medium">Atualizado:</span> {formatDate(selectedProject.updatedAt)}
                                </div>
                            </div>
                        </div>

                        {/* File Tree */}
                        <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                                Arquivos do Projeto
                            </h5>
                            <div className="max-h-48 overflow-y-auto">
                                {renderFileTree(selectedProject.files)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}