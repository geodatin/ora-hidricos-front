import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-jss';
import { Popup, useMapEvents } from 'react-leaflet';

import Typography from '../../../../components/Typography';
import { darkScheme } from '../../../../constants/schemes';
import api from '../../../../services/api';
import useStyles from '../styles';

export default function GetPopupWetlands() {
  const classes = useStyles();
  const theme = useTheme();

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
        Flood Zone
      </Typography>
      <div className={classes.separator} />
      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          Name
        </Typography>
        <Typography variant="caption">{tilesCoordWetlands?.name}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          Code
        </Typography>
        <Typography variant="caption">{tilesCoordWetlands?.code}</Typography>
      </div>

      <div className={classes.popupItem}>
        <Typography variant="caption" className={classes.popupItemTitle}>
          Area
        </Typography>
        <Typography variant="caption">
          {tilesCoordWetlands?.area} km2
        </Typography>
      </div>
    </Popup>
  );
}
