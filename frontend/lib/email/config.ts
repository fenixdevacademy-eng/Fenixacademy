'use client';

﻿// Configuração do sistema de e-mails da Fênix Academy
export const EMAIL_CONFIG = {
    // Configurações SMTP
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true para 465, false para outras portas
        auth: {
            user: 'contato@fenixdevacademy.com',
            pass: process.env.EMAIL_PASSWORD || 'your-app-password' // Senha de app do Gmail
        }
    },

    // Configurações do remetente
    from: {
        name: 'Fênix Dev Academy',
        email: 'contato@fenixdevacademy.com'
    },

    // Templates de e-mail
    templates: {
        welcome: 'welcome-email',
        courseAccess: 'course-access-email',
        paymentConfirmation: 'payment-confirmation-email',
        courseReminder: 'course-reminder-email',
        certificate: 'certificate-email',
        passwordReset: 'password-reset-email'
    },

    // URLs da aplicação
    urls: {
        base: process.env.NEXT_PUBLIC_BASE_URL || 'https://fenixdevacademy.com.br',
        login: '/auth/login',
        dashboard: '/dashboard',
        courses: '/courses',
        profile: '/profile',
        support: '/support'
    }
}

// Tipos de e-mail
export type EmailType = 'welcome' | 'courseAccess' | 'paymentConfirmation' | 'courseReminder' | 'certificate' | 'passwordReset';

// Interface para dados do usuário
export interface UserEmailData {
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    courseName?: string;
    courseId?: string;
    paymentAmount?: number;
    certificateUrl?: string;
    resetToken?: string;
    loginUrl?: string;
}
