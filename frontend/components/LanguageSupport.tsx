'use client';

import React, { useState } from 'react';
import { Code, Download, Upload, Settings, Play, Bug, FileText, Database, Globe, Server } from 'lucide-react';

interface LanguageSupport {
    id: string;
    name: string;
    extensions: string[];
    category: 'web' | 'mobile' | 'backend' | 'data' | 'system' | 'other';
    features: string[];
    syntaxHighlighting: boolean;
    intellisense: boolean;
    debugging: boolean;
    linting: boolean;
    formatting: boolean;
    snippets: boolean;
    icon: React.ComponentType<any>;
    description: string;
    popularity: number;
}

const supportedLanguages: LanguageSupport[] = [
    // Web Development
    {
        id: 'html',
        name: 'HTML',
        extensions: ['.html', '.htm', '.xhtml'],
        category: 'web',
        features: ['Syntax Highlighting', 'Auto-closing tags', 'Emmet support', 'Validation'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: false,
        linting: true,
        formatting: true,
        snippets: true,
        icon: FileText,
        description: 'Linguagem de marcação para estruturar conteúdo web',
        popularity: 100
    },
    {
        id: 'css',
        name: 'CSS',
        extensions: ['.css', '.scss', '.sass', '.less'],
        category: 'web',
        features: ['Syntax Highlighting', 'Auto-completion', 'Color picker', 'CSS Grid/Flexbox support'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: FileText,
        description: 'Linguagem de estilização para design web',
        popularity: 95
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        extensions: ['.js', '.jsx', '.mjs'],
        category: 'web',
        features: ['ES6+ Support', 'Async/await', 'Modules', 'DOM manipulation'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Code,
        description: 'Linguagem de programação dinâmica para web',
        popularity: 100
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        extensions: ['.ts', '.tsx'],
        category: 'web',
        features: ['Static typing', 'Interfaces', 'Generics', 'Advanced IntelliSense'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Code,
        description: 'Superset do JavaScript com tipagem estática',
        popularity: 90
    },
    {
        id: 'react',
        name: 'React',
        extensions: ['.jsx', '.tsx'],
        category: 'web',
        features: ['JSX Support', 'Hooks', 'Component lifecycle', 'State management'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Code,
        description: 'Biblioteca JavaScript para interfaces de usuário',
        popularity: 95
    },
    {
        id: 'vue',
        name: 'Vue.js',
        extensions: ['.vue'],
        category: 'web',
        features: ['Single File Components', 'Reactivity', 'Composition API', 'Vue DevTools'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Code,
        description: 'Framework progressivo para interfaces de usuário',
        popularity: 85
    },

    // Mobile Development
    {
        id: 'react-native',
        name: 'React Native',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        category: 'mobile',
        features: ['Cross-platform', 'Native modules', 'Hot reloading', 'Performance optimization'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Code,
        description: 'Framework para desenvolvimento mobile nativo',
        popularity: 80
    },
    {
        id: 'flutter',
        name: 'Flutter',
        extensions: ['.dart'],
        category: 'mobile',
        features: ['Hot reload', 'Widget tree', 'Material Design', 'Cupertino'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Code,
        description: 'SDK para desenvolvimento mobile multiplataforma',
        popularity: 75
    },
    {
        id: 'swift',
        name: 'Swift',
        extensions: ['.swift'],
        category: 'mobile',
        features: ['iOS Development', 'ARC', 'Generics', 'Protocols'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Code,
        description: 'Linguagem moderna para desenvolvimento iOS',
        popularity: 70
    },
    {
        id: 'kotlin',
        name: 'Kotlin',
        extensions: ['.kt', '.kts'],
        category: 'mobile',
        features: ['Android Development', 'Null safety', 'Coroutines', 'Interop with Java'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Code,
        description: 'Linguagem moderna para desenvolvimento Android',
        popularity: 75
    },

    // Backend Development
    {
        id: 'python',
        name: 'Python',
        extensions: ['.py', '.pyw', '.pyi'],
        category: 'backend',
        features: ['Django/Flask', 'Async support', 'Type hints', 'Virtual environments'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem de programação versátil e legível',
        popularity: 95
    },
    {
        id: 'nodejs',
        name: 'Node.js',
        extensions: ['.js', '.mjs', '.cjs'],
        category: 'backend',
        features: ['Event-driven', 'Non-blocking I/O', 'NPM ecosystem', 'Express/Fastify'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Runtime JavaScript para desenvolvimento backend',
        popularity: 90
    },
    {
        id: 'java',
        name: 'Java',
        extensions: ['.java', '.class'],
        category: 'backend',
        features: ['Spring Framework', 'Enterprise features', 'JVM', 'Multi-threading'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem orientada a objetos robusta',
        popularity: 85
    },
    {
        id: 'csharp',
        name: 'C#',
        extensions: ['.cs', '.csx'],
        category: 'backend',
        features: ['.NET Framework', 'LINQ', 'Async/await', 'Entity Framework'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem moderna para desenvolvimento .NET',
        popularity: 80
    },
    {
        id: 'go',
        name: 'Go',
        extensions: ['.go'],
        category: 'backend',
        features: ['Goroutines', 'Channels', 'Static typing', 'Built-in testing'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem compilada para sistemas distribuídos',
        popularity: 75
    },
    {
        id: 'rust',
        name: 'Rust',
        extensions: ['.rs'],
        category: 'backend',
        features: ['Memory safety', 'Zero-cost abstractions', 'Cargo package manager', 'WebAssembly'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem de sistemas com segurança de memória',
        popularity: 70
    },

    // Data Science & AI
    {
        id: 'python-ds',
        name: 'Python Data Science',
        extensions: ['.py', '.ipynb'],
        category: 'data',
        features: ['NumPy', 'Pandas', 'Matplotlib', 'Jupyter notebooks'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Database,
        description: 'Python para análise de dados e machine learning',
        popularity: 90
    },
    {
        id: 'r',
        name: 'R',
        extensions: ['.r', '.R'],
        category: 'data',
        features: ['Statistical computing', 'Data visualization', 'CRAN packages', 'R Markdown'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Database,
        description: 'Linguagem para computação estatística e gráficos',
        popularity: 75
    },
    {
        id: 'julia',
        name: 'Julia',
        extensions: ['.jl'],
        category: 'data',
        features: ['High performance', 'Multiple dispatch', 'Scientific computing', 'Parallelism'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Database,
        description: 'Linguagem de alto desempenho para computação científica',
        popularity: 60
    },

    // System Programming
    {
        id: 'c',
        name: 'C',
        extensions: ['.c', '.h'],
        category: 'system',
        features: ['Low-level programming', 'Memory management', 'System calls', 'Portability'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem de programação de sistemas',
        popularity: 80
    },
    {
        id: 'cpp',
        name: 'C++',
        extensions: ['.cpp', '.cc', '.cxx', '.hpp'],
        category: 'system',
        features: ['Object-oriented', 'Templates', 'STL', 'RAII'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem de programação de sistemas com OOP',
        popularity: 85
    },

    // Other Languages
    {
        id: 'php',
        name: 'PHP',
        extensions: ['.php', '.phtml'],
        category: 'other',
        features: ['Web development', 'Laravel/Symfony', 'Composer', 'WordPress'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem de script para desenvolvimento web',
        popularity: 80
    },
    {
        id: 'ruby',
        name: 'Ruby',
        extensions: ['.rb', '.erb'],
        category: 'other',
        features: ['Ruby on Rails', 'Gems', 'Metaprogramming', 'DSL support'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem dinâmica e orientada a objetos',
        popularity: 70
    },
    {
        id: 'scala',
        name: 'Scala',
        extensions: ['.scala'],
        category: 'other',
        features: ['JVM compatibility', 'Functional programming', 'Akka', 'Spark'],
        syntaxHighlighting: true,
        intellisense: true,
        debugging: true,
        linting: true,
        formatting: true,
        snippets: true,
        icon: Server,
        description: 'Linguagem funcional para JVM',
        popularity: 65
    }
];

export default function LanguageSupport() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'category'>('popularity');

    const categories = [
        { id: 'all', name: 'Todas', icon: Globe, count: supportedLanguages.length },
        { id: 'web', name: 'Web', icon: Globe, count: supportedLanguages.filter(l => l.category === 'web').length },
        { id: 'mobile', name: 'Mobile', icon: Code, count: supportedLanguages.filter(l => l.category === 'mobile').length },
        { id: 'backend', name: 'Backend', icon: Server, count: supportedLanguages.filter(l => l.category === 'backend').length },
        { id: 'data', name: 'Data Science', icon: Database, count: supportedLanguages.filter(l => l.category === 'data').length },
        { id: 'system', name: 'Sistema', icon: Server, count: supportedLanguages.filter(l => l.category === 'system').length },
        { id: 'other', name: 'Outras', icon: Code, count: supportedLanguages.filter(l => l.category === 'other').length }
    ];

    const filteredLanguages = supportedLanguages
        .filter(language => {
            const matchesCategory = selectedCategory === 'all' || language.category === selectedCategory;
            const matchesSearch = language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                language.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'popularity':
                    return b.popularity - a.popularity;
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'web': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'mobile': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'backend': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'data': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'system': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'other': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getFeatureIcon = (feature: string) => {
        if (feature.includes('Syntax')) return <Code className="w-4 h-4" />;
        if (feature.includes('IntelliSense')) return <Settings className="w-4 h-4" />;
        if (feature.includes('Debugging')) return <Bug className="w-4 h-4" />;
        if (feature.includes('Linting')) return <FileText className="w-4 h-4" />;
        if (feature.includes('Formatting')) return <FileText className="w-4 h-4" />;
        if (feature.includes('Snippets')) return <Code className="w-4 h-4" />;
        return <Code className="w-4 h-4" />;
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    🗣️ Suporte a Linguagens de Programação
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    {supportedLanguages.length} linguagens suportadas com recursos avançados
                </p>
            </div>

            {/* Filtros e Controles */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    {categories.map(category => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{category.name}</span>
                                <span className="text-xs opacity-75">({category.count})</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Buscar linguagens..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        <option value="popularity">Ordenar por Popularidade</option>
                        <option value="name">Ordenar por Nome</option>
                        <option value="category">Ordenar por Categoria</option>
                    </select>
                </div>
            </div>

            {/* Grid de Linguagens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLanguages.map(language => {
                    const Icon = language.icon;
                    return (
                        <div
                            key={language.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {language.name}
                                    </h3>
                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(language.category)}`}>
                                        {language.category}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">Popularidade</div>
                                    <div className="text-lg font-bold text-blue-600">{language.popularity}%</div>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {language.description}
                            </p>

                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Extensões</h4>
                                <div className="flex flex-wrap gap-1">
                                    {language.extensions.map(ext => (
                                        <span
                                            key={ext}
                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                                        >
                                            {ext}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recursos</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {language.features.slice(0, 4).map(feature => (
                                        <div key={feature} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                            {getFeatureIcon(feature)}
                                            <span className="truncate">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Suporte IDE</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { key: 'syntaxHighlighting', label: 'Syntax' },
                                        { key: 'intellisense', label: 'IntelliSense' },
                                        { key: 'debugging', label: 'Debug' },
                                        { key: 'linting', label: 'Linting' },
                                        { key: 'formatting', label: 'Format' },
                                        { key: 'snippets', label: 'Snippets' }
                                    ].map(({ key, label }) => (
                                        <div
                                            key={key}
                                            className={`text-center p-2 rounded text-xs font-medium ${language[key as keyof LanguageSupport]
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}
                                        >
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    {language.extensions.length} extensões
                                </div>
                                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                                    <Play className="w-3 h-3 inline mr-1" />
                                    Usar
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Estatísticas */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Suporte Completo a Linguagens
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-4xl font-bold mb-2">{supportedLanguages.length}</div>
                        <div className="text-blue-100">Linguagens</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">{categories.length - 1}</div>
                        <div className="text-blue-100">Categorias</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">100%</div>
                        <div className="text-blue-100">Syntax Highlighting</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">95%</div>
                        <div className="text-blue-100">IntelliSense</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
