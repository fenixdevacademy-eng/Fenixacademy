'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Save, FileText, Settings, Download, Upload, Maximize2, Minimize2 } from 'lucide-react';

interface FileData {
    name: string;
    content: string;
    language: string;
    type: 'html' | 'css' | 'js' | 'json' | 'md';
}

interface FenixIDESimpleProps {
    courseType?: 'web' | 'python' | 'javascript' | 'react' | 'node';
    initialFiles?: FileData[];
    onSave?: (files: FileData[]) => void;
    onRun?: (files: FileData[]) => void;
}

const FenixIDESimple: React.FC<FenixIDESimpleProps> = ({
    courseType = 'web',
    initialFiles = [],
    onSave,
    onRun
}) => {
    const [files, setFiles] = useState<FileData[]>(initialFiles);
    const [activeFile, setActiveFile] = useState<string>('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<string>('');
    const [isMonacoLoaded, setIsMonacoLoaded] = useState(false);
    const [isMobileLayout, setIsMobileLayout] = useState(false);
    const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
    const [terminalInput, setTerminalInput] = useState('');
    const [isTerminalVisible, setIsTerminalVisible] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);

    const editorRef = useRef<HTMLDivElement>(null);
    const monacoEditorRef = useRef<any>(null);
    const monacoRef = useRef<any>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Arquivos padrão por tipo de curso
    const defaultFiles: Record<string, FileData[]> = {
        web: [
            {
                name: 'index.html',
                content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Página de exemplo do Fenix Academy - Curso de Desenvolvimento Web">
    <meta name="keywords" content="HTML, CSS, JavaScript, Web Development, Fenix Academy">
    <meta name="author" content="Fenix Academy">
    <title>Fenix Academy - Curso Web</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <h1>🚀 Fenix Academy</h1>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#cursos">Cursos</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
    <div class="container">
            <div class="hero-content">
                <h2 class="hero-title">Bem-vindo ao Futuro da Programação</h2>
                <p class="hero-description">
                    Aprenda desenvolvimento web com as melhores práticas e tecnologias modernas. 
                    Do básico ao avançado, transforme sua carreira com a Fenix Academy.
                </p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="showMessage()">
                        Começar Agora
                    </button>
                    <button class="btn btn-secondary" onclick="scrollToSection('cursos')">
                        Ver Cursos
                    </button>
    </div>
            </div>
            <div class="hero-image">
                <div class="code-animation">
                    <div class="code-line">const futuro = "brilhante";</div>
                    <div class="code-line">console.log(futuro);</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="cursos">
        <div class="container">
            <h2 class="section-title">Por que escolher a Fenix Academy?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">💻</div>
                    <h3>Desenvolvimento Web</h3>
                    <p>HTML, CSS, JavaScript e frameworks modernos</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3>Projetos Práticos</h3>
                    <p>Aprenda fazendo projetos reais do mercado</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">👨‍🏫</div>
                    <h3>Mentoria Especializada</h3>
                    <p>Suporte de profissionais experientes</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Carreira Garantida</h3>
                    <p>Preparação completa para o mercado de trabalho</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="sobre">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>Sobre a Fenix Academy</h2>
                    <p>
                        Somos uma escola de programação focada em formar desenvolvedores de alta qualidade. 
                        Nossa metodologia combina teoria sólida com prática intensiva, preparando você para 
                        os desafios reais do mercado de tecnologia.
                    </p>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-number">1000+</span>
                            <span class="stat-label">Alunos Formados</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">95%</span>
                            <span class="stat-label">Taxa de Empregabilidade</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">50+</span>
                            <span class="stat-label">Projetos Práticos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contato">
        <div class="container">
            <h2 class="section-title">Entre em Contato</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Vamos conversar sobre seu futuro?</h3>
                    <p>Entre em contato conosco e descubra como podemos ajudar você a alcançar seus objetivos na programação.</p>
                    <div class="contact-details">
                        <div class="contact-item">
                            <span class="contact-icon">📧</span>
                            <span>contato@fenixacademy.com</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📱</span>
                            <span>(11) 99999-9999</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📍</span>
                            <span>São Paulo, SP - Brasil</span>
                        </div>
                    </div>
                </div>
                <form class="contact-form">
                    <div class="form-group">
                        <input type="text" placeholder="Seu nome" required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Seu email" required>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="Sua mensagem" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar Mensagem</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>🚀 Fenix Academy</h3>
                    <p>Transformando vidas através da programação</p>
                </div>
                <div class="footer-links">
                    <h4>Links Úteis</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#cursos">Cursos</a></li>
                        <li><a href="#sobre">Sobre</a></li>
                        <li><a href="#contato">Contato</a></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <h4>Redes Sociais</h4>
                    <div class="social-links">
                        <a href="#" class="social-link">📘 Facebook</a>
                        <a href="#" class="social-link">📷 Instagram</a>
                        <a href="#" class="social-link">🐦 Twitter</a>
                        <a href="#" class="social-link">💼 LinkedIn</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Fenix Academy. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,
                language: 'html',
                type: 'html'
            },
            {
                name: 'style.css',
                content: `/* Reset e Base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #ffffff;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.header {
    background: #fff;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.nav-brand h1 {
    font-size: 1.8rem;
    color: #667eea;
    font-weight: 700;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: #667eea;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 120px 0 80px;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.hero .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

.hero-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background: #ff6b6b;
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.btn-primary:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.btn-secondary:hover {
    background: white;
    color: #667eea;
}

.code-animation {
    background: rgba(0,0,0,0.2);
    padding: 2rem;
    border-radius: 12px;
    font-family: 'Monaco', 'Consolas', monospace;
}

.code-line {
    color: #00ff88;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

/* Features Section */
.features {
    padding: 80px 0;
    background: #f8f9fa;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #333;
}

.feature-card p {
    color: #666;
    line-height: 1.6;
}

/* About Section */
.about {
    padding: 80px 0;
    background: white;
}

.about-text h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #333;
}

.about-text p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.8;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.stat {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: #667eea;
}

.stat-label {
    color: #666;
    font-size: 0.9rem;
}

/* Contact Section */
.contact {
    padding: 80px 0;
    background: #f8f9fa;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-top: 2rem;
}

.contact-info h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #333;
}

.contact-info p {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.contact-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.contact-icon {
    font-size: 1.2rem;
}

.contact-form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
}

/* Footer */
.footer {
    background: #333;
    color: white;
    padding: 60px 0 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-brand h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #667eea;
}

.footer-brand p {
    color: #ccc;
    line-height: 1.6;
}

.footer-links h4,
.footer-social h4 {
    margin-bottom: 1rem;
    color: white;
}

.footer-links ul {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.5rem;
}

.footer-links a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: #667eea;
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.social-link {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: #667eea;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #555;
    color: #ccc;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hero .container {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-buttons {
        justify-content: center;
    }
    
    .contact-content {
        grid-template-columns: 1fr;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .stats {
        grid-template-columns: 1fr;
    }
}`,
                language: 'css',
                type: 'css'
            },
            {
                name: 'script.js',
                content: `// JavaScript para o Fenix Academy
console.log('🚀 Fenix Academy - Curso Web carregado!');

// Função principal para mostrar mensagem
function showMessage() {
    const message = \`🎉 Bem-vindo ao Fenix Academy!

Este é um exemplo de interação JavaScript.
Você pode modificar este código e ver as mudanças em tempo real!

✨ Recursos disponíveis:
• HTML semântico
• CSS moderno com Flexbox/Grid
• JavaScript ES6+
• Design responsivo
• Animações suaves\`;

    alert(message);
}

// Função para rolar suavemente para uma seção
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM carregado com sucesso!');
    
    // Animar entrada da página
    animatePageLoad();
    
    // Configurar navegação suave
    setupSmoothNavigation();
    
    // Configurar formulário de contato
    setupContactForm();
    
    // Adicionar efeitos interativos
    addInteractiveEffects();
    
    // Configurar animações de scroll
    setupScrollAnimations();
});

// Animação de carregamento da página
function animatePageLoad() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Configurar navegação suave
function setupSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Configurar formulário de contato
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('✅ Mensagem enviada com sucesso!\\n\\nEntraremos em contato em breve.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Adicionar efeitos interativos
function addInteractiveEffects() {
    // Efeito hover nos cards de features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animação do código no hero
    animateCodeLines();
}

// Animação das linhas de código
function animateCodeLines() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 1000 + (index * 200));
    });
}

// Configurar animações de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.feature-card, .stat, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Função para demonstrar manipulação de dados
async function demonstrateAsyncFunction() {
    console.log('🔄 Iniciando operação assíncrona...');
    
    try {
        // Simular carregamento de dados
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = {
            alunos: 1000,
            cursos: 20,
            satisfacao: 95
        };
        
        console.log('📊 Dados carregados:', data);
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        throw error;
    }
}

// Função para demonstrar manipulação do DOM
function updateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        
        if (numericValue) {
            animateNumber(stat, 0, numericValue, 2000);
        }
    });
}

// Animação de números
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + (element.textContent.includes('+') ? '+' : '') + 
                             (element.textContent.includes('%') ? '%' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Inicializar animações quando a página estiver visível
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        setTimeout(updateStats, 500);
    }
});

// Chamar demonstração assíncrona
demonstrateAsyncFunction().then(data => {
    console.log('✅ Demonstração concluída:', data);
}).catch(error => {
    console.error('❌ Erro na demonstração:', error);
});

// Exemplo de uso de classes ES6
class FenixAcademy {
    constructor() {
        this.name = 'Fenix Academy';
        this.version = '1.0.0';
    }
    
    welcome() {
        return \`Bem-vindo à \${this.name} v\${this.version}!\`;
    }
    
    getCourseInfo(course) {
        const courses = {
            web: 'Desenvolvimento Web Completo',
            python: 'Python para Data Science',
            javascript: 'JavaScript Avançado',
            react: 'React e Next.js',
            node: 'Node.js e APIs'
        };
        
        return courses[course] || 'Curso não encontrado';
    }
}

// Instanciar a classe
const academy = new FenixAcademy();
console.log(academy.welcome());
console.log('📚 Curso Web:', academy.getCourseInfo('web'));`,
                language: 'javascript',
                type: 'js'
            }
        ],
        python: [
            {
                name: 'main.py',
                content: `# Fenix Academy - Curso Python
print("Bem-vindo ao Fenix Academy - Curso Python!")

def saudacao(nome):
    """Função para saudar o usuário"""
    return f"Olá, {nome}! Bem-vindo ao curso de Python."

def calcular_idade(ano_nascimento):
    """Calcula a idade baseada no ano de nascimento"""
    from datetime import datetime
    ano_atual = datetime.now().year
    return ano_atual - ano_nascimento

def main():
    nome = input("Digite seu nome: ")
    print(saudacao(nome))
    
    try:
        ano = int(input("Digite seu ano de nascimento: "))
        idade = calcular_idade(ano)
        print(f"Você tem {idade} anos.")
    except ValueError:
        print("Por favor, digite um ano válido.")

if __name__ == "__main__":
    main()`,
                language: 'python',
                type: 'js'
            }
        ],
        javascript: [
            {
                name: 'app.js',
                content: `// Fenix Academy - Curso JavaScript Avançado
console.log('Fenix Academy - Curso JavaScript carregado!');

// Classes ES6
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    
    apresentar() {
        return \`Olá, eu sou \${this.nome} e tenho \${this.idade} anos.\`;
    }
}

// Arrow Functions
const somar = (a, b) => a + b;
const multiplicar = (a, b) => a * b;

// Async/Await
async function buscarDados() {
    try {
        const response = await fetch('https://api.exemplo.com/dados');
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

// Promises
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função principal
async function main() {
    const pessoa = new Pessoa('João', 25);
    console.log(pessoa.apresentar());
    
    console.log('Soma:', somar(5, 3));
    console.log('Multiplicação:', multiplicar(4, 7));
    
    await delay(1000);
    console.log('Operação concluída!');
}

// Executar função principal
main();`,
                language: 'javascript',
                type: 'js'
            }
        ]
    };

    // Inicializar arquivos se não houver arquivos iniciais
    useEffect(() => {
        if (files.length === 0) {
            const courseFiles = defaultFiles[courseType] || defaultFiles.web;
            setFiles(courseFiles);
            setActiveFile(courseFiles[0]?.name || '');
        }
    }, [courseType, files.length]);

    // Inicializar terminal
    useEffect(() => {
        setTerminalHistory([
            `Fenix IDE Terminal v1.0.0`,
            `Bem-vindo ao terminal integrado!`,
            `Digite 'help' para ver os comandos disponíveis.`,
            `Exemplo: python print("Hello World")`,
            ``
        ]);
    }, []);

    // Carregar Monaco Editor
    useEffect(() => {
        const loadMonaco = async () => {
            try {
                console.log('🚀 Iniciando carregamento do Monaco Editor...');

                // Carregar Monaco Editor via CDN
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';

                script.onload = () => {
                    console.log('✅ Script do Monaco Editor carregado');

                    const require = (window as any).require;
                    if (require && require.config) {
                        // @ts-ignore - Monaco Editor require.config
                        require.config({
                            paths: {
                                'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs'
                            }
                        });
                    }

                    if (require) {
                        // @ts-ignore - Monaco Editor require callback
                        require(['vs/editor/editor.main'], (monaco: any) => {
                            console.log('✅ Monaco Editor inicializado:', monaco);
                            monacoRef.current = monaco;
                            setIsMonacoLoaded(true);

                            // Aguardar um pouco para garantir que o DOM esteja pronto
                            setTimeout(() => {
                                initializeEditor();
                            }, 100);
                        });
                    }
                };

                script.onerror = (error) => {
                    console.error('❌ Erro ao carregar script do Monaco Editor:', error);
                };

                document.head.appendChild(script);
                console.log('📝 Script adicionado ao DOM');
            } catch (error) {
                console.error('❌ Erro ao carregar Monaco Editor:', error);
            }
        };

        loadMonaco();
    }, []);

    // Tentar inicializar o editor quando Monaco estiver carregado
    useEffect(() => {
        if (isMonacoLoaded && monacoRef.current && editorRef.current) {
            console.log('🔄 Tentando inicializar editor via useEffect...');
            initializeEditor();
        }
    }, [isMonacoLoaded, activeFile]);

    // Inicializar editor quando Monaco estiver carregado
    const initializeEditor = () => {
        console.log('🔧 Inicializando editor...', {
            monaco: !!monacoRef.current,
            editorRef: !!editorRef.current,
            activeFile,
            filesCount: files.length,
            editorAlreadyExists: !!monacoEditorRef.current
        });

        if (!monacoRef.current || !editorRef.current) {
            console.log('❌ Monaco ou editorRef não disponível');
            return;
        }

        // Evitar múltiplas inicializações
        if (monacoEditorRef.current) {
            console.log('⚠️ Editor já existe, atualizando conteúdo...');
            const editor = monacoEditorRef.current;
            editor.setValue(getCurrentFileContent());
            monacoRef.current.editor.setModelLanguage(editor.getModel(), getCurrentFileLanguage());
            return;
        }

        const monaco = monacoRef.current;

        // Criar editor
        const editor = monaco.editor.create(editorRef.current, {
            value: getCurrentFileContent(),
            language: getCurrentFileLanguage(),
            theme: 'vs-dark',
            fontSize: 14,
            minimap: { enabled: true },
            wordWrap: 'on',
            lineNumbers: 'on',
            automaticLayout: true,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            wordBasedSuggestions: 'off',
            scrollBeyondLastLine: false,
            renderWhitespace: 'selection',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            mouseWheelZoom: true
        });

        monacoEditorRef.current = editor;
        console.log('✅ Editor Monaco criado com sucesso!');

        // Configurar IntelliSense
        setupIntelliSense(monaco);

        // Evento de mudança de conteúdo
        editor.onDidChangeModelContent(() => {
            const content = editor.getValue();
            updateFileContent(activeFile, content);
        });

        // Comandos do editor
        editor.addCommand(monaco.KeyCode.Tab, () => {
            editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
            editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
        });
    };

    // Configurar IntelliSense
    const setupIntelliSense = (monaco: any) => {
        // IntelliSense para HTML
        monaco.languages.registerCompletionItemProvider('html', {
            triggerCharacters: ['!', '<', ' '],
            provideCompletionItems: (model: any, position: any) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                return {
                    suggestions: [
                        {
                            label: '! → HTML5 Template',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<!DOCTYPE html>\\n<html lang="pt-BR">\\n<head>\\n\\t<meta charset="UTF-8">\\n\\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\\n\\t<title>${1:Título}</title>\\n</head>\\n<body>\\n\\t<h1>${2:Cabeçalho}</h1>\\n\\t<p>${3:Conteúdo}</p>\\n</body>\\n</html>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Template HTML5 completo',
                            range: range,
                            sortText: '!',
                            preselect: true
                        },
                        {
                            label: 'div',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<div>${1:conteúdo}</div>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Container genérico',
                            range: range
                        },
                        {
                            label: 'p',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<p>${1:parágrafo}</p>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Parágrafo de texto',
                            range: range
                        },
                        {
                            label: 'h1',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<h1>${1:título}</h1>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Título principal',
                            range: range
                        },
                        {
                            label: 'a',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<a href="${1:#}">${2:texto do link}</a>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Link para outra página',
                            range: range
                        },
                        {
                            label: 'img',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<img src="${1:imagem.jpg}" alt="${2:descrição}">',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Imagem da página',
                            range: range
                        },
                        {
                            label: 'button',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<button onclick="${1:funcao()}">${2:texto}</button>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Botão clicável',
                            range: range
                        },
                        {
                            label: 'form',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<form action="${1:#}" method="${2:post}">\\n\\t${3:conteúdo}\\n</form>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Formulário',
                            range: range
                        },
                        {
                            label: 'input',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<input type="${1:text}" name="${2:nome}" placeholder="${3:placeholder}">',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Campo de entrada',
                            range: range
                        },
                        {
                            label: 'ul',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '<ul>\\n\\t<li>${1:item 1}</li>\\n\\t<li>${2:item 2}</li>\\n</ul>',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Lista não ordenada',
                            range: range
                        }
                    ]
                };
            }
        });

        // IntelliSense para CSS
        monaco.languages.registerCompletionItemProvider('css', {
            triggerCharacters: [' ', ':'],
            provideCompletionItems: (model: any, position: any) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                return {
                    suggestions: [
                        {
                            label: 'color',
                            kind: monaco.languages.CompletionItemKind.Property,
                            insertText: 'color: ${1:#000};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Cor do texto',
                            range: range
                        },
                        {
                            label: 'background-color',
                            kind: monaco.languages.CompletionItemKind.Property,
                            insertText: 'background-color: ${1:#fff};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Cor de fundo',
                            range: range
                        },
                        {
                            label: 'font-size',
                            kind: monaco.languages.CompletionItemKind.Property,
                            insertText: 'font-size: ${1:16px};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Tamanho da fonte',
                            range: range
                        },
                        {
                            label: 'margin',
                            kind: monaco.languages.CompletionItemKind.Property,
                            insertText: 'margin: ${1:0};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Margem externa',
                            range: range
                        },
                        {
                            label: 'padding',
                            kind: monaco.languages.CompletionItemKind.Property,
                            insertText: 'padding: ${1:0};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Espaçamento interno',
                            range: range
                        },
                        {
                            label: 'border',
                            kind: monaco.languages.CompletionItemKind.Property,
                            insertText: 'border: ${1:1px solid #000};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Borda',
                            range: range
                        },
                        {
                            label: 'display',
                            kind: monaco.languages.CompletionItemKind.Property,
                            insertText: 'display: ${1:block};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Tipo de exibição',
                            range: range
                        },
                        {
                            label: 'flex',
                            kind: monaco.languages.CompletionItemKind.Property,
                            insertText: 'display: flex;\\njustify-content: ${1:center};\\nalign-items: ${2:center};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Layout flexbox',
                            range: range
                        }
                    ]
                };
            }
        });

        // IntelliSense para JavaScript
        monaco.languages.registerCompletionItemProvider('javascript', {
            triggerCharacters: ['.', ' '],
            provideCompletionItems: (model: any, position: any) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                return {
                    suggestions: [
                        {
                            label: 'console.log',
                            kind: monaco.languages.CompletionItemKind.Function,
                            insertText: 'console.log(${1:mensagem});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Imprime no console',
                            range: range
                        },
                        {
                            label: 'function',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'function ${1:nomeFuncao}(${2:parametros}) {\\n\\t${3:// código}\\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Função',
                            range: range
                        },
                        {
                            label: 'arrow function',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'const ${1:nomeFuncao} = (${2:parametros}) => {\\n\\t${3:// código}\\n};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Arrow function',
                            range: range
                        },
                        {
                            label: 'if',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'if (${1:condicao}) {\\n\\t${2:// código}\\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Estrutura condicional',
                            range: range
                        },
                        {
                            label: 'for',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\\n\\t${3:// código}\\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Loop for',
                            range: range
                        },
                        {
                            label: 'forEach',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '${1:array}.forEach((${2:item}) => {\\n\\t${3:// código}\\n});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Iterar array',
                            range: range
                        },
                        {
                            label: 'try-catch',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'try {\\n\\t${1:// código}\\n} catch (error) {\\n\\tconsole.error(error);\\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Tratamento de erro',
                            range: range
                        },
                        {
                            label: 'async-await',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'async function ${1:nomeFuncao}() {\\n\\ttry {\\n\\t\\tconst result = await ${2:operacao}();\\n\\t\\treturn result;\\n\\t} catch (error) {\\n\\t\\tconsole.error(error);\\n\\t}\\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Função assíncrona',
                            range: range
                        }
                    ]
                };
            }
        });

        // IntelliSense para Python
        monaco.languages.registerCompletionItemProvider('python', {
            triggerCharacters: ['.', ' '],
            provideCompletionItems: (model: any, position: any) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                return {
                    suggestions: [
                        {
                            label: 'print',
                            kind: monaco.languages.CompletionItemKind.Function,
                            insertText: 'print(${1:mensagem})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Imprime no console',
                            range: range
                        },
                        {
                            label: 'def',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'def ${1:nome_funcao}(${2:parametros}):\\n\\t${3:# código}\\n\\treturn ${4:resultado}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Função',
                            range: range
                        },
                        {
                            label: 'class',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'class ${1:NomeClasse}:\\n\\tdef __init__(self, ${2:parametros}):\\n\\t\\tself.${3:atributo} = ${4:valor}\\n\\n\\tdef ${5:metodo}(self):\\n\\t\\t${6:# código}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Classe',
                            range: range
                        },
                        {
                            label: 'if',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'if ${1:condicao}:\\n\\t${2:# código}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Estrutura condicional',
                            range: range
                        },
                        {
                            label: 'for',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'for ${1:item} in ${2:iteravel}:\\n\\t${3:# código}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Loop for',
                            range: range
                        },
                        {
                            label: 'while',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'while ${1:condicao}:\\n\\t${2:# código}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Loop while',
                            range: range
                        },
                        {
                            label: 'try-except',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'try:\\n\\t${1:# código}\\nexcept ${2:Exception} as e:\\n\\tprint(f"Erro: {e}")',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Tratamento de erro',
                            range: range
                        },
                        {
                            label: 'import',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'import ${1:modulo}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            detail: 'Importar módulo',
                            range: range
                        }
                    ]
                };
            }
        });
    };

    // Funções utilitárias
    const getCurrentFileContent = () => {
        const file = files.find(f => f.name === activeFile);
        return file?.content || '';
    };

    const getCurrentFileLanguage = () => {
        const file = files.find(f => f.name === activeFile);
        return file?.language || 'html';
    };

    const updateFileContent = (fileName: string, content: string) => {
        setFiles(prev => prev.map(file =>
            file.name === fileName ? { ...file, content } : file
        ));
    };

    const switchFile = (fileName: string) => {
        setActiveFile(fileName);
        if (monacoEditorRef.current) {
            const file = files.find(f => f.name === fileName);
            if (file) {
                monacoEditorRef.current.setValue(file.content);
                monacoRef.current?.editor.setModelLanguage(
                    monacoEditorRef.current.getModel(),
                    file.language
                );
            }
        }
    };

    const addFile = () => {
        const fileName = prompt('Nome do arquivo:', 'novo-arquivo.html');
        if (fileName) {
            const extension = fileName.split('.').pop()?.toLowerCase();
            const language = extension === 'html' ? 'html' :
                extension === 'css' ? 'css' :
                    extension === 'js' ? 'javascript' :
                        extension === 'py' ? 'python' : 'html';

            const newFile: FileData = {
                name: fileName,
                content: '',
                language,
                type: extension as any || 'html'
            };

            setFiles(prev => [...prev, newFile]);
            setActiveFile(fileName);
        }
    };

    const deleteFile = (fileName: string) => {
        if (files.length > 1) {
            setFiles(prev => prev.filter(f => f.name !== fileName));
            if (activeFile === fileName) {
                const remainingFiles = files.filter(f => f.name !== fileName);
                setActiveFile(remainingFiles[0]?.name || '');
            }
        }
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput('Executando código...');

        try {
            if (onRun) {
                onRun(files);
            } else {
                // Usar o terminal para executar o arquivo ativo
                const result = await runActiveFile();
                setOutput(result);

                // Também adicionar ao terminal se estiver visível
                if (isTerminalVisible) {
                    addToTerminalHistory(`$ run`);
                    addToTerminalHistory(result);
                }
            }
        } catch (error) {
            const errorMsg = `Erro: ${error}`;
            setOutput(errorMsg);

            if (isTerminalVisible) {
                addToTerminalHistory(`$ run`);
                addToTerminalHistory(errorMsg);
            }
        } finally {
            setIsRunning(false);
        }
    };

    const saveFiles = () => {
        if (onSave) {
            onSave(files);
        } else {
            console.log('Arquivos salvos:', files);
            setOutput('Arquivos salvos com sucesso!');
        }
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const toggleMobileLayout = () => {
        setIsMobileLayout(!isMobileLayout);
    };

    const toggleTerminal = () => {
        setIsTerminalVisible(!isTerminalVisible);
    };

    const addToTerminalHistory = (message: string) => {
        setTerminalHistory(prev => [...prev, message]);

        // Scroll para o final do terminal
        setTimeout(() => {
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }, 100);
    };

    const executeCommand = async (command: string) => {
        if (!command.trim() || isExecuting) return;

        addToTerminalHistory(`$ ${command}`);
        setIsExecuting(true);

        try {
            const result = await processCommand(command);
            if (result) {
                addToTerminalHistory(result);
            }
        } catch (error) {
            addToTerminalHistory(`Erro: ${error}`);
        } finally {
            setIsExecuting(false);
        }
    };

    const processCommand = async (command: string): Promise<string> => {
        const [cmd, ...args] = command.trim().split(' ');

        switch (cmd.toLowerCase()) {
            case 'help':
                return `Comandos disponíveis:
- run [arquivo]: Executa o arquivo ativo ou arquivo específico
- python <código>: Executa código Python
- node <código>: Executa código JavaScript
- clear: Limpa o terminal
- ls: Lista arquivos
- cat <arquivo>: Mostra conteúdo do arquivo
- pwd: Mostra diretório atual
- echo <texto>: Exibe texto
- date: Mostra data e hora
- help: Mostra esta ajuda

Exemplos:
- run                    # Executa arquivo ativo
- run index.html         # Executa arquivo específico
- python print("Hello")  # Executa código Python
- node console.log("Hi") # Executa código JavaScript`;

            case 'run':
                if (args.length === 0) {
                    return await runActiveFile();
                } else {
                    // Executar arquivo específico
                    const fileName = args[0];
                    const file = files.find(f => f.name === fileName);
                    if (!file) {
                        return `Arquivo '${fileName}' não encontrado`;
                    }

                    let result = `Executando arquivo: ${file.name} (${file.language})\n`;

                    switch (file.language) {
                        case 'python':
                            result += await executePythonCode(file.content);
                            break;
                        case 'javascript':
                            result += await executeJavaScriptCode(file.content);
                            break;
                        case 'html':
                            result += await executeWebCode();
                            break;
                        default:
                            result += `Tipo de arquivo '${file.language}' não suportado para execução`;
                    }

                    return result;
                }

            case 'python':
                if (args.length === 0) {
                    return 'Uso: python <código>\nExemplo: python print("Hello World")';
                }
                return await executePythonCode(args.join(' '));

            case 'node':
                if (args.length === 0) {
                    return 'Uso: node <código>\nExemplo: node console.log("Hello World")';
                }
                return await executeJavaScriptCode(args.join(' '));

            case 'clear':
                setTerminalHistory([]);
                return '';

            case 'ls':
                if (files.length === 0) {
                    return 'Nenhum arquivo encontrado';
                }
                return files.map(f => `${f.name} (${f.language})`).join('\n');

            case 'cat':
                if (args.length === 0) {
                    return 'Uso: cat <arquivo>\nExemplo: cat index.html';
                }
                const fileName = args[0];
                const file = files.find(f => f.name === fileName);
                return file ? file.content : `Arquivo '${fileName}' não encontrado`;

            case 'pwd':
                return '/fenix-ide/workspace';

            case 'echo':
                return args.join(' ');

            case 'date':
                return new Date().toLocaleString('pt-BR');

            case '':
                return '';

            default:
                return `Comando '${cmd}' não encontrado. Digite 'help' para ver os comandos disponíveis.`;
        }
    };

    const runActiveFile = async (): Promise<string> => {
        const file = files.find(f => f.name === activeFile);
        if (!file) return 'Nenhum arquivo ativo';

        let result = `Executando arquivo: ${file.name} (${file.language})\n`;

        switch (file.language) {
            case 'python':
                result += await executePythonCode(file.content);
                break;
            case 'javascript':
                result += await executeJavaScriptCode(file.content);
                break;
            case 'html':
                result += await executeWebCode();
                break;
            default:
                result += `Tipo de arquivo '${file.language}' não suportado para execução`;
        }

        return result;
    };

    const executePythonCode = async (code: string): Promise<string> => {
        if (!code.trim()) {
            return 'Erro: Código Python vazio';
        }

        // Simular execução de Python
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            // Simular diferentes tipos de saída
            if (code.includes('print(')) {
                const matches = code.match(/print\(['"`]([^'"`]*)['"`]\)/g);
                if (matches) {
                    return matches.map(match =>
                        match.replace(/print\(['"`]/, '').replace(/['"`]\)/, '')
                    ).join('\n');
                }
            }

            if (code.includes('import ')) {
                return 'Módulos importados com sucesso';
            }

            if (code.includes('def ') || code.includes('class ')) {
                return 'Função/classe definida com sucesso';
            }

            if (code.includes('for ') || code.includes('while ')) {
                return 'Loop executado com sucesso';
            }

            if (code.includes('if ') || code.includes('elif ') || code.includes('else:')) {
                return 'Estrutura condicional executada';
            }

            return 'Código Python executado com sucesso';
        } catch (error) {
            return `Erro na execução: ${error}`;
        }
    };

    const executeJavaScriptCode = async (code: string): Promise<string> => {
        if (!code.trim()) {
            return 'Erro: Código JavaScript vazio';
        }

        // Simular execução de JavaScript
        await new Promise(resolve => setTimeout(resolve, 600));

        try {
            if (code.includes('console.log(')) {
                const matches = code.match(/console\.log\(['"`]([^'"`]*)['"`]\)/g);
                if (matches) {
                    return matches.map(match =>
                        match.replace(/console\.log\(['"`]/, '').replace(/['"`]\)/, '')
                    ).join('\n');
                }
            }

            if (code.includes('function ') || code.includes('const ') || code.includes('let ')) {
                return 'Código JavaScript executado com sucesso';
            }

            if (code.includes('for ') || code.includes('while ')) {
                return 'Loop JavaScript executado';
            }

            if (code.includes('if ') || code.includes('else ')) {
                return 'Estrutura condicional JavaScript executada';
            }

            return 'Script JavaScript executado';
        } catch (error) {
            return `Erro na execução: ${error}`;
        }
    };

    const executeWebCode = async (): Promise<string> => {
        // Simular execução de código web
        await new Promise(resolve => setTimeout(resolve, 500));

        const htmlFile = files.find(f => f.type === 'html');
        const cssFile = files.find(f => f.type === 'css');
        const jsFile = files.find(f => f.type === 'js');

        let result = 'Página web executada com sucesso!\n';
        result += `- HTML: ${htmlFile ? '✓' : '✗'}\n`;
        result += `- CSS: ${cssFile ? '✓' : '✗'}\n`;
        result += `- JavaScript: ${jsFile ? '✓' : '✗'}\n`;
        result += '\nAbra o navegador para ver o resultado.';

        return result;
    };

    const handleTerminalKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isExecuting) {
            const command = terminalInput.trim();
            if (command) {
                executeCommand(command);
                setTerminalInput('');
            }
        }
    };

    // Detectar tamanho da tela
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileLayout(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Atalhos de teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12 - Executar código
            if (e.key === 'F12') {
                e.preventDefault();
                runCode();
            }
            // Ctrl+S - Salvar
            else if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                saveFiles();
            }
            // Ctrl+N - Novo arquivo
            else if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                addFile();
            }
            // Ctrl+` - Toggle terminal
            else if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                toggleTerminal();
            }
            // F11 - Toggle fullscreen
            else if (e.key === 'F11') {
                e.preventDefault();
                toggleFullscreen();
            }
            // Ctrl+Shift+P - Toggle mobile layout
            else if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                toggleMobileLayout();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className={`fenix-ide-simple ${isFullscreen ? 'fullscreen' : ''} ${isMobileLayout ? 'mobile-layout' : ''}`}>
            {/* Header */}
            <div className="ide-header">
                <div className="ide-title">
                    <h2>Fenix IDE - {courseType.toUpperCase()}</h2>
                    <span className="status-indicator">
                        {isMonacoLoaded ? '✅ Monaco Editor: FUNCIONANDO!' : '⏳ Carregando Monaco Editor...'}
                    </span>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                        Arquivos: {files.length} | Ativo: {activeFile || 'Nenhum'}
                    </div>
                </div>

                <div className="ide-controls">
                    <button
                        onClick={addFile}
                        className="btn btn-secondary"
                        title="Novo Arquivo (Ctrl+N)"
                    >
                        <FileText size={16} />
                        <span className="btn-text">Novo Arquivo</span>
                        <span className="btn-shortcut">Ctrl+N</span>
                    </button>
                    <button
                        onClick={saveFiles}
                        className="btn btn-primary"
                        title="Salvar (Ctrl+S)"
                    >
                        <Save size={16} />
                        <span className="btn-text">Salvar</span>
                        <span className="btn-shortcut">Ctrl+S</span>
                    </button>
                    <button
                        onClick={runCode}
                        disabled={isRunning}
                        className="btn btn-success"
                        title="Executar Código (F12)"
                    >
                        <Play size={16} />
                        <span className="btn-text">{isRunning ? 'Executando...' : 'Executar'}</span>
                        <span className="btn-shortcut">F12</span>
                    </button>
                    <button
                        onClick={toggleTerminal}
                        className="btn btn-secondary"
                        title="Terminal (Ctrl+`)"
                    >
                        {isTerminalVisible ? '🖥️' : '💻'}
                        <span className="btn-shortcut">Ctrl+`</span>
                    </button>
                    <button
                        onClick={toggleMobileLayout}
                        className="btn btn-secondary"
                        title="Layout Mobile (Ctrl+Shift+P)"
                    >
                        📱
                        <span className="btn-shortcut">Ctrl+Shift+P</span>
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="btn btn-secondary"
                        title="Tela Cheia (F11)"
                    >
                        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                        <span className="btn-shortcut">F11</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ide-content">
                {/* Sidebar */}
                <div className="ide-sidebar">
                    <div className="file-explorer">
                        <h3>Arquivos</h3>
                        <div className="file-list">
                            {files.map(file => (
                                <div
                                    key={file.name}
                                    className={`file-item ${activeFile === file.name ? 'active' : ''}`}
                                    onClick={() => switchFile(file.name)}
                                >
                                    <span className="file-icon">
                                        {file.type === 'html' ? '🌐' :
                                            file.type === 'css' ? '🎨' :
                                                file.type === 'js' ? '⚡' :
                                                    file.type === 'json' ? '📋' : '📄'}
                                    </span>
                                    <span className="file-name">{file.name}</span>
                                    {files.length > 1 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteFile(file.name);
                                            }}
                                            className="delete-btn"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Editor */}
                <div className="ide-editor">
                    <div className="editor-tabs">
                        {files.map(file => (
                            <div
                                key={file.name}
                                className={`tab ${activeFile === file.name ? 'active' : ''}`}
                                onClick={() => switchFile(file.name)}
                            >
                                <span className="tab-icon">
                                    {file.type === 'html' ? '🌐' :
                                        file.type === 'css' ? '🎨' :
                                            file.type === 'js' ? '⚡' :
                                                file.type === 'json' ? '📋' : '📄'}
                                </span>
                                <span className="tab-name">{file.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="editor-container">
                        {/* Editor Monaco (quando carregado) */}
                        {isMonacoLoaded && (
                            <div ref={editorRef} className="monaco-editor" style={{ height: '100%' }} />
                        )}

                        {/* Editor Fallback (sempre visível) */}
                        <div className="editor-fallback">
                            {!isMonacoLoaded && (
                                <div className="editor-loading">
                                    <div className="loading-spinner"></div>
                                    <p>Carregando Monaco Editor...</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="reload-btn"
                                    >
                                        Recarregar
                                    </button>
                                </div>
                            )}

                            {/* Editor de Texto Simples */}
                            <div className="editor-content">
                                <div className="editor-info">
                                    <span className="editor-type">
                                        {isMonacoLoaded ? 'Monaco Editor' : 'Editor Temporário'}
                                    </span>
                                    <span className="editor-file">
                                        {activeFile} ({getCurrentFileLanguage()})
                                    </span>
                                    <span className="editor-shortcuts">
                                        F12: Executar | Ctrl+S: Salvar | Ctrl+N: Novo
                                    </span>
                                </div>

                                <textarea
                                    value={getCurrentFileContent()}
                                    onChange={(e) => updateFileContent(activeFile, e.target.value)}
                                    className="editor-textarea"
                                    placeholder="Digite seu código aqui..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Output Panel */}
                <div className="ide-output">
                    <div className="output-header">
                        <h3>Saída</h3>
                    </div>
                    <div className="output-content">
                        <pre>{output || 'Nenhuma saída ainda...'}</pre>
                    </div>
                </div>
            </div>

            {/* Terminal Panel */}
            {isTerminalVisible && (
                <div className="terminal-panel">
                    <div className="terminal-header">
                        <h3>Terminal</h3>
                        <button
                            onClick={toggleTerminal}
                            className="terminal-close-btn"
                        >
                            ×
                        </button>
                    </div>
                    <div className="terminal-content" ref={terminalRef}>
                        <div className="terminal-history">
                            {terminalHistory.map((line, index) => (
                                <div key={index} className="terminal-line">
                                    {line}
                                </div>
                            ))}
                            {isExecuting && (
                                <div className="terminal-line executing">
                                    <span className="cursor">█</span>
                                </div>
                            )}
                        </div>
                        <div className="terminal-input-line">
                            <span className="terminal-prompt">
                                {isExecuting ? '⏳' : '$'}
                            </span>
                            <input
                                type="text"
                                value={terminalInput}
                                onChange={(e) => setTerminalInput(e.target.value)}
                                onKeyPress={handleTerminalKeyPress}
                                className="terminal-input"
                                placeholder={isExecuting ? "Executando..." : "Digite um comando..."}
                                disabled={isExecuting}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Status Bar */}
            <div className="ide-status-bar">
                <div className="status-item">
                    <span>Arquivo: {activeFile}</span>
                </div>
                <div className="status-item">
                    <span>Linguagem: {getCurrentFileLanguage()}</span>
                </div>
                <div className="status-item">
                    <span>💡 IntelliSense: Digite ! ou &lt; e pressione Tab para ver sugestões!</span>
                </div>
            </div>

            <style jsx>{`
                .fenix-ide-simple {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background: #1e1e1e;
                    color: #ffffff;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .fenix-ide-simple.fullscreen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 9999;
                }

                .fenix-ide-simple.mobile-layout .ide-content {
                    flex-direction: column;
                }

                .fenix-ide-simple.mobile-layout .ide-sidebar {
                    width: 100%;
                    height: 120px;
                    border-right: none;
                    border-bottom: 1px solid #3e3e42;
                }

                .fenix-ide-simple.mobile-layout .file-list {
                    display: flex;
                    overflow-x: auto;
                    padding: 0 8px;
                }

                .fenix-ide-simple.mobile-layout .file-item {
                    min-width: 120px;
                    border-right: 1px solid #3e3e42;
                }

                .fenix-ide-simple.mobile-layout .ide-output {
                    width: 100%;
                    height: 150px;
                    border-left: none;
                    border-top: 1px solid #3e3e42;
                }

                .ide-header {
                    background: #2d2d30;
                    padding: 12px 20px;
                    border-bottom: 1px solid #3e3e42;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .ide-title h2 {
                    margin: 0;
                    color: #007acc;
                    font-size: 1.2rem;
                }

                .status-indicator {
                    font-size: 0.8rem;
                    color: #90ee90;
                    margin-left: 10px;
                }

                .ide-controls {
                    display: flex;
                    gap: 8px;
                }

                .btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                    position: relative;
                    flex-direction: column;
                    min-width: 80px;
                }

                .btn-text {
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .btn-shortcut {
                    font-size: 0.7rem;
                    opacity: 0.7;
                    margin-top: 2px;
                }

                .btn-primary {
                    background: #007acc;
                    color: white;
                }

                .btn-primary:hover {
                    background: #1177bb;
                }

                .btn-secondary {
                    background: #404040;
                    color: white;
                }

                .btn-secondary:hover {
                    background: #505050;
                }

                .btn-success {
                    background: #28a745;
                    color: white;
                }

                .btn-success:hover {
                    background: #218838;
                }

                .btn:disabled {
                    background: #666;
                    cursor: not-allowed;
                }

                .ide-content {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                }

                .ide-sidebar {
                    width: 250px;
                    background: #252526;
                    border-right: 1px solid #3e3e42;
                    display: flex;
                    flex-direction: column;
                }

                .file-explorer h3 {
                    padding: 12px 16px;
                    margin: 0;
                    background: #2d2d30;
                    border-bottom: 1px solid #3e3e42;
                    font-size: 0.9rem;
                    color: #cccccc;
                }

                .file-list {
                    flex: 1;
                    overflow-y: auto;
                }

                .file-item {
                    display: flex;
                    align-items: center;
                    padding: 8px 16px;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    position: relative;
                }

                .file-item:hover {
                    background: #2a2d2e;
                }

                .file-item.active {
                    background: #094771;
                }

                .file-icon {
                    margin-right: 8px;
                    font-size: 1.1rem;
                }

                .file-name {
                    flex: 1;
                    font-size: 0.9rem;
                }

                .delete-btn {
                    background: none;
                    border: none;
                    color: #ff6b6b;
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: 2px 6px;
                    border-radius: 3px;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .file-item:hover .delete-btn {
                    opacity: 1;
                }

                .delete-btn:hover {
                    background: #ff6b6b;
                    color: white;
                }

                .ide-editor {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .editor-tabs {
                    background: #2d2d30;
                    display: flex;
                    border-bottom: 1px solid #3e3e42;
                    overflow-x: auto;
                }

                .tab {
                    display: flex;
                    align-items: center;
                    padding: 8px 16px;
                    cursor: pointer;
                    border-right: 1px solid #3e3e42;
                    transition: background 0.2s ease;
                    min-width: 120px;
                }

                .tab:hover {
                    background: #37373d;
                }

                .tab.active {
                    background: #1e1e1e;
                }

                .tab-icon {
                    margin-right: 6px;
                    font-size: 0.9rem;
                }

                .tab-name {
                    font-size: 0.9rem;
                }

                .editor-container {
                    flex: 1;
                    position: relative;
                }

                .monaco-editor {
                    height: 100%;
                }

                .loading-editor {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: #cccccc;
                }

                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #3e3e42;
                    border-top: 3px solid #007acc;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .ide-output {
                    width: 300px;
                    background: #1e1e1e;
                    border-left: 1px solid #3e3e42;
                    display: flex;
                    flex-direction: column;
                }

                .output-header {
                    background: #2d2d30;
                    padding: 12px 16px;
                    border-bottom: 1px solid #3e3e42;
                }

                .output-header h3 {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #cccccc;
                }

                .output-content {
                    flex: 1;
                    padding: 16px;
                    overflow-y: auto;
                }

                .output-content pre {
                    margin: 0;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9rem;
                    color: #cccccc;
                    white-space: pre-wrap;
                }

                .ide-status-bar {
                    background: #007acc;
                    padding: 4px 16px;
                    display: flex;
                    gap: 20px;
                    font-size: 0.8rem;
                    color: white;
                }

                .status-item {
                    display: flex;
                    align-items: center;
                }

                /* Terminal Styles */
                .terminal-panel {
                    background: #0c0c0c;
                    border-top: 1px solid #3e3e42;
                    height: 300px;
                    display: flex;
                    flex-direction: column;
                }

                .terminal-header {
                    background: #1e1e1e;
                    padding: 8px 16px;
                    border-bottom: 1px solid #3e3e42;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .terminal-header h3 {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #cccccc;
                }

                .terminal-close-btn {
                    background: none;
                    border: none;
                    color: #cccccc;
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: 2px 6px;
                    border-radius: 3px;
                }

                .terminal-close-btn:hover {
                    background: #3e3e42;
                }

                .terminal-content {
                    flex: 1;
                    padding: 10px;
                    overflow-y: auto;
                    font-family: 'Courier New', monospace;
                    font-size: 13px;
                    line-height: 1.4;
                }

                .terminal-history {
                    margin-bottom: 10px;
                }

                .terminal-line {
                    color: #00ff00;
                    margin-bottom: 2px;
                    word-wrap: break-word;
                }

                .terminal-line.executing {
                    color: #ffff00;
                }

                .cursor {
                    animation: blink 1s infinite;
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .terminal-input-line {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .terminal-prompt {
                    color: #00ff00;
                    font-weight: bold;
                }

                .terminal-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #ffffff;
                    font-family: 'Courier New', monospace;
                    font-size: 13px;
                    outline: none;
                }

                .terminal-input::placeholder {
                    color: #666;
                }

                /* Editor Fallback Styles */
                .editor-fallback {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: #1e1e1e;
                }

                .editor-loading {
                    padding: 20px;
                    text-align: center;
                    background: #2d2d30;
                    border-bottom: 1px solid #3e3e42;
                }

                .editor-loading .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #3e3e42;
                    border-top: 2px solid #007acc;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 10px;
                }

                .editor-loading p {
                    margin: 0 0 10px 0;
                    color: #cccccc;
                }

                .reload-btn {
                    padding: 6px 12px;
                    background: #007acc;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: background 0.2s ease;
                }

                .reload-btn:hover {
                    background: #1177bb;
                }

                .editor-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .editor-info {
                    padding: 8px 15px;
                    background: #2d2d30;
                    border-bottom: 1px solid #3e3e42;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 11px;
                    color: #888;
                }

                .editor-type {
                    font-weight: 600;
                    color: #58a6ff;
                }

                .editor-file {
                    color: #cccccc;
                }

                .editor-shortcuts {
                    color: #666;
                    font-size: 10px;
                }

                .editor-textarea {
                    flex: 1;
                    width: 100%;
                    background: #1e1e1e;
                    color: #ffffff;
                    border: none;
                    padding: 15px;
                    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                    font-size: 14px;
                    line-height: 1.5;
                    resize: none;
                    outline: none;
                }

                .editor-textarea::placeholder {
                    color: #666;
                }

                @media (max-width: 1200px) {
                    .ide-sidebar {
                        width: 200px;
                    }
                    
                    .ide-output {
                        width: 250px;
                    }
                }

                @media (max-width: 768px) {
                    .fenix-ide-simple {
                        height: 100vh;
                    }
                    
                    .ide-header {
                        padding: 8px 15px;
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .ide-title h2 {
                        font-size: 1rem;
                    }
                    
                    .ide-controls {
                        flex-wrap: wrap;
                        gap: 4px;
                        justify-content: center;
                    }
                    
                    .btn {
                        padding: 6px 8px;
                        font-size: 0.75rem;
                        min-width: 60px;
                    }

                    .btn-text {
                        font-size: 0.7rem;
                    }

                    .btn-shortcut {
                        font-size: 0.6rem;
                    }
                    
                    .ide-content {
                        flex-direction: column;
                        height: calc(100vh - 120px);
                    }
                    
                    .ide-sidebar {
                        width: 100%;
                        height: 120px;
                        border-right: none;
                        border-bottom: 1px solid #3e3e42;
                    }
                    
                    .file-explorer h3 {
                        padding: 8px 12px;
                        font-size: 0.8rem;
                    }
                    
                    .file-list {
                        display: flex;
                        overflow-x: auto;
                        padding: 0 8px;
                    }
                    
                    .file-item {
                        min-width: 120px;
                        padding: 6px 12px;
                        border-right: 1px solid #3e3e42;
                    }
                    
                    .ide-editor {
                        flex: 1;
                        min-height: 300px;
                    }
                    
                    .editor-tabs {
                        overflow-x: auto;
                    }
                    
                    .tab {
                        min-width: 100px;
                        padding: 6px 12px;
                    }
                    
                    .ide-output {
                        width: 100%;
                        height: 150px;
                        border-left: none;
                        border-top: 1px solid #3e3e42;
                    }
                    
                    .terminal-panel {
                        height: 200px;
                    }
                    
                    .ide-status-bar {
                        padding: 2px 8px;
                        font-size: 0.7rem;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                }

                @media (max-width: 480px) {
                    .ide-header {
                        padding: 6px 10px;
                    }
                    
                    .ide-title h2 {
                        font-size: 0.9rem;
                    }
                    
                    .status-indicator {
                        font-size: 0.7rem;
                    }
                    
                    .ide-controls {
                        gap: 2px;
                    }
                    
                    .btn {
                        padding: 4px 6px;
                        font-size: 0.7rem;
                        min-width: 50px;
                    }

                    .btn-text {
                        font-size: 0.65rem;
                    }

                    .btn-shortcut {
                        font-size: 0.55rem;
                    }

                    .editor-info {
                        flex-direction: column;
                        gap: 2px;
                        padding: 6px 10px;
                    }

                    .editor-shortcuts {
                        font-size: 9px;
                    }
                    
                    .ide-sidebar {
                        height: 100px;
                    }
                    
                    .file-item {
                        min-width: 100px;
                        padding: 4px 8px;
                        font-size: 0.8rem;
                    }
                    
                    .tab {
                        min-width: 80px;
                        padding: 4px 8px;
                        font-size: 0.8rem;
                    }
                    
                    .ide-output {
                        height: 120px;
                    }
                    
                    .output-content {
                        padding: 8px;
                    }
                    
                    .output-content pre {
                        font-size: 0.8rem;
                    }
                    
                    .terminal-panel {
                        height: 150px;
                    }
                    
                    .terminal-content {
                        font-size: 11px;
                        padding: 8px;
                    }
                }
            `}</style>
        </div>
    );
};

export default FenixIDESimple;
