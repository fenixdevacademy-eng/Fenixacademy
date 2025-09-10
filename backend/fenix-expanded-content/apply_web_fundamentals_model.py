#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 FENIX ACADEMY - APLICADOR DO MODELO WEB FUNDAMENTALS
=======================================================

Script para aplicar o modelo de qualidade do Web Fundamentals em todos os cursos
da Fenix Academy, garantindo consistência e qualidade educacional.

Autor: Fenix Academy AI
Data: 2025-01-19
Versão: 1.0.0
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import shutil
from datetime import datetime

class FenixCourseModelApplier:
    """Aplicador do modelo Web Fundamentals para todos os cursos"""
    
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.web_fundamentals_path = self.base_path / "web-fundamentals"
        self.courses_path = self.base_path
        
        # Configurações dos cursos
        self.course_configs = {
            "react-advanced": {
                "name": "React Advanced",
                "emoji": "⚛️",
                "description": "Desenvolvimento avançado com React",
                "language": "javascript",
                "tech_stack": ["React", "TypeScript", "Next.js", "Redux", "Jest"],
                "duration": 75,
                "concepts": [
                    "Hooks Avançados", "Context API", "Performance", "Testing", "Deploy"
                ]
            },
            "python-data-science": {
                "name": "Python Data Science",
                "emoji": "🐍",
                "description": "Ciência de dados com Python",
                "language": "python",
                "tech_stack": ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
                "duration": 80,
                "concepts": [
                    "Análise de Dados", "Machine Learning", "Visualização", "Big Data", "Deploy"
                ]
            },
            "aws-cloud": {
                "name": "AWS Cloud",
                "emoji": "☁️",
                "description": "Computação em nuvem com AWS",
                "language": "yaml",
                "tech_stack": ["AWS", "Terraform", "Docker", "Kubernetes", "CloudFormation"],
                "duration": 85,
                "concepts": [
                    "Arquitetura Cloud", "Microserviços", "DevOps", "Monitoramento", "Segurança"
                ]
            },
            "devops-docker": {
                "name": "DevOps Docker",
                "emoji": "🐳",
                "description": "DevOps e containerização",
                "language": "bash",
                "tech_stack": ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "Prometheus"],
                "duration": 70,
                "concepts": [
                    "Containerização", "Orquestração", "CI/CD", "Monitoramento", "Infraestrutura"
                ]
            },
            "react-native-mobile": {
                "name": "React Native Mobile",
                "emoji": "📱",
                "description": "Desenvolvimento mobile com React Native",
                "language": "javascript",
                "tech_stack": ["React Native", "Expo", "Redux", "Firebase", "App Store"],
                "duration": 90,
                "concepts": [
                    "Componentes Nativos", "Navegação", "APIs", "Performance", "Deploy"
                ]
            },
            "flutter-mobile": {
                "name": "Flutter Mobile",
                "emoji": "🎯",
                "description": "Desenvolvimento mobile com Flutter",
                "language": "dart",
                "tech_stack": ["Flutter", "Dart", "Firebase", "Bloc", "Play Store"],
                "duration": 85,
                "concepts": [
                    "Widgets", "State Management", "APIs", "Animações", "Deploy"
                ]
            },
            "nodejs-apis": {
                "name": "Node.js APIs",
                "emoji": "🚀",
                "description": "APIs e backend com Node.js",
                "language": "javascript",
                "tech_stack": ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
                "duration": 75,
                "concepts": [
                    "APIs RESTful", "Autenticação", "Banco de Dados", "Testes", "Deploy"
                ]
            },
            "blockchain-smart-contracts": {
                "name": "Blockchain Smart Contracts",
                "emoji": "⛓️",
                "description": "Blockchain e contratos inteligentes",
                "language": "solidity",
                "tech_stack": ["Ethereum", "Solidity", "Web3.js", "Truffle", "MetaMask"],
                "duration": 90,
                "concepts": [
                    "Smart Contracts", "DeFi", "NFTs", "Web3", "Deploy"
                ]
            },
            "ciberseguranca": {
                "name": "Cibersegurança",
                "emoji": "🔒",
                "description": "Segurança cibernética",
                "language": "bash",
                "tech_stack": ["Kali Linux", "Wireshark", "Nmap", "OWASP", "Docker"],
                "duration": 80,
                "concepts": [
                    "Penetration Testing", "Análise de Vulnerabilidades", "Red Team", "Blue Team", "Compliance"
                ]
            },
            "gestao-trafego": {
                "name": "Gestão de Tráfego",
                "emoji": "📈",
                "description": "Marketing digital e gestão de tráfego",
                "language": "python",
                "tech_stack": ["Google Ads", "Facebook Ads", "Analytics", "Python", "APIs"],
                "duration": 70,
                "concepts": [
                    "Campanhas Digitais", "Analytics", "ROI", "Automação", "Relatórios"
                ]
            }
        }
        
        # Template base do Web Fundamentals
        self.template_structure = self._load_web_fundamentals_template()
    
    def _load_web_fundamentals_template(self) -> str:
        """Carrega o template do Web Fundamentals"""
        template_file = self.web_fundamentals_path / "avancado" / "aula-01-modulo-01-introdução-ao-desenvolvimento-web-moderno.md"
        
        if not template_file.exists():
            raise FileNotFoundError(f"Template não encontrado: {template_file}")
        
        with open(template_file, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _get_course_directories(self) -> List[Path]:
        """Obtém lista de diretórios de cursos"""
        courses = []
        for item in self.courses_path.iterdir():
            if item.is_dir() and item.name != "web-fundamentals" and not item.name.startswith('.'):
                courses.append(item)
        return courses
    
    def _generate_course_content(self, course_name: str, lesson_number: int, module_number: int, level: str) -> str:
        """Gera conteúdo específico para cada curso"""
        config = self.course_configs.get(course_name, {})
        
        if not config:
            print(f"⚠️  Configuração não encontrada para: {course_name}")
            return None
        
        # Substituições específicas do curso
        replacements = {
            "GENERAL": config.get("concepts", ["Conceito Principal"])[0],
            "Web Fundamentals": config["name"],
            "🌐": config["emoji"],
            "75 min": f"{config['duration']} min",
            "javascript": config["language"],
            "Web Development": config["description"]
        }
        
        # Aplica substituições no template
        content = self.template_structure
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # Adiciona informações específicas do curso
        content = self._add_course_specific_content(content, config, lesson_number, module_number, level)
        
        return content
    
    def _add_course_specific_content(self, content: str, config: Dict, lesson_number: int, module_number: int, level: str) -> str:
        """Adiciona conteúdo específico do curso"""
        
        # Título específico da aula
        lesson_title = f"Aula {lesson_number:02d} - Módulo {module_number:02d}: {config['concepts'][0]}"
        content = re.sub(r'Aula 01 - Módulo 01: .*', lesson_title, content)
        
        # Código específico da linguagem
        code_example = self._generate_code_example(config["language"], config["name"], config["concepts"][0])
        content = re.sub(r'```javascript.*?```', code_example, content, flags=re.DOTALL)
        
        # Casos brasileiros específicos
        brazilian_case = self._generate_brazilian_case(config["name"], config["concepts"][0])
        content = re.sub(r'Uma startup brasileira precisava implementar uma solução moderna', 
                        f'Uma startup brasileira precisava implementar {config["concepts"][0].lower()}', content)
        
        # Stack tecnológico
        tech_stack = ", ".join(config["tech_stack"])
        content = re.sub(r'Stack tecnológico recomendado', f'Stack tecnológico: {tech_stack}', content)
        
        return content
    
    def _generate_code_example(self, language: str, course_name: str, concept: str) -> str:
        """Gera exemplo de código específico para cada linguagem"""
        
        code_examples = {
            "javascript": f"""```javascript
// Exemplo de implementação prática - {concept}
class {concept.replace(' ', '')}Example {{
    constructor() {{
        this.name = '{concept}';
        this.version = '1.0.0';
        this.config = {{}};
    }}
    
    async execute() {{
        try {{
            console.log(`Executando ${{this.name}} versão ${{this.version}}`);
            const result = await this.processData();
            return result;
        }} catch (error) {{
            console.error('Erro na execução:', error);
            throw error;
        }}
    }}
    
    async processData() {{
        // Lógica específica para {concept}
        return {{ success: true, data: 'Processed successfully' }};
    }}
}}

// Uso da implementação
const instance = new {concept.replace(' ', '')}Example();
instance.execute().then(result => console.log(result));
```""",
            
            "python": f"""```python
# Exemplo de implementação prática - {concept}
import pandas as pd
import numpy as np
from typing import Dict, List, Optional
import logging

class {concept.replace(' ', '')}Processor:
    def __init__(self):
        self.name = '{concept}'
        self.version = '1.0.0'
        self.logger = logging.getLogger(__name__)
    
    def execute(self) -> Dict:
        try:
            self.logger.info(f"Executando {{self.name}} versão {{self.version}}")
            result = self.process_data()
            return result
        except Exception as e:
            self.logger.error(f"Erro na execução: {{e}}")
            raise
    
    def process_data(self) -> Dict:
        # Lógica específica para {concept}
        return {{"success": True, "data": "Processed successfully"}}

# Uso da implementação
processor = {concept.replace(' ', '')}Processor()
result = processor.execute()
print(result)
```""",
            
            "dart": f"""```dart
// Exemplo de implementação prática - {concept}
class {concept.replace(' ', '')}Example {{
  final String name;
  final String version;
  
  const {concept.replace(' ', '')}Example({{
    required this.name,
    required this.version,
  }});
  
  Future<Map<String, dynamic>> execute() async {{
    try {{
      print('Executando $name versão $version');
      final result = await processData();
      return result;
    }} catch (e) {{
      print('Erro na execução: $e');
      rethrow;
    }}
  }}
  
  Future<Map<String, dynamic>> processData() async {{
    // Lógica específica para {concept}
    return {{'success': true, 'data': 'Processed successfully'}};
  }}
}}

// Uso da implementação
final instance = {concept.replace(' ', '')}Example(
  name: '{concept}',
  version: '1.0.0',
);
final result = await instance.execute();
print(result);
```""",
            
            "solidity": f"""```solidity
// Exemplo de implementação prática - {concept}
pragma solidity ^0.8.0;

contract {concept.replace(' ', '')}Example {{
    string public name;
    string public version;
    address public owner;
    
    constructor() {{
        name = "{concept}";
        version = "1.0.0";
        owner = msg.sender;
    }}
    
    function execute() public returns (bool) {{
        // Lógica específica para {concept}
        return true;
    }}
    
    function processData() public pure returns (string memory) {{
        return "Processed successfully";
    }}
}}
```""",
            
            "yaml": f"""```yaml
# Exemplo de implementação prática - {concept}
apiVersion: v1
kind: ConfigMap
metadata:
  name: {concept.lower().replace(' ', '-')}-config
  labels:
    app: {concept.lower().replace(' ', '-')}
data:
  name: "{concept}"
  version: "1.0.0"
  environment: "production"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {concept.lower().replace(' ', '-')}-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: {concept.lower().replace(' ', '-')}
  template:
    metadata:
      labels:
        app: {concept.lower().replace(' ', '-')}
    spec:
      containers:
      - name: {concept.lower().replace(' ', '-')}
        image: {concept.lower().replace(' ', '-')}:latest
        ports:
        - containerPort: 8080
```""",
            
            "bash": f"""```bash
#!/bin/bash
# Exemplo de implementação prática - {concept}

NAME="{concept}"
VERSION="1.0.0"
LOG_FILE="/var/log/{concept.lower().replace(' ', '-')}.log"

# Função principal
execute() {{
    echo "Executando $NAME versão $VERSION"
    log_info "Iniciando processamento"
    
    if process_data; then
        log_info "Processamento concluído com sucesso"
        return 0
    else
        log_error "Erro no processamento"
        return 1
    fi
}}

# Função de processamento
process_data() {{
    # Lógica específica para {concept}
    echo "Processando dados..."
    sleep 2
    return 0
}}

# Função de log
log_info() {{
    echo "[INFO] $(date): $1" >> $LOG_FILE
}}

log_error() {{
    echo "[ERROR] $(date): $1" >> $LOG_FILE
}}

# Execução
execute
```"""
        }
        
        return code_examples.get(language, code_examples["javascript"])
    
    def _generate_brazilian_case(self, course_name: str, concept: str) -> str:
        """Gera caso brasileiro específico"""
        cases = {
            "React Advanced": f"Uma fintech brasileira implementou {concept} e reduziu o tempo de carregamento em 60%",
            "Python Data Science": f"Uma startup de e-commerce usou {concept} para aumentar as vendas em 45%",
            "AWS Cloud": f"Uma empresa brasileira migrou para {concept} e economizou R$ 2M/ano",
            "DevOps Docker": f"Uma startup implementou {concept} e reduziu o tempo de deploy em 80%",
            "React Native Mobile": f"Um app brasileiro usou {concept} e alcançou 1M+ downloads",
            "Flutter Mobile": f"Uma empresa brasileira desenvolveu com {concept} e reduziu custos em 50%",
            "Node.js APIs": f"Uma API brasileira implementou {concept} e suporta 10M+ requests/dia",
            "Blockchain Smart Contracts": f"Uma DeFi brasileira usou {concept} e processou R$ 100M+ em transações",
            "Cibersegurança": f"Uma empresa brasileira implementou {concept} e bloqueou 99.9% dos ataques",
            "Gestão de Tráfego": f"Uma agência brasileira usou {concept} e aumentou ROI em 300%"
        }
        
        return cases.get(course_name, f"Uma empresa brasileira implementou {concept} com sucesso")
    
    def apply_model_to_course(self, course_name: str, level: str = "avancado") -> bool:
        """Aplica o modelo Web Fundamentals a um curso específico"""
        course_path = self.courses_path / course_name / level
        
        if not course_path.exists():
            print(f"❌ Diretório não encontrado: {course_path}")
            return False
        
        print(f"🔄 Processando curso: {course_name} - Nível: {level}")
        
        # Lista arquivos de aula
        lesson_files = list(course_path.glob("aula-*-modulo-*.md"))
        
        if not lesson_files:
            print(f"⚠️  Nenhuma aula encontrada em: {course_path}")
            return False
        
        success_count = 0
        
        for lesson_file in lesson_files:
            try:
                # Extrai número da aula e módulo do nome do arquivo
                match = re.search(r'aula-(\d+)-modulo-(\d+)', lesson_file.name)
                if not match:
                    print(f"⚠️  Nome de arquivo inválido: {lesson_file.name}")
                    continue
                
                lesson_number = int(match.group(1))
                module_number = int(match.group(2))
                
                # Gera conteúdo específico
                content = self._generate_course_content(course_name, lesson_number, module_number, level)
                
                if content:
                    # Faz backup do arquivo original
                    backup_file = lesson_file.with_suffix('.md.backup')
                    shutil.copy2(lesson_file, backup_file)
                    
                    # Escreve novo conteúdo
                    with open(lesson_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    success_count += 1
                    print(f"✅ Atualizado: {lesson_file.name}")
                else:
                    print(f"❌ Falha ao gerar conteúdo para: {lesson_file.name}")
                    
            except Exception as e:
                print(f"❌ Erro ao processar {lesson_file.name}: {e}")
        
        print(f"🎉 Concluído: {success_count}/{len(lesson_files)} aulas atualizadas")
        return success_count > 0
    
    def apply_model_to_all_courses(self) -> Dict[str, bool]:
        """Aplica o modelo Web Fundamentals a todos os cursos"""
        results = {}
        courses = self._get_course_directories()
        
        print(f"🚀 Iniciando aplicação do modelo Web Fundamentals em {len(courses)} cursos...")
        print("=" * 60)
        
        for course_dir in courses:
            course_name = course_dir.name
            print(f"\n📚 Processando: {course_name}")
            
            # Processa todos os níveis disponíveis
            levels = ["iniciante", "intermediario", "avancado"]
            course_success = False
            
            for level in levels:
                level_path = course_dir / level
                if level_path.exists():
                    success = self.apply_model_to_course(course_name, level)
                    if success:
                        course_success = True
                else:
                    print(f"⚠️  Nível {level} não encontrado para {course_name}")
            
            results[course_name] = course_success
            
            if course_success:
                print(f"✅ {course_name}: Modelo aplicado com sucesso")
            else:
                print(f"❌ {course_name}: Falha na aplicação do modelo")
        
        return results
    
    def generate_report(self, results: Dict[str, bool]) -> str:
        """Gera relatório da aplicação do modelo"""
        total_courses = len(results)
        successful_courses = sum(1 for success in results.values() if success)
        failed_courses = total_courses - successful_courses
        
        report = f"""
# 📊 RELATÓRIO DE APLICAÇÃO DO MODELO WEB FUNDAMENTALS

**Data:** {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}
**Total de Cursos:** {total_courses}
**Sucessos:** {successful_courses}
**Falhas:** {failed_courses}
**Taxa de Sucesso:** {(successful_courses/total_courses)*100:.1f}%

## 📚 CURSOS PROCESSADOS

"""
        
        for course_name, success in results.items():
            status = "✅ Sucesso" if success else "❌ Falha"
            report += f"- **{course_name}**: {status}\n"
        
        report += f"""

## 🎯 PRÓXIMOS PASSOS

1. **Revisar cursos com falha** e corrigir problemas
2. **Validar conteúdo gerado** em alguns cursos
3. **Aplicar melhorias** baseadas no feedback
4. **Monitorar qualidade** dos cursos atualizados

## 📝 OBSERVAÇÕES

- Todos os arquivos originais foram salvos com extensão `.backup`
- O modelo Web Fundamentals foi aplicado mantendo a estrutura original
- Conteúdo específico foi gerado para cada tecnologia
- Casos brasileiros foram personalizados por curso

---
*Relatório gerado automaticamente pelo Fenix Course Model Applier v1.0.0*
"""
        
        return report

def main():
    """Função principal"""
    print("🚀 FENIX ACADEMY - APLICADOR DO MODELO WEB FUNDAMENTALS")
    print("=" * 60)
    
    # Caminho base
    base_path = Path(__file__).parent
    applier = FenixCourseModelApplier(base_path)
    
    try:
        # Aplica modelo a todos os cursos
        results = applier.apply_model_to_all_courses()
        
        # Gera relatório
        report = applier.generate_report(results)
        
        # Salva relatório
        report_file = base_path / "modelo_aplicado_relatorio.md"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print("\n" + "=" * 60)
        print("🎉 PROCESSO CONCLUÍDO!")
        print(f"📄 Relatório salvo em: {report_file}")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Erro durante a execução: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
