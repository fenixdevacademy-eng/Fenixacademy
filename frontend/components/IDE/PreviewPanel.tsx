'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff, RefreshCw, ExternalLink, Download, Maximize2, Minimize2, Monitor, Smartphone, Tablet } from 'lucide-react'

interface PreviewPanelProps {
    content: string
    type: 'html' | 'markdown' | 'image' | 'json'
    theme: 'light' | 'dark' | 'fenix'
}

export default function PreviewPanel({ content, type, theme }: PreviewPanelProps) {
    const [isPreviewVisible, setIsPreviewVisible] = useState(true)
    const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const previewRef = useRef<HTMLDivElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        if (isPreviewVisible && content) {
            setIsLoading(true)

            // Simular carregamento
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    }, [content, isPreviewVisible])

    const renderPreview = () => {
        if (!isPreviewVisible || !content) {
            return (
                <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                        <EyeOff className="h-12 w-12 mx-auto mb-2" />
                        <p>Preview não disponível</p>
                    </div>
                </div>
            )
        }

        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-2"></div>
                        <p className="text-gray-400">Carregando preview...</p>
                    </div>
                </div>
            )
        }

        switch (type) {
            case 'html':
                return (
                    <iframe
                        ref={iframeRef}
                        srcDoc={content}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin"
                        title="HTML Preview"
                    />
                )

            case 'markdown':
                return (
                    <div className="p-4 prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
                    </div>
                )

            case 'json':
                return (
                    <div className="p-4">
                        <pre className="text-sm text-gray-300 overflow-auto">
                            <code>{JSON.stringify(JSON.parse(content), null, 2)}</code>
                        </pre>
                    </div>
                )

            case 'image':
                return (
                    <div className="flex items-center justify-center h-full">
                        <img
                            src={content}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none'
                            }}
                        />
                    </div>
                )

            default:
                return (
                    <div className="p-4">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap">{content}</pre>
                    </div>
                )
        }
    }

    const renderMarkdown = (markdown: string) => {
        // Conversor básico de Markdown para HTML
        return markdown
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2">$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
            .replace(/`(.*)`/gim, '<code class="bg-gray-700 px-1 py-0.5 rounded text-sm">$1</code>')
            .replace(/```([\s\S]*?)```/gim, '<pre class="bg-gray-800 p-4 rounded overflow-x-auto"><code>$1</code></pre>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
            .replace(/\n/gim, '<br>')
    }

    const getPreviewWidth = () => {
        switch (previewMode) {
            case 'mobile':
                return 'w-80'
            case 'tablet':
                return 'w-96'
            case 'desktop':
            default:
                return 'w-full'
        }
    }

    const handleRefresh = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src
        }
    }

    const handleOpenExternal = () => {
        if (type === 'html') {
            const blob = new Blob([content], { type: 'text/html' })
            const url = URL.createObjectURL(blob)
            window.open(url, '_blank')
        }
    }

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `preview.${type === 'html' ? 'html' : type === 'markdown' ? 'md' : 'txt'}`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900' : theme === 'light' ? 'bg-gray-50' : 'bg-black/30 backdrop-blur-sm'}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">Preview</span>
                    <span className="text-xs text-gray-400 uppercase">({type})</span>
                </div>

                <div className="flex items-center space-x-1">
                    {/* Device Mode Toggle */}
                    <div className="flex items-center space-x-1 mr-2">
                        <button
                            onClick={() => setPreviewMode('desktop')}
                            className={`p-1 rounded ${previewMode === 'desktop' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                            title="Desktop"
                        >
                            <Monitor className="h-4 w-4 text-white" />
                        </button>
                        <button
                            onClick={() => setPreviewMode('tablet')}
                            className={`p-1 rounded ${previewMode === 'tablet' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                            title="Tablet"
                        >
                            <Tablet className="h-4 w-4 text-white" />
                        </button>
                        <button
                            onClick={() => setPreviewMode('mobile')}
                            className={`p-1 rounded ${previewMode === 'mobile' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                            title="Mobile"
                        >
                            <Smartphone className="h-4 w-4 text-white" />
                        </button>
                    </div>

                    {/* Actions */}
                    <button
                        onClick={handleRefresh}
                        className="p-1 hover:bg-gray-700 rounded"
                        title="Atualizar preview"
                    >
                        <RefreshCw className="h-4 w-4 text-gray-400" />
                    </button>

                    <button
                        onClick={handleOpenExternal}
                        className="p-1 hover:bg-gray-700 rounded"
                        title="Abrir em nova aba"
                    >
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                    </button>

                    <button
                        onClick={handleDownload}
                        className="p-1 hover:bg-gray-700 rounded"
                        title="Download"
                    >
                        <Download className="h-4 w-4 text-gray-400" />
                    </button>

                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-1 hover:bg-gray-700 rounded"
                        title={isFullscreen ? 'Sair do modo tela cheia' : 'Modo tela cheia'}
                    >
                        {isFullscreen ? <Minimize2 className="h-4 w-4 text-gray-400" /> : <Maximize2 className="h-4 w-4 text-gray-400" />}
                    </button>
                </div>
            </div>

            {/* Preview Content */}
            <div className={`flex-1 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : ''}`}>
                <div className={`h-full mx-auto ${getPreviewWidth()} ${isFullscreen ? 'w-full' : ''}`}>
                    {renderPreview()}
                </div>
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Modo: {previewMode}</span>
                    <span>{content.length} caracteres</span>
                </div>
            </div>
        </div>
    )
}













