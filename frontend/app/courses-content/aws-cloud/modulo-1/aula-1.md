# Introdução ao Cloud Computing e AWS

## O que é Cloud Computing?

Cloud Computing (Computação em Nuvem) é um modelo de entrega de recursos de computação como serviços através da internet. Em vez de comprar e manter hardware físico, você pode acessar recursos de computação sob demanda.

### Características principais do Cloud Computing:

- **On-demand self-service**: Acesso automático aos recursos sem intervenção humana
- **Broad network access**: Acesso através de dispositivos padrão (móveis, tablets, laptops)
- **Resource pooling**: Recursos compartilhados entre múltiplos usuários
- **Rapid elasticity**: Capacidade de escalar rapidamente para cima ou para baixo
- **Measured service**: Uso monitorado e cobrado conforme o consumo

## Modelos de Serviço

### 1. IaaS (Infrastructure as a Service)
- **O que oferece**: Infraestrutura básica (servidores, storage, networking)
- **Controle**: Máximo controle sobre a infraestrutura
- **Responsabilidade**: Cliente gerencia OS, aplicações, dados
- **Exemplos**: Amazon EC2, Google Compute Engine, Microsoft Azure VMs

### 2. PaaS (Platform as a Service)
- **O que oferece**: Plataforma para desenvolvimento e deploy de aplicações
- **Controle**: Controle sobre aplicações e configurações
- **Responsabilidade**: Provedor gerencia infraestrutura e runtime
- **Exemplos**: AWS Elastic Beanstalk, Google App Engine, Heroku

### 3. SaaS (Software as a Service)
- **O que oferece**: Aplicações completas prontas para uso
- **Controle**: Apenas configurações da aplicação
- **Responsabilidade**: Provedor gerencia tudo
- **Exemplos**: Gmail, Salesforce, Dropbox

## Modelos de Deployment

### 1. Cloud Pública
- Recursos disponíveis publicamente
- Propriedade de terceiros
- Economia de escala
- Exemplos: AWS, Google Cloud, Microsoft Azure

### 2. Cloud Privada
- Recursos exclusivos para uma organização
- Maior controle e segurança
- Custos mais altos
- Pode ser on-premises ou gerenciada por terceiros

### 3. Cloud Híbrida
- Combinação de cloud pública e privada
- Flexibilidade para mover cargas de trabalho
- Otimização de custos
- Maior complexidade de gerenciamento

## Vantagens do Cloud Computing

### 1. Custos Reduzidos
- **Sem investimento inicial**: Não precisa comprar hardware
- **Pay-as-you-go**: Pague apenas pelo que usar
- **Economia de escala**: Provedores têm custos menores

### 2. Agilidade e Velocidade
- **Deploy rápido**: Recursos disponíveis em minutos
- **Experimentos fáceis**: Teste ideias sem compromisso
- **Time-to-market**: Lance produtos mais rapidamente

### 3. Escalabilidade
- **Auto-scaling**: Ajuste automático baseado na demanda
- **Elasticidade**: Escale para cima ou para baixo conforme necessário
- **Global reach**: Deploy em múltiplas regiões

### 4. Confiabilidade
- **Redundância**: Múltiplas cópias dos dados
- **Disaster recovery**: Recuperação rápida de falhas
- **Uptime garantido**: SLAs de disponibilidade

## Introdução à Amazon Web Services (AWS)

AWS é a plataforma de cloud computing mais popular do mundo, oferecendo mais de 200 serviços completos de data centers globais.

### Por que escolher AWS?

1. **Liderança de mercado**: Maior market share em cloud computing
2. **Ampla gama de serviços**: Mais de 200 serviços disponíveis
3. **Presença global**: Data centers em múltiplas regiões
4. **Segurança**: Conformidade com padrões internacionais
5. **Inovação contínua**: Novos serviços lançados regularmente

### Principais categorias de serviços AWS:

#### 1. Computação
- **EC2 (Elastic Compute Cloud)**: Servidores virtuais
- **Lambda**: Computação serverless
- **ECS/EKS**: Containers e Kubernetes

#### 2. Armazenamento
- **S3 (Simple Storage Service)**: Armazenamento de objetos
- **EBS (Elastic Block Store)**: Volumes de disco
- **Glacier**: Armazenamento de longo prazo

#### 3. Banco de Dados
- **RDS**: Bancos relacionais gerenciados
- **DynamoDB**: Banco NoSQL
- **ElastiCache**: Cache em memória

#### 4. Rede
- **VPC (Virtual Private Cloud)**: Redes privadas
- **Route 53**: DNS gerenciado
- **CloudFront**: CDN global

#### 5. Segurança
- **IAM (Identity and Access Management)**: Controle de acesso
- **KMS (Key Management Service)**: Gerenciamento de chaves
- **CloudTrail**: Auditoria de API

## Arquitetura Global da AWS

### Regiões (Regions)
- **Definição**: Localizações geográficas com data centers
- **Exemplos**: us-east-1 (N. Virginia), eu-west-1 (Ireland)
- **Características**: Isolamento geográfico, conformidade local

### Zonas de Disponibilidade (Availability Zones)
- **Definição**: Data centers isolados dentro de uma região
- **Características**: Baixa latência, alta disponibilidade
- **Uso**: Deploy de aplicações altamente disponíveis

### Edge Locations
- **Definição**: Pontos de presença para CDN
- **Serviços**: CloudFront, Route 53
- **Benefício**: Redução de latência para usuários finais

## Casos de Uso Comuns

### 1. Startups
- **Benefícios**: Baixo custo inicial, escalabilidade
- **Serviços**: EC2, S3, RDS, CloudFront

### 2. Empresas Estabelecidas
- **Benefícios**: Migração gradual, otimização de custos
- **Serviços**: VPC, Direct Connect, AWS Organizations

### 3. Aplicações Web
- **Benefícios**: Alta disponibilidade, performance global
- **Serviços**: ELB, Auto Scaling, CloudWatch

### 4. Big Data e Analytics
- **Benefícios**: Processamento distribuído, storage ilimitado
- **Serviços**: EMR, Redshift, Athena

## Custos e Otimização

### Modelo de Preços AWS
- **Pay-as-you-go**: Pague apenas pelo que usar
- **Reserved Instances**: Desconto para uso de longo prazo
- **Spot Instances**: Preços baixos para capacidade não utilizada

### Estratégias de Otimização
1. **Right-sizing**: Escolha instâncias adequadas
2. **Auto-scaling**: Ajuste automático baseado na demanda
3. **Reserved Instances**: Planeje uso de longo prazo
4. **Spot Instances**: Use para cargas de trabalho flexíveis

## Segurança e Compliance

### Modelo de Responsabilidade Compartilhada
- **AWS**: Segurança da nuvem (infraestrutura)
- **Cliente**: Segurança na nuvem (dados, aplicações)

### Certificações e Compliance
- **ISO 27001**: Gestão de segurança da informação
- **SOC 1/2/3**: Relatórios de controle
- **PCI DSS**: Padrão de segurança para pagamentos
- **HIPAA**: Conformidade para saúde

## Próximos Passos

Na próxima aula, vamos:
- Explorar a estrutura global da AWS
- Entender regiões e zonas de disponibilidade
- Configurar uma conta AWS
- Navegar pelo console AWS

## Exercícios Práticos

1. **Pesquisa**: Compare AWS com outros provedores de cloud (Azure, GCP)
2. **Análise**: Identifique serviços AWS que você já usa indiretamente
3. **Planejamento**: Pense em um projeto que poderia usar AWS

## Recursos Adicionais
- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) 
