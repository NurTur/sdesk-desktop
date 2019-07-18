/* eslint-disable */
const merge = require("webpack-merge");
// Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// Configs
const baseConfig = require("./webpack.base.config");

const prodConfiguration = env => {
  return merge([
    {
        output: {
            filename: '[name].[chunkhash].js',
        },
            optimization: {
               minimizer: [
                    new TerserPlugin(),
                    new OptimizeCssAssetsPlugin({}),
                ],
                runtimeChunk: 'single',
                splitChunks: {
                  chunks: 'all',
                },
              },           
        plugins: [ new MiniCssExtractPlugin(), new BundleAnalyzerPlugin()]
    }
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
};