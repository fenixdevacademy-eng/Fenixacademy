'use client'

import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { motion } from 'framer-motion'

interface AnimatedSectionProps {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
    duration?: number
    distance?: number
    triggerOnce?: boolean
    threshold?: number
}

const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
    fade: { opacity: 0 }
}

const directionAnimate = {
    up: { y: 0, opacity: 1 },
    down: { y: 0, opacity: 1 },
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 },
    fade: { opacity: 1 }
}

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.6,
    distance = 50,
    triggerOnce = true,
    threshold = 0.1
}: AnimatedSectionProps) {
    const { ref, isVisible } = useScrollAnimation({
        threshold,
        triggerOnce,
        delay
    })

    const customVariants = {
        hidden: {
            ...directionVariants[direction],
            y: direction === 'up' ? distance : direction === 'down' ? -distance : directionVariants[direction].y,
            x: direction === 'left' ? distance : direction === 'right' ? -distance : directionVariants[direction].x
        },
        visible: {
            ...directionAnimate[direction],
            transition: {
                duration,
                delay: delay / 1000,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={customVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
        >
            {children}
        </motion.div>
    )
}


