#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de códigos de exemplo específicos e detalhados para cada tipo de curso.
"""

from typing import Dict, Any

class SimpleDetailedExamples:
    """Gerador de códigos específicos e detalhados."""
    
    def get_backend_example(self, lesson_data: Dict[str, Any]) -> str:
        """Exemplo detalhado para backend."""
        title = lesson_data.get('title', 'Aula')
        course = lesson_data.get('course', 'Curso')
        module = lesson_data.get('module', 'Módulo')
        
        return f"""// Sistema Backend Completo - {title}
// Curso: {course}
// Módulo: {module}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

class BackendSystem {{
  constructor() {{
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }}
  
  setupMiddleware() {{
    // Segurança
    this.app.use(helmet());
    this.app.use(cors({{
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      credentials: true
    }}));
    
    // Rate limiting
    const limiter = rateLimit({{
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // máximo 100 requests por IP
      message: 'Muitas requisições deste IP, tente novamente em 15 minutos'
    }});
    this.app.use('/api/', limiter);
    
    // Body parsing
    this.app.use(express.json({{ limit: '10mb' }}));
    this.app.use(express.urlencoded({{ extended: true }}));
  }}
  
  setupRoutes() {{
    // Rota de health check
    this.app.get('/health', (req, res) => {{
      res.json({{ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      }});
    }});
    
    // Rotas de exemplo
    this.app.get('/api/exemplo', this.getExemplo.bind(this));
    this.app.post('/api/exemplo', this.createExemplo.bind(this));
  }}
  
  async getExemplo(req, res) {{
    try {{
      res.json({{
        success: true,
        message: 'Exemplo executado com sucesso',
        data: {{
          timestamp: new Date().toISOString(),
          lesson: '{title}',
          course: '{course}'
        }}
      }});
    }} catch (error) {{
      console.error('Erro no exemplo:', error);
      res.status(500).json({{
        success: false,
        message: 'Erro interno do servidor'
      }});
    }}
  }}
  
  async createExemplo(req, res) {{
    try {{
      const {{ data }} = req.body;
      
      // Processar dados
      const resultado = this.processarDados(data);
      
      res.status(201).json({{
        success: true,
        message: 'Exemplo criado com sucesso',
        data: resultado
      }});
    }} catch (error) {{
      console.error('Erro ao criar exemplo:', error);
      res.status(500).json({{
        success: false,
        message: 'Erro interno do servidor'
      }});
    }}
  }}
  
  processarDados(data) {{
    return {{
      id: Date.now(),
      processedAt: new Date().toISOString(),
      originalData: data,
      processedData: data ? data.toUpperCase() : null
    }};
  }}
  
  setupErrorHandling() {{
    // 404 handler
    this.app.use('*', (req, res) => {{
      res.status(404).json({{
        success: false,
        message: 'Rota não encontrada'
      }});
    }});
    
    // Error handler global
    this.app.use((error, req, res, next) => {{
      console.error('Erro não tratado:', error);
      res.status(500).json({{
        success: false,
        message: 'Erro interno do servidor'
      }});
    }});
  }}
  
  start() {{
    this.app.listen(this.port, () => {{
      console.log(`🚀 Servidor rodando na porta ${{this.port}}`);
      console.log(`📊 Health check: http://localhost:${{this.port}}/health`);
    }});
  }}
}}

// Inicializar sistema
const backendSystem = new BackendSystem();
backendSystem.start();

module.exports = BackendSystem;
"""

    def get_frontend_example(self, lesson_data: Dict[str, Any]) -> str:
        """Exemplo detalhado para frontend."""
        title = lesson_data.get('title', 'Aula')
        course = lesson_data.get('course', 'Curso')
        module = lesson_data.get('module', 'Módulo')
        component_name = title.replace(' ', '')
        
        return f"""// Componente React Completo - {title}
// Curso: {course}
// Módulo: {module}

import React, {{ useState, useEffect, useCallback }} from 'react';
import {{ Card, CardContent, CardHeader, CardTitle }} from '@/components/ui/card';
import {{ Button }} from '@/components/ui/button';
import {{ Input }} from '@/components/ui/input';
import {{ Badge }} from '@/components/ui/badge';

const {component_name}Component = () => {{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar dados
  const loadData = useCallback(async () => {{
    try {{
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/exemplo');
      if (!response.ok) {{
        throw new Error('Erro ao carregar dados');
      }}
      
      const result = await response.json();
      setData(result.data || []);
    }} catch (err) {{
      setError(err.message);
      console.error('Erro ao carregar dados:', err);
    }} finally {{
      setLoading(false);
    }}
  }}, []);

  // Filtrar dados
  const filteredData = data.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Efeito para carregar dados
  useEffect(() => {{
    loadData();
  }}, [loadData]);

  // Manipular busca
  const handleSearch = (e) => {{
    setSearchTerm(e.target.value);
  }};

  // Manipular criação
  const handleCreate = async (newData) => {{
    try {{
      setLoading(true);
      
      const response = await fetch('/api/exemplo', {{
        method: 'POST',
        headers: {{
          'Content-Type': 'application/json',
        }},
        body: JSON.stringify({{ data: newData }}),
      }});
      
      if (!response.ok) {{
        throw new Error('Erro ao criar item');
      }}
      
      const result = await response.json();
      setData(prev => [...prev, result.data]);
    }} catch (err) {{
      setError(err.message);
    }} finally {{
      setLoading(false);
    }}
  }};

  if (loading) {{
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }}

  if (error) {{
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-red-600 mb-2">Erro</h3>
        <p className="text-gray-600 mb-4">{{error}}</p>
        <Button onClick={{loadData}}>Tentar Novamente</Button>
      </div>
    );
  }}

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {title}
          </CardTitle>
          <p className="text-gray-600">
            Curso: {course} | Módulo: {module}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Input
                placeholder="Buscar..."
                value={{{searchTerm}}}
                onChange={{{handleSearch}}}
                className="flex-1"
              />
              <Button onClick={() => handleCreate({{name: 'Novo Item'}})}>
                Adicionar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {{{filteredData.map((item, index) => (
                <Card key={{{index}}} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{{{{item.name || 'Item'}}}}</h3>
                      <Badge variant="secondary">
                        {{{{item.status || 'Ativo'}}}}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {{{{item.description || 'Descrição não disponível'}}}}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      {{{{new Date(item.createdAt || Date.now()).toLocaleDateString('pt-BR')}}}}
                    </div>
                  </CardContent>
                </Card>
              ))}}
            </div>

            {{{filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum item encontrado</p>
              </div>
            )}}}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}};

export default {component_name}Component;
"""

    def get_mobile_example(self, lesson_data: Dict[str, Any]) -> str:
        """Exemplo detalhado para mobile."""
        title = lesson_data.get('title', 'Aula')
        course = lesson_data.get('course', 'Curso')
        module = lesson_data.get('module', 'Módulo')
        screen_name = title.replace(' ', '')
        
        return f"""// Componente React Native Completo - {title}
// Curso: {course}
// Módulo: {module}

import React, {{ useState, useEffect }} from 'react';
import {{
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl
}} from 'react-native';
import {{ Ionicons }} from '@expo/vector-icons';

const {screen_name}Screen = () => {{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar dados
  const loadData = async () => {{
    try {{
      setLoading(true);
      
      const response = await fetch('/api/exemplo');
      if (!response.ok) {{
        throw new Error('Erro ao carregar dados');
      }}
      
      const result = await response.json();
      setData(result.data || []);
    }} catch (error) {{
      Alert.alert('Erro', error.message);
      console.error('Erro ao carregar dados:', error);
    }} finally {{
      setLoading(false);
    }}
  }};

  // Atualizar dados
  const onRefresh = async () => {{
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }};

  // Filtrar dados
  const filteredData = data.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Efeito para carregar dados
  useEffect(() => {{
    loadData();
  }}, []);

  // Renderizar item da lista
  const renderItem = ({{ item, index }}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={{() => Alert.alert('Item', `Clicou no item ${{index + 1}}`)}}
    >
      <View style={{{styles.itemContent}}}>
        <View style={{{styles.itemHeader}}}>
          <Text style={{{styles.itemTitle}}}>{{{{item.name || 'Item'}}}}</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
        <Text style={{{styles.itemDescription}}}>
          {{{{item.description || 'Descrição não disponível'}}}}
        </Text>
        <View style={{{styles.itemFooter}}}>
          <Text style={{{styles.itemDate}}}>
            {{{{new Date(item.createdAt || Date.now()).toLocaleDateString('pt-BR')}}}}
          </Text>
          <View style={{{styles.statusBadge}}}>
            <Text style={{{styles.statusText}}}>
              {{{{item.status || 'Ativo'}}}}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Renderizar header da lista
  const renderHeader = () => (
    <View style={{{styles.header}}}>
      <Text style={{{styles.title}}}>
        {title}
      </Text>
      <Text style={{{styles.subtitle}}}>
        Curso: {course}
      </Text>
      <TextInput
        style={{{styles.searchInput}}}
        placeholder="Buscar..."
        value={{{searchTerm}}}
        onChangeText={{{setSearchTerm}}}
        placeholderTextColor="#999"
      />
    </View>
  );

  // Renderizar item vazio
  const renderEmpty = () => (
    <View style={{{styles.emptyContainer}}}>
      <Ionicons name="search-outline" size={64} color="#ccc" />
      <Text style={{{styles.emptyText}}}>
        Nenhum item encontrado
      </Text>
    </View>
  );

  if (loading && !refreshing) {{
    return (
      <View style={{{styles.loadingContainer}}}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{{styles.loadingText}}}>Carregando...</Text>
      </View>
    );
  }}

  return (
    <View style={{{styles.container}}}>
      <FlatList
        data={{{filteredData}}}
        renderItem={{{renderItem}}}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={{{renderHeader}}}
        ListEmptyComponent={{{renderEmpty}}}
        refreshControl={{
          <RefreshControl
            refreshing={{{refreshing}}}
            onRefresh={{{onRefresh}}}
            colors={{{['#007AFF']}}}
            tintColor="#007AFF"
          />
        }}
        showsVerticalScrollIndicator={{{false}}}
        contentContainerStyle={{{styles.listContainer}}}
      />
    </View>
  );
}};

const styles = StyleSheet.create({{
  container: {{
    flex: 1,
    backgroundColor: '#f5f5f5',
  }},
  loadingContainer: {{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  }},
  loadingText: {{
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  }},
  header: {{
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }},
  title: {{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  }},
  subtitle: {{
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  }},
  searchInput: {{
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  }},
  listContainer: {{
    paddingBottom: 20,
  }},
  itemContainer: {{
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {{
      width: 0,
      height: 2,
    }},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  }},
  itemContent: {{
    padding: 16,
  }},
  itemHeader: {{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }},
  itemTitle: {{
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  }},
  itemDescription: {{
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  }},
  itemFooter: {{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }},
  itemDate: {{
    fontSize: 12,
    color: '#999',
  }},
  statusBadge: {{
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  }},
  statusText: {{
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  }},
  emptyContainer: {{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  }},
  emptyText: {{
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  }},
}});

export default {screen_name}Screen;
"""

    def get_data_science_example(self, lesson_data: Dict[str, Any]) -> str:
        """Exemplo detalhado para data science."""
        title = lesson_data.get('title', 'Aula')
        course = lesson_data.get('course', 'Curso')
        module = lesson_data.get('module', 'Módulo')
        
        return f"""# Análise de Dados Completa - {title}
# Curso: {course}
# Módulo: {module}

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import warnings
warnings.filterwarnings('ignore')

class DataAnalysisSystem:
    def __init__(self):
        self.data = None
        self.model = None
        self.results = {{}}
        
    def load_data(self, file_path=None):
        \"\"\"Carregar dados do arquivo ou gerar dados de exemplo.\"\"\"
        if file_path:
            self.data = pd.read_csv(file_path)
        else:
            # Gerar dados de exemplo
            np.random.seed(42)
            n_samples = 1000
            
            self.data = pd.DataFrame({{
                'age': np.random.randint(18, 80, n_samples),
                'income': np.random.normal(50000, 20000, n_samples),
                'education_years': np.random.randint(8, 20, n_samples),
                'experience_years': np.random.randint(0, 40, n_samples),
                'satisfaction_score': np.random.uniform(1, 10, n_samples),
                'target': np.random.randint(0, 2, n_samples)
            }})
            
        print(f"Dados carregados: {{self.data.shape[0]}} linhas, {{self.data.shape[1]}} colunas")
        return self.data
    
    def explore_data(self):
        \"\"\"Explorar os dados com estatísticas descritivas.\"\"\"
        print("=== EXPLORAÇÃO DOS DADOS ===")
        print("\\nInformações gerais:")
        print(self.data.info())
        
        print("\\nEstatísticas descritivas:")
        print(self.data.describe())
        
        print("\\nValores nulos:")
        print(self.data.isnull().sum())
        
        print("\\nTipos de dados:")
        print(self.data.dtypes)
        
        # Visualizações
        self._create_visualizations()
        
    def _create_visualizations(self):
        \"\"\"Criar visualizações dos dados.\"\"\"
        plt.style.use('seaborn-v0_8')
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        
        # Histograma de idade
        axes[0, 0].hist(self.data['age'], bins=20, alpha=0.7, color='skyblue')
        axes[0, 0].set_title('Distribuição de Idade')
        axes[0, 0].set_xlabel('Idade')
        axes[0, 0].set_ylabel('Frequência')
        
        # Scatter plot renda vs satisfação
        axes[0, 1].scatter(self.data['income'], self.data['satisfaction_score'], 
                          alpha=0.6, color='coral')
        axes[0, 1].set_title('Renda vs Satisfação')
        axes[0, 1].set_xlabel('Renda')
        axes[0, 1].set_ylabel('Pontuação de Satisfação')
        
        # Box plot por educação
        education_groups = self.data.groupby('education_years')['satisfaction_score']
        education_data = [group.values for name, group in education_groups]
        axes[1, 0].boxplot(education_data)
        axes[1, 0].set_title('Satisfação por Anos de Educação')
        axes[1, 0].set_xlabel('Anos de Educação')
        axes[1, 0].set_ylabel('Pontuação de Satisfação')
        
        # Correlação
        correlation_matrix = self.data.corr()
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', 
                   center=0, ax=axes[1, 1])
        axes[1, 1].set_title('Matriz de Correlação')
        
        plt.tight_layout()
        plt.show()
        
    def preprocess_data(self):
        \"\"\"Pré-processar os dados para modelagem.\"\"\"
        print("\\n=== PRÉ-PROCESSAMENTO ===")
        
        # Remover outliers usando IQR
        numeric_columns = self.data.select_dtypes(include=[np.number]).columns
        for col in numeric_columns:
            Q1 = self.data[col].quantile(0.25)
            Q3 = self.data[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            self.data = self.data[(self.data[col] >= lower_bound) & 
                                (self.data[col] <= upper_bound)]
        
        print(f"Dados após remoção de outliers: {{self.data.shape[0]}} linhas")
        
        # Normalizar dados numéricos
        from sklearn.preprocessing import StandardScaler
        scaler = StandardScaler()
        
        feature_columns = ['age', 'income', 'education_years', 'experience_years', 'satisfaction_score']
        self.data[feature_columns] = scaler.fit_transform(self.data[feature_columns])
        
        print("Dados normalizados com sucesso")
        
    def build_model(self):
        \"\"\"Construir modelo de machine learning.\"\"\"
        print("\\n=== CONSTRUÇÃO DO MODELO ===")
        
        # Separar features e target
        feature_columns = ['age', 'income', 'education_years', 'experience_years', 'satisfaction_score']
        X = self.data[feature_columns]
        y = self.data['target']
        
        # Dividir dados
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print(f"Dados de treino: {{X_train.shape[0]}} amostras")
        print(f"Dados de teste: {{X_test.shape[0]}} amostras")
        
        # Treinar modelo
        self.model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            max_depth=10,
            min_samples_split=5
        )
        
        self.model.fit(X_train, y_train)
        print("Modelo treinado com sucesso")
        
        # Fazer previsões
        y_pred = self.model.predict(X_test)
        
        # Avaliar modelo
        accuracy = accuracy_score(y_test, y_pred)
        print(f"\\nAcurácia do modelo: {{accuracy:.3f}}")
        
        # Relatório de classificação
        print("\\nRelatório de Classificação:")
        print(classification_report(y_test, y_pred))
        
        # Matriz de confusão
        cm = confusion_matrix(y_test, y_pred)
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
        plt.title('Matriz de Confusão')
        plt.xlabel('Predito')
        plt.ylabel('Real')
        plt.show()
        
        # Importância das features
        feature_importance = pd.DataFrame({{
            'feature': feature_columns,
            'importance': self.model.feature_importances_
        }}).sort_values('importance', ascending=False)
        
        plt.figure(figsize=(10, 6))
        sns.barplot(data=feature_importance, x='importance', y='feature')
        plt.title('Importância das Features')
        plt.xlabel('Importância')
        plt.tight_layout()
        plt.show()
        
        self.results = {{
            'accuracy': accuracy,
            'feature_importance': feature_importance,
            'y_test': y_test,
            'y_pred': y_pred
        }}
        
    def generate_report(self):
        \"\"\"Gerar relatório final da análise.\"\"\"
        print("\\n=== RELATÓRIO FINAL ===")
        print(f"Curso: {course}")
        print(f"Módulo: {module}")
        print(f"Aula: {title}")
        print(f"\\nResultados:")
        print(f"- Acurácia: {{self.results.get('accuracy', 0):.3f}}")
        print(f"- Total de amostras: {{self.data.shape[0]}}")
        print(f"- Features utilizadas: {{len(self.data.columns) - 1}}")
        
        print("\\nTop 3 features mais importantes:")
        top_features = self.results.get('feature_importance', pd.DataFrame()).head(3)
        for _, row in top_features.iterrows():
            print(f"- {{row['feature']}}: {{row['importance']:.3f}}")

# Executar análise
if __name__ == "__main__":
    # Criar instância do sistema
    analysis_system = DataAnalysisSystem()
    
    # Carregar dados
    analysis_system.load_data()
    
    # Explorar dados
    analysis_system.explore_data()
    
    # Pré-processar
    analysis_system.preprocess_data()
    
    # Construir modelo
    analysis_system.build_model()
    
    # Gerar relatório
    analysis_system.generate_report()
    
    print("\\n✅ Análise concluída com sucesso!")
"""

    def get_devops_example(self, lesson_data: Dict[str, Any]) -> str:
        """Exemplo detalhado para DevOps."""
        title = lesson_data.get('title', 'Aula')
        course = lesson_data.get('course', 'Curso')
        module = lesson_data.get('module', 'Módulo')
        
        return f"""# Pipeline DevOps Completo - {title}
# Curso: {course}
# Módulo: {module}

# Dockerfile otimizado
FROM node:18-alpine AS builder

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Estágio de produção
FROM node:18-alpine AS production

# Instalar dependências de runtime
RUN apk add --no-cache dumb-init

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nextjs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar dependências do estágio anterior
COPY --from=builder /app/node_modules ./node_modules

# Copiar código da aplicação
COPY --chown=nextjs:nodejs . .

# Expor porta
EXPOSE 3000

# Configurar usuário
USER nextjs

# Comando de inicialização
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

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

# CI/CD Pipeline (GitHub Actions)
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linting
      run: npm run lint

    - name: Run tests
      run: npm test
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

    - name: Run security audit
      run: npm audit --audit-level moderate

    - name: Build application
      run: npm run build

  security:
    runs-on: ubuntu-latest
    needs: test

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  build-and-push:
    runs-on: ubuntu-latest
    needs: [test, security]
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Log in to Container Registry
      uses: docker/login-action@v2
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v4
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}

    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}

  deploy:
    runs-on: ubuntu-latest
    needs: build-and-push
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Deploy to production
      run: |
        echo "Deploying to production..."
        # Adicionar comandos de deploy aqui

# Script de monitoramento
#!/bin/bash
# monitor.sh

set -e

echo "🔍 Iniciando monitoramento do sistema..."

# Verificar saúde dos containers
check_containers() {{
    echo "📊 Verificando containers..."
    docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"
    
    # Verificar se todos os containers estão rodando
    if ! docker ps | grep -q "Up"; then
        echo "❌ Alguns containers não estão rodando!"
        exit 1
    fi
    
    echo "✅ Todos os containers estão rodando"
}}

# Verificar logs de erro
check_logs() {{
    echo "📋 Verificando logs de erro..."
    
    # Verificar logs da aplicação
    if docker logs app 2>&1 | grep -i error | tail -10; then
        echo "⚠️  Erros encontrados nos logs da aplicação"
    else
        echo "✅ Nenhum erro nos logs da aplicação"
    fi
}}

# Verificar recursos do sistema
check_resources() {{
    echo "💻 Verificando recursos do sistema..."
    
    # CPU
    cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{{print $2}}' | cut -d'%' -f1)
    echo "CPU Usage: $cpu_usage%"
    
    # Memória
    memory_usage=$(free | grep Mem | awk '{{printf "%.2f", $3/$2 * 100.0}}')
    echo "Memory Usage: $memory_usage%"
    
    # Disco
    disk_usage=$(df -h / | awk 'NR==2{{print $5}}')
    echo "Disk Usage: $disk_usage"
}}

# Verificar conectividade
check_connectivity() {{
    echo "🌐 Verificando conectividade..."
    
    # Verificar se a aplicação responde
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        echo "✅ Aplicação respondendo"
    else
        echo "❌ Aplicação não está respondendo"
        exit 1
    fi
    
    # Verificar banco de dados
    if docker exec db pg_isready -U user -d mydb > /dev/null 2>&1; then
        echo "✅ Banco de dados respondendo"
    else
        echo "❌ Banco de dados não está respondendo"
        exit 1
    fi
}}

# Executar verificações
main() {{
    echo "🚀 Sistema de Monitoramento - {title}"
    echo "Curso: {course}"
    echo "Módulo: {module}"
    echo "=================================="
    
    check_containers
    check_logs
    check_resources
    check_connectivity
    
    echo "✅ Monitoramento concluído com sucesso!"
}}

# Executar se chamado diretamente
if [[ "${{BASH_SOURCE[0]}}" == "${{0}}" ]]; then
    main "$@"
fi
"""












