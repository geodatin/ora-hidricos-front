import L from 'leaflet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Marker, Popup } from 'react-leaflet';
import { useContextSelector } from 'use-context-selector';

import { indicators } from '../../../constants/options';
import { darkScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function MarkersCNARHunion({ data, value }) {
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

  return (
    (indicatorSelection === indicators.waterDemand.CNARHunion.value &&
      data?.map((cord) => (
        <Marker
          key={cord.properties.code}
          position={[
            cord.geometry.coordinates[1],
            cord.geometry.coordinates[0],
          ]}
          icon={blueIcon}
        >
          <Popup
            className={classes.popup}
            key={theme === darkScheme ? `dark` : `light`}
          >
            <Typography variant="caption" format="bold">
              {t('map.points.waterUsers.title')}
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.bestowalType')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.bestowalType}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.interferenceType')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.interferenceType}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.orgName')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.orgName}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.bestowalSituation')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.bestowalSituation}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.interferenceSubtype')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.interferenceSubtype}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.waterBodyName')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.waterBodyName}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.Finalidade')}
              </Typography>
              <Typography variant="caption">{cord.properties.goal}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.validDate')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.validDate}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.avgFlow')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.avgFlow}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.maxFlow')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.maxFlow}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Volume
              </Typography>
              <Typography variant="caption">
                {t('map.points.waterUsers.volume')}
              </Typography>
            </div>
          </Popup>
        </Marker>
      ))) ||
    (value === 'CNARHunion' &&
      data?.map((cord) => (
        <Marker
          key={cord.properties.code}
          position={[
            cord.geometry.coordinates[1],
            cord.geometry.coordinates[0],
          ]}
          icon={blueIcon}
        >
          <Popup
            className={classes.popup}
            key={theme === darkScheme ? `dark` : `light`}
          >
            <Typography variant="caption" format="bold">
              {t('map.points.waterUsers.title')}
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.bestowalType')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.bestowalType}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.interferenceType')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.interferenceType}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.orgName')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.orgName}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.bestowalSituation')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.bestowalSituation}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.interferenceSubtype')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.interferenceSubtype}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.waterBodyName')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.waterBodyName}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.Finalidade')}
              </Typography>
              <Typography variant="caption">{cord.properties.goal}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.validDate')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.validDate}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.avgFlow')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.avgFlow}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                {t('map.points.waterUsers.maxFlow')}
              </Typography>
              <Typography variant="caption">
                {cord.properties.maxFlow}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Volume
              </Typography>
              <Typography variant="caption">
                {t('map.points.waterUsers.volume')}
              </Typography>
            </div>
          </Popup>
        </Marker>
      )))
  );
}
