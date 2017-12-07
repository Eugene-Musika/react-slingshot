/* eslint-disable sort-keys */
// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import ImageminWebpackPlugin from 'imagemin-webpack-plugin';
//// import LodashWebpackPlugin from 'lodash-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import WebpackPwaManifest from 'webpack-pwa-manifest';
// import WebpackSpritesmith from 'webpack-spritesmith';
import path from 'path';
import webpack from 'webpack';

const GLOBALS = {
				__DEV__: false,
				'process.env.NODE_ENV': JSON.stringify('production')
			},
			context = path.resolve('./');

export default {
	context,
	target: 'web',
	devtool: 'source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/

	entry: {
		index: path.resolve(__dirname, 'src/index'),
		sw: path.resolve(__dirname, 'src/sw/sw')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'assets/js/[name].[chunkhash].js'
	},

	plugins: [
		// For lodash tree shaking
		// new LodashWebpackPlugin(),  //! need lodash

		// Hash the files using MD5 so that their names change when the content changes.
		new WebpackMd5Hash(),

		// Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
		new webpack.DefinePlugin(GLOBALS),

		// Generate an external css file with a hash in the filename
		new ExtractTextPlugin({
			filename: 'assets/css/[name].[contenthash].css',
			allChunks: true
		}),

		// Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			chunks: ['index'],
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			// Note that you can add custom options here if you need to handle other custom logic in index.html
			// To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
			trackJSToken: '',
			sentryConfigUrl: ''
		}),

		// For attributes in HTML <script> tags
		// Info: https://github.com/numical/script-ext-html-webpack-plugin
		new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer' }),

		// Generate manifest and icons
		// Info: https://github.com/arthurbergmz/webpack-pwa-manifest
		new WebpackPwaManifest(require('./tools/manifestConfig').default),

		// Minify JS
		new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),

		// Global options for loaders and plugins
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			noInfo: true, // set to false to see a list of every file being bundled.
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
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.eot(\?v=\d+.\d+.\d+)?$/,
			loader: 'url-loader',
			options: { name: '[name].[ext]' }
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'application/font-woff',
				name: '[name].[ext]'
			}
		}, {
			test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'application/octet-stream',
				name: '[name].[ext]'
			}
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'image/svg+xml',
				name: '[name].[ext]'
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
			// Separate CSS files
			test: /\.s?css$/,
			exclude: path.resolve(__dirname, 'src/styles/modules'),
			loader: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true,
						sourceMap: true
					}
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true }
				}, {
					loader: 'sass-loader',
					options: {
						includePaths: [path.resolve(__dirname, 'src', 'scss')],
						sourceMap: true
					}
				}]
			})
		}, {
			// Bundled CSS Modules
			test: /\.s?css$/,
			include: path.resolve(__dirname, 'src/styles/modules'),
			use: [{
				loader: 'style-loader',
				options: { hmr: false }
			}, {
				loader: 'css-loader',
				options: {
					minimize: true,
					modules: true,
					camelCase: true, // for className styles (not for styleName)
					localIdentName: '[local]__[hash:base64]',
					sourceMap: true
				}
			}, {
				loader: 'postcss-loader',
				options: { sourceMap: true }
			}, {
				loader: 'sass-loader',
				options: { sourceMap: true }
			}]
		}]
	}
};
