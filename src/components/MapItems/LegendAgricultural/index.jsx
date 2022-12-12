/* eslint-disable react/prop-types */
import React from 'react';

import useStyles from './styles';

const LegendAgricultural = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Agropecuária na Bacia Amazônica</h2>
      <p className={classes.subtitle}>Atividades Agropecuárias</p>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#964627',
          }}
        />
        <span>Agricultural</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#b2a637',
          }}
        />
        <span>Pecuária</span>
      </div>
    </div>
  );
};
export default LegendAgricultural;
