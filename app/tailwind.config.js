/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js", "./public/*.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'BgImage': "url('./img/BgImage.jpg')",
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}