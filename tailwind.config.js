/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        padding: '1rem',
        center: true,
      },
      colors: {
        primary: '#0f171e',
        secondary: '#1a242f',
        tertiary: '#79b8f3',
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [],
};
