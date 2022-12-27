/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const LegendIPPO = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{t('map.legend.IPPO.title')}</h2>
      <p className={classes.subtitle}>{t('map.legend.IPPO.subtitle')}</p>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#a1292a',
          }}
        />
        <span>{t('map.legend.IPPO.bad')}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#3b100f',
          }}
        />
        <span>{t('map.legend.IPPO.terrible')}</span>
      </div>
    </div>
  );
};
export default LegendIPPO;
