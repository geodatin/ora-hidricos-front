/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const LegendAgricultural = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{t('map.legend.agricultural.title')}</h2>
      <p className={classes.subtitle}>
        {t('map.legend.agricultural.subtitle')}
      </p>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#964627',
          }}
        />
        <span>{t('map.legend.agricultural.agricultural')}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#b2a637',
          }}
        />
        <span>{t('map.legend.agricultural.livestock')}</span>
      </div>
    </div>
  );
};
export default LegendAgricultural;
