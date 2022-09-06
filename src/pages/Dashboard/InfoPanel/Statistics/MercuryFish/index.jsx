import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import ChartExportMenu from '../../../../../components/ChartContainer/ChartExportMenu';
import DataDough from '../../../../../components/Charts/DataDough';
import ItemsChart from '../../../../../components/Charts/Items';
import LineChart from '../../../../../components/Charts/Line';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import { countryCodes } from '../../../../../constants/options';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import useStyles from './styles';

/* This function provides a statistics list of mercury fish
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

  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );
  const code = territorySelection?.code;

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const childrenref = useRef(null);
  const refContainer = useRef();

  const handle = useFullScreenHandle();
  const [itemsData, setItemsData] = useState();
  const [totalData, setTotalData] = useState();
  const [timeSeries, setTimeSeries] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`mercury/fish/publications/total`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setTotalData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`mercury/fish/publications/time-series`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          const labels = data.x;
          setTimeSeries({
            labels,
            datasets: [
              {
                label: t('specific.mercuryFish.lineChart.label'),
                data: data.y,
                pointRadius: 3,
                pointStyle: 'rectRot',
                backgroundColor: [theme.primary.main],
                borderColor: [theme.primary.main],
                borderWidth: 1,
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`mercury/fish/publications/countries`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed && data) {
          setItemsData({
            labels: data.map(({ country }) => country),
            datasets: [
              {
                data: data.map(({ count }) => count),
                icons: data.map(({ countryCode }) => (
                  <ReactCountryFlag
                    svg
                    countryCode={countryCodes[countryCode]}
                    style={{ fontSize: 30, marginRight: 5, borderRadius: 12 }}
                  />
                )),
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  return (
    <ul>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <Typography variant="body" format="bold">
              {t('specific.mercuryFish.pieChart.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.mercuryFish.pieChart.title')}
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
        <div ref={childrenref}>
          <DataDough
            value={totalData?.count}
            sufix={
              totalData?.count > 1
                ? t('specific.mercuryFish.pieChart.plural')
                : t('specific.mercuryFish.pieChart.singular')
            }
            color={theme.primary.main}
            scale={1.2}
          />
        </div>
      </div>

      <ItemsChart
        title={t('specific.mercuryFish.itemChart.title')}
        info={t('specific.mercuryFish.itemChart.info')}
        plural={t('specific.mercuryFish.itemChart.plural')}
        singular={t('specific.mercuryFish.itemChart.singular')}
        data={itemsData}
      />

      <LineChart
        title={t('specific.mercuryFish.lineChart.title')}
        info={t('specific.mercuryFish.lineChart.info')}
        data={timeSeries}
        options={{
          plugins: {
            autocolors: false,
          },
        }}
      />
    </ul>
  );
}
