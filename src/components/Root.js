import React, { Component } from 'react';

import App from './App';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

export default class Root extends Component {
	render () {
		const { store, history } = this.props;

		return (
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          <App />
        </ConnectedRouter>
      </Provider>
		);
	}
}

Root.propTypes = {
	history: PropTypes.object.isRequired,
	store: PropTypes.object.isRequired
};
