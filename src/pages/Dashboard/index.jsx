import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import Breadcrumb from '../../components/Breadcrumb';
import HLayout from '../../components/Layout/Horizontal';
import MobileNavbarLayout from '../../components/Layout/Mobile/Navbar';
import VLayout from '../../components/Layout/Vertical';
import { indicators, layoutConfigs } from '../../constants/options';
import FilteringContext from '../../contexts/filtering';
import { useLayoutConfig } from '../../hooks/useLayoutConfig';
import { useMobile } from '../../hooks/useMobile';
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
  const { isMobile, mobileNavValue, setMobileNavValue } = useMobile();

  const query = useQuery();

  const classes = useStyles();

  const { t } = useTranslation();

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
    )) ||
    (indicatorSelection === indicators.waterDemand.hydroelectric.value && (
      <InfoPanel
        title={t('specific.infoPanel.hydroelectric.title')}
        fonte={t('specific.infoPanel.hydroelectric.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterDemand.Waterways.value && (
      <InfoPanel
        title={t('specific.infoPanel.Waterways.title')}
        fonte={t('specific.infoPanel.Waterways.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterDemand.Population.value && (
      <InfoPanel
        title={t('specific.infoPanel.Population.title')}
        fonte={t('specific.infoPanel.Population.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterDemand.CNARHunion.value && (
      <InfoPanel
        title={t('specific.infoPanel.CNARHunion.title')}
        fonte={t('specific.infoPanel.CNARHunion.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterDemand.CNARHstate.value && (
      <InfoPanel
        title={t('specific.infoPanel.CNARHstate.title')}
        fonte={t('specific.infoPanel.CNARHstate.font')}
      />
    )) ||
    (indicatorSelection === indicators.generalFeatures.watershedArea.value && (
      <InfoPanel
        title={t('specific.infoPanel.watershedArea.title')}
        fonte={t('specific.infoPanel.watershedArea.font')}
      />
    )) ||
    (indicatorSelection === indicators.generalFeatures.areaPercentage.value && (
      <InfoPanel
        title={t('specific.infoPanel.areaPercentage.title')}
        fonte={t('specific.infoPanel.areaPercentage.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.generalFeatures.surfaceHydrologicalUnits.value && (
      <InfoPanel
        title={t('specific.infoPanel.surfaceHydrologicalUnits.title')}
        fonte={t('specific.infoPanel.surfaceHydrologicalUnits.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.generalFeatures.undergroundHydrologicalUnits.value && (
      <InfoPanel
        title={t('specific.infoPanel.undergroundHydrologicalUnits.title')}
        fonte={t('specific.infoPanel.undergroundHydrologicalUnits.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.generalFeatures.hydrogeochemicalCharacteristics.value && (
      <InfoPanel
        title={t('specific.infoPanel.hydrogeochemicalCharacteristics.title')}
        fonte={t('specific.infoPanel.hydrogeochemicalCharacteristics.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.hydroclimaticVulnerability.droughtEvents.value && (
      <InfoPanel
        title={t('specific.infoPanel.droughtEvents.title')}
        fonte={t('specific.infoPanel.droughtEvents.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.hydroclimaticVulnerability.floodEvents.value && (
      <InfoPanel
        title={t('specific.infoPanel.floodEvents.title')}
        fonte={t('specific.infoPanel.floodEvents.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.hydroclimaticVulnerability.droughtVulnerability.value && (
      <InfoPanel
        title={t('specific.infoPanel.droughtVulnerability.title')}
        fonte={t('specific.infoPanel.droughtVulnerability.font')}
      />
    )) ||
    (indicatorSelection ===
      indicators.hydroclimaticVulnerability.floodVulnerability.value && (
      <InfoPanel
        title={t('specific.infoPanel.floodVulnerability.title')}
        fonte={t('specific.infoPanel.floodVulnerability.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterGovernance.authorities.value && (
      <InfoPanel
        title={t('specific.infoPanel.authorities.title')}
        fonte={t('specific.infoPanel.authorities.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterGovernance.legislation.value && (
      <InfoPanel
        title={t('specific.infoPanel.legislation.title')}
        fonte={t('specific.infoPanel.legislation.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterGovernance.publications.value && (
      <InfoPanel
        title={t('specific.infoPanel.publications.title')}
        fonte={t('specific.infoPanel.publications.font')}
      />
    )) ||
    (indicatorSelection === indicators.waterGovernance.countryReports.value && (
      <InfoPanel
        title={t('specific.infoPanel.countryReports.title')}
        fonte={t('specific.infoPanel.countryReports.font')}
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
      value={mobileNavValue}
      setValue={setMobileNavValue}
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
        isHidden:
          indicatorSelection ===
            indicators.waterResources.annualPrecipitation.value ||
          indicatorSelection ===
            indicators.waterResources.actualEvapotranspiration.value ||
          indicatorSelection === indicators.waterResources.waterBalance.value ||
          indicatorSelection === indicators.waterGovernance.legislation.value
            ? layoutConfigs.isRightHiddenPermanent[layoutConfig]
            : layoutConfigs.isRightHidden[layoutConfig],
        className: classes.infoPanelWrapper,
        children: infoPanel,
      }}
    />
  );
}

export default Dashboard;
