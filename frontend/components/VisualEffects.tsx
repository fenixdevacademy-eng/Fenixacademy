'use client'

import React, { useEffect, useRef } from 'react'

const VisualEffects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating geometric shapes
    const createShape = () => {
      const shape = document.createElement('div')
      const size = Math.random() * 100 + 50
      const shapes = ['circle', 'triangle', 'square', 'hexagon']
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)]
      
      shape.className = `absolute ${shapeType} opacity-10 animate-float`
      shape.style.width = `${size}px`
      shape.style.height = `${size}px`
      shape.style.left = `${Math.random() * 100}%`
      shape.style.top = `${Math.random() * 100}%`
      shape.style.animationDelay = `${Math.random() * 5}s`
      shape.style.animationDuration = `${Math.random() * 10 + 10}s`
      
      // Add gradient background
      const gradients = [
        'linear-gradient(45deg, #3b82f6, #8b5cf6)',
        'linear-gradient(45deg, #06b6d4, #10b981)',
        'linear-gradient(45deg, #f59e0b, #ef4444)',
        'linear-gradient(45deg, #8b5cf6, #ec4899)'
      ]
      shape.style.background = gradients[Math.floor(Math.random() * gradients.length)]
      
      container.appendChild(shape)
      
      // Remove shape after animation
      setTimeout(() => {
        if (shape.parentNode) {
          shape.parentNode.removeChild(shape)
        }
      }, 20000)
    }

    // Create shapes periodically
    const interval = setInterval(createShape, 2000)
    
    // Create initial shapes
    for (let i = 0; i < 5; i++) {
      setTimeout(createShape, i * 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-blue-400 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse-slow blur-xl"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full opacity-20 animate-pulse-slow blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-20 animate-pulse-slow blur-xl"></div>
    </div>
  )
}

export default VisualEffects

