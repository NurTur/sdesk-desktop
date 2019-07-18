const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge/lib");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const APP_DIR = path.resolve(__dirname, '../src/index.js'); // <===== new stuff added here

module.exports = env => {
  const { PLATFORM, VERSION } = env;
  return merge([
      {
        entry: {  main: APP_DIR  },    
        output: {
          path: path.resolve(__dirname,'..','build/public'),
          publicPath: `/`
        },
      
       module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
              test: /\.(png|woff|woff2|eot|ttf|svg)$/,
              loader: 'url-loader?limit=100'
          },
                   
            {
                test: /\.css$/,
                use: [
                    PLATFORM === "production"
              ? MiniCssExtractPlugin.loader
              : 'style-loader','css-loader']
            },
            {
              test: /\.less$/,
              use: [
                PLATFORM === "production"
                  ? MiniCssExtractPlugin.loader
                  : "style-loader",
                "css-loader",
                "less-loader"
              ]
            }
          
        ],
    },   
        plugins: [
          new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html'
          }),
          new webpack.DefinePlugin({ 
            'process.env.VERSION': JSON.stringify(VERSION),
            'process.env.PLATFORM': JSON.stringify(PLATFORM)
          }),
          new CopyWebpackPlugin([ { from: './src/assets' } ]),
        ],
    }
  ])
};
