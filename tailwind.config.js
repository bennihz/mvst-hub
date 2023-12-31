/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
      },
      colors: {
        neutral: colors.neutral,
        w: '#ffffff',
      },
    },
  },
  plugins: [],
};

