'use client';

import React, { useState, useEffect } from 'react';
import {
    FileText,
    Plus,
    Search,
    Filter,
    Star,
    Download,
    Upload,
    Edit,
    Trash2,
    Copy,
    Code,
    Globe,
    Smartphone,
    Database,
    Zap,
    Palette,
    Settings,
    Tag,
    Calendar,
    User,
    Heart,
    Bookmark,
    Share2
} from 'lucide-react';

interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    language: string;
    tags: string[];
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
    isFavorite: boolean;
    downloads: number;
    rating: number;
    preview?: string;
    dependencies?: string[];
    framework?: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: string;
}

interface Category {
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    count: number;
    color: string;
}

const TemplateManager: React.FC = () => {
    const [templates, setTemplates] = useState<Template[]>([
        {
            id: '1',
            name: 'React Component Básico',
            description: 'Template para criar um componente React funcional básico',
            category: 'react',
            language: 'javascript',
            tags: ['react', 'component', 'functional'],
            content: `import React from 'react';

const MyComponent = ({ title, children }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default MyComponent;`,
            author: 'João Silva',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
            isPublic: true,
            isFavorite: true,
            downloads: 1250,
            rating: 4.8,
            framework: 'React',
            difficulty: 'beginner',
            estimatedTime: '5 min'
        },
        {
            id: '2',
            name: 'API REST com Express',
            description: 'Template completo para criar uma API REST usando Express.js',
            category: 'backend',
            language: 'javascript',
            tags: ['express', 'api', 'rest', 'nodejs'],
            content: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
            author: 'Maria Santos',
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-12'),
            isPublic: true,
            isFavorite: false,
            downloads: 890,
            rating: 4.6,
            framework: 'Express',
            difficulty: 'intermediate',
            estimatedTime: '15 min',
            dependencies: ['express', 'cors', 'helmet']
        },
        {
            id: '3',
            name: 'Landing Page Responsiva',
            description: 'Template de landing page moderna e responsiva com HTML5 e CSS3',
            category: 'frontend',
            language: 'html',
            tags: ['html', 'css', 'responsive', 'landing-page'],
            content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Landing Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">Logo</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home" class="hero">
            <h1>Bem-vindo à nossa plataforma</h1>
            <p>Descrição incrível do seu produto</p>
            <button class="cta-button">Começar Agora</button>
        </section>
    </main>
</body>
</html>`,
            author: 'Pedro Costa',
            createdAt: new Date('2024-01-08'),
            updatedAt: new Date('2024-01-08'),
            isPublic: true,
            isFavorite: true,
            downloads: 2100,
            rating: 4.9,
            framework: 'Vanilla',
            difficulty: 'beginner',
            estimatedTime: '10 min'
        }
    ]);

    const [categories] = useState<Category[]>([
        { id: 'all', name: 'Todos', icon: FileText, count: 0, color: 'bg-gray-500' },
        { id: 'react', name: 'React', icon: Code, count: 0, color: 'bg-blue-500' },
        { id: 'vue', name: 'Vue.js', icon: Code, count: 0, color: 'bg-green-500' },
        { id: 'angular', name: 'Angular', icon: Code, count: 0, color: 'bg-red-500' },
        { id: 'frontend', name: 'Frontend', icon: Globe, count: 0, color: 'bg-purple-500' },
        { id: 'backend', name: 'Backend', icon: Database, count: 0, color: 'bg-orange-500' },
        { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 0, color: 'bg-pink-500' },
        { id: 'ai', name: 'IA/ML', icon: Zap, count: 0, color: 'bg-yellow-500' },
        { id: 'design', name: 'Design', icon: Palette, count: 0, color: 'bg-indigo-500' }
    ]);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'date' | 'rating' | 'downloads'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
    const [filterLanguage, setFilterLanguage] = useState<string>('all');

    // Update category counts
    useEffect(() => {
        const updatedCategories = categories.map(category => {
            if (category.id === 'all') {
                return { ...category, count: templates.length }
            }
            return {
                ...category,
                count: templates.filter(t => t.category === category.id).length
            }
        });
        // Note: In a real app, you'd update the categories state here
    }, [templates, categories]);

    const filteredTemplates = templates.filter(template => {
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesDifficulty = filterDifficulty === 'all' || template.difficulty === filterDifficulty;
        const matchesLanguage = filterLanguage === 'all' || template.language === filterLanguage;

        return matchesCategory && matchesSearch && matchesDifficulty && matchesLanguage;
    });

    const sortedTemplates = [...filteredTemplates].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'date':
                comparison = a.createdAt.getTime() - b.createdAt.getTime();
                break;
            case 'rating':
                comparison = a.rating - b.rating;
                break;
            case 'downloads':
                comparison = a.downloads - b.downloads;
                break;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const handleCreateTemplate = () => {
        setShowCreateModal(true);
    }

    const handleEditTemplate = (template: Template) => {
        setEditingTemplate(template);
        setShowEditModal(true);
    }

    const handleDeleteTemplate = (id: string) => {
        setTemplates(prev => prev.filter(t => t.id !== id));
    }

    const handleToggleFavorite = (id: string) => {
        setTemplates(prev => prev.map(t =>
            t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
        ));
    }

    const handleUseTemplate = (template: Template) => {
        // In a real app, this would insert the template content into the editor
        console.log('Using template:', template.name);
        // You could emit an event or call a callback here
    }

    const handleDownloadTemplate = (template: Template) => {
        const blob = new Blob([template.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${template.name}.${template.language}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'text-green-400 bg-green-900/20';
            case 'intermediate': return 'text-yellow-400 bg-yellow-900/20';
            case 'advanced': return 'text-red-400 bg-red-900/20';
            default: return 'text-gray-400 bg-gray-900/20';
        }
    }

    const getLanguageIcon = (language: string) => {
        switch (language) {
            case 'javascript': return '🟨';
            case 'typescript': return '🔷';
            case 'python': return '🐍';
            case 'html': return '🌐';
            case 'css': return '🎨';
            case 'java': return '☕';
            case 'cpp': return '⚙️';
            default: return '📄';
        }
    }

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold">Templates & Snippets</h3>
                        <div className="text-sm text-gray-400">
                            {filteredTemplates.length} templates
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleCreateTemplate}
                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Novo</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar templates..."
                            className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="name">Nome</option>
                        <option value="date">Data</option>
                        <option value="rating">Avaliação</option>
                        <option value="downloads">Downloads</option>
                    </select>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <select
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value)}
                        className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todas as dificuldades</option>
                        <option value="beginner">Iniciante</option>
                        <option value="intermediate">Intermediário</option>
                        <option value="advanced">Avançado</option>
                    </select>

                    <select
                        value={filterLanguage}
                        onChange={(e) => setFilterLanguage(e.target.value)}
                        className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todas as linguagens</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 flex">
                {/* Categories Sidebar */}
                <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-4">Categorias</h4>
                    <div className="space-y-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${selectedCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <category.icon className="w-4 h-4" />
                                    <span className="text-sm">{category.name}</span>
                                </div>
                                <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedTemplates.map(template => (
                            <div key={template.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">{getLanguageIcon(template.language)}</span>
                                        <h4 className="text-sm font-semibold text-white">{template.name}</h4>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() => handleToggleFavorite(template.id)}
                                            className="text-gray-400 hover:text-yellow-400"
                                        >
                                            {template.isFavorite ? (
                                                <Star className="w-4 h-4 fill-current" />
                                            ) : (
                                                <Star className="w-4 h-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleEditTemplate(template)}
                                            className="text-gray-400 hover:text-blue-400"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTemplate(template.id)}
                                            className="text-gray-400 hover:text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{template.description}</p>

                                <div className="flex items-center space-x-2 mb-3">
                                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                                        {template.difficulty}
                                    </span>
                                    <span className="text-xs text-gray-500">{template.estimatedTime}</span>
                                    {template.framework && (
                                        <span className="text-xs text-blue-400">{template.framework}</span>
                                    )}
                                </div>

                                <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Download className="w-3 h-3" />
                                        <span>{template.downloads}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-3 h-3" />
                                        <span>{template.rating}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{template.createdAt.toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-3">
                                    {template.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                    {template.tags.length > 3 && (
                                        <span className="text-xs text-gray-500">+{template.tags.length - 3}</span>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleUseTemplate(template)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                                    >
                                        Usar
                                    </button>
                                    <button
                                        onClick={() => handleDownloadTemplate(template)}
                                        className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {sortedTemplates.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 mb-4">Nenhum template encontrado</p>
                            <button
                                onClick={handleCreateTemplate}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            >
                                Criar Primeiro Template
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TemplateManager;









