import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileNavbarLayout from '../../components/Layout/Mobile/Navbar';
import VLayout from '../../components/Layout/Vertical';
import { breakpoints } from '../../constants/constraints';
import { layoutConfigs } from '../../constants/options';
import FilteringContext from '../../contexts/filtering';
import { useLayoutConfig } from '../../hooks/useLayoutConfig';
import { useQuery } from '../../hooks/useQuery';
import Filters from './Filters';
import InfoPanel from './InfoPanel';
import Statistics from './InfoPanel/Statistics';
import MonitoringMap from './MonitoringMap';
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
  const embed = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.embed
  );
  const { layoutConfig, setLayoutConfig } = useLayoutConfig();
  const [mainTopSection, setMainTopSection] = useState(true);

  const query = useQuery();

  const classes = useStyles();
  const isMobile = useMediaQuery(breakpoints.max.md);

  const { t } = useTranslation();

  const infoPanel =
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
    )) ||
    (indicatorSelection === 3 && (
      <InfoPanel
        title={t('specific.infoPanel.WQI.title')}
        subtitle="Last update in 11/08/2022"
      />
    )) ||
    (indicatorSelection === 4 && (
      <InfoPanel
        title={t('specific.infoPanel.WQI.title')}
        subtitle="Last update in 11/08/2022"
      />
    ));

  useEffect(() => {
    if (embed) {
      const leftBar = query.get('leftBar') === 'true';
      const rightBar = query.get('rightBar') === 'true';
      const topBar = query.get('topBar') === 'true';

      if (leftBar && rightBar) {
        setLayoutConfig(0);
      } else if (rightBar) {
        setLayoutConfig(1);
      } else if (leftBar) {
        setLayoutConfig(3);
      } else {
        setLayoutConfig(2);
      }

      setMainTopSection(topBar);
    }
  }, [embed]);

  return isMobile ? (
    <MobileNavbarLayout
      mainContainer={{
        label: 'Map',
        icon: <MapRoundedIcon />,
        children: <MonitoringMap />,
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
            upRow={
              mainTopSection
                ? {
                    className: classes.breadBarWrapper,
                    children: (
                      <Breadcrumb
                        items={['Monitoramento', 'Todas as redes']}
                        onClickItem={() => {}}
                      />
                    ),
                  }
                : undefined
            }
            mainContainer={{
              className: classes.map,
              children: <MonitoringMap />,
            }}
          />
        ),
      }}
      leftColumn={{
        isHidden: layoutConfigs.isLeftHidden[layoutConfig],
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
        isHidden: layoutConfigs.isRightHidden[layoutConfig],
        className: classes.infoPanelWrapper,
        children: infoPanel,
      }}
    />
  );
}

export default Dashboard;
