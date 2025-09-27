import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    name: "Fênix Dev Academy",
    short_name: "Fênix",
    description: "A melhor plataforma de cursos de programação do Brasil",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a2e",
    theme_color: "#16213e",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    categories: ["education", "productivity"],
    lang: "pt-BR",
    dir: "ltr"
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  })
}
