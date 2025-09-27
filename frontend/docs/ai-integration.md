# Integração da IA com OpenAI

## Visão Geral

A Fênix Academy agora possui integração completa com a API da OpenAI, fornecendo uma IA superinteligente para ajudar estudantes com programação e desenvolvimento.

## Funcionalidades

### 1. Chat Inteligente
- Conversação natural com a IA
- Respostas contextuais baseadas no histórico
- Suporte a múltiplas linguagens de programação

### 2. Análise de Código
- Revisão automática de código
- Sugestões de melhoria
- Identificação de problemas e bugs

### 3. Geração de Código
- Criação de código baseada em prompts
- Exemplos práticos e comentários
- Suporte a várias linguagens

### 4. Debug e Resolução de Problemas
- Identificação de erros
- Sugestões de correção
- Explicação de problemas complexos

### 5. Explicação de Conceitos
- Explicações didáticas
- Exemplos práticos
- Caminhos de aprendizado personalizados

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
OPENAI_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### API Key

A API key deve ser configurada como variável de ambiente:
```
OPENAI_API_KEY=your_api_key_here
```

## Estrutura dos Arquivos

```
frontend/
├── app/
│   ├── ai/
│   │   └── page.tsx                 # Interface principal da IA
│   └── api/
│       └── ai/
│           ├── chat/
│           │   └── route.ts         # API endpoint para chat
│           └── test/
│               └── route.ts         # Teste de conectividade
├── lib/
│   └── ai/
│       └── openai-service.ts       # Serviço de integração com OpenAI
└── docs/
    └── ai-integration.md           # Esta documentação
```

## Uso da API

### Endpoint Principal: `/api/ai/chat`

**Método:** POST

**Body:**
```json
{
  "type": "chat|analyze_code|generate_code|explain_concept|debug_code|learning_path",
  "messages": [
    {
      "role": "user|assistant|system",
      "content": "Sua mensagem aqui"
    }
  ],
  "code": "código para análise (opcional)",
  "language": "javascript|python|java|etc (opcional)",
  "topics": ["tópico1", "tópico2"] // para learning_path
}
```

**Resposta:**
```json
{
  "success": true,
  "response": "Resposta da IA",
  "type": "chat"
}
```

### Endpoint de Teste: `/api/ai/test`

**Método:** GET

**Resposta:**
```json
{
  "success": true,
  "message": "API OpenAI funcionando corretamente",
  "response": "Conexão estabelecida com sucesso!",
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 10,
    "total_tokens": 30
  }
}
```

## Recursos da Interface

### 1. Status de Conexão
- Indicador visual do status da API
- Verificação automática ao carregar a página
- Avisos de erro quando a API não está disponível

### 2. Prompts Rápidos
- Botões para ações comuns
- Templates pré-definidos
- Suporte a diferentes linguagens

### 3. Funcionalidades de Chat
- Histórico de conversas
- Cópia de mensagens
- Feedback visual
- Indicador de digitação

### 4. Capacidades da IA
- Revisão de código
- Explicação de conceitos
- Debug de código
- Geração de código

## Segurança

- API key armazenada no servidor
- Validação de entrada
- Tratamento de erros
- Rate limiting (recomendado para produção)

## Monitoramento

- Logs de uso da API
- Métricas de tokens consumidos
- Status de conectividade
- Tratamento de erros

## Próximos Passos

1. **Rate Limiting**: Implementar limitação de requisições
2. **Cache**: Adicionar cache para respostas frequentes
3. **Analytics**: Métricas de uso da IA
4. **Personalização**: Adaptar respostas ao perfil do usuário
5. **Integração com Cursos**: IA específica para cada curso

## Troubleshooting

### Erro de Conexão
1. Verifique se a API key está correta
2. Confirme se a variável de ambiente está configurada
3. Teste a conectividade com `/api/ai/test`

### Respostas Lentas
1. Verifique a latência da API OpenAI
2. Considere implementar cache
3. Otimize o tamanho das mensagens

### Erro de Tokens
1. Verifique o limite da API key
2. Implemente rate limiting
3. Otimize o uso de tokens

## Suporte

Para problemas técnicos, entre em contato com a equipe de desenvolvimento da Fênix Academy.
