/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crust: {
          light: '#6D4C41',
          DEFAULT: '#4A3728',
          dark: '#2D1E17',
        },
        flour: {
          light: '#FFFFFF',
          DEFAULT: '#FDFBF7',
          dark: '#F5F1E9',
        },
        olive: {
          light: '#A5A58D',
          DEFAULT: '#6B705C',
          dark: '#3F4238',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
