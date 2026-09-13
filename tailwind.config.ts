import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2EDE3',
        ink: '#141210',
        red: '#C1341A',
        ghost: '#D9D3C6',
      },
      fontFamily: {
        serif: ['var(--font-shippori)', 'serif'],
        sans: ['var(--font-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
