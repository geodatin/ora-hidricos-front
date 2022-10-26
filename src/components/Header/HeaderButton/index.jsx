import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';

/**
 * This component renders a HeaderButton
 * @returns Header Button
 */
export default function HeaderButton({ to, title }) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const actived = useMemo(() => {
    const path1 = pathname.substring(1);
    const path2 = pathname.substring(
      0,
      path1.indexOf(`${process.env.REACT_APP_URL_BASE}/`)
    );

    if (path2) {
      return path2 === to;
    }

    return pathname === to;
  }, [pathname]);

  console.log(actived);

  return (
    <Link to={to} className={classes.link}>
      <Button
        id={title}
        className={actived ? classes.activedButton : classes.button}
      >
        {title}
      </Button>
    </Link>
  );
}

HeaderButton.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
