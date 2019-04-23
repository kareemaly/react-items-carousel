const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(__dirname, './gh/index'),
  output: {
    path: __dirname + '/gh-build',
    filename: 'gh_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./gh/index.ejs`,
    }),
  ],
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devtool: isProduction ? 'source-maps' : 'eval',
  mode: isProduction ? 'production' : 'development',
  devServer: isProduction ? undefined : {
    port: 9000
  },
};