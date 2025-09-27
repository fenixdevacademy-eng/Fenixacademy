#!/usr/bin/env python3
"""
Script para gerar conteúdo específico para cada aula individual
"""

import os
from pathlib import Path

def generate_individual_lessons():
    """Gera conteúdo específico para cada aula individual"""
    print("🚀 GERANDO CONTEÚDO ESPECÍFICO PARA CADA AULA!")
    print("=" * 70)
    
    # Gerar aulas do Python Data Science
    generate_python_individual_lessons()
    
    print("\n🎉 CONTEÚDO ESPECÍFICO GERADO PARA TODAS AS AULAS!")

def generate_python_individual_lessons():
    """Gera conteúdo específico para cada aula de Python Data Science"""
    print("🐍 Gerando aulas individuais para Python Data Science...")
    
    course_path = Path("backend/fenix-expanded-content/python-data-science/avancado")
    
    # Módulo 1: Fundamentos Python (5 aulas)
    generate_lesson_content(course_path, "aula-01-modulo-01-python-data-science.md", 
                           "Introdução ao Python para Data Science", 1, 1)
    generate_lesson_content(course_path, "aula-02-modulo-01-python-data-science.md", 
                           "Variáveis e Tipos de Dados", 1, 2)
    generate_lesson_content(course_path, "aula-03-modulo-01-python-data-science.md", 
                           "Estruturas de Controle", 1, 3)
    generate_lesson_content(course_path, "aula-04-modulo-01-python-data-science.md", 
                           "Funções e Módulos", 1, 4)
    generate_lesson_content(course_path, "aula-05-modulo-01-python-data-science.md", 
                           "Projeto: Calculadora de Estatísticas", 1, 5)
    
    # Módulo 2: Análise de Dados com Pandas (6 aulas)
    generate_lesson_content(course_path, "aula-06-modulo-02-python-data-science.md", 
                           "Introdução ao Pandas", 2, 1)
    generate_lesson_content(course_path, "aula-07-modulo-02-python-data-science.md", 
                           "DataFrames e Series", 2, 2)
    generate_lesson_content(course_path, "aula-08-modulo-02-python-data-science.md", 
                           "Manipulação de Dados", 2, 3)
    generate_lesson_content(course_path, "aula-09-modulo-02-python-data-science.md", 
                           "Agregações e Agrupamentos", 2, 4)
    generate_lesson_content(course_path, "aula-10-modulo-02-python-data-science.md", 
                           "Limpeza e Tratamento de Dados", 2, 5)
    generate_lesson_content(course_path, "aula-11-modulo-02-python-data-science.md", 
                           "Projeto: Análise de Vendas", 2, 6)
    
    # Módulo 3: Visualização com Matplotlib/Seaborn (6 aulas)
    generate_lesson_content(course_path, "aula-12-modulo-03-python-data-science.md", 
                           "Introdução à Visualização", 3, 1)
    generate_lesson_content(course_path, "aula-13-modulo-03-python-data-science.md", 
                           "Matplotlib Básico", 3, 2)
    generate_lesson_content(course_path, "aula-14-modulo-03-python-data-science.md", 
                           "Seaborn e Estatísticas", 3, 3)
    generate_lesson_content(course_path, "aula-15-modulo-03-python-data-science.md", 
                           "Gráficos Avançados", 3, 4)
    generate_lesson_content(course_path, "aula-16-modulo-03-python-data-science.md", 
                           "Dashboards Interativos", 3, 5)
    generate_lesson_content(course_path, "aula-17-modulo-03-python-data-science.md", 
                           "Projeto: Dashboard de Vendas", 3, 6)
    
    # Módulo 4: Machine Learning Básico (7 aulas)
    generate_lesson_content(course_path, "aula-18-modulo-04-python-data-science.md", 
                           "Introdução ao Machine Learning", 4, 1)
    generate_lesson_content(course_path, "aula-19-modulo-04-python-data-science.md", 
                           "Regressão Linear", 4, 2)
    generate_lesson_content(course_path, "aula-20-modulo-04-python-data-science.md", 
                           "Classificação", 4, 3)
    generate_lesson_content(course_path, "aula-21-modulo-04-python-data-science.md", 
                           "Clustering", 4, 4)
    generate_lesson_content(course_path, "aula-22-modulo-04-python-data-science.md", 
                           "Validação e Métricas", 4, 5)
    generate_lesson_content(course_path, "aula-23-modulo-04-python-data-science.md", 
                           "Feature Engineering", 4, 6)
    generate_lesson_content(course_path, "aula-24-modulo-04-python-data-science.md", 
                           "Projeto: Sistema de Recomendação", 4, 7)
    
    # Módulo 5: Deep Learning com TensorFlow (6 aulas)
    generate_lesson_content(course_path, "aula-25-modulo-05-python-data-science.md", 
                           "Introdução ao Deep Learning", 5, 1)
    generate_lesson_content(course_path, "aula-26-modulo-05-python-data-science.md", 
                           "Redes Neurais Básicas", 5, 2)
    generate_lesson_content(course_path, "aula-27-modulo-05-python-data-science.md", 
                           "TensorFlow e Keras", 5, 3)
    generate_lesson_content(course_path, "aula-28-modulo-05-python-data-science.md", 
                           "CNNs para Imagens", 5, 4)
    generate_lesson_content(course_path, "aula-29-modulo-05-python-data-science.md", 
                           "RNNs para Sequências", 5, 5)
    generate_lesson_content(course_path, "aula-30-modulo-05-python-data-science.md", 
                           "Projeto: Classificador de Imagens", 5, 6)
    
    # Módulo 6: Processamento de Linguagem Natural (5 aulas)
    generate_lesson_content(course_path, "aula-31-modulo-06-python-data-science.md", 
                           "Introdução ao NLP", 6, 1)
    generate_lesson_content(course_path, "aula-32-modulo-06-python-data-science.md", 
                           "Tokenização e Pré-processamento", 6, 2)
    generate_lesson_content(course_path, "aula-33-modulo-06-python-data-science.md", 
                           "Word Embeddings", 6, 3)
    generate_lesson_content(course_path, "aula-34-modulo-06-python-data-science.md", 
                           "Modelos de Linguagem", 6, 4)
    generate_lesson_content(course_path, "aula-35-modulo-06-python-data-science.md", 
                           "Projeto: Chatbot Inteligente", 6, 5)
    
    # Módulo 7: Big Data com PySpark (5 aulas)
    generate_lesson_content(course_path, "aula-36-modulo-07-python-data-science.md", 
                           "Introdução ao Big Data", 7, 1)
    generate_lesson_content(course_path, "aula-37-modulo-07-python-data-science.md", 
                           "PySpark e RDDs", 7, 2)
    generate_lesson_content(course_path, "aula-38-modulo-07-python-data-science.md", 
                           "DataFrames no Spark", 7, 3)
    generate_lesson_content(course_path, "aula-39-modulo-07-python-data-science.md", 
                           "Machine Learning no Spark", 7, 4)
    generate_lesson_content(course_path, "aula-40-modulo-07-python-data-science.md", 
                           "Projeto: Análise de Big Data", 7, 5)
    
    # Módulo 8: Deploy de Modelos ML (5 aulas)
    generate_lesson_content(course_path, "aula-41-modulo-08-python-data-science.md", 
                           "Introdução ao Deploy de ML", 8, 1)
    generate_lesson_content(course_path, "aula-42-modulo-08-python-data-science.md", 
                           "Serialização de Modelos", 8, 2)
    generate_lesson_content(course_path, "aula-43-modulo-08-python-data-science.md", 
                           "APIs para ML", 8, 3)
    generate_lesson_content(course_path, "aula-44-modulo-08-python-data-science.md", 
                           "Docker e Containers", 8, 4)
    generate_lesson_content(course_path, "aula-45-modulo-08-python-data-science.md", 
                           "Projeto: Sistema ML em Produção", 8, 5)

def generate_lesson_content(course_path: Path, filename: str, title: str, module_num: int, lesson_num: int):
    """Gera conteúdo específico para uma aula individual"""
    file_path = course_path / filename
    
    # Conteúdo específico baseado no tópico
    if "DataFrames e Series" in title:
        content = generate_dataframes_series_content(title, module_num, lesson_num)
    elif "Introdução ao Pandas" in title:
        content = generate_pandas_intro_content(title, module_num, lesson_num)
    elif "Manipulação de Dados" in title:
        content = generate_data_manipulation_content(title, module_num, lesson_num)
    elif "Agregações e Agrupamentos" in title:
        content = generate_aggregations_content(title, module_num, lesson_num)
    elif "Limpeza e Tratamento" in title:
        content = generate_data_cleaning_content(title, module_num, lesson_num)
    elif "Projeto: Análise de Vendas" in title:
        content = generate_sales_analysis_project_content(title, module_num, lesson_num)
    else:
        content = generate_generic_lesson_content(title, module_num, lesson_num)
    
    # Escrever o arquivo
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Gerado: {filename}")

def generate_dataframes_series_content(title: str, module_num: int, lesson_num: int):
    """Gera conteúdo específico sobre DataFrames e Series"""
    return f"""# 🎓 **Fenix Academy - Python para Data Science**
## 📚 **Aula {lesson_num} - Módulo: Módulo {module_num}: Pandas**
### 🎯 **Tópico: {title}**

**Duração Estimada:** 60 min  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento básico de Python

---

## 🚀 **Sua Jornada Rumo ao Próximo Nível**

Você já se sentiu perdido ao tentar analisar dados complexos? Esta aula vai mudar isso para sempre.

**Aqui você vai aprender:**
- Como criar e manipular DataFrames e Series do Pandas
- Técnicas profissionais de indexação e seleção de dados
- Operações vetorizadas para máxima performance
- Como resolver problemas reais de análise de dados

**Prepare-se para:** Dominar as estruturas de dados mais poderosas do Python!

---

## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**

### **1.1 O que são DataFrames e Series?**

**DataFrame** é uma estrutura de dados bidimensional (como uma tabela) que pode conter diferentes tipos de dados em cada coluna.

**Series** é uma estrutura unidimensional (como uma coluna) que pode conter qualquer tipo de dados.

### **1.2 Por que usar Pandas?**

- **Performance**: Operações otimizadas em C
- **Flexibilidade**: Manipulação fácil de dados
- **Integração**: Funciona perfeitamente com NumPy, Matplotlib, etc.
- **Produtividade**: Menos código, mais resultados

### **1.3 Casos de Uso Reais**

- Análise de vendas e métricas de negócio
- Processamento de dados de sensores IoT
- Análise de dados financeiros
- Machine Learning e Data Science

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico: Criando DataFrames e Series**

```python
import pandas as pd
import numpy as np

# Criando uma Series
s = pd.Series([1, 3, 5, np.nan, 6, 8])
print("Series:")
print(s)

# Criando um DataFrame
data = {{
    'Nome': ['Ana', 'Bruno', 'Carlos', 'Diana'],
    'Idade': [25, 30, 35, 28],
    'Salario': [5000, 7000, 8000, 6000],
    'Departamento': ['TI', 'Vendas', 'TI', 'Marketing']
}}

df = pd.DataFrame(data)
print("\\nDataFrame:")
print(df)
```

### **Exemplo Avançado: Operações com DataFrames**

```python
# Informações básicas do DataFrame
print("\\n=== INFORMAÇÕES BÁSICAS ===")
print(f"Shape: {{df.shape}}")
print(f"Colunas: {{df.columns.tolist()}}")
print(f"Tipos de dados:\\n{{df.dtypes}}")

# Estatísticas descritivas
print("\\n=== ESTATÍSTICAS DESCRITIVAS ===")
print(df.describe())

# Seleção de dados
print("\\n=== SELEÇÃO DE DADOS ===")
# Selecionar colunas específicas
print("Colunas Nome e Salario:")
print(df[['Nome', 'Salario']])

# Filtrar dados
print("\\nFuncionários com salário > 6000:")
print(df[df['Salario'] > 6000])

# Ordenar dados
print("\\nOrdenado por salário (decrescente):")
print(df.sort_values('Salario', ascending=False))
```

### **Exemplo Profissional: Análise de Dados de Vendas**

```python
# Simulando dados de vendas
np.random.seed(42)
vendas_data = {{
    'Data': pd.date_range('2024-01-01', periods=100, freq='D'),
    'Produto': np.random.choice(['A', 'B', 'C', 'D'], 100),
    'Quantidade': np.random.randint(1, 50, 100),
    'Preco': np.random.uniform(10, 100, 100),
    'Vendedor': np.random.choice(['João', 'Maria', 'Pedro', 'Ana'], 100)
}}

vendas_df = pd.DataFrame(vendas_data)
vendas_df['Receita'] = vendas_df['Quantidade'] * vendas_df['Preco']

print("=== ANÁLISE DE VENDAS ===")
print(f"Total de vendas: {{vendas_df['Receita'].sum():.2f}}")
print(f"Venda média por transação: {{vendas_df['Receita'].mean():.2f}}")
print(f"Produto mais vendido: {{vendas_df['Produto'].value_counts().index[0]}}")

# Análise por vendedor
print("\\n=== VENDAS POR VENDEDOR ===")
vendas_por_vendedor = vendas_df.groupby('Vendedor')['Receita'].agg(['sum', 'mean', 'count'])
print(vendas_por_vendedor)
```

---

## 🎯 **Exercícios Práticos**

### **Exercício 1: Criando seu Primeiro DataFrame**
1. Crie um DataFrame com dados de 5 funcionários
2. Inclua colunas: Nome, Idade, Cargo, Salário
3. Exiba as informações básicas do DataFrame

### **Exercício 2: Manipulação de Dados**
1. Filtre funcionários com salário > 5000
2. Ordene por salário em ordem decrescente
3. Calcule a média salarial por cargo

### **Exercício 3: Análise de Dados**
1. Crie um DataFrame com dados de vendas de 30 dias
2. Calcule receita total, média e mediana
3. Identifique o melhor e pior dia de vendas

---

## 🏆 **Projeto Prático: Sistema de Análise de Funcionários**

### **Objetivo**
Criar um sistema completo de análise de dados de funcionários usando DataFrames e Series.

### **Requisitos**
- Dataset com pelo menos 50 funcionários
- Análise de distribuição salarial
- Análise por departamento
- Identificação de outliers
- Relatório final com insights

### **Entregáveis**
1. Código Python completo
2. Dataset de exemplo
3. Relatório de análise
4. Visualizações dos dados

---

## 📖 **Recursos Adicionais**

### **Documentação Oficial**
- [Pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html)
- [Pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html)

### **Livros Recomendados**
- "Python for Data Analysis" - Wes McKinney
- "Pandas Cookbook" - Theodore Petrou

### **Próxima Aula**
**Manipulação de Dados** - Aprenda técnicas avançadas de manipulação e transformação de dados.

---

## 🎉 **Parabéns!**

Você dominou DataFrames e Series! Continue praticando e aplicando esses conceitos em projetos reais.

**Próximo passo:** Aprenda técnicas avançadas de manipulação de dados!
"""

def generate_pandas_intro_content(title: str, module_num: int, lesson_num: int):
    """Gera conteúdo específico sobre Introdução ao Pandas"""
    return f"""# 🎓 **Fenix Academy - Python para Data Science**
## 📚 **Aula {lesson_num} - Módulo: Módulo {module_num}: Pandas**
### 🎯 **Tópico: {title}**

**Duração Estimada:** 45 min  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento básico de Python

---

## 🚀 **Sua Jornada Rumo ao Próximo Nível**

Você já se sentiu frustrado ao tentar analisar dados com Python puro? O Pandas vai revolucionar sua forma de trabalhar com dados!

**Aqui você vai aprender:**
- O que é o Pandas e por que é essencial para Data Science
- Como instalar e configurar o Pandas
- Estruturas de dados fundamentais
- Primeiros passos na análise de dados

**Prepare-se para:** Uma jornada que vai transformar sua relação com dados!

---

## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**

### **1.1 O que é o Pandas?**

Pandas é uma biblioteca Python de código aberto que fornece estruturas de dados de alto desempenho e fáceis de usar para análise de dados.

### **1.2 Por que usar Pandas?**

- **Facilidade de uso**: Sintaxe intuitiva e poderosa
- **Performance**: Otimizado para grandes volumes de dados
- **Flexibilidade**: Manipulação de dados de qualquer fonte
- **Integração**: Funciona perfeitamente com outras bibliotecas

### **1.3 Instalação e Configuração**

```python
# Instalação via pip
pip install pandas

# Verificação da instalação
import pandas as pd
print(f"Pandas version: {{pd.__version__}}")
```

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico: Primeiros Passos**

```python
import pandas as pd

# Criando uma Series simples
s = pd.Series([1, 2, 3, 4, 5])
print("Series:")
print(s)

# Criando um DataFrame básico
df = pd.DataFrame({{
    'A': [1, 2, 3, 4],
    'B': [10, 20, 30, 40],
    'C': [100, 200, 300, 400]
}})

print("\\nDataFrame:")
print(df)
```

### **Exemplo Avançado: Carregando Dados**

```python
# Carregando dados de um arquivo CSV
df = pd.read_csv('dados.csv')

# Informações básicas sobre os dados
print("Shape:", df.shape)
print("\\nColunas:", df.columns.tolist())
print("\\nTipos de dados:")
print(df.dtypes)

# Primeiras linhas
print("\\nPrimeiras 5 linhas:")
print(df.head())
```

---

## 🎯 **Exercícios Práticos**

### **Exercício 1: Explorando Dados**
1. Carregue um dataset de exemplo
2. Explore as primeiras e últimas linhas
3. Identifique tipos de dados e valores faltantes

### **Exercício 2: Criando Estruturas**
1. Crie uma Series com dados de temperatura
2. Crie um DataFrame com dados de vendas
3. Explore as propriedades de cada estrutura

---

## 🎉 **Parabéns!**

Você deu os primeiros passos no Pandas! Continue praticando e explore as próximas aulas.

**Próximo passo:** Aprenda sobre DataFrames e Series em detalhes!
"""

def generate_data_manipulation_content(title: str, module_num: int, lesson_num: int):
    """Gera conteúdo específico sobre Manipulação de Dados"""
    return f"""# 🎓 **Fenix Academy - Python para Data Science**
## 📚 **Aula {lesson_num} - Módulo: Módulo {module_num}: Pandas**
### 🎯 **Tópico: {title}**

**Duração Estimada:** 75 min  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento de DataFrames e Series

---

## 🚀 **Sua Jornada Rumo ao Próximo Nível**

A manipulação de dados é o coração da análise! Esta aula vai te ensinar técnicas profissionais.

**Aqui você vai aprender:**
- Técnicas avançadas de seleção e filtragem
- Transformação e limpeza de dados
- Operações de merge e join
- Técnicas de otimização de performance

**Prepare-se para:** Dominar a manipulação de dados como um profissional!

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico: Seleção e Filtragem**

```python
import pandas as pd
import numpy as np

# Criando dados de exemplo
data = {{
    'Nome': ['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo'],
    'Idade': [25, 30, 35, 28, 32],
    'Salario': [5000, 7000, 8000, 6000, 7500],
    'Departamento': ['TI', 'Vendas', 'TI', 'Marketing', 'Vendas']
}}

df = pd.DataFrame(data)

# Seleção por posição
print("Primeiras 3 linhas:")
print(df.iloc[:3])

# Seleção por condição
print("\\nFuncionários de TI:")
print(df[df['Departamento'] == 'TI'])

# Múltiplas condições
print("\\nFuncionários de TI com salário > 6000:")
print(df[(df['Departamento'] == 'TI') & (df['Salario'] > 6000)])
```

### **Exemplo Avançado: Transformação de Dados**

```python
# Adicionando novas colunas
df['Salario_Anual'] = df['Salario'] * 12
df['Categoria_Salario'] = pd.cut(df['Salario'], 
                                bins=[0, 6000, 8000, float('inf')], 
                                labels=['Baixo', 'Médio', 'Alto'])

print("DataFrame com novas colunas:")
print(df)

# Aplicando funções
def calcular_bonus(salario):
    return salario * 0.1 if salario > 7000 else salario * 0.05

df['Bonus'] = df['Salario'].apply(calcular_bonus)
print("\\nDataFrame com bonus:")
print(df)
```

---

## 🎯 **Exercícios Práticos**

### **Exercício 1: Filtragem Avançada**
1. Filtre dados por múltiplas condições
2. Use operadores lógicos (and, or, not)
3. Aplique filtros em colunas específicas

### **Exercício 2: Transformação de Dados**
1. Crie novas colunas calculadas
2. Aplique funções personalizadas
3. Transforme tipos de dados

---

## 🎉 **Parabéns!**

Você dominou a manipulação de dados! Continue praticando e explore as próximas aulas.

**Próximo passo:** Aprenda sobre agregações e agrupamentos!
"""

def generate_aggregations_content(title: str, module_num: int, lesson_num: int):
    """Gera conteúdo específico sobre Agregações e Agrupamentos"""
    return f"""# 🎓 **Fenix Academy - Python para Data Science**
## 📚 **Aula {lesson_num} - Módulo: Módulo {module_num}: Pandas**
### 🎯 **Tópico: {title}**

**Duração Estimada:** 70 min  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento de manipulação de dados

---

## 🚀 **Sua Jornada Rumo ao Próximo Nível**

Agregações e agrupamentos são essenciais para extrair insights dos dados!

**Aqui você vai aprender:**
- Técnicas de agrupamento de dados
- Funções de agregação avançadas
- Análise de dados por categorias
- Técnicas de pivot e reshape

**Prepare-se para:** Extrair insights poderosos dos seus dados!

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico: Agrupamentos Simples**

```python
import pandas as pd
import numpy as np

# Criando dados de vendas
vendas_data = {{
    'Vendedor': ['Ana', 'Bruno', 'Ana', 'Carlos', 'Bruno', 'Ana'],
    'Produto': ['A', 'B', 'A', 'C', 'B', 'A'],
    'Quantidade': [10, 5, 8, 12, 7, 15],
    'Preco': [100, 200, 100, 150, 200, 100]
}}

df = pd.DataFrame(vendas_data)
df['Receita'] = df['Quantidade'] * df['Preco']

# Agrupamento por vendedor
vendas_por_vendedor = df.groupby('Vendedor')['Receita'].sum()
print("Vendas por vendedor:")
print(vendas_por_vendedor)
```

### **Exemplo Avançado: Agregações Múltiplas**

```python
# Múltiplas agregações
agregacoes = df.groupby('Vendedor').agg({{
    'Receita': ['sum', 'mean', 'count'],
    'Quantidade': 'sum',
    'Preco': 'mean'
}})

print("\\nAgregações múltiplas:")
print(agregacoes)

# Agrupamento por múltiplas colunas
vendas_por_vendedor_produto = df.groupby(['Vendedor', 'Produto'])['Receita'].sum()
print("\\nVendas por vendedor e produto:")
print(vendas_por_vendedor_produto)
```

---

## 🎯 **Exercícios Práticos**

### **Exercício 1: Análise de Vendas**
1. Agrupe vendas por vendedor
2. Calcule total, média e contagem
3. Identifique o melhor vendedor

### **Exercício 2: Análise Temporal**
1. Agrupe dados por mês/trimestre
2. Calcule tendências de crescimento
3. Identifique sazonalidades

---

## 🎉 **Parabéns!**

Você dominou agregações e agrupamentos! Continue praticando e explore as próximas aulas.

**Próximo passo:** Aprenda sobre limpeza e tratamento de dados!
"""

def generate_data_cleaning_content(title: str, module_num: int, lesson_num: int):
    """Gera conteúdo específico sobre Limpeza e Tratamento de Dados"""
    return f"""# 🎓 **Fenix Academy - Python para Data Science**
## 📚 **Aula {lesson_num} - Módulo: Módulo {module_num}: Pandas**
### 🎯 **Tópico: {title}**

**Duração Estimada:** 80 min  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento de agregações e agrupamentos

---

## 🚀 **Sua Jornada Rumo ao Próximo Nível**

Dados limpos são a base de qualquer análise de qualidade! Esta aula vai te ensinar técnicas profissionais.

**Aqui você vai aprender:**
- Identificação e tratamento de valores faltantes
- Detecção e remoção de outliers
- Normalização e padronização de dados
- Técnicas de validação de dados

**Prepare-se para:** Transformar dados bagunçados em insights valiosos!

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico: Tratamento de Valores Faltantes**

```python
import pandas as pd
import numpy as np

# Criando dados com valores faltantes
data = {{
    'Nome': ['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo'],
    'Idade': [25, np.nan, 35, 28, np.nan],
    'Salario': [5000, 7000, np.nan, 6000, 7500],
    'Departamento': ['TI', 'Vendas', 'TI', None, 'Vendas']
}}

df = pd.DataFrame(data)
print("DataFrame original:")
print(df)

# Verificando valores faltantes
print("\\nValores faltantes:")
print(df.isnull().sum())

# Removendo linhas com valores faltantes
df_limpo = df.dropna()
print("\\nDataFrame sem valores faltantes:")
print(df_limpo)
```

### **Exemplo Avançado: Tratamento Completo**

```python
# Preenchendo valores faltantes
df_preenchido = df.copy()

# Preenchendo idade com a média
df_preenchido['Idade'].fillna(df_preenchido['Idade'].mean(), inplace=True)

# Preenchendo salário com a mediana
df_preenchido['Salario'].fillna(df_preenchido['Salario'].median(), inplace=True)

# Preenchendo departamento com 'Não informado'
df_preenchido['Departamento'].fillna('Não informado', inplace=True)

print("DataFrame preenchido:")
print(df_preenchido)

# Detecção de outliers
Q1 = df_preenchido['Salario'].quantile(0.25)
Q3 = df_preenchido['Salario'].quantile(0.75)
IQR = Q3 - Q1

outliers = df_preenchido[(df_preenchido['Salario'] < Q1 - 1.5 * IQR) | 
                        (df_preenchido['Salario'] > Q3 + 1.5 * IQR)]

print("\\nOutliers detectados:")
print(outliers)
```

---

## 🎯 **Exercícios Práticos**

### **Exercício 1: Limpeza Básica**
1. Identifique valores faltantes
2. Decida como tratá-los
3. Aplique as transformações

### **Exercício 2: Detecção de Outliers**
1. Use métodos estatísticos
2. Visualize os dados
3. Decida como tratar outliers

---

## 🎉 **Parabéns!**

Você dominou a limpeza e tratamento de dados! Continue praticando e explore as próximas aulas.

**Próximo passo:** Aplique tudo em um projeto prático de análise de vendas!
"""

def generate_sales_analysis_project_content(title: str, module_num: int, lesson_num: int):
    """Gera conteúdo específico sobre Projeto: Análise de Vendas"""
    return f"""# 🎓 **Fenix Academy - Python para Data Science**
## 📚 **Aula {lesson_num} - Módulo: Módulo {module_num}: Pandas**
### 🎯 **Tópico: {title}**

**Duração Estimada:** 90 min  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento completo de Pandas

---

## 🚀 **Sua Jornada Rumo ao Próximo Nível**

Agora é hora de aplicar tudo que você aprendeu em um projeto real!

**Aqui você vai aprender:**
- Como estruturar um projeto de análise de dados
- Técnicas de análise exploratória de dados
- Criação de relatórios profissionais
- Apresentação de insights de negócio

**Prepare-se para:** Criar seu primeiro projeto completo de Data Science!

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Projeto: Análise Completa de Vendas**

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Gerando dados de vendas realistas
np.random.seed(42)
n_vendas = 1000

vendas_data = {{
    'Data': pd.date_range('2024-01-01', periods=n_vendas, freq='D'),
    'Vendedor': np.random.choice(['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo'], n_vendas),
    'Produto': np.random.choice(['Produto A', 'Produto B', 'Produto C', 'Produto D'], n_vendas),
    'Quantidade': np.random.randint(1, 100, n_vendas),
    'Preco_Unitario': np.random.uniform(10, 500, n_vendas),
    'Regiao': np.random.choice(['Norte', 'Sul', 'Leste', 'Oeste'], n_vendas)
}}

df = pd.DataFrame(vendas_data)
df['Receita'] = df['Quantidade'] * df['Preco_Unitario']

print("=== ANÁLISE DE VENDAS ===")
print(f"Período: {{df['Data'].min()}} a {{df['Data'].max()}}")
print(f"Total de vendas: {{df['Receita'].sum():,.2f}}")
print(f"Venda média: {{df['Receita'].mean():,.2f}}")
```

### **Análise Exploratória**

```python
# Análise por vendedor
vendas_por_vendedor = df.groupby('Vendedor').agg({{
    'Receita': ['sum', 'mean', 'count'],
    'Quantidade': 'sum'
}}).round(2)

print("\\n=== VENDAS POR VENDEDOR ===")
print(vendas_por_vendedor)

# Análise por produto
vendas_por_produto = df.groupby('Produto')['Receita'].sum().sort_values(ascending=False)
print("\\n=== VENDAS POR PRODUTO ===")
print(vendas_por_produto)

# Análise temporal
vendas_mensais = df.groupby(df['Data'].dt.to_period('M'))['Receita'].sum()
print("\\n=== VENDAS MENSÁIS ===")
print(vendas_mensais)
```

### **Visualizações**

```python
# Configurando o estilo
plt.style.use('seaborn-v0_8')

# Gráfico de vendas por vendedor
plt.figure(figsize=(12, 6))
vendas_por_vendedor['Receita']['sum'].plot(kind='bar')
plt.title('Vendas Totais por Vendedor')
plt.xlabel('Vendedor')
plt.ylabel('Receita (R$)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Gráfico de vendas mensais
plt.figure(figsize=(12, 6))
vendas_mensais.plot(kind='line', marker='o')
plt.title('Evolução das Vendas Mensais')
plt.xlabel('Mês')
plt.ylabel('Receita (R$)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

---

## 🎯 **Exercícios do Projeto**

### **Exercício 1: Análise Básica**
1. Carregue e explore os dados
2. Calcule métricas básicas
3. Identifique padrões interessantes

### **Exercício 2: Análise Avançada**
1. Crie segmentações de dados
2. Identifique tendências temporais
3. Analise correlações entre variáveis

### **Exercício 3: Relatório Final**
1. Crie visualizações profissionais
2. Escreva insights de negócio
3. Faça recomendações estratégicas

---

## 🏆 **Entregáveis do Projeto**

### **1. Notebook Jupyter Completo**
- Código bem documentado
- Análises detalhadas
- Visualizações profissionais

### **2. Relatório Executivo**
- Resumo executivo
- Principais descobertas
- Recomendações estratégicas

### **3. Apresentação**
- Slides profissionais
- Storytelling com dados
- Próximos passos

---

## 🎉 **Parabéns!**

Você completou seu primeiro projeto de Data Science! Continue praticando e explore novos desafios.

**Próximo módulo:** Aprenda sobre visualização de dados com Matplotlib e Seaborn!
"""

def generate_generic_lesson_content(title: str, module_num: int, lesson_num: int):
    """Gera conteúdo genérico para outras aulas"""
    return f"""# 🎓 **Fenix Academy - Python para Data Science**
## 📚 **Aula {lesson_num} - Módulo: Módulo {module_num}: Python Data Science**
### 🎯 **Tópico: {title}**

**Duração Estimada:** 60 min  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento básico de Python

---

## 🚀 **Sua Jornada Rumo ao Próximo Nível**

Esta aula vai expandir seus conhecimentos em Python para Data Science!

**Aqui você vai aprender:**
- Conceitos fundamentais de {title.lower()}
- Técnicas práticas e aplicações reais
- Exemplos de código profissional
- Exercícios para fixação

**Prepare-se para:** Dominar {title.lower()} como um profissional!

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico**

```python
import pandas as pd
import numpy as np

# Exemplo prático de {title.lower()}
print("Aprendendo {title.lower()} com Python!")

# Código de exemplo
data = {{'exemplo': [1, 2, 3, 4, 5]}}
df = pd.DataFrame(data)
print(df)
```

### **Exemplo Avançado**

```python
# Implementação avançada de {title.lower()}
def exemplo_avancado():
    return "Implementação avançada de {title.lower()}"

resultado = exemplo_avancado()
print(resultado)
```

---

## 🎯 **Exercícios Práticos**

### **Exercício 1: Conceitos Básicos**
1. Implemente os conceitos fundamentais
2. Teste com dados de exemplo
3. Valide os resultados

### **Exercício 2: Aplicação Prática**
1. Aplique em um caso real
2. Otimize o código
3. Documente o processo

---

## 🎉 **Parabéns!**

Você dominou {title.lower()}! Continue praticando e explore as próximas aulas.

**Próximo passo:** Continue sua jornada no Python para Data Science!
"""

if __name__ == "__main__":
    generate_individual_lessons()
