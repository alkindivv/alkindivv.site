/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
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
              color: '#d1d5db',
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
