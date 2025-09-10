import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fenix Academy - CS50 Quality Education',
    short_name: 'Fenix Academy',
    description: 'Aprenda programação com a qualidade do CS50 de Harvard, mas com foco no mercado brasileiro.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1f2937',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    categories: ['education', 'productivity', 'developer'],
    lang: 'pt-BR',
    dir: 'ltr',
  }
}
