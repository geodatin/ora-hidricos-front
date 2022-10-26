import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import dataSourcesImg from '../../assets/images/data-sources.png';
import { ReactComponent as OraLogo } from '../../assets/images/ora-logo.svg';
import Typography from '../Typography';
import HeaderButton from './HeaderButton';
import MenuButton from './MenuButton';
import useStyles from './styles';
import ThemeButton from './ThemeButton';
import TranslationMenu from './TranslationMenu';

/**
 * This component renders a Header
 * @returns Application's header
 */
export default function Header({ items, projectName }) {
  const classes = useStyles();

  return (
    <header className={classes.container}>
      <Link className={classes.logoContainer} to="/">
        <div className={classes.logoDetail} />
        <div className={classes.logoWrapper}>
          <OraLogo alt="ORA" className={classes.logo} />
          <Typography className={classes.caption}>{projectName}</Typography>
        </div>
      </Link>
      <div className={classes.menuItems}>
        <div className={classes.initialItems}>
          <div className={classes.buttonWrapper}>
            {items.map((item) => (
              <HeaderButton key={item.to} title={item.title} to={item.to} />
            ))}
            <a
              href="https://dev-rh-ora.geodatin.com/api/docs/"
              target="_blank"
              rel="noreferrer"
            >
              <Button className={classes.button}>API</Button>
            </a>
            <a href={dataSourcesImg} target="_blank" rel="noreferrer">
              <Button className={classes.button}>Fontes de dados</Button>
            </a>
          </div>
        </div>
        <div className={classes.endItems}>
          <div className={classes.buttonWrapper}>
            <TranslationMenu />
            <span className={classes.separator} />
            <ThemeButton />
          </div>
          <div className={classes.menuButton}>
            <MenuButton items={items} projectName={projectName} />
          </div>
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  items: [],
};

Header.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
  projectName: PropTypes.string.isRequired,
};
