/**
 * Created by Denis on 09.04.2017.
 */
let debug = process.env.NODE_ENV !== 'production';
console.log(`debug=${debug}`);
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : '',
    entry: {
        application: [__dirname + '/Application.js']
    },
    output: {
        path: __dirname + '/dist/',
        filename: debug ? '[name].js' : '[name].min.js',
        libraryTarget: 'var',
        library: 'Application'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader','sass-loader']})
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000&outputPath=/images/"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader?limit=100000&outputPath=/images/"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&outputPath=/fonts/'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&outputPath=/fonts/'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?limit=10000&outputPath=/fonts/'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml&outputPath=/images/'
            }
        ]
    },
    plugins: debug ? [
        new ExtractTextPlugin('[name].css')
    ] : [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            minimize: debug,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: true,
                drop_console: false,
                unsafe: true
            }
        }),
    ]
};