/* eslint-disable react/prop-types */
import React from 'react';

import useStyles from './styles';

const LegendWetlands = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Zonas Inundáveis na Bacia Amazônica</h2>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#02607e',
          }}
        />
        <span>Zonas Inundáveis</span>
      </div>
    </div>
  );
};
export default LegendWetlands;
