const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const os = require('os'); // node.js核心模块，直接使用，获取系统相关
const threads = os.cpus().length;
const TerserWebpackPlugin = require("terser-webpack-plugin");  // webpack内置plugin，不需要安装

module.exports = {
	entry: path.join(__dirname, '../src/index.tsx'),
	output: {
		filename: 'static/js/[name].js',
		clean: true,
		assetModuleFilename: 'static/images/[hash][ext][query]'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // 提取css文件到输出文件中
					// 'style-loader',     // 将js中css文件通过创建style标签添加到html文件中
					'css-loader',
				]
			},
			{
				test: /.(ts|tsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-typescript']
					}
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				type: 'asset/resource',
			},
		]
	},
	resolve: {
		extensions: ['.js', '.tsx', '.ts'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: 'static/css/main.css'
		}),
	],
	performance: {
		hints: false,
	},
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserWebpackPlugin({
				parallel: threads,  // 开启多进程和设置进程数
			}),
		],
	},
}
