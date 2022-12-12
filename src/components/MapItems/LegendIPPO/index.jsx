/* eslint-disable react/prop-types */
import React from 'react';

import useStyles from './styles';

const LegendIPPO = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>IPPO na Bacia Amazônica</h2>
      <p className={classes.subtitle}>Situação</p>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#a1292a',
          }}
        />
        <span>Ruim</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#3b100f',
          }}
        />
        <span>Péssimo</span>
      </div>
    </div>
  );
};
export default LegendIPPO;
