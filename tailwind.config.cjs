/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#085BFF',
        primaryHover: '#0552eb',
        background: '#FFFFFF',
        secondary: '#F0FBFF',
        accent: '#FF8025',
      },
    },
  },
  plugins: [],
};
