'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Code,
    Zap,
    Brain,
    Lightbulb,
    Search,
    Filter,
    Settings,
    BookOpen,
    FileText,
    Code2,
    Variable,
    Type,
    Package,
    Globe,
    Database,
    ChevronDown,
    ChevronRight,
    Star,
    Clock,
    CheckCircle,
    AlertTriangle,
    Info,
    ArrowRight,
    Eye,
    EyeOff,
    Maximize2,
    Minimize2,
    RotateCcw,
    Download,
    Upload,
    Save,
    Copy,
    Share2
} from 'lucide-react';

interface IntelliSenseItem {
    id: string;
    name: string;
    type: 'function' | 'variable' | 'class' | 'interface' | 'method' | 'property' | 'keyword' | 'snippet';
    description: string;
    signature?: string;
    returnType?: string;
    category: string;
    language: string;
    popularity: number;
    isDeprecated?: boolean;
    documentation?: string;
    examples?: string[];
    tags: string[];
}

export default function FenixIntelliSense() {
    const [intelliSenseItems, setIntelliSenseItems] = useState<IntelliSenseItem[]>([
        {
            id: '1',
            name: 'console.log',
            type: 'function',
            description: 'Outputs a message to the web console',
            signature: 'console.log(message, ...optionalParams)',
            returnType: 'void',
            category: 'Console',
            language: 'javascript',
            popularity: 95,
            documentation: 'The console.log() method outputs a message to the web console.',
            examples: [
                'console.log("Hello, World!");',
                'console.log("User:", user, "Age:", age);'
            ],
            tags: ['debug', 'output', 'development']
        },
        {
            id: '2',
            name: 'Array.prototype.map',
            type: 'method',
            description: 'Creates a new array with the results of calling a function for every array element',
            signature: 'array.map(callback(currentValue, index, array), thisArg)',
            returnType: 'Array',
            category: 'Array',
            language: 'javascript',
            popularity: 90,
            documentation: 'The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.',
            examples: [
                'const numbers = [1, 2, 3, 4];',
                'const doubled = numbers.map(x => x * 2);'
            ],
            tags: ['array', 'functional', 'transformation']
        },
        {
            id: '3',
            name: 'fetch',
            type: 'function',
            description: 'Fetch resources from the network',
            signature: 'fetch(resource, init)',
            returnType: 'Promise<Response>',
            category: 'Network',
            language: 'javascript',
            popularity: 88,
            documentation: 'The fetch() method starts the process of fetching a resource from the network.',
            examples: [
                'fetch("/api/users").then(response => response.json())',
                'const response = await fetch(url);'
            ],
            tags: ['network', 'http', 'api', 'async']
        }
    ]);

    const [filteredItems, setFilteredItems] = useState<IntelliSenseItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLanguage, setSelectedLanguage] = useState('All');
    const [showDocumentation, setShowDocumentation] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IntelliSenseItem | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    // Filter items based on search
    useEffect(() => {
        let filtered = intelliSenseItems;

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        if (selectedLanguage !== 'All') {
            filtered = filtered.filter(item => item.language === selectedLanguage);
        }

        filtered = filtered.sort((a, b) => b.popularity - a.popularity);
        setFilteredItems(filtered);
        setSelectedIndex(0);
    }, [searchTerm, selectedCategory, selectedLanguage]);

    const categories = ['All', 'Console', 'Array', 'Network', 'React', 'DOM', 'HTML Elements', 'Layout', 'Grid', 'CSS Properties'];
    const languages = ['All', 'javascript', 'typescript', 'html', 'css'];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isVisible) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev === 0 ? filteredItems.length - 1 : prev - 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    insertSuggestion(filteredItems[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsVisible(false);
                break;
        }
    };

    const insertSuggestion = (item: IntelliSenseItem) => {
        console.log(`Inserting: ${item.name}`);
        setIsVisible(false);
        setSearchTerm('');
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'function': return <Code2 className="w-4 h-4 text-blue-500" />;
            case 'method': return <Code className="w-4 h-4 text-green-500" />;
            case 'variable': return <Variable className="w-4 h-4 text-purple-500" />;
            case 'class': return <Package className="w-4 h-4 text-orange-500" />;
            case 'interface': return <Type className="w-4 h-4 text-cyan-500" />;
            case 'property': return <Database className="w-4 h-4 text-pink-500" />;
            case 'keyword': return <Zap className="w-4 h-4 text-yellow-500" />;
            case 'snippet': return <FileText className="w-4 h-4 text-indigo-500" />;
            default: return <Code className="w-4 h-4 text-gray-500" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'function': return 'text-blue-400';
            case 'method': return 'text-green-400';
            case 'variable': return 'text-purple-400';
            case 'class': return 'text-orange-400';
            case 'interface': return 'text-cyan-400';
            case 'property': return 'text-pink-400';
            case 'keyword': return 'text-yellow-400';
            case 'snippet': return 'text-indigo-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Brain className="w-6 h-6 text-purple-500" />
                        <h1 className="text-xl font-bold">Fenix IntelliSense</h1>
                        <div className="flex items-center space-x-1 px-2 py-1 bg-green-600 rounded text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Ativo</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowDocumentation(!showDocumentation)}
                            className={`p-2 rounded ${showDocumentation ? 'bg-blue-600' : 'bg-gray-600'}`}
                        >
                            <BookOpen className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded">
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Digite para buscar sugestões..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsVisible(true);
                            }}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 text-white focus:outline-none focus:border-purple-500"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                        {languages.map(language => (
                            <option key={language} value={language}>{language}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Suggestions List */}
                <div className="w-1/2 bg-gray-800 border-r border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="font-semibold mb-2">Sugestões ({filteredItems.length})</h3>
                        <div className="text-sm text-gray-400">
                            Use ↑↓ para navegar, Enter para inserir, Tab para completar
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setSelectedIndex(index);
                                    setSelectedItem(item);
                                }}
                                className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${index === selectedIndex ? 'bg-blue-900 border-blue-600' : ''
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {getTypeIcon(item.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className={`font-medium ${getTypeColor(item.type)}`}>
                                                {item.name}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-gray-600 rounded">
                                                {item.type}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-gray-600 rounded">
                                                {item.language}
                                            </span>
                                            {item.isDeprecated && (
                                                <span className="text-xs px-2 py-1 bg-red-600 rounded">
                                                    Deprecated
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-300 mb-2">{item.description}</p>

                                        {item.signature && (
                                            <div className="text-xs font-mono text-gray-400 bg-gray-700 rounded p-2 mb-2">
                                                {item.signature}
                                            </div>
                                        )}

                                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-3 h-3" />
                                                <span>{item.popularity}%</span>
                                            </div>
                                            <span>{item.category}</span>
                                            <div className="flex space-x-1">
                                                {item.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="px-1 py-0.5 bg-gray-600 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Documentation Panel */}
                {showDocumentation && selectedItem && (
                    <div className="w-1/2 bg-gray-800 flex flex-col">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="font-semibold">Documentação</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-6">
                                {/* Header */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        {getTypeIcon(selectedItem.type)}
                                        <h2 className="text-xl font-bold">{selectedItem.name}</h2>
                                        <span className={`px-2 py-1 rounded text-sm ${getTypeColor(selectedItem.type)}`}>
                                            {selectedItem.type}
                                        </span>
                                    </div>
                                    <p className="text-gray-300">{selectedItem.description}</p>
                                </div>

                                {/* Signature */}
                                {selectedItem.signature && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Assinatura</h3>
                                        <div className="bg-gray-700 rounded p-3 font-mono text-sm">
                                            {selectedItem.signature}
                                        </div>
                                    </div>
                                )}

                                {/* Return Type */}
                                {selectedItem.returnType && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Tipo de Retorno</h3>
                                        <div className="bg-gray-700 rounded p-3 font-mono text-sm text-green-400">
                                            {selectedItem.returnType}
                                        </div>
                                    </div>
                                )}

                                {/* Examples */}
                                {selectedItem.examples && selectedItem.examples.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Exemplos</h3>
                                        <div className="space-y-2">
                                            {selectedItem.examples.map((example, index) => (
                                                <div key={index} className="bg-gray-700 rounded p-3">
                                                    <pre className="text-sm font-mono text-gray-300">{example}</pre>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Documentation */}
                                {selectedItem.documentation && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Documentação</h3>
                                        <div className="bg-gray-700 rounded p-3 text-sm text-gray-300">
                                            {selectedItem.documentation}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                <div>
                                    <h3 className="font-semibold mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-blue-600 rounded text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}