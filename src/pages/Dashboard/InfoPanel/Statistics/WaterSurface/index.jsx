import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import DataDoughComponent from '../../../../../components/Charts/DataDough/DataDoughComponent';
import LineChart from '../../../../../components/Charts/Line';
import RankingChart from '../../../../../components/Charts/Ranking';
import RankingWinLossChart from '../../../../../components/Charts/RankingWinLoss';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';

/**
 * This function provides a statistics list of waterSurface
 * @returns statistics list
 */

export default function WaterSurface() {
  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );

  const theme = useTheme();
  const { t } = useTranslation();

  const [rankingParamsWaterSurface, setRankingParamsWaterSurface] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });
  const [rankingParamsWinLoss, setRankingParamsWinLoss] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const [timeSeries, setTimeSeries] = useState();
  const [rankingWinLoss, setRankingWinLoss] = useState();
  const [rankingWaterSurface, setRankingWaterSurface] = useState();

  const city = territorySelection?.type;
  const code = territorySelection?.code;
  const name = territorySelection?.name;

  useEffect(() => {
    const getTimeSeries = async () => {
      if (territorySelection === null) {
        await api.get(`/waterSurface/timeSeries/country`).then(({ data }) => {
          const labels = data.x;

          setTimeSeries({
            labels: labels.map((label) => label),
            datasets: [
              {
                label: t('specific.WaterSurface.lineWaterSurface.label'),
                pointRadius: 3,
                pointStyle: 'rectRot',
                data: data.y,
                backgroundColor: [theme.primary.main],
                borderColor: [theme.primary.main],
                borderWidth: 1,
              },
            ],
          });
        });
      } else {
        await api
          .get(`/waterSurface/timeSeries/${city}?code=${code}`)
          .then(({ data }) => {
            const labels = data.x;

            setTimeSeries({
              labels,
              datasets: [
                {
                  label: name,
                  data: data.y,
                  pointRadius: 3,
                  pointStyle: 'rectRot',
                  backgroundColor: [theme.primary.main],
                  borderColor: [theme.primary.main],
                  borderWidth: 1,
                },
              ],
            });
          });
      }
    };
    getTimeSeries();
  }, [city, code, t]);

  const pageArea = rankingParamsWaterSurface.page;

  useEffect(() => {
    const isSubscribed = true;

    if (territorySelection === null || city === 'country') {
      api
        .get(`/waterSurface/ranking/country/area?&page=${pageArea}`)
        .then(({ data }) => {
          if (isSubscribed) {
            setRankingWaterSurface({
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
    } else {
      api
        .get(`/waterSurface/ranking/${city}/area?code=${code}&page=${pageArea}`)
        .then(({ data }) => {
          if (isSubscribed) {
            setRankingWaterSurface({
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
    }
  }, [pageArea, t]);

  useEffect(() => {
    const isSubscribed = true;

    if (territorySelection === null || city === 'country') {
      api
        .get(`/waterSurface/ranking/country/area?&page=${pageArea}`)
        .then(({ data }) => {
          if (isSubscribed) {
            setRankingWaterSurface({
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
            setRankingParamsWaterSurface({
              page: data.focusPage === undefined ? 1 : data.focusPage,
              totalPages: data.pages,
            });
          }
        });
    } else {
      api
        .get(`/waterSurface/ranking/${city}/area?code=${code}&page=${pageArea}`)
        .then(({ data }) => {
          if (isSubscribed) {
            setRankingWaterSurface({
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
            setRankingParamsWaterSurface({
              page: data.focusPage === undefined ? 1 : data.focusPage,
              totalPages: data.pages,
            });
          }
        });
    }
  }, [city, code, t]);

  const pageWinLoss = rankingParamsWinLoss.page;

  useEffect(() => {
    let isSubscribed = true;
    if (territorySelection === null || city === 'country') {
      api
        .get(`/waterSurface/ranking/country/winLoss?&page=${pageWinLoss}`)
        .then(({ data }) => {
          if (isSubscribed) {
            setRankingWinLoss({
              labels: data.x.map(
                (label, index) => `${data.position[index]}°  ${label}`
              ),
              datasets: [
                {
                  label: name,
                  data: data.series[0].data.map((number) => number),
                  backgroundColor: [theme.orange.main],
                  borderRadius: 5,
                  barThickness: 15,
                },
              ],
            });
          }
        });
    } else {
      api
        .get(
          `/waterSurface/ranking/${city}/winLoss?code=${code}&page=${pageWinLoss}`
        )
        .then(({ data }) => {
          if (isSubscribed) {
            setRankingWinLoss({
              labels: data.x.map(
                (label, index) => `${data.position[index]}°  ${label}`
              ),
              datasets: [
                {
                  data: data.series[0].data.map((number) => number),
                  backgroundColor: [theme.orange.main],
                  borderRadius: 5,
                  barThickness: 15,
                },
              ],
            });
          }
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [pageWinLoss, t]);

  useEffect(() => {
    let isSubscribed = true;
    if (territorySelection === null || city === 'country') {
      api
        .get(`/waterSurface/ranking/country/winLoss?&page=${pageWinLoss}`)
        .then(({ data }) => {
          if (isSubscribed) {
            setRankingWinLoss({
              labels: data.x.map(
                (label, index) => `${data.position[index]}°  ${label}`
              ),
              datasets: [
                {
                  label: name,
                  data: data.series[0].data.map((number) => number),
                  backgroundColor: [theme.orange.main],
                  borderRadius: 5,
                  barThickness: 15,
                },
              ],
            });

            setRankingParamsWinLoss({
              page: data.focusPage === undefined ? 1 : data.focusPage,
              totalPages: data.pages,
            });
          }
        });
    } else {
      api
        .get(
          `/waterSurface/ranking/${city}/winLoss?code=${code}&page=${pageWinLoss}`
        )
        .then(({ data }) => {
          if (isSubscribed) {
            setRankingWinLoss({
              labels: data.x.map(
                (label, index) => `${data.position[index]}°  ${label}`
              ),
              datasets: [
                {
                  data: data.series[0].data.map((number) => number),
                  backgroundColor: [theme.orange.main],
                  borderRadius: 5,
                  barThickness: 15,
                },
              ],
            });

            setRankingParamsWinLoss({
              page: data.focusPage === undefined ? 1 : data.focusPage,
              totalPages: data.pages,
            });
          }
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [city, code, t]);

  console.log(city, code);
  return (
    <ul>
      <DataDoughComponent />
      <LineChart
        title={t('specific.WaterSurface.lineWaterSurface.title')}
        info={t('specific.WaterSurface.lineWaterSurface.info')}
        data={timeSeries}
        options={{
          plugins: {
            autocolors: false,
          },
        }}
      />
      <RankingChart
        title={t('specific.WaterSurface.rankingWaterSurfaceData.title')}
        info={t('specific.WaterSurface.rankingWaterSurfaceData.info')}
        data={rankingWaterSurface}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParamsWaterSurface}
        setParams={setRankingParamsWaterSurface}
      />

      <RankingWinLossChart
        title={t('specific.WaterSurface.rankingWaterLossAndGainData.title')}
        info={t('specific.WaterSurface.rankingWaterLossAndGainData.info')}
        data={rankingWinLoss}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParamsWinLoss}
        setParams={setRankingParamsWinLoss}
      />
    </ul>
  );
}
