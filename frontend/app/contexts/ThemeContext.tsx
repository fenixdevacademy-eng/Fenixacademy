'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    effectiveTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

interface ThemeProviderProps {
    children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>('system')
    const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        const updateEffectiveTheme = () => {
            if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                setEffectiveTheme(systemTheme)
            } else {
                setEffectiveTheme(theme)
            }
        }

        updateEffectiveTheme()

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', updateEffectiveTheme)

        return () => mediaQuery.removeEventListener('change', updateEffectiveTheme)
    }, [theme])

    useEffect(() => {
        // Apply theme to document
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(effectiveTheme)

        // Save theme to localStorage
        localStorage.setItem('theme', theme)
    }, [theme, effectiveTheme])

    const value = {
        theme,
        setTheme,
        effectiveTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}



