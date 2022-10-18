import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-jss';
import { Popup, useMapEvents } from 'react-leaflet';

import { darkScheme } from '../../../constants/schemes';
import api from '../../../services/api';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function GetPopupWatershed() {
  const classes = useStyles();
  const theme = useTheme();

  const [popup, setPopup] = useState();
  const [tilesCoord, setTilesCoord] = useState();

  useEffect(() => {
    api
      .get(`territory/watershed/tiles/properties/${popup?.lng}/${popup?.lat}`)
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
        Watershed
      </Typography>
      <div className={classes.separator} />

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          Id
        </Typography>
        <Typography variant="caption">{tilesCoord?.id}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          Name
        </Typography>
        <Typography variant="caption">{tilesCoord?.name}</Typography>
      </div>
    </Popup>
  );
}
