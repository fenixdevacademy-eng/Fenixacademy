#!/usr/bin/env python3
"""
Script para UPGRADE do conteúdo para QUALIDADE PREMIUM CS50
Transforma conteúdo básico em conteúdo que justifica preços R$ 497-2.997
"""

import os
import shutil
from datetime import datetime

def create_premium_web_content():
    """Conteúdo premium para Web Development"""
    return {
        "01-aula-iniciante-01": {
            "title": "HTML5 Fundamentos - Do Zero ao Profissional",
            "duration": "90 min",
            "content": """# 🎯 HTML5 Fundamentos - Do Zero ao Profissional
## 🌐 Web Development - Nível Iniciante

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 5 + 1 Projeto Final  
🏆 **Certificado**: Sim  

---

## 🎯 Objetivos de Aprendizado
- ✅ Dominar estrutura HTML5 semântica e acessível
- ✅ Implementar formulários avançados com validação
- ✅ Criar layouts responsivos com HTML5 puro
- ✅ Aplicar SEO e meta tags para melhor ranking
- ✅ Implementar microdata e schema.org
- ✅ Criar páginas acessíveis (WCAG 2.1)
- ✅ Otimizar performance e semântica
- ✅ Deploy em produção com GitHub Pages

---

## 📚 Conteúdo Principal

### 1. 🌟 HTML5 Semântico Avançado
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portfólio profissional de desenvolvimento web">
    <meta name="keywords" content="HTML5, CSS3, JavaScript, Web Development">
    <meta name="author" content="Seu Nome">
    <meta property="og:title" content="Portfólio Profissional">
    <meta property="og:description" content="Desenvolvedor web full-stack">
    <meta property="og:image" content="https://seusite.com/og-image.jpg">
    <title>Portfólio Profissional | Seu Nome</title>
    
    <!-- Schema.org markup -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Seu Nome",
        "jobTitle": "Full Stack Developer",
        "url": "https://seusite.com",
        "sameAs": [
            "https://linkedin.com/in/seuperfil",
            "https://github.com/seuperfil"
        ]
    }
    </script>
</head>
<body>
    <header role="banner">
        <nav role="navigation" aria-label="Menu principal">
            <ul>
                <li><a href="#home" aria-current="page">Home</a></li>
                <li><a href="#projetos">Projetos</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main role="main">
        <section id="home" aria-labelledby="home-title">
            <h1 id="home-title">Desenvolvedor Web Full-Stack</h1>
            <p>Transformando ideias em experiências digitais incríveis</p>
        </section>
        
        <section id="projetos" aria-labelledby="projetos-title">
            <h2 id="projetos-title">Meus Projetos</h2>
            <article>
                <h3>E-commerce Responsivo</h3>
                <p>Plataforma completa com carrinho de compras e pagamentos</p>
            </article>
        </section>
    </main>
    
    <footer role="contentinfo">
        <p>&copy; 2024 Seu Nome. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
```

### 2. 🎨 Formulários HTML5 Avançados
```html
<form class="contact-form" action="/api/contact" method="POST" novalidate>
    <fieldset>
        <legend>Informações de Contato</legend>
        
        <div class="form-group">
            <label for="nome" class="required">Nome Completo *</label>
            <input 
                type="text" 
                id="nome" 
                name="nome" 
                required 
                minlength="3" 
                maxlength="100"
                pattern="[A-Za-zÀ-ÿ\\s]+"
                placeholder="Digite seu nome completo"
                aria-describedby="nome-help nome-error"
                autocomplete="name"
            >
            <small id="nome-help">Mínimo 3 caracteres, apenas letras e espaços</small>
            <div id="nome-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>
        
        <div class="form-group">
            <label for="email" class="required">Email *</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                required
                placeholder="seu@email.com"
                aria-describedby="email-help email-error"
                autocomplete="email"
            >
            <small id="email-help">Digite um email válido</small>
            <div id="email-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>
        
        <div class="form-group">
            <label for="telefone">Telefone</label>
            <input 
                type="tel" 
                id="telefone" 
                name="telefone"
                pattern="[0-9]{2}[0-9]{4,5}[0-9]{4}"
                placeholder="(11) 99999-9999"
                aria-describedby="telefone-help"
                autocomplete="tel"
            >
            <small id="telefone-help">Formato: (11) 99999-9999</small>
        </div>
        
        <div class="form-group">
            <label for="assunto" class="required">Assunto *</label>
            <select id="assunto" name="assunto" required aria-describedby="assunto-help">
                <option value="">Selecione um assunto</option>
                <option value="orcamento">Orçamento de Projeto</option>
                <option value="parceria">Proposta de Parceria</option>
                <option value="duvida">Dúvida Técnica</option>
                <option value="outro">Outro</option>
            </select>
            <small id="assunto-help">Escolha o motivo do contato</small>
        </div>
        
        <div class="form-group">
            <label for="mensagem" class="required">Mensagem *</label>
            <textarea 
                id="mensagem" 
                name="mensagem" 
                required 
                minlength="10" 
                maxlength="1000"
                rows="5"
                placeholder="Descreva sua solicitação..."
                aria-describedby="mensagem-help mensagem-error"
            ></textarea>
            <small id="mensagem-help">Mínimo 10 caracteres</small>
            <div id="mensagem-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>
        
        <div class="form-group">
            <label class="checkbox-label">
                <input type="checkbox" name="newsletter" value="1">
                <span class="checkmark"></span>
                Quero receber novidades e dicas de desenvolvimento
            </label>
        </div>
        
        <button type="submit" class="btn-primary">
            <span class="btn-text">Enviar Mensagem</span>
            <span class="btn-loading" hidden>Enviando...</span>
        </button>
    </fieldset>
</form>
```

### 3. 🔧 Validação JavaScript Avançada
```javascript
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.fields = this.form.querySelectorAll('[required]');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupRealTimeValidation();
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        this.fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }
    
    setupRealTimeValidation() {
        // Validação em tempo real para campos específicos
        const emailField = this.form.querySelector('#email');
        if (emailField) {
            emailField.addEventListener('input', (e) => {
                this.validateEmail(e.target.value, emailField);
            });
        }
        
        const telefoneField = this.form.querySelector('#telefone');
        if (telefoneField) {
            telefoneField.addEventListener('input', (e) => {
                this.formatTelefone(e.target.value, telefoneField);
            });
        }
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        // Limpar erro anterior
        this.clearFieldError(field);
        
        // Validações específicas
        let isValid = true;
        let errorMessage = '';
        
        switch (field.type) {
            case 'email':
                isValid = this.validateEmail(value, field);
                break;
            case 'tel':
                isValid = this.validateTelefone(value, field);
                break;
            default:
                isValid = this.validateRequired(value, field);
        }
        
        if (!isValid && errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.hidden = false;
            field.setAttribute('aria-invalid', 'true');
        }
        
        return isValid;
    }
    
    validateEmail(email, field) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailRegex.test(email);
        
        if (!isValid) {
            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) {
                errorElement.textContent = 'Digite um email válido';
                errorElement.hidden = false;
            }
            field.setAttribute('aria-invalid', 'true');
        }
        
        return isValid;
    }
    
    validateTelefone(telefone, field) {
        const telefoneRegex = /^[0-9]{2}[0-9]{4,5}[0-9]{4}$/;
        const telefoneLimpo = telefone.replace(/\D/g, '');
        const isValid = telefoneRegex.test(telefoneLimpo);
        
        if (!isValid) {
            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) {
                errorElement.textContent = 'Formato inválido. Use: (11) 99999-9999';
                errorElement.hidden = false;
            }
            field.setAttribute('aria-invalid', 'true');
        }
        
        return isValid;
    }
    
    formatTelefone(value, field) {
        const telefoneLimpo = value.replace(/\D/g, '');
        let telefoneFormatado = '';
        
        if (telefoneLimpo.length <= 2) {
            telefoneFormatado = `(${telefoneLimpo}`;
        } else if (telefoneLimpo.length <= 6) {
            telefoneFormatado = `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2)}`;
        } else if (telefoneLimpo.length <= 10) {
            telefoneFormatado = `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2, 6)}-${telefoneLimpo.slice(6)}`;
        } else {
            telefoneFormatado = `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2, 7)}-${telefoneLimpo.slice(7, 11)}`;
        }
        
        field.value = telefoneFormatado;
    }
    
    validateRequired(value, field) {
        const isValid = value.length > 0;
        
        if (!isValid) {
            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) {
                errorElement.textContent = 'Este campo é obrigatório';
                errorElement.hidden = false;
            }
            field.setAttribute('aria-invalid', 'true');
        }
        
        return isValid;
    }
    
    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.hidden = true;
        }
        field.removeAttribute('aria-invalid');
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validar todos os campos
        let isFormValid = true;
        this.fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Por favor, corrija os erros no formulário', 'error');
            return;
        }
        
        // Mostrar loading
        this.showLoading(true);
        
        try {
            const formData = new FormData(this.form);
            const response = await this.submitForm(formData);
            
            if (response.success) {
                this.showNotification('Mensagem enviada com sucesso!', 'success');
                this.form.reset();
            } else {
                this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
            }
        } catch (error) {
            this.showNotification('Erro de conexão. Verifique sua internet.', 'error');
        } finally {
            this.showLoading(false);
        }
    }
    
    async submitForm(formData) {
        const response = await fetch(this.form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        return await response.json();
    }
    
    showLoading(show) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        if (show) {
            btnText.hidden = true;
            btnLoading.hidden = false;
            submitBtn.disabled = true;
        } else {
            btnText.hidden = false;
            btnLoading.hidden = true;
            submitBtn.disabled = false;
        }
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Inicializar validação
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('.contact-form');
});
```

---

## 🧪 Exercícios Práticos Premium

### 🎯 **Exercício 1: Landing Page Profissional**
Crie uma landing page completa para um serviço de desenvolvimento web com:
- Header com navegação responsiva
- Hero section com call-to-action
- Seção de serviços com cards interativos
- Formulário de contato com validação avançada
- Footer com informações da empresa
- **Requisitos**: HTML5 semântico, acessibilidade WCAG 2.1, SEO otimizado

### 🎯 **Exercício 2: Dashboard Administrativo**
Desenvolva um dashboard HTML para gerenciamento de projetos com:
- Tabela responsiva de projetos
- Filtros avançados por status e data
- Formulário de criação/edição de projetos
- Sistema de notificações em tempo real
- **Requisitos**: Validação robusta, UX intuitiva, responsividade mobile-first

### 🎯 **Exercício 3: E-commerce Básico**
Crie a estrutura HTML para uma loja online com:
- Catálogo de produtos com grid responsivo
- Carrinho de compras funcional
- Sistema de busca e filtros
- Checkout multi-etapas
- **Requisitos**: Microdata schema.org, acessibilidade, performance

### 🎯 **Exercício 4: Blog Profissional**
Desenvolva um blog com:
- Lista de artigos com paginação
- Sistema de categorias e tags
- Formulário de comentários
- Newsletter signup
- **Requisitos**: SEO avançado, meta tags, Open Graph

### 🎯 **Projeto Final: Portfólio Profissional**
Crie um portfólio completo que demonstre:
- **Design**: Interface moderna e responsiva
- **Funcionalidade**: Formulários, navegação, animações
- **Acessibilidade**: WCAG 2.1 AA compliance
- **SEO**: Meta tags, schema.org, performance
- **Deploy**: GitHub Pages com domínio customizado

---

## 🚀 Próximos Passos
Na próxima aula, você aprenderá CSS3 Moderno com Flexbox, Grid e animações avançadas.

---

## 📝 Checklist de Conclusão Premium
- [ ] Dominou HTML5 semântico avançado
- [ ] Implementou formulários com validação robusta
- [ ] Criou páginas acessíveis (WCAG 2.1)
- [ ] Aplicou SEO e meta tags avançadas
- [ ] Implementou microdata schema.org
- [ ] Completou todos os exercícios premium
- [ ] Desenvolveu projeto final profissional
- [ ] Deploy em produção com GitHub Pages

**🏆 Parabéns! Você completou o módulo HTML5 Premium com qualidade CS50!**

---

## 💎 **Recursos Premium Inclusos**
- ✅ **Certificado Verificado** pela Fenix Academy
- ✅ **Projetos Reais** para portfólio profissional
- ✅ **Suporte Técnico** 24/7 via Discord
- ✅ **Comunidade Exclusiva** de desenvolvedores
- ✅ **Mentoria Individual** mensal
- ✅ **Acesso Vitalício** ao conteúdo
- ✅ **Atualizações Gratuitas** para sempre
"""
        }
    }

def upgrade_content_to_premium():
    """Upgrade do conteúdo para qualidade premium"""
    print("🚀 INICIANDO UPGRADE PARA CONTEÚDO PREMIUM...")
    
    # Criar diretório premium
    premium_dir = "fenix-premium-content"
    os.makedirs(premium_dir, exist_ok=True)
    
    # Copiar estrutura existente
    if os.path.exists("fenix-all-20-courses-complete"):
        shutil.copytree("fenix-all-20-courses-complete", f"{premium_dir}/original", dirs_exist_ok=True)
    
    # Criar conteúdo premium
    web_content = create_premium_web_content()
    
    # Salvar conteúdo premium
    for filename, content_data in web_content.items():
        filepath = f"{premium_dir}/web-development-premium/{filename}.md"
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_data["content"])
        
        print(f"✅ {filename} - Conteúdo Premium Criado")
    
    print(f"\n🎉 UPGRADE PREMIUM CONCLUÍDO!")
    print(f"📁 Conteúdo salvo em: {premium_dir}")
    print(f"💎 Qualidade CS50 Premium implementada!")

if __name__ == "__main__":
    upgrade_content_to_premium()
