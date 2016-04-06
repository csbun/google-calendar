const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'client/build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
// const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // Entry points to the project
  entry: [
    path.join(__dirname, 'client/js/index.js'),
  ],
  // Config options on how to interpret requires imports
  resolve: {
    // When require, do not have to add these extensions to file's name
    extensions: ['', '.js', '.jsx'],
    // node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath,    // Path of output file
    filename: 'index.js', // Name of output file
  },
  plugins: [
    // Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    // // Moves files
    // new TransferWebpackPlugin([
    //   { from: 'www' },
    // ], path.resolve(__dirname, 'src')),
  ],
  module: {
    // // Loaders to interpret non-vanilla javascript code
    // // as well as most other extensions including images and text.
    // preLoaders: [
    //   {
    //     // Eslint loader
    //     test: /\.js$/,
    //     loader: 'eslint-loader',
    //     include: [path.resolve(__dirname, 'client')],
    //     exclude: [nodeModulesPath],
    //   },
    // ],
    loaders: [
      {
        // React-hot loader and
        test: /\.jsx?$/,  // All .js files
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
        exclude: [nodeModulesPath],
      },
    ],
  },
  // // eslint config options. Part of the eslint-loader package
  // eslint: {
  //   configFile: '.eslintrc',
  // },
};

module.exports = config;
