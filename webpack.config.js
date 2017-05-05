/**
 * Created by caojiangtao on 2017/3/13.
 */
var webpack = require('webpack');
module.exports = {
	entry: './js/app.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	plugins: [
        new webpack.BannerPlugin("极客前端出品\n river.cao"), //  编译文件加注释
//      new ExtractTextPlugin(config.linkCss)    //单独使用style标签加载css并设置其路径
		new webpack.optimize.UglifyJsPlugin({
		    // 最紧凑的输出
		    beautify: false,
		    // 删除所有的注释
		    comments: false,
		    compress: {
		      // 在UglifyJs删除没有用到的代码时不输出警告  
		      warnings: false,
		      // 删除所有的 `console` 语句
		      // 还可以兼容ie浏览器
		      drop_console: true,
		      // 内嵌定义了但是只用到一次的变量
		      collapse_vars: true,
		      // 提取出出现多次但是没有定义成变量去引用的静态值
		      reduce_vars: true,
		    }
		})
//	    new webpack.optimize.OccurrenceOrderPlugin(),
	    // extract css into its own file
//	    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    ],
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader',
				exclude: /node_modules/
			}, {
				test: /\.(png|jpg)$/,
				loader: "url-loader",
				exclude: /node_modules/
			}

		]
	}
}