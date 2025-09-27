'use client';

import React, { useState, useEffect } from 'react';
import { Code, Play, Square, Download, Copy, CheckCircle, AlertCircle } from 'lucide-react';

interface PythonProviderProps {
  code: string;
  onCodeChange?: (code: string) => void;
  onRun?: (output: string) => void;
  className?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
}

export function PythonProvider({
  code: initialCode,
  onCodeChange,
  onRun,
  className = '',
  theme = 'dark',
  readOnly = false
}: PythonProviderProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
    setError(null);
  };

  const runCode = async () => {
    if (!code.trim()) return;

    setIsRunning(true);
    setError(null);
    setOutput('');
    const startTime = performance.now();

    try {
      const result = await executePython(code);
      setOutput(result);
      onRun?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      setOutput(`Erro: ${errorMessage}`);
    } finally {
      const endTime = performance.now();
      setExecutionTime(endTime - startTime);
      setIsRunning(false);
    }
  };

  const executePython = async (pythonCode: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const lines = pythonCode.split('\n');
        const results: string[] = [];
        const localVars: Record<string, any> = {};

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          
          if (line.startsWith('print(') && line.endsWith(')')) {
            const content = line.slice(6, -1);
            try {
              const value = evaluateExpression(content, localVars);
              results.push(String(value));
            } catch (err) {
              results.push(`Erro: ${err}`);
            }
          } else if (line.includes('=') && !line.includes('==') && !line.includes('!=')) {
            const [varName, expression] = line.split('=').map(s => s.trim());
            try {
              const value = evaluateExpression(expression, localVars);
              localVars[varName] = value;
            } catch (err) {
              results.push(`Erro na linha ${i + 1}: ${err}`);
            }
          }
        }
        
        if (results.length > 0) {
          resolve(results.join('\n'));
        } else {
          resolve('Código executado com sucesso!');
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const evaluateExpression = (expression: string, variables: Record<string, any>): any => {
    expression = expression.trim();
    
    if (/^\d+$/.test(expression)) {
      return parseInt(expression);
    }
    if (/^\d+\.\d+$/.test(expression)) {
      return parseFloat(expression);
    }
    
    if (expression.startsWith('"') && expression.endsWith('"')) {
      return expression.slice(1, -1);
    }
    if (expression.startsWith("'") && expression.endsWith("'")) {
      return expression.slice(1, -1);
    }
    
    if (variables[expression] !== undefined) {
      return variables[expression];
    }
    
    if (expression.includes('+')) {
      const [left, right] = expression.split('+').map(s => s.trim());
      return evaluateExpression(left, variables) + evaluateExpression(right, variables);
    }
    
    throw new Error(`Expressão não reconhecida: ${expression}`);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-medium">Python</span>
          {executionTime > 0 && (
            <span className="text-xs text-gray-400">
              ({executionTime.toFixed(2)}ms)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            disabled={isRunning || !code.trim()}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-sm rounded flex items-center gap-1 transition-colors"
          >
            {isRunning ? (
              <>
                <Square className="w-3 h-3" />
                Executando...
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                Executar
              </>
            )}
          </button>
          <button
            onClick={copyCode}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="Copiar código"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={downloadCode}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="Baixar código"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="p-4">
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          readOnly={readOnly}
          placeholder="Digite seu código Python aqui..."
          className="w-full h-64 bg-gray-900 text-white font-mono text-sm border border-gray-700 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
        />
      </div>

      {/* Output */}
      {(output || error) && (
        <div className="border-t border-gray-700">
          <div className="flex items-center justify-between p-3 bg-gray-800">
            <span className="text-white text-sm font-medium">Output</span>
          </div>
          <div className="p-4">
            <pre className={`text-sm font-mono whitespace-pre-wrap ${
              error ? 'text-red-400' : 'text-green-400'
            }`}>
              {output || error}
            </pre>
          </div>
        </div>
      )}

      {/* Code Snippets */}
      <div className="border-t border-gray-700 p-4">
        <h4 className="text-white text-sm font-medium mb-3">Snippets Úteis:</h4>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => handleCodeChange('print("Hello, World!")')}
            className="p-2 text-left text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
          >
            <div className="font-medium text-white">Hello World</div>
            <div className="text-gray-400">print("Hello, World!")</div>
          </button>
          <button
            onClick={() => handleCodeChange('nome = "Fenix"\nprint(f"Olá, {nome}!")')}
            className="p-2 text-left text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
          >
            <div className="font-medium text-white">Variáveis</div>
            <div className="text-gray-400">nome = "Fenix"</div>
          </button>
        </div>
      </div>
    </div>
  );
}



