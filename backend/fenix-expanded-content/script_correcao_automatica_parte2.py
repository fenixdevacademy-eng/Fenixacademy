#!/usr/bin/env python3
"""
SCRIPT DE CORREÇÃO AUTOMÁTICA - PARTE 2
Melhora conteúdo genérico e repetitivo, adicionando especificidade técnica
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

class MelhoradorConteudo:
    def __init__(self, base_path: str = "backend/fenix-expanded-content"):
        self.base_path = Path(base_path)
        self.arquivos_melhorados = 0
        self.erros_encontrados = 0
        
        # Padrões de conteúdo genérico para detectar
        self.padroes_genericos = {
            'texto_vago': r'é uma tecnologia essencial para.*?\.',
            'exercicio_generico': r'Crie uma implementação básica de.*?\.',
            'projeto_generico': r'Crie um projeto completo utilizando.*?\.',
            'introducao_vaga': r'Conceitos fundamentais.*?Aplicações práticas.*?Melhores práticas da indústria',
        }
        
        # Conteúdo específico para cada curso
        self.conteudo_especifico = {
            'react-advanced': {
                'introducao': '''useState e useEffect são hooks fundamentais do React que revolucionaram o desenvolvimento de componentes funcionais. Nesta aula, você dominará técnicas avançadas para gerenciar estado complexo e efeitos colaterais de forma eficiente, criando aplicações React de nível profissional.

**Por que aprender useState e useEffect avançados?**
- **Performance**: Otimize re-renderizações desnecessárias
- **Manutenibilidade**: Código mais limpo e organizável
- **Escalabilidade**: Soluções que crescem com sua aplicação
- **Mercado**: Habilidades essenciais para desenvolvedores React sênior''',
                
                'exercicios': {
                    'basico': '''**Exercício 1: Contador Inteligente**
Crie um componente de contador que:
- Use useState para gerenciar o valor atual
- Use useEffect para salvar o valor no localStorage
- Implemente incremento, decremento e reset
- Adicione validação para valores negativos
- Exiba estatísticas (máximo, mínimo, total de cliques)

**Código de partida:**
```javascript
import React, { useState, useEffect } from 'react';

function ContadorInteligente() {
    // Implemente aqui
}

export default ContadorInteligente;
```''',
                    
                    'intermediario': '''**Exercício 2: Lista de Tarefas com Filtros**
Desenvolva uma aplicação de tarefas que:
- Use useState para gerenciar lista de tarefas e filtros
- Use useEffect para sincronizar com API local
- Implemente filtros: todas, pendentes, concluídas
- Adicione funcionalidade de busca em tempo real
- Inclua estatísticas de produtividade

**Funcionalidades obrigatórias:**
- Adicionar/remover tarefas
- Marcar como concluída
- Filtrar por status
- Buscar por texto
- Estatísticas em tempo real''',
                    
                    'avancado': '''**Exercício 3: Dashboard de Vendas em Tempo Real**
Crie um dashboard que:
- Use múltiplos useState para diferentes seções
- Use useEffect para conectar com WebSocket
- Implemente cache inteligente de dados
- Adicione debounce para otimizar performance
- Inclua gráficos interativos

**Requisitos técnicos:**
- Atualizações em tempo real
- Cache de 5 minutos
- Debounce de 300ms
- Tratamento de erros robusto
- Loading states elegantes'''
                },
                
                'projetos': {
                    'portfolio': '''**Projeto: Portfolio Pessoal Interativo**

**Objetivo:** Criar um portfolio profissional usando React hooks avançados

**Funcionalidades:**
1. **Navegação dinâmica** com useState
2. **Tema claro/escuro** com useEffect e localStorage
3. **Animações suaves** com hooks personalizados
4. **Formulário de contato** com validação em tempo real
5. **Galeria de projetos** com filtros e busca

**Tecnologias:**
- React 18+ com hooks
- CSS Modules ou Styled Components
- Framer Motion para animações
- React Hook Form para formulários

**Entregáveis:**
- Código no GitHub
- Deploy no Vercel/Netlify
- Documentação técnica
- Demo online funcionando''',
                    
                    'ecommerce': '''**Projeto: E-commerce com Carrinho Inteligente**

**Objetivo:** Desenvolver um e-commerce completo usando hooks avançados

**Funcionalidades:**
1. **Catálogo de produtos** com filtros dinâmicos
2. **Carrinho de compras** persistente
3. **Sistema de favoritos** com localStorage
4. **Busca inteligente** com debounce
5. **Checkout** com validação em tempo real

**Hooks utilizados:**
- useState para estado do carrinho
- useEffect para sincronização
- useCallback para otimização
- useMemo para cálculos pesados
- Custom hooks para lógica reutilizável

**Entregáveis:**
- Aplicação funcional completa
- Testes unitários
- Documentação de API
- Deploy em produção'''
                }
            },
            
            'web-fundamentals': {
                'introducao': '''HTML5 semântico e acessibilidade são fundamentos essenciais para criar websites modernos, inclusivos e otimizados para SEO. Nesta aula, você aprenderá a estruturar conteúdo de forma que seja compreendido tanto por usuários quanto por mecanismos de busca.

**Por que dominar HTML5 semântico e acessibilidade?**
- **SEO**: Melhor posicionamento nos mecanismos de busca
- **Inclusão**: Sites acessíveis para todos os usuários
- **Manutenibilidade**: Código mais limpo e organizado
- **Performance**: Estrutura otimizada para navegadores
- **Compliance**: Atendimento a padrões web internacionais''',
                
                'exercicios': {
                    'basico': '''**Exercício 1: Página de Blog Semântica**
Crie uma página de blog que:
- Use elementos semânticos: header, nav, main, article, aside, footer
- Implemente estrutura de cabeçalhos hierárquica (h1, h2, h3)
- Adicione navegação com breadcrumbs
- Inclua sidebar com informações do autor
- Implemente footer com links úteis

**Requisitos de acessibilidade:**
- Alt text em todas as imagens
- Labels em formulários
- Contraste adequado
- Navegação por teclado
- ARIA labels quando necessário''',
                    
                    'intermediario': '''**Exercício 2: Formulário de Contato Acessível**
Desenvolva um formulário que:
- Use input types apropriados (email, tel, date)
- Implemente validação HTML5 nativa
- Adicione mensagens de erro acessíveis
- Inclua campos obrigatórios claramente marcados
- Funcione com leitores de tela

**Validações obrigatórias:**
- Email válido
- Telefone no formato brasileiro
- Data de nascimento válida
- Mensagem com mínimo de 10 caracteres
- Aceite de termos obrigatório''',
                    
                    'avancado': '''**Exercício 3: Dashboard Administrativo Responsivo**
Crie um dashboard que:
- Use CSS Grid e Flexbox para layout
- Implemente navegação acessível
- Adicione tabelas responsivas
- Inclua gráficos com fallbacks
- Funcione em todos os dispositivos

**Tecnologias:**
- HTML5 semântico
- CSS3 moderno
- JavaScript ES6+
- Acessibilidade WCAG 2.1 AA
- Design responsivo'''
                },
                
                'projetos': {
                    'portfolio': '''**Projeto: Portfolio Profissional Responsivo**

**Objetivo:** Criar um portfolio que demonstre domínio completo de HTML5, CSS3 e JavaScript

**Seções obrigatórias:**
1. **Header** com navegação responsiva
2. **Hero section** com apresentação
3. **Sobre mim** com timeline
4. **Projetos** com galeria interativa
5. **Habilidades** com barras de progresso
6. **Contato** com formulário funcional
7. **Footer** com links sociais

**Tecnologias:**
- HTML5 semântico
- CSS3 com Grid e Flexbox
- JavaScript vanilla
- Animações CSS
- Design responsivo

**Entregáveis:**
- Código no GitHub
- Deploy no GitHub Pages
- Documentação técnica
- Testes de acessibilidade''',
                    
                    'ecommerce': '''**Projeto: Loja Online Completa**

**Objetivo:** Desenvolver uma loja online funcional usando apenas HTML, CSS e JavaScript

**Funcionalidades:**
1. **Catálogo de produtos** com filtros
2. **Carrinho de compras** funcional
3. **Sistema de busca** em tempo real
4. **Páginas de produto** detalhadas
5. **Checkout** com validação
6. **Área administrativa** básica

**Tecnologias:**
- HTML5 semântico
- CSS3 avançado
- JavaScript ES6+
- LocalStorage para persistência
- APIs REST simuladas

**Entregáveis:**
- Aplicação funcional
- Código documentado
- Deploy online
- Manual do usuário'''
                }
            },
            
            'python-data-science': {
                'introducao': '''Python se tornou a linguagem padrão para Data Science devido à sua simplicidade, poderosa biblioteca de ferramentas e vasta comunidade. Nesta aula, você dominará os fundamentos essenciais para transformar dados brutos em insights valiosos.

**Por que Python para Data Science?**
- **Pandas**: Manipulação eficiente de dados
- **NumPy**: Computação numérica de alta performance
- **Matplotlib/Seaborn**: Visualizações poderosas
- **Scikit-learn**: Machine Learning acessível
- **Jupyter**: Ambiente interativo ideal para análise
- **Comunidade**: Suporte e recursos abundantes''',
                
                'exercicios': {
                    'basico': '''**Exercício 1: Análise de Vendas de E-commerce**
Analise um dataset de vendas que inclui:
- Dados de produtos, clientes e vendas
- Período de 12 meses
- Variações sazonais
- Diferentes categorias de produtos

**Tarefas:**
1. Carregar e explorar os dados
2. Identificar padrões de vendas
3. Calcular métricas de performance
4. Criar visualizações informativas
5. Gerar relatório executivo

**Código de partida:**
```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Carregue o dataset
df = pd.read_csv('vendas_ecommerce.csv')

# Implemente sua análise aqui
```''',
                    
                    'intermediario': '''**Exercício 2: Previsão de Demanda com Machine Learning**
Desenvolva um modelo preditivo que:
- Use dados históricos de vendas
- Implemente diferentes algoritmos
- Compare performance dos modelos
- Valide com dados de teste
- Gere previsões para próximos 3 meses

**Algoritmos obrigatórios:**
- Regressão Linear
- Random Forest
- XGBoost
- Neural Network (básico)

**Métricas de avaliação:**
- RMSE (Root Mean Square Error)
- MAE (Mean Absolute Error)
- R² Score
- Cross-validation''',
                    
                    'avancado': '''**Exercício 3: Sistema de Recomendação Inteligente**
Crie um sistema que:
- Analise comportamento de usuários
- Implemente collaborative filtering
- Use content-based filtering
- Combine múltiplas abordagens
- Avalie qualidade das recomendações

**Tecnologias:**
- Pandas para manipulação
- Scikit-learn para ML
- Surprise para sistemas de recomendação
- Plotly para visualizações interativas
- Streamlit para interface web'''
                },
                
                'projetos': {
                    'analise_financeira': '''**Projeto: Análise Financeira Completa**

**Objetivo:** Analisar dados financeiros e criar dashboard interativo

**Datasets:**
- Preços de ações (Yahoo Finance)
- Indicadores econômicos (Banco Central)
- Dados de inflação e PIB
- Notícias financeiras (web scraping)

**Análises:**
1. **Análise técnica** com indicadores
2. **Análise fundamentalista** com métricas
3. **Correlações** entre ativos
4. **Previsões** usando ML
5. **Dashboard** interativo

**Tecnologias:**
- Pandas, NumPy
- Matplotlib, Plotly
- Scikit-learn
- Streamlit
- yfinance, requests

**Entregáveis:**
- Código no GitHub
- Dashboard online
- Relatório executivo
- Apresentação dos resultados''',
                    
                    'predicao_vendas': '''**Projeto: Sistema de Previsão de Vendas**

**Objetivo:** Desenvolver sistema completo de previsão para empresa

**Funcionalidades:**
1. **Coleta de dados** automatizada
2. **Limpeza e preparação** dos dados
3. **Análise exploratória** detalhada
4. **Modelagem** com múltiplos algoritmos
5. **Validação** e otimização
6. **Deploy** em produção
7. **Monitoramento** contínuo

**Tecnologias:**
- Python completo
- Pandas, NumPy
- Scikit-learn, XGBoost
- FastAPI para API
- Docker para containerização
- MLflow para experimentos

**Entregáveis:**
- Sistema funcional
- API documentada
- Modelo em produção
- Relatório técnico'''
                }
            }
        }

    def detectar_conteudo_generico(self, arquivo_path: Path) -> List[str]:
        """Detecta padrões de conteúdo genérico em um arquivo"""
        try:
            with open(arquivo_path, 'r', encoding='utf-8') as f:
                conteudo = f.read()
            
            problemas_encontrados = []
            
            for padrao, descricao in self.padroes_genericos.items():
                if re.search(padrao, conteudo, re.IGNORECASE | re.DOTALL):
                    problemas_encontrados.append(descricao)
            
            return problemas_encontrados
            
        except Exception as e:
            print(f"Erro ao analisar {arquivo_path}: {e}")
            return []

    def melhorar_arquivo(self, arquivo_path: Path, tipo_curso: str) -> bool:
        """Melhora um arquivo específico com conteúdo mais específico"""
        try:
            with open(arquivo_path, 'r', encoding='utf-8') as f:
                conteudo_original = f.read()
            
            conteudo_melhorado = conteudo_original
            
            # Detectar tipo de curso
            if tipo_curso in self.conteudo_especifico:
                curso_info = self.conteudo_especifico[tipo_curso]
                
                # Melhorar introdução genérica
                padrao_introducao = r'### 1\. Introdução\s*\n.*?é uma tecnologia essencial para.*?\.'
                if re.search(padrao_introducao, conteudo_melhorado, re.DOTALL):
                    nova_introducao = f"### 1. Introdução\n\n{curso_info['introducao']}"
                    conteudo_melhorado = re.sub(padrao_introducao, nova_introducao, conteudo_melhorado, flags=re.DOTALL)
                
                # Melhorar exercícios genéricos
                padrao_exercicios = r'### 4\. Exercícios Práticos\s*\n.*?#### Exercício 1: Implementação Básica\s*\n.*?#### Exercício 2: Aplicação Prática\s*\n.*?#### Exercício 3: Projeto Completo'
                if re.search(padrao_exercicios, conteudo_melhorado, re.DOTALL):
                    novos_exercicios = f"""### 4. Exercícios Práticos

{curso_info['exercicios']['basico']}

{curso_info['exercicios']['intermediario']}

{curso_info['exercicios']['avancado']}"""
                    conteudo_melhorado = re.sub(padrao_exercicios, novos_exercicios, conteudo_melhorado, flags=re.DOTALL)
                
                # Melhorar projeto final genérico
                padrao_projeto = r'### 5\. Projeto Final\s*\n.*?#### Objetivo\s*\n.*?#### Requisitos'
                if re.search(padrao_projeto, conteudo_melhorado, re.DOTALL):
                    novo_projeto = f"""### 5. Projeto Final

{curso_info['projetos']['portfolio']}

{curso_info['projetos']['ecommerce']}"""
                    conteudo_melhorado = re.sub(padrao_projeto, novo_projeto, conteudo_melhorado, flags=re.DOTALL)
            
            # Salvar arquivo melhorado
            if conteudo_melhorado != conteudo_original:
                # Fazer backup
                backup_path = arquivo_path.with_suffix('.md.backup2')
                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.write(conteudo_original)
                
                # Salvar versão melhorada
                with open(arquivo_path, 'w', encoding='utf-8') as f:
                    f.write(conteudo_melhorado)
                
                return True
            
            return False
            
        except Exception as e:
            print(f"Erro ao melhorar {arquivo_path}: {e}")
            self.erros_encontrados += 1
            return False

    def executar_melhorias(self):
        """Executa as melhorias de conteúdo"""
        print("🚀 INICIANDO MELHORIAS DE CONTEÚDO - PARTE 2")
        print("=" * 60)
        print("🎯 Foco: Melhorar conteúdo genérico e adicionar especificidade técnica")
        print()
        
        # Cursos para melhorar
        cursos = ['react-advanced', 'web-fundamentals', 'python-data-science', 'aws-cloud', 'devops-docker', 'csharp-automation']
        
        total_arquivos = 0
        arquivos_melhorados = 0
        
        for curso in cursos:
            curso_path = self.base_path / curso
            if not curso_path.exists():
                continue
            
            print(f"📚 Processando curso: {curso}")
            print("-" * 40)
            
            # Encontrar arquivos do curso
            arquivos_curso = list(curso_path.rglob("*.md"))
            arquivos_curso = [f for f in arquivos_curso if not f.name.endswith('.backup')]
            
            for arquivo in arquivos_curso[:10]:  # Limitar para primeiros 10 arquivos por curso
                total_arquivos += 1
                
                # Detectar problemas
                problemas = self.detectar_conteudo_generico(arquivo)
                
                if problemas:
                    print(f"🔧 Melhorando: {arquivo.name}")
                    print(f"   📋 Problemas: {', '.join(problemas[:2])}")
                    
                    if self.melhorar_arquivo(arquivo, curso):
                        print("   ✅ Melhorado com sucesso!")
                        arquivos_melhorados += 1
                    else:
                        print("   ⚠️  Nenhuma melhoria necessária")
                else:
                    print(f"✅ {arquivo.name} - Já está bom!")
                
                print()
        
        # Relatório final
        print("=" * 60)
        print("📊 RELATÓRIO DE MELHORIAS - PARTE 2")
        print("=" * 60)
        print(f"✅ Arquivos melhorados: {arquivos_melhorados}")
        print(f"❌ Erros encontrados: {self.erros_encontrados}")
        print(f"📁 Total processado: {total_arquivos}")
        print()
        
        if arquivos_melhorados > 0:
            print("🎉 MELHORIAS CONCLUÍDAS COM SUCESSO!")
            print("💡 Próximos passos:")
            print("   1. Revisar conteúdo melhorado")
            print("   2. Testar exercícios práticos")
            print("   3. Executar Parte 3: Padronizar qualidade")
        else:
            print("ℹ️  Nenhuma melhoria foi necessária.")
            print("💡 Todo o conteúdo já está específico e técnico!")

def main():
    """Função principal"""
    melhorador = MelhoradorConteudo()
    melhorador.executar_melhorias()

if __name__ == "__main__":
    main()
