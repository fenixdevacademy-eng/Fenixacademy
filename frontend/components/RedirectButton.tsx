'use client';

﻿/**
 * Componente para botões de redirecionamento
 * Centraliza a lógica de navegação entre páginas
 */

import React from 'react';
import { userDataService } from '@/lib/user-data-service';

interface RedirectButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    title?: string;
    disabled?: boolean;
}

interface ActionButtonProps extends RedirectButtonProps {
    action: 'courses' | 'ide' | 'ai' | 'profile' | 'dashboard' | 'settings' | 'help' | 'community' | 'certificates' | 'exercises' | 'quizzes' | 'search' | 'payment' | 'home' | 'about' | 'contact' | 'careers' | 'subscriptions' | 'login' | 'register' | 'startCourse' | 'favoriteCourse' | 'shareCourse' | 'completeLesson' | 'openChat' | 'openAI' | 'goToProfile' | 'goToSubscriptions' | 'goToCourses';
    courseId?: string;
    tier?: string;
    courseSlug?: string;
    lessonId?: string;
    courseTitle?: string;
}

export function ActionButton({
    action,
    children,
    className = '',
    title,
    disabled = false,
    courseId,
    tier,
    onClick
}: ActionButtonProps) {
    const handleClick = () => {
        console.log('Botão clicado:', { action, courseId, tier, disabled });

        if (disabled) {
            console.log('Botão desabilitado, não executando ação');
            return;
        }

        if (onClick) {
            console.log('Executando onClick personalizado');
            onClick();
            return;
        }

        switch (action) {
            // Navegação básica
            case 'home':
                console.log('Redirecionando para home');
                if (typeof window !== 'undefined') window.location.href = '/';
                break;
            case 'courses':
                console.log('Redirecionando para cursos');
                userDataService.redirectToCourses();
                break;
            case 'about':
                console.log('Redirecionando para sobre');
                if (typeof window !== 'undefined') window.location.href = '/about';
                break;
            case 'contact':
                console.log('Redirecionando para contato');
                if (typeof window !== 'undefined') window.location.href = '/contact';
                break;
            case 'careers':
                console.log('Redirecionando para carreiras');
                if (typeof window !== 'undefined') window.location.href = '/careers';
                break;
            case 'subscriptions':
                console.log('Redirecionando para assinaturas');
                if (typeof window !== 'undefined') window.location.href = '/assinaturas';
                break;

            // Autenticação
            case 'login':
                console.log('Redirecionando para login');
                if (typeof window !== 'undefined') window.location.href = '/auth/login';
                break;
            case 'register':
                console.log('Redirecionando para registro');
                if (typeof window !== 'undefined') window.location.href = '/auth/register';
                break;

            // Funcionalidades principais
            case 'ide':
                console.log('Redirecionando para IDE');
                userDataService.redirectToIDE();
                break;
            case 'ai':
                console.log('Redirecionando para IA');
                userDataService.redirectToAI();
                break;
            case 'profile':
                console.log('Redirecionando para perfil');
                userDataService.redirectToProfile();
                break;
            case 'dashboard':
                console.log('Redirecionando para dashboard');
                userDataService.redirectToDashboard();
                break;
            case 'settings':
                console.log('Redirecionando para configurações');
                userDataService.redirectToSettings();
                break;
            case 'help':
                console.log('Redirecionando para ajuda');
                userDataService.redirectToHelp();
                break;
            case 'community':
                console.log('Redirecionando para comunidade');
                userDataService.redirectToCommunity();
                break;
            case 'certificates':
                console.log('Redirecionando para certificados');
                userDataService.redirectToCertificates();
                break;
            case 'exercises':
                console.log('Redirecionando para exercícios');
                userDataService.redirectToExercises();
                break;
            case 'quizzes':
                console.log('Redirecionando para quizzes');
                userDataService.redirectToQuizzes();
                break;
            case 'search':
                console.log('Redirecionando para busca');
                userDataService.redirectToSearch();
                break;
            case 'payment':
                console.log('Redirecionando para pagamento');
                userDataService.redirectToPayment(courseId, tier);
                break;

            // Ações de curso
            case 'startCourse':
                console.log('Iniciando curso:', courseSlug);
                if (courseSlug && typeof window !== 'undefined') {
                    window.location.href = `/course/${courseSlug}`;
                }
                break;
            case 'favoriteCourse':
                console.log('Favoritando curso:', courseSlug);
                // Implementar lógica de favoritar
                break;
            case 'shareCourse':
                console.log('Compartilhando curso:', courseTitle);
                if (courseTitle && typeof window !== 'undefined' && navigator.share) {
                    navigator.share({
                        title: courseTitle,
                        text: `Confira este curso: ${courseTitle}`,
                        url: window.location.href
                    });
                }
                break;
            case 'completeLesson':
                console.log('Completando aula:', lessonId);
                // Implementar lógica de completar aula
                break;

            // Ações de chat/IA
            case 'openChat':
                console.log('Abrindo chat');
                userDataService.redirectToHelp();
                break;
            case 'openAI':
                console.log('Abrindo IA');
                userDataService.redirectToAI();
                break;

            // Ações de redirecionamento
            case 'goToProfile':
                console.log('Indo para perfil');
                userDataService.redirectToProfile();
                break;
            case 'goToSubscriptions':
                console.log('Indo para assinaturas');
                if (typeof window !== 'undefined') window.location.href = '/assinaturas';
                break;
            case 'goToCourses':
                console.log('Indo para cursos');
                userDataService.redirectToCourses();
                break;

            default:
                console.warn(`Ação não reconhecida: ${action}`);
        }
    }

    return (
        <button
            onClick={handleClick}
            className={className}
            title={title}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export function BuyNowButton({
    courseId,
    tier = 'premium',
    children,
    className = 'bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="payment"
            courseId={courseId}
            tier={tier}
            className={className}
            {...props}
        >
            {children || 'Comprar Agora'}
        </ActionButton>
    );
}

export function ExploreCoursesButton({
    children,
    className = 'bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="courses"
            className={className}
            {...props}
        >
            {children || 'Explorar Cursos'}
        </ActionButton>
    );
}

export function OpenIDEButton({
    children,
    className = 'bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="ide"
            className={className}
            {...props}
        >
            {children || 'Abrir IDE'}
        </ActionButton>
    );
}

export function ChatAIButton({
    children,
    className = 'bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="ai"
            className={className}
            {...props}
        >
            {children || 'Chat com IA'}
        </ActionButton>
    );
}

export function StartCourseButton({
    courseSlug,
    children,
    className = 'bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="startCourse"
            courseSlug={courseSlug}
            className={className}
            {...props}
        >
            {children || 'Iniciar Curso'}
        </ActionButton>
    );
}

export function FavoriteCourseButton({
    courseSlug,
    children,
    className = 'bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors font-semibold',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="favoriteCourse"
            courseSlug={courseSlug}
            className={className}
            {...props}
        >
            {children || 'Favoritar'}
        </ActionButton>
    );
}

export function ShareCourseButton({
    courseSlug,
    courseTitle,
    children,
    className = 'bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors font-semibold',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="shareCourse"
            courseSlug={courseSlug}
            courseTitle={courseTitle}
            className={className}
            {...props}
        >
            {children || 'Compartilhar'}
        </ActionButton>
    );
}

export function CompleteLessonButton({
    lessonId,
    children,
    className = 'bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="completeLesson"
            lessonId={lessonId}
            className={className}
            {...props}
        >
            {children || 'Completar Aula'}
        </ActionButton>
    );
}

export function LoginButton({
    children,
    className = 'text-white hover:text-blue-400 transition-colors',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="login"
            className={className}
            {...props}
        >
            {children || 'Entrar'}
        </ActionButton>
    );
}

export function RegisterButton({
    children,
    className = 'text-white hover:text-blue-400 transition-colors',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="register"
            className={className}
            {...props}
        >
            {children || 'Registrar'}
        </ActionButton>
    );
}

export function HomeButton({
    children,
    className = 'flex items-center',
    ...props
}: Omit<ActionButtonProps, 'action'>) {
    return (
        <ActionButton
            action="home"
            className={className}
            {...props}
        >
            {children}
        </ActionButton>
    );
}

