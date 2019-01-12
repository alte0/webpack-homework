const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const env = process.env.NODE_ENV;
const isDev = env !== "production";

const webpackConfig = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.DefinePlugin({
      isDev: JSON.stringify(isDev)
    }),
    new MiniCssExtractPlugin({
      filename: "style.[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, "dist"), {})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => [require("precss")()]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devtool: isDev ? "eval-source-map" : "source-map"
};

module.exports = webpackConfig;
