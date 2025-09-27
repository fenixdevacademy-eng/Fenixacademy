const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    // Informações básicas
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
        maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    senha: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [8, 'Senha deve ter pelo menos 8 caracteres'],
        select: false // Não retorna senha nas consultas
    },
    telefone: {
        type: String,
        trim: true,
        match: [/^\+?[\d\s\-\(\)]+$/, 'Telefone inválido']
    },
    dataNascimento: {
        type: Date,
        validate: {
            validator: function (v) {
                return v <= new Date();
            },
            message: 'Data de nascimento não pode ser no futuro'
        }
    },

    // Perfil e avatar
    avatar: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio não pode ter mais de 500 caracteres']
    },

    // Status e verificação
    emailVerificado: {
        type: Boolean,
        default: false
    },
    telefoneVerificado: {
        type: Boolean,
        default: false
    },
    ativo: {
        type: Boolean,
        default: true
    },
    bloqueado: {
        type: Boolean,
        default: false
    },
    motivoBloqueio: String,

    // Perfil educacional
    nivelEducacional: {
        type: String,
        enum: ['fundamental', 'medio', 'superior', 'pos-graduacao', 'outro'],
        default: 'medio'
    },
    areaInteresse: [{
        type: String,
        enum: ['desenvolvimento-web', 'mobile', 'data-science', 'devops', 'design', 'marketing', 'outro']
    }],
    experienciaAnos: {
        type: Number,
        min: 0,
        max: 50,
        default: 0
    },

    // Assinatura e planos
    planoAtual: {
        type: String,
        enum: ['gratuito', 'basico', 'premium', 'enterprise'],
        default: 'gratuito'
    },
    dataInicioPlano: Date,
    dataFimPlano: Date,
    renovacaoAutomatica: {
        type: Boolean,
        default: false
    },

    // Progresso e conquistas
    pontos: {
        type: Number,
        default: 0,
        min: 0
    },
    nivel: {
        type: Number,
        default: 1,
        min: 1
    },
    conquistas: [{
        tipo: {
            type: String,
            enum: ['curso-completo', 'desafio', 'participacao', 'avaliacao', 'outro']
        },
        titulo: String,
        descricao: String,
        dataConquista: {
            type: Date,
            default: Date.now
        },
        icone: String
    }],

    // Configurações
    configuracoes: {
        notificacoesEmail: {
            type: Boolean,
            default: true
        },
        notificacoesPush: {
            type: Boolean,
            default: true
        },
        notificacoesSMS: {
            type: Boolean,
            default: false
        },
        idioma: {
            type: String,
            enum: ['pt-BR', 'en-US', 'es-ES'],
            default: 'pt-BR'
        },
        tema: {
            type: String,
            enum: ['claro', 'escuro', 'auto'],
            default: 'claro'
        },
        privacidade: {
            perfilPublico: {
                type: Boolean,
                default: false
            },
            mostrarProgresso: {
                type: Boolean,
                default: true
            },
            mostrarConquistas: {
                type: Boolean,
                default: true
            }
        }
    },

    // Metadados
    ultimoAcesso: Date,
    ultimaAtividade: Date,
    ipUltimoAcesso: String,
    userAgent: String,

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
userSchema.index({ email: 1 });
userSchema.index({ planoAtual: 1 });
userSchema.index({ ativo: 1, bloqueado: 1 });
userSchema.index({ pontos: -1 });
userSchema.index({ nivel: -1 });
userSchema.index({ 'configuracoes.idioma': 1 });

// Campos virtuais
userSchema.virtual('nomeCompleto').get(function () {
    return this.nome;
});

userSchema.virtual('idade').get(function () {
    if (!this.dataNascimento) return null;
    const hoje = new Date();
    const nascimento = new Date(this.dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
});

userSchema.virtual('diasNoPlano').get(function () {
    if (!this.dataInicioPlano) return 0;
    const hoje = new Date();
    const inicio = new Date(this.dataInicioPlano);
    const diffTime = Math.abs(hoje - inicio);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Middleware pré-save
userSchema.pre('save', async function (next) {
    // Hash da senha apenas se foi modificada
    if (!this.isModified('senha')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.pre('save', function (next) {
    // Atualizar último acesso
    this.ultimoAcesso = new Date();
    next();
});

// Middleware pré-update
userSchema.pre('findOneAndUpdate', function (next) {
    this.set({ ultimaAtividade: new Date() });
    next();
});

// Métodos de instância
userSchema.methods.compararSenha = async function (senhaCandidata) {
    return await bcrypt.compare(senhaCandidata, this.senha);
};

userSchema.methods.gerarTokenJWT = function () {
    return jwt.sign(
        { id: this._id, email: this.email, plano: this.planoAtual },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

userSchema.methods.atualizarPontos = function (pontos) {
    this.pontos += pontos;

    // Calcular novo nível baseado nos pontos
    const novoNivel = Math.floor(this.pontos / 100) + 1;
    if (novoNivel > this.nivel) {
        this.nivel = novoNivel;
    }

    return this.save();
};

userSchema.methods.adicionarConquista = function (tipo, titulo, descricao, icone = null) {
    this.conquistas.push({
        tipo,
        titulo,
        descricao,
        icone
    });

    return this.save();
};

userSchema.methods.verificarPermissao = function (permissao) {
    const permissoes = {
        'gratuito': ['cursos-basicos', 'comunidade'],
        'basico': ['cursos-basicos', 'cursos-intermediarios', 'comunidade', 'certificados'],
        'premium': ['todos-cursos', 'comunidade', 'certificados', 'mentoria', 'projetos'],
        'enterprise': ['todos-cursos', 'comunidade', 'certificados', 'mentoria', 'projetos', 'admin']
    };

    return permissoes[this.planoAtual]?.includes(permissao) || false;
};

// Métodos estáticos
userSchema.statics.buscarPorEmail = function (email) {
    return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.buscarAtivos = function () {
    return this.find({ ativo: true, bloqueado: false });
};

userSchema.statics.buscarPorPlano = function (plano) {
    return this.find({ planoAtual: plano, ativo: true });
};

userSchema.statics.topUsuarios = function (limite = 10) {
    return this.find({ ativo: true, bloqueado: false })
        .sort({ pontos: -1, nivel: -1 })
        .limit(limite)
        .select('nome email pontos nivel avatar');
};

// Métodos de consulta
userSchema.query.porPlano = function (plano) {
    return this.where({ planoAtual: plano });
};

userSchema.query.ativos = function () {
    return this.where({ ativo: true, bloqueado: false });
};

userSchema.query.porNivel = function (nivel) {
    return this.where({ nivel: nivel });
};

// Validações customizadas
userSchema.path('email').validate(async function (value) {
    if (!value) return false;

    const User = this.constructor;
    const usuario = await User.findOne({ email: value, _id: { $ne: this._id } });

    if (usuario) {
        throw new Error('Email já está em uso');
    }

    return true;
}, 'Email já está em uso');

// Exportar modelo
module.exports = mongoose.model('User', userSchema);



