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
import RankingChart from '../../../../../components/Charts/Ranking';
import Treemap from '../../../../../components/Charts/Treemap';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import { getTextWidth } from '../../../../../utils/helpers';
import useStyles from './styles';

/* This function provides a statistics list of WQI
 * @returns statistics list
 */
export default function Oil({ extraButton, csvCallback, fullScreenEnabled }) {
  Oil.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  Oil.defaultProps = {
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

  const [rankingParams, setRankingParams] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const [treemapData, setTreemapData] = useState();
  const handle = useFullScreenHandle();
  const [rankingData, setRankingData] = useState();
  const [totalData, setTotalData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`oil/field/total`, {
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
  }, [code]);

  const pageAtual = rankingParams.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`oil/field/ranking`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingData({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: [theme.primary.main],
                borderRadius: 5,
                barThickness: 15,
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [pageAtual]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`oil/field/ranking`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingData({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: [theme.primary.main],
                borderRadius: 5,
                barThickness: 15,
              },
            ],
          });
          setRankingParams({
            page: 1,
            totalPages: data.pages,
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`/oil/field/situation`, {
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
                      `specific.oil.treemapChart.situation.${ctx?.raw.g}`
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
                backgroundColor: theme.primary.main,
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [t, theme, code]);

  console.log(treemapData);

  return (
    <ul>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <Typography variant="body" format="bold">
              Número total de lotes
            </Typography>
            <CustomTooltip
              title="Este gráfico apresenta o número total de lotes"
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
            sufix={totalData?.count > 1 ? 'Lotes' : 'Lote'}
            color={theme.primary.main}
            scale={1.2}
          />
        </div>
      </div>

      <RankingChart
        title={t('specific.oil.rankingChart.title')}
        info={t('specific.oil.rankingChart.info')}
        data={rankingData}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParams}
        setParams={setRankingParams}
      />

      <Treemap
        title={t('specific.oil.treemapChart.title')}
        info={t('specific.oil.treemapChart.info')}
        data={treemapData}
        fullScreenEnabled
        options={{
          plugins: {
            tooltip: {
              displayColors: false,
              callbacks: {
                label(ctx) {
                  return `${t(
                    `specific.oil.treemapChart.situation.${ctx.raw.g}`
                  )}: ${ctx.raw.v} ${
                    ctx.raw.v !== 1
                      ? t(
                          `specific.oil.treemapChart.station.plural`
                        ).toLowerCase()
                      : t(
                          `specific.oil.treemapChart.station.singular`
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