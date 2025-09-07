import React, { useState } from 'react';
import {
    Settings,
    Palette,
    Keyboard,
    Eye,
    Code,
    Zap,
    Monitor,
    Moon,
    Sun,
    Contrast,
    Save,
    RotateCcw
} from 'lucide-react';

interface IDESettingsProps {
    onSettingsChange: (settings: any) => void;
}

interface IDESettings {
    theme: 'dark' | 'light' | 'high-contrast';
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    tabSize: number;
    wordWrap: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
    minimap: boolean;
    lineNumbers: 'on' | 'off' | 'relative';
    autoSave: boolean;
    autoSaveDelay: number;
    showWhitespace: boolean;
    showIndentGuides: boolean;
    bracketPairColorization: boolean;
    smoothScrolling: boolean;
    cursorBlinking: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
    cursorStyle: 'line' | 'block' | 'underline';
    cursorWidth: number;
    multiCursorModifier: 'altKey' | 'ctrlKey' | 'metaKey';
    quickSuggestions: boolean;
    suggestOnTriggerCharacters: boolean;
    acceptSuggestionOnEnter: 'on' | 'off' | 'smart';
    tabCompletion: 'on' | 'off';
    wordBasedSuggestions: boolean;
}

const IDESettings: React.FC<IDESettingsProps> = ({ onSettingsChange }) => {
    const [activeTab, setActiveTab] = useState<'appearance' | 'editor' | 'terminal' | 'git' | 'keyboard'>('appearance');
    const [settings, setSettings] = useState<IDESettings>({
        theme: 'dark',
        fontSize: 14,
        fontFamily: 'JetBrains Mono, Consolas, monospace',
        lineHeight: 1.5,
        tabSize: 4,
        wordWrap: 'on',
        minimap: true,
        lineNumbers: 'on',
        autoSave: true,
        autoSaveDelay: 1000,
        showWhitespace: false,
        showIndentGuides: true,
        bracketPairColorization: true,
        smoothScrolling: true,
        cursorBlinking: 'blink',
        cursorStyle: 'line',
        cursorWidth: 2,
        multiCursorModifier: 'altKey',
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        tabCompletion: 'on',
        wordBasedSuggestions: true
    });

    const [keyboardShortcuts] = useState([
        { command: 'Salvar', shortcut: 'Ctrl+S', description: 'Salvar arquivo atual' },
        { command: 'Executar', shortcut: 'F5', description: 'Executar código' },
        { command: 'Novo Arquivo', shortcut: 'Ctrl+N', description: 'Criar novo arquivo' },
        { command: 'Abrir Arquivo', shortcut: 'Ctrl+O', description: 'Abrir arquivo existente' },
        { command: 'Buscar', shortcut: 'Ctrl+F', description: 'Buscar no arquivo' },
        { command: 'Substituir', shortcut: 'Ctrl+H', description: 'Substituir texto' },
        { command: 'Terminal', shortcut: 'Ctrl+`', description: 'Abrir/fechar terminal' },
        { command: 'Git', shortcut: 'Ctrl+Shift+G', description: 'Abrir painel Git' },
        { command: 'Configurações', shortcut: 'Ctrl+,', description: 'Abrir configurações' },
        { command: 'Zoom In', shortcut: 'Ctrl+=', description: 'Aumentar zoom' },
        { command: 'Zoom Out', shortcut: 'Ctrl+-', description: 'Diminuir zoom' },
        { command: 'Reset Zoom', shortcut: 'Ctrl+0', description: 'Resetar zoom' }
    ]);

    const handleSettingChange = (key: keyof IDESettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        onSettingsChange(newSettings);
    };

    const resetToDefaults = () => {
        const defaultSettings: IDESettings = {
            theme: 'dark',
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Consolas, monospace',
            lineHeight: 1.5,
            tabSize: 4,
            wordWrap: 'on',
            minimap: true,
            lineNumbers: 'on',
            autoSave: true,
            autoSaveDelay: 1000,
            showWhitespace: false,
            showIndentGuides: true,
            bracketPairColorization: true,
            smoothScrolling: true,
            cursorBlinking: 'blink',
            cursorStyle: 'line',
            cursorWidth: 2,
            multiCursorModifier: 'altKey',
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            tabCompletion: 'on',
            wordBasedSuggestions: true
        };
        setSettings(defaultSettings);
        onSettingsChange(defaultSettings);
    };

    const saveSettings = () => {
        localStorage.setItem('fenix-ide-v2-settings', JSON.stringify(settings));
        // Simular feedback de salvamento
        const saveButton = document.querySelector('[data-save-settings]');
        if (saveButton) {
            saveButton.textContent = 'Salvo!';
            setTimeout(() => {
                saveButton.textContent = 'Salvar Configurações';
            }, 2000);
        }
    };

    const themes = [
        { id: 'dark', name: 'Escuro', icon: <Moon className="w-4 h-4" />, description: 'Tema escuro padrão' },
        { id: 'light', name: 'Claro', icon: <Sun className="w-4 h-4" />, description: 'Tema claro para ambientes bem iluminados' },
        { id: 'high-contrast', name: 'Alto Contraste', icon: <Contrast className="w-4 h-4" />, description: 'Tema de alto contraste para acessibilidade' }
    ];

    const fontFamilies = [
        'JetBrains Mono',
        'Consolas',
        'Monaco',
        'Menlo',
        'Ubuntu Mono',
        'Fira Code',
        'Source Code Pro',
        'Cascadia Code'
    ];

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-200 flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Configurações da IDE</span>
                </h2>
                <div className="flex space-x-3">
                    <button
                        onClick={resetToDefaults}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Padrões</span>
                    </button>
                    <button
                        onClick={saveSettings}
                        data-save-settings
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        <span>Salvar Configurações</span>
                    </button>
                </div>
            </div>

            {/* Tabs de Navegação */}
            <div className="flex space-x-1 mb-6 bg-gray-700 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('appearance')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'appearance'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <Palette className="w-4 h-4" />
                    <span>Aparência</span>
                </button>
                <button
                    onClick={() => setActiveTab('editor')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'editor'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <Code className="w-4 h-4" />
                    <span>Editor</span>
                </button>
                <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'terminal'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <Monitor className="w-4 h-4" />
                    <span>Terminal</span>
                </button>
                <button
                    onClick={() => setActiveTab('git')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'git'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <Zap className="w-4 h-4" />
                    <span>Git</span>
                </button>
                <button
                    onClick={() => setActiveTab('keyboard')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'keyboard'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <Keyboard className="w-4 h-4" />
                    <span>Atalhos</span>
                </button>
            </div>

            {/* Conteúdo das Tabs */}
            <div className="space-y-6">
                {/* Tab: Aparência */}
                {activeTab === 'appearance' && (
                    <div className="space-y-6">
                        {/* Tema */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Tema</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {themes.map(theme => (
                                    <div
                                        key={theme.id}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${settings.theme === theme.id
                                            ? 'border-blue-500 bg-blue-600 bg-opacity-20'
                                            : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                                            }`}
                                        onClick={() => handleSettingChange('theme', theme.id)}
                                    >
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="text-blue-400">
                                                {theme.icon}
                                            </div>
                                            <h4 className="font-medium text-gray-200">{theme.name}</h4>
                                        </div>
                                        <p className="text-sm text-gray-400">{theme.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fonte */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tamanho da Fonte
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="range"
                                        min="10"
                                        max="24"
                                        value={settings.fontSize}
                                        onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                    <span className="text-gray-300 w-8 text-center">{settings.fontSize}px</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Família da Fonte
                                </label>
                                <select
                                    value={settings.fontFamily}
                                    onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {fontFamilies.map(font => (
                                        <option key={font} value={font}>{font}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Altura da Linha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Altura da Linha
                            </label>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.1"
                                    value={settings.lineHeight}
                                    onChange={(e) => handleSettingChange('lineHeight', parseFloat(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="text-gray-300 w-12 text-center">{settings.lineHeight}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Editor */}
                {activeTab === 'editor' && (
                    <div className="space-y-6">
                        {/* Configurações Básicas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tamanho da Tabulação
                                </label>
                                <select
                                    value={settings.tabSize}
                                    onChange={(e) => handleSettingChange('tabSize', parseInt(e.target.value))}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={2}>2 espaços</option>
                                    <option value={4}>4 espaços</option>
                                    <option value={8}>8 espaços</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Quebra de Linha
                                </label>
                                <select
                                    value={settings.wordWrap}
                                    onChange={(e) => handleSettingChange('wordWrap', e.target.value)}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="on">Ativado</option>
                                    <option value="off">Desativado</option>
                                    <option value="wordWrapColumn">Coluna específica</option>
                                    <option value="bounded">Limitado</option>
                                </select>
                            </div>
                        </div>

                        {/* Configurações Visuais */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Visual</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.minimap}
                                        onChange={(e) => handleSettingChange('minimap', e.target.checked)}
                                        className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">Mostrar minimap</span>
                                </label>

                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.showWhitespace}
                                        onChange={(e) => handleSettingChange('showWhitespace', e.target.checked)}
                                        className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">Mostrar espaços em branco</span>
                                </label>

                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.showIndentGuides}
                                        onChange={(e) => handleSettingChange('showIndentGuides', e.target.checked)}
                                        className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">Mostrar guias de indentação</span>
                                </label>

                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.bracketPairColorization}
                                        onChange={(e) => handleSettingChange('bracketPairColorization', e.target.checked)}
                                        className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">Colorização de parênteses</span>
                                </label>
                            </div>
                        </div>

                        {/* Cursor */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Cursor</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Estilo do Cursor
                                    </label>
                                    <select
                                        value={settings.cursorStyle}
                                        onChange={(e) => handleSettingChange('cursorStyle', e.target.value)}
                                        className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="line">Linha</option>
                                        <option value="block">Bloco</option>
                                        <option value="underline">Sublinhado</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Piscada do Cursor
                                    </label>
                                    <select
                                        value={settings.cursorBlinking}
                                        onChange={(e) => handleSettingChange('cursorBlinking', e.target.value)}
                                        className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="blink">Piscar</option>
                                        <option value="smooth">Suave</option>
                                        <option value="phase">Fase</option>
                                        <option value="expand">Expandir</option>
                                        <option value="solid">Sólido</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Largura do Cursor
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={settings.cursorWidth}
                                        onChange={(e) => handleSettingChange('cursorWidth', parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Auto-save */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Auto-save</h3>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoSave}
                                        onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                                        className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300">Ativar auto-save</span>
                                </label>

                                {settings.autoSave && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Delay do Auto-save (ms)
                                        </label>
                                        <input
                                            type="number"
                                            min="500"
                                            max="10000"
                                            step="500"
                                            value={settings.autoSaveDelay}
                                            onChange={(e) => handleSettingChange('autoSaveDelay', parseInt(e.target.value))}
                                            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Terminal */}
                {activeTab === 'terminal' && (
                    <div className="space-y-6">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Configurações do Terminal</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Shell Padrão
                                        </label>
                                        <select className="w-full bg-gray-600 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500">
                                            <option>PowerShell</option>
                                            <option>Command Prompt</option>
                                            <option>Git Bash</option>
                                            <option>WSL</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tamanho da Fonte
                                        </label>
                                        <select className="w-full bg-gray-600 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500">
                                            <option>12px</option>
                                            <option>14px</option>
                                            <option>16px</option>
                                            <option>18px</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="rounded border-gray-600 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-gray-300">Cursor piscante</span>
                                    </label>

                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="rounded border-gray-600 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-gray-300">Scroll infinito</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Git */}
                {activeTab === 'git' && (
                    <div className="space-y-6">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Configurações do Git</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Nome do Usuário
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Seu nome"
                                            className="w-full bg-gray-600 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="seu@email.com"
                                            className="w-full bg-gray-600 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="rounded border-gray-600 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-gray-300">Auto-fetch</span>
                                    </label>

                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="rounded border-gray-600 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-gray-300">Mostrar mudanças inline</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Atalhos de Teclado */}
                {activeTab === 'keyboard' && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Atalhos de Teclado</h3>
                            <div className="bg-gray-700 rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Comando
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Atalho
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Descrição
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-600">
                                        {keyboardShortcuts.map((shortcut, index) => (
                                            <tr key={index} className="hover:bg-gray-600">
                                                <td className="px-4 py-3 text-sm text-gray-200">
                                                    {shortcut.command}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-blue-400 font-mono">
                                                    {shortcut.shortcut}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-300">
                                                    {shortcut.description}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-blue-600 bg-opacity-20 border border-blue-500 rounded-lg p-4">
                            <h4 className="text-blue-400 font-medium mb-2">💡 Dica</h4>
                            <p className="text-blue-300 text-sm">
                                Você pode personalizar estes atalhos clicando em qualquer atalho na tabela acima.
                                Os atalhos são salvos automaticamente e funcionam em toda a IDE.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IDESettings;
