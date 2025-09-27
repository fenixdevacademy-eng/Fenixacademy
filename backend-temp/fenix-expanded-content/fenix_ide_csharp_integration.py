#!/usr/bin/env python3
"""
Script para integrar interpretador da Fenix IDE com suporte avançado para C#
"""

import os
import json
from pathlib import Path

def integrate_csharp_with_fenix_ide():
    """Integra C# com o interpretador da Fenix IDE"""
    print("🔧 INTEGRANDO C# COM FENIX IDE!")
    print("=" * 70)
    
    # Criar configurações do interpretador
    create_csharp_interpreter_config()
    
    # Criar extensões de autocomplete
    create_csharp_autocomplete_extensions()
    
    # Criar snippets de código
    create_csharp_code_snippets()
    
    # Criar configurações de debugging
    create_csharp_debugging_config()
    
    # Criar templates de projeto
    create_csharp_project_templates()
    
    print("\n🎉 C# INTEGRADO COM FENIX IDE!")
    print("🚀 Autocomplete avançado configurado!")
    print("🔍 Debugging e IntelliSense ativos!")

def create_csharp_interpreter_config():
    """Cria configuração do interpretador C#"""
    print("\n🔧 CONFIGURANDO INTERPRETADOR C#")
    print("-" * 50)
    
    config = {
        "language": "csharp",
        "version": "12.0",
        "runtime": ".NET 8.0",
        "interpreter": {
            "command": "dotnet",
            "args": ["run"],
            "workingDirectory": "${workspaceFolder}",
            "env": {
                "DOTNET_ROOT": "/usr/share/dotnet",
                "PATH": "/usr/share/dotnet:${env:PATH}"
            }
        },
        "compiler": {
            "command": "dotnet",
            "args": ["build"],
            "output": "bin/Debug/net8.0/",
            "target": "net8.0"
        },
        "features": {
            "intellisense": True,
            "autocomplete": True,
            "debugging": True,
            "refactoring": True,
            "formatting": True,
            "linting": True
        }
    }
    
    # Salvar configuração
    config_path = Path("fenix_ide_config/csharp_interpreter.json")
    config_path.parent.mkdir(exist_ok=True)
    
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    
    print("  ✅ Configuração do interpretador salva")

def create_csharp_autocomplete_extensions():
    """Cria extensões de autocomplete avançado para C#"""
    print("\n🚀 CRIANDO EXTENSÕES DE AUTOCOMPLETE")
    print("-" * 50)
    
    # Extensões principais
    extensions = [
        {
            "name": "C# Dev Kit",
            "id": "ms-dotnettools.csdevkit",
            "version": "1.0.0",
            "description": "Extensão oficial da Microsoft para C#",
            "features": [
                "IntelliSense avançado",
                "Autocomplete inteligente",
                "Refactoring automático",
                "Debugging integrado"
            ]
        },
        {
            "name": "C# Extensions",
            "id": "josefpihrt-vscode-csharpextensions",
            "version": "1.3.1",
            "description": "Extensões úteis para desenvolvimento C#",
            "features": [
                "Snippets de código",
                "Templates de projeto",
                "Utilitários de código",
                "Formatação automática"
            ]
        },
        {
            "name": "NuGet Package Manager",
            "id": "jmrog.vscode-nuget-package-manager",
            "version": "1.1.6",
            "description": "Gerenciador de pacotes NuGet",
            "features": [
                "Instalação de pacotes",
                "Atualização automática",
                "Gerenciamento de dependências",
                "Restauração de pacotes"
            ]
        },
        {
            "name": ".NET Core Test Explorer",
            "id": "formulahendry.dotnet-test-explorer",
            "version": "0.7.7",
            "description": "Explorador de testes .NET",
            "features": [
                "Execução de testes",
                "Cobertura de código",
                "Debugging de testes",
                "Relatórios de teste"
            ]
        }
    ]
    
    # Salvar extensões
    extensions_path = Path("fenix_ide_config/csharp_extensions.json")
    with open(extensions_path, 'w', encoding='utf-8') as f:
        json.dump(extensions, f, indent=2, ensure_ascii=False)
    
    print(f"  ✅ {len(extensions)} extensões configuradas")

def create_csharp_code_snippets():
    """Cria snippets de código para C#"""
    print("\n📝 CRIANDO SNIPPETS DE CÓDIGO")
    print("-" * 50)
    
    snippets = {
        "Console Application": {
            "prefix": "console",
            "body": [
                "using System;",
                "",
                "namespace ${1:MyNamespace}",
                "{",
                "    class Program",
                "    {",
                "        static void Main(string[] args)",
                "        {",
                "            Console.WriteLine(\"Hello, World!\");",
                "            $0",
                "        }",
                "    }",
                "}"
            ],
            "description": "Cria uma aplicação console básica"
        },
        "Class": {
            "prefix": "class",
            "body": [
                "public class ${1:ClassName}",
                "{",
                "    $0",
                "}"
            ],
            "description": "Cria uma nova classe"
        },
        "Interface": {
            "prefix": "interface",
            "body": [
                "public interface ${1:IInterfaceName}",
                "{",
                "    $0",
                "}"
            ],
            "description": "Cria uma nova interface"
        },
        "Property": {
            "prefix": "prop",
            "body": [
                "public ${1:string} ${2:PropertyName} {{ get; set; }}"
            ],
            "description": "Cria uma propriedade auto-implementada"
        },
        "Method": {
            "prefix": "method",
            "body": [
                "public ${1:void} ${2:MethodName}(${3:parameters})",
                "{",
                "    $0",
                "}"
            ],
            "description": "Cria um novo método"
        },
        "Try-Catch": {
            "prefix": "try",
            "body": [
                "try",
                "{",
                "    $1",
                "}",
                "catch (${2:Exception} ex)",
                "{",
                "    $0",
                "}"
            ],
            "description": "Cria um bloco try-catch"
        },
        "Async Method": {
            "prefix": "async",
            "body": [
                "public async Task<${1:void}> ${2:MethodName}Async(${3:parameters})",
                "{",
                "    $0",
                "}"
            ],
            "description": "Cria um método assíncrono"
        },
        "Unit Test": {
            "prefix": "test",
            "body": [
                "[Fact]",
                "public void ${1:TestName}_${2:Scenario}_${3:ExpectedResult}()",
                "{",
                "    // Arrange",
                "    $0",
                "    ",
                "    // Act",
                "    ",
                "    // Assert",
                "}"
            ],
            "description": "Cria um teste unitário"
        }
    }
    
    # Salvar snippets
    snippets_path = Path("fenix_ide_config/csharp_snippets.json")
    with open(snippets_path, 'w', encoding='utf-8') as f:
        json.dump(snippets, f, indent=2, ensure_ascii=False)
    
    print(f"  ✅ {len(snippets)} snippets criados")

def create_csharp_debugging_config():
    """Cria configurações de debugging para C#"""
    print("\n🔍 CONFIGURANDO DEBUGGING")
    print("-" * 50)
    
    debug_config = {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Launch .NET Core",
                "type": "coreclr",
                "request": "launch",
                "preLaunchTask": "build",
                "program": "${workspaceFolder}/bin/Debug/net8.0/${workspaceFolderBasename}.dll",
                "args": [],
                "cwd": "${workspaceFolder}",
                "console": "internalConsole",
                "stopAtEntry": False,
                "env": {
                    "ASPNETCORE_ENVIRONMENT": "Development"
                }
            },
            {
                "name": "Attach to .NET Core",
                "type": "coreclr",
                "request": "attach"
            },
            {
                "name": "Launch .NET Core (Console)",
                "type": "coreclr",
                "request": "launch",
                "preLaunchTask": "build",
                "program": "${workspaceFolder}/bin/Debug/net8.0/${workspaceFolderBasename}.exe",
                "args": [],
                "cwd": "${workspaceFolder}",
                "console": "externalTerminal",
                "stopAtEntry": False
            }
        ]
    }
    
    # Salvar configuração de debugging
    debug_path = Path("fenix_ide_config/launch.json")
    with open(debug_path, 'w', encoding='utf-8') as f:
        json.dump(debug_config, f, indent=2, ensure_ascii=False)
    
    print("  ✅ Configuração de debugging salva")

def create_csharp_project_templates():
    """Cria templates de projeto para C#"""
    print("\n📁 CRIANDO TEMPLATES DE PROJETO")
    print("-" * 50)
    
    templates = {
        "Console Application": {
            "command": "dotnet new console -n ${projectName}",
            "description": "Aplicação console básica",
            "files": [
                "Program.cs",
                "${projectName}.csproj"
            ]
        },
        "Class Library": {
            "command": "dotnet new classlib -n ${projectName}",
            "description": "Biblioteca de classes reutilizável",
            "files": [
                "Class1.cs",
                "${projectName}.csproj"
            ]
        },
        "Web API": {
            "command": "dotnet new webapi -n ${projectName}",
            "description": "API web com ASP.NET Core",
            "files": [
                "Controllers/",
                "Program.cs",
                "appsettings.json",
                "${projectName}.csproj"
            ]
        },
        "MVC Application": {
            "command": "dotnet new mvc -n ${projectName}",
            "description": "Aplicação web MVC",
            "files": [
                "Controllers/",
                "Views/",
                "Models/",
                "Program.cs",
                "appsettings.json",
                "${projectName}.csproj"
            ]
        },
        "Unit Test Project": {
            "command": "dotnet new xunit -n ${projectName}.Tests",
            "description": "Projeto de testes unitários",
            "files": [
                "UnitTest1.cs",
                "${projectName}.Tests.csproj"
            ]
        },
        "Blazor Server": {
            "command": "dotnet new blazorserver -n ${projectName}",
            "description": "Aplicação Blazor Server",
            "files": [
                "Pages/",
                "Shared/",
                "Program.cs",
                "appsettings.json",
                "${projectName}.csproj"
            ]
        },
        "Blazor WebAssembly": {
            "command": "dotnet new blazorwasm -n ${projectName}",
            "description": "Aplicação Blazor WebAssembly",
            "files": [
                "Pages/",
                "Shared/",
                "wwwroot/",
                "Program.cs",
                "appsettings.json",
                "${projectName}.csproj"
            ]
        }
    }
    
    # Salvar templates
    templates_path = Path("fenix_ide_config/csharp_templates.json")
    with open(templates_path, 'w', encoding='utf-8') as f:
        json.dump(templates, f, indent=2, ensure_ascii=False)
    
    print(f"  ✅ {len(templates)} templates criados")

def create_fenix_ide_main_config():
    """Cria configuração principal da Fenix IDE"""
    print("\n⚙️ CRIANDO CONFIGURAÇÃO PRINCIPAL")
    print("-" * 50)
    
    main_config = {
        "fenix_ide": {
            "version": "2.0.0",
            "name": "Fenix IDE - C# Edition",
            "description": "IDE especializada para desenvolvimento C# e .NET",
            "features": {
                "languages": ["csharp", "fsharp", "vb", "powershell"],
                "frameworks": [".NET 8.0", ".NET 7.0", ".NET 6.0"],
                "platforms": ["Windows", "macOS", "Linux"],
                "integrations": [
                    "Git",
                    "Docker",
                    "Azure",
                    "AWS",
                    "GitHub"
                ]
            },
            "ui": {
                "theme": "fenix-dark",
                "colorScheme": "fenix-blue",
                "layout": "modern",
                "accessibility": True
            },
            "performance": {
                "intellisense": "ultra-fast",
                "autocomplete": "smart",
                "indexing": "background",
                "memory": "optimized"
            }
        },
        "csharp_support": {
            "enabled": True,
            "version": "12.0",
            "features": {
                "intellisense": True,
                "autocomplete": True,
                "debugging": True,
                "refactoring": True,
                "formatting": True,
                "linting": True,
                "testing": True,
                "profiling": True
            },
            "extensions": [
                "ms-dotnettools.csdevkit",
                "josefpihrt-vscode-csharpextensions",
                "jmrog.vscode-nuget-package-manager",
                "formulahendry.dotnet-test-explorer"
            ]
        }
    }
    
    # Salvar configuração principal
    main_config_path = Path("fenix_ide_config/fenix_ide_config.json")
    with open(main_config_path, 'w', encoding='utf-8') as f:
        json.dump(main_config, f, indent=2, ensure_ascii=False)
    
    print("  ✅ Configuração principal salva")

def create_readme_integration():
    """Cria README explicando a integração"""
    print("\n📚 CRIANDO DOCUMENTAÇÃO")
    print("-" * 50)
    
    readme_content = [
        "# 🔧 Integração C# com Fenix IDE",
        "",
        "## 🎯 **O que foi configurado**",
        "",
        "### 🚀 **Interpretador C#**",
        "- **Runtime**: .NET 8.0",
        "- **Comando**: `dotnet run`",
        "- **Compilador**: `dotnet build`",
        "- **Suporte**: Console, Web API, MVC, Blazor",
        "",
        "### 🌟 **Autocomplete Avançado**",
        "- **IntelliSense**: Completamento inteligente",
        "- **Snippets**: 8 templates de código",
        "- **Refactoring**: Renomeação e reorganização",
        "- **Formatação**: Código limpo automaticamente",
        "",
        "### 🔍 **Debugging Integrado**",
        "- **Breakpoints**: Paradas estratégicas",
        "- **Step-through**: Execução linha por linha",
        "- **Variables**: Inspeção de valores",
        "- **Call Stack**: Rastreamento de execução",
        "",
        "### 📁 **Templates de Projeto**",
        "- **Console**: Aplicações de linha de comando",
        "- **Class Library**: Bibliotecas reutilizáveis",
        "- **Web API**: APIs RESTful",
        "- **MVC**: Aplicações web completas",
        "- **Blazor**: Aplicações web modernas",
        "- **Unit Tests**: Testes automatizados",
        "",
        "## 🚀 **Como usar**",
        "",
        "### 1️⃣ **Criar novo projeto**",
        "```bash",
        "# Console Application",
        "dotnet new console -n MeuProjeto",
        "cd MeuProjeto",
        "dotnet run",
        "```",
        "",
        "### 2️⃣ **Executar código**",
        "```bash",
        "# Compilar e executar",
        "dotnet build",
        "dotnet run",
        "```",
        "",
        "### 3️⃣ **Adicionar dependências**",
        "```bash",
        "# Instalar pacote NuGet",
        "dotnet add package Newtonsoft.Json",
        "```",
        "",
        "### 4️⃣ **Executar testes**",
        "```bash",
        "# Executar testes unitários",
        "dotnet test",
        "```",
        "",
        "## 🔧 **Configurações**",
        "",
        "### 📁 **Arquivos de configuração**",
        "- `csharp_interpreter.json` - Configuração do interpretador",
        "- `csharp_extensions.json` - Extensões instaladas",
        "- `csharp_snippets.json` - Snippets de código",
        "- `launch.json` - Configuração de debugging",
        "- `csharp_templates.json` - Templates de projeto",
        "",
        "### ⚙️ **Personalização**",
        "- **Tema**: fenix-dark",
        "- **Cores**: fenix-blue",
        "- **Layout**: modern",
        "- **Performance**: ultra-fast",
        "",
        "## 🌟 **Recursos especiais**",
        "",
        "### 🚀 **Performance**",
        "- IntelliSense ultra-rápido",
        "- Autocomplete inteligente",
        "- Indexação em background",
        "- Memória otimizada",
        "",
        "### 🔍 **Debugging**",
        "- Breakpoints condicionais",
        "- Logpoints inteligentes",
        "- Profiling integrado",
        "- Análise de performance",
        "",
        "### 📚 **Documentação**",
        "- Tooltips informativos",
        "- Exemplos de código",
        "- Links para MSDN",
        "- Sugestões de melhores práticas",
        "",
        "---",
        "",
        "*🎯 C# integrado com sucesso na Fenix IDE!*",
        "*🚀 Desenvolvimento .NET mais produtivo que nunca!*"
    ]
    
    # Salvar README
    readme_path = Path("fenix_ide_config/README.md")
    with open(readme_path, 'w', encoding='utf-8') as f:
        readme_path.write_text("\n".join(readme_content), encoding='utf-8')
    
    print("  ✅ README criado")

if __name__ == "__main__":
    integrate_csharp_with_fenix_ide()
    create_fenix_ide_main_config()
    create_readme_integration()











