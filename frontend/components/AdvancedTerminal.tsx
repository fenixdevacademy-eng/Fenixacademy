'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Plus, X } from 'lucide-react';

const AdvancedTerminal: React.FC = () => {
    const [terminals, setTerminals] = useState([
        {
            id: '1',
            name: 'Terminal 1',
            cwd: '/workspace',
            output: [
                { type: 'command', content: '$ ls' },
                { type: 'output', content: 'src  public  package.json  README.md' },
                { type: 'command', content: '$ pwd' },
                { type: 'output', content: '/workspace' }
            ],
            isActive: true
        }
    ]);

    const [activeTerminal, setActiveTerminal] = useState('1');
    const [currentInput, setCurrentInput] = useState('');

    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminals]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(currentInput);
        }
    };

    const executeCommand = (command: string) => {
        if (!command.trim()) return;

        const terminal = terminals.find(t => t.id === activeTerminal);
        if (!terminal) return;

        setCurrentInput('');

        const newOutput = [
            ...terminal.output,
            { type: 'command', content: `$ ${command}` },
            { type: 'output', content: simulateCommand(command) }
        ];

        setTerminals(prev => prev.map(t =>
            t.id === activeTerminal
                ? { ...t, output: newOutput }
                : t
        ));
    };

    const simulateCommand = (command: string): string => {
        const cmd = command.toLowerCase().trim();

        if (cmd === 'ls') {
            return 'src  public  package.json  README.md  node_modules';
        } else if (cmd === 'pwd') {
            return '/workspace';
        } else if (cmd === 'help') {
            return 'Comandos disponíveis: ls, pwd, whoami, date, help, clear';
        } else if (cmd === 'clear') {
            setTerminals(prev => prev.map(t =>
                t.id === activeTerminal
                    ? { ...t, output: [] }
                    : t
            ));
            return '';
        } else {
            return `Comando não encontrado: ${command}. Digite 'help' para ver os comandos disponíveis.`;
        }
    };

    const createNewTerminal = () => {
        const newTerminal = {
            id: Date.now().toString(),
            name: `Terminal ${terminals.length + 1}`,
            cwd: '/workspace',
            output: [
                { type: 'output', content: 'Terminal iniciado. Digite "help" para ver os comandos disponíveis.' }
            ],
            isActive: false
        };

        setTerminals(prev => prev.map(t => ({ ...t, isActive: false })));
        setTerminals(prev => [...prev, newTerminal]);
        setActiveTerminal(newTerminal.id);
    };

    const closeTerminal = (terminalId: string) => {
        if (terminals.length <= 1) return;

        const newTerminals = terminals.filter(t => t.id !== terminalId);
        setTerminals(newTerminals);

        if (activeTerminal === terminalId) {
            setActiveTerminal(newTerminals[0].id);
        }
    };

    const switchTerminal = (terminalId: string) => {
        setTerminals(prev => prev.map(t => ({ ...t, isActive: t.id === terminalId })));
        setActiveTerminal(terminalId);
    };

    const currentTerminal = terminals.find(t => t.id === activeTerminal);

    return (
        <div className="advanced-terminal">
            <div className="terminal-header">
                <div className="terminal-tabs">
                    {terminals.map((terminal) => (
                        <div
                            key={terminal.id}
                            className={`terminal-tab ${terminal.isActive ? 'active' : ''}`}
                            onClick={() => switchTerminal(terminal.id)}
                        >
                            <Terminal className="w-4 h-4" />
                            <span>{terminal.name}</span>
                            {terminals.length > 1 && (
                                <button
                                    className="terminal-close"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeTerminal(terminal.id);
                                    }}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="terminal-actions">
                    <button
                        className="terminal-action"
                        onClick={createNewTerminal}
                        title="Novo Terminal"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="terminal-content">
                <div
                    ref={terminalRef}
                    className="terminal-output"
                >
                    {currentTerminal?.output.map((line, index) => (
                        <div
                            key={index}
                            className={`terminal-line ${line.type}`}
                        >
                            {line.content}
                        </div>
                    ))}
                </div>

                <div className="terminal-input">
                    <span className="terminal-prompt">
                        <span className="prompt-user">fenix-user</span>
                        <span className="prompt-separator">@</span>
                        <span className="prompt-host">fenix-ide</span>
                        <span className="prompt-separator">:</span>
                        <span className="prompt-path">{currentTerminal?.cwd}</span>
                        <span className="prompt-symbol">$</span>
                    </span>
                    <input
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="terminal-input-field"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};

export default AdvancedTerminal;