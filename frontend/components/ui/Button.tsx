import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  showArrow?: boolean;
  animate?: boolean;
  hover?: 'scale' | 'lift' | 'glow' | 'none';
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    showArrow = false,
    animate = true,
    hover = 'scale',
    fullWidth = false,
    children,
    disabled,
    ...props
  }, ref) => {
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
    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          hoverEffects[hover],
          animationStyles,
          widthStyles,
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
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

            {showArrow && !loading && (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;