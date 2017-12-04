/* eslint-disable lines-between-class-members */
// Centralized propType definitions
import PropTypes from 'prop-types';

const { shape, number, bool, string } = PropTypes;

export const savings = shape({
	annual: PropTypes.oneOf[number, string],
	monthly: PropTypes.oneOf[number, string],
	threeYear: PropTypes.oneOf[number, string]
});

export const fuelSavings = shape({
	dateModified: string,
	displayResult: bool,
	milesDriven: PropTypes.oneOf[number, string],
	milesDrivenTimeframe: string,
	necessaryDataIsProvidedToCalculateSavings: bool,
	newMpg: PropTypes.oneOf[number, string],
	newPpg: PropTypes.oneOf[number, string],
	savings,
	tradeMpg: PropTypes.oneOf[number, string],
	tradePpg: PropTypes.oneOf[number, string]
});
