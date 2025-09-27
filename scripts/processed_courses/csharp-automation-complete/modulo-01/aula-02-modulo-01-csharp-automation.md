# Módulo 01 - Aula 02: Variáveis e Tipos de Dados

## 🎯 Objetivos de Aprendizado
- Compreender os tipos de dados primitivos em C#
- Aprender a declarar e inicializar variáveis
- Entender a diferença entre tipos de valor e referência
- Dominar conversões de tipos (casting)
- Aplicar boas práticas na declaração de variáveis

## 📚 Conteúdo da Aula

### 1. Tipos de Dados Primitivos

#### Tipos Numéricos Inteiros
```csharp
// Tipos inteiros com diferentes tamanhos
byte idade = 25;                    // 0 a 255 (8 bits)
sbyte temperatura = -10;            // -128 a 127 (8 bits)
short populacao = 32000;            // -32,768 a 32,767 (16 bits)
ushort codigo = 65000;              // 0 a 65,535 (16 bits)
int numero = 1000000;               // -2,147,483,648 a 2,147,483,647 (32 bits)
uint contador = 4000000000;         // 0 a 4,294,967,295 (32 bits)
long id = 9223372036854775807;      // -9,223,372,036,854,775,808 a 9,223,372,036,854,775,807 (64 bits)
ulong grandeNumero = 18446744073709551615; // 0 a 18,446,744,073,709,551,615 (64 bits)
```

#### Tipos Numéricos de Ponto Flutuante
```csharp
float preco = 19.99f;               // Precisão simples (32 bits)
double salario = 5000.50;           // Precisão dupla (64 bits)
decimal valorExato = 123.456m;      // Precisão decimal (128 bits) - ideal para dinheiro
```

#### Tipos de Caractere e Booleano
```csharp
char letra = 'A';                   // Caractere único (16 bits)
bool ativo = true;                  // Verdadeiro ou falso (8 bits)
```

### 2. Declaração e Inicialização de Variáveis

#### Declaração Explícita
```csharp
// Declaração e inicialização separadas
int idade;
idade = 25;

// Declaração e inicialização juntas
string nome = "Maria";
bool casado = false;
```

#### Inferência de Tipo (var)
```csharp
// O compilador infere o tipo automaticamente
var nome = "Pedro";        // string
var idade = 30;            // int
var salario = 5000.50;     // double
var ativo = true;          // bool

// var é útil em casos complexos
var lista = new List<string>();
var dicionario = new Dictionary<int, string>();
```

### 3. Conversões de Tipos (Casting)

#### Conversão Implícita (Automática)
```csharp
// Conversões seguras que não perdem dados
int inteiro = 100;
long longo = inteiro;        // int para long
float flutuante = inteiro;   // int para float
double duplo = flutuante;    // float para double
```

#### Conversão Explícita (Casting)
```csharp
// Conversões que podem perder dados
double valor = 9.99;
int inteiro = (int)valor;    // Resultado: 9 (perdeu a parte decimal)

long numeroLongo = 1000000000;
int numeroInteiro = (int)numeroLongo; // Pode causar overflow
```

### 4. Projeto Prático: Sistema de Cadastro de Funcionários

```csharp
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
            Console.WriteLine("\n=== Dados do Funcionário ===");
            Console.WriteLine($"Nome: {nome}");
            Console.WriteLine($"Idade: {idade} anos");
            Console.WriteLine($"Salário Bruto: R$ {salario:C}");
            Console.WriteLine($"Desconto INSS: R$ {descontoINSS:C}");
            Console.WriteLine($"Salário Líquido: R$ {salarioLiquido:C}");
            Console.WriteLine($"Status: {(ativo ? "Ativo" : "Inativo")}");
            
            Console.WriteLine("\nPressione qualquer tecla para sair...");
            Console.ReadKey();
        }
    }
}
```

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

🎉 Continue evoluindo como desenvolvedor C#!