 const webpack=require('webpack');
 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');
 module.exports = merge(common, {
     plugins: [
         new UglifyJSPlugin({
         	sourceMap:true
         }),
         new webpack.DefinePlugin({
       		'process.env.NODE_ENV': JSON.stringify('production')
	     }),
	     new webpack.HashedModuleIdsPlugin()//当js文件没改变的时候打包出来的js hash值是不变的
     ]
 });