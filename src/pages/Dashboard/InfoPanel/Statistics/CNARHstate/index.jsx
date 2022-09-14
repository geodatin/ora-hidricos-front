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

/* This function provides a statistics list of CNARHstate
 * @returns statistics list
 */
export default function CNARHstate({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  CNARHstate.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  CNARHstate.defaultProps = {
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

  const [rankingParamsSituation, setRankingParamsSituation] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const [rankingParamsCities, setRankingParamsCities] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const [rankingParamsGoal, setRankingParamsGoal] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const handle = useFullScreenHandle();
  const [rankingInterference, setRankingInterference] = useState();
  const [rankingCities, setRankingCities] = useState();
  const [rankingSituation, setRankingSituation] = useState();
  const [rankingGoal, setRankingGoal] = useState();
  const [totalData, setTotalData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/state/total`, {
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
      .get(`waterUsers/ranking/interference/state`, {
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

  const pageSituation = rankingParamsSituation.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/bestowal/state/situation`, {
        params: {
          countryCode: code,
          page: pageSituation,
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
  }, [pageSituation, t]);

  const pageGoal = rankingParamsGoal.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/goal/state`, {
        params: {
          countryCode: code,
          page: pageGoal,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingGoal({
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
  }, [pageGoal, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/goal/state`, {
        params: {
          countryCode: code,
          page: pageGoal,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingGoal({
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
          setRankingParamsGoal({
            page: 1,
            totalPages: data.pages,
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
      .get(`waterUsers/ranking/bestowal/state/situation`, {
        params: {
          countryCode: code,
          page: pageSituation,
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
          setRankingParamsSituation({
            page: 1,
            totalPages: data.pages,
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  const pageCites = rankingParamsCities.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/cities/state`, {
        params: {
          countryCode: code,
          page: pageCites,
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
  }, [pageCites, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`waterUsers/ranking/cities/state`, {
        params: {
          countryCode: code,
          page: pageCites,
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
          setRankingParamsCities({
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
              {t('specific.CNARHstate.pieChart.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.CNARHstate.pieChart.title')}
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
                ? t('specific.CNARHstate.pieChart.plural')
                : t('specific.CNARHstate.pieChart.singular')
            }
            color={theme.primary.main}
            scale={1.2}
          />
        </div>
      </div>

      <RankingChart
        title={t('specific.CNARHstate.rankingChartInterference.title')}
        info={t('specific.CNARHstate.rankingChartInterference.info')}
        data={rankingInterference}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
      />
      <RankingChart
        title={t('specific.CNARHstate.rankingChartCities.title')}
        info={t('specific.CNARHstate.rankingChartCities.info')}
        data={rankingCities}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParamsCities}
        setParams={setRankingParamsCities}
      />
      <RankingChart
        title={t('specific.CNARHstate.rankingChartGoal.title')}
        info={t('specific.CNARHstate.rankingChartGoal.info')}
        data={rankingGoal}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParamsGoal}
        setParams={setRankingParamsGoal}
      />

      <RankingChart
        title={t('specific.CNARHstate.rankingChartSituation.title')}
        info={t('specific.CNARHstate.rankingChartSituation.info')}
        data={rankingSituation}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParamsSituation}
        setParams={setRankingParamsSituation}
      />
    </ul>
  );
}
