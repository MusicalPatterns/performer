const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const contentBase = path.join(__dirname, './qa-dist')

module.exports = {
    entry: './src/indexForQa.ts',
    output: {
        path: contentBase,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                loader: 'worker-loader',
                options: { inline: true },
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /test/,
            },
            {
                test: /\.wav/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js', '.json' ],
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
}
