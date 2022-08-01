import AlignHorizontalLeftRoundedIcon from '@mui/icons-material/AlignHorizontalLeftRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from 'react-jss';

import ChartContainer from '../../ChartContainer';
import CustomPagination from '../../CustomPagination';

/**
 * This component renders a Ranking Chart
 * @returns Ranking Chart
 */
export default function RankingChart({
  title,
  info,
  data,
  csvCallback,
  fullScreenEnabled,
  params,
  setParams,
  customOptions,
  customFormatter,
}) {
  RankingChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    csvCallback: PropTypes.func,
    params: PropTypes.shape(),
    customOptions: PropTypes.shape(),
    customFormatter: PropTypes.shape(),
    fullScreenEnabled: PropTypes.bool,
    setParams: PropTypes.func.isRequired,
  };

  RankingChart.defaultProps = {
    data: undefined,
    customOptions: {},
    customFormatter: {},
    csvCallback: undefined,
    fullScreenEnabled: false,
    params: {
      order: true,
      page: 1,
      totalPages: 1,
    },
  };

  const theme = useTheme();

  const options = {
    interaction: {
      mode: 'index',
      intersect: true,
    },
    indexAxis: 'y',
    plugins: {
      datalabels: {
        font: {
          size: 12,
        },
        color: '#A4A4A4',
        display: true,
        anchor: 'end',
        align: 'end',
        formatter(value, context) {
          const { datasets } = context.chart.data;
          const lastDatasetIndex = datasets.length - 1;
          const arrSum = new Array(datasets[0].data.length).fill(0);
          datasets.forEach(({ data: dt }) =>
            dt.forEach((num, indx) => {
              arrSum[indx] += num;
            })
          );

          return context.datasetIndex !== lastDatasetIndex
            ? ''
            : arrSum[context.dataIndex];
        },
        ...customFormatter,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(ctx) {
            return ` ${ctx.formattedValue} ${ctx.dataset?.sufix ?? ''}`;
          },
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        ticks: {
          crossAlign: 'far',
          color: '#A4A4A4',
          beginAtZero: true,
          font: {
            size: 16,
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          display: false,
        },
      },
    },
    ...customOptions,
  };

  const handleChangeOrder = () => {
    setParams((prevParams) => ({ ...prevParams, order: !prevParams.order }));
  };

  return (
    <ChartContainer
      title={title}
      info={info}
      isLoaded={!!data}
      csvCallback={csvCallback}
      fullScreenEnabled={fullScreenEnabled}
      extraButton={
        <IconButton id="order-button" onClick={handleChangeOrder}>
          <AlignHorizontalLeftRoundedIcon
            style={{
              fontSize: 20,
              color: theme.secondary.dark,
              transform: params.order ? 'scaleY(1)' : 'scaleY(-1)',
            }}
          />
        </IconButton>
      }
      pagination={
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          {params.totalPages === 1 ? (
            <CustomPagination
              disabled
              size="small"
              count={params.totalPages}
              page={params.page}
              onChange={(event, value) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  page: value,
                }))
              }
            />
          ) : (
            <CustomPagination
              size="small"
              count={params.totalPages}
              page={params.page}
              onChange={(event, value) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  page: value,
                }))
              }
            />
          )}
        </div>
      }
    >
      <Bar style={{ marginTop: -10 }} options={options} data={data} />
    </ChartContainer>
  );
}
