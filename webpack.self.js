const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge.strategy({ 'module.rules': 'prepend' })(common, {
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
        extensions: [ '.js', '.json', '.mp3' ],
    },
})

