/* eslint-file-ignore */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const InlineManifestPlugin = require('inline-manifest-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        index: './client/index.js',
        vendor: ['react', 'react-dom', 'react-redux', 'redux']
    },
    output: {
        path: path.join(__dirname, '../dist/'),
        publicPath: '/',
        filename: '[name]_[chunkhash:6].js',
        chunkFilename: '[name]_[chunkhash:6].js'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.json', '.css'],
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
        new FaviconsWebpackPlugin({
            logo: path.join(__dirname, '../assets/icons/icon_1024.png'),
            prefix: 'icons/',
            persistentCache: true,
            inject: true,
            title: '(Remind)+'
        }),
        new CleanWebpackPlugin(['dist/'], {
            root: path.resolve(__dirname, '../'),
            verbose: true
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG: false,
            DEV: false
        }),
        new HtmlWebpackPlugin({
            template: 'index.hbs',
            filename: 'index.html',
            inject: true,
            minify: { collapseWhitespace: true }
        }),
        new BabiliPlugin({}, { comments: false }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            // filename: 'vendor-[chunkhash:6].js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: 'app.bundle.[contenthash].css',
            disable: false
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        }),
        new webpack.HashedModuleIdsPlugin(),
        new InlineManifestPlugin({
            name: 'webpackManifest'
        }),
        new GenerateJsonPlugin('manifest.json', {
            name: '(Remind)+',
            short_name: '(R)+',
            description: 'Add to-do lists to Google Calendar.',
            background_color: '#ffffff',
            theme_color: '#ffffff',
            display: 'standalone',
            orientation: 'landscape',
            start_url: '/',
            icons: [{
                src: './icons/android-chrome-384x384.png',
                size: '384x384'
            }, {
                src: './icons/android-chrome-256x256.png',
                size: '256x256'
            }, {
                src: './icons/android-chrome-192x192.png',
                size: '192x192'
            }, {
                src: './icons/apple-touch-icon-144x144.png',
                size: '144x144',
            }, {
                src: './icons/android-chrome-96x96.png',
                size: '96x96'
            }, {
                src: './icons/android-chrome-48x48.png',
                size: '48x48'
            }, {
                src: './icons/android-chrome-36x36.png',
                size: '36x36'
            }]
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, '../src/sw.js')
        })
    ],
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
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        localIdentName: '[name]_[local]_[hash:base64:6]',
                        modules: true
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
    }
};
