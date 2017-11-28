// var debug = process.env.NODE_ENV !== "production";
var debug = true
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/root.js",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      },
      {
        test:/\.css$/,
        loader:"style-loader!css-loader"
      },
      {
        test:/\.less$/,
        loader:'style-loader!css-loader!less-loader'
      }
    ]
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
    filename: "./src/bundle.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
  ],
};