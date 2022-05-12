import faker from 'faker';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import LegendDoughnutChart from '../../../../../components/Charts/LegendDoughnut';
import LineChart from '../../../../../components/Charts/Line';
import RankingChart from '../../../../../components/Charts/Ranking';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/**
 * This function provides a statistics list of WQI
 * @returns statistics list
 */
export default function WQI() {
  const theme = useTheme();

  const [legendDoughnutData /* setData */] = useState({
    labels: [
      'Estado excelente',
      'Estado bom',
      'Estado médio',
      'Estado ruim',
      'Estado muito ruim',
    ],
    datasets: [
      {
        label: 'Datatype',
        data: [142, 85, 80, 35, 35],
        backgroundColor: [
          theme.orange.main,
          theme.primary.main,
          theme.green.main,
          theme.purple.main,
          theme.secondary.dark,
        ],
        borderColor: 'transparent',
      },
    ],
  });

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

  const [rankingWQIState /* setRankingWQIState */] = useState({
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

  const [rankingWQIStations /* setRankingWQIStations */] = useState({
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
      <LegendDoughnutChart
        title={t('specific.WQI.LegendDoughnutChart.title')}
        info={t('specific.WQI.LegendDoughnutChart.info')}
        data={legendDoughnutData}
      />
      <LineChart
        title={t('specific.WQI.lineChart.title')}
        info={t('specific.WQI.lineChart.info')}
        data={data}
        options={{
          plugins: {
            autocolors: false,
          },
        }}
      />

      <RankingChart
        title={t('specific.WQI.rankingWQIState.title')}
        info={t('specific.WQI.rankingChart.info')}
        data={rankingWQIState}
        params={rankingParams}
        setParams={setRankingParams}
      />

      <RankingChart
        title={t('specific.WQI.rankingWQIStations.title')}
        info={t('specific.WQI.rankingWQIStations.info')}
        data={rankingWQIStations}
        params={rankingParams}
        setParams={setRankingParams}
      />
    </ul>
  );
}
