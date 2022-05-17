import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileNavbarLayout from '../../components/Layout/Mobile/Navbar';
import VLayout from '../../components/Layout/Vertical';
import MapWrapper from '../../components/MapWrapper';
import { breakpoints } from '../../constants/constraints';
import FilteringContext from '../../contexts/filtering';
import Filters from './Filters';
import InfoPanel from './InfoPanel';
import Statistics from './InfoPanel/Statistics';
import useStyles from './styles';

/**
 * This component renders a dashboard page
 * @returns dashboard page
 */
function Dashboard() {
  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );
  const classes = useStyles();
  const isMobile = useMediaQuery(breakpoints.max.md);

  const { t } = useTranslation();

  return isMobile ? (
    <MobileNavbarLayout
      mainContainer={{
        label: 'Map',
        icon: <MapRoundedIcon />,
        children: <MapWrapper />,
      }}
      bottomNavBar={[
        {
          label: 'Filters',
          icon: <ManageSearchRoundedIcon />,
          navContainer: {
            className: classes.filtersMobileWrapper,
            children: <Filters />,
          },
        },
        {
          label: 'Statistics',
          icon: <AutoGraphRoundedIcon />,
          navContainer: {
            className: classes.statisticsMobileWrapper,
            children: <Statistics />,
          },
        },
        /* {
          label: 'Notifications',
          icon: <NotificationsActiveRoundedIcon />,
          navContainer: {
            className: classes.notificationsMobileWrapper,
            children: <div>Notifications</div>,
          },
        }, */
      ]}
    />
  ) : (
    <HLayout
      mainContainer={{
        className: classes.breadMapWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.breadBarWrapper,
              children: (
                <Breadcrumb items={['Monitoramento', 'Todas as redes']} />
              ),
            }}
            mainContainer={{
              className: classes.map,
              children: <MapWrapper />,
            }}
          />
        ),
      }}
      leftColumn={{
        className: classes.filtersNotificationsWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.filtersWrapper,
              children: <Filters />,
            }}
            mainContainer={{
              className: classes.notificationsWrapper,
              children: <div />,
            }}
          />
        ),
      }}
      rightColumn={{
        className: classes.infoPanelWrapper,
        children:
          (indicatorSelection === 1 && (
            <InfoPanel
              title={t('specific.infoPanel.WaterSurface.title')}
              subtitle="Last update in 11/08/2022"
            />
          )) ||
          (indicatorSelection === 2 && (
            <InfoPanel
              title={t('specific.infoPanel.WQI.title')}
              subtitle="Last update in 11/08/2022"
            />
          )),
      }}
    />
  );
}

export default Dashboard;
