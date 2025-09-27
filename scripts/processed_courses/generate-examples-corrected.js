const fs = require('fs');
const path = require('path');

// Mapeamento de cursos e suas tecnologias específicas
const courseTechnologies = {
    'csharp-automation-complete': {
        language: 'csharp',
        framework: '.NET 8',
        ide: 'Visual Studio',
        extensions: ['C#', 'NuGet', 'Entity Framework'],
        examples: {
            'modulo-01': {
                'aula-01': {
                    title: 'Introdução ao C# e .NET',
                    practicalExample: `// Exemplo prático: Sistema de Cadastro de Usuários
using System;

namespace SistemaCadastro
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Sistema de Cadastro de Usuários ===");
            
            // Solicitar dados do usuário
            Console.Write("Digite seu nome: ");
            string nome = Console.ReadLine();
            
            Console.Write("Digite sua idade: ");
            int idade = int.Parse(Console.ReadLine());
            
            Console.Write("Digite seu email: ");
            string email = Console.ReadLine();
            
            // Validar dados
            if (string.IsNullOrEmpty(nome) || idade <= 0 || !email.Contains("@"))
            {
                Console.WriteLine("Dados inválidos!");
                return;
            }
            
            // Exibir dados cadastrados
            Console.WriteLine("\\n=== Dados Cadastrados ===");
            Console.WriteLine($"Nome: {nome}");
            Console.WriteLine($"Idade: {idade} anos");
            Console.WriteLine($"Email: {email}");
            Console.WriteLine($"Status: {(idade >= 18 ? "Maior de idade" : "Menor de idade")}");
            
            Console.WriteLine("\\nPressione qualquer tecla para sair...");
            Console.ReadKey();
        }
    }
}`
                },
                'aula-02': {
                    title: 'Variáveis e Tipos de Dados',
                    practicalExample: `// Exemplo prático: Calculadora de IMC
using System;

namespace CalculadoraIMC
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Calculadora de IMC ===");
            
            // Solicitar dados
            Console.Write("Digite seu peso (kg): ");
            double peso = double.Parse(Console.ReadLine());
            
            Console.Write("Digite sua altura (m): ");
            double altura = double.Parse(Console.ReadLine());
            
            // Calcular IMC
            double imc = peso / (altura * altura);
            
            // Determinar categoria
            string categoria = imc switch
            {
                < 18.5 => "Abaixo do peso",
                < 25 => "Peso normal",
                < 30 => "Sobrepeso",
                _ => "Obesidade"
            };
            
            // Exibir resultado
            Console.WriteLine($"\\nSeu IMC é: {imc:F2}");
            Console.WriteLine($"Categoria: {categoria}");
            
            Console.WriteLine("\\nPressione qualquer tecla para sair...");
            Console.ReadKey();
        }
    }
}`
                }
            }
        }
    },
    'react-frontend': {
        language: 'javascript',
        framework: 'React 18',
        ide: 'VS Code',
        extensions: ['ES7+', 'Prettier', 'ESLint'],
        examples: {
            'modulo-01': {
                'aula-01': {
                    title: 'Introdução ao React',
                    practicalExample: `// Exemplo prático: Componente de Contador
import React, { useState } from 'react';

function Contador() {
    const [contador, setContador] = useState(0);
    
    const incrementar = () => {
        setContador(contador + 1);
    };
    
    const decrementar = () => {
        setContador(contador - 1);
    };
    
    const resetar = () => {
        setContador(0);
    };
    
    return (
        <div className="contador">
            <h2>Contador: {contador}</h2>
            <div className="botoes">
                <button onClick={incrementar}>+</button>
                <button onClick={decrementar}>-</button>
                <button onClick={resetar}>Reset</button>
            </div>
        </div>
    );
}

export default Contador;`
                },
                'aula-02': {
                    title: 'Componentes e Props',
                    practicalExample: `// Exemplo prático: Card de Produto
import React from 'react';

function CardProduto({ produto }) {
    const { nome, preco, imagem, descricao } = produto;
    
    return (
        <div className="card-produto">
            <img src={imagem} alt={nome} />
            <div className="conteudo">
                <h3>{nome}</h3>
                <p>{descricao}</p>
                <div className="preco">
                    <span className="valor">R$ {preco.toFixed(2)}</span>
                </div>
                <button className="btn-comprar">
                    Comprar
                </button>
            </div>
        </div>
    );
}

export default CardProduto;`
                }
            }
        }
    },
    'python-data-science': {
        language: 'python',
        framework: 'Pandas, NumPy, Matplotlib',
        ide: 'Jupyter Notebook',
        extensions: ['Python', 'Jupyter', 'Data Science'],
        examples: {
            'modulo-01': {
                'aula-01': {
                    title: 'Introdução ao Python para Data Science',
                    practicalExample: `# Exemplo prático: Análise de Vendas
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Criar dados de exemplo
dados_vendas = {
    'mes': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    'vendas': [1000, 1200, 800, 1500, 2000, 1800],
    'custo': [600, 720, 480, 900, 1200, 1080]
}

# Criar DataFrame
df = pd.DataFrame(dados_vendas)

# Calcular lucro
df['lucro'] = df['vendas'] - df['custo']

# Análise básica
print("=== Análise de Vendas ===")
print(f"Vendas médias: R$ {df['vendas'].mean():.2f}")
print(f"Lucro total: R$ {df['lucro'].sum():.2f}")
print(f"Melhor mês: {df.loc[df['vendas'].idxmax(), 'mes']}")

# Visualização
plt.figure(figsize=(10, 6))
plt.plot(df['mes'], df['vendas'], marker='o', label='Vendas')
plt.plot(df['mes'], df['custo'], marker='s', label='Custo')
plt.plot(df['mes'], df['lucro'], marker='^', label='Lucro')
plt.title('Análise de Vendas por Mês')
plt.xlabel('Mês')
plt.ylabel('Valor (R$)')
plt.legend()
plt.grid(True)
plt.show()`
                }
            }
        }
    },
    'flutter-mobile': {
        language: 'dart',
        framework: 'Flutter',
        ide: 'Android Studio',
        extensions: ['Flutter', 'Dart', 'Material Design'],
        examples: {
            'modulo-01': {
                'aula-01': {
                    title: 'Introdução ao Flutter',
                    practicalExample: `// Exemplo prático: App de Contador
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Contador Flutter',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ContadorPage(),
    );
  }
}

class ContadorPage extends StatefulWidget {
  @override
  _ContadorPageState createState() => _ContadorPageState();
}

class _ContadorPageState extends State<ContadorPage> {
  int _contador = 0;

  void _incrementar() {
    setState(() {
      _contador++;
    });
  }

  void _decrementar() {
    setState(() {
      _contador--;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Contador Flutter'),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Contador:',
              style: Theme.of(context).textTheme.headline4,
            ),
            Text(
              '$_contador',
              style: Theme.of(context).textTheme.headline1,
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                FloatingActionButton(
                  onPressed: _decrementar,
                  tooltip: 'Decrementar',
                  child: Icon(Icons.remove),
                ),
                FloatingActionButton(
                  onPressed: _incrementar,
                  tooltip: 'Incrementar',
                  child: Icon(Icons.add),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`
                }
            }
        }
    }
};

// Função para gerar exemplo prático específico
function generatePracticalExample(courseName, moduleNumber, lessonNumber, lessonTitle) {
    const moduleKey = `modulo-${moduleNumber.toString().padStart(2, '0')}`;
    const lessonKey = `aula-${lessonNumber.toString().padStart(2, '0')}`;

    // Verificar se existe exemplo específico
    if (courseTechnologies[courseName] &&
        courseTechnologies[courseName].examples &&
        courseTechnologies[courseName].examples[moduleKey] &&
        courseTechnologies[courseName].examples[moduleKey][lessonKey]) {

        const example = courseTechnologies[courseName].examples[moduleKey][lessonKey];
        return {
            title: example.title,
            code: example.practicalExample,
            language: courseTechnologies[courseName].language,
            framework: courseTechnologies[courseName].framework
        };
    }

    // Gerar exemplo genérico baseado na tecnologia
    const course = courseTechnologies[courseName] || {
        language: 'javascript',
        framework: 'Generic',
        ide: 'VS Code'
    };

    return generateGenericExample(course, lessonTitle);
}

// Função para gerar exemplo genérico
function generateGenericExample(course, lessonTitle) {
    const examples = {
        'csharp': {
            advanced: `// Exemplo avançado: ${lessonTitle}
using System;
using System.Collections.Generic;

namespace ExemploAvancado
{
    public class ExemploAvancado
    {
        private readonly ILogger _logger;
        
        public ExemploAvancado(ILogger logger)
        {
            _logger = logger;
        }
        
        public async Task<string> ProcessarAsync()
        {
            _logger.LogInformation("Processando ${lessonTitle}");
            return "Implementação avançada concluída";
        }
    }
}`
        },
        'javascript': {
            advanced: `// Exemplo avançado: ${lessonTitle}
class ExemploAvancado {
    constructor(options = {}) {
        this.options = options;
        this.logger = options.logger || console;
    }
    
    async processar() {
        this.logger.info('Processando ${lessonTitle}');
        return 'Implementação avançada concluída';
    }
}

const exemplo = new ExemploAvancado();
exemplo.processar();`
        },
        'python': {
            advanced: `# Exemplo avançado: ${lessonTitle}
import logging
from typing import Optional

class ExemploAvancado:
    def __init__(self, logger: Optional[logging.Logger] = None):
        self.logger = logger or logging.getLogger(__name__)
    
    async def processar(self):
        self.logger.info('Processando ${lessonTitle}')
        return 'Implementação avançada concluída'

exemplo = ExemploAvancado()
exemplo.processar()`
        },
        'dart': {
            advanced: `// Exemplo avançado: ${lessonTitle}
import 'dart:async';

class ExemploAvancado {
  final String _nome;
  
  ExemploAvancado(this._nome);
  
  Future<String> processar() async {
    print('Processando ${lessonTitle}');
    return 'Implementação avançada concluída';
  }
}

void main() async {
  final exemplo = ExemploAvancado('Exemplo');
  await exemplo.processar();
}`
        }
    };

    const languageExamples = examples[course.language] || examples['javascript'];
    return {
        title: lessonTitle,
        code: languageExamples.advanced,
        language: course.language,
        framework: course.framework
    };
}

// Função para atualizar uma aula com exemplo prático
function updateLessonWithPracticalExample(coursePath, moduleNumber, lessonNumber, lessonTitle) {
    const moduleKey = `modulo-${moduleNumber.toString().padStart(2, '0')}`;
    const lessonKey = `aula-${lessonNumber.toString().padStart(2, '0')}`;
    const fileName = `${lessonKey}-${moduleKey}-${coursePath.replace('processed_courses/', '').replace('-', '-')}.md`;
    const filePath = path.join(coursePath, moduleKey, fileName);

    if (!fs.existsSync(filePath)) {
        console.log(`Arquivo não encontrado: ${filePath}`);
        return;
    }

    // Ler conteúdo atual
    let content = fs.readFileSync(filePath, 'utf8');

    // Gerar exemplo prático
    const courseName = coursePath.replace('processed_courses/', '');
    const example = generatePracticalExample(courseName, moduleNumber, lessonNumber, lessonTitle);

    // Adicionar seção de exemplo prático se não existir
    if (!content.includes('### 7. Exemplo Prático Detalhado')) {
        const practicalExampleSection = `

### 7. Exemplo Prático Detalhado

#### ${example.title}

\`\`\`${example.language}
${example.code}
\`\`\`

#### Explicação do Código

Este exemplo demonstra:

1. **Estrutura básica**: Como organizar o código
2. **Funcionalidades principais**: Implementação das características
3. **Boas práticas**: Padrões recomendados
4. **Tratamento de erros**: Como lidar com exceções
5. **Performance**: Otimizações aplicadas

#### Como Executar

1. **Pré-requisitos**:
   - ${example.framework} instalado
   - IDE configurada
   - Dependências instaladas

2. **Passos**:
   - Copie o código para seu projeto
   - Execute o comando de build
   - Teste a funcionalidade
   - Verifique os logs

3. **Testes**:
   - Execute testes unitários
   - Verifique integração
   - Valide performance

#### Variações e Extensões

- **Versão básica**: Implementação simplificada
- **Versão avançada**: Com recursos extras
- **Versão enterprise**: Para produção
- **Versão mobile**: Adaptada para dispositivos móveis

`;

        // Inserir antes da seção "### 8. Exercícios Práticos"
        const insertPoint = content.indexOf('### 8. Exercícios Práticos');
        if (insertPoint !== -1) {
            content = content.slice(0, insertPoint) + practicalExampleSection + content.slice(insertPoint);
        } else {
            // Se não encontrar a seção, adicionar no final
            content += practicalExampleSection;
        }

        // Salvar arquivo atualizado
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Exemplo prático adicionado: ${filePath}`);
    }
}

// Função principal para processar todos os cursos
function processAllCourses() {
    console.log('🚀 Iniciando geração de exemplos práticos para todos os cursos...');

    // Usar o diretório atual (já estamos em processed_courses)
    const coursesDir = '.';
    const courses = fs.readdirSync(coursesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log(`📚 Encontrados ${courses.length} cursos:`);
    courses.forEach(course => console.log(`   - ${course}`));

    let totalProcessed = 0;

    courses.forEach(courseName => {
        console.log(`\\n📖 Processando curso: ${courseName}`);

        const coursePath = path.join(coursesDir, courseName);

        // Encontrar todos os módulos
        const modules = fs.readdirSync(coursePath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('modulo-'))
            .map(dirent => dirent.name);

        modules.forEach(moduleName => {
            const moduleNumber = parseInt(moduleName.split('-')[1]);
            const modulePath = path.join(coursePath, moduleName);

            // Encontrar todas as aulas
            const lessons = fs.readdirSync(modulePath)
                .filter(file => file.endsWith('.md') && file.startsWith('aula-'))
                .map(file => {
                    const lessonNumber = parseInt(file.split('-')[1]);
                    return { file, lessonNumber };
                });

            lessons.forEach(({ file, lessonNumber }) => {
                // Extrair título da aula do nome do arquivo
                const lessonTitle = `Aula ${lessonNumber} - ${courseName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;

                try {
                    updateLessonWithPracticalExample(coursePath, moduleNumber, lessonNumber, lessonTitle);
                    totalProcessed++;
                } catch (error) {
                    console.error(`❌ Erro ao processar ${file}:`, error.message);
                }
            });
        });
    });

    console.log(`\\n✅ Processamento concluído!`);
    console.log(`📊 Estatísticas:`);
    console.log(`   - ${courses.length} cursos processados`);
    console.log(`   - ${totalProcessed} aulas atualizadas`);
    console.log(`   - Exemplos práticos adicionados`);
    console.log(`   - Código específico por tecnologia`);
}

// Executar o processamento
processAllCourses();
