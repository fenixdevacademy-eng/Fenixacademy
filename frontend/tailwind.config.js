/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#181818', // preto
        primary: '#FF6A00',   // laranja
        foreground: '#FFFFFF', // branco
        dark: '#181818',
        orange: '#FF6A00',
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [],
} 