import FuelSavingsForm from '../components/FuelSavingsForm';
import { FuelSavingsPage } from './FuelSavingsPage';
import React from 'react';
import { shallow } from 'enzyme';

describe('<FuelSavingsPage />', () => {
	it('should contain <FuelSavingsForm />', () => {
		const actions = {
			calculateFuelSavings: () => { }, // eslint-disable-line no-empty-function
			saveFuelSavings: () => { } // eslint-disable-line no-empty-function
		};
		const fuelSavings = {};
		const wrapper = shallow(<FuelSavingsPage actions={ actions } fuelSavings={ fuelSavings }/>);

		expect(wrapper.find(FuelSavingsForm).length).toEqual(1);
	});
});
