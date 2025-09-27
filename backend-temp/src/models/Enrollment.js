const mongoose = require('mongoose');

const lessonProgressSchema = new mongoose.Schema({
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    moduloId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['nao-iniciada', 'em-andamento', 'concluida', 'pausada'],
        default: 'nao-iniciada'
    },
    progresso: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    tempoAssistido: {
        type: Number, // em segundos
        default: 0
    },
    dataInicio: Date,
    dataConclusao: Date,
    ultimaAtividade: {
        type: Date,
        default: Date.now
    },
    notas: [{
        conteudo: String,
        timestamp: {
            type: Number, // posição no vídeo em segundos
            default: 0
        },
        dataCriacao: {
            type: Date,
            default: Date.now
        }
    }],
    exercicios: [{
        exercicioId: mongoose.Schema.Types.ObjectId,
        status: {
            type: String,
            enum: ['nao-iniciado', 'em-andamento', 'concluido', 'corrigido'],
            default: 'nao-iniciado'
        },
        pontuacao: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        tentativas: {
            type: Number,
            default: 0
        },
        dataConclusao: Date,
        respostas: [{
            pergunta: String,
            resposta: String,
            correta: Boolean,
            explicacao: String
        }]
    }],
    avaliacao: {
        nota: {
            type: Number,
            min: 0,
            max: 10
        },
        comentario: String,
        dataAvaliacao: Date
    }
}, {
    timestamps: true
});

const moduleProgressSchema = new mongoose.Schema({
    moduloId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['nao-iniciado', 'em-andamento', 'concluido'],
        default: 'nao-iniciado'
    },
    progresso: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    aulas: [lessonProgressSchema],
    dataInicio: Date,
    dataConclusao: Date,
    avaliacao: {
        nota: {
            type: Number,
            min: 0,
            max: 10
        },
        comentario: String,
        dataAvaliacao: Date
    }
}, {
    timestamps: true
});

const enrollmentSchema = new mongoose.Schema({
    // Relacionamentos
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Usuário é obrigatório']
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Curso é obrigatório']
    },

    // Status da inscrição
    status: {
        type: String,
        enum: ['ativa', 'pausada', 'cancelada', 'concluida', 'expirada'],
        default: 'ativa'
    },

    // Datas importantes
    dataInscricao: {
        type: Date,
        default: Date.now
    },
    dataInicio: {
        type: Date,
        default: Date.now
    },
    dataConclusao: Date,
    dataExpiracao: Date,
    ultimaAtividade: {
        type: Date,
        default: Date.now
    },

    // Progresso geral
    progressoGeral: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    aulasConcluidas: {
        type: Number,
        default: 0
    },
    totalAulas: {
        type: Number,
        required: true
    },
    tempoTotal: {
        type: Number, // em segundos
        default: 0
    },

    // Progresso por módulo
    progressoModulos: [moduleProgressSchema],

    // Certificado
    certificado: {
        emitido: {
            type: Boolean,
            default: false
        },
        numero: String,
        dataEmissao: Date,
        url: String,
        notaFinal: {
            type: Number,
            min: 0,
            max: 10
        }
    },

    // Avaliação do curso
    avaliacao: {
        nota: {
            type: Number,
            min: 1,
            max: 5
        },
        comentario: String,
        dataAvaliacao: Date,
        publica: {
            type: Boolean,
            default: false
        }
    },

    // Configurações
    configuracoes: {
        notificacoes: {
            type: Boolean,
            default: true
        },
        lembretes: {
            type: Boolean,
            default: true
        },
        compartilharProgresso: {
            type: Boolean,
            default: false
        }
    },

    // Metadados
    ipInscricao: String,
    userAgent: String,
    dispositivo: String,

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
enrollmentSchema.index({ usuario: 1, curso: 1 }, { unique: true });
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ dataInscricao: -1 });
enrollmentSchema.index({ progressoGeral: -1 });
enrollmentSchema.index({ ultimaAtividade: -1 });
enrollmentSchema.index({ 'progressoModulos.moduloId': 1 });
enrollmentSchema.index({ 'progressoModulos.aulas.lessonId': 1 });

// Campos virtuais
enrollmentSchema.virtual('diasInscrito').get(function () {
    const hoje = new Date();
    const inscricao = new Date(this.dataInscricao);
    const diffTime = Math.abs(hoje - inscricao);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

enrollmentSchema.virtual('tempoRestante').get(function () {
    if (!this.dataExpiracao) return null;

    const hoje = new Date();
    const expiracao = new Date(this.dataExpiracao);
    const diffTime = expiracao - hoje;

    if (diffTime <= 0) return 0;

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

enrollmentSchema.virtual('podeContinuar').get(function () {
    if (this.status === 'cancelada' || this.status === 'expirada') return false;
    if (this.dataExpiracao && new Date() > this.dataExpiracao) return false;
    return true;
});

enrollmentSchema.virtual('nivelConclusao').get(function () {
    if (this.progressoGeral >= 100) return 'concluido';
    if (this.progressoGeral >= 75) return 'avancado';
    if (this.progressoGeral >= 50) return 'intermediario';
    if (this.progressoGeral >= 25) return 'iniciante';
    return 'recém-inscrito';
});

// Middleware pré-save
enrollmentSchema.pre('save', function (next) {
    // Atualizar última atividade
    this.ultimaAtividade = new Date();

    // Calcular progresso geral
    if (this.progressoModulos && this.progressoModulos.length > 0) {
        const totalProgresso = this.progressoModulos.reduce((total, modulo) => {
            return total + modulo.progresso;
        }, 0);

        this.progressoGeral = Math.round(totalProgresso / this.progressoModulos.length);

        // Contar aulas concluídas
        this.aulasConcluidas = this.progressoModulos.reduce((total, modulo) => {
            return total + modulo.aulas.filter(aula => aula.status === 'concluida').length;
        }, 0);
    }

    // Verificar se concluiu o curso
    if (this.progressoGeral >= 100 && this.status === 'ativa') {
        this.status = 'concluida';
        this.dataConclusao = new Date();
    }

    next();
});

// Métodos de instância
enrollmentSchema.methods.atualizarProgressoAula = function (moduloId, lessonId, progresso, tempoAssistido = 0) {
    const modulo = this.progressoModulos.find(m => m.moduloId.toString() === moduloId.toString());
    if (!modulo) {
        throw new Error('Módulo não encontrado');
    }

    const aula = modulo.aulas.find(a => a.lessonId.toString() === lessonId.toString());
    if (!aula) {
        throw new Error('Aula não encontrada');
    }

    // Atualizar progresso da aula
    aula.progresso = Math.min(100, Math.max(0, progresso));
    aula.tempoAssistido += tempoAssistido;
    aula.ultimaAtividade = new Date();

    // Atualizar status da aula
    if (aula.progresso >= 100) {
        aula.status = 'concluida';
        aula.dataConclusao = new Date();
    } else if (aula.progresso > 0) {
        aula.status = 'em-andamento';
        if (!aula.dataInicio) {
            aula.dataInicio = new Date();
        }
    }

    // Atualizar progresso do módulo
    this.atualizarProgressoModulo(moduloId);

    return this.save();
};

enrollmentSchema.methods.atualizarProgressoModulo = function (moduloId) {
    const modulo = this.progressoModulos.find(m => m.moduloId.toString() === moduloId.toString());
    if (!modulo) return;

    const aulasAtivas = modulo.aulas.filter(a => a.ativo !== false);
    if (aulasAtivas.length === 0) return;

    const totalProgresso = aulasAtivas.reduce((total, aula) => {
        return total + aula.progresso;
    }, 0);

    modulo.progresso = Math.round(totalProgresso / aulasAtivas.length);

    // Atualizar status do módulo
    if (modulo.progresso >= 100) {
        modulo.status = 'concluido';
        modulo.dataConclusao = new Date();
    } else if (modulo.progresso > 0) {
        modulo.status = 'em-andamento';
        if (!modulo.dataInicio) {
            modulo.dataInicio = new Date();
        }
    }
};

enrollmentSchema.methods.marcarAulaConcluida = function (moduloId, lessonId) {
    return this.atualizarProgressoAula(moduloId, lessonId, 100);
};

enrollmentSchema.methods.adicionarNota = function (moduloId, lessonId, conteudo, timestamp = 0) {
    const modulo = this.progressoModulos.find(m => m.moduloId.toString() === moduloId.toString());
    if (!modulo) {
        throw new Error('Módulo não encontrado');
    }

    const aula = modulo.aulas.find(a => a.lessonId.toString() === lessonId.toString());
    if (!aula) {
        throw new Error('Aula não encontrada');
    }

    aula.notas.push({
        conteudo,
        timestamp,
        dataCriacao: new Date()
    });

    return this.save();
};

enrollmentSchema.methods.submeterExercicio = function (moduloId, lessonId, exercicioId, respostas) {
    const modulo = this.progressoModulos.find(m => m.moduloId.toString() === moduloId.toString());
    if (!modulo) {
        throw new Error('Módulo não encontrado');
    }

    const aula = modulo.aulas.find(a => a.lessonId.toString() === lessonId.toString());
    if (!aula) {
        throw new Error('Aula não encontrada');
    }

    let exercicio = aula.exercicios.find(e => e.exercicioId.toString() === exercicioId.toString());

    if (!exercicio) {
        exercicio = {
            exercicioId,
            status: 'em-andamento',
            tentativas: 0,
            respostas: []
        };
        aula.exercicios.push(exercicio);
    }

    exercicio.tentativas += 1;
    exercicio.respostas = respostas;

    // Calcular pontuação (implementar lógica específica)
    exercicio.pontuacao = this.calcularPontuacao(respostas);

    if (exercicio.pontuacao >= 70) {
        exercicio.status = 'concluido';
        exercicio.dataConclusao = new Date();
    }

    return this.save();
};

enrollmentSchema.methods.calcularPontuacao = function (respostas) {
    // Implementar lógica de cálculo de pontuação
    // Por enquanto, retorna uma pontuação baseada no número de respostas corretas
    const corretas = respostas.filter(r => r.correta).length;
    return Math.round((corretas / respostas.length) * 100);
};

enrollmentSchema.methods.avaliarCurso = function (nota, comentario, publica = false) {
    this.avaliacao = {
        nota,
        comentario,
        dataAvaliacao: new Date(),
        publica
    };

    return this.save();
};

enrollmentSchema.methods.emitirCertificado = function (notaFinal) {
    if (this.status !== 'concluida') {
        throw new Error('Curso deve estar concluído para emitir certificado');
    }

    this.certificado = {
        emitido: true,
        numero: `CERT-${this._id.toString().slice(-8).toUpperCase()}`,
        dataEmissao: new Date(),
        url: `/certificados/${this._id}`,
        notaFinal
    };

    return this.save();
};

// Métodos estáticos
enrollmentSchema.statics.buscarPorUsuario = function (usuarioId) {
    return this.find({ usuario: usuarioId })
        .populate('curso', 'titulo slug imagemCapa categoria nivel')
        .sort({ ultimaAtividade: -1 });
};

enrollmentSchema.statics.buscarPorCurso = function (cursoId) {
    return this.find({ curso: cursoId })
        .populate('usuario', 'nome email avatar')
        .sort({ dataInscricao: -1 });
};

enrollmentSchema.statics.buscarAtivas = function () {
    return this.find({ status: 'ativa' });
};

enrollmentSchema.statics.buscarConcluidas = function () {
    return this.find({ status: 'concluida' });
};

enrollmentSchema.statics.buscarPorStatus = function (status) {
    return this.find({ status: status });
};

enrollmentSchema.statics.estatisticasUsuario = function (usuarioId) {
    return this.aggregate([
        { $match: { usuario: mongoose.Types.ObjectId(usuarioId) } },
        {
            $group: {
                _id: null,
                totalInscricoes: { $sum: 1 },
                cursosConcluidos: { $sum: { $cond: [{ $eq: ['$status', 'concluida'] }, 1, 0] } },
                mediaProgresso: { $avg: '$progressoGeral' },
                tempoTotal: { $sum: '$tempoTotal' }
            }
        }
    ]);
};

// Métodos de consulta
enrollmentSchema.query.porUsuario = function (usuarioId) {
    return this.where({ usuario: usuarioId });
};

enrollmentSchema.query.porCurso = function (cursoId) {
    return this.where({ curso: cursoId });
};

enrollmentSchema.query.porStatus = function (status) {
    return this.where({ status: status });
};

enrollmentSchema.query.ativas = function () {
    return this.where({ status: 'ativa' });
};

// Exportar modelo
module.exports = mongoose.model('Enrollment', enrollmentSchema);



