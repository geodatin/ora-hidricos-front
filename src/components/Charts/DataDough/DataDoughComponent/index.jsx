import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
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

  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );

  const [statistics, setStatistics] = useState('');

  const city = territorySelection?.type;
  const code = territorySelection?.code;
  const classes = useStyles();
  const theme = useTheme();

  const childrenref = useRef(null);
  const refContainer = useRef();

  const handle = useFullScreenHandle();

  const { t } = useTranslation();

  useEffect(() => {
    const getStatistics = async () => {
      if (territorySelection === null) {
        await api.get(`/waterSurface/statistics/country`).then(({ data }) => {
          setStatistics(data);
        });
      } else {
        await api
          .get(`/waterSurface/statistics/${city}?code=${code}`)
          .then(({ data }) => {
            setStatistics(data);
          });
      }
    };
    getStatistics();
  }, [city, code, t]);

  return (
    <li ref={refContainer} className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <Typography variant="body" format="bold">
            {t('specific.WaterSurface.dataDough.title')}
          </Typography>
          <CustomTooltip
            title={t('specific.WaterSurface.dataDough.info')}
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
          value={statistics.currentArea}
          sufix="ha"
          label={t('specific.WaterSurface.dataDough.label1')}
          color={theme.orange.main}
          scale={0.7}
        />
        <DataDough
          style={{ padding: 20 }}
          value={statistics.winLossArea}
          sufix="ha"
          label={t('specific.WaterSurface.dataDough.label2')}
          color={theme.primary.main}
          scale={0.7}
        />
        <DataDough
          value={statistics.winLossPercent}
          sufix="%"
          label={t('specific.WaterSurface.dataDough.label3')}
          color={theme.green.main}
          scale={0.7}
        />
      </div>
    </li>
  );
}
