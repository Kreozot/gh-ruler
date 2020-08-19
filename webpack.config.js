require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		extensions: ['.js', '.html'],
		modules: [
			'node_modules',
			path.resolve(__dirname, 'src'),
		]
	},
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					},
					{
						loader: 'svelte-loader',
						options: {
							skipIntroByDefault: true,
							nestedTransitions: true,
							emitCss: true,
							hotReload: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff2?)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.(mov|mp4)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.ejs$/,
				use: {
					loader: 'ejs-webpack-loader',
					options: {
						htmlmin: true
					}
				}
			},
		]
	},
	mode,
	plugins: [
		new CleanWebpackPlugin('public/', {
			beforeEmit: true
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			inject: 'body',
			favicon: 'src/assets/favicon.png',
		}),
		new webpack.EnvironmentPlugin(['NODE_ENV', 'API_GET_REPO', 'API_GET_REPOS']),
	],
	devtool: prod ? false: 'source-map',
	devServer: {
		proxy: {
			'/api': 'http://localhost:3000'
		}
	}
};
