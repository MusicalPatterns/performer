module.exports = {
    module: {
        rules: [
            {
                test: /\.ts\.worker$/,
                loader: 'worker-loader',
                options: { inline: true },
            },
            {
                test: /\.mp3/,
                loader: 'url-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.js', '.mp3' ],
    },
}
