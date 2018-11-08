const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: {
		main: [ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js' ]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	mode: 'development',
	target: 'web',
	devtool: '#source-map',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [ '@babel/plugin-transform-runtime' ]
					}
				}
			},
			{
				// Loads the javacript into html template provided.
				// Entry point is set below in HtmlWebPackPlugin in Plugins
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
						//options: { minimize: true }
					}
				]
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [ 'file-loader' ]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/html/index.html',
			filename: './index.html',
			excludeChunks: [ 'server' ]
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};
