/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        gray: {
          '800': '#151515',
        },
        green: {
          '500': '#1DB954',
        },
        blue: {
          '500': '#4267B2'
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
