'use client';

import React, { useState } from 'react';
import FenixIDESimple from '../../components/FenixIDESimple';

const IDESimplePage: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState<'web' | 'python' | 'javascript' | 'react' | 'node'>('web');
    const [savedFiles, setSavedFiles] = useState<any[]>([]);

    const handleSave = (files: any[]) => {
        setSavedFiles(files);
        console.log('Arquivos salvos:', files);

        // Simular salvamento
        localStorage.setItem('fenix-ide-files', JSON.stringify(files));

        // Mostrar notificação
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = 'Arquivos salvos com sucesso!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    };

    const handleRun = (files: any[]) => {
        console.log('Executando código:', files);

        // Simular execução
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #007acc;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = 'Código executado com sucesso!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    };

    const courseOptions = [
        { value: 'web', label: 'Desenvolvimento Web', description: 'HTML, CSS, JavaScript' },
        { value: 'python', label: 'Python', description: 'Programação Python' },
        { value: 'javascript', label: 'JavaScript Avançado', description: 'ES6+, Node.js' },
        { value: 'react', label: 'React', description: 'React, JSX, Hooks' },
        { value: 'node', label: 'Node.js', description: 'Backend com Node.js' }
    ];

    return (
        <div className="ide-simple-page">
            <style jsx>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `}</style>

            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1>Fenix IDE Simplificada</h1>
                    <p>IDE completa com Monaco Editor e IntelliSense para todos os cursos da Fenix Academy</p>
                </div>

                <div className="course-selector">
                    <label htmlFor="course-select">Selecione o Curso:</label>
                    <select
                        id="course-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value as any)}
                        className="course-select"
                    >
                        {courseOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label} - {option.description}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* IDE Container */}
            <div className="ide-container">
                <FenixIDESimple
                    courseType={selectedCourse}
                    onSave={handleSave}
                    onRun={handleRun}
                />
            </div>

            {/* Features Info */}
            <div className="features-info">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🧠</div>
                        <h3>IntelliSense Avançado</h3>
                        <p>Autocompletar inteligente para HTML, CSS, JavaScript e Python com sugestões contextuais</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Monaco Editor</h3>
                        <p>Editor de código profissional com syntax highlighting, minimap e recursos avançados</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📁</div>
                        <h3>Multi-arquivo</h3>
                        <p>Suporte a múltiplos arquivos com navegação por abas e gerenciamento de projetos</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Curso Específico</h3>
                        <p>Templates e configurações específicas para cada tipo de curso da Fenix Academy</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">💾</div>
                        <h3>Salvamento</h3>
                        <p>Salve seus projetos localmente e continue de onde parou</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">▶️</div>
                        <h3>Execução</h3>
                        <p>Execute seu código diretamente no IDE com feedback em tempo real</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ide-simple-page {
                    min-height: 100vh;
                    background: #0d1117;
                    color: #ffffff;
                }

                .page-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 40px 20px;
                    text-align: center;
                }

                .header-content h1 {
                    font-size: 2.5rem;
                    margin: 0 0 10px 0;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }

                .header-content p {
                    font-size: 1.1rem;
                    margin: 0 0 30px 0;
                    color: rgba(255,255,255,0.9);
                }

                .course-selector {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                .course-selector label {
                    font-size: 1rem;
                    font-weight: 600;
                    color: white;
                }

                .course-select {
                    padding: 12px 20px;
                    border: none;
                    border-radius: 8px;
                    background: white;
                    color: #333;
                    font-size: 1rem;
                    cursor: pointer;
                    min-width: 300px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }

                .course-select:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
                }

                .ide-container {
                    height: calc(100vh - 200px);
                    min-height: 600px;
                    width: 100%;
                    overflow: hidden;
                }

                .features-info {
                    background: #161b22;
                    padding: 60px 20px;
                }

                .features-grid {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                }

                .feature-card {
                    background: #21262d;
                    padding: 30px;
                    border-radius: 12px;
                    text-align: center;
                    border: 1px solid #30363d;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }

                .feature-icon {
                    font-size: 3rem;
                    margin-bottom: 20px;
                }

                .feature-card h3 {
                    font-size: 1.3rem;
                    margin: 0 0 15px 0;
                    color: #58a6ff;
                }

                .feature-card p {
                    color: #8b949e;
                    line-height: 1.6;
                    margin: 0;
                }

                @media (max-width: 1200px) {
                    .ide-container {
                        height: calc(100vh - 180px);
                        min-height: 500px;
                    }
                    
                    .features-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 25px;
                    }
                }

                @media (max-width: 768px) {
                    .page-header {
                        padding: 30px 15px;
                    }
                    
                    .header-content h1 {
                        font-size: 2rem;
                    }
                    
                    .header-content p {
                        font-size: 1rem;
                    }
                    
                    .course-selector {
                        gap: 8px;
                    }
                    
                    .course-select {
                        min-width: 250px;
                        padding: 10px 15px;
                        font-size: 0.9rem;
                    }
                    
                    .ide-container {
                        height: calc(100vh - 160px);
                        min-height: 400px;
                    }
                    
                    .features-info {
                        padding: 40px 15px;
                    }
                    
                    .features-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    
                    .feature-card {
                        padding: 20px;
                    }
                    
                    .feature-icon {
                        font-size: 2.5rem;
                    }
                    
                    .feature-card h3 {
                        font-size: 1.2rem;
                    }
                }

                @media (max-width: 480px) {
                    .page-header {
                        padding: 20px 10px;
                    }
                    
                    .header-content h1 {
                        font-size: 1.5rem;
                    }
                    
                    .header-content p {
                        font-size: 0.9rem;
                    }
                    
                    .course-select {
                        min-width: 200px;
                        padding: 8px 12px;
                        font-size: 0.8rem;
                    }
                    
                    .ide-container {
                        height: calc(100vh - 140px);
                        min-height: 350px;
                    }
                    
                    .features-info {
                        padding: 30px 10px;
                    }
                    
                    .feature-card {
                        padding: 15px;
                    }
                    
                    .feature-icon {
                        font-size: 2rem;
                    }
                    
                    .feature-card h3 {
                        font-size: 1.1rem;
                    }
                    
                    .feature-card p {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default IDESimplePage;
