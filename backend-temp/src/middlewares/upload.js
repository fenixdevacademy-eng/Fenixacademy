const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ApiErrors } = require('./errorHandler');
const logger = require('../utils/logger');

/**
 * Configurações de upload
 */
const uploadConfig = {
    // Diretórios de destino
    destinations: {
        avatars: 'uploads/avatars',
        cursos: 'uploads/cursos',
        recursos: 'uploads/recursos',
        certificados: 'uploads/certificados',
        temp: 'uploads/temp'
    },

    // Limites de arquivo
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 5, // máximo 5 arquivos
        fields: 10 // máximo 10 campos
    },

    // Tipos de arquivo permitidos
    allowedTypes: {
        images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        videos: ['video/mp4', 'video/webm', 'video/ogg'],
        audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
        archives: ['application/zip', 'application/rar', 'application/7z']
    },

    // Extensões permitidas
    allowedExtensions: {
        images: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
        documents: ['.pdf', '.doc', '.docx'],
        videos: ['.mp4', '.webm', '.ogg'],
        audio: ['.mp3', '.wav', '.ogg'],
        archives: ['.zip', '.rar', '.7z']
    }
};

/**
 * Criar diretórios de upload se não existirem
 */
Object.values(uploadConfig.destinations).forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

/**
 * Storage engine para multer
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadType = req.uploadType || 'temp';
        const dest = uploadConfig.destinations[uploadType] || uploadConfig.destinations.temp;
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        // Gerar nome único para o arquivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);

        // Sanitizar nome do arquivo
        const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        cb(null, `${sanitizedName}-${uniqueSuffix}${ext}`);
    }
});

/**
 * Filtro de arquivos
 */
const fileFilter = (req, file, cb) => {
    try {
        // Verificar tipo MIME
        const allowedMimes = [
            ...uploadConfig.allowedTypes.images,
            ...uploadConfig.allowedTypes.documents,
            ...uploadConfig.allowedTypes.videos,
            ...uploadConfig.allowedTypes.audio,
            ...uploadConfig.allowedTypes.archives
        ];

        if (!allowedMimes.includes(file.mimetype)) {
            logger.warn('Tipo de arquivo não permitido', {
                filename: file.originalname,
                mimetype: file.mimetype,
                ip: req.ip,
                userId: req.user?._id
            });

            return cb(new ApiErrors.VALIDATION_ERROR(
                `Tipo de arquivo não permitido: ${file.mimetype}`
            ), false);
        }

        // Verificar extensão
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedExts = [
            ...uploadConfig.allowedExtensions.images,
            ...uploadConfig.allowedExtensions.documents,
            ...uploadConfig.allowedExtensions.videos,
            ...uploadConfig.allowedExtensions.audio,
            ...uploadConfig.allowedExtensions.archives
        ];

        if (!allowedExts.includes(ext)) {
            logger.warn('Extensão de arquivo não permitida', {
                filename: file.originalname,
                extension: ext,
                ip: req.ip,
                userId: req.user?._id
            });

            return cb(new ApiErrors.VALIDATION_ERROR(
                `Extensão de arquivo não permitida: ${ext}`
            ), false);
        }

        // Verificar tamanho do arquivo
        if (file.size > uploadConfig.limits.fileSize) {
            logger.warn('Arquivo muito grande', {
                filename: file.originalname,
                size: file.size,
                limit: uploadConfig.limits.fileSize,
                ip: req.ip,
                userId: req.user?._id
            });

            return cb(new ApiErrors.VALIDATION_ERROR(
                `Arquivo muito grande. Máximo: ${uploadConfig.limits.fileSize / (1024 * 1024)}MB`
            ), false);
        }

        // Log do arquivo aceito
        logger.info('Arquivo aceito para upload', {
            filename: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            ip: req.ip,
            userId: req.user?._id
        });

        cb(null, true);
    } catch (error) {
        logger.error('Erro no filtro de arquivo', {
            error: error.message,
            filename: file.originalname,
            ip: req.ip
        });
        cb(error, false);
    }
};

/**
 * Configuração base do multer
 */
const multerConfig = {
    storage: storage,
    fileFilter: fileFilter,
    limits: uploadConfig.limits
};

/**
 * Middleware de upload genérico
 */
const upload = multer(multerConfig);

/**
 * Middleware para definir tipo de upload
 */
const setUploadType = (type) => {
    return (req, res, next) => {
        req.uploadType = type;
        next();
    };
};

/**
 * Middleware para upload de avatar
 */
const uploadAvatar = [
    setUploadType('avatars'),
    upload.single('avatar'),
    (req, res, next) => {
        if (!req.file) {
            return next(new ApiErrors.VALIDATION_ERROR('Arquivo de avatar é obrigatório'));
        }

        // Verificar se é uma imagem
        if (!uploadConfig.allowedTypes.images.includes(req.file.mimetype)) {
            return next(new ApiErrors.VALIDATION_ERROR('Avatar deve ser uma imagem'));
        }

        next();
    }
];

/**
 * Middleware para upload de recursos de curso
 */
const uploadCursoRecurso = [
    setUploadType('recursos'),
    upload.array('recursos', 5), // máximo 5 arquivos
    (req, res, next) => {
        if (!req.files || req.files.length === 0) {
            return next(new ApiErrors.VALIDATION_ERROR('Pelo menos um recurso deve ser enviado'));
        }

        // Verificar tipos de arquivo
        const invalidFiles = req.files.filter(file =>
            !uploadConfig.allowedTypes.documents.includes(file.mimetype) &&
            !uploadConfig.allowedTypes.videos.includes(file.mimetype) &&
            !uploadConfig.allowedTypes.audio.includes(file.mimetype)
        );

        if (invalidFiles.length > 0) {
            return next(new ApiErrors.VALIDATION_ERROR(
                `Tipos de arquivo não permitidos: ${invalidFiles.map(f => f.originalname).join(', ')}`
            ));
        }

        next();
    }
];

/**
 * Middleware para upload de imagem de curso
 */
const uploadCursoImagem = [
    setUploadType('cursos'),
    upload.single('imagem'),
    (req, res, next) => {
        if (!req.file) {
            return next(new ApiErrors.VALIDATION_ERROR('Imagem do curso é obrigatória'));
        }

        // Verificar se é uma imagem
        if (!uploadConfig.allowedTypes.images.includes(req.file.mimetype)) {
            return next(new ApiErrors.VALIDATION_ERROR('Imagem do curso deve ser uma imagem válida'));
        }

        next();
    }
];

/**
 * Middleware para upload de certificado
 */
const uploadCertificado = [
    setUploadType('certificados'),
    upload.single('certificado'),
    (req, res, next) => {
        if (!req.file) {
            return next(new ApiErrors.VALIDATION_ERROR('Arquivo de certificado é obrigatório'));
        }

        // Verificar se é um documento
        if (!uploadConfig.allowedTypes.documents.includes(req.file.mimetype)) {
            return next(new ApiErrors.VALIDATION_ERROR('Certificado deve ser um documento válido'));
        }

        next();
    }
];

/**
 * Middleware para upload temporário
 */
const uploadTemp = [
    setUploadType('temp'),
    upload.array('files', 10), // máximo 10 arquivos
    (req, res, next) => {
        if (!req.files || req.files.length === 0) {
            return next(new ApiErrors.VALIDATION_ERROR('Pelo menos um arquivo deve ser enviado'));
        }

        next();
    }
];

/**
 * Middleware para processar arquivos enviados
 */
const processUploadedFiles = (req, res, next) => {
    try {
        if (req.file) {
            // Arquivo único
            req.uploadedFile = {
                originalname: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                mimetype: req.file.mimetype,
                destination: req.file.destination
            };
        } else if (req.files && req.files.length > 0) {
            // Múltiplos arquivos
            req.uploadedFiles = req.files.map(file => ({
                originalname: file.originalname,
                filename: file.filename,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype,
                destination: file.destination
            }));
        }

        next();
    } catch (error) {
        logger.error('Erro ao processar arquivos enviados', {
            error: error.message,
            ip: req.ip,
            userId: req.user?._id
        });
        next(error);
    }
};

/**
 * Função para limpar arquivos temporários
 */
const cleanupTempFiles = async (req, res, next) => {
    try {
        if (req.uploadedFiles) {
            // Limpar arquivos temporários após processamento
            for (const file of req.uploadedFiles) {
                if (file.destination.includes('temp')) {
                    setTimeout(() => {
                        if (fs.existsSync(file.path)) {
                            fs.unlinkSync(file.path);
                            logger.info('Arquivo temporário removido', { path: file.path });
                        }
                    }, 5 * 60 * 1000); // 5 minutos
                }
            }
        }

        next();
    } catch (error) {
        logger.error('Erro ao limpar arquivos temporários', {
            error: error.message
        });
        next();
    }
};

/**
 * Função para validar arquivo antes do upload
 */
const validateFile = (file, allowedTypes = null, maxSize = null) => {
    const errors = [];

    // Verificar tipo
    if (allowedTypes && !allowedTypes.includes(file.mimetype)) {
        errors.push(`Tipo de arquivo não permitido: ${file.mimetype}`);
    }

    // Verificar tamanho
    if (maxSize && file.size > maxSize) {
        errors.push(`Arquivo muito grande. Máximo: ${maxSize / (1024 * 1024)}MB`);
    }

    return errors;
};

/**
 * Função para obter informações do arquivo
 */
const getFileInfo = (file) => {
    return {
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        extension: path.extname(file.originalname),
        uploadedAt: new Date(),
        path: file.path
    };
};

module.exports = {
    upload,
    uploadAvatar,
    uploadCursoRecurso,
    uploadCursoImagem,
    uploadCertificado,
    uploadTemp,
    processUploadedFiles,
    cleanupTempFiles,
    validateFile,
    getFileInfo,
    uploadConfig,
    setUploadType
};



