/* eslint-file-ignore */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        index: [
            'react-hot-loader/patch',
            './client/index.js'
        ],
        vendor: [
            'react', 'react-dom', 'react-redux', 'redux'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        modules: [
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../assets'),
            'node_modules'
        ],
        alias: {
            Client: path.resolve(__dirname, '../src/client'),
            Server: path.resolve(__dirname, '../src/server'),
            Universal: path.resolve(__dirname, '../src/universal')
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin({ DEBUG: true, NODE_ENV: 'development', DEV: true }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            minify: { collapseWhitespace: true }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        compress: true,
        historyApiFallback: true,
        disableHostCheck: true,
        publicPath: '/',
        contentBase: path.resolve(__dirname, 'dist'),
        overlay: { warnings: true, errors: true }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, 'postcss-loader']
            })
        }, {
            test: /\.svg$/,
            use: 'url?limit=3000&name=[name]_[hash:6].[ext]'
        }, {
            test: /\.(png|jpg|jpeg|gif|ttf|woff2|woff|eot)$/,
            use: 'url?limit=1000&name=[name]_[hash:6].[ext]'
        }, {
            test: /\.hbs$/,
            use: 'handlebars-loader'
        }]
    }
};
