import React from 'react';

import markerFish1Icon from '../../../assets/icons/map/fish1.png';
import markerFish2Icon from '../../../assets/icons/map/fish2.png';
import markerFish3Icon from '../../../assets/icons/map/fish3.png';
import markerFish4Icon from '../../../assets/icons/map/fish4.png';
import useStyles from './styles';

const LegendMercuryFish = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Contaminação por Mercúrio em peixes</h2>

      <div className={classes.separator} />

      <div className={classes.content}>
        <img
          className={classes.image}
          src={markerFish1Icon}
          alt="Icon humman"
        />
        <span>{'< 0,1 ppm - baixo'}</span>
      </div>

      <div className={classes.content}>
        <img
          className={classes.image}
          src={markerFish2Icon}
          alt="Icon humman"
        />
        <span>0,1 - 0,5 ppm - aceitável</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={markerFish3Icon}
          alt="Icon humman"
        />
        <span>0,5 - 1,0 ppm - alto</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={markerFish4Icon}
          alt="Icon humman"
        />
        <span>{'> 1,0 ppm - muito alto'}</span>
      </div>
    </div>
  );
};
export default LegendMercuryFish;
