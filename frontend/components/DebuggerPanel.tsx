'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Bug,
    Play,
    Pause,
    Square,
    RefreshCw,
    Settings,
    Eye,
    EyeOff,
    Trash2,
    Download,
    Upload,
    Code,
    AlertTriangle,
    CheckCircle,
    Clock
} from 'lucide-react';

interface Breakpoint {
    id: string;
    line: number;
    column: number;
    enabled: boolean;
    condition?: string;
    hitCount: number;
    file: string;
}

interface Variable {
    name: string;
    value: any;
    type: string;
    scope: string;
    isExpanded: boolean;
    children?: Variable[];
}

interface CallStack {
    functionName: string;
    file: string;
    line: number;
    column: number;
    isActive: boolean;
}

interface DebuggerState {
    isRunning: boolean;
    isPaused: boolean;
    currentLine: number;
    currentFile: string;
    variables: Variable[];
    callStack: CallStack[];
    breakpoints: Breakpoint[];
    console: string[];
    isConnected: boolean;
}

interface DebuggerPanelProps {
    className?: string;
    onBreakpointToggle?: (breakpoint: Breakpoint) => void;
    onStep?: (type: 'over' | 'into' | 'out') => void;
    onContinue?: () => void;
    onStop?: () => void;
    onRestart?: () => void;
}

export function DebuggerPanel({
    className = '',
    onBreakpointToggle,
    onStep,
    onContinue,
    onStop,
    onRestart
}: DebuggerPanelProps) {
    const [state, setState] = useState<DebuggerState>({
        isRunning: false,
        isPaused: false,
        currentLine: 0,
        currentFile: '',
        variables: [],
        callStack: [],
        breakpoints: [],
        console: [],
        isConnected: false
    });

    const [selectedTab, setSelectedTab] = useState<'variables' | 'callstack' | 'breakpoints' | 'console'>('variables');
    const [consoleInput, setConsoleInput] = useState('');
    const consoleEndRef = useRef<HTMLDivElement>(null);

    // Mock data
    useEffect(() => {
        setState(prev => ({
            ...prev,
            variables: [
                {
                    name: 'user',
                    value: { id: 1, name: 'John Doe', email: 'john@example.com' },
                    type: 'object',
                    scope: 'local',
                    isExpanded: false,
                    children: [
                        { name: 'id', value: 1, type: 'number', scope: 'local', isExpanded: false },
                        { name: 'name', value: 'John Doe', type: 'string', scope: 'local', isExpanded: false },
                        { name: 'email', value: 'john@example.com', type: 'string', scope: 'local', isExpanded: false }
                    ]
                },
                {
                    name: 'count',
                    value: 42,
                    type: 'number',
                    scope: 'local',
                    isExpanded: false
                },
                {
                    name: 'items',
                    value: ['item1', 'item2', 'item3'],
                    type: 'array',
                    scope: 'local',
                    isExpanded: false,
                    children: [
                        { name: '0', value: 'item1', type: 'string', scope: 'local', isExpanded: false },
                        { name: '1', value: 'item2', type: 'string', scope: 'local', isExpanded: false },
                        { name: '2', value: 'item3', type: 'string', scope: 'local', isExpanded: false }
                    ]
                }
            ],
            callStack: [
                {
                    functionName: 'processUser',
                    file: 'user-service.ts',
                    line: 45,
                    column: 12,
                    isActive: true
                },
                {
                    functionName: 'handleSubmit',
                    file: 'form-component.tsx',
                    line: 23,
                    column: 8,
                    isActive: false
                },
                {
                    functionName: 'onClick',
                    file: 'button.tsx',
                    line: 15,
                    column: 5,
                    isActive: false
                }
            ],
            breakpoints: [
                {
                    id: '1',
                    line: 45,
                    column: 12,
                    enabled: true,
                    hitCount: 3,
                    file: 'user-service.ts'
                },
                {
                    id: '2',
                    line: 23,
                    column: 8,
                    enabled: true,
                    condition: 'user.id > 0',
                    hitCount: 1,
                    file: 'form-component.tsx'
                },
                {
                    id: '3',
                    line: 15,
                    column: 5,
                    enabled: false,
                    hitCount: 0,
                    file: 'button.tsx'
                }
            ],
            console: [
                'Debugger connected',
                'Breakpoint hit at user-service.ts:45',
                'Variable user updated: {id: 1, name: "John Doe"}',
                'Stepping over processUser function',
                'Breakpoint hit at form-component.tsx:23'
            ],
            isConnected: true
        }));
    }, []);

    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [state.console]);

    const handleStart = () => {
        setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
    };

    const handlePause = () => {
        setState(prev => ({ ...prev, isPaused: true }));
    };

    const handleStop = () => {
        setState(prev => ({
            ...prev,
            isRunning: false,
            isPaused: false,
            currentLine: 0,
            currentFile: '',
            variables: [],
            callStack: []
        }));
        onStop?.();
    };

    const handleStep = (type: 'over' | 'into' | 'out') => {
        onStep?.(type);
        // Simulate step
        setState(prev => ({
            ...prev,
            currentLine: prev.currentLine + 1,
            console: [...prev.console, `Step ${type} executed`]
        }));
    };

    const handleContinue = () => {
        setState(prev => ({ ...prev, isPaused: false }));
        onContinue?.();
    };

    const handleRestart = () => {
        setState(prev => ({
            ...prev,
            isRunning: false,
            isPaused: false,
            currentLine: 0,
            currentFile: '',
            variables: [],
            callStack: [],
            console: [...prev.console, 'Debugger restarted']
        }));
        onRestart?.();
    };

    const handleBreakpointToggle = (breakpoint: Breakpoint) => {
        setState(prev => ({
            ...prev,
            breakpoints: prev.breakpoints.map(bp =>
                bp.id === breakpoint.id ? { ...bp, enabled: !bp.enabled } : bp
            )
        }));
        onBreakpointToggle?.(breakpoint);
    };

    const handleConsoleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!consoleInput.trim()) return;

        setState(prev => ({
            ...prev,
            console: [...prev.console, `> ${consoleInput}`]
        }));

        // Simulate command execution
        setTimeout(() => {
            setState(prev => ({
                ...prev,
                console: [...prev.console, `Result: ${consoleInput} executed`]
            }));
        }, 500);

        setConsoleInput('');
    };

    const toggleVariableExpansion = (variableName: string) => {
        setState(prev => ({
            ...prev,
            variables: prev.variables.map(v =>
                v.name === variableName ? { ...v, isExpanded: !v.isExpanded } : v
            )
        }));
    };

    const formatValue = (value: any): string => {
        if (typeof value === 'string') return `"${value}"`;
        if (typeof value === 'object' && value !== null) {
            return Array.isArray(value) ? `Array(${value.length})` : 'Object';
        }
        return String(value);
    };

    const renderVariable = (variable: Variable, depth = 0) => (
        <div key={variable.name} className="ml-4">
            <div
                className="flex items-center gap-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                style={{ marginLeft: `${depth * 16}px` }}
                onClick={() => variable.children && toggleVariableExpansion(variable.name)}
            >
                {variable.children && (
                    <span className="text-gray-400">
                        {variable.isExpanded ? '▼' : '▶'}
                    </span>
                )}
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">
                    {variable.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">:</span>
                <span className="text-green-600 dark:text-green-400 font-mono text-sm">
                    {formatValue(variable.value)}
                </span>
                <span className="text-gray-400 text-xs">
                    ({variable.type})
                </span>
            </div>
            {variable.children && variable.isExpanded && (
                <div>
                    {variable.children.map(child => renderVariable(child, depth + 1))}
                </div>
            )}
        </div>
    );

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bug className="w-6 h-6 text-red-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Debugger
                        </h3>
                        <div className={`w-2 h-2 rounded-full ${state.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleStart}
                            disabled={state.isRunning}
                            className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded transition-colors"
                            title="Start Debugging"
                        >
                            <Play className="w-4 h-4" />
                        </button>
                        <button
                            onClick={state.isPaused ? handleContinue : handlePause}
                            disabled={!state.isRunning}
                            className="p-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white rounded transition-colors"
                            title={state.isPaused ? "Continue" : "Pause"}
                        >
                            {state.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={handleStop}
                            disabled={!state.isRunning}
                            className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded transition-colors"
                            title="Stop Debugging"
                        >
                            <Square className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleRestart}
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                            title="Restart"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Step Controls */}
                {state.isPaused && (
                    <div className="flex items-center gap-2 mt-3">
                        <button
                            onClick={() => handleStep('over')}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded flex items-center gap-1"
                        >
                            <Play className="w-3 h-3" />
                            Step Over
                        </button>
                        <button
                            onClick={() => handleStep('into')}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded flex items-center gap-1"
                        >
                            <Code className="w-3 h-3" />
                            Step Into
                        </button>
                        <button
                            onClick={() => handleStep('out')}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded flex items-center gap-1"
                        >
                            <Square className="w-3 h-3" />
                            Step Out
                        </button>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {[
                    { id: 'variables', label: 'Variables', icon: Eye },
                    { id: 'callstack', label: 'Call Stack', icon: Code },
                    { id: 'breakpoints', label: 'Breakpoints', icon: Bug },
                    { id: 'console', label: 'Console', icon: AlertTriangle }
                ].map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setSelectedTab(id as any)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${selectedTab === id
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-4">
                {selectedTab === 'variables' && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Local Variables
                        </h4>
                        <div className="space-y-1">
                            {state.variables.map(variable => renderVariable(variable))}
                        </div>
                    </div>
                )}

                {selectedTab === 'callstack' && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Call Stack
                        </h4>
                        <div className="space-y-2">
                            {state.callStack.map((frame, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg border ${frame.isActive
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-200 dark:border-gray-700'
                                        }`}
                                >
                                    <div className="font-mono text-sm text-gray-900 dark:text-white">
                                        {frame.functionName}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {frame.file}:{frame.line}:{frame.column}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === 'breakpoints' && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Breakpoints
                        </h4>
                        <div className="space-y-2">
                            {state.breakpoints.map(breakpoint => (
                                <div
                                    key={breakpoint.id}
                                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleBreakpointToggle(breakpoint)}
                                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${breakpoint.enabled
                                                ? 'border-red-500 bg-red-500'
                                                : 'border-gray-300 dark:border-gray-600'
                                                }`}
                                        >
                                            {breakpoint.enabled && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </button>
                                        <div>
                                            <div className="font-mono text-sm text-gray-900 dark:text-white">
                                                {breakpoint.file}:{breakpoint.line}:{breakpoint.column}
                                            </div>
                                            {breakpoint.condition && (
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Condition: {breakpoint.condition}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>Hit: {breakpoint.hitCount}</span>
                                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === 'console' && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Console Output
                        </h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm h-48 overflow-y-auto mb-3">
                            {state.console.map((line, index) => (
                                <div key={index} className="mb-1">
                                    {line}
                                </div>
                            ))}
                            <div ref={consoleEndRef} />
                        </div>
                        <form onSubmit={handleConsoleSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={consoleInput}
                                onChange={(e) => setConsoleInput(e.target.value)}
                                placeholder="Enter command..."
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                            >
                                Execute
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}