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
    },
  },
  plugins: [],
}
