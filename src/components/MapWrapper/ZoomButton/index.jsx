import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Button } from '@mui/material';
import L from 'leaflet';
import { map } from 'lodash';
import React, { useEffect, useRef } from 'react';

import useStyles from './styles';

/**
 * This component renders a zoom to control the leaflet component
 * @returns Zoom container component
 */
export default function ZoomButton() {
  const classes = useStyles();

  const containerRef = useRef();

  /**
   * Disable click propagation
   */
  useEffect(() => {
    if (containerRef?.current) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(containerRef.current);
    }
  }, []);

  return (
    <div ref={containerRef} className={classes.container}>
      <Button onClick={() => map.zoomIn()} className={classes.button}>
        <AddRoundedIcon className={classes.icon} />
      </Button>
      <Button onClick={() => map.zoomOut()} className={classes.button}>
        <RemoveRoundedIcon className={classes.icon} />
      </Button>
    </div>
  );
}
