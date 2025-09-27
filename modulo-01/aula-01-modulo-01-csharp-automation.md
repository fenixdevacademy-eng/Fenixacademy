# Módulo 01 - Aula 01: Introdução ao C# e .NET

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
```csharp
// Primeira versão - conceitos básicos
public class HelloWorld
{
    public static void Main()
    {
        System.Console.WriteLine("Hello, World!");
    }
}
```

#### C# 12 (2024) - Versão Atual
```csharp
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
```

### 3. Ecossistema .NET

#### .NET Framework (Legado)
- Windows apenas
- .NET Framework 4.8 (última versão)
- Usado em aplicações legadas

#### .NET Core / .NET 5+ (Moderno)
- Multiplataforma (Windows, Linux, macOS)
- Open source
- Performance superior
- .NET 8 (versão atual LTS)

### 4. Configuração do Ambiente

#### Instalação do .NET SDK
```bash
# Windows (PowerShell)
winget install Microsoft.DotNet.SDK.8

# Linux (Ubuntu/Debian)
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install dotnet-sdk-8.0

# macOS
brew install --cask dotnet
```

#### Verificação da Instalação
```bash
dotnet --version
dotnet --info
```

### 5. Primeiro Programa

#### Criando um Projeto Console
```bash
# Criar novo projeto
dotnet new console -n MeuPrimeiroPrograma

# Navegar para o diretório
cd MeuPrimeiroPrograma

# Executar o programa
dotnet run
```

#### Estrutura do Projeto
```
MeuPrimeiroPrograma/
├── MeuPrimeiroPrograma.csproj    # Arquivo de projeto
├── Program.cs                    # Arquivo principal
└── bin/                         # Arquivos compilados
    └── Debug/
        └── net8.0/
```

#### Program.cs - Versão Básica
```csharp
using System;

namespace MeuPrimeiroPrograma
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            Console.WriteLine("Bem-vindo ao C#!");
            
            // Aguardar entrada do usuário
            Console.WriteLine("Pressione qualquer tecla para sair...");
            Console.ReadKey();
        }
    }
}
```

#### Program.cs - Versão Moderna (C# 9+)
```csharp
// Top-level statements (C# 9+)
using System;

Console.WriteLine("Hello, World!");
Console.WriteLine("Bem-vindo ao C#!");

// Aguardar entrada do usuário
Console.WriteLine("Pressione qualquer tecla para sair...");
Console.ReadKey();
```

### 6. Conceitos Fundamentais

#### Namespaces
```csharp
using System;           // Namespace do .NET
using System.Collections.Generic;

namespace MeuProjeto    // Seu namespace
{
    // Código aqui
}
```

#### Classes e Métodos
```csharp
public class Calculadora
{
    // Método público estático
    public static int Somar(int a, int b)
    {
        return a + b;
    }
    
    // Método de instância
    public int Multiplicar(int a, int b)
    {
        return a * b;
    }
}
```

#### Uso da Classe
```csharp
// Método estático
int resultado = Calculadora.Somar(5, 3);

// Método de instância
var calc = new Calculadora();
int produto = calc.Multiplicar(4, 6);
```

### 7. Exercícios Práticos

#### Exercício 1: Calculadora Simples
Crie uma calculadora que realize as operações básicas (soma, subtração, multiplicação, divisão).

```csharp
public class CalculadoraBasica
{
    public static double Somar(double a, double b) => a + b;
    public static double Subtrair(double a, double b) => a - b;
    public static double Multiplicar(double a, double b) => a * b;
    public static double Dividir(double a, double b) => b != 0 ? a / b : throw new DivideByZeroException();
}
```

#### Exercício 2: Conversor de Temperatura
Implemente um conversor entre Celsius e Fahrenheit.

```csharp
public class ConversorTemperatura
{
    public static double CelsiusParaFahrenheit(double celsius)
    {
        return (celsius * 9.0 / 5.0) + 32;
    }
    
    public static double FahrenheitParaCelsius(double fahrenheit)
    {
        return (fahrenheit - 32) * 5.0 / 9.0;
    }
}
```

### 8. Boas Práticas

#### Nomenclatura
```csharp
// PascalCase para classes, métodos, propriedades
public class MinhaClasse
{
    public string NomeCompleto { get; set; }
    
    public void ExecutarOperacao()
    {
        // código
    }
}

// camelCase para variáveis locais
string nomeCompleto = "João Silva";
int idade = 25;
```

#### Comentários
```csharp
/// <summary>
/// Calcula a área de um retângulo
/// </summary>
/// <param name="largura">Largura do retângulo</param>
/// <param name="altura">Altura do retângulo</param>
/// <returns>Área calculada</returns>
public static double CalcularArea(double largura, double altura)
{
    return largura * altura;
}
```

### 9. Projeto Prático: Sistema de Cadastro

#### Estrutura do Projeto
```csharp
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
            Console.WriteLine("\n=== Dados Cadastrados ===");
            Console.WriteLine($"Nome: {nome}");
            Console.WriteLine($"Idade: {idade}");
            Console.WriteLine($"Email: {email}");
            
            Console.WriteLine("\nPressione qualquer tecla para sair...");
            Console.ReadKey();
        }
    }
}
```

### 10. Próximos Passos

- **Aula 02**: Variáveis e Tipos de Dados
- **Aula 03**: Operadores e Expressões
- **Aula 04**: Estruturas de Controle
- **Aula 05**: Arrays e Coleções

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

## 📚 Recursos Adicionais

- [Documentação oficial do C#](https://docs.microsoft.com/pt-br/dotnet/csharp/)
- [.NET Documentation](https://docs.microsoft.com/pt-br/dotnet/)
- [C# Language Reference](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/)

---

**Duração**: 60 minutos  
**Nível**: Iniciante  
**Módulo**: 1 - Fundamentos de C#  
**Aula**: 1 - Introdução ao C# e .NET  
**Curso**: C# Automation Complete

🎉 Continue evoluindo como desenvolvedor C#!
