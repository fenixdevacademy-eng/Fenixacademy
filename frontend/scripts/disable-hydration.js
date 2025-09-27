// Script para desabilitar hidratação em produção
if (typeof window !== 'undefined') {
    // Desabilitar warnings de hidratação
    const originalError = console.error;
    console.error = (...args) => {
        if (
            typeof args[0] === 'string' &&
            (args[0].includes('hydration') ||
                args[0].includes('Hydration') ||
                args[0].includes('425') ||
                args[0].includes('418') ||
                args[0].includes('423'))
        ) {
            // Suprimir erros de hidratação
            return;
        }
        originalError.apply(console, args);
    };

    // Interceptar erros de hidratação
    window.addEventListener('error', (event) => {
        if (
            event.message &&
            (event.message.includes('hydration') ||
                event.message.includes('Hydration') ||
                event.message.includes('425') ||
                event.message.includes('418') ||
                event.message.includes('423'))
        ) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    });

    // Interceptar unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        if (
            event.reason &&
            event.reason.message &&
            (event.reason.message.includes('hydration') ||
                event.reason.message.includes('Hydration') ||
                event.reason.message.includes('425') ||
                event.reason.message.includes('418') ||
                event.reason.message.includes('423'))
        ) {
            event.preventDefault();
            return false;
        }
    });
}




