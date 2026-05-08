import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#1FA9DD',
          'cyan-dark': '#1186B5',
          gold: '#D4AF37',
          'gold-light': '#F0C95A',
          ink: '#0A0E14',
          'ink-soft': '#0F141C',
          slate: '#8A95A5',
          mist: '#E5E8EE'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(31, 169, 221, 0.55)',
        'glow-gold': '0 0 40px -10px rgba(212, 175, 55, 0.45)'
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(10,14,20,0) 0%, rgba(10,14,20,0.6) 60%, rgba(10,14,20,1) 100%)'
      }
    }
  },
  plugins: []
};

export default config;
