/* eslint-disable sort-keys */
//* NOTE: Possible issue with "env"
//* Potential fix: Use "process.env.NODE_ENV" instead of "env"

module.exports = ({ file, options, env }) => Object.assign({
	sourceMap: env !== 'production' ? 'inline' : true,
	plugins: {
		'postcss-triangle': {}, 	// "triangle: pointing-<up|down|left|right>;"
															// "width:  [length];"
															// "height: [length];"
															// "background-color: [color];" (optional)
		'postcss-circle': {},   	// "circle: [diameter] [color]"
		'postcss-center': {},   	// "top: center; left: center;"
															//? don't forget about "position: relative" for parent
		'postcss-pxtorem': {},
		'postcss-utilities': {},  // INFO: http://ismamz.github.io/postcss-utilities/docs
		'postcss-short': {},			// INFO: http://github.com/jonathantneal/postcss-short
		'postcss-will-change': {},
		'postcss-vmin': {},
		//// 'postcss-font-magician': { //! NOTE: doesn't support Cyrrilic
		//// 	hosted: '../fonts/'
		//// },
		'postcss-cssnext': { //NOTE: CSSnext has autoprefixer
			browsers: [
				'> 5%',
				'last 2 versions',
				'ie >= 10',
				'ios >= 7'
			]
		},
		'rucksack-css': {},
		//* 'rucksack-css' includes:
		// postcss-alias     =>  "@alias {cl: color; l: left; ...}"
		// postcss-clearfix  =>  "clear: fix"
		// postcss-easings   =>  INFO: http://easings.net

		//! FIXME: This plugin does't work
		// 'postcss-hamster': {},  	// Typography, Vertical Rhythm, Modular Scale
																// INFO: https://hamster.im

		'postcss-svgo': env === 'production' ? {} : false,
		'css-mqpacker': env === 'production' ? {} : false,
		'postcss-merge-rules': env === 'production' ? {} : false,
		cssnano: env === 'production' ? {} : false,

		// Reporter //TODO: check if it works
		'postcss-browser-reporter': env !== 'production' ? {} : false  // OR
		// 'postcss-reporter': env !== 'production' ? {} : false,      // OR
	}
}, options);
