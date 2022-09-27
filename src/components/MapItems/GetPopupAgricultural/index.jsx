import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-jss';
import { Popup, useMapEvents } from 'react-leaflet';

import { darkScheme } from '../../../constants/schemes';
import api from '../../../services/api';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function GetPopupAgricultural() {
  const classes = useStyles();
  const theme = useTheme();

  const [popup, setPopup] = useState();
  const [tilesCoord, setTilesCoord] = useState();

  useEffect(() => {
    api
      .get(`agricultural/tiles/properties/${popup?.lng}/${popup?.lat}`)
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
        Agricultural
      </Typography>
      <div className={classes.separator} />

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          Name
        </Typography>
        <Typography variant="caption">{tilesCoord?.name}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          Code
        </Typography>
        <Typography variant="caption">{tilesCoord?.code}</Typography>
      </div>
      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          Area
        </Typography>
        <Typography variant="caption">{tilesCoord?.area} km2</Typography>
      </div>
    </Popup>
  );
}
