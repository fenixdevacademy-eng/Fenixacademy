#!/usr/bin/env python3
"""
Script simples para executar o gerador de aulas
"""

import sys
import os

# Adicionar o diretório scripts ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importar e executar o gerador
from generate_lessons import main

if __name__ == "__main__":
    print("🚀 Executando gerador de aulas...")
    main()












