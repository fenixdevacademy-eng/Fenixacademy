'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Monitor,
    Smartphone,
    Tablet,
    RefreshCw,
    ExternalLink,
    Maximize2,
    Minimize2,
    X,
    Play,
    Square,
    RotateCcw
} from 'lucide-react';

interface WebPreviewProps {
    isVisible: boolean;
    onToggle: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onClose: () => void;
    isMinimized: boolean;
    isMaximized: boolean;
    htmlContent?: string;
    cssContent?: string;
    jsContent?: string;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const WebPreview: React.FC<WebPreviewProps> = ({
    isVisible,
    onToggle,
    onMinimize,
    onMaximize,
    onClose,
    isMinimized,
    isMaximized,
    htmlContent = '',
    cssContent = '',
    jsContent = ''
}) => {
    const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [previewContent, setPreviewContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Gera o conteúdo completo para preview
    const generatePreviewContent = () => {
        const fullHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fenix IDE Preview</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
        }
        
        /* Reset básico */
        h1, h2, h3, h4, h5, h6 {
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        p {
            margin-bottom: 1rem;
        }
        
        a {
            color: #007bff;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        button {
            background: #007bff;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        button:hover {
            background: #0056b3;
        }
        
        input, textarea, select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
        }
        
        .grid {
            display: grid;
            gap: 1rem;
        }
        
        .flex {
            display: flex;
            gap: 1rem;
        }
        
        .text-center {
            text-align: center;
        }
        
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-3 { margin-top: 0.75rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-5 { margin-top: 1.25rem; }
        
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-5 { margin-bottom: 1.25rem; }
        
        .p-1 { padding: 0.25rem; }
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-5 { padding: 1.25rem; }
        
        .bg-primary { background-color: #007bff; }
        .bg-secondary { background-color: #6c757d; }
        .bg-success { background-color: #28a745; }
        .bg-danger { background-color: #dc3545; }
        .bg-warning { background-color: #ffc107; }
        .bg-info { background-color: #17a2b8; }
        .bg-light { background-color: #f8f9fa; }
        .bg-dark { background-color: #343a40; }
        
        .text-primary { color: #007bff; }
        .text-secondary { color: #6c757d; }
        .text-success { color: #28a745; }
        .text-danger { color: #dc3545; }
        .text-warning { color: #ffc107; }
        .text-info { color: #17a2b8; }
        .text-light { color: #f8f9fa; }
        .text-dark { color: #343a40; }
        
        .btn {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: 4px;
            text-decoration: none;
        }
        
        .btn-primary {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
        }
        
        .btn-primary:hover {
            color: #fff;
            background-color: #0056b3;
            border-color: #004085;
        }
        
        .btn-secondary {
            color: #fff;
            background-color: #6c757d;
            border-color: #6c757d;
        }
        
        .btn-success {
            color: #fff;
            background-color: #28a745;
            border-color: #28a745;
        }
        
        .btn-danger {
            color: #fff;
            background-color: #dc3545;
            border-color: #dc3545;
        }
        
        .btn-warning {
            color: #212529;
            background-color: #ffc107;
            border-color: #ffc107;
        }
        
        .btn-info {
            color: #fff;
            background-color: #17a2b8;
            border-color: #17a2b8;
        }
        
        .card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: 0.25rem;
        }
        
        .card-body {
            flex: 1 1 auto;
            padding: 1.25rem;
        }
        
        .card-title {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            font-weight: 500;
        }
        
        .card-text {
            margin-bottom: 0;
        }
        
        .alert {
            padding: 0.75rem 1.25rem;
            margin-bottom: 1rem;
            border: 1px solid transparent;
            border-radius: 0.25rem;
        }
        
        .alert-primary {
            color: #004085;
            background-color: #cce7ff;
            border-color: #b3d7ff;
        }
        
        .alert-secondary {
            color: #383d41;
            background-color: #e2e3e5;
            border-color: #d6d8db;
        }
        
        .alert-success {
            color: #155724;
            background-color: #d4edda;
            border-color: #c3e6cb;
        }
        
        .alert-danger {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
        }
        
        .alert-warning {
            color: #856404;
            background-color: #fff3cd;
            border-color: #ffeaa7;
        }
        
        .alert-info {
            color: #0c5460;
            background-color: #d1ecf1;
            border-color: #bee5eb;
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
            .container {
                padding: 0.5rem;
            }
            
            .grid {
                grid-template-columns: 1fr;
            }
            
            .flex {
                flex-direction: column;
            }
        }
        
        /* Estilos customizados do usuário */
        ${cssContent}
    </style>
</head>
<body>
    ${htmlContent || `
        <div class="container">
            <h1>🚀 Fenix IDE - Preview</h1>
            <p>Este é o preview do seu código. Edite os arquivos HTML, CSS e JavaScript para ver as mudanças aqui.</p>
            <div class="alert alert-info">
                <strong>Dica:</strong> Use o terminal para executar comandos como <code>npm start</code> ou <code>python -m http.server</code>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Recursos Disponíveis</h5>
                    <p class="card-text">Este preview suporta HTML, CSS e JavaScript moderno.</p>
                    <button class="btn btn-primary" onclick="alert('Olá do Fenix IDE!')">Testar JavaScript</button>
                </div>
            </div>
        </div>
    `}
    
    <script>
        // JavaScript do usuário
        ${jsContent}
        
        // Utilitários do Fenix IDE
        window.fenixIDE = {
            version: '1.0.0',
            refresh: () => {
                window.location.reload();
            },
            log: (message) => {
                console.log('[Fenix IDE]', message);
            }
        };
        
        // Log de inicialização
        console.log('🚀 Fenix IDE Preview carregado com sucesso!');
    </script>
</body>
</html>`;

        return fullHTML;
    };

    // Atualiza o preview quando o conteúdo muda
    useEffect(() => {
        try {
            const content = generatePreviewContent();
            setPreviewContent(content);
            setError(null);
        } catch (err) {
            setError('Erro ao gerar preview: ' + (err as Error).message);
        }
    }, [htmlContent, cssContent, jsContent]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            const content = generatePreviewContent();
            setPreviewContent(content);
            setError(null);

            // Simula delay de refresh
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
            setError('Erro ao atualizar preview: ' + (err as Error).message);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleRun = () => {
        setIsRunning(true);
        // Simula execução
        setTimeout(() => {
            setIsRunning(false);
        }, 1000);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setPreviewContent(generatePreviewContent());
        setError(null);
    };

    const getDeviceDimensions = () => {
        switch (deviceType) {
            case 'mobile':
                return { width: '375px', height: '667px' };
            case 'tablet':
                return { width: '768px', height: '1024px' };
            case 'desktop':
            default:
                return { width: '100%', height: '100%' };
        }
    };

    const dimensions = getDeviceDimensions();

    if (!isVisible) return null;

    return (
        <div className={`bg-white border-l border-gray-300 ${isMinimized ? 'h-8' : isMaximized ? 'h-screen' : 'h-full'
            } transition-all duration-300 flex flex-col`}>
            {/* Header do Preview */}
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-b border-gray-300">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Monitor className="w-4 h-4" />
                        <span className="text-sm font-medium">Preview</span>
                    </div>

                    {/* Seletor de dispositivo */}
                    <div className="flex items-center space-x-1 bg-white rounded border">
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
                </div>

                <div className="flex items-center space-x-2">
                    {/* Controles de execução */}
                    {!isRunning ? (
                        <button
                            onClick={handleRun}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Executar"
                        >
                            <Play className="w-4 h-4 text-green-600" />
                        </button>
                    ) : (
                        <button
                            onClick={handleStop}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Parar"
                        >
                            <Square className="w-4 h-4 text-red-600" />
                        </button>
                    )}

                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                        title="Atualizar"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>

                    <button
                        onClick={handleReset}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Resetar"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                        onClick={onMinimize}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Minimizar"
                    >
                        <Minimize2 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={onMaximize}
                        className="p-1 hover:bg-gray-200 rounded"
                        title={isMaximized ? "Restaurar" : "Maximizar"}
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Fechar"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Conteúdo do Preview */}
            <div className="flex-1 relative overflow-hidden">
                {error ? (
                    <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded m-4">
                        <h3 className="font-semibold mb-2">Erro no Preview</h3>
                        <p className="text-sm">{error}</p>
                    </div>
                ) : (
                    <div className="h-full flex justify-center items-start bg-gray-50 p-4">
                        <div
                            className="bg-white shadow-lg rounded-lg overflow-hidden"
                            style={{
                                width: deviceType !== 'desktop' ? dimensions.width : '100%',
                                height: deviceType !== 'desktop' ? dimensions.height : '100%',
                                maxHeight: '100%'
                            }}
                        >
                            <iframe
                                ref={iframeRef}
                                srcDoc={previewContent}
                                className="w-full h-full border-0"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                title="Fenix IDE Preview"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WebPreview;
