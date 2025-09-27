'use client';

import React from 'react';
import Link from 'next/link';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink, Loader2 } from 'lucide-react';

export interface NavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // Navigation props
    href?: string;
    external?: boolean;
    replace?: boolean;
    scroll?: boolean;

    // Button styling
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'gradient';
    size?: 'sm' | 'md' | 'lg' | 'xl';

    // Visual props
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    showArrow?: boolean;
    loading?: boolean;

    // Animation props
    animate?: boolean;
    hover?: 'scale' | 'lift' | 'glow' | 'none';

    // Accessibility
    ariaLabel?: string;
    tooltip?: string;
}

const NavigationButton = React.forwardRef<HTMLButtonElement, NavigationButtonProps>(
    ({
        className,
        href,
        external = false,
        replace = false,
        scroll = true,
        variant = 'primary',
        size = 'md',
        icon,
        iconPosition = 'left',
        showArrow = false,
        loading = false,
        animate = true,
        hover = 'scale',
        ariaLabel,
        tooltip,
        children,
        disabled,
        onClick,
        ...props
    }, ref) => {
        const { navigate, isLoading } = useNavigation();

        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "theme-gradient-primary text-white shadow-lg hover:shadow-xl focus:ring-theme-primary",
            secondary: "theme-surface text-white hover:opacity-90 focus:ring-theme-primary border theme-border",
            outline: "border-2 border-theme-primary text-theme-primary hover:theme-surface hover:text-white focus:ring-theme-primary",
            ghost: "text-theme-text hover:theme-surface hover:text-white focus:ring-theme-primary",
            destructive: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
            gradient: "theme-gradient-primary text-white shadow-lg hover:shadow-xl focus:ring-theme-primary"
        }

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-6 py-3 text-lg",
            xl: "px-8 py-4 text-xl"
        }

        const hoverEffects = {
            scale: "hover:scale-105 active:scale-95",
            lift: "hover:-translate-y-1 active:translate-y-0",
            glow: "hover:shadow-2xl hover:shadow-theme-primary/25",
            none: ""
        }

        const animationStyles = animate ? "transform-gpu" : "";

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (loading || isLoading || disabled) {
                e.preventDefault();
                return;
            }

            if (onClick) {
                onClick(e);
            }

            if (href && !external) {
                e.preventDefault();
                navigate(href, { replace, scroll });
            }
        }

        const buttonContent = (
            <>
                {loading || isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : (
                    <>
                        {icon && iconPosition === 'left' && (
                            <span className="mr-2">{icon}</span>
                        )}

                        {children}

                        {icon && iconPosition === 'right' && (
                            <span className="ml-2">{icon}</span>
                        )}

                        {showArrow && !loading && !isLoading && (
                            <ArrowRight className="ml-2 h-4 w-4" />
                        )}

                        {external && (
                            <ExternalLink className="ml-2 h-4 w-4" />
                        )}
                    </>
                )}
            </>
        );

        const buttonClasses = cn(
            baseStyles,
            variants[variant],
            sizes[size],
            hoverEffects[hover],
            animationStyles,
            className
        );

        if (href && external) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                    aria-label={ariaLabel}
                    title={tooltip}
                >
                    {buttonContent}
                </a>
            );
        }

        if (href && !external) {
            return (
                <Link
                    href={href}
                    replace={replace}
                    scroll={scroll}
                    className={buttonClasses}
                    aria-label={ariaLabel}
                    title={tooltip}
                >
                    {buttonContent}
                </Link>
            );
        }

        return (
            <button
                className={buttonClasses}
                disabled={disabled || loading || isLoading}
                ref={ref}
                onClick={handleClick}
                aria-label={ariaLabel}
                title={tooltip}
                {...props}
            >
                {buttonContent}
            </button>
        );
    }
);

NavigationButton.displayName = "NavigationButton";

export default NavigationButton;