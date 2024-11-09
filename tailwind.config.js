/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      colors: {
        'primary': '#756680',
        'secondary': '#DB8CFF',
        'accent': '#9BFF4D',
        'mild-yellow': "#FFF14D"
      },
      fontFamily: {
        dynapuff: ['DynaPuff', 'sans-serif'],
      },
      fontSize: {
        't1': ['2.25rem', { lineHeight: '2.5rem', fontWeight: 'bold' }], // H1 style
        't2': ['1.5rem', { lineHeight: '2rem', fontWeight: 'semibold' }], // Subtitle
        'p1': ['1rem', { lineHeight: '1.5rem' }], // Paragraph
        'p2': ['0.875rem', { lineHeight: '1.25rem' }] // Small text
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.t1': {
          fontSize: '1.875rem', // Mobile font size (30px)
          lineHeight: '2.25rem',
          fontWeight: 'bold',
          '@screen lg': {
            fontSize: '4.25rem', // Desktop font size (36px)
            lineHeight: '4.5rem',
          }
        },
        '.t2': {
          fontSize: '1.25rem', // Mobile font size (20px)
          lineHeight: '1.75rem',
          fontWeight: '600', // Semi-bold
          '@screen lg': {
            fontSize: '3.5rem', // Desktop font size (24px)
            lineHeight: '4rem',
          }
        },
        '.p1': {
          fontSize: '0.875rem', // Mobile font size (14px)
          lineHeight: '1.25rem',
          '@screen lg': {
            fontSize: '2rem', // Desktop font size (16px)
            lineHeight: '2.5rem',
          }
        },
        '.p2': {
          fontSize: '0.75rem', // Mobile font size (12px)
          lineHeight: '1rem',
          '@screen lg': {
            fontSize: '0.875rem', // Desktop font size (14px)
            lineHeight: '2.25rem',
          }
        }
      });
    }
  ]
}
