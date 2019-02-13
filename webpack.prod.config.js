const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, './src/ItemsCarousel/index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-items-carousel.js',
    library: 'ReactItemsCarousel',
    libraryTarget: 'umd'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-class-properties'],
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  mode: 'production',
};