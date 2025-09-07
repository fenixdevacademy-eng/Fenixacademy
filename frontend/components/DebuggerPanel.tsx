'use client';

import React, { useState } from 'react';
import { Play, Square, SkipForward, RotateCcw, Bug, List, Eye, Settings } from 'lucide-react';

const DebuggerPanel: React.FC = () => {
    const [isDebugging, setIsDebugging] = useState(false);
    const [breakpoints, setBreakpoints] = useState([
        { id: 1, file: 'script.js', line: 15, condition: '', enabled: true },
        { id: 2, file: 'script.js', line: 23, condition: 'x > 5', enabled: true }
    ]);
    const [callStack, setCallStack] = useState([
        { name: 'main()', file: 'script.js', line: 1 },
        { name: 'processData()', file: 'script.js', line: 15 },
        { name: 'validateInput()', file: 'script.js', line: 23 }
    ]);
    const [variables, setVariables] = useState([
        { name: 'x', value: '5', type: 'number' },
        { name: 'data', value: '[...]', type: 'array' },
        { name: 'result', value: 'undefined', type: 'undefined' }
    ]);

    const handleStartDebugging = () => {
        setIsDebugging(true);
    };

    const handleStopDebugging = () => {
        setIsDebugging(false);
    };

    const handleStepOver = () => {
        console.log('Step over');
    };

    const handleStepInto = () => {
        console.log('Step into');
    };

    const handleStepOut = () => {
        console.log('Step out');
    };

    const handleContinue = () => {
        console.log('Continue');
    };

    const toggleBreakpoint = (id: number) => {
        setBreakpoints(prev => prev.map(bp =>
            bp.id === id ? { ...bp, enabled: !bp.enabled } : bp
        ));
    };

    return (
        <div className="debugger-panel">
            <div className="debugger-header">
                <h3>Debugger</h3>
                <div className="debugger-controls">
                    <button
                        className={`debug-button ${isDebugging ? 'active' : ''}`}
                        onClick={isDebugging ? handleStopDebugging : handleStartDebugging}
                    >
                        {isDebugging ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isDebugging ? 'Parar' : 'Iniciar'}
                    </button>
                    <button
                        className="debug-button"
                        onClick={handleStepOver}
                        disabled={!isDebugging}
                    >
                        <SkipForward className="w-4 h-4" />
                        Step Over
                    </button>
                    <button
                        className="debug-button"
                        onClick={handleStepInto}
                        disabled={!isDebugging}
                    >
                        <SkipForward className="w-4 h-4" />
                        Step Into
                    </button>
                    <button
                        className="debug-button"
                        onClick={handleStepOut}
                        disabled={!isDebugging}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Step Out
                    </button>
                    <button
                        className="debug-button"
                        onClick={handleContinue}
                        disabled={!isDebugging}
                    >
                        <Play className="w-4 h-4" />
                        Continue
                    </button>
                </div>
            </div>

            <div className="debugger-content">
                {/* Breakpoints */}
                <div className="debugger-section">
                    <h4>
                        <Bug className="w-4 h-4" />
                        Breakpoints
                    </h4>
                    <div className="breakpoints-list">
                        {breakpoints.map((breakpoint) => (
                            <div key={breakpoint.id} className="breakpoint-item">
                                <input
                                    type="checkbox"
                                    checked={breakpoint.enabled}
                                    onChange={() => toggleBreakpoint(breakpoint.id)}
                                />
                                <span className="breakpoint-file">{breakpoint.file}</span>
                                <span className="breakpoint-line">:{breakpoint.line}</span>
                                {breakpoint.condition && (
                                    <span className="breakpoint-condition">({breakpoint.condition})</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call Stack */}
                <div className="debugger-section">
                    <h4>
                        <List className="w-4 h-4" />
                        Call Stack
                    </h4>
                    <div className="call-stack">
                        {callStack.map((frame, index) => (
                            <div key={index} className="stack-frame">
                                <span className="frame-name">{frame.name}</span>
                                <span className="frame-location">{frame.file}:{frame.line}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Variables */}
                <div className="debugger-section">
                    <h4>
                        <Eye className="w-4 h-4" />
                        Variables
                    </h4>
                    <div className="variables-list">
                        {variables.map((variable, index) => (
                            <div key={index} className="variable-item">
                                <span className="variable-name">{variable.name}</span>
                                <span className="variable-type">({variable.type})</span>
                                <span className="variable-value">{variable.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Watch Expressions */}
                <div className="debugger-section">
                    <h4>
                        <Settings className="w-4 h-4" />
                        Watch Expressions
                    </h4>
                    <div className="watch-expressions">
                        <input
                            type="text"
                            placeholder="Adicionar expressão para observar..."
                            className="watch-input"
                        />
                        <div className="watch-list">
                            <div className="watch-item">
                                <span className="watch-expression">x * 2</span>
                                <span className="watch-value">10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebuggerPanel;

