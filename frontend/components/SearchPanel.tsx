'use client';

import React, { useState } from 'react';
import { Search, Replace, Filter, FileText, Code, Image, File } from 'lucide-react';

const SearchPanel: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [replaceQuery, setReplaceQuery] = useState('');
    const [showReplace, setShowReplace] = useState(false);
    const [searchResults, setSearchResults] = useState([
        {
            file: 'src/components/Button.tsx',
            line: 15,
            column: 8,
            text: 'const Button = ({ children, onClick }) => {',
            match: 'Button',
            type: 'typescript'
        },
        {
            file: 'src/components/Button.tsx',
            line: 23,
            column: 12,
            text: '  return <button onClick={onClick}>{children}</button>;',
            match: 'onClick',
            type: 'typescript'
        },
        {
            file: 'src/pages/Home.tsx',
            line: 8,
            column: 4,
            text: '  const handleClick = () => {',
            match: 'handleClick',
            type: 'typescript'
        }
    ]);

    const [searchOptions, setSearchOptions] = useState({
        caseSensitive: false,
        wholeWord: false,
        regex: false,
        includePattern: '',
        excludePattern: ''
    });

    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Simular busca
            console.log('Searching for:', searchQuery);
        }
    };

    const handleReplace = () => {
        if (searchQuery.trim() && replaceQuery.trim()) {
            // Simular substituição
            console.log('Replacing:', searchQuery, 'with:', replaceQuery);
        }
    };

    const handleReplaceAll = () => {
        if (searchQuery.trim() && replaceQuery.trim()) {
            // Simular substituição global
            console.log('Replacing all:', searchQuery, 'with:', replaceQuery);
        }
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'typescript':
            case 'javascript':
                return <Code className="w-4 h-4" />;
            case 'html':
            case 'css':
                return <FileText className="w-4 h-4" />;
            case 'image':
                return <Image className="w-4 h-4" />;
            default:
                return <File className="w-4 h-4" />;
        }
    };

    const getFileTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            'typescript': '#3178c6',
            'javascript': '#f7df1e',
            'html': '#e34f26',
            'css': '#1572b6',
            'json': '#000000',
            'markdown': '#083fa1'
        };
        return colors[type] || '#6b7280';
    };

    return (
        <div className="search-panel">
            <div className="search-header">
                <h3>
                    <Search className="w-5 h-5" />
                    Buscar
                </h3>

                <div className="search-controls">
                    <button
                        className={`control-button ${showReplace ? 'active' : ''}`}
                        onClick={() => setShowReplace(!showReplace)}
                    >
                        <Replace className="w-4 h-4" />
                        Substituir
                    </button>
                    <button className="control-button">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </button>
                </div>
            </div>

            <div className="search-content">
                {/* Search Input */}
                <div className="search-input-section">
                    <div className="input-group">
                        <Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="search-input"
                        />
                        <button
                            className="search-button"
                            onClick={handleSearch}
                            disabled={!searchQuery.trim()}
                        >
                            Buscar
                        </button>
                    </div>

                    {showReplace && (
                        <div className="input-group">
                            <Replace className="w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Substituir por..."
                                value={replaceQuery}
                                onChange={(e) => setReplaceQuery(e.target.value)}
                                className="search-input"
                            />
                            <button
                                className="replace-button"
                                onClick={handleReplace}
                                disabled={!searchQuery.trim() || !replaceQuery.trim()}
                            >
                                Substituir
                            </button>
                            <button
                                className="replace-all-button"
                                onClick={handleReplaceAll}
                                disabled={!searchQuery.trim() || !replaceQuery.trim()}
                            >
                                Substituir Tudo
                            </button>
                        </div>
                    )}
                </div>

                {/* Search Options */}
                <div className="search-options">
                    <div className="options-row">
                        <label className="option-checkbox">
                            <input
                                type="checkbox"
                                checked={searchOptions.caseSensitive}
                                onChange={(e) => setSearchOptions(prev => ({ ...prev, caseSensitive: e.target.checked }))}
                            />
                            <span>Diferenciar maiúsculas</span>
                        </label>

                        <label className="option-checkbox">
                            <input
                                type="checkbox"
                                checked={searchOptions.wholeWord}
                                onChange={(e) => setSearchOptions(prev => ({ ...prev, wholeWord: e.target.checked }))}
                            />
                            <span>Palavra inteira</span>
                        </label>

                        <label className="option-checkbox">
                            <input
                                type="checkbox"
                                checked={searchOptions.regex}
                                onChange={(e) => setSearchOptions(prev => ({ ...prev, regex: e.target.checked }))}
                            />
                            <span>Expressão regular</span>
                        </label>
                    </div>

                    <div className="options-row">
                        <div className="option-input">
                            <label>Incluir:</label>
                            <input
                                type="text"
                                placeholder="*.ts,*.tsx"
                                value={searchOptions.includePattern}
                                onChange={(e) => setSearchOptions(prev => ({ ...prev, includePattern: e.target.value }))}
                            />
                        </div>

                        <div className="option-input">
                            <label>Excluir:</label>
                            <input
                                type="text"
                                placeholder="node_modules,*.min.js"
                                value={searchOptions.excludePattern}
                                onChange={(e) => setSearchOptions(prev => ({ ...prev, excludePattern: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Search Results */}
                <div className="search-results">
                    <div className="results-header">
                        <h4>Resultados ({searchResults.length})</h4>
                        <div className="results-actions">
                            <button className="results-action">Expandir Tudo</button>
                            <button className="results-action">Recolher Tudo</button>
                        </div>
                    </div>

                    <div className="results-list">
                        {searchResults.map((result, index) => (
                            <div key={index} className="result-item">
                                <div className="result-header">
                                    <div className="result-file">
                                        {getFileIcon(result.type)}
                                        <span className="file-name">{result.file}</span>
                                        <span
                                            className="file-type"
                                            style={{ color: getFileTypeColor(result.type) }}
                                        >
                                            {result.type}
                                        </span>
                                    </div>
                                    <div className="result-location">
                                        Linha {result.line}, Coluna {result.column}
                                    </div>
                                </div>

                                <div className="result-content">
                                    <div className="result-line">
                                        <span className="line-number">{result.line}</span>
                                        <span className="line-text">
                                            {result.text.substring(0, result.column - 1)}
                                            <mark className="highlight">{result.match}</mark>
                                            {result.text.substring(result.column - 1 + result.match.length)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {searchResults.length === 0 && searchQuery && (
                        <div className="no-results">
                            <Search className="w-8 h-8" />
                            <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPanel;

