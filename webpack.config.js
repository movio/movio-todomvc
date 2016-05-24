const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {

  context: __dirname + '/src',

  entry: {
    jsx: './index.tsx',
    css: './main.css',
    html: './index.html',
  },

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
  },

  module: {
    // TODO: Change to use tslint
    // preLoaders: [
    //   // Eslint loader
    //   { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint-loader' },
    // ],
    loaders: [
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.css$/, loader: 'file?name=[name].[ext]' },
      { test: /\.tsx?/, loader: 'awesome-typescript-loader', exclude: [/\.test\.ts$/] },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loaders: [
      //     'react-hot',
      //     'babel?presets[]=movio&cacheDirectory=true'],
      // },
    ],
  },

  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    modulesdirectories: [
      '',
      'src',
      'node_modules',
      'bower_components',
    ],
    root: 'src',
  },

  plugins: [
    new ForkCheckerPlugin(),
  ],

};
