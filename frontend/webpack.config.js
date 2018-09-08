const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const StaticSiteGeneratorWebpackPlugin = require('static-site-generator-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')

const webpack = require('webpack')

const devMode = process.env.NODE_ENV !== 'production'

const config = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: './src/index.js',
    static: './src/pages/index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [require('autoprefixer')]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'assets',
              publicPath: '/assets'
            }
          }
        ]
      },
      {
        type: 'javascript/auto', // workaround for https://github.com/webpack/webpack/issues/6586
        test: /\.(geo|data)\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash]-[name].[ext]',
              outputPath: 'assets/data',
              publicPath: '/assets/data'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'DEVELOPMENT_MY_EU_API_KEY',
      'PRODUCTION_MY_EU_API_KEY'
    ]),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new StaticSiteGeneratorWebpackPlugin({
      entry: 'static',
      paths: ['/', '/about/', '/mockups/']
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsWebpackPlugin({})
    ]
  },
  output: {
    filename: devMode ? '[name].[hash].js' : '[name].[contenthash].js',
    libraryTarget: 'umd', // for StaticSiteGeneratorPlugin
    globalObject: 'this' // for StaticSiteGeneratorPlugin
  }
}

if (!devMode && process.env.BUNDLE_ANALYZER) {
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8889 }))
}

module.exports = config
