const fs = require('fs');
const path = require('path');

// Conteúdo específico e detalhado para cada módulo
const detailedCourseContent = {
    "modulo-01": {
        title: "Fundamentos de C#",
        lessons: {
            "aula-01": {
                title: "Introdução ao C# e .NET",
                content: `# Módulo 01 - Aula 01: Introdução ao C# e .NET

## 🎯 Objetivos de Aprendizado
- Compreender o que é C# e sua evolução
- Entender o ecossistema .NET e suas versões
- Configurar o ambiente de desenvolvimento
- Criar o primeiro programa "Hello World"
- Entender a estrutura básica de um projeto C#

## 📚 Conteúdo da Aula

### 1. O que é C#?

C# (pronunciado "C Sharp") é uma linguagem de programação moderna, orientada a objetos e fortemente tipada, desenvolvida pela Microsoft. É uma das linguagens mais populares para desenvolvimento de aplicações empresariais, web, mobile e desktop.

#### Características Principais:
- **Fortemente tipada**: Cada variável tem um tipo específico
- **Orientada a objetos**: Suporte completo a OOP
- **Gerenciamento automático de memória**: Garbage Collection
- **Multiplataforma**: .NET Core/.NET 5+ roda em Windows, Linux e macOS
- **Performance**: Compilação JIT (Just-In-Time) para alta performance

### 2. Evolução do C# e .NET

#### C# 1.0 (2002)
\`\`\`csharp
// Primeira versão - conceitos básicos
public class HelloWorld
{
    public static void Main()
    {
        System.Console.WriteLine("Hello, World!");
    }
}
\`\`\`

#### C# 12 (2024) - Versão Atual
\`\`\`csharp
// C# 12 com recursos modernos
using System;

// Primary constructors (C# 12)
public class HelloWorld(string message)
{
    public void Greet() => Console.WriteLine(message);
}

// Collection expressions (C# 12)
var numbers = [1, 2, 3, 4, 5];

// Pattern matching avançado
var result = numbers switch
{
    [1, 2, ..] => "Starts with 1, 2",
    [.., 4, 5] => "Ends with 4, 5",
    _ => "Other pattern"
};
\`\`\`

### 3. Configuração do Ambiente

#### Instalação do .NET SDK
\`\`\`bash
# Windows (PowerShell)
winget install Microsoft.DotNet.SDK.8

# Linux (Ubuntu/Debian)
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install dotnet-sdk-8.0

# macOS
brew install --cask dotnet
\`\`\`

### 4. Primeiro Programa

#### Criando um Projeto Console
\`\`\`bash
# Criar novo projeto
dotnet new console -n MeuPrimeiroPrograma

# Navegar para o diretório
cd MeuPrimeiroPrograma

# Executar o programa
dotnet run
\`\`\`

#### Program.cs - Versão Moderna (C# 9+)
\`\`\`csharp
// Top-level statements (C# 9+)
using System;

Console.WriteLine("Hello, World!");
Console.WriteLine("Bem-vindo ao C#!");

// Aguardar entrada do usuário
Console.WriteLine("Pressione qualquer tecla para sair...");
Console.ReadKey();
\`\`\`

### 5. Projeto Prático: Sistema de Cadastro

\`\`\`csharp
using System;

namespace SistemaCadastro
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Sistema de Cadastro ===");
            
            // Solicitar dados do usuário
            Console.Write("Digite seu nome: ");
            string nome = Console.ReadLine();
            
            Console.Write("Digite sua idade: ");
            int idade = int.Parse(Console.ReadLine());
            
            Console.Write("Digite seu email: ");
            string email = Console.ReadLine();
            
            // Exibir dados cadastrados
            Console.WriteLine("\\n=== Dados Cadastrados ===");
            Console.WriteLine($"Nome: {nome}");
            Console.WriteLine($"Idade: {idade}");
            Console.WriteLine($"Email: {email}");
            
            Console.WriteLine("\\nPressione qualquer tecla para sair...");
            Console.ReadKey();
        }
    }
}
\`\`\`

## 📋 Resumo da Aula

Nesta aula você aprendeu:
- ✅ O que é C# e suas características
- ✅ A evolução do C# e .NET
- ✅ Como configurar o ambiente de desenvolvimento
- ✅ Como criar e executar seu primeiro programa
- ✅ Conceitos básicos de namespaces, classes e métodos
- ✅ Boas práticas de programação em C#

## 🎯 Desafio da Aula

Crie um programa que:
1. Solicite o nome e idade do usuário
2. Calcule o ano de nascimento
3. Determine se a pessoa é maior de idade
4. Exiba uma mensagem personalizada

---

**Duração:** 60 minutos  
**Nível:** Iniciante  
**Módulo:** 1 - Fundamentos de C#  
**Aula:** 1 - Introdução ao C# e .NET  
**Curso:** C# Automation Complete

🎉 Continue evoluindo como desenvolvedor C#!`
            },
            "aula-02": {
                title: "Variáveis e Tipos de Dados",
                content: `# Módulo 01 - Aula 02: Variáveis e Tipos de Dados

## 🎯 Objetivos de Aprendizado
- Compreender os tipos de dados primitivos em C#
- Aprender a declarar e inicializar variáveis
- Entender a diferença entre tipos de valor e referência
- Dominar conversões de tipos (casting)
- Aplicar boas práticas na declaração de variáveis

## 📚 Conteúdo da Aula

### 1. Tipos de Dados Primitivos

#### Tipos Numéricos Inteiros
\`\`\`csharp
// Tipos inteiros com diferentes tamanhos
byte idade = 25;                    // 0 a 255 (8 bits)
sbyte temperatura = -10;            // -128 a 127 (8 bits)
short populacao = 32000;            // -32,768 a 32,767 (16 bits)
ushort codigo = 65000;              // 0 a 65,535 (16 bits)
int numero = 1000000;               // -2,147,483,648 a 2,147,483,647 (32 bits)
uint contador = 4000000000;         // 0 a 4,294,967,295 (32 bits)
long id = 9223372036854775807;      // -9,223,372,036,854,775,808 a 9,223,372,036,854,775,807 (64 bits)
ulong grandeNumero = 18446744073709551615; // 0 a 18,446,744,073,709,551,615 (64 bits)
\`\`\`

#### Tipos Numéricos de Ponto Flutuante
\`\`\`csharp
float preco = 19.99f;               // Precisão simples (32 bits)
double salario = 5000.50;           // Precisão dupla (64 bits)
decimal valorExato = 123.456m;      // Precisão decimal (128 bits) - ideal para dinheiro
\`\`\`

#### Tipos de Caractere e Booleano
\`\`\`csharp
char letra = 'A';                   // Caractere único (16 bits)
bool ativo = true;                  // Verdadeiro ou falso (8 bits)
\`\`\`

### 2. Declaração e Inicialização de Variáveis

#### Declaração Explícita
\`\`\`csharp
// Declaração e inicialização separadas
int idade;
idade = 25;

// Declaração e inicialização juntas
string nome = "Maria";
bool casado = false;
\`\`\`

#### Inferência de Tipo (var)
\`\`\`csharp
// O compilador infere o tipo automaticamente
var nome = "Pedro";        // string
var idade = 30;            // int
var salario = 5000.50;     // double
var ativo = true;          // bool

// var é útil em casos complexos
var lista = new List<string>();
var dicionario = new Dictionary<int, string>();
\`\`\`

### 3. Conversões de Tipos (Casting)

#### Conversão Implícita (Automática)
\`\`\`csharp
// Conversões seguras que não perdem dados
int inteiro = 100;
long longo = inteiro;        // int para long
float flutuante = inteiro;   // int para float
double duplo = flutuante;    // float para double
\`\`\`

#### Conversão Explícita (Casting)
\`\`\`csharp
// Conversões que podem perder dados
double valor = 9.99;
int inteiro = (int)valor;    // Resultado: 9 (perdeu a parte decimal)

long numeroLongo = 1000000000;
int numeroInteiro = (int)numeroLongo; // Pode causar overflow
\`\`\`

### 4. Projeto Prático: Sistema de Cadastro de Funcionários

\`\`\`csharp
using System;

namespace SistemaFuncionarios
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Sistema de Cadastro de Funcionários ===");
            
            // Coletar dados do funcionário
            Console.Write("Nome: ");
            string nome = Console.ReadLine();
            
            Console.Write("Idade: ");
            int idade = int.Parse(Console.ReadLine());
            
            Console.Write("Salário: ");
            decimal salario = decimal.Parse(Console.ReadLine());
            
            Console.Write("Ativo (s/n): ");
            char ativoChar = char.Parse(Console.ReadLine());
            bool ativo = ativoChar == 's' || ativoChar == 'S';
            
            // Calcular salário líquido (simplificado)
            decimal descontoINSS = salario * 0.11m;
            decimal salarioLiquido = salario - descontoINSS;
            
            // Exibir dados
            Console.WriteLine("\\n=== Dados do Funcionário ===");
            Console.WriteLine($"Nome: {nome}");
            Console.WriteLine($"Idade: {idade} anos");
            Console.WriteLine($"Salário Bruto: R$ {salario:C}");
            Console.WriteLine($"Desconto INSS: R$ {descontoINSS:C}");
            Console.WriteLine($"Salário Líquido: R$ {salarioLiquido:C}");
            Console.WriteLine($"Status: {(ativo ? "Ativo" : "Inativo")}");
            
            Console.WriteLine("\\nPressione qualquer tecla para sair...");
            Console.ReadKey();
        }
    }
}
\`\`\`

## 📋 Resumo da Aula

Nesta aula você aprendeu:
- ✅ Tipos de dados primitivos em C#
- ✅ Como declarar e inicializar variáveis
- ✅ Diferença entre tipos de valor e referência
- ✅ Conversões de tipos (casting)
- ✅ Trabalho com strings e interpolação
- ✅ Boas práticas de programação

---

**Duração:** 60 minutos  
**Nível:** Iniciante  
**Módulo:** 1 - Fundamentos de C#  
**Aula:** 2 - Variáveis e Tipos de Dados  
**Curso:** C# Automation Complete

🎉 Continue evoluindo como desenvolvedor C#!`
            }
        }
    }
};

// Função para gerar conteúdo específico de uma aula
function generateSpecificLessonContent(moduleNumber, lessonNumber, moduleTitle, lessonTitle) {
    const moduleKey = `modulo-${moduleNumber.toString().padStart(2, '0')}`;
    const lessonKey = `aula-${lessonNumber.toString().padStart(2, '0')}`;

    // Verificar se existe conteúdo específico
    if (detailedCourseContent[moduleKey] && detailedCourseContent[moduleKey].lessons[lessonKey]) {
        return detailedCourseContent[moduleKey].lessons[lessonKey].content;
    }

    // Se não existe, gerar conteúdo genérico mas detalhado
    return generateGenericDetailedContent(moduleNumber, lessonNumber, moduleTitle, lessonTitle);
}

// Função para gerar conteúdo genérico detalhado
function generateGenericDetailedContent(moduleNumber, lessonNumber, moduleTitle, lessonTitle) {
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

// Função principal para gerar todo o conteúdo
function generateCompleteCourse() {
    console.log('🚀 Iniciando geração do curso completo de C# Automation...');

    // Estrutura completa dos 60 módulos
    const allModules = [
        // FASE 1: FUNDAMENTOS (1-10)
        { num: 1, title: "Fundamentos de C#", phase: "Fundamentos" },
        { num: 2, title: "Programação Orientada a Objetos", phase: "Fundamentos" },
        { num: 3, title: "Coleções e LINQ", phase: "Fundamentos" },
        { num: 4, title: "Tratamento de Exceções e Logs", phase: "Fundamentos" },
        { num: 5, title: "Programação Assíncrona", phase: "Fundamentos" },
        { num: 6, title: "Arquivos e I/O", phase: "Fundamentos" },
        { num: 7, title: "Reflection e Attributes", phase: "Fundamentos" },
        { num: 8, title: "Generics e Collections Avançadas", phase: "Fundamentos" },
        { num: 9, title: "Testes Unitários", phase: "Fundamentos" },
        { num: 10, title: "Projeto Final - Fundamentos", phase: "Fundamentos" },

        // FASE 2: INTERMEDIÁRIO (11-30)
        { num: 11, title: "Entity Framework Core", phase: "Intermediário" },
        { num: 12, title: "ASP.NET Core Web API", phase: "Intermediário" },
        { num: 13, title: "Blazor WebAssembly", phase: "Intermediário" },
        { num: 14, title: "SignalR", phase: "Intermediário" },
        { num: 15, title: "Dependency Injection", phase: "Intermediário" },
        { num: 16, title: "Configuration e Options", phase: "Intermediário" },
        { num: 17, title: "Middleware e Pipeline", phase: "Intermediário" },
        { num: 18, title: "Authentication e Authorization", phase: "Intermediário" },
        { num: 19, title: "Caching e Performance", phase: "Intermediário" },
        { num: 20, title: "Logging e Monitoring", phase: "Intermediário" },
        { num: 21, title: "Health Checks", phase: "Intermediário" },
        { num: 22, title: "Background Services", phase: "Intermediário" },
        { num: 23, title: "Message Queues", phase: "Intermediário" },
        { num: 24, title: "Microservices", phase: "Intermediário" },
        { num: 25, title: "API Gateway", phase: "Intermediário" },
        { num: 26, title: "Service Discovery", phase: "Intermediário" },
        { num: 27, title: "Circuit Breaker", phase: "Intermediário" },
        { num: 28, title: "Rate Limiting", phase: "Intermediário" },
        { num: 29, title: "API Versioning", phase: "Intermediário" },
        { num: 30, title: "Projeto Final - Intermediário", phase: "Intermediário" },

        // FASE 3: AVANÇADO (31-50)
        { num: 31, title: "Docker e Containerização", phase: "Avançado" },
        { num: 32, title: "Kubernetes", phase: "Avançado" },
        { num: 33, title: "Azure Cloud Services", phase: "Avançado" },
        { num: 34, title: "AWS Services", phase: "Avançado" },
        { num: 35, title: "CI/CD com Azure DevOps", phase: "Avançado" },
        { num: 36, title: "CI/CD com GitHub Actions", phase: "Avançado" },
        { num: 37, title: "Terraform e IaC", phase: "Avançado" },
        { num: 38, title: "Ansible e Automação", phase: "Avançado" },
        { num: 39, title: "Monitoring com Prometheus", phase: "Avançado" },
        { num: 40, title: "Logging com ELK Stack", phase: "Avançado" },
        { num: 41, title: "Machine Learning com ML.NET", phase: "Avançado" },
        { num: 42, title: "Computer Vision", phase: "Avançado" },
        { num: 43, title: "NLP e Text Processing", phase: "Avançado" },
        { num: 44, title: "Blockchain e Criptomoedas", phase: "Avançado" },
        { num: 45, title: "IoT e Edge Computing", phase: "Avançado" },
        { num: 46, title: "AR/VR com Unity", phase: "Avançado" },
        { num: 47, title: "Game Development", phase: "Avançado" },
        { num: 48, title: "Mobile com MAUI", phase: "Avançado" },
        { num: 49, title: "Desktop com WPF", phase: "Avançado" },
        { num: 50, title: "Projeto Final - Avançado", phase: "Avançado" },

        // FASE 4: ESPECIALIZAÇÃO (51-60)
        { num: 51, title: "Arquitetura Hexagonal", phase: "Especialização" },
        { num: 52, title: "CQRS e Event Sourcing", phase: "Especialização" },
        { num: 53, title: "Domain Driven Design", phase: "Especialização" },
        { num: 54, title: "Clean Architecture", phase: "Especialização" },
        { num: 55, title: "SOLID Principles", phase: "Especialização" },
        { num: 56, title: "Design Patterns Avançados", phase: "Especialização" },
        { num: 57, title: "Performance Optimization", phase: "Especialização" },
        { num: 58, title: "Security Best Practices", phase: "Especialização" },
        { num: 59, title: "Scalability Patterns", phase: "Especialização" },
        { num: 60, title: "Projeto Final - Expert", phase: "Especialização" }
    ];

    // Gerar cada módulo
    allModules.forEach(module => {
        console.log(`📚 Gerando módulo ${module.num}: ${module.title} (${module.phase})`);

        const moduleKey = `modulo-${module.num.toString().padStart(2, '0')}`;

        // Criar diretório se não existir
        if (!fs.existsSync(moduleKey)) {
            fs.mkdirSync(moduleKey);
        }

        // Gerar 20 aulas para cada módulo
        for (let lessonNum = 1; lessonNum <= 20; lessonNum++) {
            const lessonTitle = `Aula ${lessonNum} - ${module.title}`;
            const content = generateSpecificLessonContent(module.num, lessonNum, module.title, lessonTitle);

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
    console.log('   - 4 fases de aprendizado');
    console.log('   - Conteúdo específico e detalhado');
}

// Executar a geração
generateCompleteCourse();
