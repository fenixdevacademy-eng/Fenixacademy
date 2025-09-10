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
                        console.log(`${type}:`, value)
                    }, 100)
                }
            })()

            // Cumulative Layout Shift (CLS) - otimizado
            if ('PerformanceObserver' in window) {
                try {
                    const clsObserver = new PerformanceObserver((list) => {
                        requestIdleCallback(() => {
                            for (const entry of list.getEntries()) {
                                if (!(entry as any).hadRecentInput) {
                                    cls += (entry as any).value
                                }
                            }
                        })
                    })
                    clsObserver.observe({ type: 'layout-shift', buffered: true })
                } catch (error) {
                    console.warn('CLS observer failed:', error)
                }
            }

            // First Input Delay (FID) - otimizado
            if ('PerformanceObserver' in window) {
                try {
                    const fidObserver = new PerformanceObserver((list) => {
                        requestIdleCallback(() => {
                            for (const entry of list.getEntries()) {
                                if ('processingStart' in entry && 'startTime' in entry) {
                                    const fid = (entry as any).processingStart - entry.startTime
                                    if (fid !== lastFidTime) {
                                        lastFidTime = fid
                                        debouncedLog('FID', fid)
                                    }
                                }
                            }
                        })
                    })
                    fidObserver.observe({ type: 'first-input', buffered: true })
                } catch (error) {
                    console.warn('FID observer failed:', error)
                }
            }

            // Largest Contentful Paint (LCP) - otimizado
            if ('PerformanceObserver' in window) {
                try {
                    const lcpObserver = new PerformanceObserver((list) => {
                        requestIdleCallback(() => {
                            const entries = list.getEntries()
                            const lastEntry = entries[entries.length - 1]
                            if (lastEntry.startTime !== lastLcpTime) {
                                lastLcpTime = lastEntry.startTime
                                debouncedLog('LCP', lastEntry.startTime)
                            }
                        })
                    })
                    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
                } catch (error) {
                    console.warn('LCP observer failed:', error)
                }
            }

            // Core Web Vitals reporting - otimizado
            window.addEventListener('beforeunload', () => {
                if (cls > 0) {
                    console.log('CLS:', cls)
                }
            })
        }

        // Long task monitoring - otimizado para evitar long tasks
        if ('PerformanceObserver' in window) {
            try {
                observerRef.current = new PerformanceObserver((list) => {
                    requestIdleCallback(() => {
                        for (const entry of list.getEntries()) {
                            // Só reporta tasks muito longos para evitar spam
                            if (entry.duration > 100) {
                                console.warn('Long task detected:', Math.round(entry.duration) + 'ms')
                            }
                        }
                    })
                })
                observerRef.current.observe({ entryTypes: ['longtask'] })
            } catch (error) {
                console.warn('Long task observer failed:', error)
            }
        }

        // Memory usage monitoring - otimizado
        const monitorMemory = () => {
            if ('memory' in performance) {
                try {
                    const memory = (performance as any).memory
                    const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100

                    // Só reporta se o uso for muito alto
                    if (usagePercent > 95) {
                        console.warn('Critical memory usage:', Math.round(usagePercent) + '%')
                    }
                } catch (error) {
                    console.warn('Memory monitoring failed:', error)
                }
            }
        }

        // Iniciar monitoramento com delay para não impactar a inicialização
        const startMonitoring = () => {
            observeWebVitals()

            // Memory monitoring com intervalo maior para reduzir overhead
            memoryIntervalRef.current = setInterval(monitorMemory, 60000) // 1 minuto
        }

        // Delay para não impactar a performance inicial
        const startTimeout = setTimeout(startMonitoring, 1000)

        return () => {
            clearTimeout(startTimeout)
            if (memoryIntervalRef.current) {
                clearInterval(memoryIntervalRef.current)
            }
            if (observerRef.current) {
                try {
                    observerRef.current.disconnect()
                } catch (error) {
                    console.warn('Observer disconnect failed:', error)
                }
            }
        }
    }, [])

    return null // Este componente não renderiza nada
}












