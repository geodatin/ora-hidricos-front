/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '../../../services/api';
import useStyles from './styles';

const LegendEvapotranspiration = () => {
  const [coordsPrecipitation, setCoordsPrecipitation] = useState();
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    api.get('vulnerability/shape/evapotranspiration').then(({ data }) => {
      setCoordsPrecipitation(data);
    });
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        {t('map.legend.evapotranspiration.title')}
      </h2>
      <p className={classes.subtitle}>
        {t('map.legend.evapotranspiration.subtitle')}
      </p>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ff5302',
          }}
        />
        <span>{coordsPrecipitation?.features?.[0]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ff9c00',
          }}
        />
        <span>{coordsPrecipitation?.features?.[1]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ffec00',
          }}
        />
        <span>{coordsPrecipitation?.features?.[2]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#a1f000',
          }}
        />
        <span>{coordsPrecipitation?.features?.[3]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#2de700',
          }}
        />
        <span>{coordsPrecipitation?.features?.[4]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#09cc26',
          }}
        />
        <span>{coordsPrecipitation?.features?.[5]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#13af6d',
          }}
        />
        <span>{coordsPrecipitation?.features?.[6]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#1b9a91',
          }}
        />
        <span>{coordsPrecipitation?.features?.[7]?.properties?.range}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#166486',
          }}
        />
        <span>{coordsPrecipitation?.features?.[8]?.properties?.range}</span>
      </div>

      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#0a2c7c',
          }}
        />
        <span>{coordsPrecipitation?.features?.[9]?.properties?.range}</span>
      </div>
    </div>
  );
};
export default LegendEvapotranspiration;
