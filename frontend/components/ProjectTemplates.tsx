'use client';

import React, { useState } from 'react';
import { FileText, Code, Search, Plus, Download, Star, Eye, Edit, Trash2 } from 'lucide-react';

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'web' | 'mobile' | 'desktop' | 'api';
  framework: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  features: string[];
  technologies: string[];
  author: string;
  rating: number;
  downloads: number;
  isOfficial: boolean;
  isFeatured: boolean;
  thumbnail: string;
  createdAt: string;
}

interface ProjectTemplatesProps {
  className?: string;
  onTemplateSelect?: (template: ProjectTemplate) => void;
}

const mockTemplates: ProjectTemplate[] = [
  {
    id: '1',
    name: 'React E-commerce Store',
    description: 'Loja online completa com carrinho e pagamentos',
    category: 'E-commerce',
    type: 'web',
    framework: 'React',
    language: 'TypeScript',
    difficulty: 'intermediate',
    estimatedTime: 40,
    features: ['Carrinho de compras', 'Sistema de pagamento', 'Painel admin'],
    technologies: ['React', 'TypeScript', 'Stripe', 'Node.js'],
    author: 'Fenix Academy',
    rating: 4.8,
    downloads: 1250,
    isOfficial: true,
    isFeatured: true,
    thumbnail: '/images/templates/ecommerce.jpg',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Next.js Blog Platform',
    description: 'Plataforma de blog moderna com CMS integrado',
    category: 'Blog',
    type: 'web',
    framework: 'Next.js',
    language: 'TypeScript',
    difficulty: 'beginner',
    estimatedTime: 20,
    features: ['CMS integrado', 'SEO otimizado', 'Comentários'],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    author: 'Fenix Academy',
    rating: 4.6,
    downloads: 890,
    isOfficial: true,
    isFeatured: false,
    thumbnail: '/images/templates/blog.jpg',
    createdAt: '2024-01-05'
  }
];

export function ProjectTemplates({
  className = '',
  onTemplateSelect
}: ProjectTemplatesProps) {
  const [templates, setTemplates] = useState<ProjectTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setTemplates(prev =>
      prev.map(t => t.id === template.id ? { ...t, downloads: t.downloads + 1 } : t)
    );
    onTemplateSelect?.(template);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Templates de Projeto
            </h3>
          </div>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Template
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas as categorias' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="w-full h-48 relative">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {template.isFeatured && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Destaque
                  </div>
                )}
                {template.isOfficial && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Oficial
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h4>
                  <div className="flex items-center gap-1 text-yellow-500 ml-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {template.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    <span>{template.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{template.estimatedTime}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {template.framework} • {template.language}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {template.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {template.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      +{template.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleTemplateSelect(template)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Usar Template
                  </button>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhum template encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros para encontrar o que você está procurando
            </p>
          </div>
        )}
      </div>
    </div>
  );
}