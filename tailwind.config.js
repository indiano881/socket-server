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
        'primary': '#362C28',
        'greynav': '#362C28',
        'secondary': '#AF2BBF', //DB8CFF lighter variant
        'accent': '#9BFF4D',
        'mild-yellow': "#FFF14D",
        "grey-hb": "#756680"
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
          fontSize: '2rem', // Mobile font size (20px)
          lineHeight: '2.25rem',
          fontWeight: '600', // Semi-bold
          '@screen lg': {
            fontSize: '3.5rem', // Desktop font size (24px)
            lineHeight: '4rem',
          }
        },
        '.n1': {
          fontSize: '1.5rem', // Mobile font size (30px)
          lineHeight: '2.25rem',
          fontWeight: 'regular',
          '@screen lg': {
            fontSize: '24px', // Desktop font size (36px)
            lineHeight: '3rem',
          }},
        '.p1': {
          fontSize: '1.5rem', // Mobile font size (30px)
          lineHeight: '2.25rem',
          fontWeight: 'regular',
          '@screen lg': {
            fontSize: '3rem', // Desktop font size (36px)
            lineHeight: '3.5rem',
          }},
        '.p2': {
          fontSize: '1.275rem', // Mobile font size (30px)
          lineHeight: '2.25rem',
          fontWeight: 'normal',
          '@screen lg': {
            fontSize: '2.25rem', // Desktop font size (36px)
            lineHeight: '3.5rem',
          }}
      });
    }
  ]
}
