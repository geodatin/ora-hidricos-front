import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Popup, useMapEvents } from 'react-leaflet';

import { darkScheme } from '../../../constants/schemes';
import api from '../../../services/api';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function GetPopupPopulation() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const [popup, setPopup] = useState();
  const [tilesCoord, setTilesCoord] = useState();

  useEffect(() => {
    api
      .get(`population/tiles/properties/${popup?.lng}/${popup?.lat}`)
      .then(({ data }) => {
        setTilesCoord(data);
      })
      .catch((error) => {
        if (error.response) {
          setTilesCoord(undefined);
        }
      });
  }, [popup]);

  useMapEvents({
    click(e) {
      setPopup(e.latlng);
    },
  });

  return tilesCoord === undefined ? null : (
    <Popup
      key={theme === darkScheme ? `dark` : `light`}
      className={classes.popup}
      position={[popup?.lat, popup?.lng]}
    >
      <Typography variant="caption" format="bold">
        {t('map.points.population.title')}
      </Typography>
      <div className={classes.separator} />
      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.population.total')}
        </Typography>
        <Typography variant="caption">{tilesCoord?.total}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.population.code')}
        </Typography>
        <Typography variant="caption">{tilesCoord?.code}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.population.nunivotto')}
        </Typography>
        <Typography variant="caption">{tilesCoord?.nunivotto}</Typography>
      </div>
    </Popup>
  );
}
