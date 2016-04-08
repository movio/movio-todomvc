module.exports = {
  context: __dirname + '/src',
  entry: {
    jsx: './index.js',
    css: './main.css',
    html: './index.html',
  },

  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      // Eslint loader
      // { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint-loader'},
      {
        // set up standard-loader as a preloader
        test: /\.js?$/,
        loader: 'standard',
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.css$/, loader: 'file?name=[name].[ext]' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?presets[]=movio&cacheDirectory=true']
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  standard: {
    parser: 'babel-eslint'
  }
// eslint: {
//   configFile: './.eslintrc'
// },
}
