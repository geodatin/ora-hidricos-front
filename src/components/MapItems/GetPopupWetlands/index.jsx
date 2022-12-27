import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Popup, useMapEvents } from 'react-leaflet';

import { darkScheme } from '../../../constants/schemes';
import api from '../../../services/api';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function GetPopupWetlands() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [popupWetlands, setPopupWetlands] = useState();
  const [tilesCoordWetlands, setTilesCoordWetlands] = useState();

  useEffect(() => {
    api
      .get(`flood/tiles/properties/${popupWetlands?.lng}/${popupWetlands?.lat}`)
      .then(({ data }) => {
        setTilesCoordWetlands(data);
      })
      .catch((error) => {
        if (error.response) {
          setTilesCoordWetlands(undefined);
        }
      });
  }, [popupWetlands]);

  useMapEvents({
    click(e) {
      setPopupWetlands(e.latlng);
    },
  });

  return tilesCoordWetlands === undefined ? null : (
    <Popup
      key={theme === darkScheme ? `dark` : `light`}
      className={classes.popup}
      position={[popupWetlands?.lat, popupWetlands?.lng]}
    >
      <Typography variant="caption" format="bold">
        {t('map.points.weltlands.title')}
      </Typography>
      <div className={classes.separator} />
      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.weltlands.name')}
        </Typography>
        <Typography variant="caption">{tilesCoordWetlands?.name}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.weltlands.code')}
        </Typography>
        <Typography variant="caption">{tilesCoordWetlands?.code}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.weltlands.area')}
        </Typography>
        <Typography variant="caption">
          {tilesCoordWetlands?.area} km2
        </Typography>
      </div>
    </Popup>
  );
}
