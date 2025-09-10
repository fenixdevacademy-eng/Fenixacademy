/**
 * Cloudflare Worker para Security Headers
 * Aplica headers de segurança em todas as requisições
 */

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const response = await fetch(request)

    // Criar nova resposta com headers de segurança
    const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
    })

    // Adicionar headers de segurança
    newResponse.headers.set('X-Frame-Options', 'DENY')
    newResponse.headers.set('X-Content-Type-Options', 'nosniff')
    newResponse.headers.set('Referrer-Policy', 'origin-when-cross-origin')
    newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    newResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

    // Content Security Policy
    newResponse.headers.set('Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https://api.fenix-academy.com https://www.google-analytics.com; " +
        "frame-src 'none'; " +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self'"
    )

    return newResponse
}


