'use client';

import { NextRequest, NextResponse } from 'next/server';

// Dados mockados dos exercícios individuais
const EXERCISE_DETAILS = {
    'python-data-science': {
        'ex-1': {
            id: 'ex-1',
            title: 'Calculadora Simples',
            description: 'Crie uma calculadora que realize operações básicas (+, -, *, /)',
            difficulty: 'easy',
            estimatedTime: '30 minutos',
            points: 10,
            category: 'fundamentos',
            module: 'modulo-1',
            level: 'iniciante',
            instructions: `
# Calculadora Simples

Crie uma função que aceite dois números e uma operação, e retorne o resultado.

## Requisitos:
- Função deve aceitar: num1, num2, operacao
- Operações suportadas: +, -, *, /
- Retornar o resultado da operação
- Tratar divisão por zero

## Exemplo:
\`\`\`python
calculadora(10, 5, '+')  # Retorna 15
calculadora(10, 5, '-')  # Retorna 5
calculadora(10, 5, '*')  # Retorna 50
calculadora(10, 5, '/')  # Retorna 2.0
\`\`\`
      `,
            testCases: [
                {
                    id: 'test-1',
                    input: { num1: 10, num2: 5, operacao: '+' },
                    expected: 15,
                    description: 'Soma de dois números positivos'
                },
                {
                    id: 'test-2',
                    input: { num1: 10, num2: 5, operacao: '-' },
                    expected: 5,
                    description: 'Subtração de dois números positivos'
                },
                {
                    id: 'test-3',
                    input: { num1: 10, num2: 5, operacao: '*' },
                    expected: 50,
                    description: 'Multiplicação de dois números positivos'
                },
                {
                    id: 'test-4',
                    input: { num1: 10, num2: 5, operacao: '/' },
                    expected: 2.0,
                    description: 'Divisão de dois números positivos'
                },
                {
                    id: 'test-5',
                    input: { num1: 10, num2: 0, operacao: '/' },
                    expected: 'Erro: Divisão por zero',
                    description: 'Tratamento de divisão por zero'
                }
            ],
            hints: [
                'Use if/elif para verificar a operação',
                'Lembre-se de tratar divisão por zero',
                'Retorne o resultado da operação'
            ],
            solution: `
def calculadora(num1, num2, operacao):
    if operacao == '+':
        return num1 + num2
    elif operacao == '-':
        return num1 - num2
    elif operacao == '*':
        return num1 * num2
    elif operacao == '/':
        if num2 == 0:
            return "Erro: Divisão por zero"
        return num1 / num2
    else:
        return "Operação inválida"
      `,
            resources: [
                {
                    title: 'Operadores Aritméticos em Python',
                    url: 'https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator',
                    type: 'documentation'
                },
                {
                    title: 'Estruturas Condicionais',
                    url: 'https://docs.python.org/3/tutorial/controlflow.html#if-statements',
                    type: 'documentation'
                }
            ]
        },
        'ex-2': {
            id: 'ex-2',
            title: 'Análise de Lista',
            description: 'Crie funções para analisar uma lista de números',
            difficulty: 'medium',
            estimatedTime: '45 minutos',
            points: 20,
            category: 'estruturas-dados',
            module: 'modulo-1',
            level: 'iniciante',
            instructions: `
# Análise de Lista

Crie funções para analisar uma lista de números.

## Funções necessárias:
1. \`soma_lista(lista)\` - Retorna a soma dos elementos
2. \`media_lista(lista)\` - Retorna a média dos elementos
3. \`maior_numero(lista)\` - Retorna o maior número
4. \`menor_numero(lista)\` - Retorna o menor número

## Exemplo:
\`\`\`python
numeros = [1, 2, 3, 4, 5]
print(soma_lista(numeros))    # 15
print(media_lista(numeros))   # 3.0
print(maior_numero(numeros))  # 5
print(menor_numero(numeros))  # 1
\`\`\`
      `,
            testCases: [
                {
                    id: 'test-1',
                    input: { lista: [1, 2, 3, 4, 5] },
                    expected: { soma: 15, media: 3.0, maior: 5, menor: 1 },
                    description: 'Lista com números positivos'
                },
                {
                    id: 'test-2',
                    input: { lista: [10, 20, 30] },
                    expected: { soma: 60, media: 20.0, maior: 30, menor: 10 },
                    description: 'Lista com números maiores'
                },
                {
                    id: 'test-3',
                    input: { lista: [-5, 0, 5] },
                    expected: { soma: 0, media: 0.0, maior: 5, menor: -5 },
                    description: 'Lista com números negativos e zero'
                }
            ],
            hints: [
                'Use sum() para somar a lista',
                'Divida a soma pelo comprimento para a média',
                'Use max() e min() para maior e menor'
            ],
            solution: `
def soma_lista(lista):
    return sum(lista)

def media_lista(lista):
    return sum(lista) / len(lista)

def maior_numero(lista):
    return max(lista)

def menor_numero(lista):
    return min(lista)
      `,
            resources: [
                {
                    title: 'Funções Built-in do Python',
                    url: 'https://docs.python.org/3/library/functions.html',
                    type: 'documentation'
                }
            ]
        }
    },
    'web-development': {
        'ex-1': {
            id: 'ex-1',
            title: 'Componente de Contador',
            description: 'Crie um componente React com botões de incremento e decremento',
            difficulty: 'easy',
            estimatedTime: '30 minutos',
            points: 10,
            category: 'componentes',
            module: 'modulo-1',
            level: 'iniciante',
            instructions: `
# Componente de Contador

Crie um componente React que exiba um contador com botões para incrementar e decrementar.

## Requisitos:
- Estado inicial do contador: 0
- Botão "+" para incrementar
- Botão "-" para decrementar
- Exibir o valor atual do contador
- Usar useState para gerenciar o estado

## Exemplo:
\`\`\`jsx
function Contador() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
\`\`\`
      `,
            testCases: [
                {
                    id: 'test-1',
                    input: 'inicial',
                    expected: { count: 0 },
                    description: 'Estado inicial do contador'
                },
                {
                    id: 'test-2',
                    input: 'incrementar',
                    expected: { count: 1 },
                    description: 'Incrementar o contador'
                },
                {
                    id: 'test-3',
                    input: 'decrementar',
                    expected: { count: -1 },
                    description: 'Decrementar o contador'
                }
            ],
            hints: [
                'Use useState para gerenciar o estado',
                'Crie funções para incrementar e decrementar',
                'Use onClick nos botões para chamar as funções'
            ],
            solution: `
import React, { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  const incrementar = () => {
    setCount(count + 1);
  };

  const decrementar = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
    </div>
  );
}

export default Contador;
      `,
            resources: [
                {
                    title: 'useState Hook',
                    url: 'https://react.dev/reference/react/useState',
                    type: 'documentation'
                },
                {
                    title: 'Eventos em React',
                    url: 'https://react.dev/learn/responding-to-events',
                    type: 'documentation'
                }
            ]
        }
    }
};

export async function GET(
    request: NextRequest,
    { params }: { params: { courseSlug: string; exerciseId: string } }
) {
    try {
        const { courseSlug, exerciseId } = params;

        const courseExercises = EXERCISE_DETAILS[courseSlug as keyof typeof EXERCISE_DETAILS];

        if (!courseExercises) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado'
            }, { status: 404 });
        }

        const exercise = courseExercises[exerciseId as keyof typeof courseExercises];

        if (!exercise) {
            return NextResponse.json({
                success: false,
                error: 'Exercício não encontrado'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            exercise: exercise
        });

    } catch (error) {
        console.error('Erro ao buscar detalhes do exercício:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { courseSlug: string; exerciseId: string } }
) {
    try {
        const { courseSlug, exerciseId } = params;
        const body = await request.json();
        const { code, language } = body;

        // Simular execução dos testes
        const testResults = [
            {
                testId: 'test-1',
                passed: Math.random() > 0.3, // Simular resultado aleatório
                output: 'Teste executado com sucesso',
                error: null,
                executionTime: Math.random() * 1000
            },
            {
                testId: 'test-2',
                passed: Math.random() > 0.3,
                output: 'Teste executado com sucesso',
                error: null,
                executionTime: Math.random() * 1000
            },
            {
                testId: 'test-3',
                passed: Math.random() > 0.3,
                output: 'Teste executado com sucesso',
                error: null,
                executionTime: Math.random() * 1000
            }
        ];

        const passedTests = testResults.filter(result => result.passed).length;
        const totalTests = testResults.length;
        const score = Math.round((passedTests / totalTests) * 100);

        return NextResponse.json({
            success: true,
            testResults: testResults,
            score: score,
            passed: passedTests,
            total: totalTests
        });

    } catch (error) {
        console.error('Erro ao executar exercício:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





