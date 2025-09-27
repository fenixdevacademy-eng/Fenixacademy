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

### 3. Configuração do Ambiente

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

### 4. Primeiro Programa

#### Criando um Projeto Console
```bash
# Criar novo projeto
dotnet new console -n MeuPrimeiroPrograma

# Navegar para o diretório
cd MeuPrimeiroPrograma

# Executar o programa
dotnet run
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

### 5. Projeto Prático: Sistema de Cadastro

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

🎉 Continue evoluindo como desenvolvedor C#!