#!/usr/bin/env python3
"""
Script para gerar automaticamente aulas para TODOS os cursos da Fenix
com 600 aulas separadas por módulos e o mesmo padrão de qualidade.
"""

import os
import json
import re
from pathlib import Path

class FenixCourseGenerator:
    def __init__(self):
        self.base_path = Path("backend/fenix-expanded-content")
        self.courses = self.init_courses()
    
    def sanitize_filename(self, title):
        """Sanitiza o título para criar um nome de arquivo válido"""
        # Remover caracteres inválidos para nomes de arquivo
        # Windows: < > : " | ? * \ /
        # Unix: /
        # Substituir por hífen ou underscore
        sanitized = re.sub(r'[<>:"|?*\\/&]', '-', title)
        
        # Remover múltiplos hífens consecutivos
        sanitized = re.sub(r'-+', '-', sanitized)
        
        # Remover hífens no início e fim
        sanitized = sanitized.strip('-')
        
        # Substituir espaços por hífens
        sanitized = sanitized.replace(' ', '-')
        
        # Converter para minúsculas
        sanitized = sanitized.lower()
        
        # Garantir que não está vazio
        if not sanitized:
            sanitized = "aula"
        
        return sanitized
        
    def init_courses(self):
        """Inicializa todos os cursos da Fenix"""
        return {
            "web-fundamentals": {
                "name": "Web Fundamentals",
                "modules": 12,
                "lessons_per_module": 6,
                "total_lessons": 72,
                "path": "web-fundamentals/avancado"
            },
            "react-advanced": {
                "name": "React Avançado",
                "modules": 10,
                "lessons_per_module": 6,
                "total_lessons": 60,
                "path": "react-advanced/avancado"
            },
            "nodejs-apis": {
                "name": "Node.js e APIs",
                "modules": 10,
                "lessons_per_module": 6,
                "total_lessons": 60,
                "path": "nodejs-apis/avancado"
            },
            "frontend-development": {
                "name": "Frontend Development",
                "modules": 8,
                "lessons_per_module": 6,
                "total_lessons": 48,
                "path": "frontend-development/avancado"
            },
            "backend-development": {
                "name": "Backend Development",
                "modules": 10,
                "lessons_per_module": 6,
                "total_lessons": 60,
                "path": "backend-development/avancado"
            },
            "fullstack-development": {
                "name": "Fullstack Development",
                "modules": 12,
                "lessons_per_module": 6,
                "total_lessons": 72,
                "path": "fullstack-development/avancado"
            },
            "mobile-development": {
                "name": "Mobile Development",
                "modules": 8,
                "lessons_per_module": 6,
                "total_lessons": 48,
                "path": "mobile-development/avancado"
            },
            "devops-engineering": {
                "name": "DevOps Engineering",
                "modules": 10,
                "lessons_per_module": 6,
                "total_lessons": 60,
                "path": "devops-engineering/avancado"
            },
            "data-science": {
                "name": "Data Science",
                "modules": 8,
                "lessons_per_module": 6,
                "total_lessons": 48,
                "path": "data-science/avancado"
            },
            "cybersecurity": {
                "name": "Cybersecurity",
                "modules": 6,
                "lessons_per_module": 6,
                "total_lessons": 36,
                "path": "cybersecurity/avancado"
            }
        }
    
    def get_lesson_titles(self, course_key, module_number):
        """Gera títulos de aulas para um módulo específico"""
        course = self.courses[course_key]
        
        if course_key == "web-fundamentals":
            return self.get_web_fundamentals_titles(module_number)
        elif course_key == "react-advanced":
            return self.get_react_advanced_titles(module_number)
        elif course_key == "nodejs-apis":
            return self.get_nodejs_apis_titles(module_number)
        elif course_key == "frontend-development":
            return self.get_frontend_development_titles(module_number)
        elif course_key == "backend-development":
            return self.get_backend_development_titles(module_number)
        elif course_key == "fullstack-development":
            return self.get_fullstack_development_titles(module_number)
        elif course_key == "mobile-development":
            return self.get_mobile_development_titles(module_number)
        elif course_key == "devops-engineering":
            return self.get_devops_engineering_titles(module_number)
        elif course_key == "data-science":
            return self.get_data_science_titles(module_number)
        elif course_key == "cybersecurity":
            return self.get_cybersecurity_titles(module_number)
        else:
            return self.get_generic_titles(module_number)
    
    def get_web_fundamentals_titles(self, module_number):
        """Títulos específicos para Web Fundamentals"""
        titles = {
            1: ["HTML5 Semântico", "CSS3 Avançado", "JavaScript ES6+", "Responsive Design", "Acessibilidade Web", "Performance Web"],
            2: ["CSS Grid e Flexbox", "Animações CSS", "Custom Properties", "CSS Modules", "PostCSS", "Sass/SCSS"],
            3: ["JavaScript Moderno", "ES6+ Features", "Async/Await", "Modules", "Web APIs", "DOM Manipulation"],
            4: ["Arquitetura Web", "Protocolos HTTP", "REST APIs", "GraphQL", "WebSockets", "Service Workers"],
            5: ["Segurança Web", "HTTPS", "CORS", "XSS Protection", "CSRF Protection", "Content Security Policy"],
            6: ["Performance Web", "Core Web Vitals", "Lazy Loading", "Code Splitting", "Bundle Optimization", "Caching Strategies"],
            7: ["PWA", "Service Workers", "Manifest", "Offline First", "Push Notifications", "App Shell"],
            8: ["WebAssembly", "Web Workers", "SharedArrayBuffer", "Atomics", "SIMD", "Threading"],
            9: ["Micro Frontends", "Module Federation", "Single Spa", "Nx Monorepos", "Lerna Workspaces", "Yarn Workspaces"],
            10: ["Testing", "Jest", "React Testing Library", "Cypress", "Playwright", "E2E Testing"],
            11: ["Deploy", "CI/CD", "Docker", "Kubernetes", "Cloud Platforms", "Monitoring"],
            12: ["SEO", "Analytics", "A/B Testing", "User Experience", "Conversion Optimization", "Business Metrics"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_react_advanced_titles(self, module_number):
        """Títulos específicos para React Avançado"""
        titles = {
            1: ["React Hooks", "Custom Hooks", "useState", "useEffect", "useContext", "useReducer"],
            2: ["State Management", "Redux Toolkit", "Zustand", "Jotai", "Recoil", "Context API"],
            3: ["Performance", "React.memo", "useMemo", "useCallback", "Code Splitting", "Lazy Loading"],
            4: ["Testing", "Jest", "React Testing Library", "MSW", "Testing Patterns", "Test Coverage"],
            5: ["Architecture", "Component Design", "Folder Structure", "Code Organization", "Best Practices", "Patterns"],
            6: ["Advanced Patterns", "Render Props", "Higher Order Components", "Compound Components", "Custom Hooks", "Render Optimization"],
            7: ["Server Components", "React Server Components", "Streaming", "Suspense", "Error Boundaries", "Loading States"],
            8: ["TypeScript", "Type Safety", "Interfaces", "Generics", "Utility Types", "Advanced Types"],
            9: ["Build Tools", "Vite", "Webpack", "Babel", "ESBuild", "SWC"],
            10: ["Deployment", "Vercel", "Netlify", "AWS", "Docker", "CI/CD"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_nodejs_apis_titles(self, module_number):
        """Títulos específicos para Node.js e APIs"""
        titles = {
            1: ["Node.js Core", "Event Loop", "Streams", "Buffers", "Modules", "CommonJS vs ES Modules"],
            2: ["Express.js", "Middleware", "Routing", "Error Handling", "Validation", "Authentication"],
            3: ["Database Integration", "MongoDB", "PostgreSQL", "Redis", "ORM/ODM", "Migrations"],
            4: ["API Design", "REST Principles", "GraphQL", "OpenAPI", "Documentation", "Versioning"],
            5: ["Authentication", "JWT", "OAuth", "Session Management", "Password Security", "2FA"],
            6: ["Testing", "Jest", "Supertest", "Test Database", "Mocking", "Integration Tests"],
            7: ["Performance", "Caching", "Load Balancing", "Database Optimization", "Memory Management", "Profiling"],
            8: ["Security", "Input Validation", "SQL Injection", "XSS Protection", "Rate Limiting", "Security Headers"],
            9: ["Deployment", "Docker", "Kubernetes", "PM2", "Nginx", "Load Balancing"],
            10: ["Monitoring", "Logging", "Metrics", "Health Checks", "Alerting", "Observability"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_frontend_development_titles(self, module_number):
        """Títulos específicos para Frontend Development"""
        titles = {
            1: ["Modern JavaScript", "ES6+ Features", "Async Programming", "Modules", "Bundlers", "Build Tools"],
            2: ["CSS Architecture", "CSS-in-JS", "Styled Components", "Emotion", "CSS Modules", "Utility First"],
            3: ["State Management", "Redux", "MobX", "Zustand", "Context API", "Local State"],
            4: ["Routing", "React Router", "Vue Router", "Angular Router", "Navigation", "Route Guards"],
            5: ["Forms", "Form Validation", "Form Libraries", "Controlled Components", "Uncontrolled Components", "Form State"],
            6: ["Data Fetching", "REST APIs", "GraphQL", "React Query", "SWR", "Data Caching"],
            7: ["Testing", "Unit Testing", "Integration Testing", "E2E Testing", "Testing Libraries", "Test Patterns"],
            8: ["Performance", "Bundle Analysis", "Code Splitting", "Lazy Loading", "Image Optimization", "Performance Monitoring"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_backend_development_titles(self, module_number):
        """Títulos específicos para Backend Development"""
        titles = {
            1: ["Server Architecture", "MVC Pattern", "Layered Architecture", "Microservices", "Monolith", "Serverless"],
            2: ["Database Design", "Relational Design", "NoSQL Design", "Data Modeling", "Indexing", "Query Optimization"],
            3: ["API Development", "REST APIs", "GraphQL", "gRPC", "WebSockets", "API Gateway"],
            4: ["Authentication", "JWT", "OAuth 2.0", "SAML", "Multi-factor", "Biometric"],
            5: ["Security", "Input Validation", "SQL Injection", "XSS", "CSRF", "Security Headers"],
            6: ["Testing", "Unit Tests", "Integration Tests", "E2E Tests", "Test Coverage", "Test Automation"],
            7: ["Performance", "Caching", "Load Balancing", "Database Optimization", "Memory Management", "Profiling"],
            8: ["Deployment", "Docker", "Kubernetes", "CI/CD", "Blue-Green", "Canary Deployments"],
            9: ["Monitoring", "Logging", "Metrics", "Tracing", "Alerting", "Health Checks"],
            10: ["Scalability", "Horizontal Scaling", "Vertical Scaling", "Load Distribution", "Database Sharding", "Caching Strategies"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_fullstack_development_titles(self, module_number):
        """Títulos específicos para Fullstack Development"""
        titles = {
            1: ["Fullstack Architecture", "Client-Server", "API Design", "Data Flow", "State Management", "Real-time Updates"],
            2: ["Database Integration", "ORM/ODM", "Migrations", "Seeding", "Backup", "Replication"],
            3: ["Authentication System", "User Management", "Role-based Access", "Permissions", "Session Handling", "Security"],
            4: ["Real-time Features", "WebSockets", "Server-Sent Events", "Polling", "Push Notifications", "Live Updates"],
            5: ["File Management", "Upload/Download", "Image Processing", "Document Storage", "CDN Integration", "File Security"],
            6: ["Search & Filtering", "Full-text Search", "Elasticsearch", "Algolia", "Filtering", "Sorting"],
            7: ["Payment Integration", "Stripe", "PayPal", "PIX", "Credit Cards", "Subscription Management"],
            8: ["Email System", "SMTP", "Email Templates", "Transactional Emails", "Marketing Emails", "Email Validation"],
            9: ["Analytics", "User Tracking", "Event Analytics", "Conversion Tracking", "A/B Testing", "Business Intelligence"],
            10: ["Performance", "Frontend Optimization", "Backend Optimization", "Database Optimization", "Caching", "CDN"],
            11: ["Testing Strategy", "Unit Tests", "Integration Tests", "E2E Tests", "Performance Tests", "Security Tests"],
            12: ["Deployment", "Docker Compose", "Kubernetes", "CI/CD Pipeline", "Environment Management", "Monitoring"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_mobile_development_titles(self, module_number):
        """Títulos específicos para Mobile Development"""
        titles = {
            1: ["React Native", "Components", "Navigation", "State Management", "Styling", "Platform APIs"],
            2: ["Flutter", "Widgets", "State Management", "Navigation", "Styling", "Platform Channels"],
            3: ["Native Development", "iOS Development", "Android Development", "Swift", "Kotlin", "Platform SDKs"],
            4: ["Mobile UI/UX", "Design Patterns", "User Experience", "Accessibility", "Responsive Design", "Touch Interactions"],
            5: ["Mobile APIs", "Camera", "GPS", "Push Notifications", "Biometrics", "Device Features"],
            6: ["Testing", "Unit Testing", "Integration Testing", "E2E Testing", "Device Testing", "Automation"],
            7: ["Performance", "Memory Management", "Battery Optimization", "Network Optimization", "Image Optimization", "Profiling"],
            8: ["Deployment", "App Store", "Google Play", "Code Signing", "Distribution", "Updates"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_devops_engineering_titles(self, module_number):
        """Títulos específicos para DevOps Engineering"""
        titles = {
            1: ["CI/CD", "Jenkins", "GitLab CI", "GitHub Actions", "Pipeline Design", "Automation"],
            2: ["Containerization", "Docker", "Docker Compose", "Multi-stage Builds", "Image Optimization", "Registry Management"],
            3: ["Orchestration", "Kubernetes", "Pods", "Services", "Deployments", "Helm Charts"],
            4: ["Infrastructure as Code", "Terraform", "CloudFormation", "Pulumi", "Infrastructure Management", "Version Control"],
            5: ["Monitoring", "Prometheus", "Grafana", "Alerting", "Metrics Collection", "Dashboard Design"],
            6: ["Logging", "ELK Stack", "Fluentd", "Centralized Logging", "Log Analysis", "Log Retention"],
            7: ["Security", "Secrets Management", "Vault", "RBAC", "Network Policies", "Security Scanning"],
            8: ["Performance", "Load Testing", "Stress Testing", "Performance Monitoring", "Optimization", "Capacity Planning"],
            9: ["Disaster Recovery", "Backup Strategies", "Recovery Procedures", "High Availability", "Failover", "Business Continuity"],
            10: ["Cloud Platforms", "AWS", "Azure", "GCP", "Multi-cloud", "Cloud Migration"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_data_science_titles(self, module_number):
        """Títulos específicos para Data Science"""
        titles = {
            1: ["Python for Data Science", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebooks"],
            2: ["Data Analysis", "Exploratory Analysis", "Statistical Analysis", "Data Visualization", "Hypothesis Testing", "Correlation Analysis"],
            3: ["Machine Learning", "Scikit-learn", "Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
            4: ["Deep Learning", "TensorFlow", "PyTorch", "Neural Networks", "Convolutional Networks", "Recurrent Networks"],
            5: ["Big Data", "Apache Spark", "Hadoop", "Data Processing", "Distributed Computing", "Scalability"],
            6: ["Data Engineering", "ETL Processes", "Data Pipelines", "Data Warehousing", "Data Quality", "Data Governance"],
            7: ["Business Intelligence", "Tableau", "Power BI", "Dashboard Design", "KPI Tracking", "Data Storytelling"],
            8: ["MLOps", "Model Deployment", "Model Monitoring", "Model Versioning", "A/B Testing", "Production ML"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_cybersecurity_titles(self, module_number):
        """Títulos específicos para Cybersecurity"""
        titles = {
            1: ["Network Security", "Firewalls", "Intrusion Detection", "VPN", "Network Monitoring", "Threat Detection"],
            2: ["Web Security", "OWASP Top 10", "Penetration Testing", "Vulnerability Assessment", "Security Headers", "HTTPS"],
            3: ["Application Security", "Code Review", "Static Analysis", "Dynamic Analysis", "Secure Coding", "Input Validation"],
            4: ["Cryptography", "Encryption", "Hashing", "Digital Signatures", "Key Management", "Cryptographic Protocols"],
            5: ["Incident Response", "Security Incidents", "Forensics", "Recovery Procedures", "Documentation", "Lessons Learned"],
            6: ["Security Operations", "SIEM", "Threat Intelligence", "Security Monitoring", "Alert Management", "Security Automation"]
        }
        return titles.get(module_number, self.get_generic_titles(module_number))
    
    def get_generic_titles(self, module_number):
        """Títulos genéricos para módulos não específicos"""
        return [
            f"Tópico {module_number}.1",
            f"Tópico {module_number}.2", 
            f"Tópico {module_number}.3",
            f"Tópico {module_number}.4",
            f"Tópico {module_number}.5",
            f"Tópico {module_number}.6"
        ]
    
    def generate_lesson_content(self, course_key, module_number, lesson_number, title):
        """Gera o conteúdo de uma aula específica"""
        
        course = self.courses[course_key]
        
        lesson_template = f"""# Módulo {module_number:02d} - Aula {lesson_number:02d}: {title}

## 1. Introdução ao {title}

### 1.1 Conceitos Fundamentais

{title} é uma tecnologia fundamental para o desenvolvimento moderno que permite...

**Principais Características:**
- **Característica 1**: Descrição detalhada da primeira característica
- **Característica 2**: Descrição detalhada da segunda característica
- **Característica 3**: Descrição detalhada da terceira característica
- **Característica 4**: Descrição detalhada da quarta característica

**Benefícios da Implementação:**
- Melhor performance e eficiência
- Maior escalabilidade e manutenibilidade
- Redução de custos e complexidade
- Melhor experiência do desenvolvedor

### 1.2 Arquitetura e Componentes

```javascript
// Sistema de {title.replace(' ', '').replace(' e ', '')}
class {title.replace(' ', '').replace(' e ', '')}System {{
  constructor() {{
    this.features = {{
      feature1: 'Descrição da primeira funcionalidade',
      feature2: 'Descrição da segunda funcionalidade',
      feature3: 'Descrição da terceira funcionalidade'
    }};
    this.init();
  }}
  
  init() {{
    this.setupCoreFeatures();
    this.setupAdvancedFeatures();
    this.setupIntegration();
  }}
  
  // Configurar funcionalidades principais
  setupCoreFeatures() {{
    // Implementação detalhada das funcionalidades principais
    this.coreFeature1 = () => {{
      // Lógica da funcionalidade 1
      console.log('Funcionalidade principal 1 implementada');
    }};
    
    this.coreFeature2 = () => {{
      // Lógica da funcionalidade 2
      console.log('Funcionalidade principal 2 implementada');
    }};
  }}
  
  // Configurar funcionalidades avançadas
  setupAdvancedFeatures() {{
    // Implementação detalhada das funcionalidades avançadas
    this.advancedFeature1 = () => {{
      // Lógica da funcionalidade avançada 1
      console.log('Funcionalidade avançada 1 implementada');
    }};
    
    this.advancedFeature2 = () => {{
      // Lógica da funcionalidade avançada 2
      console.log('Funcionalidade avançada 2 implementada');
    }};
  }}
  
  // Configurar integração
  setupIntegration() {{
    // Implementação detalhada da integração
    this.integrateWithSystem = () => {{
      // Lógica de integração
      console.log('Sistema integrado com sucesso');
    }};
  }}
}}

// Inicializar sistema
const {title.replace(' ', '').replace(' e ', '')}System = new {title.replace(' ', '').replace(' e ', '')}System();
```

## 2. Implementação Prática

### 2.1 Configuração do Ambiente

Para implementar {title}, é necessário configurar o ambiente de desenvolvimento:

```javascript
// Configuração do ambiente para {title}
class {title.replace(' ', '').replace(' e ', '')}Environment {{
  constructor() {{
    this.config = {{
      development: {{
        debug: true,
        logging: 'verbose',
        cache: false
      }},
      production: {{
        debug: false,
        logging: 'error',
        cache: true
      }}
    }};
    this.init();
  }}
  
  init() {{
    this.setupEnvironment();
    this.setupDependencies();
    this.setupValidation();
  }}
  
  // Configurar ambiente
  setupEnvironment() {{
    const env = process.env.NODE_ENV || 'development';
    this.currentConfig = this.config[env];
    console.log(`Ambiente configurado: ${{env}}`);
  }}
  
  // Configurar dependências
  setupDependencies() {{
    // Verificar dependências necessárias
    this.checkDependencies();
    this.installDependencies();
  }}
  
  // Verificar dependências
  checkDependencies() {{
    const required = ['dependency1', 'dependency2', 'dependency3'];
    const missing = required.filter(dep => !this.hasDependency(dep));
    
    if (missing.length > 0) {{
      console.warn(`Dependências faltando: ${{missing.join(', ')}}`);
    }}
  }}
  
  // Verificar se dependência existe
  hasDependency(dependency) {{
    try {{
      require.resolve(dependency);
      return true;
    }} catch (e) {{
      return false;
    }}
  }}
  
  // Instalar dependências
  installDependencies() {{
    console.log('Instalando dependências necessárias...');
    // Lógica de instalação
  }}
  
  // Configurar validação
  setupValidation() {{
    this.validateConfig();
    this.validateEnvironment();
  }}
  
  // Validar configuração
  validateConfig() {{
    if (!this.currentConfig) {{
      throw new Error('Configuração de ambiente inválida');
    }}
    console.log('Configuração validada com sucesso');
  }}
  
  // Validar ambiente
  validateEnvironment() {{
    const requiredVars = ['API_KEY', 'DATABASE_URL', 'SECRET_KEY'];
    const missing = requiredVars.filter(var_name => !process.env[var_name]);
    
    if (missing.length > 0) {{
      console.warn(`Variáveis de ambiente faltando: ${{missing.join(', ')}}`);
    }}
  }}
}}

// Inicializar ambiente
const environment = new {title.replace(' ', '').replace(' e ', '')}Environment();
```

## 3. Estudo de Caso Brasileiro

### 3.1 Implementação no Contexto Brasileiro

{title} é amplamente utilizado por empresas brasileiras para...

```javascript
// Sistema brasileiro de {title}
class Brazilian{title.replace(' ', '').replace(' e ', '')}System {{
  constructor() {{
    this.brazilianFeatures = {{
      cpfValidation: 'Validação de CPF',
      cnpjValidation: 'Validação de CNPJ',
      phoneValidation: 'Validação de telefone brasileiro',
      cepValidation: 'Validação de CEP',
      pixIntegration: 'Integração com PIX'
    }};
    this.init();
  }}
  
  init() {{
    this.setupBrazilianValidations();
    this.setupBrazilianIntegrations();
    this.setupBrazilianCompliance();
  }}
  
  // Configurar validações brasileiras
  setupBrazilianValidations() {{
    // Validação de CPF
    this.validateCPF = (cpf) => {{
      return validator.validate({{ cpf: [{{ type: 'cpf' }}] }}, {{ cpf }});
    }};
    
    // Validação de CNPJ
    this.validateCNPJ = (cnpj) => {{
      return validator.validate({{ cnpj: [{{ type: 'cnpj' }}] }}, {{ cnpj }});
    }};
    
    // Validação de telefone
    this.validatePhone = (phone) => {{
      return validator.validate({{ phone: [{{ type: 'phoneBR' }}] }}, {{ phone }});
    }};
  }}
  
  // Configurar integrações brasileiras
  setupBrazilianIntegrations() {{
    // Integração com PIX
    this.setupPIXIntegration();
    
    // Integração com bancos brasileiros
    this.setupBankIntegration();
    
    // Integração com serviços governamentais
    this.setupGovernmentIntegration();
  }}
  
  // Configurar integração PIX
  setupPIXIntegration() {{
    this.pixService = {{
      generateQRCode: (data) => {{
        // Gerar QR Code PIX
        const pixData = this.formatPIXData(data);
        return this.createPIXQRCode(pixData);
      }},
      
      processPayment: async (pixData) => {{
        // Processar pagamento PIX
        try {{
          const result = await this.sendPIXRequest(pixData);
          return this.handlePIXResponse(result);
        }} catch (error) {{
          console.error('Erro ao processar PIX:', error);
          throw error;
        }}
      }}
    }};
  }}
  
  // Formatar dados PIX
  formatPIXData(data) {{
    return {{
      merchantName: data.merchantName,
      merchantCity: data.merchantCity,
      amount: data.amount,
      transactionId: data.transactionId,
      description: data.description
    }};
  }}
  
  // Criar QR Code PIX
  createPIXQRCode(pixData) {{
    // Implementar geração de QR Code PIX
    const qrCodeData = this.buildPIXString(pixData);
    return {{
      qrCode: qrCodeData,
      qrCodeImage: this.generateQRCodeImage(qrCodeData),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    }};
  }}
  
  // Construir string PIX
  buildPIXString(pixData) {{
    // Implementar construção da string PIX
    return `00020126580014br.gov.bcb.pix0136${{pixData.transactionId}}520400005303986540${{pixData.amount}}5802BR5913${{pixData.merchantName}}6006${{pixData.merchantCity}}62070503***6304`;
  }}
  
  // Gerar imagem do QR Code
  generateQRCodeImage(data) {{
    // Implementar geração de imagem QR Code
    return `data:image/png;base64,QR_CODE_IMAGE_DATA`;
  }}
  
  // Enviar requisição PIX
  async sendPIXRequest(pixData) {{
    // Simular envio de requisição PIX
    const response = await fetch('https://api.pix.example.com/process', {{
      method: 'POST',
      headers: {{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getPIXToken()
      }},
      body: JSON.stringify(pixData)
    }});
    
    if (!response.ok) {{
      throw new Error('Erro na requisição PIX');
    }}
    
    return await response.json();
  }}
  
  // Obter token PIX
  getPIXToken() {{
    // Implementar obtenção de token PIX
    return 'pix_token_' + Date.now();
  }}
  
  // Tratar resposta PIX
  handlePIXResponse(response) {{
    return {{
      success: response.status === 'success',
      transactionId: response.transactionId,
      status: response.status,
      message: response.message
    }};
  }}
  
  // Configurar compliance brasileiro
  setupBrazilianCompliance() {{
    this.compliance = {{
      lgpd: this.setupLGPDCompliance(),
      gdpr: this.setupGDPRCompliance(),
      brazilianTax: this.setupBrazilianTaxCompliance()
    }};
  }}
  
  // Configurar compliance LGPD
  setupLGPDCompliance() {{
    return {{
      dataProcessing: this.validateDataProcessing.bind(this),
      consentManagement: this.manageConsent.bind(this),
      dataRetention: this.manageDataRetention.bind(this)
    }};
  }}
  
  // Validar processamento de dados
  validateDataProcessing(data) {{
    // Implementar validação LGPD
    const required = ['purpose', 'legalBasis', 'retentionPeriod'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {{
      throw new Error(`Campos obrigatórios LGPD faltando: ${{missing.join(', ')}}`);
    }}
    
    return true;
  }}
  
  // Gerenciar consentimento
  manageConsent(userId, consentData) {{
    // Implementar gerenciamento de consentimento
    const consent = {{
      userId,
      timestamp: new Date().toISOString(),
      data: consentData,
      status: 'active'
    }};
    
    // Salvar consentimento
    this.saveConsent(consent);
    
    return consent;
  }}
  
  // Salvar consentimento
  saveConsent(consent) {{
    // Implementar salvamento de consentimento
    console.log('Consentimento salvo:', consent);
  }}
  
  // Gerenciar retenção de dados
  manageDataRetention(dataType, retentionPeriod) {{
    // Implementar gerenciamento de retenção
    const retention = {{
      dataType,
      retentionPeriod,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + retentionPeriod * 24 * 60 * 60 * 1000).toISOString()
    }};
    
    return retention;
  }}
}}

// Inicializar sistema brasileiro
const brazilianSystem = new Brazilian{title.replace(' ', '').replace(' e ', '')}System();
```

## 4. Exercícios Práticos

### 4.1 Exercício 1: Implementar Validações Brasileiras

Implemente um sistema que:
- Valide CPF e CNPJ
- Valide telefones brasileiros
- Implemente validação de CEP

### 4.2 Exercício 2: Criar Sistema de Integração

Crie um sistema que:
- Integre com PIX
- Implemente webhooks
- Gerencie transações

### 4.3 Exercício 3: Implementar Compliance

Implemente um sistema que:
- Atenda aos requisitos LGPD
- Gerencie consentimentos
- Controle retenção de dados

## 5. Conclusão

Esta aula estabeleceu os fundamentos para {title}, abordando:

1. **Introdução ao {title}**: Conceitos e características
2. **Arquitetura e Componentes**: Implementação detalhada
3. **Implementação Prática**: Configuração e validação
4. **Estudo de Caso Brasileiro**: Contexto nacional
5. **Exercícios Práticos**: Implementações hands-on

Os conceitos apresentados fornecem uma base sólida para implementar {title} de forma robusta e escalável, considerando as particularidades do mercado brasileiro.

**🎉 PARABÉNS! Você completou o Módulo {module_number:02d} - Aula {lesson_number:02d}: {title}!**
"""
        
        return lesson_template
    
    def create_lesson_file(self, course_key, module_number, lesson_number, title):
        """Cria o arquivo da aula"""
        course = self.courses[course_key]
        course_path = self.base_path / course["path"]
        
        # Criar diretório do módulo se não existir
        module_path = course_path / f"modulo-{module_number:02d}"
        module_path.mkdir(parents=True, exist_ok=True)
        
        filename = f"aula-{lesson_number:02d}-{self.sanitize_filename(title)}.md"
        filepath = module_path / filename
        
        content = self.generate_lesson_content(course_key, module_number, lesson_number, title)
        
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ {course['name']} - Módulo {module_number:02d} - Aula {lesson_number:02d}: {filename}")
            return True
        except Exception as e:
            print(f"❌ Erro ao criar aula {course['name']} - Módulo {module_number:02d} - Aula {lesson_number:02d}: {e}")
            return False
    
    def generate_course_lessons(self, course_key):
        """Gera todas as aulas para um curso específico"""
        course = self.courses[course_key]
        
        print(f"\n🚀 Gerando aulas para: {course['name']}")
        print(f"📚 Módulos: {course['modules']}")
        print(f"🎯 Aulas por módulo: {course['lessons_per_module']}")
        print(f"📊 Total de aulas: {course['total_lessons']}")
        
        success_count = 0
        error_count = 0
        
        for module_num in range(1, course['modules'] + 1):
            print(f"\n📝 Módulo {module_num:02d}:")
            
            lesson_titles = self.get_lesson_titles(course_key, module_num)
            
            for lesson_num, title in enumerate(lesson_titles, 1):
                if self.create_lesson_file(course_key, module_num, lesson_num, title):
                    success_count += 1
                else:
                    error_count += 1
                
                # Pausa para evitar sobrecarga
                import time
                time.sleep(0.05)
        
        return success_count, error_count
    
    def generate_all_courses(self):
        """Gera aulas para todos os cursos"""
        print("🎓 GERADOR AUTOMÁTICO DE AULAS - TODOS OS CURSOS FENIX")
        print("=" * 70)
        
        total_success = 0
        total_errors = 0
        total_lessons = 0
        
        for course_key in self.courses:
            course = self.courses[course_key]
            total_lessons += course['total_lessons']
            
            success, errors = self.generate_course_lessons(course_key)
            total_success += success
            total_errors += errors
        
        # Resumo final
        print(f"\n🎉 GERAÇÃO DE TODOS OS CURSOS CONCLUÍDA!")
        print(f"✅ Aulas criadas com sucesso: {total_success}")
        print(f"❌ Erros: {total_errors}")
        print(f"📊 Total de aulas: {total_lessons}")
        
        return total_success, total_errors

def main():
    """Função principal"""
    print("🎓 GERADOR AUTOMÁTICO DE AULAS - TODOS OS CURSOS FENIX")
    print("=" * 70)
    
    generator = FenixCourseGenerator()
    
    # Verificar se o diretório base existe
    if not generator.base_path.exists():
        print(f"❌ Diretório base não encontrado: {generator.base_path}")
        print("📁 Criando diretório base...")
        generator.base_path.mkdir(parents=True, exist_ok=True)
        print(f"✅ Diretório base criado: {generator.base_path}")
    
    # Gerar aulas para todos os cursos
    success, errors = generator.generate_all_courses()
    
    if errors == 0:
        print("\n🎊 TODAS AS AULAS FORAM CRIADAS COM SUCESSO!")
    else:
        print(f"\n⚠️  {errors} aulas tiveram problemas na criação.")
    
    print("\n📚 Cursos processados:")
    for course_key, course in generator.courses.items():
        course_path = generator.base_path / course["path"]
        status = "✅" if course_path.exists() else "❌"
        print(f"  {status} {course['name']}: {course['total_lessons']} aulas")

if __name__ == "__main__":
    main()
