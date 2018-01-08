const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const glob = require("glob");


const entries = function() {
    const jsDir = path.resolve(__dirname, "src/js");
    const entriesFiles = glob.sync(jsDir + "/*.{js,jsx}");
    const map = {};
    for (var i = 0; i < entriesFiles.length; i++) {
        var filePath = entriesFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath
    }
    return map;
}

const HtmlPlugins=[];
(function() {
    const htmlDir = path.resolve(__dirname, "src");
    const htmlFiles = glob.sync(htmlDir + "/*.html");
    for (var i = 0; i < htmlFiles.length; i++) {
        const filePath = htmlFiles[i];
        const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        const htmlPlugin = new HtmlWebpackPlugin({
            filename: `${filename}.html`,
            template: path.resolve(__dirname, `./src/${filename}.html`),
            chunks: [filename, 'common','vendor'],
            hash: true,
            cache:false,
            devServer:"http://localhost:8091"
        });
        HtmlPlugins.push(htmlPlugin);
    }
})()
module.exports = {
    entry: Object.assign(entries(),{vendor:["./src/js/vendor/jquery.min.js"]}),
    module: {
        rules: [
            {   test: /\.css$/, 
                use:['style-loader','css-loader','autoprefixer-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        plugins: ['babel-plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        outputPath: 'images/',
                        name: "[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        ...HtmlPlugins,
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({//提取公共的js
            name: 'vendor' 
        }),
        new webpack.optimize.CommonsChunkPlugin({//提取公共的js
            name: 'common' 
        }),
        new webpack.ProvidePlugin({//库的一个全局变量
            _: 'lodash',
            $: 'jquery'
        })
    ],
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    }
};