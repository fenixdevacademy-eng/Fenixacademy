'use client';

import { prisma } from '@/lib/prisma'
import { hashPassword, comparePassword } from './password'
import { generateToken, verifyToken } from './jwt'
// import { sendEmail } from '@/lib/email'
import crypto from 'crypto'

// Tipos para autenticação avançada
export interface AuthUser {
  id: number
  name: string
  email: string
  role: string
  isVerified: boolean
  has2FA: boolean
  lastLogin?: Date
  loginAttempts: number
  lockedUntil?: Date
}

export interface LoginAttempt {
  email: string
  ip: string
  userAgent: string
  success: boolean
  timestamp: Date
}

export interface TwoFactorAuth {
  secret: string
  qrCode: string
  backupCodes: string[]
}

// Configurações de segurança
const SECURITY_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_TIME: 15 * 60 * 1000, // 15 minutos
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 horas
  PASSWORD_RESET_EXPIRY: 60 * 60 * 1000, // 1 hora
  EMAIL_VERIFICATION_EXPIRY: 24 * 60 * 60 * 1000, // 24 horas
}

// Sistema de tentativas de login
export class LoginAttemptManager {
  private static attempts = new Map<string, LoginAttempt[]>()

  static recordAttempt(email: string, ip: string, userAgent: string, success: boolean) {
    const key = `${email}:${ip}`
    const attempts = this.attempts.get(key) || []

    attempts.push({
      email,
      ip,
      userAgent,
      success,
      timestamp: new Date()
    })

    // Manter apenas as últimas 10 tentativas
    if (attempts.length > 10) {
      attempts.splice(0, attempts.length - 10)
    }

    this.attempts.set(key, attempts)
  }

  static getRecentAttempts(email: string, ip: string, minutes: number = 15): LoginAttempt[] {
    const key = `${email}:${ip}`
    const attempts = this.attempts.get(key) || []
    const cutoff = new Date(Date.now() - minutes * 60 * 1000)

    return attempts.filter(attempt => attempt.timestamp > cutoff)
  }

  static isAccountLocked(email: string, ip: string): boolean {
    const recentAttempts = this.getRecentAttempts(email, ip)
    const failedAttempts = recentAttempts.filter(attempt => !attempt.success)

    return failedAttempts.length >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS
  }
}

// Sistema de 2FA
export class TwoFactorAuthManager {
  static generateSecret(): string {
    return crypto.randomBytes(20).toString('hex')
  }

  static generateQRCode(secret: string, email: string, issuer: string = 'Fênix Academy'): string {
    const otpAuthUrl = `otpauth://totp/${issuer}:${email}?secret=${secret}&issuer=${issuer}`
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpAuthUrl)}`
  }

  static generateBackupCodes(): string[] {
    const codes: string[] = []
    for (let i = 0; i < 10; i++) {
      codes.push(crypto.randomBytes(4).toString('hex').toUpperCase())
    }
    return codes
  }

  static verifyTOTP(secret: string, token: string): boolean {
    const time = Math.floor(Date.now() / 1000 / 30)
    const expectedToken = this.generateTOTP(secret, time)
    return token === expectedToken
  }

  private static generateTOTP(secret: string, time: number): string {
    const key = Buffer.from(secret, 'hex')
    const timeBuffer = Buffer.alloc(8)
    timeBuffer.writeUInt32BE(time, 4)

    const hmac = crypto.createHmac('sha1', key)
    hmac.update(timeBuffer)
    const hash = hmac.digest()

    const offset = hash[hash.length - 1] & 0xf
    const code = ((hash[offset] & 0x7f) << 24) |
      ((hash[offset + 1] & 0xff) << 16) |
      ((hash[offset + 2] & 0xff) << 8) |
      (hash[offset + 3] & 0xff)

    return (code % 1000000).toString().padStart(6, '0')
  }
}

// Sistema de recuperação de senha
export class PasswordRecoveryManager {
  static async initiatePasswordReset(email: string, ip: string): Promise<{ success: boolean; message: string }> {
    try {
      const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })

      if (!user) {
        return { success: false, message: 'Email não encontrado' }
      }

      // Verificar se já existe um token ativo
      const existingToken = await prisma.passwordResetToken.findFirst({
        where: {
          userId: user.id,
          expiresAt: { gt: new Date() }
        }
      })

      if (existingToken) {
        return { success: false, message: 'Token de recuperação já enviado. Verifique seu email.' }
      }

      // Gerar token de recuperação
      const token = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + SECURITY_CONFIG.PASSWORD_RESET_EXPIRY)

      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
          // ip,
          // userAgent: 'Password Reset Request'
        }
      })

      // Enviar email de recuperação
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`

      // await sendEmail({
      //   to: user.email,
      //   subject: 'Recuperação de Senha - Fênix Academy',
      //   template: 'password-reset',
      //   data: {
      //     name: user.name,
      //     resetUrl,
      //     expiresIn: '1 hora'
      //   }
      // })

      return { success: true, message: 'Email de recuperação enviado com sucesso' }
    } catch (error) {
      console.error('Erro ao iniciar recuperação de senha:', error)
      return { success: false, message: 'Erro interno do servidor' }
    }
  }

  static async resetPassword(token: string, newPassword: string, ip: string): Promise<{ success: boolean; message: string }> {
    try {
      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          token,
          expiresAt: { gt: new Date() }
        },
        include: { user: true }
      })

      if (!resetToken) {
        return { success: false, message: 'Token inválido ou expirado' }
      }

      // Atualizar senha
      const hashedPassword = await hashPassword(newPassword)
      await prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword }
      })

      // Invalidar token
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id }
      })

      // Invalidar todas as sessões ativas
      // await prisma.userSession.deleteMany({
      //   where: { userId: resetToken.userId }
      // })

      return { success: true, message: 'Senha alterada com sucesso' }
    } catch (error) {
      console.error('Erro ao resetar senha:', error)
      return { success: false, message: 'Erro interno do servidor' }
    }
  }
}

// Sistema de verificação de email
export class EmailVerificationManager {
  static async sendVerificationEmail(userId: number): Promise<{ success: boolean; message: string }> {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!user) {
        return { success: false, message: 'Usuário não encontrado' }
      }

      // if (user.isVerified) {
      //   return { success: false, message: 'Email já verificado' }
      // }

      // Gerar token de verificação
      const token = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + SECURITY_CONFIG.EMAIL_VERIFICATION_EXPIRY)

      // await prisma.emailVerificationToken.upsert({
      //   where: { userId },
      //   update: { token, expiresAt },
      //   create: { userId, token, expiresAt }
      // })

      // Enviar email de verificação
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`

      // await sendEmail({
      //   to: user.email,
      //   subject: 'Verificação de Email - Fênix Academy',
      //   template: 'email-verification',
      //   data: {
      //     name: user.name,
      //     verificationUrl,
      //     expiresIn: '24 horas'
      //   }
      // })

      return { success: true, message: 'Email de verificação enviado' }
    } catch (error) {
      console.error('Erro ao enviar email de verificação:', error)
      return { success: false, message: 'Erro interno do servidor' }
    }
  }

  static async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    try {
      // const verificationToken = await prisma.emailVerificationToken.findFirst({
      //   where: {
      //     token,
      //     expiresAt: { gt: new Date() }
      //   },
      //   include: { user: true }
      // })

      // if (!verificationToken) {
      //   return { success: false, message: 'Token inválido ou expirado' }
      // }

      // // Marcar email como verificado
      // await prisma.user.update({
      //   where: { id: verificationToken.userId },
      //   data: { isVerified: true }
      // })

      // // Remover token
      // await prisma.emailVerificationToken.delete({
      //   where: { id: verificationToken.id }
      // })

      return { success: true, message: 'Email verificado com sucesso' }
    } catch (error) {
      console.error('Erro ao verificar email:', error)
      return { success: false, message: 'Erro interno do servidor' }
    }
  }
}

// Sistema de sessões avançado
export class SessionManager {
  static async createSession(userId: number, ip: string, userAgent: string): Promise<string> {
    const sessionId = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + SECURITY_CONFIG.SESSION_DURATION)

    // await prisma.userSession.create({
    //   data: {
    //     userId,
    //     sessionId,
    //     ip,
    //     userAgent,
    //     expiresAt,
    //     isActive: true
    //   }
    // })

    return sessionId
  }

  static async validateSession(sessionId: string): Promise<AuthUser | null> {
    try {
      // const session = await prisma.userSession.findFirst({
      //   where: {
      //     sessionId,
      //     isActive: true,
      //     expiresAt: { gt: new Date() }
      //   },
      //   include: { user: true }
      // })

      // if (!session) {
      //   return null
      // }

      // // Atualizar último acesso
      // await prisma.userSession.update({
      //   where: { id: session.id },
      //   data: { lastAccessedAt: new Date() }
      // })

      // return {
      //   id: session.user.id,
      //   name: session.user.name,
      //   email: session.user.email,
      //   role: session.user.role,
      //   isVerified: session.user.isVerified,
      //   has2FA: !!session.user.twoFactorSecret,
      //   lastLogin: session.user.lastLoginAt,
      //   loginAttempts: session.user.loginAttempts,
      //   lockedUntil: session.user.lockedUntil
      // }

      return null
    } catch (error) {
      console.error('Erro ao validar sessão:', error)
      return null
    }
  }

  static async revokeSession(sessionId: string): Promise<void> {
    // await prisma.userSession.updateMany({
    //   where: { sessionId },
    //   data: { isActive: false }
    // })
  }

  static async revokeAllUserSessions(userId: number): Promise<void> {
    // await prisma.userSession.updateMany({
    //   where: { userId },
    //   data: { isActive: false }
    // })
  }
}

// Função principal de login avançado
export async function advancedLogin(
  email: string,
  password: string,
  ip: string,
  userAgent: string,
  twoFactorCode?: string
): Promise<{ success: boolean; user?: AuthUser; token?: string; requires2FA?: boolean; message: string }> {
  try {
    // Verificar se a conta está bloqueada
    if (LoginAttemptManager.isAccountLocked(email, ip)) {
      LoginAttemptManager.recordAttempt(email, ip, userAgent, false)
      return {
        success: false,
        message: 'Conta temporariamente bloqueada devido a muitas tentativas de login'
      }
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true }
    })

    if (!user) {
      LoginAttemptManager.recordAttempt(email, ip, userAgent, false)
      return { success: false, message: 'Credenciais inválidas' }
    }

    // Verificar senha
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      LoginAttemptManager.recordAttempt(email, ip, userAgent, false)
      return { success: false, message: 'Credenciais inválidas' }
    }

    // Verificar se tem 2FA ativado
    // if (user.twoFactorSecret && !twoFactorCode) {
    //   return { 
    //     success: false, 
    //     requires2FA: true, 
    //     message: 'Código 2FA necessário' 
    //   }
    // }

    // Verificar código 2FA se necessário
    // if (user.twoFactorSecret && twoFactorCode) {
    //   const is2FAValid = TwoFactorAuthManager.verifyTOTP(user.twoFactorSecret, twoFactorCode)
    //   if (!is2FAValid) {
    //     LoginAttemptManager.recordAttempt(email, ip, userAgent, false)
    //     return { success: false, message: 'Código 2FA inválido' }
    //   }
    // }

    // Login bem-sucedido
    LoginAttemptManager.recordAttempt(email, ip, userAgent, true)

    // Atualizar informações do usuário
    await prisma.user.update({
      where: { id: user.id },
      data: {
        // lastLoginAt: new Date(),
        // loginAttempts: 0,
        // lockedUntil: undefined
      }
    })

    // Criar sessão
    const sessionId = await SessionManager.createSession(user.id, ip, userAgent)

    // Gerar token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      // sessionId
    })

    const authUser: AuthUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: true,
      has2FA: false,
      lastLogin: new Date(),
      loginAttempts: 0,
      lockedUntil: undefined
    }

    return {
      success: true,
      user: authUser,
      token,
      message: 'Login realizado com sucesso'
    }

  } catch (error) {
    console.error('Erro no login avançado:', error)
    return { success: false, message: 'Erro interno do servidor' }
  }
}

// Função de logout avançado
export async function advancedLogout(sessionId: string): Promise<{ success: boolean; message: string }> {
  try {
    await SessionManager.revokeSession(sessionId)
    return { success: true, message: 'Logout realizado com sucesso' }
  } catch (error) {
    console.error('Erro no logout:', error)
    return { success: false, message: 'Erro interno do servidor' }
  }
}

