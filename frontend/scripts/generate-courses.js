const fs = require('fs');
const path = require('path');

// Estrutura completa dos 26 cursos da Fênix Academy
const courses = [
  // Frontend Development
  {
    id: 'html-css-fundamentals',
    title: 'HTML & CSS Fundamentos',
    category: 'Frontend',
    description: 'Aprenda os fundamentos do desenvolvimento web com HTML5 e CSS3 moderno',
    duration: '40 horas',
    level: 'Iniciante',
    modules: 4,
    lessons: 20,
    projects: ['Landing Page Responsiva', 'Portfolio Pessoal', 'Blog Estático', 'E-commerce Básico']
  },
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentos',
    category: 'Frontend',
    description: 'Domine JavaScript do zero ao avançado com projetos práticos',
    duration: '60 horas',
    level: 'Iniciante',
    modules: 5,
    lessons: 20,
    projects: ['Calculadora Interativa', 'Jogo da Memória', 'To-Do List', 'Weather App']
  },
  {
    id: 'react-complete',
    title: 'React Completo',
    category: 'Frontend',
    description: 'Desenvolva aplicações modernas com React, Hooks e Context API',
    duration: '80 horas',
    level: 'Intermediário',
    modules: 6,
    lessons: 20,
    projects: ['Social Media App', 'E-commerce Dashboard', 'Task Manager', 'Real-time Chat']
  },
  {
    id: 'nextjs-advanced',
    title: 'Next.js Avançado',
    category: 'Frontend',
    description: 'Aprenda Next.js 14 com App Router, Server Components e otimizações',
    duration: '70 horas',
    level: 'Intermediário',
    modules: 5,
    lessons: 20,
    projects: ['Blog com CMS', 'E-commerce Full-stack', 'SaaS Platform', 'Portfolio Profissional']
  },
  {
    id: 'vuejs-complete',
    title: 'Vue.js Completo',
    category: 'Frontend',
    description: 'Desenvolva aplicações reativas com Vue 3, Composition API e Pinia',
    duration: '65 horas',
    level: 'Intermediário',
    modules: 5,
    lessons: 20,
    projects: ['Admin Dashboard', 'Music Player', 'Recipe App', 'Real-time Dashboard']
  },
  {
    id: 'angular-complete',
    title: 'Angular Completo',
    category: 'Frontend',
    description: 'Crie aplicações enterprise com Angular, RxJS e NgRx',
    duration: '90 horas',
    level: 'Avançado',
    modules: 6,
    lessons: 20,
    projects: ['CRM System', 'Banking App', 'Healthcare Portal', 'Learning Management System']
  },

  // Backend Development
  {
    id: 'nodejs-fundamentals',
    title: 'Node.js Fundamentos',
    category: 'Backend',
    description: 'Desenvolva APIs robustas com Node.js, Express e MongoDB',
    duration: '50 horas',
    level: 'Iniciante',
    modules: 4,
    lessons: 20,
    projects: ['REST API', 'Real-time Chat', 'File Upload System', 'Authentication API']
  },
  {
    id: 'express-advanced',
    title: 'Express.js Avançado',
    category: 'Backend',
    description: 'Aprenda Express.js avançado com middleware, autenticação e otimizações',
    duration: '45 horas',
    level: 'Intermediário',
    modules: 4,
    lessons: 20,
    projects: ['Microservices API', 'E-commerce Backend', 'Social Media API', 'Analytics API']
  },
  {
    id: 'nestjs-complete',
    title: 'NestJS Completo',
    category: 'Backend',
    description: 'Desenvolva APIs escaláveis com NestJS, TypeORM e microserviços',
    duration: '75 horas',
    level: 'Avançado',
    modules: 6,
    lessons: 20,
    projects: ['E-commerce Platform', 'Real-time Collaboration', 'IoT Dashboard', 'Financial System']
  },
  {
    id: 'python-django',
    title: 'Python & Django',
    category: 'Backend',
    description: 'Crie aplicações web robustas com Python e Django',
    duration: '70 horas',
    level: 'Intermediário',
    modules: 5,
    lessons: 20,
    projects: ['Blog Platform', 'E-learning System', 'Inventory Management', 'Social Network']
  },
  {
    id: 'python-fastapi',
    title: 'Python & FastAPI',
    category: 'Backend',
    description: 'Desenvolva APIs modernas e rápidas com FastAPI e Pydantic',
    duration: '55 horas',
    level: 'Intermediário',
    modules: 4,
    lessons: 20,
    projects: ['High-performance API', 'Machine Learning API', 'Real-time Analytics', 'Documentation API']
  },
  {
    id: 'java-spring',
    title: 'Java & Spring Boot',
    category: 'Backend',
    description: 'Desenvolva aplicações enterprise com Java e Spring Boot',
    duration: '85 horas',
    level: 'Avançado',
    modules: 6,
    lessons: 20,
    projects: ['Banking System', 'E-commerce Platform', 'Healthcare Management', 'Inventory System']
  },

  // Mobile Development
  {
    id: 'react-native-complete',
    title: 'React Native Completo',
    category: 'Mobile',
    description: 'Desenvolva apps nativos para iOS e Android com React Native',
    duration: '80 horas',
    level: 'Intermediário',
    modules: 6,
    lessons: 20,
    projects: ['Food Delivery App', 'Fitness Tracker', 'Social Media App', 'E-commerce Mobile']
  },
  {
    id: 'flutter-complete',
    title: 'Flutter Completo',
    category: 'Mobile',
    description: 'Crie apps nativos multiplataforma com Flutter e Dart',
    duration: '75 horas',
    level: 'Intermediário',
    modules: 5,
    lessons: 20,
    projects: ['Banking App', 'News Reader', 'Weather App', 'Task Management']
  },
  {
    id: 'swift-ios',
    title: 'Swift & iOS Development',
    category: 'Mobile',
    description: 'Desenvolva apps nativos para iOS com Swift e SwiftUI',
    duration: '90 horas',
    level: 'Avançado',
    modules: 6,
    lessons: 20,
    projects: ['Photo Editor', 'Music Streaming', 'Fitness App', 'AR Shopping']
  },
  {
    id: 'kotlin-android',
    title: 'Kotlin & Android Development',
    category: 'Mobile',
    description: 'Crie apps Android nativos com Kotlin e Jetpack Compose',
    duration: '85 horas',
    level: 'Avançado',
    modules: 6,
    lessons: 20,
    projects: ['Messaging App', 'Navigation App', 'Health Tracker', 'Gaming App']
  },

  // Data Science & AI
  {
    id: 'python-data-science',
    title: 'Python para Data Science',
    category: 'Data Science',
    description: 'Aprenda análise de dados com Python, Pandas e NumPy',
    duration: '60 horas',
    level: 'Iniciante',
    modules: 4,
    lessons: 20,
    projects: ['Sales Analysis', 'Stock Market Predictor', 'Customer Segmentation', 'Data Visualization']
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Completo',
    category: 'Data Science',
    description: 'Domine Machine Learning com scikit-learn e TensorFlow',
    duration: '80 horas',
    level: 'Intermediário',
    modules: 6,
    lessons: 20,
    projects: ['Image Classifier', 'Recommendation System', 'Fraud Detection', 'Price Predictor']
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Avançado',
    category: 'Data Science',
    description: 'Aprenda Deep Learning com TensorFlow e PyTorch',
    duration: '90 horas',
    level: 'Avançado',
    modules: 6,
    lessons: 20,
    projects: ['Computer Vision', 'NLP Chatbot', 'Generative AI', 'Reinforcement Learning']
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    category: 'Data Science',
    description: 'Construa pipelines de dados com Apache Airflow e Spark',
    duration: '70 horas',
    level: 'Avançado',
    modules: 5,
    lessons: 20,
    projects: ['ETL Pipeline', 'Real-time Analytics', 'Data Lake', 'ML Pipeline']
  },

  // DevOps & Cloud
  {
    id: 'docker-kubernetes',
    title: 'Docker & Kubernetes',
    category: 'DevOps',
    description: 'Containerize e orquestre aplicações com Docker e Kubernetes',
    duration: '60 horas',
    level: 'Intermediário',
    modules: 4,
    lessons: 20,
    projects: ['Microservices Cluster', 'CI/CD Pipeline', 'Monitoring Stack', 'Auto-scaling App']
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Practitioner',
    category: 'DevOps',
    description: 'Domine a nuvem AWS com serviços essenciais e melhores práticas',
    duration: '70 horas',
    level: 'Intermediário',
    modules: 5,
    lessons: 20,
    projects: ['Serverless App', 'Multi-tier Architecture', 'Data Pipeline', 'Disaster Recovery']
  },
  {
    id: 'azure-cloud',
    title: 'Microsoft Azure',
    category: 'DevOps',
    description: 'Aprenda Azure com foco em soluções enterprise e híbridas',
    duration: '65 horas',
    level: 'Intermediário',
    modules: 5,
    lessons: 20,
    projects: ['Hybrid Cloud', 'AI Services', 'IoT Solution', 'Security Center']
  },
  {
    id: 'terraform-iac',
    title: 'Terraform & Infrastructure as Code',
    category: 'DevOps',
    description: 'Gerencie infraestrutura como código com Terraform',
    duration: '50 horas',
    level: 'Avançado',
    modules: 4,
    lessons: 20,
    projects: ['Multi-cloud Setup', 'Environment Management', 'Cost Optimization', 'Security Hardening']
  },

  // Cybersecurity
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking',
    category: 'Cybersecurity',
    description: 'Aprenda hacking ético e técnicas de penetração',
    duration: '80 horas',
    level: 'Avançado',
    modules: 6,
    lessons: 20,
    projects: ['Penetration Testing', 'Vulnerability Assessment', 'Security Audit', 'Incident Response']
  },
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentos',
    category: 'Cybersecurity',
    description: 'Fundamentos de segurança da informação e proteção de dados',
    duration: '55 horas',
    level: 'Iniciante',
    modules: 4,
    lessons: 20,
    projects: ['Security Policy', 'Risk Assessment', 'Security Training', 'Compliance Audit']
  }
];

// Estrutura de módulos para cada curso
const moduleTemplates = {
  'Frontend': [
    'Fundamentos e Configuração',
    'Componentes e Props',
    'Estado e Ciclo de Vida',
    'Roteamento e Navegação',
    'Gerenciamento de Estado',
    'Testes e Deploy'
  ],
  'Backend': [
    'Fundamentos da Linguagem',
    'Frameworks e Bibliotecas',
    'Banco de Dados e ORM',
    'APIs e Endpoints',
    'Autenticação e Segurança',
    'Deploy e Monitoramento'
  ],
  'Mobile': [
    'Configuração do Ambiente',
    'Componentes e Navegação',
    'Estado e Persistência',
    'APIs e Integração',
    'Testes e Performance',
    'Publish e Deploy'
  ],
  'Data Science': [
    'Fundamentos e Ferramentas',
    'Análise Exploratória',
    'Modelagem e Algoritmos',
    'Validação e Métricas',
    'Deploy e Produção',
    'Visualização e Storytelling'
  ],
  'DevOps': [
    'Fundamentos e Conceitos',
    'Containerização',
    'Orquestração',
    'CI/CD e Automação',
    'Monitoramento e Logs',
    'Segurança e Compliance'
  ],
  'Cybersecurity': [
    'Fundamentos de Segurança',
    'Análise de Vulnerabilidades',
    'Técnicas de Ataque',
    'Defesa e Mitigação',
    'Forense e Investigação',
    'Compliance e Auditoria'
  ]
};

// Função para gerar conteúdo de uma aula
function generateLessonContent(course, moduleIndex, lessonIndex) {
  const moduleNumber = moduleIndex + 1;
  const lessonNumber = lessonIndex + 1;
  const moduleTitle = moduleTemplates[course.category][moduleIndex] || `Módulo ${moduleNumber}`;
  
  return `# ${course.title} - ${moduleTitle} - Aula ${lessonNumber}

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- [ ] Compreender os conceitos fundamentais apresentados
- [ ] Implementar as práticas demonstradas
- [ ] Aplicar o conhecimento em projetos reais
- [ ] Resolver problemas comuns da área

## 📚 Conteúdo Teórico

### Introdução

Esta aula é parte do módulo "${moduleTitle}" do curso ${course.title}. Aqui você aprenderá conceitos essenciais de forma prática e didática.

### Conceitos Fundamentais

#### 1. Conceito Principal
Explicação detalhada do conceito principal com exemplos práticos:

\`\`\`${getLanguageForCourse(course.category)}
// Exemplo prático e comentado
const exemplo = "Demonstração clara";
console.log(exemplo);
\`\`\`

#### 2. Aplicação Prática
Como aplicar o conceito em situações reais:

\`\`\`${getLanguageForCourse(course.category)}
// Implementação prática
function implementacao() {
  // Código bem documentado
  return resultado;
}
\`\`\`

### Exemplos Práticos

#### Exemplo 1: Implementação Básica
\`\`\`${getLanguageForCourse(course.category)}
// Código comentado e explicado
const exemplo1 = {
  propriedade: "valor",
  metodo: function() {
    return "resultado";
  }
};
\`\`\`

#### Exemplo 2: Implementação Avançada
\`\`\`${getLanguageForCourse(course.category)}
// Implementação mais complexa
class ExemploAvancado {
  constructor(config) {
    this.config = config;
  }
  
  executar() {
    // Lógica implementada
  }
}
\`\`\`

## 🛠️ Exercícios Práticos

### Exercício 1: Implementação Básica
**Objetivo:** Implementar o conceito aprendido

**Instruções:**
1. Crie uma função que...
2. Implemente a lógica...
3. Teste com diferentes valores...

**Solução:**
\`\`\`${getLanguageForCourse(course.category)}
// Sua implementação aqui
\`\`\`

### Exercício 2: Aplicação Prática
**Objetivo:** Aplicar o conhecimento em um cenário real

**Instruções:**
1. Analise o problema...
2. Projete a solução...
3. Implemente o código...

**Solução:**
\`\`\`${getLanguageForCourse(course.category)}
// Sua solução aqui
\`\`\`

## 🎨 Projeto Prático

### ${course.projects[moduleIndex % course.projects.length]}

**Descrição:** ${course.description}

**Funcionalidades:**
- [ ] Funcionalidade 1
- [ ] Funcionalidade 2
- [ ] Funcionalidade 3

**Implementação:**
\`\`\`${getLanguageForCourse(course.category)}
// Código do projeto
\`\`\`

## 📝 Resumo

### Pontos Importantes
- Ponto 1: Explicação detalhada
- Ponto 2: Explicação detalhada
- Ponto 3: Explicação detalhada

### Próximos Passos
- Revisar os conceitos aprendidos
- Praticar com os exercícios
- Implementar o projeto prático
- Preparar para a próxima aula

## 🔗 Recursos Adicionais

- [Documentação Oficial](#)
- [Tutoriais Recomendados](#)
- [Ferramentas Úteis](#)
- [Comunidade](#)

## ❓ Perguntas Frequentes

**P: Pergunta comum?**
R: Resposta detalhada e explicativa.

**P: Outra pergunta?**
R: Resposta com exemplos práticos.

---

*Esta aula faz parte do curso ${course.title} da Fênix Academy. Continue praticando e não hesite em pedir ajuda na nossa comunidade!*
`;
}

// Função para determinar a linguagem baseada na categoria
function getLanguageForCourse(category) {
  const languageMap = {
    'Frontend': 'javascript',
    'Backend': 'javascript',
    'Mobile': 'javascript',
    'Data Science': 'python',
    'DevOps': 'yaml',
    'Cybersecurity': 'bash'
  };
  return languageMap[category] || 'javascript';
}

// Função para gerar estrutura de diretórios
function createDirectoryStructure() {
  const baseDir = path.join('/app', 'backend', 'fenix-expanded-content');
  
  courses.forEach(course => {
    const courseDir = path.join(baseDir, course.id);
    
    // Criar diretório do curso
    if (!fs.existsSync(courseDir)) {
      fs.mkdirSync(courseDir, { recursive: true });
    }
    
    // Criar subdiretórios
    const subdirs = ['basico', 'intermediario', 'avancado', 'projetos', 'recursos'];
    subdirs.forEach(subdir => {
      const subdirPath = path.join(courseDir, subdir);
      if (!fs.existsSync(subdirPath)) {
        fs.mkdirSync(subdirPath, { recursive: true });
      }
    });
    
    // Gerar módulos
    for (let moduleIndex = 0; moduleIndex < course.modules; moduleIndex++) {
      const moduleDir = path.join(courseDir, 'avancado', `modulo-${moduleIndex + 1}`);
      if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir, { recursive: true });
      }
      
      // Gerar aulas
      for (let lessonIndex = 0; lessonIndex < course.lessons; lessonIndex++) {
        const lessonContent = generateLessonContent(course, moduleIndex, lessonIndex);
        const lessonFile = path.join(moduleDir, `aula-${lessonIndex + 1}.md`);
        fs.writeFileSync(lessonFile, lessonContent);
      }
    }
    
    // Gerar README do curso
    const courseReadme = generateCourseReadme(course);
    const readmeFile = path.join(courseDir, 'README.md');
    fs.writeFileSync(readmeFile, courseReadme);
  });
}

// Função para gerar README do curso
function generateCourseReadme(course) {
  return `# ${course.title}

## 📋 Informações do Curso

- **Categoria:** ${course.category}
- **Duração:** ${course.duration}
- **Nível:** ${course.level}
- **Módulos:** ${course.modules}
- **Aulas por Módulo:** ${course.lessons}
- **Total de Aulas:** ${course.modules * course.lessons}

## 📖 Descrição

${course.description}

## 🎯 Projetos Incluídos

${course.projects.map((project, index) => `${index + 1}. ${project}`).join('\n')}

## 📚 Estrutura do Curso

### Módulos Disponíveis

${moduleTemplates[course.category].map((module, index) => 
  `${index + 1}. ${module}`
).join('\n')}

### Níveis de Conteúdo

- **Básico:** Conceitos fundamentais
- **Intermediário:** Aplicações práticas
- **Avançado:** Projetos complexos e otimizações

## 🚀 Como Começar

1. Acesse o módulo 1 na pasta \`avancado/modulo-1\`
2. Comece pela \`aula-1.md\`
3. Siga a sequência das aulas
4. Pratique com os exercícios
5. Implemente os projetos

## 📞 Suporte

Para dúvidas e suporte, acesse nossa comunidade ou entre em contato.

---

*Curso desenvolvido pela Fênix Academy - Transformando vidas através da programação*
`;
}

// Função principal
function main() {
  console.log('🚀 Iniciando geração dos cursos da Fênix Academy...');
  
  try {
    createDirectoryStructure();
    console.log('✅ Estrutura de diretórios criada com sucesso!');
    console.log(`📚 ${courses.length} cursos gerados`);
    console.log(`📖 ${courses.reduce((total, course) => total + (course.modules * course.lessons), 0)} aulas criadas`);
    console.log('🎯 Projetos e recursos incluídos');
    console.log('✨ Geração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a geração:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { courses, generateLessonContent, createDirectoryStructure };




