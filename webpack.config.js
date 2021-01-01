const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, './src/index.js'),
    chart: path.join(__dirname, './src/components/chart/chartStatistic.js'),
  },
  target: 'web',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
    alias: {},
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      { test: /\.(sc|sa|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      {
        test: /\.(svg|png|gif)$/,
        // test: /\.(png|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/',
            },
          },
        ],
      },
      {
        test: /\.geojson/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
    }),
    new MiniCssExtractPlugin({ filename: 'index.css' }),
    new CopyPlugin({
      patterns: [{ from: './src/assets/favicon.svg', to: './' }],
    }),
  ],
  devServer: {
    contentBase: './src/public',
    port: 3002,
  },
};
