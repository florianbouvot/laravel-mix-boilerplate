const mix = require('laravel-mix')
require('laravel-mix-nunjucks')

mix
  .setPublicPath('dist/')
  .sass('src/css/app.scss', 'css')
  .js('src/js/app.js', 'js')
  .browserSync({
    server: 'dist/',
    files: [
      'src/css/**/*.{css,scss}',
      'src/js/**/*.js',
      'src/templates/**/*.html',
      'tailwind.config.js',
    ],
  })
  .copy('node_modules/baguettebox.js/dist/baguetteBox.css', 'src/css/vendor')
  .version()
  .njk('src/templates/', 'dist/')
  .options({
    processCssUrls: false,
  })
