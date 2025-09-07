'use client';

import React, { useState } from 'react';
import {
    FolderPlus,
    Code,
    Globe,
    Database,
    Smartphone,
    Server,
    Zap,
    Star,
    Download,
    Eye,
    CheckCircle,
    X,
    Search,
    Filter
} from 'lucide-react';

interface ProjectTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    language: string;
    framework: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    features: string[];
    files: Array<{
        name: string;
        content: string;
        language: string;
    }>;
    dependencies: string[];
    setup: string[];
    preview?: string;
    rating: number;
    downloads: number;
}

const projectTemplates: ProjectTemplate[] = [
    {
        id: 'react-portfolio',
        name: 'Portfolio React',
        description: 'Portfolio pessoal moderno com React, TypeScript e Tailwind CSS',
        category: 'Web Development',
        language: 'TypeScript',
        framework: 'React',
        difficulty: 'intermediate',
        features: ['Responsivo', 'Dark Mode', 'Animações', 'SEO Otimizado'],
        files: [
            {
                name: 'package.json',
                content: `{
  "name": "portfolio-react",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^4.9.5",
    "tailwindcss": "^3.3.0"
  }
}`,
                language: 'json'
            },
            {
                name: 'src/App.tsx',
                content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Meu Portfolio
            </h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contato
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Desenvolvedor Full Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Criando experiências digitais incríveis
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Ver Projetos
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Download CV
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;`,
                language: 'typescript'
            }
        ],
        dependencies: ['react', 'typescript', 'tailwindcss'],
        setup: [
            'npm install',
            'npm run dev'
        ],
        rating: 4.8,
        downloads: 1250
    },
    {
        id: 'nodejs-api',
        name: 'API REST Node.js',
        description: 'API REST completa com Express, MongoDB e autenticação JWT',
        category: 'Backend',
        language: 'JavaScript',
        framework: 'Express',
        difficulty: 'intermediate',
        features: ['Autenticação JWT', 'Validação', 'Documentação Swagger', 'Testes'],
        files: [
            {
                name: 'package.json',
                content: `{
  "name": "nodejs-api",
  "version": "1.0.0",
  "description": "API REST com Node.js e Express",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0"
  }
}`,
                language: 'json'
            },
            {
                name: 'server.js',
                content: `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API REST Node.js funcionando!' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Servidor rodando na porta \${PORT}\`);
});`,
                language: 'javascript'
            }
        ],
        dependencies: ['express', 'mongoose', 'jsonwebtoken', 'bcryptjs'],
        setup: [
            'npm install',
            'npm run dev'
        ],
        rating: 4.6,
        downloads: 890
    },
    {
        id: 'python-flask',
        name: 'Web App Flask',
        description: 'Aplicação web com Flask, SQLAlchemy e Bootstrap',
        category: 'Web Development',
        language: 'Python',
        framework: 'Flask',
        difficulty: 'beginner',
        features: ['CRUD Completo', 'Bootstrap UI', 'SQLAlchemy ORM', 'Formulários'],
        files: [
            {
                name: 'app.py',
                content: `from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sua-chave-secreta-aqui'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Post {self.title}>'

@app.route('/')
def index():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return render_template('index.html', posts=posts)

@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        
        post = Post(title=title, content=content)
        db.session.add(post)
        db.session.commit()
        
        flash('Post criado com sucesso!', 'success')
        return redirect(url_for('index'))
    
    return render_template('create.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)`,
                language: 'python'
            }
        ],
        dependencies: ['flask', 'flask-sqlalchemy'],
        setup: [
            'pip install -r requirements.txt',
            'python app.py'
        ],
        rating: 4.4,
        downloads: 650
    },
    {
        id: 'react-native-app',
        name: 'App React Native',
        description: 'Aplicativo móvel com React Native e Expo',
        category: 'Mobile',
        language: 'TypeScript',
        framework: 'React Native',
        difficulty: 'intermediate',
        features: ['Navegação', 'AsyncStorage', 'API Integration', 'Push Notifications'],
        files: [
            {
                name: 'App.tsx',
                content: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App!</Text>
      <Text style={styles.subtitle}>
        Este é um template React Native com Expo
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Meu App' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});`,
                language: 'typescript'
            }
        ],
        dependencies: ['expo', 'react-navigation'],
        setup: [
            'npm install',
            'expo start'
        ],
        rating: 4.7,
        downloads: 1100
    }
];

interface ProjectTemplatesProps {
    onTemplateSelect?: (template: ProjectTemplate) => void;
    theme?: 'dark' | 'light';
}

export default function ProjectTemplates({
    onTemplateSelect,
    theme = 'dark'
}: ProjectTemplatesProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);

    const categories = ['all', 'Web Development', 'Backend', 'Mobile', 'Desktop', 'Data Science'];
    const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

    const filteredTemplates = projectTemplates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    const handleTemplateSelect = (template: ProjectTemplate) => {
        setSelectedTemplate(template);
        if (onTemplateSelect) {
            onTemplateSelect(template);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return '#10b981';
            case 'intermediate': return '#f59e0b';
            case 'advanced': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'Iniciante';
            case 'intermediate': return 'Intermediário';
            case 'advanced': return 'Avançado';
            default: return difficulty;
        }
    };

    return (
        <div
            className="h-full flex flex-col"
            style={{
                background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                color: theme === 'dark' ? '#d4d4d4' : '#000000'
            }}
        >
            {/* Header */}
            <div
                className="p-4 border-b"
                style={{
                    background: theme === 'dark' ? '#252526' : '#f8f9fa',
                    borderColor: theme === 'dark' ? '#3c3c3c' : '#e9ecef'
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FolderPlus size={20} />
                        Templates de Projeto
                    </h2>
                    <div className="flex items-center gap-2 text-sm">
                        <span>{filteredTemplates.length} templates</span>
                    </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Buscar templates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border"
                                style={{
                                    background: theme === 'dark' ? '#3c3c3c' : '#ffffff',
                                    borderColor: theme === 'dark' ? '#5a5a5a' : '#d1d5db',
                                    color: theme === 'dark' ? '#d4d4d4' : '#000000'
                                }}
                            />
                        </div>
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 rounded-lg border"
                        style={{
                            background: theme === 'dark' ? '#3c3c3c' : '#ffffff',
                            borderColor: theme === 'dark' ? '#5a5a5a' : '#d1d5db',
                            color: theme === 'dark' ? '#d4d4d4' : '#000000'
                        }}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'Todas as Categorias' : category}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="px-3 py-2 rounded-lg border"
                        style={{
                            background: theme === 'dark' ? '#3c3c3c' : '#ffffff',
                            borderColor: theme === 'dark' ? '#5a5a5a' : '#d1d5db',
                            color: theme === 'dark' ? '#d4d4d4' : '#000000'
                        }}
                    >
                        {difficulties.map(difficulty => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty === 'all' ? 'Todas as Dificuldades' : getDifficultyLabel(difficulty)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Lista de Templates */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map(template => (
                        <div
                            key={template.id}
                            className="rounded-lg border p-4 cursor-pointer transition-all duration-200 hover:shadow-lg"
                            style={{
                                background: theme === 'dark' ? '#2d2d30' : '#ffffff',
                                borderColor: theme === 'dark' ? '#3c3c3c' : '#e5e7eb'
                            }}
                            onClick={() => handleTemplateSelect(template)}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {template.category === 'Web Development' && <Globe size={16} />}
                                    {template.category === 'Backend' && <Server size={16} />}
                                    {template.category === 'Mobile' && <Smartphone size={16} />}
                                    {template.category === 'Data Science' && <Database size={16} />}
                                    <span className="text-sm font-medium">{template.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={14} className="text-yellow-400 fill-current" />
                                    <span className="text-xs">{template.rating}</span>
                                </div>
                            </div>

                            <p className="text-sm mb-3 opacity-80 line-clamp-2">
                                {template.description}
                            </p>

                            <div className="flex items-center gap-2 mb-3">
                                <span
                                    className="px-2 py-1 rounded text-xs font-medium"
                                    style={{
                                        background: getDifficultyColor(template.difficulty) + '20',
                                        color: getDifficultyColor(template.difficulty)
                                    }}
                                >
                                    {getDifficultyLabel(template.difficulty)}
                                </span>
                                <span className="text-xs opacity-60">{template.language}</span>
                                <span className="text-xs opacity-60">{template.framework}</span>
                            </div>

                            <div className="flex items-center justify-between text-xs opacity-60">
                                <span>{template.downloads} downloads</span>
                                <div className="flex items-center gap-1">
                                    <Download size={12} />
                                    <span>Usar Template</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-12">
                        <FolderPlus size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg opacity-60">Nenhum template encontrado</p>
                        <p className="text-sm opacity-40">Tente ajustar os filtros de busca</p>
                    </div>
                )}
            </div>

            {/* Modal de Detalhes do Template */}
            {selectedTemplate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div
                        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg border"
                        style={{
                            background: theme === 'dark' ? '#2d2d30' : '#ffffff',
                            borderColor: theme === 'dark' ? '#3c3c3c' : '#e5e7eb'
                        }}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">{selectedTemplate.name}</h3>
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="p-2 rounded-lg hover:bg-opacity-20 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <p className="text-sm opacity-80 mb-4">{selectedTemplate.description}</p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Informações do Template */}
                                <div>
                                    <h4 className="font-medium mb-3">Informações</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Linguagem:</span>
                                            <span>{selectedTemplate.language}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Framework:</span>
                                            <span>{selectedTemplate.framework}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Dificuldade:</span>
                                            <span
                                                className="px-2 py-1 rounded text-xs"
                                                style={{
                                                    background: getDifficultyColor(selectedTemplate.difficulty) + '20',
                                                    color: getDifficultyColor(selectedTemplate.difficulty)
                                                }}
                                            >
                                                {getDifficultyLabel(selectedTemplate.difficulty)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Downloads:</span>
                                            <span>{selectedTemplate.downloads}</span>
                                        </div>
                                    </div>

                                    <h4 className="font-medium mb-3 mt-6">Recursos</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedTemplate.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 rounded text-xs"
                                                style={{
                                                    background: theme === 'dark' ? '#3c3c3c' : '#f3f4f6',
                                                    color: theme === 'dark' ? '#d4d4d4' : '#374151'
                                                }}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Arquivos do Template */}
                                <div>
                                    <h4 className="font-medium mb-3">Arquivos Incluídos</h4>
                                    <div className="space-y-2">
                                        {selectedTemplate.files.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-2 rounded"
                                                style={{
                                                    background: theme === 'dark' ? '#3c3c3c' : '#f8f9fa'
                                                }}
                                            >
                                                <Code size={14} />
                                                <span className="text-sm">{file.name}</span>
                                                <span className="text-xs opacity-60">({file.language})</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        handleTemplateSelect(selectedTemplate);
                                        setSelectedTemplate(null);
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                    <Download size={16} />
                                    Usar Este Template
                                </button>
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="px-4 py-2 rounded-lg border transition-colors"
                                    style={{
                                        borderColor: theme === 'dark' ? '#5a5a5a' : '#d1d5db',
                                        color: theme === 'dark' ? '#d4d4d4' : '#374151'
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
