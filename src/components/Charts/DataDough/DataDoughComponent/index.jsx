import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import ChartExportMenu from '../../../ChartContainer/ChartExportMenu';
import CustomTooltip from '../../../CustomTooltip';
import Typography from '../../../Typography';

import DataDough from '..';

import useStyles from './styles';

/**
 * This function provides a DataDoughComponent
 * @returns DataDoughComponent
 */
export default function DataDoughComponent({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  DataDoughComponent.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  DataDoughComponent.defaultProps = {
    extraButton: undefined,
    csvCallback: undefined,
    fullScreenEnabled: false,
  };

  const classes = useStyles();
  const theme = useTheme();

  const childrenref = useRef(null);
  const refContainer = useRef();

  const handle = useFullScreenHandle();

  const { t } = useTranslation();

  return (
    <li ref={refContainer} className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <Typography variant="body" format="bold">
            {t('specific.dataDough.title')}
          </Typography>
          <CustomTooltip
            title={t('specific.dataDough.title')}
            placement="bottom"
          >
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
      <div ref={childrenref} style={{ display: 'flex' }}>
        <DataDough
          value={130}
          sufix="ha"
          label="Superfície d’água em 2021"
          color={theme.blue.main}
          scale={0.7}
        />
        <DataDough
          style={{ padding: 20 }}
          value={500}
          sufix="ha"
          label="Perda/ganho de superfície d’água"
          color={theme.primary.main}
          scale={0.7}
        />
        <DataDough
          value={122}
          sufix="%"
          label="Percentual de perda/ganho"
          color={theme.green.main}
          scale={0.7}
        />
      </div>
    </li>
  );
}
