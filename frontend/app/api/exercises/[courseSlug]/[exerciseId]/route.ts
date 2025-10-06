'use client';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { courseSlug: string; exerciseId: string } }
) {
    try {
        const { courseSlug, exerciseId } = params;

        // Mock data para o exercício
        const exercise = {
            id: exerciseId,
            title: 'Criar um Componente React Simples',
            description: 'Crie um componente React que exiba uma mensagem de boas-vindas personalizada.',
            instructions: `
# Exercício: Componente React Simples

## Objetivo
Crie um componente React funcional que exiba uma mensagem de boas-vindas personalizada.

## Requisitos
1. O componente deve aceitar uma prop \`name\` (string)
2. O componente deve exibir "Olá, [nome]! Bem-vindo ao React!"
3. Se nenhum nome for fornecido, deve exibir "Olá, Visitante! Bem-vindo ao React!"
4. O componente deve ser exportado como default

## Exemplo de Uso
\`\`\`jsx
<Welcome name="João" />
// Deve exibir: "Olá, João! Bem-vindo ao React!"

<Welcome />
// Deve exibir: "Olá, Visitante! Bem-vindo ao React!"
\`\`\`

## Dicas
- Use props para receber o nome
- Use JSX para renderizar a mensagem
- Lembre-se de exportar o componente como default
- Use valores padrão para props quando necessário

## Testes
O exercício será testado com diferentes valores de props para verificar se o componente funciona corretamente.
      `,
            starterCode: `import React from 'react';

// Crie seu componente aqui
function Welcome() {
  return (
    <div>
      {/* Seu código aqui */}
    </div>
  );
}

export default Welcome;`,
            solution: `import React from 'react';

function Welcome({ name = 'Visitante' }) {
  return (
    <div>
      <h1>Olá, {name}! Bem-vindo ao React!</h1>
    </div>
  );
}

export default Welcome;`,

            tests: [
                {
                    id: 'test-1',
                    name: 'Teste com nome específico',
                    description: 'Deve exibir a mensagem com o nome fornecido',
                    input: 'name="João"',
                    expectedOutput: 'Olá, João! Bem-vindo ao React!',
                    isPassing: false
                },
                {
                    id: 'test-2',
                    name: 'Teste sem nome',
                    description: 'Deve exibir a mensagem padrão quando nenhum nome for fornecido',
                    input: 'sem props',
                    expectedOutput: 'Olá, Visitante! Bem-vindo ao React!',
                    isPassing: false
                },
                {
                    id: 'test-3',
                    name: 'Teste com nome vazio',
                    description: 'Deve exibir a mensagem padrão quando nome for vazio',
                    input: 'name=""',
                    expectedOutput: 'Olá, Visitante! Bem-vindo ao React!',
                    isPassing: false
                }
            ],
            hints: [
                {
                    id: 'hint-1',
                    text: 'Use destructuring para receber a prop name: function Welcome({ name })',
                    isUnlocked: false,
                    cost: 5
                },
                {
                    id: 'hint-2',
                    text: 'Use valores padrão para props: function Welcome({ name = "Visitante" })',
                    isUnlocked: false,
                    cost: 10
                },
                {
                    id: 'hint-3',
                    text: 'Use interpolação JSX para exibir o nome: <h1>Olá, {name}!</h1>',
                    isUnlocked: false,
                    cost: 15
                }
            ],
            difficulty: 'easy',
            points: 50,
            timeLimit: 30,
            language: 'javascript',
            isCompleted: false,
            attempts: 0,
            maxAttempts: 5,
            bestScore: 0,
            tags: ['react', 'jsx', 'props', 'components']
        };

        return NextResponse.json({
            success: true,
            exercise: exercise
        });

    } catch (error) {
        console.error('Erro ao buscar exercício:', error);
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
                output: 'Olá, João! Bem-vindo ao React!',
                error: null,
                executionTime: Math.random() * 1000
            },
            {
                testId: 'test-2',
                passed: Math.random() > 0.3,
                output: 'Olá, Visitante! Bem-vindo ao React!',
                error: null,
                executionTime: Math.random() * 1000
            },
            {
                testId: 'test-3',
                passed: Math.random() > 0.3,
                output: 'Olá, Visitante! Bem-vindo ao React!',
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








