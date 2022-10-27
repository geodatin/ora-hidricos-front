/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import api from '../../../services/api';
import useStyles from './styles';

const LegendWaterBalance = () => {
  const [coordsPrecipitation, setCoordsPrecipitation] = useState();
  const classes = useStyles();

  useEffect(() => {
    api.get('vulnerability/shape/hydricBalance').then(({ data }) => {
      setCoordsPrecipitation(data);
    });
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Balanço hídrico</h2>
      <p className={classes.subtitle}>Milímetros (mm)</p>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#2995c6',
          }}
        />
        <span>{coordsPrecipitation?.features?.[9]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#67a8b2',
          }}
        />
        <span>{coordsPrecipitation?.features?.[8]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#97bfa5',
          }}
        />
        <span>{coordsPrecipitation?.features?.[7]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#c4d290',
          }}
        />
        <span>{coordsPrecipitation?.features?.[6]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#e4ef74',
          }}
        />
        <span>{coordsPrecipitation?.features?.[5]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#fde45e',
          }}
        />
        <span>{coordsPrecipitation?.features?.[4]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#feb341',
          }}
        />
        <span>{coordsPrecipitation?.features?.[3]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#f98531',
          }}
        />
        <span>{coordsPrecipitation?.features?.[2]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#fe5526',
          }}
        />
        <span>{coordsPrecipitation?.features?.[1]?.properties?.range}</span>
      </div>

      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#eb0d16',
          }}
        />
        <span>{coordsPrecipitation?.features?.[0]?.properties?.range}</span>
      </div>
    </div>
  );
};
export default LegendWaterBalance;
