"use strict";

module.exports = (env, argv) =>{
    const devMode = argv.mode !== 'production';
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const webpack = require('webpack');
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: ['pug-loader']
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [ devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader']
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new MiniCssExtractPlugin({
                filename: "app.[hash].css",
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.pug'),
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        output: {
            filename: 'app.[hash].js'
        }
    }

};