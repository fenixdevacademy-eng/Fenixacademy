'use client';

import React from 'react';
import CS50IDE from '../../components/CS50IDE';

export default function IDECSPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CS50IDE
                courseId="fundamentos-desenvolvimento-web"
                lessonId="2"
                initialCode={{
                    html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto CS50</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Bem-vindo ao CS50</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Início da Jornada</h2>
            <p>Esta é sua primeira página web criada com a IDE CS50!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2025 - Fenix Academy CS50</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
                    css: `/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8fafc;
}

/* Header */
header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem 0;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background 0.3s ease;
}

nav a:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Main content */
main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

section {
    background: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

h2 {
    color: #667eea;
    margin-bottom: 1rem;
}

/* Footer */
footer {
    background: #1e293b;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
}

/* Responsividade */
@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    nav ul {
        flex-direction: column;
        gap: 1rem;
    }
    
    main {
        padding: 2rem 1rem;
    }
    
    section {
        padding: 2rem 1rem;
    }
}`,
                    js: `// CS50 IDE - JavaScript Interativo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 CS50 IDE carregada com sucesso!');
    
    // Adicionar interatividade ao menu
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Adicionar efeito de destaque nos links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Adicionar animação de entrada
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Adicionar contador de visitas
    let visitCount = localStorage.getItem('cs50VisitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('cs50VisitCount', visitCount);
    
    console.log(\`🚀 Esta é sua visita número \${visitCount} na IDE CS50!\`);
});`
                }}
            />
        </div>
    );
}
