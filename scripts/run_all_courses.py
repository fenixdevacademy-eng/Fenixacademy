#!/usr/bin/env python3
"""
Script simples para executar o gerador de aulas para todos os cursos da Fenix
"""

import sys
import os

# Adicionar o diretório scripts ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importar e executar o gerador
from generate_all_courses import main

if __name__ == "__main__":
    print("🚀 Executando gerador de aulas para TODOS os cursos da Fenix...")
    main()












