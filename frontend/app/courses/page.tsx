'use client';

import { useState } from 'react';
import {
  Search,
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  Heart,
  Share2,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import AnimatedComponent from '../../components/AnimatedComponent';
import { navigationConfig } from '../navigation-config';


interface Lesson {
  title: string;
  duration: string;
  exercises?: string[];
}

interface Module {
  title: string;
  duration: string;
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
  featured?: boolean;
  new?: boolean;
  discount?: number;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Fundamentos de Desenvolvimento Web",
    description: "Aprenda HTML, CSS e JavaScript do zero. Construa sites responsivos e interativos.",
    instructor: "Alexandre Mendes",
    level: "beginner",
    duration: "70 horas",
    students: 1247,
    rating: 4.8,
    price: 197,
    originalPrice: 297,
    image: "/courses/web-dev.jpg",
    category: "Desenvolvimento Web",
    lessons: 72,
    certificate: true,
    featured: true,
    discount: 34,
    modules: [
      {
        title: "Introdução ao Desenvolvimento Web", duration: "4h", lessons: [
          { title: "O que é Desenvolvimento Web?", duration: "30 min" },
          { title: "História da Web", duration: "30 min" },
          { title: "Ferramentas Essenciais", duration: "1h" },
          { title: "Ambiente de Desenvolvimento", duration: "2h" },
        ]
      },
      {
        title: "HTML Básico", duration: "4h", lessons: [
          { title: "Estrutura de um Documento HTML", duration: "1h" },
          { title: "Tags Principais", duration: "1h" },
          { title: "Links e Imagens", duration: "1h" },
          { title: "Formulários", duration: "1h" },
        ]
      },
      {
        title: "CSS e Estilização", duration: "10h", lessons: [
          { title: "Introdução ao CSS", duration: "1h" },
          { title: "Seletores e Propriedades", duration: "2h" },
          { title: "Layout com Flexbox e Grid", duration: "3h" },
          { title: "Responsividade", duration: "2h" },
          { title: "Animações Básicas", duration: "2h" },
        ]
      },
      {
        title: "JavaScript para Iniciantes", duration: "12h", lessons: [
          { title: "Sintaxe Básica", duration: "2h" },
          { title: "Variáveis e Tipos", duration: "2h" },
          { title: "Funções", duration: "2h" },
          { title: "Eventos e DOM", duration: "3h" },
          { title: "Projeto Prático: Site Interativo", duration: "3h" },
        ]
      },
      {
        title: "Projeto Final", duration: "6h", lessons: [
          { title: "Planejamento do Projeto", duration: "1h" },
          { title: "Execução", duration: "4h" },
          { title: "Apresentação e Feedback", duration: "1h" },
        ]
      },
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
    image: "/courses/react.jpg",
    category: "Frontend",
    lessons: 28,
    certificate: true,
    featured: true,
    discount: 25,
    modules: [
      {
        title: "Fundamentos do React", duration: "6h", lessons: [
          { title: "Componentes e Props", duration: "2h" },
          { title: "Estado e Ciclo de Vida", duration: "2h" },
          { title: "Eventos e Formulários", duration: "2h" },
        ]
      },
      {
        title: "Hooks e Context API", duration: "8h", lessons: [
          { title: "useState e useEffect", duration: "3h" },
          { title: "useContext e useReducer", duration: "3h" },
          { title: "Custom Hooks", duration: "2h" },
        ]
      },
      {
        title: "Redux e Gerenciamento de Estado", duration: "10h", lessons: [
          { title: "Conceitos do Redux", duration: "3h" },
          { title: "Actions e Reducers", duration: "3h" },
          { title: "Redux Toolkit", duration: "4h" },
        ]
      },
      {
        title: "Padrões Avançados", duration: "11h", lessons: [
          { title: "Performance e Otimização", duration: "4h" },
          { title: "Testes com Jest", duration: "4h" },
          { title: "Deploy e CI/CD", duration: "3h" },
        ]
      },
    ],
  },
  {
    id: 3,
    title: "Python para Data Science",
    description: "Aprenda Python, pandas, numpy e machine learning para análise de dados.",
    instructor: "Ana Costa",
    level: "intermediate",
    duration: "60 horas",
    students: 1567,
    rating: 4.7,
    price: 247,
    originalPrice: 347,
    image: "/courses/python-ds.jpg",
    category: "Data Science",
    lessons: 45,
    certificate: true,
    discount: 29,
    modules: [
      {
        title: "Python Básico", duration: "8h", lessons: [
          { title: "Sintaxe e Estruturas", duration: "2h" },
          { title: "Funções e Classes", duration: "3h" },
          { title: "Bibliotecas Essenciais", duration: "3h" },
        ]
      },
      {
        title: "Pandas e Numpy", duration: "12h", lessons: [
          { title: "Manipulação de Dados", duration: "4h" },
          { title: "Análise Exploratória", duration: "4h" },
          { title: "Visualização", duration: "4h" },
        ]
      },
      {
        title: "Machine Learning", duration: "20h", lessons: [
          { title: "Algoritmos Básicos", duration: "8h" },
          { title: "Validação Cruzada", duration: "6h" },
          { title: "Projetos Práticos", duration: "6h" },
        ]
      },
    ],
  },
  {
    id: 4,
    title: "Node.js e APIs RESTful",
    description: "Desenvolva APIs robustas com Node.js, Express e MongoDB.",
    instructor: "Pedro Costa",
    level: "intermediate",
    duration: "30 horas",
    students: 756,
    rating: 4.7,
    price: 247,
    originalPrice: 347,
    image: "/courses/nodejs.jpg",
    category: "Backend",
    lessons: 22,
    certificate: true,
    discount: 29,
    modules: [
      {
        title: "Fundamentos do Node.js", duration: "6h", lessons: [
          { title: "Event Loop e Assincronismo", duration: "2h" },
          { title: "Módulos e NPM", duration: "2h" },
          { title: "Express Framework", duration: "2h" },
        ]
      },
      {
        title: "APIs RESTful", duration: "10h", lessons: [
          { title: "Rotas e Middleware", duration: "3h" },
          { title: "Autenticação JWT", duration: "4h" },
          { title: "Validação de Dados", duration: "3h" },
        ]
      },
      {
        title: "Banco de Dados", duration: "8h", lessons: [
          { title: "MongoDB e Mongoose", duration: "4h" },
          { title: "Relacionamentos", duration: "2h" },
          { title: "Indexação", duration: "2h" },
        ]
      },
      {
        title: "Deploy e Produção", duration: "6h", lessons: [
          { title: "Docker e Containers", duration: "3h" },
          { title: "Cloud Deployment", duration: "3h" },
        ]
      },
    ],
  },
  {
    id: 5,
    title: "Flutter para Mobile",
    description: "Crie apps nativos para iOS e Android com Flutter e Dart.",
    instructor: "Carlos Lima",
    level: "intermediate",
    duration: "40 horas",
    students: 634,
    rating: 4.6,
    price: 297,
    originalPrice: 397,
    image: "/courses/flutter.jpg",
    category: "Mobile",
    lessons: 35,
    certificate: true,
    new: true,
    discount: 25,
    modules: [
      {
        title: "Dart e Flutter Básico", duration: "8h", lessons: [
          { title: "Sintaxe Dart", duration: "3h" },
          { title: "Widgets Básicos", duration: "3h" },
          { title: "Layout e Navegação", duration: "2h" },
        ]
      },
      {
        title: "Estado e Gerenciamento", duration: "10h", lessons: [
          { title: "setState e Provider", duration: "4h" },
          { title: "Bloc Pattern", duration: "4h" },
          { title: "GetX", duration: "2h" },
        ]
      },
      {
        title: "APIs e Persistência", duration: "8h", lessons: [
          { title: "HTTP e REST APIs", duration: "4h" },
          { title: "SQLite e Hive", duration: "4h" },
        ]
      },
      {
        title: "Publish e Deploy", duration: "6h", lessons: [
          { title: "Google Play Store", duration: "3h" },
          { title: "Apple App Store", duration: "3h" },
        ]
      },
    ],
  },
  {
    id: 6,
    title: "DevOps e CI/CD",
    description: "Automatize deploy, monitoramento e infraestrutura como código.",
    instructor: "Roberto Silva",
    level: "advanced",
    duration: "50 horas",
    students: 445,
    rating: 4.8,
    price: 347,
    originalPrice: 447,
    image: "/courses/devops.jpg",
    category: "DevOps",
    lessons: 40,
    certificate: true,
    discount: 22,
    modules: [
      {
        title: "Fundamentos DevOps", duration: "8h", lessons: [
          { title: "Cultura DevOps", duration: "2h" },
          { title: "Git e Versionamento", duration: "3h" },
          { title: "Docker Básico", duration: "3h" },
        ]
      },
      {
        title: "CI/CD Pipelines", duration: "12h", lessons: [
          { title: "GitHub Actions", duration: "4h" },
          { title: "Jenkins", duration: "4h" },
          { title: "GitLab CI", duration: "4h" },
        ]
      },
      {
        title: "Infraestrutura como Código", duration: "10h", lessons: [
          { title: "Terraform", duration: "5h" },
          { title: "Ansible", duration: "5h" },
        ]
      },
      {
        title: "Monitoramento", duration: "8h", lessons: [
          { title: "Prometheus e Grafana", duration: "4h" },
          { title: "ELK Stack", duration: "4h" },
        ]
      },
    ],
  },
  {
    id: 7,
    title: "Python para Data Science",
    description: "Aprenda Python, pandas, numpy e machine learning para análise de dados.",
    instructor: "Ana Costa",
    level: "intermediate",
    duration: "160 horas",
    students: 1567,
    rating: 4.9,
    price: 297,
    originalPrice: 397,
    image: "/courses/python-data.jpg",
    category: "Data Science",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 25,
    modules: [
      {
        title: "Python Básico", duration: "10h", lessons: [
          { title: "Sintaxe Python", duration: "2h" },
          { title: "Estruturas de Dados", duration: "3h" },
          { title: "Funções e Classes", duration: "3h" },
          { title: "Tratamento de Erros", duration: "2h" },
        ]
      },
      {
        title: "Pandas e Numpy", duration: "15h", lessons: [
          { title: "Introdução ao Pandas", duration: "4h" },
          { title: "Manipulação de Dados", duration: "5h" },
          { title: "Numpy para Computação", duration: "4h" },
          { title: "Visualização com Matplotlib", duration: "2h" },
        ]
      },
      {
        title: "Machine Learning", duration: "20h", lessons: [
          { title: "Introdução ao ML", duration: "4h" },
          { title: "Scikit-learn", duration: "6h" },
          { title: "Modelos de Regressão", duration: "5h" },
          { title: "Modelos de Classificação", duration: "5h" },
        ]
      },
      {
        title: "Projeto Final", duration: "15h", lessons: [
          { title: "Análise Exploratória", duration: "5h" },
          { title: "Preparação dos Dados", duration: "5h" },
          { title: "Treinamento e Avaliação", duration: "5h" },
        ]
      },
    ],
  },
  {
    id: 8,
    title: "Node.js e APIs REST",
    description: "Desenvolva APIs robustas com Node.js, Express e MongoDB.",
    instructor: "Carlos Oliveira",
    level: "intermediate",
    duration: "40 horas",
    students: 1123,
    rating: 4.7,
    price: 247,
    originalPrice: 347,
    image: "/courses/nodejs.jpg",
    category: "Backend",
    lessons: 32,
    certificate: true,
    featured: false,
    discount: 29,
    modules: [
      {
        title: "Fundamentos Node.js", duration: "8h", lessons: [
          { title: "Introdução ao Node.js", duration: "2h" },
          { title: "Módulos e NPM", duration: "2h" },
          { title: "Event Loop", duration: "2h" },
          { title: "Streams e Buffers", duration: "2h" },
        ]
      },
      {
        title: "Express.js", duration: "12h", lessons: [
          { title: "Configuração do Express", duration: "2h" },
          { title: "Rotas e Middleware", duration: "4h" },
          { title: "Validação de Dados", duration: "3h" },
          { title: "Autenticação JWT", duration: "3h" },
        ]
      },
      {
        title: "Banco de Dados", duration: "10h", lessons: [
          { title: "MongoDB Básico", duration: "4h" },
          { title: "Mongoose ODM", duration: "3h" },
          { title: "PostgreSQL com Sequelize", duration: "3h" },
        ]
      },
      {
        title: "Deploy e Produção", duration: "10h", lessons: [
          { title: "Docker para Node.js", duration: "3h" },
          { title: "Deploy na Nuvem", duration: "4h" },
          { title: "Monitoramento e Logs", duration: "3h" },
        ]
      },
    ],
  },
  {
    id: 9,
    title: "Flutter para Desenvolvimento Mobile",
    description: "Crie apps nativos para iOS e Android com Flutter e Dart.",
    instructor: "Fernanda Lima",
    level: "intermediate",
    duration: "430 horas",
    students: 987,
    rating: 4.8,
    price: 297,
    originalPrice: 397,
    image: "/courses/flutter.jpg",
    category: "Mobile",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 25,
    modules: [
      {
        title: "Dart e Flutter", duration: "10h", lessons: [
          { title: "Introdução ao Dart", duration: "3h" },
          { title: "Widgets Básicos", duration: "4h" },
          { title: "Layout e Navegação", duration: "3h" },
        ]
      },
      {
        title: "Estado e Gerenciamento", duration: "12h", lessons: [
          { title: "State Management", duration: "4h" },
          { title: "Provider Pattern", duration: "4h" },
          { title: "Bloc Pattern", duration: "4h" },
        ]
      },
      {
        title: "APIs e Dados", duration: "10h", lessons: [
          { title: "HTTP e APIs", duration: "4h" },
          { title: "Local Storage", duration: "3h" },
          { title: "Firebase Integration", duration: "3h" },
        ]
      },
      {
        title: "Deploy e Publicação", duration: "13h", lessons: [
          { title: "Build para Android", duration: "4h" },
          { title: "Build para iOS", duration: "4h" },
          { title: "App Store e Play Store", duration: "5h" },
        ]
      },
    ],
  },
  {
    id: 10,
    title: "AWS Cloud Practitioner",
    description: "Certificação AWS e fundamentos de computação em nuvem.",
    instructor: "Ricardo Santos",
    level: "beginner",
    duration: "430 horas",
    students: 2341,
    rating: 4.6,
    price: 197,
    originalPrice: 297,
    image: "/courses/aws.jpg",
    category: "Cloud",
    lessons: 600,
    certificate: true,
    featured: false,
    discount: 34,
    modules: [
      {
        title: "Fundamentos AWS", duration: "8h", lessons: [
          { title: "Introdução à Nuvem", duration: "2h" },
          { title: "Regiões e Availability Zones", duration: "2h" },
          { title: "IAM e Segurança", duration: "2h" },
          { title: "Billing e Cost Management", duration: "2h" },
        ]
      },
      {
        title: "Serviços Core", duration: "12h", lessons: [
          { title: "EC2 e VPC", duration: "4h" },
          { title: "S3 e Storage", duration: "4h" },
          { title: "RDS e Databases", duration: "4h" },
        ]
      },
      {
        title: "Serviços Avançados", duration: "10h", lessons: [
          { title: "Lambda e Serverless", duration: "4h" },
          { title: "CloudFormation", duration: "3h" },
          { title: "CloudWatch e Monitoring", duration: "3h" },
        ]
      },
    ],
  },
  {
    id: 11,
    title: "Cibersegurança para Desenvolvedores",
    description: "Proteja suas aplicações contra vulnerabilidades e ataques.",
    instructor: "Patrícia Silva",
    level: "intermediate",
    duration: "430 horas",
    students: 756,
    rating: 4.9,
    price: 347,
    originalPrice: 447,
    image: "/courses/security.jpg",
    category: "Segurança",
    lessons: 600,
    certificate: true,
    featured: false,
    discount: 22,
    modules: [
      {
        title: "Fundamentos de Segurança", duration: "8h", lessons: [
          { title: "Princípios de Segurança", duration: "2h" },
          { title: "Tipos de Ataques", duration: "3h" },
          { title: "OWASP Top 10", duration: "3h" },
        ]
      },
      {
        title: "Segurança Web", duration: "12h", lessons: [
          { title: "SQL Injection", duration: "3h" },
          { title: "XSS e CSRF", duration: "4h" },
          { title: "Autenticação Segura", duration: "3h" },
          { title: "HTTPS e Certificados", duration: "2h" },
        ]
      },
      {
        title: "Segurança de APIs", duration: "10h", lessons: [
          { title: "API Security", duration: "3h" },
          { title: "Rate Limiting", duration: "2h" },
          { title: "JWT Security", duration: "3h" },
          { title: "OAuth 2.0", duration: "2h" },
        ]
      },
      {
        title: "Auditoria e Testes", duration: "5h", lessons: [
          { title: "Penetration Testing", duration: "3h" },
          { title: "Security Auditing", duration: "2h" },
        ]
      },
    ],
  },
  {
    id: 12,
    title: "Blockchain e Smart Contracts",
    description: "Desenvolva aplicações descentralizadas com Ethereum e Solidity.",
    instructor: "Lucas Mendes",
    level: "advanced",
    duration: "430 horas",
    students: 432,
    rating: 4.7,
    price: 447,
    originalPrice: 547,
    image: "/courses/blockchain.jpg",
    category: "Blockchain",
    lessons: 600,
    certificate: true,
    featured: false,
    discount: 18,
    modules: [
      {
        title: "Fundamentos Blockchain", duration: "10h", lessons: [
          { title: "Conceitos Básicos", duration: "2h" },
          { title: "Criptografia", duration: "3h" },
          { title: "Consenso e Mineração", duration: "3h" },
          { title: "Tipos de Blockchain", duration: "2h" },
        ]
      },
      {
        title: "Ethereum e Solidity", duration: "15h", lessons: [
          { title: "Ethereum Virtual Machine", duration: "3h" },
          { title: "Sintaxe Solidity", duration: "4h" },
          { title: "Smart Contracts", duration: "5h" },
          { title: "Deploy e Interação", duration: "3h" },
        ]
      },
      {
        title: "DApps e Web3", duration: "15h", lessons: [
          { title: "Web3.js", duration: "5h" },
          { title: "MetaMask Integration", duration: "4h" },
          { title: "Frontend para DApps", duration: "6h" },
        ]
      },
      {
        title: "DeFi e Tokens", duration: "10h", lessons: [
          { title: "ERC-20 Tokens", duration: "4h" },
          { title: "DeFi Protocols", duration: "3h" },
          { title: "NFTs e ERC-721", duration: "3h" },
        ]
      },
    ],
  },
  {
    id: 13,
    title: "Vue.js 3 e Composition API",
    description: "Desenvolva aplicações modernas com Vue.js 3 e suas novas funcionalidades.",
    instructor: "Gabriel Martins",
    level: "intermediate",
    duration: "35 horas",
    students: 876,
    rating: 4.8,
    price: 247,
    originalPrice: 347,
    image: "/courses/vuejs.jpg",
    category: "Frontend",
    lessons: 30,
    certificate: true,
    featured: false,
    discount: 29,
    modules: [
      {
        title: "Vue.js 3 Básico", duration: "10h", lessons: [
          { title: "Introdução ao Vue 3", duration: "2h" },
          { title: "Composition API", duration: "4h" },
          { title: "Reactivity System", duration: "4h" },
        ]
      },
      {
        title: "Componentes Avançados", duration: "12h", lessons: [
          { title: "Slots e Composables", duration: "4h" },
          { title: "Teleport e Suspense", duration: "4h" },
          { title: "Custom Directives", duration: "4h" },
        ]
      },
      {
        title: "Vue Router e Pinia", duration: "8h", lessons: [
          { title: "Vue Router 4", duration: "4h" },
          { title: "Pinia State Management", duration: "4h" },
        ]
      },
      {
        title: "Projeto Final", duration: "5h", lessons: [
          { title: "Desenvolvimento", duration: "4h" },
          { title: "Deploy e Otimização", duration: "1h" },
        ]
      },
    ],
  },
  {
    id: 14,
    title: "Docker e Kubernetes",
    description: "Containerização e orquestração de aplicações com Docker e Kubernetes.",
    instructor: "André Costa",
    level: "advanced",
    duration: "40 horas",
    students: 654,
    rating: 4.7,
    price: 347,
    originalPrice: 447,
    image: "/courses/docker.jpg",
    category: "DevOps",
    lessons: 32,
    certificate: true,
    featured: false,
    discount: 22,
    modules: [
      {
        title: "Docker Fundamentals", duration: "12h", lessons: [
          { title: "Conceitos de Containers", duration: "2h" },
          { title: "Dockerfile e Imagens", duration: "4h" },
          { title: "Docker Compose", duration: "4h" },
          { title: "Volumes e Networks", duration: "2h" },
        ]
      },
      {
        title: "Kubernetes Básico", duration: "15h", lessons: [
          { title: "Arquitetura Kubernetes", duration: "3h" },
          { title: "Pods e Services", duration: "4h" },
          { title: "Deployments e ReplicaSets", duration: "4h" },
          { title: "ConfigMaps e Secrets", duration: "4h" },
        ]
      },
      {
        title: "Kubernetes Avançado", duration: "13h", lessons: [
          { title: "Ingress e Load Balancing", duration: "4h" },
          { title: "Helm Charts", duration: "4h" },
          { title: "Monitoring e Logging", duration: "5h" },
        ]
      },
    ],
  },
  {
    id: 15,
    title: "TypeScript Avançado",
    description: "Domine TypeScript com tipos avançados, decorators e padrões de projeto.",
    instructor: "Rafael Oliveira",
    level: "advanced",
    duration: "25 horas",
    students: 1234,
    rating: 4.9,
    price: 297,
    originalPrice: 397,
    image: "/courses/typescript.jpg",
    category: "Frontend",
    lessons: 20,
    certificate: true,
    featured: true,
    discount: 25,
    modules: [
      {
        title: "Tipos Avançados", duration: "8h", lessons: [
          { title: "Union e Intersection Types", duration: "2h" },
          { title: "Generic Types", duration: "3h" },
          { title: "Conditional Types", duration: "3h" },
        ]
      },
      {
        title: "Decorators e Metadata", duration: "8h", lessons: [
          { title: "Class Decorators", duration: "3h" },
          { title: "Method Decorators", duration: "3h" },
          { title: "Property Decorators", duration: "2h" },
        ]
      },
      {
        title: "Padrões e Boas Práticas", duration: "9h", lessons: [
          { title: "Design Patterns", duration: "4h" },
          { title: "SOLID Principles", duration: "3h" },
          { title: "Testing com TypeScript", duration: "2h" },
        ]
      },
    ],
  },
  {
    id: 16,
    title: "React Avançado",
    description: "Domine React com hooks avançados, Context API, performance e aplicações empresariais.",
    instructor: "Mariana Costa",
    level: "advanced",
    duration: "430 horas",
    students: 2341,
    rating: 4.9,
    price: 397,
    originalPrice: 497,
    image: "/courses/react-advanced.jpg",
    category: "Frontend",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 20,
    modules: [
      {
        title: "Hooks Avançados", duration: "20h", lessons: [
          { title: "useReducer e useCallback", duration: "4h" },
          { title: "useMemo e useRef", duration: "4h" },
          { title: "Custom Hooks", duration: "6h" },
          { title: "Hooks Patterns", duration: "6h" },
        ]
      },
      {
        title: "Context API e State Management", duration: "20h", lessons: [
          { title: "Context API Avançado", duration: "6h" },
          { title: "Redux Toolkit", duration: "8h" },
          { title: "Zustand", duration: "6h" },
        ]
      },
      {
        title: "Performance e Otimização", duration: "20h", lessons: [
          { title: "React.memo e useMemo", duration: "6h" },
          { title: "Code Splitting", duration: "6h" },
          { title: "Lazy Loading", duration: "8h" },
        ]
      },
      {
        title: "Testing e Deploy", duration: "20h", lessons: [
          { title: "Testing Library", duration: "8h" },
          { title: "Jest e Vitest", duration: "6h" },
          { title: "Deploy e Otimização", duration: "6h" },
        ]
      },
    ],
  },
  {
    id: 17,
    title: "Node.js Backend Development",
    description: "Desenvolva APIs robustas e microserviços com Node.js, Express e TypeScript.",
    instructor: "Carlos Oliveira",
    level: "advanced",
    duration: "430 horas",
    students: 1876,
    rating: 4.8,
    price: 397,
    originalPrice: 497,
    image: "/courses/nodejs-backend.jpg",
    category: "Backend",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 20,
    modules: [
      {
        title: "Fundamentos Avançados", duration: "20h", lessons: [
          { title: "Event Loop e Performance", duration: "6h" },
          { title: "Streams e Buffers", duration: "6h" },
          { title: "Clustering e PM2", duration: "8h" },
        ]
      },
      {
        title: "APIs e Microserviços", duration: "20h", lessons: [
          { title: "REST APIs Avançadas", duration: "8h" },
          { title: "GraphQL", duration: "6h" },
          { title: "Microserviços", duration: "6h" },
        ]
      },
      {
        title: "Banco de Dados e Cache", duration: "20h", lessons: [
          { title: "PostgreSQL Avançado", duration: "8h" },
          { title: "Redis e Cache", duration: "6h" },
          { title: "MongoDB e Mongoose", duration: "6h" },
        ]
      },
      {
        title: "Deploy e Produção", duration: "20h", lessons: [
          { title: "Docker e Kubernetes", duration: "8h" },
          { title: "CI/CD Pipelines", duration: "6h" },
          { title: "Monitoramento", duration: "6h" },
        ]
      },
    ],
  },
  {
    id: 18,
    title: "Machine Learning com Python",
    description: "Aprenda machine learning, deep learning e NLP com Python e bibliotecas modernas.",
    instructor: "Ana Silva",
    level: "advanced",
    duration: "430 horas",
    students: 2156,
    rating: 4.9,
    price: 447,
    originalPrice: 547,
    image: "/courses/machine-learning.jpg",
    category: "Data Science",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 18,
    modules: [
      {
        title: "Fundamentos de ML", duration: "20h", lessons: [
          { title: "Matemática para ML", duration: "6h" },
          { title: "Algoritmos Supervisionados", duration: "8h" },
          { title: "Algoritmos Não Supervisionados", duration: "6h" },
        ]
      },
      {
        title: "Deep Learning", duration: "20h", lessons: [
          { title: "Neural Networks", duration: "8h" },
          { title: "TensorFlow e PyTorch", duration: "8h" },
          { title: "Computer Vision", duration: "4h" },
        ]
      },
      {
        title: "NLP e Processamento de Texto", duration: "20h", lessons: [
          { title: "Transformers", duration: "8h" },
          { title: "BERT e GPT", duration: "6h" },
          { title: "Chatbots", duration: "6h" },
        ]
      },
      {
        title: "Projetos Práticos", duration: "20h", lessons: [
          { title: "Sistema de Recomendação", duration: "8h" },
          { title: "Classificação de Imagens", duration: "6h" },
          { title: "Análise de Sentimentos", duration: "6h" },
        ]
      },
    ],
  },
  {
    id: 19,
    title: "Desenvolvimento Mobile",
    description: "Crie apps mobile nativos e cross-platform para iOS e Android.",
    instructor: "Roberto Lima",
    level: "advanced",
    duration: "430 horas",
    students: 1654,
    rating: 4.8,
    price: 397,
    originalPrice: 497,
    image: "/courses/mobile-dev.jpg",
    category: "Mobile",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 20,
    modules: [
      {
        title: "React Native Avançado", duration: "20h", lessons: [
          { title: "Performance e Otimização", duration: "6h" },
          { title: "Native Modules", duration: "8h" },
          { title: "Testing e Deploy", duration: "6h" },
        ]
      },
      {
        title: "Flutter Avançado", duration: "20h", lessons: [
          { title: "Custom Widgets", duration: "8h" },
          { title: "State Management", duration: "6h" },
          { title: "Platform Channels", duration: "6h" },
        ]
      },
      {
        title: "Desenvolvimento Nativo", duration: "20h", lessons: [
          { title: "iOS com Swift", duration: "10h" },
          { title: "Android com Kotlin", duration: "10h" },
        ]
      },
      {
        title: "Projetos Integrados", duration: "20h", lessons: [
          { title: "App E-commerce", duration: "10h" },
          { title: "App Social", duration: "10h" },
        ]
      },
    ],
  },
  {
    id: 20,
    title: "React Native Mobile Development",
    description: "Desenvolva apps mobile com React Native para iOS e Android.",
    instructor: "Fernanda Costa",
    level: "advanced",
    duration: "430 horas",
    students: 1432,
    rating: 4.8,
    price: 397,
    originalPrice: 497,
    image: "/courses/react-native.jpg",
    category: "Mobile",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 20,
    modules: [
      {
        title: "Fundamentos Avançados", duration: "20h", lessons: [
          { title: "Performance e Otimização", duration: "6h" },
          { title: "Native Modules", duration: "8h" },
          { title: "Testing e Deploy", duration: "6h" },
        ]
      },
      {
        title: "APIs e Integração", duration: "20h", lessons: [
          { title: "REST APIs", duration: "8h" },
          { title: "Push Notifications", duration: "6h" },
          { title: "Analytics", duration: "6h" },
        ]
      },
      {
        title: "Componentes Avançados", duration: "20h", lessons: [
          { title: "Custom Components", duration: "8h" },
          { title: "Animations", duration: "6h" },
          { title: "Maps Integration", duration: "6h" },
        ]
      },
      {
        title: "Projetos Práticos", duration: "20h", lessons: [
          { title: "App de Delivery", duration: "10h" },
          { title: "App de Fitness", duration: "10h" },
        ]
      },
    ],
  },
  {
    id: 21,
    title: "Data Engineering",
    description: "Construa pipelines de dados robustos, ETL, big data e arquiteturas de dados.",
    instructor: "Lucas Santos",
    level: "advanced",
    duration: "430 horas",
    students: 987,
    rating: 4.9,
    price: 447,
    originalPrice: 547,
    image: "/courses/data-engineering.jpg",
    category: "Data Science",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 18,
    modules: [
      {
        title: "Big Data e Processamento", duration: "20h", lessons: [
          { title: "Hadoop Ecosystem", duration: "8h" },
          { title: "Apache Spark", duration: "8h" },
          { title: "Streaming", duration: "4h" },
        ]
      },
      {
        title: "Data Lakes e Armazenamento", duration: "20h", lessons: [
          { title: "Delta Lake", duration: "8h" },
          { title: "Data Quality", duration: "6h" },
          { title: "Metadata Management", duration: "6h" },
        ]
      },
      {
        title: "ETL e Pipelines", duration: "20h", lessons: [
          { title: "Apache Airflow", duration: "8h" },
          { title: "Data Validation", duration: "6h" },
          { title: "Monitoring", duration: "6h" },
        ]
      },
      {
        title: "Arquiteturas Avançadas", duration: "20h", lessons: [
          { title: "Data Mesh", duration: "8h" },
          { title: "Event-driven", duration: "6h" },
          { title: "Microservices", duration: "6h" },
        ]
      },
    ],
  },
  {
    id: 22,
    title: "Game Development",
    description: "Desenvolva jogos 2D e 3D com Unity, Unreal Engine e programação de jogos.",
    instructor: "Gabriel Oliveira",
    level: "advanced",
    duration: "430 horas",
    students: 765,
    rating: 4.8,
    price: 447,
    originalPrice: 547,
    image: "/courses/game-dev.jpg",
    category: "Desenvolvimento Web",
    lessons: 600,
    certificate: true,
    featured: true,
    discount: 18,
    modules: [
      {
        title: "Unity Avançado", duration: "20h", lessons: [
          { title: "Scripting Avançado", duration: "8h" },
          { title: "Performance", duration: "6h" },
          { title: "Multiplayer", duration: "6h" },
        ]
      },
      {
        title: "Unreal Engine", duration: "20h", lessons: [
          { title: "Blueprints", duration: "8h" },
          { title: "Materials e Shaders", duration: "6h" },
          { title: "Landscape", duration: "6h" },
        ]
      },
      {
        title: "Programação de Jogos", duration: "20h", lessons: [
          { title: "Game Physics", duration: "8h" },
          { title: "AI para Jogos", duration: "6h" },
          { title: "Audio e VFX", duration: "6h" },
        ]
      },
      {
        title: "Projetos Completos", duration: "20h", lessons: [
          { title: "Jogo 2D Platformer", duration: "10h" },
          { title: "Jogo 3D FPS", duration: "10h" },
        ]
      },
    ],
  },
];

const categories = [
  "Todos",
  "Desenvolvimento Web",
  "Frontend",
  "Backend",
  "Mobile",
  "Data Science",
  "DevOps",
  "Cloud",
  "Segurança",
  "Blockchain",
  "Game Development"
];

const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;

    const matchesLevel = selectedLevel === 'Todos' ||
      (selectedLevel === 'Iniciante' && course.level === 'beginner') ||
      (selectedLevel === 'Intermediário' && course.level === 'intermediate') ||
      (selectedLevel === 'Avançado' && course.level === 'advanced');

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const toggleFavorite = (courseId: number) => {
    setFavorites(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Explore Nossos Cursos
              </h1>
              <p className="text-gray-600">
                {filteredCourses.length} cursos encontrados
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* IDE Button */}
              <Link
                href="/ide"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg">🚀</span>
                <span>FENIX IDE</span>
              </Link>

              {/* Subscriptions Button */}
              <Link
                href="/subscriptions"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg">💎</span>
                <span>Planos & Assinaturas</span>
              </Link>

              {/* View Content Button */}
              <Link
                href="/courses-content"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Ver Conteúdo</span>
              </Link>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Mais Relevantes</option>
                <option value="newest">Mais Recentes</option>
                <option value="rating">Melhor Avaliados</option>
                <option value="students">Mais Populares</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                >
                  {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar cursos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Faixa de Preço
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-sm text-gray-600">Gratuitos</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-sm text-gray-600">Até R$ 100</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-sm text-gray-600">R$ 100 - R$ 300</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-sm text-gray-600">Acima de R$ 300</span>
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todos');
                    setSelectedLevel('Todos');
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum curso encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar os filtros ou termos de busca
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
                }`}>
                {sortedCourses.map((course, index) => (
                  <AnimatedComponent
                    key={course.id}
                    animation="slideUp"
                    duration={0.3}
                    delay={index * 0.1}
                    className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''
                      }`}
                  >
                    {/* Course Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'
                      }`}>
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl lg:rounded-l-xl lg:rounded-t-none flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-80" />
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {course.featured && (
                          <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                            Destaque
                          </span>
                        )}
                        {course.new && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            Novo
                          </span>
                        )}
                        {course.discount && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            {course.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={() => toggleFavorite(course.id)}
                          className={`p-2 rounded-full transition-colors ${favorites.includes(course.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                            }`}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(course.id) ? 'fill-current' : ''
                            }`} />
                        </button>
                        <button className="p-2 bg-white/80 text-gray-600 rounded-full hover:bg-white transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {/* Category and Level */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-blue-600 font-medium">
                          {course.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                          {getLevelLabel(course.level)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Instructor */}
                      <p className="text-sm text-gray-500 mb-4">
                        Por {course.instructor}
                      </p>

                      {/* Course Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {course.lessons} aulas
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(course.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {course.rating} ({course.students.toLocaleString()})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(course.price)}
                          </span>
                          {course.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              {formatPrice(course.originalPrice)}
                            </span>
                          )}
                        </div>
                        {course.certificate && (
                          <div className="flex items-center text-sm text-green-600">
                            <Award className="w-4 h-4 mr-1" />
                            Certificado
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Link
                          href={`/course/${navigationConfig.courseIdMapping[course.id as keyof typeof navigationConfig.courseIdMapping] || 'web-fundamentals'}`}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-center"
                        >
                          Ver Curso
                        </Link>
                        <Link
                          href={`/payment?course=${course.id}`}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-center"
                        >
                          Comprar Agora
                        </Link>
                      </div>
                    </div>
                  </AnimatedComponent>
                ))}
              </div>
            )}

            {/* Pagination */}
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
          </div>
        </div>
      </div>
    </div>
  );
} 