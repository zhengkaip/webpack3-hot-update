const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const openBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        inline: true,
        port: 8091
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserPlugin({
            url: 'http://localhost:8091'
        })
    ]
})