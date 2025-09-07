import React, { useState, useEffect } from 'react';
import {
    Search,
    Replace,
    FileText,
    Code,
    Regex,
    CaseSensitive,
    WholeWord,
    ArrowUp,
    ArrowDown,
    X,
    Check,
    AlertCircle
} from 'lucide-react';

interface SearchResult {
    file: string;
    line: number;
    content: string;
    language: string;
    matchIndex: number;
    isSelected: boolean;
}

interface AdvancedSearchProps {
    files: Array<{
        name: string;
        content: string;
        language: string;
    }>;
    onResultSelect: (result: SearchResult) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
    files,
    onResultSelect
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [replaceQuery, setReplaceQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [currentResultIndex, setCurrentResultIndex] = useState(0);
    const [showReplace, setShowReplace] = useState(false);
    const [searchOptions, setSearchOptions] = useState({
        caseSensitive: false,
        wholeWord: false,
        useRegex: false,
        includeHidden: false
    });
    const [searchStats, setSearchStats] = useState({
        totalFiles: 0,
        totalMatches: 0,
        filesWithMatches: 0
    });
    const [isSearching, setIsSearching] = useState(false);

    // Realizar busca quando a query ou opções mudarem
    useEffect(() => {
        if (searchQuery.trim()) {
            performSearch();
        } else {
            setSearchResults([]);
            setSearchStats({
                totalFiles: files.length,
                totalMatches: 0,
                filesWithMatches: 0
            });
        }
    }, [searchQuery, searchOptions, files]);

    const performSearch = () => {
        setIsSearching(true);
        const results: SearchResult[] = [];
        let totalMatches = 0;
        let filesWithMatches = 0;

        files.forEach(file => {
            if (!file.content) return;

            const lines = file.content.split('\n');
            let fileHasMatches = false;

            lines.forEach((line, lineIndex) => {
                let matches: RegExpMatchArray[] = [];

                if (searchOptions.useRegex) {
                    try {
                        const flags = searchOptions.caseSensitive ? 'g' : 'gi';
                        const regex = new RegExp(searchQuery, flags);
                        matches = Array.from(line.matchAll(regex));
                    } catch (error) {
                        // Regex inválido, ignorar
                        return;
                    }
                } else {
                    const searchText = searchOptions.caseSensitive ? searchQuery : searchQuery.toLowerCase();
                    const lineText = searchOptions.caseSensitive ? line : line.toLowerCase();

                    if (searchOptions.wholeWord) {
                        const wordBoundaryRegex = new RegExp(`\\b${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
                        matches = Array.from(line.matchAll(wordBoundaryRegex));
                    } else {
                        let index = 0;
                        while (true) {
                            index = lineText.indexOf(searchText, index);
                            if (index === -1) break;

                            // Simular match para manter consistência
                            const match = {
                                index,
                                input: line,
                                groups: undefined,
                                0: searchText,
                                length: 1
                            } as unknown as RegExpMatchArray;
                            matches.push(match);
                            index += searchText.length;
                        }
                    }
                }

                matches.forEach((match, matchIndex) => {
                    const result: SearchResult = {
                        file: file.name,
                        line: lineIndex + 1,
                        content: line.trim(),
                        language: file.language,
                        matchIndex: match.index || 0,
                        isSelected: false
                    };
                    results.push(result);
                    totalMatches++;
                    fileHasMatches = true;
                });
            });

            if (fileHasMatches) {
                filesWithMatches++;
            }
        });

        setSearchResults(results);
        setSearchStats({
            totalFiles: files.length,
            totalMatches,
            filesWithMatches
        });
        setCurrentResultIndex(0);
        setIsSearching(false);
    };

    const navigateResults = (direction: 'next' | 'previous') => {
        if (searchResults.length === 0) return;

        let newIndex: number;
        if (direction === 'next') {
            newIndex = (currentResultIndex + 1) % searchResults.length;
        } else {
            newIndex = currentResultIndex === 0 ? searchResults.length - 1 : currentResultIndex - 1;
        }

        setCurrentResultIndex(newIndex);
        const result = searchResults[newIndex];
        if (result) {
            onResultSelect(result);
        }
    };

    const replaceCurrent = () => {
        if (currentResultIndex >= 0 && currentResultIndex < searchResults.length) {
            const result = searchResults[currentResultIndex];
            if (result) {
                // Aqui você implementaria a lógica de substituição real
                console.log(`Substituindo em ${result.file}:${result.line}`);
            }
        }
    };

    const replaceAll = () => {
        if (searchResults.length === 0) return;

        const confirmed = confirm(
            `Tem certeza que deseja substituir ${searchResults.length} ocorrências?`
        );

        if (confirmed) {
            // Aqui você implementaria a lógica de substituição em massa
            console.log(`Substituindo ${searchResults.length} ocorrências`);
        }
    };

    const highlightMatch = (content: string, matchIndex: number, query: string) => {
        if (!searchOptions.useRegex) {
            const before = content.substring(0, matchIndex);
            const match = content.substring(matchIndex, matchIndex + query.length);
            const after = content.substring(matchIndex + query.length);

            return (
                <>
                    <span className="text-gray-300">{before}</span>
                    <span className="bg-yellow-500 text-black font-bold px-1 rounded">{match}</span>
                    <span className="text-gray-300">{after}</span>
                </>
            );
        }

        return <span className="text-gray-300">{content}</span>;
    };

    const getFileIcon = (language: string) => {
        switch (language) {
            case 'html':
                return <Code className="w-4 h-4 text-orange-400" />;
            case 'css':
                return <Code className="w-4 h-4 text-blue-400" />;
            case 'javascript':
                return <Code className="w-4 h-4 text-yellow-400" />;
            case 'typescript':
                return <Code className="w-4 h-4 text-blue-500" />;
            case 'python':
                return <Code className="w-4 h-4 text-green-400" />;
            case 'json':
                return <Code className="w-4 h-4 text-purple-400" />;
            default:
                return <FileText className="w-4 h-4 text-gray-400" />;
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-200 flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Busca e Substituição</span>
                </h2>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowReplace(!showReplace)}
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${showReplace
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-600 hover:bg-gray-700 text-white'
                            }`}
                    >
                        <Replace className="w-4 h-4" />
                        <span>Substituir</span>
                    </button>
                </div>
            </div>

            {/* Barra de Busca */}
            <div className="space-y-4 mb-6">
                <div className="flex space-x-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Digite sua busca..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {showReplace && (
                        <div className="flex-1 relative">
                            <Replace className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Substituir por..."
                                value={replaceQuery}
                                onChange={(e) => setReplaceQuery(e.target.value)}
                                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                </div>

                {/* Opções de Busca */}
                <div className="flex flex-wrap items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={searchOptions.caseSensitive}
                            onChange={(e) => setSearchOptions(prev => ({ ...prev, caseSensitive: e.target.checked }))}
                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <CaseSensitive className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">Maiúsculas</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={searchOptions.wholeWord}
                            onChange={(e) => setSearchOptions(prev => ({ ...prev, wholeWord: e.target.checked }))}
                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <WholeWord className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">Palavra Inteira</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={searchOptions.useRegex}
                            onChange={(e) => setSearchOptions(prev => ({ ...prev, useRegex: e.target.checked }))}
                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <Regex className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">Regex</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={searchOptions.includeHidden}
                            onChange={(e) => setSearchOptions(prev => ({ ...prev, includeHidden: e.target.checked }))}
                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">Arquivos Ocultos</span>
                    </label>
                </div>
            </div>

            {/* Estatísticas */}
            {searchQuery && (
                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">{searchStats.totalMatches}</div>
                                <div className="text-sm text-gray-400">Ocorrências</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{searchStats.filesWithMatches}</div>
                                <div className="text-sm text-gray-400">Arquivos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400">{searchStats.totalFiles}</div>
                                <div className="text-sm text-gray-400">Total</div>
                            </div>
                        </div>

                        {showReplace && searchResults.length > 0 && (
                            <div className="flex space-x-3">
                                <button
                                    onClick={replaceCurrent}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Substituir Atual
                                </button>
                                <button
                                    onClick={replaceAll}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Substituir Todos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Resultados da Busca */}
            {searchQuery && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-200">
                            Resultados ({searchResults.length})
                        </h3>

                        {searchResults.length > 0 && (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => navigateResults('previous')}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                    title="Resultado Anterior"
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </button>
                                <span className="text-sm text-gray-400">
                                    {currentResultIndex + 1} de {searchResults.length}
                                </span>
                                <button
                                    onClick={() => navigateResults('next')}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                    title="Próximo Resultado"
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {isSearching ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-400">Buscando...</p>
                        </div>
                    ) : searchResults.length === 0 ? (
                        <div className="text-center py-8">
                            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">Nenhum resultado encontrado</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {searchResults.map((result, index) => (
                                <div
                                    key={`${result.file}-${result.line}-${index}`}
                                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${index === currentResultIndex
                                            ? 'border-blue-500 bg-blue-600 bg-opacity-20'
                                            : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                                        }`}
                                    onClick={() => {
                                        setCurrentResultIndex(index);
                                        onResultSelect(result);
                                    }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                {getFileIcon(result.language)}
                                                <span className="font-medium text-gray-200">
                                                    {result.file}
                                                </span>
                                                <span className="text-sm text-gray-400">
                                                    linha {result.line}
                                                </span>
                                                {index === currentResultIndex && (
                                                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                                        Atual
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-sm text-gray-300 font-mono">
                                                {highlightMatch(result.content, result.matchIndex, searchQuery)}
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Implementar ação de ir para o arquivo
                                                console.log(`Indo para ${result.file}:${result.line}`);
                                            }}
                                            className="text-blue-400 hover:text-blue-300 p-1"
                                            title="Ir para arquivo"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Dicas de Regex */}
            {searchOptions.useRegex && (
                <div className="mt-6 bg-blue-600 bg-opacity-20 border border-blue-500 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2 flex items-center space-x-2">
                        <Regex className="w-4 h-4" />
                        <span>Dicas de Regex</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-300">
                        <div>
                            <div className="font-mono">\w</div>
                            <div>Qualquer caractere de palavra</div>
                        </div>
                        <div>
                            <div className="font-mono">\d</div>
                            <div>Qualquer dígito</div>
                        </div>
                        <div>
                            <div className="font-mono">\s</div>
                            <div>Qualquer espaço em branco</div>
                        </div>
                        <div>
                            <div className="font-mono">^</div>
                            <div>Início da linha</div>
                        </div>
                        <div>
                            <div className="font-mono">$</div>
                            <div>Fim da linha</div>
                        </div>
                        <div>
                            <div className="font-mono">.*</div>
                            <div>Qualquer caractere (0 ou mais)</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedSearch;
