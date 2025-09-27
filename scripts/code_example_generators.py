#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Geradores de códigos de exemplo específicos para cada tipo de curso.
"""

import os
from typing import Dict, List, Any
from pathlib import Path
from simple_final_examples import SimpleFinalExamples

class CodeExampleGenerator:
    """Gerador de códigos de exemplo específicos por tipo de curso."""
    
    def __init__(self):
        self.templates = self._load_code_templates()
        self.detailed_examples = SimpleFinalExamples()
    
    def _load_code_templates(self) -> Dict[str, Dict[str, str]]:
        """Carrega templates de código para cada tipo de curso."""
        return {
            'backend': self._get_backend_code_templates(),
            'frontend': self._get_frontend_code_templates(),
            'mobile': self._get_mobile_code_templates(),
            'data_science': self._get_data_science_code_templates(),
            'devops': self._get_devops_code_templates(),
            'cybersecurity': self._get_cybersecurity_code_templates()
        }
    
    def generate_code_examples(self, course_type: str, lesson_data: Dict[str, Any], output_path: Path):
        """Gera códigos de exemplo específicos para uma aula."""
        if course_type not in self.templates:
            course_type = 'generic'
        
        examples_path = output_path / "exemplos"
        examples_path.mkdir(exist_ok=True)
        
        # Gerar códigos baseados no tipo de curso
        if course_type == 'backend':
            self._generate_backend_examples(lesson_data, examples_path)
        elif course_type == 'frontend':
            self._generate_frontend_examples(lesson_data, examples_path)
        elif course_type == 'mobile':
            self._generate_mobile_examples(lesson_data, examples_path)
        elif course_type == 'data_science':
            self._generate_data_science_examples(lesson_data, examples_path)
        elif course_type == 'devops':
            self._generate_devops_examples(lesson_data, examples_path)
        elif course_type == 'cybersecurity':
            self._generate_cybersecurity_examples(lesson_data, examples_path)
        else:
            self._generate_generic_examples(lesson_data, examples_path)
    
    def _generate_backend_examples(self, lesson_data: Dict[str, Any], output_path: Path):
        """Gera exemplos específicos para cursos de backend."""
        # Sistema backend completo
        backend_code = self.detailed_examples.get_backend_example(lesson_data)
        self._save_code_file(output_path, "backend-system.js", backend_code)
        
        # API REST básica
        api_code = self._get_rest_api_template(lesson_data)
        self._save_code_file(output_path, "api-rest.js", api_code)
        
        # Modelo de banco de dados
        db_code = self._get_database_model_template(lesson_data)
        self._save_code_file(output_path, "database-model.sql", db_code)
        
        # Middleware de autenticação
        auth_code = self._get_auth_middleware_template(lesson_data)
        self._save_code_file(output_path, "auth-middleware.js", auth_code)
        
        # Testes unitários
        test_code = self._get_unit_test_template(lesson_data)
        self._save_code_file(output_path, "test.js", test_code)
    
    def _generate_frontend_examples(self, lesson_data: Dict[str, Any], output_path: Path):
        """Gera exemplos específicos para cursos de frontend."""
        # Componente React completo
        react_code = self.detailed_examples.get_frontend_example(lesson_data)
        self._save_code_file(output_path, "react-component.jsx", react_code)
        
        # Componente React básico
        basic_react_code = self._get_react_component_template(lesson_data)
        self._save_code_file(output_path, "component.jsx", basic_react_code)
        
        # CSS responsivo
        css_code = self._get_responsive_css_template(lesson_data)
        self._save_code_file(output_path, "styles.css", css_code)
        
        # JavaScript moderno
        js_code = self._get_modern_js_template(lesson_data)
        self._save_code_file(output_path, "script.js", js_code)
        
        # HTML semântico
        html_code = self._get_semantic_html_template(lesson_data)
        self._save_code_file(output_path, "index.html", html_code)
    
    def _generate_mobile_examples(self, lesson_data: Dict[str, Any], output_path: Path):
        """Gera exemplos específicos para cursos de mobile."""
        # Componente React Native completo
        rn_code = self.detailed_examples.get_mobile_example(lesson_data)
        self._save_code_file(output_path, "react-native-screen.js", rn_code)
        
        # Componente React Native básico
        basic_rn_code = self._get_react_native_component_template(lesson_data)
        self._save_code_file(output_path, "component.js", basic_rn_code)
        
        # Navegação
        nav_code = self._get_navigation_template(lesson_data)
        self._save_code_file(output_path, "navigation.js", nav_code)
        
        # Estilos mobile
        styles_code = self._get_mobile_styles_template(lesson_data)
        self._save_code_file(output_path, "styles.js", styles_code)
    
    def _generate_data_science_examples(self, lesson_data: Dict[str, Any], output_path: Path):
        """Gera exemplos específicos para cursos de data science."""
        # Sistema completo de análise de dados
        analysis_code = self.detailed_examples.get_data_science_example(lesson_data)
        self._save_code_file(output_path, "data-analysis-system.py", analysis_code)
        
        # Análise de dados básica
        basic_analysis_code = self._get_data_analysis_template(lesson_data)
        self._save_code_file(output_path, "analysis.py", basic_analysis_code)
        
        # Visualização
        viz_code = self._get_visualization_template(lesson_data)
        self._save_code_file(output_path, "visualization.py", viz_code)
        
        # Machine Learning
        ml_code = self._get_ml_template(lesson_data)
        self._save_code_file(output_path, "ml_model.py", ml_code)
    
    def _generate_devops_examples(self, lesson_data: Dict[str, Any], output_path: Path):
        """Gera exemplos específicos para cursos de DevOps."""
        # Pipeline DevOps completo
        devops_code = self.detailed_examples.get_devops_example(lesson_data)
        self._save_code_file(output_path, "devops-pipeline.sh", devops_code)
        
        # Dockerfile
        docker_code = self._get_dockerfile_template(lesson_data)
        self._save_code_file(output_path, "Dockerfile", docker_code)
        
        # Docker Compose
        compose_code = self._get_docker_compose_template(lesson_data)
        self._save_code_file(output_path, "docker-compose.yml", compose_code)
        
        # CI/CD Pipeline
        cicd_code = self._get_cicd_template(lesson_data)
        self._save_code_file(output_path, "ci.yml", cicd_code)
    
    def _generate_cybersecurity_examples(self, lesson_data: Dict[str, Any], output_path: Path):
        """Gera exemplos específicos para cursos de cybersecurity."""
        # Script de segurança
        security_code = self._get_basic_example_template(lesson_data)
        self._save_code_file(output_path, "security.py", security_code)
        
        # Configuração de firewall
        firewall_code = self._get_basic_example_template(lesson_data)
        self._save_code_file(output_path, "firewall.sh", firewall_code)
    
    def _generate_generic_examples(self, lesson_data: Dict[str, Any], output_path: Path):
        """Gera exemplos genéricos."""
        # Exemplo básico
        basic_code = self._get_basic_example_template(lesson_data)
        self._save_code_file(output_path, "exemplo-basico.js", basic_code)
    
    def _save_code_file(self, output_path: Path, filename: str, content: str):
        """Salva um arquivo de código."""
        file_path = output_path / filename
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    # Templates de código para Backend
    def _get_rest_api_template(self, lesson_data: Dict[str, Any]) -> str:
        title = lesson_data.get('title', 'API').lower().replace(' ', '-')
        return f"""const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.get('/api/{title}', (req, res) => {{
    res.json({{
        success: true,
        message: 'Lista de {title}',
        data: []
    }});
}});

app.post('/api/{title}', (req, res) => {{
    const {{ body }} = req;
    res.status(201).json({{
        success: true,
        message: '{title} criado com sucesso',
        data: body
    }});
}});

app.listen(PORT, () => {{
    console.log(`Servidor rodando na porta ${{PORT}}`);
}});
"""
    
    def _get_database_model_template(self, lesson_data: Dict[str, Any]) -> str:
        title = lesson_data.get('title', 'tabela').lower().replace(' ', '_')
        return f"""-- Modelo de banco de dados para {lesson_data.get('title', 'Sistema')}

CREATE TABLE {title} (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_{title}_nome ON {title}(nome);
CREATE INDEX idx_{title}_ativo ON {title}(ativo);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_{title}_updated_at 
    BEFORE UPDATE ON {title} 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
"""
    
    def _get_auth_middleware_template(self, lesson_data: Dict[str, Any]) -> str:
        return """const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Token de acesso requerido' 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                message: 'Token inválido' 
            });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
"""
    
    def _get_unit_test_template(self, lesson_data: Dict[str, Any]) -> str:
        return """const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
    test('GET /api/health', async () => {
        const response = await request(app)
            .get('/api/health')
            .expect(200);
        
        expect(response.body.success).toBe(true);
    });

    test('POST /api/items', async () => {
        const newItem = {
            nome: 'Teste',
            descricao: 'Item de teste'
        };

        const response = await request(app)
            .post('/api/items')
            .send(newItem)
            .expect(201);
        
        expect(response.body.success).toBe(true);
        expect(response.body.data.nome).toBe(newItem.nome);
    });
});
"""
    
    # Templates de código para Frontend
    def _get_react_component_template(self, lesson_data: Dict[str, Any]) -> str:
        title = lesson_data.get('title', 'Componente')
        return f"""import React, {{ useState, useEffect }} from 'react';
import './styles.css';

const {title.replace(' ', '')} = () => {{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {{
        fetchData();
    }}, []);

    const fetchData = async () => {{
        try {{
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result.data);
        }} catch (error) {{
            console.error('Erro ao buscar dados:', error);
        }} finally {{
            setLoading(false);
        }}
    }};

    if (loading) {{
        return <div className="loading">Carregando...</div>;
    }}

    return (
        <div className="{title.lower().replace(' ', '-')}">
            <h2>{title}</h2>
            <div className="content">
                {{data.map((item, index) => (
                    <div key={{index}} className="item">
                        {{item.nome}}
                    </div>
                ))}}
            </div>
        </div>
    );
}};

export default {title.replace(' ', '')};
"""
    
    def _get_responsive_css_template(self, lesson_data: Dict[str, Any]) -> str:
        return """.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
}

.item {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #dee2e6;
}
"""
    
    def _get_modern_js_template(self, lesson_data: Dict[str, Any]) -> str:
        return """// JavaScript moderno com ES6+
class DataManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    async postData(endpoint, data) {
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}

// Uso da classe
const dataManager = new DataManager('/api');

// Função assíncrona com async/await
const loadData = async () => {
    try {
        const data = await dataManager.fetchData('/items');
        console.log('Dados carregados:', data);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
};

// Arrow functions e destructuring
const processItems = (items) => {
    return items.map(({ id, nome, ...rest }) => ({
        id,
        nome: nome.toUpperCase(),
        ...rest
    }));
};

export { DataManager, loadData, processItems };
"""
    
    def _get_semantic_html_template(self, lesson_data: Dict[str, Any]) -> str:
        return """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Semântica</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav aria-label="Navegação principal">
            <ul>
                <li><a href="#home">Início</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home" aria-labelledby="home-heading">
            <h1 id="home-heading">Bem-vindo</h1>
            <p>Conteúdo principal da página.</p>
        </section>

        <section id="about" aria-labelledby="about-heading">
            <h2 id="about-heading">Sobre</h2>
            <p>Informações sobre o projeto.</p>
        </section>

        <section id="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contato</h2>
            <form>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                
                <label for="message">Mensagem:</label>
                <textarea id="message" name="message" required></textarea>
                
                <button type="submit">Enviar</button>
            </form>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Todos os direitos reservados.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
"""
    
    # Templates para outros tipos de curso (resumidos)
    def _get_react_native_component_template(self, lesson_data: Dict[str, Any]) -> str:
        return """import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Component = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Componente React Native</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Component;
"""
    
    def _get_data_analysis_template(self, lesson_data: Dict[str, Any]) -> str:
        return """import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Carregar dados
df = pd.read_csv('data.csv')

# Análise exploratória
print(df.info())
print(df.describe())

# Visualização
plt.figure(figsize=(10, 6))
sns.histplot(df['coluna'])
plt.title('Distribuição dos Dados')
plt.show()

# Análise estatística
correlation = df.corr()
sns.heatmap(correlation, annot=True)
plt.show()
"""
    
    def _get_dockerfile_template(self, lesson_data: Dict[str, Any]) -> str:
        return """FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
"""
    
    def _get_basic_example_template(self, lesson_data: Dict[str, Any]) -> str:
        return f"""// Exemplo básico para {lesson_data.get('title', 'Aula')}

function exemploBasico() {{
    console.log('Olá, mundo!');
    return 'Exemplo executado com sucesso';
}}

// Exportar função
module.exports = {{ exemploBasico }};
"""
    
    # Métodos auxiliares para templates
    def _get_backend_code_templates(self) -> Dict[str, str]:
        return {
            'api': 'Template de API REST',
            'database': 'Template de banco de dados',
            'auth': 'Template de autenticação'
        }
    
    def _get_frontend_code_templates(self) -> Dict[str, str]:
        return {
            'react': 'Template de componente React',
            'css': 'Template de CSS responsivo',
            'js': 'Template de JavaScript moderno'
        }
    
    def _get_mobile_code_templates(self) -> Dict[str, str]:
        return {
            'react_native': 'Template de React Native',
            'navigation': 'Template de navegação',
            'styles': 'Template de estilos mobile'
        }
    
    def _get_data_science_code_templates(self) -> Dict[str, str]:
        return {
            'analysis': 'Template de análise de dados',
            'visualization': 'Template de visualização',
            'ml': 'Template de machine learning'
        }
    
    def _get_devops_code_templates(self) -> Dict[str, str]:
        return {
            'dockerfile': 'Template de Dockerfile',
            'compose': 'Template de Docker Compose',
            'cicd': 'Template de CI/CD'
        }
    
    def _get_cybersecurity_code_templates(self) -> Dict[str, str]:
        return {
            'security': 'Template de script de segurança',
            'firewall': 'Template de configuração de firewall'
        }
    
    def _get_visualization_template(self, lesson_data: Dict[str, Any]) -> str:
        """Template para visualizações de dados."""
        return """import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Configuração do estilo
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Dados de exemplo
data = pd.DataFrame({
    'x': np.random.randn(100),
    'y': np.random.randn(100),
    'category': np.random.choice(['A', 'B', 'C'], 100)
})

# Gráfico de dispersão
plt.figure(figsize=(10, 6))
sns.scatterplot(data=data, x='x', y='y', hue='category')
plt.title('Gráfico de Dispersão')
plt.xlabel('Variável X')
plt.ylabel('Variável Y')
plt.legend()
plt.show()

# Histograma
plt.figure(figsize=(10, 6))
plt.hist(data['x'], bins=20, alpha=0.7, color='skyblue')
plt.title('Distribuição da Variável X')
plt.xlabel('Valores')
plt.ylabel('Frequência')
plt.show()

# Box plot
plt.figure(figsize=(10, 6))
sns.boxplot(data=data, x='category', y='y')
plt.title('Box Plot por Categoria')
plt.xlabel('Categoria')
plt.ylabel('Valores Y')
plt.show()
"""
    
    def _get_ml_template(self, lesson_data: Dict[str, Any]) -> str:
        """Template para modelos de machine learning."""
        return """from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
import numpy as np

# Carregar dados
# df = pd.read_csv('data.csv')

# Dados de exemplo
np.random.seed(42)
X = np.random.randn(100, 4)
y = np.random.randint(0, 2, 100)

# Dividir dados
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Treinar modelo
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Fazer previsões
y_pred = model.predict(X_test)

# Avaliar modelo
accuracy = accuracy_score(y_test, y_pred)
print(f'Acurácia: {accuracy:.2f}')

print('\\nRelatório de Classificação:')
print(classification_report(y_test, y_pred))

# Importância das features
feature_importance = model.feature_importances_
print('\\nImportância das Features:')
for i, importance in enumerate(feature_importance):
    print(f'Feature {i}: {importance:.3f}')
"""
    
    def _get_docker_compose_template(self, lesson_data: Dict[str, Any]) -> str:
        """Template para Docker Compose."""
        return """version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    driver: bridge
"""
    
    def _get_cicd_template(self, lesson_data: Dict[str, Any]) -> str:
        """Template para CI/CD pipeline."""
        return """name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Build application
      run: npm run build

  security:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Run security audit
      run: npm audit --audit-level moderate
    
    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  deploy:
    runs-on: ubuntu-latest
    needs: [test, security]
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        echo "Deploying to production..."
        # Add your deployment commands here
"""
    
    def _get_navigation_template(self, lesson_data: Dict[str, Any]) -> str:
        """Template para navegação mobile."""
        return """import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importar telas
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Início' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Configurações' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
"""
    
    def _get_mobile_styles_template(self, lesson_data: Dict[str, Any]) -> str:
        """Template para estilos mobile."""
        return """import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    backgroundColor: colors.surface,
  },
});

export const responsive = {
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 414,
  isLargeDevice: width >= 414,
  screenWidth: width,
  screenHeight: height,
};
"""
