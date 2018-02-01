const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const config = {
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(frag|vert)$/,
                loader: 'webpack-glsl-loader'
            }
        ]
    },
    devtool:"source-map",
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new StyleLintPlugin({
            configFile: './.stylelintrc'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = config;