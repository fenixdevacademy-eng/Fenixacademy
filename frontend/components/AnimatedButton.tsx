'use client'

import React from 'react'
import { useMicrointeractions } from '@/hooks/useMicrointeractions'
import { motion } from 'framer-motion'

interface AnimatedButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    href?: string
    target?: string
    rel?: string
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    glowEffect?: boolean
    rippleEffect?: boolean
}

const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    ghost: 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
}

const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
}

export default function AnimatedButton({
    children,
    onClick,
    className = '',
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    href,
    target,
    rel,
    icon,
    iconPosition = 'left',
    glowEffect = true,
    rippleEffect = true
}: AnimatedButtonProps) {
    const { state, handlers, getButtonStyles } = useMicrointeractions()

    const baseClasses = `
    relative inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim()

    const buttonContent = (
        <>
            {icon && iconPosition === 'left' && (
                <span className="mr-2 transition-transform duration-200 group-hover:scale-110">
                    {icon}
                </span>
            )}

            <span className="relative z-10">{children}</span>

            {icon && iconPosition === 'right' && (
                <span className="ml-2 transition-transform duration-200 group-hover:scale-110">
                    {icon}
                </span>
            )}

            {/* Ripple Effect */}
            {rippleEffect && state.isPressed && (
                <motion.div
                    className="absolute inset-0 bg-white opacity-20 rounded-xl"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            )}

            {/* Glow Effect */}
            {glowEffect && state.glowIntensity > 0 && (
                <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background: `radial-gradient(circle, rgba(59, 130, 246, ${0.3 * state.glowIntensity}) 0%, transparent 70%)`,
                        filter: 'blur(8px)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </>
    )

    const buttonProps = {
        ...handlers,
        type,
        disabled,
        className: baseClasses,
        style: getButtonStyles()
    }

    if (href) {
        return (
            <motion.a
                href={href}
                target={target}
                rel={rel}
                {...buttonProps}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {buttonContent}
            </motion.a>
        )
    }

    return (
        <motion.button
            onClick={onClick}
            {...buttonProps}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {buttonContent}
        </motion.button>
    )
}


