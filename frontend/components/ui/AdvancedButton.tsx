'use client'

import React, { forwardRef, useState } from 'react'
// Declaração de tipos para framer-motion
declare const motion: any
declare const AnimatePresence: any
import { Loader2, Check, X, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { colors } from '@/lib/design-system/colors'
import { typography } from '@/lib/design-system/typography'

// Tipos do componente
export interface AdvancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  success?: boolean
  error?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  glow?: boolean
  ripple?: boolean
  pulse?: boolean
  gradient?: boolean
  disabled?: boolean
  children: React.ReactNode
}

// Variantes de estilo
const variants = {
  primary: {
    base: 'bg-primary-600 hover:bg-primary-700 text-white border-primary-600',
    loading: 'bg-primary-500 text-white',
    success: 'bg-success-600 text-white border-success-600',
    error: 'bg-error-600 text-white border-error-600',
  },
  secondary: {
    base: 'bg-secondary-600 hover:bg-secondary-700 text-white border-secondary-600',
    loading: 'bg-secondary-500 text-white',
    success: 'bg-success-600 text-white border-success-600',
    error: 'bg-error-600 text-white border-error-600',
  },
  outline: {
    base: 'bg-transparent hover:bg-primary-50 text-primary-600 border-primary-600',
    loading: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600 border-success-600',
    error: 'bg-error-50 text-error-600 border-error-600',
  },
  ghost: {
    base: 'bg-transparent hover:bg-neutral-100 text-neutral-700 border-transparent',
    loading: 'bg-neutral-50 text-neutral-600',
    success: 'bg-success-50 text-success-600',
    error: 'bg-error-50 text-error-600',
  },
  destructive: {
    base: 'bg-error-600 hover:bg-error-700 text-white border-error-600',
    loading: 'bg-error-500 text-white',
    success: 'bg-success-600 text-white border-success-600',
    error: 'bg-error-600 text-white border-error-600',
  },
  success: {
    base: 'bg-success-600 hover:bg-success-700 text-white border-success-600',
    loading: 'bg-success-500 text-white',
    success: 'bg-success-600 text-white border-success-600',
    error: 'bg-error-600 text-white border-error-600',
  },
  warning: {
    base: 'bg-warning-600 hover:bg-warning-700 text-white border-warning-600',
    loading: 'bg-warning-500 text-white',
    success: 'bg-success-600 text-white border-success-600',
    error: 'bg-error-600 text-white border-error-600',
  },
}

// Tamanhos
const sizes = {
  xs: 'h-8 px-2 text-xs',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-11 px-6 text-lg',
  xl: 'h-12 px-8 text-xl',
}

// Bordas arredondadas
const rounded = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

// Sombras
const shadows = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

// Componente principal
export const AdvancedButton = forwardRef<HTMLButtonElement, AdvancedButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    success = false,
    error = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    rounded: roundedProp = 'md',
    shadow = 'sm',
    glow = false,
    ripple = true,
    pulse = false,
    gradient = false,
    disabled = false,
    className,
    children,
    onClick,
    ...props
  }, ref) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

    // Função para criar efeito ripple
    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || disabled || loading) return

      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const newRipple = {
        id: Date.now(),
        x,
        y,
      }

      setRipples(prev => [...prev, newRipple])

      // Remover ripple após animação
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 600)
    }

    // Função para lidar com clique
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return
      createRipple(event)
      onClick?.(event)
    }

    // Determinar estado atual
    const currentState = loading ? 'loading' : success ? 'success' : error ? 'error' : 'base'
    const currentVariant = variants[variant][currentState]

    // Classes base
    const baseClasses = cn(
      'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      sizes[size],
      currentVariant,
      rounded[roundedProp],
      shadow !== 'none' && shadows[shadow],
      fullWidth && 'w-full',
      glow && 'shadow-lg shadow-primary-500/25',
      pulse && 'animate-pulse',
      gradient && 'bg-gradient-to-r from-primary-600 to-secondary-600',
      className
    )

    // Ícone de estado
    const getStateIcon = () => {
      if (loading) return <Loader2 className="w-4 h-4 animate-spin" />
      if (success) return <Check className="w-4 h-4" />
      if (error) return <X className="w-4 h-4" />
      return null
    }

    const stateIcon = getStateIcon()

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        onClick={handleClick}
        disabled={disabled || loading}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.1 }}
        {...(props as any)}
      >
        {/* Conteúdo do botão */}
        <div className="flex items-center gap-2">
          {/* Ícone à esquerda */}
          {icon && iconPosition === 'left' && !stateIcon && (
            <span className="flex-shrink-0">{icon}</span>
          )}

          {/* Ícone de estado */}
          {stateIcon && (
            <span className="flex-shrink-0">{stateIcon}</span>
          )}

          {/* Texto */}
          <span className="flex-1">{children}</span>

          {/* Ícone à direita */}
          {icon && iconPosition === 'right' && !stateIcon && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </div>

        {/* Efeito ripple */}
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute bg-white/30 rounded-full pointer-events-none"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 20,
                height: 20,
                marginLeft: -10,
                marginTop: -10,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {/* Efeito de brilho */}
        {glow && (
          <motion.div
            className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    )
  }
)

AdvancedButton.displayName = 'AdvancedButton'

// Componente de grupo de botões
export interface ButtonGroupProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  spacing = 'sm',
  className,
}) => {
  const spacingClasses = {
    none: 'gap-0',
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-4',
  }

  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </div>
  )
}

// Hook para gerenciar estado do botão
export const useButtonState = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const setLoadingState = (isLoading: boolean) => {
    setLoading(isLoading)
    if (isLoading) {
      setSuccess(false)
      setError(false)
    }
  }

  const setSuccessState = (isSuccess: boolean) => {
    setSuccess(isSuccess)
    if (isSuccess) {
      setLoading(false)
      setError(false)
    }
  }

  const setErrorState = (isError: boolean) => {
    setError(isError)
    if (isError) {
      setLoading(false)
      setSuccess(false)
    }
  }

  const resetState = () => {
    setLoading(false)
    setSuccess(false)
    setError(false)
  }

  return {
    loading,
    success,
    error,
    setLoadingState,
    setSuccessState,
    setErrorState,
    resetState,
  }
}

