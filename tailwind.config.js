/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        800: '#d0d0d0',
        900: '#e0e0e0',
        DEFAULT: '#eeeeee'
      },
      secondary: {
        DEFAULT: '#121212',
        900: '#1a1a1a',
        800: '#404040',       
      },
      accent: {
        600: '#fcd34d',
        700: '#fbbf24',
        800: '#e6b325',
        900: '#d6a615',
        DEFAULT: '#b59016'
      },
      success: '#16a34a',
      danger: '#dc2626'
    },
    extend: {
      fontFamily: {
        'logo': ["'Shadows Into Light'", 'cursive', 'sans-serif']
      }
    }
  },
  plugins: [],
}

