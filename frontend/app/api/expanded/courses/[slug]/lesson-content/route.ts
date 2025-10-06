'use client';

import { NextRequest, NextResponse } from 'next/server';

// Dados mockados do conteúdo das aulas
const LESSON_CONTENT = {
    'python-data-science': {
        'modulo-1': {
            'aula-1': {
                content: `
# Introdução ao Python

## O que é Python?

Python é uma linguagem de programação de alto nível, interpretada e de propósito geral. Foi criada por Guido van Rossum e lançada pela primeira vez em 1991.

## Características do Python

- **Simples e legível**: A sintaxe do Python é clara e intuitiva
- **Multiplataforma**: Funciona em Windows, Mac e Linux
- **Interpretada**: Não precisa ser compilada antes da execução
- **Orientada a objetos**: Suporta programação orientada a objetos
- **Extensível**: Pode ser integrada com outras linguagens

## Instalação do Python

Para instalar o Python, visite [python.org](https://python.org) e baixe a versão mais recente.

## Primeiro programa

Vamos criar nosso primeiro programa em Python:

\`\`\`python
print("Olá, mundo!")
\`\`\`

## Exercícios

1. Crie um programa que imprima seu nome
2. Crie um programa que imprima "Python é incrível!"
3. Crie um programa que imprima os números de 1 a 5

## Próximos passos

Na próxima aula, aprenderemos sobre variáveis e tipos de dados em Python.
        `,
                exercises: [
                    {
                        id: 'ex-1',
                        title: 'Imprimir nome',
                        description: 'Crie um programa que imprima seu nome completo',
                        solution: 'print("Seu Nome Completo")',
                        difficulty: 'easy'
                    },
                    {
                        id: 'ex-2',
                        title: 'Mensagem motivacional',
                        description: 'Crie um programa que imprima uma mensagem motivacional sobre Python',
                        solution: 'print("Python é incrível!")',
                        difficulty: 'easy'
                    }
                ],
                quiz: {
                    id: 'quiz-1',
                    questions: [
                        {
                            id: 'q1',
                            question: 'Quem criou o Python?',
                            options: ['Guido van Rossum', 'Linus Torvalds', 'Mark Zuckerberg', 'Bill Gates'],
                            correct: 0,
                            explanation: 'Guido van Rossum criou o Python em 1991.'
                        },
                        {
                            id: 'q2',
                            question: 'Python é uma linguagem compilada?',
                            options: ['Sim', 'Não'],
                            correct: 1,
                            explanation: 'Python é uma linguagem interpretada, não compilada.'
                        }
                    ]
                }
            }
        }
    },
    'web-development': {
        'modulo-1': {
            'aula-1': {
                content: `
# Introdução ao React

## O que é React?

React é uma biblioteca JavaScript para construir interfaces de usuário, especialmente para aplicações de página única. Foi criada pelo Facebook e é mantida pela comunidade.

## Características do React

- **Componentes**: Interface baseada em componentes reutilizáveis
- **Virtual DOM**: Renderização eficiente através do Virtual DOM
- **JSX**: Sintaxe que permite escrever HTML dentro do JavaScript
- **Unidirecional**: Fluxo de dados unidirecional
- **Ecosistema rico**: Grande quantidade de bibliotecas e ferramentas

## Instalação do React

Para criar um novo projeto React, use o Create React App:

\`\`\`bash
npx create-react-app meu-app
cd meu-app
npm start
\`\`\`

## Primeiro componente

Vamos criar nosso primeiro componente React:

\`\`\`jsx
import React from 'react';

function App() {
  return (
    <div>
      <h1>Olá, React!</h1>
    </div>
  );
}

export default App;
\`\`\`

## Exercícios

1. Crie um componente que exiba seu nome
2. Crie um componente que exiba uma lista de hobbies
3. Crie um componente que exiba informações sobre React

## Próximos passos

Na próxima aula, aprenderemos sobre componentes e props em React.
        `,
                exercises: [
                    {
                        id: 'ex-1',
                        title: 'Componente de apresentação',
                        description: 'Crie um componente que exiba seu nome e uma breve apresentação',
                        solution: `
function Apresentacao() {
  return (
    <div>
      <h1>Meu Nome</h1>
      <p>Uma breve apresentação sobre mim</p>
    </div>
  );
}`,
                        difficulty: 'easy'
                    }
                ],
                quiz: {
                    id: 'quiz-1',
                    questions: [
                        {
                            id: 'q1',
                            question: 'Quem criou o React?',
                            options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
                            correct: 1,
                            explanation: 'React foi criado pelo Facebook (agora Meta).'
                        },
                        {
                            id: 'q2',
                            question: 'React é uma biblioteca ou framework?',
                            options: ['Biblioteca', 'Framework'],
                            correct: 0,
                            explanation: 'React é uma biblioteca, não um framework completo.'
                        }
                    ]
                }
            }
        }
    }
};

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        const { searchParams } = new URL(request.url);
        const level = searchParams.get('level');
        const module = searchParams.get('module');
        const lesson = searchParams.get('lesson');

        if (!level || !module || !lesson) {
            return NextResponse.json({
                success: false,
                error: 'Parâmetros level, module e lesson são obrigatórios'
            }, { status: 400 });
        }

        const courseContent = LESSON_CONTENT[slug as keyof typeof LESSON_CONTENT];

        if (!courseContent) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado'
            }, { status: 404 });
        }

        const moduleContent = courseContent[module as keyof typeof courseContent];

        if (!moduleContent) {
            return NextResponse.json({
                success: false,
                error: 'Módulo não encontrado'
            }, { status: 404 });
        }

        const lessonContent = moduleContent[lesson as keyof typeof moduleContent];

        if (!lessonContent) {
            return NextResponse.json({
                success: false,
                error: 'Aula não encontrada'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            content: lessonContent
        });

    } catch (error) {
        console.error('Erro ao buscar conteúdo da aula:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





