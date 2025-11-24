/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'ink': '#1A1A1A',
        'beige': '#F4EFE6',
        'graphite': '#4B4B4B',
        'copper': '#B36B47',
        'ivory': '#FFFFFA',
      },
      fontFamily: {
        'serif': ['EB Garamond', 'Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
