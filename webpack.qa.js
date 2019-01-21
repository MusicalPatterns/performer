const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const { PERFORMER_PORT } = require('@musical-patterns/utilities')

module.exports = merge(common, {
    entry: './test/qa/performer.js',
    output: {
        libraryTarget: 'var',
        path: path.join(__dirname, './qa-dist'),
    },
    devServer: {
        disableHostCheck: true,
        port: PERFORMER_PORT,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Performer QA',
        }),
    ],
})
