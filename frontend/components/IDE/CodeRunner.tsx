'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Square, RotateCcw, Download, Upload, Copy, Check } from 'lucide-react'

interface CodeRunnerProps {
  language: string
  code: string
  onCodeChange: (code: string) => void
}

export default function CodeRunner({ language, code, onCodeChange }: CodeRunnerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)

  // Simular execução de código
  const runCode = async () => {
    setIsRunning(true)
    setOutput([])
    
    const newOutput: string[] = []
    
    // Simular diferentes tipos de execução baseado na linguagem
    switch (language) {
      case 'javascript':
      case 'typescript':
        newOutput.push('🚀 Executando JavaScript/TypeScript...')
        newOutput.push('📦 Carregando dependências...')
        newOutput.push('⚡ Compilando código...')
        newOutput.push('🎯 Executando...')
        newOutput.push('')
        newOutput.push('✅ Execução concluída!')
        newOutput.push('📊 Resultado: Hello World!')
        newOutput.push('⏱️ Tempo de execução: 0.123s')
        break
        
      case 'python':
        newOutput.push('🐍 Executando Python...')
        newOutput.push('📦 Verificando dependências...')
        newOutput.push('⚡ Interpretando código...')
        newOutput.push('🎯 Executando...')
        newOutput.push('')
        newOutput.push('✅ Execução concluída!')
        newOutput.push('📊 Resultado: Hello World!')
        newOutput.push('⏱️ Tempo de execução: 0.456s')
        break
        
      case 'java':
        newOutput.push('☕ Executando Java...')
        newOutput.push('📦 Compilando código...')
        newOutput.push('⚡ Executando bytecode...')
        newOutput.push('🎯 Processando...')
        newOutput.push('')
        newOutput.push('✅ Execução concluída!')
        newOutput.push('📊 Resultado: Hello World!')
        newOutput.push('⏱️ Tempo de execução: 0.789s')
        break
        
      default:
        newOutput.push(`🔧 Executando ${language}...`)
        newOutput.push('⚡ Processando código...')
        newOutput.push('🎯 Executando...')
        newOutput.push('')
        newOutput.push('✅ Execução concluída!')
        newOutput.push('📊 Resultado: Hello World!')
    }
    
    // Simular execução com delay
    for (let i = 0; i < newOutput.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setOutput(prev => [...prev, newOutput[i]])
    }
    
    setIsRunning(false)
  }

  // Parar execução
  const stopCode = () => {
    setIsRunning(false)
    setOutput(prev => [...prev, '⏹️ Execução interrompida pelo usuário'])
  }

  // Limpar output
  const clearOutput = () => {
    setOutput([])
  }

  // Copiar código
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar código:', error)
    }
  }

  // Salvar código
  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Carregar código
  const loadCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        onCodeChange(content)
      }
      reader.readAsText(file)
    }
  }

  // Auto-scroll para o final do output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm font-medium"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Executando...' : 'Executar'}
          </button>
          
          {isRunning && (
            <button
              onClick={stopCode}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium"
            >
              <Square className="w-4 h-4" />
              Parar
            </button>
          )}
          
          <button
            onClick={clearOutput}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Limpar
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {isCopied ? 'Copiado!' : 'Copiar'}
          </button>
          
          <button
            onClick={saveCode}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm"
          >
            <Download className="w-4 h-4" />
            Salvar
          </button>
          
          <label className="flex items-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm cursor-pointer">
            <Upload className="w-4 h-4" />
            Carregar
            <input
              type="file"
              accept=".js,.ts,.py,.java,.cpp,.c,.html,.css,.json"
              onChange={loadCode}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <h3 className="text-sm font-medium text-gray-300">Output</h3>
        </div>
        
        <div
          ref={outputRef}
          className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-black"
        >
          {output.length === 0 ? (
            <div className="text-gray-500 italic">
              Clique em "Executar" para ver o resultado do seu código...
            </div>
          ) : (
            output.map((line, index) => (
              <div key={index} className="mb-1 text-green-400">
                {line}
              </div>
            ))
          )}
          
          {isRunning && (
            <div className="flex items-center gap-2 text-yellow-400">
              <div className="animate-spin w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
              <span>Executando...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-sm font-medium text-gray-300">Input:</label>
          <span className="text-xs text-gray-500">(Opcional - para programas que precisam de entrada)</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite a entrada para seu programa aqui..."
          className="w-full h-20 p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}




