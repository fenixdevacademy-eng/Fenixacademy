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

#### Tipo String
```csharp
string nome = "João Silva";         // Sequência de caracteres
string email = "joao@email.com";
string endereco = @"C:\Users\João\Documents"; // String literal (verbatim)
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

#### Constantes
```csharp
// Constantes são valores que não podem ser alterados
const double PI = 3.14159;
const string EMPRESA = "Minha Empresa";
const int MAX_TENTATIVAS = 3;

// Constantes devem ser inicializadas na declaração
// const int valor; // ERRO - não pode ser declarada sem inicialização
```

### 3. Tipos de Valor vs Tipos de Referência

#### Tipos de Valor (Value Types)
```csharp
// Armazenados na stack
int numero = 10;
int copia = numero;  // Cópia do valor
copia = 20;          // numero continua sendo 10

// Estruturas são tipos de valor
DateTime hoje = DateTime.Now;
DateTime amanha = hoje.AddDays(1);
```

#### Tipos de Referência (Reference Types)
```csharp
// Armazenados na heap
string nome1 = "João";
string nome2 = nome1;  // Ambas apontam para o mesmo objeto
nome2 = "Maria";       // nome1 continua sendo "João"

// Classes são tipos de referência
var lista1 = new List<int> { 1, 2, 3 };
var lista2 = lista1;   // Ambas apontam para a mesma lista
lista2.Add(4);         // Ambas as listas agora têm o elemento 4
```

### 4. Conversões de Tipos (Casting)

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

#### Métodos de Conversão
```csharp
// Usando métodos de conversão
string texto = "123";
int numero = int.Parse(texto);           // Converte string para int
double valor = double.Parse("45.67");    // Converte string para double

// Conversão segura com TryParse
string entrada = "abc";
if (int.TryParse(entrada, out int resultado))
{
    Console.WriteLine($"Conversão bem-sucedida: {resultado}");
}
else
{
    Console.WriteLine("Não foi possível converter para int");
}

// Usando Convert
int valor1 = Convert.ToInt32("456");
double valor2 = Convert.ToDouble("78.90");
bool booleano = Convert.ToBoolean("true");
```

### 5. Strings e Interpolação

#### Concatenação de Strings
```csharp
string nome = "João";
string sobrenome = "Silva";
int idade = 30;

// Concatenação com +
string nomeCompleto = nome + " " + sobrenome;

// Concatenação com string.Format
string mensagem = string.Format("Olá {0}, você tem {1} anos", nome, idade);

// Interpolação de string (C# 6+)
string mensagemInterpolada = $"Olá {nome}, você tem {idade} anos";

// String builder para concatenações múltiplas
var sb = new StringBuilder();
sb.Append("Nome: ");
sb.Append(nome);
sb.Append(" | Idade: ");
sb.Append(idade);
string resultado = sb.ToString();
```

#### Propriedades e Métodos de String
```csharp
string texto = "  Hello World  ";

// Propriedades
int comprimento = texto.Length;           // 15
bool vazia = string.IsNullOrEmpty(texto); // false

// Métodos
string semEspacos = texto.Trim();         // "Hello World"
string maiuscula = texto.ToUpper();       // "  HELLO WORLD  "
string minuscula = texto.ToLower();       // "  hello world  "
bool contem = texto.Contains("World");    // true
string substituida = texto.Replace("World", "C#"); // "  Hello C#  "

// Divisão e junção
string[] palavras = texto.Split(' ');     // ["", "", "Hello", "World", "", ""]
string junta = string.Join("-", palavras); // "-Hello-World-"
```

### 6. Exercícios Práticos

#### Exercício 1: Calculadora de IMC
```csharp
public class CalculadoraIMC
{
    public static void CalcularIMC()
    {
        Console.Write("Digite seu peso (kg): ");
        double peso = double.Parse(Console.ReadLine());
        
        Console.Write("Digite sua altura (m): ");
        double altura = double.Parse(Console.ReadLine());
        
        double imc = peso / (altura * altura);
        
        Console.WriteLine($"Seu IMC é: {imc:F2}");
        
        string categoria = imc switch
        {
            < 18.5 => "Abaixo do peso",
            < 25 => "Peso normal",
            < 30 => "Sobrepeso",
            _ => "Obesidade"
        };
        
        Console.WriteLine($"Categoria: {categoria}");
    }
}
```

#### Exercício 2: Conversor de Moedas
```csharp
public class ConversorMoedas
{
    private const double TAXA_DOLAR = 5.20;
    private const double TAXA_EURO = 5.60;
    
    public static void ConverterMoeda()
    {
        Console.Write("Digite o valor em reais: ");
        double reais = double.Parse(Console.ReadLine());
        
        double dolares = reais / TAXA_DOLAR;
        double euros = reais / TAXA_EURO;
        
        Console.WriteLine($"R$ {reais:F2} =");
        Console.WriteLine($"US$ {dolares:F2}");
        Console.WriteLine($"€ {euros:F2}");
    }
}
```

#### Exercício 3: Validador de CPF
```csharp
public class ValidadorCPF
{
    public static bool ValidarCPF(string cpf)
    {
        // Remove caracteres não numéricos
        cpf = cpf.Replace(".", "").Replace("-", "").Replace(" ", "");
        
        // Verifica se tem 11 dígitos
        if (cpf.Length != 11 || !cpf.All(char.IsDigit))
            return false;
        
        // Verifica se todos os dígitos são iguais
        if (cpf.All(c => c == cpf[0]))
            return false;
        
        // Validação dos dígitos verificadores
        return ValidarDigitoVerificador(cpf, 9) && ValidarDigitoVerificador(cpf, 10);
    }
    
    private static bool ValidarDigitoVerificador(string cpf, int posicao)
    {
        int soma = 0;
        int multiplicador = posicao + 1;
        
        for (int i = 0; i < posicao; i++)
        {
            soma += int.Parse(cpf[i].ToString()) * multiplicador;
            multiplicador--;
        }
        
        int resto = soma % 11;
        int digito = resto < 2 ? 0 : 11 - resto;
        
        return digito == int.Parse(cpf[posicao].ToString());
    }
}
```

### 7. Boas Práticas

#### Nomenclatura de Variáveis
```csharp
// Use nomes descritivos
int idadeUsuario = 25;           // ✅ Bom
int i = 25;                      // ❌ Ruim

// Use camelCase para variáveis locais
string nomeCompleto = "João Silva";
bool usuarioAtivo = true;

// Use PascalCase para constantes
const int MaximoTentativas = 3;
const string MensagemErro = "Erro na operação";
```

#### Inicialização de Variáveis
```csharp
// Sempre inicialize variáveis
int contador = 0;                // ✅ Bom
int contador;                    // ❌ Ruim - pode causar erro de compilação

// Use var quando o tipo é óbvio
var lista = new List<string>();  // ✅ Bom
List<string> lista = new List<string>(); // ✅ Também bom, mas mais verboso
```

#### Tratamento de Conversões
```csharp
// Use TryParse para conversões seguras
string entrada = Console.ReadLine();
if (int.TryParse(entrada, out int numero))
{
    Console.WriteLine($"Número válido: {numero}");
}
else
{
    Console.WriteLine("Entrada inválida!");
}
```

### 8. Projeto Prático: Sistema de Cadastro de Funcionários

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

### 9. Próximos Passos

- **Aula 03**: Operadores e Expressões
- **Aula 04**: Estruturas de Controle (if, switch)
- **Aula 05**: Loops e Iterações
- **Aula 06**: Arrays e Coleções

## 📋 Resumo da Aula

Nesta aula você aprendeu:
- ✅ Tipos de dados primitivos em C#
- ✅ Como declarar e inicializar variáveis
- ✅ Diferença entre tipos de valor e referência
- ✅ Conversões de tipos (casting)
- ✅ Trabalho com strings e interpolação
- ✅ Boas práticas de programação

## 🎯 Desafio da Aula

Crie um programa que:
1. Solicite nome, idade e salário de um funcionário
2. Calcule o desconto do INSS (11%)
3. Calcule o desconto do IR (baseado na faixa salarial)
4. Exiba o salário líquido formatado como moeda
5. Determine a faixa salarial do funcionário

## 📚 Recursos Adicionais

- [Tipos de dados em C#](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/builtin-types/)
- [Conversões de tipos](https://docs.microsoft.com/pt-br/dotnet/csharp/programming-guide/types/casting-and-type-conversions/)
- [Strings em C#](https://docs.microsoft.com/pt-br/dotnet/csharp/programming-guide/strings/)

---

**Duração**: 60 minutos  
**Nível**: Iniciante  
**Módulo**: 1 - Fundamentos de C#  
**Aula**: 2 - Variáveis e Tipos de Dados  
**Curso**: C# Automation Complete

🎉 Continue evoluindo como desenvolvedor C#!
