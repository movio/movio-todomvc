const path = require('path');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    modulesdirectories: [
      path.join(__dirname, ''),
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    root: path.join(__dirname, 'src'),
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },

  module: {
    loaders: [
      {
        test: /\.tsx?/,
        loader: 'awesome-typescript-loader',
        query: {
          compilerOptions: {
            removeComments: true,
          },
        },
        exclude: [/\.e2e\.ts$/],
      },
    ],
    postLoaders: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['movio'],
        },
      },
    ],
  },
};
