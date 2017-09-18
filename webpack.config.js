var path = require('path');
var phaserModulePath = path.join(__dirname, '/node_modules/phaser/');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './web/build')
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './web'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ],
        loaders: [{
            loader: 'script',// script-loader
            test: /(pixi|phaser).js/
        }]
    }
};
