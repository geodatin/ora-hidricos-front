import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';

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

  const options = {
    interaction: {
      mode: 'index',
      intersect: false,
    },

    indexAxis: 'x',
    plugins: {},
    scales: {
      y: {
        title: {
          display: false,
          padding: 0,
          font: {
            size: 13,
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
