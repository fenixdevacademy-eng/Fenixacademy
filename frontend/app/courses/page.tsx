'use client';

import { useState } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen, Play } from 'lucide-react';
import React from 'react';
import { useEffect } from 'react';
import { generateCourseContentWithExercises } from './generateCourseContent';

interface Lesson {
  title: string;
  duration: string; // Ex: '30 min'
  exercises?: string[]; // Exercícios para cada aula
}

interface Module {
  title: string;
  duration: string; // Ex: '2h'
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  students: number;
  rating: number;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  lessons: number;
  certificate: boolean;
  modules: Module[];
}

let courses: Course[] = [
  {
    id: 1,
    title: "Fundamentos de Desenvolvimento Web",
    description: "Aprenda HTML, CSS e JavaScript do zero. Construa sites responsivos e interativos.",
    instructor: "João Silva",
    level: "beginner",
    duration: "80 horas",
    students: 1247,
    rating: 4.8,
    price: 197,
    originalPrice: 297,
    image: "/api/placeholder/300/200",
    category: "Desenvolvimento Web",
    lessons: 80,
    certificate: true,
    modules: [
      { title: "Introdução ao Desenvolvimento Web", duration: "4h", lessons: [
        { title: "O que é Desenvolvimento Web?", duration: "30 min" },
        { title: "História da Web", duration: "30 min" },
        { title: "Ferramentas Essenciais", duration: "1h" },
        { title: "Ambiente de Desenvolvimento", duration: "2h" },
      ] },
      { title: "HTML Básico", duration: "4h", lessons: [
        { title: "Estrutura de um Documento HTML", duration: "1h" },
        { title: "Tags Principais", duration: "1h" },
        { title: "Links e Imagens", duration: "1h" },
        { title: "Formulários", duration: "1h" },
      ] },
      { title: "CSS e Estilização", duration: "10h", lessons: [
        { title: "Introdução ao CSS", duration: "1h" },
        { title: "Seletores e Propriedades", duration: "2h" },
        { title: "Layout com Flexbox e Grid", duration: "3h" },
        { title: "Responsividade", duration: "2h" },
        { title: "Animações Básicas", duration: "2h" },
      ] },
      { title: "JavaScript para Iniciantes", duration: "12h", lessons: [
        { title: "Sintaxe Básica", duration: "2h" },
        { title: "Variáveis e Tipos", duration: "2h" },
        { title: "Funções", duration: "2h" },
        { title: "Eventos e DOM", duration: "3h" },
        { title: "Projeto Prático: Site Interativo", duration: "3h" },
      ] },
      { title: "Projeto Final", duration: "6h", lessons: [
        { title: "Planejamento do Projeto", duration: "1h" },
        { title: "Execução", duration: "4h" },
        { title: "Apresentação e Feedback", duration: "1h" },
      ] },
    ],
  },
  {
    id: 2,
    title: "React.js Avançado",
    description: "Domine React com Hooks, Context API, Redux e padrões avançados.",
    instructor: "Maria Santos",
    level: "intermediate",
    duration: "35 horas",
    students: 892,
    rating: 4.9,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Frontend",
    lessons: 28,
    certificate: true,
    modules: [
      {
        title: "Revisão de JavaScript Moderno",
        duration: "3h",
        lessons: [
          { title: "ES6+ Features", duration: "1h" },
          { title: "Promises e Async/Await", duration: "1h" },
          { title: "Manipulação de Arrays e Objetos", duration: "1h" },
        ],
      },
      {
        title: "Fundamentos do React",
        duration: "6h",
        lessons: [
          { title: "Componentes e Props", duration: "2h" },
          { title: "Estado e Ciclo de Vida", duration: "2h" },
          { title: "Eventos e Manipulação de Formulários", duration: "2h" },
        ],
      },
      {
        title: "Hooks e Context API",
        duration: "8h",
        lessons: [
          { title: "useState e useEffect", duration: "2h" },
          { title: "Custom Hooks", duration: "2h" },
          { title: "Context API", duration: "2h" },
          { title: "Boas Práticas com Hooks", duration: "2h" },
        ],
      },
      {
        title: "Gerenciamento de Estado com Redux",
        duration: "8h",
        lessons: [
          { title: "Introdução ao Redux", duration: "2h" },
          { title: "Actions, Reducers e Store", duration: "2h" },
          { title: "Redux Toolkit", duration: "2h" },
          { title: "Integração com React", duration: "2h" },
        ],
      },
      {
        title: "Padrões Avançados e Projeto Final",
        duration: "10h",
        lessons: [
          { title: "Padrões de Componentes", duration: "2h" },
          { title: "Testes em React", duration: "2h" },
          { title: "Deploy de Aplicações React", duration: "2h" },
          { title: "Projeto Prático: Dashboard Avançado", duration: "4h" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Node.js e APIs RESTful",
    description: "Desenvolva APIs robustas com Node.js, Express e MongoDB.",
    instructor: "Pedro Costa",
    level: "intermediate",
    duration: "30 horas",
    students: 756,
    rating: 4.7,
    price: 247,
    originalPrice: 347,
    image: "/api/placeholder/300/200",
    category: "Backend",
    lessons: 22,
    certificate: true,
    modules: [
      {
        title: "Introdução ao Node.js",
        duration: "3h",
        lessons: [
          { title: "O que é Node.js?", duration: "1h" },
          { title: "Instalação e Configuração", duration: "1h" },
          { title: "Primeiro Projeto", duration: "1h" },
        ],
      },
      {
        title: "Fundamentos do Express.js",
        duration: "6h",
        lessons: [
          { title: "Rotas e Middlewares", duration: "2h" },
          { title: "Controllers e Serviços", duration: "2h" },
          { title: "Tratamento de Erros", duration: "2h" },
        ],
      },
      {
        title: "APIs RESTful na Prática",
        duration: "8h",
        lessons: [
          { title: "CRUD com MongoDB", duration: "2h" },
          { title: "Autenticação e Autorização", duration: "2h" },
          { title: "Validação de Dados", duration: "2h" },
          { title: "Testes de API", duration: "2h" },
        ],
      },
      {
        title: "Deploy e Monitoramento",
        duration: "5h",
        lessons: [
          { title: "Deploy no Heroku e Vercel", duration: "2h" },
          { title: "Monitoramento de APIs", duration: "1h" },
          { title: "Boas Práticas de Segurança", duration: "2h" },
        ],
      },
      {
        title: "Projeto Final",
        duration: "8h",
        lessons: [
          { title: "Planejamento do Projeto", duration: "1h" },
          { title: "Execução", duration: "6h" },
          { title: "Apresentação e Feedback", duration: "1h" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Python para Data Science",
    description: "Análise de dados, machine learning e visualização com Python.",
    instructor: "Ana Oliveira",
    level: "advanced",
    duration: "50 horas",
    students: 634,
    rating: 4.9,
    price: 397,
    originalPrice: 497,
    image: "/api/placeholder/300/200",
    category: "Data Science",
    lessons: 32,
    certificate: true,
    modules: [
      {
        title: "Fundamentos de Python",
        duration: "6h",
        lessons: [
          { title: "Sintaxe Básica", duration: "2h" },
          { title: "Estruturas de Dados", duration: "2h" },
          { title: "Funções e Módulos", duration: "2h" },
        ],
      },
      {
        title: "Análise de Dados com Pandas",
        duration: "10h",
        lessons: [
          { title: "Introdução ao Pandas", duration: "2h" },
          { title: "Manipulação de DataFrames", duration: "3h" },
          { title: "Limpeza de Dados", duration: "2h" },
          { title: "Visualização com Matplotlib", duration: "3h" },
        ],
      },
      {
        title: "Machine Learning",
        duration: "18h",
        lessons: [
          { title: "Introdução ao ML", duration: "2h" },
          { title: "Regressão Linear e Logística", duration: "4h" },
          { title: "Árvores de Decisão e Florestas", duration: "4h" },
          { title: "Redes Neurais Básicas", duration: "4h" },
          { title: "Projeto Prático de ML", duration: "4h" },
        ],
      },
      {
        title: "Projeto Final de Data Science",
        duration: "16h",
        lessons: [
          { title: "Definição do Problema", duration: "2h" },
          { title: "Coleta e Preparação dos Dados", duration: "4h" },
          { title: "Modelagem e Avaliação", duration: "6h" },
          { title: "Apresentação dos Resultados", duration: "4h" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "DevOps e Docker",
    description: "Automatize deployments e gerencie containers com Docker e Kubernetes.",
    instructor: "Carlos Lima",
    level: "advanced",
    duration: "25 horas",
    students: 445,
    rating: 4.6,
    price: 347,
    originalPrice: 447,
    image: "/api/placeholder/300/200",
    category: "DevOps",
    lessons: 18,
    certificate: true,
    modules: [
      {
        title: "Fundamentos de DevOps",
        duration: "4h",
        lessons: [
          { title: "O que é DevOps?", duration: "1h" },
          { title: "Cultura e Práticas DevOps", duration: "1h" },
          { title: "Ferramentas Essenciais", duration: "2h" },
        ],
      },
      {
        title: "Docker na Prática",
        duration: "8h",
        lessons: [
          { title: "Instalação e Configuração", duration: "2h" },
          { title: "Imagens e Containers", duration: "2h" },
          { title: "Volumes e Redes", duration: "2h" },
          { title: "Docker Compose", duration: "2h" },
        ],
      },
      {
        title: "Kubernetes Essencial",
        duration: "8h",
        lessons: [
          { title: "Conceitos Básicos", duration: "2h" },
          { title: "Pods, Services e Deployments", duration: "2h" },
          { title: "ConfigMaps e Secrets", duration: "2h" },
          { title: "Escalabilidade e Monitoramento", duration: "2h" },
        ],
      },
      {
        title: "CI/CD e Projeto Final",
        duration: "5h",
        lessons: [
          { title: "Integração Contínua", duration: "2h" },
          { title: "Entrega Contínua", duration: "2h" },
          { title: "Projeto Prático DevOps", duration: "1h" },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Flutter para Mobile",
    description: "Desenvolva apps nativos para iOS e Android com Flutter.",
    instructor: "Lucia Ferreira",
    level: "intermediate",
    duration: "45 horas",
    students: 567,
    rating: 4.8,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Mobile",
    lessons: 26,
    certificate: true,
    modules: [
      {
        title: "Introdução ao Flutter",
        duration: "6h",
        lessons: [
          { title: "O que é Flutter?", duration: "1h" },
          { title: "Configuração do Ambiente", duration: "2h" },
          { title: "Primeiro App", duration: "3h" },
        ],
      },
      {
        title: "Widgets e Layouts",
        duration: "10h",
        lessons: [
          { title: "Widgets Básicos", duration: "2h" },
          { title: "Layouts Responsivos", duration: "3h" },
          { title: "Navegação", duration: "2h" },
          { title: "Customização de UI", duration: "3h" },
        ],
      },
      {
        title: "Integração e APIs",
        duration: "12h",
        lessons: [
          { title: "HTTP e Consumo de APIs", duration: "3h" },
          { title: "Persistência de Dados", duration: "3h" },
          { title: "Autenticação", duration: "3h" },
          { title: "Notificações Push", duration: "3h" },
        ],
      },
      {
        title: "Projeto Final Mobile",
        duration: "17h",
        lessons: [
          { title: "Planejamento do App", duration: "2h" },
          { title: "Desenvolvimento", duration: "12h" },
          { title: "Publicação e Feedback", duration: "3h" },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Java para Backend",
    description: "Desenvolva aplicações robustas e escaláveis com Java e Spring Boot.",
    instructor: "Carlos Souza",
    level: "intermediate",
    duration: "40 horas",
    students: 800,
    rating: 4.7,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Backend",
    lessons: 24,
    certificate: true,
    modules: [
      { title: "Fundamentos do Java", duration: "8h", lessons: [
        { title: "Sintaxe e Tipos de Dados", duration: "2h" },
        { title: "Estruturas de Controle", duration: "2h" },
        { title: "POO em Java", duration: "2h" },
        { title: "Coleções e Generics", duration: "2h" },
      ] },
      { title: "Spring Boot Essencial", duration: "10h", lessons: [
        { title: "Introdução ao Spring Boot", duration: "2h" },
        { title: "APIs REST com Spring", duration: "3h" },
        { title: "Persistência com JPA/Hibernate", duration: "3h" },
        { title: "Testes em Java", duration: "2h" },
      ] },
      { title: "Segurança e Deploy", duration: "8h", lessons: [
        { title: "Spring Security", duration: "3h" },
        { title: "JWT e Autenticação", duration: "2h" },
        { title: "Deploy em Cloud", duration: "3h" },
      ] },
      { title: "Projeto Final Java", duration: "14h", lessons: [
        { title: "Planejamento do Projeto", duration: "2h" },
        { title: "Desenvolvimento", duration: "10h" },
        { title: "Apresentação e Feedback", duration: "2h" },
      ] },
    ],
  },
  {
    id: 8,
    title: "Inteligência Artificial com Python",
    description: "Construa soluções de IA com Python, redes neurais e deep learning.",
    instructor: "Ana Martins",
    level: "advanced",
    duration: "50 horas",
    students: 650,
    rating: 4.9,
    price: 397,
    originalPrice: 497,
    image: "/api/placeholder/300/200",
    category: "Data Science",
    lessons: 30,
    certificate: true,
    modules: [
      { title: "Fundamentos de IA", duration: "8h", lessons: [
        { title: "História e Aplicações", duration: "2h" },
        { title: "Python para IA", duration: "2h" },
        { title: "Álgebra Linear Básica", duration: "2h" },
        { title: "Redes Neurais Simples", duration: "2h" },
      ] },
      { title: "Deep Learning", duration: "14h", lessons: [
        { title: "Redes Neurais Profundas", duration: "4h" },
        { title: "CNNs e Visão Computacional", duration: "4h" },
        { title: "RNNs e NLP", duration: "3h" },
        { title: "Frameworks: TensorFlow e PyTorch", duration: "3h" },
      ] },
      { title: "Projetos de IA", duration: "18h", lessons: [
        { title: "Classificação de Imagens", duration: "6h" },
        { title: "Processamento de Linguagem Natural", duration: "6h" },
        { title: "Projeto Final de IA", duration: "6h" },
      ] },
      { title: "Ética e Futuro da IA", duration: "10h", lessons: [
        { title: "Ética em IA", duration: "2h" },
        { title: "Tendências e Carreira", duration: "2h" },
        { title: "Desafios Atuais", duration: "2h" },
        { title: "IA Generativa", duration: "4h" },
      ] },
    ],
  },
  {
    id: 9,
    title: "UX/UI Design para Web e Mobile",
    description: "Aprenda design de interfaces e experiência do usuário para web e apps.",
    instructor: "Bruna Lima",
    level: "beginner",
    duration: "32 horas",
    students: 900,
    rating: 4.8,
    price: 247,
    originalPrice: 347,
    image: "/api/placeholder/300/200",
    category: "Design",
    lessons: 20,
    certificate: true,
    modules: [
      { title: "Fundamentos de UX/UI", duration: "6h", lessons: [
        { title: "O que é UX e UI?", duration: "1h" },
        { title: "Princípios de Design", duration: "2h" },
        { title: "Psicologia das Cores", duration: "1h" },
        { title: "Tipografia", duration: "2h" },
      ] },
      { title: "Ferramentas de Design", duration: "8h", lessons: [
        { title: "Figma e Prototipagem", duration: "3h" },
        { title: "Wireframes", duration: "2h" },
        { title: "Design Responsivo", duration: "3h" },
      ] },
      { title: "Experiência do Usuário", duration: "10h", lessons: [
        { title: "Jornada do Usuário", duration: "3h" },
        { title: "Testes de Usabilidade", duration: "3h" },
        { title: "Acessibilidade", duration: "2h" },
        { title: "Design Centrado no Usuário", duration: "2h" },
      ] },
      { title: "Projeto Prático de Design", duration: "8h", lessons: [
        { title: "Briefing e Pesquisa", duration: "2h" },
        { title: "Prototipagem", duration: "3h" },
        { title: "Apresentação", duration: "3h" },
      ] },
    ],
  },
  {
    id: 10,
    title: "Desenvolvimento de APIs com Go",
    description: "Crie APIs performáticas e seguras usando Go (Golang).",
    instructor: "Eduardo Tavares",
    level: "intermediate",
    duration: "36 horas",
    students: 500,
    rating: 4.7,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Backend",
    lessons: 22,
    certificate: true,
    modules: [
      { title: "Go Básico", duration: "8h", lessons: [
        { title: "Sintaxe e Tipos", duration: "2h" },
        { title: "Funções e Pacotes", duration: "2h" },
        { title: "Structs e Interfaces", duration: "2h" },
        { title: "Erros e Tratamento", duration: "2h" },
      ] },
      { title: "APIs REST com Go", duration: "10h", lessons: [
        { title: "HTTP e Rotas", duration: "3h" },
        { title: "Persistência com GORM", duration: "3h" },
        { title: "Autenticação", duration: "2h" },
        { title: "Testes de API", duration: "2h" },
      ] },
      { title: "Performance e Segurança", duration: "8h", lessons: [
        { title: "Go Routines e Concorrência", duration: "3h" },
        { title: "Segurança em APIs", duration: "3h" },
        { title: "Deploy de APIs Go", duration: "2h" },
      ] },
      { title: "Projeto Final Go", duration: "10h", lessons: [
        { title: "Planejamento do Projeto", duration: "2h" },
        { title: "Desenvolvimento", duration: "6h" },
        { title: "Apresentação e Feedback", duration: "2h" },
      ] },
    ],
  },
  {
    id: 11,
    title: "Data Engineering com Apache Spark",
    description: "Domine processamento de dados em larga escala com Spark e Big Data.",
    instructor: "Fernanda Dias",
    level: "advanced",
    duration: "48 horas",
    students: 350,
    rating: 4.8,
    price: 397,
    originalPrice: 497,
    image: "/api/placeholder/300/200",
    category: "Data Science",
    lessons: 28,
    certificate: true,
    modules: [
      { title: "Fundamentos de Big Data", duration: "8h", lessons: [
        { title: "O que é Big Data?", duration: "2h" },
        { title: "Arquitetura Hadoop", duration: "2h" },
        { title: "Introdução ao Spark", duration: "2h" },
        { title: "Ambiente Spark", duration: "2h" },
      ] },
      { title: "Spark Core e SQL", duration: "12h", lessons: [
        { title: "RDDs e DataFrames", duration: "3h" },
        { title: "Spark SQL", duration: "3h" },
        { title: "Transformações e Ações", duration: "3h" },
        { title: "Otimização de Consultas", duration: "3h" },
      ] },
      { title: "Processamento em Streaming", duration: "10h", lessons: [
        { title: "Spark Streaming", duration: "3h" },
        { title: "Integração com Kafka", duration: "3h" },
        { title: "Projetos de Streaming", duration: "4h" },
      ] },
      { title: "Projeto Final de Engenharia de Dados", duration: "18h", lessons: [
        { title: "Planejamento do Projeto", duration: "2h" },
        { title: "Desenvolvimento", duration: "12h" },
        { title: "Apresentação e Feedback", duration: "4h" },
      ] },
    ],
  },
  {
    id: 12,
    title: "Machine Learning para Negócios",
    description: "Aplique ML para resolver problemas reais em empresas e startups.",
    instructor: "Gustavo Rocha",
    level: "intermediate",
    duration: "36 horas",
    students: 420,
    rating: 4.7,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Data Science",
    lessons: 20,
    certificate: true,
    modules: [
      { title: "Fundamentos de ML", duration: "8h", lessons: [
        { title: "O que é Machine Learning?", duration: "2h" },
        { title: "Tipos de Aprendizado", duration: "2h" },
        { title: "Ciclo de Vida de um Projeto ML", duration: "2h" },
        { title: "Ferramentas de ML", duration: "2h" },
      ] },
      { title: "Modelos e Métricas", duration: "10h", lessons: [
        { title: "Regressão e Classificação", duration: "3h" },
        { title: "Métricas de Avaliação", duration: "3h" },
        { title: "Validação Cruzada", duration: "2h" },
        { title: "Ajuste de Hiperparâmetros", duration: "2h" },
      ] },
      { title: "ML em Negócios", duration: "10h", lessons: [
        { title: "Casos de Uso em Empresas", duration: "3h" },
        { title: "ML para Vendas e Marketing", duration: "3h" },
        { title: "Automação de Processos", duration: "2h" },
        { title: "Desafios e Limitações", duration: "2h" },
      ] },
      { title: "Projeto Prático de ML", duration: "8h", lessons: [
        { title: "Planejamento do Projeto", duration: "2h" },
        { title: "Execução", duration: "4h" },
        { title: "Apresentação e Feedback", duration: "2h" },
      ] },
    ],
  },
  {
    id: 13,
    title: "Cybersecurity Essentials",
    description: "Aprenda os fundamentos de segurança da informação e proteção de sistemas.",
    instructor: "Patrícia Nunes",
    level: "beginner",
    duration: "28 horas",
    students: 600,
    rating: 4.8,
    price: 247,
    originalPrice: 347,
    image: "/api/placeholder/300/200",
    category: "Segurança",
    lessons: 16,
    certificate: true,
    modules: [
      { title: "Fundamentos de Segurança", duration: "6h", lessons: [
        { title: "O que é Segurança da Informação?", duration: "2h" },
        { title: "Tipos de Ameaças", duration: "2h" },
        { title: "Políticas de Segurança", duration: "2h" },
      ] },
      { title: "Criptografia e Autenticação", duration: "8h", lessons: [
        { title: "Criptografia Básica", duration: "2h" },
        { title: "Autenticação e Autorização", duration: "2h" },
        { title: "Senhas e MFA", duration: "2h" },
        { title: "Boas Práticas", duration: "2h" },
      ] },
      { title: "Segurança em Redes", duration: "8h", lessons: [
        { title: "Firewalls e IDS", duration: "2h" },
        { title: "VPNs", duration: "2h" },
        { title: "Segurança em Wi-Fi", duration: "2h" },
        { title: "Monitoramento", duration: "2h" },
      ] },
      { title: "Projeto Prático de Segurança", duration: "6h", lessons: [
        { title: "Simulação de Ataques", duration: "2h" },
        { title: "Plano de Resposta", duration: "2h" },
        { title: "Apresentação", duration: "2h" },
      ] },
    ],
  },
  {
    id: 14,
    title: "Blockchain e Criptomoedas",
    description: "Entenda o funcionamento do blockchain e desenvolva aplicações descentralizadas.",
    instructor: "Rafael Vieira",
    level: "intermediate",
    duration: "36 horas",
    students: 300,
    rating: 4.7,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Blockchain",
    lessons: 20,
    certificate: true,
    modules: [
      { title: "Fundamentos de Blockchain", duration: "8h", lessons: [
        { title: "O que é Blockchain?", duration: "2h" },
        { title: "Criptografia em Blockchain", duration: "2h" },
        { title: "Smart Contracts", duration: "2h" },
        { title: "Tokens e NFTs", duration: "2h" },
      ] },
      { title: "Desenvolvimento de DApps", duration: "10h", lessons: [
        { title: "Solidity Básico", duration: "3h" },
        { title: "Deploy de Contratos", duration: "3h" },
        { title: "Front-end para DApps", duration: "2h" },
        { title: "Testes e Segurança", duration: "2h" },
      ] },
      { title: "Criptomoedas e Finanças Descentralizadas", duration: "10h", lessons: [
        { title: "Bitcoin e Ethereum", duration: "3h" },
        { title: "Exchanges e Carteiras", duration: "3h" },
        { title: "DeFi e Staking", duration: "2h" },
        { title: "Riscos e Regulação", duration: "2h" },
      ] },
      { title: "Projeto Final Blockchain", duration: "8h", lessons: [
        { title: "Planejamento do Projeto", duration: "2h" },
        { title: "Desenvolvimento", duration: "4h" },
        { title: "Apresentação e Feedback", duration: "2h" },
      ] },
    ],
  },
  {
    id: 15,
    title: "AWS Cloud Practitioner",
    description: "Aprenda os fundamentos da AWS e prepare-se para a certificação Cloud Practitioner.",
    instructor: "Juliana Campos",
    level: "beginner",
    duration: "30 horas",
    students: 700,
    rating: 4.8,
    price: 247,
    originalPrice: 347,
    image: "/api/placeholder/300/200",
    category: "Cloud",
    lessons: 18,
    certificate: true,
    modules: [
      { title: "Fundamentos de Cloud Computing", duration: "6h", lessons: [
        { title: "O que é Cloud?", duration: "2h" },
        { title: "Modelos de Serviço", duration: "2h" },
        { title: "Vantagens da Nuvem", duration: "2h" },
      ] },
      { title: "Serviços Essenciais AWS", duration: "8h", lessons: [
        { title: "EC2 e S3", duration: "2h" },
        { title: "RDS e DynamoDB", duration: "2h" },
        { title: "IAM e Segurança", duration: "2h" },
        { title: "CloudWatch e Monitoramento", duration: "2h" },
      ] },
      { title: "Arquitetura e Práticas", duration: "10h", lessons: [
        { title: "Arquitetura de Soluções", duration: "3h" },
        { title: "Alta Disponibilidade", duration: "3h" },
        { title: "Custos e Otimização", duration: "2h" },
        { title: "Preparação para Certificação", duration: "2h" },
      ] },
      { title: "Projeto Prático AWS", duration: "6h", lessons: [
        { title: "Planejamento do Projeto", duration: "2h" },
        { title: "Execução", duration: "2h" },
        { title: "Apresentação", duration: "2h" },
      ] },
    ],
  },
  {
    id: 16,
    title: "Desenvolvimento iOS com Swift",
    description: "Crie aplicativos nativos para iPhone e iPad usando Swift e Xcode.",
    instructor: "Lucas Almeida",
    level: "intermediate",
    duration: "38 horas",
    students: 320,
    rating: 4.7,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Mobile",
    lessons: 22,
    certificate: true,
    modules: [
      { title: "Swift Básico", duration: "8h", lessons: [
        { title: "Sintaxe Swift", duration: "2h" },
        { title: "Funções e Closures", duration: "2h" },
        { title: "POO em Swift", duration: "2h" },
        { title: "Coleções", duration: "2h" },
      ] },
      { title: "Desenvolvimento iOS", duration: "10h", lessons: [
        { title: "Xcode e Interface Builder", duration: "3h" },
        { title: "Views e Layouts", duration: "3h" },
        { title: "Navegação e Storyboards", duration: "2h" },
        { title: "Persistência de Dados", duration: "2h" },
      ] },
      { title: "APIs e Integrações", duration: "8h", lessons: [
        { title: "Consumo de APIs", duration: "3h" },
        { title: "Notificações Push", duration: "2h" },
        { title: "Integração com Serviços Apple", duration: "3h" },
      ] },
      { title: "Projeto Final iOS", duration: "12h", lessons: [
        { title: "Planejamento do App", duration: "2h" },
        { title: "Desenvolvimento", duration: "8h" },
        { title: "Publicação e Feedback", duration: "2h" },
      ] },
    ],
  },
  {
    id: 17,
    title: "Desenvolvimento Android com Kotlin",
    description: "Desenvolva apps modernos para Android com Kotlin e Jetpack.",
    instructor: "Marina Figueiredo",
    level: "intermediate",
    duration: "38 horas",
    students: 340,
    rating: 4.7,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Mobile",
    lessons: 22,
    certificate: true,
    modules: [
      { title: "Kotlin Básico", duration: "8h", lessons: [
        { title: "Sintaxe Kotlin", duration: "2h" },
        { title: "Funções e Lambdas", duration: "2h" },
        { title: "POO em Kotlin", duration: "2h" },
        { title: "Coleções", duration: "2h" },
      ] },
      { title: "Desenvolvimento Android", duration: "10h", lessons: [
        { title: "Android Studio", duration: "3h" },
        { title: "Views e Layouts", duration: "3h" },
        { title: "Navegação e Fragments", duration: "2h" },
        { title: "Persistência de Dados", duration: "2h" },
      ] },
      { title: "APIs e Integrações", duration: "8h", lessons: [
        { title: "Consumo de APIs", duration: "3h" },
        { title: "Notificações Push", duration: "2h" },
        { title: "Integração com Serviços Google", duration: "3h" },
      ] },
      { title: "Projeto Final Android", duration: "12h", lessons: [
        { title: "Planejamento do App", duration: "2h" },
        { title: "Desenvolvimento", duration: "8h" },
        { title: "Publicação e Feedback", duration: "2h" },
      ] },
    ],
  },
  {
    id: 18,
    title: "Product Management Tech",
    description: "Aprenda a gerenciar produtos digitais e liderar times de tecnologia.",
    instructor: "Renato Lopes",
    level: "intermediate",
    duration: "30 horas",
    students: 200,
    rating: 4.6,
    price: 297,
    originalPrice: 397,
    image: "/api/placeholder/300/200",
    category: "Gestão",
    lessons: 16,
    certificate: true,
    modules: [
      { title: "Fundamentos de Product Management", duration: "6h", lessons: [
        { title: "O que faz um PM?", duration: "2h" },
        { title: "Ciclo de Vida do Produto", duration: "2h" },
        { title: "Métricas de Produto", duration: "2h" },
      ] },
      { title: "Gestão de Times Tech", duration: "8h", lessons: [
        { title: "Times Ágeis", duration: "2h" },
        { title: "Scrum e Kanban", duration: "2h" },
        { title: "Comunicação e Liderança", duration: "2h" },
        { title: "Gestão de Conflitos", duration: "2h" },
      ] },
      { title: "Lançamento e Crescimento", duration: "8h", lessons: [
        { title: "Go-to-Market", duration: "2h" },
        { title: "Growth Hacking", duration: "2h" },
        { title: "Feedback do Usuário", duration: "2h" },
        { title: "Iteração de Produto", duration: "2h" },
      ] },
      { title: "Projeto Prático de PM", duration: "8h", lessons: [
        { title: "Planejamento do Produto", duration: "2h" },
        { title: "Execução", duration: "4h" },
        { title: "Apresentação", duration: "2h" },
      ] },
    ],
  },
  {
    id: 19,
    title: "Testes Automatizados com Cypress",
    description: "Implemente testes E2E modernos para aplicações web usando Cypress.",
    instructor: "Sofia Mendes",
    level: "intermediate",
    duration: "24 horas",
    students: 180,
    rating: 4.7,
    price: 247,
    originalPrice: 347,
    image: "/api/placeholder/300/200",
    category: "Qualidade",
    lessons: 12,
    certificate: true,
    modules: [
      { title: "Fundamentos de Testes", duration: "4h", lessons: [
        { title: "O que são Testes Automatizados?", duration: "1h" },
        { title: "Tipos de Testes", duration: "1h" },
        { title: "Ferramentas de Teste", duration: "2h" },
      ] },
      { title: "Cypress na Prática", duration: "8h", lessons: [
        { title: "Instalação e Configuração", duration: "2h" },
        { title: "Testes de Interface", duration: "2h" },
        { title: "Testes de API", duration: "2h" },
        { title: "Boas Práticas", duration: "2h" },
      ] },
      { title: "Integração e CI/CD", duration: "6h", lessons: [
        { title: "Integração com CI", duration: "2h" },
        { title: "Relatórios de Teste", duration: "2h" },
        { title: "Testes em Pipeline", duration: "2h" },
      ] },
      { title: "Projeto Final de Testes", duration: "6h", lessons: [
        { title: "Planejamento dos Testes", duration: "2h" },
        { title: "Execução", duration: "2h" },
        { title: "Apresentação", duration: "2h" },
      ] },
    ],
  },
  {
    id: 20,
    title: "Power BI e Visualização de Dados",
    description: "Crie dashboards interativos e relatórios com Power BI.",
    instructor: "Thiago Ribeiro",
    level: "beginner",
    duration: "20 horas",
    students: 400,
    rating: 4.8,
    price: 197,
    originalPrice: 297,
    image: "/api/placeholder/300/200",
    category: "Data Science",
    lessons: 10,
    certificate: true,
    modules: [
      { title: "Introdução ao Power BI", duration: "4h", lessons: [
        { title: "O que é Power BI?", duration: "1h" },
        { title: "Conectando Dados", duration: "1h" },
        { title: "Modelagem de Dados", duration: "2h" },
      ] },
      { title: "Dashboards e Visualizações", duration: "6h", lessons: [
        { title: "Gráficos e Tabelas", duration: "2h" },
        { title: "Filtros e Slicers", duration: "2h" },
        { title: "Customização de Visuals", duration: "2h" },
      ] },
      { title: "Publicação e Compartilhamento", duration: "4h", lessons: [
        { title: "Publicando Relatórios", duration: "2h" },
        { title: "Compartilhamento Seguro", duration: "2h" },
      ] },
      { title: "Projeto Final Power BI", duration: "6h", lessons: [
        { title: "Planejamento do Dashboard", duration: "2h" },
        { title: "Execução", duration: "2h" },
        { title: "Apresentação", duration: "2h" },
      ] },
    ],
  },
];

// Gera exercícios automaticamente para todos os cursos
courses = generateCourseContentWithExercises(courses);

const categories = [
  "Todos",
  "Desenvolvimento Web",
  "Frontend",
  "Backend",
  "Data Science",
  "DevOps",
  "Mobile"
];

const levels = [
  { value: "all", label: "Todos os níveis" },
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" }
];

// Modal customizado
function CustomModal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full p-6 relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => setOpenModalId(id);
  const handleCloseModal = () => setOpenModalId(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Cursos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore nossa coleção de cursos especializados e transforme sua carreira em tecnologia
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Categoria */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Nível */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {levels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>

            {/* Preço */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Preço:</span>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="flex-1"
              />
              <span className="text-sm text-gray-600">R$ {priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden">
              {/* Imagem */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-80" />
                </div>
                {course.originalPrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                {/* Categoria e Nível */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelColor(course.level)}`}>
                    {getLevelLabel(course.level)}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Descrição */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Instrutor */}
                <p className="text-sm text-gray-500 mb-4">
                  Por <span className="font-medium">{course.instructor}</span>
                </p>

                {/* Estatísticas */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} aulas</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Avaliação */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(course.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {course.rating} ({course.students} alunos)
                  </span>
                </div>

                {/* Preço e Botão */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      R$ {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        R$ {course.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                    Ver Curso
                  </button>
                </div>

                {/* Botão para abrir modal de conteúdo */}
                <div className="mt-3">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-blue-700 px-4 py-2 rounded-lg font-medium w-full"
                    onClick={() => handleOpenModal(course.id)}
                  >
                    Ver Conteúdo Detalhado
                  </button>
                </div>

                {/* Certificado */}
                {course.certificate && (
                  <div className="mt-3 flex items-center space-x-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Certificado incluído</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        {filteredCourses.length > 0 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
                Anterior
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">2</button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">3</button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                Próximo
              </button>
            </nav>
          </div>
        )}

        {/* Nenhum resultado */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum curso encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}
      </div>

      {/* Modal customizado para cada curso */}
      {filteredCourses.map(course => (
        <CustomModal
          key={course.id}
          open={openModalId === course.id}
          onClose={handleCloseModal}
        >
          <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
          <div>
            {course.modules.map((mod, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Módulo {idx + 1}: {mod.title} <span className="text-sm text-gray-500">({mod.duration})</span></h3>
                <ul className="ml-4 list-disc">
                  {mod.lessons.map((lesson, lidx) => (
                    <li key={lidx} className="mb-2">
                      <span className="font-medium">Aula {lidx + 1}: {lesson.title}</span> <span className="text-xs text-gray-500">({lesson.duration})</span>
                      {lesson.exercises && lesson.exercises.length > 0 && (
                        <ul className="ml-6 list-[circle] mt-1">
                          {lesson.exercises.map((ex, exidx) => (
                            <li key={exidx} className="text-sm text-gray-700">Exercício: {ex}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CustomModal>
      ))}
    </div>
  );
} 