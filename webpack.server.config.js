var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
  node:{
    console:true,
    __filename:true,
    __dirname:true
  },
  target:'node',
    devtool: 'eval-source-map',
  entry: {
    //'serverRouter':'./server',
    //'serverApp':'./server.bak',
    'wwwApp':'./bin/www.js'
  },
  output: {
    path: __dirname + '/bin',
    filename: '[name].js'
  },
  externals: nodeModules,
  resolve: {
    extensions: ['','.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx{0,1}$/,
      loader: 'babel-loader?'+JSON.stringify({presets:['react','es2015']}),
      exclude: /node_modules/,
      include: __dirname
    },{ test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")}]
  },
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true
    },
    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],
    babel: {
        plugins: ['transform-runtime', ['import', {
            libraryName: 'antd',
            style: 'css'
        }]]
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ]
};
