// Configuração de otimização para Monaco Editor
window.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
            return '/_next/static/workers/json.worker.js'
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return '/_next/static/workers/css.worker.js'
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return '/_next/static/workers/html.worker.js'
        }
        if (label === 'typescript' || label === 'javascript') {
            return '/_next/static/workers/ts.worker.js'
        }
        return '/_next/static/workers/editor.worker.js'
    }
}

// Configurações de performance do Monaco Editor
window.MonacoEditorPerformanceConfig = {
    // Reduzir o uso de memória
    maxTokenizationLineLength: 20000,
    maxTokenizationLineNumber: 1000,

    // Otimizações de renderização
    renderWhitespace: 'none',
    renderControlCharacters: false,
    renderLineHighlight: 'line',

    // Otimizações de IntelliSense
    quickSuggestionsDelay: 0,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: 'on',

    // Otimizações de scroll
    smoothScrolling: true,
    mouseWheelScrollSensitivity: 1,

    // Otimizações de minimap
    minimap: {
        enabled: true,
        maxColumn: 120,
        renderCharacters: false,
        scale: 1
    }
}

// Preload dos workers para melhor performance
if (typeof window !== 'undefined') {
    // Preload dos workers principais
    const workers = [
        '/_next/static/workers/editor.worker.js',
        '/_next/static/workers/html.worker.js',
        '/_next/static/workers/ts.worker.js'
    ]

    workers.forEach(workerUrl => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = workerUrl
        link.as = 'script'
        document.head.appendChild(link)
    })
}








