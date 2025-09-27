# 🚀 Processador de Cursos Fenix Academy

Sistema completo para processar todos os cursos de uma vez, criando conteúdos específicos e códigos de exemplos específicos para cada módulo de cada curso.

## 📁 Estrutura dos Arquivos

```
scripts/
├── process_all_courses.py      # Script principal de processamento
├── content_generators.py       # Geradores de conteúdo específico
├── code_example_generators.py  # Geradores de códigos de exemplo
├── course_analyzer.py          # Analisador de estrutura de cursos
├── test_processor.py           # Script de testes
├── run_course_processor.py     # Script de execução principal
└── README.md                   # Este arquivo
```

## 🎯 Funcionalidades

### 1. **Análise Inteligente de Cursos**
- Detecta automaticamente o tipo de cada curso (backend, frontend, mobile, etc.)
- Analisa padrões de módulos e aulas
- Calcula score de qualidade do conteúdo
- Gera recomendações de melhorias

### 2. **Geração de Conteúdo Específico**
- Melhora aulas baseado no tipo de curso
- Adiciona seções específicas (APIs para backend, responsividade para frontend, etc.)
- Inclui casos brasileiros relevantes
- Adiciona exercícios práticos

### 3. **Códigos de Exemplo Personalizados**
- Gera códigos específicos para cada tipo de curso
- Inclui exemplos práticos e funcionais
- Cria arquivos de configuração apropriados
- Adiciona testes e documentação

### 4. **Processamento em Lote**
- Processa todos os cursos automaticamente
- Mantém estrutura original organizada
- Gera relatórios detalhados
- Cria diretórios de saída organizados

## 🚀 Como Usar

### Instalação

1. Certifique-se de ter Python 3.7+ instalado
2. Navegue até o diretório `scripts/`
3. Execute os comandos abaixo

### Execução Básica

```bash
# Processar todos os cursos
python run_course_processor.py

# Apenas analisar cursos (sem processar)
python run_course_processor.py --analyze-only

# Executar em modo de teste
python run_course_processor.py --test

# Especificar caminhos customizados
python run_course_processor.py --base-path "caminho/para/cursos" --output-path "caminho/saida"
```

### Opções Disponíveis

- `--base-path`: Caminho para os cursos (padrão: `backend/fenix-expanded-content`)
- `--output-path`: Caminho de saída (padrão: `processed_courses`)
- `--analyze-only`: Apenas analisar sem processar
- `--test`: Executar em modo de teste

## 📊 Tipos de Curso Suportados

O sistema detecta automaticamente os seguintes tipos de curso:

- **Backend**: APIs, servidores, Node.js, Python, Java
- **Frontend**: React, Vue, Angular, HTML, CSS, JavaScript
- **Mobile**: React Native, Flutter, iOS, Android
- **Data Science**: Python, Machine Learning, Analytics
- **DevOps**: Docker, Kubernetes, CI/CD, Deploy
- **Cybersecurity**: Security, Penetration Testing
- **Full Stack**: Desenvolvimento completo
- **UI/UX**: Design, Interface, Usuário
- **Blockchain**: Smart Contracts, Crypto
- **AWS**: Cloud, Amazon Web Services

## 🔧 Exemplos de Melhorias Geradas

### Para Cursos de Backend
- Seções de APIs REST
- Modelos de banco de dados
- Middleware de autenticação
- Testes unitários
- Configurações de segurança

### Para Cursos de Frontend
- Design responsivo
- Acessibilidade (WCAG)
- Performance otimizada
- Componentes React/Vue
- CSS moderno

### Para Cursos de Mobile
- Componentes React Native/Flutter
- Navegação mobile
- Performance mobile
- Estilos otimizados

### Para Cursos de Data Science
- Análise de dados com Python
- Visualizações interativas
- Modelos de Machine Learning
- Jupyter Notebooks

## 📈 Relatórios Gerados

### 1. **Relatório de Análise** (`course_analysis_report.json`)
- Estatísticas gerais dos cursos
- Distribuição por tipo
- Análise de qualidade
- Recomendações de melhoria

### 2. **Relatório de Processamento** (`processing_report.json`)
- Cursos processados
- Módulos e aulas processadas
- Estatísticas de geração
- Tempo de processamento

### 3. **Logs de Processamento** (`course_processing.log`)
- Log detalhado de cada operação
- Erros e avisos
- Progresso do processamento

## 🧪 Testes

Execute os testes para verificar se tudo está funcionando:

```bash
python test_processor.py
```

Os testes verificam:
- Descoberta de cursos
- Análise de estrutura
- Geração de conteúdo
- Criação de códigos de exemplo

## 📁 Estrutura de Saída

```
processed_courses/
├── backend-development/
│   ├── modulo-01/
│   │   ├── aulas/
│   │   │   ├── aula-01-modulo-01-fundamentos-de-backend-development.md
│   │   │   └── ...
│   │   ├── exemplos/
│   │   │   ├── api-rest.js
│   │   │   ├── database-model.sql
│   │   │   └── ...
│   │   └── README.md
│   └── ...
├── frontend-development/
│   └── ...
└── ...
```

## 🔍 Monitoramento

O sistema gera logs detalhados durante o processamento:

- **INFO**: Operações normais
- **WARNING**: Avisos importantes
- **ERROR**: Erros que precisam de atenção

## 🛠️ Personalização

### Adicionar Novo Tipo de Curso

1. Edite `content_generators.py`
2. Adicione novo tipo em `_load_templates()`
3. Implemente `_add_[tipo]_specific_content()`
4. Adicione templates em `code_example_generators.py`

### Modificar Templates

1. Edite os métodos `_get_*_template()` nos arquivos de geradores
2. Personalize o conteúdo conforme necessário
3. Teste com `python test_processor.py`

## 🚨 Solução de Problemas

### Erro: "Nenhum curso encontrado"
- Verifique se o caminho `--base-path` está correto
- Confirme se existem diretórios de cursos
- Verifique permissões de leitura

### Erro: "Módulo não encontrado"
- Execute `pip install -r requirements.txt`
- Verifique se todos os arquivos estão no diretório `scripts/`

### Erro: "Permissão negada"
- Verifique permissões de escrita no diretório de saída
- Execute como administrador se necessário

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs em `course_processing.log`
2. Execute os testes para diagnosticar
3. Consulte este README
4. Entre em contato com a equipe de desenvolvimento

## 🎉 Resultados Esperados

Após o processamento, você terá:

- ✅ Cursos com conteúdo melhorado e específico
- ✅ Códigos de exemplo funcionais para cada tipo
- ✅ Estrutura organizada e padronizada
- ✅ Relatórios detalhados de qualidade
- ✅ Recomendações para melhorias futuras

**🚀 Pronto para processar seus cursos!**