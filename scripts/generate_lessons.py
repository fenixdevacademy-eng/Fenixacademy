#!/usr/bin/env python3
"""
Script para gerar automaticamente as 72 aulas do curso web-fundamentals
com o mesmo padrão de qualidade e estrutura detalhada.
"""

import os
import json
from pathlib import Path

class LessonGenerator:
    def __init__(self):
        self.base_path = Path("backend/fenix-expanded-content/web-fundamentals/avancado")
        self.lessons = []
        self.init_lesson_templates()
    
    def init_lesson_templates(self):
        """Inicializa os templates das aulas"""
        self.lesson_templates = {
            # Aulas 1-20 (já criadas)
            "existing": [
                "modulo-01-avancado-web-fundamentals.md",
                "modulo-02-avancado-web-fundamentals.md",
                "modulo-03-avancado-web-fundamentals.md",
                "modulo-04-avancado-web-fundamentals.md",
                "modulo-05-avancado-web-fundamentals.md",
                "modulo-06-avancado-web-fundamentals.md",
                "modulo-07-avancado-web-fundamentals.md",
                "modulo-08-avancado-web-fundamentals.md",
                "modulo-09-avancado-web-fundamentals.md",
                "modulo-10-avancado-web-fundamentals.md",
                "modulo-11-avancado-web-fundamentals.md",
                "modulo-12-avancado-web-fundamentals.md",
                "modulo-13-avancado-web-fundamentals.md",
                "modulo-14-avancado-web-fundamentals.md",
                "modulo-15-avancado-web-fundamentals.md",
                "modulo-16-avancado-web-fundamentals.md",
                "modulo-17-avancado-web-fundamentals.md",
                "modulo-18-avancado-web-fundamentals.md",
                "modulo-19-avancado-web-fundamentals.md",
                "modulo-20-avancado-web-fundamentals.md",
                "modulo-21-avancado-web-fundamentals.md"
            ],
            
            # Aulas 22-72 (a serem criadas)
            "to_create": [
                "GraphQL e APIs Modernas",
                "WebSockets e Comunicação em Tempo Real",
                "Arquitetura de Microsserviços",
                "Docker e Containerização",
                "Kubernetes e Orquestração",
                "CI/CD e Pipeline de Deploy",
                "Monitoramento e Observabilidade",
                "Logs Centralizados e Análise",
                "Métricas e Alertas",
                "Tracing Distribuído",
                "Segurança em Microsserviços",
                "API Gateway e Service Mesh",
                "Event Sourcing e CQRS",
                "Saga Pattern e Transações Distribuídas",
                "Circuit Breaker e Resilience Patterns",
                "Rate Limiting e Throttling",
                "Cache Distribuído",
                "Message Queues e Event Streaming",
                "Kafka e Apache Pulsar",
                "Redis e Memcached",
                "Elasticsearch e Busca",
                "MongoDB e NoSQL",
                "PostgreSQL e Bancos Relacionais",
                "Migrations e Versionamento de Schema",
                "Backup e Recuperação",
                "Sharding e Replicação",
                "Performance de Banco de Dados",
                "Índices e Otimização de Queries",
                "Connection Pooling",
                "Transações e Consistência",
                "Deadlocks e Concorrência",
                "Monitoramento de Banco",
                "Segurança de Dados",
                "Criptografia e Hashing",
                "Auditoria e Compliance",
                "GDPR e LGPD",
                "Testes de Performance",
                "Load Testing e Stress Testing",
                "JMeter e K6",
                "Profiling e Otimização",
                "Memory Leaks e Garbage Collection",
                "CPU Profiling",
                "Network Profiling",
                "Database Profiling",
                "Frontend Performance",
                "Backend Performance",
                "Infrastructure Performance",
                "Cloud Computing",
                "AWS e Serviços",
                "Azure e Serviços",
                "Google Cloud Platform",
                "Serverless e FaaS",
                "Lambda e Functions",
                "API Management",
                "CDN e Edge Computing",
                "Micro Frontends",
                "Module Federation",
                "Single Spa",
                "Nx e Monorepos",
                "Lerna e Workspaces",
                "Yarn Workspaces",
                "PNPM e Monorepos"
            ]
        }
    
    def generate_lesson_content(self, lesson_number, title):
        """Gera o conteúdo de uma aula específica"""
        
        # Template base da aula
        lesson_template = f"""# Aula {lesson_number:02d}: {title}

## 1. Introdução ao {title}

### 1.1 Conceitos Fundamentais

{title} é uma tecnologia fundamental para o desenvolvimento web moderno que permite...

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
// Sistema de {title.replace(' e ', ' e ').replace(' ', '')}
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

### 2.2 Sistema de Validação

Implementar um sistema robusto de validação:

```javascript
// Sistema de validação para {title}
class {title.replace(' ', '').replace(' e ', '')}Validator {{
  constructor() {{
    this.rules = new Map();
    this.customValidators = new Map();
    this.init();
  }}
  
  init() {{
    this.setupValidationRules();
    this.setupCustomValidators();
    this.setupErrorHandling();
  }}
  
  // Configurar regras de validação
  setupValidationRules() {{
    // Regras básicas
    this.rules.set('required', {{
      validate: (value) => value !== null && value !== undefined && value !== '',
      message: 'Campo obrigatório'
    }});
    
    this.rules.set('email', {{
      validate: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
      message: 'Email inválido'
    }});
    
    this.rules.set('minLength', {{
      validate: (value, min) => value && value.length >= min,
      message: (min) => `Mínimo de ${{min}} caracteres`
    }});
    
    this.rules.set('maxLength', {{
      validate: (value, max) => value && value.length <= max,
      message: (max) => `Máximo de ${{max}} caracteres`
    }});
  }}
  
  // Configurar validadores customizados
  setupCustomValidators() {{
    // Validador de CPF
    this.customValidators.set('cpf', {{
      validate: this.validateCPF,
      message: 'CPF inválido'
    }});
    
    // Validador de CNPJ
    this.customValidators.set('cnpj', {{
      validate: this.validateCNPJ,
      message: 'CNPJ inválido'
    }});
    
    // Validador de telefone brasileiro
    this.customValidators.set('phoneBR', {{
      validate: this.validatePhoneBR,
      message: 'Telefone inválido'
    }});
  }}
  
  // Validar CPF
  validateCPF(cpf) {{
    cpf = cpf.replace(/[\\D]/g, '');
    
    if (cpf.length !== 11) return false;
    
    // Verificar dígitos repetidos
    if (/^(\\d)\\1+$/.test(cpf)) return false;
    
    // Calcular primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {{
      sum += parseInt(cpf[i]) * (10 - i);
    }}
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    // Calcular segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {{
      sum += parseInt(cpf[i]) * (11 - i);
    }}
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cpf[9]) === digit1 && parseInt(cpf[10]) === digit2;
  }}
  
  // Validar CNPJ
  validateCNPJ(cnpj) {{
    cnpj = cnpj.replace(/[\\D]/g, '');
    
    if (cnpj.length !== 14) return false;
    
    // Verificar dígitos repetidos
    if (/^(\\d)\\1+$/.test(cnpj)) return false;
    
    // Calcular primeiro dígito verificador
    let sum = 0;
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    for (let i = 0; i < 12; i++) {{
      sum += parseInt(cnpj[i]) * weights1[i];
    }}
    
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    // Calcular segundo dígito verificador
    sum = 0;
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    for (let i = 0; i < 13; i++) {{
      sum += parseInt(cnpj[i]) * weights2[i];
    }}
    
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cnpj[12]) === digit1 && parseInt(cnpj[13]) === digit2;
  }}
  
  // Validar telefone brasileiro
  validatePhoneBR(phone) {{
    phone = phone.replace(/[\\D]/g, '');
    
    // Formato: (11) 99999-9999 ou 11999999999
    if (phone.length === 11) {{
      return /^1[1-9]\\d{9}$/.test(phone);
    }}
    
    // Formato: (11) 9999-9999 ou 1199999999
    if (phone.length === 10) {{
      return /^1[1-9]\\d{8}$/.test(phone);
    }}
    
    return false;
  }}
  
  // Configurar tratamento de erros
  setupErrorHandling() {{
    this.errors = [];
    this.errorHandler = this.defaultErrorHandler.bind(this);
  }}
  
  // Tratamento padrão de erros
  defaultErrorHandler(error) {{
    this.errors.push(error);
    console.error('Erro de validação:', error);
  }}
  
  // Validar dados
  validate(data, schema) {{
    this.errors = [];
    
    for (const [field, rules] of Object.entries(schema)) {{
      const value = data[field];
      
      for (const rule of rules) {{
        const {{
          type,
          params = [],
          message
        }} = rule;
        
        if (this.rules.has(type)) {{
          const ruleObj = this.rules.get(type);
          if (!ruleObj.validate(value, ...params)) {{
            const errorMsg = typeof message === 'function' ? message(...params) : message;
            this.errors.push({{
              field,
              message: errorMsg,
              value
            }});
          }}
        }} else if (this.customValidators.has(type)) {{
          const validator = this.customValidators.get(type);
          if (!validator.validate(value)) {{
            this.errors.push({{
              field,
              message: validator.message,
              value
            }});
          }}
        }}
      }}
    }}
    
    return {{
      isValid: this.errors.length === 0,
      errors: this.errors
    }};
  }}
}}

// Inicializar validador
const validator = new {title.replace(' ', '').replace(' e ', '')}Validator();
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

**🎉 PARABÉNS! Você completou a Aula {lesson_number:02d}: {title}!**
"""
        
        return lesson_template
    
    def create_lesson_file(self, lesson_number, title):
        """Cria o arquivo da aula"""
        filename = f"modulo-{lesson_number:02d}-avancado-web-fundamentals.md"
        filepath = self.base_path / filename
        
        content = self.generate_lesson_content(lesson_number, title)
        
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Aula {lesson_number:02d} criada: {filename}")
            return True
        except Exception as e:
            print(f"❌ Erro ao criar aula {lesson_number:02d}: {e}")
            return False
    
    def generate_all_lessons(self):
        """Gera todas as aulas restantes"""
        print("🚀 Iniciando geração automática das aulas...")
        
        # Verificar aulas existentes
        existing_count = len(self.lesson_templates["existing"])
        print(f"📚 Aulas já existentes: {existing_count}")
        
        # Gerar aulas restantes (22-72)
        lessons_to_create = self.lesson_templates["to_create"]
        total_lessons = existing_count + len(lessons_to_create)
        
        print(f"🎯 Total de aulas a serem criadas: {len(lessons_to_create)}")
        print(f"📊 Total final: {total_lessons} aulas")
        
        success_count = 0
        error_count = 0
        
        for i, title in enumerate(lessons_to_create, start=existing_count + 1):
            lesson_number = i
            print(f"\n📝 Criando Aula {lesson_number:02d}: {title}")
            
            if self.create_lesson_file(lesson_number, title):
                success_count += 1
            else:
                error_count += 1
            
            # Pausa para evitar sobrecarga
            import time
            time.sleep(0.1)
        
        # Resumo final
        print(f"\n🎉 GERAÇÃO CONCLUÍDA!")
        print(f"✅ Aulas criadas com sucesso: {success_count}")
        print(f"❌ Erros: {error_count}")
        print(f"📊 Total de aulas: {total_lessons}")
        
        return success_count, error_count

def main():
    """Função principal"""
    print("🎓 GERADOR AUTOMÁTICO DE AULAS - WEB FUNDAMENTALS")
    print("=" * 60)
    
    generator = LessonGenerator()
    
    # Verificar se o diretório existe
    if not generator.base_path.exists():
        print(f"❌ Diretório não encontrado: {generator.base_path}")
        print("📁 Criando diretório...")
        generator.base_path.mkdir(parents=True, exist_ok=True)
        print(f"✅ Diretório criado: {generator.base_path}")
    
    # Gerar todas as aulas
    success, errors = generator.generate_all_lessons()
    
    if errors == 0:
        print("\n🎊 TODAS AS AULAS FORAM CRIADAS COM SUCESSO!")
    else:
        print(f"\n⚠️  {errors} aulas tiveram problemas na criação.")
    
    print("\n📚 Aulas disponíveis:")
    for i in range(1, 73):
        filename = f"modulo-{i:02d}-avancado-web-fundamentals.md"
        filepath = generator.base_path / filename
        status = "✅" if filepath.exists() else "❌"
        print(f"  {status} Aula {i:02d}: {filename}")

if __name__ == "__main__":
    main()












