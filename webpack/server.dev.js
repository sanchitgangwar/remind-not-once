/* eslint-file-ignore */

const path = require('path');
const webpack = require('webpack');
// const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('./node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach((mod) => {
        nodeModules[mod] = `commonjs ${mod}`;
    });

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: 'server/index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, '../distServer/'),
        publicPath: '/',
        filename: 'server.js'
    },
    externals: nodeModules,
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, 'postcss-loader'
                ]
            })
        }, {
            test: /\.svg$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 30000,
                    name: '[name]_[hash:6].[ext]'
                }
            }
        }, {
            test: /\.(png|jpg|jpeg|gif|ttf|woff2|woff|eot)$/,
            use: {
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: '[name]_[hash:6].[ext]'
                }
            }
        }, {
            test: /\.hbs$/,
            use: 'handlebars-loader'
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['distServer'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
        }),
        new ExtractTextPlugin({
            filename: 'bundle.[contenthash:6].css'
        }),
        new webpack.DefinePlugin({
            __DEV__: true,
            __PROD__: false,
            __SERVER__: true,
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
        })
    ],
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
    devtool: 'source-map'
};
