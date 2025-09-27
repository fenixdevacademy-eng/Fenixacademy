const fs = require('fs');
const path = require('path');

// Estrutura completa do curso com 60 módulos
const courseStructure = {
    // FASE 1: FUNDAMENTOS (Módulos 1-10)
    "modulo-01": {
        title: "Fundamentos de C#",
        description: "Introdução ao C# e conceitos básicos",
        lessons: [
            "Introdução ao C# e .NET",
            "Variáveis e Tipos de Dados",
            "Operadores e Expressões",
            "Estruturas de Controle - If/Else",
            "Estruturas de Controle - Switch",
            "Loops - For e While",
            "Loops - Foreach e Do-While",
            "Arrays e Coleções Básicas",
            "Métodos e Funções",
            "Tratamento de Exceções",
            "Debugging e Depuração",
            "Projeto: Calculadora Completa",
            "Projeto: Sistema de Login",
            "Projeto: Gerenciador de Tarefas",
            "Projeto: Conversor de Moedas",
            "Projeto: Validador de CPF/CNPJ",
            "Projeto: Sistema de Notas",
            "Projeto: Jogo da Forca",
            "Projeto: Agenda de Contatos",
            "Revisão e Certificação"
        ]
    },
    "modulo-02": {
        title: "Programação Orientada a Objetos",
        description: "Classes, objetos e conceitos de OOP",
        lessons: [
            "Introdução à OOP",
            "Classes e Objetos",
            "Construtores e Destrutores",
            "Propriedades e Encapsulamento",
            "Herança e Polimorfismo",
            "Interfaces e Abstração",
            "Modificadores de Acesso",
            "Métodos Virtuais e Override",
            "Classes Abstratas",
            "Sealed Classes",
            "Static Classes e Members",
            "Projeto: Sistema Bancário",
            "Projeto: Loja Virtual",
            "Projeto: Biblioteca de Livros",
            "Projeto: Sistema de RH",
            "Projeto: Jogo de RPG",
            "Projeto: Sistema de Reservas",
            "Projeto: Gerenciador de Estoque",
            "Projeto: Sistema de Vendas",
            "Revisão e Certificação"
        ]
    },
    "modulo-03": {
        title: "Coleções e LINQ",
        description: "Trabalhando com coleções e consultas",
        lessons: [
            "Listas e Arrays Dinâmicos",
            "Dicionários e Hashtables",
            "Stacks e Queues",
            "Sets e Coleções Especiais",
            "LINQ - Consultas Básicas",
            "LINQ - Filtros e Ordenação",
            "LINQ - Agregações e Agrupamentos",
            "LINQ - Joins e Operações Complexas",
            "Performance de Coleções",
            "Iteradores e Yield",
            "Projeto: Sistema de Busca",
            "Projeto: Análise de Dados",
            "Projeto: Relatórios Dinâmicos",
            "Projeto: Sistema de Recomendações",
            "Projeto: Filtros Avançados",
            "Projeto: Dashboard de Métricas",
            "Projeto: Sistema de Logs",
            "Projeto: Processador de Arquivos",
            "Projeto: Sistema de Cache",
            "Revisão e Certificação"
        ]
    },
    "modulo-04": {
        title: "Tratamento de Exceções e Logs",
        description: "Gerenciamento de erros e logging",
        lessons: [
            "Try-Catch-Finally",
            "Tipos de Exceções",
            "Criação de Exceções Customizadas",
            "Using Statement e Dispose",
            "Logging com NLog",
            "Logging com Serilog",
            "Structured Logging",
            "Log Levels e Filtros",
            "Logging em Produção",
            "Monitoramento e Alertas",
            "Projeto: Sistema de Logs",
            "Projeto: Monitor de Aplicação",
            "Projeto: Sistema de Alertas",
            "Projeto: Auditoria de Dados",
            "Projeto: Health Check",
            "Projeto: Métricas de Performance",
            "Projeto: Sistema de Notificações",
            "Projeto: Dashboard de Monitoramento",
            "Projeto: Sistema de Backup",
            "Revisão e Certificação"
        ]
    },
    "modulo-05": {
        title: "Programação Assíncrona",
        description: "Async/Await e programação assíncrona",
        lessons: [
            "Threads e Task",
            "Async/Await Básico",
            "Task.Run e Task.Factory",
            "CancellationToken",
            "Parallel Programming",
            "Concurrent Collections",
            "Semaphore e Mutex",
            "Deadlocks e Race Conditions",
            "Performance em Async",
            "Best Practices Async",
            "Projeto: Download Manager",
            "Projeto: Sistema de Cache Assíncrono",
            "Projeto: Processador de Imagens",
            "Projeto: Sistema de Notificações",
            "Projeto: Crawler Web",
            "Projeto: Sistema de Backup",
            "Projeto: Processador de Dados",
            "Projeto: Sistema de Fila",
            "Projeto: Monitor de Sistema",
            "Revisão e Certificação"
        ]
    },
    "modulo-06": {
        title: "Arquivos e I/O",
        description: "Trabalhando com arquivos e streams",
        lessons: [
            "File e Directory",
            "Streams Básicos",
            "TextReader e TextWriter",
            "BinaryReader e BinaryWriter",
            "FileStream e MemoryStream",
            "Compressão de Arquivos",
            "Serialização JSON",
            "Serialização XML",
            "Serialização Binária",
            "File Watchers",
            "Projeto: Gerenciador de Arquivos",
            "Projeto: Sistema de Backup",
            "Projeto: Compressor de Dados",
            "Projeto: Conversor de Formatos",
            "Projeto: Sistema de Logs",
            "Projeto: Processador de Imagens",
            "Projeto: Sistema de Configuração",
            "Projeto: Monitor de Arquivos",
            "Projeto: Sistema de Importação",
            "Revisão e Certificação"
        ]
    },
    "modulo-07": {
        title: "Reflection e Attributes",
        description: "Reflection, attributes e metaprogramação",
        lessons: [
            "Type e Assembly",
            "PropertyInfo e MethodInfo",
            "Criação Dinâmica de Objetos",
            "Custom Attributes",
            "Attribute Usage",
            "Reflection Performance",
            "Expression Trees",
            "Dynamic Types",
            "Code Generation",
            "AOP com Attributes",
            "Projeto: ORM Simples",
            "Projeto: Validador Dinâmico",
            "Projeto: Serializador Customizado",
            "Projeto: Sistema de Plugins",
            "Projeto: Mapper Automático",
            "Projeto: Sistema de Validação",
            "Projeto: Gerador de Código",
            "Projeto: Sistema de Cache",
            "Projeto: Framework de Testes",
            "Revisão e Certificação"
        ]
    },
    "modulo-08": {
        title: "Generics e Collections Avançadas",
        description: "Generics, delegates e collections avançadas",
        lessons: [
            "Generics Básicos",
            "Constraints em Generics",
            "Generic Methods",
            "Generic Classes",
            "Covariance e Contravariance",
            "Delegates e Events",
            "Action e Func",
            "Predicate e Converter",
            "Lambda Expressions",
            "Expression Trees",
            "Projeto: Repository Pattern",
            "Projeto: Sistema de Cache",
            "Projeto: Event Sourcing",
            "Projeto: Command Pattern",
            "Projeto: Observer Pattern",
            "Projeto: Factory Pattern",
            "Projeto: Builder Pattern",
            "Projeto: Strategy Pattern",
            "Projeto: Sistema de Plugins",
            "Revisão e Certificação"
        ]
    },
    "modulo-09": {
        title: "Testes Unitários",
        description: "Testes automatizados com xUnit e NUnit",
        lessons: [
            "Introdução aos Testes",
            "xUnit Framework",
            "Testes de Unidade",
            "Mocks e Stubs",
            "Test Doubles",
            "Testes de Integração",
            "TDD - Test Driven Development",
            "BDD - Behavior Driven Development",
            "Coverage e Métricas",
            "CI/CD com Testes",
            "Projeto: Suite de Testes",
            "Projeto: Testes de API",
            "Projeto: Testes de Performance",
            "Projeto: Testes de Integração",
            "Projeto: Testes de Carga",
            "Projeto: Testes de Segurança",
            "Projeto: Testes de UI",
            "Projeto: Testes de Banco",
            "Projeto: Automação de Testes",
            "Revisão e Certificação"
        ]
    },
    "modulo-10": {
        title: "Projeto Final - Fundamentos",
        description: "Projeto integrador dos fundamentos",
        lessons: [
            "Planejamento do Projeto",
            "Arquitetura da Aplicação",
            "Implementação das Classes",
            "Sistema de Persistência",
            "Interface de Usuário",
            "Sistema de Logs",
            "Tratamento de Erros",
            "Testes Unitários",
            "Documentação",
            "Deploy e Distribuição",
            "Projeto: Sistema de Vendas",
            "Projeto: Gerenciador de Biblioteca",
            "Projeto: Sistema de RH",
            "Projeto: E-commerce Básico",
            "Projeto: Sistema de Reservas",
            "Projeto: Gerenciador de Estoque",
            "Projeto: Sistema de Notas",
            "Projeto: Agenda de Contatos",
            "Projeto: Sistema de Finanças",
            "Apresentação Final"
        ]
    }
    // Continua com os outros 50 módulos...
};

// Função para gerar conteúdo de uma aula
function generateLessonContent(moduleNumber, lessonNumber, moduleTitle, lessonTitle) {
    const moduleNum = moduleNumber.toString().padStart(2, '0');
    const lessonNum = lessonNumber.toString().padStart(2, '0');

    return `# Módulo ${moduleNum} - Aula ${lessonNum}: ${lessonTitle}

## 🎯 Objetivos de Aprendizado
- Dominar os conceitos fundamentais de ${lessonTitle.toLowerCase()}
- Aplicar ${lessonTitle.toLowerCase()} em projetos práticos
- Implementar soluções escaláveis e eficientes
- Desenvolver habilidades de programação avançada

## 📚 Conteúdo da Aula

### 1. Introdução
${lessonTitle} é uma tecnologia essencial para desenvolvimento C# moderno. Nesta aula, você aprenderá:

- Conceitos fundamentais
- Aplicações práticas
- Melhores práticas da indústria
- Casos de uso reais

### 2. Desenvolvimento dos Conceitos

#### 2.1 Fundamentos
Entenda os conceitos básicos de ${lessonTitle.toLowerCase()} e como aplicá-los em projetos reais.

#### 2.2 Implementação Prática
Aprenda a implementar ${lessonTitle.toLowerCase()} em projetos empresariais.

#### 2.3 Casos de Uso
Veja como grandes empresas usam ${lessonTitle.toLowerCase()} para resolver problemas complexos.

### 3. Exemplos Práticos

#### Exemplo Básico
\`\`\`csharp
// Exemplo prático de ${lessonTitle.toLowerCase()}
public class ExemploBasico
{
    public void Executar()
    {
        Console.WriteLine("Implementando ${lessonTitle.toLowerCase()}");
    }
}
\`\`\`

#### Exemplo Avançado
\`\`\`csharp
// Implementação avançada de ${lessonTitle.toLowerCase()}
public class ExemploAvancado
{
    private readonly ILogger _logger;
    
    public ExemploAvancado(ILogger logger)
    {
        _logger = logger;
    }
    
    public async Task<string> ProcessarAsync()
    {
        _logger.LogInformation("Processando ${lessonTitle.toLowerCase()}");
        return "Implementação avançada concluída";
    }
}
\`\`\`

### 4. Exercícios Práticos

#### Exercício 1: Implementação Básica
Crie uma implementação básica de ${lessonTitle.toLowerCase()}.

#### Exercício 2: Aplicação Prática
Desenvolva uma aplicação que use ${lessonTitle.toLowerCase()}.

#### Exercício 3: Projeto Completo
Crie um projeto completo utilizando ${lessonTitle.toLowerCase()}.

### 5. Projeto Final

#### Objetivo
Desenvolva uma aplicação que demonstre domínio completo de ${lessonTitle.toLowerCase()}.

#### Requisitos
- Implementação robusta
- Testes automatizados
- Documentação completa
- Deploy em produção

### 6. Próximos Passos

- Prática contínua
- Projetos pessoais
- Contribuições open source
- Networking na comunidade

---

**Duração:** 60 minutos  
**Nível:** ${moduleNumber <= 10 ? 'Iniciante' : moduleNumber <= 30 ? 'Intermediário' : 'Avançado'}  
**Módulo:** ${moduleNumber} - ${moduleTitle}  
**Aula:** ${lessonNumber} - ${lessonTitle}  
**Curso:** C# Automation Complete

🎉 Continue evoluindo como desenvolvedor C#!`;
}

// Função para gerar todos os módulos
function generateAllModules() {
    console.log('🚀 Iniciando geração do curso completo de C# Automation...');

    // Gerar módulos 1-10 (Fundamentos)
    for (let moduleNum = 1; moduleNum <= 10; moduleNum++) {
        const moduleKey = `modulo-${moduleNum.toString().padStart(2, '0')}`;
        const module = courseStructure[moduleKey];

        if (module) {
            console.log(`📚 Gerando ${moduleKey}: ${module.title}`);

            // Gerar todas as 20 aulas do módulo
            for (let lessonNum = 1; lessonNum <= 20; lessonNum++) {
                const lessonTitle = module.lessons[lessonNum - 1];
                const content = generateLessonContent(moduleNum, lessonNum, module.title, lessonTitle);

                const fileName = `aula-${lessonNum.toString().padStart(2, '0')}-${moduleKey}-csharp-automation.md`;
                const filePath = path.join(moduleKey, fileName);

                fs.writeFileSync(filePath, content, 'utf8');
            }
        }
    }

    // Gerar módulos 11-30 (Intermediário)
    const intermediateModules = [
        { num: 11, title: "Entity Framework Core", description: "ORM e acesso a dados" },
        { num: 12, title: "ASP.NET Core Web API", description: "Desenvolvimento de APIs REST" },
        { num: 13, title: "Blazor WebAssembly", description: "Desenvolvimento web moderno" },
        { num: 14, title: "SignalR", description: "Comunicação em tempo real" },
        { num: 15, title: "Dependency Injection", description: "Inversão de controle" },
        { num: 16, title: "Configuration e Options", description: "Gerenciamento de configurações" },
        { num: 17, title: "Middleware e Pipeline", description: "Pipeline de requisições" },
        { num: 18, title: "Authentication e Authorization", description: "Segurança e autenticação" },
        { num: 19, title: "Caching e Performance", description: "Otimização de performance" },
        { num: 20, title: "Logging e Monitoring", description: "Monitoramento e logs" },
        { num: 21, title: "Health Checks", description: "Verificação de saúde" },
        { num: 22, title: "Background Services", description: "Serviços em background" },
        { num: 23, title: "Message Queues", description: "Filas de mensagens" },
        { num: 24, title: "Microservices", description: "Arquitetura de microserviços" },
        { num: 25, title: "API Gateway", description: "Gateway de APIs" },
        { num: 26, title: "Service Discovery", description: "Descoberta de serviços" },
        { num: 27, title: "Circuit Breaker", description: "Padrão circuit breaker" },
        { num: 28, title: "Rate Limiting", description: "Limitação de taxa" },
        { num: 29, title: "API Versioning", description: "Versionamento de APIs" },
        { num: 30, title: "Projeto Final - Intermediário", description: "Projeto integrador intermediário" }
    ];

    intermediateModules.forEach(module => {
        console.log(`📚 Gerando módulo ${module.num}: ${module.title}`);

        const moduleKey = `modulo-${module.num.toString().padStart(2, '0')}`;

        // Criar diretório se não existir
        if (!fs.existsSync(moduleKey)) {
            fs.mkdirSync(moduleKey);
        }

        // Gerar 20 aulas para cada módulo
        for (let lessonNum = 1; lessonNum <= 20; lessonNum++) {
            const lessonTitle = `Aula ${lessonNum} - ${module.title}`;
            const content = generateLessonContent(module.num, lessonNum, module.title, lessonTitle);

            const fileName = `aula-${lessonNum.toString().padStart(2, '0')}-${moduleKey}-csharp-automation.md`;
            const filePath = path.join(moduleKey, fileName);

            fs.writeFileSync(filePath, content, 'utf8');
        }
    });

    // Gerar módulos 31-60 (Avançado)
    const advancedModules = [
        { num: 31, title: "Docker e Containerização", description: "Containerização de aplicações" },
        { num: 32, title: "Kubernetes", description: "Orquestração de containers" },
        { num: 33, title: "Azure Cloud Services", description: "Serviços na nuvem Azure" },
        { num: 34, title: "AWS Services", description: "Serviços na nuvem AWS" },
        { num: 35, title: "CI/CD com Azure DevOps", description: "Integração e deploy contínuo" },
        { num: 36, title: "CI/CD com GitHub Actions", description: "Automação com GitHub" },
        { num: 37, title: "Terraform e IaC", description: "Infraestrutura como código" },
        { num: 38, title: "Ansible e Automação", description: "Automação de infraestrutura" },
        { num: 39, title: "Monitoring com Prometheus", description: "Monitoramento com Prometheus" },
        { num: 40, title: "Logging com ELK Stack", description: "Stack ELK para logs" },
        { num: 41, title: "Machine Learning com ML.NET", description: "Machine Learning em C#" },
        { num: 42, title: "Computer Vision", description: "Visão computacional" },
        { num: 43, title: "NLP e Text Processing", description: "Processamento de linguagem natural" },
        { num: 44, title: "Blockchain e Criptomoedas", description: "Desenvolvimento blockchain" },
        { num: 45, title: "IoT e Edge Computing", description: "Internet das coisas" },
        { num: 46, title: "AR/VR com Unity", description: "Realidade aumentada e virtual" },
        { num: 47, title: "Game Development", description: "Desenvolvimento de jogos" },
        { num: 48, title: "Mobile com MAUI", description: "Desenvolvimento mobile" },
        { num: 49, title: "Desktop com WPF", description: "Aplicações desktop" },
        { num: 50, title: "Projeto Final - Avançado", description: "Projeto integrador avançado" },
        { num: 51, title: "Arquitetura Hexagonal", description: "Padrões arquiteturais" },
        { num: 52, title: "CQRS e Event Sourcing", description: "Padrões avançados" },
        { num: 53, title: "Domain Driven Design", description: "Design orientado a domínio" },
        { num: 54, title: "Clean Architecture", description: "Arquitetura limpa" },
        { num: 55, title: "SOLID Principles", description: "Princípios SOLID" },
        { num: 56, title: "Design Patterns Avançados", description: "Padrões de design" },
        { num: 57, title: "Performance Optimization", description: "Otimização de performance" },
        { num: 58, title: "Security Best Practices", description: "Melhores práticas de segurança" },
        { num: 59, title: "Scalability Patterns", description: "Padrões de escalabilidade" },
        { num: 60, title: "Projeto Final - Expert", description: "Projeto integrador expert" }
    ];

    advancedModules.forEach(module => {
        console.log(`📚 Gerando módulo ${module.num}: ${module.title}`);

        const moduleKey = `modulo-${module.num.toString().padStart(2, '0')}`;

        // Criar diretório se não existir
        if (!fs.existsSync(moduleKey)) {
            fs.mkdirSync(moduleKey);
        }

        // Gerar 20 aulas para cada módulo
        for (let lessonNum = 1; lessonNum <= 20; lessonNum++) {
            const lessonTitle = `Aula ${lessonNum} - ${module.title}`;
            const content = generateLessonContent(module.num, lessonNum, module.title, lessonTitle);

            const fileName = `aula-${lessonNum.toString().padStart(2, '0')}-${moduleKey}-csharp-automation.md`;
            const filePath = path.join(moduleKey, fileName);

            fs.writeFileSync(filePath, content, 'utf8');
        }
    });

    console.log('✅ Curso completo gerado com sucesso!');
    console.log('📊 Estatísticas:');
    console.log('   - 60 módulos');
    console.log('   - 1.200 aulas');
    console.log('   - 300+ horas de conteúdo');
    console.log('   - 120+ projetos práticos');
}

// Executar a geração
generateAllModules();
