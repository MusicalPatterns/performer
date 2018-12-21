const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
    entry: './test/qa/index.ts',
    output: {
        libraryTarget: 'var',
        path: path.join(__dirname, './qa-dist'),
    },
    devServer: {
        disableHostCheck: true,
        port: 8082,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Performer QA',
        }),
    ],
})
