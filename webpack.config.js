const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'examples/index.html'),
  filename: './index.html',
});
module.exports = {
  entry: path.join(__dirname, 'examples/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]-[hash:base64:6]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefix')],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
            },
          },
        ],
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    port: 3001,
  },
};
