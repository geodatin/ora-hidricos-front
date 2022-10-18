import React from 'react';

import circleExploitation from '../../../assets/icons/map/circle-map-exploitation.svg';
import circleExploration from '../../../assets/icons/map/circle-map-exploration.svg';
import circleOthers from '../../../assets/icons/map/circle-map-others.svg';
import circlePotential from '../../../assets/icons/map/circle-map-potential.svg';
import circleRequest from '../../../assets/icons/map/circle-map-request.svg';
import useStyles from './styles';

const LegendOil = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Lotes petrolíferos</h2>

      <div className={classes.separator} />

      <div className={classes.content}>
        <img
          className={classes.image}
          src={circleExploration}
          alt="Icon em exploração"
        />
        <span>Em exploração</span>
      </div>

      <div className={classes.content}>
        <img
          className={classes.image}
          src={circleExploitation}
          alt="Icon Em explotação"
        />
        <span>Em explotação</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={circlePotential}
          alt="Icon potencial"
        />
        <span>Potencial</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={circleRequest}
          alt="Icon solicitação"
        />
        <span>Solicitação</span>
      </div>
      <div className={classes.content}>
        <img className={classes.image} src={circleOthers} alt="Icon outros" />
        <span>Outros</span>
      </div>
    </div>
  );
};
export default LegendOil;
