/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.65rem',
        '3xs': '0.55rem',
      },
      spacing: {
        wa4: '210mm',
        ha4: '297mm',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
