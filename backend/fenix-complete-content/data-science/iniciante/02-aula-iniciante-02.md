
## 🎯 Objetivos de Aprendizado
- ✅ Dominar sintaxe Python
- ✅ Trabalhar com estruturas de dados
- ✅ Criar funções eficientes
- ✅ Utilizar bibliotecas populares

## 📚 Conteúdo Principal

### 1. 🌟 Sintaxe Python
Python é conhecido por sua sintaxe limpa e legível, sendo ideal para iniciantes em programação.

### 2. 📝 Variáveis e Tipos
```python
# Variáveis básicas
nome = "João Silva"
idade = 25
altura = 1.75
ativo = True

# Verificar tipos
print(type(nome))      # <class 'str'>
print(type(idade))     # <class 'int'>
print(type(altura))    # <class 'float'>
print(type(ativo))     # <class 'bool'>

# Conversão de tipos
idade_str = str(idade)
altura_int = int(altura)
```

### 3. 🏗️ Estruturas de Dados
```python
# Listas
frutas = ['maçã', 'banana', 'laranja']
frutas.append('uva')
frutas.remove('banana')
print(frutas[0])  # maçã

# Dicionários
pessoa = {
    'nome': 'Maria',
    'idade': 30,
    'cidade': 'São Paulo'
}
print(pessoa['nome'])
pessoa['profissao'] = 'Engenheira'

# Tuplas (imutáveis)
coordenadas = (10, 20)
x, y = coordenadas

# Sets (conjuntos)
numeros = {1, 2, 3, 4, 5}
numeros.add(6)
numeros.remove(1)
```

### 4. 🔧 Funções
```python
# Função básica
def saudacao(nome):
    return f"Olá, {nome}!"

# Função com parâmetros padrão
def calcular_area(base, altura=10):
    return base * altura

# Função com múltiplos retornos
def dividir(a, b):
    if b == 0:
        return None, "Divisão por zero!"
    return a / b, None

# Lambda functions
quadrado = lambda x: x ** 2
soma = lambda a, b: a + b
```

### 5. 📚 Bibliotecas Essenciais
```python
# Pandas para dados
import pandas as pd
df = pd.DataFrame({
    'nome': ['Ana', 'João', 'Maria'],
    'idade': [25, 30, 28]
})

# NumPy para computação numérica
import numpy as np
array = np.array([1, 2, 3, 4, 5])
media = np.mean(array)

# Matplotlib para gráficos
import matplotlib.pyplot as plt
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.show()
```

## 🧪 Exercícios Práticos

### Exercício 1: Calculadora Avançada
Crie uma calculadora com:
- Operações básicas
- Funções matemáticas
- Tratamento de erros
- Interface de linha de comando

### Exercício 2: Sistema de Gerenciamento
Desenvolva um sistema para:
- Cadastrar usuários
- Gerenciar produtos
- Calcular estatísticas
- Exportar relatórios

### Exercício 3: Análise de Dados
Analise um dataset com:
- Carregamento de dados
- Limpeza e preparação
- Análise estatística
- Visualizações básicas

## 🚀 Próximos Passos
Na próxima aula, você aprenderá Pandas Fundamentos para manipulação de dados.

## 📝 Checklist de Conclusão
- [ ] Dominou sintaxe Python
- [ ] Trabalhou com estruturas
- [ ] Criou funções
- [ ] Utilizou bibliotecas
- [ ] Completou todos os exercícios

**🎉 Parabéns! Você dominou o Python Básico!**
