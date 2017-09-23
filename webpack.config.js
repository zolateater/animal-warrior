var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// Phaser не собирается с es6 и челоческими импортами,
// поэтому подключаем его как внешний модуль, вместе с pixi и p2 (в глобальный namespace)
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaserPath = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixiPath = path.join(phaserModule, 'build/custom/pixi.js');
var p2Path = path.join(phaserModule, 'build/custom/p2.js');


module.exports = {
    entry: {
        js: './src/index.ts'
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'web/build')
    },
    devtool: 'inline-source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            pixi:   pixiPath,
            phaser: phaserPath,
            p2:     p2Path,
        }
    },
    devServer: {
      contentBase: './web'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'babel-loader!ts-loader'
            },
            {
                test: /pixi.js/,
                loader: 'expose-loader',
                options: 'PIXI'
            },
            {
                test: /p2.js/,
                loader: 'expose-loader',
                options: 'p2'
            },
            {
                test: /phaser-split.js/,
                loader: 'expose-loader',
                options: 'Phaser'
            },
            {
                test: /\.css$/,
                use: [
                   'style-loader',
                   'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                   'style-loader',
                   'css-loader'
                ]
            }
        ],
    }
};
