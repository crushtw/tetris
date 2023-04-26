const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		port: 8000,
		compress: false,
		hot: true,
		open: true,
		static: {
			directory: path.join(__dirname, "../public"),
		}
	}
}) 
