# 📧 Sistema de E-mails Automáticos - Fênix Dev Academy

## 📋 Visão Geral

O sistema de e-mails automáticos da Fênix Dev Academy é responsável por enviar comunicações importantes para os usuários em momentos-chave de sua jornada na plataforma.

## 🚀 Funcionalidades Implementadas

### **1. E-mail de Boas-vindas**
- **Quando é enviado:** Imediatamente após o registro do usuário
- **Conteúdo:** Guia completo de primeiros passos na plataforma
- **Inclui:**
  - Instruções de como usar a plataforma
  - Lista de recursos disponíveis
  - Links para cursos e dashboard
  - Informações de contato e suporte

### **2. Confirmação de Pagamento**
- **Quando é enviado:** Após confirmação de pagamento
- **Conteúdo:** Detalhes da compra e próximos passos
- **Inclui:**
  - Detalhes do pagamento
  - Confirmação de acesso liberado
  - Links para acessar os cursos
  - Informações sobre certificados

### **3. Lembrete de Curso**
- **Quando é enviado:** Quando usuário não acessa curso por alguns dias
- **Conteúdo:** Incentivo para continuar aprendizado
- **Inclui:**
  - Motivação para continuar
  - Dicas de consistência
  - Links diretos para cursos

## 🛠️ Configuração Técnica

### **Configuração SMTP**
```typescript
smtp: {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'fenixdevacademy@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
}
```

### **Remetente**
- **Nome:** Fênix Dev Academy
- **E-mail:** fenixdevacademy@gmail.com

## 📁 Estrutura de Arquivos

```
frontend/lib/email/
├── config.ts          # Configurações do sistema
├── service.ts         # Serviço principal de e-mail
└── templates.ts       # Templates HTML dos e-mails

frontend/app/api/email/
├── send/route.ts      # API para envio de e-mails
├── verify/route.ts    # API para verificar conexão
└── test/route.ts      # API para testes
```

## 🔧 Como Usar

### **1. Configurar Variáveis de Ambiente**
```bash
# .env.local
EMAIL_PASSWORD=sua-senha-de-app-do-gmail
```

### **2. Enviar E-mail de Boas-vindas**
```typescript
import { sendWelcomeEmail } from '@/lib/email/service';

const userData = {
  name: 'João Silva',
  email: 'joao@email.com',
  firstName: 'João'
};

await sendWelcomeEmail(userData);
```

### **3. Enviar Confirmação de Pagamento**
```typescript
import { sendPaymentConfirmation } from '@/lib/email/service';

const userData = {
  name: 'João Silva',
  email: 'joao@email.com',
  courseName: 'React Avançado',
  paymentAmount: 97
};

await sendPaymentConfirmation(userData);
```

### **4. Testar Sistema de E-mail**
```bash
# Verificar conexão
curl -X GET http://localhost:3000/api/email/verify

# Enviar e-mail de teste
curl -X POST http://localhost:3000/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@email.com", "type": "welcome"}'
```

## 📧 Templates de E-mail

### **Design Responsivo**
- Layout adaptável para desktop e mobile
- Cores da marca Fênix Academy
- Ícones e elementos visuais atrativos
- Call-to-actions destacados

### **Conteúdo Personalizado**
- Nome do usuário personalizado
- Informações específicas do curso/pagamento
- Links diretos para a plataforma
- Informações de contato e suporte

## 🔐 Segurança

### **Autenticação SMTP**
- Uso de senha de aplicativo do Gmail
- Conexão segura (TLS)
- Verificação de conexão antes do envio

### **Validação de Dados**
- Validação de e-mail obrigatório
- Sanitização de dados do usuário
- Tratamento de erros robusto

## 📊 Monitoramento

### **Logs de Envio**
- Log de sucesso/erro para cada e-mail
- Timestamp de envio
- Identificação do destinatário

### **Verificação de Conexão**
- API para verificar status SMTP
- Alertas em caso de problemas
- Reconexão automática

## 🚀 Integração Automática

### **Registro de Usuário**
- E-mail enviado automaticamente após registro
- Não bloqueia o processo se falhar
- Log de erro em caso de falha

### **Confirmação de Pagamento**
- E-mail enviado após liberação de acesso
- Inclui detalhes da compra
- Confirmação de acesso aos cursos

## 📈 Próximas Funcionalidades

### **E-mails Programados**
- Lembretes de curso personalizados
- E-mails de progresso semanal
- Notificações de certificados

### **Segmentação**
- E-mails baseados no perfil do usuário
- Conteúdo personalizado por curso
- A/B testing de templates

### **Analytics**
- Taxa de abertura de e-mails
- Cliques em links
- Conversões de e-mail

## 🛠️ Manutenção

### **Atualização de Templates**
- Templates em arquivos separados
- Fácil modificação de conteúdo
- Versionamento de templates

### **Configuração de Produção**
- Variáveis de ambiente para produção
- Configuração de SMTP para produção
- Monitoramento de envios

## 📞 Suporte

Para dúvidas sobre o sistema de e-mails:
- **E-mail:** contato@fenixdevacademy.com.br
- **WhatsApp:** +55 21 98628-9597
- **Documentação:** Este arquivo

---

**Fênix Dev Academy** - Sistema de E-mails Automáticos v1.0
