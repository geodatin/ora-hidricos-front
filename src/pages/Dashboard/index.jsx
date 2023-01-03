import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

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
  const [setMainTopSection] = useState(true);
  const { isMobile, mobileNavValue, setMobileNavValue } = useMobile();

  const query = useQuery();

  const classes = useStyles();

  const { t } = useTranslation();

  const infoPanel =
    (indicatorSelection === indicators.waterResources.waterSurface.value && (
      <InfoPanel title={t('specific.infoPanel.WaterSurface.title')} />
    )) ||
    (indicatorSelection === indicators.waterResources.wetlands.value && (
      <InfoPanel title={t('specific.infoPanel.wetlands.title')} />
    )) ||
    (indicatorSelection ===
      indicators.waterResources.annualPrecipitation.value && (
      <InfoPanel title={t('specific.infoPanel.annualPrecipitation.title')} />
    )) ||
    (indicatorSelection ===
      indicators.waterResources.actualEvapotranspiration.value && (
      <InfoPanel
        title={t('specific.infoPanel.actualEvapotranspiration.title')}
      />
    )) ||
    (indicatorSelection === indicators.waterResources.waterBalance.value && (
      <InfoPanel title={t('specific.infoPanel.waterBalance.title')} />
    )) ||
    (indicatorSelection === indicators.mercury.mercuryHuman.value && (
      <InfoPanel title={t('specific.infoPanel.mercuryHuman.title')} />
    )) ||
    (indicatorSelection === indicators.mercury.mercuryFish.value && (
      <InfoPanel title={t('specific.infoPanel.mercuryFish.title')} />
    )) ||
    (indicatorSelection === indicators.mercury.IPPO.value && (
      <InfoPanel title={t('specific.infoPanel.IPPO.title')} />
    )) ||
    (indicatorSelection === indicators.ground.oil.value && (
      <InfoPanel title={t('specific.infoPanel.oil.title')} />
    )) ||
    (indicatorSelection === indicators.ground.illegalMining.value && (
      <InfoPanel title={t('specific.infoPanel.illegalMining.title')} />
    )) ||
    (indicatorSelection === indicators.ground.minesMining.value && (
      <InfoPanel title={t('specific.infoPanel.minesMining.title')} />
    )) ||
    (indicatorSelection === indicators.ground.agricultural.value && (
      <InfoPanel title={t('specific.infoPanel.agricultural.title')} />
    )) ||
    (indicatorSelection === indicators.ground.deforesting.value && (
      <InfoPanel title={t('specific.infoPanel.deforesting.title')} />
    )) ||
    (indicatorSelection === indicators.waterDemand.hydroelectric.value && (
      <InfoPanel title={t('specific.infoPanel.hydroelectric.title')} />
    )) ||
    (indicatorSelection === indicators.waterDemand.Waterways.value && (
      <InfoPanel title={t('specific.infoPanel.Waterways.title')} />
    )) ||
    (indicatorSelection === indicators.waterDemand.Population.value && (
      <InfoPanel title={t('specific.infoPanel.Population.title')} />
    )) ||
    (indicatorSelection === indicators.waterDemand.CNARHunion.value && (
      <InfoPanel title={t('specific.infoPanel.CNARHunion.title')} />
    )) ||
    (indicatorSelection === indicators.waterDemand.CNARHstate.value && (
      <InfoPanel title={t('specific.infoPanel.CNARHstate.title')} />
    )) ||
    (indicatorSelection === indicators.generalFeatures.watershedArea.value && (
      <InfoPanel title={t('specific.infoPanel.watershedArea.title')} />
    )) ||
    (indicatorSelection === indicators.generalFeatures.areaPercentage.value && (
      <InfoPanel title={t('specific.infoPanel.areaPercentage.title')} />
    )) ||
    (indicatorSelection ===
      indicators.generalFeatures.surfaceHydrologicalUnits.value && (
      <InfoPanel
        title={t('specific.infoPanel.surfaceHydrologicalUnits.title')}
      />
    )) ||
    (indicatorSelection ===
      indicators.generalFeatures.undergroundHydrologicalUnits.value && (
      <InfoPanel
        title={t('specific.infoPanel.undergroundHydrologicalUnits.title')}
      />
    )) ||
    (indicatorSelection ===
      indicators.generalFeatures.hydrogeochemicalCharacteristics.value && (
      <InfoPanel
        title={t('specific.infoPanel.hydrogeochemicalCharacteristics.title')}
      />
    )) ||
    (indicatorSelection ===
      indicators.hydroclimaticVulnerability.droughtEvents.value && (
      <InfoPanel title={t('specific.infoPanel.droughtEvents.title')} />
    )) ||
    (indicatorSelection ===
      indicators.hydroclimaticVulnerability.floodEvents.value && (
      <InfoPanel title={t('specific.infoPanel.floodEvents.title')} />
    )) ||
    (indicatorSelection ===
      indicators.hydroclimaticVulnerability.droughtVulnerability.value && (
      <InfoPanel title={t('specific.infoPanel.droughtVulnerability.title')} />
    )) ||
    (indicatorSelection ===
      indicators.hydroclimaticVulnerability.floodVulnerability.value && (
      <InfoPanel title={t('specific.infoPanel.floodVulnerability.title')} />
    )) ||
    (indicatorSelection === indicators.waterGovernance.authorities.value && (
      <InfoPanel title={t('specific.infoPanel.authorities.title')} />
    )) ||
    (indicatorSelection === indicators.waterGovernance.legislation.value && (
      <InfoPanel title={t('specific.infoPanel.legislation.title')} />
    )) ||
    (indicatorSelection === indicators.waterGovernance.publications.value && (
      <InfoPanel title={t('specific.infoPanel.publications.title')} />
    )) ||
    (indicatorSelection === indicators.waterGovernance.countryReports.value && (
      <InfoPanel title={t('specific.infoPanel.countryReports.title')} />
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
              children: <div />,
            }}
            mainContainer={{
              className: classes.filtersWrapper,
              children: <Filters />,
            }}
          />
        ),
      }}
      rightColumn={{
        isHidden:
          indicatorSelection === indicators.waterDemand.Population.value ||
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
