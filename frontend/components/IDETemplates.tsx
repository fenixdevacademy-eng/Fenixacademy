'use client';

import React, { useState } from 'react';
import { File, Code, Globe, Palette, Zap, Database, Bot, Smartphone, Search } from 'lucide-react';

export interface Template {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    category: string;
    content: string;
    language: string;
    extension: string;
    tags: string[];
}

interface IDETemplatesProps {
    onTemplateSelect?: (template: Template) => void;
    className?: string;
}

const templates: Template[] = [
    {
        id: 'html-basic',
        name: 'HTML Básico',
        description: 'Estrutura HTML5 básica com meta tags',
        icon: <Globe className="w-5 h-5" />,
        category: 'Frontend',
        content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
        language: 'html',
        extension: '.html',
        tags: ['html', 'frontend', 'básico']
    },
    {
        id: 'css-basic',
        name: 'CSS Básico',
        description: 'Estilos CSS básicos com reset',
        icon: <Palette className="w-5 h-5" />,
        category: 'Frontend',
        content: `/* Reset CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}`,
        language: 'css',
        extension: '.css',
        tags: ['css', 'frontend', 'estilos']
    },
    {
        id: 'js-basic',
        name: 'JavaScript Básico',
        description: 'Estrutura JavaScript moderna com ES6+',
        icon: <Code className="w-5 h-5" />,
        category: 'Frontend',
        content: `const app = {
    init() {
        console.log('App initialized');
    }
};

app.init();`,
        language: 'javascript',
        extension: '.js',
        tags: ['javascript', 'frontend', 'es6']
    }
];

export function IDETemplates({ onTemplateSelect, className = '' }: IDETemplatesProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            template.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleTemplateSelect = (template: Template) => {
        if (onTemplateSelect) {
            onTemplateSelect(template);
        }
    };

    return (
        <div className={`ide-templates ${className}`}>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Templates de Código</h2>
                <p className="text-gray-600">Selecione um template para começar rapidamente</p>
            </div>

            <div className="mb-6 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar templates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-200"
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <div className="text-blue-600">
                                {template.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                        {template.language}
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                        {template.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTemplates.length === 0 && (
                <div className="text-center py-8">
                    <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhum template encontrado</p>
                </div>
            )}
        </div>
    );
}