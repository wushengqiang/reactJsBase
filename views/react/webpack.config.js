var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3009',
    'webpack/hot/only-dev-server',
    __dirname+'/index.js'
  ],
  output: {
    path: __dirname + '/../../public/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx{0,1}$/,
      loader: 'react-hot-loader!babel-loader?'+JSON.stringify({presets:['react','es2015']}),
      exclude: /node_modules/,
      include: __dirname
    },
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")}]
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
