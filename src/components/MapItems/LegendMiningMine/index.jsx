/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const LegendMiningMine = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{t('map.legend.MiningMine.title')}</h2>
      <p className={classes.subtitle}>{t('map.legend.MiningMine.subtitle')}</p>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#f8a0b7',
          }}
        />
        <span>{t('map.legend.MiningMine.concession')}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#922577',
          }}
        />
        <span>{t('map.legend.MiningMine.exploration')}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#d837a4',
          }}
        />
        <span>{t('map.legend.MiningMine.exploração/explotação')}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#d4a856',
          }}
        />
        <span>{t('map.legend.MiningMine.exploitation')}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#3c4ba5',
          }}
        />
        <span>{t('map.legend.MiningMine.solicitation')}</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#c9d917',
          }}
        />
        <span>{t('map.legend.MiningMine.potential')}</span>
      </div>
    </div>
  );
};
export default LegendMiningMine;
