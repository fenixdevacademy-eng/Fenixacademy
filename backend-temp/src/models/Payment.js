const mongoose = require('mongoose');

const paymentItemSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['curso', 'plano', 'mentoria', 'certificado', 'outro'],
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'paymentItems.tipo'
    },
    titulo: {
        type: String,
        required: true
    },
    descricao: String,
    quantidade: {
        type: Number,
        default: 1,
        min: 1
    },
    precoUnitario: {
        type: Number,
        required: true,
        min: 0
    },
    desconto: {
        type: Number,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

const paymentSchema = new mongoose.Schema({
    // Identificação
    numeroPedido: {
        type: String,
        required: true,
        unique: true
    },
    referencia: {
        type: String,
        required: true,
        unique: true
    },

    // Relacionamentos
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Usuário é obrigatório']
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },

    // Itens do pagamento
    itens: [paymentItemSchema],

    // Valores
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    desconto: {
        type: Number,
        default: 0,
        min: 0
    },
    taxa: {
        type: Number,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    moeda: {
        type: String,
        default: 'BRL',
        enum: ['BRL', 'USD', 'EUR']
    },

    // Status do pagamento
    status: {
        type: String,
        enum: [
            'pendente',
            'processando',
            'aprovado',
            'rejeitado',
            'cancelado',
            'reembolsado',
            'parcialmente_reembolsado',
            'falhou'
        ],
        default: 'pendente'
    },

    // Gateway de pagamento
    gateway: {
        type: String,
        required: true,
        enum: ['stripe', 'paypal', 'mercadopago', 'pix', 'boleto', 'cartao']
    },
    gatewayId: String,
    gatewayStatus: String,
    gatewayResponse: mongoose.Schema.Types.Mixed,

    // Informações de pagamento
    metodoPagamento: {
        tipo: {
            type: String,
            enum: ['cartao', 'pix', 'boleto', 'transferencia', 'outro']
        },
        detalhes: mongoose.Schema.Types.Mixed
    },

    // Assinatura (se aplicável)
    assinatura: {
        ativa: {
            type: Boolean,
            default: false
        },
        planoId: String,
        planoNome: String,
        ciclo: {
            type: String,
            enum: ['mensal', 'trimestral', 'semestral', 'anual']
        },
        dataInicio: Date,
        dataFim: Date,
        renovacaoAutomatica: {
            type: Boolean,
            default: true
        },
        proximaCobranca: Date
    },

    // Datas importantes
    dataPagamento: Date,
    dataVencimento: Date,
    dataCancelamento: Date,
    dataReembolso: Date,

    // Notificações
    notificacoes: [{
        tipo: {
            type: String,
            enum: ['email', 'sms', 'push', 'webhook']
        },
        status: {
            type: String,
            enum: ['pendente', 'enviada', 'falhou']
        },
        tentativas: {
            type: Number,
            default: 0
        },
        dataEnvio: Date,
        resposta: String
    }],

    // Metadados
    ipPagamento: String,
    userAgent: String,
    dispositivo: String,
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
paymentSchema.index({ numeroPedido: 1 });
paymentSchema.index({ referencia: 1 });
paymentSchema.index({ usuario: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ gateway: 1, gatewayId: 1 });
paymentSchema.index({ dataPagamento: -1 });
paymentSchema.index({ 'assinatura.ativa': 1 });
paymentSchema.index({ 'assinatura.proximaCobranca': 1 });

// Campos virtuais
paymentSchema.virtual('totalComTaxa').get(function () {
    return this.total + this.taxa;
});

paymentSchema.virtual('descontoPercentual').get(function () {
    if (this.subtotal === 0) return 0;
    return Math.round((this.desconto / this.subtotal) * 100);
});

paymentSchema.virtual('statusLegivel').get(function () {
    const statusMap = {
        'pendente': 'Pendente',
        'processando': 'Processando',
        'aprovado': 'Aprovado',
        'rejeitado': 'Rejeitado',
        'cancelado': 'Cancelado',
        'reembolsado': 'Reembolsado',
        'parcialmente_reembolsado': 'Parcialmente Reembolsado',
        'falhou': 'Falhou'
    };
    return statusMap[this.status] || this.status;
});

paymentSchema.virtual('podeCancelar').get(function () {
    return ['pendente', 'processando', 'aprovado'].includes(this.status);
});

paymentSchema.virtual('podeReembolsar').get(function () {
    return this.status === 'aprovado' && !this.dataReembolso;
});

paymentSchema.virtual('diasVencimento').get(function () {
    if (!this.dataVencimento) return null;

    const hoje = new Date();
    const vencimento = new Date(this.dataVencimento);
    const diffTime = vencimento - hoje;

    if (diffTime <= 0) return 0;

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Middleware pré-save
paymentSchema.pre('save', function (next) {
    // Gerar número do pedido se não existir
    if (!this.numeroPedido) {
        this.numeroPedido = this.gerarNumeroPedido();
    }

    // Gerar referência se não existir
    if (!this.referencia) {
        this.referencia = this.gerarReferencia();
    }

    // Calcular total se não foi definido
    if (!this.total) {
        this.total = this.subtotal - this.desconto + this.taxa;
    }

    next();
});

// Métodos de instância
paymentSchema.methods.gerarNumeroPedido = function () {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `PED-${timestamp.slice(-8)}-${random}`;
};

paymentSchema.methods.gerarReferencia = function () {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 8).toUpperCase();
    return `REF-${timestamp.slice(-6)}-${random}`;
};

paymentSchema.methods.aprovar = function (gatewayResponse = {}) {
    this.status = 'aprovado';
    this.dataPagamento = new Date();
    this.gatewayResponse = gatewayResponse;

    // Se for assinatura, configurar datas
    if (this.assinatura && this.assinatura.ativa) {
        this.assinatura.dataInicio = new Date();
        this.configurarProximaCobranca();
    }

    return this.save();
};

paymentSchema.methods.rejeitar = function (motivo, gatewayResponse = {}) {
    this.status = 'rejeitado';
    this.gatewayResponse = { ...gatewayResponse, motivo };
    return this.save();
};

paymentSchema.methods.cancelar = function (motivo) {
    if (!this.podeCancelar) {
        throw new Error('Pagamento não pode ser cancelado');
    }

    this.status = 'cancelado';
    this.dataCancelamento = new Date();
    this.gatewayResponse = { ...this.gatewayResponse, motivoCancelamento: motivo };

    // Cancelar assinatura se existir
    if (this.assinatura && this.assinatura.ativa) {
        this.assinatura.ativa = false;
        this.assinatura.renovacaoAutomatica = false;
    }

    return this.save();
};

paymentSchema.methods.reembolsar = function (valor, motivo) {
    if (!this.podeReembolsar) {
        throw new Error('Pagamento não pode ser reembolsado');
    }

    const valorReembolso = valor || this.total;

    if (valorReembolso === this.total) {
        this.status = 'reembolsado';
    } else {
        this.status = 'parcialmente_reembolsado';
    }

    this.dataReembolso = new Date();
    this.gatewayResponse = {
        ...this.gatewayResponse,
        reembolso: { valor: valorReembolso, motivo, data: new Date() }
    };

    return this.save();
};

paymentSchema.methods.configurarProximaCobranca = function () {
    if (!this.assinatura || !this.assinatura.ativa) return;

    const hoje = new Date();
    let proximaCobranca = new Date(hoje);

    switch (this.assinatura.ciclo) {
        case 'mensal':
            proximaCobranca.setMonth(proximaCobranca.getMonth() + 1);
            break;
        case 'trimestral':
            proximaCobranca.setMonth(proximaCobranca.getMonth() + 3);
            break;
        case 'semestral':
            proximaCobranca.setMonth(proximaCobranca.getMonth() + 6);
            break;
        case 'anual':
            proximaCobranca.setFullYear(proximaCobranca.getFullYear() + 1);
            break;
    }

    this.assinatura.proximaCobranca = proximaCobranca;
};

paymentSchema.methods.adicionarNotificacao = function (tipo, status = 'pendente') {
    this.notificacoes.push({
        tipo,
        status,
        tentativas: 0,
        dataEnvio: new Date()
    });

    return this.save();
};

paymentSchema.methods.atualizarNotificacao = function (tipo, status, resposta = '') {
    const notificacao = this.notificacoes.find(n => n.tipo === tipo);
    if (notificacao) {
        notificacao.status = status;
        notificacao.resposta = resposta;
        if (status === 'falhou') {
            notificacao.tentativas += 1;
        }
    }

    return this.save();
};

// Métodos estáticos
paymentSchema.statics.buscarPorUsuario = function (usuarioId) {
    return this.find({ usuario: usuarioId })
        .populate('curso', 'titulo slug imagemCapa')
        .sort({ createdAt: -1 });
};

paymentSchema.statics.buscarPorStatus = function (status) {
    return this.find({ status: status });
};

paymentSchema.statics.buscarAssinaturasAtivas = function () {
    return this.find({ 'assinatura.ativa': true });
};

paymentSchema.statics.buscarVencendo = function (dias = 7) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);

    return this.find({
        'assinatura.ativa': true,
        'assinatura.proximaCobranca': { $lte: dataLimite }
    });
};

paymentSchema.statics.buscarPorGateway = function (gateway, gatewayId) {
    return this.findOne({ gateway, gatewayId });
};

paymentSchema.statics.estatisticas = function (periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { createdAt: { $gte: dataLimite } } },
        {
            $group: {
                _id: '$status',
                total: { $sum: 1 },
                valorTotal: { $sum: '$total' },
                media: { $avg: '$total' }
            }
        },
        { $sort: { total: -1 } }
    ]);
};

paymentSchema.statics.receitaMensal = function (ano, mes) {
    const dataInicio = new Date(ano, mes - 1, 1);
    const dataFim = new Date(ano, mes, 0);

    return this.aggregate([
        {
            $match: {
                status: 'aprovado',
                dataPagamento: { $gte: dataInicio, $lte: dataFim }
            }
        },
        {
            $group: {
                _id: null,
                totalReceita: { $sum: '$total' },
                totalPagamentos: { $sum: 1 },
                mediaPagamento: { $avg: '$total' }
            }
        }
    ]);
};

// Métodos de consulta
paymentSchema.query.porUsuario = function (usuarioId) {
    return this.where({ usuario: usuarioId });
};

paymentSchema.query.porStatus = function (status) {
    return this.where({ status: status });
};

paymentSchema.query.assinaturasAtivas = function () {
    return this.where({ 'assinatura.ativa': true });
};

paymentSchema.query.porGateway = function (gateway) {
    return this.where({ gateway: gateway });
};

// Validações customizadas
paymentSchema.path('total').validate(function (value) {
    if (value < 0) {
        throw new Error('Total não pode ser negativo');
    }

    const calculado = this.subtotal - this.desconto + this.taxa;
    if (Math.abs(value - calculado) > 0.01) {
        throw new Error('Total não confere com subtotal, desconto e taxa');
    }

    return true;
}, 'Total inválido');

// Exportar modelo
module.exports = mongoose.model('Payment', paymentSchema);



