process.env = { ...process.env, ...require('./env-config.js')[process.env.NODE_ENV] }
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = (env = {}) => {
  return {
    entry: './app/client/main',
    output: {
      path: __dirname,
      filename: './app/public/bundle.js',
      sourceMapFilename: './app/public/bundle.js.map'
    },
    context: __dirname,
    devtool: process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './app/public/template.html',
        filename: './app/public/index.html',
        inject: false
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
      })
    ],
    module: {
      rules: [{
        test: /jsx?$/,
        include: resolve(__dirname, './app'),
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["transform-class-properties"]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          { loader: "url-loader" }
        ]
      }],
    }
  }
}
