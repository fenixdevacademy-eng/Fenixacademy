'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, Maximize2, Play, Square } from 'lucide-react';

interface TerminalCommand {
    command: string;
    output: string;
    timestamp: Date;
    status: 'success' | 'error' | 'running';
}

interface FunctionalTerminalProps {
    isVisible: boolean;
    onToggle: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onClose: () => void;
    isMinimized: boolean;
    isMaximized: boolean;
}

const FunctionalTerminal: React.FC<FunctionalTerminalProps> = ({
    isVisible,
    onToggle,
    onMinimize,
    onMaximize,
    onClose,
    isMinimized,
    isMaximized
}) => {
    const [currentCommand, setCurrentCommand] = useState('');
    const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentPath, setCurrentPath] = useState('/workspace');
    const [isRunning, setIsRunning] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Comandos suportados
    const supportedCommands = {
        'ls': () => {
            return [
                '📁 src/',
                '📁 public/',
                '📁 node_modules/',
                '📄 package.json',
                '📄 README.md',
                '📄 index.html',
                '📄 style.css',
                '📄 script.js'
            ].join('\n');
        },
        'pwd': () => currentPath,
        'cd': (args: string[]) => {
            if (args.length === 0) {
                setCurrentPath('/workspace');
                return 'Diretório alterado para /workspace';
            }
            const newPath = args[0];
            if (newPath === '..') {
                const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
                setCurrentPath(parentPath);
                return `Diretório alterado para ${parentPath}`;
            } else if (newPath.startsWith('/')) {
                setCurrentPath(newPath);
                return `Diretório alterado para ${newPath}`;
            } else {
                const newFullPath = currentPath === '/' ? `/${newPath}` : `${currentPath}/${newPath}`;
                setCurrentPath(newFullPath);
                return `Diretório alterado para ${newFullPath}`;
            }
        },
        'mkdir': (args: string[]) => {
            if (args.length === 0) return 'Uso: mkdir <nome_diretorio>';
            return `Diretório '${args[0]}' criado com sucesso`;
        },
        'touch': (args: string[]) => {
            if (args.length === 0) return 'Uso: touch <nome_arquivo>';
            return `Arquivo '${args[0]}' criado com sucesso`;
        },
        'cat': (args: string[]) => {
            if (args.length === 0) return 'Uso: cat <nome_arquivo>';
            const filename = args[0];
            if (filename === 'package.json') {
                return JSON.stringify({
                    name: "fenix-ide-project",
                    version: "1.0.0",
                    description: "Projeto da Fenix IDE",
                    main: "index.js",
                    scripts: {
                        start: "node index.js",
                        dev: "nodemon index.js",
                        build: "webpack --mode production"
                    },
                    dependencies: {
                        "express": "^4.18.0",
                        "react": "^18.0.0",
                        "typescript": "^4.9.0"
                    }
                }, null, 2);
            }
            return `Conteúdo do arquivo '${filename}':\n[Conteúdo do arquivo seria exibido aqui]`;
        },
        'python': (args: string[]) => {
            if (args.length === 0) {
                return 'Python 3.9.0 (Fenix IDE)\nDigite "help()" para mais informações.';
            }
            const script = args[0];
            if (script === '--version') {
                return 'Python 3.9.0 (Fenix IDE)';
            }
            return `Executando script Python: ${script}\n[Saída do script seria exibida aqui]`;
        },
        'node': (args: string[]) => {
            if (args.length === 0) {
                return 'Node.js v18.0.0 (Fenix IDE)\nDigite "help()" para mais informações.';
            }
            const script = args[0];
            if (script === '--version') {
                return 'Node.js v18.0.0 (Fenix IDE)';
            }
            return `Executando script Node.js: ${script}\n[Saída do script seria exibida aqui]`;
        },
        'npm': (args: string[]) => {
            if (args.length === 0) return 'Uso: npm <comando>';
            const command = args[0];
            if (command === 'install') {
                return 'Instalando dependências...\n✅ Dependências instaladas com sucesso!';
            } else if (command === 'start') {
                return 'Iniciando servidor de desenvolvimento...\n🚀 Servidor rodando em http://localhost:3000';
            } else if (command === 'build') {
                return 'Construindo projeto...\n✅ Build concluído com sucesso!';
            }
            return `Executando: npm ${args.join(' ')}`;
        },
        'git': (args: string[]) => {
            if (args.length === 0) return 'Uso: git <comando>';
            const command = args[0];
            if (command === 'status') {
                return 'On branch main\nYour branch is up to date with origin/main.\n\nnothing to commit, working tree clean';
            } else if (command === 'log') {
                return 'commit abc123def456 (HEAD -> main)\nAuthor: Fenix Academy <dev@fenix.academy>\nDate: Mon Jan 19 2025\n\n    Initial commit';
            }
            return `Executando: git ${args.join(' ')}`;
        },
        'clear': () => {
            setCommandHistory([]);
            return '';
        },
        'help': () => {
            return `Comandos disponíveis:
ls          - Lista arquivos e diretórios
pwd         - Mostra diretório atual
cd <dir>    - Muda diretório
mkdir <dir> - Cria diretório
touch <file>- Cria arquivo
cat <file>  - Mostra conteúdo do arquivo
python <script> - Executa script Python
node <script>   - Executa script Node.js
npm <cmd>   - Executa comando NPM
git <cmd>   - Executa comando Git
clear       - Limpa terminal
help        - Mostra esta ajuda`;
        }
    };

    const executeCommand = async (command: string) => {
        if (!command.trim()) return;

        const [cmd, ...args] = command.trim().split(' ');
        const commandHandler = supportedCommands[cmd as keyof typeof supportedCommands];

        setIsRunning(true);

        // Adiciona comando ao histórico
        const newCommand: TerminalCommand = {
            command,
            output: '',
            timestamp: new Date(),
            status: 'running'
        };

        setCommandHistory(prev => [...prev, newCommand]);

        // Simula delay de execução
        await new Promise(resolve => setTimeout(resolve, 500));

        let output = '';
        let status: 'success' | 'error' = 'success';

        if (commandHandler) {
            try {
                output = commandHandler(args);
            } catch (error) {
                output = `Erro: ${error}`;
                status = 'error';
            }
        } else {
            output = `Comando não encontrado: ${cmd}. Digite 'help' para ver comandos disponíveis.`;
            status = 'error';
        }

        // Atualiza o comando no histórico
        setCommandHistory(prev =>
            prev.map((cmd, index) =>
                index === prev.length - 1
                    ? { ...cmd, output, status }
                    : cmd
            )
        );

        setIsRunning(false);
        setCurrentCommand('');
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            executeCommand(currentCommand);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCurrentCommand('');
            }
        }
    };

    const handleRunCode = () => {
        if (currentCommand.trim()) {
            executeCommand(currentCommand);
        }
    };

    const handleStopExecution = () => {
        setIsRunning(false);
        setCommandHistory(prev =>
            prev.map((cmd, index) =>
                index === prev.length - 1 && cmd.status === 'running'
                    ? { ...cmd, status: 'error', output: 'Execução interrompida pelo usuário' }
                    : cmd
            )
        );
    };

    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isVisible]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [commandHistory]);

    if (!isVisible) return null;

    return (
        <div className={`bg-gray-900 text-green-400 font-mono text-sm border-t border-gray-700 ${isMinimized ? 'h-8' : isMaximized ? 'h-96' : 'h-64'
            } transition-all duration-300`}>
            {/* Header do Terminal */}
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span className="text-sm font-medium">Terminal</span>
                    <span className="text-xs text-gray-400">({currentPath})</span>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
                        title="Executar comando"
                    >
                        <Play className="w-3 h-3" />
                    </button>
                    {isRunning && (
                        <button
                            onClick={handleStopExecution}
                            className="p-1 hover:bg-gray-700 rounded"
                            title="Parar execução"
                        >
                            <Square className="w-3 h-3" />
                        </button>
                    )}
                    <button
                        onClick={onMinimize}
                        className="p-1 hover:bg-gray-700 rounded"
                        title="Minimizar"
                    >
                        <Minimize2 className="w-3 h-3" />
                    </button>
                    <button
                        onClick={onMaximize}
                        className="p-1 hover:bg-gray-700 rounded"
                        title={isMaximized ? "Restaurar" : "Maximizar"}
                    >
                        <Maximize2 className="w-3 h-3" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-700 rounded"
                        title="Fechar"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Conteúdo do Terminal */}
            <div
                ref={terminalRef}
                className="h-full overflow-y-auto p-4 space-y-1"
            >
                {/* Histórico de comandos */}
                {commandHistory.map((cmd, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-400">user@fenix-ide</span>
                            <span className="text-yellow-400">:</span>
                            <span className="text-cyan-400">{currentPath}</span>
                            <span className="text-yellow-400">$</span>
                            <span className="text-white">{cmd.command}</span>
                        </div>
                        {cmd.output && (
                            <div className={`ml-4 whitespace-pre-wrap ${cmd.status === 'error' ? 'text-red-400' : 'text-green-400'
                                }`}>
                                {cmd.output}
                            </div>
                        )}
                        {cmd.status === 'running' && (
                            <div className="ml-4 text-yellow-400">
                                <span className="animate-pulse">Executando...</span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Linha de comando atual */}
                <div className="flex items-center space-x-2">
                    <span className="text-blue-400">user@fenix-ide</span>
                    <span className="text-yellow-400">:</span>
                    <span className="text-cyan-400">{currentPath}</span>
                    <span className="text-yellow-400">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white outline-none"
                        placeholder="Digite um comando..."
                        disabled={isRunning}
                    />
                    {isRunning && (
                        <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FunctionalTerminal;
