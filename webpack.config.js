const baseConfig = require('./base.webpack.config');
module.exports = Object.assign({}, baseConfig, {
  devtool: 'source-map',
  module: Object.assign({}, baseConfig.module, {
    preLoaders: [
      // Eslint loader
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint-loader'},
    ],
  }),
})
