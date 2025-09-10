const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    // Destinatário
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Usuário destinatário é obrigatório']
    },

    // Tipo e categoria
    tipo: {
        type: String,
        enum: [
            'curso',
            'sistema',
            'pagamento',
            'comunidade',
            'mentoria',
            'certificado',
            'lembrete',
            'marketing',
            'outro'
        ],
        required: [true, 'Tipo de notificação é obrigatório']
    },

    categoria: {
        type: String,
        enum: [
            'info',
            'sucesso',
            'aviso',
            'erro',
            'urgente'
        ],
        default: 'info'
    },

    // Conteúdo
    titulo: {
        type: String,
        required: [true, 'Título da notificação é obrigatório'],
        maxlength: [200, 'Título não pode ter mais de 200 caracteres']
    },

    mensagem: {
        type: String,
        required: [true, 'Mensagem da notificação é obrigatória'],
        maxlength: [1000, 'Mensagem não pode ter mais de 1000 caracteres']
    },

    conteudo: {
        type: String,
        maxlength: [5000, 'Conteúdo não pode ter mais de 5000 caracteres']
    },

    // Dados relacionados
    dados: {
        cursoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        moduloId: mongoose.Schema.Types.ObjectId,
        aulaId: mongoose.Schema.Types.ObjectId,
        pagamentoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment'
        },
        url: String,
        acao: String,
        metadados: mongoose.Schema.Types.Mixed
    },

    // Status e leitura
    lida: {
        type: Boolean,
        default: false
    },

    dataLeitura: Date,

    // Prioridade
    prioridade: {
        type: String,
        enum: ['baixa', 'normal', 'alta', 'urgente'],
        default: 'normal'
    },

    // Agendamento
    agendada: {
        type: Boolean,
        default: false
    },

    dataAgendamento: Date,

    dataEnvio: Date,

    // Canais de envio
    canais: [{
        tipo: {
            type: String,
            enum: ['email', 'sms', 'push', 'in-app', 'webhook'],
            required: true
        },
        status: {
            type: String,
            enum: ['pendente', 'enviada', 'falhou', 'cancelada'],
            default: 'pendente'
        },
        tentativas: {
            type: Number,
            default: 0
        },
        dataEnvio: Date,
        dataFalha: Date,
        erro: String,
        resposta: mongoose.Schema.Types.Mixed
    }],

    // Configurações
    configuracoes: {
        persistir: {
            type: Boolean,
            default: true
        },
        expiraEm: {
            type: Number, // dias
            default: 30
        },
        agrupar: {
            type: Boolean,
            default: false
        },
        grupoId: String,
        repetir: {
            ativo: {
                type: Boolean,
                default: false
            },
            intervalo: {
                type: String,
                enum: ['diario', 'semanal', 'mensal']
            },
            frequencia: Number,
            dataFim: Date
        }
    },

    // Metadados
    tags: [String],
    localizacao: {
        pais: String,
        estado: String,
        cidade: String
    },

    // Campos de auditoria
    criadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    modificadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Índices para performance
notificationSchema.index({ usuario: 1, lida: 1 });
notificationSchema.index({ usuario: 1, createdAt: -1 });
notificationSchema.index({ tipo: 1, categoria: 1 });
notificationSchema.index({ prioridade: 1 });
notificationSchema.index({ agendada: 1, dataAgendamento: 1 });
notificationSchema.index({ 'canais.status': 1 });
notificationSchema.index({ tags: 1 });
notificationSchema.index({ dataEnvio: -1 });

// Campos virtuais
notificationSchema.virtual('tempoDecorrido').get(function () {
    const agora = new Date();
    const criacao = new Date(this.createdAt);
    const diffTime = Math.abs(agora - criacao);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.ceil(diffTime / (1000 * 60));
            return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
        }
        return `${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    }

    if (diffDays === 1) return '1 dia';
    if (diffDays < 7) return `${diffDays} dias`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;

    return `${Math.floor(diffDays / 365)} ano${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
});

notificationSchema.virtual('podeEnviar').get(function () {
    if (this.agendada && this.dataAgendamento > new Date()) {
        return false;
    }

    if (this.configuracoes.expiraEm) {
        const dataExpiracao = new Date(this.createdAt);
        dataExpiracao.setDate(dataExpiracao.getDate() + this.configuracoes.expiraEm);

        if (new Date() > dataExpiracao) {
            return false;
        }
    }

    return true;
});

notificationSchema.virtual('statusEnvio').get(function () {
    if (this.canais.length === 0) return 'pendente';

    const enviadas = this.canais.filter(c => c.status === 'enviada').length;
    const falharam = this.canais.filter(c => c.status === 'falhou').length;
    const pendentes = this.canais.filter(c => c.status === 'pendente').length;

    if (falharam === this.canais.length) return 'falhou';
    if (enviadas === this.canais.length) return 'enviada';
    if (enviadas > 0) return 'parcial';

    return 'pendente';
});

// Middleware pré-save
notificationSchema.pre('save', function (next) {
    // Definir data de envio se não foi agendada
    if (!this.agendada && !this.dataEnvio) {
        this.dataEnvio = new Date();
    }

    // Configurar canais padrão se não especificados
    if (this.canais.length === 0) {
        this.canais = [
            { tipo: 'in-app', status: 'pendente' }
        ];
    }

    next();
});

// Middleware pré-remove
notificationSchema.pre('remove', function (next) {
    // Limpar notificações relacionadas se configurado para persistir
    if (this.configuracoes.persistir) {
        // Implementar lógica de limpeza se necessário
    }

    next();
});

// Métodos de instância
notificationSchema.methods.marcarComoLida = function () {
    this.lida = true;
    this.dataLeitura = new Date();
    return this.save();
};

notificationSchema.methods.marcarComoNaoLida = function () {
    this.lida = false;
    this.dataLeitura = null;
    return this.save();
};

notificationSchema.methods.enviarPorCanal = function (tipoCanal, dados = {}) {
    const canal = this.canais.find(c => c.tipo === tipoCanal);
    if (!canal) {
        throw new Error(`Canal ${tipoCanal} não encontrado`);
    }

    canal.status = 'enviada';
    canal.dataEnvio = new Date();
    canal.resposta = dados;

    return this.save();
};

notificationSchema.methods.falharEnvio = function (tipoCanal, erro) {
    const canal = this.canais.find(c => c.tipo === tipoCanal);
    if (!canal) {
        throw new Error(`Canal ${tipoCanal} não encontrado`);
    }

    canal.status = 'falhou';
    canal.tentativas += 1;
    canal.dataFalha = new Date();
    canal.erro = erro;

    return this.save();
};

notificationSchema.methods.reagendar = function (novaData) {
    this.agendada = true;
    this.dataAgendamento = novaData;
    this.dataEnvio = null;

    // Resetar status dos canais
    this.canais.forEach(canal => {
        canal.status = 'pendente';
        canal.dataEnvio = null;
        canal.dataFalha = null;
        canal.erro = null;
    });

    return this.save();
};

notificationSchema.methods.cancelar = function () {
    this.canais.forEach(canal => {
        if (canal.status === 'pendente') {
            canal.status = 'cancelada';
        }
    });

    return this.save();
};

notificationSchema.methods.duplicar = function (novoUsuario) {
    const novaNotificacao = new this.constructor({
        ...this.toObject(),
        _id: undefined,
        usuario: novoUsuario,
        lida: false,
        dataLeitura: null,
        dataEnvio: null,
        canais: this.canais.map(canal => ({
            ...canal.toObject(),
            _id: undefined,
            status: 'pendente',
            dataEnvio: null,
            dataFalha: null,
            erro: null
        }))
    });

    return novaNotificacao.save();
};

// Métodos estáticos
notificationSchema.statics.criarParaUsuario = function (usuarioId, dados) {
    return this.create({
        usuario: usuarioId,
        ...dados
    });
};

notificationSchema.statics.criarParaMultiplosUsuarios = function (usuarioIds, dados) {
    const notificacoes = usuarioIds.map(usuarioId => ({
        usuario: usuarioId,
        ...dados
    }));

    return this.insertMany(notificacoes);
};

notificationSchema.statics.criarSistema = function (usuarioId, titulo, mensagem, dados = {}) {
    return this.create({
        usuario: usuarioId,
        tipo: 'sistema',
        categoria: 'info',
        titulo,
        mensagem,
        dados,
        prioridade: 'normal'
    });
};

notificationSchema.statics.criarCurso = function (usuarioId, titulo, mensagem, cursoId, dados = {}) {
    return this.create({
        usuario: usuarioId,
        tipo: 'curso',
        categoria: 'info',
        titulo,
        mensagem,
        dados: {
            ...dados,
            cursoId
        },
        prioridade: 'normal'
    });
};

notificationSchema.statics.criarPagamento = function (usuarioId, titulo, mensagem, pagamentoId, dados = {}) {
    return this.create({
        usuario: usuarioId,
        tipo: 'pagamento',
        categoria: 'info',
        titulo,
        mensagem,
        dados: {
            ...dados,
            pagamentoId
        },
        prioridade: 'alta'
    });
};

notificationSchema.statics.buscarPorUsuario = function (usuarioId, opcoes = {}) {
    const query = { usuario: usuarioId };

    if (opcoes.naoLidas !== undefined) {
        query.lida = !opcoes.naoLidas;
    }

    if (opcoes.tipo) {
        query.tipo = opcoes.tipo;
    }

    if (opcoes.categoria) {
        query.categoria = opcoes.categoria;
    }

    return this.find(query)
        .sort({ createdAt: -1 })
        .limit(opcoes.limite || 50);
};

notificationSchema.statics.buscarNaoLidas = function (usuarioId) {
    return this.find({ usuario: usuarioId, lida: false })
        .sort({ prioridade: -1, createdAt: -1 });
};

notificationSchema.statics.buscarAgendadas = function () {
    const agora = new Date();
    return this.find({
        agendada: true,
        dataAgendamento: { $lte: agora }
    });
};

notificationSchema.statics.buscarPorTipo = function (tipo, opcoes = {}) {
    const query = { tipo };

    if (opcoes.categoria) {
        query.categoria = opcoes.categoria;
    }

    if (opcoes.dataInicio) {
        query.createdAt = { $gte: opcoes.dataInicio };
    }

    if (opcoes.dataFim) {
        query.createdAt = { ...query.createdAt, $lte: opcoes.dataFim };
    }

    return this.find(query).sort({ createdAt: -1 });
};

notificationSchema.statics.estatisticas = function (usuarioId, periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { usuario: mongoose.Types.ObjectId(usuarioId), createdAt: { $gte: dataLimite } } },
        {
            $group: {
                _id: '$tipo',
                total: { $sum: 1 },
                lidas: { $sum: { $cond: ['$lida', 1, 0] } },
                naoLidas: { $sum: { $cond: ['$lida', 0, 1] } }
            }
        },
        { $sort: { total: -1 } }
    ]);
};

notificationSchema.statics.limparAntigas = function (dias = 90) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    return this.deleteMany({
        createdAt: { $lt: dataLimite },
        lida: true,
        'configuracoes.persistir': false
    });
};

// Métodos de consulta
notificationSchema.query.porUsuario = function (usuarioId) {
    return this.where({ usuario: usuarioId });
};

notificationSchema.query.naoLidas = function () {
    return this.where({ lida: false });
};

notificationSchema.query.porTipo = function (tipo) {
    return this.where({ tipo: tipo });
};

notificationSchema.query.porCategoria = function (categoria) {
    return this.where({ categoria: categoria });
};

notificationSchema.query.agendadas = function () {
    return this.where({ agendada: true });
};

// Exportar modelo
module.exports = mongoose.model('Notification', notificationSchema);



