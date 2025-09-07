'use client';

import React from 'react';
import { File, Code, Globe, Palette, Zap, Database, Bot, Smartphone } from 'lucide-react';

export interface Template {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    category: string;
    content: string;
    language: string;
    extension: string;
}

export const templates: Template[] = [
    // Web Development
    {
        id: 'html-basic',
        name: 'HTML Básico',
        description: 'Estrutura HTML5 básica',
        icon: <Globe className="w-5 h-5" />,
        category: 'Web',
        content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Bem-vindo!</h1>
    </header>
    
    <main>
        <p>Esta é minha primeira página HTML.</p>
    </main>
    
    <footer>
        <p>&copy; 2024 - Fenix Academy</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
        language: 'html',
        extension: 'html'
    },

    {
        id: 'css-basic',
        name: 'CSS Básico',
        description: 'Estilos CSS básicos',
        icon: <Palette className="w-5 h-5" />,
        category: 'Web',
        content: `/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

header {
    background-color: #35424a;
    color: white;
    text-align: center;
    padding: 1rem;
}

main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

footer {
    background-color: #35424a;
    color: white;
    text-align: center;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
}`,
        language: 'css',
        extension: 'css'
    },

    {
        id: 'javascript-basic',
        name: 'JavaScript Básico',
        description: 'Código JavaScript básico',
        icon: <Zap className="w-5 h-5" />,
        category: 'Web',
        content: `// Função para saudar o usuário
function saudarUsuario(nome) {
    return \`Olá, \${nome}! Bem-vindo à Fenix Academy!\`;
}

// Função para calcular a soma de dois números
function somar(a, b) {
    return a + b;
}

// Função para verificar se um número é par
function ehPar(numero) {
    return numero % 2 === 0;
}

// Exemplos de uso
console.log(saudarUsuario('Desenvolvedor'));
console.log('Soma de 5 + 3:', somar(5, 3));
console.log('O número 10 é par?', ehPar(10));

// Event listener para quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada com sucesso!');
});`,
        language: 'javascript',
        extension: 'js'
    },

    // Data Science
    {
        id: 'python-basic',
        name: 'Python Básico',
        description: 'Script Python básico',
        icon: <Code className="w-5 h-5" />,
        category: 'Data Science',
        content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script Python Básico
Fenix Academy - Curso de Python
"""

def saudar_usuario(nome):
    """Função para saudar o usuário"""
    return f"Olá, {nome}! Bem-vindo à Fenix Academy!"

def calcular_fatorial(n):
    """Calcula o fatorial de um número"""
    if n == 0 or n == 1:
        return 1
    else:
        return n * calcular_fatorial(n - 1)

def verificar_primo(numero):
    """Verifica se um número é primo"""
    if numero < 2:
        return False
    for i in range(2, int(numero ** 0.5) + 1):
        if numero % i == 0:
            return False
    return True

def main():
    """Função principal"""
    print("=== Script Python Básico ===")
    
    # Exemplos de uso
    nome = input("Digite seu nome: ")
    print(saudar_usuario(nome))
    
    numero = int(input("Digite um número para calcular o fatorial: "))
    print(f"Fatorial de {numero}: {calcular_fatorial(numero)}")
    
    primo = int(input("Digite um número para verificar se é primo: "))
    if verificar_primo(primo):
        print(f"{primo} é um número primo!")
    else:
        print(f"{primo} não é um número primo.")

if __name__ == "__main__":
    main()`,
        language: 'python',
        extension: 'py'
    },

    // Backend
    {
        id: 'nodejs-basic',
        name: 'Node.js API',
        description: 'API básica com Express',
        icon: <Database className="w-5 h-5" />,
        category: 'Backend',
        content: `const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo à API da Fenix Academy!',
        version: '1.0.0',
        status: 'online'
    });
});

app.get('/api/usuarios', (req, res) => {
    const usuarios = [
        { id: 1, nome: 'João', email: 'joao@email.com' },
        { id: 2, nome: 'Maria', email: 'maria@email.com' },
        { id: 3, nome: 'Pedro', email: 'pedro@email.com' }
    ];
    
    res.json(usuarios);
});

app.post('/api/usuarios', (req, res) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({
            error: 'Nome e email são obrigatórios'
        });
    }
    
    const novoUsuario = {
        id: Date.now(),
        nome,
        email
    };
    
    res.status(201).json(novoUsuario);
});

// Middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Algo deu errado!'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(\`🚀 Servidor rodando na porta \${PORT}\`);
    console.log(\`📱 Acesse: http://localhost:\${PORT}\`);
});`,
        language: 'javascript',
        extension: 'js'
    },

    // Mobile
    {
        id: 'react-native-basic',
        name: 'React Native',
        description: 'Componente básico React Native',
        icon: <Smartphone className="w-5 h-5" />,
        category: 'Mobile',
        content: `import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView
} from 'react-native';

const App = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (!nome.trim() || !email.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        Alert.alert(
            'Sucesso!',
            \`Dados enviados:\nNome: \${nome}\nEmail: \${email}\`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setNome('');
                        setEmail('');
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Fenix Academy</Text>
                <Text style={styles.subtitle}>React Native App</Text>
                
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                        placeholderTextColor="#666"
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#666"
                    />
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
        marginBottom: 40,
    },
    form: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default App;`,
        language: 'javascript',
        extension: 'js'
    },

    // AI/ML
    {
        id: 'python-ml',
        name: 'Python ML',
        description: 'Script básico de Machine Learning',
        icon: <Bot className="w-5 h-5" />,
        category: 'AI/ML',
        content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script de Machine Learning Básico
Fenix Academy - Curso de IA/ML
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

def criar_dados_sinteticos():
    """Cria dados sintéticos para demonstração"""
    np.random.seed(42)
    X = np.random.rand(100, 1) * 10
    y = 2 * X + 1 + np.random.randn(100, 1) * 0.5
    return X, y

def treinar_modelo(X, y):
    """Treina um modelo de regressão linear"""
    # Dividir dados em treino e teste
    X_treino, X_teste, y_treino, y_teste = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Criar e treinar modelo
    modelo = LinearRegression()
    modelo.fit(X_treino, y_treino)
    
    # Fazer previsões
    y_pred = modelo.predict(X_teste)
    
    return modelo, X_treino, X_teste, y_treino, y_teste, y_pred

def avaliar_modelo(y_teste, y_pred):
    """Avalia o desempenho do modelo"""
    mse = mean_squared_error(y_teste, y_pred)
    r2 = r2_score(y_teste, y_pred)
    
    print(f"Mean Squared Error: {mse:.4f}")
    print(f"R² Score: {r2:.4f}")
    
    return mse, r2

def plotar_resultados(X, y, modelo, X_teste, y_pred):
    """Plota os resultados do modelo"""
    plt.figure(figsize=(10, 6))
    
    # Dados originais
    plt.scatter(X, y, alpha=0.6, label='Dados Originais')
    
    # Linha de previsão
    X_plot = np.linspace(0, 10, 100).reshape(-1, 1)
    y_plot = modelo.predict(X_plot)
    plt.plot(X_plot, y_plot, 'r-', linewidth=2, label='Previsão do Modelo')
    
    # Dados de teste
    plt.scatter(X_teste, y_pred, color='red', s=100, label='Previsões (Teste)')
    
    plt.xlabel('X')
    plt.ylabel('y')
    plt.title('Modelo de Regressão Linear')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

def main():
    """Função principal"""
    print("=== Machine Learning Básico ===")
    print("Criando dados sintéticos...")
    
    # Criar dados
    X, y = criar_dados_sinteticos()
    print(f"Dados criados: {X.shape[0]} amostras")
    
    # Treinar modelo
    print("\\nTreinando modelo...")
    modelo, X_treino, X_teste, y_treino, y_teste, y_pred = treinar_modelo(X, y)
    
    # Avaliar modelo
    print("\\nAvaliando modelo...")
    mse, r2 = avaliar_modelo(y_teste, y_pred)
    
    # Mostrar coeficientes
    print(f"\\nCoeficiente (slope): {modelo.coef_[0][0]:.4f}")
    print(f"Intercepto: {modelo.intercept_[0]:.4f}")
    
    # Plotar resultados
    print("\\nPlotando resultados...")
    plotar_resultados(X, y, modelo, X_teste, y_pred)
    
    print("\\n✅ Análise concluída!")

if __name__ == "__main__":
    main()`,
        language: 'python',
        extension: 'py'
    }
];

export const getTemplatesByCategory = () => {
    const categories = templates.reduce((acc, template) => {
        if (!acc[template.category]) {
            acc[template.category] = [];
        }
        acc[template.category].push(template);
        return acc;
    }, {} as Record<string, Template[]>);

    return categories;
};

export const getTemplateById = (id: string): Template | undefined => {
    return templates.find(template => template.id === id);
};



