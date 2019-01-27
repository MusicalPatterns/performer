const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { PERFORMER_PORT } = require('@musical-patterns/utilities')

module.exports = {
    entry: './src/start.ts',
    devServer: {
        open: true,
        port: PERFORMER_PORT,
    },
    plugins: [
        new FaviconsWebpackPlugin('./node_modules/@musical-patterns/cli/assets/favicon.png'),
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
            meta: { viewport: 'width=device-width' },
        }),
    ],
}
