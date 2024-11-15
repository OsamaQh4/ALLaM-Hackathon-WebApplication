/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        IBM: ['IBM+Plex+Sans', 'sans-serif'], // Adding a new custom font
      },
    },
  },
  plugins: [],
}
