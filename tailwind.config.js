const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    'src/templates/**/*.html',
  ],
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
  plugins: [],
}
