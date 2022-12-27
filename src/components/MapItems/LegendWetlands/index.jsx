/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const LegendWetlands = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{t('map.legend.weltlands.title')}</h2>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#02607e',
          }}
        />
        <span>{t('map.legend.weltlands.lands')}</span>
      </div>
    </div>
  );
};
export default LegendWetlands;
