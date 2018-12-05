module.exports = {
    entry: './src/index.ts',
    mode: 'production',
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
        extensions: [ '.ts', '.js' ],
    },
    output: {
        library: 'performer',
        libraryTarget: 'umd',
    },
}
