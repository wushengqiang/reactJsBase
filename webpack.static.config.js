var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    devtool: 'eval-source-map',
  entry: {
   'bundle': __dirname+'/views/react/index.js'
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
      //新加环境变量替换
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    //commonsPlugin,
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx{0,1}$/,
      loader: 'babel-loader?'+JSON.stringify({presets:['react','es2015']}),
      exclude: /node_modules/,
      include: __dirname
    },{ test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
        { test: /\.(png|jpg|gif)$/, loader: 'url?limit=819200'}]
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
