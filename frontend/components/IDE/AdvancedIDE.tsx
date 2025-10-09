'use client';

import React, { useState } from 'react';

interface AdvancedIDEProps {
  className?: string;
}

export default function AdvancedIDE({ className = '' }: AdvancedIDEProps) {
  const [code, setCode] = useState('// Digite seu código aqui\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      // Simulação de execução de código
      setOutput('Hello, World!');
    } catch (error) {
      setOutput(`Erro: ${error}`);
    }
  };

  return (
    <div className={`h-screen flex flex-col ${className}`}>
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Fenix IDE</h1>
        <div className="flex space-x-2">
          <button 
            onClick={runCode}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Executar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-100 p-2 text-sm text-gray-600">
            Editor de Código
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none focus:outline-none"
            placeholder="Digite seu código aqui..."
          />
        </div>

        {/* Output Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-gray-100 p-2 text-sm text-gray-600">
            Saída
          </div>
          <div className="flex-1 p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
            {output || 'Saída aparecerá aqui...'}
          </div>
        </div>
      </div>
    </div>
  );
}