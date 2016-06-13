const baseConfig = require('./base.webpack.config');
module.exports = Object.assign({}, baseConfig, {
  devtool: 'cheap-module-source-map',
});