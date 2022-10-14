/* eslint-disable react/prop-types */
import React from 'react';

import circleBuildingIcon from '../../../assets/icons/map/circle-map-building.svg';
import circleOperationIcon from '../../../assets/icons/map/circle-map-operation.svg';
import circlePlannedIcon from '../../../assets/icons/map/circle-map-project.svg';
import buildingIcon from '../../../assets/icons/map/map-building.svg';
import operationIcon from '../../../assets/icons/map/map-operation.svg';
import plannedIcon from '../../../assets/icons/map/map-project.svg';
import useStyles from './styles';

const LegendHydroeletric = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        Usinas Hidrelétricas e Pequenas Centrais Hidrelétricas na BHA
      </h2>

      <div className={classes.separator} />
      <h2 className={classes.title}>UHE</h2>
      <div className={classes.content}>
        <img className={classes.image} src={plannedIcon} alt="Icon Planejada" />
        <span>Planejada</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={operationIcon}
          alt="Icon Em operação"
        />
        <span>Em operação</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={buildingIcon}
          alt="Icon Em construção"
        />
        <span>Em construção</span>
      </div>

      <h2 className={classes.title} style={{ marginTop: 15 }}>
        PCH
      </h2>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={circlePlannedIcon}
          alt="Icon Planejada"
        />
        <span>Planejada</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={circleOperationIcon}
          alt="Icon Em operação"
        />
        <span>Em operação</span>
      </div>
      <div className={classes.content}>
        <img
          className={classes.image}
          src={circleBuildingIcon}
          alt="Icon Em construção"
        />
        <span>Em construção</span>
      </div>
    </div>
  );
};
export default LegendHydroeletric;
