import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import DataDoughComponent from '../../../../../components/Charts/DataDough/DataDoughComponent';
import LineChart from '../../../../../components/Charts/Line';
import RankingChart from '../../../../../components/Charts/Ranking';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';

/**
 * This function provides a statistics list of waterSurface
 * @returns statistics list
 */

export default function waterSurface() {
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

  const [timeSeries, setTimeSeries] = useState('');
  const [rankingWinLoss, setRankingWinLoss] = useState('');
  const [rankingWaterSurface, setRankingWaterSurface] = useState('');

  const city = territorySelection?.type;
  const code = territorySelection?.code;
  const name = territorySelection?.name;
  useEffect(() => {
    const getTimeSeries = async () => {
      if (territorySelection === null) {
        await api
          .get(`/waterSurface/timeSeries/country?code=9`)
          .then(({ data }) => {
            const labels = data.x;

            setTimeSeries({
              labels: labels.map((label) => label),
              datasets: [
                {
                  label: 'Brasil',
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
              labels: labels.map((label) => label),
              datasets: [
                {
                  label: name,
                  data: data.y,
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
  }, [city, code]);

  const pageArea = rankingParamsWaterSurface.page;

  useEffect(() => {
    const getRankingWaterSurface = async () => {
      if (territorySelection === null) {
        await api
          .get(`/waterSurface/ranking/city/area?code=1&page=${pageArea}`)
          .then(({ data }) => {
            const labels = data.x;
            setRankingWaterSurface({
              labels,
              datasets: [
                {
                  labels,
                  data: data.series[0].data.map((number) => number),
                  backgroundColor: [theme.primary.main],
                  borderRadius: 5,
                  barThickness: 15,
                },
              ],
            });
            setRankingParamsWaterSurface({
              page: pageArea,
              totalPages: data.pages,
            });
          });
      } else {
        await api
          .get(
            `/waterSurface/ranking/${city}/area?code=${code}&page=${pageArea}`
          )
          .then(({ data }) => {
            const labels = data.x;
            setRankingWaterSurface({
              labels,
              datasets: [
                {
                  labels,
                  data: data.series[0].data.map((number) => number),
                  backgroundColor: [theme.primary.main],
                  borderRadius: 5,
                  barThickness: 15,
                },
              ],
            });
            setRankingParamsWaterSurface({
              page: data.focusPage,
            });
          });
      }
    };
    getRankingWaterSurface();
  }, [city, code, pageArea]);

  const pageWinLoss = rankingParamsWinLoss.page;

  useEffect(() => {
    const getRankingWinLossWater = async () => {
      if (territorySelection === null) {
        await api
          .get(`/waterSurface/ranking/city/winLoss?code=1&page=${pageWinLoss}`)
          .then(({ data }) => {
            const labels = data.x;
            setRankingWinLoss({
              labels,
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
              page: pageWinLoss,
              totalPages: data.pages,
            });
          });
      } else {
        await api
          .get(
            `/waterSurface/ranking/${city}/winLoss?code=${code}&page=${pageWinLoss}`
          )
          .then(({ data }) => {
            const labels = data.x;
            setRankingWinLoss({
              labels,
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
              page: data.focusPage,
            });
          });
      }
    };

    getRankingWinLossWater();
  }, [city, code, pageWinLoss]);
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
      <RankingChart
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
