const debug = true;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
const path = require('path');

let outpath = './build/production/assets/';
module.exports = {
  context: path.join(__dirname),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: {
    app: './src/js/index.js',
    // vendor: ['react', 'react-dom', 'antd'],
  },
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
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
    ],
  },
  output: {
    path: __dirname + '/build/production/assets/',
    publicPath: 'assets/',
    filename: '[name]-[hash].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        // 去掉debugger和console
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('[name]-[hash].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './build/template/index.html',
      hash: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity,
    }),
  ],
};
