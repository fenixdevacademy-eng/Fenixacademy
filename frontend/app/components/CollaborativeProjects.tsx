'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, Star, Clock, Lock, Unlock } from 'lucide-react';

interface CollaborativeProjectsProps {
    className?: string;
    onProjectCreate?: (project: Project) => void;
    onProjectJoin?: (projectId: string) => void;
}

interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'archived';
    visibility: 'public' | 'private' | 'team';
    owner: User;
    collaborators: User[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
    progress: number;
    isStarred: boolean;
    technologies: string[];
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: 'owner' | 'admin' | 'member';
    isOnline: boolean;
}

const mockProjects: Project[] = [
    {
        id: '1',
        name: 'E-commerce Platform',
        description: 'A modern e-commerce platform built with React and Node.js',
        status: 'active',
        visibility: 'public',
        owner: {
            id: '1',
            name: 'João Silva',
            email: 'joao@example.com',
            avatar: '/avatars/joao.jpg',
            role: 'owner',
            isOnline: true
        },
        collaborators: [
            {
                id: '2',
                name: 'Maria Santos',
                email: 'maria@example.com',
                avatar: '/avatars/maria.jpg',
                role: 'admin',
                isOnline: true
            }
        ],
        tags: ['react', 'nodejs', 'ecommerce'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
        progress: 75,
        isStarred: true,
        technologies: ['React', 'Node.js', 'TypeScript']
    }
];

export function CollaborativeProjects({
    className = '',
    onProjectCreate,
    onProjectJoin
}: CollaborativeProjectsProps) {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleJoinProject = (projectId: string) => {
        onProjectJoin?.(projectId);
    };

    const handleStarProject = (projectId: string) => {
        setProjects(prev => prev.map(project =>
            project.id === projectId
                ? { ...project, isStarred: !project.isStarred }
                : project
        ));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'completed':
                return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
            case 'archived':
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    const getVisibilityIcon = (visibility: string) => {
        switch (visibility) {
            case 'public':
                return <Unlock className="w-4 h-4" />;
            case 'private':
                return <Lock className="w-4 h-4" />;
            case 'team':
                return <Users className="w-4 h-4" />;
            default:
                return <Lock className="w-4 h-4" />;
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Projetos Colaborativos
                        </h3>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Novo Projeto
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar projetos..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            <div className="p-4">
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {project.name}
                                        </h4>
                                        {project.isStarred && (
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleStarProject(project.id)}
                                        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                                    >
                                        <Star className={`w-4 h-4 ${project.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {project.description}
                                </p>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                        {getVisibilityIcon(project.visibility)}
                                        <span className="text-xs">{project.visibility}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        <span>Progresso</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Collaborators */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {project.collaborators.length + 1} membros
                                        </span>
                                    </div>
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                {project.owner.name.charAt(0)}
                                            </span>
                                        </div>
                                        {project.collaborators.slice(0, 2).map((collaborator) => (
                                            <div
                                                key={collaborator.id}
                                                className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center"
                                            >
                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                    {collaborator.name.charAt(0)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {project.technologies.slice(0, 3).map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>Atualizado hoje</span>
                                    </div>
                                    <button
                                        onClick={() => handleJoinProject(project.id)}
                                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
                                    >
                                        Participar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Nenhum projeto encontrado
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Comece criando seu primeiro projeto colaborativo
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}





