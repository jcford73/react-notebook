const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: {
        index: './src/index.jsx',
    },
    stats: 'errors-only',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: './dist/',
        client: {
            overlay: {errors: true, warnings: false},
        },
        historyApiFallback: true,
        open: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico',
            title: 'JC\'s Notebook',
            base: '/',
        }), //
        new MiniCssExtractPlugin(),
        new ESLintWebpackPlugin({ context: './src', extensions: ['js', 'jsx'], formatter: 'stylish' }),
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify('http://localhost:10001')
        })
    ],
    output: {
        publicPath: '/',
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',

                    },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                include: path.resolve(__dirname, 'public'),
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};
