/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        habesha: {
          green: '#078930',
          yellow: '#fcdd09',
          red: '#da121a',
          earth: '#c49a6c',
          cream: '#faf0e6',
          charcoal: '#2d2d2d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}