/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B88E2F',
        secondary: '#d2d2d2',
        subText: '#121212BF',
      },
      bg: {
        primary: '#B88E2F',
      },
      extend: {
        boxShadow: {
          'custom-1':
            '-1rem -1rem 1rem -1rem rgba(0, 0, 0, 0.13), 1rem 1rem 1rem -1rem rgba(0, 0, 0, 0.13), 0 0 0.5rem rgba(255, 255, 255, 0), 0 2rem 3.5rem -2rem rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
  plugins: [],
};
