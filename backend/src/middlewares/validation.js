const Joi = require('joi');
const logger = require('../utils/logger');

/**
 * Middleware de validação genérico
 */
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        try {
            const { error, value } = schema.validate(req[property], {
                abortEarly: false,
                stripUnknown: true,
                allowUnknown: true
            });

            if (error) {
                const errors = error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message,
                    type: detail.type
                }));

                logger.warn('Validação falhou', {
                    errors: errors,
                    route: req.originalUrl,
                    method: req.method,
                    ip: req.ip,
                    userAgent: req.get('User-Agent')
                });

                return res.status(400).json({
                    success: false,
                    message: 'Dados de entrada inválidos.',
                    code: 'VALIDATION_ERROR',
                    errors: errors
                });
            }

            // Substituir dados validados
            req[property] = value;
            next();
        } catch (error) {
            logger.error('Erro na validação', {
                error: error.message,
                route: req.originalUrl,
                method: req.method
            });

            return res.status(500).json({
                success: false,
                message: 'Erro interno na validação.',
                code: 'VALIDATION_ERROR'
            });
        }
    };
};

/**
 * Middleware de validação de query parameters
 */
const validateQuery = (schema) => validate(schema, 'query');

/**
 * Middleware de validação de parâmetros da URL
 */
const validateParams = (schema) => validate(schema, 'params');

/**
 * Middleware de validação de headers
 */
const validateHeaders = (schema) => validate(schema, 'headers');

/**
 * Schemas de validação comuns
 */
const commonSchemas = {
    // Validação de ID MongoDB
    id: Joi.string().hex().length(24).required(),

    // Validação de email
    email: Joi.string().email().max(255).required(),

    // Validação de senha
    senha: Joi.string().min(8).max(128).required(),

    // Validação de nome
    nome: Joi.string().min(2).max(100).required(),

    // Validação de telefone
    telefone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).max(20),

    // Validação de URL
    url: Joi.string().uri().max(500),

    // Validação de data
    data: Joi.date().iso(),

    // Validação de número positivo
    numeroPositivo: Joi.number().positive(),

    // Validação de número inteiro positivo
    inteiroPositivo: Joi.number().integer().positive(),

    // Validação de paginação
    paginacao: Joi.object({
        pagina: Joi.number().integer().min(1).default(1),
        limite: Joi.number().integer().min(1).max(100).default(10),
        ordenacao: Joi.string().valid('asc', 'desc').default('desc'),
        campo: Joi.string().default('createdAt')
    }),

    // Validação de filtros de data
    filtroData: Joi.object({
        dataInicio: Joi.date().iso(),
        dataFim: Joi.date().iso().min(Joi.ref('dataInicio'))
    }),

    // Validação de busca
    busca: Joi.object({
        termo: Joi.string().min(1).max(100),
        campos: Joi.array().items(Joi.string()).max(10)
    })
};

/**
 * Schemas específicos para usuários
 */
const userSchemas = {
    // Registro de usuário
    registro: Joi.object({
        nome: commonSchemas.nome,
        email: commonSchemas.email,
        senha: commonSchemas.senha,
        telefone: commonSchemas.telefone,
        dataNascimento: commonSchemas.data,
        nivelEducacional: Joi.string().valid('fundamental', 'medio', 'superior', 'pos-graduacao', 'outro'),
        areaInteresse: Joi.array().items(
            Joi.string().valid('desenvolvimento-web', 'mobile', 'data-science', 'devops', 'design', 'marketing', 'outro')
        ).max(5),
        experienciaAnos: Joi.number().integer().min(0).max(50),
        configuracoes: Joi.object({
            notificacoesEmail: Joi.boolean(),
            notificacoesPush: Joi.boolean(),
            notificacoesSMS: Joi.boolean(),
            idioma: Joi.string().valid('pt-BR', 'en-US', 'es-ES'),
            tema: Joi.string().valid('claro', 'escuro', 'auto')
        })
    }),

    // Login
    login: Joi.object({
        email: commonSchemas.email,
        senha: commonSchemas.senha,
        lembrar: Joi.boolean()
    }),

    // Atualização de perfil
    atualizarPerfil: Joi.object({
        nome: commonSchemas.nome.optional(),
        telefone: commonSchemas.telefone.optional(),
        dataNascimento: commonSchemas.data.optional(),
        bio: Joi.string().max(500).optional(),
        nivelEducacional: Joi.string().valid('fundamental', 'medio', 'superior', 'pos-graduacao', 'outro').optional(),
        areaInteresse: Joi.array().items(
            Joi.string().valid('desenvolvimento-web', 'mobile', 'data-science', 'devops', 'design', 'marketing', 'outro')
        ).max(5).optional(),
        experienciaAnos: Joi.number().integer().min(0).max(50).optional(),
        configuracoes: Joi.object({
            notificacoesEmail: Joi.boolean().optional(),
            notificacoesPush: Joi.boolean().optional(),
            notificacoesSMS: Joi.boolean().optional(),
            idioma: Joi.string().valid('pt-BR', 'en-US', 'es-ES').optional(),
            tema: Joi.string().valid('claro', 'escuro', 'auto').optional(),
            privacidade: Joi.object({
                perfilPublico: Joi.boolean().optional(),
                mostrarProgresso: Joi.boolean().optional(),
                mostrarConquistas: Joi.boolean().optional()
            }).optional()
        }).optional()
    }),

    // Alteração de senha
    alterarSenha: Joi.object({
        senhaAtual: commonSchemas.senha,
        novaSenha: commonSchemas.senha,
        confirmarSenha: Joi.string().valid(Joi.ref('novaSenha')).required()
    }),

    // Recuperação de senha
    recuperarSenha: Joi.object({
        email: commonSchemas.email
    }),

    // Reset de senha
    resetSenha: Joi.object({
        token: Joi.string().required(),
        novaSenha: commonSchemas.senha,
        confirmarSenha: Joi.string().valid(Joi.ref('novaSenha')).required()
    })
};

/**
 * Schemas específicos para cursos
 */
const courseSchemas = {
    // Criação de curso
    criar: Joi.object({
        titulo: Joi.string().min(5).max(200).required(),
        slug: Joi.string().min(3).max(100).pattern(/^[a-z0-9-]+$/).required(),
        descricao: Joi.string().min(10).max(2000).required(),
        descricaoCompleta: Joi.string().max(5000).optional(),
        categoria: Joi.string().valid(
            'desenvolvimento-web', 'mobile', 'data-science', 'devops', 'design', 'marketing', 'negocios', 'outro'
        ).required(),
        tags: Joi.array().items(Joi.string().max(50)).max(20).optional(),
        nivel: Joi.string().valid('iniciante', 'intermediario', 'avancado', 'todos-niveis').required(),
        preco: Joi.number().min(0).required(),
        precoPromocional: Joi.number().min(0).optional(),
        dataInicioPromocao: commonSchemas.data.optional(),
        dataFimPromocao: commonSchemas.data.optional(),
        gratuito: Joi.boolean().default(false),
        imagemCapa: commonSchemas.url.required(),
        videoApresentacao: commonSchemas.url.optional(),
        ofereceCertificado: Joi.boolean().default(true),
        tipoCertificado: Joi.string().valid('participacao', 'conclusao', 'avaliacao', 'projeto').optional(),
        suporteDisponivel: Joi.boolean().default(true),
        tipoSuporte: Joi.string().valid('forum', 'email', 'chat', 'mentoria', 'outro').optional(),
        configuracoes: Joi.object({
            permiteAuditoria: Joi.boolean().default(true),
            progressoAutomatico: Joi.boolean().default(true),
            permiteDownload: Joi.boolean().default(false),
            tempoLimite: Joi.number().integer().positive().optional()
        }).optional()
    }),

    // Atualização de curso
    atualizar: Joi.object({
        titulo: Joi.string().min(5).max(200).optional(),
        descricao: Joi.string().min(10).max(2000).optional(),
        descricaoCompleta: Joi.string().max(5000).optional(),
        categoria: Joi.string().valid(
            'desenvolvimento-web', 'mobile', 'data-science', 'devops', 'design', 'marketing', 'negocios', 'outro'
        ).optional(),
        tags: Joi.array().items(Joi.string().max(50)).max(20).optional(),
        nivel: Joi.string().valid('iniciante', 'intermediario', 'avancado', 'todos-niveis').optional(),
        preco: Joi.number().min(0).optional(),
        precoPromocional: Joi.number().min(0).optional(),
        dataInicioPromocao: commonSchemas.data.optional(),
        dataFimPromocao: commonSchemas.data.optional(),
        gratuito: Joi.boolean().optional(),
        imagemCapa: commonSchemas.url.optional(),
        videoApresentacao: commonSchemas.url.optional(),
        ativo: Joi.boolean().optional(),
        emDestaque: Joi.boolean().optional(),
        lancamento: Joi.boolean().optional(),
        dataLancamento: commonSchemas.data.optional()
    }),

    // Filtros de busca
    filtros: Joi.object({
        categoria: Joi.string().valid(
            'desenvolvimento-web', 'mobile', 'data-science', 'devops', 'design', 'marketing', 'negocios', 'outro'
        ).optional(),
        nivel: Joi.string().valid('iniciante', 'intermediario', 'avancado', 'todos-niveis').optional(),
        precoMin: Joi.number().min(0).optional(),
        precoMax: Joi.number().min(0).optional(),
        gratuito: Joi.boolean().optional(),
        emDestaque: Joi.boolean().optional(),
        lancamento: Joi.boolean().optional(),
        instrutor: commonSchemas.id.optional(),
        tags: Joi.array().items(Joi.string()).optional(),
        ...commonSchemas.paginacao.keys(),
        ...commonSchemas.busca.keys()
    })
};

/**
 * Schemas específicos para módulos
 */
const moduleSchemas = {
    // Criação de módulo
    criar: Joi.object({
        titulo: Joi.string().min(3).max(200).required(),
        descricao: Joi.string().min(10).max(1000).required(),
        duracao: commonSchemas.inteiroPositivo.required(),
        ordem: commonSchemas.inteiroPositivo.required(),
        nivel: Joi.string().valid('iniciante', 'intermediario', 'avancado').default('iniciante'),
        preRequisitos: Joi.array().items(commonSchemas.id).optional()
    }),

    // Atualização de módulo
    atualizar: Joi.object({
        titulo: Joi.string().min(3).max(200).optional(),
        descricao: Joi.string().min(10).max(1000).optional(),
        duracao: commonSchemas.inteiroPositivo.optional(),
        ordem: commonSchemas.inteiroPositivo.optional(),
        nivel: Joi.string().valid('iniciante', 'intermediario', 'avancado').optional(),
        ativo: Joi.boolean().optional()
    })
};

/**
 * Schemas específicos para aulas
 */
const lessonSchemas = {
    // Criação de aula
    criar: Joi.object({
        titulo: Joi.string().min(3).max(200).required(),
        descricao: Joi.string().min(10).max(1000).required(),
        conteudo: Joi.string().min(10).required(),
        duracao: commonSchemas.inteiroPositivo.required(),
        tipo: Joi.string().valid('video', 'texto', 'interativo', 'projeto', 'avaliacao').default('texto'),
        ordem: commonSchemas.inteiroPositivo.required(),
        recursos: Joi.array().items(Joi.object({
            tipo: Joi.string().valid('video', 'pdf', 'link', 'codigo', 'imagem', 'audio').required(),
            titulo: Joi.string().max(200).required(),
            url: commonSchemas.url.required(),
            descricao: Joi.string().max(500).optional()
        })).optional(),
        exercicios: Joi.array().items(Joi.object({
            titulo: Joi.string().max(200).required(),
            descricao: Joi.string().max(1000).required(),
            tipo: Joi.string().valid('multipla-escolha', 'verdadeiro-falso', 'codigo', 'projeto', 'discussao').required(),
            questoes: Joi.array().items(Joi.object({
                pergunta: Joi.string().max(500).required(),
                opcoes: Joi.array().items(Joi.string().max(200)).min(2).optional(),
                respostaCorreta: Joi.string().max(500).required(),
                explicacao: Joi.string().max(1000).optional()
            })).min(1).required()
        })).optional()
    }),

    // Atualização de aula
    atualizar: Joi.object({
        titulo: Joi.string().min(3).max(200).optional(),
        descricao: Joi.string().min(10).max(1000).optional(),
        conteudo: Joi.string().min(10).optional(),
        duracao: commonSchemas.inteiroPositivo.optional(),
        tipo: Joi.string().valid('video', 'texto', 'interativo', 'projeto', 'avaliacao').optional(),
        ordem: commonSchemas.inteiroPositivo.optional(),
        ativo: Joi.boolean().optional()
    })
};

/**
 * Schemas específicos para inscrições
 */
const enrollmentSchemas = {
    // Criação de inscrição
    criar: Joi.object({
        curso: commonSchemas.id.required(),
        configuracoes: Joi.object({
            notificacoes: Joi.boolean().default(true),
            lembretes: Joi.boolean().default(true),
            compartilharProgresso: Joi.boolean().default(false)
        }).optional()
    }),

    // Atualização de progresso
    atualizarProgresso: Joi.object({
        moduloId: commonSchemas.id.required(),
        lessonId: commonSchemas.id.required(),
        progresso: Joi.number().min(0).max(100).required(),
        tempoAssistido: Joi.number().min(0).optional()
    }),

    // Avaliação de curso
    avaliar: Joi.object({
        nota: Joi.number().min(1).max(5).required(),
        comentario: Joi.string().max(1000).optional(),
        publica: Joi.boolean().default(false)
    })
};

/**
 * Schemas específicos para pagamentos
 */
const paymentSchemas = {
    // Criação de pagamento
    criar: Joi.object({
        curso: commonSchemas.id.optional(),
        itens: Joi.array().items(Joi.object({
            tipo: Joi.string().valid('curso', 'plano', 'mentoria', 'certificado', 'outro').required(),
            itemId: commonSchemas.id.optional(),
            titulo: Joi.string().max(200).required(),
            descricao: Joi.string().max(500).optional(),
            quantidade: Joi.number().integer().min(1).default(1),
            precoUnitario: Joi.number().min(0).required(),
            desconto: Joi.number().min(0).default(0),
            total: Joi.number().min(0).required()
        })).min(1).required(),
        subtotal: Joi.number().min(0).required(),
        desconto: Joi.number().min(0).default(0),
        taxa: Joi.number().min(0).default(0),
        total: Joi.number().min(0).required(),
        moeda: Joi.string().valid('BRL', 'USD', 'EUR').default('BRL'),
        gateway: Joi.string().valid('stripe', 'paypal', 'mercadopago', 'pix', 'boleto', 'cartao').required(),
        metodoPagamento: Joi.object({
            tipo: Joi.string().valid('cartao', 'pix', 'boleto', 'transferencia', 'outro').required(),
            detalhes: Joi.object().optional()
        }).optional(),
        assinatura: Joi.object({
            ativa: Joi.boolean().default(false),
            planoId: Joi.string().optional(),
            planoNome: Joi.string().optional(),
            ciclo: Joi.string().valid('mensal', 'trimestral', 'semestral', 'anual').optional(),
            renovacaoAutomatica: Joi.boolean().default(true)
        }).optional()
    }),

    // Atualização de status
    atualizarStatus: Joi.object({
        status: Joi.string().valid(
            'pendente', 'processando', 'aprovado', 'rejeitado', 'cancelado', 'reembolsado', 'parcialmente_reembolsado', 'falhou'
        ).required(),
        gatewayResponse: Joi.object().optional(),
        motivo: Joi.string().max(500).optional()
    })
};

/**
 * Schemas específicos para notificações
 */
const notificationSchemas = {
    // Criação de notificação
    criar: Joi.object({
        usuario: commonSchemas.id.required(),
        tipo: Joi.string().valid(
            'curso', 'sistema', 'pagamento', 'comunidade', 'mentoria', 'certificado', 'lembrete', 'marketing', 'outro'
        ).required(),
        categoria: Joi.string().valid('info', 'sucesso', 'aviso', 'erro', 'urgente').default('info'),
        titulo: Joi.string().min(1).max(200).required(),
        mensagem: Joi.string().min(1).max(1000).required(),
        conteudo: Joi.string().max(5000).optional(),
        dados: Joi.object({
            cursoId: commonSchemas.id.optional(),
            moduloId: commonSchemas.id.optional(),
            aulaId: commonSchemas.id.optional(),
            pagamentoId: commonSchemas.id.optional(),
            url: commonSchemas.url.optional(),
            acao: Joi.string().max(100).optional(),
            metadados: Joi.object().optional()
        }).optional(),
        prioridade: Joi.string().valid('baixa', 'normal', 'alta', 'urgente').default('normal'),
        agendada: Joi.boolean().default(false),
        dataAgendamento: commonSchemas.data.optional(),
        canais: Joi.array().items(Joi.object({
            tipo: Joi.string().valid('email', 'sms', 'push', 'in-app', 'webhook').required(),
            status: Joi.string().valid('pendente', 'enviada', 'falhou', 'cancelada').default('pendente')
        })).optional(),
        configuracoes: Joi.object({
            persistir: Joi.boolean().default(true),
            expiraEm: Joi.number().integer().min(1).default(30),
            agrupar: Joi.boolean().default(false),
            grupoId: Joi.string().optional()
        }).optional(),
        tags: Joi.array().items(Joi.string().max(50)).optional()
    }),

    // Filtros de busca
    filtros: Joi.object({
        tipo: Joi.string().valid(
            'curso', 'sistema', 'pagamento', 'comunidade', 'mentoria', 'certificado', 'lembrete', 'marketing', 'outro'
        ).optional(),
        categoria: Joi.string().valid('info', 'sucesso', 'aviso', 'erro', 'urgente').optional(),
        lida: Joi.boolean().optional(),
        prioridade: Joi.string().valid('baixa', 'normal', 'alta', 'urgente').optional(),
        ...commonSchemas.paginacao.keys()
    })
};

/**
 * Função para criar schema customizado
 */
const createCustomSchema = (baseSchema, customFields) => {
    return baseSchema.keys(customFields);
};

/**
 * Função para validar dados sem middleware
 */
const validateData = (data, schema) => {
    const { error, value } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true
    });

    return { error, value };
};

module.exports = {
    validate,
    validateQuery,
    validateParams,
    validateHeaders,
    commonSchemas,
    userSchemas,
    courseSchemas,
    moduleSchemas,
    lessonSchemas,
    enrollmentSchemas,
    paymentSchemas,
    notificationSchemas,
    createCustomSchema,
    validateData
};



