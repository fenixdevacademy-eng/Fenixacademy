#!/usr/bin/env python3
"""
Script de teste para verificar detecção de conteúdo incorreto
"""

from pathlib import Path

def has_incorrect_content(file_path: Path) -> bool:
    """Verifica se o arquivo tem conteúdo incorreto"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar se tem conteúdo misturado ou incorreto
        incorrect_patterns = [
            "Padrão Web Fundamentals Aplicado",
            "Objetivos de Aprendizado CS50",
            "CASOS BRASILEIROS APLICADOS",
            "MÓDULO ESPECÍFICO: React",
            "PROJETO PRÁTICO: Rede Social",
            "Hook Visual e Contexto",
            "Agenda da Aula",
            "PAUSE E REFLITA",
            "EXERCÍCIO RÁPIDO"
        ]
        
        # Verificar se tem pelo menos 2 padrões incorretos
        matches = sum(1 for pattern in incorrect_patterns if pattern in content)
        print(f"Arquivo: {file_path.name}")
        print(f"Padrões encontrados: {matches}")
        print(f"Deve ser limpo: {matches >= 2}")
        print("-" * 50)
        return matches >= 2
        
    except Exception as e:
        print(f"Erro ao ler {file_path.name}: {e}")
        return False

# Testar o arquivo específico
test_file = Path("devops-docker/avancado/modulo-09-avancado-devops-docker.md")
if test_file.exists():
    result = has_incorrect_content(test_file)
    print(f"RESULTADO FINAL: {result}")
else:
    print("Arquivo não encontrado!")











