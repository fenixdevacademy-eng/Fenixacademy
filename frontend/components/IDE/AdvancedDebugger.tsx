'use client';

import React, { useState } from 'react';
import {
  Bug,
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  RotateCcw,
  Eye,
  EyeOff,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Code,
  Database,
  Network,
  Clock,
  FileText,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Download,
  Upload,
  Plus
} from 'lucide-react';

interface Breakpoint {
  id: string;
  line: number;
  file: string;
  condition?: string;
  isEnabled: boolean;
  hitCount: number;
}

interface Variable {
  name: string;
  value: any;
  type: string;
  scope: string;
  isModified: boolean;
}

interface CallStack {
  function: string;
  file: string;
  line: number;
  variables: Variable[];
}

interface DebugSession {
  id: string;
  status: 'running' | 'paused' | 'stopped';
  currentLine: number;
  currentFile: string;
  breakpoints: Breakpoint[];
  callStack: CallStack[];
  variables: Variable[];
  console: string[];
}

export default function AdvancedDebugger() {
  const [debugSession, setDebugSession] = useState<DebugSession>({
    id: '1',
    status: 'stopped',
    currentLine: 0,
    currentFile: 'script.js',
    breakpoints: [
      { id: '1', line: 15, file: 'script.js', isEnabled: true, hitCount: 3 },
      { id: '2', line: 28, file: 'script.js', condition: 'x > 10', isEnabled: true, hitCount: 1 },
      { id: '3', line: 42, file: 'utils.js', isEnabled: false, hitCount: 0 }
    ],
    callStack: [
      {
        function: 'calculateTotal',
        file: 'script.js',
        line: 15,
        variables: [
          { name: 'items', value: '[1, 2, 3, 4, 5]', type: 'Array', scope: 'local', isModified: false },
          { name: 'total', value: '15', type: 'Number', scope: 'local', isModified: true },
          { name: 'discount', value: '0.1', type: 'Number', scope: 'local', isModified: false }
        ]
      },
      {
        function: 'processOrder',
        file: 'script.js',
        line: 28,
        variables: [
          { name: 'orderId', value: '"ORD-12345"', type: 'String', scope: 'local', isModified: false },
          { name: 'customer', value: '{name: "João", email: "joao@email.com"}', type: 'Object', scope: 'local', isModified: false }
        ]
      }
    ],
    variables: [
      { name: 'globalConfig', value: '{apiUrl: "https://api.example.com", timeout: 5000}', type: 'Object', scope: 'global', isModified: false },
      { name: 'userSession', value: '{id: 123, token: "abc123", expires: "2024-12-31"}', type: 'Object', scope: 'global', isModified: true },
      { name: 'debugMode', value: 'true', type: 'Boolean', scope: 'global', isModified: false }
    ],
    console: [
      'Debug session started',
      'Breakpoint hit at line 15 in script.js',
      'Variable total modified: 0 -> 15',
      'Stepping into calculateTotal function',
      'Conditional breakpoint hit: x > 10'
    ]
  });

  const [selectedTab, setSelectedTab] = useState<'breakpoints' | 'variables' | 'callstack' | 'console'>('breakpoints');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyModified, setShowOnlyModified] = useState(false);

  const startDebugging = () => {
    setDebugSession(prev => ({ ...prev, status: 'running' }));
  };

  const pauseDebugging = () => {
    setDebugSession(prev => ({ ...prev, status: 'paused' }));
  };

  const stopDebugging = () => {
    setDebugSession(prev => ({ ...prev, status: 'stopped', currentLine: 0 }));
  };

  const stepOver = () => {
    setDebugSession(prev => ({
      ...prev,
      currentLine: prev.currentLine + 1,
      console: [...prev.console, `Stepped over line ${prev.currentLine + 1}`]
    }));
  };

  const stepInto = () => {
    setDebugSession(prev => ({
      ...prev,
      console: [...prev.console, `Stepped into function at line ${prev.currentLine}`]
    }));
  };

  const stepOut = () => {
    setDebugSession(prev => ({
      ...prev,
      console: [...prev.console, `Stepped out of function`]
    }));
  };

  const toggleBreakpoint = (id: string) => {
    setDebugSession(prev => ({
      ...prev,
      breakpoints: prev.breakpoints.map(bp =>
        bp.id === id ? { ...bp, isEnabled: !bp.isEnabled } : bp
      )
    }));
  };

  const addBreakpoint = () => {
    const line = prompt('Número da linha:');
    if (line) {
      const newBreakpoint: Breakpoint = {
        id: Date.now().toString(),
        line: parseInt(line),
        file: debugSession.currentFile,
        isEnabled: true,
        hitCount: 0
      };
      setDebugSession(prev => ({
        ...prev,
        breakpoints: [...prev.breakpoints, newBreakpoint]
      }));
    }
  };

  const filteredVariables = debugSession.variables.filter(variable => {
    const matchesSearch = variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModified = !showOnlyModified || variable.isModified;
    return matchesSearch && matchesModified;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'stopped': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'stopped': return <Square className="w-4 h-4" />;
      default: return <Square className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bug className="w-6 h-6 text-red-500" />
            <h1 className="text-xl font-bold">Debugger Avançado</h1>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded text-sm ${getStatusColor(debugSession.status)}`}>
              {getStatusIcon(debugSession.status)}
              <span className="capitalize">{debugSession.status}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Debug Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={startDebugging}
            disabled={debugSession.status === 'running'}
            className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-sm"
          >
            <Play className="w-4 h-4" />
            <span>Iniciar</span>
          </button>

          <button
            onClick={pauseDebugging}
            disabled={debugSession.status !== 'running'}
            className="flex items-center space-x-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded text-sm"
          >
            <Pause className="w-4 h-4" />
            <span>Pausar</span>
          </button>

          <button
            onClick={stopDebugging}
            className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
          >
            <Square className="w-4 h-4" />
            <span>Parar</span>
          </button>

          <div className="w-px h-6 bg-gray-600 mx-2" />

          <button
            onClick={stepOver}
            disabled={debugSession.status !== 'paused'}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-sm"
          >
            <SkipForward className="w-4 h-4" />
            <span>Step Over</span>
          </button>

          <button
            onClick={stepInto}
            disabled={debugSession.status !== 'paused'}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-sm"
          >
            <ArrowDown className="w-4 h-4" />
            <span>Step Into</span>
          </button>

          <button
            onClick={stepOut}
            disabled={debugSession.status !== 'paused'}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Step Out</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {[
              { id: 'breakpoints', label: 'Breakpoints', icon: <Bug className="w-4 h-4" /> },
              { id: 'variables', label: 'Variáveis', icon: <Database className="w-4 h-4" /> },
              { id: 'callstack', label: 'Call Stack', icon: <Network className="w-4 h-4" /> },
              { id: 'console', label: 'Console', icon: <FileText className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-1 px-3 py-2 text-sm ${selectedTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {selectedTab === 'breakpoints' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Breakpoints</h3>
                  <button
                    onClick={addBreakpoint}
                    className="p-1 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {debugSession.breakpoints.map(breakpoint => (
                  <div key={breakpoint.id} className="bg-gray-700 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleBreakpoint(breakpoint.id)}
                          className={`w-4 h-4 rounded ${breakpoint.isEnabled ? 'bg-red-500' : 'bg-gray-500'
                            }`}
                        />
                        <span className="text-sm font-medium">{breakpoint.file}</span>
                      </div>
                      <span className="text-xs text-gray-400">{breakpoint.hitCount} hits</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Linha {breakpoint.line}
                      {breakpoint.condition && (
                        <div className="text-xs text-yellow-400 mt-1">
                          Condição: {breakpoint.condition}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'variables' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Buscar variáveis..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <Search className="absolute right-2 top-1.5 w-3 h-3 text-gray-400" />
                  </div>
                  <button
                    onClick={() => setShowOnlyModified(!showOnlyModified)}
                    className={`p-1 rounded ${showOnlyModified ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    <Filter className="w-3 h-3" />
                  </button>
                </div>

                {filteredVariables.map((variable, index) => (
                  <div key={index} className="bg-gray-700 rounded p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{variable.name}</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs px-1 py-0.5 bg-gray-600 rounded">{variable.type}</span>
                        <span className="text-xs px-1 py-0.5 bg-blue-600 rounded">{variable.scope}</span>
                        {variable.isModified && (
                          <span className="text-xs px-1 py-0.5 bg-yellow-600 rounded">Modified</span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 font-mono">
                      {variable.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'callstack' && (
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Call Stack</h3>
                {debugSession.callStack.map((frame, index) => (
                  <div key={index} className="bg-gray-700 rounded p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium">{frame.function}</span>
                      <span className="text-xs text-gray-400">{frame.file}:{frame.line}</span>
                    </div>
                    <div className="space-y-1">
                      {frame.variables.map((variable, varIndex) => (
                        <div key={varIndex} className="text-xs text-gray-300">
                          <span className="font-medium">{variable.name}</span>: {variable.value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'console' && (
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Console</h3>
                <div className="space-y-1">
                  {debugSession.console.map((message, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono bg-gray-700 rounded p-2">
                      <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span> {message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Code View */}
          <div className="flex-1 bg-gray-900 p-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Código Atual</h3>
              <div className="bg-gray-900 rounded p-4 font-mono text-sm">
                <div className="space-y-1">
                  {Array.from({ length: 50 }, (_, i) => i + 1).map(line => (
                    <div
                      key={line}
                      className={`flex items-center space-x-2 ${line === debugSession.currentLine ? 'bg-blue-900 text-blue-100' : ''
                        }`}
                    >
                      <span className="text-gray-500 w-8 text-right">{line}</span>
                      <span className="flex-1">
                        {line === 15 && 'function calculateTotal(items) {'}
                        {line === 16 && '  let total = 0;'}
                        {line === 17 && '  for (let item of items) {'}
                        {line === 18 && '    total += item;'}
                        {line === 19 && '  }'}
                        {line === 20 && '  return total;'}
                        {line === 21 && '}'}
                        {line === 28 && 'const result = calculateTotal([1, 2, 3, 4, 5]);'}
                        {line === 42 && 'console.log("Result:", result);'}
                        {line !== 15 && line !== 16 && line !== 17 && line !== 18 && line !== 19 && line !== 20 && line !== 21 && line !== 28 && line !== 42 && '  '}
                      </span>
                      {debugSession.breakpoints.some(bp => bp.line === line) && (
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}