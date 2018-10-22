// Here we extend the vue-cli webpack config
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

module.exports = {
  // Relative baseUrl on prod, Absolute for Dev
  baseUrl: process.env.NODE_ENV === 'production' ? '/fireball/' : '/',
  // Auto injection of SCSS vars into template <style> section
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.scss";`
      }
    }
  },
  // Provide purify with the scope of what to strip styles against
  configureWebpack: {
    // Merged into the final Webpack config
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js')
        ])
      })
    ]
  }
}
