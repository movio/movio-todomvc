var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  context: __dirname + '/src',
  entry: [
    'babel-polyfill',
    './index.js'
  ],
  debug: true,
  devtool: 'source-map',

  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      // Eslint loader
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint-loader'},
    ],
    loaders: [
      { test: /\.css$/, loader: 'file?name=[name].[ext]' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
}
