import { NextRequest, NextResponse } from 'next/server';

// Dados mockados dos exercícios
const COURSE_EXERCISES = {
    'python-data-science': [
        {
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
                    input: { num1: 10, num2: 5, operacao: '+' },
                    expected: 15
                },
                {
                    input: { num1: 10, num2: 5, operacao: '-' },
                    expected: 5
                },
                {
                    input: { num1: 10, num2: 5, operacao: '*' },
                    expected: 50
                },
                {
                    input: { num1: 10, num2: 5, operacao: '/' },
                    expected: 2.0
                }
            ],
            hints: [
                'Use if/elif para verificar a operação',
                'Lembre-se de tratar divisão por zero',
                'Retorne o resultado da operação'
            ]
        },
        {
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
                    input: { lista: [1, 2, 3, 4, 5] },
                    expected: { soma: 15, media: 3.0, maior: 5, menor: 1 }
                },
                {
                    input: { lista: [10, 20, 30] },
                    expected: { soma: 60, media: 20.0, maior: 30, menor: 10 }
                }
            ],
            hints: [
                'Use sum() para somar a lista',
                'Divida a soma pelo comprimento para a média',
                'Use max() e min() para maior e menor'
            ]
        },
        {
            id: 'ex-3',
            title: 'Manipulação de DataFrame',
            description: 'Use Pandas para analisar dados de vendas',
            difficulty: 'hard',
            estimatedTime: '60 minutos',
            points: 30,
            category: 'pandas',
            module: 'modulo-2',
            level: 'intermediario',
            instructions: `
# Análise de Dados de Vendas

Use Pandas para analisar dados de vendas e responder perguntas específicas.

## Dados:
\`\`\`csv
produto,vendedor,quantidade,preco_unitario,data
Notebook,João,2,2500.00,2024-01-15
Mouse,Ana,5,50.00,2024-01-15
Teclado,João,3,150.00,2024-01-16
Monitor,Ana,1,800.00,2024-01-16
\`\`\`

## Tarefas:
1. Calcular o valor total de cada venda
2. Encontrar o vendedor com maior faturamento
3. Calcular a média de vendas por dia
4. Criar um gráfico de vendas por produto
      `,
            testCases: [
                {
                    input: 'dados_vendas.csv',
                    expected: {
                        total_vendas: 4,
                        vendedor_maior_faturamento: 'João',
                        media_diaria: 2.0
                    }
                }
            ],
            hints: [
                'Use pd.read_csv() para carregar os dados',
                'Crie uma coluna de valor total multiplicando quantidade * preço',
                'Use groupby() para agrupar por vendedor',
                'Use plot() para criar gráficos'
            ]
        }
    ],
    'web-development': [
        {
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
                    input: 'inicial',
                    expected: { count: 0 }
                },
                {
                    input: 'incrementar',
                    expected: { count: 1 }
                },
                {
                    input: 'decrementar',
                    expected: { count: -1 }
                }
            ],
            hints: [
                'Use useState para gerenciar o estado',
                'Crie funções para incrementar e decrementar',
                'Use onClick nos botões para chamar as funções'
            ]
        }
    ]
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
        const category = searchParams.get('category');
        const difficulty = searchParams.get('difficulty');

        const exercises = COURSE_EXERCISES[slug as keyof typeof COURSE_EXERCISES] || [];

        let filteredExercises = exercises;

        // Filtrar por nível se especificado
        if (level) {
            filteredExercises = filteredExercises.filter(exercise =>
                exercise.level.toLowerCase() === level.toLowerCase()
            );
        }

        // Filtrar por módulo se especificado
        if (module) {
            filteredExercises = filteredExercises.filter(exercise =>
                exercise.module === module
            );
        }

        // Filtrar por categoria se especificado
        if (category) {
            filteredExercises = filteredExercises.filter(exercise =>
                exercise.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filtrar por dificuldade se especificado
        if (difficulty) {
            filteredExercises = filteredExercises.filter(exercise =>
                exercise.difficulty.toLowerCase() === difficulty.toLowerCase()
            );
        }

        return NextResponse.json({
            success: true,
            exercises: filteredExercises,
            total: filteredExercises.length
        });

    } catch (error) {
        console.error('Erro ao buscar exercícios do curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





