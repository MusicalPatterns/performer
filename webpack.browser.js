const HtmlWebpackPlugin = require('html-webpack-plugin')
const { PERFORMER_PORT } = require('@musical-patterns/utilities')

module.exports = {
    entry: './test/qa/performer.js',
    devServer: {
        open: true,
        port: PERFORMER_PORT,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Performer QA',
        }),
    ],
}
