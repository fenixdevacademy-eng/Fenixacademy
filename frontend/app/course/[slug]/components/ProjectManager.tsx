import React, { useState } from 'react';
import {
    Download,
    Upload,
    FolderPlus,
    FileText,
    Code,
    Database,
    Globe,
    Smartphone,
    Zap,
    Palette
} from 'lucide-react';

interface ProjectTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    files: Array<{
        name: string;
        content: string;
        language: string;
    }>;
}

interface ProjectManagerProps {
    onProjectCreate: (project: any) => void;
    onProjectImport: (project: any) => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({
    onProjectCreate,
    onProjectImport
}) => {
    const [showTemplates, setShowTemplates] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);

    const projectTemplates: ProjectTemplate[] = [
        {
            id: 'html-css-js',
            name: 'Site Básico',
            description: 'Projeto HTML + CSS + JavaScript para iniciantes',
            category: 'Frontend',
            icon: <Globe className="w-6 h-6" />,
            files: [
                {
                    name: 'index.html',
                    content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>🚀 Meu Projeto</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Bem-vindo!</h2>
            <p>Este é o seu primeiro projeto web.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 - Criado com Fenix IDE</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
                    language: 'html'
                },
                {
                    name: 'styles.css',
                    content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem 0;
    text-align: center;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s;
}

nav a:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

section {
    margin-bottom: 3rem;
}

h2 {
    color: #667eea;
    margin-bottom: 1rem;
}

footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem 0;
    margin-top: 2rem;
}`,
                    language: 'css'
                },
                {
                    name: 'script.js',
                    content: `// Script principal do projeto
console.log('🚀 Projeto carregado com sucesso!');

// Função para adicionar interatividade
function initApp() {
    // Adicionar eventos aos links de navegação
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Adicionar animação ao título
    const title = document.querySelector('h1');
    if (title) {
        title.style.animation = 'fadeIn 2s ease-in';
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', initApp);

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = \`
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
\`;
document.head.appendChild(style);`,
                    language: 'javascript'
                }
            ]
        },
        {
            id: 'react-app',
            name: 'App React',
            description: 'Aplicação React moderna com hooks e componentes',
            category: 'Frontend',
            icon: <Code className="w-6 h-6" />,
            files: [
                {
                    name: 'App.jsx',
                    content: `import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.title = \`Contador: \${count}\`;
  }, [count]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={\`App \${theme}\`}>
      <header className="App-header">
        <h1>🚀 React App</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>
      
      <main>
        <div className="counter-section">
          <h2>Contador: {count}</h2>
          <div className="counter-controls">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;`,
                    language: 'javascript'
                },
                {
                    name: 'App.css',
                    content: `.App {
  text-align: center;
  min-height: 100vh;
  transition: all 0.3s ease;
}

.App.light {
  background-color: #f8f9fa;
  color: #333;
}

.App.dark {
  background-color: #1a1a1a;
  color: #fff;
}

.App-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-toggle {
  background: none;
  border: 2px solid white;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: white;
  color: #667eea;
}

.counter-section {
  padding: 3rem;
}

.counter-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.counter-controls button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.counter-controls button:first-child {
  background-color: #dc3545;
  color: white;
}

.counter-controls button:nth-child(2) {
  background-color: #6c757d;
  color: white;
}

.counter-controls button:last-child {
  background-color: #28a745;
  color: white;
}

.counter-controls button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}`,
                    language: 'css'
                }
            ]
        },
        {
            id: 'node-api',
            name: 'API Node.js',
            description: 'Backend Node.js com Express e MongoDB',
            category: 'Backend',
            icon: <Database className="w-6 h-6" />,
            files: [
                {
                    name: 'server.js',
                    content: `const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/fenix-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
  console.log('🚀 Conectado ao MongoDB!');
});

// Schema do usuário
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Rotas
app.get('/', (req, res) => {
  res.json({ message: '🚀 Fenix API funcionando!' });
});

// GET - Listar usuários
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Criar usuário
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(\`🚀 Servidor rodando na porta \${PORT}\`);
});`,
                    language: 'javascript'
                },
                {
                    name: 'package.json',
                    content: `{
  "name": "fenix-api",
  "version": "1.0.0",
  "description": "API Node.js para Fenix Academy",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "mongoose": "^7.5.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2"
  },
  "keywords": ["fenix", "api", "nodejs", "express"],
  "author": "Fenix Academy",
  "license": "MIT"
}`,
                    language: 'json'
                }
            ]
        },
        {
            id: 'mobile-app',
            name: 'App Mobile',
            description: 'Aplicação React Native para dispositivos móveis',
            category: 'Mobile',
            icon: <Smartphone className="w-6 h-6" />,
            files: [
                {
                    name: 'App.js',
                    content: `import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => {
    setCount(0);
    Alert.alert('Reset', 'Contador zerado!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <View style={styles.header}>
        <Text style={styles.title}>🚀 Fenix Mobile</Text>
        <Text style={styles.subtitle}>Seu primeiro app React Native</Text>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={reset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  counterText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
                    language: 'javascript'
                }
            ]
        }
    ];

    const handleTemplateSelect = (template: ProjectTemplate) => {
        setSelectedTemplate(template);
        setShowTemplates(false);
    };

    const createProjectFromTemplate = () => {
        if (selectedTemplate) {
            const project = {
                name: `${selectedTemplate.name} - ${new Date().toLocaleDateString()}`,
                template: selectedTemplate.id,
                files: selectedTemplate.files,
                createdAt: new Date()
            };
            onProjectCreate(project);
            setSelectedTemplate(null);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const project = JSON.parse(e.target?.result as string);
                    onProjectImport(project);
                    setShowImport(false);
                } catch (error) {
                    alert('Arquivo inválido. Por favor, selecione um arquivo de projeto válido.');
                }
            };
            reader.readAsText(file);
        }
    };

    const exportProject = () => {
        // Simular exportação de projeto
        const project = {
            name: 'Meu Projeto Fenix',
            files: [
                { name: 'index.html', content: '<!DOCTYPE html>...', language: 'html' },
                { name: 'styles.css', content: 'body { ... }', language: 'css' },
                { name: 'script.js', content: 'console.log("Hello!");', language: 'javascript' }
            ],
            createdAt: new Date()
        };

        const dataStr = JSON.stringify(project, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'projeto-fenix.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-200">Gerenciador de Projetos</h2>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <FolderPlus className="w-4 h-4" />
                        <span>Novo Projeto</span>
                    </button>

                    <button
                        onClick={() => setShowImport(!showImport)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Upload className="w-4 h-4" />
                        <span>Importar</span>
                    </button>

                    <button
                        onClick={exportProject}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        <span>Exportar</span>
                    </button>
                </div>
            </div>

            {/* Templates de Projetos */}
            {showTemplates && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-4">Templates Disponíveis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projectTemplates.map(template => (
                            <div
                                key={template.id}
                                className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border-2 border-transparent hover:border-blue-500"
                                onClick={() => handleTemplateSelect(template)}
                            >
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="text-blue-400">
                                        {template.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-200">{template.name}</h4>
                                        <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                                            {template.category}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300">{template.description}</p>
                                <div className="mt-3 text-xs text-gray-400">
                                    {template.files.length} arquivos
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Template Selecionado */}
            {selectedTemplate && (
                <div className="mb-6 bg-gray-700 p-4 rounded-lg border-2 border-blue-500">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-200">
                            Template Selecionado: {selectedTemplate.name}
                        </h3>
                        <button
                            onClick={() => setSelectedTemplate(null)}
                            className="text-gray-400 hover:text-gray-300"
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-gray-300 mb-3">{selectedTemplate.description}</p>
                    <div className="flex space-x-3">
                        <button
                            onClick={createProjectFromTemplate}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Criar Projeto
                        </button>
                        <button
                            onClick={() => setSelectedTemplate(null)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Importar Projeto */}
            {showImport && (
                <div className="bg-gray-700 p-4 rounded-lg border-2 border-green-500">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Importar Projeto</h3>
                    <p className="text-gray-300 mb-3">
                        Selecione um arquivo .json de projeto para importar
                    </p>
                    <div className="flex space-x-3">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="bg-gray-600 text-white px-3 py-2 rounded-lg border-none"
                        />
                        <button
                            onClick={() => setShowImport(false)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Projetos Recentes */}
            <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-4">Projetos Recentes</h3>
                <div className="space-y-3">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-blue-400" />
                                <div>
                                    <h4 className="font-medium text-gray-200">Site Pessoal</h4>
                                    <p className="text-sm text-gray-400">Última edição: há 2 horas</p>
                                </div>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                Abrir
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Code className="w-5 h-5 text-green-400" />
                                <div>
                                    <h4 className="font-medium text-gray-200">App React</h4>
                                    <p className="text-sm text-gray-400">Última edição: ontem</p>
                                </div>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                Abrir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectManager;
