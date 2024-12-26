/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pokemon1: ['"Pokemon1"', 'sans-serif'],
        pokemon2: ['"Pokemon2"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}