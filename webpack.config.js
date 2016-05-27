const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {

  context: __dirname + '/src',

  entry: {
    jsx: './index.tsx',
    css: './main.css',
    html: './index.html',
  },

  debug: true,

  devtool: 'cheap-module-source-map',

  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
    sourceMapFilename: '[name].map',
  },

  module: {
    preLoaders: [
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, loader: 'tslint-loader' },
    ],
    loaders: [
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.css$/, loader: 'file?name=[name].[ext]' },
      { test: /\.tsx?/, loader: 'awesome-typescript-loader', exclude: [/\.test\.ts$/] },
    ],
  },

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  },


  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    modulesdirectories: [
      '',
      'src',
      'node_modules',
    ],
    root: 'src',
  },

  plugins: [
    new ForkCheckerPlugin(),
  ],

};
