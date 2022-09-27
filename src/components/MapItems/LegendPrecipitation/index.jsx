/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import api from '../../../services/api';
import useStyles from './styles';

const LegendPrecipitation = () => {
  const [coordsPrecipitation, setCoordsPrecipitation] = useState();
  const classes = useStyles();

  useEffect(() => {
    api.get('vulnerability/shape/precipitation').then(({ data }) => {
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
            backgroundColor: '#ffa500',
          }}
        />
        <span>{coordsPrecipitation?.features?.[9]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffaf1a',
          }}
        />
        <span>{coordsPrecipitation?.features?.[8]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffb833',
          }}
        />
        <span>{coordsPrecipitation?.features?.[7]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffc14d',
          }}
        />
        <span>{coordsPrecipitation?.features?.[6]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffc966',
          }}
        />
        <span>{coordsPrecipitation?.features?.[5]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffd280',
          }}
        />
        <span>{coordsPrecipitation?.features?.[4]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffdb99',
          }}
        />
        <span>{coordsPrecipitation?.features?.[3]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffe4b3',
          }}
        />
        <span>{coordsPrecipitation?.features?.[2]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffedcc',
          }}
        />
        <span>{coordsPrecipitation?.features?.[1]?.properties?.range}</span>
      </div>

      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#fff6e6',
          }}
        />
        <span>{coordsPrecipitation?.features?.[0]?.properties?.range}</span>
      </div>
    </div>
  );
};
export default LegendPrecipitation;
