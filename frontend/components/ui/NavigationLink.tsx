'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES, navigationHelpers } from '@/lib/routes';

interface NavigationLinkProps {
    children: React.ReactNode;
    href?: string;
    route?: keyof typeof ROUTES;
    params?: Record<string, string>;
    className?: string;
    external?: boolean;
    target?: string;
    onClick?: () => void;
}

export function NavigationLink({
    children,
    href,
    route,
    params,
    className = '',
    external = false,
    target,
    onClick,
    ...props
}: NavigationLinkProps) {
    const router = useRouter();

    const getHref = () => {
        if (href) return href;
        if (route) {
            let routeHref = ROUTES[route];

            // Replace parameters in the URL
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    routeHref = routeHref.replace(`:${key}`, value);
                });
            }

            return routeHref;
        }
        return '#';
    };

    const finalHref = getHref();

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    if (external) {
        return (
            <a
                href={finalHref}
                target={target || '_blank'}
                rel="noopener noreferrer"
                className={className}
                onClick={handleClick}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={finalHref}
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Link>
    );
}

// Pre-configured navigation links for common routes
export const NavLinks = {
    // Main navigation
    Home: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="home" {...props}>
            Início
        </NavigationLink>
    ),

    About: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="about" {...props}>
            Sobre
        </NavigationLink>
    ),

    Courses: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="courses" {...props}>
            Cursos
        </NavigationLink>
    ),

    Pricing: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="pricing" {...props}>
            Preços
        </NavigationLink>
    ),

    Contact: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="contact" {...props}>
            Contato
        </NavigationLink>
    ),

    Blog: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="blog" {...props}>
            Blog
        </NavigationLink>
    ),

    Careers: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="careers" {...props}>
            Carreiras
        </NavigationLink>
    ),

    // Authentication
    Login: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="login" {...props}>
            Entrar
        </NavigationLink>
    ),

    Register: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="register" {...props}>
            Criar Conta
        </NavigationLink>
    ),

    // User pages
    Dashboard: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="dashboard" {...props}>
            Dashboard
        </NavigationLink>
    ),

    Profile: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="profile" {...props}>
            Perfil
        </NavigationLink>
    ),

    Settings: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="settings" {...props}>
            Configurações
        </NavigationLink>
    ),

    // Learning
    MyCourses: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="myCourses" {...props}>
            Meus Cursos
        </NavigationLink>
    ),

    Certificates: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="certificates" {...props}>
            Certificados
        </NavigationLink>
    ),

    Progress: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="progress" {...props}>
            Progresso
        </NavigationLink>
    ),

    // Tools
    IDE: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="ide" {...props}>
            IDE
        </NavigationLink>
    ),

    IDEAdvanced: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="ideAdvanced" {...props}>
            IDE Avançado
        </NavigationLink>
    ),

    AI: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="ai" {...props}>
            IA
        </NavigationLink>
    ),

    // Community
    Community: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="community" {...props}>
            Comunidade
        </NavigationLink>
    ),

    // Support
    Help: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="help" {...props}>
            Ajuda
        </NavigationLink>
    ),

    Support: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="support" {...props}>
            Suporte
        </NavigationLink>
    ),

    // Legal
    Terms: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="terms" {...props}>
            Termos
        </NavigationLink>
    ),

    Privacy: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="privacy" {...props}>
            Privacidade
        </NavigationLink>
    ),

    Cookies: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink route="cookies" {...props}>
            Cookies
        </NavigationLink>
    ),

    // External links
    GitHub: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink
            href={navigationHelpers.external.github}
            external
            {...props}
        >
            GitHub
        </NavigationLink>
    ),

    LinkedIn: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink
            href={navigationHelpers.external.linkedin}
            external
            {...props}
        >
            LinkedIn
        </NavigationLink>
    ),

    Discord: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink
            href={navigationHelpers.external.discord}
            external
            {...props}
        >
            Discord
        </NavigationLink>
    ),

    YouTube: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink
            href={navigationHelpers.external.youtube}
            external
            {...props}
        >
            YouTube
        </NavigationLink>
    ),

    Twitter: (props: Partial<NavigationLinkProps>) => (
        <NavigationLink
            href={navigationHelpers.external.twitter}
            external
            {...props}
        >
            Twitter
        </NavigationLink>
    ),
};

export default NavigationLink;

