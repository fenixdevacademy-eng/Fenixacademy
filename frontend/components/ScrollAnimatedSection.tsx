'use client'

import React, { useRef, useEffect, useState } from 'react'

interface ScrollAnimatedSectionProps {
    children: React.ReactNode
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    className?: string
    threshold?: number
    duration?: number
    stagger?: number
}

export default function ScrollAnimatedSection({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    threshold = 0.1,
    duration = 0.6,
    stagger = 0.1
}: ScrollAnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                }
            },
            {
                threshold,
                rootMargin: "-100px 0px"
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [threshold])

    const getAnimationClass = () => {
        if (!isInView) {
            switch (direction) {
                case 'up':
                    return 'opacity-0 translate-y-16'
                case 'down':
                    return 'opacity-0 -translate-y-16'
                case 'left':
                    return 'opacity-0 translate-x-16'
                case 'right':
                    return 'opacity-0 -translate-x-16'
                default:
                    return 'opacity-0 translate-y-16'
            }
        }
        return 'opacity-100 translate-y-0 translate-x-0'
    }

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
            style={{ transitionDelay: `${delay * 1000}ms` }}
        >
            {children}
        </div>
    )
}


