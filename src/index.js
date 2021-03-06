import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

import configureStore, { history } from './store/configureStore';

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import Root from './components/Root';
import { render } from 'react-dom';
const store = configureStore();

render(
  <AppContainer>
    <Root store={ store } history={ history } />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
	module.hot.accept('./components/Root', () => {
		const NewRoot = require('./components/Root').default;

		render(
      <AppContainer>
        <NewRoot store={ store } history={ history } />
      </AppContainer>,
      document.getElementById('app')
    );
	});
}
