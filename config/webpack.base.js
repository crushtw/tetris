const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.join(__dirname, '../src/index.tsx'),
	output: {filename: 'static/js/[name].js'},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
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
				type: "asset",
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: "static/images/[hash:10][ext][query]",
				}
			},
		]
	},
	resolve: {
		extensions: ['.js', '.tsx', '.ts'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
		})
	],
	performance: {
		hints: false,
	},
}
