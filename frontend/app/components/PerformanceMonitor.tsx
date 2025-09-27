'use client'

import { useEffect, useRef } from 'react'

export function PerformanceMonitor() {
    const observerRef = useRef<PerformanceObserver | null>(null)
    const memoryIntervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Web Vitals monitoring com debounce para evitar long tasks
        const observeWebVitals = () => {
            let cls = 0
            let lastLcpTime = 0
            let lastFidTime = 0

            // Debounced logging para evitar spam no console
            const debouncedLog = (() => {
                let timeoutId: NodeJS.Timeout
                return (type: string, value: number) => {
                    clearTimeout(timeoutId)
                    timeoutId = setTimeout(() => {
                        console.log(`[Performance] ${type}:`, value)
                    }, 1000)
                }
            })()

            try {
                if ('PerformanceObserver' in window) {
                    // LCP - Largest Contentful Paint
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries()
                        const lastEntry = entries[entries.length - 1] as any
                        if (lastEntry && lastEntry.startTime !== lastLcpTime) {
                            lastLcpTime = lastEntry.startTime
                            debouncedLog('LCP', lastEntry.startTime)
                        }
                    })
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

                    // FID - First Input Delay
                    const fidObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries()
                        entries.forEach((entry: any) => {
                            if (entry.processingStart && entry.startTime !== lastFidTime) {
                                lastFidTime = entry.startTime
                                const fid = entry.processingStart - entry.startTime
                                debouncedLog('FID', fid)
                            }
                        })
                    })
                    fidObserver.observe({ entryTypes: ['first-input'] })

                    // CLS - Cumulative Layout Shift
                    const clsObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries()
                        entries.forEach((entry: any) => {
                            if (!entry.hadRecentInput) {
                                cls += entry.value
                                debouncedLog('CLS', cls)
                            }
                        })
                    })
                    clsObserver.observe({ entryTypes: ['layout-shift'] })

                    // FCP - First Contentful Paint
                    const fcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries()
                        entries.forEach((entry) => {
                            if (entry.name === 'first-contentful-paint') {
                                debouncedLog('FCP', entry.startTime)
                            }
                        })
                    })
                    fcpObserver.observe({ entryTypes: ['paint'] })

                    observerRef.current = lcpObserver
                }
            } catch (error) {
                console.warn('[Performance] Web Vitals monitoring not supported:', error)
            }
        }

        // Memory monitoring (apenas em desenvolvimento)
        const observeMemory = () => {
            if ('memory' in performance && process.env.NODE_ENV === 'development') {
                const logMemory = () => {
                    const memory = (performance as any).memory
                    if (memory) {
                        console.log('[Performance] Memory:', {
                            used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + ' MB',
                            total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + ' MB',
                            limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
                        })
                    }
                }

                memoryIntervalRef.current = setInterval(logMemory, 10000) // A cada 10 segundos
            }
        }

        // Iniciar monitoramento
        observeWebVitals()
        observeMemory()

        // Cleanup
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
            if (memoryIntervalRef.current) {
                clearInterval(memoryIntervalRef.current)
            }
        }
    }, [])

    return null // Este componente não renderiza nada
}