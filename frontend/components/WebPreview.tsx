'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    RefreshCw,
    Maximize2,
    Minimize2,
    RotateCcw,
    Monitor,
    Tablet,
    Smartphone
} from 'lucide-react';

interface WebPreviewProps {
    htmlContent?: string;
    cssContent?: string;
    jsContent?: string;
    className?: string;
    title?: string;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const deviceDimensions = {
    desktop: { width: '100%', height: '600px' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' }
};

export function WebPreview({
    htmlContent = '',
    cssContent = '',
    jsContent = '',
    className = '',
    title = 'Preview'
}: WebPreviewProps) {
    const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
    const [isMaximized, setIsMaximized] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const dimensions = deviceDimensions[deviceType];

    const generatePreviewContent = () => {
        const fullHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          ${cssContent}
        </style>
      </head>
      <body>
        ${htmlContent}
        <script>
          try {
            ${jsContent}
          } catch (error) {
            console.error('JavaScript Error:', error);
          }
        </script>
      </body>
      </html>
    `;
        return fullHtml;
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setError(null);

        try {
            // Simular delay de refresh
            await new Promise(resolve => setTimeout(resolve, 500));

            if (iframeRef.current) {
                iframeRef.current.src = iframeRef.current.src;
            }
        } catch (err) {
            setError('Erro ao atualizar preview');
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleReset = () => {
        setDeviceType('desktop');
        setIsMaximized(false);
        setError(null);
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            setError(null);
        };

        const handleError = () => {
            setError('Erro ao carregar preview');
        };

        iframe.addEventListener('load', handleLoad);
        iframe.addEventListener('error', handleError);

        return () => {
            iframe.removeEventListener('load', handleLoad);
            iframe.removeEventListener('error', handleError);
        };
    }, []);

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>

                <div className="flex items-center space-x-2">
                    {/* Device Selector */}
                    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => setDeviceType('desktop')}
                            className={`p-1 rounded ${deviceType === 'desktop' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                            title="Desktop"
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setDeviceType('tablet')}
                            className={`p-1 rounded ${deviceType === 'tablet' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                            title="Tablet"
                        >
                            <Tablet className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setDeviceType('mobile')}
                            className={`p-1 rounded ${deviceType === 'mobile' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                            title="Mobile"
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Controls */}
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        title="Atualizar"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>

                    <button
                        onClick={handleReset}
                        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        title="Resetar"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                        onClick={handleMaximize}
                        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        title={isMaximized ? "Restaurar" : "Maximizar"}
                    >
                        {isMaximized ? (
                            <Minimize2 className="w-4 h-4" />
                        ) : (
                            <Maximize2 className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Preview Content */}
            <div className={`relative ${isMaximized ? 'fixed inset-0 z-50 bg-white dark:bg-gray-800' : ''}`}>
                {error ? (
                    <div className="h-full flex justify-center items-start bg-gray-50 p-4">
                        <div className="text-center">
                            <p className="text-sm text-red-500">{error}</p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="h-full flex justify-center items-start bg-gray-50 p-4"
                        style={{
                            width: deviceType !== 'desktop' ? dimensions.width : '100%',
                            height: deviceType !== 'desktop' ? dimensions.height : '100%',
                            margin: '0 auto'
                        }}
                    >
                        <iframe
                            ref={iframeRef}
                            srcDoc={generatePreviewContent()}
                            className="w-full h-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white"
                            sandbox="allow-scripts allow-same-origin"
                            title="Preview"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}