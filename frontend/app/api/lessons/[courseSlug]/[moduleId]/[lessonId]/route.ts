import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { courseSlug: string; moduleId: string; lessonId: string } }
) {
  try {
    const { courseSlug, moduleId, lessonId } = params;

    // Mock data para a aula
    const lesson = {
      id: lessonId,
      title: 'Introdução ao React - Fundamentos e Conceitos',
      description: 'Aprenda os conceitos fundamentais do React, incluindo componentes, JSX, props e estado.',
      content: `
# Introdução ao React

## O que é React?

React é uma biblioteca JavaScript para construir interfaces de usuário, especialmente para aplicações de página única. Foi criada pelo Facebook e é mantida pela comunidade.

## Principais Conceitos

### 1. Componentes
Os componentes são os blocos de construção de uma aplicação React. Eles são como funções JavaScript que aceitam entradas (chamadas "props") e retornam elementos React que descrevem como a seção da UI deve aparecer.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### 2. JSX
JSX é uma extensão de sintaxe para JavaScript que permite escrever HTML dentro do JavaScript. É uma forma mais intuitiva de descrever a estrutura da UI.

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

### 3. Props
Props (propriedades) são argumentos passados para componentes React. Elas são imutáveis e permitem que os componentes sejam reutilizáveis.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Uso do componente
<Welcome name="Sara" />
\`\`\`

### 4. Estado
O estado é um objeto que contém dados que podem mudar ao longo do tempo. Quando o estado muda, o componente é re-renderizado.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Vantagens do React

- **Reutilização de Componentes**: Crie componentes reutilizáveis
- **Virtual DOM**: Melhor performance
- **Ecosystem Rico**: Muitas bibliotecas e ferramentas
- **Comunidade Ativa**: Suporte da comunidade
- **Flexibilidade**: Pode ser usado em diferentes projetos

## Próximos Passos

Na próxima aula, vamos aprender sobre:
- Configuração do ambiente de desenvolvimento
- Criação do primeiro projeto React
- Estrutura de pastas e arquivos
- Comandos básicos do npm

## Exercícios Práticos

1. **Criar um componente simples**: Crie um componente que exiba seu nome
2. **Props dinâmicas**: Crie um componente que aceite props diferentes
3. **Estado básico**: Implemente um contador simples

## Recursos Adicionais

- [Documentação oficial do React](https://reactjs.org/docs)
- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
      `,
      videoUrl: 'https://example.com/video1.mp4',
      duration: '45 min',
      type: 'video',
      transcript: `
[00:00:00] Olá, bem-vindos à primeira aula do curso de React Avançado. Meu nome é João Silva e hoje vamos aprender os fundamentos do React.

[00:00:15] React é uma biblioteca JavaScript criada pelo Facebook para construir interfaces de usuário. É uma das tecnologias mais populares para desenvolvimento frontend.

[00:00:30] Vamos começar entendendo o que são componentes. Componentes são como blocos de construção que você pode reutilizar em sua aplicação.

[00:00:45] JSX é uma extensão de sintaxe que permite escrever HTML dentro do JavaScript. Isso torna o código mais legível e intuitivo.

[00:01:00] Props são argumentos que passamos para componentes, tornando-os reutilizáveis e flexíveis.

[00:01:15] O estado é um objeto que contém dados que podem mudar ao longo do tempo. Quando o estado muda, o componente é re-renderizado automaticamente.

[00:01:30] Esses são os conceitos fundamentais do React. Na próxima aula, vamos colocar isso em prática criando nosso primeiro projeto.
      `,
      subtitles: [
        { id: '1', startTime: 0, endTime: 15, text: 'Olá, bem-vindos à primeira aula do curso de React Avançado.', language: 'pt' },
        { id: '2', startTime: 15, endTime: 30, text: 'React é uma biblioteca JavaScript criada pelo Facebook.', language: 'pt' },
        { id: '3', startTime: 30, endTime: 45, text: 'Vamos começar entendendo o que são componentes.', language: 'pt' },
        { id: '4', startTime: 45, endTime: 60, text: 'JSX é uma extensão de sintaxe que permite escrever HTML dentro do JavaScript.', language: 'pt' },
        { id: '5', startTime: 60, endTime: 75, text: 'Props são argumentos que passamos para componentes.', language: 'pt' },
        { id: '6', startTime: 75, endTime: 90, text: 'O estado é um objeto que contém dados que podem mudar.', language: 'pt' }
      ],
      resources: [
        { id: '1', title: 'Slides da Aula', type: 'pdf', url: '/resources/slides-1.pdf', size: '2.5 MB', description: 'Apresentação completa da aula' },
        { id: '2', title: 'Código Fonte', type: 'zip', url: '/resources/code-1.zip', size: '1.2 MB', description: 'Exemplos de código da aula' },
        { id: '3', title: 'Documentação React', type: 'link', url: 'https://reactjs.org/docs', description: 'Documentação oficial do React' },
        { id: '4', title: 'React Tutorial', type: 'link', url: 'https://reactjs.org/tutorial', description: 'Tutorial interativo do React' }
      ],
      exercises: [
        { id: '1', title: 'Criar Componente Simples', description: 'Crie um componente que exiba seu nome', type: 'coding', difficulty: 'easy', points: 10, isCompleted: false },
        { id: '2', title: 'Props Dinâmicas', description: 'Crie um componente que aceite props diferentes', type: 'coding', difficulty: 'medium', points: 20, isCompleted: false },
        { id: '3', title: 'Estado Básico', description: 'Implemente um contador simples', type: 'coding', difficulty: 'medium', points: 25, isCompleted: false }
      ],
      isCompleted: false,
      isLocked: false,
      order: 1,
      moduleId: moduleId,
      courseId: courseSlug
    };

    return NextResponse.json({
      success: true,
      lesson: lesson
    });

  } catch (error) {
    console.error('Erro ao buscar aula:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}