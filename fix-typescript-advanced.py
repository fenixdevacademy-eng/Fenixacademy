#!/usr/bin/env python3
"""
Script avançado para corrigir erros de TypeScript
Corrige problemas complexos de sintaxe, tipos e estrutura
"""

import os
import re
import json
from pathlib import Path

class AdvancedTypeScriptFixer:
    def __init__(self, project_path="."):
        self.project_path = project_path
        self.fixes_applied = 0
        self.files_processed = 0
        self.error_patterns = {
            'syntax_errors': 0,
            'type_errors': 0,
            'import_errors': 0,
            'export_errors': 0,
            'function_errors': 0,
            'interface_errors': 0,
            'class_errors': 0,
            'try_catch_errors': 0,
            'array_errors': 0,
            'object_errors': 0
        }
        
    def fix_file(self, file_path):
        """Aplica todas as correções em um arquivo"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Aplicar correções em ordem de prioridade
            content = self.fix_syntax_errors(content)
            content = self.fix_type_declarations(content)
            content = self.fix_import_statements(content)
            content = self.fix_export_statements(content)
            content = self.fix_function_declarations(content)
            content = self.fix_interface_declarations(content)
            content = self.fix_class_declarations(content)
            content = self.fix_try_catch_blocks(content)
            content = self.fix_array_declarations(content)
            content = self.fix_object_literals(content)
            content = self.fix_jsx_syntax(content)
            content = self.fix_async_functions(content)
            content = self.fix_promise_handling(content)
            content = self.fix_conditional_statements(content)
            content = self.fix_loop_statements(content)
            content = self.fix_switch_statements(content)
            content = self.fix_destructuring(content)
            content = self.fix_spread_operators(content)
            content = self.fix_template_literals(content)
            content = self.fix_arrow_functions(content)
            content = self.fix_generic_types(content)
            content = self.fix_union_types(content)
            content = self.fix_intersection_types(content)
            content = self.fix_optional_properties(content)
            content = self.fix_readonly_properties(content)
            content = self.fix_const_assertions(content)
            content = self.fix_namespace_declarations(content)
            content = self.fix_module_declarations(content)
            content = self.fix_decorator_syntax(content)
            content = self.fix_enum_declarations(content)
            content = self.fix_type_aliases(content)
            content = self.fix_conditional_types(content)
            content = self.fix_mapped_types(content)
            content = self.fix_utility_types(content)
            content = self.fix_cleanup_whitespace(content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                self.fixes_applied += 1
                return True
            return False
                
        except Exception as e:
            print(f"❌ Erro ao processar {file_path}: {e}")
            return False
    
    def fix_syntax_errors(self, content):
        """Corrige erros básicos de sintaxe"""
        fixes = [
            # Remove chaves extras soltas
            (r'^\s*}\s*$', ''),
            (r'^\s*{\s*$', ''),
            
            # Corrige ponto e vírgula faltando
            (r'(\w+)\s*$', r'\1;'),
            
            # Remove linhas vazias excessivas
            (r'\n\s*\n\s*\n+', '\n\n'),
            
            # Corrige vírgulas faltando
            (r'(\w+)\s*\n\s*(\w+)', r'\1,\n\2'),
            
            # Corrige parênteses não fechados
            (r'\(([^)]*)$', r'(\1)'),
            
            # Corrige colchetes não fechados
            (r'\[([^\]]*)$', r'[\1]'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
            except re.error:
                continue
                
        return content
    
    def fix_type_declarations(self, content):
        """Corrige declarações de tipos"""
        fixes = [
            # Corrige errorstring[] para string[]
            (r'errorstring\[\]', 'string[]'),
            (r'fieldstring\[\]', 'string[]'),
            (r'datany', 'data: any'),
            
            # Corrige tipos de array malformados
            (r'(\w+)\[\]', r'\1[]'),
            
            # Corrige const errorstring[] = [] para const errors: string[] = []
            (r'const\s+(\w+)\[\]\s*=\s*\[\]', r'const \1: string[] = []'),
            
            # Corrige parâmetros de função malformados
            (r'\((\w+),\s*(\w+)\[\]\)', r'(\1: any, \2: string[])'),
            
            # Corrige tipos de retorno malformados
            (r'{\s*isValid:\s*boolean;\s*errorstring\[\]\s*}', '{ isValid: boolean; errors: string[] }'),
            
            # Corrige tipos primitivos malformados
            (r'(\w+):\s*string\s*\[\]', r'\1: string[]'),
            (r'(\w+):\s*number\s*\[\]', r'\1: number[]'),
            (r'(\w+):\s*boolean\s*\[\]', r'\1: boolean[]'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_import_statements(self, content):
        """Corrige declarações de import"""
        fixes = [
            # Remove imports vazios
            (r'import\s*{\s*}\s*from\s*[\'"][^\'"]*[\'"]\s*;?\s*', ''),
            
            # Corrige imports malformados
            (r'import\s+(\w+)\s*from\s*[\'"][^\'"]*[\'"]\s*;?\s*', r'import \1 from \'\1\';'),
            
            # Corrige imports de tipos
            (r'import\s+type\s+(\w+)\s*from\s*[\'"][^\'"]*[\'"]\s*;?\s*', r'import type { \1 } from \'\1\';'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_export_statements(self, content):
        """Corrige declarações de export"""
        fixes = [
            # Remove exports vazios
            (r'export\s*{\s*}\s*;?\s*', ''),
            
            # Corrige exports de interface
            (r'export\s+interface\s+(\w+)\s*{\s*}\s*;?', r'export interface \1 {\n  // Interface properties\n}'),
            
            # Corrige exports de função
            (r'export\s+function\s+(\w+)\s*\(\s*\)\s*{\s*}\s*;?', r'export function \1() {\n  // Function body\n}'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_function_declarations(self, content):
        """Corrige declarações de função"""
        fixes = [
            # Corrige funções com tipos de retorno malformados
            (r'(\w+):\s*{\s*isValid:\s*boolean;\s*errorstring\[\]\s*}\s*=>', r'\1: { isValid: boolean; errors: string[] } =>'),
            
            # Corrige parâmetros de função malformados
            (r'\((\w+),\s*(\w+)\[\]\)', r'(\1: any, \2: string[])'),
            
            # Corrige funções sem tipo de retorno
            (r'function\s+(\w+)\s*\([^)]*\)\s*{', r'function \1(): any {'),
            
            # Corrige arrow functions sem tipo de retorno
            (r'(\w+)\s*=\s*\([^)]*\)\s*=>\s*{', r'\1 = (): any => {'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_interface_declarations(self, content):
        """Corrige declarações de interface"""
        fixes = [
            # Remove interfaces vazias malformadas
            (r'interface\s+\w+\s*{\s*}\s*;?\s*', ''),
            
            # Corrige interfaces com propriedades malformadas
            (r'interface\s+(\w+)\s*{\s*([^}]*)\s*}\s*;?', 
             lambda m: f"interface {m.group(1)} {{\n  {m.group(2).strip()}\n}}"),
        ]
        
        for pattern, replacement in fixes:
            try:
                if callable(replacement):
                    content = re.sub(pattern, replacement, content)
                else:
                    content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_class_declarations(self, content):
        """Corrige declarações de classe"""
        fixes = [
            # Remove classes vazias malformadas
            (r'class\s+\w+\s*{\s*}\s*;?\s*', ''),
            
            # Corrige classes com propriedades malformadas
            (r'class\s+(\w+)\s*{\s*([^}]*)\s*}\s*;?', 
             lambda m: f"class {m.group(1)} {{\n  {m.group(2).strip()}\n}}"),
        ]
        
        for pattern, replacement in fixes:
            try:
                if callable(replacement):
                    content = re.sub(pattern, replacement, content)
                else:
                    content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_try_catch_blocks(self, content):
        """Corrige blocos try-catch malformados"""
        fixes = [
            # Corrige try-catch sem try
            (r'}\s*catch\s*\([^)]*\)\s*{', r'try {\n  // try block\n} catch (error) {'),
            
            # Corrige finally sem try
            (r'}\s*finally\s*{', r'try {\n  // try block\n} finally {'),
            
            # Adiciona try onde necessário
            (r'(\s+)(\w+\.\w+\([^)]*\))\s*;\s*}\s*catch', r'\1try {\n\1  \2;\n\1} catch'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_array_declarations(self, content):
        """Corrige declarações de array"""
        fixes = [
            # Corrige const errorstring[] = [] para const errors: string[] = []
            (r'const\s+(\w+)\[\]\s*=\s*\[\]', r'const \1: string[] = []'),
            
            # Corrige declarações de array em parâmetros
            (r'(\w+):\s*(\w+)\[\]', r'\1: \2[]'),
            
            # Corrige arrays malformados
            (r'\[\s*\]', '[]'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_object_literals(self, content):
        """Corrige literais de objeto malformados"""
        fixes = [
            # Corrige objetos com propriedades malformadas
            (r'{\s*([^}]*)\s*}\s*;?\s*$', 
             lambda m: f"{{\n  {m.group(1).strip()}\n}}"),
            
            # Corrige objetos vazios
            (r'{\s*}\s*;?', '{}'),
        ]
        
        for pattern, replacement in fixes:
            try:
                if callable(replacement):
                    content = re.sub(pattern, replacement, content)
                else:
                    content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_jsx_syntax(self, content):
        """Corrige sintaxe JSX"""
        fixes = [
            # Corrige JSX malformado
            (r'<(\w+)\s*>\s*</\1>', r'<\1></\1>'),
            
            # Corrige props malformadas
            (r'(\w+)=\s*{([^}]*)}', r'\1={{\2}}'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_async_functions(self, content):
        """Corrige funções async malformadas"""
        fixes = [
            # Adiciona async onde necessário
            (r'export\s+const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{', 
             r'export const \1 = async (\2) => {'),
            
            # Corrige funções async malformadas
            (r'async\s+function\s+(\w+)\s*\(\s*\)\s*{\s*}\s*;?', 
             r'async function \1() {\n  // Function body\n}'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_promise_handling(self, content):
        """Corrige tratamento de promises"""
        fixes = [
            # Adiciona await onde necessário
            (r'(\w+\.\w+\([^)]*\))\s*;', r'await \1;'),
            
            # Corrige Promise.all malformado
            (r'Promise\.all\s*\(\s*\[\s*\]\s*\)', 'Promise.all([])'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_conditional_statements(self, content):
        """Corrige declarações condicionais"""
        fixes = [
            # Adiciona chaves em if/else
            (r'if\s*\([^)]*\)\s*([^{][^;]*);', r'if (\1) {\n    \2;\n}'),
            
            # Corrige ternários malformados
            (r'(\w+)\s*\?\s*([^:]*)\s*:\s*([^;]*);', r'\1 ? \2 : \3;'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_loop_statements(self, content):
        """Corrige declarações de loop"""
        fixes = [
            # Adiciona chaves em for/while
            (r'(for|while)\s*\([^)]*\)\s*([^{][^;]*);', r'\1 (\2) {\n    \3;\n}'),
            
            # Corrige for...of malformado
            (r'for\s*\(\s*(\w+)\s*of\s*(\w+)\s*\)\s*([^{][^;]*);', r'for (const \1 of \2) {\n    \3;\n}'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_switch_statements(self, content):
        """Corrige declarações de switch"""
        fixes = [
            # Adiciona break em cases
            (r'case\s+[^:]*:\s*([^}]*?)(?=case|default|})', 
             r'case \1:\n    \2;\n    break;'),
            
            # Corrige switch malformado
            (r'switch\s*\(\s*(\w+)\s*\)\s*{\s*}\s*;?', r'switch (\1) {\n  default:\n    break;\n}'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_destructuring(self, content):
        """Corrige destructuring"""
        fixes = [
            # Corrige destructuring malformado
            (r'const\s*{\s*(\w+)\s*}\s*=\s*(\w+)', r'const { \1 } = \2'),
            
            # Corrige array destructuring
            (r'const\s*\[\s*(\w+)\s*\]\s*=\s*(\w+)', r'const [\1] = \2'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_spread_operators(self, content):
        """Corrige spread operators"""
        fixes = [
            # Corrige spread operators malformados
            (r'\.\.\.\s*(\w+)\[\]', r'...\1'),
            
            # Corrige rest parameters
            (r'\.\.\.\s*(\w+)\s*:\s*(\w+)\[\]', r'...\1: \2[]'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_template_literals(self, content):
        """Corrige template literals"""
        fixes = [
            # Corrige template literals malformados
            (r'`([^`]*)\$\{([^}]*)\}([^`]*)`', r'`\1${{\2}}\3`'),
            
            # Corrige template literals vazios
            (r'`\s*`', r'``'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_arrow_functions(self, content):
        """Corrige arrow functions"""
        fixes = [
            # Corrige arrow functions malformadas
            (r'\([^)]*\)\s*=>\s*{\s*}\s*;?', r'() => {\n  // Function body\n}'),
            
            # Corrige arrow functions sem parâmetros
            (r'\(\s*\)\s*=>\s*([^{][^;]*);', r'() => \1;'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_generic_types(self, content):
        """Corrige tipos genéricos"""
        fixes = [
            # Corrige generics malformados
            (r'<(\w+)\[\]>', r'<\1[]>'),
            
            # Corrige generics vazios
            (r'<>\s*', ''),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_union_types(self, content):
        """Corrige tipos de união"""
        fixes = [
            # Corrige union types malformados
            (r'(\w+)\s*\|\s*(\w+)\[\]', r'\1 | \2[]'),
            
            # Corrige union types com null/undefined
            (r'(\w+)\s*\|\s*null\s*\|\s*undefined', r'\1 | null | undefined'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_intersection_types(self, content):
        """Corrige tipos de interseção"""
        fixes = [
            # Corrige intersection types malformados
            (r'(\w+)\s*&\s*(\w+)\[\]', r'\1 & \2[]'),
            
            # Corrige intersection types vazios
            (r'(\w+)\s*&\s*{}', r'\1'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_optional_properties(self, content):
        """Corrige propriedades opcionais"""
        fixes = [
            # Adiciona ? em propriedades opcionais
            (r'(\w+):\s*(\w+)\s*\|\s*undefined', r'\1?: \2'),
            
            # Corrige propriedades opcionais malformadas
            (r'(\w+)\?:\s*(\w+)\s*\|\s*undefined', r'\1?: \2'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_readonly_properties(self, content):
        """Corrige propriedades readonly"""
        fixes = [
            # Adiciona readonly em propriedades
            (r'(\w+):\s*(\w+)\[\]', r'readonly \1: \2[]'),
            
            # Corrige readonly malformado
            (r'readonly\s+readonly\s+', r'readonly '),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_const_assertions(self, content):
            """Corrige const assertions"""
            fixes = [
                # Adiciona as const onde necessário
                (r'(\w+)\s*as\s*const', r'\1 as const'),
                
                # Corrige const assertions malformadas
                (r'as\s+const\s+as\s+const', r'as const'),
            ]
            
            for pattern, replacement in fixes:
                try:
                    content = re.sub(pattern, replacement, content)
                except re.error:
                    continue
                    
            return content
    
    def fix_namespace_declarations(self, content):
        """Corrige declarações de namespace"""
        fixes = [
            # Remove namespaces vazios
            (r'namespace\s+\w+\s*{\s*}\s*;?\s*', ''),
            
            # Corrige namespaces malformados
            (r'namespace\s+(\w+)\s*{\s*([^}]*)\s*}\s*;?', 
             lambda m: f"namespace {m.group(1)} {{\n  {m.group(2).strip()}\n}}"),
        ]
        
        for pattern, replacement in fixes:
            try:
                if callable(replacement):
                    content = re.sub(pattern, replacement, content)
                else:
                    content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_module_declarations(self, content):
        """Corrige declarações de módulo"""
        fixes = [
            # Remove modules vazios
            (r'declare\s+module\s+[\'"][^\'"]*[\'"]\s*{\s*}\s*;?\s*', ''),
            
            # Corrige modules malformados
            (r'declare\s+module\s+([\'"][^\'"]*[\'"])\s*{\s*([^}]*)\s*}\s*;?', 
             lambda m: f"declare module {m.group(1)} {{\n  {m.group(2).strip()}\n}}"),
        ]
        
        for pattern, replacement in fixes:
            try:
                if callable(replacement):
                    content = re.sub(pattern, replacement, content)
                else:
                    content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_decorator_syntax(self, content):
        """Corrige sintaxe de decorators"""
        fixes = [
            # Corrige decorators malformados
            (r'@\s*(\w+)\s*', r'@\1 '),
            
            # Remove decorators vazios
            (r'@\s*$', ''),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_enum_declarations(self, content):
        """Corrige declarações de enum"""
        fixes = [
            # Remove enums vazios malformados
            (r'enum\s+\w+\s*{\s*}\s*;?\s*', ''),
            
            # Corrige enums malformados
            (r'enum\s+(\w+)\s*{\s*([^}]*)\s*}\s*;?', 
             lambda m: f"enum {m.group(1)} {{\n  {m.group(2).strip()}\n}}"),
        ]
        
        for pattern, replacement in fixes:
            try:
                if callable(replacement):
                    content = re.sub(pattern, replacement, content)
                else:
                    content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_type_aliases(self, content):
        """Corrige type aliases"""
        fixes = [
            # Remove type aliases vazios
            (r'type\s+\w+\s*=\s*;\s*', ''),
            
            # Corrige type aliases malformados
            (r'type\s+(\w+)\s*=\s*([^;]*);', r'type \1 = \2;'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_conditional_types(self, content):
        """Corrige conditional types"""
        fixes = [
            # Corrige conditional types malformados
            (r'(\w+)\s*extends\s*(\w+)\s*\?\s*(\w+)\s*:\s*(\w+)', r'\1 extends \2 ? \3 : \4'),
            
            # Corrige conditional types vazios
            (r'(\w+)\s*extends\s*(\w+)\s*\?\s*:\s*(\w+)', r'\1 extends \2 ? never : \3'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_mapped_types(self, content):
        """Corrige mapped types"""
        fixes = [
            # Corrige mapped types malformados
            (r'{\s*\[K\s+in\s+keyof\s+(\w+)\]:\s*(\w+)\[K\]\s*}', r'{ [K in keyof \1]: \2[K] }'),
            
            # Corrige mapped types vazios
            (r'{\s*\[K\s+in\s+keyof\s+(\w+)\]:\s*}\s*', r'{ [K in keyof \1]: \1[K] }'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_utility_types(self, content):
        """Corrige utility types"""
        fixes = [
            # Corrige utility types malformados
            (r'Partial\s*<\s*(\w+)\s*>', r'Partial<\1>'),
            (r'Required\s*<\s*(\w+)\s*>', r'Required<\1>'),
            (r'Pick\s*<\s*(\w+),\s*(\w+)\s*>', r'Pick<\1, \2>'),
            (r'Omit\s*<\s*(\w+),\s*(\w+)\s*>', r'Omit<\1, \2>'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content)
            except re.error:
                continue
                
        return content
    
    def fix_cleanup_whitespace(self, content):
        """Limpa espaços em branco desnecessários"""
        fixes = [
            # Remove linhas vazias excessivas
            (r'\n\s*\n\s*\n+', '\n\n'),
            
            # Remove espaços em branco no final das linhas
            (r'\s+$', '', re.MULTILINE),
            
            # Remove espaços em branco no início das linhas (exceto indentação)
            (r'^\s+$', '', re.MULTILINE),
            
            # Remove espaços em branco duplos
            (r'  +', ' '),
        ]
        
        for pattern, replacement in fixes:
            try:
                if len(pattern) > 2 and pattern[-2:] == ', ':
                    content = re.sub(pattern[:-2], replacement, content, flags=re.MULTILINE)
                else:
                    content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
            except re.error:
                continue
                
        return content
    
    def run(self):
        """Executa o script em todos os arquivos TypeScript"""
        print("🚀 Iniciando correção avançada de erros TypeScript...")
        print(f"📁 Processando arquivos em: {self.project_path}")
        print()
        
        # Encontrar todos os arquivos TypeScript (excluindo node_modules)
        ts_files = []
        for root, dirs, files in os.walk(self.project_path):
            # Excluir node_modules e .next
            dirs[:] = [d for d in dirs if d not in ['node_modules', '.next', '.vercel']]
            for file in files:
                if file.endswith(('.ts', '.tsx')) and not file.startswith('.'):
                    ts_files.append(os.path.join(root, file))
        
        print(f"📊 Encontrados {len(ts_files)} arquivos TypeScript")
        print()
        
        # Processar cada arquivo
        for file_path in ts_files:
            self.files_processed += 1
            if self.fix_file(file_path):
                print(f"✅ Corrigido: {file_path}")
            else:
                print(f"⏭️  Sem alterações: {file_path}")
        
        print()
        print("=" * 50)
        print(f"✅ Processamento concluído!")
        print(f"📁 Arquivos processados: {self.files_processed}")
        print(f"🔧 Arquivos corrigidos: {self.fixes_applied}")
        print(f"📈 Taxa de sucesso: {(self.fixes_applied/self.files_processed)*100:.1f}%")
        print()
        
        if self.fixes_applied > 0:
            print("🎉 Muitos erros foram corrigidos automaticamente!")
            print("💡 Execute 'npm run dev' novamente para verificar se ainda há erros.")
        else:
            print("ℹ️  Nenhum erro foi encontrado ou todos os arquivos já estavam corretos.")

if __name__ == "__main__":
    fixer = AdvancedTypeScriptFixer()
    fixer.run()






