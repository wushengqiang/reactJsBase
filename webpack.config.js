var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:9090',//资源服务器地址
        'webpack/hot/only-dev-server',
        __dirname+'/views/react/index.js'
    ],
    output: {
        path: '/static/dist/',
        filename: "bundle.js",
        publicPath: "http://127.0.0.1:9090/static/dist/"
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
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },
            {
            test: /\.jsx{0,1}$/,
            loader: 'babel-loader?'+JSON.stringify({presets:['react','es2015']}),
            exclude: /node_modules/,
            include: __dirname
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
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
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
