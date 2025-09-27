'use client';

import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Copy, 
  Download, 
  Star, 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Tag
} from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  usageCount: number;
  category: string;
}

interface CodeSnippetsProps {
  className?: string;
  onSnippetSelect?: (snippet: CodeSnippet) => void;
  onSnippetCreate?: (snippet: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>) => void;
  onSnippetUpdate?: (snippet: CodeSnippet) => void;
  onSnippetDelete?: (snippetId: string) => void;
}

const mockSnippets: CodeSnippet[] = [
  {
    id: '1',
    title: 'React Component Template',
    description: 'Template básico para componente React',
    code: `import React from 'react';

interface Props {
  // Define your props here
}

const Component: React.FC<Props> = ({ }) => {
  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export default Component;`,
    language: 'typescript',
    tags: ['react', 'typescript', 'component'],
    author: 'Fenix Academy',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isFavorite: false,
    usageCount: 15,
    category: 'React'
  },
  {
    id: '2',
    title: 'API Route Handler',
    description: 'Handler para rotas de API no Next.js',
    code: `import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your GET logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Your POST logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}`,
    language: 'typescript',
    tags: ['nextjs', 'api', 'typescript'],
    author: 'Fenix Academy',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isFavorite: true,
    usageCount: 8,
    category: 'Next.js'
  },
  {
    id: '3',
    title: 'Custom Hook Template',
    description: 'Template para custom hook do React',
    code: `import { useState, useEffect } from 'react';

interface UseCustomHookOptions {
  // Define your options here
}

interface UseCustomHookReturn {
  // Define your return type here
}

export const useCustomHook = (options: UseCustomHookOptions): UseCustomHookReturn => {
  const [state, setState] = useState();

  useEffect(() => {
    // Your effect logic here
  }, []);

  return {
    // Return your values here
  };
};`,
    language: 'typescript',
    tags: ['react', 'hook', 'typescript'],
    author: 'Fenix Academy',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isFavorite: false,
    usageCount: 12,
    category: 'React'
  }
];

export function CodeSnippets({
  className = '',
  onSnippetSelect,
  onSnippetCreate,
  onSnippetUpdate,
  onSnippetDelete
}: CodeSnippetsProps) {
  const [snippets, setSnippets] = useState<CodeSnippet[]>(mockSnippets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'createdAt' | 'usageCount'>('title');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const languages = ['all', 'javascript', 'typescript', 'python', 'java', 'css', 'html'];
  const categories = ['all', ...Array.from(new Set(snippets.map(s => s.category)))];

  const filteredSnippets = snippets
    .filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
      const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
      const matchesFavorites = !showFavoritesOnly || snippet.isFavorite;
      
      return matchesSearch && matchesLanguage && matchesCategory && matchesFavorites;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'usageCount':
          return b.usageCount - a.usageCount;
        default:
          return 0;
      }
    });

  const handleSnippetSelect = (snippet: CodeSnippet) => {
    // Increment usage count
    setSnippets(prev => 
      prev.map(s => s.id === snippet.id ? { ...s, usageCount: s.usageCount + 1 } : s)
    );
    onSnippetSelect?.(snippet);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleDownloadCode = (snippet: CodeSnippet) => {
    const blob = new Blob([snippet.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${snippet.title}.${snippet.language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleFavorite = (snippetId: string) => {
    setSnippets(prev => 
      prev.map(s => s.id === snippetId ? { ...s, isFavorite: !s.isFavorite } : s)
    );
  };

  const handleDeleteSnippet = (snippetId: string) => {
    setSnippets(prev => prev.filter(s => s.id !== snippetId));
    onSnippetDelete?.(snippetId);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Code Snippets
            </h3>
          </div>
          <button
            onClick={() => onSnippetCreate?.({
              title: '',
              description: '',
              code: '',
              language: 'typescript',
              tags: [],
              author: 'User',
              isFavorite: false,
              category: 'General'
            })}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Snippet
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar snippets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'Todas as linguagens' : lang}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Todas as categorias' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Nome</option>
              <option value="createdAt">Data de criação</option>
              <option value="usageCount">Mais usados</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="rounded"
              />
              Apenas favoritos
            </label>
          </div>
        </div>
      </div>

      {/* Snippets List */}
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredSnippets.map((snippet) => (
            <div
              key={snippet.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {snippet.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {snippet.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                      {snippet.language}
                    </span>
                    <span>•</span>
                    <span>{snippet.category}</span>
                    <span>•</span>
                    <span>{snippet.usageCount} usos</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleFavorite(snippet.id)}
                    className={`p-1 rounded transition-colors ${
                      snippet.isFavorite 
                        ? 'text-yellow-500 hover:text-yellow-600' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    title={snippet.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Star className={`w-4 h-4 ${snippet.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleDeleteSnippet(snippet.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Excluir snippet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 text-xs overflow-x-auto">
                  <code className="text-gray-800 dark:text-gray-200">
                    {snippet.code.substring(0, 200)}
                    {snippet.code.length > 200 && '...'}
                  </code>
                </pre>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {snippet.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSnippetSelect(snippet)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Usar
                  </button>
                  <button
                    onClick={() => handleCopyCode(snippet.code)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    title="Copiar código"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownloadCode(snippet)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    title="Baixar código"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSnippets.length === 0 && (
          <div className="text-center py-8">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum snippet encontrado
            </p>
          </div>
        )}
      </div>
    </div>
  );
}