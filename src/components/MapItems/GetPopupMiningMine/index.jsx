import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Popup, useMapEvents } from 'react-leaflet';

import { darkScheme } from '../../../constants/schemes';
import api from '../../../services/api';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function GetPopupMiningMine() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const [popup, setPopup] = useState();
  const [tilesCoordMine, setTilesCoordMine] = useState();

  useEffect(() => {
    api
      .get(`mining/mine/tiles/properties/${popup?.lng}/${popup?.lat}`)
      .then(({ data }) => {
        setTilesCoordMine(data);
      })
      .catch((error) => {
        if (error.response) {
          setTilesCoordMine(undefined);
        }
      });
  }, [popup]);

  useMapEvents({
    click(e) {
      setPopup(e.latlng);
    },
  });

  return tilesCoordMine === undefined ? null : (
    <Popup
      key={theme === darkScheme ? `dark` : `light`}
      className={classes.popup}
      position={[popup?.lat, popup?.lng]}
    >
      <Typography variant="caption" format="bold">
        {tilesCoordMine?.company}
      </Typography>
      <div className={classes.separator} />

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.MiningMine.code')}
        </Typography>
        <Typography variant="caption">{tilesCoordMine?.code}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.MiningMine.institution')}
        </Typography>
        <Typography variant="caption">{tilesCoordMine?.institution}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.MiningMine.name')}
        </Typography>
        <Typography variant="caption">{tilesCoordMine?.name}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.MiningMine.situation')}
        </Typography>
        <Typography variant="caption">{tilesCoordMine?.situation}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          {t('map.points.MiningMine.source')}
        </Typography>
        <Typography variant="caption">{tilesCoordMine?.source}</Typography>
      </div>
    </Popup>
  );
}
