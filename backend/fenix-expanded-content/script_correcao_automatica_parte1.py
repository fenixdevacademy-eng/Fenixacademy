#!/usr/bin/env python3
"""
SCRIPT DE CORREÇÃO AUTOMÁTICA - PARTE 1
Corrige código Python incorreto em cursos de React e Web Fundamentals
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

class CorretorConteudo:
    def __init__(self, base_path: str = "backend/fenix-expanded-content"):
        self.base_path = Path(base_path)
        self.arquivos_corrigidos = 0
        self.erros_encontrados = 0
        
        # Padrões de código incorreto para detectar
        self.padroes_incorretos = {
            'python_em_react': r'```python\s*# Exemplo prático de.*react.*',
            'python_em_web': r'```python\s*# Exemplo prático de.*html.*|```python\s*# Exemplo prático de.*css.*',
            'python_em_javascript': r'```python\s*# Exemplo prático de.*javascript.*',
        }
        
        # Código correto para substituir
        self.codigo_correto = {
            'react': {
                'basico': '''```javascript
// Exemplo prático de useState e useEffect
import React, { useState, useEffect } from 'react';

function ExemploBasico() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    
    useEffect(() => {
        document.title = `Contador: ${count}`;
    }, [count]);
    
    return (
        <div>
            <h2>Contador: {count}</h2>
            <button onClick={() => setCount(count + 1)}>
                Incrementar
            </button>
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
            />
            <p>Olá, {name}!</p>
        </div>
    );
}

export default ExemploBasico;```''',
                'avancado': '''```javascript
// Implementação avançada de hooks personalizados
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Hook personalizado para gerenciar estado complexo
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    const [history, setHistory] = useState([initialValue]);
    
    const increment = useCallback(() => {
        setCount(prev => {
            const newCount = prev + 1;
            setHistory(prev => [...prev, newCount]);
            return newCount;
        });
    }, []);
    
    const decrement = useCallback(() => {
        setCount(prev => {
            const newCount = prev - 1;
            setHistory(prev => [...prev, newCount]);
            return newCount;
        });
    }, []);
    
    const reset = useCallback(() => {
        setCount(initialValue);
        setHistory([initialValue]);
    }, [initialValue]);
    
    const stats = useMemo(() => ({
        total: history.length,
        max: Math.max(...history),
        min: Math.min(...history),
        average: history.reduce((a, b) => a + b, 0) / history.length
    }), [history]);
    
    return { count, increment, decrement, reset, stats, history };
}

function ContadorAvancado() {
    const { count, increment, decrement, reset, stats } = useCounter(0);
    
    useEffect(() => {
        console.log('Contador atualizado:', count);
    }, [count]);
    
    return (
        <div>
            <h2>Contador Avançado: {count}</h2>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
                <button onClick={reset}>Reset</button>
            </div>
            <div>
                <h3>Estatísticas:</h3>
                <p>Total de mudanças: {stats.total}</p>
                <p>Máximo: {stats.max}</p>
                <p>Mínimo: {stats.min}</p>
                <p>Média: {stats.average.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default ContadorAvancado;```'''
            },
            'web': {
                'html': '''```html
<!-- Exemplo prático de HTML5 semântico -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo HTML5 Semântico</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        header { background: #333; color: white; padding: 1rem; }
        nav ul { list-style: none; display: flex; gap: 1rem; }
        main { padding: 2rem; }
        section { margin-bottom: 2rem; }
        footer { background: #333; color: white; text-align: center; padding: 1rem; }
    </style>
</head>
<body>
    <header>
        <h1>Meu Site</h1>
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
            <h2>Bem-vindo</h2>
            <p>Este é um exemplo de HTML5 semântico.</p>
        </section>
        
        <section id="sobre">
            <h2>Sobre Nós</h2>
            <p>Conteúdo sobre a empresa...</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Fenix Academy. Todos os direitos reservados.</p>
    </footer>
</body>
</html>```''',
                'css': '''```css
/* Exemplo prático de CSS Grid e Flexbox */
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem;
    text-align: center;
}

.card-body {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.card-footer {
    padding: 1rem;
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.btn:hover {
    background: #0056b3;
}

/* Responsividade */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
}```''',
                'javascript': '''```javascript
// Exemplo prático de JavaScript moderno (ES6+)
class GerenciadorTarefas {
    constructor() {
        this.tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        this.contador = this.tarefas.length;
    }
    
    adicionarTarefa(texto) {
        const tarefa = {
            id: ++this.contador,
            texto: texto,
            concluida: false,
            dataCriacao: new Date().toISOString()
        };
        
        this.tarefas.push(tarefa);
        this.salvar();
        return tarefa;
    }
    
    marcarConcluida(id) {
        const tarefa = this.tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.concluida = !tarefa.concluida;
            this.salvar();
        }
    }
    
    removerTarefa(id) {
        this.tarefas = this.tarefas.filter(t => t.id !== id);
        this.salvar();
    }
    
    listarTarefas(filtro = 'todas') {
        switch (filtro) {
            case 'pendentes':
                return this.tarefas.filter(t => !t.concluida);
            case 'concluidas':
                return this.tarefas.filter(t => t.concluida);
            default:
                return this.tarefas;
        }
    }
    
    salvar() {
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }
    
    obterEstatisticas() {
        const total = this.tarefas.length;
        const concluidas = this.tarefas.filter(t => t.concluida).length;
        const pendentes = total - concluidas;
        
        return {
            total,
            concluidas,
            pendentes,
            percentualConcluido: total > 0 ? (concluidas / total) * 100 : 0
        };
    }
}

// Uso da classe
const gerenciador = new GerenciadorTarefas();

// Adicionar algumas tarefas de exemplo
gerenciador.adicionarTarefa('Aprender React');
gerenciador.adicionarTarefa('Praticar JavaScript');
gerenciador.adicionarTarefa('Criar portfolio');

console.log('Tarefas:', gerenciador.listarTarefas());
console.log('Estatísticas:', gerenciador.obterEstatisticas());```'''
            }
        }

    def detectar_arquivos_problematicos(self) -> List[Tuple[Path, str]]:
        """Detecta arquivos com código incorreto"""
        arquivos_problematicos = []
        
        # Cursos que devem ter JavaScript/React, não Python
        cursos_js = ['react-advanced', 'web-fundamentals', 'frontend-development']
        
        for curso in cursos_js:
            curso_path = self.base_path / curso
            if curso_path.exists():
                for arquivo in curso_path.rglob("*.md"):
                    try:
                        with open(arquivo, 'r', encoding='utf-8') as f:
                            conteudo = f.read()
                        
                        # Verificar se tem código Python incorreto
                        if re.search(self.padroes_incorretos['python_em_react'], conteudo, re.IGNORECASE) or \
                           re.search(self.padroes_incorretos['python_em_web'], conteudo, re.IGNORECASE):
                            arquivos_problematicos.append((arquivo, curso))
                            
                    except Exception as e:
                        print(f"Erro ao ler {arquivo}: {e}")
        
        return arquivos_problematicos

    def corrigir_arquivo(self, arquivo_path: Path, tipo_curso: str) -> bool:
        """Corrige um arquivo específico"""
        try:
            with open(arquivo_path, 'r', encoding='utf-8') as f:
                conteudo_original = f.read()
            
            conteudo_corrigido = conteudo_original
            
            # Corrigir código Python em React
            if tipo_curso == 'react-advanced':
                # Substituir exemplo básico
                padrao_basico = r'```python\s*# Exemplo prático de.*?\n```'
                conteudo_corrigido = re.sub(
                    padrao_basico, 
                    self.codigo_correto['react']['basico'], 
                    conteudo_corrigido, 
                    flags=re.DOTALL | re.IGNORECASE
                )
                
                # Substituir exemplo avançado
                padrao_avancado = r'```python\s*# Implementação avançada de.*?\n```'
                conteudo_corrigido = re.sub(
                    padrao_avancado, 
                    self.codigo_correto['react']['avancado'], 
                    conteudo_corrigido, 
                    flags=re.DOTALL | re.IGNORECASE
                )
            
            # Corrigir código Python em Web Fundamentals
            elif tipo_curso == 'web-fundamentals':
                # Detectar tipo de conteúdo (HTML, CSS, JS)
                if 'html' in arquivo_path.name.lower() or 'semantico' in conteudo_original.lower():
                    padrao = r'```python\s*# Exemplo prático de.*?\n```'
                    conteudo_corrigido = re.sub(
                        padrao, 
                        self.codigo_correto['web']['html'], 
                        conteudo_corrigido, 
                        flags=re.DOTALL | re.IGNORECASE
                    )
                elif 'css' in arquivo_path.name.lower() or 'grid' in conteudo_original.lower():
                    padrao = r'```python\s*# Exemplo prático de.*?\n```'
                    conteudo_corrigido = re.sub(
                        padrao, 
                        self.codigo_correto['web']['css'], 
                        conteudo_corrigido, 
                        flags=re.DOTALL | re.IGNORECASE
                    )
                else:
                    padrao = r'```python\s*# Exemplo prático de.*?\n```'
                    conteudo_corrigido = re.sub(
                        padrao, 
                        self.codigo_correto['web']['javascript'], 
                        conteudo_corrigido, 
                        flags=re.DOTALL | re.IGNORECASE
                    )
            
            # Salvar arquivo corrigido
            if conteudo_corrigido != conteudo_original:
                # Fazer backup
                backup_path = arquivo_path.with_suffix('.md.backup')
                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.write(conteudo_original)
                
                # Salvar versão corrigida
                with open(arquivo_path, 'w', encoding='utf-8') as f:
                    f.write(conteudo_corrigido)
                
                return True
            
            return False
            
        except Exception as e:
            print(f"Erro ao corrigir {arquivo_path}: {e}")
            self.erros_encontrados += 1
            return False

    def executar_correcao(self):
        """Executa a correção automática"""
        print("🚀 INICIANDO CORREÇÃO AUTOMÁTICA - PARTE 1")
        print("=" * 60)
        print("🎯 Foco: Corrigir código Python incorreto em cursos de React e Web")
        print()
        
        # Detectar arquivos problemáticos
        print("🔍 Detectando arquivos com código incorreto...")
        arquivos_problematicos = self.detectar_arquivos_problematicos()
        
        if not arquivos_problematicos:
            print("✅ Nenhum arquivo problemático encontrado!")
            return
        
        print(f"📋 Encontrados {len(arquivos_problematicos)} arquivos para corrigir")
        print()
        
        # Corrigir cada arquivo
        for arquivo_path, tipo_curso in arquivos_problematicos:
            print(f"🔧 Corrigindo: {arquivo_path.name}")
            print(f"   📁 Curso: {tipo_curso}")
            
            if self.corrigir_arquivo(arquivo_path, tipo_curso):
                print("   ✅ Corrigido com sucesso!")
                self.arquivos_corrigidos += 1
            else:
                print("   ⚠️  Nenhuma correção necessária")
            
            print()
        
        # Relatório final
        print("=" * 60)
        print("📊 RELATÓRIO DE CORREÇÃO - PARTE 1")
        print("=" * 60)
        print(f"✅ Arquivos corrigidos: {self.arquivos_corrigidos}")
        print(f"❌ Erros encontrados: {self.erros_encontrados}")
        print(f"📁 Total processado: {len(arquivos_problematicos)}")
        print()
        
        if self.arquivos_corrigidos > 0:
            print("🎉 CORREÇÃO CONCLUÍDA COM SUCESSO!")
            print("💡 Próximos passos:")
            print("   1. Verificar se os códigos estão funcionando")
            print("   2. Testar a sintaxe dos exemplos")
            print("   3. Executar Parte 2: Melhorar conteúdo genérico")
        else:
            print("ℹ️  Nenhuma correção foi necessária.")
            print("💡 Todos os arquivos já estão corretos!")

def main():
    """Função principal"""
    corretor = CorretorConteudo()
    corretor.executar_correcao()

if __name__ == "__main__":
    main()
