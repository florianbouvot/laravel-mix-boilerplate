const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    'src/templates/**/*.html',
  ],
  darkMode: false,
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
