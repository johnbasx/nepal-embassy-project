/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': [
          '0.65rem',
          {
            lineHeight: '1rem',
            letterSpacing: '-0.01em',
          },
        ],
        '3xs': '0.55rem',
      },
      colors: {
        emerald: colors.emerald,
      },
      spacing: {
        wa4: '210mm',
        ha4: '297mm',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
