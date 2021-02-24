const mix = require('laravel-mix');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
require('laravel-mix-nunjucks')

mix
  .setPublicPath('dist/')
  .js(['src/js/app.js'], 'js')
  .sass('src/css/app.scss', 'css').options({
    processCssUrls: false
  })
  .browserSync({
    server: 'dist/',
    files: [
      'src/css/**/*.scss',
      'src/js/**/*.js',
      'src/templates/**/*.html',
      'tailwind.config.js',
    ],
  });

mix.copy('src/fonts/**/*.{woff,woff2}', 'dist/fonts');

mix.njk('src/templates/', 'dist/');


mix.webpackConfig({
  plugins: [
    new CleanWebpackPlugin(),
  ]
});

if (mix.inProduction()) {
  mix.version();

  mix.webpackConfig({
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
  });
} else {
  mix.copy('src/img/**/*.{gif,jpg,png,svg,ico}', 'dist/img');
}
