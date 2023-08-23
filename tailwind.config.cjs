/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        archia: 'Archia-Regular, sans-serif',
      },
      colors: {
        secondary: '#001642',
        primary: '#085BFF',
        primaryHover: '#0552eb',
        background: '#FFFFFF',
        accent: '#FF8025',
        backgroundGray: '#2C374F',
      },
    },
  },
  plugins: [],
};
