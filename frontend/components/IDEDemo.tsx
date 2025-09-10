'use client';

import React, { useState } from 'react';
import { Play, Code, BookOpen, Users, Star, ArrowRight } from 'lucide-react';

const IDEDemo: React.FC = () => {
    const [activeDemo, setActiveDemo] = useState<'web' | 'python' | 'javascript'>('web');

    const demos = {
        web: {
            title: 'Desenvolvimento Web',
            description: 'HTML, CSS e JavaScript com IntelliSense completo',
            features: [
                'Template HTML5 com ! + Tab',
                'Sugestões de tags HTML',
                'Autocompletar CSS',
                'IntelliSense JavaScript',
                'Live Preview integrado'
            ],
            code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Fenix Academy</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bem-vindo ao Fenix Academy!</h1>
        <p>Digite ! e pressione Tab para ver o template HTML5</p>
        <button onclick="showMessage()">Clique aqui</button>
    </div>
    <script>
        function showMessage() {
            alert('IntelliSense funcionando perfeitamente!');
        }
    </script>
</body>
</html>`
        },
        python: {
            title: 'Python',
            description: 'Programação Python com sugestões inteligentes',
            features: [
                'Sugestões de funções Python',
                'Autocompletar classes e métodos',
                'IntelliSense para bibliotecas',
                'Snippets de estruturas de controle',
                'Syntax highlighting avançado'
            ],
            code: `# Fenix Academy - Curso Python
print("Bem-vindo ao Fenix Academy!")

def saudacao(nome):
    """Função para saudar o usuário"""
    return f"Olá, {nome}! Bem-vindo ao curso de Python."

def calcular_idade(ano_nascimento):
    """Calcula a idade baseada no ano de nascimento"""
    from datetime import datetime
    ano_atual = datetime.now().year
    return ano_atual - ano_nascimento

def main():
    nome = input("Digite seu nome: ")
    print(saudacao(nome))
    
    try:
        ano = int(input("Digite seu ano de nascimento: "))
        idade = calcular_idade(ano)
        print(f"Você tem {idade} anos.")
    except ValueError:
        print("Por favor, digite um ano válido.")

if __name__ == "__main__":
    main()`
        },
        javascript: {
            title: 'JavaScript Avançado',
            description: 'ES6+, Node.js e recursos modernos',
            features: [
                'Sugestões ES6+ (arrow functions, destructuring)',
                'IntelliSense para Node.js',
                'Autocompletar async/await',
                'Snippets de Promises',
                'Sugestões de métodos de array'
            ],
            code: `// Fenix Academy - JavaScript Avançado
console.log('Fenix Academy - Curso JavaScript carregado!');

// Classes ES6
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    
    apresentar() {
        return \`Olá, eu sou \${this.nome} e tenho \${this.idade} anos.\`;
    }
}

// Arrow Functions
const somar = (a, b) => a + b;
const multiplicar = (a, b) => a * b;

// Async/Await
async function buscarDados() {
    try {
        const response = await fetch('https://api.exemplo.com/dados');
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

// Função principal
async function main() {
    const pessoa = new Pessoa('João', 25);
    console.log(pessoa.apresentar());
    
    console.log('Soma:', somar(5, 3));
    console.log('Multiplicação:', multiplicar(4, 7));
    
    const dados = await buscarDados();
    console.log('Dados:', dados);
}

// Executar função principal
main();`
        }
    };

    return (
        <div className="ide-demo">
            <div className="demo-header">
                <h2>Fenix IDE em Ação</h2>
                <p>Veja como o IntelliSense funciona em diferentes linguagens</p>
            </div>

            <div className="demo-tabs">
                {Object.entries(demos).map(([key, demo]) => (
                    <button
                        key={key}
                        className={`demo-tab ${activeDemo === key ? 'active' : ''}`}
                        onClick={() => setActiveDemo(key as any)}
                    >
                        <Code size={16} />
                        {demo.title}
                    </button>
                ))}
            </div>

            <div className="demo-content">
                <div className="demo-info">
                    <h3>{demos[activeDemo].title}</h3>
                    <p>{demos[activeDemo].description}</p>

                    <div className="features-list">
                        <h4>Recursos do IntelliSense:</h4>
                        <ul>
                            {demos[activeDemo].features.map((feature, index) => (
                                <li key={index}>
                                    <Star size={14} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="demo-code">
                    <div className="code-header">
                        <span>Exemplo de código com IntelliSense</span>
                    </div>
                    <pre className="code-content">
                        <code>{demos[activeDemo].code}</code>
                    </pre>
                </div>
            </div>

            <div className="demo-cta">
                <a href="/ide-simple" className="cta-button">
                    <Play size={16} />
                    Experimentar a IDE
                    <ArrowRight size={16} />
                </a>
            </div>

            <style jsx>{`
                .ide-demo {
                    background: #0d1117;
                    padding: 60px 20px;
                    color: white;
                }

                .demo-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .demo-header h2 {
                    font-size: 2.5rem;
                    margin: 0 0 10px 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .demo-header p {
                    font-size: 1.1rem;
                    color: #8b949e;
                    margin: 0;
                }

                .demo-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 40px;
                }

                .demo-tab {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    border: 2px solid #30363d;
                    background: #21262d;
                    color: #8b949e;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .demo-tab:hover {
                    border-color: #58a6ff;
                    color: #58a6ff;
                }

                .demo-tab.active {
                    border-color: #667eea;
                    background: #667eea;
                    color: white;
                }

                .demo-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    margin-bottom: 40px;
                }

                .demo-info h3 {
                    font-size: 1.8rem;
                    margin: 0 0 15px 0;
                    color: #58a6ff;
                }

                .demo-info p {
                    font-size: 1.1rem;
                    color: #8b949e;
                    margin: 0 0 30px 0;
                    line-height: 1.6;
                }

                .features-list h4 {
                    font-size: 1.2rem;
                    margin: 0 0 15px 0;
                    color: #ffffff;
                }

                .features-list ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .features-list li {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 0;
                    color: #8b949e;
                }

                .features-list li svg {
                    color: #fbbf24;
                }

                .demo-code {
                    background: #161b22;
                    border: 1px solid #30363d;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .code-header {
                    background: #21262d;
                    padding: 12px 20px;
                    border-bottom: 1px solid #30363d;
                    font-size: 0.9rem;
                    color: #8b949e;
                }

                .code-content {
                    padding: 20px;
                    margin: 0;
                    overflow-x: auto;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    color: #e6edf3;
                }

                .code-content code {
                    background: none;
                    padding: 0;
                }

                .demo-cta {
                    text-align: center;
                }

                .cta-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 32px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                }

                @media (max-width: 768px) {
                    .demo-content {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }
                    
                    .demo-tabs {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .demo-tab {
                        width: 200px;
                    }
                }
            `}</style>
        </div>
    );
};

export default IDEDemo;







