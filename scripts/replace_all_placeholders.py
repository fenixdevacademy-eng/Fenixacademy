#!/usr/bin/env python3
import os
import re
from pathlib import Path
from datetime import datetime

def replace_all_placeholders():
    base_path = Path('course_content_restructured')
    total_replacements = 0
    files_processed = 0
    
    # Mapeamento de substituições
    replacements = {
        '[Conceito]': 'HTML',
        '[definição clara e acessível]': 'linguagem de marcação que estrutura o conteúdo das páginas web',
        '[Empresa brasileira]': 'Nubank',
        '[Descrição do caso real com números concretos]': '2024: Plataforma bancária que revolucionou o UX/UI no Brasil',
        '[Desafio simples que pode ser resolvido em 2-3 minutos]': 'Criar uma página de portfolio pessoal com HTML5 semântico',
        '[analogia simples]': 'como construir uma casa - você precisa de fundação, paredes e telhado',
        '[componente 1]': 'fundação sólida',
        '[componente 2]': 'estrutura bem planejada',
        '[componente 3]': 'acabamento profissional',
        '[pergunta provocativa]': 'Como você resolveria este problema no seu projeto?',
        '[contexto real]': 'desenvolvimento de aplicações web',
        '[profissional]': 'desenvolvedor web',
        '[TÓPICO PRINCIPAL]': 'Desenvolvimento Web',
        '[Subtítulo com analogia]': 'Construindo a Base da Web',
        '[Diagrama ou código exemplo]': '```html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Minha Página</title>\n</head>\n<body>\n    <h1>Olá Mundo!</h1>\n</body>\n</html>```',
        '[Explicação simples usando analogia do mundo real]': 'Assim como uma casa precisa de uma base sólida, uma página web precisa de HTML bem estruturado',
        '[Passo 1]': 'Planejar a estrutura da página',
        '[Passo 2]': 'Criar o HTML semântico',
        '[Passo 3]': 'Adicionar estilos com CSS',
        '[Passo 4]': 'Implementar interatividade com JavaScript',
        '[Passo 5]': 'Testar e otimizar',
        '[Pergunta para reflexão que conecta conceito com aplicação prática]': 'Como você pode aplicar esses conceitos no seu próximo projeto?',
        '[Nome da tecnologia]': 'HTML5',
        '[Analogia clara]': 'Linguagem de marcação',
        '[Definição simples e direta]': 'HTML é a linguagem padrão para criar páginas web',
        '[Comparação com algo do mundo real]': 'É como o esqueleto de uma página web',
        '[linguagem]': 'html',
        '[exemplo de código comentado]': '<!-- Cabeçalho da página -->\n<h1>Título Principal</h1>\n<!-- Parágrafo de conteúdo -->\n<p>Este é um parágrafo de exemplo.</p>',
        '[Dica clara e específica]': 'Use tags semânticas como <header>, <nav>, <main> e <footer>',
        '[Tecnologia 1]': 'HTML5 Semântico',
        '[Tecnologia 2]': 'CSS Grid e Flexbox',
        '[Tecnologia 3]': 'JavaScript ES6+',
        '[Tecnologia 4]': 'Web APIs modernas',
        '[Aplicação prática]': 'Criação de layouts responsivos',
        '[Conceito principal]': 'Estrutura semântica HTML',
        '[Resultado esperado]': 'Páginas web bem estruturadas e acessíveis',
        '[Habilidade específica]': 'Desenvolver HTML semântico e acessível',
        '[Projeto prático]': 'Portfolio pessoal responsivo',
        '[Base para próximos módulos]': 'Fundamentos sólidos de HTML'
    }
    
    print(f'🎯 Iniciando substituição de {len(replacements)} tipos de placeholders...')
    
    for course_path in base_path.iterdir():
        if course_path.is_dir() and not course_path.name.startswith('.'):
            course_name = course_path.name
            print(f'🔄 Processando curso: {course_name}')
            
            for file_path in course_path.rglob('*.md'):
                if file_path.is_file():
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        original_content = content
                        file_replacements = 0
                        
                        for placeholder, replacement in replacements.items():
                            if placeholder in content:
                                count = content.count(placeholder)
                                content = content.replace(placeholder, replacement)
                                file_replacements += count
                        
                        if content != original_content:
                            with open(file_path, 'w', encoding='utf-8') as f:
                                f.write(content)
                            total_replacements += file_replacements
                            files_processed += 1
                            print(f'  ✅ {file_path.name}: {file_replacements} substituições')
                        
                    except Exception as e:
                        print(f'  ❌ Erro em {file_path.name}: {e}')
    
    print(f'\n🎉 CONCLUÍDO!')
    print(f'📊 Arquivos processados: {files_processed}')
    print(f'📊 Total de substituições: {total_replacements}')
    
    return total_replacements

if __name__ == '__main__':
    start_time = datetime.now()
    total = replace_all_placeholders()
    end_time = datetime.now()
    print(f'⏱️ Tempo total: {end_time - start_time}')






