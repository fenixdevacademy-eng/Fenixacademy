const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    titulo: String,
    tempoSessao: Number, // em segundos
    elementosClicados: [String],
    scrollDepth: Number, // porcentagem da página
    dispositivo: String,
    navegador: String,
    sistemaOperacional: String,
    resolucao: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
});

const userActionSchema = new mongoose.Schema({
    acao: {
        type: String,
        required: true,
        enum: [
            'login',
            'logout',
            'inscricao_curso',
            'conclusao_aula',
            'conclusao_modulo',
            'conclusao_curso',
            'avaliacao_curso',
            'pagamento',
            'download_recurso',
            'compartilhamento',
            'comentario',
            'pergunta',
            'resposta',
            'outro'
        ]
    },
    detalhes: mongoose.Schema.Types.Mixed,
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
});

const performanceSchema = new mongoose.Schema({
    metrica: {
        type: String,
        required: true,
        enum: [
            'first_contentful_paint',
            'largest_contentful_paint',
            'first_input_delay',
            'cumulative_layout_shift',
            'time_to_interactive',
            'dom_content_loaded',
            'load_complete'
        ]
    },
    valor: {
        type: Number,
        required: true
    },
    unidade: {
        type: String,
        default: 'ms'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
});

const analyticsSchema = new mongoose.Schema({
    // Identificação
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Sessão
    sessionId: {
        type: String,
        required: true
    },

    // Informações do usuário
    dadosUsuario: {
        plano: String,
        nivel: Number,
        pontos: Number,
        totalCursos: Number,
        cursosConcluidos: Number,
        dataPrimeiroAcesso: Date,
        ultimoAcesso: Date
    },

    // Informações da sessão
    sessao: {
        dataInicio: {
            type: Date,
            default: Date.now
        },
        dataFim: Date,
        duracao: Number, // em segundos
        paginasVisitadas: [pageViewSchema],
        acoes: [userActionSchema],
        performance: [performanceSchema]
    },

    // Informações técnicas
    dispositivo: {
        tipo: {
            type: String,
            enum: ['desktop', 'tablet', 'mobile', 'outro']
        },
        marca: String,
        modelo: String,
        resolucao: String,
        orientacao: {
            type: String,
            enum: ['portrait', 'landscape']
        }
    },

    navegador: {
        nome: String,
        versao: String,
        engine: String
    },

    sistemaOperacional: {
        nome: String,
        versao: String,
        arquitetura: String
    },

    // Informações de rede
    rede: {
        tipo: {
            type: String,
            enum: ['wifi', '4g', '5g', '3g', '2g', 'outro']
        },
        velocidade: Number, // Mbps
        latencia: Number // ms
    },

    // Localização
    localizacao: {
        pais: String,
        estado: String,
        cidade: String,
        timezone: String,
        coordenadas: {
            latitude: Number,
            longitude: Number
        }
    },

    // Metadados
    ip: String,
    userAgent: String,
    referrer: String,
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    utmTerm: String,
    utmContent: String,

    // Campos de auditoria
    criadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Índices para performance
analyticsSchema.index({ sessionId: 1 });
analyticsSchema.index({ usuario: 1 });
analyticsSchema.index({ 'sessao.dataInicio': -1 });
analyticsSchema.index({ 'dispositivo.tipo': 1 });
analyticsSchema.index({ 'navegador.nome': 1 });
analyticsSchema.index({ 'sistemaOperacional.nome': 1 });
analyticsSchema.index({ 'localizacao.pais': 1 });
analyticsSchema.index({ 'localizacao.cidade': 1 });
analyticsSchema.index({ createdAt: -1 });

// Campos virtuais
analyticsSchema.virtual('duracaoSessaoFormatada').get(function () {
    if (!this.sessao.duracao) return '0s';

    const segundos = this.sessao.duracao;
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;

    if (horas > 0) {
        return `${horas}h ${minutos}m ${segs}s`;
    } else if (minutos > 0) {
        return `${minutos}m ${segs}s`;
    } else {
        return `${segs}s`;
    }
});

analyticsSchema.virtual('taxaEngajamento').get(function () {
    if (!this.sessao.paginasVisitadas || this.sessao.paginasVisitadas.length === 0) return 0;

    const paginasComInteracao = this.sessao.paginasVisitadas.filter(p =>
        p.tempoSessao > 10 || p.elementosClicados.length > 0 || p.scrollDepth > 50
    ).length;

    return Math.round((paginasComInteracao / this.sessao.paginasVisitadas.length) * 100);
});

analyticsSchema.virtual('paginaMaisVisitada').get(function () {
    if (!this.sessao.paginasVisitadas || this.sessao.paginasVisitadas.length === 0) return null;

    const paginas = this.sessao.paginasVisitadas.reduce((acc, pagina) => {
        const url = pagina.url;
        if (!acc[url]) {
            acc[url] = { url, titulo: pagina.titulo, visitas: 0, tempoTotal: 0 };
        }
        acc[url].visitas += 1;
        acc[url].tempoTotal += pagina.tempoSessao || 0;
        return acc;
    }, {});

    return Object.values(paginas).sort((a, b) => b.visitas - a.visitas)[0];
});

// Middleware pré-save
analyticsSchema.pre('save', function (next) {
    // Calcular duração da sessão se foi finalizada
    if (this.sessao.dataFim && this.sessao.dataInicio) {
        this.sessao.duracao = Math.floor((this.sessao.dataFim - this.sessao.dataInicio) / 1000);
    }

    next();
});

// Métodos de instância
analyticsSchema.methods.finalizarSessao = function () {
    this.sessao.dataFim = new Date();
    return this.save();
};

analyticsSchema.methods.adicionarPagina = function (dadosPagina) {
    this.sessao.paginasVisitadas.push(dadosPagina);
    return this.save();
};

analyticsSchema.methods.adicionarAcao = function (acao, detalhes = {}) {
    this.sessao.acoes.push({
        acao,
        detalhes,
        timestamp: new Date()
    });
    return this.save();
};

analyticsSchema.methods.adicionarMetricaPerformance = function (metrica, valor, unidade = 'ms') {
    this.sessao.performance.push({
        metrica,
        valor,
        unidade,
        timestamp: new Date()
    });
    return this.save();
};

analyticsSchema.methods.atualizarDadosUsuario = function (dados) {
    this.dadosUsuario = { ...this.dadosUsuario, ...dados };
    return this.save();
};

// Métodos estáticos
analyticsSchema.statics.criarSessao = function (dados) {
    return this.create({
        sessionId: dados.sessionId,
        usuario: dados.usuario,
        dadosUsuario: dados.dadosUsuario,
        dispositivo: dados.dispositivo,
        navegador: dados.navegador,
        sistemaOperacional: dados.sistemaOperacional,
        rede: dados.rede,
        localizacao: dados.localizacao,
        ip: dados.ip,
        userAgent: dados.userAgent,
        referrer: dados.referrer,
        utmSource: dados.utmSource,
        utmMedium: dados.utmMedium,
        utmCampaign: dados.utmCampaign,
        utmTerm: dados.utmTerm,
        utmContent: dados.utmContent
    });
};

analyticsSchema.statics.buscarPorUsuario = function (usuarioId, opcoes = {}) {
    const query = { usuario: usuarioId };

    if (opcoes.dataInicio) {
        query['sessao.dataInicio'] = { $gte: opcoes.dataInicio };
    }

    if (opcoes.dataFim) {
        query['sessao.dataInicio'] = { ...query['sessao.dataInicio'], $lte: opcoes.dataFim };
    }

    return this.find(query)
        .sort({ 'sessao.dataInicio': -1 })
        .limit(opcoes.limite || 50);
};

analyticsSchema.statics.buscarSessoesAtivas = function () {
    const dataLimite = new Date(Date.now() - 30 * 60 * 1000); // 30 minutos atrás

    return this.find({
        'sessao.dataFim': { $exists: false },
        'sessao.dataInicio': { $gte: dataLimite }
    });
};

analyticsSchema.statics.estatisticasGerais = function (periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { 'sessao.dataInicio': { $gte: dataLimite } } },
        {
            $group: {
                _id: null,
                totalSessoes: { $sum: 1 },
                usuariosUnicos: { $addToSet: '$usuario' },
                tempoMedioSessao: { $avg: '$sessao.duracao' },
                totalPaginas: { $sum: { $size: '$sessao.paginasVisitadas' } },
                totalAcoes: { $sum: { $size: '$sessao.acoes' } }
            }
        },
        {
            $project: {
                _id: 0,
                totalSessoes: 1,
                usuariosUnicos: { $size: '$usuariosUnicos' },
                tempoMedioSessao: { $round: ['$tempoMedioSessao', 2] },
                totalPaginas: 1,
                totalAcoes: 1,
                paginasPorSessao: { $round: [{ $divide: ['$totalPaginas', '$totalSessoes'] }, 2] },
                acoesPorSessao: { $round: [{ $divide: ['$totalAcoes', '$totalSessoes'] }, 2] }
            }
        }
    ]);
};

analyticsSchema.statics.estatisticasDispositivos = function (periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { 'sessao.dataInicio': { $gte: dataLimite } } },
        {
            $group: {
                _id: '$dispositivo.tipo',
                total: { $sum: 1 },
                tempoMedio: { $avg: '$sessao.duracao' },
                paginasMedias: { $avg: { $size: '$sessao.paginasVisitadas' } }
            }
        },
        { $sort: { total: -1 } }
    ]);
};

analyticsSchema.statics.estatisticasNavegadores = function (periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { 'sessao.dataInicio': { $gte: dataLimite } } },
        {
            $group: {
                _id: '$navegador.nome',
                total: { $sum: 1 },
                versoes: { $addToSet: '$navegador.versao' }
            }
        },
        { $sort: { total: -1 } }
    ]);
};

analyticsSchema.statics.estatisticasLocalizacao = function (periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { 'sessao.dataInicio': { $gte: dataLimite } } },
        {
            $group: {
                _id: '$localizacao.pais',
                total: { $sum: 1 },
                cidades: { $addToSet: '$localizacao.cidade' },
                estados: { $addToSet: '$localizacao.estado' }
            }
        },
        { $sort: { total: -1 } }
    ]);
};

analyticsSchema.statics.estatisticasPerformance = function (periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { 'sessao.dataInicio': { $gte: dataLimite } } },
        { $unwind: '$sessao.performance' },
        {
            $group: {
                _id: '$sessao.performance.metrica',
                media: { $avg: '$sessao.performance.valor' },
                minimo: { $min: '$sessao.performance.valor' },
                maximo: { $max: '$sessao.performance.valor' },
                total: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 1,
                media: { $round: ['$media', 2] },
                minimo: 1,
                maximo: 1,
                total: 1
            }
        },
        { $sort: { media: 1 } }
    ]);
};

analyticsSchema.statics.estatisticasEngajamento = function (periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { 'sessao.dataInicio': { $gte: dataLimite } } },
        {
            $addFields: {
                taxaEngajamento: {
                    $cond: {
                        if: { $gt: [{ $size: '$sessao.paginasVisitadas' }, 0] },
                        then: {
                            $multiply: [
                                {
                                    $divide: [
                                        {
                                            $size: {
                                                $filter: {
                                                    input: '$sessao.paginasVisitadas',
                                                    cond: {
                                                        $or: [
                                                            { $gt: ['$$this.tempoSessao', 10] },
                                                            { $gt: [{ $size: '$$this.elementosClicados' }, 0] },
                                                            { $gt: ['$$this.scrollDepth', 50] }
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        { $size: '$sessao.paginasVisitadas' }
                                    ]
                                },
                                100
                            ]
                        },
                        else: 0
                    }
                }
            }
        },
        {
            $group: {
                _id: null,
                mediaEngajamento: { $avg: '$taxaEngajamento' },
                totalSessoes: { $sum: 1 },
                sessoesEngajadas: {
                    $sum: { $cond: [{ $gte: ['$taxaEngajamento', 50] }, 1, 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                mediaEngajamento: { $round: ['$mediaEngajamento', 2] },
                totalSessoes: 1,
                sessoesEngajadas: 1,
                percentualEngajadas: {
                    $round: [
                        { $multiply: [{ $divide: ['$sessoesEngajadas', '$totalSessoes'] }, 100] },
                        2
                    ]
                }
            }
        }
    ]);
};

analyticsSchema.statics.estatisticasCursos = function (periodo = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - periodo);

    return this.aggregate([
        { $match: { 'sessao.dataInicio': { $gte: dataLimite } } },
        { $unwind: '$sessao.acoes' },
        {
            $match: {
                'sessao.acoes.acao': {
                    $in: ['inscricao_curso', 'conclusao_aula', 'conclusao_modulo', 'conclusao_curso']
                }
            }
        },
        {
            $group: {
                _id: '$sessao.acoes.acao',
                total: { $sum: 1 },
                usuariosUnicos: { $addToSet: '$usuario' }
            }
        },
        {
            $project: {
                _id: 1,
                total: 1,
                usuariosUnicos: { $size: '$usuariosUnicos' }
            }
        },
        { $sort: { total: -1 } }
    ]);
};

// Métodos de consulta
analyticsSchema.query.porUsuario = function (usuarioId) {
    return this.where({ usuario: usuarioId });
};

analyticsSchema.query.porDispositivo = function (tipo) {
    return this.where({ 'dispositivo.tipo': tipo });
};

analyticsSchema.query.porNavegador = function (nome) {
    return this.where({ 'navegador.nome': nome });
};

analyticsSchema.query.porPais = function (pais) {
    return this.where({ 'localizacao.pais': pais });
};

analyticsSchema.query.porPeriodo = function (dataInicio, dataFim) {
    return this.where({
        'sessao.dataInicio': { $gte: dataInicio, $lte: dataFim }
    });
};

// Exportar modelo
module.exports = mongoose.model('Analytics', analyticsSchema);



