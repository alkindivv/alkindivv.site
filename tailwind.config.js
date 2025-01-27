/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        paragraf: ['system-ui', 'ui-sans-serif', 'sans-serif'],
        homemade: ['"Homemade Apple"', 'cursive'],
      },
      colors: {
        primary: '#059669',
        secondary: '#34d399',
        customGray: '#374151',
      },
      screens: {
        sm: '440px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#d1d5db',
            a: {
              color: '#059669',
              '&:hover': {
                color: '#34d399',
              },
            },
            h1: {
              color: '#f8fafc',
            },
            h2: {
              color: '#f8fafc',
            },
            h3: {
              color: '#f8fafc',
            },
            strong: {
              color: '#ffffff',
              fontWeight: '700',
            },
            em: {
              color: '#ffffff',
              fontStyle: 'italic',
            },
            code: {
              color: '#f8fafc',
            },
            blockquote: {
              color: '#D4D4D4 !important',
              borderLeft: 'none',
            },
          },
        },
      },
      fontSize: {
        '10xl': ['2rem', { lineHeight: '2rem' }],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
