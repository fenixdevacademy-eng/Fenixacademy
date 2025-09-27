const express = require('express');
const router = express.Router();
const { authenticate, authenticateOptional } = require('../middlewares/auth');
const { validate, userSchemas } = require('../middlewares/validation');
const { asyncHandler } = require('../middlewares/errorHandler');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * @route   POST /api/auth/register
 * @desc    Registrar novo usuário
 * @access  Public
 */
router.post('/register',
    validate(userSchemas.registro),
    asyncHandler(async (req, res) => {
        const { email, senha, nome, telefone, dataNascimento, nivelEducacional, areaInteresse, experienciaAnos, configuracoes } = req.body;

        // Verificar se usuário já existe
        const existingUser = await User.buscarPorEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email já está em uso',
                code: 'EMAIL_ALREADY_EXISTS'
            });
        }

        // Criar usuário
        const user = await User.create({
            email,
            senha,
            nome,
            telefone,
            dataNascimento,
            nivelEducacional,
            areaInteresse,
            experienciaAnos,
            configuracoes
        });

        // Gerar token JWT
        const token = user.gerarTokenJWT();

        // Log de registro
        logger.info('Usuário registrado com sucesso', {
            userId: user._id,
            email: user.email,
            ip: req.ip
        });

        res.status(201).json({
            success: true,
            message: 'Usuário registrado com sucesso',
            data: {
                user: {
                    id: user._id,
                    nome: user.nome,
                    email: user.email,
                    planoAtual: user.planoAtual,
                    nivel: user.nivel,
                    pontos: user.pontos
                },
                token
            }
        });
    })
);

/**
 * @route   POST /api/auth/login
 * @desc    Autenticar usuário
 * @access  Public
 */
router.post('/login',
    validate(userSchemas.login),
    asyncHandler(async (req, res) => {
        const { email, senha, lembrar } = req.body;

        // Buscar usuário com senha
        const user = await User.findOne({ email }).select('+senha');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciais inválidas',
                code: 'INVALID_CREDENTIALS'
            });
        }

        // Verificar se usuário está ativo
        if (!user.ativo) {
            return res.status(401).json({
                success: false,
                message: 'Usuário inativo',
                code: 'USER_INACTIVE'
            });
        }

        // Verificar se usuário está bloqueado
        if (user.bloqueado) {
            return res.status(401).json({
                success: false,
                message: `Usuário bloqueado: ${user.motivoBloqueio}`,
                code: 'USER_BLOCKED'
            });
        }

        // Verificar senha
        const isPasswordValid = await user.compararSenha(senha);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciais inválidas',
                code: 'INVALID_CREDENTIALS'
            });
        }

        // Gerar token JWT
        const token = user.gerarTokenJWT();

        // Atualizar último acesso
        user.ultimoAcesso = new Date();
        user.ipUltimoAcesso = req.ip;
        user.userAgent = req.get('User-Agent');
        await user.save();

        // Log de login
        logger.info('Usuário autenticado com sucesso', {
            userId: user._id,
            email: user.email,
            ip: req.ip
        });

        // Configurar cookie se lembrar for true
        if (lembrar) {
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
                sameSite: 'strict'
            };
            res.cookie('token', token, cookieOptions);
        }

        res.json({
            success: true,
            message: 'Login realizado com sucesso',
            data: {
                user: {
                    id: user._id,
                    nome: user.nome,
                    email: user.email,
                    planoAtual: user.planoAtual,
                    nivel: user.nivel,
                    pontos: user.pontos,
                    avatar: user.avatar,
                    ultimoAcesso: user.ultimoAcesso
                },
                token
            }
        });
    })
);

/**
 * @route   POST /api/auth/logout
 * @desc    Desautenticar usuário
 * @access  Private
 */
router.post('/logout',
    authenticate,
    asyncHandler(async (req, res) => {
        // Limpar cookie se existir
        res.clearCookie('token');

        // Log de logout
        logger.info('Usuário fez logout', {
            userId: req.user._id,
            email: req.user.email,
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Logout realizado com sucesso'
        });
    })
);

/**
 * @route   GET /api/auth/me
 * @desc    Obter dados do usuário autenticado
 * @access  Private
 */
router.get('/me',
    authenticate,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)
            .select('-senha')
            .populate('conquistas');

        res.json({
            success: true,
            data: { user }
        });
    })
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Renovar token JWT
 * @access  Private
 */
router.post('/refresh',
    authenticate,
    asyncHandler(async (req, res) => {
        // Gerar novo token
        const newToken = req.user.gerarTokenJWT();

        // Log de renovação
        logger.info('Token renovado', {
            userId: req.user._id,
            email: req.user.email,
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Token renovado com sucesso',
            data: { token: newToken }
        });
    })
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Solicitar recuperação de senha
 * @access  Public
 */
router.post('/forgot-password',
    validate(userSchemas.recuperarSenha),
    asyncHandler(async (req, res) => {
        const { email } = req.body;

        const user = await User.buscarPorEmail(email);
        if (!user) {
            // Por segurança, não revelar se o email existe ou não
            return res.json({
                success: true,
                message: 'Se o email existir, você receberá instruções para recuperar sua senha'
            });
        }

        // Gerar token de recuperação (implementar lógica específica)
        const resetToken = 'token_gerado_aqui'; // Implementar geração de token
        const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        // Salvar token no usuário
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetExpires;
        await user.save();

        // Enviar email (implementar serviço de email)
        // await emailService.sendPasswordReset(user.email, resetToken);

        // Log de solicitação
        logger.info('Recuperação de senha solicitada', {
            userId: user._id,
            email: user.email,
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Se o email existir, você receberá instruções para recuperar sua senha'
        });
    })
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Redefinir senha com token
 * @access  Public
 */
router.post('/reset-password',
    validate(userSchemas.resetSenha),
    asyncHandler(async (req, res) => {
        const { token, novaSenha } = req.body;

        // Buscar usuário com token válido
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Token inválido ou expirado',
                code: 'INVALID_RESET_TOKEN'
            });
        }

        // Atualizar senha
        user.senha = novaSenha;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Log de redefinição
        logger.info('Senha redefinida com sucesso', {
            userId: user._id,
            email: user.email,
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Senha redefinida com sucesso'
        });
    })
);

/**
 * @route   POST /api/auth/change-password
 * @desc    Alterar senha do usuário autenticado
 * @access  Private
 */
router.post('/change-password',
    authenticate,
    validate(userSchemas.alterarSenha),
    asyncHandler(async (req, res) => {
        const { senhaAtual, novaSenha } = req.body;

        // Buscar usuário com senha atual
        const user = await User.findById(req.user._id).select('+senha');

        // Verificar senha atual
        const isCurrentPasswordValid = await user.compararSenha(senhaAtual);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Senha atual incorreta',
                code: 'INVALID_CURRENT_PASSWORD'
            });
        }

        // Atualizar senha
        user.senha = novaSenha;
        await user.save();

        // Log de alteração
        logger.info('Senha alterada com sucesso', {
            userId: user._id,
            email: user.email,
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Senha alterada com sucesso'
        });
    })
);

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verificar email do usuário
 * @access  Private
 */
router.post('/verify-email',
    authenticate,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user.emailVerificado) {
            return res.status(400).json({
                success: false,
                message: 'Email já está verificado',
                code: 'EMAIL_ALREADY_VERIFIED'
            });
        }

        // Gerar token de verificação (implementar lógica específica)
        const verificationToken = 'token_gerado_aqui'; // Implementar geração de token

        // Salvar token no usuário
        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
        await user.save();

        // Enviar email de verificação (implementar serviço de email)
        // await emailService.sendEmailVerification(user.email, verificationToken);

        // Log de solicitação
        logger.info('Verificação de email solicitada', {
            userId: user._id,
            email: user.email,
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Email de verificação enviado'
        });
    })
);

/**
 * @route   POST /api/auth/confirm-email
 * @desc    Confirmar email com token
 * @access  Public
 */
router.post('/confirm-email',
    asyncHandler(async (req, res) => {
        const { token } = req.body;

        // Buscar usuário com token válido
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Token inválido ou expirado',
                code: 'INVALID_VERIFICATION_TOKEN'
            });
        }

        // Marcar email como verificado
        user.emailVerificado = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        // Log de confirmação
        logger.info('Email confirmado com sucesso', {
            userId: user._id,
            email: user.email,
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Email confirmado com sucesso'
        });
    })
);

/**
 * @route   GET /api/auth/check-auth
 * @desc    Verificar se usuário está autenticado (opcional)
 * @access  Public
 */
router.get('/check-auth',
    authenticateOptional,
    asyncHandler(async (req, res) => {
        if (req.user) {
            res.json({
                success: true,
                authenticated: true,
                data: {
                    user: {
                        id: req.user._id,
                        nome: req.user.nome,
                        email: req.user.email,
                        planoAtual: req.user.planoAtual
                    }
                }
            });
        } else {
            res.json({
                success: true,
                authenticated: false
            });
        }
    })
);

module.exports = router;



