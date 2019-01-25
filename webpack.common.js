module.exports = {
    entry: './src/index.ts',
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
                test: /\.mp3/,
                loader: 'url-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js', '.json' ],
    },
    output: {
        filename: 'index.js',
        library: 'performer',
        libraryTarget: 'umd',
    },
}
