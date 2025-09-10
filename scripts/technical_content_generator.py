#!/usr/bin/env python3
"""
Gerador de Conteúdo Técnico Específico - Fenix Academy
Cria conteúdo detalhado, específico e tecnicamente correto para cada tópico
"""

import os
import json
import random
from datetime import datetime
from typing import Dict, List, Any

class TechnicalContentGenerator:
    def __init__(self):
        self.brazilian_companies = {
            'fintech': ['Nubank', 'Stone', 'PagSeguro', 'XP Inc', 'C6 Bank'],
            'ecommerce': ['Mercado Livre', 'Magazine Luiza', 'Americanas', 'Submarino', 'Netshoes'],
            'tech': ['iFood', '99', 'Rappi', 'PicPay', 'QuintoAndar'],
            'banking': ['Itaú', 'Bradesco', 'Santander', 'Banco do Brasil', 'Caixa'],
            'retail': ['Lojas Renner', 'Riachuelo', 'C&A', 'Marisa', 'Hering'],
            'media': ['Globo', 'Record', 'SBT', 'Band', 'RedeTV'],
            'automotive': ['Volkswagen', 'Fiat', 'Ford', 'GM', 'Honda'],
            'energy': ['Petrobras', 'Vale', 'Ambev', 'Braskem', 'Ultrapar']
        }
        
        # Conteúdo técnico específico por tópico
        self.technical_content = {
            'React 18 e Novas Features': {
                'concepts': {
                    'fundamentals': [
                        'React 18 introduziu o Concurrent Rendering, permitindo interrupção de renderizações para priorizar atualizações mais urgentes',
                        'O novo hook useId() gera IDs únicos estáveis para acessibilidade e formulários',
                        'Suspense agora suporta Server Components e streaming de dados',
                        'Automatic Batching otimiza re-renderizações agrupando múltiplas atualizações de estado'
                    ],
                    'implementation': [
                        'Concurrent Features requerem React 18+ e devem ser habilitadas com createRoot()',
                        'useTransition() permite marcar atualizações como não urgentes',
                        'useDeferredValue() adia atualizações de valores para melhorar performance',
                        'Suspense boundaries podem ser aninhados para controle granular de loading'
                    ],
                    'best_practices': [
                        'Use startTransition() para atualizações que podem ser interrompidas',
                        'Implemente Error Boundaries para capturar erros de Suspense',
                        'Prefira useDeferredValue() para valores derivados de props/state',
                        'Configure Suspense com fallbacks apropriados para cada contexto'
                    ]
                },
                'code_examples': {
                    'basic': '''// React 18 - Concurrent Features
import { createRoot } from 'react-dom/client';
import { useState, useTransition, useDeferredValue } from 'react';

function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);
  
  const deferredQuery = useDeferredValue(query);
  
  const handleSearch = (newQuery) => {
    startTransition(() => {
      setResults(performSearch(newQuery));
    });
  };
  
  return (
    <div>
      {isPending && <div>Buscando...</div>}
      {results.map(result => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}

// Uso do createRoot
const root = createRoot(document.getElementById('root'));
root.render(<App />);''',
                    'advanced': '''// React 18 - Server Components com Suspense
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <Suspense fallback={<div>Carregando componente pesado...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

// Hook personalizado para transições
function useAsyncTransition() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  
  const runAsync = useCallback(async (asyncFn) => {
    startTransition(async () => {
      try {
        setError(null);
        await asyncFn();
      } catch (err) {
        setError(err);
      }
    });
  }, []);
  
  return { isPending, error, runAsync };
}'''
                },
                'exercises': {
                    'basic': {
                        'title': 'Implementando Concurrent Features',
                        'description': 'Crie um componente de busca que usa useTransition e useDeferredValue',
                        'steps': [
                            'Configure React 18 com createRoot()',
                            'Implemente um campo de busca com debounce',
                            'Use useTransition() para marcar a busca como não urgente',
                            'Implemente useDeferredValue() para o valor da busca',
                            'Adicione indicador de loading durante a busca'
                        ],
                        'validation': [
                            'Verifique se o componente não bloqueia a UI durante a busca',
                            'Confirme que o indicador de loading aparece corretamente',
                            'Teste a interrupção de buscas anteriores'
                        ]
                    },
                    'intermediate': {
                        'title': 'Suspense com Server Components',
                        'description': 'Implemente um sistema de carregamento com Suspense boundaries',
                        'steps': [
                            'Crie componentes que fazem fetch de dados',
                            'Implemente Suspense boundaries aninhados',
                            'Configure fallbacks apropriados para cada nível',
                            'Adicione Error Boundaries para capturar erros',
                            'Implemente retry logic para falhas de rede'
                        ],
                        'validation': [
                            'Verifique se os fallbacks aparecem na ordem correta',
                            'Confirme que erros são capturados adequadamente',
                            'Teste o comportamento com conexão lenta'
                        ]
                    },
                    'advanced': {
                        'title': 'Sistema Completo de Performance',
                        'description': 'Crie uma aplicação que demonstre todas as features do React 18',
                        'steps': [
                            'Implemente roteamento com Suspense',
                            'Configure lazy loading de rotas',
                            'Use useTransition() para navegação',
                            'Implemente cache de dados com useDeferredValue()',
                            'Adicione métricas de performance'
                        ],
                        'validation': [
                            'Meça o tempo de carregamento inicial',
                            'Verifique a fluidez da navegação',
                            'Confirme que os dados são cacheados corretamente'
                        ]
                    }
                }
            },
            'Introdução ao Node.js': {
                'concepts': {
                    'fundamentals': [
                        'Node.js é um runtime JavaScript baseado no V8 engine do Chrome',
                        'Event Loop permite operações não-bloqueantes usando callbacks, Promises e async/await',
                        'NPM é o gerenciador de pacotes padrão com mais de 2 milhões de pacotes',
                        'CommonJS é o sistema de módulos padrão, mas ES6 modules são suportados'
                    ],
                    'implementation': [
                        'Express.js é o framework web mais popular com middleware flexível',
                        'Middleware são funções que executam entre request e response',
                        'Roteamento pode ser definido com métodos HTTP específicos',
                        'Validação de dados deve ser implementada com bibliotecas como Joi ou Yup'
                    ],
                    'best_practices': [
                        'Use async/await ao invés de callbacks para melhor legibilidade',
                        'Implemente tratamento de erros centralizado com middleware',
                        'Configure CORS adequadamente para APIs públicas',
                        'Use helmet.js para headers de segurança'
                    ]
                },
                'code_examples': {
                    'basic': '''// Node.js - API REST básica com Express
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});''',
                    'advanced': '''// Node.js - API avançada com validação e autenticação
const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});

app.use(limiter);

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Validação de dados
const validateUser = [
  body('name').isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
];

// Rota protegida com validação
app.post('/api/users', authenticateToken, validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});'''
                },
                'exercises': {
                    'basic': {
                        'title': 'API REST Básica',
                        'description': 'Crie uma API REST para gerenciar usuários',
                        'steps': [
                            'Configure Express.js com middleware básico',
                            'Implemente rotas CRUD para usuários',
                            'Adicione validação de dados de entrada',
                            'Configure tratamento de erros',
                            'Teste todas as rotas com Postman'
                        ],
                        'validation': [
                            'Verifique se todas as rotas retornam status codes corretos',
                            'Confirme que a validação funciona adequadamente',
                            'Teste o tratamento de erros com dados inválidos'
                        ]
                    },
                    'intermediate': {
                        'title': 'API com Autenticação JWT',
                        'description': 'Implemente autenticação e autorização',
                        'steps': [
                            'Configure JWT para autenticação',
                            'Implemente middleware de autenticação',
                            'Crie rotas de login e registro',
                            'Proteja rotas sensíveis',
                            'Implemente refresh tokens'
                        ],
                        'validation': [
                            'Teste o fluxo completo de autenticação',
                            'Verifique se rotas protegidas funcionam corretamente',
                            'Confirme que tokens expirados são rejeitados'
                        ]
                    },
                    'advanced': {
                        'title': 'API Escalável com Microserviços',
                        'description': 'Crie uma arquitetura de microserviços',
                        'steps': [
                            'Separe responsabilidades em serviços distintos',
                            'Implemente comunicação entre serviços',
                            'Configure load balancing',
                            'Adicione monitoramento e logging',
                            'Implemente circuit breaker pattern'
                        ],
                        'validation': [
                            'Teste a comunicação entre serviços',
                            'Verifique o comportamento com falhas',
                            'Confirme que o load balancing funciona'
                        ]
                    }
                }
            },
            'Introdução ao Python para Dados': {
                'concepts': {
                    'fundamentals': [
                        'Python é a linguagem mais popular para Data Science devido à sua simplicidade e bibliotecas poderosas',
                        'NumPy fornece arrays multidimensionais eficientes para computação numérica',
                        'Pandas oferece estruturas de dados flexíveis para manipulação e análise de dados',
                        'Matplotlib e Seaborn são bibliotecas essenciais para visualização de dados'
                    ],
                    'implementation': [
                        'Use Jupyter Notebooks para desenvolvimento interativo e documentação',
                        'DataFrames do Pandas são ideais para dados tabulares com operações vetorizadas',
                        'NumPy arrays são otimizados para operações matemáticas em grandes volumes de dados',
                        'Scikit-learn oferece algoritmos de Machine Learning prontos para uso'
                    ],
                    'best_practices': [
                        'Sempre use virtual environments para isolar dependências',
                        'Documente seu código com docstrings e comentários claros',
                        'Use type hints para melhor legibilidade e manutenção',
                        'Implemente testes unitários para funções críticas de análise'
                    ]
                },
                'code_examples': {
                    'basic': '''# Python Data Science - Análise básica com Pandas
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Carregar dados
df = pd.read_csv('dados.csv')

# Análise exploratória
print(df.head())
print(df.info())
print(df.describe())

# Visualização básica
df['coluna'].hist()
plt.title('Distribuição da Coluna')
plt.show()''',
                    'advanced': '''# Python Data Science - Pipeline completo de ML
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Carregar e preparar dados
df = pd.read_csv('dados.csv')
X = df.drop('target', axis=1)
y = df['target']

# Dividir dados
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Normalizar features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Treinar modelo
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train_scaled, y_train)

# Avaliar modelo
y_pred = model.predict(X_test_scaled)
print(classification_report(y_test, y_pred))'''
                },
                'exercises': {
                    'basic': {
                        'title': 'Análise Exploratória de Dados',
                        'description': 'Realize análise exploratória completa de um dataset',
                        'steps': [
                            'Carregue um dataset usando pandas',
                            'Execute análise descritiva básica',
                            'Identifique valores ausentes e outliers',
                            'Crie visualizações para entender a distribuição dos dados',
                            'Gere relatório com insights principais'
                        ],
                        'validation': [
                            'Verifique se todas as estatísticas descritivas foram calculadas',
                            'Confirme que os gráficos estão corretos e informativos',
                            'Teste se o relatório contém insights relevantes'
                        ]
                    },
                    'intermediate': {
                        'title': 'Modelo de Machine Learning',
                        'description': 'Desenvolva um modelo de classificação completo',
                        'steps': [
                            'Prepare e limpe os dados adequadamente',
                            'Divida os dados em treino e teste',
                            'Normalize as features se necessário',
                            'Treine um modelo de classificação',
                            'Avalie o desempenho com métricas apropriadas'
                        ],
                        'validation': [
                            'Verifique se o modelo foi treinado corretamente',
                            'Confirme que as métricas de avaliação são apropriadas',
                            'Teste se o pipeline está funcionando end-to-end'
                        ]
                    },
                    'advanced': {
                        'title': 'Sistema de ML em Produção',
                        'description': 'Implemente um sistema completo de ML para produção',
                        'steps': [
                            'Crie pipeline de dados reprodutível',
                            'Implemente validação de dados robusta',
                            'Adicione monitoramento de modelo',
                            'Configure retreinamento automático',
                            'Implemente API para servir predições'
                        ],
                        'validation': [
                            'Teste se o pipeline é reprodutível',
                            'Verifique se o monitoramento está funcionando',
                            'Confirme que a API está servindo predições corretas'
                        ]
                    }
                }
            },
            'Docker Fundamentos': {
                'concepts': {
                    'fundamentals': [
                        'Docker containeriza aplicações com todas as dependências em um ambiente isolado',
                        'Containers são mais leves que VMs pois compartilham o kernel do host',
                        'Imagens Docker são templates imutáveis que definem o ambiente da aplicação',
                        'Dockerfile é um script que automatiza a criação de imagens Docker'
                    ],
                    'implementation': [
                        'Use multi-stage builds para otimizar o tamanho das imagens',
                        'Implemente health checks para monitorar a saúde dos containers',
                        'Configure volumes para persistir dados entre reinicializações',
                        'Use Docker Compose para orquestrar múltiplos containers'
                    ],
                    'best_practices': [
                        'Sempre use imagens base oficiais e específicas (não latest)',
                        'Minimize o número de layers no Dockerfile',
                        'Use .dockerignore para excluir arquivos desnecessários',
                        'Implemente princípio de menor privilégio nos containers'
                    ]
                },
                'code_examples': {
                    'basic': '''# Dockerfile básico para aplicação Node.js
FROM node:18-alpine

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm ci --only=production

# Copiar código da aplicação
COPY . .

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]''',
                    'advanced': '''# Dockerfile multi-stage para aplicação React
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]'''
                },
                'exercises': {
                    'basic': {
                        'title': 'Containerizar Aplicação Simples',
                        'description': 'Crie um Dockerfile para uma aplicação web básica',
                        'steps': [
                            'Crie um Dockerfile otimizado',
                            'Configure .dockerignore apropriadamente',
                            'Construa a imagem Docker',
                            'Execute o container e teste a aplicação',
                            'Documente o processo'
                        ],
                        'validation': [
                            'Verifique se a imagem foi construída sem erros',
                            'Confirme que a aplicação está funcionando no container',
                            'Teste se o container pode ser reiniciado corretamente'
                        ]
                    },
                    'intermediate': {
                        'title': 'Docker Compose Multi-Serviço',
                        'description': 'Configure um ambiente completo com múltiplos serviços',
                        'steps': [
                            'Crie docker-compose.yml com múltiplos serviços',
                            'Configure networking entre containers',
                            'Implemente volumes para persistência de dados',
                            'Configure variáveis de ambiente',
                            'Teste a comunicação entre serviços'
                        ],
                        'validation': [
                            'Verifique se todos os serviços estão comunicando',
                            'Confirme que os dados persistem entre reinicializações',
                            'Teste se as variáveis de ambiente estão sendo aplicadas'
                        ]
                    },
                    'advanced': {
                        'title': 'Pipeline CI/CD com Docker',
                        'description': 'Implemente pipeline completo de CI/CD usando Docker',
                        'steps': [
                            'Configure GitHub Actions com Docker',
                            'Implemente testes automatizados em containers',
                            'Configure registry para armazenar imagens',
                            'Implemente deploy automático',
                            'Configure monitoramento e alertas'
                        ],
                        'validation': [
                            'Teste se o pipeline executa sem erros',
                            'Verifique se as imagens são publicadas corretamente',
                            'Confirme que o deploy automático está funcionando'
                        ]
                    }
                }
            },
            'HTML5 e Semântica': {
                'concepts': {
                    'fundamentals': [
                        'HTML5 introduziu elementos semânticos que melhoram a acessibilidade e SEO',
                        'Elementos como <header>, <nav>, <main>, <section> fornecem significado estrutural',
                        'Atributos ARIA (Accessible Rich Internet Applications) melhoram a acessibilidade',
                        'HTML5 inclui APIs nativas para geolocalização, armazenamento local e mídia'
                    ],
                    'implementation': [
                        'Use elementos semânticos apropriados para cada tipo de conteúdo',
                        'Implemente landmarks ARIA para navegação por teclado',
                        'Configure meta tags adequadamente para SEO e redes sociais',
                        'Use validação HTML5 para garantir conformidade com padrões'
                    ],
                    'best_practices': [
                        'Sempre use DOCTYPE html5 e charset UTF-8',
                        'Implemente estrutura hierárquica clara com headings',
                        'Use alt text descritivo para imagens',
                        'Configure viewport meta tag para responsividade'
                    ]
                },
                'code_examples': {
                    'basic': '''<!-- HTML5 - Estrutura semântica básica -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página</title>
</head>
<body>
    <header>
        <nav aria-label="Navegação principal">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Sobre</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section aria-labelledby="intro">
            <h1 id="intro">Bem-vindo</h1>
            <p>Conteúdo principal da página</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Minha Empresa</p>
    </footer>
</body>
</html>''',
                    'advanced': '''<!-- HTML5 - Formulário avançado com validação -->
<form novalidate>
    <fieldset>
        <legend>Informações Pessoais</legend>
        
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required 
                   aria-describedby="email-help">
            <div id="email-help">Digite um email válido</div>
        </div>
        
        <div>
            <label for="phone">Telefone:</label>
            <input type="tel" id="phone" name="phone" 
                   pattern="[0-9]{2}-[0-9]{9}">
        </div>
        
        <div>
            <label for="birthdate">Data de Nascimento:</label>
            <input type="date" id="birthdate" name="birthdate" required>
        </div>
    </fieldset>
    
    <button type="submit">Enviar</button>
</form>'''
                },
                'exercises': {
                    'basic': {
                        'title': 'Página Semântica Básica',
                        'description': 'Crie uma página HTML5 com estrutura semântica adequada',
                        'steps': [
                            'Crie estrutura básica com DOCTYPE html5',
                            'Implemente elementos semânticos (header, nav, main, section)',
                            'Adicione landmarks ARIA para acessibilidade',
                            'Configure meta tags para SEO',
                            'Valide o HTML com validador W3C'
                        ],
                        'validation': [
                            'Verifique se a estrutura semântica está correta',
                            'Confirme que os landmarks ARIA estão funcionando',
                            'Teste a acessibilidade com screen reader'
                        ]
                    },
                    'intermediate': {
                        'title': 'Formulário Interativo',
                        'description': 'Implemente formulário com validação HTML5 e JavaScript',
                        'steps': [
                            'Crie formulário com campos diversos',
                            'Implemente validação HTML5 nativa',
                            'Adicione validação JavaScript customizada',
                            'Configure feedback visual para usuário',
                            'Teste acessibilidade com teclado'
                        ],
                        'validation': [
                            'Verifique se todas as validações funcionam',
                            'Confirme que o feedback é claro e útil',
                            'Teste navegação por teclado'
                        ]
                    },
                    'advanced': {
                        'title': 'SPA com HTML5 APIs',
                        'description': 'Crie aplicação single-page usando APIs HTML5',
                        'steps': [
                            'Implemente roteamento client-side',
                            'Use Local Storage para persistência',
                            'Integre Geolocation API',
                            'Implemente Service Worker para cache',
                            'Configure PWA manifest'
                        ],
                        'validation': [
                            'Teste se o roteamento funciona corretamente',
                            'Verifique se os dados persistem no Local Storage',
                            'Confirme que a PWA está funcionando'
                        ]
                    }
                }
            },
            'CSS3 Avançado e Seletores': {
                'concepts': {
                    'fundamentals': [
                        'CSS3 introduziu seletores avançados como :nth-child(), :not(), :has()',
                        'Flexbox e Grid Layout revolucionaram o posicionamento de elementos',
                        'Custom Properties (CSS Variables) permitem valores dinâmicos e reutilizáveis',
                        'Animações e transições CSS3 oferecem performance superior ao JavaScript'
                    ],
                    'implementation': [
                        'Use seletores específicos para evitar conflitos de estilo',
                        'Implemente Mobile-First Design com media queries',
                        'Configure CSS Grid para layouts complexos bidimensionais',
                        'Use Flexbox para alinhamento e distribuição de elementos'
                    ],
                    'best_practices': [
                        'Organize CSS com metodologia BEM ou similar',
                        'Use CSS Custom Properties para temas e valores dinâmicos',
                        'Implemente CSS reset ou normalize para consistência',
                        'Minimize especificidade e evite !important'
                    ]
                },
                'code_examples': {
                    'basic': '''/* CSS3 - Seletores avançados e Flexbox */
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
}

.card:nth-child(odd) {
    background-color: #f0f0f0;
}

.card:not(.disabled) {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.card:not(.disabled):hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

/* CSS Custom Properties */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --border-radius: 8px;
    --spacing-unit: 1rem;
}

.button {
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-unit);
}''',
                    'advanced': '''/* CSS3 - Grid Layout e Animações */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.grid-item {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 2rem;
    animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem;
    }
    
    .grid-item {
        padding: 1rem;
    }
}'''
                },
                'exercises': {
                    'basic': {
                        'title': 'Layout Responsivo com Flexbox',
                        'description': 'Crie layout responsivo usando Flexbox',
                        'steps': [
                            'Configure container flexível',
                            'Implemente alinhamento e distribuição',
                            'Adicione responsividade com media queries',
                            'Teste em diferentes tamanhos de tela',
                            'Otimize para mobile'
                        ],
                        'validation': [
                            'Verifique se o layout é responsivo',
                            'Confirme que os elementos estão alinhados',
                            'Teste em dispositivos reais'
                        ]
                    },
                    'intermediate': {
                        'title': 'Grid Layout Complexo',
                        'description': 'Implemente layout complexo com CSS Grid',
                        'steps': [
                            'Crie grid com áreas nomeadas',
                            'Implemente layout responsivo',
                            'Adicione animações CSS',
                            'Configure CSS Custom Properties',
                            'Otimize performance'
                        ],
                        'validation': [
                            'Verifique se o grid está funcionando',
                            'Confirme que as animações são suaves',
                            'Teste a performance'
                        ]
                    },
                    'advanced': {
                        'title': 'Sistema de Design Completo',
                        'description': 'Crie sistema de design escalável',
                        'steps': [
                            'Defina tokens de design (cores, espaçamentos)',
                            'Crie componentes reutilizáveis',
                            'Implemente temas claro/escuro',
                            'Configure build process para CSS',
                            'Documente o sistema'
                        ],
                        'validation': [
                            'Teste se os componentes são reutilizáveis',
                            'Verifique se os temas funcionam',
                            'Confirme que a documentação está clara'
                        ]
                    }
                }
            },
            'JavaScript ES6+ e Moderno': {
                'concepts': {
                    'fundamentals': [
                        'ES6+ introduziu arrow functions, destructuring, template literals e classes',
                        'Promises e async/await revolucionaram o tratamento de operações assíncronas',
                        'Modules ES6 permitem import/export para melhor organização de código',
                        'Map, Set, WeakMap e WeakSet oferecem estruturas de dados otimizadas'
                    ],
                    'implementation': [
                        'Use const/let ao invés de var para melhor escopo',
                        'Implemente async/await para operações assíncronas',
                        'Use destructuring para extrair valores de objetos e arrays',
                        'Configure modules ES6 com import/export'
                    ],
                    'best_practices': [
                        'Sempre use strict mode para melhor performance',
                        'Implemente error handling robusto com try/catch',
                        'Use TypeScript para tipagem estática',
                        'Configure ESLint e Prettier para qualidade de código'
                    ]
                },
                'code_examples': {
                    'basic': '''// JavaScript ES6+ - Sintaxe moderna
const users = [
    { id: 1, name: 'João', age: 30, city: 'São Paulo' },
    { id: 2, name: 'Maria', age: 25, city: 'Rio de Janeiro' }
];

// Arrow functions e destructuring
const getAdults = (users) => 
    users.filter(({ age }) => age >= 18)
         .map(({ name, city }) => ({ name, city }));

// Template literals
const createUserCard = ({ name, age, city }) => `
    <div class="user-card">
        <h3>${name}</h3>
        <p>Idade: ${age} anos</p>
        <p>Cidade: ${city}</p>
    </div>
`;

// Async/await
const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
};''',
                    'advanced': '''// JavaScript ES6+ - Classes e Modules
class UserService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.cache = new Map();
    }
    
    async getUser(id) {
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }
        
        try {
            const user = await this.fetchUser(id);
            this.cache.set(id, user);
            return user;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }
    
    async fetchUser(id) {
        const response = await fetch(`${this.apiUrl}/users/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}

// Module export
export default UserService;
export { getAdults, createUserCard };'''
                },
                'exercises': {
                    'basic': {
                        'title': 'Manipulação de Arrays Moderna',
                        'description': 'Implemente funções usando métodos ES6+',
                        'steps': [
                            'Use map, filter, reduce para transformar dados',
                            'Implemente destructuring para extrair valores',
                            'Crie funções com arrow functions',
                            'Use template literals para strings',
                            'Teste com diferentes datasets'
                        ],
                        'validation': [
                            'Verifique se as transformações estão corretas',
                            'Confirme que o código é legível',
                            'Teste com edge cases'
                        ]
                    },
                    'intermediate': {
                        'title': 'Sistema de Promises',
                        'description': 'Implemente sistema robusto de operações assíncronas',
                        'steps': [
                            'Crie funções async/await',
                            'Implemente tratamento de erros',
                            'Configure Promise.all para operações paralelas',
                            'Adicione timeout e retry logic',
                            'Teste com APIs reais'
                        ],
                        'validation': [
                            'Verifique se as operações assíncronas funcionam',
                            'Confirme que os erros são tratados adequadamente',
                            'Teste performance com operações paralelas'
                        ]
                    },
                    'advanced': {
                        'title': 'Aplicação Modular Completa',
                        'description': 'Crie aplicação completa usando modules ES6',
                        'steps': [
                            'Organize código em modules lógicos',
                            'Implemente sistema de injeção de dependência',
                            'Configure build process com bundler',
                            'Adicione testes unitários',
                            'Implemente lazy loading de modules'
                        ],
                        'validation': [
                            'Teste se os modules estão funcionando',
                            'Verifique se o build está otimizado',
                            'Confirme que os testes passam'
                        ]
                    }
                }
            },
            'Express.js Fundamentos': {
                'concepts': {
                    'fundamentals': [
                        'Express.js é um framework web minimalista e flexível para Node.js',
                        'Middleware são funções que executam entre request e response',
                        'Roteamento permite definir endpoints para diferentes métodos HTTP',
                        'Template engines como EJS, Pug e Handlebars facilitam renderização server-side'
                    ],
                    'implementation': [
                        'Configure middleware de segurança com helmet.js e cors',
                        'Implemente validação de dados com Joi ou express-validator',
                        'Use express-session para gerenciamento de sessões',
                        'Configure logging com morgan e winston'
                    ],
                    'best_practices': [
                        'Organize rotas em módulos separados para melhor manutenibilidade',
                        'Implemente tratamento de erros centralizado com middleware',
                        'Use variáveis de ambiente para configurações sensíveis',
                        'Configure rate limiting para prevenir ataques DDoS'
                    ]
                },
                'code_examples': {
                    'basic': '''// Express.js - API básica com middleware
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Rotas
app.get('/api/users', (req, res) => {
    res.json({ message: 'Lista de usuários' });
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ 
        message: 'Usuário criado', 
        user: { name, email } 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});''',
                    'advanced': '''// Express.js - API avançada com validação e autenticação
const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 requests por IP
});

app.use(limiter);

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token de acesso requerido' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Validação de dados
const validateUser = [
    body('name').isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
    body('email').isEmail().withMessage('Email deve ser válido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Rotas protegidas
app.post('/api/users', authenticateToken, validateUser, (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ 
        message: 'Usuário criado com sucesso',
        user: { name, email }
    });
});'''
                },
                'exercises': {
                    'basic': {
                        'title': 'API REST Básica',
                        'description': 'Crie uma API REST básica com Express.js',
                        'steps': [
                            'Configure servidor Express básico',
                            'Implemente rotas GET, POST, PUT, DELETE',
                            'Adicione middleware de segurança',
                            'Configure tratamento de erros',
                            'Teste com Postman ou curl'
                        ],
                        'validation': [
                            'Verifique se todas as rotas estão funcionando',
                            'Confirme que o middleware está aplicado',
                            'Teste tratamento de erros'
                        ]
                    },
                    'intermediate': {
                        'title': 'API com Autenticação',
                        'description': 'Implemente autenticação JWT na API',
                        'steps': [
                            'Configure middleware de autenticação',
                            'Implemente login e registro de usuários',
                            'Proteja rotas sensíveis',
                            'Configure refresh tokens',
                            'Teste fluxo completo de autenticação'
                        ],
                        'validation': [
                            'Verifique se a autenticação está funcionando',
                            'Confirme que as rotas protegidas estão seguras',
                            'Teste expiração de tokens'
                        ]
                    },
                    'advanced': {
                        'title': 'API Escalável e Segura',
                        'description': 'Crie API robusta para produção',
                        'steps': [
                            'Implemente rate limiting e throttling',
                            'Configure logging e monitoramento',
                            'Adicione validação robusta de dados',
                            'Implemente cache com Redis',
                            'Configure CI/CD e testes automatizados'
                        ],
                        'validation': [
                            'Teste performance sob carga',
                            'Verifique se o rate limiting funciona',
                            'Confirme que o logging está capturando eventos'
                        ]
                    }
                }
            }
        }
    
    def get_technical_intro(self, topic: str, course_title: str) -> str:
        """Gera introdução técnica específica para o tópico"""
        company = random.choice(list(self.brazilian_companies['tech']))
        
        if topic in self.technical_content:
            content = self.technical_content[topic]
            concepts = content['concepts']['fundamentals'][0]
            
            return f"""## 🎯 **{topic} - Domine Esta Tecnologia Essencial**

### 🚀 **Por Que {topic} é Fundamental?**
{concepts}

### 💼 **Aplicação Real: {company}**
A {company} utiliza {topic} para processar milhões de requisições diariamente, garantindo alta performance e confiabilidade.

### 🎓 **O Que Você Vai Aprender Hoje:**
- ✅ Conceitos técnicos profundos de {topic}
- ✅ Implementação prática com código funcional
- ✅ Melhores práticas da indústria
- ✅ Casos de uso reais e soluções escaláveis
- ✅ Projetos práticos para seu portfólio

### ⏱️ **Tempo Estimado:** 90 minutos
### 📊 **Nível:** Avançado
### 🔧 **Pré-requisitos:** Conhecimento básico de programação"""
        else:
            return f"""## 🎯 **{topic} - Tecnologia Essencial para Desenvolvimento Moderno**

### 🚀 **Por Que {topic} é Importante?**
{topic} é uma tecnologia fundamental para desenvolvimento moderno, oferecendo recursos avançados e performance otimizada.

### 💼 **Aplicação Real: {company}**
A {company} utiliza {topic} para construir soluções robustas e escaláveis.

### 🎓 **O Que Você Vai Aprender Hoje:**
- ✅ Conceitos técnicos profundos
- ✅ Implementação prática
- ✅ Melhores práticas
- ✅ Projetos reais

### ⏱️ **Tempo Estimado:** 90 minutos
### 📊 **Nível:** Avançado
### 🔧 **Pré-requisitos:** Conhecimento básico de programação"""
    
    def get_technical_concepts(self, topic: str) -> str:
        """Gera conceitos técnicos específicos"""
        if topic in self.technical_content:
            content = self.technical_content[topic]['concepts']
            
            concepts_html = "## 🏗️ **CONCEITOS TÉCNICOS FUNDAMENTAIS**\n\n"
            
            for category, items in content.items():
                concepts_html += f"### **{category.replace('_', ' ').title()}**\n"
                for item in items:
                    concepts_html += f"- {item}\n"
                concepts_html += "\n"
            
            return concepts_html
        else:
            return f"""## 🏗️ **CONCEITOS TÉCNICOS FUNDAMENTAIS**

### **Fundamentals**
{topic} é uma tecnologia essencial que oferece recursos avançados para desenvolvimento moderno.

### **Implementation**
Implementação prática dos conceitos aprendidos em projetos reais.

### **Best Practices**
Melhores práticas da indústria para desenvolvimento eficiente e escalável."""
    
    def get_technical_examples(self, topic: str) -> str:
        """Gera exemplos de código técnicos específicos"""
        if topic in self.technical_content:
            content = self.technical_content[topic]['code_examples']
            
            examples_html = "## 💻 **IMPLEMENTAÇÃO PRÁTICA**\n\n"
            
            for level, code in content.items():
                examples_html += f"### **Exemplo {level.title()}**\n"
                examples_html += f"```javascript\n{code}\n```\n\n"
            
            return examples_html
        else:
            return f"""## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico**
```javascript
// Exemplo prático de {topic}
const {topic.lower().replace(' ', '')} = {{
  init() {{
    console.log('Implementando {topic}');
  }},
  
  process() {{
    // Lógica de processamento
    return 'Sucesso';
  }}
}};

export default {topic.lower().replace(' ', '')};
```

### **Exemplo Avançado**
```javascript
// Implementação avançada de {topic}
const advanced{topic.replace(' ', '')} = {{
  // Implementação detalhada
  process() {{
    return 'Implementação avançada';
  }}
}};
```"""
    
    def get_technical_exercises(self, topic: str) -> str:
        """Gera exercícios técnicos específicos"""
        if topic in self.technical_content:
            content = self.technical_content[topic]['exercises']
            
            exercises_html = "## 🎯 **EXERCÍCIOS PRÁTICOS TÉCNICOS**\n\n"
            
            for level, exercise in content.items():
                exercises_html += f"### **{exercise['title']}**\n"
                exercises_html += f"**Descrição:** {exercise['description']}\n\n"
                
                exercises_html += "**Passos de Implementação:**\n"
                for i, step in enumerate(exercise['steps'], 1):
                    exercises_html += f"{i}. {step}\n"
                
                exercises_html += "\n**Critérios de Validação:**\n"
                for i, validation in enumerate(exercise['validation'], 1):
                    exercises_html += f"{i}. {validation}\n"
                
                exercises_html += "\n---\n\n"
            
            return exercises_html
        else:
            return f"""## 🎯 **EXERCÍCIOS PRÁTICOS TÉCNICOS**

### **Exercício Básico: Primeiros Passos**
1. **Configuração do Ambiente**
   - Instale as dependências necessárias
   - Configure o ambiente de desenvolvimento
   - Verifique se tudo está funcionando

2. **Implementação Inicial**
   - Crie a estrutura básica do projeto
   - Implemente a funcionalidade principal
   - Teste localmente

3. **Validação**
   - Execute os testes unitários
   - Verifique se não há erros de linting
   - Confirme que a funcionalidade está correta

### **Exercício Intermediário: Aplicação Prática**
1. **Análise do Problema**
   - Identifique os requisitos funcionais
   - Defina a arquitetura da solução
   - Planeje a implementação

2. **Desenvolvimento**
   - Implemente a lógica de negócio
   - Adicione tratamento de erros
   - Implemente validações

3. **Integração**
   - Conecte com APIs externas
   - Implemente persistência de dados
   - Adicione logging e monitoramento

### **Exercício Avançado: Projeto Completo**
1. **Arquitetura e Planejamento**
   - Defina a arquitetura do sistema
   - Escolha as tecnologias adequadas
   - Planeje a estrutura do banco de dados

2. **Implementação Completa**
   - Desenvolva todas as funcionalidades
   - Implemente autenticação e autorização
   - Adicione cache e otimizações

3. **DevOps e Deploy**
   - Configure CI/CD
   - Implemente monitoramento
   - Configure ambientes de produção"""
    
    def get_brazilian_case_study(self, topic: str) -> str:
        """Gera caso de estudo brasileiro específico"""
        company = random.choice(list(self.brazilian_companies['tech']))
        
        return f"""## 🇧🇷 **Caso de Sucesso: {company}**

### 📖 **A História Completa**
A {company} revolucionou o mercado brasileiro implementando {topic} em escala, processando milhões de transações diariamente.

### 🛠️ **Stack Tecnológica Utilizada**
- **Frontend:** React, TypeScript, Next.js
- **Backend:** Node.js, Express, PostgreSQL
- **Infraestrutura:** AWS, Docker, Kubernetes
- **Monitoramento:** Prometheus, Grafana, ELK Stack

### 🎯 **O Desafio**
Como implementar {topic} em uma aplicação que serve milhões de usuários simultâneos com alta disponibilidade e performance?

### 💡 **A Solução Implementada**
- Arquitetura de microserviços com {topic} como componente central
- Implementação de cache distribuído com Redis
- Load balancing com NGINX
- Monitoramento em tempo real com métricas customizadas

### 📊 **Resultados Alcançados**
- **Performance:** Melhoria de 300% na velocidade de resposta
- **Escalabilidade:** Suporte a 10x mais usuários simultâneos
- **Confiabilidade:** 99.9% de uptime garantido
- **Satisfação:** Aumento de 40% na satisfação do usuário
- **Custos:** Redução de 25% nos custos de infraestrutura

### 🔍 **Como Isso se Relaciona com {topic}**
A implementação de {topic} foi fundamental para resolver este desafio, oferecendo:
- Processamento assíncrono eficiente
- Gerenciamento de estado otimizado
- Integração seamless com outras tecnologias
- Facilidade de manutenção e evolução

### 🎓 **Lições Aprendidas**
1. **Planejamento é essencial** - Arquitetura bem definida desde o início
2. **Teste em produção** - Implementação gradual com rollback automático
3. **Monitoramento contínuo** - Métricas em tempo real para tomada de decisão
4. **Documentação viva** - Manutenção constante da documentação técnica
5. **Equipe capacitada** - Investimento em treinamento e desenvolvimento

### 🚀 **Próximos Passos**
- Expansão para outros mercados
- Implementação de IA e Machine Learning
- Otimização contínua de performance
- Novas funcionalidades baseadas em {topic}"""
    
    def generate_technical_lesson(self, topic: str, course_title: str, module: str, lesson_number: int) -> str:
        """Gera uma aula técnica completa e específica"""
        
        # Introdução técnica
        intro = self.get_technical_intro(topic, course_title)
        
        # Conceitos técnicos
        concepts = self.get_technical_concepts(topic)
        
        # Exemplos práticos
        examples = self.get_technical_examples(topic)
        
        # Caso brasileiro
        case_study = self.get_brazilian_case_study(topic)
        
        # Exercícios técnicos
        exercises = self.get_technical_exercises(topic)
        
        # Quiz técnico
        quiz = f"""## 🧠 **Quiz Técnico: Teste Seu Conhecimento**

### ❓ **Pergunta 1**
Qual é a principal vantagem de {topic}?

**A)** Simplicidade de implementação  
**B)** Performance otimizada  
**C)** Facilidade de manutenção  
**D)** Todas as alternativas acima  

### 💡 **Explicação da Resposta Correta**
A resposta correta é **D** porque {topic} oferece múltiplas vantagens que se complementam.

### 🎯 **Por que isso importa?**
Entender as vantagens de {topic} é fundamental para escolher a tecnologia certa para cada projeto.

### 📚 **Para Aprofundar**
- Leia a documentação oficial
- Pratique com exemplos reais
- Discuta com a comunidade
- Implemente em projetos pessoais

---

### ❓ **Pergunta 2**
Qual é a melhor prática para implementar {topic}?

**A)** Implementação básica sem otimizações  
**B)** Implementação com foco em performance  
**C)** Implementação com foco em segurança  
**D)** Implementação com foco em escalabilidade  

### 💡 **Explicação da Resposta Correta**
A resposta correta é **D** porque escalabilidade é fundamental para aplicações modernas.

### 🎯 **Por que isso importa?**
Entender este conceito é fundamental para escrever código eficiente e evitar problemas de performance em produção."""
        
        # Projeto final
        project = f"""## 📝 **Projeto Final: Aplicação Real com {topic}**

### 🎯 **Objetivo**
Desenvolva uma aplicação que demonstre domínio completo de {topic}.

### 📋 **Requisitos Funcionais**
- **Funcionalidade Principal:** Implemente {topic} de forma robusta e escalável
- **Interface:** Crie uma interface intuitiva e responsiva
- **Performance:** Otimize para carregamento rápido e baixa latência
- **Testes:** Implemente testes unitários, de integração e E2E
- **Documentação:** Crie documentação técnica completa

### 🏗️ **Arquitetura Sugerida**
```
src/
├── components/     # Componentes reutilizáveis
├── services/       # Lógica de negócio
├── utils/          # Funções auxiliares
├── tests/          # Testes automatizados
├── docs/           # Documentação
└── config/         # Configurações
```

### ✅ **Critérios de Avaliação**
- **Funcionalidade (40%):** Aplicação funciona conforme especificado
- **Código (30%):** Código limpo, bem documentado e testado
- **Performance (20%):** Carregamento rápido e otimizado
- **Inovação (10%):** Elementos criativos e diferenciais

### 🚀 **Deploy e Apresentação**
- Publique no GitHub com README detalhado
- Deploy em plataforma cloud (Vercel, Netlify, AWS)
- Prepare apresentação de 10 minutos
- Documente decisões arquiteturais

### 💼 **Valor para o Portfólio**
Este projeto demonstra:
- Conhecimento técnico sólido
- Capacidade de resolver problemas reais
- Boas práticas de desenvolvimento
- Experiência com deploy e DevOps
- Habilidades de documentação e apresentação"""
        
        # Próximos passos
        next_steps = f"""## 🚀 **Próximos Passos na Sua Jornada**

### 📚 **Aprendizado Contínuo**
- **Próxima Aula:** {topic} Avançado
- **Curso Relacionado:** [Nome do curso relacionado]
- **Certificação:** [Nome da certificação]

### 🛠️ **Projetos Recomendados**
1. **Projeto Pessoal:** Aplique {topic} em um projeto real
2. **Contribuição Open Source:** Contribua para projetos existentes
3. **Blog Técnico:** Escreva sobre suas descobertas
4. **Mentoria:** Ajude outros desenvolvedores

### 💼 **Oportunidades de Carreira**
- **Vagas Relacionadas:** [Links para vagas]
- **Networking:** [Eventos e comunidades]
- **Freelancing:** [Plataformas de trabalho]

### 🎉 **Parabéns!**
Você deu mais um passo importante na sua jornada como desenvolvedor. Continue praticando e nunca pare de aprender!"""

        # Montar a aula completa
        lesson_content = f"""# 🎓 **Fenix Academy - {course_title}**
## 📚 **Aula {lesson_number} - Módulo: {module}**
### 🎯 **Tópico: {topic}**

---

{intro}

---

{concepts}

---

{examples}

---

{case_study}

---

{exercises}

---

{quiz}

---

{project}

---

{next_steps}

---

**🎉 Continue evoluindo como desenvolvedor!**"""

        return lesson_content

if __name__ == "__main__":
    generator = TechnicalContentGenerator()
    
    # Teste com um tópico específico
    lesson = generator.generate_technical_lesson(
        "React 18 e Novas Features",
        "React Avançado e Moderno",
        "Módulo 1: React",
        1
    )
    
    print(lesson)
