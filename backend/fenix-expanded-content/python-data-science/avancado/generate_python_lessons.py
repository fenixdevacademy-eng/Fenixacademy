#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para gerar todas as aulas individuais do curso Python Data Science
"""

import os

def create_lesson_file(lesson_id, module_id, title, content):
    """Cria um arquivo de aula individual"""
    filename = f"aula-{lesson_id:02d}-modulo-{module_id:02d}-python-data-science.md"
    filepath = os.path.join("avancado", filename)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(f"# {title}\n\n")
        f.write(f"## Aula {lesson_id} - Módulo {module_id}\n\n")
        f.write(content)
    
    print(f"✅ Criado: {filename}")
    return filename

def main():
    """Função principal para gerar todas as aulas"""
    
    # Criar diretório se não existir
    os.makedirs("avancado", exist_ok=True)
    
    # Mapeamento das aulas
    lessons = [
        # Módulo 1: Python para Dados (6 aulas)
        (1, 1, "Introdução aos Python", "Conteúdo da aula de introdução ao Python para Data Science..."),
        (2, 1, "História e Evolução Histórica", "Conteúdo sobre a história e evolução do Python..."),
        (3, 1, "Conceitos Teóricos Fundamentais", "Conceitos fundamentais do Python para análise de dados..."),
        (4, 1, "Ferramentas e Tecnologias Essenciais", "Ferramentas essenciais para Data Science com Python..."),
        (5, 1, "Primeiro Projeto Prático", "Primeiro projeto prático usando Python para análise de dados..."),
        (6, 1, "Ambiente de Desenvolvimento Profissional", "Configuração de ambiente profissional para Data Science..."),
        
        # Módulo 2: Pandas e Manipulação (6 aulas)
        (1, 2, "Introdução ao Pandas", "Introdução à biblioteca Pandas para manipulação de dados..."),
        (2, 2, "Manipulação de Dados", "Técnicas de manipulação de dados com Pandas..."),
        (3, 2, "Filtros e Seleção", "Filtros e seleção de dados com Pandas..."),
        (4, 2, "Agregações e GroupBy", "Agregações e operações GroupBy com Pandas..."),
        (5, 2, "Merge e Join", "Operações de merge e join com Pandas..."),
        (6, 2, "Projeto: Análise de Dataset", "Projeto prático de análise de dataset usando Pandas..."),
        
        # Módulo 3: NumPy e Computação (6 aulas)
        (1, 3, "Introdução ao NumPy", "Introdução à biblioteca NumPy para computação numérica..."),
        (2, 3, "Arrays e Operações", "Arrays NumPy e operações básicas..."),
        (3, 3, "Indexação Avançada", "Indexação avançada com NumPy..."),
        (4, 3, "Funções Matemáticas", "Funções matemáticas do NumPy..."),
        (5, 3, "Broadcasting", "Conceito de broadcasting no NumPy..."),
        (6, 3, "Projeto: Cálculos Numéricos", "Projeto de cálculos numéricos com NumPy..."),
        
        # Módulo 4: Visualização de Dados (6 aulas)
        (1, 4, "Matplotlib Básico", "Introdução ao Matplotlib para visualização..."),
        (2, 4, "Seaborn Avançado", "Visualizações avançadas com Seaborn..."),
        (3, 4, "Plotly Interativo", "Gráficos interativos com Plotly..."),
        (4, 4, "Tipos de Gráficos", "Diferentes tipos de gráficos para análise..."),
        (5, 4, "Customização Avançada", "Customização avançada de gráficos..."),
        (6, 4, "Projeto: Dashboard Visual", "Projeto de dashboard visual..."),
        
        # Módulo 5: Estatística Básica (6 aulas)
        (1, 5, "Conceitos Estatísticos", "Conceitos básicos de estatística..."),
        (2, 5, "Medidas de Tendência", "Medidas de tendência central..."),
        (3, 5, "Medidas de Dispersão", "Medidas de dispersão e variabilidade..."),
        (4, 5, "Distribuições", "Distribuições estatísticas..."),
        (5, 5, "Testes de Hipótese", "Testes de hipótese básicos..."),
        (6, 5, "Projeto: Análise Estatística", "Projeto de análise estatística..."),
        
        # Módulo 6: Machine Learning Básico (6 aulas)
        (1, 6, "Introdução ao ML", "Introdução ao Machine Learning..."),
        (2, 6, "Regressão Linear", "Regressão linear com Python..."),
        (3, 6, "Classificação", "Algoritmos de classificação..."),
        (4, 6, "Clustering", "Algoritmos de clustering..."),
        (5, 6, "Validação Cruzada", "Técnicas de validação cruzada..."),
        (6, 6, "Projeto: Modelo ML", "Projeto de modelo de Machine Learning..."),
        
        # Módulo 7: Limpeza de Dados (6 aulas)
        (1, 7, "Identificação de Problemas", "Identificação de problemas nos dados..."),
        (2, 7, "Tratamento de Valores Faltantes", "Tratamento de valores faltantes..."),
        (3, 7, "Detecção de Outliers", "Detecção e tratamento de outliers..."),
        (4, 7, "Normalização", "Técnicas de normalização..."),
        (5, 7, "Encoding de Variáveis", "Encoding de variáveis categóricas..."),
        (6, 7, "Projeto: Pipeline de Limpeza", "Projeto de pipeline de limpeza..."),
        
        # Módulo 8: Análise Exploratória (6 aulas)
        (1, 8, "EDA Básica", "Análise exploratória básica..."),
        (2, 8, "Análise Univariada", "Análise univariada dos dados..."),
        (3, 8, "Análise Bivariada", "Análise bivariada..."),
        (4, 8, "Correlações", "Análise de correlações..."),
        (5, 8, "Insights e Descobertas", "Descoberta de insights..."),
        (6, 8, "Projeto: Relatório EDA", "Projeto de relatório EDA..."),
        
        # Módulo 9: SQL para Data Science (6 aulas)
        (1, 9, "SQL Básico", "SQL básico para Data Science..."),
        (2, 9, "Consultas Avançadas", "Consultas SQL avançadas..."),
        (3, 9, "Joins e Subconsultas", "Joins e subconsultas..."),
        (4, 9, "Agregações", "Funções de agregação SQL..."),
        (5, 9, "Window Functions", "Window functions do SQL..."),
        (6, 9, "Projeto: Análise SQL", "Projeto de análise com SQL..."),
        
        # Módulo 10: Projeto Final (6 aulas)
        (1, 10, "Definição do Projeto", "Definição do projeto final..."),
        (2, 10, "Coleta de Dados", "Coleta e preparação de dados..."),
        (3, 10, "Análise e Modelagem", "Análise e modelagem dos dados..."),
        (4, 10, "Visualização", "Criação de visualizações..."),
        (5, 10, "Relatório Final", "Elaboração do relatório final..."),
        (6, 10, "Apresentação", "Preparação da apresentação...")
    ]
    
    print("🚀 Gerando 60 aulas individuais para Python Data Science...")
    
    for lesson_id, module_id, title, content in lessons:
        create_lesson_file(lesson_id, module_id, title, content)
    
    print(f"\n✅ Todas as {len(lessons)} aulas foram criadas com sucesso!")
    print("📁 Arquivos criados no diretório: avancado/")

if __name__ == "__main__":
    main()





