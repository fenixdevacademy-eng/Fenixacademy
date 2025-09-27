#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Geradores de conteúdo específico para diferentes tipos de cursos.
"""

import re
from typing import Dict, List, Any
from pathlib import Path

class ContentGenerator:
    """Classe base para geradores de conteúdo."""
    
    def __init__(self):
        self.templates = self._load_templates()
    
    def _load_templates(self) -> Dict[str, str]:
        """Carrega templates específicos para cada tipo de curso."""
        return {
            'backend': self._get_backend_templates(),
            'frontend': self._get_frontend_templates(),
            'mobile': self._get_mobile_templates(),
            'data_science': self._get_data_science_templates(),
            'devops': self._get_devops_templates(),
            'cybersecurity': self._get_cybersecurity_templates()
        }
    
    def generate_enhanced_content(self, course_type: str, lesson_data: Dict[str, Any], original_content: str) -> str:
        """Gera conteúdo melhorado baseado no tipo de curso."""
        if course_type in self.templates:
            return self._apply_course_specific_enhancements(course_type, lesson_data, original_content)
        else:
            return self._apply_generic_enhancements(lesson_data, original_content)
    
    def _apply_course_specific_enhancements(self, course_type: str, lesson_data: Dict[str, Any], content: str) -> str:
        """Aplica melhorias específicas baseadas no tipo de curso."""
        enhanced_content = content
        
        # Adicionar códigos específicos do tipo de curso
        if course_type == 'backend':
            enhanced_content = self._add_backend_specific_content(lesson_data, enhanced_content)
        elif course_type == 'frontend':
            enhanced_content = self._add_frontend_specific_content(lesson_data, enhanced_content)
        elif course_type == 'mobile':
            enhanced_content = self._add_mobile_specific_content(lesson_data, enhanced_content)
        elif course_type == 'data_science':
            enhanced_content = self._add_data_science_specific_content(lesson_data, enhanced_content)
        elif course_type == 'devops':
            enhanced_content = self._add_devops_specific_content(lesson_data, enhanced_content)
        elif course_type == 'cybersecurity':
            enhanced_content = self._add_cybersecurity_specific_content(lesson_data, enhanced_content)
        
        return enhanced_content
    
    def _add_backend_specific_content(self, lesson_data: Dict[str, Any], content: str) -> str:
        """Adiciona conteúdo específico para cursos de backend."""
        # Adicionar seção de APIs REST se não existir
        if 'API' not in content and 'api' not in content.lower():
            api_section = self._generate_api_section(lesson_data)
            content = self._insert_section_before_conclusion(content, api_section)
        
        # Adicionar seção de banco de dados se não existir
        if 'banco de dados' not in content.lower() and 'database' not in content.lower():
            db_section = self._generate_database_section(lesson_data)
            content = self._insert_section_before_conclusion(content, db_section)
        
        return content
    
    def _add_frontend_specific_content(self, lesson_data: Dict[str, Any], content: str) -> str:
        """Adiciona conteúdo específico para cursos de frontend."""
        # Adicionar seção de responsividade se não existir
        if 'responsivo' not in content.lower() and 'responsive' not in content.lower():
            responsive_section = self._generate_responsive_section(lesson_data)
            content = self._insert_section_before_conclusion(content, responsive_section)
        
        # Adicionar seção de acessibilidade se não existir
        if 'acessibilidade' not in content.lower() and 'accessibility' not in content.lower():
            accessibility_section = self._generate_accessibility_section(lesson_data)
            content = self._insert_section_before_conclusion(content, accessibility_section)
        
        return content
    
    def _add_mobile_specific_content(self, lesson_data: Dict[str, Any], content: str) -> str:
        """Adiciona conteúdo específico para cursos de mobile."""
        # Adicionar seção de performance mobile se não existir
        if 'performance' not in content.lower():
            performance_section = self._generate_mobile_performance_section(lesson_data)
            content = self._insert_section_before_conclusion(content, performance_section)
        
        return content
    
    def _add_data_science_specific_content(self, lesson_data: Dict[str, Any], content: str) -> str:
        """Adiciona conteúdo específico para cursos de data science."""
        # Adicionar seção de visualização de dados se não existir
        if 'visualização' not in content.lower() and 'visualization' not in content.lower():
            viz_section = self._generate_data_visualization_section(lesson_data)
            content = self._insert_section_before_conclusion(content, viz_section)
        
        return content
    
    def _add_devops_specific_content(self, lesson_data: Dict[str, Any], content: str) -> str:
        """Adiciona conteúdo específico para cursos de DevOps."""
        # Adicionar seção de CI/CD se não existir
        if 'ci/cd' not in content.lower() and 'pipeline' not in content.lower():
            cicd_section = self._generate_cicd_section(lesson_data)
            content = self._insert_section_before_conclusion(content, cicd_section)
        
        return content
    
    def _add_cybersecurity_specific_content(self, lesson_data: Dict[str, Any], content: str) -> str:
        """Adiciona conteúdo específico para cursos de cybersecurity."""
        # Adicionar seção de boas práticas de segurança se não existir
        if 'segurança' not in content.lower() and 'security' not in content.lower():
            security_section = self._generate_security_best_practices_section(lesson_data)
            content = self._insert_section_before_conclusion(content, security_section)
        
        return content
    
    def _insert_section_before_conclusion(self, content: str, new_section: str) -> str:
        """Insere uma nova seção antes da conclusão."""
        conclusion_pattern = r'## 📝 \*\*CONCLUSÃO'
        if re.search(conclusion_pattern, content):
            return re.sub(conclusion_pattern, f"{new_section}\n\n## 📝 **CONCLUSÃO", content)
        else:
            return content + "\n\n" + new_section
    
    def _generate_api_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção específica sobre APIs REST."""
        return f"""## 🔌 **APIs REST - Implementação Prática**

### **Conceitos Fundamentais**
APIs REST são fundamentais no desenvolvimento backend moderno. Vamos implementar uma API completa.

```javascript
// Exemplo de API REST com Express.js
const express = require('express');
const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Rota GET para listar recursos
app.get('/api/{lesson_data.get("title", "recursos").lower().replace(" ", "-")}', (req, res) => {{
    res.json({{
        success: true,
        data: [],
        message: 'Recursos listados com sucesso'
    }});
}});

// Rota POST para criar recurso
app.post('/api/{lesson_data.get("title", "recursos").lower().replace(" ", "-")}', (req, res) => {{
    const {{ body }} = req;
    // Lógica de criação
    res.status(201).json({{
        success: true,
        data: body,
        message: 'Recurso criado com sucesso'
    }});
}});

app.listen(3000, () => {{
    console.log('API rodando na porta 3000');
}});
```

### **Boas Práticas para APIs**
- **Versionamento:** Use versionamento semântico (v1, v2)
- **Documentação:** Documente com Swagger/OpenAPI
- **Validação:** Valide dados de entrada
- **Tratamento de Erros:** Implemente tratamento consistente
- **Rate Limiting:** Implemente limitação de taxa
- **Autenticação:** Use JWT ou OAuth2

---
"""
    
    def _generate_database_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção específica sobre banco de dados."""
        return f"""## 🗄️ **Banco de Dados - Modelagem e Consultas**

### **Modelagem de Dados**
A modelagem correta é fundamental para performance e escalabilidade.

```sql
-- Exemplo de schema para {lesson_data.get("title", "sistema")}
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE {lesson_data.get("title", "recursos").lower().replace(" ", "_")} (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_recursos_usuario ON {lesson_data.get("title", "recursos").lower().replace(" ", "_")}(usuario_id);
```

### **Consultas Otimizadas**
```sql
-- Consulta com JOIN otimizada
SELECT 
    u.nome,
    r.titulo,
    r.created_at
FROM usuarios u
INNER JOIN {lesson_data.get("title", "recursos").lower().replace(" ", "_")} r ON u.id = r.usuario_id
WHERE u.email = $1
ORDER BY r.created_at DESC
LIMIT 10;
```

---
"""
    
    def _generate_responsive_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção específica sobre design responsivo."""
        return f"""## 📱 **Design Responsivo - Mobile First**

### **Princípios do Mobile First**
O design mobile-first garante melhor experiência em todos os dispositivos.

```css
/* Base mobile-first */
.container {{
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
}}

/* Tablet */
@media (min-width: 768px) {{
    .container {{
        max-width: 750px;
        padding: 2rem;
    }}
}}

/* Desktop */
@media (min-width: 1024px) {{
    .container {{
        max-width: 1200px;
        padding: 3rem;
    }}
}}
```

### **Grid System Responsivo**
```css
.grid {{
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
}}

@media (min-width: 768px) {{
    .grid {{
        grid-template-columns: repeat(2, 1fr);
    }}
}}

@media (min-width: 1024px) {{
    .grid {{
        grid-template-columns: repeat(3, 1fr);
    }}
}}
```

---
"""
    
    def _generate_accessibility_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção específica sobre acessibilidade."""
        return f"""## ♿ **Acessibilidade Web - Padrões WCAG**

### **Implementação de Acessibilidade**
Acessibilidade não é opcional - é obrigatória para inclusão digital.

```html
<!-- HTML semântico e acessível -->
<main role="main">
    <h1>Página Principal</h1>
    
    <nav aria-label="Navegação principal">
        <ul>
            <li><a href="#home" aria-current="page">Início</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
        </ul>
    </nav>
    
    <section aria-labelledby="content-heading">
        <h2 id="content-heading">Conteúdo Principal</h2>
        <p>Conteúdo da página...</p>
    </section>
</main>
```

### **ARIA Labels e Roles**
```html
<!-- Botões com contexto -->
<button 
    aria-label="Fechar modal"
    aria-expanded="false"
    aria-controls="modal-content"
>
    ✕
</button>

<!-- Formulários acessíveis -->
<form>
    <label for="email">Email:</label>
    <input 
        type="email" 
        id="email" 
        name="email"
        required
        aria-describedby="email-help"
    >
    <div id="email-help">Digite seu email válido</div>
</form>
```

---
"""
    
    def _generate_mobile_performance_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção específica sobre performance mobile."""
        return f"""## ⚡ **Performance Mobile - Otimizações Essenciais**

### **Lazy Loading de Imagens**
```javascript
// Lazy loading nativo
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {{
    entries.forEach(entry => {{
        if (entry.isIntersecting) {{
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }}
    }});
}});

images.forEach(img => imageObserver.observe(img));
```

### **Service Worker para Cache**
```javascript
// service-worker.js
const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
    '/',
    '/styles/main.css',
    '/scripts/main.js'
];

self.addEventListener('install', event => {{
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
}});

self.addEventListener('fetch', event => {{
    event.respondWith(
        caches.match(event.request)
            .then(response => {{
                return response || fetch(event.request);
            }})
    );
}});
```

---
"""
    
    def _generate_data_visualization_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção específica sobre visualização de dados."""
        return f"""## 📊 **Visualização de Dados - Storytelling com Dados**

### **Gráficos Interativos com D3.js**
```javascript
// Gráfico de barras interativo
const data = [12, 19, 3, 5, 2, 3];
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', 400)
    .attr('height', 300);

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 50)
    .attr('y', d => 300 - d * 10)
    .attr('width', 40)
    .attr('height', d => d * 10)
    .attr('fill', 'steelblue');
```

### **Dashboard com Plotly**
```python
import plotly.graph_objects as go
import plotly.express as px

# Gráfico de linha temporal
fig = px.line(df, x='data', y='valor', title='Evolução Temporal')
fig.update_layout(
    xaxis_title="Data",
    yaxis_title="Valor",
    hovermode='x unified'
)
fig.show()
```

---
"""
    
    def _generate_cicd_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção específica sobre CI/CD."""
        return f"""## 🔄 **CI/CD Pipeline - Automação Completa**

### **GitHub Actions Workflow**
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to production
      run: echo "Deploying to production..."
```

### **Docker Multi-stage Build**
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---
"""
    
    def _generate_security_best_practices_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção específica sobre boas práticas de segurança."""
        return f"""## 🔒 **Segurança - Boas Práticas Essenciais**

### **Validação e Sanitização de Dados**
```javascript
// Validação de entrada
const validator = require('validator');

function validateUserInput(input) {{
    const errors = [];
    
    if (!validator.isEmail(input.email)) {{
        errors.push('Email inválido');
    }}
    
    if (!validator.isLength(input.password, {{min: 8}})) {{
        errors.push('Senha deve ter pelo menos 8 caracteres');
    }}
    
    if (!validator.isAlphanumeric(input.username)) {{
        errors.push('Username deve conter apenas letras e números');
    }}
    
    return {{
        isValid: errors.length === 0,
        errors
    }};
}}
```

### **Headers de Segurança**
```javascript
// Express.js com helmet
const helmet = require('helmet');
app.use(helmet());

// Headers customizados
app.use((req, res, next) => {{
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
}});
```

---
"""
    
    def _apply_generic_enhancements(self, lesson_data: Dict[str, Any], content: str) -> str:
        """Aplica melhorias genéricas para qualquer tipo de curso."""
        enhanced_content = content
        
        # Adicionar seção de exercícios práticos se não existir
        if 'exercício' not in content.lower() and 'desafio' not in content.lower():
            exercise_section = self._generate_generic_exercise_section(lesson_data)
            enhanced_content = self._insert_section_before_conclusion(enhanced_content, exercise_section)
        
        return enhanced_content
    
    def _generate_generic_exercise_section(self, lesson_data: Dict[str, Any]) -> str:
        """Gera seção genérica de exercícios práticos."""
        return f"""## 🚀 **Exercício Prático - Aplicação Real**

### **Desafio do Mercado**
Implemente uma solução real baseada nos conceitos aprendidos nesta aula.

### **Requisitos Técnicos**
- Implemente os conceitos principais da aula
- Use as melhores práticas apresentadas
- Teste sua solução
- Documente o código

### **Entregáveis**
- Código fonte no GitHub
- README com instruções
- Demonstração funcional
- Testes automatizados

---
"""
    
    def _get_backend_templates(self) -> Dict[str, str]:
        """Templates específicos para cursos de backend."""
        return {
            'api_example': 'Exemplo de API REST',
            'database_example': 'Exemplo de banco de dados',
            'security_example': 'Exemplo de segurança'
        }
    
    def _get_frontend_templates(self) -> Dict[str, str]:
        """Templates específicos para cursos de frontend."""
        return {
            'responsive_example': 'Exemplo de design responsivo',
            'accessibility_example': 'Exemplo de acessibilidade',
            'performance_example': 'Exemplo de performance'
        }
    
    def _get_mobile_templates(self) -> Dict[str, str]:
        """Templates específicos para cursos de mobile."""
        return {
            'performance_example': 'Exemplo de performance mobile',
            'ui_example': 'Exemplo de interface mobile',
            'navigation_example': 'Exemplo de navegação mobile'
        }
    
    def _get_data_science_templates(self) -> Dict[str, str]:
        """Templates específicos para cursos de data science."""
        return {
            'visualization_example': 'Exemplo de visualização',
            'analysis_example': 'Exemplo de análise',
            'ml_example': 'Exemplo de machine learning'
        }
    
    def _get_devops_templates(self) -> Dict[str, str]:
        """Templates específicos para cursos de DevOps."""
        return {
            'cicd_example': 'Exemplo de CI/CD',
            'docker_example': 'Exemplo de Docker',
            'monitoring_example': 'Exemplo de monitoramento'
        }
    
    def _get_cybersecurity_templates(self) -> Dict[str, str]:
        """Templates específicos para cursos de cybersecurity."""
        return {
            'security_example': 'Exemplo de segurança',
            'penetration_example': 'Exemplo de pentest',
            'compliance_example': 'Exemplo de compliance'
        }












