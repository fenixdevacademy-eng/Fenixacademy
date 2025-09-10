'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Code,
    ChevronDown,
    ChevronRight,
    Play,
    BookOpen,
    Lightbulb,
    Zap,
    Database,
    Globe,
    Cpu,
    BarChart3,
    Brain,
    FileText
} from 'lucide-react';

interface PythonSuggestion {
    id: string;
    title: string;
    description: string;
    category: 'function' | 'class' | 'module' | 'variable' | 'keyword' | 'snippet';
    code: string;
    documentation?: string;
    examples?: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    icon: React.ReactNode;
}

interface PythonIntelliSenseProps {
    isVisible: boolean;
    onSuggestionSelect: (suggestion: PythonSuggestion) => void;
    currentLine: string;
    cursorPosition: number;
}

const PythonIntelliSense: React.FC<PythonIntelliSenseProps> = ({
    isVisible,
    onSuggestionSelect,
    currentLine,
    cursorPosition
}) => {
    const [suggestions, setSuggestions] = useState<PythonSuggestion[]>([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState<PythonSuggestion[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['all']));
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showDocumentation, setShowDocumentation] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<PythonSuggestion | null>(null);

    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Base de dados completa de sugestões Python
    const pythonSuggestions: PythonSuggestion[] = [
        // Data Science e Análise
        {
            id: 'pandas-import',
            title: 'Importar Pandas',
            description: 'Importa a biblioteca pandas para análise de dados',
            category: 'snippet',
            code: 'import pandas as pd\nimport numpy as np',
            documentation: 'Pandas é a biblioteca mais popular para manipulação e análise de dados em Python.',
            examples: [
                'df = pd.read_csv("dados.csv")',
                'df.head()',
                'df.describe()'
            ],
            difficulty: 'beginner',
            tags: ['pandas', 'data-science', 'import'],
            icon: <Database className="w-4 h-4" />
        },
        {
            id: 'dataframe-create',
            title: 'Criar DataFrame',
            description: 'Cria um DataFrame do pandas com dados',
            category: 'snippet',
            code: 'df = pd.DataFrame({\n    "coluna1": [1, 2, 3, 4, 5],\n    "coluna2": ["A", "B", "C", "D", "E"],\n    "coluna3": [10.5, 20.3, 30.1, 40.7, 50.9]\n})',
            documentation: 'DataFrame é a estrutura de dados principal do pandas, similar a uma tabela.',
            examples: [
                'df = pd.DataFrame(dados)',
                'df = pd.DataFrame.from_dict(dict)',
                'df = pd.DataFrame.from_records(records)'
            ],
            difficulty: 'beginner',
            tags: ['pandas', 'dataframe', 'data-science'],
            icon: <Database className="w-4 h-4" />
        },
        {
            id: 'matplotlib-plot',
            title: 'Gráfico com Matplotlib',
            description: 'Cria um gráfico básico com matplotlib',
            category: 'snippet',
            code: 'import matplotlib.pyplot as plt\n\nplt.figure(figsize=(10, 6))\nplt.plot(x, y, label="Dados")\nplt.xlabel("Eixo X")\nplt.ylabel("Eixo Y")\nplt.title("Título do Gráfico")\nplt.legend()\nplt.grid(True)\nplt.show()',
            documentation: 'Matplotlib é a biblioteca padrão para visualização de dados em Python.',
            examples: [
                'plt.scatter(x, y)',
                'plt.bar(categories, values)',
                'plt.hist(data, bins=30)'
            ],
            difficulty: 'beginner',
            tags: ['matplotlib', 'plotting', 'visualization'],
            icon: <BarChart3 className="w-4 h-4" />
        },
        {
            id: 'seaborn-plot',
            title: 'Gráfico com Seaborn',
            description: 'Cria gráficos estatísticos com seaborn',
            category: 'snippet',
            code: 'import seaborn as sns\nimport matplotlib.pyplot as plt\n\nsns.set_style("whitegrid")\nplt.figure(figsize=(10, 6))\nsns.scatterplot(data=df, x="coluna1", y="coluna2", hue="categoria")\nplt.title("Gráfico com Seaborn")\nplt.show()',
            documentation: 'Seaborn é uma biblioteca de visualização baseada em matplotlib com interface mais simples.',
            examples: [
                'sns.lineplot(data=df, x="x", y="y")',
                'sns.barplot(data=df, x="categoria", y="valor")',
                'sns.heatmap(correlation_matrix)'
            ],
            difficulty: 'intermediate',
            tags: ['seaborn', 'statistics', 'visualization'],
            icon: <BarChart3 className="w-4 h-4" />
        },

        // Machine Learning
        {
            id: 'sklearn-import',
            title: 'Importar Scikit-learn',
            description: 'Importa bibliotecas essenciais do scikit-learn',
            category: 'snippet',
            code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\nfrom sklearn.preprocessing import StandardScaler',
            documentation: 'Scikit-learn é a biblioteca mais popular para machine learning em Python.',
            examples: [
                'from sklearn.ensemble import RandomForestClassifier',
                'from sklearn.cluster import KMeans',
                'from sklearn.decomposition import PCA'
            ],
            difficulty: 'intermediate',
            tags: ['sklearn', 'machine-learning', 'import'],
            icon: <Brain className="w-4 h-4" />
        },
        {
            id: 'train-test-split',
            title: 'Divisão Treino/Teste',
            description: 'Divide dados em conjuntos de treino e teste',
            category: 'snippet',
            code: 'X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)',
            documentation: 'Divisão dos dados é essencial para avaliar o desempenho do modelo.',
            examples: [
                'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)',
                'X_train, X_val, X_test, y_train, y_val, y_test = train_test_split(X, y, test_size=0.2, validation_size=0.2)'
            ],
            difficulty: 'beginner',
            tags: ['sklearn', 'train-test-split', 'machine-learning'],
            icon: <Brain className="w-4 h-4" />
        },
        {
            id: 'linear-regression',
            title: 'Regressão Linear',
            description: 'Implementa regressão linear com scikit-learn',
            category: 'snippet',
            code: 'from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\n\n# Criar e treinar modelo\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Fazer previsões\npredictions = model.predict(X_test)\n\n# Avaliar modelo\nmse = mean_squared_error(y_test, predictions)\nr2 = r2_score(y_test, predictions)\nprint(f"MSE: {mse:.2f}")\nprint(f"R²: {r2:.2f}")',
            documentation: 'Regressão linear é um algoritmo fundamental para problemas de regressão.',
            examples: [
                'model = LinearRegression(fit_intercept=True)',
                'model = LinearRegression(normalize=True)'
            ],
            difficulty: 'beginner',
            tags: ['sklearn', 'linear-regression', 'machine-learning'],
            icon: <Brain className="w-4 h-4" />
        },

        // Web Development
        {
            id: 'flask-app',
            title: 'Aplicação Flask Básica',
            description: 'Cria uma aplicação web básica com Flask',
            category: 'snippet',
            code: 'from flask import Flask, render_template, request, jsonify\n\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return render_template("index.html")\n\n@app.route("/api/data")\ndef get_data():\n    return jsonify({"message": "Hello from Flask!"})\n\nif __name__ == "__main__":\n    app.run(debug=True)',
            documentation: 'Flask é um framework web leve e flexível para Python.',
            examples: [
                'app = Flask(__name__, template_folder="templates")',
                'app.run(host="0.0.0.0", port=5000)'
            ],
            difficulty: 'intermediate',
            tags: ['flask', 'web', 'api'],
            icon: <Globe className="w-4 h-4" />
        },
        {
            id: 'requests-api',
            title: 'Fazer Requisições HTTP',
            description: 'Faz requisições HTTP com a biblioteca requests',
            category: 'snippet',
            code: 'import requests\nimport json\n\n# GET request\nresponse = requests.get("https://api.exemplo.com/dados")\ndata = response.json()\n\n# POST request\npayload = {"chave": "valor"}\nresponse = requests.post("https://api.exemplo.com/enviar", json=payload)\n\n# Com headers\nheaders = {"Authorization": "Bearer token"}\nresponse = requests.get("https://api.exemplo.com/protegido", headers=headers)',
            documentation: 'Requests é a biblioteca padrão para fazer requisições HTTP em Python.',
            examples: [
                'response = requests.get(url, params={"param": "value"})',
                'response = requests.post(url, data=form_data)',
                'response = requests.put(url, json=json_data)'
            ],
            difficulty: 'beginner',
            tags: ['requests', 'http', 'api'],
            icon: <Globe className="w-4 h-4" />
        },

        // Data Processing
        {
            id: 'csv-read-write',
            title: 'Ler e Escrever CSV',
            description: 'Operações básicas com arquivos CSV',
            category: 'snippet',
            code: 'import pandas as pd\n\n# Ler CSV\ndf = pd.read_csv("arquivo.csv")\n\n# Ler CSV com configurações\ndf = pd.read_csv("arquivo.csv", sep=";", encoding="utf-8")\n\n# Escrever CSV\ndf.to_csv("novo_arquivo.csv", index=False)\n\n# Escrever CSV com configurações\ndf.to_csv("novo_arquivo.csv", sep=";", encoding="utf-8", index=False)',
            documentation: 'CSV é um formato comum para armazenar dados tabulares.',
            examples: [
                'df = pd.read_csv("dados.csv", header=0)',
                'df.to_csv("output.csv", mode="a", header=False)'
            ],
            difficulty: 'beginner',
            tags: ['pandas', 'csv', 'file-io'],
            icon: <FileText className="w-4 h-4" />
        },
        {
            id: 'json-handling',
            title: 'Manipular JSON',
            description: 'Ler e escrever arquivos JSON',
            category: 'snippet',
            code: 'import json\n\n# Ler JSON de arquivo\nwith open("dados.json", "r", encoding="utf-8") as f:\n    data = json.load(f)\n\n# Ler JSON de string\njson_string = \'{"chave": "valor"}\'\ndata = json.loads(json_string)\n\n# Escrever JSON\nwith open("output.json", "w", encoding="utf-8") as f:\n    json.dump(data, f, indent=2, ensure_ascii=False)\n\n# Converter para string\njson_string = json.dumps(data, indent=2)',
            documentation: 'JSON é um formato popular para troca de dados entre aplicações.',
            examples: [
                'data = json.loads(response.text)',
                'json.dump(data, f, indent=4)'
            ],
            difficulty: 'beginner',
            tags: ['json', 'file-io', 'data'],
            icon: <FileText className="w-4 h-4" />
        },

        // Performance e Otimização
        {
            id: 'list-comprehension',
            title: 'List Comprehension',
            description: 'Cria listas de forma eficiente',
            category: 'snippet',
            code: '# List comprehension básica\nquadrados = [x**2 for x in range(10)]\n\n# Com condição\npares = [x for x in range(20) if x % 2 == 0]\n\n# Com múltiplas variáveis\ncoordenadas = [(x, y) for x in range(3) for y in range(3)]\n\n# Com função\nnomes_maiusculos = [nome.upper() for nome in nomes]',
            documentation: 'List comprehension é uma forma concisa e eficiente de criar listas.',
            examples: [
                '[x*2 for x in lista if x > 0]',
                '[func(x) for x in iterable]'
            ],
            difficulty: 'intermediate',
            tags: ['list-comprehension', 'performance', 'pythonic'],
            icon: <Zap className="w-4 h-4" />
        },
        {
            id: 'generator-function',
            title: 'Função Geradora',
            description: 'Cria uma função geradora para economia de memória',
            category: 'snippet',
            code: 'def fibonacci(n):\n    """Gera números de Fibonacci até n"""\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\n# Usar gerador\nfor num in fibonacci(10):\n    print(num)\n\n# Converter para lista\nfib_list = list(fibonacci(10))',
            documentation: 'Geradores são eficientes para sequências grandes, economizando memória.',
            examples: [
                'def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1',
                'def read_large_file(filename):\n    with open(filename) as f:\n        for line in f:\n            yield line.strip()'
            ],
            difficulty: 'intermediate',
            tags: ['generator', 'memory', 'performance'],
            icon: <Cpu className="w-4 h-4" />
        },

        // Classes e OOP
        {
            id: 'class-basic',
            title: 'Classe Básica',
            description: 'Define uma classe Python básica',
            category: 'snippet',
            code: 'class Pessoa:\n    def __init__(self, nome, idade):\n        self.nome = nome\n        self.idade = idade\n    \n    def apresentar(self):\n        return f"Olá, eu sou {self.nome} e tenho {self.idade} anos"\n    \n    def __str__(self):\n        return f"Pessoa(nome=\'{self.nome}\', idade={self.idade})"\n\n# Usar a classe\npessoa = Pessoa("João", 30)\nprint(pessoa.apresentar())',
            documentation: 'Classes são fundamentais para programação orientada a objetos em Python.',
            examples: [
                'class Carro:\n    def __init__(self, marca, modelo):\n        self.marca = marca\n        self.modelo = modelo',
                'class ContaBancaria:\n    def __init__(self, titular, saldo=0):\n        self.titular = titular\n        self.saldo = saldo'
            ],
            difficulty: 'beginner',
            tags: ['class', 'oop', 'object-oriented'],
            icon: <Code className="w-4 h-4" />
        },

        // Tratamento de Erros
        {
            id: 'try-except',
            title: 'Tratamento de Erros',
            description: 'Implementa tratamento de erros com try/except',
            category: 'snippet',
            code: 'try:\n    # Código que pode gerar erro\n    resultado = 10 / 0\nexcept ZeroDivisionError:\n    print("Erro: Divisão por zero!")\nexcept ValueError as e:\n    print(f"Erro de valor: {e}")\nexcept Exception as e:\n    print(f"Erro inesperado: {e}")\nelse:\n    print("Nenhum erro ocorreu")\nfinally:\n    print("Sempre executado")',
            documentation: 'Tratamento de erros é essencial para código robusto.',
            examples: [
                'try:\n    arquivo = open("dados.txt")\nexcept FileNotFoundError:\n    print("Arquivo não encontrado")',
                'try:\n    valor = int(input("Digite um número: "))\nexcept ValueError:\n    print("Valor inválido")'
            ],
            difficulty: 'beginner',
            tags: ['try-except', 'error-handling', 'robust'],
            icon: <Code className="w-4 h-4" />
        }
    ];

    // Categorias disponíveis
    const categories = [
        { id: 'all', name: 'Todos', icon: <Code className="w-4 h-4" /> },
        { id: 'data-science', name: 'Data Science', icon: <Database className="w-4 h-4" /> },
        { id: 'machine-learning', name: 'Machine Learning', icon: <Brain className="w-4 h-4" /> },
        { id: 'web', name: 'Web Development', icon: <Globe className="w-4 h-4" /> },
        { id: 'performance', name: 'Performance', icon: <Zap className="w-4 h-4" /> },
        { id: 'oop', name: 'OOP', icon: <Code className="w-4 h-4" /> }
    ];

    // Filtra sugestões baseado na linha atual e termo de busca
    useEffect(() => {
        let filtered = pythonSuggestions;

        // Filtro por categoria
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(suggestion =>
                suggestion.tags.includes(selectedCategory)
            );
        }

        // Filtro por termo de busca
        if (searchTerm) {
            filtered = filtered.filter(suggestion =>
                suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                suggestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                suggestion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filtro por contexto da linha atual
        if (currentLine.trim()) {
            const line = currentLine.toLowerCase();
            if (line.includes('import')) {
                filtered = filtered.filter(s => s.tags.includes('import'));
            } else if (line.includes('class')) {
                filtered = filtered.filter(s => s.tags.includes('class'));
            } else if (line.includes('def')) {
                filtered = filtered.filter(s => s.tags.includes('function'));
            }
        }

        setFilteredSuggestions(filtered);
        setSelectedIndex(0);
    }, [searchTerm, selectedCategory, currentLine]);

    // Navegação com teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isVisible) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
                    );
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredSuggestions[selectedIndex]) {
                        onSuggestionSelect(filteredSuggestions[selectedIndex]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    // Fechar painel
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, filteredSuggestions, selectedIndex, onSuggestionSelect]);

    // Scroll para item selecionado
    useEffect(() => {
        if (suggestionsRef.current) {
            const selectedElement = suggestionsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex]);

    const handleSuggestionClick = (suggestion: PythonSuggestion) => {
        onSuggestionSelect(suggestion);
    };

    const handleDocumentationClick = (suggestion: PythonSuggestion) => {
        setSelectedSuggestion(suggestion);
        setShowDocumentation(true);
    };

    if (!isVisible) return null;

    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg max-w-2xl max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Code className="w-5 h-5 mr-2" />
                        Python IntelliSense
                    </h3>
                    <div className="text-sm text-gray-500">
                        {filteredSuggestions.length} sugestões
                    </div>
                </div>

                {/* Barra de busca */}
                <input
                    type="text"
                    placeholder="Buscar sugestões..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Filtros por categoria */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center px-3 py-1 rounded-full text-sm transition-colors ${selectedCategory === category.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.icon}
                            <span className="ml-1">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lista de sugestões */}
            <div ref={suggestionsRef} className="max-h-64 overflow-y-auto">
                {filteredSuggestions.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        <Lightbulb className="w-8 h-8 mx-auto mb-2" />
                        <p>Nenhuma sugestão encontrada</p>
                    </div>
                ) : (
                    filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.id}
                            data-index={index}
                            className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${index === selectedIndex ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                                }`}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        {suggestion.icon}
                                        <h4 className="font-medium text-gray-900 ml-2">
                                            {suggestion.title}
                                        </h4>
                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${suggestion.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                                                suggestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {suggestion.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {suggestion.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {suggestion.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {suggestion.tags.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                +{suggestion.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1 ml-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDocumentationClick(suggestion);
                                        }}
                                        className="p-1 hover:bg-gray-200 rounded"
                                        title="Ver documentação"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSuggestionClick(suggestion);
                                        }}
                                        className="p-1 hover:bg-gray-200 rounded"
                                        title="Usar sugestão"
                                    >
                                        <Play className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal de documentação */}
            {showDocumentation && selectedSuggestion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-4xl max-h-96 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center">
                                {selectedSuggestion.icon}
                                <span className="ml-2">{selectedSuggestion.title}</span>
                            </h3>
                            <button
                                onClick={() => setShowDocumentation(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-80">
                            <div className="mb-4">
                                <h4 className="font-medium mb-2">Descrição:</h4>
                                <p className="text-gray-700">{selectedSuggestion.description}</p>
                            </div>

                            {selectedSuggestion.documentation && (
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">Documentação:</h4>
                                    <p className="text-gray-700">{selectedSuggestion.documentation}</p>
                                </div>
                            )}

                            <div className="mb-4">
                                <h4 className="font-medium mb-2">Código:</h4>
                                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                                    <code>{selectedSuggestion.code}</code>
                                </pre>
                            </div>

                            {selectedSuggestion.examples && selectedSuggestion.examples.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">Exemplos:</h4>
                                    <div className="space-y-2">
                                        {selectedSuggestion.examples.map((example, index) => (
                                            <pre key={index} className="bg-gray-100 p-2 rounded text-sm">
                                                <code>{example}</code>
                                            </pre>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowDocumentation(false)}
                                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    Fechar
                                </button>
                                <button
                                    onClick={() => {
                                        onSuggestionSelect(selectedSuggestion);
                                        setShowDocumentation(false);
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Usar Sugestão
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PythonIntelliSense;
