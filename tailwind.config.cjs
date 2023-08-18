/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#001642',
        primary: '#085BFF',
        primaryHover: '#0552eb',
        background: '#FFFFFF',
        accent: '#FF8025',
      },
    },
  },
  plugins: [],
};
