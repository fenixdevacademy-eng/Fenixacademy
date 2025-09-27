'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, Square, Trash2, Download, Upload } from 'lucide-react';

interface TerminalProps {
    onExecute: (command: string) => Promise<string>;
    isVisible: boolean;
    onToggle: () => void;
}

interface TerminalLine {
    id: string;
    type: 'input' | 'output' | 'error';
    content: string;
    timestamp: Date;
}

const Terminal: React.FC<TerminalProps> = ({ onExecute, isVisible, onToggle }) => {
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Adicionar linha de boas-vindas
        if (lines.length === 0) {
            addLine('output', 'Bem-vindo ao Terminal do Fenix IDE!');
            addLine('output', 'Digite "help" para ver os comandos disponíveis.');
            addLine('output', '');
        }
    }, []);

    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isVisible]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    const addLine = (type: 'input' | 'output' | 'error', content: string) => {
        const newLine: TerminalLine = {
            id: Date.now().toString(),
            type,
            content,
            timestamp: new Date()
        }
        setLines(prev => [...prev, newLine]);
    }

    const executeCommand = async (command: string) => {
        if (!command.trim()) return;

        // Adicionar comando ao histórico
        setHistory(prev => [...prev, command]);
        setHistoryIndex(history.length);

        // Adicionar linha de input
        addLine('input', `$ ${command}`);

        // Executar comando
        setIsExecuting(true);
        try {
            const result = await onExecute(command);
            addLine('output', result);
        } catch (error) {
            addLine('error', `Erro: ${error instanceof Error ? error.message : 'Comando falhou'}`);
        } finally {
            setIsExecuting(false);
        }

        setCurrentInput('');
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(currentInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentInput(history[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCurrentInput(history[newIndex]);
            } else {
                setHistoryIndex(history.length);
                setCurrentInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Auto-complete básico
            const commands = ['help', 'clear', 'ls', 'cat', 'echo', 'node', 'python', 'npm', 'git'];
            const matches = commands.filter(cmd => cmd.startsWith(currentInput));
            if (matches.length === 1) {
                setCurrentInput(matches[0]);
            }
        }
    }

    const clearTerminal = () => {
        setLines([]);
        addLine('output', 'Terminal limpo.');
        addLine('output', '');
    }

    const getLineColor = (type: 'input' | 'output' | 'error') => {
        switch (type) {
            case 'input':
                return 'text-green-400';
            case 'output':
                return 'text-white';
            case 'error':
                return 'text-red-400';
            default:
                return 'text-white';
        }
    }

    const getPrompt = () => {
        return isExecuting ? '⏳' : '>';
    }

    if (!isVisible) {
        return (
            <button
                onClick={onToggle}
                className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg shadow-lg transition-colors z-50"
                title="Abrir Terminal"
            >
                <TerminalIcon className="w-5 h-5" />
            </button>
        );
    }

    return (
        <div className="bg-gray-900 border-t border-gray-700 h-64 flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center space-x-2">
                    <TerminalIcon className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">Terminal</span>
                    {isExecuting && (
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-yellow-400">Executando...</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={clearTerminal}
                        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title="Limpar Terminal"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onToggle}
                        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title="Fechar Terminal"
                    >
                        <Square className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-3 font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
            >
                {lines.map((line) => (
                    <div key={line.id} className="mb-1">
                        <span className={`${getLineColor(line.type)}`}>
                            {line.type === 'input' ? line.content : line.content}
                        </span>
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center">
                    <span className="text-green-400 mr-2">{getPrompt()}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white outline-none"
                        placeholder="Digite um comando..."
                        disabled={isExecuting}
                    />
                </div>
            </div>
        </div>
    );
}

export default Terminal;