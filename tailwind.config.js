/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
      },
      colors: {
        noir: {
          DEFAULT: '#0A0A0A',
          deep: '#050505',
          light: '#181818',
          card: '#1F1F1F',
          border: '#2C2C2C'
        },
        alabaster: {
          DEFAULT: '#FAF8F5',
          pure: '#FFFFFF',
          soft: '#F4EFEB',
          border: '#E8E1D7'
        },
        sand: {
          light: '#F5F0E8',
          DEFAULT: '#EAE1D2',
          dark: '#C8BBA5'
        },
        gold: {
          DEFAULT: '#C5A880',
          light: '#E5D5BA',
          dark: '#967954',
          accent: '#D4AF37'
        }
      },
      letterSpacing: {
        'luxury': '0.2em',
        'luxury-wide': '0.3em',
        'luxury-ultra': '0.4em'
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 1, 0.5, 1)'
      }
    },
  },
  plugins: [],
}

