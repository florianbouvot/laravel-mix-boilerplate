const mix = require('laravel-mix')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
require('laravel-mix-copy-watched')
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
  .copyWatched('src/fonts/**/*.{woff,woff2}', 'dist/fonts')
  .webpackConfig({
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: '**/*.{ico,gif,jpg,png,svg}',
            to: 'img',
            context: 'src/img',
          },
        ],
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle'],
            ['mozjpeg', { quality: 50 }],
            ['pngquant', { quality: [0.5, 0.5] }],
            ['svgo', { plugins: [{ removeViewBox: false }] }],
          ],
        },
      }),
    ],
  })
  .njk('src/templates/', 'dist/')
  .options({
    processCssUrls: false,
    terser: { extractComments: false } // Stop Mix from generating license file
  })
  .disableSuccessNotifications()

if (mix.inProduction()) {
  mix.version()
}
