import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';
// import { useTheme } from 'react-jss';

import ChartContainer from '../../ChartContainer';

/**
 * This component renders a Line Chart
 * @returns Line Chart
 */

export default function LineChart({
  title,
  info,
  data,
  csvCallback,
  fullScreenEnabled,
  options: mergeOptions,
}) {
  LineChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    options: PropTypes.shape(),
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  LineChart.defaultProps = {
    data: undefined,
    options: undefined,
    csvCallback: undefined,
    fullScreenEnabled: false,
  };

  // const theme = useTheme();

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },

    indexAxis: 'x',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          crossAlign: 'far',
          color: '#A4A4A4',
          beginAtZero: true,
          font: {
            size: 12,
          },
        },
        title: {
          display: false,
          padding: 0,
        },
      },
      x: {
        ticks: {
          color: '#A4A4A4',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <ChartContainer
      title={title}
      info={info}
      csvCallback={csvCallback}
      fullScreenEnabled={fullScreenEnabled}
      isLoaded={!!data}
    >
      <Line options={merge(options, mergeOptions)} data={data} />
    </ChartContainer>
  );
}
