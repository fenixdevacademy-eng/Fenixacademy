'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES, navigationHelpers } from '@/lib/routes';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  external?: boolean;
  target?: string;
}

interface NavigationButtonProps extends ButtonProps {
  route: keyof typeof ROUTES;
  params?: Record<string, string>;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  external = false,
  target,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel="noopener noreferrer"
          className={classes}
          {...props}
        >
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />}
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...props}>
        {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />}
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />}
      {children}
    </button>
  );
}

export function NavigationButton({
  children,
  route,
  params,
  ...buttonProps
}: NavigationButtonProps) {
  const router = useRouter();

  const getHref = () => {
    let href = ROUTES[route];

    // Replace parameters in the URL
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        href = href.replace(`:${key}`, value);
      });
    }

    return href;
  };

  const handleClick = () => {
    const href = getHref();
    router.push(href);
  };

  return (
    <Button
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

// Pre-configured buttons for common actions
export const ActionButtons = {
  // Authentication
  Login: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.login} variant="primary" {...props}>
      Entrar
    </Button>
  ),

  Register: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.register} variant="outline" {...props}>
      Criar Conta
    </Button>
  ),

  // Learning
  StartLearning: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.courses} variant="primary" {...props}>
      Começar a Aprender
    </Button>
  ),

  ViewCourses: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.courses} variant="secondary" {...props}>
      Ver Cursos
    </Button>
  ),

  // Tools
  OpenIDE: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.ide} variant="primary" {...props}>
      Abrir IDE
    </Button>
  ),

  TryAI: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.ai} variant="primary" {...props}>
      Experimentar IA
    </Button>
  ),

  // Business
  GetStarted: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.comecarAgora} variant="primary" {...props}>
      Começar Agora
    </Button>
  ),

  ViewPricing: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.pricing} variant="outline" {...props}>
      Ver Preços
    </Button>
  ),

  // Community
  JoinCommunity: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.community} variant="secondary" {...props}>
      Entrar na Comunidade
    </Button>
  ),

  // Support
  GetHelp: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.help} variant="ghost" {...props}>
      Obter Ajuda
    </Button>
  ),

  ContactUs: (props: Partial<ButtonProps>) => (
    <Button href={ROUTES.contact} variant="outline" {...props}>
      Fale Conosco
    </Button>
  ),

  // External
  GitHub: (props: Partial<ButtonProps>) => (
    <Button
      href={navigationHelpers.external.github}
      variant="outline"
      external
      {...props}
    >
      GitHub
    </Button>
  ),

  LinkedIn: (props: Partial<ButtonProps>) => (
    <Button
      href={navigationHelpers.external.linkedin}
      variant="outline"
      external
      {...props}
    >
      LinkedIn
    </Button>
  ),

  Discord: (props: Partial<ButtonProps>) => (
    <Button
      href={navigationHelpers.external.discord}
      variant="primary"
      external
      {...props}
    >
      Discord
    </Button>
  ),
};

export default Button;