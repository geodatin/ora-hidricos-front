import PropTypes from 'prop-types';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from 'react-jss';

import Typography from '../../Typography';
import MiddleDoughnut from '../MiddleDoughnut';

export default function DataDough({ value, sufix, label, color, scale }) {
  DataDough.propTypes = {
    value: PropTypes.string,
    sufix: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string.isRequired,
    scale: PropTypes.number,
  };

  DataDough.defaultProps = {
    value: undefined,
    sufix: undefined,
    label: undefined,

    scale: 1,
  };

  const theme = useTheme();

  return (
    <div style={{ marginRight: 20, scrollSnapAlign: 'end' }}>
      <MiddleDoughnut
        style={{
          width: `calc(125px * ${scale})`,
          height: `calc(125px * ${scale})`,
        }}
        descriptionVariant={scale < 1 ? 'caption' : 'body'}
        doughnut={
          <Doughnut
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                  callbacks: {
                    label(context) {
                      return `${context.dataset.value} ${context.dataset.sufix} (${context.parsed}%)`;
                    },
                  },
                },
              },
              aspectRatio: 1,
              radius: '100%',
              cutout: 55 * scale,
              rotation: 180,
            }}
            data={{
              labels: ['', ''],
              datasets: [
                {
                  label,
                  value,
                  sufix,
                  data: [value, 50],
                  backgroundColor: [
                    color ?? theme.secondary.light,
                    theme.toggleButton.unabled,
                  ],
                  borderColor: 'transparent',
                },
              ],
            }}
          />
        }
      >
        <Typography format="bold" variant={scale < 1 ? 'caption' : 'p'}>
          {value}
        </Typography>
        <Typography
          variant={scale < 1 ? 'caption' : 'body'}
          style={{ color: theme.neutral.gray.main }}
        >
          {sufix}
        </Typography>
      </MiddleDoughnut>
      <Typography
        variant="p"
        style={{
          fontSize: 12,
          marginTop: 10,
          color: theme.neutral.gray.main,
          textAlign: 'center',
        }}
      >
        {label}
      </Typography>
    </div>
  );
}
