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
import LineChart from '../../../../../components/Charts/Line';
import RankingChart from '../../../../../components/Charts/Ranking';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import useStyles from './styles';

/* This function provides a statistics list of WQI
 * @returns statistics list
 */
export default function IllegalMining({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  IllegalMining.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  IllegalMining.defaultProps = {
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

  const handle = useFullScreenHandle();
  const [rankingData, setRankingData] = useState();
  const [totalData, setTotalData] = useState();
  const [timeSeries, setTimeSeries] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`mining/illegal/total/occurrences`, {
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

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`mining/illegal/time-series`, {
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
                label: 'Número de ocorrências',
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
  }, [code]);

  const pageAtual = rankingParams.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`/mining/illegal/ranking`, {
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
      .get(`/mining/illegal/ranking`, {
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

  return (
    <ul>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <Typography variant="body" format="bold">
              Número total de ocorrências
            </Typography>
            <CustomTooltip
              title="Este gráfico apresenta o número total de ocorrências"
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
            sufix={totalData?.count > 1 ? 'Ocorrências' : 'Ocorrência'}
            color={theme.primary.main}
            scale={1.2}
          />
        </div>
      </div>

      <LineChart
        title="Ocorrências de mineração ilegal"
        info="Este gráfico apresenta as ocorrências de mineração ilegal"
        data={timeSeries}
        options={{
          plugins: {
            autocolors: false,
          },
        }}
      />

      <RankingChart
        title="Ranking das substâncias"
        info="Este gráfico apresenta o ranking das substâncias"
        data={rankingData}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParams}
        setParams={setRankingParams}
      />
    </ul>
  );
}
