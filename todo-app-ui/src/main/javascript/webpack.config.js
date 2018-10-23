const webpack = require('webpack');
const path = require("path");

module.exports = {
  entry: './src/app/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '..', 'webapp/static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: '../webapp',
    hot: true,
    historyApiFallback: true,
    port:8000
  }
};
