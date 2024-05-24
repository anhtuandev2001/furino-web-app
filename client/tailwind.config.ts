/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1280px',
    },
    container: {
      center: true,
      maxWidth: {
        '2xl': '1280px', // Override default max-width for xl breakpoint
      },
    },
    extend: {
      colors: {
        primary: '#B88E2F',
        secondary: '#d2d2d2',
        subText: '#121212BF',
      },
      bg: {
        primary: '#B88E2F',
      },
    },
  },
  plugins: [],
};
