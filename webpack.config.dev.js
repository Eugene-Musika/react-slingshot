/* eslint-disable sort-keys */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-build-notifier';
import path from 'path';
import webpack from 'webpack';


const GLOBALS = {
				__DEV__: true,
				'process.env.NODE_ENV': JSON.stringify('development') // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
			},
			context = path.resolve('./'),
			mirrors = {
				JULIADATES: 'juliadates',
				EMILYDATES: 'emilydates'
			};

export default {
	context,
	target: 'web',
	devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/

	entry: {
		[mirrors.EMILYDATES]: [
			// must be first entry to properly set public path
			'./src/webpack-public-path',
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?reload=true',
			path.resolve(__dirname, `src/www/${ mirrors.EMILYDATES }/index`) // Defining path seems necessary for this to work consistently on Windows machines.
		]
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/'
	},

	plugins: [
		new webpack.DefinePlugin(GLOBALS),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new WebpackNotifierPlugin({ // Notify OS popup
			successSound: false,
			suppressSuccess: true,
			title: 'Webpack [dev]'
		}),
		new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
			inject: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			template: 'src/index.ejs'
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true,
			minimize: false,
			// noInfo: true, // set to false to see a list of every file being bundled.
			options: { context }
		})
	],

	resolve: {
		//// alias: { css: __dirname + '/../' + options.PATHS.dist + '/css' }, // alias for modules paths
		extensions: ['*', '.js', '.jsx', '.json', '.css', '.scss'],
		modules: [path.resolve('src'), 'node_modules']
	},

	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			options: { cacheDirectory: true }
		}, {
			test: /\.eot(\?v=\d+.\d+.\d+)?$/,
			loader: 'file-loader'
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'application/font-woff'
			}
		}, {
			test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'application/octet-stream'
			}
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'image/svg+xml'
			}
		}, {
			test: /\.(jpe?g|png|gif)$/i,
			loader: 'file-loader',
			options: { name: '[name].[ext]' }
		}, {
			test: /\.ico$/,
			loader: 'file-loader',
			options: { name: '[name].[ext]' }
		}, {
			test: /\.s?css$/,
			include: path.resolve(__dirname, 'src/styles/modules'),
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: true,
						camelCase: true, // for className styles (not for styleName)
						localIdentName: '[local]__[hash:base64]'
					}
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true }
				}, {
					loader: 'sass-loader',
					options: { sourceMap: true }
				}
			]
		}, {
			test: /\.s?css$/,
			exclude: path.resolve(__dirname, 'src/styles/modules'),
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true }
				}, {
					loader: 'sass-loader',
					options: { sourceMap: true }
				}
			]
		}]
	}
};
