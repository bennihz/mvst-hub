/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Toggle dark-mode based on .dark class or data-mode="dark"
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        safetyOrange: '#E77917',
        safetyOrangeDark: '#ea580c',
        darkOrange: '#914c10',
        green:'#439A86',
        seasalt:'#FAFAFA',
        black:'#130912',
        cyan: colors.cyan,
      },
    },
  },
  plugins: [],
};

