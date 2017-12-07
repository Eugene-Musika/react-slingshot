/* eslint-disable sort-keys, camelcase */
import path from 'path';

const faviconPath = path.resolve('src/assets/favicon/favicon.png');

export default {
	lang: 'en',
	dir: 'ltr',
	name: 'My Progressive Web App',
	description: 'My awesome Progressive Web App!',
	short_name: 'MyPWA',
	ios: true,
	background_color: '#ffffff',
	theme_color: '#ffffff',
	serviceworker: {
		src: '/assets/js/sw.js',
		scope: '/',
		use_cache: false
	},
	icons: [
		{
			src: faviconPath,
			sizes: [16, 32, 48, 180, 192, 256, 270, 384, 512], // multiple sizes
			destination: path.join('assets', 'favicons')
		},
		{
			src: faviconPath,
			sizes: [120, 152, 167, 180, 1024],
			destination: path.join('assets', 'favicons', 'ios'),
			ios: true
		},
		{
			src: faviconPath,
			size: 1024,
			destination: path.join('assets', 'favicons', 'ios'),
			ios: 'startup'
		}
	]
};
