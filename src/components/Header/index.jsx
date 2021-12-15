// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';
import TranslationMenu from './TranslationMenu';

/**
 * This component renders a Header
 * @returns Application's header
 */
export default function Header() {
  const classes = useStyles();

  return (
    <header className={classes.container}>
      <div className={classes.logoContainer}>
        <div className={classes.logoDetail} />
      </div>
      <TranslationMenu />
    </header>
  );
}
