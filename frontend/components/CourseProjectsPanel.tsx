'use client';

import React, { useState, useEffect } from 'react';
import {
    FolderOpen,
    Code,
    Play,
    Download,
    ExternalLink,
    ChevronRight,
    ChevronDown,
    FileText,
    Database,
    Cloud,
    Monitor,
    Smartphone,
    Zap,
    Link
} from 'lucide-react';

interface CourseProject {
    id: string;
    name: string;
    emoji: string;
    language: string;
    path: string;
    files: string[];
}

interface CourseProjectsPanelProps {
    onProjectSelect?: (project: CourseProject) => void;
    onFileOpen?: (projectId: string, filePath: string) => void;
}

const CourseProjectsPanel: React.FC<CourseProjectsPanelProps> = ({
    onProjectSelect,
    onFileOpen
}) => {
    const [projects, setProjects] = useState<CourseProject[]>([]);
    const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const courseProjects: CourseProject[] = [
                {
                    id: "python-data-science",
                    name: "Python Data Science",
                    emoji: "🐍",
                    language: "python",
                    path: "/ide-projects/python-data-science",
                    files: ["main.py", "requirements.txt", "README.md"]
                },
                {
                    id: "react-advanced",
                    name: "React Advanced",
                    emoji: "⚛️",
                    language: "javascript",
                    path: "/ide-projects/react-advanced",
                    files: ["src/App.jsx", "package.json", "README.md"]
                },
                {
                    id: "aws-cloud",
                    name: "AWS Cloud",
                    emoji: "☁️",
                    language: "yaml",
                    path: "/ide-projects/aws-cloud",
                    files: ["cloudformation.yaml", "terraform/main.tf", "README.md"]
                },
                {
                    id: "devops-docker",
                    name: "DevOps Docker",
                    emoji: "🐳",
                    language: "dockerfile",
                    path: "/ide-projects/devops-docker",
                    files: ["Dockerfile", "docker-compose.yml", "README.md"]
                },
                {
                    id: "react-native-mobile",
                    name: "React Native Mobile",
                    emoji: "📱",
                    language: "javascript",
                    path: "/ide-projects/react-native-mobile",
                    files: ["App.js", "package.json", "README.md"]
                },
                {
                    id: "flutter-mobile",
                    name: "Flutter Mobile",
                    emoji: "🎯",
                    language: "dart",
                    path: "/ide-projects/flutter-mobile",
                    files: ["lib/main.dart", "pubspec.yaml", "README.md"]
                },
                {
                    id: "nodejs-apis",
                    name: "Node.js APIs",
                    emoji: "🚀",
                    language: "javascript",
                    path: "/ide-projects/nodejs-apis",
                    files: ["src/app.js", "package.json", "README.md"]
                },
                {
                    id: "blockchain-smart-contracts",
                    name: "Blockchain Smart Contracts",
                    emoji: "⛓️",
                    language: "solidity",
                    path: "/ide-projects/blockchain-smart-contracts",
                    files: ["contracts/Token.sol", "package.json", "README.md"]
                }
            ];

            setProjects(courseProjects);
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleProject = (projectId: string) => {
        const newExpanded = new Set(expandedProjects);
        if (newExpanded.has(projectId)) {
            newExpanded.delete(projectId);
        } else {
            newExpanded.add(projectId);
        }
        setExpandedProjects(newExpanded);
    };

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'py':
                return <Code className="w-4 h-4 text-green-500" />;
            case 'js':
            case 'jsx':
            case 'ts':
            case 'tsx':
                return <Code className="w-4 h-4 text-yellow-500" />;
            case 'yaml':
            case 'yml':
                return <FileText className="w-4 h-4 text-red-500" />;
            case 'dockerfile':
                return <Database className="w-4 h-4 text-blue-500" />;
            case 'dart':
                return <Zap className="w-4 h-4 text-purple-500" />;
            case 'sol':
                return <Link className="w-4 h-4 text-orange-500" />;
            case 'md':
                return <FileText className="w-4 h-4 text-gray-500" />;
            case 'json':
                return <FileText className="w-4 h-4 text-yellow-600" />;
            default:
                return <FileText className="w-4 h-4 text-gray-400" />;
        }
    };

    const getLanguageIcon = (language: string) => {
        switch (language) {
            case 'python':
                return <Code className="w-4 h-4 text-green-500" />;
            case 'javascript':
                return <Code className="w-4 h-4 text-yellow-500" />;
            case 'yaml':
                return <FileText className="w-4 h-4 text-red-500" />;
            case 'dockerfile':
                return <Database className="w-4 h-4 text-blue-500" />;
            case 'dart':
                return <Zap className="w-4 h-4 text-purple-500" />;
            case 'solidity':
                return <Link className="w-4 h-4 text-orange-500" />;
            default:
                return <Code className="w-4 h-4 text-gray-400" />;
        }
    };

    const handleProjectClick = (project: CourseProject) => {
        onProjectSelect?.(project);
    };

    const handleFileClick = (projectId: string, filePath: string) => {
        onFileOpen?.(projectId, filePath);
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-8 bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-800 text-white">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-blue-400" />
                    Projetos dos Cursos
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                    Escolha um projeto para começar a praticar
                </p>
            </div>

            <div className="overflow-y-auto h-full">
                <div className="p-2">
                    {projects.map((project) => (
                        <div key={project.id} className="mb-2">
                            <div
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{project.emoji}</span>
                                    <div>
                                        <h4 className="font-medium">{project.name}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            {getLanguageIcon(project.language)}
                                            <span className="capitalize">{project.language}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleProject(project.id);
                                    }}
                                    className="p-1 hover:bg-gray-500 rounded"
                                >
                                    {expandedProjects.has(project.id) ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {expandedProjects.has(project.id) && (
                                <div className="ml-6 mt-2 space-y-1">
                                    {project.files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 rounded hover:bg-gray-600 cursor-pointer transition-colors"
                                            onClick={() => handleFileClick(project.id, file)}
                                        >
                                            {getFileIcon(file)}
                                            <span className="text-sm text-gray-300">{file}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-gray-700">
                <div className="text-xs text-gray-400 text-center">
                    💡 Dica: Clique em um projeto para abri-lo no IDE
                </div>
            </div>
        </div>
    );
};

export default CourseProjectsPanel;
