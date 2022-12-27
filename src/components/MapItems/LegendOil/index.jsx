import React from 'react';
import { useTranslation } from 'react-i18next';

import circleExploitation from '../../../assets/icons/map/circle-map-exploitation.svg';
import circleExploration from '../../../assets/icons/map/circle-map-exploration.svg';
import circleOthers from '../../../assets/icons/map/circle-map-others.svg';
import circlePotential from '../../../assets/icons/map/circle-map-potential.svg';
import circleRequest from '../../../assets/icons/map/circle-map-request.svg';
import useStyles from './styles';

const LegendOil = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{t('map.legend.oil.title')}</h2>

      <div className={classes.separator} />

      <div className={classes.content}>
        <img
          className={classes.image}
          src={circleExploration}
          alt="Icon em exploração"
        />
        <span>{t('map.legend.oil.exploration')}</span>
      </div>

      <div className={classes.content}>
        <img
          className={classes.image}
          src={circleExploitation}
          alt="Icon Em explotação"
        />
        <span>{t('map.legend.oil.exploitation')}</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={circlePotential}
          alt="Icon potencial"
        />
        <span>{t('map.legend.oil.potential')}</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={circleRequest}
          alt="Icon solicitação"
        />
        <span>{t('map.legend.oil.solicitation')}</span>
      </div>
      <div className={classes.content}>
        <img className={classes.image} src={circleOthers} alt="Icon outros" />
        <span>{t('map.legend.oil.others')}</span>
      </div>
    </div>
  );
};
export default LegendOil;
