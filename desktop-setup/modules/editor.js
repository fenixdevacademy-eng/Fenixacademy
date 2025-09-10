/**
 * 📝 Editor Avançado - Fenix IDE 2.0
 * Editor de código com IA integrada, suporte a múltiplas linguagens
 * e funcionalidades avançadas de desenvolvimento
 */

const EventEmitter = require('events');
const path = require('path');
const fs = require('fs').promises;

class AdvancedEditor extends EventEmitter {
    constructor(ide) {
        super();
        this.ide = ide;
        this.name = 'AdvancedEditor';

        // Estado do editor
        this.isActive = false;
        this.currentFile = null;
        this.openTabs = new Map();
        this.activeTab = null;

        // Configurações do editor
        this.config = {
            theme: 'dark',
            fontSize: 14,
            fontFamily: 'Fira Code, Consolas, monospace',
            lineNumbers: true,
            wordWrap: true,
            minimap: true,
            autoSave: true,
            autoSaveInterval: 5000,
            tabSize: 2,
            insertSpaces: true,
            trimTrailingWhitespace: true,
            insertFinalNewline: true
        };

        // Funcionalidades de IA
        this.aiFeatures = {
            codeCompletion: true,
            errorDetection: true,
            refactoring: true,
            documentation: true,
            codeReview: true
        };

        // Suporte a linguagens
        this.supportedLanguages = new Set([
            'javascript', 'typescript', 'python', 'java', 'csharp', 'php',
            'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala', 'html',
            'css', 'scss', 'json', 'xml', 'yaml', 'markdown', 'sql'
        ]);

        // Extensões de arquivo por linguagem
        this.languageExtensions = {
            'javascript': ['.js', '.jsx', '.mjs'],
            'typescript': ['.ts', '.tsx'],
            'python': ['.py', '.pyw', '.pyx'],
            'java': ['.java'],
            'csharp': ['.cs'],
            'php': ['.php'],
            'html': ['.html', '.htm'],
            'css': ['.css', '.scss', '.sass', '.less'],
            'json': ['.json'],
            'markdown': ['.md', '.markdown']
        };

        // Sistema de snippets
        this.snippets = new Map();
        this.customSnippets = new Map();

        // Histórico de comandos
        this.commandHistory = [];
        this.undoStack = new Map();
        this.redoStack = new Map();

        // Sistema de linting
        this.linters = new Map();
        this.lintResults = new Map();

        // Sistema de formatação
        this.formatters = new Map();
        this.formatOnSave = true;

        // Inicialização
        this.init();
    }

    /**
     * 🚀 Inicialização do Editor
     */
    async init() {
        try {
            console.log('📝 Inicializando Editor Avançado...');

            // Carregar configurações
            await this.loadEditorConfiguration();

            // Configurar snippets padrão
            await this.setupDefaultSnippets();

            // Configurar linters
            await this.setupLinters();

            // Configurar formatters
            await this.setupFormatters();

            // Configurar eventos
            this.setupEditorEvents();

            // Configurar auto-save
            if (this.config.autoSave) {
                this.setupAutoSave();
            }

            console.log('✅ Editor Avançado inicializado');

        } catch (error) {
            console.error('❌ Erro na inicialização do Editor:', error);
            throw error;
        }
    }

    /**
     * ⚙️ Carregamento de Configuração
     */
    async loadEditorConfiguration() {
        try {
            // Carregar configuração específica do editor
            const editorConfigPath = path.join(process.env.HOME || process.env.USERPROFILE, '.fenix-ide', 'editor-config.json');

            try {
                const editorConfig = await fs.readFile(editorConfigPath, 'utf8');
                const parsedConfig = JSON.parse(editorConfig);
                this.config = { ...this.config, ...parsedConfig };
            } catch (error) {
                // Criar configuração padrão se não existir
                await this.createDefaultEditorConfiguration(editorConfigPath);
            }

        } catch (error) {
            console.error('❌ Erro no carregamento da configuração do editor:', error);
        }
    }

    /**
     * 🎨 Configuração de Snippets Padrão
     */
    async setupDefaultSnippets() {
        try {
            // Snippets para JavaScript/TypeScript
            this.snippets.set('javascript', {
                'function': {
                    prefix: 'func',
                    body: [
                        'function ${1:functionName}(${2:params}) {',
                        '\t${3:// function body}',
                        '}'
                    ],
                    description: 'Função JavaScript'
                },
                'arrow-function': {
                    prefix: 'arrow',
                    body: [
                        'const ${1:functionName} = (${2:params}) => {',
                        '\t${3:// function body}',
                        '}'
                    ],
                    description: 'Arrow Function'
                },
                'class': {
                    prefix: 'class',
                    body: [
                        'class ${1:ClassName} {',
                        '\tconstructor(${2:params}) {',
                        '\t\t${3:// constructor body}',
                        '\t}',
                        '',
                        '\t${4:methodName}() {',
                        '\t\t${5:// method body}',
                        '\t}',
                        '}'
                    ],
                    description: 'Classe JavaScript'
                }
            });

            // Snippets para Python
            this.snippets.set('python', {
                'function': {
                    prefix: 'def',
                    body: [
                        'def ${1:function_name}(${2:params}):',
                        '\t${3:"""Docstring"""}',
                        '\t${4:pass}'
                    ],
                    description: 'Função Python'
                },
                'class': {
                    prefix: 'class',
                    body: [
                        'class ${1:ClassName}:',
                        '\tdef __init__(self, ${2:params}):',
                        '\t\t${3:self.params = params}',
                        '',
                        '\tdef ${4:method_name}(self):',
                        '\t\t${5:pass}'
                    ],
                    description: 'Classe Python'
                }
            });

            // Snippets para HTML
            this.snippets.set('html', {
                'html5': {
                    prefix: 'html5',
                    body: [
                        '<!DOCTYPE html>',
                        '<html lang="pt-BR">',
                        '<head>',
                        '\t<meta charset="UTF-8">',
                        '\t<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                        '\t<title>${1:Document Title}</title>',
                        '</head>',
                        '<body>',
                        '\t${2:<!-- content -->}',
                        '</body>',
                        '</html>'
                    ],
                    description: 'Estrutura HTML5'
                }
            });

            console.log('✅ Snippets padrão configurados');

        } catch (error) {
            console.error('❌ Erro na configuração de snippets:', error);
        }
    }

    /**
     * 🔍 Configuração de Linters
     */
    async setupLinters() {
        try {
            // Linter para JavaScript/TypeScript
            this.linters.set('javascript', {
                name: 'ESLint',
                enabled: true,
                config: {
                    rules: {
                        'no-unused-vars': 'warn',
                        'no-console': 'warn',
                        'semi': ['error', 'always']
                    }
                }
            });

            // Linter para Python
            this.linters.set('python', {
                name: 'Pylint',
                enabled: true,
                config: {
                    rules: {
                        'unused-import': 'warn',
                        'missing-docstring': 'warn'
                    }
                }
            });

            console.log('✅ Linters configurados');

        } catch (error) {
            console.error('❌ Erro na configuração de linters:', error);
        }
    }

    /**
     * ✨ Configuração de Formatters
     */
    async setupFormatters() {
        try {
            // Formatter para JavaScript/TypeScript
            this.formatters.set('javascript', {
                name: 'Prettier',
                enabled: true,
                config: {
                    semi: true,
                    singleQuote: true,
                    tabWidth: 2
                }
            });

            // Formatter para Python
            this.formatters.set('python', {
                name: 'Black',
                enabled: true,
                config: {
                    lineLength: 88,
                    stringNormalization: true
                }
            });

            console.log('✅ Formatters configurados');

        } catch (error) {
            console.error('❌ Erro na configuração de formatters:', error);
        }
    }

    /**
     * 🎯 Configuração de Eventos do Editor
     */
    setupEditorEvents() {
        // Eventos de arquivo
        this.on('file:opened', this.handleFileOpened.bind(this));
        this.on('file:saved', this.handleFileSaved.bind(this));
        this.on('file:closed', this.handleFileClosed.bind(this));

        // Eventos de conteúdo
        this.on('content:changed', this.handleContentChanged.bind(this));
        this.on('content:saved', this.handleContentSaved.bind(this));

        // Eventos de IA
        this.on('ai:completion', this.handleAICompletion.bind(this));
        this.on('ai:error-detection', this.handleAIErrorDetection.bind(this));
    }

    /**
     * 💾 Configuração de Auto-Save
     */
    setupAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }

        this.autoSaveInterval = setInterval(() => {
            this.autoSaveOpenFiles();
        }, this.config.autoSaveInterval);
    }

    /**
     * 📁 Funcionalidades de Arquivo
     */
    async openFile(filePath) {
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            const fileInfo = {
                path: filePath,
                name: path.basename(filePath),
                extension: path.extname(filePath),
                language: this.detectLanguage(filePath),
                content: fileContent,
                originalContent: fileContent,
                isModified: false,
                lastSaved: new Date(),
                openTime: new Date()
            };

            // Adicionar à lista de abas
            this.openTabs.set(filePath, fileInfo);
            this.activeTab = filePath;

            // Emitir evento
            this.emit('file:opened', fileInfo);
            this.ide.emit('file:opened', fileInfo);

            console.log(`📁 Arquivo ${fileInfo.name} aberto`);

            return fileInfo;

        } catch (error) {
            console.error(`❌ Erro ao abrir arquivo ${filePath}:`, error);
            throw error;
        }
    }

    async saveFile(filePath, content = null) {
        try {
            const fileInfo = this.openTabs.get(filePath);
            if (!fileInfo) {
                throw new Error(`Arquivo ${filePath} não está aberto`);
            }

            const contentToSave = content || fileInfo.content;

            // Salvar arquivo
            await fs.writeFile(filePath, contentToSave, 'utf8');

            // Atualizar informações do arquivo
            fileInfo.content = contentToSave;
            fileInfo.originalContent = contentToSave;
            fileInfo.isModified = false;
            fileInfo.lastSaved = new Date();

            // Emitir evento
            this.emit('file:saved', fileInfo);
            this.ide.emit('file:saved', fileInfo);

            console.log(`💾 Arquivo ${fileInfo.name} salvo`);

            return fileInfo;

        } catch (error) {
            console.error(`❌ Erro ao salvar arquivo ${filePath}:`, error);
            throw error;
        }
    }

    async closeFile(filePath) {
        try {
            const fileInfo = this.openTabs.get(filePath);
            if (!fileInfo) {
                return;
            }

            // Verificar se há mudanças não salvas
            if (fileInfo.isModified) {
                // Emitir evento para confirmar fechamento
                this.emit('file:close:confirm', fileInfo);
                return;
            }

            // Remover da lista de abas
            this.openTabs.delete(filePath);

            // Se era a aba ativa, definir nova aba ativa
            if (this.activeTab === filePath) {
                this.activeTab = Array.from(this.openTabs.keys())[0] || null;
            }

            // Emitir evento
            this.emit('file:closed', fileInfo);
            this.ide.emit('file:closed', fileInfo);

            console.log(`📁 Arquivo ${fileInfo.name} fechado`);

        } catch (error) {
            console.error(`❌ Erro ao fechar arquivo ${filePath}:`, error);
        }
    }

    /**
     * 🔍 Detecção de Linguagem
     */
    detectLanguage(filePath) {
        const extension = path.extname(filePath).toLowerCase();

        for (const [language, extensions] of Object.entries(this.languageExtensions)) {
            if (extensions.includes(extension)) {
                return language;
            }
        }

        return 'text';
    }

    /**
     * 🧠 Funcionalidades de IA
     */
    async getCodeCompletion(filePath, position, context) {
        try {
            const fileInfo = this.openTabs.get(filePath);
            if (!fileInfo) {
                throw new Error('Arquivo não está aberto');
            }

            // Obter contexto do código
            const codeContext = this.analyzeCodeContext(fileInfo.content, position);

            // Usar o sistema de auto-complete inteligente
            const autoComplete = this.ide.modules.get('auto-complete')?.instance;
            if (autoComplete) {
                const suggestions = await autoComplete.getIntelligentSuggestions({
                    language: fileInfo.language,
                    content: fileInfo.content,
                    position: position,
                    filePath: filePath,
                    context: codeContext
                });

                // Emitir evento
                this.emit('ai:completion', {
                    filePath,
                    position,
                    suggestions,
                    context: codeContext
                });

                return suggestions;
            }

            // Fallback para o sistema antigo
            const aiSuggestions = await this.ide.modules.get('ai-assistant')?.instance?.getCodeSuggestions({
                language: fileInfo.language,
                context: codeContext,
                position: position,
                fileContent: fileInfo.content
            });

            // Combinar com snippets locais
            const localSuggestions = this.getLocalSuggestions(fileInfo.language, codeContext);

            const suggestions = [
                ...(aiSuggestions || []),
                ...localSuggestions
            ];

            // Emitir evento
            this.emit('ai:completion', {
                filePath,
                position,
                suggestions,
                context: codeContext
            });

            return suggestions;

        } catch (error) {
            console.error('❌ Erro na obtenção de sugestões de código:', error);
            return [];
        }
    }

    async detectErrors(filePath) {
        try {
            const fileInfo = this.openTabs.get(filePath);
            if (!fileInfo) {
                throw new Error('Arquivo não está aberto');
            }

            const errors = [];

            // Detecção básica de erros
            const basicErrors = this.detectBasicErrors(fileInfo.content, fileInfo.language);
            errors.push(...basicErrors);

            // Detecção de erros com IA
            if (this.aiFeatures.errorDetection) {
                const aiErrors = await this.ide.modules.get('ai-assistant')?.instance?.detectCodeErrors({
                    language: fileInfo.language,
                    content: fileInfo.content
                });

                if (aiErrors) {
                    errors.push(...aiErrors);
                }
            }

            // Aplicar linter se disponível
            const linter = this.linters.get(fileInfo.language);
            if (linter && linter.enabled) {
                const lintErrors = await this.runLinter(fileInfo.content, fileInfo.language);
                errors.push(...lintErrors);
            }

            // Armazenar resultados
            this.lintResults.set(filePath, {
                errors,
                timestamp: Date.now(),
                fileInfo: {
                    language: fileInfo.language,
                    contentLength: fileInfo.content.length
                }
            });

            // Emitir evento
            this.emit('ai:error-detection', {
                filePath,
                errors,
                count: errors.length
            });

            return errors;

        } catch (error) {
            console.error('❌ Erro na detecção de erros:', error);
            return [];
        }
    }

    /**
     * 🔧 Funcionalidades de Formatação
     */
    async formatCode(filePath) {
        try {
            const fileInfo = this.openTabs.get(filePath);
            if (!fileInfo) {
                throw new Error('Arquivo não está aberto');
            }

            const formatter = this.formatters.get(fileInfo.language);
            if (!formatter || !formatter.enabled) {
                throw new Error(`Formatter não disponível para ${fileInfo.language}`);
            }

            // Formatar código
            const formattedContent = await this.runFormatter(
                fileInfo.content,
                fileInfo.language,
                formatter
            );

            // Atualizar conteúdo
            fileInfo.content = formattedContent;
            fileInfo.isModified = true;

            // Emitir evento
            this.emit('content:formatted', {
                filePath,
                originalLength: fileInfo.originalContent.length,
                formattedLength: formattedContent.length
            });

            return formattedContent;

        } catch (error) {
            console.error('❌ Erro na formatação de código:', error);
            throw error;
        }
    }

    /**
     * 📊 Análise de Código
     */
    analyzeCodeContext(content, position) {
        // Implementar análise de contexto do código
        const lines = content.split('\n');
        const currentLine = lines[position.line] || '';

        return {
            currentLine,
            previousLines: lines.slice(Math.max(0, position.line - 2), position.line),
            nextLines: lines.slice(position.line + 1, position.line + 3),
            lineNumber: position.line,
            column: position.character,
            totalLines: lines.length
        };
    }

    detectBasicErrors(content, language) {
        const errors = [];
        const lines = content.split('\n');

        // Detecção básica de erros por linguagem
        switch (language) {
            case 'javascript':
            case 'typescript':
                // Verificar parênteses não fechados
                const openParens = (content.match(/\(/g) || []).length;
                const closeParens = (content.match(/\)/g) || []).length;
                if (openParens !== closeParens) {
                    errors.push({
                        type: 'syntax',
                        message: 'Parênteses não balanceados',
                        severity: 'error',
                        line: lines.length
                    });
                }
                break;

            case 'python':
                // Verificar indentação
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.trim() && !line.startsWith(' ') && !line.startsWith('\t')) {
                        // Linha não indentada
                        if (i > 0 && lines[i - 1].trim().endsWith(':')) {
                            errors.push({
                                type: 'indentation',
                                message: 'Indentação esperada após dois pontos',
                                severity: 'error',
                                line: i + 1
                            });
                        }
                    }
                }
                break;
        }

        return errors;
    }

    /**
     * 🎯 Handlers de Eventos
     */
    handleFileOpened(fileInfo) {
        console.log(`📁 Editor: Arquivo ${fileInfo.name} aberto`);
    }

    handleFileSaved(fileInfo) {
        console.log(`💾 Editor: Arquivo ${fileInfo.name} salvo`);
    }

    handleFileClosed(fileInfo) {
        console.log(`📁 Editor: Arquivo ${fileInfo.name} fechado`);
    }

    handleContentChanged(data) {
        // Marcar arquivo como modificado
        const fileInfo = this.openTabs.get(data.filePath);
        if (fileInfo) {
            fileInfo.isModified = true;
        }
    }

    handleContentSaved(data) {
        console.log(`💾 Editor: Conteúdo salvo para ${data.filePath}`);
    }

    handleAICompletion(data) {
        console.log(`🧠 Editor: ${data.suggestions.length} sugestões de IA obtidas`);
    }

    handleAIErrorDetection(data) {
        console.log(`🔍 Editor: ${data.errors.length} erros detectados`);
    }

    /**
     * 🔧 Métodos Auxiliares
     */
    getLocalSuggestions(language, context) {
        const languageSnippets = this.snippets.get(language) || {};
        const suggestions = [];

        for (const [name, snippet] of Object.entries(languageSnippets)) {
            suggestions.push({
                label: snippet.prefix,
                kind: 'snippet',
                detail: snippet.description,
                insertText: snippet.body.join('\n'),
                language: language
            });
        }

        return suggestions;
    }

    async runLinter(content, language) {
        // Implementar execução de linter
        return [];
    }

    async runFormatter(content, language, formatter) {
        // Implementar formatação de código
        return content;
    }

    async autoSaveOpenFiles() {
        for (const [filePath, fileInfo] of this.openTabs) {
            if (fileInfo.isModified) {
                try {
                    await this.saveFile(filePath);
                } catch (error) {
                    console.error(`❌ Erro no auto-save de ${filePath}:`, error);
                }
            }
        }
    }

    async createDefaultEditorConfiguration(configPath) {
        const defaultConfig = {
            theme: 'dark',
            fontSize: 14,
            fontFamily: 'Fira Code, Consolas, monospace',
            lineNumbers: true,
            wordWrap: true,
            minimap: true,
            autoSave: true,
            autoSaveInterval: 5000,
            tabSize: 2,
            insertSpaces: true,
            trimTrailingWhitespace: true,
            insertFinalNewline: true
        };

        const configDir = path.dirname(configPath);
        await fs.mkdir(configDir, { recursive: true });
        await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
    }

    /**
     * 🚀 Iniciar Editor
     */
    async start() {
        try {
            this.isActive = true;
            console.log('📝 Editor Avançado iniciado');
        } catch (error) {
            console.error('❌ Erro ao iniciar editor:', error);
        }
    }

    /**
     * 🛑 Parar Editor
     */
    async stop() {
        try {
            this.isActive = false;

            if (this.autoSaveInterval) {
                clearInterval(this.autoSaveInterval);
            }

            console.log('📝 Editor Avançado parado');
        } catch (error) {
            console.error('❌ Erro ao parar editor:', error);
        }
    }

    /**
     * 📊 Status do Editor
     */
    getStatus() {
        return {
            name: this.name,
            isActive: this.isActive,
            openFiles: this.openTabs.size,
            activeTab: this.activeTab,
            supportedLanguages: Array.from(this.supportedLanguages),
            aiFeatures: this.aiFeatures,
            config: this.config
        };
    }
}

module.exports = AdvancedEditor;
