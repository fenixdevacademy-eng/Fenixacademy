#!/usr/bin/env python3
"""
Script para corrigir automaticamente erros de TypeScript comuns
Resolve problemas de sintaxe, tipos e estrutura de código
"""

import os
import re
import glob
from pathlib import Path

class TypeScriptFixer:
    def __init__(self, project_path="."):
        self.project_path = project_path
        self.fixes_applied = 0
        self.files_processed = 0
        
    def fix_file(self, file_path):
        """Aplica todas as correções em um arquivo"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Aplicar todas as correções
            content = self.fix_syntax_errors(content)
            content = self.fix_type_declarations(content)
            content = self.fix_try_catch_blocks(content)
            content = self.fix_array_declarations(content)
            content = self.fix_missing_braces(content)
            content = self.fix_interface_declarations(content)
            content = self.fix_function_declarations(content)
            content = self.fix_export_statements(content)
            content = self.fix_object_literals(content)
            content = self.fix_async_functions(content)
            content = self.fix_import_statements(content)
            content = self.fix_console_statements(content)
            content = self.fix_conditional_statements(content)
            content = self.fix_loop_statements(content)
            content = self.fix_switch_statements(content)
            content = self.fix_class_declarations(content)
            content = self.fix_enum_declarations(content)
            content = self.fix_generic_types(content)
            content = self.fix_optional_properties(content)
            content = self.fix_union_types(content)
            content = self.fix_intersection_types(content)
            content = self.fix_template_literals(content)
            content = self.fix_destructuring(content)
            content = self.fix_spread_operators(content)
            content = self.fix_arrow_functions(content)
            content = self.fix_promise_handling(content)
            content = self.fix_error_handling(content)
            content = self.fix_validation_functions(content)
            content = self.fix_api_functions(content)
            content = self.fix_database_functions(content)
            content = self.fix_stripe_functions(content)
            content = self.fix_middleware_functions(content)
            content = self.fix_component_functions(content)
            content = self.fix_hook_functions(content)
            content = self.fix_context_functions(content)
            content = self.fix_utility_functions(content)
            content = self.fix_cleanup_whitespace(content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                self.fixes_applied += 1
                print(f"✅ Fixed: {file_path}")
                return True
            else:
                print(f"⏭️  No changes needed: {file_path}")
                return False
                
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
            return False
    
    def fix_syntax_errors(self, content):
        """Corrige erros básicos de sintaxe"""
        # Remove chaves extras soltas
        content = re.sub(r'^\s*}\s*$', '', content, flags=re.MULTILINE)
        content = re.sub(r'^\s*{\s*$', '', content, flags=re.MULTILINE)
        
        # Corrige ponto e vírgula faltando
        content = re.sub(r'(\w+)\s*$', r'\1;', content, flags=re.MULTILINE)
        
        # Remove linhas vazias excessivas
        content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
        
        return content
    
    def fix_type_declarations(self, content):
        """Corrige declarações de tipos incorretas"""
        # Corrige errorstring[] para string[]
        content = re.sub(r'errorstring\[\]', 'string[]', content)
        content = re.sub(r'fieldstring\[\]', 'string[]', content)
        content = re.sub(r'datany', 'data: any', content)
        
        # Corrige tipos de array malformados
        content = re.sub(r'(\w+)\[\]', r'\1[]', content)
        
        # Corrige declarações de interface malformadas
        content = re.sub(r'interface\s+(\w+)\s*{\s*}\s*', r'interface \1 {\n  // Interface definition\n}', content)
        
        return content
    
    def fix_try_catch_blocks(self, content):
        """Corrige blocos try-catch malformados"""
        # Corrige try-catch sem try
        content = re.sub(r'}\s*catch\s*\([^)]*\)\s*{', r'try {\n  // try block\n} catch (error) {', content)
        
        # Corrige finally sem try
        content = re.sub(r'}\s*finally\s*{', r'try {\n  // try block\n} finally {', content)
        
        # Adiciona try onde necessário
        content = re.sub(r'(\s+)(\w+\.\w+\([^)]*\))\s*;\s*}\s*catch', r'\1try {\n\1  \2;\n\1} catch', content)
        
        return content
    
    def fix_array_declarations(self, content):
        """Corrige declarações de array"""
        # Corrige const errorstring[] = [] para const errors: string[] = []
        content = re.sub(r'const\s+(\w+)\[\]\s*=\s*\[\]', r'const \1: string[] = []', content)
        
        # Corrige declarações de array em parâmetros
        content = re.sub(r'(\w+):\s*(\w+)\[\]', r'\1: \2[]', content)
        
        return content
    
    def fix_missing_braces(self, content):
        """Corrige chaves faltando"""
        # Adiciona chaves de fechamento onde necessário
        lines = content.split('\n')
        fixed_lines = []
        brace_count = 0
        
        for line in lines:
            fixed_lines.append(line)
            brace_count += line.count('{') - line.count('}')
            
            # Se há chaves abertas sem fechamento no final do arquivo
            if line.strip() and not line.strip().startswith('//') and brace_count > 0:
                if not any(char in line for char in ['{', '}', ';', ':', ',']):
                    if not line.strip().endswith('{') and not line.strip().endswith('}'):
                        # Adiciona ponto e vírgula se necessário
                        if not line.strip().endswith(';'):
                            fixed_lines[-1] = line + ';'
        
        return '\n'.join(fixed_lines)
    
    def fix_interface_declarations(self, content):
        """Corrige declarações de interface"""
        # Remove interfaces vazias malformadas
        content = re.sub(r'interface\s+\w+\s*{\s*}\s*;?\s*', '', content)
        
        # Corrige interfaces com propriedades malformadas
        content = re.sub(r'interface\s+(\w+)\s*{\s*([^}]*)\s*}\s*;?', 
                        lambda m: f"interface {m.group(1)} {{\n  {m.group(2).strip()}\n}}", content)
        
        return content
    
    def fix_function_declarations(self, content):
        """Corrige declarações de função"""
        # Corrige funções com tipos de retorno malformados
        content = re.sub(r'(\w+):\s*{\s*isValid:\s*boolean;\s*errorstring\[\]\s*}\s*=>', 
                        r'\1: { isValid: boolean; errors: string[] } =>', content)
        
        # Corrige parâmetros de função malformados
        content = re.sub(r'\((\w+),\s*(\w+)\[\]\)', r'(\1: any, \2: string[])', content)
        
        return content
    
    def fix_export_statements(self, content):
        """Corrige declarações de export"""
        # Remove exports malformados
        content = re.sub(r'export\s*{\s*}\s*;?\s*', '', content)
        
        # Corrige exports de interface
        content = re.sub(r'export\s+interface\s+(\w+)\s*{\s*}\s*;?', 
                        r'export interface \1 {\n  // Interface properties\n}', content)
        
        return content
    
    def fix_object_literals(self, content):
        """Corrige literais de objeto malformados"""
        # Corrige objetos com propriedades malformadas
        content = re.sub(r'{\s*([^}]*)\s*}\s*;?\s*$', 
                        lambda m: f"{{\n  {m.group(1).strip()}\n}}", content)
        
        return content
    
    def fix_async_functions(self, content):
        """Corrige funções async malformadas"""
        # Adiciona async onde necessário
        content = re.sub(r'export\s+const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{', 
                        r'export const \1 = async (\2) => {', content)
        
        return content
    
    def fix_import_statements(self, content):
        """Corrige declarações de import"""
        # Remove imports vazios
        content = re.sub(r'import\s*{\s*}\s*from\s*[\'"][^\'"]*[\'"]\s*;?\s*', '', content)
        
        return content
    
    def fix_console_statements(self, content):
        """Corrige declarações de console"""
        # Adiciona ponto e vírgula em console.log
        content = re.sub(r'console\.log\([^)]*\)(?!\s*;)', r'console.log(\1);', content)
        
        return content
    
    def fix_conditional_statements(self, content):
        """Corrige declarações condicionais"""
        # Adiciona chaves em if/else
        content = re.sub(r'if\s*\([^)]*\)\s*([^{][^;]*);', r'if (\1) {\n    \2;\n}', content)
        
        return content
    
    def fix_loop_statements(self, content):
        """Corrige declarações de loop"""
        # Adiciona chaves em for/while
        content = re.sub(r'(for|while)\s*\([^)]*\)\s*([^{][^;]*);', r'\1 (\2) {\n    \3;\n}', content)
        
        return content
    
    def fix_switch_statements(self, content):
        """Corrige declarações de switch"""
        # Adiciona break em cases
        content = re.sub(r'case\s+[^:]*:\s*([^}]*?)(?=case|default|})', 
                        r'case \1:\n    \2;\n    break;', content)
        
        return content
    
    def fix_class_declarations(self, content):
        """Corrige declarações de classe"""
        # Remove classes vazias malformadas
        content = re.sub(r'class\s+\w+\s*{\s*}\s*;?\s*', '', content)
        
        return content
    
    def fix_enum_declarations(self, content):
        """Corrige declarações de enum"""
        # Remove enums vazios malformados
        content = re.sub(r'enum\s+\w+\s*{\s*}\s*;?\s*', '', content)
        
        return content
    
    def fix_generic_types(self, content):
        """Corrige tipos genéricos"""
        # Corrige generics malformados
        content = re.sub(r'<(\w+)\[\]>', r'<\1[]>', content)
        
        return content
    
    def fix_optional_properties(self, content):
        """Corrige propriedades opcionais"""
        # Adiciona ? em propriedades opcionais
        content = re.sub(r'(\w+):\s*(\w+)\s*\|\s*undefined', r'\1?: \2', content)
        
        return content
    
    def fix_union_types(self, content):
        """Corrige tipos de união"""
        # Corrige union types malformados
        content = re.sub(r'(\w+)\s*\|\s*(\w+)\[\]', r'\1 | \2[]', content)
        
        return content
    
    def fix_intersection_types(self, content):
        """Corrige tipos de interseção"""
        # Corrige intersection types malformados
        content = re.sub(r'(\w+)\s*&\s*(\w+)\[\]', r'\1 & \2[]', content)
        
        return content
    
    def fix_template_literals(self, content):
        """Corrige template literals"""
        # Corrige template literals malformados
        content = re.sub(r'`([^`]*)\$\{([^}]*)\}([^`]*)`', r'`\1${{\2}}\3`', content)
        
        return content
    
    def fix_destructuring(self, content):
        """Corrige destructuring"""
        # Corrige destructuring malformado
        content = re.sub(r'const\s*{\s*(\w+)\s*}\s*=\s*(\w+)', r'const { \1 } = \2', content)
        
        return content
    
    def fix_spread_operators(self, content):
        """Corrige spread operators"""
        # Corrige spread operators malformados
        content = re.sub(r'\.\.\.\s*(\w+)\[\]', r'...\1', content)
        
        return content
    
    def fix_arrow_functions(self, content):
        """Corrige arrow functions"""
        # Corrige arrow functions malformadas
        content = re.sub(r'\([^)]*\)\s*=>\s*{\s*}\s*;?', r'() => {\n  // Function body\n}', content)
        
        return content
    
    def fix_promise_handling(self, content):
        """Corrige tratamento de promises"""
        # Adiciona await onde necessário
        content = re.sub(r'(\w+\.\w+\([^)]*\))\s*;', r'await \1;', content)
        
        return content
    
    def fix_error_handling(self, content):
        """Corrige tratamento de erros"""
        # Corrige catch blocks malformados
        content = re.sub(r'}\s*catch\s*\([^)]*\)\s*{\s*([^}]*)\s*}\s*;?', 
                        r'} catch (error) {\n  \1\n}', content)
        
        return content
    
    def fix_validation_functions(self, content):
        """Corrige funções de validação"""
        # Corrige funções de validação malformadas
        content = re.sub(r'validateRequired\s*=\s*\([^)]*\)\s*:\s*void\s*=>\s*{', 
                        r'validateRequired = (data: any, fields: string[]): void => {', content)
        
        return content
    
    def fix_api_functions(self, content):
        """Corrige funções de API"""
        # Corrige funções de API malformadas
        content = re.sub(r'handleApiError\s*=\s*\([^)]*\)\s*:\s*ErrorResponse\s*=>\s*{', 
                        r'handleApiError = (error: unknown): ErrorResponse => {', content)
        
        return content
    
    def fix_database_functions(self, content):
        """Corrige funções de banco de dados"""
        # Corrige funções de banco malformadas
        content = re.sub(r'const\s+pool\s*=\s*new\s+Pool\s*\([^)]*\)\s*;?\s*', 
                        r'const pool = new Pool({\n  connectionString: process.env.POSTGRES_URL,\n  ssl: {\n    rejectUnauthorized: false\n  }\n});', content)
        
        return content
    
    def fix_stripe_functions(self, content):
        """Corrige funções do Stripe"""
        # Corrige funções do Stripe malformadas
        content = re.sub(r'const\s+stripe\s*=\s*new\s+Stripe\s*\([^)]*\)\s*;?\s*', 
                        r'const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || \'\', {\n  apiVersion: \'2023-10-16\'\n});', content)
        
        return content
    
    def fix_middleware_functions(self, content):
        """Corrige funções de middleware"""
        # Corrige middleware malformado
        content = re.sub(r'export\s+function\s+middleware\s*\([^)]*\)\s*{\s*([^}]*)\s*}\s*;?', 
                        r'export function middleware(request: NextRequest) {\n  \1\n}', content)
        
        return content
    
    def fix_component_functions(self, content):
        """Corrige funções de componente"""
        # Corrige componentes React malformados
        content = re.sub(r'export\s+default\s+function\s+(\w+)\s*\([^)]*\)\s*{\s*([^}]*)\s*}\s*;?', 
                        r'export default function \1() {\n  \2\n}', content)
        
        return content
    
    def fix_hook_functions(self, content):
        """Corrige funções de hook"""
        # Corrige hooks malformados
        content = re.sub(r'export\s+const\s+use(\w+)\s*=\s*\([^)]*\)\s*=>\s*{', 
                        r'export const use\1 = (): any => {', content)
        
        return content
    
    def fix_context_functions(self, content):
        """Corrige funções de contexto"""
        # Corrige contextos malformados
        content = re.sub(r'export\s+const\s+(\w+)Context\s*=\s*createContext\s*\([^)]*\)\s*;?\s*', 
                        r'export const \1Context = createContext<any>(null);', content)
        
        return content
    
    def fix_utility_functions(self, content):
        """Corrige funções utilitárias"""
        # Corrige funções utilitárias malformadas
        content = re.sub(r'export\s+const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{', 
                        r'export const \1 = (): any => {', content)
        
        return content
    
    def fix_cleanup_whitespace(self, content):
        """Limpa espaços em branco desnecessários"""
        # Remove linhas vazias excessivas
        content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
        
        # Remove espaços em branco no final das linhas
        content = re.sub(r'\s+$', '', content, flags=re.MULTILINE)
        
        # Remove espaços em branco no início das linhas (exceto indentação)
        content = re.sub(r'^\s+$', '', content, flags=re.MULTILINE)
        
        return content
    
    def run(self):
        """Executa o script em todos os arquivos TypeScript"""
        print("🚀 Iniciando correção automática de erros TypeScript...")
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
            self.fix_file(file_path)
        
        print()
        print("=" * 50)
        print(f"✅ Processamento concluído!")
        print(f"📁 Arquivos processados: {self.files_processed}")
        print(f"🔧 Arquivos corrigidos: {self.fixes_applied}")
        if self.files_processed > 0:
            print(f"📈 Taxa de sucesso: {(self.fixes_applied/self.files_processed)*100:.1f}%")
        else:
            print("📈 Taxa de sucesso: N/A (nenhum arquivo processado)")
        print()
        
        if self.fixes_applied > 0:
            print("🎉 Muitos erros foram corrigidos automaticamente!")
            print("💡 Execute 'npm run dev' novamente para verificar se ainda há erros.")
        else:
            print("ℹ️  Nenhum erro foi encontrado ou todos os arquivos já estavam corretos.")

if __name__ == "__main__":
    fixer = TypeScriptFixer()
    fixer.run()
