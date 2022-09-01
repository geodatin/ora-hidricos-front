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
import { indicators, layoutConfigs } from '../../constants/options';
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

  console.log(indicatorSelection);

  const infoPanel =
    (indicatorSelection === indicators.waterResources.waterSurface.value && (
      <InfoPanel
        title={t('specific.infoPanel.WaterSurface.title')}
        fonte={t('specific.infoPanel.WaterSurface.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterResources.wetlands.value && (
      <InfoPanel
        title={t('specific.infoPanel.wetlands.title')}
        fonte={t('specific.infoPanel.wetlands.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.waterResources.annualPrecipitation.value && (
      <InfoPanel
        title={t('specific.infoPanel.annualPrecipitation.title')}
        fonte={t('specific.infoPanel.annualPrecipitation.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.waterResources.actualEvapotranspiration.value && (
      <InfoPanel
        title={t('specific.infoPanel.actualEvapotranspiration.title')}
        fonte={t('specific.infoPanel.actualEvapotranspiration.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterResources.waterBalance.value && (
      <InfoPanel
        title={t('specific.infoPanel.waterBalance.title')}
        fonte={t('specific.infoPanel.waterBalance.font')}
      />
    )) ||
    (indicatorSelection === indicators.mercury.mercuryHuman.value && (
      <InfoPanel
        title={t('specific.infoPanel.mercuryHuman.title')}
        fonte={t('specific.infoPanel.mercuryHuman.font')}
      />
    )) ||
    (indicatorSelection === indicators.mercury.mercuryFish.value && (
      <InfoPanel
        title={t('specific.infoPanel.mercuryFish.title')}
        fonte={t('specific.infoPanel.mercuryFish.font')}
      />
    )) ||
    (indicatorSelection === indicators.mercury.IPPO.value && (
      <InfoPanel
        title={t('specific.infoPanel.IPPO.title')}
        fonte={t('specific.infoPanel.IPPO.font')}
      />
    )) ||
    (indicatorSelection === indicators.ground.oil.value && (
      <InfoPanel
        title={t('specific.infoPanel.oil.title')}
        fonte={t('specific.infoPanel.oil.font')}
      />
    )) ||
    (indicatorSelection === indicators.ground.illegalMining.value && (
      <InfoPanel
        title={t('specific.infoPanel.illegalMining.title')}
        fonte={t('specific.infoPanel.illegalMining.font')}
      />
    )) ||
    (indicatorSelection === indicators.ground.minesMining.value && (
      <InfoPanel
        title={t('specific.infoPanel.minesMining.title')}
        fonte={t('specific.infoPanel.minesMining.font')}
      />
    )) ||
    (indicatorSelection === indicators.ground.agricultural.value && (
      <InfoPanel
        title={t('specific.infoPanel.agricultural.title')}
        fonte={t('specific.infoPanel.agricultural.font')}
      />
    )) ||
    (indicatorSelection === indicators.ground.deforesting.value && (
      <InfoPanel
        title={t('specific.infoPanel.deforesting.title')}
        fonte={t('specific.infoPanel.deforesting.font')}
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
        className:
          layoutConfig === 1 || layoutConfig === 2
            ? classes.filtersNotificationsWrapperZ
            : classes.filtersNotificationsWrapper,
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
