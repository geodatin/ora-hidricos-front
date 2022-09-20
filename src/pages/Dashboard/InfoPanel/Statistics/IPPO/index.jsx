import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import ChartExportMenu from '../../../../../components/ChartContainer/ChartExportMenu';
import DataDough from '../../../../../components/Charts/DataDough';
import Treemap from '../../../../../components/Charts/Treemap';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import { getTextWidth } from '../../../../../utils/helpers';
import useStyles from './styles';

/* This function provides a statistics list of Organic Pollution Potential Indicator
 * @returns statistics list
 */
export default function IPPO({ extraButton, csvCallback, fullScreenEnabled }) {
  IPPO.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  IPPO.defaultProps = {
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

  const childrenref = useRef(null);
  const refContainer = useRef();

  const { t } = useTranslation();

  const [treemapData, setTreemapData] = useState();
  const handle = useFullScreenHandle();
  const [totalData, setTotalData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`pollution/total`, {
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
      .get(`pollution/situation`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed && data) {
          setTreemapData({
            datasets: [
              {
                tree: data,
                key: 'amount',
                groups: ['situation'],
                borderColor: theme.background.main,
                borderWidth: 2,
                spacing: 0,
                labels: {
                  display: true,
                  color: theme.background.main,
                  font: {
                    size: 16,
                  },
                  hoverFont: {
                    weight: 'bold',
                  },
                  formatter: (ctx) => {
                    const translation = t(
                      `specific.IPPO.treemapChart.situation.${ctx?.raw.g}`
                    );
                    let label = '';
                    Array.from(translation).forEach((c) => {
                      if (getTextWidth(`${label}...`, 16) < ctx.raw.w - 40) {
                        label += c;
                      }
                    });
                    return label === translation
                      ? `${translation} (${ctx.raw.v})`
                      : `${label}...`;
                  },
                },
                captions: {
                  display: false,
                },
                backgroundColor: 'green',
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [t, theme, code]);

  return (
    <ul>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <Typography variant="body" format="bold">
              {t('specific.IPPO.pieChart.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.IPPO.pieChart.title')}
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
                ? t('specific.IPPO.pieChart.plural')
                : t('specific.IPPO.pieChart.singular')
            }
            color="green"
            scale={1.2}
          />
        </div>
      </div>

      <Treemap
        title={t('specific.IPPO.treemapChart.title')}
        info={t('specific.IPPO.treemapChart.info')}
        data={treemapData}
        fullScreenEnabled
        options={{
          plugins: {
            tooltip: {
              displayColors: false,
              callbacks: {
                label(ctx) {
                  return `${t(
                    `specific.IPPO.treemapChart.situation.${ctx.raw.g}`
                  )}: ${ctx.raw.v} ${
                    ctx.raw.v !== 1
                      ? t(
                          `specific.IPPO.treemapChart.station.plural`
                        ).toLowerCase()
                      : t(
                          `specific.IPPO.treemapChart.station.singular`
                        ).toLowerCase()
                  }`;
                },
                title() {},
              },
            },
          },
        }}
      />
    </ul>
  );
}
