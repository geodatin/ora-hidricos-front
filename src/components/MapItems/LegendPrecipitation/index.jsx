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
      <h2 className={classes.title}>Precipitação anual</h2>
      <p className={classes.subtitle}>Milímetros (mm)</p>
      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#072d76',
          }}
        />
        <span>{coordsPrecipitation?.features?.[9]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#126c87',
          }}
        />
        <span>{coordsPrecipitation?.features?.[8]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#1d9e85',
          }}
        />
        <span>{coordsPrecipitation?.features?.[7]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#0dc140',
          }}
        />
        <span>{coordsPrecipitation?.features?.[6]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#38e200',
          }}
        />
        <span>{coordsPrecipitation?.features?.[5]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#c1f500',
          }}
        />
        <span>{coordsPrecipitation?.features?.[4]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#f0d500',
          }}
        />
        <span>{coordsPrecipitation?.features?.[3]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#f5a207',
          }}
        />
        <span>{coordsPrecipitation?.features?.[2]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#d9792f',
          }}
        />
        <span>{coordsPrecipitation?.features?.[1]?.properties?.range}</span>
      </div>

      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#bd513d',
          }}
        />
        <span>{coordsPrecipitation?.features?.[0]?.properties?.range}</span>
      </div>
    </div>
  );
};
export default LegendPrecipitation;
