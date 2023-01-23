import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { indicators } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import Agricultural from './Agricultural';
import CNARHstate from './CNARHstate';
import CNARHunion from './CNARHunion';
import Hydroelectric from './Hydroelectric';
import Hydrogeochemistry from './Hydrogeochemistry';
import IllegalMining from './IllegalMining';
import IPPO from './IPPO';
import MercuryFish from './MercuryFish';
import MercuryHuman from './MercuryHuman';
import MiningMine from './MiningMine';
import Oil from './Oil';
import WatershedArea from './WatershedArea';
import WaterSurface from './WaterSurface';
import Wetlands from './Wetlands';

/**
 * This function provides a statistics list
 * @returns statistics list
 */

export default function Statistics() {
  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  return (
    <div>
      {(indicatorSelection === indicators.waterResources.waterSurface.value && (
        <WaterSurface />
      )) ||
        (indicatorSelection === indicators.waterResources.wetlands.value && (
          <Wetlands />
        )) ||
        (indicatorSelection ===
          indicators.waterResources.annualPrecipitation.value && <div />) ||
        (indicatorSelection ===
          indicators.waterResources.actualEvapotranspiration.value && (
          <div />
        )) ||
        (indicatorSelection ===
          indicators.waterResources.waterBalance.value && <div />) ||
        (indicatorSelection === indicators.mercury.mercuryHuman.value && (
          <MercuryHuman />
        )) ||
        (indicatorSelection === indicators.mercury.mercuryFish.value && (
          <MercuryFish />
        )) ||
        (indicatorSelection === indicators.mercury.IPPO.value && <IPPO />) ||
        (indicatorSelection === indicators.ground.oil.value && <Oil />) ||
        (indicatorSelection === indicators.ground.illegalMining.value && (
          <IllegalMining />
        )) ||
        (indicatorSelection === indicators.ground.minesMining.value && (
          <MiningMine />
        )) ||
        (indicatorSelection === indicators.ground.agricultural.value && (
          <Agricultural />
        )) ||
        (indicatorSelection === indicators.ground.deforesting.value && (
          <div />
        )) ||
        (indicatorSelection === indicators.waterDemand.hydroelectric.value && (
          <Hydroelectric />
        )) ||
        (indicatorSelection === indicators.waterDemand.Waterways.value && (
          <div />
        )) ||
        (indicatorSelection === indicators.waterDemand.Population.value && (
          <div />
        )) ||
        (indicatorSelection === indicators.waterDemand.CNARHunion.value && (
          <CNARHunion />
        )) ||
        (indicatorSelection === indicators.waterDemand.CNARHstate.value && (
          <CNARHstate />
        )) ||
        (indicatorSelection ===
          indicators.generalFeatures.watershedArea.value && (
          <WatershedArea />
        )) ||
        (indicatorSelection ===
          indicators.generalFeatures.areaPercentage.value && <div />) ||
        (indicatorSelection ===
          indicators.generalFeatures.surfaceHydrologicalUnits.value && (
          <div />
        )) ||
        (indicatorSelection ===
          indicators.generalFeatures.undergroundHydrologicalUnits.value && (
          <div />
        )) ||
        (indicatorSelection ===
          indicators.generalFeatures.hydrogeochemicalCharacteristics.value && (
          <Hydrogeochemistry />
        )) ||
        (indicatorSelection ===
          indicators.hydroclimaticVulnerability.droughtEvents.value && (
          <div />
        )) ||
        (indicatorSelection ===
          indicators.hydroclimaticVulnerability.floodEvents.value && <div />) ||
        (indicatorSelection ===
          indicators.hydroclimaticVulnerability.droughtVulnerability.value && (
          <div />
        )) ||
        (indicatorSelection ===
          indicators.hydroclimaticVulnerability.floodVulnerability.value && (
          <div />
        )) ||
        (indicatorSelection ===
          indicators.waterGovernance.authorities.value && <div />) ||
        (indicatorSelection ===
          indicators.waterGovernance.legislation.value && <div />) ||
        (indicatorSelection ===
          indicators.waterGovernance.publications.value && <div />) ||
        (indicatorSelection ===
          indicators.waterGovernance.countryReports.value && <div />)}
    </div>
  );
}
