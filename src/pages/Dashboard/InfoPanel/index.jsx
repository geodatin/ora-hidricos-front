/* eslint-disable no-lone-blocks */
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import VLayout from '../../../components/Layout/Vertical';
import TabPanel from '../../../components/TabPanel';
import Typography from '../../../components/Typography';
import Statistics from './Statistics';
import useStyles from './styles';

/**
 * This function provides a info panel
 * @returns info panel
 */
export default function InfoPanel({ fonte, title, subtitle }) {
  InfoPanel.propTypes = {
    title: PropTypes.string.isRequired,
    fonte: PropTypes.string,
    subtitle: PropTypes.string,
  };

  InfoPanel.defaultProps = {
    subtitle: undefined,
    fonte: undefined,
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <VLayout
      upRow={{
        className: classes.headerWrapper,
        children: (
          <>
            <Typography style={{ marginTop: 10, lineHeight: 1.2 }} variant="h3">
              {title}
            </Typography>
            {fonte && (
              <Typography
                style={{
                  color: theme.neutral.gray.main,
                  lineHeight: 1.5,
                  fontSize: 12,
                  marginTop: 8,
                }}
                variant="p"
              >
                {subtitle}
                <Typography
                  style={{
                    color: theme.neutral.gray.main,
                    lineHeight: 1.5,
                    fontSize: 12,
                  }}
                  variant="p"
                >
                  {fonte}
                </Typography>
              </Typography>
            )}
          </>
        ),
      }}
      mainContainer={{
        className: classes.panelWrapper,

        children: (
          <TabPanel>
            <Statistics />
          </TabPanel>
        ),
      }}
    />
  );
}
