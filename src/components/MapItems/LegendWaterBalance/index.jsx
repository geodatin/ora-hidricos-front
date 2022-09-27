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
      <h2 className={classes.title}>Range</h2>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#0099ff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[9]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#1aa3ff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[8]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#33adff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[7]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#4db8ff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[6]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#66c2ff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[5]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#80ccff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[4]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#99d6ff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[3]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#b3e0ff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[2]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ccebff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[1]?.properties?.range}</span>
      </div>

      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#e6f5ff',
          }}
        />
        <span>{coordsPrecipitation?.features?.[0]?.properties?.range}</span>
      </div>
    </div>
  );
};
export default LegendWaterBalance;
