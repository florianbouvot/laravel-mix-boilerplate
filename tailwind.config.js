const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    'src/templates/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': colors.red,
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      padding: {
        '16x9': '56.25%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
