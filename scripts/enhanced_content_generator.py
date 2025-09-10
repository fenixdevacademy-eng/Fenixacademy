#!/usr/bin/env python3
"""
Gerador de Conteúdo Envolvente para Todos os Cursos Fenix
Implementa storytelling, exercícios práticos e elementos interativos
"""

import os
import json
import random
from datetime import datetime
from typing import Dict, List, Any

class EnhancedContentGenerator:
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
        
        self.success_stories = {
            'nubank': {
                'title': 'Nubank: A Revolução Bancária Digital',
                'story': 'Em 2013, três brasileiros tiveram uma ideia ousada: criar um banco digital que desafiasse os gigantes tradicionais. Hoje, o Nubank é o maior banco digital da América Latina, com mais de 70 milhões de clientes.',
                'tech_stack': ['React', 'Node.js', 'Kubernetes', 'AWS', 'TypeScript'],
                'challenge': 'Como processar milhões de transações em tempo real com 99.9% de disponibilidade?',
                'solution': 'Arquitetura de microsserviços com auto-scaling e monitoramento em tempo real.'
            },
            'ifood': {
                'title': 'iFood: Conectando o Brasil através da Tecnologia',
                'story': 'O que começou como uma startup de delivery em 2011, hoje é uma das maiores plataformas de delivery do mundo, processando mais de 1 milhão de pedidos por dia.',
                'tech_stack': ['React Native', 'Kotlin', 'Swift', 'Python', 'PostgreSQL'],
                'challenge': 'Como otimizar rotas de entrega para reduzir tempo e custos?',
                'solution': 'Algoritmos de machine learning para otimização de rotas e previsão de demanda.'
            },
            'magazine_luiza': {
                'title': 'Magazine Luiza: A Transformação Digital do Varejo',
                'story': 'Uma das maiores redes varejistas do Brasil, que se reinventou completamente, investindo pesado em tecnologia e e-commerce, aumentando suas vendas online em 300%.',
                'tech_stack': ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Docker'],
                'challenge': 'Como integrar lojas físicas com o e-commerce de forma seamless?',
                'solution': 'Sistema omnichannel com sincronização em tempo real de estoque e vendas.'
            }
        }
        
        self.learning_hooks = {
            'problem_solving': [
                "Imagine que você é o desenvolvedor responsável por resolver um problema crítico que está afetando milhares de usuários...",
                "Você acaba de receber uma demanda urgente do seu chefe: 'Precisamos resolver isso até amanhã!'...",
                "Durante uma reunião com stakeholders, surge uma pergunta que ninguém sabe responder..."
            ],
            'real_world': [
                "No mundo real, quando você trabalha em uma empresa como {company}, situações como esta acontecem diariamente...",
                "Empresas como {company} enfrentam desafios similares todos os dias. Vamos ver como eles resolveram...",
                "Esta é exatamente a situação que desenvolvedores da {company} enfrentaram em 2023..."
            ],
            'career_growth': [
                "Dominar este conceito pode ser o diferencial que você precisa para conseguir aquela promoção...",
                "Profissionais que dominam esta tecnologia ganham em média 40% mais que a média do mercado...",
                "Esta é uma das habilidades mais procuradas pelas empresas de tecnologia no Brasil..."
            ]
        }

    def get_engaging_intro(self, topic: str, level: str) -> str:
        """Gera uma introdução envolvente com storytelling"""
        hooks = random.sample(self.learning_hooks['problem_solving'], 1)
        company = random.choice(list(self.brazilian_companies['tech']))
        
        intro_templates = [
            f"""## 🎬 **A História que Vai Mudar Sua Carreira**

{hooks[0]}

**Cenário Real:** Você está trabalhando na {company} e precisa implementar {topic} em uma aplicação que serve mais de 1 milhão de usuários simultâneos. O sucesso do projeto depende da sua capacidade de aplicar os conceitos que vamos aprender hoje.

**Por que isso importa?** Profissionais que dominam {topic} ganham em média 40% mais que a média do mercado e são altamente valorizados por empresas como Nubank, iFood e Magazine Luiza.

**O que você vai conquistar hoje:**
- ✅ Resolver problemas reais que desenvolvedores enfrentam diariamente
- ✅ Implementar soluções que funcionam em produção
- ✅ Adicionar uma skill valiosa ao seu portfólio
- ✅ Se preparar para oportunidades de carreira de alto nível""",
            
            f"""## 🚀 **Sua Jornada Rumo ao Próximo Nível**

Imagine que você está em uma entrevista de emprego para uma vaga sênior na {company}. O entrevistador olha nos seus olhos e pergunta: "Como você implementaria {topic} em uma aplicação de grande escala?"

**A boa notícia:** Após esta aula, você terá uma resposta sólida e confiante.

**O que torna esta aula especial:**
- 🎯 Casos reais de empresas brasileiras que você conhece
- 💻 Código que funciona, não apenas teoria
- 🏆 Projetos que impressionam recrutadores
- 📈 Estratégias comprovadas de crescimento profissional""",
            
            f"""## 💡 **O Momento 'Eureka' que Você Estava Esperando**

Você já se sentiu frustrado ao ver tutoriais que mostram "Hello World" mas não ensinam como resolver problemas reais? Esta aula é diferente.

**Aqui você vai aprender:**
- Como a {company} usa {topic} para processar milhões de transações
- Por que desenvolvedores sênior consideram isso essencial
- Quais são os erros mais comuns e como evitá-los
- Como implementar soluções que escalam

**Prepare-se para:** Uma experiência de aprendizado que vai além do básico e te prepara para o mercado real."""
        ]
        
        return random.choice(intro_templates)

    def get_detailed_concepts(self, topic: str, module: str) -> str:
        """Gera conceitos detalhados e específicos"""
        concepts = {
            'react': {
                'fundamentals': [
                    "**Virtual DOM e Performance:** O React usa um Virtual DOM para otimizar renderizações. Quando o estado muda, React compara o Virtual DOM atual com o anterior (diffing) e atualiza apenas os elementos que realmente mudaram.",
                    "**Component Lifecycle:** Entender o ciclo de vida dos componentes é crucial. Mounting, Updating e Unmounting têm métodos específicos que permitem controlar quando e como os componentes se comportam.",
                    "**State vs Props:** State é interno e mutável, Props são externos e imutáveis. A regra de ouro: 'Props down, Events up' - dados fluem para baixo, eventos fluem para cima."
                ],
                'advanced': [
                    "**Hooks Avançados:** useCallback e useMemo para otimização de performance, useReducer para gerenciamento de estado complexo, e custom hooks para lógica reutilizável.",
                    "**Context API:** Para compartilhar dados entre componentes sem prop drilling. Ideal para temas, autenticação e configurações globais.",
                    "**Error Boundaries:** Capturam erros JavaScript em qualquer lugar da árvore de componentes e exibem uma UI de fallback."
                ]
            },
            'nodejs': {
                'fundamentals': [
                    "**Event Loop:** O coração do Node.js. Permite operações não-bloqueantes através de callbacks, promises e async/await, mantendo a aplicação responsiva.",
                    "**Streams:** Para processar grandes volumes de dados de forma eficiente. Readable, Writable, Duplex e Transform streams têm casos de uso específicos.",
                    "**Modules e NPM:** Sistema de módulos CommonJS, package.json, node_modules e como gerenciar dependências de forma eficiente."
                ],
                'advanced': [
                    "**Clustering:** Usar todos os cores da CPU com cluster.fork(), load balancing automático e compartilhamento de portas.",
                    "**Microservices:** Arquitetura distribuída com comunicação via HTTP, gRPC ou message queues como RabbitMQ ou Apache Kafka.",
                    "**Monitoring e Logging:** Winston para logs estruturados, PM2 para gerenciamento de processos e New Relic para monitoramento de performance."
                ]
            },
            'css': {
                'fundamentals': [
                    "**Box Model:** Content, padding, border e margin. Entender como cada um afeta o layout é fundamental para CSS eficiente.",
                    "**Flexbox:** Layout unidimensional perfeito para distribuir espaço entre itens. justify-content, align-items e flex-grow são propriedades essenciais.",
                    "**Grid Layout:** Sistema bidimensional que permite layouts complexos com linhas e colunas. grid-template-areas facilita layouts responsivos."
                ],
                'advanced': [
                    "**CSS Custom Properties:** Variáveis CSS que permitem temas dinâmicos e valores reutilizáveis. Suporte nativo em todos os navegadores modernos.",
                    "**CSS-in-JS:** Styled-components, Emotion e outras bibliotecas que permitem CSS com JavaScript, oferecendo scoping automático e props dinâmicas.",
                    "**Performance:** Critical CSS, lazy loading de estilos, minificação e tree-shaking para otimizar o carregamento."
                ]
            }
        }
        
        # Buscar conceitos específicos baseado no tópico
        topic_key = topic.lower().replace(' ', '_')
        if topic_key in concepts:
            level_key = 'fundamentals' if 'básico' in module.lower() or 'fundamentos' in module.lower() else 'advanced'
            return concepts[topic_key].get(level_key, ["Conceitos específicos serão implementados aqui."])
        
        return ["Conceitos detalhados e específicos para este tópico."]

    def get_practical_examples(self, topic: str, level: str) -> str:
        """Gera exemplos práticos e funcionais"""
        examples = {
            'react': {
                'basic': '''```jsx
// Componente funcional com hooks
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="spinner">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Membro desde: {new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
    </div>
  );
};

export default UserProfile;
```''',
                'advanced': '''```jsx
// Custom Hook para gerenciamento de estado complexo
import { useState, useCallback, useMemo } from 'react';

const useShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const addItem = useCallback((product) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const total = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return subtotal * (1 - discount / 100);
  }, [items, discount]);

  const itemCount = useMemo(() => 
    items.reduce((sum, item) => sum + item.quantity, 0), 
    [items]
  );

  return {
    items,
    total,
    itemCount,
    discount,
    addItem,
    removeItem,
    updateQuantity,
    setDiscount
  };
};

export default useShoppingCart;
```'''
            },
            'nodejs': {
                'basic': '''```javascript
// API REST com Express e validação
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware de segurança
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
app.use('/api/', limiter);

// Schema de validação
const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120)
});

// Rota com validação
app.post('/api/users', async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Simular criação de usuário
    const user = {
      id: Date.now(),
      ...value,
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      data: user,
      message: 'Usuário criado com sucesso'
    });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```''',
                'advanced': '''```javascript
// Microserviço com Docker, Redis e MongoDB
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { v4: uuidv4 } = require('uuid');

class ProductService {
  constructor() {
    this.app = express();
    this.redis = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379
    });
    this.setupDatabase();
    this.setupMiddleware();
    this.setupRoutes();
  }

  async setupDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/products');
      console.log('Conectado ao MongoDB');
    } catch (error) {
      console.error('Erro ao conectar MongoDB:', error);
    }
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      req.requestId = uuidv4();
      console.log(`[${req.requestId}] ${req.method} ${req.path}`);
      next();
    });
  }

  setupRoutes() {
    // Cache com Redis
    this.app.get('/api/products/:id', async (req, res) => {
      const { id } = req.params;
      const cacheKey = `product:${id}`;

      try {
        // Tentar buscar do cache
        const cached = await this.redis.get(cacheKey);
        if (cached) {
          return res.json({
            success: true,
            data: JSON.parse(cached),
            fromCache: true
          });
        }

        // Buscar do banco
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: 'Produto não encontrado'
          });
        }

        // Salvar no cache por 1 hora
        await this.redis.setex(cacheKey, 3600, JSON.stringify(product));

        res.json({
          success: true,
          data: product,
          fromCache: false
        });
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({
          success: false,
          message: 'Erro interno do servidor'
        });
      }
    });
  }

  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Product Service rodando na porta ${port}`);
    });
  }
}

// Schema do MongoDB
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, index: true },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Iniciar o serviço
const productService = new ProductService();
productService.start();
```'''
            }
        }
        
        topic_key = topic.lower().replace(' ', '_')
        level_key = 'basic' if 'básico' in level.lower() or 'fundamentos' in level.lower() else 'advanced'
        
        if topic_key in examples and level_key in examples[topic_key]:
            return examples[topic_key][level_key]
        
        return f"```javascript\n// Exemplo prático de {topic}\n// Implementação específica será adicionada aqui\n```"

    def get_brazilian_case_study(self, topic: str) -> str:
        """Gera estudo de caso brasileiro detalhado"""
        company = random.choice(list(self.success_stories.keys()))
        story = self.success_stories[company]
        
        case_study = f"""## 🇧🇷 **Caso de Sucesso: {story['title']}**

### 📖 **A História Completa**
{story['story']}

### 🛠️ **Stack Tecnológica Utilizada**
{', '.join(story['tech_stack'])}

### 🎯 **O Desafio**
{story['challenge']}

### 💡 **A Solução Implementada**
{story['solution']}

### 📊 **Resultados Alcançados**
- **Performance:** Melhoria de 300% na velocidade de resposta
- **Escalabilidade:** Suporte a 10x mais usuários simultâneos
- **Confiabilidade:** 99.9% de uptime
- **Satisfação:** Aumento de 40% na satisfação do cliente

### 🔍 **Como Isso se Relaciona com {topic}**
A implementação de {topic} foi fundamental para resolver este desafio. Vamos ver como você pode aplicar os mesmos conceitos em seus projetos.

### 🎓 **Lições Aprendidas**
1. **Planejamento é essencial:** Sempre analise o problema antes de implementar
2. **Teste em produção:** Use ambientes de staging que espelham a produção
3. **Monitoramento contínuo:** Implemente métricas desde o início
4. **Documentação viva:** Mantenha a documentação sempre atualizada

### 🚀 **Próximos Passos para Você**
Agora que você viu como uma empresa real resolveu este problema, vamos implementar uma solução similar no nosso projeto prático."""
        
        return case_study

    def get_detailed_exercises(self, topic: str, level: str) -> str:
        """Gera exercícios práticos detalhados com instruções passo-a-passo"""
        exercises = {
            'basic': {
                'title': 'Exercício Básico: Primeiros Passos',
                'instructions': [
                    "1. **Configuração do Ambiente**",
                    "   - Instale as dependências necessárias",
                    "   - Configure o ambiente de desenvolvimento",
                    "   - Verifique se tudo está funcionando",
                    "",
                    "2. **Implementação Inicial**",
                    "   - Crie a estrutura básica do projeto",
                    "   - Implemente a funcionalidade principal",
                    "   - Teste localmente",
                    "",
                    "3. **Validação**",
                    "   - Execute os testes unitários",
                    "   - Verifique se não há erros de linting",
                    "   - Confirme que a funcionalidade está correta"
                ],
                'criteria': [
                    "✅ Código compila sem erros",
                    "✅ Funcionalidade básica implementada",
                    "✅ Testes passam com sucesso",
                    "✅ Código segue as convenções estabelecidas"
                ]
            },
            'intermediate': {
                'title': 'Exercício Intermediário: Aplicação Prática',
                'instructions': [
                    "1. **Análise do Problema**",
                    "   - Identifique os requisitos funcionais",
                    "   - Defina a arquitetura da solução",
                    "   - Planeje a implementação",
                    "",
                    "2. **Desenvolvimento**",
                    "   - Implemente a lógica de negócio",
                    "   - Adicione tratamento de erros",
                    "   - Implemente validações",
                    "",
                    "3. **Integração**",
                    "   - Conecte com APIs externas",
                    "   - Implemente persistência de dados",
                    "   - Adicione logging e monitoramento",
                    "",
                    "4. **Testes e Otimização**",
                    "   - Escreva testes de integração",
                    "   - Otimize performance",
                    "   - Documente a API"
                ],
                'criteria': [
                    "✅ Solução atende todos os requisitos",
                    "✅ Código é limpo e bem documentado",
                    "✅ Testes cobrem casos principais",
                    "✅ Performance está otimizada",
                    "✅ Tratamento de erros implementado"
                ]
            },
            'advanced': {
                'title': 'Exercício Avançado: Projeto Completo',
                'instructions': [
                    "1. **Arquitetura e Planejamento**",
                    "   - Defina a arquitetura do sistema",
                    "   - Escolha as tecnologias adequadas",
                    "   - Planeje a estrutura do banco de dados",
                    "",
                    "2. **Implementação Completa**",
                    "   - Desenvolva todas as funcionalidades",
                    "   - Implemente autenticação e autorização",
                    "   - Adicione cache e otimizações",
                    "",
                    "3. **DevOps e Deploy**",
                    "   - Configure CI/CD",
                    "   - Implemente monitoramento",
                    "   - Configure ambientes de produção",
                    "",
                    "4. **Documentação e Apresentação**",
                    "   - Crie documentação completa",
                    "   - Prepare apresentação do projeto",
                    "   - Publique no GitHub com README detalhado"
                ],
                'criteria': [
                    "✅ Sistema completo e funcional",
                    "✅ Arquitetura escalável",
                    "✅ Deploy automatizado",
                    "✅ Monitoramento implementado",
                    "✅ Documentação profissional",
                    "✅ Código de produção pronto"
                ]
            }
        }
        
        level_key = 'basic' if 'básico' in level.lower() or 'fundamentos' in level.lower() else 'intermediate' if 'intermediário' in level.lower() else 'advanced'
        exercise = exercises.get(level_key, exercises['basic'])
        
        return f"""## 🎯 **{exercise['title']}**

### 📋 **Instruções Detalhadas**
{chr(10).join(exercise['instructions'])}

### ✅ **Critérios de Sucesso**
{chr(10).join(exercise['criteria'])}

### 🛠️ **Recursos Adicionais**
- **Documentação:** [Link para documentação oficial]
- **Exemplos:** [Repositório com exemplos práticos]
- **Comunidade:** [Fórum para dúvidas e discussões]

### 💡 **Dicas para o Sucesso**
1. **Leia as instruções com atenção** antes de começar
2. **Teste frequentemente** durante o desenvolvimento
3. **Documente suas decisões** arquiteturais
4. **Peça ajuda** quando necessário
5. **Revise o código** antes de considerar finalizado"""

    def get_interactive_elements(self, topic: str) -> str:
        """Gera elementos interativos como quizzes e validações"""
        quizzes = {
            'react': [
                {
                    'question': 'Qual é a principal vantagem do Virtual DOM no React?',
                    'options': [
                        'Aumenta a velocidade de renderização',
                        'Reduz o uso de memória',
                        'Permite atualizações seletivas do DOM real',
                        'Facilita o debugging'
                    ],
                    'correct': 2,
                    'explanation': 'O Virtual DOM permite que o React compare versões e atualize apenas as partes que realmente mudaram, otimizando a performance.'
                },
                {
                    'question': 'Quando usar useCallback vs useMemo?',
                    'options': [
                        'useCallback para funções, useMemo para valores',
                        'useCallback para valores, useMemo para funções',
                        'São equivalentes e intercambiáveis',
                        'useCallback é mais performático'
                    ],
                    'correct': 0,
                    'explanation': 'useCallback memoiza funções para evitar re-renderizações desnecessárias, useMemo memoiza valores computados.'
                }
            ],
            'nodejs': [
                {
                    'question': 'O que é o Event Loop no Node.js?',
                    'options': [
                        'Um loop infinito que processa eventos',
                        'Um mecanismo que permite operações não-bloqueantes',
                        'Uma ferramenta de debugging',
                        'Um padrão de design'
                    ],
                    'correct': 1,
                    'explanation': 'O Event Loop é o coração do Node.js, permitindo operações assíncronas sem bloquear a thread principal.'
                }
            ]
        }
        
        topic_key = topic.lower().replace(' ', '_')
        if topic_key in quizzes:
            quiz = random.choice(quizzes[topic_key])
            return f"""## 🧠 **Quiz Interativo: Teste Seu Conhecimento**

### ❓ **Pergunta**
{quiz['question']}

**A)** {quiz['options'][0]}  
**B)** {quiz['options'][1]}  
**C)** {quiz['options'][2]}  
**D)** {quiz['options'][3]}

### 💡 **Explicação da Resposta Correta**
{quiz['explanation']}

### 🎯 **Por que isso importa?**
Entender este conceito é fundamental para escrever código eficiente e evitar problemas de performance em produção.

### 📚 **Para Aprofundar**
- Leia a documentação oficial
- Pratique com exemplos reais
- Discuta com a comunidade
- Implemente em projetos pessoais"""
        
        return """## 🧠 **Quiz Interativo: Teste Seu Conhecimento**

### ❓ **Pergunta**
Qual é a melhor prática para este tópico?

**A)** Opção A  
**B)** Opção B  
**C)** Opção C  
**D)** Opção D

### 💡 **Explicação da Resposta Correta**
A resposta correta é importante porque...

### 🎯 **Por que isso importa?**
Este conceito é fundamental para...

### 📚 **Para Aprofundar**
- Leia a documentação oficial
- Pratique com exemplos reais
- Discuta com a comunidade"""

    def generate_enhanced_lesson(self, topic: str, module: str, level: str, lesson_number: int) -> str:
        """Gera uma aula completa e envolvente"""
        
        # Introdução envolvente
        intro = self.get_engaging_intro(topic, level)
        
        # Conceitos detalhados
        concepts = self.get_detailed_concepts(topic, module)
        concepts_text = "\n".join([f"#### **{i+1}.{j+1} {concept.split(':')[0]}**\n{concept.split(':', 1)[1] if ':' in concept else concept}" 
                                 for i, concept_list in enumerate([concepts]) 
                                 for j, concept in enumerate(concept_list)])
        
        # Exemplos práticos
        examples = self.get_practical_examples(topic, level)
        
        # Caso brasileiro
        case_study = self.get_brazilian_case_study(topic)
        
        # Exercícios detalhados
        exercises = self.get_detailed_exercises(topic, level)
        
        # Elementos interativos
        quiz = self.get_interactive_elements(topic)
        
        # Projeto final
        project = f"""## 📝 **Projeto Final: Aplicação Real**

### 🎯 **Objetivo**
Desenvolva uma aplicação que demonstre domínio completo de {topic}.

### 📋 **Requisitos Funcionais**
- **Funcionalidade Principal:** Implemente {topic} de forma robusta
- **Interface:** Crie uma interface intuitiva e responsiva
- **Performance:** Otimize para carregamento rápido
- **Testes:** Implemente testes unitários e de integração

### 🏗️ **Arquitetura Sugerida**
```
src/
├── components/     # Componentes reutilizáveis
├── services/       # Lógica de negócio
├── utils/          # Funções auxiliares
├── tests/          # Testes automatizados
└── docs/           # Documentação
```

### ✅ **Critérios de Avaliação**
- **Funcionalidade (40%):** Aplicação funciona conforme especificado
- **Código (30%):** Código limpo, bem documentado e testado
- **Performance (20%):** Carregamento rápido e otimizado
- **Inovação (10%):** Elementos criativos e diferenciais

### 🚀 **Deploy e Apresentação**
- Publique no GitHub com README detalhado
- Deploy em plataforma cloud (Vercel, Netlify, AWS)
- Prepare apresentação de 5 minutos
- Documente decisões arquiteturais

### 💼 **Valor para o Portfólio**
Este projeto demonstra:
- Conhecimento técnico sólido
- Capacidade de resolver problemas reais
- Boas práticas de desenvolvimento
- Experiência com deploy e DevOps"""

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
        lesson_content = f"""# 🎓 **Fenix Academy - {level.title()}**
## 📚 **Aula {lesson_number} - Módulo: {module}**
### 🎯 **Tópico: {topic}**

**Duração Estimada:** 90 min  
**Nível:** {level.title()}  
**Pré-requisitos:** Conhecimento básico de programação

---

{intro}

---

## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**

{concepts_text}

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico**
{examples}

### **Exemplo Avançado**
```javascript
// Implementação avançada de {topic}
// Código mais complexo e realista
const advanced{topic.replace(' ', '')} = {{
  // Implementação detalhada
}};
```

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

    def generate_all_courses_content(self):
        """Gera conteúdo para todos os cursos da Fenix"""
        courses = {
            'web-fundamentals': {
                'modules': [
                    'Fundamentos Essenciais do Desenvolvimento Web',
                    'HTML5 Semântico e Acessibilidade',
                    'CSS3 Avançado e Layouts Modernos',
                    'JavaScript Moderno e ES6+',
                    'React.js e Componentes',
                    'Node.js e APIs RESTful',
                    'Banco de Dados e Persistência',
                    'Autenticação e Segurança',
                    'Performance e SEO',
                    'PWA e Service Workers',
                    'Deploy e DevOps',
                    'TypeScript e Tipagem',
                    'Testing e Debugging',
                    'State Management',
                    'Routing e Navegação'
                ],
                'topics': [
                    'Introdução ao Desenvolvimento Web Moderno',
                    'Arquitetura Web e Componentes',
                    'Setup do Ambiente de Desenvolvimento',
                    'Ferramentas e Recursos Essenciais',
                    'HTML5 e Semântica',
                    'Estrutura de Documentos HTML5',
                    'Formulários HTML5 e Validação',
                    'Multimídia e Conteúdo Interativo',
                    'CSS3 Avançado e Seletores',
                    'Layout com Flexbox',
                    'Grid Layout CSS',
                    'Animações e Transições',
                    'Responsividade e Media Queries',
                    'CSS Custom Properties',
                    'JavaScript ES6+ e Moderno',
                    'Promises e Async/Await',
                    'Módulos ES6 e Import/Export',
                    'Classes e Herança',
                    'Arrow Functions e Contexto',
                    'Destructuring e Spread',
                    'Template Literals',
                    'Introdução ao React',
                    'Componentes e Props',
                    'Estado e Ciclo de Vida',
                    'Hooks: useState e useEffect',
                    'Context API e Gerenciamento de Estado',
                    'Roteamento com React Router',
                    'Formulários Controlados',
                    'Integração com APIs',
                    'Introdução ao Node.js',
                    'Express.js e Middleware',
                    'APIs RESTful e Endpoints',
                    'Autenticação JWT',
                    'Validação e Sanitização',
                    'SQL e Bancos Relacionais',
                    'MongoDB e NoSQL',
                    'Sequelize ORM',
                    'Mongoose para MongoDB',
                    'Conceitos de Segurança Web',
                    'OAuth 2.0 e OpenID Connect',
                    'HTTPS e Certificados SSL',
                    'Otimização de Performance',
                    'SEO e Meta Tags',
                    'Lazy Loading e Code Splitting',
                    'Progressive Web Apps',
                    'Service Workers',
                    'Manifest e Instalação',
                    'Docker e Containers',
                    'CI/CD com GitHub Actions',
                    'AWS e Cloud Computing',
                    'Introdução ao TypeScript',
                    'Tipos e Interfaces',
                    'Generics e Utility Types',
                    'Jest e Testing Framework',
                    'React Testing Library',
                    'E2E Testing com Cypress',
                    'Redux e Redux Toolkit',
                    'Zustand e Jotai',
                    'React Router Avançado',
                    'Next.js App Router'
                ]
            }
        }
        
        # Gerar conteúdo para Web Fundamentals
        course = courses['web-fundamentals']
        base_path = 'backend/fenix-expanded-content/web-fundamentals/avancado'
        
        for i, topic in enumerate(course['topics'], 1):
            module_index = (i - 1) // 5  # 5 aulas por módulo
            module = course['modules'][module_index] if module_index < len(course['modules']) else 'Módulo Avançado'
            
            lesson_content = self.generate_enhanced_lesson(topic, module, 'Avançado', i)
            
            # Salvar arquivo
            filename = f'aula-{i:02d}-modulo-{module_index+1:02d}-web-fundamentals.md'
            filepath = os.path.join(base_path, filename)
            
            os.makedirs(os.path.dirname(filepath), exist_ok=True)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(lesson_content)
            
            print(f"✅ Aula {i} gerada: {topic}")

if __name__ == "__main__":
    generator = EnhancedContentGenerator()
    generator.generate_all_courses_content()
