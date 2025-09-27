// Interfaces para o conteúdo dos cursos
export interface CourseContent {
  title: string;
  courseId: string;
  modules: ModuleContent[];
}

export interface LessonContent {
  id: number;
  title: string;
  type: 'text' | 'video' | 'quiz' | 'project' | 'exercise' | 'ide';
  duration: string;
  content?: string;
  videoUrl?: string;
  resources?: string[];
  exercises?: string[];
}

export interface ModuleContent {
  id: number;
  title: string;
  lessons: LessonContent[];
  templates?: string[];
  exercises?: string[];
}

// Conteúdo para Fundamentos de Desenvolvimento Web
export const webFundamentalsContent: CourseContent = {
  title: 'Fundamentos de Desenvolvimento Web',
  courseId: 'fundamentos-desenvolvimento-web',
  modules: [
    {
      id: 1,
      title: 'Fundamentos e Introdução',
      lessons: [
        {
          id: 1,
          title: 'Resumo Executivo e Objetivos',
          type: 'text',
          duration: '45 min',
          content: `# 🌐 FUNDAMENTOS DE DESENVOLVIMENTO WEB

## 📋 RESUMO EXECUTIVO
Este curso oferece uma jornada completa do básico ao avançado em desenvolvimento web. Os alunos aprenderão HTML5, CSS3 e JavaScript ES6+ através de projetos práticos, exercícios interativos e uma IDE integrada.

### 🚀 DIFERENCIAIS
- **IDE Integrada**: Ambiente de desenvolvimento completo com preview em tempo real
- **Gamificação**: Sistema de conquistas, níveis e progresso
- **Projetos Práticos**: Portfolio profissional, Landing Page e Dashboard interativo
- **Exercícios Interativos**: Desafios práticos com feedback imediato
- **Mentoria Virtual**: Sistema de dicas e explicações contextuais

## 🎯 OBJETIVOS DE APRENDIZAGEM

### 🧠 CONHECIMENTO (Lembrar)
- Identificar elementos HTML5 semânticos e suas funções
- Reconhecer estrutura DOM e hierarquia de elementos
- Compreender regras CSS, especificidade e cascata
- Entender conceitos de responsividade, acessibilidade e SEO

### 🔍 COMPREENSÃO (Entender)
- Explicar como HTML estrutura o conteúdo de forma semântica
- Descrever como CSS controla a apresentação e layout
- Entender como JavaScript adiciona interatividade e dinamismo
- Compreender o modelo de caixa CSS e posicionamento

### 🛠️ APLICAÇÃO (Aplicar)
- Criar páginas responsivas e interativas para diferentes dispositivos
- Implementar layouts complexos com Flexbox e CSS Grid
- Desenvolver formulários robustos com validação client-side
- Criar animações, transições e micro-interações CSS

## 📋 MAPA COMPLETO DO CURSO

### 🚀 MÓDULO 1: Fundamentos e Introdução (3 aulas)
- Resumo Executivo e Objetivos
- IDE integrada
- Configuração do Ambiente de Desenvolvimento

### 🌐 MÓDULO 2: HTML5 Semântico (5 aulas)
- Introdução ao HTML5 e Semântica
- Estrutura de Documento e Metadados
- Elementos de Texto e Formatação
- Formulários e Validação HTML5
- Tabelas e Dados Estruturados

### 🎨 MÓDULO 3: CSS3 Fundamentos (6 aulas)
- Introdução ao CSS3 e Seletores
- Modelo de Caixa e Posicionamento
- Cores, Tipografia e Backgrounds
- Flexbox para Layouts Flexíveis
- CSS Grid para Layouts Complexos
- Responsividade e Media Queries

### ⚡ MÓDULO 4: JavaScript Básico (8 aulas)
- Introdução ao JavaScript ES6+
- Variáveis, Tipos e Operadores
- Estruturas de Controle e Loops
- Funções e Escopo
- Arrays e Objetos
- Manipulação do DOM
- Eventos e Interatividade
- Validação de Formulários

### 🔧 MÓDULO 5: Ferramentas e Workflow (4 aulas)
- Git e Controle de Versão
- DevTools e Debugging
- Performance e Otimização
- Deploy e Hosting

### 🎯 MÓDULO 6: Projetos Práticos (6 aulas)
- Portfolio Pessoal Responsivo
- Landing Page para Produto
- Dashboard Interativo
- Formulário Multi-step
- Galeria de Imagens
- Projeto Final Integrado

## 🏆 SISTEMA DE CONQUISTAS

### 🎯 Conquistas de Progresso
- **Primeira Aula**: Complete sua primeira aula
- **Módulo Completo**: Finalize um módulo inteiro
- **Projeto Concluído**: Termine um projeto prático
- **Responsividade**: Crie uma página totalmente responsiva
- **Acessibilidade**: Implemente padrões de acessibilidade

### 🚀 Conquistas de Habilidade
- **HTML Master**: Domine todos os conceitos HTML5
- **CSS Wizard**: Seja especialista em CSS3
- **JavaScript Ninja**: Aprenda JavaScript avançado
- **Performance Guru**: Otimize para máxima velocidade
- **SEO Expert**: Implemente SEO técnico

## 🎯 RESULTADO ESPERADO
Ao final deste curso, você será capaz de:
- ✅ Desenvolver websites profissionais e responsivos
- ✅ Implementar layouts modernos com CSS Grid e Flexbox
- ✅ Criar interações dinâmicas com JavaScript
- ✅ Otimizar performance e acessibilidade
- ✅ Deployar projetos em produção
- ✅ Continuar aprendendo frameworks modernos

**🎓 Certificado CS50 Style**: Reconhecimento da qualidade Harvard`
        },
        {
          id: 2,
          title: 'IDE CS50 Integrada',
          type: 'ide',
          duration: '90 min',
          content: `# 🛠️ IDE CS50 INTEGRADA

## 🌟 VISÃO GERAL
A IDE CS50 é um ambiente de desenvolvimento integrado de última geração que oferece suporte completo para Web Development, Python, Data Science e muito mais. Desenvolvida seguindo os padrões da Universidade de Harvard, oferece uma experiência profissional em um ambiente educacional.

## ✨ CARACTERÍSTICAS PRINCIPAIS

### 🔧 **Editor Multi-linguagem**
- **HTML5**: Syntax highlighting, autocomplete e validação
- **CSS3**: IntelliSense para propriedades e valores
- **JavaScript ES6+**: Debugging avançado e refatoração
- **Python**: Interpretador integrado e gerenciamento de pacotes
- **Markdown**: Preview em tempo real com formatação

### 🖥️ **Live Preview**
- **Visualização em Tempo Real**: Alterações refletem instantaneamente
- **Multi-dispositivo**: Simula diferentes resoluções e orientações
- **Hot Reload**: Recarrega automaticamente ao salvar
- **Console Integrado**: Logs e erros em tempo real
- **Network Inspector**: Monitora requisições e performance

### 🐛 **Debug Console Profissional**
- **Breakpoints Inteligentes**: Pausa execução em pontos específicos
- **Step-through**: Execução linha por linha
- **Variable Inspector**: Visualiza estado das variáveis
- **Call Stack**: Rastreia execução de funções
- **Performance Profiler**: Identifica gargalos de performance

### 📱 **Device Simulator**
- **Resoluções Comuns**: Desktop, tablet, mobile
- **Orientação**: Portrait e landscape
- **Touch Events**: Simula interações touch
- **Network Throttling**: Testa performance em conexões lentas
- **Accessibility Testing**: Verifica padrões de acessibilidade

### 🎨 **Templates Premium**
- **Landing Pages**: Templates para produtos e serviços
- **Portfolios**: Estruturas profissionais para desenvolvedores
- **Dashboards**: Interfaces administrativas completas
- **E-commerce**: Lojas online funcionais
- **Blogs**: Sistemas de publicação de conteúdo

## 🚀 CONFIGURAÇÃO INICIAL

### ⚙️ **Primeira Execução**
\`\`\`bash
# Instalação automática de dependências
npm install -g @fenix-academy/ide-cli

# Configuração do ambiente
fenix-ide setup --course web-fundamentals

# Inicialização do servidor local
fenix-ide start --port 3000
\`\`\`

### 🔧 **Configuração Avançada**
\`\`\`json
{
  "editor": {
    "theme": "fenix-dark",
    "fontSize": 14,
    "tabSize": 2,
    "wordWrap": true
  },
  "preview": {
    "autoRefresh": true,
    "defaultDevice": "desktop",
    "showGrid": false
  },
  "debug": {
    "enableBreakpoints": true,
    "showConsole": true,
    "logLevel": "info"
  }
}
\`\`\`

## 🎯 BENEFÍCIOS DESTA IDE

### **🔐 Segurança:**
- Ambiente isolado e seguro
- Sem necessidade de instalação local
- Backup automático de projetos
- Versionamento integrado

### **⚡ Performance:**
- Compilação em tempo real
- Hot reload instantâneo
- Otimização automática de assets
- Cache inteligente

### **🎓 Educacional:**
- Interface intuitiva para iniciantes
- Dicas contextuais e explicações
- Sistema de progresso integrado
- Feedback imediato de erros

## 🚀 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Configurar seu ambiente de desenvolvimento
2. Criar seu primeiro projeto HTML
3. Entender a estrutura básica de uma página web
4. Implementar estilos CSS
5. Adicionar interatividade com JavaScript

**🎓 Dica**: Use o React DevTools para debugar estado e o Performance Monitor para otimizar a performance!`
        }
      ]
    }
  ]
};

// Conteúdo para Python Data Science
export const pythonDataScienceContent: CourseContent = {
  title: 'Python para Data Science',
  courseId: 'python-data-science',
  modules: [
    {
      id: 1,
      title: 'Fundamentos de Python',
      lessons: [
        {
          id: 1,
          title: 'Introdução ao Python e Data Science',
          type: 'text',
          duration: '60 min',
          content: `# 🐍 INTRODUÇÃO AO PYTHON E DATA SCIENCE

## 🎯 OBJETIVOS
- Compreender conceitos fundamentais de Data Science
- Aprender Python para análise de dados
- Entender o ecossistema de bibliotecas Python
- Introdução a Machine Learning

## 📚 CONCEITOS FUNDAMENTAIS

### O que é Data Science?
Data Science é um campo interdisciplinar que combina estatística, programação e conhecimento de domínio para extrair insights valiosos de dados.

**Componentes Principais:**
- **Coleta de Dados**: APIs, web scraping, bancos de dados
- **Limpeza e Preparação**: Tratamento de dados faltantes e outliers
- **Análise Exploratória**: Visualização e estatísticas descritivas
- **Modelagem**: Machine Learning e algoritmos preditivos
- **Comunicação**: Dashboards e relatórios

## 🐍 PYTHON PARA DATA SCIENCE

### **Por que Python?**
- **Simplicidade**: Sintaxe clara e legível
- **Ecossistema Rico**: Pandas, NumPy, Matplotlib, Scikit-learn
- **Comunidade Ativa**: Suporte e documentação extensos
- **Versatilidade**: Web, mobile, desktop, data science

### **Bibliotecas Essenciais:**
- **NumPy**: Computação numérica eficiente
- **Pandas**: Manipulação e análise de dados
- **Matplotlib/Seaborn**: Visualização de dados
- **Scikit-learn**: Machine Learning
- **Jupyter**: Ambiente interativo de desenvolvimento

## 💻 LABORATÓRIO: PRIMEIRO PROJETO

\`\`\`python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fenix Academy - Primeiro Projeto de Data Science
Análise de vendas de uma loja online
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Configuração do ambiente
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

def gerar_dados_vendas():
    """Gerar dados simulados de vendas"""
    np.random.seed(42)
    
    # Parâmetros
    n_vendas = 1000
    data_inicio = datetime(2023, 1, 1)
    
    # Gerar dados
    datas = [data_inicio + timedelta(days=np.random.randint(0, 365)) for _ in range(n_vendas)]
    produtos = np.random.choice(['Notebook', 'Smartphone', 'Tablet', 'Headphone', 'Mouse'], n_vendas)
    valores = np.random.normal(500, 200, n_vendas)
    valores = np.maximum(valores, 50)  # Valor mínimo de R$ 50
    
    # Criar DataFrame
    df = pd.DataFrame({
        'data': datas,
        'produto': produtos,
        'valor': valores,
        'quantidade': np.random.randint(1, 5, n_vendas)
    })
    
    # Calcular total
    df['total'] = df['valor'] * df['quantidade']
    
    return df

def analise_exploratoria(df):
    """Realizar análise exploratória dos dados"""
    print("📊 ANÁLISE EXPLORATÓRIA DE VENDAS")
    print("=" * 50)
    
    # Informações básicas
    print(f"\\n📈 Total de vendas: {len(df)}")
    print(f"💰 Receita total: R$ {df['total'].sum():,.2f}")
    print(f"📅 Período: {df['data'].min().strftime('%d/%m/%Y')} a {df['data'].max().strftime('%d/%m/%Y')}")
    
    # Estatísticas descritivas
    print("\\n📊 ESTATÍSTICAS DESCRITIVAS:")
    print(df['total'].describe())
    
    # Vendas por produto
    print("\\n🛍️ VENDAS POR PRODUTO:")
    vendas_produto = df.groupby('produto').agg({
        'total': ['count', 'sum', 'mean']
    }).round(2)
    vendas_produto.columns = ['Quantidade', 'Receita Total', 'Ticket Médio']
    print(vendas_produto)
    
    return vendas_produto

def visualizacoes(df):
    """Criar visualizações dos dados"""
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    fig.suptitle('📊 Dashboard de Vendas - Fenix Academy', fontsize=16, fontweight='bold')
    
    # 1. Vendas por produto
    vendas_produto = df.groupby('produto')['total'].sum().sort_values(ascending=True)
    vendas_produto.plot(kind='barh', ax=axes[0,0], color='skyblue')
    axes[0,0].set_title('💰 Receita por Produto')
    axes[0,0].set_xlabel('Receita (R$)')
    
    # 2. Distribuição de valores
    axes[0,1].hist(df['total'], bins=30, alpha=0.7, color='lightgreen', edgecolor='black')
    axes[0,1].set_title('📈 Distribuição de Valores')
    axes[0,1].set_xlabel('Valor da Venda (R$)')
    axes[0,1].set_ylabel('Frequência')
    
    # 3. Vendas ao longo do tempo
    df_mensal = df.groupby(df['data'].dt.to_period('M'))['total'].sum()
    df_mensal.plot(kind='line', ax=axes[1,0], marker='o', color='orange')
    axes[1,0].set_title('📅 Vendas Mensais')
    axes[1,0].set_xlabel('Mês')
    axes[1,0].set_ylabel('Receita (R$)')
    axes[1,0].tick_params(axis='x', rotation=45)
    
    # 4. Box plot por produto
    df.boxplot(column='total', by='produto', ax=axes[1,1])
    axes[1,1].set_title('📦 Distribuição de Valores por Produto')
    axes[1,1].set_xlabel('Produto')
    axes[1,1].set_ylabel('Valor (R$)')
    
    plt.tight_layout()
    plt.show()

def insights_principais(df):
    """Extrair insights principais dos dados"""
    print("\\n🔍 INSIGHTS PRINCIPAIS")
    print("=" * 30)
    
    # Produto mais vendido
    produto_mais_vendido = df.groupby('produto')['total'].sum().idxmax()
    receita_produto = df.groupby('produto')['total'].sum().max()
    print(f"🏆 Produto mais vendido: {produto_mais_vendido} (R$ {receita_produto:,.2f})")
    
    # Mês com maior vendas
    df['mes'] = df['data'].dt.to_period('M')
    mes_maior_vendas = df.groupby('mes')['total'].sum().idxmax()
    vendas_mes = df.groupby('mes')['total'].sum().max()
    print(f"📅 Mês com maior vendas: {mes_maior_vendas} (R$ {vendas_mes:,.2f})")
    
    # Ticket médio geral
    ticket_medio = df['total'].mean()
    print(f"💳 Ticket médio: R$ {ticket_medio:,.2f}")
    
    # Crescimento mensal
    df_mensal = df.groupby(df['data'].dt.to_period('M'))['total'].sum()
    if len(df_mensal) > 1:
        crescimento = ((df_mensal.iloc[-1] - df_mensal.iloc[0]) / df_mensal.iloc[0]) * 100
        print(f"📈 Crescimento no período: {crescimento:.1f}%")

# Executar análise
if __name__ == "__main__":
    print("🐍 FENIX ACADEMY - DATA SCIENCE COM PYTHON")
    print("=" * 50)
    
    # Gerar dados
    print("\\n📊 Gerando dados de vendas...")
    df_vendas = gerar_dados_vendas()
    
    # Análise exploratória
    vendas_por_produto = analise_exploratoria(df_vendas)
    
    # Visualizações
    print("\\n📈 Criando visualizações...")
    visualizacoes(df_vendas)
    
    # Insights
    insights_principais(df_vendas)
    
    print("\\n✅ Análise concluída com sucesso!")
    print("🎓 Parabéns! Você completou seu primeiro projeto de Data Science!")
\`\`\`

## 🎯 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Manipular dados com Pandas
2. Criar visualizações avançadas
3. Implementar Machine Learning
4. Trabalhar com APIs de dados
5. Criar dashboards interativos

**🎓 Dica**: Use Jupyter Notebooks para experimentação interativa e explore datasets reais no Kaggle!`
        }
      ]
    }
  ]
};

// Conteúdo para React Avançado
export const reactAdvancedContent: CourseContent = {
  title: 'React JS Avançado',
  courseId: 'react-avancado',
  modules: [
    {
      id: 1,
      title: 'Fundamentos Avançados',
      lessons: [
        {
          id: 1,
          title: 'Hooks Avançados e Performance',
          type: 'text',
          duration: '75 min',
          content: `# ⚛️ HOOKS AVANÇADOS E PERFORMANCE

## 🎯 OBJETIVOS
- Dominar hooks avançados do React
- Otimizar performance de aplicações
- Implementar padrões avançados
- Gerenciar estado complexo

## 🪝 HOOKS AVANÇADOS

### **useCallback e useMemo**
\`\`\`jsx
import React, { useState, useCallback, useMemo } from 'react';

const ExpensiveComponent = ({ items, filter }) => {
  // useMemo para cálculos pesados
  const filteredItems = useMemo(() => {
    console.log('Filtrando items...');
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  // useCallback para funções que são passadas como props
  const handleClick = useCallback((id) => {
    console.log('Item clicado:', id);
  }, []);

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
};
\`\`\`

### **useReducer para Estado Complexo**
\`\`\`jsx
import React, { useReducer } from 'react';

const initialState = {
  loading: false,
  data: null,
  error: null,
  filters: {
    category: 'all',
    price: { min: 0, max: 1000 }
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload }
      };
    default:
      return state;
  }
}

const ProductList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  return (
    <div>
      {state.loading && <div>Carregando...</div>}
      {state.error && <div>Erro: {state.error}</div>}
      {state.data && <div>Produtos: {state.data.length}</div>}
    </div>
  );
};
\`\`\`

## ⚡ OTIMIZAÇÃO DE PERFORMANCE

### **React.memo para Componentes**
\`\`\`jsx
import React, { memo } from 'react';

const UserCard = memo(({ user, onEdit }) => {
  console.log('UserCard renderizado');
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Editar</button>
    </div>
  );
});

// Comparação customizada
const UserCardWithCustomComparison = memo(
  ({ user, onEdit }) => {
    return (
      <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button onClick={() => onEdit(user.id)}>Editar</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id &&
           prevProps.user.name === nextProps.user.name;
  }
);
\`\`\`

### **Lazy Loading de Componentes**
\`\`\`jsx
import React, { Suspense, lazy } from 'react';

// Lazy loading de componentes
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentPage('profile')}>Profile</button>
        <button onClick={() => setCurrentPage('settings')}>Settings</button>
      </nav>
      
      <Suspense fallback={<div>Carregando...</div>}>
        {renderPage()}
      </Suspense>
    </div>
  );
};
\`\`\`

## 🎯 PADRÕES AVANÇADOS

### **Custom Hooks**
\`\`\`jsx
import { useState, useEffect, useCallback } from 'react';

// Hook para gerenciar API
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook para gerenciar formulários
const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validação em tempo real
    if (validationRules[name]) {
      const error = validationRules[name](value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some(error => error);
    if (!hasErrors) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  };
};

// Uso dos hooks
const UserForm = () => {
  const validationRules = {
    name: (value) => value.length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : '',
    email: (value) => !/\\S+@\\S+\\.\\S+/.test(value) ? 'Email inválido' : ''
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { name: '', email: '' },
    validationRules
  );

  const onSubmit = (formValues) => {
    console.log('Formulário enviado:', formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Nome"
      />
      {touched.name && errors.name && <span>{errors.name}</span>}
      
      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
      />
      {touched.email && errors.email && <span>{errors.email}</span>}
      
      <button type="submit">Enviar</button>
    </form>
  );
};
\`\`\`

## 🚀 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Implementar Context API avançado
2. Gerenciar estado global com Redux
3. Criar testes unitários e de integração
4. Implementar Server-Side Rendering
5. Otimizar bundle e performance

**🎓 Dica**: Use React DevTools Profiler para identificar componentes que precisam de otimização!`
        }
      ]
    }
  ]
};

// Conteúdo para cursos de Mobile
export const mobileDevelopmentContent: CourseContent = {
  title: 'Desenvolvimento Mobile',
  courseId: 'mobile-development',
  modules: [
    {
      id: 1,
      title: 'Fundamentos do Desenvolvimento Mobile',
      lessons: [
        {
          id: 1,
          title: 'Introdução ao Desenvolvimento Mobile',
          type: 'text',
          duration: '45 min',
          content: `# 📱 DESENVOLVIMENTO MOBILE

## 🎯 OBJETIVOS
- Compreender os fundamentos do desenvolvimento mobile
- Aprender sobre as principais plataformas (iOS e Android)
- Entender os diferentes tipos de aplicações mobile
- Conhecer as ferramentas e tecnologias essenciais

## 📚 CONCEITOS FUNDAMENTAIS

### O que é Desenvolvimento Mobile?
O desenvolvimento mobile é o processo de criação de aplicações para dispositivos móveis como smartphones e tablets. É uma área em constante crescimento que combina design, programação e experiência do usuário.

**Principais Plataformas:**
- **iOS**: Sistema operacional da Apple
- **Android**: Sistema operacional do Google
- **Cross-platform**: Soluções que funcionam em ambas as plataformas

### Tipos de Aplicações Mobile

**1. Aplicações Nativas**
- Desenvolvidas especificamente para cada plataforma
- Máxima performance e acesso a recursos do dispositivo
- Linguagens: Swift/Objective-C (iOS), Java/Kotlin (Android)

**2. Aplicações Híbridas**
- Combinam tecnologias web com recursos nativos
- Desenvolvimento mais rápido e econômico
- Tecnologias: Ionic, Cordova, PhoneGap

**3. Aplicações Cross-Platform**
- Um código base para múltiplas plataformas
- Boa performance e desenvolvimento eficiente
- Tecnologias: React Native, Flutter, Xamarin

## 🛠️ FERRAMENTAS ESSENCIAIS

### Desenvolvimento iOS
- **Xcode**: IDE oficial da Apple
- **Swift**: Linguagem de programação moderna
- **Simulator**: Emulador para testes
- **TestFlight**: Distribuição de testes

### Desenvolvimento Android
- **Android Studio**: IDE oficial do Google
- **Kotlin**: Linguagem recomendada pelo Google
- **Emulator**: Emulador Android
- **Google Play Console**: Distribuição de apps

### Desenvolvimento Cross-Platform
- **React Native**: JavaScript/TypeScript
- **Flutter**: Dart
- **Xamarin**: C#

## 🎯 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Configurar o ambiente de desenvolvimento
2. Criar seu primeiro projeto mobile
3. Entender a estrutura de um app
4. Implementar interfaces responsivas
5. Testar em dispositivos reais

**🎓 Dica**: Comece com uma plataforma e domine-a antes de expandir para outras!`
        }
      ]
    }
  ]
};

// Conteúdo para cursos de Backend
export const backendDevelopmentContent: CourseContent = {
  title: 'Desenvolvimento Backend',
  courseId: 'backend-development',
  modules: [
    {
      id: 1,
      title: 'Fundamentos do Backend',
      lessons: [
        {
          id: 1,
          title: 'Introdução ao Desenvolvimento Backend',
          type: 'text',
          duration: '50 min',
          content: `# 🖥️ DESENVOLVIMENTO BACKEND

## 🎯 OBJETIVOS
- Compreender o papel do backend em aplicações web
- Aprender sobre APIs e comunicação cliente-servidor
- Entender bancos de dados e persistência
- Conhecer as principais tecnologias backend

## 📚 CONCEITOS FUNDAMENTAIS

### O que é Backend?
O backend é a parte "invisível" de uma aplicação que roda no servidor. É responsável por processar dados, gerenciar banco de dados, autenticação e toda a lógica de negócio.

**Principais Responsabilidades:**
- **Processamento de Dados**: Lógica de negócio e cálculos
- **Gerenciamento de Banco de Dados**: CRUD operations
- **Autenticação e Autorização**: Segurança e controle de acesso
- **APIs**: Comunicação com frontend e outros serviços

### Arquitetura Cliente-Servidor

**Frontend (Cliente)**
- Interface do usuário
- Interação com o usuário
- Requisições para o backend

**Backend (Servidor)**
- Processamento de requisições
- Lógica de negócio
- Gerenciamento de dados
- Respostas para o cliente

## 🛠️ TECNOLOGIAS BACKEND

### Linguagens Populares
- **JavaScript/Node.js**: JavaScript no servidor
- **Python**: Django, Flask, FastAPI
- **Java**: Spring Boot, Jakarta EE
- **C#**: .NET Core, ASP.NET
- **PHP**: Laravel, Symfony
- **Go**: Gin, Echo
- **Rust**: Actix, Rocket

### Bancos de Dados
- **Relacionais**: MySQL, PostgreSQL, SQL Server
- **NoSQL**: MongoDB, Redis, Cassandra
- **Cloud**: AWS RDS, Google Cloud SQL

### Frameworks e Ferramentas
- **APIs REST**: Padrão para comunicação
- **GraphQL**: Query language para APIs
- **Docker**: Containerização
- **Kubernetes**: Orquestração de containers

## 🎯 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Configurar ambiente de desenvolvimento
2. Criar sua primeira API REST
3. Conectar com banco de dados
4. Implementar autenticação
5. Fazer deploy em produção

**🎓 Dica**: Comece com Node.js + Express para uma curva de aprendizado mais suave!`
        }
      ]
    }
  ]
};

// Conteúdo para cursos de Data Science
export const dataScienceContent: CourseContent = {
  title: 'Data Science',
  courseId: 'data-science',
  modules: [
    {
      id: 1,
      title: 'Fundamentos de Data Science',
      lessons: [
        {
          id: 1,
          title: 'Introdução à Data Science',
          type: 'text',
          duration: '55 min',
          content: `# 📊 DATA SCIENCE

## 🎯 OBJETIVOS
- Compreender o que é Data Science e seu impacto
- Aprender sobre o processo de análise de dados
- Conhecer as principais ferramentas e tecnologias
- Entender casos de uso reais na indústria

## 📚 CONCEITOS FUNDAMENTAIS

### O que é Data Science?
Data Science é um campo interdisciplinar que combina estatística, programação e conhecimento de domínio para extrair insights valiosos de dados. É uma das áreas mais promissoras da tecnologia atual.

**Componentes Principais:**
- **Matemática e Estatística**: Base teórica sólida
- **Programação**: Ferramentas para análise
- **Conhecimento de Domínio**: Contexto do negócio
- **Visualização**: Comunicação de resultados

### O Processo de Data Science

**1. Coleta de Dados (Data Collection)**
- APIs, web scraping, bancos de dados
- Dados estruturados e não estruturados
- Qualidade e limpeza dos dados

**2. Exploração e Análise (EDA)**
- Estatísticas descritivas
- Visualizações exploratórias
- Identificação de padrões e outliers

**3. Modelagem (Modeling)**
- Machine Learning e algoritmos
- Treinamento e validação de modelos
- Otimização de hiperparâmetros

**4. Implementação (Deployment)**
- Modelos em produção
- Monitoramento e manutenção
- Feedback loops

## 🛠️ FERRAMENTAS ESSENCIAIS

### Linguagens de Programação
- **Python**: Pandas, NumPy, Scikit-learn
- **R**: Estatística e visualização
- **SQL**: Consultas em bancos de dados
- **Scala**: Big Data com Spark

### Bibliotecas Python
- **Pandas**: Manipulação de dados
- **NumPy**: Computação numérica
- **Matplotlib/Seaborn**: Visualização
- **Scikit-learn**: Machine Learning
- **TensorFlow/PyTorch**: Deep Learning

### Ferramentas de Big Data
- **Apache Spark**: Processamento distribuído
- **Hadoop**: Armazenamento distribuído
- **Kafka**: Streaming de dados
- **Airflow**: Orquestração de pipelines

## 🎯 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Configurar ambiente Python para Data Science
2. Carregar e explorar datasets
3. Criar visualizações impactantes
4. Implementar algoritmos de ML
5. Construir dashboards interativos

**🎓 Dica**: Comece com datasets pequenos e reais do Kaggle para praticar!`
        }
      ]
    }
  ]
};

// Conteúdo específico para Python Data Science
export const pythonDataScienceSpecificContent: CourseContent = {
  title: 'Python para Data Science',
  courseId: 'python-data-science-specific',
  modules: [
    {
      id: 1,
      title: 'Introdução ao Python para Data Science',
      lessons: [
        {
          id: 1,
          title: 'Primeira Aula - Python para Data Science',
          type: 'text',
          duration: '60 min',
          content: `# 🐍 PYTHON PARA DATA SCIENCE

## 🎯 OBJETIVOS
- Compreender conceitos fundamentais de Data Science
- Aprender Python para análise de dados
- Entender o ecossistema de bibliotecas Python
- Introdução a Machine Learning

## 📚 CONCEITOS FUNDAMENTAIS

### O que é Data Science?
Data Science é um campo interdisciplinar que combina estatística, programação e conhecimento de domínio para extrair insights valiosos de dados.

**Componentes Principais:**
- Coleta de Dados: APIs, web scraping, bancos de dados
- Limpeza e Preparação: Tratamento de dados faltantes e outliers
- Análise Exploratória: Visualização e estatísticas descritivas
- Modelagem: Machine Learning e algoritmos preditivos
- Comunicação: Dashboards e relatórios

## 🐍 PYTHON PARA DATA SCIENCE

### Por que Python?
- **Simplicidade**: Sintaxe clara e legível
- **Ecossistema Rico**: Pandas, NumPy, Matplotlib, Scikit-learn
- **Comunidade Ativa**: Suporte e documentação extensos
- **Versatilidade**: Web, mobile, desktop, data science

### Bibliotecas Essenciais:
- **NumPy**: Computação numérica eficiente
- **Pandas**: Manipulação e análise de dados
- **Matplotlib/Seaborn**: Visualização de dados
- **Scikit-learn**: Machine Learning
- **Jupyter**: Ambiente interativo de desenvolvimento

## 💻 LABORATÓRIO: PRIMEIRO PROJETO

\`\`\`python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fenix Academy - Primeiro Projeto de Data Science
Análise de vendas de uma loja online
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Configuração do ambiente
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

def gerar_dados_vendas():
    """Gerar dados simulados de vendas"""
    np.random.seed(42)
    
    # Parâmetros
    n_vendas = 1000
    data_inicio = datetime(2023, 1, 1)
    
    # Gerar dados
    datas = [data_inicio + timedelta(days=np.random.randint(0, 365)) for _ in range(n_vendas)]
    produtos = np.random.choice(['Notebook', 'Smartphone', 'Tablet', 'Headphone', 'Mouse'], n_vendas)
    valores = np.random.normal(500, 200, n_vendas)
    valores = np.maximum(valores, 50)  # Valor mínimo de R$ 50
    
    # Criar DataFrame
    df = pd.DataFrame({
        'data': datas,
        'produto': produtos,
        'valor': valores,
        'quantidade': np.random.randint(1, 5, n_vendas)
    })
    
    # Calcular total
    df['total'] = df['valor'] * df['quantidade']
    
    return df

def analise_exploratoria(df):
    """Realizar análise exploratória dos dados"""
    print("📊 ANÁLISE EXPLORATÓRIA DE VENDAS")
    print("=" * 50)
    
    # Informações básicas
    print(f"\\n📈 Total de vendas: {len(df)}")
    print(f"💰 Receita total: R$ {df['total'].sum():,.2f}")
    print(f"📅 Período: {df['data'].min().strftime('%d/%m/%Y')} a {df['data'].max().strftime('%d/%m/%Y')}")
    
    # Estatísticas descritivas
    print("\\n📊 ESTATÍSTICAS DESCRITIVAS:")
    print(df['total'].describe())
    
    # Vendas por produto
    print("\\n🛍️ VENDAS POR PRODUTO:")
    vendas_produto = df.groupby('produto').agg({
        'total': ['count', 'sum', 'mean']
    }).round(2)
    vendas_produto.columns = ['Quantidade', 'Receita Total', 'Ticket Médio']
    print(vendas_produto)
    
    return vendas_produto

# Executar análise
if __name__ == "__main__":
    print("🐍 FENIX ACADEMY - DATA SCIENCE COM PYTHON")
    print("=" * 50)
    
    # Gerar dados
    print("\\n📊 Gerando dados de vendas...")
    df_vendas = gerar_dados_vendas()
    
    # Análise exploratória
    vendas_por_produto = analise_exploratoria(df_vendas)
    
    print("\\n✅ Análise concluída com sucesso!")
    print("🎓 Parabéns! Você completou seu primeiro projeto de Data Science!")
\`\`\`

## 🎯 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Manipular dados com Pandas
2. Criar visualizações avançadas
3. Implementar Machine Learning
4. Trabalhar com APIs de dados
5. Criar dashboards interativos

**🎓 Dica**: Use Jupyter Notebooks para experimentação interativa e explore datasets reais no Kaggle!`
        }
      ]
    }
  ]
};

// Conteúdo específico para Node.js APIs
export const nodejsApisContent: CourseContent = {
  title: 'Node.js e APIs',
  courseId: 'nodejs-apis-specific',
  modules: [
    {
      id: 1,
      title: 'Fundamentos de APIs com Node.js',
      lessons: [
        {
          id: 1,
          title: 'Introdução ao Node.js e APIs REST',
          type: 'text',
          duration: '50 min',
          content: `# 🚀 NODE.JS E APIs REST

## 🎯 OBJETIVOS
- Compreender o que são APIs REST
- Aprender os fundamentos do Node.js
- Entender o ciclo de requisição-resposta
- Criar sua primeira API REST

## 📚 CONCEITOS FUNDAMENTAIS

### O que é uma API?
API (Application Programming Interface) é um conjunto de regras e protocolos que permite que diferentes aplicações se comuniquem entre si. É como um "garçom" que leva pedidos da cozinha (servidor) para a mesa (cliente).

### O que é Node.js?
Node.js é um runtime JavaScript que permite executar JavaScript no servidor. É baseado no motor V8 do Google Chrome e é perfeito para construir APIs rápidas e escaláveis.

**Características do Node.js:**
- **Assíncrono**: Não bloqueia o thread principal
- **Event-driven**: Baseado em eventos
- **NPM**: Ecossistema de pacotes gigantesco
- **JavaScript**: Mesma linguagem no frontend e backend

## 🛠️ FERRAMENTAS ESSENCIAIS

### Core do Node.js
- **HTTP Module**: Para criar servidores web
- **File System**: Para manipular arquivos
- **Path**: Para trabalhar com caminhos
- **URL**: Para parsing de URLs

### Frameworks Populares
- **Express.js**: Framework web minimalista
- **Fastify**: Framework rápido e eficiente
- **Koa.js**: Framework moderno com async/await
- **NestJS**: Framework com TypeScript

### Bancos de Dados
- **MongoDB**: Banco NoSQL
- **PostgreSQL**: Banco relacional
- **Redis**: Cache em memória
- **MySQL**: Banco relacional popular

## 💻 LABORATÓRIO: PRIMEIRA API

\`\`\`javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados de exemplo (em produção, viria de um banco de dados)
let usuarios = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', idade: 25 },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', idade: 30 },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', idade: 28 }
];

// ROTAS DA API

// GET /api/usuarios - Listar todos os usuários
app.get('/api/usuarios', (req, res) => {
    res.json({
        success: true,
        data: usuarios,
        total: usuarios.length
    });
});

// GET /api/usuarios/:id - Buscar usuário por ID
app.get('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    
    if (!usuario) {
        return res.status(404).json({
            success: false,
            message: 'Usuário não encontrado'
        });
    }
    
    res.json({
        success: true,
        data: usuario
    });
});

// POST /api/usuarios - Criar novo usuário
app.post('/api/usuarios', (req, res) => {
    const { nome, email, idade } = req.body;
    
    // Validação básica
    if (!nome || !email || !idade) {
        return res.status(400).json({
            success: false,
            message: 'Nome, email e idade são obrigatórios'
        });
    }
    
    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email,
        idade: parseInt(idade)
    };
    
    usuarios.push(novoUsuario);
    
    res.status(201).json({
        success: true,
        data: novoUsuario,
        message: 'Usuário criado com sucesso'
    });
});

// PUT /api/usuarios/:id - Atualizar usuário
app.put('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, idade } = req.body;
    
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    
    if (usuarioIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Usuário não encontrado'
        });
    }
    
    usuarios[usuarioIndex] = {
        ...usuarios[usuarioIndex],
        nome: nome || usuarios[usuarioIndex].nome,
        email: email || usuarios[usuarioIndex].email,
        idade: idade || usuarios[usuarioIndex].idade
    };
    
    res.json({
        success: true,
        data: usuarios[usuarioIndex],
        message: 'Usuário atualizado com sucesso'
    });
});

// DELETE /api/usuarios/:id - Deletar usuário
app.delete('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    
    if (usuarioIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Usuário não encontrado'
        });
    }
    
    usuarios.splice(usuarioIndex, 1);
    
    res.json({
        success: true,
        message: 'Usuário deletado com sucesso'
    });
});

// Rota de teste
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando perfeitamente!',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(\`🚀 Servidor rodando na porta \${PORT}\`);
    console.log(\`📡 API disponível em http://localhost:\${PORT}/api\`);
    console.log('\\n📋 Endpoints disponíveis:');
    console.log('  GET    /api/usuarios     - Listar usuários');
    console.log('  GET    /api/usuarios/:id - Buscar usuário');
    console.log('  POST   /api/usuarios     - Criar usuário');
    console.log('  PUT    /api/usuarios/:id - Atualizar usuário');
    console.log('  DELETE /api/usuarios/:id - Deletar usuário');
    console.log('  GET    /api/health       - Status da API');
});
\`\`\`

## 🎯 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Conectar com banco de dados
2. Implementar autenticação JWT
3. Adicionar validação de dados
4. Criar documentação com Swagger
5. Fazer deploy em produção

**🎓 Dica**: Use Postman ou Insomnia para testar suas APIs durante o desenvolvimento!`
        }
      ]
    }
  ]
};

// Função para obter conteúdo do curso por ID
export function getCourseContent(courseId: string): CourseContent | null {
  const courseMap: { [key: string]: CourseContent } = {
    // Frontend/Web Development
    'fundamentos-desenvolvimento-web': webFundamentalsContent,
    'desenvolvimento-web-moderno': webFundamentalsContent,
    'javascript-avancado': reactAdvancedContent,
    'react-avancado': reactAdvancedContent,
    'vuejs-completo': reactAdvancedContent,
    'angular-avancado': reactAdvancedContent,
    'ui-ux-design': webFundamentalsContent,
    'wordpress-avancado': webFundamentalsContent,

    // Mobile Development
    'react-native-apps-mobile': mobileDevelopmentContent,
    'flutter-apps-mobile': mobileDevelopmentContent,

    // Backend Development
    'nodejs-apis-rest': nodejsApisContent,
    'java-spring-boot': backendDevelopmentContent,
    'csharp-dotnet-core': backendDevelopmentContent,
    'php-laravel': backendDevelopmentContent,
    'python-django': backendDevelopmentContent,

    // Data Science & AI
    'python-data-science': pythonDataScienceSpecificContent,
    'machine-learning-python': pythonDataScienceContent,
    'deep-learning-neural-networks': pythonDataScienceContent,

    // Databases
    'sql-bancos-dados': backendDevelopmentContent,
    'mongodb-nosql': backendDevelopmentContent,

    // DevOps & Cloud
    'docker-devops': backendDevelopmentContent,
    'aws-cloud-computing': backendDevelopmentContent,

    // Security & Blockchain
    'cybersecurity-essentials': backendDevelopmentContent,
    'blockchain-criptomoedas': backendDevelopmentContent,

    // Tools & Career
    'git-github': webFundamentalsContent,
    'testes-automatizados': webFundamentalsContent,
    'carreira-tech': webFundamentalsContent,
    'fundamentos-programacao': webFundamentalsContent,
  };

  return courseMap[courseId] || null;
}





