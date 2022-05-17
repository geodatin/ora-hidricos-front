import faker from 'faker';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import DataDoughComponent from '../../../../../components/Charts/DataDough/DataDoughComponent';
import LineChart from '../../../../../components/Charts/Line';
import RankingChart from '../../../../../components/Charts/Ranking';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/**
 * This function provides a statistics list of waterSurface
 * @returns statistics list
 */
export default function waterSurface() {
  const theme = useTheme();

  const [rankingParams, setRankingParams] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });
  const [data /* setData */] = useState({
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: [theme.primary.main],
        borderColor: [theme.primary.main],
      },
    ],
  });

  const [rankingWaterSurfaceData /* setRankingWaterSurfaceData */] = useState({
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: [theme.green.main],
        borderRadius: 5,
        barThickness: 15,
      },
    ],
  });

  const [rankingWaterLossAndGainData /* setRankingWaterLossAndGainData */] =
    useState({
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: [theme.orange.main],
          borderRadius: 5,
          barThickness: 15,
        },
      ],
    });

  const { t } = useTranslation();

  return (
    <ul>
      <DataDoughComponent />
      <LineChart
        title={t('specific.WaterSurface.lineWaterSurface.title')}
        info={t('specific.WaterSurface.lineWaterSurface.info')}
        data={data}
        options={{
          plugins: {
            autocolors: false,
          },
        }}
      />

      <RankingChart
        title={t('specific.WaterSurface.rankingWaterSurfaceData.title')}
        info={t('specific.WaterSurface.rankingWaterSurfaceData.info')}
        data={rankingWaterSurfaceData}
        params={rankingParams}
        setParams={setRankingParams}
      />

      <RankingChart
        title={t('specific.WaterSurface.rankingWaterLossAndGainData.title')}
        info={t('specific.WaterSurface.rankingWaterLossAndGainData.info')}
        data={rankingWaterLossAndGainData}
        params={rankingParams}
        setParams={setRankingParams}
      />
    </ul>
  );
}
