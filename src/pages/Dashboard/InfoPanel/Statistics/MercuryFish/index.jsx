import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import { useTheme } from 'react-jss';

import ChartExportMenu from '../../../../../components/ChartContainer/ChartExportMenu';
import DataDough from '../../../../../components/Charts/DataDough';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import useStyles from './styles';

/* This function provides a statistics list of WQI
 * @returns statistics list
 */
export default function MercuryFish({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  MercuryFish.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  MercuryFish.defaultProps = {
    extraButton: undefined,
    csvCallback: undefined,
    fullScreenEnabled: false,
  };
  const theme = useTheme();
  const classes = useStyles();

  const childrenref = useRef(null);
  const refContainer = useRef();

  const handle = useFullScreenHandle();

  return (
    <ul className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <Typography variant="body" format="bold">
            Número total de publicações
          </Typography>
          <CustomTooltip title="Número total de publicações" placement="bottom">
            <div className={classes.tooltipInner}>
              <InfoOutlined
                style={{
                  color: theme.secondary.dark,
                  fontSize: '18px',
                }}
              />
            </div>
          </CustomTooltip>
        </div>

        <div>
          {extraButton && extraButton}
          {fullScreenEnabled && (
            <IconButton
              id="export-button"
              className={classes.button}
              onClick={handle.enter}
            >
              <FullscreenRoundedIcon
                style={{ fontSize: 20, color: theme.secondary.dark }}
              />
            </IconButton>
          )}
          <ChartExportMenu
            csvCallback={csvCallback}
            containerRef={refContainer}
            childrenRef={childrenref}
          />
        </div>
      </div>
      <div ref={childrenref}>
        <DataDough
          value={786876876}
          sufix="ha"
          label="Total"
          color={theme.primary.main}
          scale={1.2}
        />
      </div>
    </ul>
  );
}
