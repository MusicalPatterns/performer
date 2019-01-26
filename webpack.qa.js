const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const { PERFORMER_PORT } = require('@musical-patterns/utilities')

module.exports = merge(common, {
    entry: './test/qa/performer.js',
    devServer: {
        port: PERFORMER_PORT,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Performer QA',
        }),
    ],
})
