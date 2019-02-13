const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
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
  mode: 'development',
  devServer: {
    index: path.resolve(__dirname, 'index.html'),
    port: 9000
  }
}