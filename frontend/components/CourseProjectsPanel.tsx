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
    description: string;
    language: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: string;
    path: string;
    files: Array<{
        name: string;
        type: 'code' | 'config' | 'documentation';
        path: string;
    }>;
    technologies: string[];
    features: string[];
    requirements: string[];
    instructions: string[];
    resources: Array<{
        title: string;
        url: string;
        type: 'documentation' | 'video' | 'tutorial';
    }>;
}

const CourseProjectsPanel: React.FC = () => {
    const [projects, setProjects] = useState<CourseProject[]>([]);
    const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            // Simulate API call
            const mockProjects: CourseProject[] = [
                {
                    id: '1',
                    name: 'E-commerce Website',
                    emoji: '🛒',
                    description: 'Build a complete e-commerce website with React and Node.js',
                    language: 'JavaScript',
                    difficulty: 'intermediate',
                    estimatedTime: '2-3 weeks',
                    path: '/projects/ecommerce',
                    files: [
                        { name: 'package.json', type: 'config', path: '/package.json' },
                        { name: 'App.jsx', type: 'code', path: '/src/App.jsx' },
                        { name: 'README.md', type: 'documentation', path: '/README.md' }
                    ],
                    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                    features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Processing'],
                    requirements: ['Basic React knowledge', 'Node.js fundamentals', 'Database concepts'],
                    instructions: [
                        'Set up the project structure',
                        'Create the database schema',
                        'Implement user authentication',
                        'Build the product catalog',
                        'Add shopping cart functionality',
                        'Integrate payment processing'
                    ],
                    resources: [
                        { title: 'React Documentation', url: 'https://react.dev', type: 'documentation' },
                        { title: 'Node.js Guide', url: 'https://nodejs.org', type: 'documentation' }
                    ]
                },
                {
                    id: '2',
                    name: 'Task Management App',
                    emoji: '📋',
                    description: 'Create a task management application with drag-and-drop functionality',
                    language: 'TypeScript',
                    difficulty: 'beginner',
                    estimatedTime: '1-2 weeks',
                    path: '/projects/task-manager',
                    files: [
                        { name: 'tsconfig.json', type: 'config', path: '/tsconfig.json' },
                        { name: 'App.tsx', type: 'code', path: '/src/App.tsx' },
                        { name: 'components/TaskList.tsx', type: 'code', path: '/src/components/TaskList.tsx' }
                    ],
                    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                    features: ['Drag & Drop', 'Task Categories', 'Due Dates', 'Progress Tracking'],
                    requirements: ['Basic TypeScript knowledge', 'React hooks', 'CSS fundamentals'],
                    instructions: [
                        'Set up TypeScript project',
                        'Create task data structure',
                        'Implement drag and drop',
                        'Add task filtering',
                        'Style with Tailwind CSS'
                    ],
                    resources: [
                        { title: 'TypeScript Handbook', url: 'https://typescriptlang.org', type: 'documentation' },
                        { title: 'Framer Motion Tutorial', url: 'https://framer.com', type: 'tutorial' }
                    ]
                }
            ];
            setProjects(mockProjects);
        } catch (err) {
            setError('Failed to load projects');
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

    const handleFileOpen = (projectId: string, filePath: string) => {
        console.log('Opening file:', filePath, 'in project:', projectId);
    };

    const getLanguageIcon = (language: string) => {
        switch (language.toLowerCase()) {
            case 'javascript': return <Code className="w-4 h-4 text-yellow-500" />;
            case 'typescript': return <Code className="w-4 h-4 text-blue-500" />;
            case 'python': return <Code className="w-4 h-4 text-green-500" />;
            case 'java': return <Code className="w-4 h-4 text-red-500" />;
            default: return <FileText className="w-4 h-4 text-gray-500" />;
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading projects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="course-projects-panel p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Projects</h2>
                <p className="text-gray-600">Hands-on projects to practice your skills</p>
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div
                            className="p-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => toggleProject(project.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{project.emoji}</span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                                        <p className="text-sm text-gray-600">{project.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                                        {project.difficulty}
                                    </span>
                                    {expandedProjects.has(project.id) ? (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {expandedProjects.has(project.id) && (
                            <div className="border-t border-gray-200 bg-gray-50 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Project Details */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Project Details</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                {getLanguageIcon(project.language)}
                                                <span>{project.language}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-gray-500" />
                                                <span>{project.estimatedTime}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <h5 className="font-medium text-gray-900 mb-2">Technologies</h5>
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.map((tech, index) => (
                                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Files */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Project Files</h4>
                                        <div className="space-y-1">
                                            {project.files.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 p-2 bg-white rounded hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => handleFileOpen(project.id, file.path)}
                                                >
                                                    <FileText className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm">{file.name}</span>
                                                    <span className="text-xs text-gray-500 ml-auto">{file.type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex gap-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        Start Project
                                    </button>
                                    <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center gap-2">
                                        <ExternalLink className="w-4 h-4" />
                                        View Demo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseProjectsPanel;