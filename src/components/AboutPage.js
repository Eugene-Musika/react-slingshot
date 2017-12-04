import { Header } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import React from 'react';
import styles from '../styles/modules/about-page.scss';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => (
    <div>
			<h2 className='alt-header'>About</h2>
			<h2 styleName='styles.alt-header'>About</h2>
			<h2 className={ styles.altHeader }>About</h2>

			<Header>About2</Header>
      <p>
        This example app is part of the <a href="https://github.com/coryhouse/react-slingshot">React-Slingshot
        starter kit</a>.
      </p>
      <p>
        <Link to="/badlink">Click this bad link</Link> to see the 404 page.
      </p>
    </div>
  );

export default AboutPage;
