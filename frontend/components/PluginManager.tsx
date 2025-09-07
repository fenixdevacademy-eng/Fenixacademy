'use client';

import React, { useState } from 'react';
import { Package, Search, Download, Trash2, Settings, Star, Filter } from 'lucide-react';

const PluginManager: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, installed, available
    const [plugins, setPlugins] = useState([
        {
            id: 'autocomplete',
            name: 'Intelligent Autocomplete',
            description: 'Autocomplete inteligente baseado em IA',
            author: 'Fenix Team',
            version: '1.0.0',
            installed: true,
            enabled: true,
            rating: 4.8,
            downloads: 1250,
            category: 'Productivity'
        },
        {
            id: 'brazilian-tools',
            name: 'Brazilian Tools',
            description: 'Ferramentas específicas para o mercado brasileiro',
            author: 'Fenix Team',
            version: '1.2.0',
            installed: true,
            enabled: true,
            rating: 4.9,
            downloads: 890,
            category: 'Localization'
        },
        {
            id: 'git-integration',
            name: 'Git Integration',
            description: 'Integração avançada com Git',
            author: 'Fenix Team',
            version: '2.1.0',
            installed: false,
            enabled: false,
            rating: 4.7,
            downloads: 2100,
            category: 'Version Control'
        },
        {
            id: 'theme-pack',
            name: 'Theme Pack',
            description: 'Pacote de temas para a IDE',
            author: 'Community',
            version: '1.5.0',
            installed: false,
            enabled: false,
            rating: 4.5,
            downloads: 750,
            category: 'Themes'
        }
    ]);

    const filteredPlugins = plugins.filter(plugin => {
        const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plugin.description.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === 'installed') return matchesSearch && plugin.installed;
        if (filter === 'available') return matchesSearch && !plugin.installed;
        return matchesSearch;
    });

    const handleInstall = (pluginId: string) => {
        setPlugins(prev => prev.map(plugin =>
            plugin.id === pluginId ? { ...plugin, installed: true, enabled: true } : plugin
        ));
    };

    const handleUninstall = (pluginId: string) => {
        setPlugins(prev => prev.map(plugin =>
            plugin.id === pluginId ? { ...plugin, installed: false, enabled: false } : plugin
        ));
    };

    const handleToggle = (pluginId: string) => {
        setPlugins(prev => prev.map(plugin =>
            plugin.id === pluginId ? { ...plugin, enabled: !plugin.enabled } : plugin
        ));
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Productivity': '#3b82f6',
            'Localization': '#10b981',
            'Version Control': '#f59e0b',
            'Themes': '#8b5cf6',
            'Debugging': '#ef4444',
            'Testing': '#06b6d4'
        };
        return colors[category] || '#6b7280';
    };

    return (
        <div className="plugin-manager">
            <div className="plugin-header">
                <h3>
                    <Package className="w-5 h-5" />
                    Extensões
                </h3>

                <div className="plugin-controls">
                    <div className="search-box">
                        <Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar extensões..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-buttons">
                        <button
                            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Todas
                        </button>
                        <button
                            className={`filter-button ${filter === 'installed' ? 'active' : ''}`}
                            onClick={() => setFilter('installed')}
                        >
                            Instaladas
                        </button>
                        <button
                            className={`filter-button ${filter === 'available' ? 'active' : ''}`}
                            onClick={() => setFilter('available')}
                        >
                            Disponíveis
                        </button>
                    </div>
                </div>
            </div>

            <div className="plugin-content">
                <div className="plugins-grid">
                    {filteredPlugins.map((plugin) => (
                        <div key={plugin.id} className="plugin-card">
                            <div className="plugin-header">
                                <div className="plugin-info">
                                    <h4 className="plugin-name">{plugin.name}</h4>
                                    <p className="plugin-description">{plugin.description}</p>
                                    <div className="plugin-meta">
                                        <span className="plugin-author">por {plugin.author}</span>
                                        <span className="plugin-version">v{plugin.version}</span>
                                    </div>
                                </div>

                                <div className="plugin-actions">
                                    {plugin.installed ? (
                                        <>
                                            <button
                                                className={`toggle-button ${plugin.enabled ? 'enabled' : 'disabled'}`}
                                                onClick={() => handleToggle(plugin.id)}
                                            >
                                                {plugin.enabled ? 'Ativo' : 'Inativo'}
                                            </button>
                                            <button
                                                className="uninstall-button"
                                                onClick={() => handleUninstall(plugin.id)}
                                                title="Desinstalar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="install-button"
                                            onClick={() => handleInstall(plugin.id)}
                                        >
                                            <Download className="w-4 h-4" />
                                            Instalar
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="plugin-footer">
                                <div className="plugin-stats">
                                    <div className="stat">
                                        <Star className="w-4 h-4" />
                                        <span>{plugin.rating}</span>
                                    </div>
                                    <div className="stat">
                                        <Download className="w-4 h-4" />
                                        <span>{plugin.downloads.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div
                                    className="plugin-category"
                                    style={{ backgroundColor: getCategoryColor(plugin.category) }}
                                >
                                    {plugin.category}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPlugins.length === 0 && (
                    <div className="no-plugins">
                        <Package className="w-12 h-12" />
                        <h3>Nenhuma extensão encontrada</h3>
                        <p>Tente ajustar sua busca ou filtros</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PluginManager;

