import plato from 'plato';

const files = [
	'./src/**/*.js'
];

const outputDir = './analyze';
// null options for this example
const options = {};

function callback (_report){
	// once done the analysis,
	// execute this
}

plato.inspect(files, outputDir, options, callback);
