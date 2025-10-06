'use client';

import React, { useState } from 'react';
import { Play, CheckCircle, ArrowLeft, ArrowRight, Code, Calculator } from 'lucide-react';

export default function ProjectCalculatorPage() {
    const [code, setCode] = useState(`-- Calculadora Simples em Lua
-- Projeto prático para os alunos da Fênix

function calcular(operacao, num1, num2)
    if operacao == "+" then
        return num1 + num2
    elseif operacao == "-" then
        return num1 - num2
    elseif operacao == "*" then
        return num1 * num2
    elseif operacao == "/" then
        if num2 ~= 0 then
            return num1 / num2
        else
            return "Erro: Divisão por zero!"
        end
    else
        return "Operação inválida!"
    end
end

function mostrarMenu()
    print("=== CALCULADORA FÊNIX ===")
    print("1. Soma (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Sair")
    print("========================")
end

function main()
    local continuar = true
    
    while continuar do
        mostrarMenu()
        
        print("Escolha uma operação (1-5):")
        local escolha = io.read()
        
        if escolha == "5" then
            print("Obrigado por usar a Calculadora Fênix!")
            continuar = false
        elseif escolha == "1" or escolha == "2" or escolha == "3" or escolha == "4" then
            print("Digite o primeiro número:")
            local num1 = tonumber(io.read())
            
            print("Digite o segundo número:")
            local num2 = tonumber(io.read())
            
            local operacoes = {"+", "-", "*", "/"}
            local operacao = operacoes[tonumber(escolha)]
            
            local resultado = calcular(operacao, num1, num2)
            print("Resultado: " .. tostring(resultado))
            print("")
        else
            print("Opção inválida! Tente novamente.")
            print("")
        end
    end
end

-- Executar o programa
main()`);

    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const runCode = () => {
        setIsRunning(true);
        setOutput('Executando calculadora...\n');

        // Simular execução do código
        setTimeout(() => {
            setOutput(`=== CALCULADORA FÊNIX ===
1. Soma (+)
2. Subtração (-)
3. Multiplicação (*)
4. Divisão (/)
5. Sair
========================
Escolha uma operação (1-5):
1
Digite o primeiro número:
10
Digite o segundo número:
5
Resultado: 15

=== CALCULADORA FÊNIX ===
1. Soma (+)
2. Subtração (-)
3. Multiplicação (*)
4. Divisão (/)
5. Sair
========================
Escolha uma operação (1-5):
5
Obrigado por usar a Calculadora Fênix!`);
            setIsRunning(false);
        }, 1500);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
            {/* Header */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="text-white hover:text-blue-200 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-white">Projeto: Calculadora Simples</h1>
                                <p className="text-green-200 text-sm">Aplicando tudo que aprendemos</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                <CheckCircle className="w-4 h-4 mr-2 inline" />
                                Projeto Concluído
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Instruções do Projeto */}
                    <div className="space-y-6">
                        {/* Objetivo */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <Calculator className="w-6 h-6 mr-3" />
                                Objetivo do Projeto
                            </h2>
                            <div className="space-y-4 text-green-100">
                                <p>
                                    Vamos criar uma <strong className="text-white">calculadora simples</strong> que
                                    aplica todos os conceitos que aprendemos:
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span>Variáveis e tipos de dados</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span>Estruturas condicionais (if/elseif/else)</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span>Loops (while)</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span>Funções</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span>Entrada e saída de dados</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Funcionalidades */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h2 className="text-xl font-bold text-white mb-4">🎯 Funcionalidades</h2>
                            <div className="space-y-3">
                                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                                    <h3 className="font-semibold text-white">Operações Básicas</h3>
                                    <p className="text-sm text-green-200">Soma, subtração, multiplicação e divisão</p>
                                </div>
                                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
                                    <h3 className="font-semibold text-white">Menu Interativo</h3>
                                    <p className="text-sm text-blue-200">Interface amigável para escolher operações</p>
                                </div>
                                <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-3">
                                    <h3 className="font-semibold text-white">Validação de Entrada</h3>
                                    <p className="text-sm text-purple-200">Verificação de divisão por zero</p>
                                </div>
                                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
                                    <h3 className="font-semibold text-white">Loop Contínuo</h3>
                                    <p className="text-sm text-yellow-200">Permite fazer várias operações seguidas</p>
                                </div>
                            </div>
                        </div>

                        {/* Desafios Extras */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h2 className="text-xl font-bold text-white mb-4">🚀 Desafios Extras</h2>
                            <div className="space-y-3">
                                <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-3">
                                    <h3 className="font-semibold text-white">Histórico de Operações</h3>
                                    <p className="text-sm text-orange-200">Salve as últimas 10 operações realizadas</p>
                                </div>
                                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                                    <h3 className="font-semibold text-white">Operações Avançadas</h3>
                                    <p className="text-sm text-red-200">Adicione potência, raiz quadrada e porcentagem</p>
                                </div>
                                <div className="bg-indigo-500/20 border border-indigo-500/50 rounded-lg p-3">
                                    <h3 className="font-semibold text-white">Interface Gráfica</h3>
                                    <p className="text-sm text-indigo-200">Crie uma versão com Love2D (framework Lua)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor de Código */}
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                            <div className="flex items-center justify-between p-4 border-b border-white/20">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <Code className="w-5 h-5 mr-2" />
                                    Sua Calculadora
                                </h3>
                                <button
                                    onClick={runCode}
                                    disabled={isRunning}
                                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                                >
                                    <Play className="w-4 h-4" />
                                    <span>{isRunning ? 'Executando...' : 'Executar'}</span>
                                </button>
                            </div>

                            <div className="p-4">
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full h-80 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                    placeholder="Digite seu código da calculadora aqui..."
                                />
                            </div>
                        </div>

                        {/* Output */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                            <div className="p-4 border-b border-white/20">
                                <h3 className="text-lg font-semibold text-white">Saída da Calculadora</h3>
                            </div>
                            <div className="p-4">
                                <pre className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 min-h-40 whitespace-pre-wrap">
                                    {output || 'Execute o código para ver a calculadora funcionando...'}
                                </pre>
                            </div>
                        </div>

                        {/* Dicas */}
                        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                            <h3 className="font-semibold text-white mb-2">💡 Dicas para o Projeto</h3>
                            <ul className="space-y-1 text-sm text-blue-200">
                                <li>• Use <code className="bg-gray-800 px-1 rounded">io.read()</code> para entrada do usuário</li>
                                <li>• Use <code className="bg-gray-800 px-1 rounded">tonumber()</code> para converter string em número</li>
                                <li>• Use <code className="bg-gray-800 px-1 rounded">tostring()</code> para converter número em string</li>
                                <li>• Teste todas as operações antes de considerar concluído</li>
                            </ul>
                        </div>

                        {/* Navegação */}
                        <div className="flex justify-between">
                            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Voltar</span>
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                                <span>Próximo Projeto</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



























