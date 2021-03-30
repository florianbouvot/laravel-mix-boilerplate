# Laravel Mix Boilerplate

A boilerplate for building web projects with Laravel Mix.

**Features**

* CSS
  * Sass compilation
  * PostCSS transformation (Tailwindcss JIT, Autoprefixer)
  * Minify
  * File versioning for cache-busting (in production)
* JavaScript
  * Minify with terser
  * File versioning for cache-busting (in production)
* Images
  * Copy
  * Optimize with imagemin (in production)
* Fonts
  * Copy
* Web server (Browsersync)
  * Watch files changes, inject style, browser auto-refresh and cross-device synchronization

_Nunjunks templates are only present for the demo._

## Getting Started

### Quick Start

1. Clone repository
2. Install Node dependencies `npm install`.
3. Use Mix CLI:
  * Compiling in a Local Environment `npx mix`
  * Watch Assets for changes `npx mix watch`
  * Compiling for production `npx mix --production`

## Futher reading

* [Laravel Mix Documentation](https://laravel-mix.com/docs/6.0/installation) from [Jeffrey Way](https://laracasts.com/)

## License

MIT © [Florian Bouvot](https://github.com/florianbouvot)
