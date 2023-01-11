import L from 'leaflet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Marker, Popup } from 'react-leaflet';
import { useContextSelector } from 'use-context-selector';

import circleBuildingIcon from '../../../assets/icons/map/circle-map-building.svg';
import circleOperationIcon from '../../../assets/icons/map/circle-map-operation.svg';
import circlePlannedIcon from '../../../assets/icons/map/circle-map-project.svg';
import buildingIcon from '../../../assets/icons/map/map-building.svg';
import operationIcon from '../../../assets/icons/map/map-operation.svg';
import plannedIcon from '../../../assets/icons/map/map-project.svg';
import { indicators } from '../../../constants/options';
import { darkScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function MarkersHydroelectric({ data, value }) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  const blueIcon = new L.Icon({
    iconUrl:
      'https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg',
    iconSize: [18, 18],
    iconAnchor: [24, 24],
    popupAnchor: [1, -34],
  });

  const MarkerPlannedIcon = new L.Icon({
    iconUrl: plannedIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const MarkerOperationIcon = new L.Icon({
    iconUrl: operationIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const MarkerBuildingIcon = new L.Icon({
    iconUrl: buildingIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleMarkerPlannedIcon = new L.Icon({
    iconUrl: circlePlannedIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleMarkerOperationIcon = new L.Icon({
    iconUrl: circleOperationIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleMarkerBuildingIcon = new L.Icon({
    iconUrl: circleBuildingIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  return (
    (indicatorSelection === indicators.waterDemand.hydroelectric.value &&
      data?.map((cord) => (
        <Marker
          key={cord.properties.code}
          position={[
            cord.geometry.coordinates[1],
            cord.geometry.coordinates[0],
          ]}
          icon={(() => {
            switch (cord.properties.sub + cord.properties.type) {
              case 'planeadaUHE':
                return MarkerPlannedIcon;
              case 'en operaciónUHE':
                return MarkerOperationIcon;
              case 'en construcciónUHE':
                return MarkerBuildingIcon;
              case 'planeadaPCH':
                return CircleMarkerPlannedIcon;
              case 'en operaciónPCH':
                return CircleMarkerOperationIcon;
              case 'en construcciónPCH':
                return CircleMarkerBuildingIcon;
              default:
                return blueIcon;
            }
          })()}
        >
          <Popup
            className={classes.popup}
            key={theme === darkScheme ? `dark` : `light`}
          >
            <Typography variant="caption" format="bold">
              {cord.properties.country}
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.code')}
              </Typography>
              <Typography variant="caption">{cord.properties.code}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.type')}
              </Typography>
              <Typography variant="caption">{cord.properties.type}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.author')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.author}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.source')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.source}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.potency')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.potency}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.sub')}
              </Typography>
              <Typography variant="caption">{cord.properties.sub}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.institution')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.institution}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.company')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.company}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.name')}
              </Typography>
              <Typography variant="caption">{cord.properties.name}</Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.status')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.status}
              </Typography>
            </div>
          </Popup>
        </Marker>
      ))) ||
    (value === 'hydroelectric' &&
      data?.map((cord) => (
        <Marker
          key={cord.properties.code}
          position={[
            cord.geometry.coordinates[1],
            cord.geometry.coordinates[0],
          ]}
          icon={(() => {
            switch (cord.properties.sub + cord.properties.type) {
              case 'planeadaUHE':
                return MarkerPlannedIcon;
              case 'en operaciónUHE':
                return MarkerOperationIcon;
              case 'en construcciónUHE':
                return MarkerBuildingIcon;
              case 'planeadaPCH':
                return CircleMarkerPlannedIcon;
              case 'en operaciónPCH':
                return CircleMarkerOperationIcon;
              case 'en construcciónPCH':
                return CircleMarkerBuildingIcon;
              default:
                return blueIcon;
            }
          })()}
        >
          <Popup
            className={classes.popup}
            key={theme === darkScheme ? `dark` : `light`}
          >
            <Typography variant="caption" format="bold">
              {cord.properties.country}
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.code')}
              </Typography>
              <Typography variant="caption">{cord.properties.code}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.type')}
              </Typography>
              <Typography variant="caption">{cord.properties.type}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.author')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.author}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.source')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.source}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.potency')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.potency}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.sub')}
              </Typography>
              <Typography variant="caption">{cord.properties.sub}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.institution')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.institution}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.company')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.company}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.name')}
              </Typography>
              <Typography variant="caption">{cord.properties.name}</Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.hydroelectric.status')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.status}
              </Typography>
            </div>
          </Popup>
        </Marker>
      )))
  );
}
