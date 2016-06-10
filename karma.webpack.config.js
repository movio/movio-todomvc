const baseConfig = require('./base.webpack.config');
module.exports = Object.assign({}, baseConfig, {
  devtool: 'inline-source-map',
});