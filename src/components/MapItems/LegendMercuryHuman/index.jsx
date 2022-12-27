import React from 'react';
import { useTranslation } from 'react-i18next';

import markerHuman1Icon from '../../../assets/icons/map/human1.png';
import markerHuman2Icon from '../../../assets/icons/map/human2.png';
import markerHuman3Icon from '../../../assets/icons/map/human3.png';
import markerHuman4Icon from '../../../assets/icons/map/human4.png';
import useStyles from './styles';

const LegendMercuryHuman = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{t('map.legend.mercuryHuman.title')}</h2>

      <div className={classes.separator} />

      <div className={classes.content}>
        <img
          className={classes.image}
          src={markerHuman1Icon}
          alt="Icon humman"
        />
        <span>{`< 2 ppm - ${t('map.legend.mercuryHuman.low')}`}</span>
      </div>

      <div className={classes.content}>
        <img
          className={classes.image}
          src={markerHuman2Icon}
          alt="Icon humman"
        />
        <span>2 - 6 ppm - {t('map.legend.mercuryHuman.acceptable')}</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={markerHuman3Icon}
          alt="Icon humman"
        />
        <span>6 - 10 ppm - {t('map.legend.mercuryHuman.high')}</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={markerHuman4Icon}
          alt="Icon humman"
        />
        <span>{`> 10 ppm - ${t('map.legend.mercuryHuman.veryHigh')}`}</span>
      </div>
    </div>
  );
};
export default LegendMercuryHuman;
