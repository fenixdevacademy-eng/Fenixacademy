# Guia dos Super Usuários - Fenix Academy

## Visão Geral

Este guia explica como criar e gerenciar super usuários para a Fenix Academy, garantindo que eles tenham acesso gratuito a todos os cursos.

## Super Usuários Configurados

### 1. Cezar Camaralins
- **Email**: cezarcamaralins0607@gmail.com
- **Senha**: cezarmarketing75
- **Username**: cezarcamaralins
- **Função**: Marketing

### 2. CEO Fenix
- **Email**: ls9229613@gmail.com
- **Senha**: CEO798
- **Username**: ceofenix
- **Função**: CEO

### 3. Robert de Moraes
- **Email**: robertdemoraes@gmail.com
- **Senha**: obrabo
- **Username**: robertdemoraes
- **Função**: Desenvolvimento

## Permissões dos Super Usuários

### Permissões Administrativas
- ✅ Acesso total ao painel administrativo
- ✅ Gerenciamento de usuários
- ✅ Gerenciamento de cursos
- ✅ Relatórios avançados
- ✅ Configurações do sistema

### Permissões de Cursos
- ✅ Acesso gratuito a TODOS os cursos
- ✅ Downloads de recursos
- ✅ Exercícios práticos
- ✅ Quizzes de avaliação
- ✅ Certificados premium
- ✅ Suporte prioritário

### Status da Assinatura
- **Plano**: Premium
- **Duração**: 10 anos
- **Status**: Ativo
- **Pagamento**: Gratuito (concedido por admin)

## Como Criar Super Usuários

### Opção 1: Comando Django (Recomendado)

#### Windows
```bash
cd backend
create_superusers.bat
```

#### Linux/Mac
```bash
cd backend
chmod +x create_superusers.sh
./create_superusers.sh
```

#### Manual
```bash
cd backend
python manage.py create_superusers
```

### Opção 2: Script Python Standalone
```bash
cd backend
python scripts/create_superusers.py
```

## Como Atualizar Acesso dos Super Usuários

### Para Usuários Existentes

#### Windows
```bash
cd backend
update_superusers_access.bat
```

#### Linux/Mac
```bash
cd backend
chmod +x update_superusers_access.sh
./update_superusers_access.sh
```

#### Manual
```bash
cd backend
python manage.py update_superusers_access
```

### Para Usuários Específicos
```bash
python manage.py update_superusers_access --emails cezarcamaralins0607@gmail.com ls9229613@gmail.com
```

## Verificação de Acesso

### 1. Login no Sistema
- Acesse a página de login
- Use as credenciais dos super usuários
- Verifique se o login é bem-sucedido

### 2. Verificar Permissões
- Acesse o painel administrativo
- Verifique se todas as funcionalidades estão disponíveis
- Confirme o status "Super Admin"

### 3. Verificar Acesso aos Cursos
- Acesse a página de cursos
- Verifique se todos os cursos estão disponíveis
- Teste o acesso ao conteúdo premium

### 4. Verificar Matrículas
```bash
python manage.py shell
```
```python
from django.contrib.auth import get_user_model
from courses.models import Enrollment

User = get_user_model()
user = User.objects.get(email='cezarcamaralins0607@gmail.com')
enrollments = Enrollment.objects.filter(user=user)
print(f"Matrículas: {enrollments.count()}")
for enrollment in enrollments:
    print(f"- {enrollment.course.title}: {enrollment.payment_status}")
```

## Estrutura de Matrículas

### Campos das Matrículas Gratuitas
- **status**: 'active'
- **payment_status**: 'free'
- **payment_amount**: 0.00
- **payment_method**: 'admin_granted'
- **notes**: 'Acesso gratuito concedido por super usuário'

### Verificação no Banco de Dados
```sql
SELECT 
    u.email,
    u.is_superuser,
    u.subscription_status,
    COUNT(e.id) as total_enrollments,
    COUNT(CASE WHEN e.payment_status = 'free' THEN 1 END) as free_enrollments
FROM users u
LEFT JOIN courses_enrollment e ON u.id = e.user_id
WHERE u.email IN (
    'cezarcamaralins0607@gmail.com',
    'ls9229613@gmail.com',
    'robertdemoraes@gmail.com'
)
GROUP BY u.id, u.email, u.is_superuser, u.subscription_status;
```

## Troubleshooting

### Problema: Usuário não consegue fazer login
**Solução**:
1. Verificar se o usuário foi criado corretamente
2. Verificar se o email está correto
3. Verificar se a senha está correta
4. Verificar se o usuário está ativo

### Problema: Usuário não tem acesso aos cursos
**Solução**:
1. Executar o comando de atualização de acesso
2. Verificar se as matrículas foram criadas
3. Verificar o status da assinatura

### Problema: Erro ao criar super usuário
**Solução**:
1. Verificar se o Django está configurado corretamente
2. Verificar se o banco de dados está acessível
3. Verificar se os modelos estão migrados

### Problema: Erro ao conceder acesso aos cursos
**Solução**:
1. Verificar se o modelo de cursos existe
2. Verificar se há cursos publicados
3. Verificar se o modelo de matrículas existe

## Logs e Monitoramento

### Verificar Logs de Criação
```bash
python manage.py create_superusers --verbosity=2
```

### Verificar Logs de Atualização
```bash
python manage.py update_superusers_access --verbosity=2
```

### Monitorar Acesso
```python
# No shell do Django
from django.contrib.auth import get_user_model
from courses.models import Enrollment

User = get_user_model()

# Verificar super usuários
superusers = User.objects.filter(is_superuser=True)
for user in superusers:
    enrollments = Enrollment.objects.filter(user=user)
    print(f"{user.email}: {enrollments.count()} matrículas")
```

## Segurança

### Boas Práticas
1. **Senhas Fortes**: Use senhas complexas em produção
2. **Acesso Limitado**: Restrinja o acesso apenas aos necessários
3. **Logs**: Mantenha logs de todas as ações administrativas
4. **Backup**: Faça backup regular dos dados
5. **Monitoramento**: Monitore o acesso dos super usuários

### Recomendações
- Altere as senhas após o primeiro login
- Use autenticação de dois fatores se possível
- Monitore regularmente o acesso
- Mantenha as credenciais seguras

## Próximos Passos

### Após Criar os Super Usuários
1. **Teste o Login**: Verifique se todos conseguem fazer login
2. **Teste o Acesso**: Verifique acesso aos cursos e funcionalidades
3. **Configure Preferências**: Configure idioma e outras preferências
4. **Teste o Admin**: Verifique acesso ao painel administrativo
5. **Documente**: Mantenha registro das configurações

### Manutenção Regular
1. **Verificar Acesso**: Mensalmente
2. **Atualizar Senhas**: Trimestralmente
3. **Revisar Permissões**: Semestralmente
4. **Backup**: Semanalmente

## Arquivos Relacionados

- `backend/users/management/commands/create_superusers.py`: Comando de criação
- `backend/users/management/commands/update_superusers_access.py`: Comando de atualização
- `backend/scripts/create_superusers.py`: Script standalone
- `backend/create_superusers.bat`: Script Windows
- `backend/create_superusers.sh`: Script Linux/Mac
- `backend/update_superusers_access.bat`: Script Windows para atualização
- `backend/update_superusers_access.sh`: Script Linux/Mac para atualização

## Suporte

Para dúvidas ou problemas:
1. Verifique os logs de erro
2. Execute os comandos com `--verbosity=2`
3. Verifique a documentação do Django
4. Consulte a equipe de desenvolvimento 