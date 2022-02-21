const mix = require('laravel-mix')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
require('laravel-mix-copy-watched')
require('laravel-mix-nunjucks')

mix
  .setPublicPath('dist/')
  .js('src/js/app.js', 'js')
  .sass('src/css/app.scss', 'css')
  .njk('src/templates/', 'dist/')
  .browserSync({
    server: 'dist/',
    files: [
      //'src/css/**/*.{css,scss}',
      //'src/js/**/*.js',
      'src/fonts/**/*.{woff,woff2}',
      'src/img/**/*.{ico,gif,jpg,png,svg}',
      'src/templates/**/*.html',
      'dist/css/*.css',
      //'tailwind.config.js',
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
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle'],
              ['mozjpeg', { quality: 50 }],
              ['pngquant', { quality: [0.5, 0.5] }],
              ['svgo'],
            ],
          },
        },
      }),
    ],
  })
  .options({
    processCssUrls: false,
    terser: { extractComments: false } // Stop Mix from generating license file
  })
  .disableSuccessNotifications()

if (mix.inProduction()) {
  mix.version()
}
