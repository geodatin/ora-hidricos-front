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
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import useStyles from './styles';

/* This function provides a statistics list of CNARHunion
 * @returns statistics list
 */
export default function CNARHunion({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  CNARHunion.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  CNARHunion.defaultProps = {
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
  const [rankingInterference, setRankingInterference] = useState();
  const [rankingCities, setRankingCities] = useState();
  const [rankingType, setRankingType] = useState();
  const [rankingSituation, setRankingSituation] = useState();
  const [totalData, setTotalData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/union/total`, {
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
      .get(`waterUsers/ranking/interference/union`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingInterference({
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
  }, [code, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/bestowal/union/type`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingType({
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
  }, [code, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/bestowal/union/situation`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingSituation({
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
  }, [code, t]);

  const pageAtual = rankingParams.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/cities/union`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingCities({
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
  }, [pageAtual, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/cities/union`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingCities({
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
  }, [code, t]);

  return (
    <ul>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <Typography variant="body" format="bold">
              {t('specific.CNARHunion.pieChart.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.CNARHunion.pieChart.title')}
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
                ? t('specific.CNARHunion.pieChart.plural')
                : t('specific.CNARHunion.pieChart.singular')
            }
            color={theme.primary.main}
            scale={1.2}
          />
        </div>
      </div>

      <RankingChart
        title={t('specific.CNARHunion.rankingChartType.title')}
        info={t('specific.CNARHunion.rankingChartType.info')}
        data={rankingType}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
      />
      <RankingChart
        title={t('specific.CNARHunion.rankingChartSituation.title')}
        info={t('specific.CNARHunion.rankingChartSituation.info')}
        data={rankingSituation}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
      />

      <RankingChart
        title={t('specific.CNARHunion.rankingChartInterference.title')}
        info={t('specific.CNARHunion.rankingChartInterference.info')}
        data={rankingInterference}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
      />
      <RankingChart
        title={t('specific.CNARHunion.rankingChartCities.title')}
        info={t('specific.CNARHunion.rankingChartCities.info')}
        data={rankingCities}
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
