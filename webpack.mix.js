const mix = require('laravel-mix')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
require('laravel-mix-copy-watched')
require('laravel-mix-nunjucks')

mix
  .setPublicPath('dist/')
  .js(['src/js/app.js'], 'js')
  .sass('src/css/app.scss', 'css')
  .options({
    processCssUrls: false,
    terser: {
      extractComments: false, // Stop Mix from generating license file
    }
  })
  .copyWatched('src/fonts/**/*.{woff,woff2}', 'dist/fonts')
  .webpackConfig({
    plugins: [
      new CleanWebpackPlugin(),
    ]
  })
  .njk('src/templates/', 'dist/')
  .browserSync({
    server: 'dist/',
    files: [
      'src/templates/**/*.html',
      'tailwind.config.js',
    ],
  })

if (mix.inProduction()) {
  mix
    .version()
    .then(() => {
      const convertToFileHash = require('laravel-mix-make-file-hash')
      convertToFileHash({
        publicPath: "dist/",
        manifestFilePath: "dist/mix-manifest.json"
      })
    })
    .webpackConfig({
      module: {
        rules: [
          {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: 'asset/resource',
          },
        ],
      },
      plugins: [
        new CopyPlugin({
          patterns: [
            {
              from: '**/*.{gif,jpg,png,svg,ico}',
              to: 'images',
              context: 'src/images',
            },
          ],
        }),
        new ImageMinimizerPlugin({
          minimizerOptions: {
            plugins: [
              ['gifsicle'],
              ['mozjpeg', { quality: 50 }],
              ['pngquant', { quality: [0.5, 0.5] }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      removeViewBox: false,
                    },
                  ],
                },
              ],
            ],
          },
        }),
      ],
    })
}
else {
  mix.
    copyWatched('src/images/**/*.{gif,jpg,png,svg,ico}', 'dist/images')
}
