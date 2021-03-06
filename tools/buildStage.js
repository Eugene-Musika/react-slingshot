import { chalkError, chalkProcessing, chalkSuccess, chalkWarning } from './chalkConfig';

import config from '../webpack.config.stage';
// More info on Webpack's Node API here: https://webpack.js.org/api/node/
// Allowing console calls below since this is a build file.
import webpack from 'webpack';

process.env.NODE_ENV = 'stage'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log(chalkProcessing('Generating stage bundle. This will take a moment...'));

webpack(config).run((error, stats) => {
	if (error) { // so a fatal error occurred. Stop here.
		console.log(chalkError(error));
		return 1;
	}

	const jsonStats = stats.toJson();

	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(chalkError(error)));
	}

	if (jsonStats.hasWarnings) {
		console.log(chalkWarning('Webpack generated the following warnings: '));
		jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
	}

	console.log('Webpack stats:');
	console.log(stats.toString({
		cachedAssets: false,
		colors: true,
		modules: false
	}));

	// if we got this far, the build succeeded.
	console.log(chalkSuccess('Your app is compiled in stage mode in /dist. It\'s ready to roll!'));

	return 0;
});
