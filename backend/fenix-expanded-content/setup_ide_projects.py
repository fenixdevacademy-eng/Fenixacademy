#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🎯 CONFIGURADOR DE PROJETOS IDE - FENIX ACADEMY
==============================================

Script para implementar todas as pastas dos projetos de cada curso
no IDE Advanced e configurar redirecionamento da aba exercícios.
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Any

class IDEProjectSetup:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.frontend_path = self.base_path.parent.parent / "frontend"
        
        # Configuração dos cursos
        self.courses = {
            "python-data-science": {
                "name": "Python Data Science",
                "emoji": "🐍",
                "language": "python",
                "extensions": [".py", ".ipynb", ".json", ".csv", ".txt"],
                "templates": {
                    "main.py": self._get_python_template(),
                    "requirements.txt": self._get_requirements_template(),
                    "README.md": self._get_readme_template("Python Data Science")
                }
            },
            "react-advanced": {
                "name": "React Advanced",
                "emoji": "⚛️",
                "language": "javascript",
                "extensions": [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".html"],
                "templates": {
                    "src/App.jsx": self._get_react_template(),
                    "package.json": self._get_package_json_template("react"),
                    "README.md": self._get_readme_template("React Advanced")
                }
            },
            "aws-cloud": {
                "name": "AWS Cloud",
                "emoji": "☁️",
                "language": "yaml",
                "extensions": [".yaml", ".yml", ".json", ".tf", ".py", ".sh"],
                "templates": {
                    "cloudformation.yaml": self._get_cloudformation_template(),
                    "terraform/main.tf": self._get_terraform_template(),
                    "README.md": self._get_readme_template("AWS Cloud")
                }
            },
            "devops-docker": {
                "name": "DevOps Docker",
                "emoji": "🐳",
                "language": "dockerfile",
                "extensions": [".dockerfile", ".yml", ".yaml", ".sh", ".py", ".json"],
                "templates": {
                    "Dockerfile": self._get_dockerfile_template(),
                    "docker-compose.yml": self._get_docker_compose_template(),
                    "README.md": self._get_readme_template("DevOps Docker")
                }
            },
            "react-native-mobile": {
                "name": "React Native Mobile",
                "emoji": "📱",
                "language": "javascript",
                "extensions": [".js", ".jsx", ".ts", ".tsx", ".json", ".xml"],
                "templates": {
                    "App.js": self._get_react_native_template(),
                    "package.json": self._get_package_json_template("react-native"),
                    "README.md": self._get_readme_template("React Native Mobile")
                }
            },
            "flutter-mobile": {
                "name": "Flutter Mobile",
                "emoji": "🎯",
                "language": "dart",
                "extensions": [".dart", ".yaml", ".json", ".xml"],
                "templates": {
                    "lib/main.dart": self._get_flutter_template(),
                    "pubspec.yaml": self._get_pubspec_template(),
                    "README.md": self._get_readme_template("Flutter Mobile")
                }
            },
            "nodejs-apis": {
                "name": "Node.js APIs",
                "emoji": "🚀",
                "language": "javascript",
                "extensions": [".js", ".ts", ".json", ".sql", ".env"],
                "templates": {
                    "src/app.js": self._get_nodejs_template(),
                    "package.json": self._get_package_json_template("nodejs"),
                    "README.md": self._get_readme_template("Node.js APIs")
                }
            },
            "blockchain-smart-contracts": {
                "name": "Blockchain Smart Contracts",
                "emoji": "⛓️",
                "language": "solidity",
                "extensions": [".sol", ".js", ".json", ".md"],
                "templates": {
                    "contracts/Token.sol": self._get_solidity_template(),
                    "package.json": self._get_package_json_template("blockchain"),
                    "README.md": self._get_readme_template("Blockchain Smart Contracts")
                }
            }
        }
    
    def _get_python_template(self) -> str:
        return '''# Python Data Science Project
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def main():
    """Função principal do projeto"""
    print("🐍 Bem-vindo ao projeto Python Data Science!")
    
    # Seu código aqui
    data = pd.DataFrame({
        'x': [1, 2, 3, 4, 5],
        'y': [2, 4, 6, 8, 10]
    })
    
    print(data.head())
    
    # Visualização
    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=data, x='x', y='y')
    plt.title('Análise de Dados')
    plt.show()

if __name__ == "__main__":
    main()
'''
    
    def _get_react_template(self) -> str:
        return '''import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('⚛️ Bem-vindo ao React Advanced!');

  useEffect(() => {
    document.title = `Contador: ${count}`;
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <p>Você clicou {count} vezes</p>
        <button onClick={() => setCount(count + 1)}>
          Clique aqui
        </button>
      </header>
    </div>
  );
}

export default App;
'''
    
    def _get_cloudformation_template(self) -> str:
        return '''AWSTemplateFormatVersion: '2010-09-09'
Description: 'Template para projeto AWS Cloud'

Parameters:
  Environment:
    Type: String
    Default: dev
    AllowedValues: [dev, staging, prod]

Resources:
  # S3 Bucket
  ProjectBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '${AWS::StackName}-project-bucket'
      VersioningConfiguration:
        Status: Enabled

  # Lambda Function
  ProjectFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: !Sub '${AWS::StackName}-function'
      Runtime: python3.9
      Handler: index.handler
      Code:
        ZipFile: |
          def handler(event, context):
              return {
                  'statusCode': 200,
                  'body': 'Hello from AWS Lambda!'
              }

Outputs:
  BucketName:
    Value: !Ref ProjectBucket
    Description: Nome do bucket S3
'''
    
    def _get_dockerfile_template(self) -> str:
        return '''# Dockerfile para projeto DevOps
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3000

# Comando para iniciar aplicação
CMD ["npm", "start"]
'''
    
    def _get_react_native_template(self) -> str:
        return '''import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          <Text style={styles.title}>📱 React Native Mobile</Text>
          <Text style={styles.subtitle}>
            Bem-vindo ao seu projeto mobile!
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
'''
    
    def _get_flutter_template(self) -> str:
        return '''import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Mobile',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: '🎯 Flutter Mobile'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Bem-vindo ao seu projeto Flutter!',
              style: Theme.of(context).textTheme.headline5,
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline2,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
'''
    
    def _get_nodejs_template(self) -> str:
        return '''const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Bem-vindo à API Node.js!',
    version: '1.0.0',
    status: 'online'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
'''
    
    def _get_solidity_template(self) -> str:
        return '''// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "Fenix Token";
    string public symbol = "FENIX";
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
'''
    
    def _get_requirements_template(self) -> str:
        return '''pandas==2.0.3
numpy==1.24.3
matplotlib==3.7.1
seaborn==0.12.2
scikit-learn==1.3.0
jupyter==1.0.0
'''
    
    def _get_package_json_template(self, project_type: str) -> str:
        templates = {
            "react": '''{
  "name": "react-advanced-project",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}''',
            "react-native": '''{
  "name": "react-native-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.0"
  }
}''',
            "nodejs": '''{
  "name": "nodejs-api-project",
  "version": "1.0.0",
  "description": "API Node.js para projeto Fenix",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.0"
  }
}''',
            "blockchain": '''{
  "name": "blockchain-project",
  "version": "1.0.0",
  "description": "Projeto Blockchain Smart Contracts",
  "scripts": {
    "compile": "truffle compile",
    "migrate": "truffle migrate",
    "test": "truffle test"
  },
  "dependencies": {
    "truffle": "^5.11.0",
    "@openzeppelin/contracts": "^4.9.0"
  }
}'''
        }
        return templates.get(project_type, "{}")
    
    def _get_docker_compose_template(self) -> str:
        return '''version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: fenix_db
      POSTGRES_USER: fenix_user
      POSTGRES_PASSWORD: fenix_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
'''
    
    def _get_terraform_template(self) -> str:
        return '''# Terraform configuration for AWS
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c02fb55956c7d4"
  instance_type = "t2.micro"

  tags = {
    Name = "FenixProject"
  }
}
'''
    
    def _get_pubspec_template(self) -> str:
        return '''name: flutter_mobile_project
description: Projeto Flutter Mobile para Fenix Academy

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
'''
    
    def _get_readme_template(self, course_name: str) -> str:
        return f'''# {course_name} - Projeto Fenix Academy

## 🎯 Descrição
Este é um projeto prático do curso {course_name} da Fenix Academy.

## 🚀 Como executar
1. Clone o repositório
2. Instale as dependências
3. Execute o projeto

## 📚 Aprendizados
- Conceitos fundamentais
- Aplicações práticas
- Melhores práticas da indústria

## 🛠️ Tecnologias
- Tecnologias específicas do curso
- Ferramentas de desenvolvimento
- Frameworks e bibliotecas

## 📝 Licença
Este projeto é parte do curso da Fenix Academy.
'''
    
    def create_course_projects(self):
        """Cria projetos para todos os cursos"""
        print("🎯 CRIANDO PROJETOS DOS CURSOS NO IDE ADVANCED")
        print("=" * 60)
        
        # Cria diretório de projetos no frontend
        projects_dir = self.frontend_path / "public" / "ide-projects"
        projects_dir.mkdir(parents=True, exist_ok=True)
        
        for course_id, course_data in self.courses.items():
            print(f"📁 Criando projeto: {course_data['name']}")
            
            # Cria diretório do curso
            course_dir = projects_dir / course_id
            course_dir.mkdir(parents=True, exist_ok=True)
            
            # Cria arquivos de template
            for file_path, content in course_data['templates'].items():
                file_full_path = course_dir / file_path
                file_full_path.parent.mkdir(parents=True, exist_ok=True)
                
                with open(file_full_path, 'w', encoding='utf-8') as f:
                    f.write(content)
            
            # Cria arquivo de configuração do projeto
            project_config = {
                "name": course_data['name'],
                "emoji": course_data['emoji'],
                "language": course_data['language'],
                "extensions": course_data['extensions'],
                "files": list(course_data['templates'].keys())
            }
            
            config_file = course_dir / "project.json"
            with open(config_file, 'w', encoding='utf-8') as f:
                json.dump(project_config, f, indent=2, ensure_ascii=False)
            
            print(f"  ✅ Projeto {course_data['name']} criado com sucesso!")
        
        print(f"\n🎉 Todos os projetos foram criados em: {projects_dir}")
    
    def create_exercises_page(self):
        """Cria página de exercícios que redireciona para IDE Advanced"""
        print("\n🔗 CRIANDO PÁGINA DE EXERCÍCIOS")
        print("=" * 40)
        
        exercises_page = self.frontend_path / "app" / "exercicios" / "page.tsx"
        exercises_page.parent.mkdir(parents=True, exist_ok=True)
        
        exercises_content = ''''use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExerciciosPage() {
    const router = useRouter();

    useEffect(() => {
        // Redireciona automaticamente para o IDE Advanced
        router.replace('/ide-advanced');
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    🎯 Redirecionando para o IDE Advanced...
                </h2>
                <p className="text-gray-400">
                    Preparando seu ambiente de desenvolvimento
                </p>
            </div>
        </div>
    );
}
'''
        
        with open(exercises_page, 'w', encoding='utf-8') as f:
            f.write(exercises_content)
        
        print(f"✅ Página de exercícios criada: {exercises_page}")
    
    def update_ide_advanced(self):
        """Atualiza o IDE Advanced para incluir os projetos dos cursos"""
        print("\n🔧 ATUALIZANDO IDE ADVANCED")
        print("=" * 40)
        
        # Lê o arquivo AdvancedIDE.tsx
        ide_file = self.frontend_path / "components" / "AdvancedIDE.tsx"
        
        if not ide_file.exists():
            print("❌ Arquivo AdvancedIDE.tsx não encontrado")
            return
        
        with open(ide_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Adiciona configuração dos projetos dos cursos
        projects_config = '''
    // Configuração dos projetos dos cursos
    const courseProjects = {
        "python-data-science": {
            name: "Python Data Science",
            emoji: "🐍",
            language: "python",
            path: "/ide-projects/python-data-science"
        },
        "react-advanced": {
            name: "React Advanced", 
            emoji: "⚛️",
            language: "javascript",
            path: "/ide-projects/react-advanced"
        },
        "aws-cloud": {
            name: "AWS Cloud",
            emoji: "☁️", 
            language: "yaml",
            path: "/ide-projects/aws-cloud"
        },
        "devops-docker": {
            name: "DevOps Docker",
            emoji: "🐳",
            language: "dockerfile", 
            path: "/ide-projects/devops-docker"
        },
        "react-native-mobile": {
            name: "React Native Mobile",
            emoji: "📱",
            language: "javascript",
            path: "/ide-projects/react-native-mobile"
        },
        "flutter-mobile": {
            name: "Flutter Mobile",
            emoji: "🎯",
            language: "dart",
            path: "/ide-projects/flutter-mobile"
        },
        "nodejs-apis": {
            name: "Node.js APIs",
            emoji: "🚀",
            language: "javascript",
            path: "/ide-projects/nodejs-apis"
        },
        "blockchain-smart-contracts": {
            name: "Blockchain Smart Contracts",
            emoji: "⛓️",
            language: "solidity",
            path: "/ide-projects/blockchain-smart-contracts"
        }
    };
'''
        
        # Insere a configuração após os imports
        if "courseProjects" not in content:
            content = content.replace(
                "const AdvancedIDE: React.FC<AdvancedIDEProps> = ({",
                projects_config + "\nconst AdvancedIDE: React.FC<AdvancedIDEProps> = ({"
            )
        
        # Salva o arquivo atualizado
        with open(ide_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ IDE Advanced atualizado com configuração dos projetos")
    
    def create_navigation_update(self):
        """Atualiza navegação para incluir link para exercícios"""
        print("\n🧭 ATUALIZANDO NAVEGAÇÃO")
        print("=" * 40)
        
        # Verifica se existe arquivo de navegação
        nav_file = self.frontend_path / "app" / "navigation-config.ts"
        
        if nav_file.exists():
            with open(nav_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Adiciona link para exercícios se não existir
            if "exercicios" not in content:
                exercises_link = '''
    {
        name: 'Exercícios',
        href: '/exercicios',
        icon: 'Code',
        description: 'Pratique com projetos reais no IDE Advanced'
    },'''
                
                # Insere antes do último item do array
                content = content.replace(
                    "];",
                    exercises_link + "\n];"
                )
                
                with open(nav_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print("✅ Navegação atualizada com link para exercícios")
        else:
            print("⚠️ Arquivo de navegação não encontrado, criando...")
            
            nav_content = '''export const navigationItems = [
    {
        name: 'Início',
        href: '/',
        icon: 'Home',
        description: 'Página inicial da Fenix Academy'
    },
    {
        name: 'Cursos',
        href: '/courses',
        icon: 'BookOpen',
        description: 'Explore nossos cursos de programação'
    },
    {
        name: 'IDE Advanced',
        href: '/ide-advanced',
        icon: 'Code',
        description: 'Ambiente de desenvolvimento integrado'
    },
    {
        name: 'Exercícios',
        href: '/exercicios',
        icon: 'Code',
        description: 'Pratique com projetos reais no IDE Advanced'
    },
    {
        name: 'Sobre',
        href: '/about',
        icon: 'Info',
        description: 'Conheça mais sobre a Fenix Academy'
    }
];
'''
            
            with open(nav_file, 'w', encoding='utf-8') as f:
                f.write(nav_content)
            
            print("✅ Arquivo de navegação criado")

def main():
    """Função principal"""
    print("🎯 FENIX ACADEMY - CONFIGURADOR DE PROJETOS IDE")
    print("=" * 60)
    
    base_path = Path(__file__).parent
    setup = IDEProjectSetup(base_path)
    
    try:
        # Cria projetos dos cursos
        setup.create_course_projects()
        
        # Cria página de exercícios
        setup.create_exercises_page()
        
        # Atualiza IDE Advanced
        setup.update_ide_advanced()
        
        # Atualiza navegação
        setup.create_navigation_update()
        
        print("\n🎉 CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!")
        print("=" * 60)
        print("✅ Projetos dos cursos criados no IDE Advanced")
        print("✅ Página de exercícios configurada")
        print("✅ Redirecionamento para IDE Advanced ativo")
        print("✅ Navegação atualizada")
        
        print("\n🚀 PRÓXIMOS PASSOS:")
        print("1. Acesse /exercicios para ser redirecionado ao IDE Advanced")
        print("2. Explore os projetos dos cursos no IDE")
        print("3. Comece a praticar com projetos reais!")
        
    except Exception as e:
        print(f"❌ Erro durante a configuração: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
