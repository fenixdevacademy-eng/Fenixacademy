const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Título da aula é obrigatório'],
        trim: true,
        maxlength: [200, 'Título não pode ter mais de 200 caracteres']
    },
    descricao: {
        type: String,
        required: [true, 'Descrição da aula é obrigatória'],
        maxlength: [1000, 'Descrição não pode ter mais de 1000 caracteres']
    },
    conteudo: {
        type: String,
        required: [true, 'Conteúdo da aula é obrigatório']
    },
    duracao: {
        type: Number,
        required: [true, 'Duração da aula é obrigatória'],
        min: [1, 'Duração deve ser pelo menos 1 minuto']
    },
    tipo: {
        type: String,
        enum: ['video', 'texto', 'interativo', 'projeto', 'avaliacao'],
        default: 'texto'
    },
    recursos: [{
        tipo: {
            type: String,
            enum: ['video', 'pdf', 'link', 'codigo', 'imagem', 'audio']
        },
        titulo: String,
        url: String,
        descricao: String
    }],
    exercicios: [{
        titulo: String,
        descricao: String,
        tipo: {
            type: String,
            enum: ['multipla-escolha', 'verdadeiro-falso', 'codigo', 'projeto', 'discussao']
        },
        questoes: [{
            pergunta: String,
            opcoes: [String],
            respostaCorreta: String,
            explicacao: String
        }]
    }],
    ordem: {
        type: Number,
        required: true,
        min: 1
    },
    ativo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const moduleSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Título do módulo é obrigatório'],
        trim: true,
        maxlength: [200, 'Título não pode ter mais de 200 caracteres']
    },
    descricao: {
        type: String,
        required: [true, 'Descrição do módulo é obrigatória'],
        maxlength: [1000, 'Descrição não pode ter mais de 1000 caracteres']
    },
    duracao: {
        type: Number,
        required: [true, 'Duração do módulo é obrigatória'],
        min: [1, 'Duração deve ser pelo menos 1 minuto']
    },
    aulas: [lessonSchema],
    ordem: {
        type: Number,
        required: true,
        min: 1
    },
    ativo: {
        type: Boolean,
        default: true
    },
    nivel: {
        type: String,
        enum: ['iniciante', 'intermediario', 'avancado'],
        default: 'iniciante'
    },
    preRequisitos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
    }]
}, {
    timestamps: true
});

const courseSchema = new mongoose.Schema({
    // Informações básicas
    titulo: {
        type: String,
        required: [true, 'Título do curso é obrigatório'],
        trim: true,
        maxlength: [200, 'Título não pode ter mais de 200 caracteres'],
        unique: true
    },
    slug: {
        type: String,
        required: [true, 'Slug do curso é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true
    },
    descricao: {
        type: String,
        required: [true, 'Descrição do curso é obrigatória'],
        maxlength: [2000, 'Descrição não pode ter mais de 2000 caracteres']
    },
    descricaoCompleta: {
        type: String,
        maxlength: [5000, 'Descrição completa não pode ter mais de 5000 caracteres']
    },

    // Categorização
    categoria: {
        type: String,
        required: [true, 'Categoria do curso é obrigatória'],
        enum: [
            'desenvolvimento-web',
            'mobile',
            'data-science',
            'devops',
            'design',
            'marketing',
            'negocios',
            'outro'
        ]
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: [50, 'Tag não pode ter mais de 50 caracteres']
    }],
    nivel: {
        type: String,
        required: [true, 'Nível do curso é obrigatório'],
        enum: ['iniciante', 'intermediario', 'avancado', 'todos-niveis']
    },

    // Conteúdo e estrutura
    modulos: [moduleSchema],
    duracaoTotal: {
        type: Number,
        required: [true, 'Duração total do curso é obrigatória'],
        min: [1, 'Duração deve ser pelo menos 1 minuto']
    },
    totalAulas: {
        type: Number,
        required: [true, 'Total de aulas é obrigatório'],
        min: [1, 'Total de aulas deve ser pelo menos 1']
    },

    // Mídia
    imagemCapa: {
        type: String,
        required: [true, 'Imagem de capa é obrigatória']
    },
    videoApresentacao: String,
    galeria: [{
        titulo: String,
        url: String,
        descricao: String
    }],

    // Preços e planos
    preco: {
        type: Number,
        required: [true, 'Preço do curso é obrigatório'],
        min: [0, 'Preço não pode ser negativo']
    },
    precoPromocional: {
        type: Number,
        min: [0, 'Preço promocional não pode ser negativo']
    },
    dataInicioPromocao: Date,
    dataFimPromocao: Date,
    gratuito: {
        type: Boolean,
        default: false
    },

    // Status e visibilidade
    ativo: {
        type: Boolean,
        default: true
    },
    emDestaque: {
        type: Boolean,
        default: false
    },
    lancamento: {
        type: Boolean,
        default: false
    },
    dataLancamento: Date,

    // Métricas e avaliações
    avaliacaoMedia: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalAvaliacoes: {
        type: Number,
        default: 0,
        min: 0
    },
    totalInscritos: {
        type: Number,
        default: 0,
        min: 0
    },
    totalConclusoes: {
        type: Number,
        default: 0,
        min: 0
    },

    // Certificação
    ofereceCertificado: {
        type: Boolean,
        default: true
    },
    tipoCertificado: {
        type: String,
        enum: ['participacao', 'conclusao', 'avaliacao', 'projeto'],
        default: 'conclusao'
    },

    // Instrutor
    instrutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Instrutor do curso é obrigatório']
    },
    coInstrutores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    // Recursos adicionais
    recursosExtras: [{
        titulo: String,
        descricao: String,
        tipo: {
            type: String,
            enum: ['download', 'link', 'video', 'audio', 'outro']
        },
        url: String,
        tamanho: String,
        disponivelPara: {
            type: String,
            enum: ['todos', 'inscritos', 'concluintes'],
            default: 'inscritos'
        }
    }],

    // Comunidade e suporte
    grupoComunidade: String,
    suporteDisponivel: {
        type: Boolean,
        default: true
    },
    tipoSuporte: {
        type: String,
        enum: ['forum', 'email', 'chat', 'mentoria', 'outro'],
        default: 'forum'
    },

    // Configurações
    configuracoes: {
        permiteAuditoria: {
            type: Boolean,
            default: true
        },
        progressoAutomatico: {
            type: Boolean,
            default: true
        },
        permiteDownload: {
            type: Boolean,
            default: false
        },
        tempoLimite: {
            type: Number, // em dias
            default: null
        }
    },

    // Metadados
    visualizacoes: {
        type: Number,
        default: 0
    },
    compartilhamentos: {
        type: Number,
        default: 0
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
courseSchema.index({ slug: 1 });
courseSchema.index({ categoria: 1 });
courseSchema.index({ nivel: 1 });
courseSchema.index({ ativo: 1, emDestaque: 1 });
courseSchema.index({ 'modulos.ativo': 1 });
courseSchema.index({ instrutor: 1 });
courseSchema.index({ avaliacaoMedia: -1 });
courseSchema.index({ totalInscritos: -1 });
courseSchema.index({ tags: 1 });

// Campos virtuais
courseSchema.virtual('taxaConclusao').get(function () {
    if (this.totalInscritos === 0) return 0;
    return Math.round((this.totalConclusoes / this.totalInscritos) * 100);
});

courseSchema.virtual('precoAtual').get(function () {
    if (this.gratuito) return 0;

    const agora = new Date();
    if (this.precoPromocional &&
        this.dataInicioPromocao &&
        this.dataFimPromocao &&
        agora >= this.dataInicioPromocao &&
        agora <= this.dataFimPromocao) {
        return this.precoPromocional;
    }

    return this.preco;
});

courseSchema.virtual('emPromocao').get(function () {
    if (!this.precoPromocional) return false;

    const agora = new Date();
    return this.dataInicioPromocao &&
        this.dataFimPromocao &&
        agora >= this.dataInicioPromocao &&
        agora <= this.dataFimPromocao;
});

courseSchema.virtual('desconto').get(function () {
    if (!this.emPromocao) return 0;
    return Math.round(((this.preco - this.precoPromocional) / this.preco) * 100);
});

// Middleware pré-save
courseSchema.pre('save', function (next) {
    // Calcular duração total e total de aulas
    this.duracaoTotal = this.modulos.reduce((total, modulo) => {
        return total + modulo.duracao;
    }, 0);

    this.totalAulas = this.modulos.reduce((total, modulo) => {
        return total + modulo.aulas.length;
    }, 0);

    next();
});

// Métodos de instância
courseSchema.methods.adicionarModulo = function (modulo) {
    // Definir ordem automática
    if (!modulo.ordem) {
        modulo.ordem = this.modulos.length + 1;
    }

    this.modulos.push(modulo);
    return this.save();
};

courseSchema.methods.removerModulo = function (moduloId) {
    this.modulos = this.modulos.filter(modulo =>
        modulo._id.toString() !== moduloId.toString()
    );

    // Reordenar módulos
    this.modulos.forEach((modulo, index) => {
        modulo.ordem = index + 1;
    });

    return this.save();
};

courseSchema.methods.reordenarModulos = function (ordemModulos) {
    const modulosOrdenados = [];

    ordemModulos.forEach((moduloId, novaOrdem) => {
        const modulo = this.modulos.find(m => m._id.toString() === moduloId);
        if (modulo) {
            modulo.ordem = novaOrdem + 1;
            modulosOrdenados.push(modulo);
        }
    });

    this.modulos = modulosOrdenados;
    return this.save();
};

courseSchema.methods.adicionarAula = function (moduloId, aula) {
    const modulo = this.modulos.id(moduloId);
    if (!modulo) {
        throw new Error('Módulo não encontrado');
    }

    if (!aula.ordem) {
        aula.ordem = modulo.aulas.length + 1;
    }

    modulo.aulas.push(aula);
    return this.save();
};

courseSchema.methods.atualizarAvaliacao = function (novaAvaliacao) {
    const total = this.totalAvaliacoes + 1;
    const media = ((this.avaliacaoMedia * this.totalAvaliacoes) + novaAvaliacao) / total;

    this.avaliacaoMedia = Math.round(media * 10) / 10;
    this.totalAvaliacoes = total;

    return this.save();
};

courseSchema.methods.incrementarInscrito = function () {
    this.totalInscritos += 1;
    return this.save();
};

courseSchema.methods.incrementarConclusao = function () {
    this.totalConclusoes += 1;
    return this.save();
};

courseSchema.methods.incrementarVisualizacao = function () {
    this.visualizacoes += 1;
    return this.save();
};

// Métodos estáticos
courseSchema.statics.buscarPorSlug = function (slug) {
    return this.findOne({ slug: slug, ativo: true });
};

courseSchema.statics.buscarAtivos = function () {
    return this.find({ ativo: true });
};

courseSchema.statics.buscarPorCategoria = function (categoria) {
    return this.find({ categoria: categoria, ativo: true });
};

courseSchema.statics.buscarPorNivel = function (nivel) {
    return this.find({ nivel: nivel, ativo: true });
};

courseSchema.statics.buscarEmDestaque = function () {
    return this.find({ ativo: true, emDestaque: true });
};

courseSchema.statics.buscarLancamentos = function () {
    return this.find({ ativo: true, lancamento: true });
};

courseSchema.statics.topCursos = function (limite = 10) {
    return this.find({ ativo: true })
        .sort({ avaliacaoMedia: -1, totalInscritos: -1 })
        .limit(limite);
};

courseSchema.statics.buscarPorInstrutor = function (instrutorId) {
    return this.find({
        $or: [
            { instrutor: instrutorId },
            { coInstrutores: instrutorId }
        ],
        ativo: true
    });
};

// Métodos de consulta
courseSchema.query.porCategoria = function (categoria) {
    return this.where({ categoria: categoria });
};

courseSchema.query.porNivel = function (nivel) {
    return this.where({ nivel: nivel });
};

courseSchema.query.ativos = function () {
    return this.where({ ativo: true });
};

courseSchema.query.emDestaque = function () {
    return this.where({ ativo: true, emDestaque: true });
};

// Validações customizadas
courseSchema.path('slug').validate(async function (value) {
    if (!value) return false;

    const Course = this.constructor;
    const curso = await Course.findOne({ slug: value, _id: { $ne: this._id } });

    if (curso) {
        throw new Error('Slug já está em uso');
    }

    return true;
}, 'Slug já está em uso');

// Exportar modelo
module.exports = mongoose.model('Course', courseSchema);



