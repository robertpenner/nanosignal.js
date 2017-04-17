"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var camelCase = require('lodash').camelCase;
var webpack = require('webpack');
var _a = require('awesome-typescript-loader'), TsConfigPathsPlugin = _a.TsConfigPathsPlugin, CheckerPlugin = _a.CheckerPlugin;
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var env = process && process.env && process.env.NODE_ENV;
var serverPort = process.env.npm_package_config_devPort || 8081;
var dev = !(env && env === 'production');
/**
 * Update this variable if you change your library name
 */
var libraryName = 'nanosignal';
var plugins = [
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        title: libraryName,
        filename: 'index.html',
        template: path_1.join(__dirname, 'template/index.html'),
        hash: true,
        chunks: ['common', 'index']
    })
];
var entry = [
    // 'react-hot-loader/patch',
    "webpack-dev-server/client?http://localhost:" + serverPort,
    // bundle the client for webpack-dev-servers and connect to the provided endpoint
    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    "./src/" + libraryName + ".ts"
];
if (dev === false) {
    plugins.push(new TypedocWebpackPlugin({
        theme: 'minimal',
        out: 'docs',
        target: 'es6',
        ignoreCompilerErrors: true
    }, 'src'));
    entry = path_1.join(__dirname, "src/" + libraryName + ".ts");
}
else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
exports.default = {
    entry: {
        index: entry
    },
    // Currently cheap-module-source-map is broken https://github.com/webpack/webpack/issues/4176
    devtool: 'source-map',
    output: {
        path: path_1.join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: camelCase(libraryName),
        filename: libraryName + ".js"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            }
        ]
    },
    plugins: plugins,
    devServer: {
        hot: true,
        contentBase: path_1.resolve(__dirname, 'dist'),
        port: serverPort,
        publicPath: '/'
    }
};
