// @ts-check

const toRem = (value) => `${value / 16}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    screens: {
      sm: toRem(480),
      md: toRem(768),
      lg: toRem(1280),
    },
    extend: {
      cursor: {
        none: 'none',
      },
      maxWidth: {
        screen: '100vw',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      margin: ['first', 'last', 'responsive'],
    },
  },
};
