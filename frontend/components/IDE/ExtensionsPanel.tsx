'use client';

import React, { useState } from 'react';
import {
  Package,
  Download,
  Settings,
  Code,
  Palette,
  Zap,
  GitBranch,
  Database,
  Globe,
  FileText,
  Image,
  Music,
  Video,
  BarChart3,
  Shield,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Star,
  Heart,
  Download as DownloadIcon,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface Extension {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: string;
  downloads: number;
  rating: number;
  isInstalled: boolean;
  isEnabled: boolean;
  icon: React.ReactNode;
  features: string[];
}

export default function ExtensionsPanel() {
  const [extensions, setExtensions] = useState<Extension[]>([
    {
      id: '1',
      name: 'Fenix AI Assistant',
      description: 'Assistente de IA integrado para ajudar com código, debugging e otimização',
      version: '1.2.0',
      author: 'Fenix Academy',
      category: 'AI',
      downloads: 15420,
      rating: 4.9,
      isInstalled: true,
      isEnabled: true,
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      features: ['Code completion', 'Error detection', 'Performance optimization', 'Code explanation']
    },
    {
      id: '2',
      name: 'React Developer Tools',
      description: 'Ferramentas avançadas para desenvolvimento React com debugging visual',
      version: '2.1.5',
      author: 'React Team',
      category: 'Framework',
      downloads: 8920,
      rating: 4.8,
      isInstalled: true,
      isEnabled: true,
      icon: <Code className="w-6 h-6 text-blue-500" />,
      features: ['Component inspector', 'Props debugging', 'State visualization', 'Performance profiler']
    },
    {
      id: '3',
      name: 'Git Integration Pro',
      description: 'Integração completa com Git, GitHub e GitLab com interface visual',
      version: '3.0.1',
      author: 'GitHub',
      category: 'Version Control',
      downloads: 12300,
      rating: 4.7,
      isInstalled: false,
      isEnabled: false,
      icon: <GitBranch className="w-6 h-6 text-green-500" />,
      features: ['Visual diff', 'Branch management', 'Commit history', 'Pull request integration']
    },
    {
      id: '4',
      name: 'Database Explorer',
      description: 'Explorador de banco de dados com suporte a MySQL, PostgreSQL e MongoDB',
      version: '1.8.2',
      author: 'Database Tools',
      category: 'Database',
      downloads: 6780,
      rating: 4.6,
      isInstalled: false,
      isEnabled: false,
      icon: <Database className="w-6 h-6 text-purple-500" />,
      features: ['Query builder', 'Schema visualization', 'Data export', 'Performance monitoring']
    },
    {
      id: '5',
      name: 'Theme Customizer',
      description: 'Personalize completamente o visual do IDE com temas e cores customizadas',
      version: '2.3.0',
      author: 'UI Team',
      category: 'UI/UX',
      downloads: 9870,
      rating: 4.5,
      isInstalled: true,
      isEnabled: false,
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      features: ['Custom themes', 'Color schemes', 'Font settings', 'Layout customization']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = ['All', 'AI', 'Framework', 'Version Control', 'Database', 'UI/UX', 'Testing', 'Code Quality', 'Media'];

  const filteredExtensions = extensions
    .filter(ext =>
      ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(ext => selectedCategory === 'All' || ext.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const installExtension = (id: string) => {
    setExtensions(prev => prev.map(ext =>
      ext.id === id ? { ...ext, isInstalled: true, isEnabled: true } : ext
    ));
  };

  const uninstallExtension = (id: string) => {
    setExtensions(prev => prev.map(ext =>
      ext.id === id ? { ...ext, isInstalled: false, isEnabled: false } : ext
    ));
  };

  const toggleExtension = (id: string) => {
    setExtensions(prev => prev.map(ext =>
      ext.id === id ? { ...ext, isEnabled: !ext.isEnabled } : ext
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI': 'bg-yellow-100 text-yellow-800',
      'Framework': 'bg-blue-100 text-blue-800',
      'Version Control': 'bg-green-100 text-green-800',
      'Database': 'bg-purple-100 text-purple-800',
      'UI/UX': 'bg-pink-100 text-pink-800',
      'Testing': 'bg-cyan-100 text-cyan-800',
      'Code Quality': 'bg-orange-100 text-orange-800',
      'Media': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold">Extensões</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar extensões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 text-white focus:outline-none focus:border-blue-500"
            />
            <Package className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="popularity">Mais Populares</option>
            <option value="rating">Melhor Avaliadas</option>
            <option value="name">Nome</option>
          </select>
        </div>
      </div>

      {/* Extensions List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredExtensions.map(extension => (
            <div key={extension.id} className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    {extension.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{extension.name}</h3>
                    <p className="text-gray-400 text-sm">{extension.author}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-400">{extension.rating}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-3">{extension.description}</p>

              <div className="flex items-center space-x-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(extension.category)}`}>
                  {extension.category}
                </span>
                <span className="text-gray-400 text-xs">v{extension.version}</span>
                <span className="text-gray-400 text-xs">{extension.downloads.toLocaleString()} downloads</span>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Recursos:</h4>
                <div className="flex flex-wrap gap-1">
                  {extension.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {extension.isInstalled ? (
                    <>
                      <button
                        onClick={() => toggleExtension(extension.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${extension.isEnabled
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gray-600 hover:bg-gray-700'
                          }`}
                      >
                        {extension.isEnabled ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        <span>{extension.isEnabled ? 'Ativado' : 'Desativado'}</span>
                      </button>
                      <button
                        onClick={() => uninstallExtension(extension.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Desinstalar</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => installExtension(extension.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      <span>Instalar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}