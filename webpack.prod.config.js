var path = require('path');
var webpack = require('webpack');
var webpackUMDExternal = require('webpack-umd-external');

module.exports = {
  devtool: 'sourcemap',
  entry: {
    index: './src/ItemsCarousel/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-items-carousel.js',
    sourceMapFilename: 'react-items-carousel.map',
    library: 'ReactItemsCarousel',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: webpackUMDExternal({
    'react': 'React',
    'react-motion': 'ReactMotion',
    'react-measure': 'ReactMeasure',
    'styled-components': 'ReactStyled',
  }),
};
