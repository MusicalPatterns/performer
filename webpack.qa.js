const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')

const contentBase = path.join(__dirname, './qa-dist')

module.exports = merge(common, {
    entry: './src/indexForQa.ts',
    output: {
        libraryTarget: 'var',
        path: contentBase,
    },
    devServer: {
        contentBase,
        port: 8082,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Performer QA',
        }),
    ],
})
