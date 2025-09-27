'use client';

import React, { useState } from 'react';
import { Code, Play, Copy } from 'lucide-react';

interface JavaScriptProviderProps {
  code: string;
  onCodeChange?: (code: string) => void;
  className?: string;
}

export function JavaScriptProvider({
  code: initialCode,
  onCodeChange,
  className = ''
}: JavaScriptProviderProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const runCode = () => {
    try {
      // Simular execução
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(`Erro: ${error}`);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={`bg-gray-900 rounded-lg ${className}`}>
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-medium">JavaScript</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded flex items-center gap-1"
          >
            <Play className="w-3 h-3" />
            Executar
          </button>
          <button
            onClick={copyCode}
            className="p-1 text-gray-400 hover:text-white"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder="Digite seu código JavaScript aqui..."
          className="w-full h-64 bg-gray-900 text-white font-mono text-sm border border-gray-700 rounded p-3 focus:outline-none resize-none"
        />
      </div>

      {output && (
        <div className="border-t border-gray-700 p-4">
          <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}