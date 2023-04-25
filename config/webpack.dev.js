// webpack.dev.js
const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
	mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
	devtool: 'eval-cheap-module-source-map', // 源码调试模式,后面会讲
	devServer: {
		port: 3000,
		compress: false,
		hot: true,
		open: true,
		static: {
			directory: path.join(__dirname, "../public"),
		}
	}
}) 
