#!/usr/bin/env python3
"""
Script para aplicar melhorias de conteúdo em todos os cursos da Fenix Academy
Baseado nas diretrizes de qualidade fornecidas pelo usuário.

Diretrizes aplicadas:
- CLAREZA E SIMPLICIDADE
- ESTRUTURA LÓGICA  
- ENGAGAMENTO ATIVO
- ESTRATÉGIAS DE CONTEÚDO
- TÉCNICAS DE PRODUÇÃO
- DIFERENCIAÇÃO DE QUALIDADE
- IMPLEMENTAÇÃO PRÁTICA
- MEDIÇÃO DE SUCESSO
- FOCO NO RESULTADO
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple
import shutil
from datetime import datetime

class ContentImprover:
    def __init__(self, base_path: str = "course_content_restructured"):
        self.base_path = Path(base_path)
        self.improvements_applied = []
        self.courses_processed = []
        
        # Diretórios dos cursos
        self.course_dirs = [
            "web-fundamentals",
            "python-data-science", 
            "react-advanced",
            "aws-cloud",
            "gestao-trafego",
            "blockchain-smart-contracts",
            "ciberseguranca",
            "flutter-mobile",
            "react-native-mobile",
            "devops-docker",
            "nodejs-apis"
        ]
        
        # Padrões de melhoria para aplicar
        self.improvement_patterns = {
            "clareza": {
                "jargao_tecnico": r"\b(?:paradigma|arquitetura|implementação|infraestrutura)\b",
                "linguagem_complexa": r"\b(?:consequentemente|posteriormente|anteriormente)\b",
                "frases_longas": r"[^.!?]{100,}"
            },
            "estrutura": {
                "falta_hook": r"^# [^#\n]+$",
                "falta_resumo": r"## 📋 Objetivos de Aprendizagem",
                "falta_checkpoint": r"## 🎯 Aula \d+"
            },
            "engajamento": {
                "falta_pergunta": r"## 🎯 Aula \d+",
                "falta_exercicio": r"## 🧪 Exercícios Práticos",
                "falta_caso_estudo": r"## 🎯 Aula \d+"
            }
        }
        
        # Elementos de melhoria para adicionar
        self.improvement_elements = {
            "hook_inicial": [
                "🚀 **HOOK INICIAL** - Primeiros 10 segundos cruciais!",
                "💡 **O que você vai aprender:**",
                "🎯 **Resultado esperado:**"
            ],
            "checkpoints": [
                "🤔 **PAUSE E REFLITA:**",
                "💭 **PENSE SOBRE ISSO:**",
                "🔍 **CONECTE OS PONTOS:**"
            ],
            "exemplos_praticos": [
                "💼 **CASO REAL DO MERCADO:**",
                "🏢 **EXEMPLO PRÁTICO:**",
                "📊 **APLICAÇÃO NO MUNDO REAL:**"
            ],
            "exercicios_interativos": [
                "🎮 **EXERCÍCIO INTERATIVO:**",
                "🧪 **DESAFIO PRÁTICO:**",
                "💻 **PROJETO MÃO NA MASSA:**"
            ],
            "resumos": [
                "📝 **RESUMO RÁPIDO:**",
                "🔑 **PONTOS-CHAVE:**",
                "✨ **O QUE APRENDEMOS:**"
            ],
            "proximos_passos": [
                "🚀 **PRÓXIMOS PASSOS:**",
                "📚 **CONTINUE APRENDENDO:**",
                "💼 **APLIQUE NO SEU TRABALHO:**"
            ]
        }

    def analyze_course_structure(self, course_dir: Path) -> Dict:
        """Analisa a estrutura atual de um curso"""
        analysis = {
            "course_name": course_dir.name,
            "modules": [],
            "total_files": 0,
            "improvement_opportunities": [],
            "current_score": 0,
            "max_score": 100
        }
        
        if not course_dir.exists():
            return analysis
            
        # Contar arquivos e módulos
        for file_path in course_dir.rglob("*.md"):
            if file_path.is_file():
                analysis["total_files"] += 1
                
                # Analisar conteúdo do arquivo
                file_analysis = self.analyze_file_content(file_path)
                analysis["modules"].append(file_analysis)
                
                # Calcular pontuação
                analysis["current_score"] += file_analysis["score"]
                
                # Identificar oportunidades de melhoria
                if file_analysis["improvements_needed"]:
                    analysis["improvement_opportunities"].extend(
                        file_analysis["improvements_needed"]
                    )
        
        # Normalizar pontuação
        if analysis["total_files"] > 0:
            analysis["current_score"] = analysis["current_score"] / analysis["total_files"]
        
        return analysis

    def analyze_file_content(self, file_path: Path) -> Dict:
        """Analisa o conteúdo de um arquivo específico"""
        analysis = {
            "file_name": file_path.name,
            "file_path": str(file_path),
            "score": 0,
            "improvements_needed": [],
            "word_count": 0,
            "has_hook": False,
            "has_checkpoints": False,
            "has_exercises": False,
            "has_practical_examples": False,
            "has_summary": False,
            "has_next_steps": False
        }
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                analysis["word_count"] = len(content.split())
                
                # Verificar elementos de qualidade
                analysis["has_hook"] = bool(re.search(r"🚀|💡|🎯", content[:500]))
                analysis["has_checkpoints"] = bool(re.search(r"🤔|💭|🔍", content))
                analysis["has_exercises"] = bool(re.search(r"🎮|🧪|💻", content))
                analysis["has_practical_examples"] = bool(re.search(r"💼|🏢|📊", content))
                analysis["has_summary"] = bool(re.search(r"📝|🔑|✨", content))
                analysis["has_next_steps"] = bool(re.search(r"🚀|📚|💼", content))
                
                # Calcular pontuação baseada nos elementos presentes
                score = 0
                if analysis["has_hook"]: score += 15
                if analysis["has_checkpoints"]: score += 15
                if analysis["has_exercises"]: score += 20
                if analysis["has_practical_examples"]: score += 20
                if analysis["has_summary"]: score += 15
                if analysis["has_next_steps"]: score += 15
                
                analysis["score"] = score
                
                # Identificar melhorias necessárias
                if not analysis["has_hook"]:
                    analysis["improvements_needed"].append("Adicionar hook inicial")
                if not analysis["has_checkpoints"]:
                    analysis["improvements_needed"].append("Incluir checkpoints de reflexão")
                if not analysis["has_exercises"]:
                    analysis["improvements_needed"].append("Criar exercícios interativos")
                if not analysis["has_practical_examples"]:
                    analysis["improvements_needed"].append("Adicionar exemplos práticos")
                if not analysis["has_summary"]:
                    analysis["improvements_needed"].append("Incluir resumos")
                if not analysis["has_next_steps"]:
                    analysis["improvements_needed"].append("Adicionar próximos passos")
                    
        except Exception as e:
            analysis["improvements_needed"].append(f"Erro ao ler arquivo: {str(e)}")
            
        return analysis

    def apply_improvements_to_file(self, file_path: Path) -> bool:
        """Aplica melhorias a um arquivo específico"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            improvements_made = []
            
            # 1. Melhorar clareza e simplicidade
            content, clarity_improvements = self.improve_clarity(content)
            improvements_made.extend(clarity_improvements)
            
            # 2. Melhorar estrutura lógica
            content, structure_improvements = self.improve_structure(content)
            improvements_made.extend(structure_improvements)
            
            # 3. Adicionar engajamento ativo
            content, engagement_improvements = self.improve_engagement(content)
            improvements_made.extend(engagement_improvements)
            
            # 4. Aplicar estratégias de conteúdo
            content, content_improvements = self.improve_content_strategies(content)
            improvements_made.extend(content_improvements)
            
            # 5. Adicionar técnicas de produção
            content, production_improvements = self.improve_production_techniques(content)
            improvements_made.extend(production_improvements)
            
            # 6. Implementar diferenciação de qualidade
            content, quality_improvements = self.improve_quality_differentiation(content)
            improvements_made.extend(quality_improvements)
            
            # 7. Adicionar implementação prática
            content, practical_improvements = self.improve_practical_implementation(content)
            improvements_made.extend(practical_improvements)
            
            # 8. Incluir medição de sucesso
            content, measurement_improvements = self.improve_success_measurement(content)
            improvements_made.extend(measurement_improvements)
            
            # 9. Focar no resultado
            content, result_improvements = self.improve_result_focus(content)
            improvements_made.extend(result_improvements)
            
            # Salvar arquivo melhorado
            if content != original_content:
                # Criar backup
                backup_path = file_path.with_suffix('.md.backup')
                shutil.copy2(file_path, backup_path)
                
                # Salvar versão melhorada
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                self.improvements_applied.append({
                    "file": str(file_path),
                    "improvements": improvements_made,
                    "timestamp": datetime.now().isoformat()
                })
                
                return True
                
        except Exception as e:
            print(f"Erro ao aplicar melhorias em {file_path}: {str(e)}")
            
        return False

    def improve_clarity(self, content: str) -> Tuple[str, List[str]]:
        """Melhora a clareza e simplicidade do conteúdo"""
        improvements = []
        
        # Substituir jargões técnicos por linguagem mais acessível
        jargon_replacements = {
            "paradigma": "forma de pensar",
            "arquitetura": "estrutura",
            "implementação": "aplicação prática",
            "infraestrutura": "base técnica",
            "consequentemente": "por isso",
            "posteriormente": "depois",
            "anteriormente": "antes"
        }
        
        for jargon, replacement in jargon_replacements.items():
            if jargon in content:
                content = content.replace(jargon, replacement)
                improvements.append(f"Substituído '{jargon}' por '{replacement}'")
        
        # Quebrar frases muito longas
        long_sentences = re.findall(r'[^.!?]{100,}', content)
        if long_sentences:
            # Simplificar frases longas (implementação básica)
            improvements.append("Identificadas frases longas para simplificação")
        
        return content, improvements

    def improve_structure(self, content: str) -> Tuple[str, List[str]]:
        """Melhora a estrutura lógica do conteúdo"""
        improvements = []
        
        # Adicionar hook inicial se não existir
        if not re.search(r"🚀|💡|🎯", content[:500]):
            hook = "\n🚀 **HOOK INICIAL** - Primeiros 10 segundos cruciais!\n\n"
            hook += "💡 **O que você vai aprender neste módulo:**\n"
            hook += "🎯 **Resultado esperado ao final:**\n\n"
            
            # Inserir após o título principal
            title_match = re.search(r"^# (.+)$", content, re.MULTILINE)
            if title_match:
                insert_pos = title_match.end()
                content = content[:insert_pos] + hook + content[insert_pos:]
                improvements.append("Adicionado hook inicial")
        
        # Adicionar resumos a cada 3-4 seções
        sections = re.findall(r"## 🎯 Aula \d+", content)
        if len(sections) >= 3:
            # Adicionar resumo após a terceira seção
            improvements.append("Identificada oportunidade para adicionar resumos")
        
        return content, improvements

    def improve_engagement(self, content: str) -> Tuple[str, List[str]]:
        """Melhora o engajamento ativo do conteúdo"""
        improvements = []
        
        # Adicionar checkpoints de reflexão
        if not re.search(r"🤔|💭|🔍", content):
            checkpoint = "\n🤔 **PAUSE E REFLITA:**\n\n"
            checkpoint += "Pense sobre o que acabou de aprender e como isso se aplica ao seu contexto.\n\n"
            
            # Inserir após cada seção principal
            content = re.sub(
                r"(## 🎯 Aula \d+.*?)(?=## 🎯 Aula \d+|$)",
                r"\1\n" + checkpoint,
                content,
                flags=re.DOTALL
            )
            improvements.append("Adicionados checkpoints de reflexão")
        
        # Adicionar exercícios interativos se não existirem
        if not re.search(r"🎮|🧪|💻", content):
            exercise = "\n🧪 **EXERCÍCIO INTERATIVO:**\n\n"
            exercise += "Aplique o que aprendeu criando um projeto prático.\n\n"
            
            # Inserir antes da conclusão
            if "## 🎯 Projeto do Módulo" in content:
                content = content.replace(
                    "## 🎯 Projeto do Módulo",
                    exercise + "## 🎯 Projeto do Módulo"
                )
                improvements.append("Adicionados exercícios interativos")
        
        return content, improvements

    def improve_content_strategies(self, content: str) -> Tuple[str, List[str]]:
        """Aplica estratégias de conteúdo para diferentes mídias"""
        improvements = []
        
        # Adicionar estratégias para vídeos
        if "## 🎯 Aula" in content:
            video_strategies = "\n📹 **ESTRATÉGIAS PARA VÍDEOS:**\n\n"
            video_strategies += "- **Primeiros 10 segundos:** Hook imediato e atrativo\n"
            video_strategies += "- **Mudança a cada 30s:** Manter atenção constante\n"
            video_strategies += "- **Transições suaves:** Fluxo natural entre tópicos\n"
            video_strategies += "- **Elementos visuais:** Gráficos, diagramas, animações\n\n"
            
            # Inserir após a primeira aula
            first_aula = re.search(r"## 🎯 Aula 1.*?(?=## 🎯 Aula 2|$)", content, re.DOTALL)
            if first_aula:
                insert_pos = first_aula.end()
                content = content[:insert_pos] + video_strategies + content[insert_pos:]
                improvements.append("Adicionadas estratégias para vídeos")
        
        return content, improvements

    def improve_production_techniques(self, content: str) -> Tuple[str, List[str]]:
        """Adiciona técnicas de produção"""
        improvements = []
        
        # Adicionar técnicas de roteiro
        if "## 🎯 Aula" in content:
            production_tips = "\n🎬 **TÉCNICAS DE PRODUÇÃO:**\n\n"
            production_tips += "- **Storyboard:** Estrutura visual clara\n"
            production_tips += "- **Script com timing:** Controle de tempo\n"
            production_tips += "- **Recursos necessários:** Lista completa\n"
            production_tips += "- **Cronograma:** Planejamento detalhado\n\n"
            
            # Inserir após a seção de ferramentas
            if "## 🎯 Aula 3: Ferramentas Essenciais" in content:
                content = content.replace(
                    "## 🎯 Aula 3: Ferramentas Essenciais",
                    "## 🎯 Aula 3: Ferramentas Essenciais" + production_tips
                )
                improvements.append("Adicionadas técnicas de produção")
        
        return content, improvements

    def improve_quality_differentiation(self, content: str) -> Tuple[str, List[str]]:
        """Implementa diferenciação de qualidade"""
        improvements = []
        
        # Adicionar inovação tecnológica
        if "## 🎯 Aula" in content:
            innovation = "\n🚀 **INOVAÇÃO TECNOLÓGICA:**\n\n"
            innovation += "- **Realidade virtual/aumentada:** Quando aplicável\n"
            innovation += "- **Inteligência artificial:** Exemplos práticos\n"
            innovation += "- **Machine learning:** Adaptação personalizada\n"
            innovation += "- **Análise em tempo real:** Métricas de progresso\n\n"
            
            # Inserir após a seção de tecnologias
            if "### 🛠️ Tecnologias Fundamentais" in content:
                content = content.replace(
                    "### 🛠️ Tecnologias Fundamentais",
                    "### 🛠️ Tecnologias Fundamentais" + innovation
                )
                improvements.append("Adicionada inovação tecnológica")
        
        return content, improvements

    def improve_practical_implementation(self, content: str) -> Tuple[str, List[str]]:
        """Adiciona implementação prática"""
        improvements = []
        
        # Adicionar checklist de qualidade
        if "## 🎯 Projeto do Módulo" in content:
            checklist = "\n📋 **CHECKLIST DE QUALIDADE:**\n\n"
            checklist += "- [ ] Conteúdo revisado por especialistas\n"
            checklist += "- [ ] Testado com usuários reais\n"
            checklist += "- [ ] Feedback incorporado\n"
            checklist += "- [ ] Métricas de performance\n\n"
            
            content = content.replace(
                "## 🎯 Projeto do Módulo",
                "## 🎯 Projeto do Módulo" + checklist
            )
            improvements.append("Adicionado checklist de qualidade")
        
        return content, improvements

    def improve_success_measurement(self, content: str) -> Tuple[str, List[str]]:
        """Adiciona medição de sucesso"""
        improvements = []
        
        # Adicionar métricas de sucesso
        if "## 🎯 Checklist de Conclusão" in content:
            metrics = "\n📊 **MÉTRICAS DE SUCESSO:**\n\n"
            metrics += "- **Taxa de conclusão:** % de alunos que terminam\n"
            metrics += "- **Tempo de engajamento:** Duração das sessões\n"
            metrics += "- **Avaliações:** Satisfação e feedback\n"
            metrics += "- **Aplicação prática:** Projetos realizados\n\n"
            
            content = content.replace(
                "## 🎯 Checklist de Conclusão",
                "## 🎯 Checklist de Conclusão" + metrics
            )
            improvements.append("Adicionadas métricas de sucesso")
        
        return content, improvements

    def improve_result_focus(self, content: str) -> Tuple[str, List[str]]:
        """Foca no resultado e carreira"""
        improvements = []
        
        # Adicionar foco na carreira
        if "## 📚 Recursos Adicionais" in content:
            career_focus = "\n💼 **FOCO NA CARREIRA:**\n\n"
            career_focus += "- **Conexão com mercado:** Demanda real\n"
            career_focus += "- **Habilidades valorizadas:** Competências em alta\n"
            career_focus += "- **Projetos portfólio:** Trabalhos para mostrar\n"
            career_focus += "- **Networking:** Conexões profissionais\n\n"
            
            content = content.replace(
                "## 📚 Recursos Adicionais",
                "## 📚 Recursos Adicionais" + career_focus
            )
            improvements.append("Adicionado foco na carreira")
        
        return content, improvements

    def process_all_courses(self) -> Dict:
        """Processa todos os cursos aplicando melhorias"""
        results = {
            "total_courses": len(self.course_dirs),
            "courses_processed": [],
            "total_improvements": 0,
            "processing_time": None,
            "summary": {}
        }
        
        start_time = datetime.now()
        
        for course_dir in self.course_dirs:
            course_path = self.base_path / course_dir
            
            if course_path.exists():
                print(f"\n🔄 Processando curso: {course_dir}")
                
                # Analisar estrutura atual
                analysis = self.analyze_course_structure(course_path)
                
                # Aplicar melhorias
                improvements_count = 0
                for file_path in course_path.rglob("*.md"):
                    if file_path.is_file():
                        if self.apply_improvements_to_file(file_path):
                            improvements_count += 1
                
                # Registrar resultados
                course_result = {
                    "course_name": course_dir,
                    "files_processed": analysis["total_files"],
                    "improvements_applied": improvements_count,
                    "initial_score": analysis["current_score"],
                    "improvement_opportunities": analysis["improvement_opportunities"]
                }
                
                results["courses_processed"].append(course_result)
                results["total_improvements"] += improvements_count
                
                print(f"✅ {course_dir}: {improvements_count} melhorias aplicadas")
                
                self.courses_processed.append(course_dir)
        
        end_time = datetime.now()
        results["processing_time"] = str(end_time - start_time)
        
        # Gerar resumo
        results["summary"] = self.generate_summary(results)
        
        return results

    def generate_summary(self, results: Dict) -> Dict:
        """Gera resumo dos resultados"""
        total_files = sum(course["files_processed"] for course in results["courses_processed"])
        
        summary = {
            "total_files_processed": total_files,
            "total_improvements_applied": results["total_improvements"],
            "average_improvements_per_file": results["total_improvements"] / total_files if total_files > 0 else 0,
            "courses_with_most_improvements": sorted(
                results["courses_processed"],
                key=lambda x: x["improvements_applied"],
                reverse=True
            )[:3],
            "improvement_categories": self.categorize_improvements()
        }
        
        return summary

    def categorize_improvements(self) -> Dict:
        """Categoriza as melhorias aplicadas"""
        categories = {
            "clareza": 0,
            "estrutura": 0,
            "engajamento": 0,
            "conteudo": 0,
            "producao": 0,
            "qualidade": 0,
            "implementacao": 0,
            "medicao": 0,
            "resultado": 0
        }
        
        for improvement in self.improvements_applied:
            for category in categories.keys():
                if any(category in str(imp).lower() for imp in improvement["improvements"]):
                    categories[category] += 1
        
        return categories

    def save_results(self, results: Dict, output_file: str = "content_improvements_report.json"):
        """Salva os resultados em arquivo JSON"""
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(results, f, indent=2, ensure_ascii=False)
            print(f"\n📊 Relatório salvo em: {output_file}")
        except Exception as e:
            print(f"❌ Erro ao salvar relatório: {str(e)}")

    def generate_markdown_report(self, results: Dict, output_file: str = "content_improvements_report.md"):
        """Gera relatório em Markdown"""
        try:
            report = f"""# 📊 Relatório de Melhorias de Conteúdo - Fenix Academy

## 🎯 Resumo Executivo

**Data:** {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}  
**Total de Cursos Processados:** {results['total_courses']}  
**Arquivos Processados:** {results['summary']['total_files_processed']}  
**Melhorias Aplicadas:** {results['total_improvements']}  
**Tempo de Processamento:** {results['processing_time']}

## 📈 Métricas de Melhoria

- **Média de melhorias por arquivo:** {results['summary']['average_improvements_per_file']:.2f}
- **Cursos com mais melhorias:** {', '.join([c['course_name'] for c in results['summary']['courses_with_most_improvements']])}

## 🎨 Categorias de Melhoria

"""
            
            for category, count in results['summary']['improvement_categories'].items():
                if count > 0:
                    report += f"- **{category.title()}:** {count} melhorias\n"
            
            report += "\n## 📚 Detalhes por Curso\n\n"
            
            for course in results['courses_processed']:
                report += f"### {course['course_name']}\n"
                report += f"- **Arquivos processados:** {course['files_processed']}\n"
                report += f"- **Melhorias aplicadas:** {course['improvements_applied']}\n"
                report += f"- **Pontuação inicial:** {course['initial_score']:.1f}/100\n"
                
                if course['improvement_opportunities']:
                    report += f"- **Oportunidades identificadas:**\n"
                    for opp in course['improvement_opportunities'][:5]:  # Top 5
                        report += f"  - {opp}\n"
                
                report += "\n"
            
            report += "## 🚀 Próximos Passos\n\n"
            report += "1. **Revisar melhorias aplicadas** - Validar qualidade\n"
            report += "2. **Testar com usuários** - Coletar feedback\n"
            report += "3. **Medir impacto** - Acompanhar métricas\n"
            report += "4. **Iterar e melhorar** - Processo contínuo\n"
            report += "5. **Treinar equipe** - Capacitar na metodologia\n\n"
            
            report += "---\n\n"
            report += "*Relatório gerado automaticamente pelo sistema de melhorias de conteúdo da Fenix Academy* 🚀\n"
            
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(report)
            
            print(f"📝 Relatório Markdown salvo em: {output_file}")
            
        except Exception as e:
            print(f"❌ Erro ao gerar relatório Markdown: {str(e)}")

def main():
    """Função principal"""
    print("🚀 Iniciando aplicação de melhorias de conteúdo na Fenix Academy...")
    
    # Inicializar melhorador
    improver = ContentImprover()
    
    # Processar todos os cursos
    print("\n📚 Processando cursos...")
    results = improver.process_all_courses()
    
    # Salvar resultados
    improver.save_results(results)
    improver.generate_markdown_report(results)
    
    # Resumo final
    print(f"\n🎉 Processamento concluído!")
    print(f"📊 Total de melhorias aplicadas: {results['total_improvements']}")
    print(f"⏱️ Tempo total: {results['processing_time']}")
    print(f"📁 Relatórios salvos em:")
    print(f"   - JSON: content_improvements_report.json")
    print(f"   - Markdown: content_improvements_report.md")

if __name__ == "__main__":
    main()
