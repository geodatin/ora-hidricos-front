import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import DataDoughComponent from '../../../../../components/Charts/DataDough/DataDoughComponent';
import LineChart from '../../../../../components/Charts/Line';
import RankingChart from '../../../../../components/Charts/Ranking';
import api from '../../../../../services/api';

/**
 * This function provides a statistics list of waterSurface
 * @returns statistics list
 */
export default function waterSurface() {
  const theme = useTheme();
  const { t } = useTranslation();

  const [rankingParamsWaterSurface, setRankingParamsWaterSurface] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const [rankingParamsWinLos, setRankingParamsWinLos] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const [timeSeries, setTimeSeries] = useState('');
  const [rankingWinLos, setRankingWinLos] = useState('');
  const [rankingWaterSurface, setRankingWaterSurface] = useState('');

  useEffect(() => {
    const getTimeSeries = async () => {
      await api
        .get('/waterSurface/timeSeries/city?code=55')
        .then(({ data }) => {
          const labels = data.x;

          setTimeSeries({
            labels: labels.map((label) => label),
            datasets: [
              {
                label: 'Estatísticas',
                data: data.y,
                backgroundColor: [theme.primary.main],
                borderColor: [theme.primary.main],
                borderWidth: 1,
              },
            ],
          });
        });
    };
    getTimeSeries();
  }, []);

  useEffect(() => {
    const getRankingWaterSurface = async () => {
      await api
        .get(`/waterSurface/ranking/city/area?code=55&page=${2}`)
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
            totalPages: data.pages,
          });
        });
    };
    getRankingWaterSurface();
  }, []);

  useEffect(() => {
    const getRankingWinLosWater = async () => {
      await api
        .get('/waterSurface/ranking/city/winLoss?code=57')
        .then(({ data }) => {
          const labels = data.x;
          console.log(data);

          setRankingWinLos({
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

          setRankingParamsWinLos({
            page: data.focusPage,
            totalPages: data.pages,
          });
        });
    };

    getRankingWinLosWater();
  }, []);
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
        data={rankingWinLos}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParamsWinLos}
        setParams={setRankingParamsWinLos}
      />
    </ul>
  );
}
