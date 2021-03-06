const debug = true;
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
    ],
    // loaders: [{
    //     test: /\.js?$/,
    //     exclude: /(node_modules)/,
    //     loader: 'babel-loader',
    //     query: {
    //       presets: ['react', 'es2015']
    //     }
    //   },
    //   {
    //     test: /\.css$/,
    //     loader: 'style-loader!css-loader'
    //   },
    //   {
    //     test: /\.less$/,
    //     loader: 'style-loader!less-loader'
    //   },
    // ]
  },
  output: {
    path: __dirname,
    filename: './src/bundle.js',
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
    }),
  ],
};
