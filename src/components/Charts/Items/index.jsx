import PropTypes from 'prop-types';
import React from 'react';

import ChartContainer from '../../ChartContainer';
import Typography from '../../Typography';
import useStyles from './styles';

/**
 * This component renders a items chart
 * @returns items chart
 */
export default function ItemsChart({
  title,
  info,
  data,
  csvCallback,
  fullScreenEnabled,
  singular,
  plural,
}) {
  ItemsChart.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    singular: PropTypes.string.isRequired,
    plural: PropTypes.string.isRequired,
    data: PropTypes.shape(),
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  ItemsChart.defaultProps = {
    data: undefined,
    csvCallback: undefined,
    fullScreenEnabled: false,
  };

  const classes = useStyles();

  const itemComponent = (icon, label, value, dataType) =>
    value === 0 ? (
      ''
    ) : (
      <div key={label} className={classes.item}>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
          }}
        >
          {icon}
          <Typography format="bold" variant="body" style={{ fontSize: 15 }}>
            {label}
          </Typography>
        </div>
        <div>
          <Typography format="bold">
            {' '}
            {value}{' '}
            {value !== 1 ? (
              <Typography>{plural}</Typography>
            ) : (
              <Typography>{singular}</Typography>
            )}
          </Typography>
          <Typography> {dataType}</Typography>
        </div>
      </div>
    );

  return (
    <ChartContainer
      style={{ height: 'auto' }}
      title={title}
      info={info}
      csvCallback={csvCallback}
      fullScreenEnabled={fullScreenEnabled}
      isLoaded={!!data}
    >
      <div className={classes.childrenWrapper}>
        {data?.labels.map((label, index) =>
          itemComponent(
            data.datasets[0].icons[index],
            label,
            data.datasets[0].data[index],
            data.datasets[0].label
          )
        )}
      </div>
    </ChartContainer>
  );
}
